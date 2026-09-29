import type { SimDef } from '../../engine/types';
import C11_EVSEnvironmentalScienceScopeSim from '../../../simulations/c6_12/C11_EVSEnvironmentalScienceScopeSim';

/** v3 wrapped master — C11_EVSEnvironmentalScienceScopeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_evsenvironmentalsciencescopesim: SimDef = {
    id: 'v3w_c11_evsenvironmentalsciencescopesim',
    title: 'Geography: Definition, Meaning and Scope',
    subtitle: 'This node covers the etymological roots, formal definition, and the broad scope of.',
    classLevel: 11, subject: 'evs', topic: 'Geography: Definition, Meaning and Scope',
    chapters: [],
    nodeIds: ['c11_geo_cbse_01_001', 'c11_chem_cbse_01_001', 'c11_geo_cbse_01_002', 'c11_geo_cbse_01_009', 'c11_geo_cbse_01_004', 'c11_geo_cbse_01_005', 'c11_geo_cbse_01_006', 'c11_geo_cbse_01_008', 'c11_geo_cbse_09_009', 'c11_geo_cbse_13_007', 'c11_geo_cbse_09_008', 'c11_bio_cbse_13_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to observe their immediate surroundings: the school building, the road outside, the.', goal: 'Master Geography: Definition, Meaning and Scope.' },
    discovery: {
        question: 'Explain why geography is classified as both a natural science and a social science, using the concepts of "physical geography" and "human geography."',
        options: ['Geography straddles natural and social sciences', 'geography is only about maps', 'geography is only about nature'],
        answer: 'Geography straddles natural and social sciences',
        hook: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier.',
    },
    teaching: [
        { title: 'Geography is the scientific discipline that.', text: 'Geography is the scientific discipline that studies the Earth\'s surface as the home of humankind, analyzing the spatial patterns and processes of both natural phenomena (physical geography) and human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_001', title: 'Geography is the scientific discipline.',
          scaffold: { problem: 'A Class 11 student is asked: "Define geography and explain why it is considered an integrating discipline." The student writes: "Geography.',
            steps: [
            { text: 'Recall the formal definition — geography studies the Earth\'s surface *as the space of human life* (not just landscapes).' },
            { text: 'Identify the core methodological principle — *spatial analysis* (patterns, distributions, interactions across space).' },
            { text: 'Explain "integrating discipline" — it synthesizes natural sciences (physical systems) and social sciences (human.' },
            { text: 'Add the three branches — physical, human, environmental — and the two approaches — systematic, regional.' },
            { text: 'Compose a concise board-style answer: "Geography is the study of the Earth\'s surface as the home of humankind,.', faded: true, blankAnswer: 'Geography is the study of the Earth\'s surface as the home.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_001', title: 'Chemistry is the central science that.',
          scaffold: { problem: 'A village in Maharashtra faces fluorosis due to groundwater with 4.5 mg/L fluoride (WHO limit: 1.5 mg/L).',
            steps: [
            { text: 'Identify the problem — excess F⁻ ions in water cause dental/skeletal fluorosis; need a selective removal method.' },
            { text: 'Recall activated alumina has a high surface area with hydroxyl groups (–OH) that undergo ligand exchange.' },
            { text: 'Write the surface complexation reaction: Al–OH(s) + F⁻(aq) ⇌ Al–F(s) + OH⁻(aq) — fluoride replaces surface hydroxyl.' },
            { text: 'Note the reaction is pH-dependent (optimal pH 5.5–6.5) and reversible — allows regeneration with NaOH.' },
            { text: 'Connect to broader principle — surface chemistry/adsorption is a designed chemical process for environmental.', faded: true, blankAnswer: 'Principle: Ligand exchange adsorption on metal oxide.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_002', title: 'The evolution of geography traces the.',
          scaffold: { problem: 'A 2024 CBSE sample paper asks: "Explain how the concept of *genre de vie* resolves the contradiction between environmental determinism and.',
            steps: [
            { text: 'Identify the two opposing views: Determinism (Semple) would say "Himalayan climate *forces* pastoralism" — humans.' },
            { text: 'Define *genre de vie* precisely: "A historically constituted, culturally specific mode of exploiting a *milieu*.' },
            { text: 'Apply to Himalayan transhumance: The *milieu* = high-altitude meadows (bugyals) with summer grass, snow-covered.' },
            { text: 'Show how *genre de vie* mediates: The *milieu* *constrains* (no rice cultivation at 3,500m; snow forces winter descent).' },
            { text: 'Demonstrate *historical depth*: This *genre de vie* evolved over centuries (documented in Ain-i-Akbari, 1590s) — it is.' },
            { text: 'Conclude with board-exam phrasing: "*Genre de vie* resolves the dualism by treating human-environment interaction as a.', faded: true, blankAnswer: '*Genre de vie* resolves determinism vs. possibilism by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_009', title: 'Geography as an integrating discipline.',
          scaffold: { problem: 'A district collector in Bundelkhand (Uttar Pradesh) asks you to design a geographical assessment for "Why do farm ponds fail to recharge.',
            steps: [
            { text: 'Identify the physical geography template — map the region\'s geology (Vindhyan sandstone/shale with low primary.' },
            { text: 'Identify the human geography drivers — document land-use change (deforestation for agriculture), cropping system.' },
            { text: 'Establish spatial linkages — overlay pond locations on lineament/fracture maps from remote sensing; check if ponds are.' },
            { text: 'Analyze the integration gap — most ponds are built on revenue wasteland (human administrative category) which often.' },
            { text: 'Formulate integrated recommendation — shift from "ponds per panchayat" (administrative targeting) to "ponds per.', faded: true, blankAnswer: 'The assessment framework integrates hydrogeological.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_004', title: 'Physical Geography is the branch of.',
          scaffold: { problem: 'A Class 11 student is asked: "The Thar Desert has sand dunes, extreme temperatures, low rainfall, sparse xerophytic vegetation, and saline.',
            steps: [
            { text: 'Identify the five features: (a) sand dunes, (b) extreme temperatures, (c) low rainfall, (d) xerophytic vegetation, (e).' },
            { text: 'Recall the six sub-branches and their core domains: Geomorphology (landforms), Climatology (weather/climate), Hydrology.' },
            { text: 'Match each feature to its primary sub-branch: (a) sand dunes → Geomorphology (aeolian deposition); (b) extreme.' },
            { text: 'Establish the process linkages: Climatology (low rainfall, high evaporation) → drives Geomorphology (aeolian processes.' },
            { text: 'Verify completeness: All five features assigned; processes flow from climate (driver) to landform/soil/vegetation.' },
            { text: 'Interpret geographically: The Thar Desert is a coupled system where Climatology is the primary driver, but.', faded: true, blankAnswer: 'Sand dunes — Geomorphology (aeolian deposition); Extreme.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_005', title: 'Human Geography is the branch of.',
          scaffold: { problem: 'A researcher wants to study the spatial impact of the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) on rural livelihoods.',
            steps: [
            { text: 'Decompose the phenomenon — MGNREGA is a wage employment programme (economic), implemented through Gram Panchayats.' },
            { text: 'Match each dimension to a sub-branch: Economic Geography (livelihoods, wage labor), Political Geography (decentralized.' },
            { text: 'Assign key spatial concept per sub-branch: Economic Geography — \'spatial inequality\' (variation in work demand across.' },
            { text: 'Specify spatial data: Economic Geography — block-level person-days generated, wage rates; Political Geography —.' },
            { text: 'Synthesize — the integrated framework shows how a single policy operates across economic, political, and demographic.', faded: true, blankAnswer: 'Three sub-branches: Economic Geography (concept: spatial.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_01_001', title: 'Identify each idea',
          dissect: { specimen: 'Geography: Definition, Meaning and Scope', spots: [
            { id: 's1', label: 'Geography is the scientific discipline', prompt: 'Which idea is this? — Geography is the scientific discipline that studies the Earth\'s surface as the home of.', answer: 'Geography is the scientific discipline', options: ['Geography is the scientific discipline', 'Chemistry is the central science', 'The evolution of geography traces', 'Geography as an integrating discipline'] },
            { id: 's2', label: 'Chemistry is the central science', prompt: 'Which idea is this? — Chemistry is the central science that studies the composition, structure, properties, and.', answer: 'Chemistry is the central science', options: ['Chemistry is the central science', 'Geography is the scientific discipline', 'The evolution of geography traces', 'Geography as an integrating discipline'] },
            { id: 's3', label: 'The evolution of geography traces', prompt: 'Which idea is this? — The evolution of geography traces the disciplinary transformation from ancient.', answer: 'The evolution of geography traces', options: ['The evolution of geography traces', 'Geography is the scientific discipline', 'Chemistry is the central science', 'Geography as an integrating discipline'] },
            { id: 's4', label: 'Geography as an integrating discipline', prompt: 'Which idea is this? — Geography as an integrating discipline is the spatial science that synthesizes physical.', answer: 'Geography as an integrating discipline', options: ['Geography as an integrating discipline', 'Geography is the scientific discipline', 'Chemistry is the central science', 'The evolution of geography traces'] },
            { id: 's5', label: 'Physical Geography is the branch', prompt: 'Which idea is this? — Physical Geography is the branch of geography that systematically studies the natural.', answer: 'Physical Geography is the branch', options: ['Physical Geography is the branch', 'Geography is the scientific discipline', 'Chemistry is the central science', 'The evolution of geography traces'] },
            { id: 's6', label: 'Human Geography is the branch', prompt: 'Which idea is this? — Human Geography is the branch of geography that studies the spatial patterns and.', answer: 'Human Geography is the branch', options: ['Human Geography is the branch', 'Geography is the scientific discipline', 'Chemistry is the central science', 'The evolution of geography traces'] }
          ] } }
    ],
    explore: { component: C11_EVSEnvironmentalScienceScopeSim, prompt: 'Explore the interactive — Geography: Definition, Meaning and Scope' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_001', difficulty: 'standard',
          question: 'Geography is the scientific discipline that studies the Earth\'s surface as the.',
          hint: 'Revisit Class 9 "Physical Features of India" (c9_geo_ch1_1) and Class 10 "Resources and.',
          misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier.',
          parts: [
                { id: 'a', prompt: 'Explain why geography is classified as both a natural science and a social science, using the concepts of "physical geography" and "human geography."', answer: 'Geography straddles natural and social sciences',
                  options: ['Geography straddles natural and social sciences', 'geography is only about maps', 'geography is only about nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier classes.' },
                { id: 'b', prompt: 'A student claims, "Geography is just memorizing capitals, rivers, and mountain ranges." Using the definition and scope of geography, write a 3-sentence.', answer: 'Geography goes far beyond rote memorization',
                  options: ['Geography goes far beyond rote memorization', 'geography is the study of maps'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier classes.' }
          ],
            remediations: { 'geography-is-the-study-of': { steps: ['Give the student a blank outline map of India and ask them to mark three physical features and three human features.', 'Then ask: "What geographical *questions* can you ask about the pattern you see?" (e.g., "Why are cities clustered along.', 'Guide them to articulate each question in the form "Where?', 'Finally, show how each question maps to a branch (physical, human, environmental) and an approach (systematic/regional).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Environmental geography is merely a sub-field of physical geography." Justify your evaluation with reference to the human–environment.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'geography is the study of maps'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier classes.' }
          ],
            remediations: { 'geography-is-the-study-of': { steps: ['Give the student a blank outline map of India and ask them to mark three physical features and three human features.', 'Then ask: "What geographical *questions* can you ask about the pattern you see?" (e.g., "Why are cities clustered along.', 'Guide them to articulate each question in the form "Where?', 'Finally, show how each question maps to a branch (physical, human, environmental) and an approach (systematic/regional).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_001', difficulty: 'standard',
          question: 'Chemistry is the central science that studies the composition, structure,.',
          hint: 'If stuck, revisit Class 10 "Chemical Reactions: Identifying a Chemical Change".',
          misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab uses diammonium phosphate (DAP) fertiliser.', answer: 'DAP is (NH₄)₂HPO₄',
                  options: ['DAP is (NH₄)₂HPO₄', 'NH₄PO₄', 'DAP provides NPK'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise that *every*.' }
          ],
            remediations: { 'chemistry-s-relevance-is-limited': { steps: ['Have the student conduct a "Chemical Audit" of their schoolbag: list 10 items, identify the key chemical substance in.', 'Then discuss: "Which of these would not exist without deliberate molecular design?" This forces confrontation with.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Green chemistry is merely a marketing term; all chemical industries already follow environmental regulations." Justify your.', answer: 'The statement is false',
                  options: ['The statement is false', 'chemical', 'chemistry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise that *every*.' },
                { id: 'b', prompt: 'Design a concept map showing how chemistry connects to five distinct career fields in India (e.g., pharmaceuticals, agriscience, materials, energy,.', answer: 'A strong map includes: (1) Pharmaceuticals',
                  options: ['A strong map includes: (1) Pharmaceuticals', 'chemical', 'chemistry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise that *every*.' }
          ],
            remediations: { 'chemistry-s-relevance-is-limited': { steps: ['Have the student conduct a "Chemical Audit" of their schoolbag: list 10 items, identify the key chemical substance in.', 'Then discuss: "Which of these would not exist without deliberate molecular design?" This forces confrontation with.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_002', difficulty: 'standard',
          question: 'The evolution of geography traces the disciplinary transformation from ancient.',
          hint: 'If stuck on "why does intellectual history matter for exams?", revisit.',
          misconception: 'Students conflate *chronological sequence* with *conceptual progression* — believing geography evolved linearly:.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student claims: "Alexander von Humboldt and Carl Ritter founded modern geography together because they both worked in Berlin and wrote multi-volume.', answer: 'The claim is partially true institutionally but false epistemologically',
                  options: ['The claim is partially true institutionally but false epistemologically', 'both German'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate *chronological sequence* with *conceptual progression* — believing geography evolved linearly: "Ancient → Medieval →.' }
          ],
            remediations: { 'students-conflate-chronological-sequence-with': { steps: ['Re-read the NCERT Class 11 *Geography as a Discipline* section "Evolution of Geographical Thought" (pp.', 'For each dualism (idiographic/nomothetic, determinism/possibilism, physical/human), write one Indian case where *both.', 'Practice a 2022 board question: "Geography is the study of areal differentiation" (Hartshorne) — explain with reference.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_009', difficulty: 'standard',
          question: 'Geography as an integrating discipline is the spatial science that synthesizes.',
          hint: 'Revisit the "Relation of Geography with Natural Sciences" and "Relation of Geography with.',
          misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Narmada Valley Project is an engineering project, not a geographical one." Using the integrating discipline framework, list three.', answer: 'Correct answer with steps: 1',
                  options: ['Correct answer with steps: 1', 'dam height', 'power generation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' },
                { id: 'b', prompt: 'Compare the 2015 Chennai floods and the 2022 Bengaluru floods.', answer: 'Chennai\'s flat coastal plain with natural backwater channels',
                  options: ['Correct answer: Chennai\'s flat coastal plain with natural backwater channels', 'climate change', 'poor drainage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' }
          ],
            remediations: { 'integration-means-geography-borrows-facts': { steps: ['Take the Marathwada drought case. Draw a 2x2 matrix on paper: rows = Physical / Human, columns = Factor / Process /.', 'Fill physical row with: Factor = Basalt geology (low porosity), Process = High runoff + low recharge, Policy =.', 'Fill human row with: Factor = Sugarcane cultivation, Process = Political economy of sugar cooperatives, Policy = Free.', 'Draw arrows showing feedback loops: Free electricity → more tubewells → deeper drilling → aquifer depletion → more.', 'Ask: "Which single discipline captures this loop?" None. That loop *is* the geographical integration.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Geography\'s integration of natural and social sciences is just a theoretical ideal; in practice, geographers specialize in either.', answer: 'Correct answer with justification: The statement is partially true regarding',
                  options: ['Correct answer with justification: The statement is partially true regarding', 'integration', 'geography uses geology for rocks, economics for trade', '"integration" means geography *borrows* facts from other sciences (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' },
                { id: 'b', prompt: 'Compare the 2015 Chennai floods and the 2022 Bengaluru floods.', answer: 'Chennai\'s flat coastal plain with natural backwater channels',
                  options: ['Correct answer: Chennai\'s flat coastal plain with natural backwater channels', 'climate change', 'poor drainage', 'integration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' }
          ],
            remediations: { 'integration-means-geography-borrows-facts': { steps: ['Take the Marathwada drought case. Draw a 2x2 matrix on paper: rows = Physical / Human, columns = Factor / Process /.', 'Fill physical row with: Factor = Basalt geology (low porosity), Process = High runoff + low recharge, Policy =.', 'Fill human row with: Factor = Sugarcane cultivation, Process = Political economy of sugar cooperatives, Policy = Free.', 'Draw arrows showing feedback loops: Free electricity → more tubewells → deeper drilling → aquifer depletion → more.', 'Ask: "Which single discipline captures this loop?" None. That loop *is* the geographical integration.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that systematically studies the.',
          hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Name the six major sub-branches of Physical Geography as classified in the NCERT Class 11 textbook and state the primary focus of each in one phrase.', answer: 'The six major sub-branches are: (1) Geomorphology',
                  options: ['The six major sub-branches are: (1) Geomorphology', 'Meteorology', 'Climatology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'b', prompt: 'A student claims: "Physical Geography only studies static features like mountains and rivers; it does not deal with processes." Using the definition of any two.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Hydrology', 'Oceanography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'c', prompt: 'The Brahmaputra River forms a large delta in Bangladesh. Identify which THREE sub-branches of Physical Geography are directly involved in explaining this.', answer: 'The three sub-branches are: (1) Geomorphology',
                  options: ['The three sub-branches are: (1) Geomorphology', 'Hydrology', 'Oceanography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology,.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Oceanography should be considered a separate discipline, not a sub-branch of Physical Geography, because it has its own theories,.', answer: 'Against the statement',
                  options: ['Against the statement', 'Hydrology', 'Oceanography', 'plant geography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology,.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_005', difficulty: 'standard',
          question: 'Human Geography is the branch of geography that studies the spatial patterns.',
          hint: 'Revisit c11_geo_cbse_01_003: create a Venn diagram comparing Systematic (topical) vs.',
          misconception: 'Students often equate Human Geography sub-branches with *topics* (e.g., "migration is a sub-branch") rather than.',
          parts: [
                { id: 'a', prompt: 'Explain why Urban Geography and Settlement Geography are distinct sub-branches despite both studying human habitations.', answer: 'Settlement Geography focuses on the *spatial pattern* of human habitations',
                  options: ['Settlement Geography focuses on the *spatial pattern* of human habitations', 'urbanization'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate Human Geography sub-branches with *topics* (e.g., "migration is a sub-branch") rather than *systematic analytical.' }
          ],
            remediations: { 'students-often-equate-human-geography': { steps: ['Create a two-column table. Column A: List 10 real-world phenomena (e.g., farmer suicide, traffic congestion, language.', 'Verify each pair against NCERT definitions.', 'Practice converting a topic into a research question for two different sub-branches (e.g., "slum" → Settlement.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
