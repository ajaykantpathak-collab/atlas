import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch12 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch12: SimDef = {
    id: 'v3_c11_leg_ch12',
    title: 'Institutional Framework — Marriage and Divorce',
    subtitle: 'This node covers: nature of family laws (pluralistic system), human rights/gender.',
    classLevel: 11, subject: 'leg', topic: 'Institutional Framework — Marriage and Divorce',
    chapters: ['c11_leg_ch12'],
    nodeIds: ['c11_leg_cbse_12_001', 'c11_leg_cbse_12_002', 'c11_leg_cbse_12_003', 'c11_leg_cbse_12_004', 'c11_leg_cbse_12_005', 'c11_leg_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Imagine a Hindu girl (19) and Muslim boy (22) want to marry without converting — which law applies?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Define \'void marriage\' and \'voidable marriage\' under the Hindu Marriage Act, 1955, and state one statutory ground for each.',
        options: ['Void marriage: No legal existence from inception (void ab initio)', 'Special Marriage Act, 1954 applies only to inter-religion marriages', 'secular law'],
        answer: 'Void marriage: No legal existence from inception (void ab initio)',
        hook: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular.',
    },
    teaching: [
        { title: 'Institutional Framework — Marriage and Divorce — Key Concepts and Institutions', text: 'The institutional framework of marriage and divorce in India comprises a pluralistic system of personal laws governing matrimonial relations based on religious identity, supplemented by secular.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_12_001', title: 'Institutional Framework — Marriage and Divorce — Key Concepts and Institutions',
          caseStudy: { intro: 'Imagine a Hindu girl (19) and Muslim boy (22) want to marry without converting — which law applies?',
            decisions: [{ prompt: 'Define \'void marriage\' and \'voidable marriage\' under the Hindu Marriage Act, 1955, and state one statutory ground for each.', options: [
                { text: 'Void marriage: No legal existence from inception (void ab initio)', outcome: 'Void marriage: No legal existence from inception (void ab initio); no decree needed but declaratory.' },
                { text: 'Special Marriage Act, 1954 applies only to inter-religion marriages', outcome: 'Not quite — Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually.', reveals: 'special-marriage-act' },
                { text: 'secular law', outcome: 'Not quite — Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually.', reveals: 'special-marriage-act' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_12_004', title: 'Institutional Framework — Marriage and Divorce — Processes and Procedures',
          caseStudy: { intro: 'Start with this scenario: "Priya (Hindu) and Rahul (Christian) married under the Special Marriage Act, 1954 in Delhi. They now live in Bangalore.',
            decisions: [{ prompt: 'What is the statutory provision that determines the territorial jurisdiction for filing a divorce petition under the Special Marriage Act.', options: [
                { text: 'Section 27 of the Special Marriage Act, 1954 provides jurisdiction where: (a) marriage', outcome: 'Section 27 of the Special Marriage Act, 1954 provides jurisdiction where: (a) marriage was.' },
                { text: 'jurisdiction', outcome: 'Not quite — Students believe "Family Court" is a separate legal system with its own evidence and procedure.', reveals: 'family-court-is-a-separate' },
                { text: 'limitation/bar', outcome: 'Not quite — Students believe "Family Court" is a separate legal system with its own evidence and procedure.', reveals: 'family-court-is-a-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_12_005', title: 'Institutional Framework — Marriage and Divorce — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a relatable scenario: "Your cousin, a 22-year-old Hindu woman, wants to marry her 20-year-old boyfriend.',
            decisions: [{ prompt: 'Under the Hindu Marriage Act, 1955, if a man marries a second wife while his first wife is alive and the first marriage has not been.', options: [
                { text: 'The second marriage is **void** under Section 11 of the Hindu Marriage Act, 1955', outcome: 'The second marriage is **void** under Section 11 of the Hindu Marriage Act, 1955, because bigamy.' },
                { text: 'voidable', outcome: 'Not quite — Students believe that **"mutual consent divorce under Section 13B, Hindu Marriage Act requires.', reveals: 'mutual-consent-divorce-under-section' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_12_005', title: 'Institutional Framework — Marriage and Divorce — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a relatable scenario: "Your cousin, a 22-year-old Hindu woman, wants to marry her 20-year-old boyfriend.',
            decisions: [{ prompt: 'Under the Hindu Marriage Act, 1955, if a man marries a second wife while his first wife is alive and the first marriage has not been.', options: [
                { text: 'The second marriage is **void** under Section 11 of the Hindu Marriage Act, 1955', outcome: 'The second marriage is **void** under Section 11 of the Hindu Marriage Act, 1955, because bigamy.' },
                { text: 'voidable', outcome: 'Not quite — Students believe that **"mutual consent divorce under Section 13B, Hindu Marriage Act requires.', reveals: 'mutual-consent-divorce-under-section' }
            ] }] } },
        { type: 'build', nodeId: 'c11_leg_cbse_12_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Determine marriage validity — Section 11 HMA: marriage void.', 'Analyze Priya\'s position — "Void marriage" under Section.', 'Analyze Sunita\'s position — First wife, valid marriage.', 'Criminal liability — Rahul commits bigamy under Section 494.', 'Identify the governing law — Hindu Marriage Act, 1955.'], answer: 'Identify the governing law — Hindu Marriage Act, 1955. Determine marriage validity — Section 11 HMA: marriage void. Analyze Sunita\'s position — First wife, valid marriage. Analyze Priya\'s position — "Void marriage" under Section. Criminal liability — Rahul commits bigamy under Section 494.' } },
        { type: 'case', nodeId: 'c11_leg_cbse_12_006', title: 'You made it',
          caseStudy: { intro: 'You finished Institutional Framework — Marriage and Divorce — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_001', difficulty: 'standard',
          question: 'The institutional framework of marriage and divorce in India comprises.',
          hint: 'Review Chapter 2 (Rights in the Indian Constitution) of Class 11 Political Science NCERT.',
          misconception: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular.',
          parts: [
                { id: 'a', prompt: 'Define \'void marriage\' and \'voidable marriage\' under the Hindu Marriage Act, 1955, and state one statutory ground for each.', answer: 'Void marriage: No legal existence from inception (void ab initio)',
                  options: ['Void marriage: No legal existence from inception (void ab initio)', 'Special Marriage Act, 1954 applies only to inter-religion marriages', 'secular law', 'inter-religion law'],
                  hint: 'Review Chapter 2 (Rights in the Indian Constitution) of Class 11 Political Science NCERT — focus.',
                  misconception: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular civil marriage law.' },
                { id: 'b', prompt: 'Explain why a Muslim marriage with a fifth wife is \'irregular (Fasid)\' not \'void (Batil)\', and how it can be regularized.', answer: 'Under Sunni Muslim law, marriage with fifth wife is Fasid (irregular)',
                  options: ['Under Sunni Muslim law, marriage with fifth wife is Fasid (irregular)', 'curable defect', 'Special Marriage Act, 1954 applies only to inter-religion marriages', 'secular law'],
                  hint: 'Review Chapter 2 (Rights in the Indian Constitution) of Class 11 Political Science NCERT — focus.',
                  misconception: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular civil marriage law.' },
                { id: 'c', prompt: 'A Hindu husband files for divorce on grounds of wife\'s adultery. Wife counter-claims husband\'s cruelty.', answer: 'Fault theory: Each must prove other\'s matrimonial offence (adultery/cruelty)',
                  options: ['Fault theory: Each must prove other\'s matrimonial offence (adultery/cruelty)', 'Special Marriage Act, 1954 applies only to inter-religion marriages', 'secular law', 'inter-religion law'],
                  hint: 'Review Chapter 2 (Rights in the Indian Constitution) of Class 11 Political Science NCERT — focus.',
                  misconception: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular civil marriage law.' }
          ],
            remediations: { 'special-marriage-act': { steps: ['Clarify SMA\'s scope using Section 2 — "any two persons" who are Indian nationals, not "persons of different religions."', 'Show SMA marriage certificate vs Hindu marriage certificate — both valid, different governing statutes.', 'Walk through a scenario: Hindu couple marries under SMA to avoid sapinda prohibition (e.g., second cousins).', 'Contrast with Foreign Marriage Act, 1969 (for Indians abroad) to reinforce territorial vs personal law distinction.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular.',
          parts: [
                { id: 'a', prompt: 'Draft a comparative framework (table or flowchart) showing how a Hindu woman, Muslim woman, Christian woman, and Parsi woman would EACH seek maintenance: (a).', answer: 'Expected framework: Hindu',
                  options: ['Expected framework: Hindu', 'Special Marriage Act, 1954 applies only to inter-religion marriages', 'secular law', 'inter-religion law'],
                  hint: 'Review Chapter 2 (Rights in the Indian Constitution) of Class 11 Political Science NCERT — focus.',
                  misconception: 'Students believe "Special Marriage Act, 1954 applies only to inter-religion marriages." Actually, SMA is a secular civil marriage law.' }
          ],
            remediations: { 'special-marriage-act': { steps: ['Clarify SMA\'s scope using Section 2 — "any two persons" who are Indian nationals, not "persons of different religions."', 'Show SMA marriage certificate vs Hindu marriage certificate — both valid, different governing statutes.', 'Walk through a scenario: Hindu couple marries under SMA to avoid sapinda prohibition (e.g., second cousins).', 'Contrast with Foreign Marriage Act, 1969 (for Indians abroad) to reinforce territorial vs personal law distinction.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_002', difficulty: 'standard',
          question: 'Marriage and divorce in India are governed by personal laws based on religion.',
          hint: 'Review c11_leg_cbse_12_001 for the historical evolution of personal laws from ancient.',
          misconception: 'Students believe "Muslim law allows instant triple talaq (Talaq-e-Biddat) as a valid divorce method" — this was the law.',
          parts: [
                { id: 'a', prompt: 'Compare the "fault theory" and "irretrievable breakdown theory" of divorce. Why did the Supreme Court in Naveen Kohli v.', answer: 'Fault theory requires a guilty party (adultery, cruelty, desertion)',
                  options: ['Fault theory requires a guilty party (adultery, cruelty, desertion)', 'punishing fault', 'recognizing reality'],
                  hint: 'Review c11_leg_cbse_12_001 for the historical evolution of personal laws from ancient texts.',
                  misconception: 'Students believe "Muslim law allows instant triple talaq (Talaq-e-Biddat) as a valid divorce method" — this was the law until 2019, but the.' }
          ],
            remediations: { 'muslim-law-allows-instant-triple': { steps: ['Show the 2019 Act\'s text — Section 3: "Any pronouncement of talaq by a Muslim husband upon his wife...', 'Contrast with Talaq-e-Ahsan/Hasan which remain valid — use a timeline: Pre-2017 (Shayara Bano) → 2017 SC strikes down.', 'Give a scenario: "Husband sends \'talaq talaq talaq\' via WhatsApp in 2024. Wife files FIR.', 'Have student explain why this isn\'t "divorce" but a crime.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_003', difficulty: 'standard',
          question: '**Institutional Framework — Marriage and Divorce (Landmark Cases and.',
          hint: 'If stuck, review the **comparative table of marriage validity conditions** (age.',
          misconception: '**"Void and voidable marriage are the same — both mean the marriage can be cancelled."** Students memorize the grounds.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Institutional Framework',
                  options: ['**Institutional Framework', 'The institutional framework of marriage and divorce in India comprises a pluralistic', 'Marriage and divorce in India are governed by personal laws based on religion (Hindu,', '"Processes and Procedures" in Marriage and Divorce refers to the codified procedural'],
                  hint: 'If stuck, review the **comparative table of marriage validity conditions** (age, monogamy.',
                  misconception: '**"Void and voidable marriage are the same — both mean the marriage can be cancelled."** Students memorize the grounds but miss the.' }
          ],
            remediations: { 'void-and-voidable-marriage-are': { steps: ['** Draw a **two-column table** on the board: "VOID (Section 11)" vs. "VOIDABLE (Section 12)". **', '** Ask the student to place each ground in the correct column: (i) Bigamy, (ii) Sapinda/prohibited relationship, (iii).', '** For each, ask: "Does this marriage exist legally until a court says otherwise?" — **Void: NO (never existed).', '** Give a rapid-fire quiz: "R marries S (his sister\'s daughter).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_004', difficulty: 'standard',
          question: '"Processes and Procedures" in Marriage and Divorce refers to the codified.',
          hint: 'If stuck, review c11_leg_cbse_12_001 (Knowledge base: marriage validity, grounds for.',
          misconception: 'Students believe "Family Court" is a separate legal system with its own evidence and procedure codes.',
          parts: [
                { id: 'a', prompt: 'A wife files for divorce under Section 13(1)(ia) HMA (cruelty) in the Family Court, Delhi. The husband resides in Mumbai.', answer: 'No, the court will not return the plaint',
                  options: ['No, the court will not return the plaint', 'Family Court'],
                  hint: 'If stuck, review c11_leg_cbse_12_001 (Knowledge base: marriage validity, grounds for divorce) and.',
                  misconception: 'Students believe "Family Court" is a separate legal system with its own evidence and procedure codes.' },
                { id: 'b', prompt: 'In a mutual consent divorce under Section 13B HMA, the parties file a joint petition.', answer: 'No, she cannot proceed unilaterally',
                  options: ['No, she cannot proceed unilaterally', 'Family Court'],
                  hint: 'If stuck, review c11_leg_cbse_12_001 (Knowledge base: marriage validity, grounds for divorce) and.',
                  misconception: 'Students believe "Family Court" is a separate legal system with its own evidence and procedure codes.' }
          ],
            remediations: { 'family-court-is-a-separate': { steps: ['If the student conflates Family Court procedure with a separate code: (1) Show them Section 10 FCA: "The provisions.', '(2) Give them a side-by-side comparison: CPC Order VII (Plaint) vs Family Court Rule 3 (Petition) — highlight identical.', '(3) Assign a drafting exercise: "Draft a plaint for restitution of conjugal rights under Section 9 HMA for Family.', 'That\'s where CPC applies." This forces procedural fluency, not forum confusion.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_005', difficulty: 'standard',
          question: 'Marriage is a legally recognised union between two persons that creates mutual.',
          hint: 'Review c11_leg_cbse_12_001 (K-node) for the statutory map of personal laws and the.',
          misconception: 'Students believe that **"mutual consent divorce under Section 13B, Hindu Marriage Act requires a mandatory 6-month.',
          parts: [
                { id: 'a', prompt: 'Under the Hindu Marriage Act, 1955, if a man marries a second wife while his first wife is alive and the first marriage has not been dissolved, what is the.', answer: 'The second marriage is **void** under Section 11 of the Hindu Marriage Act, 1955',
                  options: ['The second marriage is **void** under Section 11 of the Hindu Marriage Act, 1955', 'voidable'],
                  hint: 'Review c11_leg_cbse_12_001 (K-node) for the statutory map of personal laws and the void/voidable.',
                  misconception: 'Students believe that **"mutual consent divorce under Section 13B, Hindu Marriage Act requires a mandatory 6-month cooling-off period that.' },
                { id: 'b', prompt: 'A Hindu wife files for divorce under Section 13(1)(ia) of the Hindu Marriage Act, 1955, alleging "cruelty." The husband argues she voluntarily left the.', answer: 'The court must apply the **subjective-objective test** from *V',
                  options: ['The court must apply the **subjective-objective test** from *V', 'physical violence required', 'desertion by wife bars cruelty claim'],
                  hint: 'Review c11_leg_cbse_12_001 (K-node) for the statutory map of personal laws and the void/voidable.',
                  misconception: 'Students believe that **"mutual consent divorce under Section 13B, Hindu Marriage Act requires a mandatory 6-month cooling-off period that.' }
          ],
            remediations: { 'mutual-consent-divorce-under-section': { steps: ['If a student insists the cooling-off period is mandatory: (1) Show them the *Amardeep Singh* judgment paragraph 18.', 'is not mandatory but directory." (2) Walk through the four waiver conditions with a hypothetical: "Couple separated 2.', 'Deepa* (2013) where Court *refused* waiver because parties hadn\'t settled terms.', '(4) Assign: "Write a 100-word note distinguishing \'mandatory\' vs \'directory\' statutory provisions using this example."'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_12_006', difficulty: 'standard',
          question: 'The Institutional Framework for Marriage and Divorce in India refers to the.',
          hint: 'If stuck, review **c11_leg_cbse_12_003 (Legislative Framework)** for the exact statutory.',
          misconception: '**"Void marriage = Voidable marriage = No marriage."** Students collapse the three categories (Void, Voidable.',
          parts: [
                { id: 'a', prompt: 'Explain why a Muslim marriage with a fifth wife is classified as \'Fasid\' (irregular) rather than \'Batil\' (void), and how it can be regularized.', answer: 'Muslim law permits polygamy up to four wives (Quran 4:3)',
                  options: ['Muslim law permits polygamy up to four wives (Quran 4:3)', 'irregular', '(incurable defect)'],
                  hint: 'If stuck, review **c11_leg_cbse_12_003 (Legislative Framework)** for the exact statutory sections.',
                  misconception: '**"Void marriage = Voidable marriage = No marriage."** Students collapse the three categories (Void, Voidable, Irregular/Fasid) into one.' }
          ],
            remediations: { 'void-marriage-voidable-marriage-no': { steps: ['**Create a 3x4 Matrix:** Rows = Void / Voidable / Irregular (Fasid); Columns = Hindu / Muslim / Christian / Parsi.', 'Fill each cell with: (a) Statutory Grounds, (b) Who can challenge, (c) Time Limit, (d) Effect on Maintenance/Children.', '**Trace the "Why":** For each cell, ask: "Is the defect *status-based* (bigamy, blood) → Void?', 'Or *consent/capacity-based* (fraud, impotency, age) → Voidable?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
