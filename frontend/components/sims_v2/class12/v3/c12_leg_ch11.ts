import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch11 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch11: SimDef = {
    id: 'v3_c12_leg_ch11',
    title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies)',
    subtitle: 'This node covers: the concept of quasi-judicial bodies, the six national human rights.',
    classLevel: 12, subject: 'leg', topic: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies)',
    chapters: ['c12_leg_ch11'],
    nodeIds: ['c12_leg_cbse_11_001', 'c12_leg_cbse_11_002', 'c12_leg_cbse_11_003', 'c12_leg_cbse_11_004', 'c12_leg_cbse_11_005', 'c12_leg_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real scenario: "A 14-year-old domestic worker is rescued from a Delhi home where she was unpaid.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the statutory basis for the National Human Rights Commission (NHRC) and who appoints its Chairperson?',
        options: ['The NHRC is established under the Protection of Human Rights Act, 1993', 'appointed by CJI', 'under Article 32'],
        answer: 'The NHRC is established under the Protection of Human Rights Act, 1993',
        hook: 'Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.',
    },
    teaching: [
        { title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Key Concepts and Institutions', text: 'Quasi-judicial bodies are administrative authorities (like NHRC, NCW, NCPCR) established by statute, possessing powers of a civil court (summoning, evidence, affidavits) to inquire into human rights.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_11_001', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real scenario: "A 14-year-old domestic worker is rescued from a Delhi home where she was unpaid and beaten.',
            decisions: [{ prompt: 'What is the statutory basis for the National Human Rights Commission (NHRC) and who appoints its Chairperson?', options: [
                { text: 'The NHRC is established under the Protection of Human Rights Act, 1993', outcome: 'The NHRC is established under the Protection of Human Rights Act, 1993.' },
                { text: 'appointed by CJI', outcome: 'Not quite — Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.', reveals: 'nhrc-is-a-human-rights' },
                { text: 'under Article 32', outcome: 'Not quite — Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.', reveals: 'nhrc-is-a-human-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_002', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with this: "Your neighbour, a domestic worker, tells you her employer (a government officer) hasn\'t paid her for three months and threatens her if she.',
            decisions: [{ prompt: 'What is the time limit for filing a complaint with the National Human Rights Commission (NHRC) from the date of the alleged human rights.', options: [
                { text: 'The complaint must be filed within **one year** of the occurrence of the human rights', outcome: 'The complaint must be filed within **one year** of the occurrence of the human rights violation.' },
                { text: 'no time limit', outcome: 'Not quite — Students believe **"quasi-judicial body" means "subordinate court"** — they think NHRC/NCW.', reveals: 'quasi-judicial-body-means-subordinate' },
                { text: 'three years', outcome: 'Not quite — Students believe **"quasi-judicial body" means "subordinate court"** — they think NHRC/NCW.', reveals: 'quasi-judicial-body-means-subordinate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_003', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real scenario: "A Dalit student in a government hostel is denied food for three days — the warden (a public servant) ignores complaints.',
            decisions: [{ prompt: 'What is the statutory limitation period for filing a complaint before the National Human Rights Commission (NHRC) under the Protection.', options: [
                { text: 'The complaint must be filed within **one year** from the date on', outcome: 'The complaint must be filed within **one year** from the date on which the act constituting the.' },
                { text: '3 years', outcome: 'Not quite — Students believe **"quasi-judicial body = court with lesser powers"**. This is wrong.', reveals: 'quasi-judicial-body-court-with' },
                { text: 'no limitation', outcome: 'Not quite — Students believe **"quasi-judicial body = court with lesser powers"**. This is wrong.', reveals: 'quasi-judicial-body-court-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_004', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Processes and Procedures',
          caseStudy: { intro: 'Start with a real scenario: "A 14-year-old domestic worker is rescued from a Delhi home where she was beaten and unpaid.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a complaint with the NHRC, and what happens if the complaint relates to an incident older than.', options: [
                { text: 'The complaint must be filed within one year of the alleged violation (Section 13,', outcome: 'The complaint must be filed within one year of the alleged violation (Section 13, Protection.' },
                { text: 'no time limit', outcome: 'Not quite — Students believe that *any* human rights violation (e.g., domestic violence by husband, cheating.', reveals: 'any-human-rights-violation-e' },
                { text: '3 years', outcome: 'Not quite — Students believe that *any* human rights violation (e.g., domestic violence by husband, cheating.', reveals: 'any-human-rights-violation-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_005', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a real scenario: "A Dalit woman working as a sanitation worker in a government hospital is denied protective gear and faces caste-based abuse from.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a complaint before the National Human Rights Commission (NHRC) under the Protection of Human.', options: [
                { text: 'The complaint must be filed within **one year** from the date on', outcome: 'The complaint must be filed within **one year** from the date on which the act constituting the.' },
                { text: 'no time limit', outcome: 'Not quite — **Misconception**: "Quasi-judicial bodies like NHRC/NCW are *courts* and their orders are *binding.', reveals: 'misconception-quasi-judicial-bodies-like' },
                { text: '3 years', outcome: 'Not quite — **Misconception**: "Quasi-judicial bodies like NHRC/NCW are *courts* and their orders are *binding.', reveals: 'misconception-quasi-judicial-bodies-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_006', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "A Dalit sanitation worker in a municipal corporation is denied protective gear and forced to clean sewers manually — a violation.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a complaint before the National Human Rights Commission (NHRC) under the Protection of Human.', options: [
                { text: 'The complaint must be filed within **one year** from the date on', outcome: 'The complaint must be filed within **one year** from the date on which the act constituting the.' },
                { text: 'no time limit', outcome: 'Not quite — **Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers**.', reveals: 'misconception-all-human-rights-commissions' },
                { text: '3 years', outcome: 'Not quite — **Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers**.', reveals: 'misconception-all-human-rights-commissions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_006', title: 'Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "A Dalit sanitation worker in a municipal corporation is denied protective gear and forced to clean sewers manually — a violation.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a complaint before the National Human Rights Commission (NHRC) under the Protection of Human.', options: [
                { text: 'The complaint must be filed within **one year** from the date on', outcome: 'The complaint must be filed within **one year** from the date on which the act constituting the.' },
                { text: 'no time limit', outcome: 'Not quite — **Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers**.', reveals: 'misconception-all-human-rights-commissions' },
                { text: '3 years', outcome: 'Not quite — **Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers**.', reveals: 'misconception-all-human-rights-commissions' }
            ] }] } },
        { type: 'build', nodeId: 'c12_leg_cbse_11_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Identify the correct commission — Victim is a child (16.', 'Draft complaint per NCPCR format (similar to NHRC) — Victim.', 'Identify the public servant violation — Warden (public.', 'Check jurisdictional filters — (a) Within 1 year? Yes.', 'Attach evidence — Medical report (if any), CWC order (if.'], answer: 'Identify the correct commission — Victim is a child (16. Identify the public servant violation — Warden (public. Check jurisdictional filters — (a) Within 1 year? Yes. Draft complaint per NCPCR format (similar to NHRC) — Victim. Attach evidence — Medical report (if any), CWC order (if.' } },
        { type: 'case', nodeId: 'c12_leg_cbse_11_006', title: 'You made it',
          caseStudy: { intro: 'You finished Human Rights Violations — Complaint Mechanism (Quasi-Judicial Bodies) — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_001', difficulty: 'standard',
          question: 'Quasi-judicial bodies are administrative authorities (like NHRC, NCW, NCPCR).',
          hint: 'If stuck on NHRC\'s recommendatory nature, revisit Class 11 Administrative Law.',
          misconception: 'Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.',
          parts: [
                { id: 'a', prompt: 'What is the statutory basis for the National Human Rights Commission (NHRC) and who appoints its Chairperson?', answer: 'The NHRC is established under the Protection of Human Rights Act, 1993',
                  options: ['The NHRC is established under the Protection of Human Rights Act, 1993', 'appointed by CJI', 'under Article 32', 'Human Rights Court'],
                  hint: 'If stuck on NHRC\'s recommendatory nature, revisit Class 11 Administrative Law (c11_leg_cbse_05_001).',
                  misconception: 'Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.' }
          ],
            remediations: { 'nhrc-is-a-human-rights': { steps: ['**Re-read Section 13 vs Section 18 of PHR Act**: Make a two-column table: "Inquiry Powers (Civil Court)" vs "Remedial.', '**Visit nhrc.nic.in → "Know Your Rights" → "Complaint Procedure"**: Note the 12 rejection grounds (Guideline 10).', '**Do a 15-min drill**: Take 3 news clippings (custodial death, child labour, women trafficking) — decide for each: NHRC.', 'Justify using *mandate* and *jurisdiction*.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.',
          parts: [
                { id: 'a', prompt: '"NHRC recommendations are binding on the government." Critically evaluate this statement with reference to the PHR Act, 1993 and the L. Chandra Kumar case.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'binding because NHRC has civil court powers', 'Human Rights Court', 'powers of a civil court'],
                  hint: 'If stuck on NHRC\'s recommendatory nature, revisit Class 11 Administrative Law (c11_leg_cbse_05_001).',
                  misconception: 'Students believe NHRC is a "Human Rights Court" and its orders are legally binding like a judgment.' }
          ],
            remediations: { 'nhrc-is-a-human-rights': { steps: ['**Re-read Section 13 vs Section 18 of PHR Act**: Make a two-column table: "Inquiry Powers (Civil Court)" vs "Remedial.', '**Visit nhrc.nic.in → "Know Your Rights" → "Complaint Procedure"**: Note the 12 rejection grounds (Guideline 10).', '**Do a 15-min drill**: Take 3 news clippings (custodial death, child labour, women trafficking) — decide for each: NHRC.', 'Justify using *mandate* and *jurisdiction*.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_002', difficulty: 'standard',
          question: 'Quasi-judicial bodies for human rights are statutory commissions (like NHRC.',
          hint: 'If stuck on "why can\'t NHRC enforce?", revisit **Class 11 Administrative Law.',
          misconception: 'Students believe **"quasi-judicial body" means "subordinate court"** — they think NHRC/NCW decisions are appealable.',
          parts: [
                { id: 'a', prompt: 'A woman faces sexual harassment at her workplace (a State Government office). She wants to file a complaint.', answer: 'She can approach **(1) NHRC** (violation of human rights by a public servant',
                  options: ['She can approach **(1) NHRC** (violation of human rights by a public servant', 'public servant', 'quasi-judicial body', 'subordinate court'],
                  hint: 'If stuck on "why can\'t NHRC enforce?", revisit **Class 11 Administrative Law.',
                  misconception: 'Students believe **"quasi-judicial body" means "subordinate court"** — they think NHRC/NCW decisions are appealable in High Courts like.' }
          ],
            remediations: { 'quasi-judicial-body-means-subordinate': { steps: ['Re-read the **Protection of Human Rights Act, 1993 (Sections 12, 13, 18)** and **NCPCR Act, 2005 (Sections 13, 14)**.', 'Make a **two-column table**: "Court Powers" (binding judgment, enforcement, appeal) vs.', 'Do the **In-Class Exercise** from the textbook (p. 150-151) — fill the NHRC complaint format for a real news case.', 'Re-attempt **Diagnostic Questions 2 & 5** — if still wrong, watch the NHRC\'s official YouTube video "How to file.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_003', difficulty: 'standard',
          question: 'Quasi-judicial bodies in the context of human rights are statutory commissions.',
          hint: 'If stuck on "why can\'t NHRC order compensation directly?", revisit Class 11.',
          misconception: 'Students believe **"quasi-judicial body = court with lesser powers"**. This is wrong.',
          parts: [
                { id: 'a', prompt: 'What is the statutory limitation period for filing a complaint before the National Human Rights Commission (NHRC) under the Protection of Human Rights Act.', answer: 'The complaint must be filed within **one year** from the date on',
                  options: ['The complaint must be filed within **one year** from the date on', '3 years', 'no limitation', 'quasi-judicial body = court with lesser powers'],
                  hint: 'If stuck on "why can\'t NHRC order compensation directly?", revisit Class 11 Administrative Law.',
                  misconception: 'Students believe **"quasi-judicial body = court with lesser powers"**. This is wrong.' }
          ],
            remediations: { 'quasi-judicial-body-court-with': { steps: ['If the student confuses quasi-judicial powers with judicial powers: (1) Make a two-column table: "Civil Court Powers.', '(2) Re-read NCERT Section 1.4 "Powers of the Commission" and Section 1.5 "Complaint Mechanism — Guidelines 9(vi).', '(3) Do a mini-case: "NHRC recommends compensation → State ignores → Victim files writ in HC under Art.', '226 → HC issues notice → State pays." This traces the *enforcement chain* missing in the misconception.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_004', difficulty: 'standard',
          question: 'Quasi-judicial bodies in the human rights context are statutory commissions.',
          hint: 'If stuck, revisit Class 11 Administrative Law (c11_leg_cbse_05_001, c11_leg_cbse_05_004).',
          misconception: 'Students believe that *any* human rights violation (e.g., domestic violence by husband, cheating by a shopkeeper.',
          parts: [
                { id: 'a', prompt: 'A Dalit man is denied entry to a village temple by the local priest (a private individual). The District Magistrate refuses to register an FIR.', answer: 'He can approach: (1) NHRC',
                  options: ['He can approach: (1) NHRC', '*any* human rights violation (e'],
                  hint: 'If stuck, revisit Class 11 Administrative Law (c11_leg_cbse_05_001, c11_leg_cbse_05_004) — focus.',
                  misconception: 'Students believe that *any* human rights violation (e.g., domestic violence by husband, cheating by a shopkeeper, ragging by seniors) can.' }
          ],
            remediations: { 'any-human-rights-violation-e': { steps: ['Re-read Section 12, Protection of Human Rights Act, 1993: "violation of human rights *by a public servant*.', 'Make a 2-column table: Column A = Violation by private person (husband, employer, teacher); Column B = Violation.', 'For each Column A act, ask: "Did a public servant *fail to act*?" If yes → NHRC/NCW *for the failure*, not the private.', 'Practice 5 mixed scenarios (from node c12_leg_cbse_11_005) identifying the correct commission or rejecting NHRC.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_005', difficulty: 'standard',
          question: 'Quasi-judicial bodies are administrative agencies (executive branch) vested.',
          hint: 'If stuck on "which commission for which violation", revisit **c12_leg_cbse_11_002**.',
          misconception: '**Misconception**: "Quasi-judicial bodies like NHRC/NCW are *courts* and their orders are *binding judgments*." **Why.',
          parts: [
                { id: 'a', prompt: 'What is the statutory time limit for filing a complaint before the National Human Rights Commission (NHRC) under the Protection of Human Rights Act, 1993?', answer: 'The complaint must be filed within **one year** from the date on',
                  options: ['The complaint must be filed within **one year** from the date on', 'no time limit', '3 years'],
                  hint: 'If stuck on "which commission for which violation", revisit **c12_leg_cbse_11_002** (Constitutional.',
                  misconception: '**Misconception**: "Quasi-judicial bodies like NHRC/NCW are *courts* and their orders are *binding judgments*." **Why students make this.' }
          ],
            remediations: { 'misconception-quasi-judicial-bodies-like': { steps: ['If the student confuses quasi-judicial recommendations with binding judgments: 1.', '**Re-read** the "Powers of the Commission" section for NHRC (textbook p.149) — highlight "recommendations.', '**Compare** with Article 32 (SC) / Article 226 (HC) — note "binding," "enforceable," "writs." 3.', '**Do this exercise**: Take a real NHRC case (e.g., *Gujarat riot cases*) — trace: NHRC recommendation → State action →.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_11_006', difficulty: 'standard',
          question: 'Quasi-judicial bodies are administrative agencies (part of the executive.',
          hint: 'If stuck, revisit the **NHRC complaint format (Guidelines Clauses 1-12)** and **NCPCR.',
          misconception: '**Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers** and can hear **any**.',
          parts: [
                { id: 'a', prompt: 'What is the statutory time limit for filing a complaint before the National Human Rights Commission (NHRC) under the Protection of Human Rights Act, 1993?', answer: 'The complaint must be filed within **one year** from the date on',
                  options: ['The complaint must be filed within **one year** from the date on', 'no time limit', '3 years', 'case-based'],
                  hint: 'If stuck, revisit the **NHRC complaint format (Guidelines Clauses 1-12)** and **NCPCR "ebaalnidan".',
                  misconception: '**Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers** and can hear **any** human rights.' },
                { id: 'b', prompt: 'A woman files a complaint with the National Commission for Women (NCW) about domestic violence by her husband, a private businessman.', answer: 'The husband\'s challenge is **valid**',
                  options: ['The husband\'s challenge is **valid**', 'NCW can summon anyone', 'case-based'],
                  hint: 'If stuck, revisit the **NHRC complaint format (Guidelines Clauses 1-12)** and **NCPCR "ebaalnidan".',
                  misconception: '**Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers** and can hear **any** human rights.' },
                { id: 'c', prompt: 'Compare the composition of the NHRC Chairperson and the NCW Chairperson. Why does the difference matter for the independence and credibility of each body?', answer: '**NHRC Chairperson:** Must be a **former Chief Justice of India** (SC)',
                  options: ['**NHRC Chairperson:** Must be a **former Chief Justice of India** (SC)', 'case-based'],
                  hint: 'If stuck, revisit the **NHRC complaint format (Guidelines Clauses 1-12)** and **NCPCR "ebaalnidan".',
                  misconception: '**Misconception:** "All human rights commissions (NHRC, NCW, NCSC, etc.) have the **same powers** and can hear **any** human rights.' }
          ],
            remediations: { 'misconception-all-human-rights-commissions': { steps: ['If the student cannot distinguish jurisdictions: 1.', '**Make a 6-column table** (one per commission) with rows: *Enabling Act, Chairperson Qualification, Jurisdiction.', '**Do 3 "Forum Shopping" drills**: Give a fact pattern (e.g., "Dalit student denied scholarship by govt college".', '**Re-attempt Diagnostic Q2 & Q3** after 24 hours.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
