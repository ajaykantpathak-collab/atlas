import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch04_p1: SimDef = {
    id: 'v3_c12_hs_ch04_p1',
    title: 'Fabric and Apparel · Part 1/2',
    subtitle: 'Warm-when-wet is a physics property, not a brand claim',
    classLevel: 12, subject: 'home_science', topic: 'Fabric and Apparel · Part 1/2',
    chapters: ['c12_hs_ch04'],
    nodeIds: ['c12_hs_cbse_04_001', 'c12_hs_cbse_04_002', 'c12_hs_cbse_04_003', 'c12_hs_cbse_04_004', 'c12_hs_cbse_04_005', 'c12_hs_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Textile selection engineer', intro: 'Every garment is a bet on fibre properties — absorbency, wet strength, warmth. Learn to place the bet correctly.', goal: 'Classify fibres and select them for apparel using property-based reasoning, not the natural/synthetic binary.' },
    discovery: {
        question: 'For a mountaineering base layer that must stay warm when wet and resist odour, engineers still reach for old-fashioned wool over polyester. Why?',
        options: ['Fibre physics — wool\'s crimp traps air even damp, its scales wick moisture, and natural antimicrobial properties fight odour; polyester loses warmth wet and holds smell', 'Wool is natural, so better', 'Polyester is too light', 'Tradition'],
        answer: 'Fibre physics — wool\'s crimp traps air even damp, its scales wick moisture, and natural antimicrobial properties fight odour; polyester loses warmth wet and holds smell',
        hook: '\'Natural good, synthetic bad\' collapses fast — regenerated fibres like rayon are natural polymers processed with chemicals, and blends make the question moot. Classification isn\'t a label to memorise; it\'s a decision framework from molecule to garment performance.',
    },
    teaching: [
        { title: 'Textile Fibres: Classification and Properties for Apparel Selection', text: 'Textile fibres are the fundamental units of fabric, classified by origin into natural (cellulosic, protein, mineral) and manufactured (regenerated, synthetic, inorganic) categories, each possessing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design by properties, not labels: match moisture regain, wet-strength and warmth to a real garment brief, decode a fibre from its property table, and judge a school-uniform blend on all five counts.',
        labels: ['Textile Fibres: Classification', 'Cotton Fibre: Properties, Processing', 'Wool Fibre: Properties, Felting', 'Silk Fibre: Types, Properties', 'Manufactured Fibres: Regenerated', 'Yarn Construction: Twist, Count'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_001', title: 'Textile Fibres: Classification and Properties for Apparel Selection',
          caseStudy: { intro: 'Imagine you are designing a summer kurta for a customer in Rajasthan who wants maximum comfort in 45°C heat, minimal ironing, and durability for daily wear.',
            decisions: [{ prompt: 'Define "textile fibre" and state the two primary classification categories based on origin. Give one example of each category.', options: [
                { text: 'A textile fibre is a fine, hair-like strand that can be spun into yarn and made into', outcome: 'A textile fibre is a fine, hair-like strand that can be spun into yarn and made into fabric.' },
                { text: 'cotton and wool', outcome: 'Not quite — Students often believe that "natural fibres are always more comfortable and synthetic fibres are.', reveals: 'natural-fibres-are-always-more' },
                { text: 'regenerated', outcome: 'Not quite — Students often believe that "natural fibres are always more comfortable and synthetic fibres are.', reveals: 'natural-fibres-are-always-more' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_002', title: 'Cotton Fibre: Properties, Processing and End Uses',
          caseStudy: { intro: 'Imagine you are a textile technologist at a spinning mill in Coimbatore.',
            decisions: [{ prompt: 'A cotton fibre\'s primary wall is thin and contains less cellulose than the secondary wall.', options: [
                { text: 'A mature cotton fibre contains 90-95% cellulose, with the secondary wall (S2 layer)', outcome: 'A mature cotton fibre contains 90-95% cellulose, with the secondary wall (S2 layer) contributing.' },
                { text: '50% cellulose', outcome: 'Not quite — Students believe "longer staple cotton is always better for all yarn counts." They select Suvin (38.', reveals: 'longer-staple-cotton-is-always' },
                { text: 'primary wall contributes most', outcome: 'Not quite — Students believe "longer staple cotton is always better for all yarn counts." They select Suvin (38.', reveals: 'longer-staple-cotton-is-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_003', title: 'Wool Fibre: Properties, Felting and Woollen Processing',
          caseStudy: { intro: 'Imagine you are holding a coarse woollen blanket and a fine worsted suit fabric — both came from sheep, yet they feel, drape, and perform completely.',
            decisions: [{ prompt: 'State the three main morphological components of a wool fibre and name the primary chemical constituent of each.', options: [
                { text: 'Correct answer: (1) Cuticle', outcome: 'Correct answer: (1) Cuticle — overlapping epithelial scales, primarily keratin (hard keratin, high.' },
                { text: 'epidermis, dermis, medulla', outcome: 'Not quite — Students frequently believe: "All wool felts equally, and felting is simply fibres sticking.', reveals: 'students-frequently-believe-all-wool' },
                { text: 'cellulose, lignin, pectin', outcome: 'Not quite — Students frequently believe: "All wool felts equally, and felting is simply fibres sticking.', reveals: 'students-frequently-believe-all-wool' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_004', title: 'Silk Fibre: Types, Properties and Sericulture Process',
          caseStudy: { intro: 'Imagine you are holding a pure Kanchipuram saree — its lustre, drape, and strength all come from a single continuous filament that a tiny caterpillar spun.',
            decisions: [{ prompt: 'Name the four commercially exploited silk varieties in India and the specific host plant for each.', options: [
                { text: 'Correct: (1) Mulberry', outcome: 'Correct: (1) Mulberry — *Morus alba* (mulberry); (2) Tasar — *Terminalia tomentosa* (asan).' },
                { text: 'silk cotton', outcome: 'Not quite — Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk.', reveals: 'eri-silk-is-a-filament' },
                { text: 'spider silk', outcome: 'Not quite — Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk.', reveals: 'eri-silk-is-a-filament' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_005', title: 'Manufactured Fibres: Regenerated and Synthetic Fibre Properties',
          caseStudy: { intro: 'Imagine you are designing a summer sports T-shirt that must wick sweat, dry quickly, and retain shape after repeated washing.',
            decisions: [{ prompt: 'Name the two main categories of manufactured fibres and give one example of each.', options: [
                { text: 'The two main categories are regenerated fibres (e.g., viscose rayon) and synthetic fibres', outcome: 'The two main categories are regenerated fibres (e.g., viscose rayon) and synthetic fibres (e.g.' },
                { text: 'cotton', outcome: 'Not quite — Students often think "regenerated fibres are natural fibres" because they originate from cellulose.', reveals: 'regenerated-fibres-are-natural-fibres' },
                { text: 'regenerated fibres are natural fibres', outcome: 'Not quite — Students often think "regenerated fibres are natural fibres" because they originate from cellulose.', reveals: 'regenerated-fibres-are-natural-fibres' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_04_006', title: 'Yarn Construction: Twist, Count and Yarn Classification',
          scaffold: { problem: 'A cotton yarn has a count of 40 Ne and a twist multiplier of 4.2.',
            steps: [
            { text: 'Identify given: Count = 40 Ne, TM = 4.2.' },
            { text: 'Calculate TPI = TM × √Ne = 4.2 × √40 = 4.2 × 6.3249 = 26.56 TPI.' },
            { text: 'Convert TPI to TPM: 1 inch = 0.0254 m → TPM = TPI / 0.0254 = 26.56 / 0.0254 = 1045.67 TPM ≈ 1046 TPM.' },
            { text: 'For 3-ply, resultant count (indirect) = Single count / n = 40 / 3 = 13.33 Ne.' },
            { text: 'TPM of ply yarn = TM × √(resultant count) / 0.0254 = 4.2 × √13.33 / 0.0254 = 4.2 × 3.651 / 0.0254 = 15.33 / 0.0254.', faded: true, blankAnswer: '(a) 26.56 TPI, (b) 1046 TPM, (c) Resultant count = 13.33.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Fabric and Apparel · Part 1/2', spots: [
            { id: 's1', label: 'Cotton Fibre Properties Processing and End Uses', prompt: 'Which idea is this? — Cotton fibre is a natural cellulosic seed fibre obtained from the seed boll of Gossypium.', answer: 'Cotton Fibre Properties Processing and End Uses', options: ['Cotton Fibre Properties Processing and End Uses', 'Wool Fibre Properties Felting and Woollen Processing', 'Silk Fibre Types Properties and Sericulture Process', 'Yarn Construction Twist Count and Yarn Classification'] },
            { id: 's2', label: 'Wool Fibre Properties Felting and Woollen Processing', prompt: 'Which idea is this? — Wool is a natural protein fibre obtained from the fleece of sheep (primarily) and other.', answer: 'Wool Fibre Properties Felting and Woollen Processing', options: ['Wool Fibre Properties Felting and Woollen Processing', 'Cotton Fibre Properties Processing and End Uses', 'Silk Fibre Types Properties and Sericulture Process', 'Yarn Construction Twist Count and Yarn Classification'] },
            { id: 's3', label: 'Silk Fibre Types Properties and Sericulture Process', prompt: 'Which idea is this? — Silk is a natural protein filament fibre produced by the larvae of silk moths (primarily.', answer: 'Silk Fibre Types Properties and Sericulture Process', options: ['Silk Fibre Types Properties and Sericulture Process', 'Cotton Fibre Properties Processing and End Uses', 'Wool Fibre Properties Felting and Woollen Processing', 'Yarn Construction Twist Count and Yarn Classification'] },
            { id: 's4', label: 'Yarn Construction Twist Count and Yarn Classification', prompt: 'Which idea is this? — Yarn construction refers to the structural parameters that define a yarn\'s physical.', answer: 'Yarn Construction Twist Count and Yarn Classification', options: ['Yarn Construction Twist Count and Yarn Classification', 'Cotton Fibre Properties Processing and End Uses', 'Wool Fibre Properties Felting and Woollen Processing', 'Silk Fibre Types Properties and Sericulture Process'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior merchandiser is choosing between two cotton bales for a fine shirting yarn: both show 28 mm mean length, but bale B is cheaper. The lab sheet shows B\'s length-uniformity index is 72% against A\'s 84%.',
            decisions: [{ prompt: 'What does the fibre data say about the cheaper bale?', options: [
                { text: 'Reject B for this yarn — identical mean length hides B\'s heavy share of short fibres that slip drafting control, causing thick-thin places, fibre fly and ends-down; spinning performance runs on length distribution, not the average.', outcome: 'The chapter\'s trap is exactly this: quoting the 28 mm average while missing uniformity — the short-fibre fraction is what degrades evenness and productivity.' },
                { text: 'Buy B — same staple length at lower cost is pure margin.', outcome: 'Same mean, different distribution: the savings get spent on breakages, uneven yarn and rework — the lab numbers already priced the difference, the merchandiser just didn\'t read it.', reveals: 'mean-length-decides' },
                { text: 'Blend both bales to average out the risk.', outcome: 'Blending dilutes but doesn\'t remove short fibres — they still float in the drafting zone; mixing keeps the failure mode alive at half strength instead of removing it.', reveals: 'blending-fixes-short-fibre' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now choose a fibre like an engineer — properties first, marketing last.',
            decisions: [{ prompt: 'What comes next? Fabric and Apparel · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fabric and Apparel · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_001', difficulty: 'standard',
          question: 'Textile fibres are the fundamental units of fabric, classified by origin into.',
          hint: 'If the student cannot recall basic fibre names and properties, review the "Fibre.',
          misconception: 'Students often believe that "natural fibres are always more comfortable and synthetic fibres are always more durable.".',
          parts: [
                { id: 'a', prompt: 'You are selecting a fibre for a mountaineering base layer that must: (a) wick moisture away from skin, (b) retain warmth when wet, (c) resist odour from.', answer: 'Wool: (a) Excellent moisture wicking due to hygroscopic scales',
                  options: ['Wool: (a) Excellent moisture wicking due to hygroscopic scales', 'it dries fast', 'regenerated', 'synthetic'],
                  hint: 'If the student cannot recall basic fibre names and properties, review the "Fibre Properties.',
                  misconception: 'Students often believe that "natural fibres are always more comfortable and synthetic fibres are always more durable." This leads them.' }
          ],
            remediations: { 'natural-fibres-are-always-more': { steps: ['If the student cannot correctly classify fibres or match properties to end-uses: (1) Revisit Class 11 nodes.', '(2) Create a two-column table: Fibre Property (e.g., moisture regain) → Apparel Function (e.g., coolness in summer).', 'Fill it for 5 fibres using NCERT textbook tables.', '(3) Re-attempt Diagnostic Questions 3 and 4 — they directly test property-to-function mapping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "natural fibres are always more comfortable and synthetic fibres are always more durable.".',
          parts: [
                { id: 'a', prompt: 'Create a decision flowchart (text-based) that a textile designer can use to select the optimal fibre for a new apparel product.', answer: 'Example flowchart: 1',
                  options: ['Example flowchart: 1', 'regenerated', 'synthetic'],
                  hint: 'If the student cannot recall basic fibre names and properties, review the "Fibre Properties.',
                  misconception: 'Students often believe that "natural fibres are always more comfortable and synthetic fibres are always more durable." This leads them.' }
          ],
            remediations: { 'natural-fibres-are-always-more': { steps: ['If the student cannot correctly classify fibres or match properties to end-uses: (1) Revisit Class 11 nodes.', '(2) Create a two-column table: Fibre Property (e.g., moisture regain) → Apparel Function (e.g., coolness in summer).', 'Fill it for 5 fibres using NCERT textbook tables.', '(3) Re-attempt Diagnostic Questions 3 and 4 — they directly test property-to-function mapping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_002', difficulty: 'standard',
          question: 'Cotton fibre is a natural cellulosic seed fibre obtained from the seed boll.',
          hint: 'If fibre property terms are unclear, revisit c11_hs_cbse_05_005 (cotton fibre structure).',
          misconception: 'Students believe "longer staple cotton is always better for all yarn counts." They select Suvin (38 mm) for 30s.',
          parts: [
                { id: 'a', prompt: 'Two cotton samples have identical 28 mm mean length but different length uniformity indices: Sample A = 84%, Sample B = 72%.', answer: 'Sample A\'s higher uniformity index means fewer short fibres (<12.7 mm)',
                  options: ['Sample A\'s higher uniformity index means fewer short fibres (<12.7 mm)', 'mean length', 'longer staple cotton is always better for all yarn counts', '"longer staple cotton is always better for all yarn counts'],
                  hint: 'If fibre property terms are unclear, revisit c11_hs_cbse_05_005 (cotton fibre structure) and.',
                  misconception: 'Students believe "longer staple cotton is always better for all yarn counts." They select Suvin (38 mm) for 30s Ne yarn, not realizing.' },
                { id: 'b', prompt: 'A spinning mill processes cotton with 3.8 Micronaire, 29 g/tex tenacity, and 80% maturity. They target 40s Ne carded yarn for knitting.', answer: 'Step 1: Identify given',
                  options: ['Step 1: Identify given', 'high tenacity = good CSP', 'longer staple cotton is always better for all yarn counts', '"longer staple cotton is always better for all yarn counts'],
                  hint: 'If fibre property terms are unclear, revisit c11_hs_cbse_05_005 (cotton fibre structure) and.',
                  misconception: 'Students believe "longer staple cotton is always better for all yarn counts." They select Suvin (38 mm) for 30s Ne yarn, not realizing.' }
          ],
            remediations: { 'longer-staple-cotton-is-always': { steps: ['If the student cannot link fibre properties to process settings: (1) Revisit c11_hs_cbse_05_005 (cotton fibre.', '(2) Draw the drafting zone with fibre beard, label fibre length vs roller distance, and simulate what happens when.', '(3) Re-attempt Diagnostic Q2 and Q5 with this visual model.', '(4) If still stuck, review c11_bio_cbse_06_003 (xylem/phloem — analogize plant cell elongation to fibre length.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_003', difficulty: 'standard',
          question: 'Wool is a natural protein fibre obtained from the fleece of sheep (primarily).',
          hint: 'Revisit c11_hs_cbse_05_006 "Natural Protein Fibres: Wool and Silk Processing and.',
          misconception: 'Students frequently believe: "All wool felts equally, and felting is simply fibres sticking together like glue." This.',
          parts: [
                { id: 'a', prompt: 'State the three main morphological components of a wool fibre and name the primary chemical constituent of each.', answer: 'Correct answer: (1) Cuticle',
                  options: ['Correct answer: (1) Cuticle', 'epidermis, dermis, medulla', 'cellulose, lignin, pectin', 'This leads to three specific errors in board answers: (1) Writing'],
                  hint: 'Revisit c11_hs_cbse_05_006 "Natural Protein Fibres: Wool and Silk Processing and Properties".',
                  misconception: 'Students frequently believe: "All wool felts equally, and felting is simply fibres sticking together like glue." This leads to three.' },
                { id: 'b', prompt: 'Explain in your own words why wool felts when subjected to heat, moisture, and agitation, but a smooth synthetic fibre like polyester does not.', answer: 'Correct answer: Wool felts',
                  options: ['Correct answer: Wool felts', 'wool is protein and polyester is synthetic', 'wool has scales but not explaining directional friction', 'felting is due to hydrogen bonding alone'],
                  hint: 'Revisit c11_hs_cbse_05_006 "Natural Protein Fibres: Wool and Silk Processing and Properties".',
                  misconception: 'Students frequently believe: "All wool felts equally, and felting is simply fibres sticking together like glue." This leads to three.' },
                { id: 'c', prompt: 'A wool sample has the following specifications: mean fibre diameter 21 µm, staple length 75 mm, crimp frequency 4 crimps/cm, clean yield 65%.', answer: 'Correct answer: Suitable for **worsted processing**',
                  options: ['Correct answer: Suitable for **worsted processing**', 'woollen', 'wool is for woollen', 'This leads to three specific errors in board answers: (1) Writing'],
                  hint: 'Revisit c11_hs_cbse_05_006 "Natural Protein Fibres: Wool and Silk Processing and Properties".',
                  misconception: 'Students frequently believe: "All wool felts equally, and felting is simply fibres sticking together like glue." This leads to three.' }
          ],
            remediations: { 'students-frequently-believe-all-wool': { steps: ['If a student exhibits the above misconception: (1) Have them examine wool and hair fibres under a microscope (or.', '(2) Conduct the "root-tip migration" demo (Diagnostic Q6) — the visual asymmetry is irrefutable.', '(3) Give two fabric swatches: woollen flannel and worsted gabardine; subject both to a standard felting test (AATCC 133.', 'Student records: woollen shrinks 30-40%, worsted shrinks 15-20% — both felt, but woollen more due to structure, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_004', difficulty: 'standard',
          question: 'Silk is a natural protein filament fibre produced by the larvae of silk moths.',
          hint: 'Revisit c12_hs_cbse_04_001 "Textile Fibres: Classification and Properties" — specifically.',
          misconception: 'Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk types\'.',
          parts: [
                { id: 'a', prompt: 'Name the four commercially exploited silk varieties in India and the specific host plant for each.', answer: 'Correct: (1) Mulberry',
                  options: ['Correct: (1) Mulberry', 'silk cotton', 'spider silk', 'Eri silk is a filament silk like mulberry'],
                  hint: 'Revisit c12_hs_cbse_04_001 "Textile Fibres: Classification and Properties" — specifically the.',
                  misconception: 'Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk types\'.' },
                { id: 'b', prompt: 'Explain why mulberry silk filament is finer and more uniform than Tasar silk, linking silkworm feeding behaviour and gland physiology.', answer: '*Bombyx mori* (mulberry) is monophagous and domesticated',
                  options: ['*Bombyx mori* (mulberry) is monophagous and domesticated', 'wild vs domestic', 'Eri silk is a filament silk like mulberry', '"Eri silk is a filament silk like mulberry"'],
                  hint: 'Revisit c12_hs_cbse_04_001 "Textile Fibres: Classification and Properties" — specifically the.',
                  misconception: 'Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk types\'.' },
                { id: 'c', prompt: 'A sericulturist harvests 100 kg of green mulberry cocoons. If the shell ratio is 22 % and the renditta is 8.5, calculate the expected raw silk yield in kg.', answer: 'Step 1: Shell weight = 100 kg × 0.22 = 22 kg cocoon shells',
                  options: ['Step 1: Shell weight = 100 kg × 0.22 = 22 kg cocoon shells', 'Eri silk is a filament silk like mulberry', '"Eri silk is a filament silk like mulberry"'],
                  hint: 'Revisit c12_hs_cbse_04_001 "Textile Fibres: Classification and Properties" — specifically the.',
                  misconception: 'Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk types\'.' },
                { id: 'd', prompt: 'Compare the degumming loss percentage and tensile strength retention after degumming for Mulberry vs.', answer: 'Mulberry: sericin ~25–30 %',
                  options: ['Mulberry: sericin ~25–30 %', 'Eri is weaker because it has less sericin', 'Eri silk is a filament silk like mulberry', '"Eri silk is a filament silk like mulberry"'],
                  hint: 'Revisit c12_hs_cbse_04_001 "Textile Fibres: Classification and Properties" — specifically the.',
                  misconception: 'Students believe "Eri silk is a filament silk like mulberry" because textbooks list it under \'silk types\'.' }
          ],
            remediations: { 'eri-silk-is-a-filament': { steps: ['If the student conflates Eri with filament silks: (1) Show side-by-side cocoon photos — mulberry (closed, continuous).', '(2) Have them pull a thread from each cocoon type; mulberry unreels 800–1000 m, Eri breaks at 10–15 cm.', '(3) Revisit the definition: "Filament silk = continuous mono-filament from closed cocoon; Spun silk = staple from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_005', difficulty: 'standard',
          question: 'Manufactured fibres are fibres produced entirely by humans through chemical.',
          hint: 'Revisit Class 11 Biology Chapter 9 (Biomolecules) for polysaccharide/protein structure.',
          misconception: 'Students often think "regenerated fibres are natural fibres" because they originate from cellulose or protein.',
          parts: [
                { id: 'a', prompt: 'Compare the heat-setting behaviour of nylon 6,6 and acrylic fibres. Why is heat-setting critical for synthetic fibres but not for regenerated fibres like rayon?', answer: 'Nylon 6,6 and acrylic are thermoplastic',
                  options: ['Nylon 6,6 and acrylic are thermoplastic', 'regenerated fibres are natural fibres', '"regenerated fibres are natural fibres"'],
                  hint: 'Revisit Class 11 Biology Chapter 9 (Biomolecules) for polysaccharide/protein structure, and Class.',
                  misconception: 'Students often think "regenerated fibres are natural fibres" because they originate from cellulose or protein.' }
          ],
            remediations: { 'regenerated-fibres-are-natural-fibres': { steps: ['If a student confuses regenerated with natural fibres, have them: (1) Revisit c11_hs_cbse_05_004 (Classification.', '(2) Perform a burning test on cotton vs viscose rayon side-by-side; note both smell like paper but rayon leaves less.', '(3) Draw the polymer repeat unit of cellulose and viscose rayon — highlight the reduced degree of polymerization and.', '(4) Re-attempt Diagnostic Question 2 with the structural diagram in front of them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_006', difficulty: 'standard',
          question: 'Yarn construction refers to the structural parameters that define a yarn\'s.',
          hint: 'Revisit c11_hs_cbse_05_008 (Yarn Processing) and c11_hs_cbse_05_003 (Fibre Properties).',
          misconception: 'Students often believe that **higher count always means finer yarn** — this is true only in indirect systems (Ne, Nm).',
          parts: [
                { id: 'a', prompt: 'Define "twist multiplier" and state its unit in the indirect system. Why is it preferred over "turns per inch" for comparing yarns of different counts?', answer: 'Twist multiplier (TM) = Twist per inch (TPI) × √Count (Ne)',
                  options: ['Twist multiplier (TM) = Twist per inch (TPI) × √Count (Ne)', 'TM is just TPI', '**higher count always means finer yarn**'],
                  hint: 'Revisit c11_hs_cbse_05_008 (Yarn Processing) and c11_hs_cbse_05_003 (Fibre Properties) to clarify.',
                  misconception: 'Students often believe that **higher count always means finer yarn** — this is true only in indirect systems (Ne, Nm).' },
                { id: 'b', prompt: 'A yarn has a count of 40 Ne. If the twist multiplier is 4.5, calculate the turns per inch (TPI).', answer: 'For single yarn: TPI = TM × √Ne = 4.5 × √40 = 4.5 × 6.3249 ≈ 28.46 TPI',
                  options: ['For single yarn: TPI = TM × √Ne = 4.5 × √40 = 4.5 × 6.3249 ≈ 28.46 TPI', '**higher count always means finer yarn**'],
                  hint: 'Revisit c11_hs_cbse_05_008 (Yarn Processing) and c11_hs_cbse_05_003 (Fibre Properties) to clarify.',
                  misconception: 'Students often believe that **higher count always means finer yarn** — this is true only in indirect systems (Ne, Nm).' },
                { id: 'c', prompt: 'Convert a yarn count of 30 Tex to English Cotton Count (Ne) and Denier. Show all steps and state the formulas used.', answer: 'Given: Tex = 30 g/km',
                  options: ['Given: Tex = 30 g/km', '**higher count always means finer yarn**'],
                  hint: 'Revisit c11_hs_cbse_05_008 (Yarn Processing) and c11_hs_cbse_05_003 (Fibre Properties) to clarify.',
                  misconception: 'Students often believe that **higher count always means finer yarn** — this is true only in indirect systems (Ne, Nm).' },
                { id: 'd', prompt: 'Compare a single yarn of 30 Ne with a 2-ply yarn of 30 Ne (i.e., each component is 60 Ne).', answer: 'higher strength, (',
                  options: ['higher strength, (', '**higher count always means finer yarn**'],
                  hint: 'Revisit c11_hs_cbse_05_008 (Yarn Processing) and c11_hs_cbse_05_003 (Fibre Properties) to clarify.',
                  misconception: 'Students often believe that **higher count always means finer yarn** — this is true only in indirect systems (Ne, Nm).' }
          ],
            remediations: { 'higher-count-always-means-finer': { steps: ['Revisit c11_hs_cbse_05_008 (Yarn Processing) to recall how spinning determines count and twist.', 'Draw a table comparing direct vs indirect systems with definitions, units, and conversion constants (590.5, 9).', 'Practice 5 conversion problems: Tex → Ne, Denier → Tex, Ne → Nm, etc.', 'For resultant count, physically simulate plying: take two 20 Ne yarns, twist together, measure resultant count on.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
