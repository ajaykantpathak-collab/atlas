import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch08_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch08_p2: SimDef = {
    id: 'v3_c12_bio_ch08_p2',
    title: 'Human Health and Disease',
    subtitle: 'How your immune system hunts, remembers, and sometimes turns on itself.',
    classLevel: 12, subject: 'biology', topic: 'Human Health and Disease',
    chapters: ['c12_bio_ch08'],
    nodeIds: ['c12_bio_cbse_08_007', 'c12_bio_cbse_08_008', 'c12_bio_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an epidemiologist tracing an outbreak', intro: 'A measles case appears in a school that dropped vaccination rates. Your job: explain why one case can become twenty — and why vaccinated kids protect the unvaccinated.', goal: 'Trace how pathogens spread, how immunity works, and why herd immunity is a community property.' },
    discovery: {
        question: 'You get a vaccine that\'s a harmless piece of the virus — and become immune to the real thing. What did your body actually learn?',
        options: ['To recognize the invader\'s shape — memory cells keep the photo', 'To kill all viruses forever', 'To build walls around cells', 'The vaccine does the fighting itself'],
        answer: 'To recognize the invader\'s shape — memory cells keep the photo',
        hook: 'Vaccines don\'t fight the disease — they teach your immune system what it looks like, so the real fight is won before it starts.',
    },
    teaching: [
        { title: 'Cancer: Types and Causes', text: 'Cancer is a group of diseases characterized by uncontrolled and abnormal cell division resulting from genetic mutations that disrupt normal cell cycle regulation, leading to the formation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_08_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'On the immune lab: introduce a pathogen, watch the first response — then reintroduce it and watch memory cells answer in hours, not days.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_007', title: 'Cancer: Types and Causes',
          caseStudy: { intro: 'Begin with a real-world observation: a family member or neighbor diagnosed with "cancer" — the word carries fear, but biologically it means cells have lost.',
            decisions: [{ prompt: 'A patient has a tumor originating from the epithelial lining of the bronchus.', options: [
                { text: 'The cancer is a carcinoma', outcome: 'The cancer is a carcinoma because it arises from epithelial tissue (bronchial lining).' },
                { text: 'cancer is a single disease', outcome: 'Not quite — Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate.', reveals: 'cancer-is-a-single-disease' },
                { text: 'all cancers are caused by viruses', outcome: 'Not quite — Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate.', reveals: 'cancer-is-a-single-disease' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_008', title: 'Cancer: Diagnosis and Treatment',
          caseStudy: { intro: 'Imagine a 55-year-old patient from a small town in Uttar Pradesh who notices a persistent lump in the breast and visits the district hospital.',
            decisions: [{ prompt: 'A patient presents with a 3 cm firm, non-tender lump in the left breast. The physician orders a mammogram followed by a core needle biopsy.', options: [
                { text: 'The critical step is **histopathological confirmation via biopsy** (core needle or', outcome: 'The critical step is **histopathological confirmation via biopsy** (core needle or excisional).' },
                { text: 'mammogram is enough', outcome: 'Not quite — **Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting.', reveals: 'misconception-biopsy-or-surgery-causes' },
                { text: 'start chemo based on imaging', outcome: 'Not quite — **Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting.', reveals: 'misconception-biopsy-or-surgery-causes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_009', title: 'Drug and Alcohol Abuse: Effects on Health',
          caseStudy: { intro: 'Observe a person who consumes alcohol daily: initially they feel relaxed, but over time they need more to get the same effect, and stopping causes tremors.',
            decisions: [{ prompt: 'Name the neurotransmitter primarily involved in the brain\'s reward pathway that is hijacked by almost all addictive drugs, and state the.', options: [
                { text: 'Correct answer: Dopamine is the key neurotransmitter', outcome: 'Correct answer: Dopamine is the key neurotransmitter; the reward pathway originates in the ventral.' },
                { text: 'serotonin', outcome: 'Not quite — Students often believe "addiction is just a lack of willpower" and that "withdrawal is only.', reveals: 'addiction-is-just-a-lack' },
                { text: 'adrenaline', outcome: 'Not quite — Students often believe "addiction is just a lack of willpower" and that "withdrawal is only.', reveals: 'addiction-is-just-a-lack' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Human Health and Disease · Part 2/2', spots: [
            { id: 's1', label: 'Cancer Types and Causes', prompt: 'Which idea is this? — Cancer is a group of diseases characterized by uncontrolled and abnormal cell division.', answer: 'Cancer Types and Causes', options: ['Cancer Types and Causes', 'Cancer Diagnosis and Treatment', 'Drug and Alcohol Abuse Effects on Health'] },
            { id: 's2', label: 'Cancer Diagnosis and Treatment', prompt: 'Which idea is this? — Cancer diagnosis is the systematic process of identifying malignant neoplasms through.', answer: 'Cancer Diagnosis and Treatment', options: ['Cancer Diagnosis and Treatment', 'Cancer Types and Causes', 'Drug and Alcohol Abuse Effects on Health'] },
            { id: 's3', label: 'Drug and Alcohol Abuse Effects on Health', prompt: 'Which idea is this? — Drug and alcohol abuse refers to the chronic, non-medical use of psychoactive substances.', answer: 'Drug and Alcohol Abuse Effects on Health', options: ['Drug and Alcohol Abuse Effects on Health', 'Cancer Types and Causes', 'Cancer Diagnosis and Treatment'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbour\'s child has a runny nose, sneezing and a mild sore throat — a classic common cold. The parent wants to start leftover antibiotic tablets \'to kill the infection fast\' and asks the biology student for a second opinion.',
            decisions: [{ prompt: 'Should the child get antibiotics?', options: [
                { text: 'No — the cold is caused by rhinovirus, and viruses have no cell wall or ribosomes for antibiotics to hit; rest and hygiene help, while the pills only feed antimicrobial resistance.', outcome: 'Antibiotics like ceftriaxone work on bacterial machinery; against a virus they do nothing to the patient and everything to the resistance problem.' },
                { text: 'Yes — fever plus cold symptoms means infection, and antibiotics kill infections.', outcome: 'That conflates pathogen types: bacteria (typhoid, pneumococcal pneumonia) respond; rhinovirus is viral and has no antibiotic target.', reveals: 'antibiotics-kill-viruses' },
                { text: 'Yes — but only a double dose, since colds are \'weaker\' infections that need catching early.', outcome: 'Dose size can\'t fix a missing drug target; doubling a useless drug just raises harm without benefit.', reveals: 'bigger-dose-beats-virus' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_08_009', title: 'You made it',
          caseStudy: { intro: 'Immunity is memory you didn\'t know you had — every cold you fought is recorded, and every vaccine is a wanted poster your cells already have.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_007', difficulty: 'standard',
          question: 'Cancer is a group of diseases characterized by uncontrolled and abnormal cell.',
          hint: 'If stuck, review c11_biotech_cbse_05_010 (Cyclins and CDKs) and c11_biotech_cbse_05_008.',
          misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology.',
          parts: [
                { id: 'a', prompt: 'A patient has a tumor originating from the epithelial lining of the bronchus.', answer: 'The cancer is a carcinoma',
                  options: ['The cancer is a carcinoma', 'cancer is a single disease', 'all cancers are caused by viruses'],
                  hint: 'If stuck, review c11_biotech_cbse_05_010 (Cyclins and CDKs) and c11_biotech_cbse_05_008 (Apoptosis).',
                  misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology (e.g., HPV, HBV).' }
          ],
            remediations: { 'cancer-is-a-single-disease': { steps: ['Revisit cell cycle checkpoints (c11_bio_cbse_10_001) — list G1/S, G2/M, spindle checkpoints and their key proteins.', 'Draw a two-column table: Proto-oncogene vs Tumor Suppressor Gene — fill in: normal function, mutation type (gain/loss.', 'Watch a 5-min animation of Knudson\'s two-hit model (search "Knudson two-hit hypothesis retinoblastoma").', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, review Class 11 biotech apoptosis node.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using Ames test principle to determine if a newly synthesized food additive is mutagenic (and thus potentially carcinogenic).', answer: 'Use Salmonella typhimurium his⁻ strain (cannot synthesize histidine)',
                  options: ['Use Salmonella typhimurium his⁻ strain (cannot synthesize histidine)', 'cancer is a single disease', 'all cancers are caused by viruses'],
                  hint: 'If stuck, review c11_biotech_cbse_05_010 (Cyclins and CDKs) and c11_biotech_cbse_05_008 (Apoptosis).',
                  misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology (e.g., HPV, HBV).' }
          ],
            remediations: { 'cancer-is-a-single-disease': { steps: ['Revisit cell cycle checkpoints (c11_bio_cbse_10_001) — list G1/S, G2/M, spindle checkpoints and their key proteins.', 'Draw a two-column table: Proto-oncogene vs Tumor Suppressor Gene — fill in: normal function, mutation type (gain/loss.', 'Watch a 5-min animation of Knudson\'s two-hit model (search "Knudson two-hit hypothesis retinoblastoma").', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, review Class 11 biotech apoptosis node.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_008', difficulty: 'standard',
          question: 'Cancer diagnosis is the systematic process of identifying malignant neoplasms.',
          hint: 'If stuck on treatment mechanisms: Revisit c11_bio_cbse_10_001 (cell cycle) for chemo.',
          misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor.".',
          parts: [
                { id: 'a', prompt: 'A 60-year-old male smoker has a 4 cm right lung mass on CT scan, biopsy shows small cell lung cancer (SCLC), and PET-CT shows uptake in liver and bone.', answer: '**Rationale**: SCLC is staged as limited or extensive stage',
                  options: ['**Rationale**: SCLC is staged as limited or extensive stage', 'cutting out the tumor cures cancer'],
                  hint: 'If stuck on treatment mechanisms: Revisit c11_bio_cbse_10_001 (cell cycle) for chemo.',
                  misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor." **Exact wrong.' },
                { id: 'b', prompt: 'Compare and contrast the mechanism of action and side effect profile of: (a) conventional cytotoxic chemotherapy (e.g., paclitaxel), (b) targeted therapy.', answer: 'conventional cytotoxic chemotherapy (e.g., paclitaxel), (',
                  options: ['conventional cytotoxic chemotherapy (e.g., paclitaxel), (', 'trastuzumab causes hair loss'],
                  hint: 'If stuck on treatment mechanisms: Revisit c11_bio_cbse_10_001 (cell cycle) for chemo.',
                  misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor." **Exact wrong.' }
          ],
            remediations: { 'misconception-biopsy-or-surgery-causes': { steps: ['If student holds the "biopsy spreads cancer" misconception: 1.', '**Revisit c12_bio_cbse_08_007** — review metastasis mechanism (EMT, intravasation, colonization) to understand it\'s.', '**Watch a 5-min video** of core needle biopsy procedure (available on YouTube: "breast core needle biopsy procedure").', '**Analyze data**: Compare survival curves of patients who had biopsy vs those who refused — biopsy group has better.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_009', difficulty: 'standard',
          question: 'Drug and alcohol abuse refers to the chronic, non-medical use of psychoactive.',
          hint: 'If stuck, revisit Class 11 Neural Control and Coordination: specifically the synapse.',
          misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact.',
          parts: [
                { id: 'a', prompt: 'Name the neurotransmitter primarily involved in the brain\'s reward pathway that is hijacked by almost all addictive drugs, and state the specific brain region.', answer: 'Correct answer: Dopamine is the key neurotransmitter',
                  options: ['Correct answer: Dopamine is the key neurotransmitter', 'serotonin', 'adrenaline', 'addiction is just a lack of willpower'],
                  hint: 'If stuck, revisit Class 11 Neural Control and Coordination: specifically the synapse mechanism.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' },
                { id: 'b', prompt: 'Explain why a chronic alcohol user develops tolerance and experiences withdrawal symptoms like tremors and seizures when they stop drinking, linking your.', answer: 'Correct answer: Alcohol enhances GABAergic inhibition and inhibits glutamatergic',
                  options: ['Correct answer: Alcohol enhances GABAergic inhibition and inhibits glutamatergic', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'If stuck, revisit Class 11 Neural Control and Coordination: specifically the synapse mechanism.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' },
                { id: 'c', prompt: 'A 25-year-old male injects heroin daily. He develops pinpoint pupils, respiratory depression, and constipation.', answer: 'Correct answer: Heroin is an opioid',
                  options: ['Correct answer: Heroin is an opioid', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'If stuck, revisit Class 11 Neural Control and Coordination: specifically the synapse mechanism.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' }
          ],
            remediations: { 'addiction-is-just-a-lack': { steps: ['Show the PET scan comparison (normal vs addicted brain) highlighting reduced dopamine D2 receptors in striatum and.', 'Walk through the alcohol withdrawal timeline (6-12h: tremor, anxiety; 12-48h: hallucinations; 48-72h: seizures.', 'Assign a case study of a patient with opioid use disorder on buprenorphine maintenance to illustrate that.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
