import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch08_p1: SimDef = {
    id: 'v3_c12_hs_ch08_p1',
    title: 'Fabric and Apparel: Design · Part 1/2',
    subtitle: 'Perfectly balanced — and still a failure',
    classLevel: 12, subject: 'home_science', topic: 'Fabric and Apparel: Design · Part 1/2',
    chapters: ['c12_hs_ch08'],
    nodeIds: ['c12_hs_cbse_08_001', 'c12_hs_cbse_08_002', 'c12_hs_cbse_08_003', 'c12_hs_cbse_08_004', 'c12_hs_cbse_08_005', 'c12_hs_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Apparel designer', intro: 'You reach for the kurta that feels like \'you\' — a designer planned that feeling years before you wore it.', goal: 'Use the elements and principles of design to read clothing as deliberate self-expression.' },
    discovery: {
        question: 'A perfectly symmetrical dress still fails in the market — its equal halves make the wearer look shorter and wider. What did the designer get wrong?',
        options: ['Proportion — balance was fine but the 1:1 part-to-whole ratio flattened the silhouette; harmony needs both principles working', 'The fabric was bad', 'Symmetry always works', 'Customers are picky'],
        answer: 'Proportion — balance was fine but the 1:1 part-to-whole ratio flattened the silhouette; harmony needs both principles working',
        hook: 'Every garment is a designed message — colour, texture, line and shape are the vocabulary; structural versus applied design is whether the message is woven in or printed on. \'Self-expression is superficial\' forgets that bandhani and brocade always signalled region and status.',
    },
    teaching: [
        { title: 'Apparel Design: Definition and Role of Clothing in Self-Expression', text: 'Apparel design is the creative and systematic process of conceiving, planning, and realising garments that integrate aesthetic appeal (through elements and principles of design) with functional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read clothes as communication: pick one design element to say \'youthful yet rooted,\' split structural from applied choices, and find the principle whose failure kills an otherwise balanced design.',
        labels: ['Apparel Design: Definition', 'Elements of Design: Line,', 'Principles of Design: Balance,', 'Colour Theory: Colour Wheel,', 'Figure Types and Apparel', 'Wardrobe Planning: Factors, Steps'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_001', title: 'Apparel Design: Definition and Role of Clothing in Self-Expression',
          caseStudy: { intro: 'Imagine you are getting ready for a college farewell party. You open your wardrobe and instinctively reach for that deep-blue kurta with subtle embroidery.',
            decisions: [{ prompt: 'Define \'apparel design\' as per NCERT Class 12 Human Ecology and Family Sciences, and state the two main aspects in which design is studied.', options: [
                { text: 'Apparel design is the human power to conceive, plan, and realise products that serve', outcome: 'Apparel design is the human power to conceive, plan, and realise products that serve human beings.' },
                { text: 'making clothes look pretty', outcome: 'Not quite — Students often equate \'apparel design\' solely with fashion illustration or trend-following.', reveals: 'students-often-equate-apparel-design' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_002', title: 'Elements of Design: Line, Shape, Texture and Colour in Apparel',
          caseStudy: { intro: 'Imagine you are choosing a kurta for a summer wedding: you instinctively reach for a light, flowing cotton in a pastel shade with delicate floral prints. Why?',
            decisions: [{ prompt: 'Define the term "texture" in the context of fabric and apparel design, and list the five factors from the NCERT textbook that determine the.', options: [
                { text: 'Texture is the sensory impression of sight and touch referring to the tactile and visual', outcome: 'Texture is the sensory impression of sight and touch referring to the tactile and visual qualities.' },
                { text: 'how it feels', outcome: 'Not quite — Students often treat "colour" and "texture" as independent choices—e.g., "I’ll pick a red fabric.', reveals: 'students-often-treat-colour-and' },
                { text: 'explain factors affecting texture', outcome: 'Not quite — Students often treat "colour" and "texture" as independent choices—e.g., "I’ll pick a red fabric.', reveals: 'students-often-treat-colour-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_003', title: 'Principles of Design: Balance, Proportion, Rhythm, Emphasis and Harmony',
          caseStudy: { intro: 'Imagine you are choosing an outfit for a family wedding: you want to look taller, highlight your neckline, and ensure the kurta and dupatta feel like.',
            decisions: [{ prompt: 'Define \'Formal Balance\' in apparel design and give one example of a garment feature that typically exhibits it.', options: [
                { text: 'Formal balance (also called symmetrical balance) occurs when design elements are arranged', outcome: 'Formal balance (also called symmetrical balance) occurs when design elements are arranged.' },
                { text: 'balance', outcome: 'Not quite — Students often believe that "balance" only means formal (mirror-image) symmetry and that.', reveals: 'balance-only-means-formal-mirror' },
                { text: 'proportion', outcome: 'Not quite — Students often believe that "balance" only means formal (mirror-image) symmetry and that.', reveals: 'balance-only-means-formal-mirror' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_004', title: 'Colour Theory: Colour Wheel, Properties and Colour Schemes',
          caseStudy: { intro: 'Imagine you\'re designing a festive kurta set for Diwali — your client wants something "traditional but modern" that suits her wheatish complexion and doesn\'t.',
            decisions: [{ prompt: 'Define the three dimensions of colour (hue, value, intensity) and give one fabric example for each dimension where changing only that.', options: [
                { text: 'Hue is the colour name (e.g., red, blue-green) determined by wavelength', outcome: 'Hue is the colour name (e.g., red, blue-green) determined by wavelength; value.' },
                { text: 'tint adds black', outcome: 'Not quite — Students believe "complementary colours always look good together" and use them in equal.', reveals: 'complementary-colours-always-look-good' },
                { text: 'complementary colours always look good together', outcome: 'Not quite — Students believe "complementary colours always look good together" and use them in equal.', reveals: 'complementary-colours-always-look-good' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_005', title: 'Figure Types and Apparel Selection for Different Body Types',
          caseStudy: { intro: 'Imagine you are helping a friend choose an outfit for a family wedding. She feels self-conscious about her broad shoulders and narrow hips. Where do you begin?',
            decisions: [{ prompt: 'List the five standard figure types classified by shoulder-bust-waist-hip proportions and state the defining proportion characteristic.', options: [
                { text: 'The five standard figure types are: (1) Hourglass', outcome: 'The five standard figure types are: (1) Hourglass — shoulders and hips nearly equal with.' },
                { text: 'hiding', outcome: 'Not quite — **Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body.', reveals: 'misconception-wearing-oversized-or-very' },
                { text: 'camouflaging through optical illusion', outcome: 'Not quite — **Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body.', reveals: 'misconception-wearing-oversized-or-very' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_006', title: 'Wardrobe Planning: Factors, Steps and Capsule Wardrobe Concept',
          caseStudy: { intro: 'Imagine you\'re packing for a 3-month internship in another city with only one suitcase — what do you take?',
            decisions: [{ prompt: 'Define "wardrobe planning" and list the five sequential steps in the process as per CBSE Class 12 Home Science curriculum.', options: [
                { text: 'Correct answer: Wardrobe planning is the systematic process of evaluating clothing needs', outcome: 'Correct answer: Wardrobe planning is the systematic process of evaluating clothing needs and.' },
                { text: 'shopping', outcome: 'Not quite — Students believe "wardrobe planning = making a shopping list" and "capsule wardrobe = owning 30.', reveals: 'wardrobe-planning-making-a-shopping' },
                { text: 'wardrobe planning = making a shopping list', outcome: 'Not quite — Students believe "wardrobe planning = making a shopping list" and "capsule wardrobe = owning 30.', reveals: 'wardrobe-planning-making-a-shopping' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Fabric and Apparel: Design · Part 1/2', spots: [
            { id: 's1', label: 'Elements of Design Line Shape Texture and Colour in Apparel', prompt: 'Which idea is this? — Elements of Design are the fundamental visual tools—colour, texture, line, shape/form.', answer: 'Elements of Design Line Shape Texture and Colour in Apparel', options: ['Elements of Design Line Shape Texture and Colour in Apparel', 'Colour Theory Colour Wheel Properties and Colour Schemes', 'Figure Types and Apparel Selection for Different Body Types', 'Wardrobe Planning Factors Steps and Capsule Wardrobe Concept'] },
            { id: 's2', label: 'Colour Theory Colour Wheel Properties and Colour Schemes', prompt: 'Which idea is this? — Colour theory is the systematic study of how colours interact, combine, and affect human.', answer: 'Colour Theory Colour Wheel Properties and Colour Schemes', options: ['Colour Theory Colour Wheel Properties and Colour Schemes', 'Elements of Design Line Shape Texture and Colour in Apparel', 'Figure Types and Apparel Selection for Different Body Types', 'Wardrobe Planning Factors Steps and Capsule Wardrobe Concept'] },
            { id: 's3', label: 'Figure Types and Apparel Selection for Different Body Types', prompt: 'Which idea is this? — Figure type classification categorizes human body shapes based on the relative.', answer: 'Figure Types and Apparel Selection for Different Body Types', options: ['Figure Types and Apparel Selection for Different Body Types', 'Elements of Design Line Shape Texture and Colour in Apparel', 'Colour Theory Colour Wheel Properties and Colour Schemes', 'Wardrobe Planning Factors Steps and Capsule Wardrobe Concept'] },
            { id: 's4', label: 'Wardrobe Planning Factors Steps and Capsule Wardrobe Concept', prompt: 'Which idea is this? — Wardrobe planning is a systematic process of assessing clothing needs, evaluating.', answer: 'Wardrobe Planning Factors Steps and Capsule Wardrobe Concept', options: ['Wardrobe Planning Factors Steps and Capsule Wardrobe Concept', 'Elements of Design Line Shape Texture and Colour in Apparel', 'Colour Theory Colour Wheel Properties and Colour Schemes', 'Figure Types and Apparel Selection for Different Body Types'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student designing costumes for a school play wants the short lead actor to \'look bigger on stage\' and reaches for a bold horizontally-striped fabric; the director wants the character to read as dignified and tall.',
            decisions: [{ prompt: 'What do the elements of design say to cut instead?', options: [
                { text: 'Vertical lines — they stress up-and-down movement, emphasise height and read severe, dignified, reserved; horizontal stripes create the illusion of width and a placid effect — the opposite of what the role and the actor need.', outcome: 'The chapter\'s line-effect map is the tool: line direction is chosen for the visual job — elongation, width or movement — not for what looks \'bold\' on the bolt.' },
                { text: 'Keep the horizontal stripes — bold pattern reads as presence from the back rows.', outcome: 'The chapter maps horizontal lines to width and stability — \'bigger\' sideways, not taller or more dignified; boldness of motif doesn\'t change the direction the eye travels.', reveals: 'bold-equals-tall' },
                { text: 'Use diagonal zigzags — movement reads as energy, which is bigger than height.', outcome: 'Diagonals signal motion and restlessness, not the stillness of dignity; the role\'s requirement is elongation plus reserve, which is vertical line\'s job — energy answers a different brief.', reveals: 'energy-equals-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now decode a garment as a sentence — and spot which element is doing the saying.',
            decisions: [{ prompt: 'What comes next? Fabric and Apparel: Design · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fabric and Apparel: Design · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_001', difficulty: 'standard',
          question: 'Apparel design is the creative and systematic process of conceiving, planning.',
          hint: 'Revisit c11_hs_cbse_09_001 and c11_hs_cbse_09_003; create a mind-map linking each.',
          misconception: 'Students often equate \'apparel design\' solely with fashion illustration or trend-following, ignoring the NCERT.',
          parts: [
                { id: 'a', prompt: 'You are designing a kurta for a summer music festival. The wearer wants to express "youthful energy" and "cultural rootedness." Choose ONE element of design.', answer: 'Element: Line',
                  options: ['Element: Line', 'bright red colour'],
                  hint: 'Revisit c11_hs_cbse_09_001 and c11_hs_cbse_09_003; create a mind-map linking each function to.',
                  misconception: 'Students often equate \'apparel design\' solely with fashion illustration or trend-following, ignoring the NCERT definition\'s core.' }
          ],
            remediations: { 'students-often-equate-apparel-design': { steps: ['Re-read NCERT Chapter 8 opening pages (pp.', '157-158) and highlight the exact definition sentence.', 'Create a two-column table: Structural vs Applied Design.', 'Fill with 3 fabric examples and 3 garment examples each from the text (e.g., ikat = structural, block print = applied).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_002', difficulty: 'standard',
          question: 'Elements of Design are the fundamental visual tools—colour, texture, line.',
          hint: 'Revisit c11_hs_cbse_05_009 (Fabric Production Methods) and c11_hs_cbse_05_010 (Textile.',
          misconception: 'Students often treat "colour" and "texture" as independent choices—e.g., "I’ll pick a red fabric and a rough.',
          parts: [
                { id: 'a', prompt: 'A designer wants to create a formal shirt that visually elongates a short torso. Which *type of line* should dominate the design, and why?', answer: 'Vertical lines should dominate',
                  options: ['Vertical lines should dominate', 'A student who answers', 'diagonal lines', 'create an illusion of width'],
                  hint: 'Revisit c11_hs_cbse_05_009 (Fabric Production Methods) and c11_hs_cbse_05_010 (Textile Finishing).',
                  misconception: 'Students often treat "colour" and "texture" as independent choices—e.g., "I’ll pick a red fabric and a rough texture"—without realising.' }
          ],
            remediations: { 'students-often-treat-colour-and': { steps: ['Re-read the NCERT sections "Colour in Fabric" (stages of dyeing) and "Texture" (five factors) side-by-side.', 'Take three fabric swatches of the *same hue* (e.g., red cotton, red silk, red velvet).', 'Write one sentence linking each difference to a specific texture factor (e.g., "Velvet’s napped finish traps light.', 'Attempt Diagnostic Question 3 again with this concrete evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_003', difficulty: 'standard',
          question: 'Principles of Design are the guiding rules that govern how the Elements.',
          hint: 'If unable to identify elements in a garment, revisit c12_hs_cbse_08_002 and practice.',
          misconception: 'Students often believe that "balance" only means formal (mirror-image) symmetry and that "proportion" is simply about.',
          parts: [
                { id: 'a', prompt: 'You are designing a salwar-kameez-dupatta set. The kameez has a curved neckline, curved hemline, and curved sleeve cuffs.', answer: 'No, harmony by shape is broken',
                  options: ['No, harmony by shape is broken', 'balance', 'proportion'],
                  hint: 'If unable to identify elements in a garment, revisit c12_hs_cbse_08_002 and practice.',
                  misconception: 'Students often believe that "balance" only means formal (mirror-image) symmetry and that "proportion" is simply about the garment fitting.' }
          ],
            remediations: { 'balance-only-means-formal-mirror': { steps: ['If a student cannot distinguish balance types or apply proportion ratios: 1) Revisit c12_hs_cbse_08_002 (Elements.', '2) Use a physical garment or sketch: fold it vertically to test formal balance; place a ruler at golden ratio points.', '3) Practice analysing three diverse garments (e.g., saree, shirt, lehenga) using a checklist: "Identify balance type →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "balance" only means formal (mirror-image) symmetry and that "proportion" is simply about.',
          parts: [
                { id: 'a', prompt: 'A designer uses a bright red embroidered motif on the hip area of a skirt for a client with wide hips.', answer: 'Inappropriate',
                  options: ['Inappropriate', 'red is attractive so it\'s good', 'balance', 'proportion'],
                  hint: 'If unable to identify elements in a garment, revisit c12_hs_cbse_08_002 and practice.',
                  misconception: 'Students often believe that "balance" only means formal (mirror-image) symmetry and that "proportion" is simply about the garment fitting.' }
          ],
            remediations: { 'balance-only-means-formal-mirror': { steps: ['If a student cannot distinguish balance types or apply proportion ratios: 1) Revisit c12_hs_cbse_08_002 (Elements.', '2) Use a physical garment or sketch: fold it vertically to test formal balance; place a ruler at golden ratio points.', '3) Practice analysing three diverse garments (e.g., saree, shirt, lehenga) using a checklist: "Identify balance type →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_004', difficulty: 'standard',
          question: 'Colour theory is the systematic study of how colours interact, combine, and.',
          hint: 'Revisit c12_hs_cbse_08_002 (Elements of Design) — specifically the "Colour" subsection.',
          misconception: 'Students believe "complementary colours always look good together" and use them in equal proportions at full intensity.',
          parts: [
                { id: 'a', prompt: 'Define the three dimensions of colour (hue, value, intensity) and give one fabric example for each dimension where changing only that dimension alters the.', answer: 'Hue is the colour name (e.g., red, blue-green) determined by wavelength',
                  options: ['Hue is the colour name (e.g., red, blue-green) determined by wavelength', 'tint adds black', 'complementary colours always look good together'],
                  hint: 'Revisit c12_hs_cbse_08_002 (Elements of Design) — specifically the "Colour" subsection — and.',
                  misconception: 'Students believe "complementary colours always look good together" and use them in equal proportions at full intensity (e.g., bright red.' },
                { id: 'b', prompt: 'A designer wants to create a salwar-kurta-dupatta set using a split-complementary scheme based on yellow-orange as the dominant hue.', answer: 'Split-complementary of yellow-orange (Y-O) uses Y-O + the two neighbours of its',
                  options: ['Split-complementary of yellow-orange (Y-O) uses Y-O + the two neighbours of its', 'complementary colours always look good together'],
                  hint: 'Revisit c12_hs_cbse_08_002 (Elements of Design) — specifically the "Colour" subsection — and.',
                  misconception: 'Students believe "complementary colours always look good together" and use them in equal proportions at full intensity (e.g., bright red.' }
          ],
            remediations: { 'complementary-colours-always-look-good': { steps: ['Have the student physically mix gouache — paint a pure red square, then add tiny green increments to see it dull.', 'Use the grey scale (Fig 11.2) to match values of red and green — they\'ll see "equal intensity ≠ equal value."', 'Re-do Diagnostic Q3 and Q5 with this tactile evidence.', 'Assign a 3-swatch exercise: create complementary, split-complementary, and triadic swatches for the same hue, each with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_005', difficulty: 'standard',
          question: 'Figure type classification categorizes human body shapes based on the relative.',
          hint: 'Revisit c12_hs_cbse_08_002 (line/texture/shape effects) and c12_hs_cbse_08_003.',
          misconception: '**Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body types." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'List the five standard figure types classified by shoulder-bust-waist-hip proportions and state the defining proportion characteristic of each.', answer: 'The five standard figure types are: (1) Hourglass',
                  options: ['The five standard figure types are: (1) Hourglass', 'hiding', 'camouflaging through optical illusion'],
                  hint: 'Revisit c12_hs_cbse_08_002 (line/texture/shape effects) and c12_hs_cbse_08_003.',
                  misconception: '**Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body types." **Why it\'s wrong:** Oversized garments.' },
                { id: 'b', prompt: 'A student suggests: "For a Rectangle figure type, wear a boxy, straight-cut shift dress in a single solid colour because it matches the body\'s straight lines.".', answer: 'The advice violates proportion',
                  options: ['The advice violates proportion', 'hiding', 'camouflaging through optical illusion'],
                  hint: 'Revisit c12_hs_cbse_08_002 (line/texture/shape effects) and c12_hs_cbse_08_003.',
                  misconception: '**Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body types." **Why it\'s wrong:** Oversized garments.' },
                { id: 'c', prompt: 'A client with a Triangle (Pear) figure type wants to wear a belted trench coat.', answer: '- Wide contrasting belt at waist: **Helps**',
                  options: ['- Wide contrasting belt at waist: **Helps**', 'hiding', 'camouflaging through optical illusion'],
                  hint: 'Revisit c12_hs_cbse_08_002 (line/texture/shape effects) and c12_hs_cbse_08_003.',
                  misconception: '**Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body types." **Why it\'s wrong:** Oversized garments.' },
                { id: 'd', prompt: 'Compare the use of **texture** for an Inverted Triangle figure versus a Round (Apple) figure.', answer: '- **Inverted Triangle**: Upper body',
                  options: ['- **Inverted Triangle**: Upper body', 'hiding', 'camouflaging through optical illusion'],
                  hint: 'Revisit c12_hs_cbse_08_002 (line/texture/shape effects) and c12_hs_cbse_08_003.',
                  misconception: '**Misconception:** "Wearing oversized or very loose clothing hides figure flaws for all body types." **Why it\'s wrong:** Oversized garments.' }
          ],
            remediations: { 'misconception-wearing-oversized-or-very': { steps: ['If the student holds the oversized-clothing misconception: 1.', '**Visual demonstration:** Show two photos of the same Rectangle figure — one in a boxy oversized shirt, one in a fitted.', 'Ask: "Where is the waist in each?', 'Which creates a 3:5:8 proportion?" 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_006', difficulty: 'standard',
          question: 'Wardrobe planning is a systematic process of assessing clothing needs.',
          hint: 'If stuck on gap identification: Revisit c11_hs_cbse_10_005 (Budget steps) and practice.',
          misconception: 'Students believe "wardrobe planning = making a shopping list" and "capsule wardrobe = owning 30 items." The exact.',
          parts: [
                { id: 'a', prompt: 'Priya (22, college student, Mumbai) has ₹8,000 budget for summer wardrobe update.', answer: 'Step 1 Audit: Keep 3 kurtas, 1 good jeans',
                  options: ['Step 1 Audit: Keep 3 kurtas, 1 good jeans', 'wardrobe planning = making a shopping list', 'capsule wardrobe = owning 30 items', 'capsule'],
                  hint: 'If stuck on gap identification: Revisit c11_hs_cbse_10_005 (Budget steps) and practice mapping.',
                  misconception: 'Students believe "wardrobe planning = making a shopping list" and "capsule wardrobe = owning 30 items." The exact error: They skip the.' }
          ],
            remediations: { 'wardrobe-planning-making-a-shopping': { steps: ['If student cannot create a functional capsule: 1) Revisit c12_hs_cbse_08_005 (Figure Types) — ensure they can match.', '2) Re-do the "Wardrobe Audit Worksheet" (NCERT Practical) with their actual clothes — physically handling items reveals.', '3) Practice the "3×3 Rule": Pick 3 tops, 3 bottoms from their closet; photograph all 9 combos; identify which pieces.', '4) Re-diagnostic: Give a new case study with deliberate "trap" items (e.g., sequin top, cargo shorts) and ask them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
