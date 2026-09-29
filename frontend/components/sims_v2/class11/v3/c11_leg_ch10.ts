import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch10 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch10: SimDef = {
    id: 'v3_c11_leg_ch10',
    title: 'Cyber Laws, Safety and Security in India',
    subtitle: 'This node covers: definition of cyberspace, need for cyber laws, categories.',
    classLevel: 11, subject: 'leg', topic: 'Cyber Laws, Safety and Security in India',
    chapters: ['c11_leg_ch10'],
    nodeIds: ['c11_leg_cbse_10_001', 'c11_leg_cbse_10_002', 'c11_leg_cbse_10_003', 'c11_leg_cbse_10_004', 'c11_leg_cbse_10_005', 'c11_leg_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: *"You just bought a smartphone and clicked \'I Agree\' to a 50-page Terms of Service without.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain in your own words why the IT Act, 2000 applies to a hacker sitting in Country X who breaches a server located in Mumbai, even if the hacker is not.',
        options: ['**Correct Answer:** Section 1(2) read with Section 75 of the IT Act extends its', 'it applies only if the hacker is Indian', 'only if the victim is Indian'],
        answer: '**Correct Answer:** Section 1(2) read with Section 75 of the IT Act extends its',
        hook: '**"Cyber Law = IT Act, 2000 only."** Students equate the *entire field* with *one statute*.',
    },
    teaching: [
        { title: 'Cyber Laws, Safety and Security in India — Key Concepts and Institutions', text: 'Cyber Law is the branch of law that deals with legal issues related to the use of inter-networked information technology, providing legal recognition to electronic records and digital signatures.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_10_001', title: 'Cyber Laws, Safety and Security in India — Key Concepts and Institutions',
          caseStudy: { intro: 'Start by asking: *"You just bought a smartphone and clicked \'I Agree\' to a 50-page Terms of Service without reading it.',
            decisions: [{ prompt: 'What is the exact legal definition of \'cybersecurity\' under Section 2(nb) of the Information Technology Act, 2000 (as amended in 2008)?', options: [
                { text: '**Correct Answer:** "Protecting information, equipment, devices, computers, computer', outcome: '**Correct Answer:** "Protecting information, equipment, devices, computers, computer resources.' },
                { text: '**Misconception Revealed:** If', outcome: 'Not quite — **"Cyber Law = IT Act, 2000 only."** Students equate the *entire field* with *one statute*.', reveals: 'cyber-law-it-act' },
                { text: 'installing antivirus', outcome: 'Not quite — **"Cyber Law = IT Act, 2000 only."** Students equate the *entire field* with *one statute*.', reveals: 'cyber-law-it-act' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_10_002', title: 'Cyber Laws, Safety and Security in India — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with this scenario: "A student is denied admission to a government-funded university (e.g., Delhi University) based on an arbitrary criterion.',
            decisions: [{ prompt: 'What are the four categories of entities included in the definition of "State" under Article 12 of the Constitution of India?', options: [
                { text: 'The four categories are: (1) Government and Parliament of India (Union Executive and', outcome: 'The four categories are: (1) Government and Parliament of India (Union Executive and Legislature).' },
                { text: 'Government', outcome: 'Not quite — Students believe "State" under Article 12 means only *elected governments* (Union/State).', reveals: 'state-under-article-12-means' },
                { text: 'other authorities', outcome: 'Not quite — Students believe "State" under Article 12 means only *elected governments* (Union/State).', reveals: 'state-under-article-12-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_10_003', title: 'Cyber Laws, Safety and Security in India — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this scenario: "A 17-year-old student forwards a meme mocking a politician on WhatsApp. The politician’s supporter files a police complaint.',
            decisions: [{ prompt: 'What was the core constitutional defect identified by the Supreme Court in *Shreya Singhal v.', options: [
                { text: 'The Supreme Court held that Section 66A was unconstitutionally vague and overbroad', outcome: 'The Supreme Court held that Section 66A was unconstitutionally vague and overbroad because terms.' },
                { text: 'it violated privacy', outcome: 'Not quite — Students believe that because Section 66A was struck down, *all* regulation of online speech.', reveals: 'because-section-66a-was-struck' },
                { text: 'it was not passed properly', outcome: 'Not quite — Students believe that because Section 66A was struck down, *all* regulation of online speech.', reveals: 'because-section-66a-was-struck' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_10_004', title: 'Cyber Laws, Safety and Security in India — Processes and Procedures',
          caseStudy: { intro: 'Start with this scenario: *"Your classmate\'s Instagram account was hacked, and the hacker posted morphed photos.',
            decisions: [{ prompt: 'What is the pecuniary jurisdiction of an Adjudicating Officer appointed under Section 46 of the IT Act, 2000, and which authority appoints.', options: [
                { text: 'The Adjudicating Officer has jurisdiction to adjudicate claims for compensation **up to', outcome: 'The Adjudicating Officer has jurisdiction to adjudicate claims for compensation **up to ₹5 crore**.' },
                { text: 'unlimited jurisdiction', outcome: 'Not quite — Students believe **"Cyber crime = only FIR at Police Station"**.', reveals: 'cyber-crime-only-fir-at' },
                { text: 'appointed by High Court', outcome: 'Not quite — Students believe **"Cyber crime = only FIR at Police Station"**.', reveals: 'cyber-crime-only-fir-at' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_10_006', title: 'Cyber Laws, Safety and Security in India — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A 17-year-old student posts a meme criticizing a local politician on Instagram.',
            decisions: [{ prompt: 'Define \'cybercrime\' as per the National Cyber Crime Reporting Portal and explain why the IT Act, 2000 does not define it.', options: [
                { text: 'Cybercrime is defined by the National Cyber Crime Reporting Portal as \'any unlawful act', outcome: 'Cybercrime is defined by the National Cyber Crime Reporting Portal as \'any unlawful act where.' },
                { text: '\'cyber law = IT Act, 2000 only\' and that the IT Act is a complete, static code', outcome: 'Not quite — Students often believe that \'cyber law = IT Act, 2000 only\' and that the IT Act is a complete.', reveals: 'cyber-law-it-act' }
            ] }] } },
        { type: 'build', nodeId: 'c11_leg_cbse_10_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Identify the **protected asset** — Aadhaar-linked KYC.', 'Determine **applicable statutes** — IT Act Sec 43.', 'Check **mandatory reporting timeline** — CERT-In Rules 2022.', 'Assess **startup\'s liability** — As "data fiduciary" (DPDP.', 'Analyze **jurisdiction** — IT Act Sec 1(2) + Sec 75.'], answer: 'Identify the **protected asset** — Aadhaar-linked KYC. Determine **applicable statutes** — IT Act Sec 43. Analyze **jurisdiction** — IT Act Sec 1(2) + Sec 75. Check **mandatory reporting timeline** — CERT-In Rules 2022. Assess **startup\'s liability** — As "data fiduciary" (DPDP.' } },
        { type: 'case', nodeId: 'c11_leg_cbse_10_006', title: 'You made it',
          caseStudy: { intro: 'You finished Cyber Laws, Safety and Security in India — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_001', difficulty: 'standard',
          question: 'Cyber Law is the branch of law that deals with legal issues related to the use.',
          hint: 'Review the *Shreya Singhal* judgment summary in Chapter 2 (Constitutional Law) — focus.',
          misconception: '**"Cyber Law = IT Act, 2000 only."** Students equate the *entire field* with *one statute*.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the IT Act, 2000 applies to a hacker sitting in Country X who breaches a server located in Mumbai, even if the hacker is not.', answer: '**Correct Answer:** Section 1(2) read with Section 75 of the IT Act extends its',
                  options: ['**Correct Answer:** Section 1(2) read with Section 75 of the IT Act extends its', 'it applies only if the hacker is Indian', 'only if the victim is Indian'],
                  hint: 'Review the *Shreya Singhal* judgment summary in Chapter 2 (Constitutional Law) — focus.',
                  misconception: '**"Cyber Law = IT Act, 2000 only."** Students equate the *entire field* with *one statute*.' }
          ],
            remediations: { 'cyber-law-it-act': { steps: ['** Draw a **Venn diagram** on board: Circle A = IT Act offences; Circle B = IPC offences via computer; Circle.', '** Give a **3-sentence fact pattern** (e.g., "Employee steals client DB, sells to competitor").', '** Assign **micro-research**: "Find one RBI circular on cybersecurity for banks.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_002', difficulty: 'standard',
          question: 'Under Article 12 of the Constitution of India, "the State" includes the.',
          hint: 'If stuck, review: Class 11 Political Science, Chapter 1 (Constitution: Why and How?) and.',
          misconception: 'Students believe "State" under Article 12 means only *elected governments* (Union/State).',
          parts: [
                { id: 'a', prompt: 'A private engineering college receives 90% of its funding from the State Government, its governing body is nominated by the Government, and it performs the.', answer: 'Yes, it is "State" under Article 12',
                  options: ['Yes, it is "State" under Article 12', 'No, it\'s private', 'other authorities', '"State" under Article 12 means only *elected governments* (Union/State)'],
                  hint: 'If stuck, review: Class 11 Political Science, Chapter 1 (Constitution: Why and How?) and Chapter 2.',
                  misconception: 'Students believe "State" under Article 12 means only *elected governments* (Union/State).' },
                { id: 'b', prompt: 'The Board of Control for Cricket in India (BCCI) is a registered society, not created by statute, but it controls cricket in India, selects the national team.', answer: 'No, BCCI is *not* "State" under Article 12 (per *Zee Telefilms v',
                  options: ['No, BCCI is *not* "State" under Article 12 (per *Zee Telefilms v', 'Yes, because it performs public function', 'public function', 'public duty'],
                  hint: 'If stuck, review: Class 11 Political Science, Chapter 1 (Constitution: Why and How?) and Chapter 2.',
                  misconception: 'Students believe "State" under Article 12 means only *elected governments* (Union/State).' }
          ],
            remediations: { 'state-under-article-12-means': { steps: ['**Re-anchor**: Ask the student to define "State" in their own words — they\'ll likely say "Government." 2.', '**Confront**: Show the textbook\'s four bullet points under Article 12 — highlight "All local or **other authorities**.".', '**Re-teach the test**: Use the *Ajay Hasia* 5-factor checklist (control, funding, function, monopoly, statutory origin).', 'Apply to 3 bodies: (a) Municipal Corporation (easy, yes), (b) IIT Delhi (harder, yes — government control + public.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "State" under Article 12 means only *elected governments* (Union/State).',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If a body is not \'State\' under Article 12, Fundamental Rights are completely inapplicable to it." Defend or critique with two.', answer: 'Critique',
                  options: ['Critique', '"State" under Article 12 means only *elected governments* (Union/State)'],
                  hint: 'If stuck, review: Class 11 Political Science, Chapter 1 (Constitution: Why and How?) and Chapter 2.',
                  misconception: 'Students believe "State" under Article 12 means only *elected governments* (Union/State).' },
                { id: 'b', prompt: 'Create a new, original scenario (not from textbooks) where a body *appears* private but qualifies as "State" under Article 12.', answer: '**Scenario**: "Metro Rail Corporation (MRC)"',
                  options: ['**Scenario**: "Metro Rail Corporation (MRC)"', '"State" under Article 12 means only *elected governments* (Union/State)'],
                  hint: 'If stuck, review: Class 11 Political Science, Chapter 1 (Constitution: Why and How?) and Chapter 2.',
                  misconception: 'Students believe "State" under Article 12 means only *elected governments* (Union/State).' }
          ],
            remediations: { 'state-under-article-12-means': { steps: ['**Re-anchor**: Ask the student to define "State" in their own words — they\'ll likely say "Government." 2.', '**Confront**: Show the textbook\'s four bullet points under Article 12 — highlight "All local or **other authorities**.".', '**Re-teach the test**: Use the *Ajay Hasia* 5-factor checklist (control, funding, function, monopoly, statutory origin).', 'Apply to 3 bodies: (a) Municipal Corporation (easy, yes), (b) IIT Delhi (harder, yes — government control + public.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_003', difficulty: 'standard',
          question: 'Cyber laws in India are primarily governed by the Information Technology Act.',
          hint: 'If stuck, review the "void for vagueness" and "overbreadth" doctrines in constitutional.',
          misconception: 'Students believe that because Section 66A was struck down, *all* regulation of online speech is unconstitutional.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the distinction between "content-based" and "conduct-based" cyber offences matters for constitutional validity.', answer: 'Content-based offences (like Section 66A) regulate *what is said*',
                  options: ['Content-based offences (like Section 66A) regulate *what is said*', 'both are the same', 'conduct-based also violates free speech', 'intermediary liability'],
                  hint: 'If stuck, review the "void for vagueness" and "overbreadth" doctrines in constitutional law.',
                  misconception: 'Students believe that because Section 66A was struck down, *all* regulation of online speech is unconstitutional.' },
                { id: 'b', prompt: 'A journalist publishes an investigative article exposing corruption in a government department.', answer: 'Step 1: Identify the provision',
                  options: ['Step 1: Identify the provision', 'intermediary liability', 'user liability'],
                  hint: 'If stuck, review the "void for vagueness" and "overbreadth" doctrines in constitutional law.',
                  misconception: 'Students believe that because Section 66A was struck down, *all* regulation of online speech is unconstitutional.' }
          ],
            remediations: { 'because-section-66a-was-struck': { steps: ['Re-read the *Shreya Singhal* judgment summary in the textbook (Chapter 10, Section IX) — focus on the three defects.', 'Create a two-column table: Column A = "Struck Down (Content-Based)" — list Section 66A; Column B = "Upheld.', 'For each Column B section, write: "Why it survives: defines *act* + *mens rea* + *objective harm*." 4.', 'Practice one case: "Student shares a morphed image of a teacher — which section applies?'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_004', difficulty: 'standard',
          question: '**Processes and Procedures under Cyber Laws in India** refer to the.',
          hint: 'If stuck, review **c11_leg_cbse_10_001** for the list of cyber contraventions (Sec 43-45).',
          misconception: 'Students believe **"Cyber crime = only FIR at Police Station"**.',
          parts: [
                { id: 'a', prompt: 'A company discovers its former employee copied the client database (trade secret) and joined a competitor.', answer: '**Step 1:** For **injunction** (equitable relief)',
                  options: ['**Step 1:** For **injunction** (equitable relief)', 'file everything with AO', 'Cyber crime = only FIR at Police Station', '**"Cyber crime = only FIR at Police Station"**'],
                  hint: 'If stuck, review **c11_leg_cbse_10_001** for the list of cyber contraventions (Sec 43-45) vs cyber.',
                  misconception: 'Students believe **"Cyber crime = only FIR at Police Station"**.' }
          ],
            remediations: { 'cyber-crime-only-fir-at': { steps: ['** Give the student a **two-column table**: Left = "Civil Contravention (Sec 43, 44, 45)" → Right = "Criminal Offence.', '** Hand them a **blank Sec 46 Complaint Format** (from IT Act Rules) — have them fill it for a hypothetical.', '** Ask: "Where does this complaint go? Who decides? Can you appeal? To whom? In how many days?" **', '** Show the **TDSAT website** (tdsat.gov.in) — let them see real cyber appeals. **'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_005', difficulty: 'standard',
          question: 'Cyber laws in India are legal provisions under the Information Technology Act.',
          hint: 'If stuck, revisit the definition of "computer resource" under Section 2(1)(i) of the.',
          misconception: 'Students often believe that cyber laws only apply to financial crimes like hacking bank accounts, overlooking.',
          parts: [
                { id: 'a', prompt: 'Explain why Section 66A of the IT Act, 2000 was struck down by the Supreme Court in Shreya Singhal v. Union of India (2015).', answer: 'Section 66A was struck down',
                  options: ['Section 66A was struck down', 'being too strict on cyberbullies'],
                  hint: 'If stuck, revisit the definition of "computer resource" under Section 2(1)(i) of the IT Act.',
                  misconception: 'Students often believe that cyber laws only apply to financial crimes like hacking bank accounts, overlooking non-financial offenses such.' }
          ],
            remediations: { 'cyber-laws-only-apply-to': { steps: ['To fix this, use a role-play scenario: Give students a WhatsApp screenshot where a morphed image is shared with caption.', 'Which law applies?" Guide them to identify: 1) The act (non-consensual image alteration + sharing) 2) Relevant sections.', 'Emphasize that consent and harm—not intent—define cybercrimes.', 'This targets the misconception by linking legal principles to relatable social media behavior.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_10_006', difficulty: 'standard',
          question: 'Cyber law is the branch of law that governs legal issues arising from the use.',
          hint: 'If stuck, review the Shreya Singhal judgment summary in c11_leg_cbse_10_003 and the.',
          misconception: 'Students often believe that \'cyber law = IT Act, 2000 only\' and that the IT Act is a complete, static code.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cyber law is the branch of law that governs legal issues arising from the use of',
                  options: ['Cyber law is the branch of law that governs legal issues arising from the use of', 'Cyber Law is the branch of law that deals with legal issues related to the use of', 'Under Article 12 of the Constitution of India, "the State" includes the Government and', 'Cyber laws in India are primarily governed by the Information Technology Act, 2000 (IT'],
                  hint: 'If stuck, review the Shreya Singhal judgment summary in c11_leg_cbse_10_003 and the IT Act.',
                  misconception: 'Students often believe that \'cyber law = IT Act, 2000 only\' and that the IT Act is a complete, static code.' }
          ],
            remediations: { 'cyber-law-it-act': { steps: ['If a student cannot distinguish between the IT Act and other overlapping laws: (1) Give them a single scenario (e.g.', '(2) Ask them to list every law that applies — they will likely only name IT Act.', '(3) Walk through each applicable law: IT Act (67B), POCSO (Sections 11, 12, 14, 15), IPC (354D, 509), JJ Act (Section.', '(4) Emphasize: \'One incident, multiple legal lenses — that\'s cyber law in practice.\' (5) Assign a mapping exercise.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
