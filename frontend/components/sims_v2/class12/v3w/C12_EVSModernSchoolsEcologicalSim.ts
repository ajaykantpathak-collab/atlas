import type { SimDef } from '../../engine/types';
import C12_EVSModernSchoolsEcologicalSim from '../../../simulations/c6_12/C12_EVSModernSchoolsEcologicalSim';

/** v3 wrapped master — C12_EVSModernSchoolsEcologicalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_evsmodernschoolsecologicalsim: SimDef = {
    id: 'v3w_c12_evsmodernschoolsecologicalsim',
    title: 'Modern Schools Ecological',
    subtitle: 'This node covers only Environmental Determinism: its definition, historical context, key.',
    classLevel: 12, subject: 'evs', topic: 'Major Schools of Human Geography: Determinism',
    chapters: [],
    nodeIds: ['c12_geo_cbse_01_004', 'c12_geo_cbse_01_001', 'c12_geo_cbse_01_003', 'c12_geo_cbse_01_005', 'c12_geo_cbse_01_006', 'c12_geo_cbse_01_007', 'c12_geo_cbse_01_008', 'c12_geo_cbse_01_010', 'c12_geo_cbse_01_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a tribal hamlet in the Abujh Maad region of Chhattisgarh where families practice shifting cultivation.', goal: 'Master Modern Schools Ecological.' },
    discovery: {
        question: 'A student argues: "The Inuit in the Arctic and the Bedouins in the Sahara both practice determinism because they wear fur and live in tents respectively.".',
        options: ['Step 1: Identify the determinist claim', 'adaptation', 'determination'],
        answer: 'Step 1: Identify the determinist claim',
        hook: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy,.',
    },
    teaching: [
        { title: 'Environmental Determinism is the school of.', text: 'Environmental Determinism is the school of thought in human geography which asserts that the physical environment (climate, terrain, soil, vegetation) exclusively controls, determines, and limits the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_004', title: 'Environmental Determinism is the school.',
          scaffold: { problem: 'A Class 12 student writes in the board exam: "Environmental Determinism means climate determines human behaviour.',
            steps: [
            { text: 'Identify the student\'s core claim — "climate determines behaviour" (climate determinism).' },
            { text: 'Check NCERT definition — Determinism = "interaction between primitive human society and strong forces of nature" at.' },
            { text: 'Error 1 — Rajasthan communities have high technology (irrigation, transport, solar power, tourism); they are not.' },
            { text: 'Error 2 — "Hardworking" is a cultural stereotype, not a geographical determination; determinism describes material.' },
            { text: 'Error 3 — The student ignores the *technological mediator*; NCERT says "Technology indicates the level of cultural.' },
            { text: 'Rewrite — "Environmental Determinism describes societies with minimal technology (e.g., Benda\'s shifting cultivation in.', faded: true, blankAnswer: 'Corrected answer as in Step 6. The 3 errors are: (1) Wrong.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_001', title: 'Human Geography is the synthetic study.',
          scaffold: { problem: 'A Class 12 student from Kerala visits Ladakh for the first time. She observes: (1) Houses have thick mud walls and flat roofs.',
            steps: [
            { text: 'Identify the physical environment constraints — cold desert: extreme winter cold (-30°C), low precipitation (<10 cm),.' },
            { text: 'Classify each observation as naturalisation (human adapting to nature) or humanisation (human modifying nature).' },
            { text: 'Observation 1 — Thick mud walls, flat roofs: Naturalisation. Humans adapt building design to conserve heat (thick walls.' },
            { text: 'Observation 2 — Limited terraced agriculture: Naturalisation with minor humanisation.' },
            { text: 'Observation 3 — Solar panels: Humanisation. High technology (photovoltaics) harnesses abundant solar radiation (natural.' },
            { text: 'Observation 4 — Yak/sheep pastoralism: Naturalisation. Livestock species selected by nature (cold-adapted);.' },
            { text: 'Synthesise: Ladakh shows a society historically in naturalisation stage (observations 1,2,4) now adopting humanisation.', faded: true, blankAnswer: 'The Ladakh case illustrates a society predominantly in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_003', title: 'Human geography and physical geography.',
          scaffold: { problem: 'A student reads that "the Himalayas act as a climatic barrier." Explain the two-way interaction: (a) How does this physical feature shape.',
            steps: [
            { text: 'Identify the physical process — Himalayas block southwest monsoon winds, forcing orographic rainfall on southern.' },
            { text: 'Trace human geography shaped by this — dense agriculture and population in Ganga plains (water, soil), tea plantations.' },
            { text: 'Identify human modifications — deforestation for agriculture/urbanization, road construction, dam building, tourism.' },
            { text: 'Analyze feedback on physical geography — deforestation increases erosion and landslides (geomorphology), reduces.' },
            { text: 'Synthesize — the Himalayas are not a static barrier; they are a dynamic system co-produced by tectonics, climate, and.', faded: true, blankAnswer: '(a) Himalayas → monsoon barrier → rainfall gradient →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_005', title: 'Possibilism is the school of thought in.',
          scaffold: { problem: 'In the Kashmir Valley, traditional houses (dhajji dewari) use timber-laced masonry that withstands earthquakes, while modern concrete.',
            steps: [
            { text: 'Identify the environmental constraint — Kashmir lies in Seismic Zone V (highest earthquake risk).' },
            { text: 'List the possibilities for construction — (a) heavy rigid concrete, (b) flexible timber-laced masonry, (c) steel-frame,.' },
            { text: 'Evaluate each possibility against local resources and culture — timber and stone are locally available; concrete.' },
            { text: 'Assess performance during earthquakes — dhajji dewari walls dissipate energy through friction in timber joints.' },
            { text: 'Conclude — possibilism values *locally adapted* technology that works *with* the constraint (seismic energy) rather.', faded: true, blankAnswer: 'Traditional dhajji dewari is a possibilist adaptation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_006', title: 'Neo-determinism (Stop-and-Go.',
          scaffold: { problem: 'A state government proposes a 2000 MW coal-fired thermal power plant in the Mahanadi basin, Chhattisgarh.',
            steps: [
            { text: 'Identify the environmental thresholds (red lights) — Grade-III forest = legal/ecological red light (Forest Conservation.' },
            { text: 'Identify conditional factors (amber lights) — Water allocation from Hirakud: depends on downstream flow requirements,.' },
            { text: 'Identify genuine possibilities (green lights) — If the plant uses supercritical technology (higher efficiency, lower.' },
            { text: 'Synthesise verdict — **Red lights dominate**: Forest diversion + seismic risk + tribal rights = multiple non-negotiable.' },
            { text: 'Verify against NCERT — Taylor: "human beings can conquer nature by obeying it." Obeying here means respecting forest,.', faded: true, blankAnswer: 'Project rejected at proposed site (multiple red lights)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_007', title: 'Major fields of human geography are the.',
          scaffold: { problem: 'A researcher wants to study the spatial pattern of female literacy rates across districts of Rajasthan and relate it to cultural norms,.',
            steps: [
            { text: 'Identify the core theme — female literacy is a gender-specific social indicator → Gender Geography is the primary major.' },
            { text: 'Check Table 1.2 for Gender Geography — no sub-fields listed, but it interfaces with Sociology, Anthropology, Women\'s.' },
            { text: 'Note the additional aspects — "school availability" (educational infrastructure) → Social Geography sub-field Geography.' },
            { text: 'Synthesise — this is an interdisciplinary study combining Gender Geography (primary), Social Geography (well-being),.' },
            { text: 'Verify — all fields are from NCERT Table 1.2; no school of thought or physical geography branch is incorrectly used.', faded: true, blankAnswer: 'Primary field: Gender Geography (interfaces: Sociology,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_01_001', title: 'Identify each idea',
          dissect: { specimen: 'Modern Schools Ecological', spots: [
            { id: 's1', label: 'Environmental Determinism is the school', prompt: 'Which idea is this? — Environmental Determinism is the school of thought in human geography which asserts that.', answer: 'Environmental Determinism is the school', options: ['Environmental Determinism is the school', 'Human Geography is the synthetic', 'Human geography and physical geography', 'Possibilism is the school of'] },
            { id: 's2', label: 'Human Geography is the synthetic', prompt: 'Which idea is this? — Human Geography is the synthetic study of the dynamic relationship between human.', answer: 'Human Geography is the synthetic', options: ['Human Geography is the synthetic', 'Environmental Determinism is the school', 'Human geography and physical geography', 'Possibilism is the school of'] },
            { id: 's3', label: 'Human geography and physical geography', prompt: 'Which idea is this? — Human geography and physical geography are inseparable components of geography that study.', answer: 'Human geography and physical geography', options: ['Human geography and physical geography', 'Environmental Determinism is the school', 'Human Geography is the synthetic', 'Possibilism is the school of'] },
            { id: 's4', label: 'Possibilism is the school of', prompt: 'Which idea is this? — Possibilism is the school of thought in human geography which asserts that the physical.', answer: 'Possibilism is the school of', options: ['Possibilism is the school of', 'Environmental Determinism is the school', 'Human Geography is the synthetic', 'Human geography and physical geography'] },
            { id: 's5', label: 'Neo-determinism Stop-and-Go Determinism proposed by', prompt: 'Which idea is this? — Neo-determinism (Stop-and-Go Determinism), proposed by Griffith Taylor, is a middle-path.', answer: 'Neo-determinism Stop-and-Go Determinism proposed by', options: ['Neo-determinism Stop-and-Go Determinism proposed by', 'Environmental Determinism is the school', 'Human Geography is the synthetic', 'Human geography and physical geography'] },
            { id: 's6', label: 'Major fields of human geography', prompt: 'Which idea is this? — Major fields of human geography are the broad thematic categories (Social, Cultural,.', answer: 'Major fields of human geography', options: ['Major fields of human geography', 'Environmental Determinism is the school', 'Human Geography is the synthetic', 'Human geography and physical geography'] }
          ] } }
    ],
    explore: { component: C12_EVSModernSchoolsEcologicalSim, prompt: 'Explore the interactive — Modern Schools Ecological' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_004', difficulty: 'standard',
          question: 'Environmental Determinism is the school of thought in human geography which.',
          hint: 'If stuck, revisit c12_geo_cbse_01_002 and map each Benda action to "nature as master" —.',
          misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy,.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Inuit in the Arctic and the Bedouins in the Sahara both practice determinism because they wear fur and live in tents respectively.".', answer: 'Step 1: Identify the determinist claim',
                  options: ['Step 1: Identify the determinist claim', 'adaptation', 'determination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' },
                { id: 'b', prompt: 'Compare the "Naturalisation of Humans" (Determinism) and "Humanisation of Nature" (Possibilism) using the two NCERT case studies: Benda (Abujh Maad) and Kari.', answer: '| Aspect | Benda (Determinism) | Kari (Possibilism) |',
                  options: ['| Aspect | Benda (Determinism) | Kari (Possibilism) |', 'Mother Nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' }
          ],
            remediations: { 'students-equate-environmental-determinism-with': { steps: ['Re-read the "Naturalisation of Humans" box (Benda story) and underline every verb showing *passive* human action.', 'Re-read the "Humanisation of Nature" box (Kari story) and underline every verb showing *active* human action (drives,.', 'Make a T-chart: Left column = Benda\'s verbs (determinism), Right column = Kari\'s verbs (possibilism).', 'Ask: "Which verb list requires technology?" → All Kari\'s verbs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy,.',
          parts: [
                { id: 'a', prompt: 'Compare the "Naturalisation of Humans" (Determinism) and "Humanisation of Nature" (Possibilism) using the two NCERT case studies: Benda (Abujh Maad) and Kari.', answer: '| Aspect | Benda (Determinism) | Kari (Possibilism) |',
                  options: ['| Aspect | Benda (Determinism) | Kari (Possibilism) |', 'Mother Nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' }
          ],
            remediations: { 'students-equate-environmental-determinism-with': { steps: ['Re-read the "Naturalisation of Humans" box (Benda story) and underline every verb showing *passive* human action.', 'Re-read the "Humanisation of Nature" box (Kari story) and underline every verb showing *active* human action (drives,.', 'Make a T-chart: Left column = Benda\'s verbs (determinism), Right column = Kari\'s verbs (possibilism).', 'Ask: "Which verb list requires technology?" → All Kari\'s verbs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_001', difficulty: 'standard',
          question: 'Human Geography is the synthetic study of the dynamic relationship between.',
          hint: 'If stuck, re-read c11_geo_cbse_01_001 and c11_geo_cbse_01_009 focusing on "geography as.',
          misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human Geography is the synthetic study of the dynamic relationship between human',
                  options: ['Human Geography is the synthetic study of the dynamic relationship between human', 'Environmental Determinism is the school of thought in human geography', 'Human geography and physical geography are inseparable components of geography that study', 'Possibilism is the school of thought in human geography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature only." They miss that.' }
          ],
            remediations: { 'human-geography-study-of-human': { steps: ['Revisit **c11_geo_cbse_01_001** (Geography as a Discipline) to recall geography\'s integrative nature.', 'Draw a two-column table: "Physical Environment" (landforms, climate, soil) vs "Human Environment" (settlements,.', 'For your local area, fill 3 rows showing *how each physical feature shapes a human activity* and *how that human.', 'Re-read the Benda (naturalisation) and Kari (humanisation) case studies in NCERT.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The quantitative revolution in human geography (1950s-60s) made the discipline more scientific but less human." Use the emergence of.', answer: 'The statement is **largely valid**',
                  options: ['The statement is **largely valid**', 'Human Geography = study of human activities only', 'Physical Geography = study of nature only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature only." They miss that.' }
          ],
            remediations: { 'human-geography-study-of-human': { steps: ['Revisit **c11_geo_cbse_01_001** (Geography as a Discipline) to recall geography\'s integrative nature.', 'Draw a two-column table: "Physical Environment" (landforms, climate, soil) vs "Human Environment" (settlements,.', 'For your local area, fill 3 rows showing *how each physical feature shapes a human activity* and *how that human.', 'Re-read the Benda (naturalisation) and Kari (humanisation) case studies in NCERT.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_003', difficulty: 'standard',
          question: 'Human geography and physical geography are inseparable components of geography.',
          hint: 'Revisit c11_geo_cbse_01_004 and c11_geo_cbse_01_005 to recall the sub-branches, and.',
          misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and.',
          parts: [
                { id: 'a', prompt: 'Analyze the neo-determinism (stop-and-go determinism) concept using the traffic light analogy.', answer: 'Neo-determinism: humans can create possibilities (green light) but must respect',
                  options: ['Neo-determinism: humans can create possibilities (green light) but must respect', 'technology solves everything', 'we are helpless before nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' }
          ],
            remediations: { 'humanisation-of-nature-means-only': { steps: ['Re-read the Benda (Abujh Maad) and Kari (Trondheim) boxes in NCERT.', 'For your own city/village, list three ways you are naturalised (e.g., depend on rain, fear heatwave, use local building.', 'Identify one "red light" your area faces (e.g., groundwater depletion, flood risk, landslide zone).', 'Explain how technology both helps and hits the red light. Re-do Diagnostic Question 4 with this personal example.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the sustainability of the following human–environment interaction: Conversion of the Sundarbans mangrove forest (physical geography: tidal delta,.', answer: 'Unsustainable',
                  options: ['Unsustainable', 'development', 'necessary for economy', 'humanisation of nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' },
                { id: 'b', prompt: 'Analyze the neo-determinism (stop-and-go determinism) concept using the traffic light analogy.', answer: 'Neo-determinism: humans can create possibilities (green light) but must respect',
                  options: ['Neo-determinism: humans can create possibilities (green light) but must respect', 'technology solves everything', 'we are helpless before nature', 'humanisation of nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' }
          ],
            remediations: { 'humanisation-of-nature-means-only': { steps: ['Re-read the Benda (Abujh Maad) and Kari (Trondheim) boxes in NCERT.', 'For your own city/village, list three ways you are naturalised (e.g., depend on rain, fear heatwave, use local building.', 'Identify one "red light" your area faces (e.g., groundwater depletion, flood risk, landslide zone).', 'Explain how technology both helps and hits the red light. Re-do Diagnostic Question 4 with this personal example.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_005', difficulty: 'standard',
          question: 'Possibilism is the school of thought in human geography which asserts that the.',
          hint: 'If stuck, revisit c12_geo_cbse_01_004 (Determinism) and the NCERT story of Benda (Abujh.',
          misconception: 'Students often equate possibilism with "humans can conquer nature completely" and cite examples like Dubai\'s Palm.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "Humans are completely free to do whatever they want on Earth" is a misinterpretation of possibilism.', answer: 'Possibilism does not claim absolute freedom',
                  options: ['Possibilism does not claim absolute freedom', 'possibilism means no environmental limits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate possibilism with "humans can conquer nature completely" and cite examples like Dubai\'s Palm Islands or.' }
          ],
            remediations: { 'students-often-equate-possibilism-with': { steps: ['If a student cannot distinguish possibilism from "technological optimism," do this 3-step remediation: 1.', 'Re-read the NCERT box "Humanisation of Nature" (Trondheim example) and list *all* the energy inputs required (oil for.', 'Compare with the "Naturalisation of Humans" box (Benda in Abujh Maad) — note the near-zero external energy use.', 'Discuss: "Which lifestyle has more *future* possibilities if fossil fuels become scarce?" This forces the student to.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_006', difficulty: 'standard',
          question: 'Neo-determinism (Stop-and-Go Determinism), proposed by Griffith Taylor, is a.',
          hint: 'If unclear on determinism vs. possibilism, revisit **c12_geo_cbse_01_004** (Benda\'s story.',
          misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write:.',
          parts: [
                { id: 'a', prompt: 'Why did Griffith Taylor propose neo-determinism as a "middle path" (Madhyam Marg) between environmental determinism and possibilism?', answer: 'Correct answer: Determinism (Ratzel, Semple) saw technology as negligible',
                  options: ['Correct answer: Determinism (Ratzel, Semple) saw technology as negligible', 'Taylor just compromised', 'stop-and-go'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' },
                { id: 'b', prompt: 'ANALYZE: Compare the 2013 Kedarnath disaster and the success of Indira Gandhi Canal in Rajasthan through the neo-determinist framework.', answer: 'Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,',
                  options: ['Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,', 'stop-and-go', 'balance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' }
          ],
            remediations: { 'students-confuse-neo-determinism-s': { steps: ['If the student cannot distinguish neo-determinism from "balance/compromise": 1.', 'Revisit **c12_geo_cbse_01_004 (Determinism)** and **c12_geo_cbse_01_005 (Possibilism)** — make a three-column table:.', 'Rows: Role of nature, Role of technology, Human agency, Red-light concept, Example.', 'Watch the 5-min animation "Griffith Taylor\'s Traffic Lights" (NCERT official YouTube) — pause at each colour and write.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write:.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "Neo-determinism is just environmental determinism repackaged for the climate-change era." Critique this statement using Griffith Taylor\'s original.', answer: 'Correct evaluation: The statement is **false**',
                  options: ['Correct evaluation: The statement is **false**', 'stop-and-go', 'balance', 'compromise'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' },
                { id: 'b', prompt: 'ANALYZE: Compare the 2013 Kedarnath disaster and the success of Indira Gandhi Canal in Rajasthan through the neo-determinist framework.', answer: 'Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,',
                  options: ['Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,', 'stop-and-go', 'balance', 'compromise'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' }
          ],
            remediations: { 'students-confuse-neo-determinism-s': { steps: ['If the student cannot distinguish neo-determinism from "balance/compromise": 1.', 'Revisit **c12_geo_cbse_01_004 (Determinism)** and **c12_geo_cbse_01_005 (Possibilism)** — make a three-column table:.', 'Rows: Role of nature, Role of technology, Human agency, Red-light concept, Example.', 'Watch the 5-min animation "Griffith Taylor\'s Traffic Lights" (NCERT official YouTube) — pause at each colour and write.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_007', difficulty: 'standard',
          question: 'Major fields of human geography are the broad thematic categories (Social,.',
          hint: 'If stuck, revisit c12_geo_cbse_01_001 (definition) and c11_geo_cbse_01_005 (Class 11.',
          misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought".',
          parts: [
                { id: 'a', prompt: 'Name the major field of human geography that studies the spatial distribution of voting patterns and electoral behaviour, and identify its sister discipline.', answer: 'Correct answer: Political Geography',
                  options: ['Correct answer: Political Geography', 'Social Geography with Sociology', 'psephology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought" (Determinism, Possibilism,.' },
                { id: 'b', prompt: 'A student maps the locations of all primary health centres in a district and analyses their accessibility for rural populations.', answer: 'Correct answer: Major field: Medical Geography',
                  options: ['Correct answer: Major field: Medical Geography', 'Social Geography with Sociology', 'fields of human geography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought" (Determinism, Possibilism,.' }
          ],
            remediations: { 'students-often-confuse-fields-of': { steps: ['Revisit node c12_geo_cbse_01_001 (definition) to recall what human geography studies.', 'Revisit nodes c12_geo_cbse_01_004, 005, 006 (schools of thought) and explicitly list: "Schools of thought =.', 'Fields = Social, Cultural, Political, etc." 3.', 'Draw a two-column table: left column "What we study (Fields)", right column "How we study (Schools)".'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Settlement Geography and Urban Geography are the same field because both study human habitations." Use NCERT Table 1.2 to justify your.', answer: 'Correct answer: False',
                  options: ['Correct answer: False', 'True, both study cities', 'fields of human geography', 'schools of thought'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought" (Determinism, Possibilism,.' }
          ],
            remediations: { 'students-often-confuse-fields-of': { steps: ['Revisit node c12_geo_cbse_01_001 (definition) to recall what human geography studies.', 'Revisit nodes c12_geo_cbse_01_004, 005, 006 (schools of thought) and explicitly list: "Schools of thought =.', 'Fields = Social, Cultural, Political, etc." 3.', 'Draw a two-column table: left column "What we study (Fields)", right column "How we study (Schools)".'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
