import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch15_p1: SimDef = {
    id: 'v3_c11_ps_ch15_p1',
    title: 'Judiciary · Part 1/2',
    subtitle: 'Distinguish a court shielded from politics from a court above the law.',
    classLevel: 11, subject: 'political_science', topic: 'Judiciary · Part 1/2',
    chapters: ['c11_ps_ch15'],
    nodeIds: ['c11_ps_cbse_15_001', 'c11_ps_cbse_15_002', 'c11_ps_cbse_15_003', 'c11_ps_cbse_15_004', 'c11_ps_cbse_15_005', 'c11_ps_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a jurist defending independence without claiming impunity', intro: 'A court that can strike down a cabinet\'s law must be unfrightened — but unfrightened is not the same as unaccountable.', goal: 'Explain judicial independence\'s limits and the collegium\'s interpretive origin.' },
    discovery: {
        question: 'Judicial independence means judges can decide cases however they like, accountable to no one — right?',
        options: ['No — independence insulates courts from political control; accountability still runs through impeachment, appeals and reasoned public judgments', 'Yes — that\'s what independence means', 'Yes — judges are above the law', 'No — judges answer to the executive'],
        answer: 'No — independence insulates courts from political control; accountability still runs through impeachment, appeals and reasoned public judgments',
        hook: 'The collegium isn\'t in the Constitution\'s text — the word is \'consultation,\' read as \'concurrence\' by the Three Judges Cases; the system was built by interpretation, not drafting.',
    },
    teaching: [
        { title: 'Why do we need an independent judiciary', text: 'An independent judiciary is a constitutional institution that interprets and applies the law free from external pressure, influence, or control by the legislature, executive, or private interests.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how \'consultation\' became \'concurrence,\' then weigh whether a self-appointing judiciary breaks checks and balances.',
        labels: ['Why do we need', 'Independence of the judiciary', 'Structure of the Indian', 'Supreme Court of India', 'Original, appellate, and advisory', 'Judicial review: Power'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_001', title: 'Why do we need an independent judiciary',
          caseStudy: { intro: 'Imagine a cricket match where the umpire is appointed by one team\'s captain and can be fired by that captain mid-game — would you trust the decisions?',
            decisions: [{ prompt: 'Which constitutional article explicitly directs the State to separate the judiciary from the executive in public services?', options: [
                { text: 'Article 50 (Directive Principle of State Policy) directs the State to take steps to', outcome: 'Article 50 (Directive Principle of State Policy) directs the State to take steps to separate the.' },
                { text: 'above the law', outcome: 'Not quite — Students often think judicial independence means judges are "above the law" or "unaccountable,".', reveals: 'judicial-independence-means-judges-are' },
                { text: 'unaccountable', outcome: 'Not quite — Students often think judicial independence means judges are "above the law" or "unaccountable,".', reveals: 'judicial-independence-means-judges-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_002', title: 'Independence of the judiciary: Appointment and tenure safeguards',
          caseStudy: { intro: 'Imagine you read a news report where a minister publicly criticizes a High Court judge for a verdict against the government, and rumors suggest the judge might.',
            decisions: [{ prompt: 'Which constitutional article prescribes the appointment of Supreme Court judges and what is the role of the Chief Justice of India in that.', options: [
                { text: 'Article 124(2) states that the President appoints Supreme Court judges after consultation', outcome: 'Article 124(2) states that the President appoints Supreme Court judges after consultation with such.' },
                { text: 'the Prime Minister appoints or that CJI has no role', outcome: 'Not quite — Students often think the President (on the advice of the Council of Ministers) has unilateral power.', reveals: 'the-president-on-the-advice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_004', title: 'Supreme Court of India: Composition and jurisdiction',
          caseStudy: { intro: 'Imagine you read a news headline: "Supreme Court agrees to hear Delhi government\'s plea against Centre\'s control over services." How do you know which bench.',
            decisions: [{ prompt: 'What is the maximum sanctioned strength of the Supreme Court of India including the Chief Justice of India, and under which constitutional.', options: [
                { text: 'The maximum sanctioned strength is 34 (1 CJI + 33 other judges), determined by the', outcome: 'The maximum sanctioned strength is 34 (1 CJI + 33 other judges), determined by the Supreme Court.' },
                { text: 'original jurisdiction', outcome: 'Not quite — Students often believe the Supreme Court can hear ANY case of national importance under its.', reveals: 'the-supreme-court-can-hear' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_005', title: 'Original, appellate, and advisory jurisdiction of the Supreme Court',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "Supreme Court to hear Delhi-Centre dispute on control of services" — this is original jurisdiction.',
            decisions: [{ prompt: 'Which constitutional article exclusively governs the Supreme Court\'s original jurisdiction, and what is the ONE type of dispute it CANNOT.', options: [
                { text: 'Article 131 governs original jurisdiction', outcome: 'Article 131 governs original jurisdiction. It cannot hear disputes arising from pre-Constitution.' },
                { text: 'any dispute involving the Centre', outcome: 'Not quite — Students conflate Original Jurisdiction (Article 131) with Writ Jurisdiction (Article 32), thinking.', reveals: 'students-conflate-original-jurisdiction-article' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_006', title: 'Judicial review: Power to examine constitutionality of laws',
          caseStudy: { intro: 'Imagine a state government passes a law banning all social media for students under 18 to "protect mental health." A student challenges it, claiming.',
            decisions: [{ prompt: 'Which constitutional article explicitly declares that laws inconsistent with Fundamental Rights are void to the extent of inconsistency?', options: [
                { text: 'Article 13(2) of the Constitution of India', outcome: 'Article 13(2) of the Constitution of India. A wrong answer (e.g., citing Article 32 or 226) reveals.' },
                { text: 'cancel any law it dislikes', outcome: 'Not quite — Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make.', reveals: 'judicial-review-means-the-supreme' },
                { text: 'make laws', outcome: 'Not quite — Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make.', reveals: 'judicial-review-means-the-supreme' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a legal-literacy session, a student says: \'Judicial independence means judges are above the law — and anyway the President appoints judges, so the executive controls the judiciary. The collegium is written in Article 124.\'',
            decisions: [{ prompt: 'How is independence actually secured, and what does it mean?', options: [
                { text: 'Distinguish insulation from licence: independence means freedom from political control — accountability still runs through impeachment, appellate review, reasoned judgments and basic-structure limits. On appointments: the Constitution says \'consultation\' (Arts. 124, 217); the collegium primacy came from the Three Judges Cases interpreting it as concurrence — the executive\'s role is formal, and collegium isn\'t literally in the text.', outcome: 'He lands both corrections: independence is institutional protection bounded by constitutional accountability — and the appointment system is judge-made doctrine on a textual base.' },
                { text: 'Accept \'above the law\' — independence means nobody can check a judge.', outcome: 'Insulation shields judges from politics, not from law: impeachment, appeals and the basic-structure doctrine are exactly the accountability channels.', reveals: 'independence-means-unaccountable' },
                { text: 'Keep the appointment claim — the President appoints on ministerial advice, so government decides.', outcome: 'The collegium doctrine (1981–98 cases) gave the judiciary primacy in appointments — \'consultation\' read as concurrence means the formal presidential act follows judicial choice.', reveals: 'executive-controls-appointments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'Insulation isn\'t licence — the judge who can\'t be pressured also can\'t be arbitrary, because every judgment must argue itself in public.',
            decisions: [{ prompt: 'What comes next? Judiciary · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Judiciary · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_001', difficulty: 'standard',
          question: 'An independent judiciary is a constitutional institution that interprets and.',
          hint: 'Revisit Class 10 Power Sharing (c10_civ_cbse_01_004) on horizontal distribution and Class.',
          misconception: 'Students often think judicial independence means judges are "above the law" or "unaccountable," citing instances where.',
          parts: [
                { id: 'a', prompt: 'A state government passes a law restricting protests near legislative assemblies. The High Court strikes it down citing Article 19(1)(a).', answer: 'Financial autonomy is threatened',
                  options: ['Financial autonomy is threatened', 'freedom of speech', 'above the law', 'unaccountable'],
                  hint: 'Revisit Class 10 Power Sharing (c10_civ_cbse_01_004) on horizontal distribution and Class 8.',
                  misconception: 'Students often think judicial independence means judges are "above the law" or "unaccountable," citing instances where courts seem.' }
          ],
            remediations: { 'judicial-independence-means-judges-are': { steps: ['Have the student read Article 124(4) and 217(1)(b) (impeachment) and Article 129/215 (contempt) side-by-side with.', 'Ask: "If judges were unaccountable, why does the Constitution provide a removal process requiring proven.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_002', difficulty: 'standard',
          question: 'Judicial independence in India is constitutionally secured through specific.',
          hint: 'Revisit c11_ps_cbse_15_001 (Why do we need an independent judiciary) and c8_civ_ch2_12.',
          misconception: 'Students often think the President (on the advice of the Council of Ministers) has unilateral power to appoint and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Judicial independence in India is constitutionally secured through specific appointment',
                  options: ['Judicial independence in India is constitutionally secured through specific appointment', 'An independent judiciary is a constitutional institution that interprets and applies the', 'The Indian judiciary is a single integrated hierarchical system established under Part V', 'The Supreme Court of India is the apex judicial body established under Article 124 of the'],
                  hint: 'Revisit c11_ps_cbse_15_001 (Why do we need an independent judiciary) and c8_civ_ch2_12 (Separation.',
                  misconception: 'Students often think the President (on the advice of the Council of Ministers) has unilateral power to appoint and transfer judges, and.' }
          ],
            remediations: { 'the-president-on-the-advice': { steps: ['If the student holds this misconception, have them read the exact text of Article 124(2) and Article 217(1) noting the.', 'Use a concrete example: the 2014 NJAC Act attempted to include the Law Minister and two eminent persons; the Court.', 'This shows the evolution from constitutional text to judicial interpretation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_003', difficulty: 'standard',
          question: 'The Indian judiciary is a single integrated hierarchical system established.',
          hint: 'If stuck, revisit c11_ps_cbse_15_001 (Why do we need an independent judiciary) and.',
          misconception: 'Students often believe that High Courts are administratively subordinate to the Supreme Court (like lower offices to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian judiciary is a single integrated hierarchical system established under Part V',
                  options: ['The Indian judiciary is a single integrated hierarchical system established under Part V', 'An independent judiciary is a constitutional institution that interprets and applies the', 'Judicial independence in India is constitutionally secured through specific appointment', 'The Supreme Court of India is the apex judicial body established under Article 124 of the'],
                  hint: 'If stuck, revisit c11_ps_cbse_15_001 (Why do we need an independent judiciary) and c8_civ_ch3_5/6/7.',
                  misconception: 'Students often believe that High Courts are administratively subordinate to the Supreme Court (like lower offices to a headquarters) and.' }
          ],
            remediations: { 'high-courts-are-administratively-subordinate': { steps: ['Read Article 214 ("There shall be a High Court for each State") and Article 141 ("Law declared by Supreme Court binding.', 'Note that Article 227 gives High Courts superintendence over *subordinate courts*, not the Supreme Court over High.', 'Watch a 5-minute video of a Supreme Court hearing where the bench says "We are not an administrative superior" (e.g.', 'Rewrite the hierarchy chart labeling only *judicial* links (appeal, precedent) and *administrative* links (appointment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_004', difficulty: 'standard',
          question: 'The Supreme Court of India is the apex judicial body established under Article.',
          hint: 'If stuck, review node c11_ps_cbse_15_003 (Structure of Indian judiciary) and Class 8 node.',
          misconception: 'Students often believe the Supreme Court can hear ANY case of national importance under its "original jurisdiction".',
          parts: [
                { id: 'a', prompt: 'The President of India seeks the Supreme Court\'s opinion on whether a proposed legislation on "uniform civil code" would violate Fundamental Rights.', answer: 'The Supreme Court CAN hear the challenge',
                  options: ['The Supreme Court CAN hear the challenge', 'original jurisdiction'],
                  hint: 'If stuck, review node c11_ps_cbse_15_003 (Structure of Indian judiciary) and Class 8 node.',
                  misconception: 'Students often believe the Supreme Court can hear ANY case of national importance under its "original jurisdiction" because it is the.' }
          ],
            remediations: { 'the-supreme-court-can-hear': { steps: ['Re-read Article 131 text — list the three categories of disputes it covers.', 'Take 5 recent Supreme Court cases (e.g., farm laws, Article 370, Cauvery, Delhi vs Centre, same-sex marriage) and.', 'Create a 2x2 matrix: rows = Original/Appellate/Advisory/Writ; columns = Parties involved (State vs State, Citizen.', 'Verify with the NCERT textbook Chapter 15, Table 6.1 (Jurisdiction of Supreme Court).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Supreme Court can hear ANY case of national importance under its "original jurisdiction".',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "The Supreme Court\'s writ jurisdiction under Article 32 makes it a \'court of first instance\' for Fundamental Rights violations, but this.', answer: 'The argument is partially valid but constitutionally inaccurate',
                  options: ['The argument is partially valid but constitutionally inaccurate', 'original jurisdiction'],
                  hint: 'If stuck, review node c11_ps_cbse_15_003 (Structure of Indian judiciary) and Class 8 node.',
                  misconception: 'Students often believe the Supreme Court can hear ANY case of national importance under its "original jurisdiction" because it is the.' }
          ],
            remediations: { 'the-supreme-court-can-hear': { steps: ['Re-read Article 131 text — list the three categories of disputes it covers.', 'Take 5 recent Supreme Court cases (e.g., farm laws, Article 370, Cauvery, Delhi vs Centre, same-sex marriage) and.', 'Create a 2x2 matrix: rows = Original/Appellate/Advisory/Writ; columns = Parties involved (State vs State, Citizen.', 'Verify with the NCERT textbook Chapter 15, Table 6.1 (Jurisdiction of Supreme Court).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_005', difficulty: 'standard',
          question: 'The Supreme Court of India exercises three distinct types of jurisdiction.',
          hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) to recall Union/State/Concurrent.',
          misconception: 'Students conflate Original Jurisdiction (Article 131) with Writ Jurisdiction (Article 32), thinking any fundamental.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article exclusively governs the Supreme Court\'s original jurisdiction, and what is the ONE type of dispute it CANNOT hear under this.', answer: 'Article 131 governs original jurisdiction',
                  options: ['Article 131 governs original jurisdiction', 'any dispute involving the Centre'],
                  hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) to recall Union/State/Concurrent Lists, and.',
                  misconception: 'Students conflate Original Jurisdiction (Article 131) with Writ Jurisdiction (Article 32), thinking any fundamental rights violation.' }
          ],
            remediations: { 'students-conflate-original-jurisdiction-article': { steps: ['Re-read Article 131 text — note the parties: "Government of India and one or more States" or "two or more States."', 'Re-read Article 32 text — note the parties: "any person" vs "the State" (defined in Article 12).', 'Take a past board question (e.g., "A citizen challenges a State law violating Article 21.', 'Create a 2-column table: "Article 131 disputes" vs "Article 32 disputes" with 3 examples each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_15_006', difficulty: 'standard',
          question: 'Judicial review is the power of the Supreme Court (Article 32, 136, 142) and.',
          hint: 'Revisit Article 13(2) text and the Kesavananda Bharati (1973) 7-6 majority holding — the.',
          misconception: 'Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make laws." In reality.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article explicitly declares that laws inconsistent with Fundamental Rights are void to the extent of inconsistency?', answer: 'Article 13(2) of the Constitution of India',
                  options: ['Article 13(2) of the Constitution of India', 'cancel any law it dislikes', 'make laws', 'unwise'],
                  hint: 'Revisit Article 13(2) text and the Kesavananda Bharati (1973) 7-6 majority holding — the "basic.',
                  misconception: 'Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make laws." In reality, courts *only*.' },
                { id: 'b', prompt: 'Why can the Supreme Court strike down a constitutional amendment passed by Parliament under Article 368, even though Article 368 grants Parliament constituent.', answer: 'Because the "basic structure doctrine" (Kesavananda Bharati, 1973) holds that',
                  options: ['Because the "basic structure doctrine" (Kesavananda Bharati, 1973) holds that', 'Supreme Court has no power over amendments', 'cancel any law it dislikes', 'make laws'],
                  hint: 'Revisit Article 13(2) text and the Kesavananda Bharati (1973) 7-6 majority holding — the "basic.',
                  misconception: 'Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make laws." In reality, courts *only*.' },
                { id: 'c', prompt: 'A Parliament enacts a law placing a 95% tax on newspaper ink, effectively making newspapers unaffordable.', answer: 'The law would be struck down',
                  options: ['The law would be struck down', 'tax power', 'cancel any law it dislikes', 'make laws'],
                  hint: 'Revisit Article 13(2) text and the Kesavananda Bharati (1973) 7-6 majority holding — the "basic.',
                  misconception: 'Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make laws." In reality, courts *only*.' },
                { id: 'd', prompt: 'Compare the scope of judicial review in India (Articles 32, 226) with the US model (Marbury v. Madison).', answer: 'Difference 1: US review is limited to "cases and controversies" (Article III)',
                  options: ['Difference 1: US review is limited to "cases and controversies" (Article III)', 'both are identical', 'cancel any law it dislikes', 'make laws'],
                  hint: 'Revisit Article 13(2) text and the Kesavananda Bharati (1973) 7-6 majority holding — the "basic.',
                  misconception: 'Students think judicial review means the Supreme Court can "cancel any law it dislikes" or "make laws." In reality, courts *only*.' }
          ],
            remediations: { 'judicial-review-means-the-supreme': { steps: ['If a student says "courts can cancel any law," do this 3-step fix: (1) Show Article 13(2) text: "The State shall not.', '(2) Give a concrete example: A law banning *all* protests (violates Art.', 'a law requiring protest permits (valid if reasonable).', 'Ask: "Which would the Court strike down?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
