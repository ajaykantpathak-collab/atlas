import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch05_p2: SimDef = {
    id: 'v3_c12_geo_ch05_p2',
    title: 'Primary Activities · Part 2/2',
    subtitle: 'Farm, forest, mine and sea — the economy\'s first gear',
    classLevel: 12, subject: 'geography', topic: 'Primary Activities · Part 2/2',
    chapters: ['c12_geo_ch05'],
    nodeIds: ['c12_geo_cbse_05_007', 'c12_geo_cbse_05_008', 'c12_geo_cbse_05_009', 'c12_geo_cbse_05_010', 'c12_geo_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Economic geographer', intro: 'Everything on your breakfast plate began as someone\'s direct negotiation with nature. Follow it back to the source.', goal: 'Classify primary activities across farm, forest, mine and sea, and read how physical and human factors shape each.' },
    discovery: {
        question: 'Honey gathered in the Sundarbans, oil drilled at Bombay High, sheep grazing in Ladakh, cotton woven on a Tamil Nadu loom — which one is NOT a primary activity?',
        options: ['The weaving — transforming raw material into cloth is secondary; primary means taking directly from farm, forest, mine or sea', 'The oil drilling — machines disqualify it', 'The sheep — herding is a service', 'The honey — too small-scale'],
        answer: 'The weaving — transforming raw material into cloth is secondary; primary means taking directly from farm, forest, mine or sea',
        hook: '\'Primary\' ≠ \'agriculture\' — it\'s four resource bases: farm, forest, mine, sea. Machines don\'t disqualify an activity; production order does. And ~45% of India\'s workforce still lives in this sector, so \'declining GDP share\' isn\'t \'declining significance\'.',
    },
    teaching: [
        { title: 'Extensive Commercial Grain Farming: Wheat and Corn Belts', text: 'Extensive commercial grain farming is a large-scale agricultural practice where crops like wheat and maize (corn) are grown on vast tracts of land with high mechanization, low labor input per unit.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read landscapes like a geographer: match Punjab\'s green rectangles, Bastar\'s ash-clearings, Rajasthan\'s radial tracks and Uttarakhand\'s terraces to their activities — physical template versus human rewrite.',
        labels: ['Extensive Commercial Grain Farming', 'Mixed Farming: Characteristics', 'Dairy Farming: Characteristics', 'Mediterranean Agriculture and Market', 'Large-Scale Dairy Farming'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_007', title: 'Extensive Commercial Grain Farming: Wheat and Corn Belts',
          caseStudy: { intro: 'Begin by observing a satellite image of the North American Prairies or the Eurasian Steppes: vast, flat, treeless expanses divided into enormous rectangular.',
            decisions: [{ prompt: 'What are the two main cereal crops that dominate extensive commercial grain farming globally, and name one major region (belt) for each?', options: [
                { text: 'The two main crops are wheat and maize (corn)', outcome: 'The two main crops are wheat and maize (corn). Major wheat belts include the Prairies (North.' },
                { text: 'extensive', outcome: 'Not quite — Students often think extensive commercial grain farming is "extensive" because it uses little.', reveals: 'extensive-commercial-grain-farming-is' },
                { text: 'rice or millet', outcome: 'Not quite — Students often think extensive commercial grain farming is "extensive" because it uses little.', reveals: 'extensive-commercial-grain-farming-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_008', title: 'Mixed Farming: Characteristics and Regional Distribution',
          caseStudy: { intro: 'Begin by showing a satellite image of a typical farm in the US Corn Belt: notice the patchwork of corn/soybean fields adjacent to pasture and feedlots.',
            decisions: [{ prompt: 'State the defining feature that distinguishes mixed farming from extensive commercial grain farming.', options: [
                { text: 'Correct answer: Mixed farming integrates crop cultivation and livestock rearing on the', outcome: 'Correct answer: Mixed farming integrates crop cultivation and livestock rearing on the same farm.' },
                { text: 'mixed farming uses more machinery', outcome: 'Not quite — Students often think mixed farming is simply "growing crops and keeping animals" and equate it with.', reveals: 'mixed-farming-is-simply-growing' },
                { text: 'growing crops and keeping animals', outcome: 'Not quite — Students often think mixed farming is simply "growing crops and keeping animals" and equate it with.', reveals: 'mixed-farming-is-simply-growing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_009', title: 'Dairy Farming: Characteristics and Major Regions',
          caseStudy: { intro: 'Observe the milk packet in your refrigerator — it likely travelled from a village cooperative to a processing plant to your city within 24 hours.',
            decisions: [{ prompt: 'Define dairy farming as a primary activity and state its two most distinguishing characteristics compared to nomadic pastoralism.', options: [
                { text: 'Dairy farming is a sedentary, capital-intensive, market-oriented primary activity focused', outcome: 'Dairy farming is a sedentary, capital-intensive, market-oriented primary activity focused.' },
                { text: 'moving with herds', outcome: 'Not quite — Students believe dairy farming is "just keeping cows for milk" and occurs wherever cattle exist.', reveals: 'dairy-farming-is-just-keeping' },
                { text: 'subsistence-only', outcome: 'Not quite — Students believe dairy farming is "just keeping cows for milk" and occurs wherever cattle exist.', reveals: 'dairy-farming-is-just-keeping' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_010', title: 'Mediterranean Agriculture and Market Gardening',
          caseStudy: { intro: 'Start by showing a student a photo of terraced olive groves in Greece and a rooftop vegetable farm in Mumbai.',
            decisions: [{ prompt: 'Name the five major world regions where Mediterranean agriculture is practiced and state the latitudinal range they occupy.', options: [
                { text: 'The five regions are: (1) Mediterranean Basin (Europe, Africa, Asia), (2) California', outcome: 'The five regions are: (1) Mediterranean Basin (Europe, Africa, Asia), (2) California (USA), (3).' },
                { text: 'tropical regions or missing one', outcome: 'Not quite — Students often think Mediterranean agriculture is practiced only around the Mediterranean Sea.', reveals: 'mediterranean-agriculture-is-practiced-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_011', title: 'Large-Scale Dairy Farming and Truck Farming',
          caseStudy: { intro: 'Observe the milk packets and fresh vegetable bundles in your kitchen — both travel daily from farms within 50–100 km of your city.',
            decisions: [{ prompt: 'Name the two primary activities characterised by high capital investment, scientific management, and location near urban markets for.', options: [
                { text: 'Large-scale dairy farming and truck farming (market gardening)', outcome: 'Large-scale dairy farming and truck farming (market gardening).' },
                { text: 'plantation agriculture', outcome: 'Not quite — Students equate "large-scale dairy farming" with "factory farming" (confined animal feeding.', reveals: 'students-equate-large-scale-dairy' },
                { text: 'mixed farming', outcome: 'Not quite — Students equate "large-scale dairy farming" with "factory farming" (confined animal feeding.', reveals: 'students-equate-large-scale-dairy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A resource company scouting a dry savanna reports the land is \'virtually empty — under one person per sq km — and unproductive,\' so acquiring it for a project should be simple. You know scattered forager camps use the area seasonally.',
            decisions: [{ prompt: 'How does the geography of hunting and gathering change the assessment?', options: [
                { text: 'Low density is carrying capacity, not emptiness — wild resources are dispersed and unpredictable, so a small forager group legitimately needs a vast range; \'unproductive\' land is the group\'s entire food system, as with the San in the Kalahari.', outcome: 'The chapter explains why such activity survives only in marginal environments and why densities stay under one per sq km: the land is fully used, just at an extensive intensity that maps and headcounts miss.' },
                { text: 'Agree — with under a person per sq km, the camps are a rounding error and relocation is trivial.', outcome: 'That misreads the density: the small number is the *result* of needing huge area per person; displacing the group means taking away an enormous foraging territory, not a tiny plot.', reveals: 'low-density-equals-unused' },
                { text: 'The camps are pastoralists moving herds, so buying grazing rights covers their use anyway.', outcome: 'Foragers aren\'t pastoralists — they depend on wild game and plants, not domesticated herds; the distinction matters because fencing \'grazing land\' still removes the wild tubers and game they actually live on.', reveals: 'forager-equals-pastoralist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'You can now classify any livelihood by its order of production — and read a satellite image\'s geometry as an economy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_007', difficulty: 'standard',
          question: 'Extensive commercial grain farming is a large-scale agricultural practice where.',
          hint: 'If stuck, revisit c6_geography_ch04_021 (Types of Farming: Subsistence vs Commercial) and.',
          misconception: 'Students often think extensive commercial grain farming is "extensive" because it uses little technology (like shifting.',
          parts: [
                { id: 'a', prompt: 'What are the two main cereal crops that dominate extensive commercial grain farming globally, and name one major region (belt) for each?', answer: 'The two main crops are wheat and maize (corn)',
                  options: ['The two main crops are wheat and maize (corn)', 'extensive', 'rice or millet'],
                  hint: 'If stuck, revisit c6_geography_ch04_021 (Types of Farming: Subsistence vs Commercial) and.',
                  misconception: 'Students often think extensive commercial grain farming is "extensive" because it uses little technology (like shifting cultivation).' },
                { id: 'b', prompt: 'Given a climate graph for a station in the Canadian Prairies (e.g., Regina: annual precipitation 390 mm, summer max 26°C, winter min -20°C), explain whether.', answer: 'Step 1: Identify the climate type: semi-arid continental (BSk)',
                  options: ['Step 1: Identify the climate type: semi-arid continental (BSk)', 'extensive'],
                  hint: 'If stuck, revisit c6_geography_ch04_021 (Types of Farming: Subsistence vs Commercial) and.',
                  misconception: 'Students often think extensive commercial grain farming is "extensive" because it uses little technology (like shifting cultivation).' }
          ],
            remediations: { 'extensive-commercial-grain-farming-is': { steps: ['If the student holds the misconception that extensive means low technology: (1) Show a video of a combine harvester.', '(2) Revisit the definition of "extensive vs intensive" from c6_geography_ch04_021 (Types of Farming).', '(3) Use a table to contrast extensive commercial grain farming (large farms, high mechanization, low labor/ha) with.', '(4) Re-diagnose with a question: "A farmer in Kansas operates 1000 hectares with two employees and GPS-guided tractors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_008', difficulty: 'standard',
          question: 'Mixed farming is a commercial agricultural system where crops and livestock are.',
          hint: 'Review c12_geo_cbse_05_001 (Primary Activities definition) and c12_geo_cbse_05_007.',
          misconception: 'Students often think mixed farming is simply "growing crops and keeping animals" and equate it with subsistence mixed.',
          parts: [
                { id: 'a', prompt: 'A farmer in the Argentine Pampas rotates wheat, maize, and alfalfa while raising beef cattle.', answer: 'Step 1: Alfalfa (legume) fixes atmospheric N₂ via root nodules',
                  options: ['Step 1: Alfalfa (legume) fixes atmospheric N₂ via root nodules', 'growing crops and keeping animals'],
                  hint: 'Review c12_geo_cbse_05_001 (Primary Activities definition) and c12_geo_cbse_05_007 (Extensive.',
                  misconception: 'Students often think mixed farming is simply "growing crops and keeping animals" and equate it with subsistence mixed cropping in India.' },
                { id: 'b', prompt: 'Compare the land-use pattern of a mixed farm in the US Corn Belt with a dairy farm in New Zealand.', answer: 'Similarities: both integrate crops (fodder) and livestock',
                  options: ['Similarities: both integrate crops (fodder) and livestock', 'both are the same', 'growing crops and keeping animals'],
                  hint: 'Review c12_geo_cbse_05_001 (Primary Activities definition) and c12_geo_cbse_05_007 (Extensive.',
                  misconception: 'Students often think mixed farming is simply "growing crops and keeping animals" and equate it with subsistence mixed cropping in India.' }
          ],
            remediations: { 'mixed-farming-is-simply-growing': { steps: ['Revisit c10_geo_cbse_04_002 (Types of Farming) to clarify the commercial vs subsistence distinction.', 'Use a Venn diagram: left circle "subsistence mixed cropping (India)", right circle "commercial mixed farming.', 'Watch a 5-min video of a Corn Belt farm operation (feedlot, combine harvester, grain silo).', 'Re-attempt Diagnostic Question 1 and 4; if still incorrect, review the "nutrient cycle" diagram in NCERT Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think mixed farming is simply "growing crops and keeping animals" and equate it with subsistence mixed.',
          parts: [
                { id: 'a', prompt: 'Evaluate the sustainability of mixed farming in the Canadian Prairies under climate change scenarios projecting increased summer drought frequency.', answer: 'For: (1) Crop diversity (rotation) buffers against total failure',
                  options: ['For: (1) Crop diversity (rotation) buffers against total failure', 'growing crops and keeping animals'],
                  hint: 'Review c12_geo_cbse_05_001 (Primary Activities definition) and c12_geo_cbse_05_007 (Extensive.',
                  misconception: 'Students often think mixed farming is simply "growing crops and keeping animals" and equate it with subsistence mixed cropping in India.' },
                { id: 'b', prompt: 'Design a 5-year crop-livestock rotation plan for a 200-ha mixed farm in the Ukrainian steppe that maximizes soil fertility, minimizes external inputs, and.', answer: 'Example rotation: Year 1: Wheat (50 ha) + clover undersown',
                  options: ['Example rotation: Year 1: Wheat (50 ha) + clover undersown', 'growing crops and keeping animals'],
                  hint: 'Review c12_geo_cbse_05_001 (Primary Activities definition) and c12_geo_cbse_05_007 (Extensive.',
                  misconception: 'Students often think mixed farming is simply "growing crops and keeping animals" and equate it with subsistence mixed cropping in India.' }
          ],
            remediations: { 'mixed-farming-is-simply-growing': { steps: ['Revisit c10_geo_cbse_04_002 (Types of Farming) to clarify the commercial vs subsistence distinction.', 'Use a Venn diagram: left circle "subsistence mixed cropping (India)", right circle "commercial mixed farming.', 'Watch a 5-min video of a Corn Belt farm operation (feedlot, combine harvester, grain silo).', 'Re-attempt Diagnostic Question 1 and 4; if still incorrect, review the "nutrient cycle" diagram in NCERT Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_009', difficulty: 'standard',
          question: 'Dairy farming is a capital-intensive, market-oriented primary activity.',
          hint: 'If stuck on locational logic, revisit c11_geo_cbse_20_001 (industrial location factors).',
          misconception: 'Students believe dairy farming is "just keeping cows for milk" and occurs wherever cattle exist.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dairy farming is a capital-intensive, market-oriented primary activity involving the',
                  options: ['Dairy farming is a capital-intensive, market-oriented primary activity involving the', 'Primary activities are economic activities that involve the direct extraction,', 'Hunting and gathering is the most primitive primary activity where humans obtain food by', 'Pastoralism is a primary economic activity centered on raising livestock on natural'],
                  hint: 'If stuck on locational logic, revisit c11_geo_cbse_20_001 (industrial location factors) and.',
                  misconception: 'Students believe dairy farming is "just keeping cows for milk" and occurs wherever cattle exist.' }
          ],
            remediations: { 'dairy-farming-is-just-keeping': { steps: ['Revisit c10_geo_cbse_04_001 (agriculture types) to distinguish subsistence livestock from commercial dairying.', 'Use India\'s NDDB website to trace Amul\'s cold chain from village to city — note the 3-tier structure (DCS → District.', 'On a map, overlay 4°C isotherm (January), railway network, and million-plus cities — observe the spatial match with.', 'Re-attempt Diagnostic Q3 and Q4 after this mapping exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_010', difficulty: 'standard',
          question: 'Mediterranean Agriculture is a specialized commercial farming system practiced.',
          hint: 'If stuck, review Class 11 climatic regions (c11_geo_cbse_10_005) and Class 12 primary.',
          misconception: 'Students often think Mediterranean agriculture is practiced only around the Mediterranean Sea, forgetting the four.',
          parts: [
                { id: 'a', prompt: 'Explain why Mediterranean farmers grow crops like olives and grapes that are deep‑rooted and drought‑resistant, linking your answer to the seasonal rainfall.', answer: 'Mediterranean climate receives rainfall only in winter (mid‑latitude cyclones)',
                  options: ['Mediterranean climate receives rainfall only in winter (mid‑latitude cyclones)', 'summer rain', 'irrigation only'],
                  hint: 'If stuck, review Class 11 climatic regions (c11_geo_cbse_10_005) and Class 12 primary activities.',
                  misconception: 'Students often think Mediterranean agriculture is practiced only around the Mediterranean Sea, forgetting the four other global regions.' },
                { id: 'b', prompt: 'A market gardener near Bengaluru grows spinach, coriander, and marigold on 2 hectares using drip irrigation and sells daily at the city market.', answer: 'Spinach: 2 ha × 25 t/ha × 2 crops × ₹20,000/t = ₹20,00,000',
                  options: ['Spinach: 2 ha × 25 t/ha × 2 crops × ₹20,000/t = ₹20,00,000', 'all crops have same cycles'],
                  hint: 'If stuck, review Class 11 climatic regions (c11_geo_cbse_10_005) and Class 12 primary activities.',
                  misconception: 'Students often think Mediterranean agriculture is practiced only around the Mediterranean Sea, forgetting the four other global regions.' }
          ],
            remediations: { 'mediterranean-agriculture-is-practiced-only': { steps: ['Revisit Class 11 climatic regions (c11_geo_cbse_10_005) to map Mediterranean climate zones globally.', 'Use an atlas to locate the five regions and note their latitudinal range.', 'Review von Thünen’s model (if covered) or Class 10’s “Types of Farming” (c10_geo_cbse_04_002) to distinguish market.', 'Re‑attempt Diagnostic Questions 1 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_011', difficulty: 'standard',
          question: 'Large-scale dairy farming is a capital-intensive, highly mechanised commercial.',
          hint: 'Review c10_geo_cbse_04_007 (von Thünen model) — draw the four rings for a hypothetical.',
          misconception: 'Students equate "large-scale dairy farming" with "factory farming" (confined animal feeding operations - CAFOs) and.',
          parts: [
                { id: 'a', prompt: 'Name the two primary activities characterised by high capital investment, scientific management, and location near urban markets for perishable products.', answer: 'Large-scale dairy farming and truck farming (market gardening)',
                  options: ['Large-scale dairy farming and truck farming (market gardening)', 'plantation agriculture', 'mixed farming'],
                  hint: 'Review c10_geo_cbse_04_007 (von Thünen model) — draw the four rings for a hypothetical city and.',
                  misconception: 'Students equate "large-scale dairy farming" with "factory farming" (confined animal feeding operations - CAFOs) and assume zero grazing.' }
          ],
            remediations: { 'students-equate-large-scale-dairy': { steps: ['Revisit c12_geo_cbse_05_009 (Dairy Farming Characteristics) — compare traditional vs. commercial dairy table.', 'Watch 10-min video "A Day at a Karnal Dairy Farm" (NDRI YouTube) — note loose housing, green fodder feeding, milking.', 'Re-do Diagnostic Q3 with indigenous breed (Sahiwal, 10 L/day) vs. crossbred (30 L/day) to see profit difference.', 'Map dairy belts on India outline map — observe alignment with canal-irrigated fodder zones, not industrial corridors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
