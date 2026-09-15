import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch04_p2: SimDef = {
    id: 'v3_c12_ip_ch04_p2',
    title: 'Societal Impacts · Part 2/2',
    subtitle: 'She never posted — and the internet still knows',
    classLevel: 12, subject: 'informatics_practices', topic: 'Societal Impacts · Part 2/2',
    chapters: ['c12_ip_ch04'],
    nodeIds: ['c12_ip_cbse_04_007', 'c12_ip_cbse_04_008', 'c12_ip_cbse_04_009', 'c12_ip_cbse_04_010', 'c12_ip_cbse_04_011', 'c12_ip_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Privacy auditor', intro: 'Footprints on wet sand wash away; digital ones get copied, sold and aggregated. Learn to see your own trail.', goal: 'Distinguish active from passive digital footprints — and why deletion never fully erases them.' },
    discovery: {
        question: 'A student who posts nothing insists she has no digital footprint — yet phone ads for a product she searched once follow her for weeks. What is she missing?',
        options: ['Passive traces — ISP logs, cookies, device fingerprints and metadata record her without a single post; the footprint isn\'t what you publish, it\'s what the network keeps', 'Incognito deletes it', 'No posts, no data', 'Ads are coincidence'],
        answer: 'Passive traces — ISP logs, cookies, device fingerprints and metadata record her without a single post; the footprint isn\'t what you publish, it\'s what the network keeps',
        hook: 'Deleting an account doesn\'t erase the trail — brokers already scraped it into shadow profiles, and platforms retain logs and \'anonymised\' analytics beyond the delete button. One UPI order leaves active data you typed and passive data you never saw — the payment record outlives the GPS ping by years.',
    },
    teaching: [
        { title: 'Cyberbullying: forms, effects, and reporting mechanisms', text: 'Cyberbullying is the deliberate and repeated use of digital technologies — such as social media, messaging apps, gaming platforms, or email — to harass, threaten, embarrass, or target another person.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit a single online order: separate active footprints from passive ones, rank which records persist longest, and design an audit checklist for the footprints you forgot you made.',
        labels: ['Cyberbullying: forms, effects,', 'E-waste: environmental impact', 'Netiquette: internet etiquette rules', 'Data protection and privacy', 'Gender and disability issues', 'E-commerce: benefits and risks'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_007', title: 'Cyberbullying: forms, effects, and reporting mechanisms',
          caseStudy: { intro: 'Imagine a Class 12 student, Arya, who discovers that a fake Instagram profile using her photos and name has been created by a classmate.',
            decisions: [{ prompt: '**REMEMBER:** List any four distinct forms of cyberbullying as defined in the CBSE Class 12 Informatics Practices curriculum.', options: [
                { text: 'Correct answer: Harassment, Flaming, Denigration, Impersonation, Outing, Trickery,', outcome: 'Correct answer: Harassment, Flaming, Denigration, Impersonation, Outing, Trickery, Exclusion.' },
                { text: 'hacking, virus, phishing, spam', outcome: 'Not quite — **“Cyberbullying is just mean comments; ignoring it makes it go away.”** Students often think.', reveals: 'cyberbullying-is-just-mean-comments' },
                { text: 'Cyberbullying is just mean comments', outcome: 'Not quite — **“Cyberbullying is just mean comments; ignoring it makes it go away.”** Students often think.', reveals: 'cyberbullying-is-just-mean-comments' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_008', title: 'E-waste: environmental impact and proper disposal',
          caseStudy: { intro: 'Imagine you are cleaning your room and find a tangled drawer of old chargers, a cracked smartphone, a dead laptop battery, and a tangled mess of earphones.',
            decisions: [{ prompt: 'What is the full form of EPR in the context of India\'s E-Waste Management Rules, and what is its core obligation for producers?', options: [
                { text: 'EPR stands for Extended Producer Responsibility', outcome: 'EPR stands for Extended Producer Responsibility. Its core obligation: producers (manufacturers.' },
                { text: 'Electronic Product Recycling', outcome: 'Not quite — Students often believe "giving e-waste to the local kabadiwala (scrap dealer) is recycling." This.', reveals: 'giving-e-waste-to-the' },
                { text: 'producers only pay a tax', outcome: 'Not quite — Students often believe "giving e-waste to the local kabadiwala (scrap dealer) is recycling." This.', reveals: 'giving-e-waste-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_009', title: 'Netiquette: internet etiquette rules and best practices',
          caseStudy: { intro: 'Imagine you\'re in a class WhatsApp group and a classmate posts a blurry photo of a test paper with the caption "lol this is so easy, anyone who fails is dumb.".',
            decisions: [{ prompt: 'What does the acronym "THINK" stand for in the context of netiquette, and why is it used as a pre-posting filter?', options: [
                { text: 'THINK stands for True, Helpful, Inspiring, Necessary, Kind', outcome: 'THINK stands for True, Helpful, Inspiring, Necessary, Kind. It is used as a mental checklist before.' },
                { text: 'Think Hard, Ignore Negative Karma', outcome: 'Not quite — Students believe netiquette is only about "being polite" or "not using bad words." They miss that.', reveals: 'netiquette-is-only-about-being' },
                { text: 'being polite', outcome: 'Not quite — Students believe netiquette is only about "being polite" or "not using bad words." They miss that.', reveals: 'netiquette-is-only-about-being' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_010', title: 'Data protection and privacy laws in India',
          caseStudy: { intro: 'Imagine you order food via an app — you share your name, phone, address, payment details, and food preferences. Who owns this data?',
            decisions: [{ prompt: 'What is the key difference between "personal data" and "sensitive personal data or information (SPDI)" under the SPDI Rules 2011, and which.', options: [
                { text: 'Personal data is any information relating to an identifiable natural person (e.g., name,', outcome: 'Personal data is any information relating to an identifiable natural person (e.g., name, email).' },
                { text: 'DPDP Act applies only to big companies like Google/Facebook', outcome: 'Not quite — Students believe "DPDP Act applies only to big companies like Google/Facebook." They write.', reveals: 'dpdp-act-applies-only-to' },
                { text: 'Small startups and student projects are exempt', outcome: 'Not quite — Students believe "DPDP Act applies only to big companies like Google/Facebook." They write.', reveals: 'dpdp-act-applies-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_011', title: 'Gender and disability issues in technology access',
          caseStudy: { intro: 'Begin by asking: "Why does a visually impaired girl in a rural Indian village face different technology barriers than a visually impaired boy in an urban.',
            decisions: [{ prompt: 'A REMEMBER level question: Define the term \'digital gender divide\' as used in Indian policy documents (e.g., NFHS-5, TRAI reports).', options: [
                { text: 'The digital gender divide is the gap between men and women in access to, use of, and', outcome: 'The digital gender divide is the gap between men and women in access to, use of, and benefits from.' },
                { text: '\'accessibility\' means only adding a screen reader or ramp', outcome: 'Not quite — Students often think \'accessibility\' means only adding a screen reader or ramp — i.e., a checklist.', reveals: 'accessibility-means-only-adding-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_012', title: 'E-commerce: benefits and risks of online transactions',
          caseStudy: { intro: 'Imagine you want to buy a smartphone online during a festive sale: you compare prices on three apps, read reviews, apply a coupon, and pay via UPI — all within.',
            decisions: [{ prompt: 'What is the primary difference between e-commerce and traditional brick-and-mortar commerce in terms of transaction medium?', options: [
                { text: 'E-commerce transactions occur electronically over the internet without physical presence', outcome: 'E-commerce transactions occur electronically over the internet without physical presence of buyer.' },
                { text: 'e-commerce only sells digital goods', outcome: 'Not quite — Students often believe that "HTTPS in the browser address bar guarantees the website is legitimate.', reveals: 'https-in-the-browser-address' },
                { text: 'HTTPS in the browser address bar guarantees the website is legitimate and safe', outcome: 'Not quite — Students often believe that "HTTPS in the browser address bar guarantees the website is legitimate.', reveals: 'https-in-the-browser-address' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'A company can cut costs by automating — or keep jobs it doesn\'t strictly need. Shareholders want efficiency; the town needs the jobs.',
            decisions: [{ prompt: 'Does a company owe its workers more than the market requires?', options: [
                { text: 'No — efficiency is what lets companies survive', outcome: 'The market argument — a company that keeps unnecessary jobs may fail entirely, losing all of them.' },
                { text: 'Yes — a company is also a community member', outcome: 'The stakeholder argument — businesses that benefit from a town owe it something beyond the legal minimum.' },
                { text: 'It owes transition, not stasis', outcome: 'The modern answer — automate, but fund retraining; the job may not be saved, the worker should be.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a hackathon, a rival team lifts your app\'s source code, ports your matching algorithm and launches with a look-alike name and logo — shrugging, \'you never registered anything.\'',
            decisions: [{ prompt: 'Which IPR answers which violation?', options: [
                { text: 'Code is copyright — automatic on creation, no registration needed, so the shrug is wrong there; the algorithm would need a granted patent, which you can\'t claim retroactively; and the name/logo needs a registered trademark to force statutory enforcement.', outcome: 'The chapter\'s three-way map: expression (copyright, automatic), invention (patent, must register), identity (trademark, must register) — \'never registered\' only disarms the two that needed filing.' },
                { text: 'They\'re fully right — unregistered means unprotected, so all three are fair game.', outcome: 'Only patent and trademark depend on registration; copyright attaches the moment the code was written, so \'you never registered\' is no defence for copying it.', reveals: 'no-registration-no-rights' },
                { text: 'Copyright covers all three — code, algorithm and logo are all your \'creative work.\'', outcome: 'Copyright guards expression, not function or identity: the algorithm\'s working method isn\'t protected by the code\'s text, and a brand name is trademark territory — one right can\'t stretch across all three violations.', reveals: 'copyright-covers-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'You can now see the internet\'s other ledger — the one recording you whether or not you ever post.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_007', difficulty: 'standard',
          question: 'Cyberbullying is the deliberate and repeated use of digital technologies — such.',
          hint: 'If stuck, revisit **c11_ip_cbse_08_009** (Class 11 IP – Cyberbullying introduction) and.',
          misconception: '**“Cyberbullying is just mean comments; ignoring it makes it go away.”** Students often think cyberbullying = only.',
          parts: [
                { id: 'a', prompt: '**APPLY:** Rohan, 16, finds a morphed obscene image of himself circulating on a class WhatsApp group. He has screenshots of the image and the sender’s number.', answer: 'Correct sequence: 1',
                  options: ['Correct sequence: 1', 'Cyberbullying is just mean comments', 'blocking', 'ignoring'],
                  hint: 'If stuck, revisit **c11_ip_cbse_08_009** (Class 11 IP – Cyberbullying introduction) and.',
                  misconception: '**“Cyberbullying is just mean comments; ignoring it makes it go away.”** Students often think cyberbullying = only text‑based insults and.' }
          ],
            remediations: { 'cyberbullying-is-just-mean-comments': { steps: ['**Re‑visit Class 11 IP node c11_ip_cbse_08_009** (Phishing, Identity Theft and Cyberbullying) — re‑read the.', '**Watch the NCERT‑linked video** “Cyberbullying: Forms & Reporting” (available on DIKSHA portal) — pause after each.', '**Do the “Reporting Ladder” drill:** Take the Arya scenario from the Walkthrough.', 'On paper, draw a 4‑box flowchart (Platform → School → Portal → Helpline) and write the *exact* menu names (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**“Cyberbullying is just mean comments; ignoring it makes it go away.”** Students often think cyberbullying = only.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** “Schools should handle all cyberbullying cases internally without involving police, to protect the reputation of minors.” Critique this statement.', answer: 'Correct critique: The statement is **legally unsound**',
                  options: ['Correct critique: The statement is **legally unsound**', 'Cyberbullying is just mean comments', 'blocking', 'ignoring'],
                  hint: 'If stuck, revisit **c11_ip_cbse_08_009** (Class 11 IP – Cyberbullying introduction) and.',
                  misconception: '**“Cyberbullying is just mean comments; ignoring it makes it go away.”** Students often think cyberbullying = only text‑based insults and.' }
          ],
            remediations: { 'cyberbullying-is-just-mean-comments': { steps: ['**Re‑visit Class 11 IP node c11_ip_cbse_08_009** (Phishing, Identity Theft and Cyberbullying) — re‑read the.', '**Watch the NCERT‑linked video** “Cyberbullying: Forms & Reporting” (available on DIKSHA portal) — pause after each.', '**Do the “Reporting Ladder” drill:** Take the Arya scenario from the Walkthrough.', 'On paper, draw a 4‑box flowchart (Platform → School → Portal → Helpline) and write the *exact* menu names (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_008', difficulty: 'standard',
          question: 'E-waste (electronic waste) refers to discarded electrical or electronic devices.',
          hint: 'If stuck, revisit Class 11 IP nodes c11_ip_cbse_01_001 (computer components) and.',
          misconception: 'Students often believe "giving e-waste to the local kabadiwala (scrap dealer) is recycling." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'What is the full form of EPR in the context of India\'s E-Waste Management Rules, and what is its core obligation for producers?', answer: 'EPR stands for Extended Producer Responsibility',
                  options: ['EPR stands for Extended Producer Responsibility', 'Electronic Product Recycling', 'producers only pay a tax', 'giving e-waste to the local kabadiwala (scrap dealer) is recycling'],
                  hint: 'If stuck, revisit Class 11 IP nodes c11_ip_cbse_01_001 (computer components) and c11_ip_cbse_08_011.',
                  misconception: 'Students often believe "giving e-waste to the local kabadiwala (scrap dealer) is recycling." This is wrong because kabadiwalas typically.' },
                { id: 'b', prompt: 'A student says: "E-waste is just plastic and metal — it\'s not dangerous like chemical waste." Explain why this statement is incorrect using three specific.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'pollution', 'heavy metals', 'giving e-waste to the local kabadiwala (scrap dealer) is recycling'],
                  hint: 'If stuck, revisit Class 11 IP nodes c11_ip_cbse_01_001 (computer components) and c11_ip_cbse_08_011.',
                  misconception: 'Students often believe "giving e-waste to the local kabadiwala (scrap dealer) is recycling." This is wrong because kabadiwalas typically.' },
                { id: 'c', prompt: 'Your household has generated 5 kg of mixed e-waste (old router, two feature phones, laptop battery, assorted cables).', answer: 'Steps: (1) Segregate: separate battery (lithium-ion) from other items',
                  options: ['Steps: (1) Segregate: separate battery (lithium-ion) from other items', 'give to kabadiwala', 'dump in blue bin', 'giving e-waste to the local kabadiwala (scrap dealer) is recycling'],
                  hint: 'If stuck, revisit Class 11 IP nodes c11_ip_cbse_01_001 (computer components) and c11_ip_cbse_08_011.',
                  misconception: 'Students often believe "giving e-waste to the local kabadiwala (scrap dealer) is recycling." This is wrong because kabadiwalas typically.' }
          ],
            remediations: { 'giving-e-waste-to-the': { steps: ['If a student holds the kabadiwala misconception: (1) Show a 3-minute video contrasting informal vs.', 'formal PCB recycling (search "formal e-waste recycling India CPCB" on YouTube).', '(2) Have them calculate: 1 tonne PCB → informal recovers ~90g gold (30%); formal recovers ~300g gold (95%).', 'At ₹6,000/g gold, that\'s ₹5.4L vs ₹18L — formal recovers 3.3x more value.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_009', difficulty: 'standard',
          question: 'Netiquette (Network Etiquette) is a set of social conventions and best.',
          hint: 'Revisit c11_ip_cbse_08_010 (Safe Browsing Practices and Strong Password Guidelines) and.',
          misconception: 'Students believe netiquette is only about "being polite" or "not using bad words." They miss that netiquette includes.',
          parts: [
                { id: 'a', prompt: 'What does the acronym "THINK" stand for in the context of netiquette, and why is it used as a pre-posting filter?', answer: 'THINK stands for True, Helpful, Inspiring, Necessary, Kind',
                  options: ['THINK stands for True, Helpful, Inspiring, Necessary, Kind', 'Think Hard, Ignore Negative Karma', 'being polite', 'not using bad words'],
                  hint: 'Revisit c11_ip_cbse_08_010 (Safe Browsing Practices and Strong Password Guidelines) and.',
                  misconception: 'Students believe netiquette is only about "being polite" or "not using bad words." They miss that netiquette includes **technical.' },
                { id: 'b', prompt: 'A student writes an email to a teacher: "Subject: HELP!!! Sir, I need the notes for tomorrow\'s test NOW. Send them fast.', answer: 'Violations: (1) ALL CAPS in subject/body = perceived as shouting/aggressive',
                  options: ['Violations: (1) ALL CAPS in subject/body = perceived as shouting/aggressive', 'it\'s rude', 'being polite', 'not using bad words'],
                  hint: 'Revisit c11_ip_cbse_08_010 (Safe Browsing Practices and Strong Password Guidelines) and.',
                  misconception: 'Students believe netiquette is only about "being polite" or "not using bad words." They miss that netiquette includes **technical.' },
                { id: 'c', prompt: 'You are in a coding forum. A beginner posts a question with a 200-line unformatted code dump and says "fix this pls." You want to help.', answer: 'Good reply: "Hi!',
                  options: ['Good reply: "Hi!', 'being polite', 'not using bad words', 'netiquette is only about "being polite" or "not using bad words'],
                  hint: 'Revisit c11_ip_cbse_08_010 (Safe Browsing Practices and Strong Password Guidelines) and.',
                  misconception: 'Students believe netiquette is only about "being polite" or "not using bad words." They miss that netiquette includes **technical.' },
                { id: 'd', prompt: 'Compare netiquette in a professional email vs. a close-friends WhatsApp group.', answer: '| Dimension | Professional Email | Friends WhatsApp Group |',
                  options: ['| Dimension | Professional Email | Friends WhatsApp Group |', 'being polite', 'not using bad words', 'netiquette is only about "being polite" or "not using bad words'],
                  hint: 'Revisit c11_ip_cbse_08_010 (Safe Browsing Practices and Strong Password Guidelines) and.',
                  misconception: 'Students believe netiquette is only about "being polite" or "not using bad words." They miss that netiquette includes **technical.' }
          ],
            remediations: { 'netiquette-is-only-about-being': { steps: ['Have the student list 5 messages they sent this week (email, chat, comment).', 'For each, apply the THINK filter aloud — identify which criteria failed.', 'Rewrite the worst message using the "Professional Email Template" (Subject: [Context] [Action Needed] | Greeting |.', 'Send the rewrite to a peer for feedback: "Does this sound respectful and clear?" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_010', difficulty: 'standard',
          question: 'Data protection and privacy laws in India refer to the legal framework.',
          hint: 'Revisit c12_ip_cbse_04_001 (Digital footprint) and c11_ip_cbse_08_011 (Data Protection.',
          misconception: 'Students believe "DPDP Act applies only to big companies like Google/Facebook." They write in exams: "Small startups.',
          parts: [
                { id: 'a', prompt: 'Explain why Section 43A of the IT Act, 2000 (inserted 2008) was considered inadequate for modern data protection, leading to the DPDP Act 2023.', answer: 'Section 43A only mandated "reasonable security practices" for SPDI and provided',
                  options: ['Section 43A only mandated "reasonable security practices" for SPDI and provided', 'low penalties', 'DPDP Act applies only to big companies like Google/Facebook', 'Small startups and student projects are exempt'],
                  hint: 'Revisit c12_ip_cbse_04_001 (Digital footprint) and c11_ip_cbse_08_011 (Data Protection, Privacy and.',
                  misconception: 'Students believe "DPDP Act applies only to big companies like Google/Facebook." They write in exams: "Small startups and student projects.' },
                { id: 'b', prompt: 'A health-tech startup collects users\' heart-rate data from wearables to provide fitness insights.', answer: 'Steps: (1) Identify heart-rate data as "personal data" (health-related)',
                  options: ['Steps: (1) Identify heart-rate data as "personal data" (health-related)', 'DPDP Act applies only to big companies like Google/Facebook', 'Small startups and student projects are exempt', 'data fiduciary'],
                  hint: 'Revisit c12_ip_cbse_04_001 (Digital footprint) and c11_ip_cbse_08_011 (Data Protection, Privacy and.',
                  misconception: 'Students believe "DPDP Act applies only to big companies like Google/Facebook." They write in exams: "Small startups and student projects.' },
                { id: 'c', prompt: 'Compare the "consent" requirements under SPDI Rules 2011 vs DPDP Act 2023. How does the DPDP Act address the "consent fatigue" problem?', answer: 'SPDI Rules 2011: Consent must be obtained in writing (letter/fax/email) for SPDI',
                  options: ['SPDI Rules 2011: Consent must be obtained in writing (letter/fax/email) for SPDI', 'DPDP Act applies only to big companies like Google/Facebook', 'Small startups and student projects are exempt', 'data fiduciary'],
                  hint: 'Revisit c12_ip_cbse_04_001 (Digital footprint) and c11_ip_cbse_08_011 (Data Protection, Privacy and.',
                  misconception: 'Students believe "DPDP Act applies only to big companies like Google/Facebook." They write in exams: "Small startups and student projects.' }
          ],
            remediations: { 'dpdp-act-applies-only-to': { steps: ['If the student holds this misconception: (1) Ask them to read DPDP Act Section 2(i) definition of "data fiduciary".', '(2) Walk through the college event example: Who decides what data to collect?', 'Who decides to use Google Forms?', '→ They are the data fiduciary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_011', difficulty: 'standard',
          question: 'Gender and disability issues in technology access refer to the systemic.',
          hint: 'If stuck, revisit c11_stat_cbse_02_004 (sampling methods) to understand how survey design.',
          misconception: 'Students often think \'accessibility\' means only adding a screen reader or ramp — i.e., a checklist of add-ons for.',
          parts: [
                { id: 'a', prompt: 'An UNDERSTAND level question: Explain why \'mobile phone ownership\' alone is an insufficient metric for measuring women\'s technology access in India.', answer: 'Ownership ≠ meaningful access',
                  options: ['Ownership ≠ meaningful access', '\'accessibility\' means only adding a screen reader or ramp'],
                  hint: 'If stuck, revisit c11_stat_cbse_02_004 (sampling methods) to understand how survey design affects.',
                  misconception: 'Students often think \'accessibility\' means only adding a screen reader or ramp — i.e., a checklist of add-ons for \'disabled people\'.' },
                { id: 'b', prompt: 'An APPLY level question: A school adopts an e-learning platform for Class 12.', answer: 'motor disability unable to use mouse, (',
                  options: ['motor disability unable to use mouse, (', '\'accessibility\' means only adding a screen reader or ramp'],
                  hint: 'If stuck, revisit c11_stat_cbse_02_004 (sampling methods) to understand how survey design affects.',
                  misconception: 'Students often think \'accessibility\' means only adding a screen reader or ramp — i.e., a checklist of add-ons for \'disabled people\'.' }
          ],
            remediations: { 'accessibility-means-only-adding-a': { steps: ['Have them navigate a familiar website (e.g., IRCTC) using ONLY keyboard (Tab, Enter, arrows) for 10 minutes.', 'Use a screen reader (NVDA free) on same site with monitor off.', 'Map each failure to WCAG criterion.', 'Redesign one user flow (e.g., login) on paper applying universal design principles (visible focus, logical order, error.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_012', difficulty: 'standard',
          question: 'E-commerce refers to the buying and selling of goods and services over the.',
          hint: 'If stuck, revisit c12_ip_cbse_04_006 (phishing mechanics) and c11_ip_cbse_08_011 (data.',
          misconception: 'Students often believe that "HTTPS in the browser address bar guarantees the website is legitimate and safe." This.',
          parts: [
                { id: 'a', prompt: 'Explain why "24/7 availability" is considered a benefit of e-commerce but can also become a risk for the business operator.', answer: '24/7 availability benefits customers by allowing shopping anytime, but it forces',
                  options: ['24/7 availability benefits customers by allowing shopping anytime, but it forces', 'HTTPS in the browser address bar guarantees the website is legitimate and safe', '"HTTPS in the browser address bar guarantees the website is legitimate and safe'],
                  hint: 'If stuck, revisit c12_ip_cbse_04_006 (phishing mechanics) and c11_ip_cbse_08_011 (data protection.',
                  misconception: 'Students often believe that "HTTPS in the browser address bar guarantees the website is legitimate and safe." This is wrong because HTTPS.' },
                { id: 'b', prompt: 'A customer receives an email claiming to be from their bank, asking them to click a link and enter their UPI PIN to "verify" a recent e-commerce transaction.', answer: 'Risk: Phishing attack targeting payment credentials',
                  options: ['Risk: Phishing attack targeting payment credentials', 'enter the PIN to check', 'HTTPS in the browser address bar guarantees the website is legitimate and safe', '"HTTPS in the browser address bar guarantees the website is legitimate and safe'],
                  hint: 'If stuck, revisit c12_ip_cbse_04_006 (phishing mechanics) and c11_ip_cbse_08_011 (data protection.',
                  misconception: 'Students often believe that "HTTPS in the browser address bar guarantees the website is legitimate and safe." This is wrong because HTTPS.' },
                { id: 'c', prompt: 'Compare the risk of "card-not-present fraud" in e-commerce with "card-present fraud" in physical stores.', answer: 'Card-not-present fraud (e-commerce) is easier to scale',
                  options: ['Card-not-present fraud (e-commerce) is easier to scale', 'both are equal', 'HTTPS in the browser address bar guarantees the website is legitimate and safe', '"HTTPS in the browser address bar guarantees the website is legitimate and safe'],
                  hint: 'If stuck, revisit c12_ip_cbse_04_006 (phishing mechanics) and c11_ip_cbse_08_011 (data protection.',
                  misconception: 'Students often believe that "HTTPS in the browser address bar guarantees the website is legitimate and safe." This is wrong because HTTPS.' }
          ],
            remediations: { 'https-in-the-browser-address': { steps: ['Revisit c12_ip_cbse_04_006 (Identity theft and phishing attacks) to understand how attackers spoof domains and obtain.', 'Practice identifying fake URLs by comparing character-level differences (homoglyphs, subdomain tricks) in a lab.', 'Use a browser’s certificate viewer (click padlock → Certificate → Subject) to see that the "Issued To" field shows the.', 'Re-attempt Diagnostic Question 3 and 6 with this lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
