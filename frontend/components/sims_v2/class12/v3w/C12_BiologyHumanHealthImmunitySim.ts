import type { SimDef } from '../../engine/types';
import C12_BiologyHumanHealthImmunitySim from '../../../simulations/c6_12/C12_BiologyHumanHealthImmunitySim';

/** v3 wrapped master — C12_BiologyHumanHealthImmunitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyhumanhealthimmunitysim: SimDef = {
    id: 'v3w_c12_biologyhumanhealthimmunitysim',
    title: 'Infectious Diseases: Mode of Transmission',
    subtitle: 'Covers classification of transmission modes (direct contact, droplet, airborne,.',
    classLevel: 12, subject: 'biology', topic: 'Infectious Diseases: Mode of Transmission',
    chapters: [],
    nodeIds: ['c12_bio_cbse_08_002', 'c12_bio_cbse_08_003', 'c12_bio_cbse_08_004', 'c12_bio_cbse_08_005', 'c12_bio_cbse_08_008', 'c12_bio_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a classmate sneezing without covering their mouth — droplets travel ~1 metre and land on your desk.', goal: 'Master Infectious Diseases: Mode of Transmission.' },
    discovery: {
        question: 'A village uses a common pond for bathing, washing cattle, and drawing drinking water. During monsoon, cases of acute diarrhoea spike.',
        options: ['Mode: vehicle-borne (water)', 'vector-borne', 'vehicle-borne'],
        answer: 'Mode: vehicle-borne (water)',
        hook: 'Students often believe "vector-borne" and "vehicle-borne" are interchangeable because both involve an intermediary.',
    },
    teaching: [
        { title: 'Mode of transmission refers to the specific.', text: 'Mode of transmission refers to the specific pathway by which an infectious agent (pathogen) moves from a reservoir or infected host to a susceptible new host, classified as direct (physical contact,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_002', title: 'Mode of transmission refers to the.',
          scaffold: { problem: 'During a flood, a community uses river water for drinking without treatment.',
            steps: [
            { text: 'Recognise the scenario — common source outbreak via contaminated water → vehicle-borne transmission (water as passive.' },
            { text: 'Match symptoms (rice-water stool, rapid onset) to Vibrio cholerae — a Gram-negative bacterium producing cholera toxin.' },
            { text: 'Recall that V. cholerae survives in aquatic environments but is heat-labile; boiling (100°C) denatures proteins and.' },
            { text: 'Trace the chain: river water (vehicle) → ingestion (portal of entry) → intestinal colonisation → disease.' },
            { text: 'Verify — boiled water cooled in clean container prevents recontamination; confirm by absence of new cases after.', faded: true, blankAnswer: 'Vehicle-borne (water) transmission; pathogen = Vibrio.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_003', title: 'Immunity is the ability of an organism.',
          scaffold: { problem: 'A 6-year-old child gets a deep thorn prick while playing barefoot in a garden. Within 2 hours, the site is red, swollen, warm, and painful.',
            steps: [
            { text: 'Barrier breach — skin (physical) and acidic pH/defensins (chemical) compromised; tissue damage releases DAMPs (HMGB1,.' },
            { text: 'Resident mast cells degranulate (pre-formed histamine, tryptase) → vasodilation, increased vascular permeability →.' },
            { text: 'Endothelial cells upregulate selectins (E-selectin, P-selectin) → neutrophil rolling → integrin activation.' },
            { text: 'Neutrophils phagocytose opsonized bacteria (C3b, later IgG) → respiratory burst (NADPH oxidase → superoxide → H2O2 →.' },
            { text: 'Monocytes recruited (CCL2/MCP-1) differentiate into macrophages → phagocytose debris, apoptotic neutrophils → produce.', faded: true, blankAnswer: 'The acute inflammatory response is orchestrated by mast.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_004', title: 'Active immunity is the immunity.',
          scaffold: { problem: 'A 6-month-old infant is brought to the clinic with a high fever and rash. The mother had chickenpox as a child.',
            steps: [
            { text: 'Identify the source of protection. The mother had chickenpox, so she has anti-chickenpox antibodies (IgG) that can.' },
            { text: 'Recall that maternal IgG crosses the placenta during the third trimester, providing passive immunity to the fetus.' },
            { text: 'Note that the infant is 6 months old; maternal antibodies have a half-life of about 3-4 weeks, so some may still be.' },
            { text: 'For measles, if the mother had measles or was vaccinated, she would also transfer anti-measles antibodies.' },
            { text: 'Conclude that the infant has natural passive immunity against chickenpox (transferred maternal antibodies) but no.', faded: true, blankAnswer: 'The infant has natural passive immunity against chickenpox.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_005', title: 'Vaccination is the deliberate.',
          scaffold: { problem: 'A 2-month-old infant is brought for first pentavalent vaccine (DPT + Hep B + Hib). The mother asks: "Why so many vaccines at once?',
            steps: [
            { text: 'Identify the immunological concern — antigen load vs immune capacity.' },
            { text: 'Recall that vaccines use purified antigens, not whole pathogens (except live attenuated).' },
            { text: 'Apply clonal selection theory — each antigen activates specific B/T cell clones independently; no "competition" or.' },
            { text: 'Note that combination vaccines reduce injection pain, clinic visits, and improve coverage — proven by WHO/EPI studies.' },
            { text: 'Conclude: Immune system handles thousands of antigens simultaneously; pentavalent is safe, effective, and logistically.', faded: true, blankAnswer: 'The baby\'s immune system encounters trillions of antigens.' }
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
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_009', title: 'Drug and alcohol abuse refers to the.',
          scaffold: { problem: 'A 30-year-old construction worker drinks 180 mL of whiskey (40% v/v ethanol) daily for 10 years. He attempts to quit abruptly.',
            steps: [
            { text: 'Calculate daily ethanol intake: 180 mL × 0.40 = 72 mL pure ethanol ≈ 57 g/day (density 0.79 g/mL).' },
            { text: 'Recall chronic alcohol\'s dual action: potentiates GABA_A receptors (inhibition) and inhibits NMDA glutamate receptors.' },
            { text: 'Neuroadaptation: chronic exposure → downregulation of GABA_A receptors, upregulation of NMDA receptors.' },
            { text: 'Abrupt cessation removes alcohol\'s depressant effect. Unopposed glutamatergic excitation + reduced GABAergic inhibition.' },
            { text: 'Timeline: 6-12h: tremor, anxiety, insomnia (autonomic hyperactivity); 12-24h: hallucinations (visual, auditory);.', faded: true, blankAnswer: 'He will experience autonomic hyperactivity within 6-12h,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_08_003', title: 'Identify each idea',
          dissect: { specimen: 'Infectious Diseases: Mode of Transmission', spots: [
            { id: 's1', label: 'Mode of transmission refers to', prompt: 'Which idea is this? — Mode of transmission refers to the specific pathway by which an infectious agent.', answer: 'Mode of transmission refers to', options: ['Mode of transmission refers to', 'Immunity is the ability of', 'Active immunity is the immunity', 'Vaccination is the deliberate administration'] },
            { id: 's2', label: 'Immunity is the ability of', prompt: 'Which idea is this? — Immunity is the ability of an organism to resist or eliminate potentially harmful foreign.', answer: 'Immunity is the ability of', options: ['Immunity is the ability of', 'Mode of transmission refers to', 'Active immunity is the immunity', 'Vaccination is the deliberate administration'] },
            { id: 's3', label: 'Active immunity is the immunity', prompt: 'Which idea is this? — Active immunity is the immunity developed by an individual\'s own immune system in.', answer: 'Active immunity is the immunity', options: ['Active immunity is the immunity', 'Mode of transmission refers to', 'Immunity is the ability of', 'Vaccination is the deliberate administration'] },
            { id: 's4', label: 'Vaccination is the deliberate administration', prompt: 'Which idea is this? — Vaccination is the deliberate administration of antigenic material (a vaccine) to.', answer: 'Vaccination is the deliberate administration', options: ['Vaccination is the deliberate administration', 'Mode of transmission refers to', 'Immunity is the ability of', 'Active immunity is the immunity'] },
            { id: 's5', label: 'Cancer diagnosis is the systematic', prompt: 'Which idea is this? — Cancer diagnosis is the systematic process of identifying malignant neoplasms through.', answer: 'Cancer diagnosis is the systematic', options: ['Cancer diagnosis is the systematic', 'Mode of transmission refers to', 'Immunity is the ability of', 'Active immunity is the immunity'] },
            { id: 's6', label: 'Drug and alcohol abuse refers', prompt: 'Which idea is this? — Drug and alcohol abuse refers to the chronic, non-medical use of psychoactive substances.', answer: 'Drug and alcohol abuse refers', options: ['Drug and alcohol abuse refers', 'Mode of transmission refers to', 'Immunity is the ability of', 'Active immunity is the immunity'] }
          ] } }
    ],
    explore: { component: C12_BiologyHumanHealthImmunitySim, prompt: 'Explore the interactive — Infectious Diseases: Mode of Transmission' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_003', difficulty: 'standard',
          question: 'Immunity is the ability of an organism to resist or eliminate potentially.',
          hint: 'If leukocyte identification is weak, review c11_bio_cbse_15_001 (blood formed elements).',
          misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate.',
          parts: [
                { id: 'a', prompt: 'Name the four types of physical/chemical barriers in innate immunity and give one example of each.', answer: 'Correct: (1) Physical: skin, mucous membranes',
                  options: ['Correct: (1) Physical: skin, mucous membranes', 'antibodies', 'acquired immunity only starts after innate immunity fails'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate simultaneously upon.' }
          ],
            remediations: { 'acquired-immunity-only-starts-after': { steps: ['Revisit c8_bio_ch2_8 (Class 8 immunity basics) — draw a timeline from pathogen entry (0 h) to antibody peak (7–10 d),.', 'Watch a 5-min animation of dendritic cell–T cell interaction (e.g., HHMI BioInteractive).', 'Re-attempt Diagnostic Q4 and Q5 — if still confused, explicitly write: "Dendritic cell is the bridge: it performs.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Innate immunity is primitive and inferior to acquired immunity because it lacks memory."', answer: 'Correct: False',
                  options: ['Correct: False', 'better', 'acquired immunity only starts after innate immunity fails', '"acquired immunity only starts after innate immunity fails'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate simultaneously upon.' },
                { id: 'b', prompt: 'Design a simple experiment using a mouse model to demonstrate that acquired immunity requires prior exposure (or immunization) for a secondary response.', answer: 'Correct design: Group 1: Inject mice with heat-killed *Streptococcus pneumoniae*',
                  options: ['Correct design: Group 1: Inject mice with heat-killed *Streptococcus pneumoniae*', 'acquired immunity only starts after innate immunity fails', '"acquired immunity only starts after innate immunity fails'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "acquired immunity only starts after innate immunity fails." In reality, both systems activate simultaneously upon.' }
          ],
            remediations: { 'acquired-immunity-only-starts-after': { steps: ['Revisit c8_bio_ch2_8 (Class 8 immunity basics) — draw a timeline from pathogen entry (0 h) to antibody peak (7–10 d),.', 'Watch a 5-min animation of dendritic cell–T cell interaction (e.g., HHMI BioInteractive).', 'Re-attempt Diagnostic Q4 and Q5 — if still confused, explicitly write: "Dendritic cell is the bridge: it performs.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_004', difficulty: 'standard',
          question: 'Active immunity is the immunity developed by an individual\'s own immune system.',
          hint: 'If stuck, revisit the humoral immunity section in node c12_bio_cbse_08_003, focusing on.',
          misconception: 'Students often think that passive immunity involves the recipient\'s immune system being \'activated\' by the transferred.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Active immunity is the immunity developed by an individual\'s own immune system in',
                  options: ['Active immunity is the immunity developed by an individual\'s own immune system in', 'Mode of transmission refers to the specific pathway by', 'Immunity is the ability of an organism to resist or eliminate potentially harmful foreign', 'Vaccination is the deliberate administration of antigenic material (a vaccine) to'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that passive immunity involves the recipient\'s immune system being \'activated\' by the transferred antibodies, leading.' }
          ],
            remediations: { 'passive-immunity-involves-the-recipient': { steps: ['If the student holds this misconception, have them revisit the mechanism of antibody action (antigen binding,.', 'Use the analogy: Passive immunity is like borrowing a shield; active immunity is like learning to make your own shield.', 'Then re-attempt Diagnostic Question 2 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_005', difficulty: 'standard',
          question: 'Vaccination is the deliberate administration of antigenic material (a vaccine).',
          hint: 'If stuck, revisit c12_bio_cbse_08_003 (Innate and Acquired Immunity) focusing on the.',
          misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.',
          parts: [
                { id: 'a', prompt: 'Name the type of vaccine used for BCG, OPV, and hepatitis B in India\'s Universal Immunization Programme, and state one characteristic feature of each type.', answer: 'BCG = live attenuated (Mycobacterium bovis strain)',
                  options: ['BCG = live attenuated (Mycobacterium bovis strain)', 'live attenuated', 'vaccines contain the disease-causing germ in weak form'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' },
                { id: 'b', prompt: 'Explain why a child who receives the full schedule of DPT (diphtheria, pertussis, tetanus) vaccines still needs booster doses at 16-24 months and 5-6 years,.', answer: 'DPT contains inactivated toxins (toxoids) and killed bacteria',
                  options: ['DPT contains inactivated toxins (toxoids) and killed bacteria', 'DPT is weaker', 'vaccines contain the disease-causing germ in weak form'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' },
                { id: 'c', prompt: 'A 10-year-old child missed the MMR vaccine at 9-12 months. The parents ask if giving it now is still effective.', answer: 'Yes, MMR (live attenuated) can be given at any age >9 months',
                  options: ['Yes, MMR (live attenuated) can be given at any age >9 months', 'too late, immunity window closed', 'vaccines contain the disease-causing germ in weak form'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' }
          ],
            remediations: { 'vaccines-contain-the-disease-causing': { steps: ['Revisit c12_bio_cbse_08_004 (Active and Passive Immunity) — specifically the table comparing vaccine types.', 'Make a 4-column table: Vaccine | Type | Antigen Form | Can it replicate?', 'For each, write one sentence: "This vaccine induces immunity by ___ without causing disease because ___."', 'Re-attempt Diagnostic Q1 and Q5. If still confused, watch ICMR-NIV video on vaccine platforms (YouTube: "ICMR vaccine.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "mRNA COVID-19 vaccines alter human DNA because mRNA enters the nucleus and integrates into the genome." Identify the biological.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'vaccines contain the disease-causing germ in weak form', '"vaccines contain the disease-causing germ in weak form" for ALL vaccines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' },
                { id: 'b', prompt: 'Design a simple community-level study to estimate the herd immunity threshold for a new vaccine in a rural Indian block, using only vaccination records and.', answer: 'Key variables: vaccination coverage (%), monthly incidence rate, Rₑ estimate',
                  options: ['Key variables: vaccination coverage (%), monthly incidence rate, Rₑ estimate', 'vaccines contain the disease-causing germ in weak form', '"vaccines contain the disease-causing germ in weak form" for ALL vaccines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vaccines contain the disease-causing germ in weak form" for ALL vaccines.' }
          ],
            remediations: { 'vaccines-contain-the-disease-causing': { steps: ['Revisit c12_bio_cbse_08_004 (Active and Passive Immunity) — specifically the table comparing vaccine types.', 'Make a 4-column table: Vaccine | Type | Antigen Form | Can it replicate?', 'For each, write one sentence: "This vaccine induces immunity by ___ without causing disease because ___."', 'Re-attempt Diagnostic Q1 and Q5. If still confused, watch ICMR-NIV video on vaccine platforms (YouTube: "ICMR vaccine.'] } } },
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
            remediations: { 'misconception-biopsy-or-surgery-causes': { steps: ['If student holds the "biopsy spreads cancer" misconception: 1.', '**Revisit c12_bio_cbse_08_007** — review metastasis mechanism (EMT, intravasation, colonization) to understand it\'s an.', '**Watch a 5-min video** of core needle biopsy procedure (available on YouTube: "breast core needle biopsy procedure") —.', '**Analyze data**: Compare survival curves of patients who had biopsy vs those who refused — biopsy group has better.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_009', difficulty: 'standard',
          question: 'Drug and alcohol abuse refers to the chronic, non-medical use of psychoactive.',
          hint: 'If stuck, revisit Class 11 Neural Control and Coordination: specifically the synapse.',
          misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact.',
          parts: [
                { id: 'a', prompt: 'Name the neurotransmitter primarily involved in the brain\'s reward pathway that is hijacked by almost all addictive drugs, and state the specific brain region.', answer: 'Dopamine is the key neurotransmitter',
                  options: ['Correct answer: Dopamine is the key neurotransmitter', 'serotonin', 'adrenaline'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' },
                { id: 'b', prompt: 'Explain why a chronic alcohol user develops tolerance and experiences withdrawal symptoms like tremors and seizures when they stop drinking, linking your.', answer: 'Alcohol enhances GABAergic inhibition and inhibits glutamatergic',
                  options: ['Correct answer: Alcohol enhances GABAergic inhibition and inhibits glutamatergic', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' },
                { id: 'c', prompt: 'A 25-year-old male injects heroin daily. He develops pinpoint pupils, respiratory depression, and constipation.', answer: 'Heroin is an opioid',
                  options: ['Correct answer: Heroin is an opioid', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' }
          ],
            remediations: { 'addiction-is-just-a-lack': { steps: ['Show the PET scan comparison (normal vs addicted brain) highlighting reduced dopamine D2 receptors in striatum and.', 'Walk through the alcohol withdrawal timeline (6-12h: tremor, anxiety; 12-48h: hallucinations; 48-72h: seizures,.', 'Assign a case study of a patient with opioid use disorder on buprenorphine maintenance to illustrate that.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since alcohol is legal and widely consumed, it cannot be as harmful as heroin." Evaluate this statement using three evidence-based criteria:.', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' }
          ],
            remediations: { 'addiction-is-just-a-lack': { steps: ['Show the PET scan comparison (normal vs addicted brain) highlighting reduced dopamine D2 receptors in striatum and.', 'Walk through the alcohol withdrawal timeline (6-12h: tremor, anxiety; 12-48h: hallucinations; 48-72h: seizures,.', 'Assign a case study of a patient with opioid use disorder on buprenorphine maintenance to illustrate that.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
