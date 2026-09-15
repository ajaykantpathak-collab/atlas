import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch08_p1: SimDef = {
    id: 'v3_c12_bio_ch08_p1',
    title: 'Human Health and Disease',
    subtitle: 'How your immune system hunts, remembers, and sometimes turns on itself.',
    classLevel: 12, subject: 'biology', topic: 'Human Health and Disease · Part 1/2',
    chapters: ['c12_bio_ch08'],
    nodeIds: ['c12_bio_cbse_08_001', 'c12_bio_cbse_08_002', 'c12_bio_cbse_08_003', 'c12_bio_cbse_08_004', 'c12_bio_cbse_08_005', 'c12_bio_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an epidemiologist tracing an outbreak', intro: 'A measles case appears in a school that dropped vaccination rates. Your job: explain why one case can become twenty — and why vaccinated kids protect the unvaccinated.', goal: 'Trace how pathogens spread, how immunity works, and why herd immunity is a community property.' },
    discovery: {
        question: 'You get a vaccine that\'s a harmless piece of the virus — and become immune to the real thing. What did your body actually learn?',
        options: ['To recognize the invader\'s shape — memory cells keep the photo', 'To kill all viruses forever', 'To build walls around cells', 'The vaccine does the fighting itself'],
        answer: 'To recognize the invader\'s shape — memory cells keep the photo',
        hook: 'Vaccines don\'t fight the disease — they teach your immune system what it looks like, so the real fight is won before it starts.',
    },
    teaching: [
        { title: 'Common Diseases: Typhoid, Pneumonia, Common Cold', text: 'Typhoid, pneumonia, and the common cold are three distinct infectious diseases caused by specific pathogens: *Salmonella typhi* (bacterium) for typhoid, *Streptococcus pneumoniae* and *Haemophilus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_08_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'On the immune lab: introduce a pathogen, watch the first response — then reintroduce it and watch memory cells answer in hours, not days.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_002', title: 'Infectious Diseases: Mode of Transmission',
          caseStudy: { intro: 'Observe a classmate sneezing without covering their mouth — droplets travel ~1 metre and land on your desk.',
            decisions: [{ prompt: 'Define "vehicle-borne transmission" and give one bacterial and one viral disease example where this is the primary route.', options: [
                { text: 'Vehicle-borne transmission occurs when pathogens are carried through contaminated', outcome: 'Vehicle-borne transmission occurs when pathogens are carried through contaminated inanimate.' },
                { text: 'vector-borne', outcome: 'Not quite — Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve.', reveals: 'vector-borne-and-vehicle-borne' },
                { text: 'vehicle-borne', outcome: 'Not quite — Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve.', reveals: 'vector-borne-and-vehicle-borne' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_003', title: 'Immunity: Innate and Acquired Immunity',
          caseStudy: { intro: 'Observe a small cut on your finger — within hours it reddens, swells, and may form pus.',
            decisions: [{ prompt: 'Name the four types of physical/chemical barriers in innate immunity and give one example of each.', options: [
                { text: 'Correct: (1) Physical: skin, mucous membranes', outcome: 'Correct: (1) Physical: skin, mucous membranes; (2) Physiological: stomach acid (pH 1.5–3.5).' },
                { text: 'antibodies', outcome: 'Not quite — Students believe "acquired immunity only starts after innate immunity fails." In reality, both.', reveals: 'acquired-immunity-only-starts-after' },
                { text: 'acquired immunity only starts after innate immunity fails', outcome: 'Not quite — Students believe "acquired immunity only starts after innate immunity fails." In reality, both.', reveals: 'acquired-immunity-only-starts-after' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_004', title: 'Active and Passive Immunity',
          caseStudy: { intro: 'Start with a real-world observation: When a child gets chickenpox, they usually don\'t get it again.',
            decisions: [{ prompt: 'What is the fundamental difference between active and passive immunity in terms of antibody production?', options: [
                { text: 'In active immunity, the individual\'s own immune system produces antibodies in response to', outcome: 'In active immunity, the individual\'s own immune system produces antibodies in response to.' },
                { text: 'both involve the body making antibodies', outcome: 'Not quite — Students often think that passive immunity involves the recipient\'s immune system being \'activated\'.', reveals: 'passive-immunity-involves-the-recipient' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_005', title: 'Vaccination and Immunization',
          scaffold: { problem: 'A 2-month-old infant is brought for first pentavalent vaccine (DPT + Hep B + Hib). The mother asks: "Why so many vaccines at once?',
            steps: [
            { text: 'Identify the immunological concern — antigen load vs immune capacity.' },
            { text: 'Recall that vaccines use purified antigens, not whole pathogens (except live attenuated).' },
            { text: 'Apply clonal selection theory — each antigen activates specific B/T cell clones independently; no "competition".' },
            { text: 'Note that combination vaccines reduce injection pain, clinic visits, and improve coverage — proven by WHO/EPI studies.' },
            { text: 'Conclude: Immune system handles thousands of antigens simultaneously; pentavalent is safe, effective, and logistically.', faded: true, blankAnswer: 'The baby\'s immune system encounters trillions of antigens.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_006', title: 'AIDS: HIV Structure and Replication',
          caseStudy: { intro: 'Imagine a key trying to enter a locked house — HIV\'s gp120 protein acts like a key that fits only the CD4 receptor "lock" on helper T cells.',
            decisions: [{ prompt: 'Name the two viral glycoproteins on the HIV envelope and state the specific host cell receptor and co-receptor each binds to during viral.', options: [
                { text: 'Correct answer: gp120 binds to CD4 receptor on helper T cells', outcome: 'Correct answer: gp120 binds to CD4 receptor on helper T cells; gp41 mediates fusion after gp120.' },
                { text: 'gp120 binds to CCR5 directly', outcome: 'Not quite — Students believe HIV directly kills most CD4+ T cells by lysing them during active replication, and.', reveals: 'hiv-directly-kills-most-cd4' },
                { text: 'gp41 binds CD4', outcome: 'Not quite — Students believe HIV directly kills most CD4+ T cells by lysing them during active replication, and.', reveals: 'hiv-directly-kills-most-cd4' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Health and Disease · Part 1/2', spots: [
            { id: 's1', label: 'Common Diseases Typhoid Pneumonia Common Cold', prompt: 'Which idea is this? — Typhoid, pneumonia, and the common cold are three distinct infectious diseases caused.', answer: 'Common Diseases Typhoid Pneumonia Common Cold', options: ['Common Diseases Typhoid Pneumonia Common Cold', 'Infectious Diseases Mode of Transmission', 'Immunity Innate and Acquired Immunity', 'Active and Passive Immunity'] },
            { id: 's2', label: 'Infectious Diseases Mode of Transmission', prompt: 'Which idea is this? — Mode of transmission refers to the specific pathway by which an infectious agent.', answer: 'Infectious Diseases Mode of Transmission', options: ['Infectious Diseases Mode of Transmission', 'Common Diseases Typhoid Pneumonia Common Cold', 'Immunity Innate and Acquired Immunity', 'Active and Passive Immunity'] },
            { id: 's3', label: 'Immunity Innate and Acquired Immunity', prompt: 'Which idea is this? — Immunity is the ability of an organism to resist or eliminate potentially harmful foreign.', answer: 'Immunity Innate and Acquired Immunity', options: ['Immunity Innate and Acquired Immunity', 'Common Diseases Typhoid Pneumonia Common Cold', 'Infectious Diseases Mode of Transmission', 'Active and Passive Immunity'] },
            { id: 's4', label: 'Active and Passive Immunity', prompt: 'Which idea is this? — Active immunity is the immunity developed by an individual\'s own immune system.', answer: 'Active and Passive Immunity', options: ['Active and Passive Immunity', 'Common Diseases Typhoid Pneumonia Common Cold', 'Infectious Diseases Mode of Transmission', 'Immunity Innate and Acquired Immunity'] },
            { id: 's5', label: 'Vaccination and Immunization', prompt: 'Which idea is this? — Vaccination is the deliberate administration of antigenic material (a vaccine).', answer: 'Vaccination and Immunization', options: ['Vaccination and Immunization', 'Common Diseases Typhoid Pneumonia Common Cold', 'Infectious Diseases Mode of Transmission', 'Immunity Innate and Acquired Immunity'] },
            { id: 's6', label: 'AIDS HIV Structure and Replication', prompt: 'Which idea is this? — Human Immunodeficiency Virus (HIV) is a retrovirus belonging to the genus Lentivirus that.', answer: 'AIDS HIV Structure and Replication', options: ['AIDS HIV Structure and Replication', 'Common Diseases Typhoid Pneumonia Common Cold', 'Infectious Diseases Mode of Transmission', 'Immunity Innate and Acquired Immunity'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbour\'s child has a runny nose, sneezing and a mild sore throat — a classic common cold. The parent wants to start leftover antibiotic tablets \'to kill the infection fast\' and asks the biology student for a second opinion.',
            decisions: [{ prompt: 'Should the child get antibiotics?', options: [
                { text: 'No — the cold is caused by rhinovirus, and viruses have no cell wall or ribosomes for antibiotics to hit; rest and hygiene help, while the pills only feed antimicrobial resistance.', outcome: 'Antibiotics like ceftriaxone work on bacterial machinery; against a virus they do nothing to the patient and everything to the resistance problem.' },
                { text: 'Yes — fever plus cold symptoms means infection, and antibiotics kill infections.', outcome: 'That conflates pathogen types: bacteria (typhoid, pneumococcal pneumonia) respond; rhinovirus is viral and has no antibiotic target.', reveals: 'antibiotics-kill-viruses' },
                { text: 'Yes — but only a double dose, since colds are \'weaker\' infections that need catching early.', outcome: 'Dose size can\'t fix a missing drug target; doubling a useless drug just raises harm without benefit.', reveals: 'bigger-dose-beats-virus' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Immunity is memory you didn\'t know you had — every cold you fought is recorded, and every vaccine is a wanted poster your cells already have.',
            decisions: [{ prompt: 'What comes next? Human Health and Disease · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Health and Disease · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_001', difficulty: 'standard',
          question: 'Typhoid, pneumonia, and the common cold are three distinct infectious diseases.',
          hint: 'If stuck, revisit c11_bio_cbse_02_003 (bacterial cell wall) and c11_bio_cbse_02_009.',
          misconception: '**"All respiratory infections are \'flu\' and need antibiotics."** Students conflate common cold (viral), flu (influenza.',
          parts: [
                { id: 'a', prompt: 'A patient has gradual onset fever (step-ladder pattern), headache, constipation, and rose spots on abdomen. Widal test is positive.', answer: 'Ceftriaxone (a cephalosporin) inhibits bacterial cell wall synthesis',
                  options: ['Ceftriaxone (a cephalosporin) inhibits bacterial cell wall synthesis', 'antibiotics kill all germs'],
                  hint: 'If stuck, revisit c11_bio_cbse_02_003 (bacterial cell wall) and c11_bio_cbse_02_009 (virus.',
                  misconception: '**"All respiratory infections are \'flu\' and need antibiotics."** Students conflate common cold (viral), flu (influenza virus), and.' },
                { id: 'b', prompt: 'Compare the transmission routes of typhoid, pneumonia, and common cold.', answer: 'Typhoid: **faecal-oral** (contaminated food/water)',
                  options: ['Typhoid: **faecal-oral** (contaminated food/water)', 'common cold', 'common'],
                  hint: 'If stuck, revisit c11_bio_cbse_02_003 (bacterial cell wall) and c11_bio_cbse_02_009 (virus.',
                  misconception: '**"All respiratory infections are \'flu\' and need antibiotics."** Students conflate common cold (viral), flu (influenza virus), and.' }
          ],
            remediations: { 'all-respiratory-infections-are-flu': { steps: ['Revisit **c8_bio_ch2_4** (Infectious Diseases: Bacterial, Viral, Fungal) to relearn pathogen categories.', 'Review **c11_bio_cbse_02_003** (Bacteria: Structure) and **c11_bio_cbse_02_009** (Viruses) to internalize structural.', 'Do a **table-mapping exercise**: For each disease, write: Pathogen name → Kingdom/Group → Key structural feature → Drug.', 'Re-attempt Diagnostic Questions 1, 3, 5.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_002', difficulty: 'standard',
          question: 'Mode of transmission refers to the specific pathway by which an infectious.',
          hint: 'If stuck, review c8_bio_ch2_5 (Transmission of Diseases) and c11_bio_cbse_02_002/009.',
          misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.',
          parts: [
                { id: 'a', prompt: 'A village uses a common pond for bathing, washing cattle, and drawing drinking water. During monsoon, cases of acute diarrhoea spike.', answer: 'Mode: vehicle-borne (water)',
                  options: ['Mode: vehicle-borne (water)', 'vector-borne', 'vehicle-borne', 'mosquito is a vehicle for malaria'],
                  hint: 'If stuck, review c8_bio_ch2_5 (Transmission of Diseases) and c11_bio_cbse_02_002/009 (Kingdom.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' },
                { id: 'b', prompt: 'Compare mechanical vs biological vectors using housefly (Musca domestica) and Anopheles mosquito as examples.', answer: 'Mechanical vector (housefly): pathogen carried passively on body parts (legs,',
                  options: ['Mechanical vector (housefly): pathogen carried passively on body parts (legs,', 'both just carry germs', 'vector-borne', 'vehicle-borne'],
                  hint: 'If stuck, review c8_bio_ch2_5 (Transmission of Diseases) and c11_bio_cbse_02_002/009 (Kingdom.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' }
          ],
            remediations: { 'vector-borne-and-vehicle-borne': { steps: ['Revisit c8_bio_ch2_5 (Transmission of Diseases: Direct and Indirect Contact) — make a two-column table: "Living.', 'Watch a 5-minute animation of Plasmodium life cycle in mosquito (sporogony) vs Vibrio survival in water — note.', 'Re-attempt Diagnostic Question 4; if still confused, draw the transmission chain for malaria and cholera side-by-side.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Vertical transmission only occurs for viral infections like HIV." Provide two counter-examples (one bacterial, one parasitic) and.', answer: 'Statement is false',
                  options: ['Statement is false', 'vector-borne', 'vehicle-borne', 'mosquito is a vehicle for malaria'],
                  hint: 'If stuck, review c8_bio_ch2_5 (Transmission of Diseases) and c11_bio_cbse_02_002/009 (Kingdom.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' },
                { id: 'b', prompt: 'Design a simple community-level experiment to demonstrate that houseflies mechanically transmit enteric bacteria from faeces to food.', answer: 'Set up: Two identical plates of cooked rice',
                  options: ['Set up: Two identical plates of cooked rice', 'vector-borne', 'vehicle-borne', 'mosquito is a vehicle for malaria'],
                  hint: 'If stuck, review c8_bio_ch2_5 (Transmission of Diseases) and c11_bio_cbse_02_002/009 (Kingdom.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' }
          ],
            remediations: { 'vector-borne-and-vehicle-borne': { steps: ['Revisit c8_bio_ch2_5 (Transmission of Diseases: Direct and Indirect Contact) — make a two-column table: "Living.', 'Watch a 5-minute animation of Plasmodium life cycle in mosquito (sporogony) vs Vibrio survival in water — note.', 'Re-attempt Diagnostic Question 4; if still confused, draw the transmission chain for malaria and cholera side-by-side.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_003', difficulty: 'standard',
          question: 'Immunity is the ability of an organism to resist or eliminate potentially.',
          hint: 'If leukocyte identification is weak, review c11_bio_cbse_15_001 (blood formed elements).',
          misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate.',
          parts: [
                { id: 'a', prompt: 'Name the four types of physical/chemical barriers in innate immunity and give one example of each.', answer: 'Correct: (1) Physical: skin, mucous membranes',
                  options: ['Correct: (1) Physical: skin, mucous membranes', 'antibodies', 'acquired immunity only starts after innate immunity fails', '"acquired immunity only starts after innate immunity fails'],
                  hint: 'If leukocyte identification is weak, review c11_bio_cbse_15_001 (blood formed elements) and.',
                  misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate simultaneously upon.' }
          ],
            remediations: { 'acquired-immunity-only-starts-after': { steps: ['Revisit c8_bio_ch2_8 (Class 8 immunity basics) — draw a timeline from pathogen entry (0 h) to antibody peak (7–10 d).', 'Watch a 5-min animation of dendritic cell–T cell interaction (e.g., HHMI BioInteractive).', 'Re-attempt Diagnostic Q4 and Q5 — if still confused, explicitly write: "Dendritic cell is the bridge: it performs.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_004', difficulty: 'standard',
          question: 'Active immunity is the immunity developed by an individual\'s own immune system.',
          hint: 'If stuck, revisit the humoral immunity section in node c12_bio_cbse_08_003, focusing.',
          misconception: 'Students often think that passive immunity involves the recipient\'s immune system being \'activated\' by the transferred.',
          parts: [
                { id: 'a', prompt: 'Why does passive immunity provide immediate protection but last only a few weeks to months, while active immunity takes time to develop but lasts years or.', answer: 'Passive immunity provides immediate protection',
                  options: ['Passive immunity provides immediate protection', 'passive immunity lasts longer'],
                  hint: 'If stuck, revisit the humoral immunity section in node c12_bio_cbse_08_003, focusing on clonal.',
                  misconception: 'Students often think that passive immunity involves the recipient\'s immune system being \'activated\' by the transferred antibodies, leading.' },
                { id: 'b', prompt: 'A farmer is bitten by a venomous snake. The doctor administers antivenom serum.', answer: 'This is artificial passive immunity',
                  options: ['This is artificial passive immunity', 'it\'s active immunity'],
                  hint: 'If stuck, revisit the humoral immunity section in node c12_bio_cbse_08_003, focusing on clonal.',
                  misconception: 'Students often think that passive immunity involves the recipient\'s immune system being \'activated\' by the transferred antibodies, leading.' }
          ],
            remediations: { 'passive-immunity-involves-the-recipient': { steps: ['If the student holds this misconception, have them revisit the mechanism of antibody action (antigen binding.', 'Use the analogy: Passive immunity is like borrowing a shield; active immunity is like learning to make your own shield.', 'Then re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_005', difficulty: 'standard',
          question: 'Vaccination is the deliberate administration of antigenic material (a vaccine).',
          hint: 'If stuck, revisit c12_bio_cbse_08_003 (Innate and Acquired Immunity) focusing on the.',
          misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.',
          parts: [
                { id: 'a', prompt: 'Name the type of vaccine used for BCG, OPV, and hepatitis B in India\'s Universal Immunization Programme, and state one characteristic feature of each type.', answer: 'BCG = live attenuated (Mycobacterium bovis strain)',
                  options: ['BCG = live attenuated (Mycobacterium bovis strain)', 'live attenuated', 'vaccines contain the disease-causing germ in weak form', '"vaccines contain the disease-causing germ in weak form" for ALL vaccines'],
                  hint: 'If stuck, revisit c12_bio_cbse_08_003 (Innate and Acquired Immunity) focusing on the "Memory".',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' },
                { id: 'b', prompt: 'Explain why a child who receives the full schedule of DPT (diphtheria, pertussis, tetanus) vaccines still needs booster doses at 16-24 months and 5-6 years.', answer: 'DPT contains inactivated toxins (toxoids) and killed bacteria',
                  options: ['DPT contains inactivated toxins (toxoids) and killed bacteria', 'DPT is weaker', 'vaccines contain the disease-causing germ in weak form', '"vaccines contain the disease-causing germ in weak form" for ALL vaccines'],
                  hint: 'If stuck, revisit c12_bio_cbse_08_003 (Innate and Acquired Immunity) focusing on the "Memory".',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' },
                { id: 'c', prompt: 'A 10-year-old child missed the MMR vaccine at 9-12 months. The parents ask if giving it now is still effective.', answer: 'Yes, MMR (live attenuated) can be given at any age >9 months',
                  options: ['Yes, MMR (live attenuated) can be given at any age >9 months', 'too late, immunity window closed', 'vaccines contain the disease-causing germ in weak form', '"vaccines contain the disease-causing germ in weak form" for ALL vaccines'],
                  hint: 'If stuck, revisit c12_bio_cbse_08_003 (Innate and Acquired Immunity) focusing on the "Memory".',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' },
                { id: 'd', prompt: 'Compare the immunological basis of herd immunity for a highly contagious disease like measles (R₀ ≈ 12-18) versus a less contagious disease like polio (R₀ ≈.', answer: 'Herd immunity threshold = 1 - 1/R₀',
                  options: ['Herd immunity threshold = 1 - 1/R₀', 'vaccines contain the disease-causing germ in weak form', '"vaccines contain the disease-causing germ in weak form" for ALL vaccines'],
                  hint: 'If stuck, revisit c12_bio_cbse_08_003 (Innate and Acquired Immunity) focusing on the "Memory".',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' }
          ],
            remediations: { 'vaccines-contain-the-disease-causing': { steps: ['Revisit c12_bio_cbse_08_004 (Active and Passive Immunity) — specifically the table comparing vaccine types.', 'Make a 4-column table: Vaccine | Type | Antigen Form | Can it replicate?', 'For each, write one sentence: "This vaccine induces immunity by ___ without causing disease because ___."', 'Re-attempt Diagnostic Q1 and Q5. If still confused, watch ICMR-NIV video on vaccine platforms (YouTube: "ICMR vaccine.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_006', difficulty: 'standard',
          question: 'Human Immunodeficiency Virus (HIV) is a retrovirus belonging to the genus.',
          hint: 'If stuck, review c11_bio_cbse_02_009 (virus types) and c11_biotech_cbse_07_001 (central.',
          misconception: 'Students believe HIV directly kills most CD4+ T cells by lysing them during active replication, and that the viral RNA.',
          parts: [
                { id: 'a', prompt: 'Name the two viral glycoproteins on the HIV envelope and state the specific host cell receptor and co-receptor each binds to during viral entry.', answer: 'Correct answer: gp120 binds to CD4 receptor on helper T cells',
                  options: ['Correct answer: gp120 binds to CD4 receptor on helper T cells', 'gp120 binds to CCR5 directly', 'gp41 binds CD4'],
                  hint: 'If stuck, review c11_bio_cbse_02_009 (virus types) and c11_biotech_cbse_07_001 (central dogma).',
                  misconception: 'Students believe HIV directly kills most CD4+ T cells by lysing them during active replication, and that the viral RNA genome is directly.' },
                { id: 'b', prompt: 'A patient on antiretroviral therapy shows viral load rebound. Genotypic resistance testing reveals a mutation in the protease gene (D30N).', answer: 'Correct answer: The mutation acts at the MATURATION stage (after budding)',
                  options: ['Correct answer: The mutation acts at the MATURATION stage (after budding)', 'assembly', 'budding', 'protease makes RNA'],
                  hint: 'If stuck, review c11_bio_cbse_02_009 (virus types) and c11_biotech_cbse_07_001 (central dogma).',
                  misconception: 'Students believe HIV directly kills most CD4+ T cells by lysing them during active replication, and that the viral RNA genome is directly.' }
          ],
            remediations: { 'hiv-directly-kills-most-cd4': { steps: ['Revisit c11_bio_cbse_02_009 (Viruses and Viroids) to clarify virus classification — retroviruses vs. other RNA viruses.', 'Review c11_biotech_cbse_07_001 (Central Dogma) and c11_biotech_cbse_07_002 (Transcription) to reinforce DNA→RNA→protein.', 'Watch animation of HIV replication cycle (e.g., HHMI BioInteractive) focusing on subcellular location of each step.', 'Re-attempt Diagnostic Questions 2 and 3; if error persists, map each antiretroviral drug class to its target step on.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
