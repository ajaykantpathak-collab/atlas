import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch04_p2: SimDef = {
    id: 'v3_c12_hs_ch04_p2',
    title: 'Fabric and Apparel · Part 2/2',
    subtitle: 'Warm-when-wet is a physics property, not a brand claim',
    classLevel: 12, subject: 'home_science', topic: 'Fabric and Apparel · Part 2/2',
    chapters: ['c12_hs_ch04'],
    nodeIds: ['c12_hs_cbse_04_007', 'c12_hs_cbse_04_008', 'c12_hs_cbse_04_009', 'c12_hs_cbse_04_010', 'c12_hs_cbse_04_011', 'c12_hs_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Textile selection engineer', intro: 'Every garment is a bet on fibre properties — absorbency, wet strength, warmth. Learn to place the bet correctly.', goal: 'Classify fibres and select them for apparel using property-based reasoning, not the natural/synthetic binary.' },
    discovery: {
        question: 'For a mountaineering base layer that must stay warm when wet and resist odour, engineers still reach for old-fashioned wool over polyester. Why?',
        options: ['Fibre physics — wool\'s crimp traps air even damp, its scales wick moisture, and natural antimicrobial properties fight odour; polyester loses warmth wet and holds smell', 'Wool is natural, so better', 'Polyester is too light', 'Tradition'],
        answer: 'Fibre physics — wool\'s crimp traps air even damp, its scales wick moisture, and natural antimicrobial properties fight odour; polyester loses warmth wet and holds smell',
        hook: '\'Natural good, synthetic bad\' collapses fast — regenerated fibres like rayon are natural polymers processed with chemicals, and blends make the question moot. Classification isn\'t a label to memorise; it\'s a decision framework from molecule to garment performance.',
    },
    teaching: [
        { title: 'Woven Fabrics: Weaving Basics, Looms and Basic Weaves', text: 'Woven fabric is a textile structure formed by interlacing two sets of yarns — warp (lengthwise) and weft (crosswise) — at right angles to each other on a loom, following a specific interlacing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design by properties, not labels: match moisture regain, wet-strength and warmth to a real garment brief, decode a fibre from its property table, and judge a school-uniform blend on all five counts.',
        labels: ['Woven Fabrics: Weaving Basics,', 'Knitted Fabrics: Warp', 'Fabric Finishes: Mechanical', 'Apparel Design: Elements', 'Indian Traditional Textiles: Handloom', 'Fabric Selection Criteria'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_008', title: 'Knitted Fabrics: Warp and Weft Knitting Structures',
          caseStudy: { intro: 'Imagine you are choosing fabric for a sports T‑shirt: you need stretch, recovery, and breathability.',
            decisions: [{ prompt: 'Define “course” and “wale” in knitted fabrics and state which knitting type (warp or weft) primarily forms courses and which forms wales.', options: [
                { text: 'A course is a horizontal row of loops', outcome: 'A course is a horizontal row of loops; a wale is a vertical column of loops.' },
                { text: 'warp knitting is just weft knitting turned 90°', outcome: 'Not quite — Students often believe “warp knitting is just weft knitting turned 90°” and that both have similar.', reveals: 'warp-knitting-is-just-weft' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_009', title: 'Fabric Finishes: Mechanical and Chemical Finishes for Apparel',
          caseStudy: { intro: 'Imagine you are shopping for a monsoon jacket — the label says "water-repellent finish" — and a cotton kurta labelled "wrinkle-free".',
            decisions: [{ prompt: 'State the fundamental difference between a mechanical finish and a chemical finish in terms of the mechanism of action on the fabric.', options: [
                { text: 'Mechanical finishes use physical forces (heat, pressure, friction, tension) to alter', outcome: 'Mechanical finishes use physical forces (heat, pressure, friction, tension) to alter fabric.' },
                { text: 'mechanical finishes use machines, chemical finishes use chemicals', outcome: 'Not quite — Students often think "finish" means only chemical coating, and that mechanical finishes are not.', reveals: 'finish-means-only-chemical-coating' },
                { text: 'finish', outcome: 'Not quite — Students often think "finish" means only chemical coating, and that mechanical finishes are not.', reveals: 'finish-means-only-chemical-coating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_010', title: 'Apparel Design: Elements and Principles of Design in Clothing',
          caseStudy: { intro: 'Imagine you are choosing an outfit for a family wedding. You pick a kurta with vertical pinstripes, a flared silhouette, and a contrasting dupatta.',
            decisions: [{ prompt: 'List the five elements of design and the five principles of design used in apparel. Give one clothing example for each element.', options: [
                { text: '**Elements:** Line (e.g., vertical seams on a shirt), Shape/Form (e.g., A-line skirt),', outcome: '**Elements:** Line (e.g., vertical seams on a shirt), Shape/Form (e.g., A-line skirt), Space (e.g.' },
                { text: 'balance', outcome: 'Not quite — Students often think **"elements and principles are just abstract art terms — they don\'t affect how.', reveals: 'elements-and-principles-are-just' },
                { text: 'swaps elements and principles (e', outcome: 'Not quite — Students often think **"elements and principles are just abstract art terms — they don\'t affect how.', reveals: 'elements-and-principles-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_011', title: 'Indian Traditional Textiles: Handloom Weaves and Regional Heritage',
          caseStudy: { intro: 'Imagine you are at a handloom exhibition and see a saree with intricate gold zari work on deep red silk — you recognize it as a Kanjeevaram, but can you.',
            decisions: [{ prompt: 'List five famous handloom weaves of India along with their state of origin and primary raw material (e.g., silk, cotton, wool).', options: [
                { text: 'Correct answer: 1) Banarasi brocade – Uttar Pradesh – silk', outcome: 'Correct answer: 1) Banarasi brocade – Uttar Pradesh – silk; 2) Kanjeevaram silk – Tamil Nadu.' },
                { text: 'Khaddar', outcome: 'Not quite — Students often believe "handloom" and "khadi" are synonyms, or that all traditional textiles are.', reveals: 'handloom-and-khadi-are-synonyms' },
                { text: 'handloom', outcome: 'Not quite — Students often believe "handloom" and "khadi" are synonyms, or that all traditional textiles are.', reveals: 'handloom-and-khadi-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_012', title: 'Fabric Selection Criteria for Apparel: Comfort, Durability and Aesthetics',
          caseStudy: { intro: 'Imagine you\'re designing a uniform for Delhi Metro staff who work 12-hour shifts in air-conditioned stations but walk on hot platforms—what fabric keeps them.',
            decisions: [{ prompt: 'A student selects 100% polyester fabric for summer sportswear because "polyester is strong and durable." Identify the critical comfort.', options: [
                { text: 'The overlooked property is **moisture vapor transmission rate (MVTR)** or **wicking', outcome: 'The overlooked property is **moisture vapor transmission rate (MVTR)** or **wicking ability**.' },
                { text: 'durability', outcome: 'Not quite — **"Higher thread count always means better quality and durability."** Students equate thread count.', reveals: 'higher-thread-count-always-means' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Fabric and Apparel · Part 2/2', spots: [
            { id: 's1', label: 'Woven Fabrics Weaving Basics Looms and Basic Weaves', prompt: 'Which idea is this? — Woven fabric is a textile structure formed by interlacing two sets of yarns — warp.', answer: 'Woven Fabrics Weaving Basics Looms and Basic Weaves', options: ['Woven Fabrics Weaving Basics Looms and Basic Weaves', 'Knitted Fabrics Warp and Weft Knitting Structures', 'Fabric Finishes Mechanical and Chemical Finishes for Apparel', 'Apparel Design Elements and Principles of Design in Clothing'] },
            { id: 's2', label: 'Knitted Fabrics Warp and Weft Knitting Structures', prompt: 'Which idea is this? — Knitted fabrics are textile structures formed by intermeshing loops of yarn; weft.', answer: 'Knitted Fabrics Warp and Weft Knitting Structures', options: ['Knitted Fabrics Warp and Weft Knitting Structures', 'Woven Fabrics Weaving Basics Looms and Basic Weaves', 'Fabric Finishes Mechanical and Chemical Finishes for Apparel', 'Apparel Design Elements and Principles of Design in Clothing'] },
            { id: 's3', label: 'Fabric Finishes Mechanical and Chemical Finishes for Apparel', prompt: 'Which idea is this? — Fabric finishes are treatments applied to grey fabrics (unfinished fabrics) to enhance.', answer: 'Fabric Finishes Mechanical and Chemical Finishes for Apparel', options: ['Fabric Finishes Mechanical and Chemical Finishes for Apparel', 'Woven Fabrics Weaving Basics Looms and Basic Weaves', 'Knitted Fabrics Warp and Weft Knitting Structures', 'Apparel Design Elements and Principles of Design in Clothing'] },
            { id: 's4', label: 'Apparel Design Elements and Principles of Design in Clothing', prompt: 'Which idea is this? — Apparel design uses **elements of design** (line, shape/form, space, texture, color).', answer: 'Apparel Design Elements and Principles of Design in Clothing', options: ['Apparel Design Elements and Principles of Design in Clothing', 'Woven Fabrics Weaving Basics Looms and Basic Weaves', 'Knitted Fabrics Warp and Weft Knitting Structures', 'Fabric Finishes Mechanical and Chemical Finishes for Apparel'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior merchandiser is choosing between two cotton bales for a fine shirting yarn: both show 28 mm mean length, but bale B is cheaper. The lab sheet shows B\'s length-uniformity index is 72% against A\'s 84%.',
            decisions: [{ prompt: 'What does the fibre data say about the cheaper bale?', options: [
                { text: 'Reject B for this yarn — identical mean length hides B\'s heavy share of short fibres that slip drafting control, causing thick-thin places, fibre fly and ends-down; spinning performance runs on length distribution, not the average.', outcome: 'The chapter\'s trap is exactly this: quoting the 28 mm average while missing uniformity — the short-fibre fraction is what degrades evenness and productivity.' },
                { text: 'Buy B — same staple length at lower cost is pure margin.', outcome: 'Same mean, different distribution: the savings get spent on breakages, uneven yarn and rework — the lab numbers already priced the difference, the merchandiser just didn\'t read it.', reveals: 'mean-length-decides' },
                { text: 'Blend both bales to average out the risk.', outcome: 'Blending dilutes but doesn\'t remove short fibres — they still float in the drafting zone; mixing keeps the failure mode alive at half strength instead of removing it.', reveals: 'blending-fixes-short-fibre' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'You can now choose a fibre like an engineer — properties first, marketing last.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_007', difficulty: 'standard',
          question: 'Woven fabric is a textile structure formed by interlacing two sets of yarns.',
          hint: 'Revisit c12_hs_cbse_04_006 (Yarn Construction) for twist/count; revisit.',
          misconception: '**Misconception:** "Satin weave has long floats, so it must be weak and unsuitable for durable fabrics." Students.',
          parts: [
                { id: 'a', prompt: 'A fabric shows a clear diagonal rib running at 45° on the face. The interlacing repeats every 3 warp and 3 weft threads (over 2, under 1).', answer: 'It is a 2/1 twill (warp-faced), notation: ↑↑↓ (or 2 up, 1 down)',
                  options: ['It is a 2/1 twill (warp-faced), notation: ↑↑↓ (or 2 up, 1 down)', 'more interlacings = stronger'],
                  hint: 'Revisit c12_hs_cbse_04_006 (Yarn Construction) for twist/count; revisit c11_hs_cbse_05_009 for.',
                  misconception: '**Misconception:** "Satin weave has long floats, so it must be weak and unsuitable for durable fabrics." Students confuse **float length**.' }
          ],
            remediations: { 'misconception-satin-weave-has-long': { steps: ['If the student holds this misconception: (1) Have them compare two fabric swatches — plain weave and satin — of same.', '(2) Revisit c12_hs_cbse_04_006 (Yarn Construction) to recall how yarn twist and linear density affect strength.', '(3) Re-do Diagnostic Q2 and Q5 with physical samples, forcing them to correlate float length, thread density, and.', '(4) Ask: "Why do premium bedsheets use sateen, not plain weave?" — the answer (lustre + strength + smoothness) breaks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Satin weave has long floats, so it must be weak and unsuitable for durable fabrics." Students.',
          parts: [
                { id: 'a', prompt: 'A designer wants a fabric with high lustre, smooth surface, and good drape for evening wear, but it must resist snagging better than traditional satin.', answer: 'Recommend **8-end sateen (weft-faced)**',
                  options: ['Recommend **8-end sateen (weft-faced)**', 'more interlacings = stronger'],
                  hint: 'Revisit c12_hs_cbse_04_006 (Yarn Construction) for twist/count; revisit c11_hs_cbse_05_009 for.',
                  misconception: '**Misconception:** "Satin weave has long floats, so it must be weak and unsuitable for durable fabrics." Students confuse **float length**.' }
          ],
            remediations: { 'misconception-satin-weave-has-long': { steps: ['If the student holds this misconception: (1) Have them compare two fabric swatches — plain weave and satin — of same.', '(2) Revisit c12_hs_cbse_04_006 (Yarn Construction) to recall how yarn twist and linear density affect strength.', '(3) Re-do Diagnostic Q2 and Q5 with physical samples, forcing them to correlate float length, thread density, and.', '(4) Ask: "Why do premium bedsheets use sateen, not plain weave?" — the answer (lustre + strength + smoothness) breaks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_008', difficulty: 'standard',
          question: 'Knitted fabrics are textile structures formed by intermeshing loops of yarn.',
          hint: 'If stuck, revisit c11_hs_cbse_05_009 (knitting as a production method) and.',
          misconception: 'Students often believe “warp knitting is just weft knitting turned 90°” and that both have similar stretch.',
          parts: [
                { id: 'a', prompt: 'Define “course” and “wale” in knitted fabrics and state which knitting type (warp or weft) primarily forms courses and which forms wales.', answer: 'A course is a horizontal row of loops',
                  options: ['A course is a horizontal row of loops', 'warp knitting is just weft knitting turned 90°'],
                  hint: 'If stuck, revisit c11_hs_cbse_05_009 (knitting as a production method) and c12_hs_cbse_04_007.',
                  misconception: 'Students often believe “warp knitting is just weft knitting turned 90°” and that both have similar stretch.' }
          ],
            remediations: { 'warp-knitting-is-just-weft': { steps: ['Re‑watch a slow‑motion video of a weft knitting machine (single yarn feeding across needles) vs.', 'a warp knitting machine (multiple yarns from a beam).', 'Re‑visit c11_hs_cbse_05_009 (Fabric Production Methods) to review the basic knitting principle.', 'Take two swatches (weft single jersey, warp tricot); pull a cut edge — observe unraveling vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_009', difficulty: 'standard',
          question: 'Fabric finishes are treatments applied to grey fabrics (unfinished fabrics).',
          hint: 'If unsure how fibre/fabric structure affects finish choice, review c11_hs_cbse_05_003.',
          misconception: 'Students often think "finish" means only chemical coating, and that mechanical finishes are not "real" finishes because.',
          parts: [
                { id: 'a', prompt: 'A cotton fabric is passed through heated rollers under high pressure to produce a high-gloss surface.', answer: 'The finish is calendaring (specifically friction calendaring)',
                  options: ['The finish is calendaring (specifically friction calendaring)', 'the chemical wears off', 'finish', 'finished'],
                  hint: 'If unsure how fibre/fabric structure affects finish choice, review c11_hs_cbse_05_003 (Fibre.',
                  misconception: 'Students often think "finish" means only chemical coating, and that mechanical finishes are not "real" finishes because no chemical.' },
                { id: 'b', prompt: 'A manufacturer wants to prevent a cotton shirting fabric from shrinking more than 1% after repeated home laundering.', answer: 'Sanforizing (compressive shrinkage)',
                  options: ['Sanforizing (compressive shrinkage)', 'calendaring', 'finish', 'finished'],
                  hint: 'If unsure how fibre/fabric structure affects finish choice, review c11_hs_cbse_05_003 (Fibre.',
                  misconception: 'Students often think "finish" means only chemical coating, and that mechanical finishes are not "real" finishes because no chemical.' },
                { id: 'c', prompt: 'Compare the durability of a fluorocarbon-based water-repellent finish and a wax-based water-repellent finish on a polyester-cotton blend.', answer: 'Fluorocarbon finish is more durable',
                  options: ['Fluorocarbon finish is more durable', 'finish', 'finished'],
                  hint: 'If unsure how fibre/fabric structure affects finish choice, review c11_hs_cbse_05_003 (Fibre.',
                  misconception: 'Students often think "finish" means only chemical coating, and that mechanical finishes are not "real" finishes because no chemical.' }
          ],
            remediations: { 'finish-means-only-chemical-coating': { steps: ['Revisit c11_hs_cbse_05_010 (Textile Finishing: Objectives, Classification) to recall the definition and broad.', 'Make a two-column table: Column A = mechanical finishes (calendaring, sanforizing, brushing, shearing, embossing.', 'For each, write: principle (physical force vs chemical bonding), durability (temporary/durable), and one apparel.', 'Take a swatch of unfinished cotton, a calendared cotton, and a sanforized cotton; compare hand feel, shrinkage after.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_010', difficulty: 'standard',
          question: 'Apparel design uses **elements of design** (line, shape/form, space, texture.',
          hint: 'Revisit c12_hs_cbse_04_007 (woven fabrics) and c12_hs_cbse_04_009 (finishes) — focus.',
          misconception: 'Students often think **"elements and principles are just abstract art terms — they don\'t affect how clothes actually.',
          parts: [
                { id: 'a', prompt: 'A designer uses a bold, wide horizontal stripe on the hip area of a dress.', answer: 'The **element** is **line** (horizontal stripe)',
                  options: ['The **element** is **line** (horizontal stripe)', 'the stripe makes hips look slimmer'],
                  hint: 'Revisit c12_hs_cbse_04_007 (woven fabrics) and c12_hs_cbse_04_009 (finishes) — focus on how weave.',
                  misconception: 'Students often think **"elements and principles are just abstract art terms — they don\'t affect how clothes actually fit or look on a real.' },
                { id: 'b', prompt: 'You have a client with a pear-shaped body (wider hips, narrower shoulders).', answer: '**Strategy:** Use **color** (element)',
                  options: ['**Strategy:** Use **color** (element)', 'suggests adding volume at hips (e'],
                  hint: 'Revisit c12_hs_cbse_04_007 (woven fabrics) and c12_hs_cbse_04_009 (finishes) — focus on how weave.',
                  misconception: 'Students often think **"elements and principles are just abstract art terms — they don\'t affect how clothes actually fit or look on a real.' }
          ],
            remediations: { 'elements-and-principles-are-just': { steps: ['Have the student stand before a full-length mirror in a simple T-shirt and leggings.', 'Drape colored scarves/fabric scraps to create vertical lines, horizontal lines, asymmetry, symmetry — observe immediate.', 'For each change, name the element/principle aloud: "This scarf at the waist is a **horizontal line** creating.', 'Repeat with 3 different body-type mannequins (or photos) and ask: "Which principle would you use to minimize hips?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_011', difficulty: 'standard',
          question: 'Indian Traditional Textiles: Handloom Weaves and Regional Heritage refers.',
          hint: 'If stuck, revisit c12_hs_cbse_04_007 (weaving basics) and c11_hs_cbse_05_005/006 (natural.',
          misconception: 'Students often believe "handloom" and "khadi" are synonyms, or that all traditional textiles are handloom.',
          parts: [
                { id: 'a', prompt: 'List five famous handloom weaves of India along with their state of origin and primary raw material (e.g., silk, cotton, wool).', answer: 'Correct answer: 1) Banarasi brocade – Uttar Pradesh – silk',
                  options: ['Correct answer: 1) Banarasi brocade – Uttar Pradesh – silk', 'Khaddar', 'handloom', 'Khaddar" as a specific regional weave or confusing Patola with Pochampally'],
                  hint: 'If stuck, revisit c12_hs_cbse_04_007 (weaving basics) and c11_hs_cbse_05_005/006 (natural fibre.',
                  misconception: 'Students often believe "handloom" and "khadi" are synonyms, or that all traditional textiles are handloom.' },
                { id: 'b', prompt: 'A fabric sample is described as: "Lightweight cotton with blurred geometric patterns in red and black, created by tie-dyeing both warp and weft yarns before.', answer: 'Correct answer: Double ikat (both warp and weft resist-dyed)',
                  options: ['Correct answer: Double ikat (both warp and weft resist-dyed)', 'Sambalpuri', 'Bandhani', 'handloom'],
                  hint: 'If stuck, revisit c12_hs_cbse_04_007 (weaving basics) and c11_hs_cbse_05_005/006 (natural fibre.',
                  misconception: 'Students often believe "handloom" and "khadi" are synonyms, or that all traditional textiles are handloom.' },
                { id: 'c', prompt: 'Compare Banarasi brocade and Kanjeevaram silk on three parameters: (a) primary design inspiration for motifs, (b) zari composition and layout, (c) typical.', answer: 'Correct answer: | Parameter | Banarasi Brocade | Kanjeevaram Silk |',
                  options: ['Correct answer: | Parameter | Banarasi Brocade | Kanjeevaram Silk |', 'compare and contrast', 'handloom'],
                  hint: 'If stuck, revisit c12_hs_cbse_04_007 (weaving basics) and c11_hs_cbse_05_005/006 (natural fibre.',
                  misconception: 'Students often believe "handloom" and "khadi" are synonyms, or that all traditional textiles are handloom.' }
          ],
            remediations: { 'handloom-and-khadi-are-synonyms': { steps: ['Revisit c12_hs_cbse_04_007 (Woven Fabrics: Weaving Basics) to clarify loom mechanics — watch a 5-minute video of a pit.', 'Revisit c11_hs_cbse_05_009 (Fabric Production Methods) to distinguish hand-spinning, hand-weaving, and power loom.', 'Create a three-column table: Technique | Stage of Intervention | Example (e.g., Ikat | yarn dyeing pre-weave |.', 'Re-attempt Diagnostic Question 2 and 3; if still confused, ask teacher for physical yarn/fabric swatches.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_04_012', difficulty: 'standard',
          question: 'Fabric selection criteria for apparel is the systematic evaluation of textile.',
          hint: 'Revisit c12_hs_cbse_04_007 (weave structure effects on abrasion/drape) and.',
          misconception: '**"Higher thread count always means better quality and durability."** Students equate thread count (threads per inch).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fabric selection criteria for apparel is the systematic evaluation of textile materials',
                  options: ['Fabric selection criteria for apparel is the systematic evaluation of textile materials', 'Textile fibres are the fundamental units of fabric, classified by origin into natural', 'Cotton fibre is a natural cellulosic seed fibre obtained from the seed boll of Gossypium', 'Wool is a natural protein fibre obtained from the fleece of sheep (primarily) and other'],
                  hint: 'Revisit c12_hs_cbse_04_007 (weave structure effects on abrasion/drape) and c12_hs_cbse_04_009.',
                  misconception: '**"Higher thread count always means better quality and durability."** Students equate thread count (threads per inch) with fabric.' }
          ],
            remediations: { 'higher-thread-count-always-means': { steps: ['If a student exhibits the thread-count misconception: (1) **Demonstrate** two fabrics of same fiber/weight: 300.', '200 TC percale—conduct Martindale abrasion test (show percale lasts 2× cycles) and MVTR test (show percale 30% higher).', '(2) **Assign** re-read of c12_hs_cbse_04_006 (yarn twist/strength) and c12_hs_cbse_04_007 (weave structure effects).', '(3) **Re-diagnostic:** Give a new scenario—"Select fabric for hospital bedsheets (industrial wash at 90°C, high.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
