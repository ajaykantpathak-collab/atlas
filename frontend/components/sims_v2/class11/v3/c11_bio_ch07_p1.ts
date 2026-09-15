import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch07_p1: SimDef = {
    id: 'v3_c11_bio_ch07_p1',
    title: 'Structural Organisation in Animals · Part 1/2',
    subtitle: 'Read epithelial tissue like a spec sheet — shape, layers, and junctions reveal the job.',
    classLevel: 11, subject: 'biology', topic: 'Structural Organisation in Animals · Part 1/2',
    chapters: ['c11_bio_ch07'],
    nodeIds: ['c11_bio_cbse_07_001', 'c11_bio_cbse_07_002', 'c11_bio_cbse_07_003', 'c11_bio_cbse_07_004', 'c11_bio_cbse_07_005', 'c11_bio_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a histologist diagnosing why a patient\'s gut lining has gone leaky', intro: 'A genetic defect just broke the tight-junction protein claudin in a patient\'s intestine. Predict the consequences — and learn to read epithelium properly.', goal: 'Classify epithelial types by layers and cell shape, and link apical specialisations and junctions to absorption, secretion, and protection.' },
    discovery: {
        question: 'Your small intestine absorbs nutrients frantically; your oesophagus just takes a beating from food. Both are \'epithelium\', yet one is a single layer of tall cells bristling with microvilli and the other is a stack of flat cells. What principle dictates the difference?',
        options: ['Architecture matches demand — single columnar with a brush border for absorption, stratified squamous where abrasion must be survived', 'Absorbing surfaces need thick walls, so the intestine is actually stratified', 'The oesophagus is simpler because it is an older, more primitive organ', 'Cell shape is random; only the basement membrane matters'],
        answer: 'Architecture matches demand — single columnar with a brush border for absorption, stratified squamous where abrasion must be survived',
        hook: 'Two questions — how many layers, what cell shape — decode every epithelium, because structure is always a receipt for function.',
    },
    teaching: [
        { title: 'Animal Tissues: Epithelial Tissue', text: 'Epithelial tissue is a sheet of tightly packed cells with minimal intercellular matrix, resting on a basement membrane, that covers body surfaces, lines cavities and ducts, and forms glands;.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_07_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Identify epithelia from microscope descriptions — flat single layers in alveoli, brush-bordered columnar in the gut, pseudostratified ciliated sheets in the trachea — and predict what breaks when junction proteins fail.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_001', title: 'Animal Tissues: Epithelial Tissue',
          caseStudy: { intro: 'Run your tongue along the inside of your cheek — it feels smooth, moist, and intact despite constant friction from chewing and speaking.',
            decisions: [{ prompt: 'A student examines a tissue slide and sees a single layer of flat, scale-like cells with disc-shaped nuclei.', options: [
                { text: 'Simple squamous epithelium', outcome: 'Simple squamous epithelium; found in the alveolar walls of lungs (for gas diffusion), endothelium.' },
                { text: 'stratified squamous', outcome: 'Not quite — Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top.', reveals: 'stratified-epithelium-means-cells-are' },
                { text: 'simple cuboidal', outcome: 'Not quite — Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top.', reveals: 'stratified-epithelium-means-cells-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_002', title: 'Animal Tissues: Connective Tissue',
          caseStudy: { intro: 'Observe your own body: pinch the skin on your forearm — it stretches and snaps back; feel your wrist — hard bone under the skin; notice a bruise forming after.',
            decisions: [{ prompt: 'List the three fundamental structural components present in ALL connective tissues, and name the embryonic origin of most connective tissue.', options: [
                { text: 'The three universal components are: (1) specialized cells (e.g., fibroblasts,', outcome: 'The three universal components are: (1) specialized cells (e.g., fibroblasts, chondrocytes), (2).' },
                { text: 'epithelial cells', outcome: 'Not quite — Students often believe "connective tissue = tissue that connects things" (like glue).', reveals: 'connective-tissue-tissue-that-connects' },
                { text: 'ectoderm', outcome: 'Not quite — Students often believe "connective tissue = tissue that connects things" (like glue).', reveals: 'connective-tissue-tissue-that-connects' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_003', title: 'Animal Tissues: Muscular Tissue',
          caseStudy: { intro: 'When you lift your school bag, your biceps bulge and harden — that visible change is skeletal muscle contracting.',
            decisions: [{ prompt: 'Name the three types of muscular tissue and give one location in the human body for each.', options: [
                { text: 'The three types are: (1) Skeletal muscle', outcome: 'The three types are: (1) Skeletal muscle — attached to bones (e.g., biceps brachii); (2) Smooth.' },
                { text: 'voluntary/involuntary', outcome: 'Not quite — Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments.', reveals: 'during-muscle-contraction' },
                { text: 'voluntary/involuntary" as types, or placing cardiac muscle in stomach', outcome: 'Not quite — Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments.', reveals: 'during-muscle-contraction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_004', title: 'Animal Tissues: Neural Tissue',
          caseStudy: { intro: 'When you touch a hot pan, your hand pulls back before you feel pain — that speed comes from neural tissue.',
            decisions: [{ prompt: 'Name the three main structural parts of a typical multipolar neuron and state the primary function of each part.', options: [
                { text: 'The three main parts are: (1) Dendrites', outcome: 'The three main parts are: (1) Dendrites — short, branched processes that receive incoming signals.' },
                { text: 'axon receives signals', outcome: 'Not quite — Students believe that the action potential travels *along* the axon like a current in a wire, with.', reveals: 'the-action-potential-travels-along' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_005', title: 'Organ and Organ System: Frog Morphology',
          caseStudy: { intro: 'Imagine finding a frog near a pond during monsoon: its skin feels moist and slippery, it jumps powerfully with long hindlimbs, and its bulging eyes have.',
            decisions: [{ prompt: 'Name the common frog species found in India and state the term for its ability to change skin colour for camouflage.', options: [
                { text: 'The common Indian frog is Rana tigrina', outcome: 'The common Indian frog is Rana tigrina. Its protective coloration for camouflage is called mimicry.' },
                { text: 'Rana temporaria', outcome: 'Not quite — Students believe frogs drink water through their mouth like mammals, and that the "tongue" is used.', reveals: 'frogs-drink-water-through-their' },
                { text: 'metamorphosis', outcome: 'Not quite — Students believe frogs drink water through their mouth like mammals, and that the "tongue" is used.', reveals: 'frogs-drink-water-through-their' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_006', title: 'Frog Anatomy: Digestive System',
          caseStudy: { intro: 'Imagine you are watching a frog near a pond at dusk — it flicks its sticky, bilobed tongue and snatches a flying insect in milliseconds.',
            decisions: [{ prompt: 'List the components of the frog\'s alimentary canal in correct sequential order from mouth to cloaca.', options: [
                { text: 'Correct sequence: Mouth → Buccal cavity → Pharynx → Oesophagus → Stomach → Intestine', outcome: 'Correct sequence: Mouth → Buccal cavity → Pharynx → Oesophagus → Stomach → Intestine (duodenum.' },
                { text: 'just another name for the anus', outcome: 'Not quite — Students often think the frog\'s cloaca is "just another name for the anus" and that urine and.', reveals: 'the-frog-s-cloaca-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Structural Organisation in Animals · Part 1/2', spots: [
            { id: 's1', label: 'Animal Tissues Epithelial Tissue', prompt: 'Which idea is this? — Epithelial tissue is a sheet of tightly packed cells with minimal intercellular matrix.', answer: 'Animal Tissues Epithelial Tissue', options: ['Animal Tissues Epithelial Tissue', 'Animal Tissues Connective Tissue', 'Animal Tissues Muscular Tissue', 'Animal Tissues Neural Tissue'] },
            { id: 's2', label: 'Animal Tissues Connective Tissue', prompt: 'Which idea is this? — Connective tissue is the most abundant and widely distributed tissue in complex animals.', answer: 'Animal Tissues Connective Tissue', options: ['Animal Tissues Connective Tissue', 'Animal Tissues Epithelial Tissue', 'Animal Tissues Muscular Tissue', 'Animal Tissues Neural Tissue'] },
            { id: 's3', label: 'Animal Tissues Muscular Tissue', prompt: 'Which idea is this? — Muscular tissue is a specialized animal tissue composed of elongated cells (muscle.', answer: 'Animal Tissues Muscular Tissue', options: ['Animal Tissues Muscular Tissue', 'Animal Tissues Epithelial Tissue', 'Animal Tissues Connective Tissue', 'Animal Tissues Neural Tissue'] },
            { id: 's4', label: 'Animal Tissues Neural Tissue', prompt: 'Which idea is this? — Neural tissue is a specialised animal tissue composed of neurons (excitable cells that.', answer: 'Animal Tissues Neural Tissue', options: ['Animal Tissues Neural Tissue', 'Animal Tissues Epithelial Tissue', 'Animal Tissues Connective Tissue', 'Animal Tissues Muscular Tissue'] },
            { id: 's5', label: 'Organ and Organ System Frog Morphology', prompt: 'Which idea is this? — Organ and organ system in frog morphology refers to the hierarchical organization where.', answer: 'Organ and Organ System Frog Morphology', options: ['Organ and Organ System Frog Morphology', 'Animal Tissues Epithelial Tissue', 'Animal Tissues Connective Tissue', 'Animal Tissues Muscular Tissue'] },
            { id: 's6', label: 'Frog Anatomy Digestive System', prompt: 'Which idea is this? — The frog digestive system is a carnivore-adapted organ system comprising a short.', answer: 'Frog Anatomy Digestive System', options: ['Frog Anatomy Digestive System', 'Animal Tissues Epithelial Tissue', 'Animal Tissues Connective Tissue', 'Animal Tissues Muscular Tissue'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a hospital lab visit, a pathologist shows your group two slides: skin epidermis healing after a scrape, and trachea lining that looks \'stacked\' under the microscope. A student says: \'In stratified skin epithelium the surface cells must divide to repair the scrape; and the trachea is clearly stratified too — the nuclei are at different levels.\'',
            decisions: [{ prompt: 'Which cells actually repair the skin, and is the trachea truly stratified?', options: [
                { text: 'Only the basal layer of the epidermis — the single row of cells touching the basement membrane — divides and pushes new cells upward; shed surface cells are terminally differentiated and cannot proliferate. The trachea is pseudostratified: nuclei at different heights, but every cell still contacts the basement membrane.', outcome: 'The basement-membrane-contact test separates true stratified epithelium (upper cells lose contact) from pseudostratified (all cells keep contact); repair capacity lives only in the basal layer.' },
                { text: 'Surface cells divide and reattach to heal the scrape — that\'s why skin heals fast.', outcome: 'Superficial cells are dead or anucleate and sloughing off; they can\'t divide — regeneration is the basal cells\' job alone.', reveals: 'surface-cells-heal-wounds' },
                { text: 'Trachea is truly stratified — nuclei at different levels prove stacked layers.', outcome: 'Staggered nuclei can fake stratification; trace each cell down — if every cell reaches the basement membrane it\'s pseudostratified, not stratified.', reveals: 'staggered-nuclei-mean-stratified' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You stopped memorising tissue names and started reading them: layer count plus cell shape plus surface specialisation equals job description.',
            decisions: [{ prompt: 'What comes next? Structural Organisation in Animals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Structural Organisation in Animals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_001', difficulty: 'standard',
          question: 'Epithelial tissue is a sheet of tightly packed cells with minimal intercellular.',
          hint: 'Revisit c9_bio_ch1_3 (cell membrane) and c9_bio_ch2_5 (basic epithelial types) — focus.',
          misconception: 'Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top cells have no contact.',
          parts: [
                { id: 'a', prompt: 'A student examines a tissue slide and sees a single layer of flat, scale-like cells with disc-shaped nuclei.', answer: 'Simple squamous epithelium',
                  options: ['Simple squamous epithelium', 'stratified squamous', 'simple cuboidal', 'surface cells can proliferate to heal a wound'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane) and c9_bio_ch2_5 (basic epithelial types) — focus on polarity.',
                  misconception: 'Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top cells have no contact with the basement.' },
                { id: 'b', prompt: 'A patient suffers from a genetic defect causing non-functional claudin proteins in tight junctions of the intestinal epithelium.', answer: 'Paracellular leak of ions, water, and even bacteria/luminal antigens into the',
                  options: ['Paracellular leak of ions, water, and even bacteria/luminal antigens into the', 'cells fall apart', 'surface cells can proliferate to heal a wound'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane) and c9_bio_ch2_5 (basic epithelial types) — focus on polarity.',
                  misconception: 'Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top cells have no contact with the basement.' },
                { id: 'c', prompt: 'Compare and contrast the epithelial lining of the oesophagus and the stomach. How does each structure suit its function?', answer: 'Oesophagus: stratified squamous non-keratinised epithelium',
                  options: ['Oesophagus: stratified squamous non-keratinised epithelium', 'both are stratified', 'surface cells can proliferate to heal a wound'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane) and c9_bio_ch2_5 (basic epithelial types) — focus on polarity.',
                  misconception: 'Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top cells have no contact with the basement.' }
          ],
            remediations: { 'stratified-epithelium-means-cells-are': { steps: ['Draw a vertical section of stratified squamous epithelium labeling basal layer (cuboidal, mitotic), intermediate layers.', 'Contrast with pseudostratified columnar — draw all nuclei at different levels but every cell base touching basement.', 'Use the "basement membrane contact test" — trace each cell to the base; if any cell lacks contact, it is truly.', 'Apply to wound healing: only basal cells divide and migrate upward; surface cells cannot.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top cells have no contact.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "Pseudostratified columnar epithelium is functionally equivalent to stratified epithelium because both have multiple cell layers.".', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'surface cells can proliferate to heal a wound'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane) and c9_bio_ch2_5 (basic epithelial types) — focus on polarity.',
                  misconception: 'Students believe "stratified epithelium means cells are stacked like bricks in a wall, so the top cells have no contact with the basement.' }
          ],
            remediations: { 'stratified-epithelium-means-cells-are': { steps: ['Draw a vertical section of stratified squamous epithelium labeling basal layer (cuboidal, mitotic), intermediate layers.', 'Contrast with pseudostratified columnar — draw all nuclei at different levels but every cell base touching basement.', 'Use the "basement membrane contact test" — trace each cell to the base; if any cell lacks contact, it is truly.', 'Apply to wound healing: only basal cells divide and migrate upward; surface cells cannot.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_002', difficulty: 'standard',
          question: 'Connective tissue is the most abundant and widely distributed tissue in complex.',
          hint: 'Review the definition of tissue and the overview of four tissue types from the previous.',
          misconception: 'Students often believe "connective tissue = tissue that connects things" (like glue).',
          parts: [
                { id: 'a', prompt: 'List the three fundamental structural components present in ALL connective tissues, and name the embryonic origin of most connective tissue cells.', answer: 'The three universal components are: (1) specialized cells (e.g., fibroblasts,',
                  options: ['The three universal components are: (1) specialized cells (e.g., fibroblasts,', 'epithelial cells', 'ectoderm', 'connective tissue = tissue that connects things'],
                  hint: 'Review the definition of tissue and the overview of four tissue types from the previous node.',
                  misconception: 'Students often believe "connective tissue = tissue that connects things" (like glue).' },
                { id: 'b', prompt: 'Blood is classified as a connective tissue despite being a fluid. Explain WHY it fits this classification, referencing the three universal components.', answer: 'Blood possesses all three universal components: (1) Cells',
                  options: ['Blood possesses all three universal components: (1) Cells', 'blood isn\'t connective tissue', 'blood lacks fibers', 'connective tissue = tissue that connects things'],
                  hint: 'Review the definition of tissue and the overview of four tissue types from the previous node.',
                  misconception: 'Students often believe "connective tissue = tissue that connects things" (like glue).' },
                { id: 'c', prompt: 'Compare the extracellular matrix of hyaline cartilage and compact bone.', answer: 'fiber type/orientation, (',
                  options: ['fiber type/orientation, (', 'connective tissue = tissue that connects things', 'regular', '"connective tissue = tissue that connects things" (like glue)'],
                  hint: 'Review the definition of tissue and the overview of four tissue types from the previous node.',
                  misconception: 'Students often believe "connective tissue = tissue that connects things" (like glue).' }
          ],
            remediations: { 'connective-tissue-tissue-that-connects': { steps: ['Construct a **classification tree** on paper: Connective Tissue → Proper (Loose: Areolar, Adipose, Reticular; Dense.', 'For EACH terminal node, write: **Dominant fiber**, **Ground substance key feature**, **Representative cell**, **One.', 'Obtain histology images (atlas or virtual slide) of all 10+ subtypes.', 'Explain aloud to a peer: "Why is blood a connective tissue?" until you can do it without notes.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_003', difficulty: 'standard',
          question: 'Muscular tissue is a specialized animal tissue composed of elongated cells.',
          hint: 'Revisit Class 9 muscular tissue (c9_bio_ch2_7) and cell organelles (c9_bio_ch1_9) — focus.',
          misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments *themselves* shorten.',
          parts: [
                { id: 'a', prompt: 'Name the three types of muscular tissue and give one location in the human body for each.', answer: 'The three types are: (1) Skeletal muscle',
                  options: ['The three types are: (1) Skeletal muscle', 'voluntary/involuntary', 'voluntary/involuntary" as types, or placing cardiac muscle in stomach'],
                  hint: 'Revisit Class 9 muscular tissue (c9_bio_ch2_7) and cell organelles (c9_bio_ch1_9) — focus.',
                  misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments *themselves* shorten or compress like.' },
                { id: 'b', prompt: 'Explain why the A-band remains constant in length during skeletal muscle contraction while the I-band and H-zone shorten.', answer: 'The A-band length equals the length of thick (myosin) filaments',
                  options: ['The A-band length equals the length of thick (myosin) filaments', 'A-band shortens because the whole sarcomere shortens'],
                  hint: 'Revisit Class 9 muscular tissue (c9_bio_ch2_7) and cell organelles (c9_bio_ch1_9) — focus.',
                  misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments *themselves* shorten or compress like.' },
                { id: 'c', prompt: 'Compare the microscopic structure of cardiac and skeletal muscle with respect to: (a) branching, (b) nuclei, (c) intercalated discs, (d) sarcoplasmic reticulum.', answer: 'branching, (',
                  options: ['branching, (', 'both have intercalated discs'],
                  hint: 'Revisit Class 9 muscular tissue (c9_bio_ch2_7) and cell organelles (c9_bio_ch1_9) — focus.',
                  misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments *themselves* shorten or compress like.' }
          ],
            remediations: { 'during-muscle-contraction': { steps: ['Show a physical model: two interlocking combs (actin) sliding into a fixed comb (myosin) — the teeth don\'t shrink, only.', 'Use a sarcomere animation (e.g., from NCERT e-pathshala) and pause at relaxation vs.', 'contraction; measure A-band, I-band, H-zone lengths on screen — they will see A-band constant.', 'Have student draw *three* sarcomeres: relaxed, partially contracted, fully contracted — enforcing constant filament.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_004', difficulty: 'standard',
          question: 'Neural tissue is a specialised animal tissue composed of neurons (excitable.',
          hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and.',
          misconception: 'Students believe that the action potential travels *along* the axon like a current in a wire, with electrons flowing.',
          parts: [
                { id: 'a', prompt: 'Name the three main structural parts of a typical multipolar neuron and state the primary function of each part.', answer: 'The three main parts are: (1) Dendrites',
                  options: ['The three main parts are: (1) Dendrites', 'axon receives signals'],
                  hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and Class 11.',
                  misconception: 'Students believe that the action potential travels *along* the axon like a current in a wire, with electrons flowing continuously.' }
          ],
            remediations: { 'the-action-potential-travels-along': { steps: ['Use a domino analogy — line up dominoes (unmyelinated) vs spaced groups with gaps (myelinated).', 'Simulate with a rope: flick one end — the wave travels, but rope particles only move up/down.', 'Map to biology: domino = action potential at one membrane patch; rope particles = ions moving across membrane locally.', 'Re-read the action potential propagation section in NCERT, focusing on "local current flow" and "depolarisation.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_005', difficulty: 'standard',
          question: 'Organ and organ system in frog morphology refers to the hierarchical.',
          hint: 'If stuck, revisit the four tissue nodes (c11_bio_cbse_07_001 to 004) focusing on the.',
          misconception: 'Students believe frogs drink water through their mouth like mammals, and that the "tongue" is used for drinking.',
          parts: [
                { id: 'a', prompt: 'Name the common frog species found in India and state the term for its ability to change skin colour for camouflage.', answer: 'The common Indian frog is Rana tigrina',
                  options: ['The common Indian frog is Rana tigrina', 'Rana temporaria', 'metamorphosis', 'tongue'],
                  hint: 'If stuck, revisit the four tissue nodes (c11_bio_cbse_07_001 to 004) focusing on the table.',
                  misconception: 'Students believe frogs drink water through their mouth like mammals, and that the "tongue" is used for drinking.' }
          ],
            remediations: { 'frogs-drink-water-through-their': { steps: ['Place a live frog (or watch a video) on a wet surface and sprinkle water on its dorsal skin – observe no swallowing.', 'Apply a harmless dye (e.g., food colour) to ventral skin in a petri dish with water – after 10 minutes, dissect (or.', 'Contrast with a mammal (dog) lapping water – note tongue movement vs frog\'s tongue projection only at prey.', 'Relate to histology: frog ventral skin has thin keratinized layer and dense capillary network (connective tissue) for.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_006', difficulty: 'standard',
          question: 'The frog digestive system is a carnivore-adapted organ system comprising.',
          hint: 'If stuck, revisit Class 10 nodes c10_bio_cbse_01_005 (stomach) and c10_bio_cbse_01_006.',
          misconception: 'Students often think the frog\'s cloaca is "just another name for the anus" and that urine and faeces mix randomly.',
          parts: [
                { id: 'a', prompt: 'Why is the frog\'s intestine shorter relative to its body length compared to a herbivorous mammal like a rabbit?', answer: 'Frogs are carnivores',
                  options: ['Frogs are carnivores', 'frogs are smaller', 'frogs don\'t eat plants', 'just another name for the anus'],
                  hint: 'If stuck, revisit Class 10 nodes c10_bio_cbse_01_005 (stomach) and c10_bio_cbse_01_006 (small.',
                  misconception: 'Students often think the frog\'s cloaca is "just another name for the anus" and that urine and faeces mix randomly.' },
                { id: 'b', prompt: 'A frog\'s common bile duct is ligated (tied off) experimentally.', answer: 'Bile (from liver, stored in gall bladder) emulsifies fats',
                  options: ['Bile (from liver, stored in gall bladder) emulsifies fats', 'all digestion stops', 'just another name for the anus'],
                  hint: 'If stuck, revisit Class 10 nodes c10_bio_cbse_01_005 (stomach) and c10_bio_cbse_01_006 (small.',
                  misconception: 'Students often think the frog\'s cloaca is "just another name for the anus" and that urine and faeces mix randomly.' }
          ],
            remediations: { 'the-frog-s-cloaca-is': { steps: ['Re-draw the cloaca region from NCERT Fig 7.2/7.3, labeling coprodeum (rectum opens), urodeum (ureters/oviducts open).', 'Trace the path of a faecal pellet vs a sperm packet — note they use the same aperture but different chambers and timing.', 'Watch a 2-min video of frog mating (amplexus) to see cloacal apposition for sperm transfer.', 'Write a 3-sentence explanation: "The cloaca is a common chamber with three regions; faeces enter coprodeum.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
