import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch06 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch06: SimDef = {
    id: 'v3_c12_leg_ch06',
    title: 'Intellectual Property Law',
    subtitle: 'This node covers the **meaning, nature, classification (Industrial Property vs.',
    classLevel: 12, subject: 'leg', topic: 'Intellectual Property Law',
    chapters: ['c12_leg_ch06'],
    nodeIds: ['c12_leg_cbse_06_001', 'c12_leg_cbse_06_002', 'c12_leg_cbse_06_003', 'c12_leg_cbse_06_004', 'c12_leg_cbse_06_005', 'c12_leg_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start by asking: "You write a viral Instagram poem. A brand prints it on T-shirts and sells 10,000 units.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Define \'Intellectual Property\' and state the fundamental difference between Industrial Property and Copyright in terms of subject matter.',
        options: ['Intellectual Property is intangible property originating from human intellect', 'Copyright covers inventions', 'Registration creates Copyright'],
        answer: 'Intellectual Property is intangible property originating from human intellect',
        hook: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get.',
    },
    teaching: [
        { title: 'Intellectual Property Law — Key Concepts and Institutions', text: 'Intellectual Property (IP) refers to intangible creations of the human intellect—inventions, literary and artistic works, symbols, names, images, and designs used in commerce—over which the law.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_06_001', title: 'Intellectual Property Law — Key Concepts and Institutions',
          caseStudy: { intro: 'Start by asking: "You write a viral Instagram poem. A brand prints it on T-shirts and sells 10,000 units without asking you. Can you stop them?',
            decisions: [{ prompt: 'Define \'Intellectual Property\' and state the fundamental difference between Industrial Property and Copyright in terms of subject matter.', options: [
                { text: 'Intellectual Property is intangible property originating from human intellect', outcome: 'Intellectual Property is intangible property originating from human intellect (inventions, designs.' },
                { text: 'Copyright covers inventions', outcome: 'Not quite — Students believe **"Registration creates Copyright"** — they think you must register a novel, song.', reveals: 'registration-creates-copyright-they-think' },
                { text: 'Registration creates Copyright', outcome: 'Not quite — Students believe **"Registration creates Copyright"** — they think you must register a novel, song.', reveals: 'registration-creates-copyright-they-think' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_002', title: 'Intellectual Property Law — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a relatable scenario: "You design a unique logo for your friend\'s startup. A month later, you see a big company using a nearly identical logo.',
            decisions: [{ prompt: 'What are the two main categories of Intellectual Property as defined in the CBSE Class 12 Legal Studies textbook, and name one right that.', options: [
                { text: 'The two main categories are: (1) Industrial Property', outcome: 'The two main categories are: (1) Industrial Property — includes patents, trademarks, industrial.' },
                { text: 'patents and copyrights are the two categories', outcome: 'Not quite — Students believe "copyright registration creates copyright." This is false.', reveals: 'copyright-registration-creates-copyright' },
                { text: 'copyright registration creates copyright', outcome: 'Not quite — Students believe "copyright registration creates copyright." This is false.', reveals: 'copyright-registration-creates-copyright' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_003', title: 'Intellectual Property Law — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this scenario: *"You\'re a junior lawyer at a firm. A client says: \'My competitor copied my product\'s unique bottle shape — can I sue?\' You have 10.',
            decisions: [{ prompt: 'Name the Supreme Court case that established the "triple test" for patentability (novelty, inventive step, industrial application) in India.', options: [
                { text: '**Answer:** *Bishwanath Prasad Radhey Shyam v', outcome: '**Answer:** *Bishwanath Prasad Radhey Shyam v. Hindustan Metal Industries* (1979) 2 SCC 511.' },
                { text: 'efficacy', outcome: 'Not quite — **Misconception:** "Landmark cases are just important old judgments — I can cite any famous case.', reveals: 'misconception-landmark-cases-are-just' },
                { text: 'public interest', outcome: 'Not quite — **Misconception:** "Landmark cases are just important old judgments — I can cite any famous case.', reveals: 'misconception-landmark-cases-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_004', title: 'Intellectual Property Law — Processes and Procedures',
          caseStudy: { intro: 'Start with a real-world hook: "You have built a prototype of a low-cost portable ECG device.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a Request for Examination (Form 18) for a patent application in India, and from which date.', options: [
                { text: 'The Request for Examination (Form 18) must be filed within 48 months from the date of', outcome: 'The Request for Examination (Form 18) must be filed within 48 months from the date of filing of the.' },
                { text: '12 months', outcome: 'Not quite — Students believe that "filing a patent application" means "getting a patent." They do not grasp.', reveals: 'filing-a-patent-application-means' },
                { text: 'from date of publication', outcome: 'Not quite — Students believe that "filing a patent application" means "getting a patent." They do not grasp.', reveals: 'filing-a-patent-application-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_005', title: 'Intellectual Property Law — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You are a Class 12 student who just wrote a Python script that predicts crop diseases from satellite images.',
            decisions: [{ prompt: 'What is the term of copyright protection for a literary work in India, and from when is it calculated?', options: [
                { text: 'Copyright for a literary work lasts 60 years from the beginning of the calendar year', outcome: 'Copyright for a literary work lasts 60 years from the beginning of the calendar year following the.' },
                { text: 'life + 50 years', outcome: 'Not quite — Students often believe "Copyright protects ideas" — e.g., "I thought of a story about.', reveals: 'copyright-protects-ideas-e' },
                { text: 'from date of publication', outcome: 'Not quite — Students often believe "Copyright protects ideas" — e.g., "I thought of a story about.', reveals: 'copyright-protects-ideas-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_006', title: 'Intellectual Property Law — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real-world scenario: "A startup develops an AI-based health diagnostic app with a unique algorithm, a catchy name \'MedScan\', a distinctive.',
            decisions: [{ prompt: 'Define \'Industrial Property\' as categorized under the TRIPS Agreement and the NCERT textbook, and list the four specific rights.', options: [
                { text: 'Industrial Property includes inventions (Patents), Trademarks, Industrial Designs, and', outcome: 'Industrial Property includes inventions (Patents), Trademarks, Industrial Designs, and Geographical.' },
                { text: 'Which IP right applies?', outcome: 'Not quite — Students consistently confuse **\'Patent\' (functional invention)** with **\'Design\' (aesthetic.', reveals: 'students-consistently-confuse-patent-functional' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_003', title: 'Intellectual Property Law — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this scenario: *"You\'re a junior lawyer at a firm. A client says: \'My competitor copied my product\'s unique bottle shape — can I sue?\' You have 10.',
            decisions: [{ prompt: 'Name the Supreme Court case that established the "triple test" for patentability (novelty, inventive step, industrial application) in India.', options: [
                { text: '**Answer:** *Bishwanath Prasad Radhey Shyam v', outcome: '**Answer:** *Bishwanath Prasad Radhey Shyam v. Hindustan Metal Industries* (1979) 2 SCC 511.' },
                { text: 'efficacy', outcome: 'Not quite — **Misconception:** "Landmark cases are just important old judgments — I can cite any famous case.', reveals: 'misconception-landmark-cases-are-just' },
                { text: 'public interest', outcome: 'Not quite — **Misconception:** "Landmark cases are just important old judgments — I can cite any famous case.', reveals: 'misconception-landmark-cases-are-just' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Intellectual Property Law', spots: [
            { id: 's1', label: 'Intellectual Property Law Key Concepts and Institutions', prompt: 'Which idea is this? — Intellectual Property (IP) refers to intangible creations of the human.', answer: 'Intellectual Property Law Key Concepts and Institutions', options: ['Intellectual Property Law Key Concepts and Institutions', 'Intellectual Property Law Landmark Cases and Illustrations', 'Intellectual Property Law Processes and Procedures', 'Intellectual Property Law Critical Analysis and Application'] },
            { id: 's2', label: 'Intellectual Property Law Landmark Cases and Illustrations', prompt: 'Which idea is this? — Landmark cases in Intellectual Property Law are judicial decisions by the Supreme Court.', answer: 'Intellectual Property Law Landmark Cases and Illustrations', options: ['Intellectual Property Law Landmark Cases and Illustrations', 'Intellectual Property Law Key Concepts and Institutions', 'Intellectual Property Law Processes and Procedures', 'Intellectual Property Law Critical Analysis and Application'] },
            { id: 's3', label: 'Intellectual Property Law Processes and Procedures', prompt: 'Which idea is this? — Intellectual Property Law — Processes and Procedures refers to the statutory, regulatory.', answer: 'Intellectual Property Law Processes and Procedures', options: ['Intellectual Property Law Processes and Procedures', 'Intellectual Property Law Key Concepts and Institutions', 'Intellectual Property Law Landmark Cases and Illustrations', 'Intellectual Property Law Critical Analysis and Application'] },
            { id: 's4', label: 'Intellectual Property Law Critical Analysis and Application', prompt: 'Which idea is this? — Intellectual Property (IP) refers to creations of the mind — such as inventions, literary.', answer: 'Intellectual Property Law Critical Analysis and Application', options: ['Intellectual Property Law Critical Analysis and Application', 'Intellectual Property Law Key Concepts and Institutions', 'Intellectual Property Law Landmark Cases and Illustrations', 'Intellectual Property Law Processes and Procedures'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_06_006', title: 'You made it',
          caseStudy: { intro: 'You finished Intellectual Property Law — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_001', difficulty: 'standard',
          question: 'Intellectual Property (IP) refers to intangible creations of the human.',
          hint: 'If stuck on "why limited term?", revisit **Class 11 Jurisprudence (c11_leg_cbse_06_001)**.',
          misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get.',
          parts: [
                { id: 'a', prompt: 'Define \'Intellectual Property\' and state the fundamental difference between Industrial Property and Copyright in terms of subject matter.', answer: 'Intellectual Property is intangible property originating from human intellect',
                  options: ['Intellectual Property is intangible property originating from human intellect', 'Copyright covers inventions', 'Registration creates Copyright', 'get copyright'],
                  hint: 'If stuck on "why limited term?", revisit **Class 11 Jurisprudence (c11_leg_cbse_06_001)** — the.',
                  misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get copyright.".' },
                { id: 'b', prompt: 'A startup develops a new AI algorithm that optimizes traffic signals. They want to protect it.', answer: '**Patent**: Requires full public disclosure of the algorithm',
                  options: ['**Patent**: Requires full public disclosure of the algorithm', 'Copyright protects the algorithm', 'Registration creates Copyright', 'get copyright'],
                  hint: 'If stuck on "why limited term?", revisit **Class 11 Jurisprudence (c11_leg_cbse_06_001)** — the.',
                  misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get copyright.".' },
                { id: 'c', prompt: 'Compare the \'National Treatment\' principle under the Paris Convention (Industrial Property) and the Berne Convention (Copyright).', answer: '**Paris (Art',
                  options: ['**Paris (Art', 'Automatic Protection', 'formalities', 'Registration creates Copyright'],
                  hint: 'If stuck on "why limited term?", revisit **Class 11 Jurisprudence (c11_leg_cbse_06_001)** — the.',
                  misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get copyright.".' }
          ],
            remediations: { 'registration-creates-copyright-they-think': { steps: ['**Re-read NCERT p.84** ("Is it necessary to register a work to claim copyright?', 'Acquisition of copyright is automatic...").', '**Contrast with Patent**: Write a 3-row table: (a) Right arises on: Creation (Copyright) vs.', 'Grant after examination (Patent).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Geographical Indication (GI) tags are just trademarks for agricultural products." Use the Darjeeling Tea vs.', answer: '**Trademark**: Owned by a *single entity* (company/individual)',
                  options: ['**Trademark**: Owned by a *single entity* (company/individual)', 'super-trademark', 'Registration creates Copyright', 'get copyright'],
                  hint: 'If stuck on "why limited term?", revisit **Class 11 Jurisprudence (c11_leg_cbse_06_001)** — the.',
                  misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get copyright.".' },
                { id: 'b', prompt: 'Design a hypothetical IP protection strategy for a traditional tribal textile pattern (e.g., Warli painting) that is being copied by fast-fashion brands.', answer: '**Step 1: GI Registration (Warli Painting',
                  options: ['**Step 1: GI Registration (Warli Painting', 'Registration creates Copyright', 'get copyright', 'you must register a novel, song, or painting to "get copyright'],
                  hint: 'If stuck on "why limited term?", revisit **Class 11 Jurisprudence (c11_leg_cbse_06_001)** — the.',
                  misconception: 'Students believe **"Registration creates Copyright"** — they think you must register a novel, song, or painting to "get copyright.".' }
          ],
            remediations: { 'registration-creates-copyright-they-think': { steps: ['**Re-read NCERT p.84** ("Is it necessary to register a work to claim copyright?', 'Acquisition of copyright is automatic...").', '**Contrast with Patent**: Write a 3-row table: (a) Right arises on: Creation (Copyright) vs.', 'Grant after examination (Patent).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_002', difficulty: 'standard',
          question: 'Intellectual Property (IP) refers to creations of the human intellect.',
          hint: 'If stuck, review Class 11 "Sources of Laws — Constitutional and Legal Provisions".',
          misconception: 'Students believe "copyright registration creates copyright." This is false.',
          parts: [
                { id: 'a', prompt: 'What are the two main categories of Intellectual Property as defined in the CBSE Class 12 Legal Studies textbook, and name one right that falls under each.', answer: 'The two main categories are: (1) Industrial Property',
                  options: ['The two main categories are: (1) Industrial Property', 'patents and copyrights are the two categories', 'copyright registration creates copyright', '"copyright registration creates copyright'],
                  hint: 'If stuck, review Class 11 "Sources of Laws — Constitutional and Legal Provisions".',
                  misconception: 'Students believe "copyright registration creates copyright." This is false.' },
                { id: 'b', prompt: 'A software developer in India creates a new mobile app. She wants to protect the app\'s source code, its unique name/logo, and the novel algorithm it uses.', answer: 'Source code → Copyright Act, 1957 (as a literary work)',
                  options: ['Source code → Copyright Act, 1957 (as a literary work)', 'copyright registration creates copyright', '"copyright registration creates copyright'],
                  hint: 'If stuck, review Class 11 "Sources of Laws — Constitutional and Legal Provisions".',
                  misconception: 'Students believe "copyright registration creates copyright." This is false.' },
                { id: 'c', prompt: 'Compare the Universal Copyright Convention (UCC) and the Berne Convention on the basis of: (a) formalities required for protection, (b) term of protection, (c).', answer: 'formalities required for protection, (',
                  options: ['formalities required for protection, (', 'minimum standards', 'maximum protection', 'copyright registration creates copyright'],
                  hint: 'If stuck, review Class 11 "Sources of Laws — Constitutional and Legal Provisions".',
                  misconception: 'Students believe "copyright registration creates copyright." This is false.' }
          ],
            remediations: { 'copyright-registration-creates-copyright': { steps: ['If the student holds this misconception: (1) Have them re-read the "Registration of Copyright" section in the textbook.', 'Acquisition of copyright is automatic..." (2) Give a 2-minute exercise: "Write a poem right now.', 'Prove it without registration." (3) Contrast with Patents Act Sec 6: "Application for patent..." — registration.', '(4) Assign a diagnostic re-test: "True/False: An unregistered copyright cannot be enforced in Indian courts." (Answer.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_003', difficulty: 'standard',
          question: 'Landmark cases in Intellectual Property Law are judicial decisions by the.',
          hint: 'If stuck, revisit **c12_leg_cbse_06_001** (Key Concepts) — specifically the "statutory.',
          misconception: '**Misconception:** "Landmark cases are just important old judgments — I can cite any famous case (like *Kesavananda.',
          parts: [
                { id: 'a', prompt: 'Name the Supreme Court case that established the "triple test" for patentability (novelty, inventive step, industrial application) in India and the year it was.', answer: '**Answer:** *Bishwanath Prasad Radhey Shyam v',
                  options: ['**Answer:** *Bishwanath Prasad Radhey Shyam v', 'efficacy', 'public interest'],
                  hint: 'If stuck, revisit **c12_leg_cbse_06_001** (Key Concepts) — specifically the "statutory test" tables.',
                  misconception: '**Misconception:** "Landmark cases are just important old judgments — I can cite any famous case (like *Kesavananda Bharati* for basic.' },
                { id: 'b', prompt: 'In *Cadila Healthcare Ltd. v. Cadila Pharmaceuticals Ltd.* (2001), the Supreme Court laid down factors for "deceptive similarity" in trademarks.', answer: '**Answer:** The Court emphasised **"the nature of the product"** —',
                  options: ['**Answer:** The Court emphasised **"the nature of the product"** —', 'the nature of the product', 'market share', 'prior use'],
                  hint: 'If stuck, revisit **c12_leg_cbse_06_001** (Key Concepts) — specifically the "statutory test" tables.',
                  misconception: '**Misconception:** "Landmark cases are just important old judgments — I can cite any famous case (like *Kesavananda Bharati* for basic.' }
          ],
            remediations: { 'misconception-landmark-cases-are-just': { steps: ['**Remediation path:** (1) Revisit **c12_leg_cbse_06_001** (Key Concepts) — re-learn the *statutory tests* for each.', '(2) Revisit **c12_leg_cbse_06_002** (Constitutional/Legislative) — map each landmark case to the *specific section*.', '(3) **Re-diagnostic:** Take 3 fact scenarios (patent, TM, copyright), identify the *governing section*, name the.', 'If you cannot do this in 5 mins/scenario, repeat step 1.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_004', difficulty: 'standard',
          question: 'Intellectual Property Law — Processes and Procedures refers to the statutory.',
          hint: 'If confused about which Act governs which IP, revisit c12_leg_cbse_06_001 (Key Concepts).',
          misconception: 'Students believe that "filing a patent application" means "getting a patent." They do not grasp that filing is merely.',
          parts: [
                { id: 'a', prompt: 'Compare the procedural requirements for copyright registration versus patent registration in India. Identify three fundamental procedural differences.', answer: '(1) Copyright registration is voluntary (protection is automatic on creation)',
                  options: ['(1) Copyright registration is voluntary (protection is automatic on creation)', 'filing a patent application', 'getting a patent', '"filing a patent application" means "getting a patent'],
                  hint: 'If confused about which Act governs which IP, revisit c12_leg_cbse_06_001 (Key Concepts) and make.',
                  misconception: 'Students believe that "filing a patent application" means "getting a patent." They do not grasp that filing is merely step 1 of a 5-7 year.' }
          ],
            remediations: { 'filing-a-patent-application-means': { steps: ['Revisit c12_leg_cbse_06_001 (Key Concepts) to clarify the difference between *substantive rights* (what a patent *is*).', 'Create a visual timeline for patent, trademark, and copyright procedures on one A4 sheet — color-code deadlines (red.', 'Practice 5 timeline-calculation problems: given a filing date, compute publication date, examination request deadline.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 with the timeline sheet.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_005', difficulty: 'standard',
          question: 'Intellectual Property Law is the branch of law that grants creators and.',
          hint: 'If stuck, review the "Intellectual Property is divided into two categories" table.',
          misconception: 'Students often believe "Copyright protects ideas" — e.g., "I thought of a story about a time-traveling detective, so.',
          parts: [
                { id: 'a', prompt: 'Compare the protection given to a "trade secret" (e.g., Coca-Cola\'s recipe) vs. a "patent" (e.g., a new drug molecule).', answer: 'A patent gives 20-year monopoly but requires full public disclosure',
                  options: ['A patent gives 20-year monopoly but requires full public disclosure', 'Copyright protects ideas', 'trade secret is a registered right', '"Copyright protects ideas"'],
                  hint: 'If stuck, review the "Intellectual Property is divided into two categories" table.',
                  misconception: 'Students often believe "Copyright protects ideas" — e.g., "I thought of a story about a time-traveling detective, so no one else can write.' }
          ],
            remediations: { 'copyright-protects-ideas-e': { steps: ['Revisit c12_leg_cbse_06_001 (Key Concepts) — re-read the definition of "Intellectual Property" as intangible creations.', 'Use the "smartwatch" worked example (WORKED_EXAMPLE_3) to physically label each component with its IPR type.', 'Write one sentence distinguishing *idea* vs *expression* and *product* vs *invention*.', 'Re-attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_4 — if still wrong, review the Amarnath Sehgal case (moral.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_06_006', difficulty: 'standard',
          question: 'Intellectual Property (IP) refers to creations of the mind — such.',
          hint: 'If stuck, immediately return to **c12_leg_cbse_06_001 (Key Concepts)** and master the.',
          misconception: 'Students consistently confuse **\'Patent\' (functional invention)** with **\'Design\' (aesthetic appearance)** and.',
          parts: [
                { id: 'a', prompt: 'Explain why \'Novelty\', \'Inventive Step\', and \'Industrial Application\' are the three pillars of patentability under the Patents Act, 1970, and how Section 3(k).', answer: 'Novelty ensures the invention is new globally (absolute novelty)',
                  options: ['Novelty ensures the invention is new globally (absolute novelty)', 'Which IP right applies?'],
                  hint: 'If stuck, immediately return to **c12_leg_cbse_06_001 (Key Concepts)** and master the "Comparison.',
                  misconception: 'Students consistently confuse **\'Patent\' (functional invention)** with **\'Design\' (aesthetic appearance)** and **\'Copyright\'.' },
                { id: 'b', prompt: 'A company \'GreenEarth\' registers the trademark \'EcoPure\' for water purifiers. A competitor launches \'EcoPureLife\' for air purifiers.', answer: 'GreenEarth has a strong case for infringement under Sec 29',
                  options: ['GreenEarth has a strong case for infringement under Sec 29', 'Which IP right applies?', 'common source'],
                  hint: 'If stuck, immediately return to **c12_leg_cbse_06_001 (Key Concepts)** and master the "Comparison.',
                  misconception: 'Students consistently confuse **\'Patent\' (functional invention)** with **\'Design\' (aesthetic appearance)** and **\'Copyright\'.' }
          ],
            remediations: { 'students-consistently-confuse-patent-functional': { steps: ['**Re-visit c12_leg_cbse_06_001 (Key Concepts)**: Re-read the definitions table comparing Patent, Design, TM, Copyright.', '**Create a \'Feature-Right Mapping Table\'**: Take 5 products (phone, drug, novel, Darjeeling tea, Coca-Cola bottle).', 'For each, list *every protectable feature* in Column A and the *exact IP right* in Column B with *statutory section*.', '**Practice the \'Overlap Analysis\'**: For the Coca-Cola bottle, write 3 sentences explaining why Design Act Sec 2(d).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
