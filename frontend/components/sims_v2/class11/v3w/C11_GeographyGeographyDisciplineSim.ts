import type { SimDef } from '../../engine/types';
import C11_GeographyGeographyDisciplineSim from '../../../simulations/c6_12/C11_GeographyGeographyDisciplineSim';

/** v3 wrapped master — C11_GeographyGeographyDisciplineSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographygeographydisciplinesim: SimDef = {
    id: 'v3w_c11_geographygeographydisciplinesim',
    title: 'Geography Discipline',
    subtitle: 'This node covers the etymological roots, formal definition, and the broad scope of.',
    classLevel: 11, subject: 'geography', topic: 'Geography: Definition, Meaning and Scope',
    chapters: [],
    nodeIds: ['c11_geo_cbse_01_001', 'c11_geo_cbse_01_002', 'c11_geo_cbse_01_004', 'c11_geo_cbse_01_006', 'c11_geo_cbse_01_008', 'c11_geo_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to observe their immediate surroundings: the school building, the road outside, the.', goal: 'Master Geography Discipline.' },
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_006', title: 'Biogeography is the study of the.',
          scaffold: { problem: 'A student observes that the natural vegetation in Rajasthan\'s Thar Desert consists of thorny bushes and xerophytes, while the Andaman.',
            steps: [
            { text: 'Identify the key climatic variables: Rajasthan receives <25 cm annual rainfall, high temperature range; Andaman.' },
            { text: 'Recall the climate-vegetation relationship: Arid climates support xerophytic vegetation (deep roots, reduced leaves);.' },
            { text: 'Consider edaphic factors: Sandy soils in Thar have low water retention; Andaman\'s lateritic soils are nutrient-rich but.' },
            { text: 'Analyze biogeographic history: Thar\'s flora shows adaptations to drought and salinity; Andaman\'s flora shows affinity.' },
            { text: 'Synthesize: The contrast is explained by the interaction of climate (rainfall, temperature), soil, and historical.', faded: true, blankAnswer: 'The Thar Desert\'s xerophytic vegetation results from low.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_008', title: 'Geography\'s relationship with History.',
          scaffold: { problem: 'Explain why the Harappan Civilisation (2600-1900 BCE) flourished in the Ghaggar-Hakra (Saraswati) basin and collapsed, using geographic.',
            steps: [
            { text: 'Identify the physical template — Ghaggar-Hakra was a perennial Himalayan-fed river (Sutlej/Yamuna palaeochannels).' },
            { text: 'Link to historical urbanism — predictable inundation allowed surplus wheat/barley, supporting cities (Rakhigarhi,.' },
            { text: 'Trace the geographic perturbation — mid-Holocene aridification (4.2 ka event) reduced monsoon intensity; tectonic.' },
            { text: 'Analyse the systemic collapse — river became seasonal/ephemeral; carrying capacity dropped below urban threshold;.' },
            { text: 'Synthesise — geography did not \'determine\' collapse; it set the boundary conditions.', faded: true, blankAnswer: 'The Harappan flourishing and decline were mediated by the.' }
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
        { type: 'dissect', nodeId: 'c11_geo_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Geography Discipline', spots: [
            { id: 's1', label: 'Geography is the scientific discipline', prompt: 'Which idea is this? — Geography is the scientific discipline that studies the Earth\'s surface as the home of.', answer: 'Geography is the scientific discipline', options: ['Geography is the scientific discipline', 'The evolution of geography traces', 'Physical Geography is the branch', 'Biogeography is the study of'] },
            { id: 's2', label: 'The evolution of geography traces', prompt: 'Which idea is this? — The evolution of geography traces the disciplinary transformation from ancient.', answer: 'The evolution of geography traces', options: ['The evolution of geography traces', 'Geography is the scientific discipline', 'Physical Geography is the branch', 'Biogeography is the study of'] },
            { id: 's3', label: 'Physical Geography is the branch', prompt: 'Which idea is this? — Physical Geography is the branch of geography that systematically studies the natural.', answer: 'Physical Geography is the branch', options: ['Physical Geography is the branch', 'Geography is the scientific discipline', 'The evolution of geography traces', 'Biogeography is the study of'] },
            { id: 's4', label: 'Biogeography is the study of', prompt: 'Which idea is this? — Biogeography is the study of the geographic distribution of plants and animals (flora and.', answer: 'Biogeography is the study of', options: ['Biogeography is the study of', 'Geography is the scientific discipline', 'The evolution of geography traces', 'Physical Geography is the branch'] },
            { id: 's5', label: 'Geographys relationship with History examines', prompt: 'Which idea is this? — Geography\'s relationship with History examines how spatial factors (location, terrain,.', answer: 'Geographys relationship with History examines', options: ['Geographys relationship with History examines', 'Geography is the scientific discipline', 'The evolution of geography traces', 'Physical Geography is the branch'] },
            { id: 's6', label: 'Geography as an integrating discipline', prompt: 'Which idea is this? — Geography as an integrating discipline is the spatial science that synthesizes physical.', answer: 'Geography as an integrating discipline', options: ['Geography as an integrating discipline', 'Geography is the scientific discipline', 'The evolution of geography traces', 'Physical Geography is the branch'] }
          ] } }
    ],
    explore: { component: C11_GeographyGeographyDisciplineSim, prompt: 'Explore the interactive — Geography Discipline' },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_006', difficulty: 'standard',
          question: 'Biogeography is the study of the geographic distribution of plants and animals.',
          hint: 'If stuck, revisit the systematic vs regional approach (c11_geo_cbse_01_003) and the.',
          misconception: 'Students often think biogeography is merely listing which animals live where (like a catalogue), missing the emphasis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biogeography is the study of the geographic distribution of plants and animals (flora and',
                  options: ['Biogeography is the study of the geographic distribution of plants and animals (flora and', 'Geography is the scientific discipline that studies the Earth\'s surface as the home of', 'The evolution of geography traces the disciplinary transformation from ancient', 'Physical Geography is the branch of geography that systematically studies the natural'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think biogeography is merely listing which animals live where (like a catalogue), missing the emphasis on processes like.' }
          ],
            remediations: { 'biogeography-is-merely-listing-which': { steps: ['To remediate, have the student: (1) Take a transect walk in a nearby park or forest patch, recording tree species and.', '(2) Plot these observations on a simple sketch map to visualize spatial patterns.', '(3) Compare two contrasting areas (e.g., a sacred grove vs.', 'a roadside plantation) to see how human management alters species composition.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_008', difficulty: 'standard',
          question: 'Geography\'s relationship with History examines how spatial factors (location,.',
          hint: 'Revisit c11_geo_cbse_01_004 (Physical Geography branches) and c11_geo_cbse_01_005 (Human.',
          misconception: 'Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g., "monsoon causes Indian.',
          parts: [
                { id: 'a', prompt: 'Why does the Deccan Trap basalt region historically host fewer large empires than the Gangetic alluvium, despite both being in peninsular India?', answer: 'Basalt weathers into shallow, nutrient-poor regur (black cotton soil) with low',
                  options: ['Basalt weathers into shallow, nutrient-poor regur (black cotton soil) with low', 'Deccan is drier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g., "monsoon causes Indian agriculture").' },
                { id: 'b', prompt: 'Using the concept of \'comparative advantage\', explain why the British established jute mills in Bengal (Hooghly) rather than in Punjab where jute was also.', answer: 'Step 1: Identify inputs',
                  options: ['Step 1: Identify inputs', 'British preference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g., "monsoon causes Indian agriculture").' }
          ],
            remediations: { 'students-treat-geography-influences-history': { steps: ['Draw a simple feedback loop diagram — Physical Geography → Historical Decision → Economic Outcome → Modified Geography.', 'Populate with the Punjab canal colony example above.', 'Identify the \'decision node\' where human agency intervenes (canal alignment, crop choice).', 'Practice with a new case — e.g., Delhi Metro (historical decision) → land value gradient change (economic) →.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_009', difficulty: 'standard',
          question: 'Geography as an integrating discipline is the spatial science that synthesizes.',
          hint: 'Revisit the "Relation of Geography with Natural Sciences" and "Relation of Geography with.',
          misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Narmada Valley Project is an engineering project, not a geographical one." Using the integrating discipline framework, list three.', answer: 'Correct answer with steps: 1',
                  options: ['Correct answer with steps: 1', 'dam height', 'power generation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' },
                { id: 'b', prompt: 'Compare the 2015 Chennai floods and the 2022 Bengaluru floods.', answer: 'Correct answer: Chennai\'s flat coastal plain with natural backwater channels',
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
                { id: 'b', prompt: 'Compare the 2015 Chennai floods and the 2022 Bengaluru floods.', answer: 'Correct answer: Chennai\'s flat coastal plain with natural backwater channels',
                  options: ['Correct answer: Chennai\'s flat coastal plain with natural backwater channels', 'climate change', 'poor drainage', 'integration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' }
          ],
            remediations: { 'integration-means-geography-borrows-facts': { steps: ['Take the Marathwada drought case. Draw a 2x2 matrix on paper: rows = Physical / Human, columns = Factor / Process /.', 'Fill physical row with: Factor = Basalt geology (low porosity), Process = High runoff + low recharge, Policy =.', 'Fill human row with: Factor = Sugarcane cultivation, Process = Political economy of sugar cooperatives, Policy = Free.', 'Draw arrows showing feedback loops: Free electricity → more tubewells → deeper drilling → aquifer depletion → more.', 'Ask: "Which single discipline captures this loop?" None. That loop *is* the geographical integration.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
