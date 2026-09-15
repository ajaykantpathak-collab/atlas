import type { SimDef } from '../../engine/types';
import C12_HomeScienceFabricCareDecisionSim from '../../../simulations/c6_12/C12_HomeScienceFabricCareDecisionSim';

/** v3 wrapped master — C12_HomeScienceFabricCareDecisionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_homesciencefabriccaredecisionsim: SimDef = {
    id: 'v3w_c12_homesciencefabriccaredecisionsim',
    title: 'Home Science Fabric Care Decision',
    subtitle: 'This node covers the definitions, assessment methods, and interplay of aptitude,.',
    classLevel: 12, subject: 'science', topic: 'Factors Influencing Career Choice: Aptitude, Interest and Personality',
    chapters: [],
    nodeIds: ['c12_hs_cbse_01_005', 'c12_hs_cbse_01_007', 'c12_hs_cbse_01_008', 'c12_hs_cbse_01_009', 'c12_hs_cbse_04_012', 'c12_hs_cbse_14_002', 'c12_hs_cbse_14_004', 'c12_hs_cbse_14_010', 'c12_hs_cbse_04_001', 'c12_hs_cbse_14_001', 'c12_hs_cbse_14_005', 'c12_hs_cbse_14_007', 'c12_hs_cbse_14_008', 'c12_hs_cbse_14_009', 'c12_hs_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a Class 12 student, Priya, who loves painting (interest), scores high on spatial reasoning tests.', goal: 'Master Home Science Fabric Care Decision.' },
    discovery: {
        question: 'Compare the livelihood model of Shri Mahila Griha Udyog Lijjat Papad with a typical corporate food-processing company on three dimensions: (a) ownership.',
        options: ['ownership structure, (', 'success ascertained not by profits but by social benefits and impact', 'women making papad'],
        answer: 'ownership structure, (',
        hook: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the.',
    },
    teaching: [
        { title: 'Aptitude refers to an individual\'s innate or.', text: 'Aptitude refers to an individual\'s innate or acquired potential to acquire specific skills and perform certain tasks effectively; interest denotes a sustained curiosity, enjoyment, and motivation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hs_cbse_01_005', title: 'Aptitude refers to an individual\'s.',
          scaffold: { problem: 'Ananya, a Class 12 student, wants to become a clinical psychologist.',
            steps: [
            { text: 'Map clinical psychology\'s core demands to the three factors — Aptitude demands: high verbal reasoning (therapy notes,.' },
            { text: 'Compare Ananya\'s profile to demands — Aptitude: Verbal 85th %ile (excellent fit), Abstract 60th %ile (adequate),.' },
            { text: 'Identify the congruence pattern — Two factors (aptitude, interest) show high congruence; one factor (personality —.' },
            { text: 'Determine the specific career risk — Not academic failure (aptitude OK), not loss of motivation (interest OK), but.' },
            { text: 'Formulate a nuanced recommendation — Pursue clinical psychology *only if* paired with mandatory personal therapy,.', faded: true, blankAnswer: 'Ananya has strong aptitude-interest fit but a critical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_01_007', title: 'SWOT Analysis for career planning is a.',
          scaffold: { problem: 'Rohan, a Class 12 student, wants to use SWOT to decide between **B.Sc. Agriculture** and **BBA**.',
            steps: [
            { text: 'Identify internal vs. external factors. “Good at biology practicals” (internal, positive) → Strength.' },
            { text: 'Populate the SWOT matrix with the classified items.' },
            { text: 'Draw cross-quadrant links. Strength (biology practicals + farm access) + Opportunity (agri-incubator) = strong match.' },
            { text: 'Evaluate fit. B.Sc. Agriculture leverages 2 Strengths and 1 Opportunity; BBA faces 2 Weaknesses and 1 Threat.' },
            { text: 'Formulate recommendation. Recommend B.Sc. Agriculture with action plan: join incubator, take bridge maths course,.', faded: true, blankAnswer: 'Recommended path: B.Sc. Agriculture. Key match: Strengths.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_01_008', title: 'Gender division of labour refers to the.',
          scaffold: { problem: 'A Class 12 student reads a newspaper report: "Female Labour Force Participation Rate in India drops to 19% (PLFS 2021-22).',
            steps: [
            { text: 'Identify the flawed premise — \'voluntary exit\' ignores structural push factors (jobless growth, mechanisation of.' },
            { text: 'Introduce \'unpaid work\' invisibility — cite NSS 2019 Time Use Survey: women spend 299 mins/day on unpaid domestic/care.' },
            { text: 'Apply \'double burden\' concept — employed women\'s total work (paid + unpaid) exceeds men\'s; exit is often forced when.' },
            { text: 'Cite policy gaps — Factories Act creche provision (Sec 48) applies only to >30 women; 90% women in informal sector have.' },
            { text: 'Conclude with reframing — demand \'recognise, reduce, redistribute\' (3R framework) for unpaid care work, not \'women.', faded: true, blankAnswer: '[Letter draft with 4 analytical paragraphs as above, ~150.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_01_009', title: 'Home Science Education is a.',
          scaffold: { problem: 'Rohan, a Class 12 student, enjoys biology (especially genetics), likes counseling peers, and wants a career that combines science with.',
            steps: [
            { text: 'Map Rohan\'s interests to sub-fields: Genetics → Food & Nutrition (nutrigenomics); Counseling → Human Development.' },
            { text: 'Identify the intersection: **Public Health Nutrition / Community Nutritionist** role — uses nutrigenomics (biology),.' },
            { text: 'Research academic pathway: B.Sc. Home Science (3 years) with specialization in Food & Nutrition → M.Sc.' },
            { text: 'Verify against parental misconception: Show ICMR/NIN job notifications requiring M.Sc.' },
            { text: 'Suggest immediate action: Enroll in SWAYAM course "Nutrition and Health" (by NIN/ICMR) to build profile before college.', faded: true, blankAnswer: 'Best-fit avenue: Public Health Nutritionist / Community.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_04_012', title: 'Fabric selection criteria for apparel.',
          scaffold: { problem: 'A startup wants to launch "monsoon commuter shirts" for Mumbai professionals—30 min walk in heavy rain + humidity, then 9 hours in 22°C AC.',
            steps: [
            { text: 'Define measurable proxies for each criterion. Rain protection → hydrostatic head (HH) & water contact angle; Thermal.' },
            { text: 'Estimate values for each fabric from textile handbooks. (A) Cotton poplin: HH ~200 mm (untreated), MVTR ~4000,.' },
            { text: 'Normalize to 1-5 scale per criterion (5 = best in class). Rain protection: B=5 (5000), C=3 (800), A=1 (200).' },
            { text: 'Calculate weighted scores. A = (1×0.3)+(4×0.3)+(2×0.2)+(3×0.2) = 0.3+1.2+0.4+0.6 = 2.5.' },
            { text: 'Interpret. Fabric B (P/C twill + DWR) wins (3.9) due to superior rain protection and durability—critical for daily.', faded: true, blankAnswer: 'Fabric B (65/35 polyester/cotton twill with DWR finish) —.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_14_002', title: 'A stain is a localized discoloration on.',
          scaffold: { problem: 'A white cotton tablecloth has a 2-hour-old stain containing milk (protein + fat) and tea (tannin). The fabric is colourfast.',
            steps: [
            { text: 'Identify stain components: milk = casein (protein) + butterfat (lipid); tea = polyphenols (tannin) + pigment.' },
            { text: 'Determine fibre constraints: cotton tolerates alkali, heat, oxygen bleach, enzymes, and mild acid.' },
            { text: 'Sequence by chemical vulnerability: Protein coagulates at >40°C → must treat cold first.' },
            { text: 'Protocol: (a) Cold water (15°C) soak 15 min + enzymatic detergent (protease + lipase) 30 min → hydrolyzes protein &.' },
            { text: 'Verify: No heat before enzyme; acid after alkali (neutralize); oxidizer last on colourfast cotton.', faded: true, blankAnswer: '4-step protocol: (1) Cold enzymatic soak, (2) Warm alkaline.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_01_007', title: 'Identify each idea',
          dissect: { specimen: 'Home Science Fabric Care Decision', spots: [
            { id: 's1', label: 'Aptitude refers to an individuals', prompt: 'Which idea is this? — Aptitude refers to an individual\'s innate or acquired potential to acquire specific.', answer: 'Aptitude refers to an individuals', options: ['Aptitude refers to an individuals', 'SWOT Analysis for career planning', 'Gender division of labour refers', 'Home Science Education is a'] },
            { id: 's2', label: 'SWOT Analysis for career planning', prompt: 'Which idea is this? — SWOT Analysis for career planning is a structured self-assessment framework where an.', answer: 'SWOT Analysis for career planning', options: ['SWOT Analysis for career planning', 'Aptitude refers to an individuals', 'Gender division of labour refers', 'Home Science Education is a'] },
            { id: 's3', label: 'Gender division of labour refers', prompt: 'Which idea is this? — Gender division of labour refers to the socially constructed allocation of tasks, roles,.', answer: 'Gender division of labour refers', options: ['Gender division of labour refers', 'Aptitude refers to an individuals', 'SWOT Analysis for career planning', 'Home Science Education is a'] },
            { id: 's4', label: 'Home Science Education is a', prompt: 'Which idea is this? — Home Science Education is a multidisciplinary field integrating five core sub-fields —.', answer: 'Home Science Education is a', options: ['Home Science Education is a', 'Aptitude refers to an individuals', 'SWOT Analysis for career planning', 'Gender division of labour refers'] },
            { id: 's5', label: 'Fabric selection criteria for apparel', prompt: 'Which idea is this? — Fabric selection criteria for apparel is the systematic evaluation of textile materials.', answer: 'Fabric selection criteria for apparel', options: ['Fabric selection criteria for apparel', 'Aptitude refers to an individuals', 'SWOT Analysis for career planning', 'Gender division of labour refers'] },
            { id: 's6', label: 'A stain is a localized', prompt: 'Which idea is this? — A stain is a localized discoloration on a fabric caused by the deposition of foreign.', answer: 'A stain is a localized', options: ['A stain is a localized', 'Aptitude refers to an individuals', 'SWOT Analysis for career planning', 'Gender division of labour refers'] }
          ] } }
    ],
    explore: { component: C12_HomeScienceFabricCareDecisionSim, prompt: 'Explore the interactive — Home Science Fabric Care Decision' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_005', difficulty: 'standard',
          question: 'Aptitude refers to an individual\'s innate or acquired potential to acquire.',
          hint: 'Revisit c11_hs_cbse_02_006 (adolescence as critical period for identity) and.',
          misconception: 'Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude for software.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a career counsellor would use (a) a differential aptitude battery, (b) a vocational interest inventory, and (c) a personality.', answer: 'a differential aptitude battery, (',
                  options: ['a differential aptitude battery, (', 'strengths and weaknesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude for software engineering" — or conflate.' }
          ],
            remediations: { 'students-conflate-interest-with-aptitude': { steps: ['If a student conflates the three factors: (1) Have them complete a **three-column sorting task** with 15 career-related.', '(2) Present two contrasting case studies: *Case A* — High interest, low aptitude (fails training); *Case B* — High.', 'Ask: "Which factor caused each outcome?" (3) Re-diagnose using Diagnostic Question 2 — if they still omit.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude for software.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a career counsellor would use (a) a differential aptitude battery, (b) a vocational interest inventory, and (c) a personality.', answer: 'a differential aptitude battery, (',
                  options: ['a differential aptitude battery, (', 'strengths and weaknesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude for software engineering" — or conflate.' }
          ],
            remediations: { 'students-conflate-interest-with-aptitude': { steps: ['If a student conflates the three factors: (1) Have them complete a **three-column sorting task** with 15 career-related.', '(2) Present two contrasting case studies: *Case A* — High interest, low aptitude (fails training); *Case B* — High.', 'Ask: "Which factor caused each outcome?" (3) Re-diagnose using Diagnostic Question 2 — if they still omit.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_007', difficulty: 'standard',
          question: 'SWOT Analysis for career planning is a structured self-assessment framework.',
          hint: 'If stuck, revisit **c11_hs_cbse_02_001** (Concept of Self) and **c12_hs_cbse_01_005**.',
          misconception: 'Students treat SWOT as a one-time “list-making” exercise rather than a dynamic decision tool.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SWOT Analysis for career planning is a structured self-assessment framework where an',
                  options: ['SWOT Analysis for career planning is a structured self-assessment framework where an', 'Aptitude refers to an individual\'s innate or acquired potential to acquire specific', 'Gender division of labour refers to the socially constructed allocation of tasks, roles,', 'Home Science Education is a multidisciplinary field integrating five core sub-fields'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat SWOT as a one-time “list-making” exercise rather than a dynamic decision tool.' }
          ],
            remediations: { 'students-treat-swot-as-a': { steps: ['Revisit **c12_hs_cbse_01_005** (Factors Influencing Career Choice) to relist your aptitudes, interests, and values with.', 'Re‑do the SWOT matrix using the **“Evidence → Quadrant → Link”** template: for each entry, write one proof (e.g., “won.', 'Take the **re‑diagnostic**: classify 5 new statements into quadrants and draw two strength–opportunity arrows.', 'If accuracy < 80%, repeat step 2 with a teacher/mentor.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_008', difficulty: 'standard',
          question: 'Gender division of labour refers to the socially constructed allocation of.',
          hint: 'Revisit c11_soc_cbse_04_010 (Gendered Socialisation) — focus on how family, school, media.',
          misconception: 'Students often write: "Women\'s low workforce participation is because Indian culture values family and women *choose*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Gender division of labour refers to the socially constructed allocation of tasks, roles,',
                  options: ['Gender division of labour refers to the socially constructed allocation of tasks, roles,', 'Aptitude refers to an individual\'s innate or acquired potential to acquire specific', 'SWOT Analysis for career planning is a structured self-assessment framework where an', 'Home Science Education is a multidisciplinary field integrating five core sub-fields'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write: "Women\'s low workforce participation is because Indian culture values family and women *choose* to stay home." This.' }
          ],
            remediations: { 'students-often-write-women-s': { steps: ['Re-read NCERT pages 11–15 (Gender Issues section) with a highlighter: mark every phrase showing *structural* cause.', 'Watch the 12-min video "Unpaid Care Work and the Gender Gap" (ILO/UN Women) — note 3 data points that contradict.', 'Take the 2019–20 NSS Time Use Survey summary (Table 1: minutes/day by gender) and calculate the unpaid work gap for.', 'Re-attempt Diagnostic Q2 and Q3. If still stuck, revisit c11_soc_cbse_04_010 (Gendered Socialisation) and.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_009', difficulty: 'standard',
          question: 'Home Science Education is a multidisciplinary field integrating five core.',
          hint: 'Revisit c11_hs_cbse_01_010 (Multidisciplinary Nature of HEFS) and create a 5-column.',
          misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the.',
          parts: [
                { id: 'a', prompt: 'Compare the livelihood model of Shri Mahila Griha Udyog Lijjat Papad with a typical corporate food-processing company on three dimensions: (a) ownership.', answer: 'ownership structure, (',
                  options: ['ownership structure, (', 'success ascertained not by profits but by social benefits and impact', 'women making papad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the only visible roles.' }
          ],
            remediations: { 'home-science-career-avenues-are': { steps: ['If a student cannot name >3 non-teaching careers per sub-field: Step 1 — Assign them to interview (phone/email) one.', 'Step 2 — Have them map that alumnus\'s daily tasks to the five sub-fields (e.g., a Food Safety Auditor uses Food &.', 'Step 3 — Re-attempt Diagnostic Question 3 with this new real-world reference.', 'Step 4 — If still stuck, revisit **c11_hs_cbse_01_010** (Multidisciplinary Nature of HEFS) and **c12_hs_cbse_01_005**.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following claim using the chapter\'s discussion on ergonomics and quality of work life (QWL): "Investing in ergonomic workstations for home-based.', answer: 'The claim is false',
                  options: ['The claim is false', 'teaching, dietetics, and tailoring'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the only visible roles.' },
                { id: 'b', prompt: 'Compare the livelihood model of Shri Mahila Griha Udyog Lijjat Papad with a typical corporate food-processing company on three dimensions: (a) ownership.', answer: 'ownership structure, (',
                  options: ['ownership structure, (', 'success ascertained not by profits but by social benefits and impact', 'women making papad', 'teaching, dietetics, and tailoring'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the only visible roles.' }
          ],
            remediations: { 'home-science-career-avenues-are': { steps: ['If a student cannot name >3 non-teaching careers per sub-field: Step 1 — Assign them to interview (phone/email) one.', 'Step 2 — Have them map that alumnus\'s daily tasks to the five sub-fields (e.g., a Food Safety Auditor uses Food &.', 'Step 3 — Re-attempt Diagnostic Question 3 with this new real-world reference.', 'Step 4 — If still stuck, revisit **c11_hs_cbse_01_010** (Multidisciplinary Nature of HEFS) and **c12_hs_cbse_01_005**.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_012', difficulty: 'standard',
          question: 'Fabric selection criteria for apparel is the systematic evaluation of textile.',
          hint: 'Revisit c12_hs_cbse_04_007 (weave structure effects on abrasion/drape) and.',
          misconception: '**"Higher thread count always means better quality and durability."** Students equate thread count (threads per inch).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fabric selection criteria for apparel is the systematic evaluation of textile materials',
                  options: ['Fabric selection criteria for apparel is the systematic evaluation of textile materials', 'Aptitude refers to an individual\'s innate or acquired potential to acquire specific', 'SWOT Analysis for career planning is a structured self-assessment framework where an', 'Gender division of labour refers to the socially constructed allocation of tasks, roles,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Higher thread count always means better quality and durability."** Students equate thread count (threads per inch) with fabric.' }
          ],
            remediations: { 'higher-thread-count-always-means': { steps: ['If a student exhibits the thread-count misconception: (1) **Demonstrate** two fabrics of same fiber/weight: 300 TC.', '200 TC percale—conduct Martindale abrasion test (show percale lasts 2× cycles) and MVTR test (show percale 30% higher).', '(2) **Assign** re-read of c12_hs_cbse_04_006 (yarn twist/strength) and c12_hs_cbse_04_007 (weave structure effects).', '(3) **Re-diagnostic:** Give a new scenario—"Select fabric for hospital bedsheets (industrial wash at 90°C, high.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_002', difficulty: 'standard',
          question: 'A stain is a localized discoloration on a fabric caused by the deposition of.',
          hint: 'If stuck, revisit the enzyme-substrate specificity concept from c11_bio_cbse_09_005 and.',
          misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen.',
          parts: [
                { id: 'a', prompt: 'Classify the following stains by their PRIMARY chemical nature: (a) grass, (b) ballpoint ink, (c) egg yolk, (d) rust.', answer: 'grass, (',
                  options: ['grass, (', 'stain type = removal method', 'ink = alcohol'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' },
                { id: 'b', prompt: 'Compare and contrast the mechanism of action for removing a tannin stain (tea) using (i) acetic acid rinse followed by sodium percarbonate, versus (ii) direct.', answer: '(i) Acetic acid protonates the phenolic -OH groups of tannin, increasing water',
                  options: ['(i) Acetic acid protonates the phenolic -OH groups of tannin, increasing water', 'bleach is bleach', 'stain type = removal method'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' }
          ],
            remediations: { 'stain-type-removal-method-as': { steps: ['Revisit c11_hs_cbse_11_004 (stain classification) and c11_hs_cbse_11_005 (reagent categories) to rebuild the chemical.', 'Create a 2×3 matrix: rows = stain classes (protein, tannin, oil, dye, mineral, mixed), columns = fibre vulnerabilities.', 'Fill each cell with the *safest first reagent*.', 'Take the diagnostic test again, but this time verbalize the chemical reasoning at each node: "I choose X because the.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For any mixed stain (e.g., curry: oil + turmeric + protein), always apply the most aggressive reagent first to save time." Provide a.', answer: 'Counter-example: Curry on wool',
                  options: ['Counter-example: Curry on wool', 'stain type = removal method', 'ink = alcohol', 'blood = hydrogen peroxide'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' },
                { id: 'b', prompt: 'Design a stain-removal decision flowchart (text-based) that a dry-cleaning receptionist could use to triage incoming garments.', answer: 'Flowchart: START → Is stain water-soluble?',
                  options: ['Flowchart: START → Is stain water-soluble?', 'stain type = removal method', 'ink = alcohol', 'blood = hydrogen peroxide'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' },
                { id: 'c', prompt: 'Compare and contrast the mechanism of action for removing a tannin stain (tea) using (i) acetic acid rinse followed by sodium percarbonate, versus (ii) direct.', answer: '(i) Acetic acid protonates the phenolic -OH groups of tannin, increasing water',
                  options: ['(i) Acetic acid protonates the phenolic -OH groups of tannin, increasing water', 'bleach is bleach', 'stain type = removal method', 'ink = alcohol'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' }
          ],
            remediations: { 'stain-type-removal-method-as': { steps: ['Revisit c11_hs_cbse_11_004 (stain classification) and c11_hs_cbse_11_005 (reagent categories) to rebuild the chemical.', 'Create a 2×3 matrix: rows = stain classes (protein, tannin, oil, dye, mineral, mixed), columns = fibre vulnerabilities.', 'Fill each cell with the *safest first reagent*.', 'Take the diagnostic test again, but this time verbalize the chemical reasoning at each node: "I choose X because the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
