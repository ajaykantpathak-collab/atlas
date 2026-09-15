import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch15_p2: SimDef = {
    id: 'v3_c11_ps_ch15_p2',
    title: 'Judiciary · Part 2/2',
    subtitle: 'Distinguish a court shielded from politics from a court above the law.',
    classLevel: 11, subject: 'political_science', topic: 'Judiciary · Part 2/2',
    chapters: ['c11_ps_ch15'],
    nodeIds: ['c11_ps_cbse_15_007', 'c11_ps_cbse_15_008', 'c11_ps_cbse_15_009', 'c11_ps_cbse_15_010', 'c11_ps_cbse_15_011', 'c11_ps_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a jurist defending independence without claiming impunity', intro: 'A court that can strike down a cabinet\'s law must be unfrightened — but unfrightened is not the same as unaccountable.', goal: 'Explain judicial independence\'s limits and the collegium\'s interpretive origin.' },
    discovery: {
        question: 'Judicial independence means judges can decide cases however they like, accountable to no one — right?',
        options: ['No — independence insulates courts from political control; accountability still runs through impeachment, appeals and reasoned public judgments', 'Yes — that\'s what independence means', 'Yes — judges are above the law', 'No — judges answer to the executive'],
        answer: 'No — independence insulates courts from political control; accountability still runs through impeachment, appeals and reasoned public judgments',
        hook: 'The collegium isn\'t in the Constitution\'s text — the word is \'consultation,\' read as \'concurrence\' by the Three Judges Cases; the system was built by interpretation, not drafting.',
    },
    teaching: [
        { title: 'Writ jurisdiction: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto', text: 'Writ jurisdiction refers to the power of the Supreme Court under Article 32 and High Courts under Article 226 of the Indian Constitution to issue five specific prerogative writs—Habeas Corpus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_15_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how \'consultation\' became \'concurrence,\' then weigh whether a self-appointing judiciary breaks checks and balances.',
        labels: ['Writ jurisdiction: Habeas Corpus,', 'Public Interest Litigation (PIL)', 'Judicial activism vs judicial', 'Appointment of judges: Collegium', 'Relationship between judiciary, legislature,', 'High Courts: Jurisdiction'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_008', title: 'Public Interest Litigation (PIL): Expanding access to justice',
          caseStudy: { intro: 'Imagine you read a newspaper report about children working in hazardous conditions in a firecracker factory in Sivakasi, Tamil Nadu.',
            decisions: [{ prompt: 'What is the traditional rule of *locus standi* in Indian law, and how does Public Interest Litigation modify this rule?', options: [
                { text: 'The traditional rule of *locus standi* requires that only a person whose own legal right', outcome: 'The traditional rule of *locus standi* requires that only a person whose own legal right has been.' },
                { text: 'PIL allows anyone to file any case', outcome: 'Not quite — Students often believe PIL is a *separate type of case* or a *special law* enacted by Parliament.', reveals: 'pil-is-a-separate-type' },
                { text: 'PIL was introduced by the 42nd Amendment', outcome: 'Not quite — Students often believe PIL is a *separate type of case* or a *special law* enacted by Parliament.', reveals: 'pil-is-a-separate-type' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_009', title: 'Judicial activism vs judicial restraint: The debate',
          caseStudy: { intro: 'Imagine reading a newspaper headline: "Supreme Court bans firecrackers in Delhi-NCR to curb pollution" — this is the judiciary making a policy decision usually.',
            decisions: [{ prompt: 'Define judicial activism and judicial restraint in one sentence each, citing the specific constitutional articles that enable judicial.', options: [
                { text: 'Judicial activism is the court\'s proactive interpretation of the Constitution to protect', outcome: 'Judicial activism is the court\'s proactive interpretation of the Constitution to protect rights and.' },
                { text: 'activism means judges making laws', outcome: 'Not quite — Students often think "judicial activism = judges making laws" and "judicial restraint = judges.', reveals: 'judicial-activism-judges-making-laws' },
                { text: 'judicial activism = judges making laws', outcome: 'Not quite — Students often think "judicial activism = judges making laws" and "judicial restraint = judges.', reveals: 'judicial-activism-judges-making-laws' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_010', title: 'Appointment of judges: Collegium system and controversies',
          caseStudy: { intro: 'Imagine you read a news headline: "Supreme Court Collegium recommends 5 new judges; government sits on files for months." You wonder: who really decides who.',
            decisions: [{ prompt: 'Which constitutional articles govern the appointment of Supreme Court and High Court judges respectively, and what phrase in these articles.', options: [
                { text: 'Article 124(2) for Supreme Court and Article 217(1) for High Courts', outcome: 'Article 124(2) for Supreme Court and Article 217(1) for High Courts; the phrase "after consultation.' },
                { text: 'the Collegium system is explicitly written in the Constitution', outcome: 'Not quite — Students often believe the Collegium system is explicitly written in the Constitution.', reveals: 'the-collegium-system-is-explicitly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_012', title: 'High Courts: Jurisdiction and role in the federal structure',
          caseStudy: { intro: 'Imagine you live in Maharashtra and the State government passes a law restricting street vending in Mumbai that you believe violates your fundamental right.',
            decisions: [{ prompt: 'Under which Article of the Constitution is a High Court established for each State, and what is the constitutional status of a High Court.', options: [
                { text: 'Article 214 establishes a High Court for each State (or common High Court for two or more', outcome: 'Article 214 establishes a High Court for each State (or common High Court for two or more States.' },
                { text: 'court of record', outcome: 'Not quite — Students often believe High Courts are "subordinate" to the Supreme Court in an administrative.', reveals: 'high-courts-are-subordinate-to' },
                { text: 'subordinate', outcome: 'Not quite — Students often believe High Courts are "subordinate" to the Supreme Court in an administrative.', reveals: 'high-courts-are-subordinate-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a legal-literacy session, a student says: \'Judicial independence means judges are above the law — and anyway the President appoints judges, so the executive controls the judiciary. The collegium is written in Article 124.\'',
            decisions: [{ prompt: 'How is independence actually secured, and what does it mean?', options: [
                { text: 'Distinguish insulation from licence: independence means freedom from political control — accountability still runs through impeachment, appellate review, reasoned judgments and basic-structure limits. On appointments: the Constitution says \'consultation\' (Arts. 124, 217); the collegium primacy came from the Three Judges Cases interpreting it as concurrence — the executive\'s role is formal, and collegium isn\'t literally in the text.', outcome: 'He lands both corrections: independence is institutional protection bounded by constitutional accountability — and the appointment system is judge-made doctrine on a textual base.' },
                { text: 'Accept \'above the law\' — independence means nobody can check a judge.', outcome: 'Insulation shields judges from politics, not from law: impeachment, appeals and the basic-structure doctrine are exactly the accountability channels.', reveals: 'independence-means-unaccountable' },
                { text: 'Keep the appointment claim — the President appoints on ministerial advice, so government decides.', outcome: 'The collegium doctrine (1981–98 cases) gave the judiciary primacy in appointments — \'consultation\' read as concurrence means the formal presidential act follows judicial choice.', reveals: 'executive-controls-appointments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_012', title: 'You made it',
          caseStudy: { intro: 'Insulation isn\'t licence — the judge who can\'t be pressured also can\'t be arbitrary, because every judgment must argue itself in public.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_007', difficulty: 'standard',
          question: 'Writ jurisdiction refers to the power of the Supreme Court under Article 32 and.',
          hint: 'If stuck, immediately revisit **Article 32 vs. Article 226 comparison** (scope, standing.',
          misconception: 'Students frequently believe **Mandamus** ("we command") can be issued against *any* authority (including the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writ jurisdiction refers to the power of the Supreme Court under Article 32 and High',
                  options: ['Writ jurisdiction refers to the power of the Supreme Court under Article 32 and High', 'An independent judiciary is a constitutional institution that interprets and applies the', 'Judicial independence in India is constitutionally secured through specific appointment', 'The Indian judiciary is a single integrated hierarchical system established under Part V'],
                  hint: 'If stuck, immediately revisit **Article 32 vs. Article 226 comparison** (scope, standing.',
                  misconception: 'Students frequently believe **Mandamus** ("we command") can be issued against *any* authority (including the Legislature, Judiciary,.' }
          ],
            remediations: { 'students-frequently-believe-mandamus-we': { steps: ['**Re-read Articles 32 & 226** side-by-side; highlight "Fundamental Rights" (Art.', '**Create a 5x3 table**: Writ | Meaning | Against Whom | When Issued | Key Limitation.', 'Fill using NCERT Chapter 15 (Judiciary) and landmark cases (e.g., *Rashid Ahmad* for Certiorari, *Gujarat v.', '**Practice classification**: Take 5 news headlines (e.g., "Detention under PSA", "Municipality refuses license".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe **Mandamus** ("we command") can be issued against *any* authority (including the.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "The writ of Quo Warranto is the most effective tool for ensuring accountability in public appointments because it can.', answer: 'The statement is **partially correct but overstated**',
                  options: ['The statement is **partially correct but overstated**', 'any citizen can file'],
                  hint: 'If stuck, immediately revisit **Article 32 vs. Article 226 comparison** (scope, standing.',
                  misconception: 'Students frequently believe **Mandamus** ("we command") can be issued against *any* authority (including the Legislature, Judiciary,.' }
          ],
            remediations: { 'students-frequently-believe-mandamus-we': { steps: ['**Re-read Articles 32 & 226** side-by-side; highlight "Fundamental Rights" (Art.', '**Create a 5x3 table**: Writ | Meaning | Against Whom | When Issued | Key Limitation.', 'Fill using NCERT Chapter 15 (Judiciary) and landmark cases (e.g., *Rashid Ahmad* for Certiorari, *Gujarat v.', '**Practice classification**: Take 5 news headlines (e.g., "Detention under PSA", "Municipality refuses license".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_008', difficulty: 'standard',
          question: 'Public Interest Litigation (PIL) is a judicial innovation in Indian.',
          hint: 'Revisit c11_ps_cbse_15_007 (Writ jurisdiction) and focus on the difference between "who.',
          misconception: 'Students often believe PIL is a *separate type of case* or a *special law* enacted by Parliament.',
          parts: [
                { id: 'a', prompt: 'A journalist writes a letter to the Chief Justice of India highlighting that undertrial prisoners in Tihar Jail have been detained for periods longer than the.', answer: 'This illustrates *Hussainara Khatoon v',
                  options: ['This illustrates *Hussainara Khatoon v', 'PIL was introduced by the 42nd Amendment', 'PIL is a *separate type of case* or a *special law* enacted by Parliament'],
                  hint: 'Revisit c11_ps_cbse_15_007 (Writ jurisdiction) and focus on the difference between "who can file".',
                  misconception: 'Students often believe PIL is a *separate type of case* or a *special law* enacted by Parliament.' },
                { id: 'b', prompt: 'Compare the scope of PIL under Article 32 (Supreme Court) and Article 226 (High Courts). Why is Article 226 considered wider for PIL purposes?', answer: 'Article 32 empowers the Supreme Court to issue writs *only* for enforcement of',
                  options: ['Article 32 empowers the Supreme Court to issue writs *only* for enforcement of', 'for any other purpose', 'PIL was introduced by the 42nd Amendment', 'PIL is a *separate type of case* or a *special law* enacted by Parliament'],
                  hint: 'Revisit c11_ps_cbse_15_007 (Writ jurisdiction) and focus on the difference between "who can file".',
                  misconception: 'Students often believe PIL is a *separate type of case* or a *special law* enacted by Parliament.' }
          ],
            remediations: { 'pil-is-a-separate-type': { steps: ['If a student conflates PIL with a statutory law or cannot distinguish it from ordinary writ petitions: Step 1 — Re-read.', 'Gupta* (1981, doctrinal justification) → *Bandhua Mukti Morcha* (1984, relaxation of procedural rules).', 'Step 3 — Compare a regular writ petition (petitioner = victim, formal affidavit, court fees) vs.', 'PIL (petitioner = representative, letter allowed, no court fees, court appoints commissioner).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_009', difficulty: 'standard',
          question: 'Judicial activism refers to the proactive role of courts in interpreting the.',
          hint: 'Revisit node 006 (judicial review) and node 008 (PIL) — specifically, *how* PIL relaxes.',
          misconception: 'Students often think "judicial activism = judges making laws" and "judicial restraint = judges doing nothing.".',
          parts: [
                { id: 'a', prompt: 'The Supreme Court in *Subhash Kashinath Mahajan v. State of Maharashtra* (2018) diluted Section 18 of the SC/ST Act by mandating preliminary inquiry before.', answer: 'This is **judicial overreach** (excessive activism)',
                  options: ['This is **judicial overreach** (excessive activism)', 'it protected Article 21', 'judicial activism = judges making laws', 'judicial restraint = judges doing nothing'],
                  hint: 'Revisit node 006 (judicial review) and node 008 (PIL) — specifically, *how* PIL relaxes locus.',
                  misconception: 'Students often think "judicial activism = judges making laws" and "judicial restraint = judges doing nothing." In reality, **activism.' },
                { id: 'b', prompt: 'Compare the *Kesavananda Bharati* (1973) "basic structure" doctrine and the *NJAC* judgment (2015) striking down the 99th Amendment.', answer: '*Kesavananda Bharati* is **judicial activism**',
                  options: ['*Kesavananda Bharati* is **judicial activism**', 'judicial activism = judges making laws', 'judicial restraint = judges doing nothing', 'in Article 21 to include'],
                  hint: 'Revisit node 006 (judicial review) and node 008 (PIL) — specifically, *how* PIL relaxes locus.',
                  misconception: 'Students often think "judicial activism = judges making laws" and "judicial restraint = judges doing nothing." In reality, **activism.' }
          ],
            remediations: { 'judicial-activism-judges-making-laws': { steps: ['Re-read *Maneka Gandhi v. Union of India* (1978) — note how the Court *activistically* expanded Article 21 ("procedure.', 'Compare with *Subhash Kashinath Mahajan* (2018) where the Court *rewrote* the SC/ST Act.', 'Ask: "Did the Court interpret the Constitution or amend a statute?"', 'Use the test: **Activism interprets the Constitution; overreach amends legislation.** Practice classifying 5 recent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_010', difficulty: 'standard',
          question: 'The Collegium system is a judge-appointing-judge mechanism where the Chief.',
          hint: 'Revisit c11_ps_cbse_15_002 (Independence of judiciary: Appointment and tenure) — focus.',
          misconception: 'Students often believe the Collegium system is explicitly written in the Constitution.',
          parts: [
                { id: 'a', prompt: 'Which constitutional articles govern the appointment of Supreme Court and High Court judges respectively, and what phrase in these articles became the basis.', answer: 'Article 124(2) for Supreme Court and Article 217(1) for High Courts',
                  options: ['Article 124(2) for Supreme Court and Article 217(1) for High Courts', 'the Collegium system is explicitly written in the Constitution'],
                  hint: 'Revisit c11_ps_cbse_15_002 (Independence of judiciary: Appointment and tenure) — focus on the.',
                  misconception: 'Students often believe the Collegium system is explicitly written in the Constitution.' },
                { id: 'b', prompt: 'A vacancy arises in the Supreme Court. The Collegium (CJI + 4 senior-most judges) recommends Lawyer X.', answer: 'The President must appoint Lawyer X',
                  options: ['The President must appoint Lawyer X', 'President can still refuse', 'the Collegium system is explicitly written in the Constitution'],
                  hint: 'Revisit c11_ps_cbse_15_002 (Independence of judiciary: Appointment and tenure) — focus on the.',
                  misconception: 'Students often believe the Collegium system is explicitly written in the Constitution.' },
                { id: 'c', prompt: 'Compare the pre-1993 appointment system (executive primacy) with the post-1993 Collegium system (judicial primacy) on three dimensions: (a) role of the CJI.', answer: 'Pre-1993: CJI consulted but executive could override',
                  options: ['Pre-1993: CJI consulted but executive could override', 'the Collegium system is explicitly written in the Constitution'],
                  hint: 'Revisit c11_ps_cbse_15_002 (Independence of judiciary: Appointment and tenure) — focus on the.',
                  misconception: 'Students often believe the Collegium system is explicitly written in the Constitution.' }
          ],
            remediations: { 'the-collegium-system-is-explicitly': { steps: ['Re-read Articles 124(2) and 217(1) verbatim — note the word "consultation."', 'Create a timeline: 1950-1981 (executive primacy, S.P. Gupta case), 1993 (Second Judges Case — "consultation.', 'For each phase, write one sentence on who had final say.', 'Read the NJAC judgment summary (4:1 ratio) to see why the Court distinguished "participation" from "primacy."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_011', difficulty: 'standard',
          question: 'The relationship between the judiciary, legislature, and executive in India.',
          hint: 'Review **Class 10 Civics Chapter 1 (Power Sharing) — Horizontal Distribution of Powers**.',
          misconception: '**Misconception:** "The Supreme Court is the *most powerful* organ because it can strike down laws passed by Parliament.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The relationship between the judiciary, legislature, and executive in India is based on',
                  options: ['The relationship between the judiciary, legislature, and executive in India is based on', 'An independent judiciary is a constitutional institution that interprets and applies the', 'Judicial independence in India is constitutionally secured through specific appointment', 'The Indian judiciary is a single integrated hierarchical system established under Part V'],
                  hint: 'Review **Class 10 Civics Chapter 1 (Power Sharing) — Horizontal Distribution of Powers** and.',
                  misconception: '**Misconception:** "The Supreme Court is the *most powerful* organ because it can strike down laws passed by Parliament and orders issued.' }
          ],
            remediations: { 'misconception-the-supreme-court-is': { steps: ['** Re-read **Article 13** (laws inconsistent with fundamental rights are void) and **Article 368** (amendment power).', '** Watch a 10-min video on the **Kesavananda Bharati case** (basic structure).', '** List **5 checks each organ has on the other two** in a table.', '** Discuss with teacher: *Why did the Court strike down NJAC?* (Judicial independence = basic structure).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_012', difficulty: 'standard',
          question: 'The High Court is the highest judicial body at the State level, established.',
          hint: 'Revisit Article 226 (writ jurisdiction) and Article 227 (superintendence) in the.',
          misconception: 'Students often believe High Courts are "subordinate" to the Supreme Court in an administrative hierarchy — that the.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since the Supreme Court has writ jurisdiction under Article 32 for fundamental rights, High Court writ jurisdiction under Article 226.', answer: 'Article 32 is a fundamental right itself (right to constitutional remedies)',
                  options: ['Article 32 is a fundamental right itself (right to constitutional remedies)', 'subordinate', 'both are identical, or that Article 226 is only for fundamental rights'],
                  hint: 'Revisit Article 226 (writ jurisdiction) and Article 227 (superintendence) in the Constitution.',
                  misconception: 'Students often believe High Courts are "subordinate" to the Supreme Court in an administrative hierarchy — that the Supreme Court can.' },
                { id: 'b', prompt: 'The State of Karnataka passes a law regulating agricultural produce marketing.', answer: 'Yes, the Karnataka High Court has jurisdiction',
                  options: ['Yes, the Karnataka High Court has jurisdiction', 'subordinate'],
                  hint: 'Revisit Article 226 (writ jurisdiction) and Article 227 (superintendence) in the Constitution.',
                  misconception: 'Students often believe High Courts are "subordinate" to the Supreme Court in an administrative hierarchy — that the Supreme Court can.' },
                { id: 'c', prompt: 'Compare the superintendence power of the High Court under Article 227 with the appellate jurisdiction under Articles 225 and 226.', answer: 'Article 227 (superintendence) is **administrative and judicial**',
                  options: ['Article 227 (superintendence) is **administrative and judicial**', 'dual polity', 'subordinate'],
                  hint: 'Revisit Article 226 (writ jurisdiction) and Article 227 (superintendence) in the Constitution.',
                  misconception: 'Students often believe High Courts are "subordinate" to the Supreme Court in an administrative hierarchy — that the Supreme Court can.' }
          ],
            remediations: { 'high-courts-are-subordinate-to': { steps: ['If a student holds this misconception, walk them through Article 215 ("Every High Court shall be a court of record...").', 'Contrast with Article 131 (Supreme Court original jurisdiction — disputes between Centre and States, not *over* High.', 'Use the 1993 *Supreme Court Advocates-on-Record Association v.', 'Union of India* (Second Judges Case) which established the collegium: the CJI consults senior Supreme Court judges.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
