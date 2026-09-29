import type { SimDef } from '../../engine/types';
import C12_BiologyOriginLifeSim from '../../../simulations/c6_12/C12_BiologyOriginLifeSim';

/** v3 wrapped master — C12_BiologyOriginLifeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyoriginlifesim: SimDef = {
    id: 'v3w_c12_biologyoriginlifesim',
    title: 'Cancer: Types and Causes',
    subtitle: 'Covers: histological classification of cancers (carcinoma, sarcoma, leukemia, lymphoma),.',
    classLevel: 12, subject: 'biology', topic: 'Cancer: Types and Causes',
    chapters: [],
    nodeIds: ['c12_bio_cbse_08_007', 'c12_bio_cbse_08_002', 'c12_bio_cbse_08_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real-world observation: a family member or neighbor diagnosed with "cancer" — the word carries.', goal: 'Master Cancer: Types and Causes.' },
    discovery: {
        question: 'A patient has a tumor originating from the epithelial lining of the bronchus.',
        options: ['The cancer is a carcinoma', 'cancer is a single disease', 'all cancers are caused by viruses'],
        answer: 'The cancer is a carcinoma',
        hook: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology.',
    },
    teaching: [
        { title: 'Cancer is a group of diseases characterized.', text: 'Cancer is a group of diseases characterized by uncontrolled and abnormal cell division resulting from genetic mutations that disrupt normal cell cycle regulation, leading to the formation of.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_007', title: 'Cancer is a group of diseases.',
          scaffold: { problem: 'A 60-year-old male smoker presents with a 3 cm mass in the right upper lobe of lung.',
            steps: [
            { text: 'Identify tissue of origin — glands lined by epithelial cells → carcinoma (specifically adenocarcinoma of lung).' },
            { text: 'Recognize malignant features — nuclear pleomorphism, mitotic figures, invasion implied by mass.' },
            { text: 'Link exposure to carcinogen category — cigarette smoke contains >70 chemical carcinogens (polycyclic aromatic.' },
            { text: 'Trace molecular pathway — PAHs metabolized by CYP450 to reactive epoxides → form DNA adducts → cause G→T transversions.' },
            { text: 'Verify classification — lung adenocarcinomas are carcinomas (epithelial), not sarcomas; smoking is the major risk.', faded: true, blankAnswer: 'Lung adenocarcinoma (carcinoma) caused by chemical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_002', title: 'Mode of transmission refers to the.',
          scaffold: { problem: 'During a flood, a community uses river water for drinking without treatment.',
            steps: [
            { text: 'Recognise the scenario — common source outbreak via contaminated water → vehicle-borne transmission (water as passive.' },
            { text: 'Match symptoms (rice-water stool, rapid onset) to Vibrio cholerae — a Gram-negative bacterium producing cholera toxin.' },
            { text: 'Recall that V. cholerae survives in aquatic environments but is heat-labile; boiling (100°C) denatures proteins and.' },
            { text: 'Trace the chain: river water (vehicle) → ingestion (portal of entry) → intestinal colonisation → disease.' },
            { text: 'Verify — boiled water cooled in clean container prevents recontamination; confirm by absence of new cases after.', faded: true, blankAnswer: 'Vehicle-borne (water) transmission; pathogen = Vibrio.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_008', title: 'Cancer diagnosis is the systematic.',
          scaffold: { problem: 'A 38-year-old woman is diagnosed with a 1.8 cm grade 2 invasive ductal carcinoma, ER+, PR+, HER2-, Ki-67 15%.',
            steps: [
            { text: 'Determine T category — tumor 1.8 cm → T1c (>1 cm, ≤2 cm).' },
            { text: 'Determine N category — sentinel node negative → N0.' },
            { text: 'Determine M category — no distant mets on staging → M0.' },
            { text: 'Combine for anatomic stage — T1c N0 M0 = Stage IA (AJCC 8th edition).' },
            { text: 'Assess biological risk — ER+/PR+/HER2-, grade 2, Ki-67 15% → Luminal A-like (low genomic risk).' },
            { text: 'Apply treatment algorithm — Stage IA, Luminal A, node-negative → Endocrine therapy alone (tamoxifen for premenopausal).' },
            { text: 'Consider radiotherapy — Breast-conserving surgery → whole breast radiotherapy indicated; mastectomy → no radiotherapy.' },
            { text: 'Final plan — Lumpectomy + sentinel node biopsy → whole breast RT → tamoxifen × 5-10 years.', faded: true, blankAnswer: 'Stage IA (T1cN0M0), Luminal A subtype, low clinical risk..' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Cancer: Types and Causes', spots: [
            { id: 's1', label: 'Cancer is a group of', prompt: 'Which idea is this? — Cancer is a group of diseases characterized by uncontrolled and abnormal cell division.', answer: 'Cancer is a group of', options: ['Cancer is a group of', 'Mode of transmission refers to', 'Cancer diagnosis is the systematic'] },
            { id: 's2', label: 'Mode of transmission refers to', prompt: 'Which idea is this? — Mode of transmission refers to the specific pathway by which an infectious agent.', answer: 'Mode of transmission refers to', options: ['Mode of transmission refers to', 'Cancer is a group of', 'Cancer diagnosis is the systematic'] },
            { id: 's3', label: 'Cancer diagnosis is the systematic', prompt: 'Which idea is this? — Cancer diagnosis is the systematic process of identifying malignant neoplasms through.', answer: 'Cancer diagnosis is the systematic', options: ['Cancer diagnosis is the systematic', 'Cancer is a group of', 'Mode of transmission refers to'] }
          ] } }
    ],
    explore: { component: C12_BiologyOriginLifeSim, prompt: 'Explore the interactive — Cancer: Types and Causes' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_007', difficulty: 'standard',
          question: 'Cancer is a group of diseases characterized by uncontrolled and abnormal cell.',
          hint: 'If stuck, review c11_biotech_cbse_05_010 (Cyclins and CDKs) and c11_biotech_cbse_05_008.',
          misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology.',
          parts: [
                { id: 'a', prompt: 'A patient has a tumor originating from the epithelial lining of the bronchus.', answer: 'The cancer is a carcinoma',
                  options: ['The cancer is a carcinoma', 'cancer is a single disease', 'all cancers are caused by viruses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology (e.g., HPV, HBV).' }
          ],
            remediations: { 'cancer-is-a-single-disease': { steps: ['Revisit cell cycle checkpoints (c11_bio_cbse_10_001) — list G1/S, G2/M, spindle checkpoints and their key proteins.', 'Draw a two-column table: Proto-oncogene vs Tumor Suppressor Gene — fill in: normal function, mutation type (gain/loss.', 'Watch a 5-min animation of Knudson\'s two-hit model (search "Knudson two-hit hypothesis retinoblastoma").', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, review Class 11 biotech apoptosis node.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using Ames test principle to determine if a newly synthesized food additive is mutagenic (and thus potentially carcinogenic).', answer: 'Use Salmonella typhimurium his⁻ strain (cannot synthesize histidine)',
                  options: ['Use Salmonella typhimurium his⁻ strain (cannot synthesize histidine)', 'cancer is a single disease', 'all cancers are caused by viruses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "cancer is a single disease" and "all cancers are caused by viruses" — they conflate infectious etiology (e.g., HPV, HBV).' }
          ],
            remediations: { 'cancer-is-a-single-disease': { steps: ['Revisit cell cycle checkpoints (c11_bio_cbse_10_001) — list G1/S, G2/M, spindle checkpoints and their key proteins.', 'Draw a two-column table: Proto-oncogene vs Tumor Suppressor Gene — fill in: normal function, mutation type (gain/loss.', 'Watch a 5-min animation of Knudson\'s two-hit model (search "Knudson two-hit hypothesis retinoblastoma").', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, review Class 11 biotech apoptosis node.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_002', difficulty: 'standard',
          question: 'Mode of transmission refers to the specific pathway by which an infectious.',
          hint: 'If stuck, review c8_bio_ch2_5 (Transmission of Diseases) and c11_bio_cbse_02_002/009.',
          misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.',
          parts: [
                { id: 'a', prompt: 'A village uses a common pond for bathing, washing cattle, and drawing drinking water. During monsoon, cases of acute diarrhoea spike.', answer: 'Mode: vehicle-borne (water)',
                  options: ['Mode: vehicle-borne (water)', 'vector-borne', 'vehicle-borne'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' },
                { id: 'b', prompt: 'Compare mechanical vs biological vectors using housefly (Musca domestica) and Anopheles mosquito as examples.', answer: 'Mechanical vector (housefly): pathogen carried passively on body parts (legs,',
                  options: ['Mechanical vector (housefly): pathogen carried passively on body parts (legs,', 'both just carry germs', 'vector-borne'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' }
          ],
            remediations: { 'vector-borne-and-vehicle-borne': { steps: ['Revisit c8_bio_ch2_5 (Transmission of Diseases: Direct and Indirect Contact) — make a two-column table: "Living.', 'Watch a 5-minute animation of Plasmodium life cycle in mosquito (sporogony) vs Vibrio survival in water — note.', 'Re-attempt Diagnostic Question 4; if still confused, draw the transmission chain for malaria and cholera side-by-side.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Vertical transmission only occurs for viral infections like HIV." Provide two counter-examples (one bacterial, one parasitic) and.', answer: 'Statement is false',
                  options: ['Statement is false', 'vector-borne', 'vehicle-borne', 'mosquito is a vehicle for malaria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' },
                { id: 'b', prompt: 'Design a simple community-level experiment to demonstrate that houseflies mechanically transmit enteric bacteria from faeces to food.', answer: 'Set up: Two identical plates of cooked rice',
                  options: ['Set up: Two identical plates of cooked rice', 'vector-borne', 'vehicle-borne', 'mosquito is a vehicle for malaria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' },
                { id: 'c', prompt: 'Compare mechanical vs biological vectors using housefly (Musca domestica) and Anopheles mosquito as examples.', answer: 'Mechanical vector (housefly): pathogen carried passively on body parts (legs,',
                  options: ['Mechanical vector (housefly): pathogen carried passively on body parts (legs,', 'both just carry germs', 'vector-borne', 'vehicle-borne'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.' }
          ],
            remediations: { 'vector-borne-and-vehicle-borne': { steps: ['Revisit c8_bio_ch2_5 (Transmission of Diseases: Direct and Indirect Contact) — make a two-column table: "Living.', 'Watch a 5-minute animation of Plasmodium life cycle in mosquito (sporogony) vs Vibrio survival in water — note.', 'Re-attempt Diagnostic Question 4; if still confused, draw the transmission chain for malaria and cholera side-by-side.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_008', difficulty: 'standard',
          question: 'Cancer diagnosis is the systematic process of identifying malignant neoplasms.',
          hint: 'If stuck on treatment mechanisms: Revisit c11_bio_cbse_10_001 (cell cycle) for chemo,.',
          misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor.".',
          parts: [
                { id: 'a', prompt: 'A 60-year-old male smoker has a 4 cm right lung mass on CT scan, biopsy shows small cell lung cancer (SCLC), and PET-CT shows uptake in liver and bone.', answer: '**Rationale**: SCLC is staged as limited or extensive stage',
                  options: ['**Rationale**: SCLC is staged as limited or extensive stage', 'cutting out the tumor cures cancer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor." **Exact wrong.' },
                { id: 'b', prompt: 'Compare and contrast the mechanism of action and side effect profile of: (a) conventional cytotoxic chemotherapy (e.g., paclitaxel), (b) targeted therapy.', answer: 'conventional cytotoxic chemotherapy (e.g., paclitaxel), (',
                  options: ['conventional cytotoxic chemotherapy (e.g., paclitaxel), (', 'trastuzumab causes hair loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor." **Exact wrong.' }
          ],
            remediations: { 'misconception-biopsy-or-surgery-causes': { steps: ['If student holds the "biopsy spreads cancer" misconception: 1.', '**Revisit c12_bio_cbse_08_007** — review metastasis mechanism (EMT, intravasation, colonization) to understand it\'s an.', '**Watch a 5-min video** of core needle biopsy procedure (available on YouTube: "breast core needle biopsy procedure") —.', '**Analyze data**: Compare survival curves of patients who had biopsy vs those who refused — biopsy group has better.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor.".',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the mechanism of action and side effect profile of: (a) conventional cytotoxic chemotherapy (e.g., paclitaxel), (b) targeted therapy.', answer: 'conventional cytotoxic chemotherapy (e.g., paclitaxel), (',
                  options: ['conventional cytotoxic chemotherapy (e.g., paclitaxel), (', 'trastuzumab causes hair loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Biopsy or surgery causes cancer to spread by exposing it to air or cutting through the tumor." **Exact wrong.' }
          ],
            remediations: { 'misconception-biopsy-or-surgery-causes': { steps: ['If student holds the "biopsy spreads cancer" misconception: 1.', '**Revisit c12_bio_cbse_08_007** — review metastasis mechanism (EMT, intravasation, colonization) to understand it\'s an.', '**Watch a 5-min video** of core needle biopsy procedure (available on YouTube: "breast core needle biopsy procedure") —.', '**Analyze data**: Compare survival curves of patients who had biopsy vs those who refused — biopsy group has better.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
