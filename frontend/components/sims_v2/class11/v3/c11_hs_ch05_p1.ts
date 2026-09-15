import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch05_p1: SimDef = {
    id: 'v3_c11_hs_ch05_p1',
    title: 'Fabric and Apparel · Part 1/2',
    subtitle: 'Unpick a fabric claim layer by layer — fibre to finish.',
    classLevel: 11, subject: 'home_science', topic: 'Fabric and Apparel · Part 1/2',
    chapters: ['c11_hs_ch05'],
    nodeIds: ['c11_hs_cbse_05_001', 'c11_hs_cbse_05_002', 'c11_hs_cbse_05_003', 'c11_hs_cbse_05_004', 'c11_hs_cbse_05_005', 'c11_hs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a textile tester with a magnifier and a match', intro: 'A cotton kurta wrinkles and shrinks while a polyester saree survives three washes untouched — the fibre hierarchy explains why.', goal: 'Trace how fibre, yarn, weave and finish jointly determine fabric behaviour.' },
    discovery: {
        question: '\'100% polyester — cool and comfortable for Indian summers because it wicks moisture.\' Sound science?',
        options: ['No — polyester\'s moisture regain is ~0.4%; it can\'t absorb sweat, so skin stays clammy whatever the capillary marketing claims', 'Yes — wicking equals comfort', 'Yes — synthetics always beat naturals', 'No — polyester melts in heat'],
        answer: 'No — polyester\'s moisture regain is ~0.4%; it can\'t absorb sweat, so skin stays clammy whatever the capillary marketing claims',
        hook: 'Fibre alone doesn\'t decide behaviour — a loose cotton voile shrinks more than tight cotton denim; yarn, weave and finish rewrite the fibre\'s script.',
    },
    teaching: [
        { title: 'Fabrics in Daily Life: Significance and Fibre-to-Fabric Hierarchy', text: 'Fabrics in Daily Life refers to the study of textile materials as essential human ecology components, encompassing the hierarchical transformation from microscopic fibres (natural or manufactured).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a visual-plus-burn test to sort an unknown fabric into cellulosic, protein or synthetic, then spec a school-uniform blend for humidity.',
        labels: ['Fabrics in Daily Life', 'Factors Affecting Fabric Behaviour', 'Fibre Properties Essential', 'Classification of Textile Fibres', 'Natural Cellulosic Fibres: Cotton,', 'Natural Protein Fibres: Wool'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_002', title: 'Factors Affecting Fabric Behaviour in Use and Care',
          caseStudy: { intro: 'Imagine you buy a crisp cotton kurta and a soft polyester blend saree.',
            decisions: [{ prompt: 'A student claims that "100% cotton fabric always shrinks more than 100% polyester fabric." Is this statement universally true?', options: [
                { text: 'No, the statement is not universally true', outcome: 'No, the statement is not universally true. Shrinkage depends on fabric construction (weave/knit.' },
                { text: 'cotton breathes, polyester doesn\'t', outcome: 'Not quite — Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton.', reveals: 'fabric-behaviour-is-determined-primarily' },
                { text: 'fabric behaviour is determined primarily by fibre content alone (e', outcome: 'Not quite — Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton.', reveals: 'fabric-behaviour-is-determined-primarily' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_003', title: 'Fibre Properties Essential for Spinnability and Consumer Satisfaction',
          caseStudy: { intro: 'Imagine you are designing a school uniform for a North Indian summer: it must survive daily washing, stay cool, resist fading, and look crisp after hours.',
            decisions: [{ prompt: 'List the four fibre properties that collectively determine spinnability, and state the minimum requirement for each property that allows.', options: [
                { text: 'The four properties are: (1) Fibre length – must exceed the critical fibre length', outcome: 'The four properties are: (1) Fibre length – must exceed the critical fibre length (typically >12.' },
                { text: 'surface friction', outcome: 'Not quite — Students often believe "spinnability properties and consumer-satisfaction properties are the same.', reveals: 'spinnability-properties-and-consumer-satisfactio' },
                { text: 'flexibility', outcome: 'Not quite — Students often believe "spinnability properties and consumer-satisfaction properties are the same.', reveals: 'spinnability-properties-and-consumer-satisfactio' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_004', title: 'Classification of Textile Fibres: Natural and Manufactured',
          caseStudy: { intro: 'Imagine you\'re shopping for a summer kurta and see labels saying "100% cotton," "cotton-polyester blend," and "viscose rayon." You wonder: which will keep you.',
            decisions: [{ prompt: 'State the two primary criteria used in the NCERT classification hierarchy for textile fibres, and give one example of a fibre that fits.', options: [
                { text: 'The two primary criteria are: (1) Origin - Natural vs Manufactured', outcome: 'The two primary criteria are: (1) Origin - Natural vs Manufactured; (2) Chemical composition.' },
                { text: 'staple vs filament', outcome: 'Not quite — Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather.', reveals: 'natural-good' },
                { text: 'natural = good, synthetic = bad', outcome: 'Not quite — Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather.', reveals: 'natural-good' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_005', title: 'Natural Cellulosic Fibres: Cotton, Linen, Jute and Hemp',
          caseStudy: { intro: 'Imagine you are shopping for summer curtains and see three fabrics labelled "100% Cotton," "100% Linen," and "Jute blend" — all claim to be "natural and.',
            decisions: [{ prompt: 'A student claims: "Cotton and linen are both cellulosic fibres from plants, so they should behave identically in dyeing and moisture.', options: [
                { text: 'Correct answer: Linen has lower dye affinity than cotton despite similar moisture', outcome: 'Correct answer: Linen has lower dye affinity than cotton despite similar moisture absorbency.' },
                { text: 'linen absorbs less moisture', outcome: 'Not quite — Students often believe "bast fibre" means the fibre comes from the bark of the plant.', reveals: 'bast-fibre-means-the-fibre' },
                { text: 'bast fibre', outcome: 'Not quite — Students often believe "bast fibre" means the fibre comes from the bark of the plant.', reveals: 'bast-fibre-means-the-fibre' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_006', title: 'Natural Protein Fibres: Wool and Silk Processing and Properties',
          caseStudy: { intro: 'Imagine you are selecting fabric for a winter trek in the Himalayas versus a summer wedding in Rajasthan.',
            decisions: [{ prompt: 'State the primary protein constituent of wool and silk respectively, and name the gland in the silkworm that secretes the silk filament.', options: [
                { text: 'Wool is primarily keratin', outcome: 'Wool is primarily keratin; silk is primarily fibroin. The silk filament is secreted by the salivary.' },
                { text: 'collagen for wool', outcome: 'Not quite — Students often believe "wool and silk are both protein fibres, so they behave identically.', reveals: 'wool-and-silk-are-both' },
                { text: 'spider gland for silk', outcome: 'Not quite — Students often believe "wool and silk are both protein fibres, so they behave identically.', reveals: 'wool-and-silk-are-both' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Fabric and Apparel · Part 1/2', spots: [
            { id: 's1', label: 'Factors Affecting Fabric Behaviour in Use and Care', prompt: 'Which idea is this? — Fabric behaviour in use and care refers to the collective response of a textile material.', answer: 'Factors Affecting Fabric Behaviour in Use and Care', options: ['Factors Affecting Fabric Behaviour in Use and Care', 'Classification of Textile Fibres Natural and Manufactured', 'Natural Cellulosic Fibres Cotton Linen Jute and Hemp'] },
            { id: 's2', label: 'Classification of Textile Fibres Natural and Manufactured', prompt: 'Which idea is this? — Textile fibres are classified based on their origin into natural fibres (obtained from.', answer: 'Classification of Textile Fibres Natural and Manufactured', options: ['Classification of Textile Fibres Natural and Manufactured', 'Factors Affecting Fabric Behaviour in Use and Care', 'Natural Cellulosic Fibres Cotton Linen Jute and Hemp'] },
            { id: 's3', label: 'Natural Cellulosic Fibres Cotton Linen Jute and Hemp', prompt: 'Which idea is this? — Natural cellulosic fibres are plant-derived fibres composed primarily of cellulose.', answer: 'Natural Cellulosic Fibres Cotton Linen Jute and Hemp', options: ['Natural Cellulosic Fibres Cotton Linen Jute and Hemp', 'Factors Affecting Fabric Behaviour in Use and Care', 'Classification of Textile Fibres Natural and Manufactured'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a textile stall for the school exhibition, a student explains a polycotton shirt: \'Blending means they weave polyester threads and cotton threads together — like mixing two colours of paint. And since it\'s cotton-rich, it\'ll shrink and wrinkle like pure cotton.\'',
            decisions: [{ prompt: 'What does she get wrong about how fabrics are built?', options: [
                { text: 'Correct the level and the logic: blending is intimate mixing of staple fibres BEFORE spinning into yarn — that\'s why a 65/35 blend is uniform throughout, unlike a union fabric (polyester warp, cotton weft) which shows different face and back. And fibre alone doesn\'t decide behaviour: yarn twist, weave tightness and finish matter — a loose cotton voile shrinks more than tight cotton denim though both are 100% cotton.', outcome: 'She now reads the hierarchy: fibre properties → yarn possibilities → fabric construction → finish — each level modifying what the previous one promised.' },
                { text: 'Accept the paint-mixing model — blending happens when the two yarns meet in the loom.', outcome: 'Mixing at weaving gives a union fabric with two distinct faces; true blending happens at fibre stage, which is why blend properties are uniform.', reveals: 'blending-happens-at-fabric-stage' },
                { text: 'Agree on the shrinkage call — cotton content means cotton behaviour, full stop.', outcome: 'Fibre sets the potential, structure decides the outcome: weave density, twist and finishes can invert the fibre\'s typical behaviour.', reveals: 'fibre-content-decides-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Fibre → yarn → fabric → finish: every level up the hierarchy can overrule the level below — that chain is the whole subject.',
            decisions: [{ prompt: 'What comes next? Fabric and Apparel · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fabric and Apparel · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_001', difficulty: 'standard',
          question: 'Fabrics in Daily Life refers to the study of textile materials as essential.',
          hint: 'Revisit c9_bio_ch4_7 (Hierarchy of Classification) and practice mapping textile terms.',
          misconception: 'Students believe \'blended fabric\' means fibres are mixed at the fabric stage (like mixing paint colours) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fabrics in Daily Life refers to the study of textile materials as essential human ecology',
                  options: ['Fabrics in Daily Life refers to the study of textile materials as essential human ecology', 'Fabric behaviour in use and care refers to the collective response of a textile material', 'Fibre properties for spinnability refer to the intrinsic characteristics—specifically', 'Textile fibres are classified based on their origin into natural fibres (obtained from'],
                  hint: 'Revisit c9_bio_ch4_7 (Hierarchy of Classification) and practice mapping textile terms to taxonomic.',
                  misconception: 'Students believe \'blended fabric\' means fibres are mixed at the fabric stage (like mixing paint colours) rather than at the yarn stage.' }
          ],
            remediations: { 'blended-fabric-means-fibres-are': { steps: ['Show a cross-section diagram of blended yarn vs union fabric under microscope — blended shows alternating fibres.', 'Give students two fibre tufts (cotton + polyester) and ask them to hand-blend vs make separate yarns then weave — they.', 'Connect to \'terecot\' label on garments — explain it means intimate blend at sliver stage, not fabric-stage lamination.', 'Assign a comparison table: Blended Yarn vs Union Fabric vs Laminate — properties, cost, end-uses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_002', difficulty: 'standard',
          question: 'Fabric behaviour in use and care refers to the collective response of a textile.',
          hint: 'Revisit c11_hs_cbse_05_003 (fibre properties) and c11_hs_cbse_05_010 (finishing types).',
          misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester.',
          parts: [
                { id: 'a', prompt: 'A student claims that "100% cotton fabric always shrinks more than 100% polyester fabric." Is this statement universally true?', answer: 'No, the statement is not universally true',
                  options: ['No, the statement is not universally true', 'cotton breathes, polyester doesn\'t', 'fabric behaviour is determined primarily by fibre content alone (e'],
                  hint: 'Revisit c11_hs_cbse_05_003 (fibre properties) and c11_hs_cbse_05_010 (finishing types).',
                  misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester doesn\'t") and treat.' },
                { id: 'b', prompt: 'Two fabrics — Fabric A (cotton, plain weave, 20s yarn, no finish) and Fabric B (cotton, twill weave, 40s yarn, sanforised finish) — are washed identically.', answer: 'Fabric A will show greater dimensional change',
                  options: ['Fabric A will show greater dimensional change', 'both are cotton', 'cotton breathes, polyester doesn\'t', 'fabric behaviour is determined primarily by fibre content alone (e'],
                  hint: 'Revisit c11_hs_cbse_05_003 (fibre properties) and c11_hs_cbse_05_010 (finishing types).',
                  misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester doesn\'t") and treat.' },
                { id: 'c', prompt: 'A care label reads: "Machine wash 40°C, do not bleach, tumble dry low, iron medium." The fabric is a wool-acrylic blend (50/50) knit.', answer: '"Do not bleach" is most critical',
                  options: ['"Do not bleach" is most critical', 'tumble dry low', 'cotton breathes, polyester doesn\'t', 'fabric behaviour is determined primarily by fibre content alone (e'],
                  hint: 'Revisit c11_hs_cbse_05_003 (fibre properties) and c11_hs_cbse_05_010 (finishing types).',
                  misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester doesn\'t") and treat.' }
          ],
            remediations: { 'fabric-behaviour-is-determined-primarily': { steps: ['If the student attributes behaviour only to fibre: 1) Give them two 100% cotton samples — one sanforised denim, one.', 'This forces multi-factor analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester.',
          parts: [
                { id: 'a', prompt: 'A manufacturer claims their "100% polyester fabric is cool and comfortable for Indian summers because polyester wicks moisture." Evaluate this claim using.', answer: 'The claim is misleading',
                  options: ['The claim is misleading', 'wicking = comfort', 'cotton breathes, polyester doesn\'t', 'fabric behaviour is determined primarily by fibre content alone (e'],
                  hint: 'Revisit c11_hs_cbse_05_003 (fibre properties) and c11_hs_cbse_05_010 (finishing types).',
                  misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester doesn\'t") and treat.' },
                { id: 'b', prompt: 'Design a fabric specification (fibre, yarn, structure, finish) for a hospital bedsheet that must withstand: industrial laundering at 90°C with chlorine bleach.', answer: 'Specification: Fibre',
                  options: ['Specification: Fibre', 'cotton breathes, polyester doesn\'t', 'fabric behaviour is determined primarily by fibre content alone (e'],
                  hint: 'Revisit c11_hs_cbse_05_003 (fibre properties) and c11_hs_cbse_05_010 (finishing types).',
                  misconception: 'Students believe fabric behaviour is determined primarily by fibre content alone (e.g., "cotton breathes, polyester doesn\'t") and treat.' }
          ],
            remediations: { 'fabric-behaviour-is-determined-primarily': { steps: ['If the student attributes behaviour only to fibre: 1) Give them two 100% cotton samples — one sanforised denim, one.', 'This forces multi-factor analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_003', difficulty: 'standard',
          question: 'Fibre properties for spinnability refer to the intrinsic.',
          hint: 'Revisit c11_hs_cbse_05_002 "Factors Affecting Fabric Behaviour in Use and Care" and.',
          misconception: 'Students often believe "spinnability properties and consumer-satisfaction properties are the same set of properties".',
          parts: [
                { id: 'a', prompt: 'You are given two unknown fibres, Fibre X and Fibre Y. Fibre X: length 35 mm, tenacity 3.5 g/denier, moisture regain 8.5%, elastic recovery 65% at 2% strain.', answer: 'Fibre X (cotton-like) is better for summer comfort',
                  options: ['Fibre X (cotton-like) is better for summer comfort', 'higher strength and elastic recovery mean better durability'],
                  hint: 'Revisit c11_hs_cbse_05_002 "Factors Affecting Fabric Behaviour in Use and Care" and identify which.',
                  misconception: 'Students often believe "spinnability properties and consumer-satisfaction properties are the same set of properties" or that "a fibre good.' }
          ],
            remediations: { 'spinnability-properties-and-consumer-satisfactio': { steps: ['Ask the student to physically handle two yarns—one cotton, one polyester—and describe the difference in twist.', 'Have them pull a single fibre from each yarn and test its bending resistance by looping it over a fingertip; cotton.', 'Connect the tactile experience to the definitions: "The cotton fibre\'s convolutions (surface structure) gripped its.', 'Give a 3-row table: Column A = Spinnability Property, Column B = Consumer Property, Column C = Example Fibre Where They.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_004', difficulty: 'standard',
          question: 'Textile fibres are classified based on their origin into natural fibres.',
          hint: 'Revisit node 001 (Fabrics in Daily Life) for fibre-yarn-fabric relationship and node 003.',
          misconception: 'Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather than scientific.',
          parts: [
                { id: 'a', prompt: 'State the two primary criteria used in the NCERT classification hierarchy for textile fibres, and give one example of a fibre that fits each criterion at the.', answer: 'The two primary criteria are: (1) Origin - Natural vs Manufactured',
                  options: ['The two primary criteria are: (1) Origin - Natural vs Manufactured', 'staple vs filament', 'natural = good, synthetic = bad'],
                  hint: 'Revisit node 001 (Fabrics in Daily Life) for fibre-yarn-fabric relationship and node 003 (Fibre.',
                  misconception: 'Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather than scientific criteria.' },
                { id: 'b', prompt: 'A student says: "Rayon is a natural fibre because it\'s made from wood pulp, which comes from trees." Explain why this reasoning is incorrect using the.', answer: 'Rayon is classified as a manufactured (regenerated cellulosic) fibre',
                  options: ['Rayon is classified as a manufactured (regenerated cellulosic) fibre', 'made by modifying a non-fibrous material into a fibrous form', 'natural = good, synthetic = bad'],
                  hint: 'Revisit node 001 (Fabrics in Daily Life) for fibre-yarn-fabric relationship and node 003 (Fibre.',
                  misconception: 'Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather than scientific criteria.' },
                { id: 'c', prompt: 'You are given four unknown fibres: Fibre A (staple, burns like paper, light grey ash), Fibre B (filament, shrinks from flame, melts, hard tan bead), Fibre.', answer: 'Fibre A: Natural cellulosic (cotton/linen) - burns like paper, light ash',
                  options: ['Fibre A: Natural cellulosic (cotton/linen) - burns like paper, light ash', 'natural = good, synthetic = bad'],
                  hint: 'Revisit node 001 (Fabrics in Daily Life) for fibre-yarn-fabric relationship and node 003 (Fibre.',
                  misconception: 'Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather than scientific criteria.' },
                { id: 'd', prompt: 'Compare and contrast the classification positions of these three fibres: Acetate, Azlon, and Spandex.', answer: 'Acetate = Modified cellulosic (cellulose chemically acetylated, not regenerated)',
                  options: ['Acetate = Modified cellulosic (cellulose chemically acetylated, not regenerated)', 'natural = good, synthetic = bad'],
                  hint: 'Revisit node 001 (Fabrics in Daily Life) for fibre-yarn-fabric relationship and node 003 (Fibre.',
                  misconception: 'Students believe "natural = good, synthetic = bad" and classify fibres by perceived quality rather than scientific criteria.' }
          ],
            remediations: { 'natural-good': { steps: ['Have the student trace the life history of three fibres: cotton (grows on seed → ginned → spun), rayon (wood pulp →.', 'Ask: "At what point does the material become a fibre?" For cotton, it\'s already a fibre on the plant.', 'Create a decision flowchart: "Does this fibre exist in nature in fibrous form? YES → Natural.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_005', difficulty: 'standard',
          question: 'Natural cellulosic fibres are plant-derived fibres composed primarily.',
          hint: 'Revisit Class 9 Biology Chapter 2 (Plant Tissues) — specifically sclerenchyma fibre.',
          misconception: 'Students often believe "bast fibre" means the fibre comes from the bark of the plant.',
          parts: [
                { id: 'a', prompt: 'A fabric sample burns with a steady flame, smells like burning paper, leaves a light grey feathery ash that retains the fabric\'s shape, and continues to glow.', answer: 'Correct answer: Cotton',
                  options: ['Correct answer: Cotton', 'ignores the length mismatch', 'bast fibre', '"bast fibre" means the fibre comes from the bark of the plant'],
                  hint: 'Revisit Class 9 Biology Chapter 2 (Plant Tissues) — specifically sclerenchyma fibre structure and.',
                  misconception: 'Students often believe "bast fibre" means the fibre comes from the bark of the plant.' }
          ],
            remediations: { 'bast-fibre-means-the-fibre': { steps: ['Have the student examine cross-section diagrams of flax, jute, and hemp stems (from NCERT Biology Class 9/10 plant.', 'Conduct a guided comparison: soak 2 cm strips of cotton, linen, jute in water for 5 minutes; observe which wetted.', 'Use a flowchart template with three decision nodes (burn → feel → water drop) and have the student fill in observations.', 'Assign a 100-word explanation: "Why mechanical ginning works for cotton but not for flax," requiring the terms.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_006', difficulty: 'standard',
          question: 'Natural protein fibres are textile fibres derived from animal sources, composed.',
          hint: 'Revisit c11_hs_cbse_05_004 (Classification of Textile Fibres) and c11_hs_cbse_05_003.',
          misconception: 'Students often believe "wool and silk are both protein fibres, so they behave identically in dyeing, washing, and.',
          parts: [
                { id: 'a', prompt: 'State the primary protein constituent of wool and silk respectively, and name the gland in the silkworm that secretes the silk filament.', answer: 'Wool is primarily keratin',
                  options: ['Wool is primarily keratin', 'collagen for wool', 'spider gland for silk'],
                  hint: 'Revisit c11_hs_cbse_05_004 (Classification of Textile Fibres) and c11_hs_cbse_05_003 (Fibre.',
                  misconception: 'Students often believe "wool and silk are both protein fibres, so they behave identically in dyeing, washing, and burning." This leads.' }
          ],
            remediations: { 'wool-and-silk-are-both': { steps: ['Have the student create a two-column table: "Keratin (Wool)" vs.', '"Fibroin (Silk)" with rows for: Amino acid composition, Secondary structure, Surface morphology, Disulfide bonds.', 'Using the NCERT burning test table, ask them to highlight identical vs.', 'different entries for wool and silk.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
