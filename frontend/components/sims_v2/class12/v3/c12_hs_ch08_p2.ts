import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch08_p2: SimDef = {
    id: 'v3_c12_hs_ch08_p2',
    title: 'Fabric and Apparel: Design · Part 2/2',
    subtitle: 'Perfectly balanced — and still a failure',
    classLevel: 12, subject: 'home_science', topic: 'Fabric and Apparel: Design · Part 2/2',
    chapters: ['c12_hs_ch08'],
    nodeIds: ['c12_hs_cbse_08_007', 'c12_hs_cbse_08_008', 'c12_hs_cbse_08_009', 'c12_hs_cbse_08_010', 'c12_hs_cbse_08_011', 'c12_hs_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Apparel designer', intro: 'You reach for the kurta that feels like \'you\' — a designer planned that feeling years before you wore it.', goal: 'Use the elements and principles of design to read clothing as deliberate self-expression.' },
    discovery: {
        question: 'A perfectly symmetrical dress still fails in the market — its equal halves make the wearer look shorter and wider. What did the designer get wrong?',
        options: ['Proportion — balance was fine but the 1:1 part-to-whole ratio flattened the silhouette; harmony needs both principles working', 'The fabric was bad', 'Symmetry always works', 'Customers are picky'],
        answer: 'Proportion — balance was fine but the 1:1 part-to-whole ratio flattened the silhouette; harmony needs both principles working',
        hook: 'Every garment is a designed message — colour, texture, line and shape are the vocabulary; structural versus applied design is whether the message is woven in or printed on. \'Self-expression is superficial\' forgets that bandhani and brocade always signalled region and status.',
    },
    teaching: [
        { title: 'Apparel for Different Occasions: Casual, Formal and Occupational Dressing', text: 'Apparel for different occasions refers to the systematic selection and coordination of clothing based on the specific social, professional, or cultural context (casual, formal, occupational).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read clothes as communication: pick one design element to say \'youthful yet rooted,\' split structural from applied choices, and find the principle whose failure kills an otherwise balanced design.',
        labels: ['Apparel for Different Occasions', 'Traditional Indian Costumes: Regional', 'Fashion: Definition, Components', 'Fashion Forecasting and Trend', 'Pattern Making: Basic Methods', 'Apparel Construction: Cutting, Stitching'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_007', title: 'Apparel for Different Occasions: Casual, Formal and Occupational Dressing',
          caseStudy: { intro: 'Imagine you\'re invited to a cousin\'s daytime mehendi ceremony (semi-formal), have a job interview at a multinational company (formal occupational), and need.',
            decisions: [{ prompt: 'A student is asked to define "occupational dressing" in the context of apparel design.', options: [
                { text: 'The student\'s answer is incomplete', outcome: 'The student\'s answer is incomplete. Occupational dressing includes uniforms but also encompasses.' },
                { text: 'uniform-only', outcome: 'Not quite — Students equate "occasion dressing" with "buying specific outfits for each event" rather than.', reveals: 'students-equate-occasion-dressing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_008', title: 'Traditional Indian Costumes: Regional and Cultural Significance',
          caseStudy: { intro: 'Imagine you are designing a cultural exhibition where each display must communicate the story of a community through its clothing.',
            decisions: [{ prompt: 'Name three traditional Indian costumes from three different states and state the primary fabric used for each.', options: [
                { text: 'Correct answer: e.g., Kasavu saree (Kerala) – cotton', outcome: 'Correct answer: e.g., Kasavu saree (Kerala) – cotton; Phiran (Jammu & Kashmir) – wool; Mekhela.' },
                { text: 'the same garment', outcome: 'Not quite — Students often treat all sarees as "the same garment" and fail to distinguish between regional.', reveals: 'students-often-treat-all-sarees' },
                { text: 'Phiran is made of cotton', outcome: 'Not quite — Students often treat all sarees as "the same garment" and fail to distinguish between regional.', reveals: 'students-often-treat-all-sarees' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_009', title: 'Fashion: Definition, Components and Fashion Cycle',
          caseStudy: { intro: 'Imagine you bought a pair of wide-leg trousers last year because everyone was wearing them, but this year stores only stock skinny jeans.',
            decisions: [{ prompt: 'Define fashion in one sentence using the four components: style, change, acceptance, and taste.', options: [
                { text: '**Correct answer:** Fashion is a currently accepted style characterized by continuous', outcome: '**Correct answer:** Fashion is a currently accepted style characterized by continuous change.' },
                { text: 'Fashion is what is popular', outcome: 'Not quite — Students often believe **"fashion cycle = trend life span"** and treat the cycle as.', reveals: 'fashion-cycle-trend-life-span' },
                { text: 'Fashion is clothing trends', outcome: 'Not quite — Students often believe **"fashion cycle = trend life span"** and treat the cycle as.', reveals: 'fashion-cycle-trend-life-span' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_010', title: 'Fashion Forecasting and Trend Analysis',
          caseStudy: { intro: 'Imagine you are a fashion designer tasked with creating a collection for the upcoming festive season in India — but you must finalise designs *today* for.',
            decisions: [{ prompt: 'Define fashion forecasting and state the typical lead time between forecast development and retail availability for a seasonal collection.', options: [
                { text: 'Fashion forecasting is the systematic prediction of future trends in colours, fabrics,', outcome: 'Fashion forecasting is the systematic prediction of future trends in colours, fabrics, silhouettes.' },
                { text: 'forecasting is guessing what will be popular next week', outcome: 'Not quite — Students equate fashion forecasting with "following influencers" or "copying runway looks." They.', reveals: 'students-equate-fashion-forecasting-with' },
                { text: 'lead time is 1–2 months', outcome: 'Not quite — Students equate fashion forecasting with "following influencers" or "copying runway looks." They.', reveals: 'students-equate-fashion-forecasting-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_011', title: 'Pattern Making: Basic Methods and Pattern Drafting Principles',
          caseStudy: { intro: 'Imagine you want to stitch a perfectly fitted kurta for a family wedding.',
            decisions: [{ prompt: 'What are the two primary methods of pattern making used in garment construction, and how does each method begin?', options: [
                { text: 'The two primary methods are **flat pattern drafting** and **draping**', outcome: 'The two primary methods are **flat pattern drafting** and **draping**.' },
                { text: 'cutting and sewing', outcome: 'Not quite — Students often believe that **the basic block (sloper) *is* the final pattern for a specific.', reveals: 'the-basic-block-sloper-is' },
                { text: 'tracing a ready-made pattern', outcome: 'Not quite — Students often believe that **the basic block (sloper) *is* the final pattern for a specific.', reveals: 'the-basic-block-sloper-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_08_012', title: 'Apparel Construction: Cutting, Stitching and Finishing Techniques',
          scaffold: { problem: 'Calculate the fabric length required (in metres) to cut a straight kurta (front, back, two sleeves) from 112 cm wide cotton fabric.',
            steps: [
            { text: 'Determine total length needed on fabric lengthwise. Front and back can be placed side-by-side if combined width ≤.' },
            { text: 'Layout: Place front and back along length, then sleeves below them.' },
            { text: 'Add seam allowances: Already included in pattern piece dimensions (given widths include seam allowance).' },
            { text: 'Add shrinkage allowance: 5% of 125 cm = 6.25 cm. Total length = 125 + 6.25 = 131.25 cm.' },
            { text: 'Convert to metres and round up to nearest 10 cm for purchase: 1.3125 m → buy 1.4 m (or 1.5 m for safety).', faded: true, blankAnswer: '1.4 metres (minimum), recommend purchasing 1.5 metres.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Fabric and Apparel: Design · Part 2/2', spots: [
            { id: 's1', label: 'Fashion Definition Components and Fashion Cycle', prompt: 'Which idea is this? — Fashion is a style of clothing, accessories, or behaviour that is widely accepted and.', answer: 'Fashion Definition Components and Fashion Cycle', options: ['Fashion Definition Components and Fashion Cycle', 'Fashion Forecasting and Trend Analysis', 'Pattern Making Basic Methods and Pattern Drafting Principles'] },
            { id: 's2', label: 'Fashion Forecasting and Trend Analysis', prompt: 'Which idea is this? — Fashion forecasting is the systematic process of predicting upcoming trends in colours.', answer: 'Fashion Forecasting and Trend Analysis', options: ['Fashion Forecasting and Trend Analysis', 'Fashion Definition Components and Fashion Cycle', 'Pattern Making Basic Methods and Pattern Drafting Principles'] },
            { id: 's3', label: 'Pattern Making Basic Methods and Pattern Drafting Principles', prompt: 'Which idea is this? — Pattern making is the systematic process of creating a two-dimensional paper template.', answer: 'Pattern Making Basic Methods and Pattern Drafting Principles', options: ['Pattern Making Basic Methods and Pattern Drafting Principles', 'Fashion Definition Components and Fashion Cycle', 'Fashion Forecasting and Trend Analysis'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student designing costumes for a school play wants the short lead actor to \'look bigger on stage\' and reaches for a bold horizontally-striped fabric; the director wants the character to read as dignified and tall.',
            decisions: [{ prompt: 'What do the elements of design say to cut instead?', options: [
                { text: 'Vertical lines — they stress up-and-down movement, emphasise height and read severe, dignified, reserved; horizontal stripes create the illusion of width and a placid effect — the opposite of what the role and the actor need.', outcome: 'The chapter\'s line-effect map is the tool: line direction is chosen for the visual job — elongation, width or movement — not for what looks \'bold\' on the bolt.' },
                { text: 'Keep the horizontal stripes — bold pattern reads as presence from the back rows.', outcome: 'The chapter maps horizontal lines to width and stability — \'bigger\' sideways, not taller or more dignified; boldness of motif doesn\'t change the direction the eye travels.', reveals: 'bold-equals-tall' },
                { text: 'Use diagonal zigzags — movement reads as energy, which is bigger than height.', outcome: 'Diagonals signal motion and restlessness, not the stillness of dignity; the role\'s requirement is elongation plus reserve, which is vertical line\'s job — energy answers a different brief.', reveals: 'energy-equals-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_08_012', title: 'You made it',
          caseStudy: { intro: 'You can now decode a garment as a sentence — and spot which element is doing the saying.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_007', difficulty: 'standard',
          question: 'Apparel for different occasions refers to the systematic selection and.',
          hint: 'Revisit c12_hs_cbse_08_003 (Principles of Design) — practice analysing 5 magazine outfit.',
          misconception: 'Students equate "occasion dressing" with "buying specific outfits for each event" rather than "applying design.',
          parts: [
                { id: 'a', prompt: 'A student is asked to define "occupational dressing" in the context of apparel design.', answer: 'The student\'s answer is incomplete',
                  options: ['The student\'s answer is incomplete', 'uniform-only'],
                  hint: 'Revisit c12_hs_cbse_08_003 (Principles of Design) — practice analysing 5 magazine outfit photos for.',
                  misconception: 'Students equate "occasion dressing" with "buying specific outfits for each event" rather than "applying design principles to select from.' },
                { id: 'b', prompt: 'Compare and contrast the role of "texture" in casual vs. formal occupational dressing.', answer: 'Casual: Texture prioritises comfort, ease, approachability',
                  options: ['Casual: Texture prioritises comfort, ease, approachability', 'cotton for both'],
                  hint: 'Revisit c12_hs_cbse_08_003 (Principles of Design) — practice analysing 5 magazine outfit photos for.',
                  misconception: 'Students equate "occasion dressing" with "buying specific outfits for each event" rather than "applying design principles to select from.' }
          ],
            remediations: { 'students-equate-occasion-dressing-with': { steps: ['Have the student pick any three garments from their wardrobe.', 'For each, identify: (a) dominant design element (colour hue/value/intensity, texture, line direction, shape), (b) one.', 'Give a new scenario (e.g., "college farewell party") and ask them to recombine the three pieces + one accessory.', 'If they cannot articulate the WHY, revisit node c12_hs_cbse_08_003 (Principles of Design) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_008', difficulty: 'standard',
          question: 'Traditional Indian costumes are region-specific garments that embody the.',
          hint: 'If stuck, revisit the "Elements of Design" and "Principles of Design" nodes.',
          misconception: 'Students often treat all sarees as "the same garment" and fail to distinguish between regional variants (e.g.',
          parts: [
                { id: 'a', prompt: 'Name three traditional Indian costumes from three different states and state the primary fabric used for each.', answer: 'Correct answer: e.g., Kasavu saree (Kerala) – cotton',
                  options: ['Correct answer: e.g., Kasavu saree (Kerala) – cotton', 'the same garment', 'Phiran is made of cotton', 'lists only sarees without regional distinction or confuses fabrics (e'],
                  hint: 'If stuck, revisit the "Elements of Design" and "Principles of Design" nodes (c12_hs_cbse_08_002.',
                  misconception: 'Students often treat all sarees as "the same garment" and fail to distinguish between regional variants (e.g., confusing Banarasi brocade.' }
          ],
            remediations: { 'students-often-treat-all-sarees': { steps: ['Revisit c12_hs_cbse_08_002 (Elements of Design) and c12_hs_cbse_08_003 (Principles of Design) to refresh how line.', 'Create a comparison table for 5 saree variants with columns: Region, Fabric, Weaving Technique, Motif, Occasion, Color.', 'Practice identifying costumes from close-up fabric swatch images (use museum websites or Craft Atlas).', 'Re-attempt Diagnostic Question 4 and 6 after the table exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_009', difficulty: 'standard',
          question: 'Fashion is a style of clothing, accessories, or behaviour that is widely.',
          hint: 'Revisit c11_hs_cbse_09_003 (Factors Affecting Clothing Selection: Fashion and Income) and.',
          misconception: 'Students often believe **"fashion cycle = trend life span"** and treat the cycle as a fixed-duration timer (e.g.',
          parts: [
                { id: 'a', prompt: 'A student says: "Bell-bottom jeans were a fashion in the 1970s, disappeared, and returned in the 2000s.', answer: '**Correct answer:** The fashion cycle does not reverse',
                  options: ['**Correct answer:** The fashion cycle does not reverse', 'reversed', 'went backward', 'fashion cycle = trend life span'],
                  hint: 'Revisit c11_hs_cbse_09_003 (Factors Affecting Clothing Selection: Fashion and Income) and identify.',
                  misconception: 'Students often believe **"fashion cycle = trend life span"** and treat the cycle as a fixed-duration timer (e.g., "every trend lasts 1.' },
                { id: 'b', prompt: 'A new silhouette — "balloon sleeves" — appears on three major designer runways.', answer: '**Correct answer:** - Time 1 (runways only): **Introduction**',
                  options: ['**Correct answer:** - Time 1 (runways only): **Introduction**', 'because', 'they confuse *visibility* with *saturation*', '** and treat the cycle as a fixed-duration timer (e.g'],
                  hint: 'Revisit c11_hs_cbse_09_003 (Factors Affecting Clothing Selection: Fashion and Income) and identify.',
                  misconception: 'Students often believe **"fashion cycle = trend life span"** and treat the cycle as a fixed-duration timer (e.g., "every trend lasts 1.' }
          ],
            remediations: { 'fashion-cycle-trend-life-span': { steps: ['**Revisit the definition**: Have the student write the four components (style, change, acceptance, taste) on flashcards.', '**Re-draw the cycle from memory** without labels, then add stage names and *one market indicator* per stage (e.g., Rise.', '**Do a "trend autopsy"**: Pick a dead trend (e.g., low-rise jeans 2000s) and map its actual history onto the cycle.', '**Re-diagnostic**: Ask the student to explain why a current trend (e.g., "chunky sneakers") is at Rise vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"fashion cycle = trend life span"** and treat the cycle as a fixed-duration timer (e.g.',
          parts: [
                { id: 'a', prompt: 'A retailer argues: "Since the fashion cycle is predictable, we can exactly time our markdowns at the Decline stage to maximize profit." Evaluate this claim.', answer: '**Correct answer:** The claim is **overconfident**',
                  options: ['**Correct answer:** The claim is **overconfident**', 'yes, the cycle is a fixed calendar', 'fashion cycle = trend life span', 'every trend lasts 1 year'],
                  hint: 'Revisit c11_hs_cbse_09_003 (Factors Affecting Clothing Selection: Fashion and Income) and identify.',
                  misconception: 'Students often believe **"fashion cycle = trend life span"** and treat the cycle as a fixed-duration timer (e.g., "every trend lasts 1.' },
                { id: 'b', prompt: 'Create a labelled sketch of the fashion cycle for a hypothetical trend: "Transparent handbags." Annotate the curve with: (a) the stage where knock-offs appear.', answer: '**Expected answer:** A bell-shaped curve with five labelled stages',
                  options: ['**Expected answer:** A bell-shaped curve with five labelled stages', 'fashion cycle = trend life span', 'every trend lasts 1 year'],
                  hint: 'Revisit c11_hs_cbse_09_003 (Factors Affecting Clothing Selection: Fashion and Income) and identify.',
                  misconception: 'Students often believe **"fashion cycle = trend life span"** and treat the cycle as a fixed-duration timer (e.g., "every trend lasts 1.' }
          ],
            remediations: { 'fashion-cycle-trend-life-span': { steps: ['**Revisit the definition**: Have the student write the four components (style, change, acceptance, taste) on flashcards.', '**Re-draw the cycle from memory** without labels, then add stage names and *one market indicator* per stage (e.g., Rise.', '**Do a "trend autopsy"**: Pick a dead trend (e.g., low-rise jeans 2000s) and map its actual history onto the cycle.', '**Re-diagnostic**: Ask the student to explain why a current trend (e.g., "chunky sneakers") is at Rise vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_010', difficulty: 'standard',
          question: 'Fashion forecasting is the systematic process of predicting upcoming trends.',
          hint: 'If unable to stage a trend, revisit c12_hs_cbse_08_009 and practice with 10 real Indian.',
          misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting.',
          parts: [
                { id: 'a', prompt: 'Compare the fashion adoption curve (trickle-down, trickle-up, trickle-across) with the technology adoption lifecycle (innovators, early adopters, early.', answer: '**Mapping**: Trickle-down = designer labels adopt banana fibre denim first',
                  options: ['**Mapping**: Trickle-down = designer labels adopt banana fibre denim first', 'Indian context application', 'forecasters look at Instagram to see what\'s trending'],
                  hint: 'If unable to stage a trend, revisit c12_hs_cbse_08_009 and practice with 10 real Indian market.',
                  misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is about *identifying*.' }
          ],
            remediations: { 'students-equate-fashion-forecasting-with': { steps: ['Revisit **c12_hs_cbse_08_009 (Fashion Cycle)** — map 5 Indian trends (e.g., chikankari revival, neon ethnic wear.', 'Study **Pantone Fashion Color Trend Report** (any recent season) — note how they justify each colour with *cultural.', 'Practice: Take a newspaper\'s "Year in Review" cultural section — extract 3 non-fashion signals (e.g., "rise in solo.', 'Re-attempt Diagnostic Question 6 with this structured approach.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_011', difficulty: 'standard',
          question: 'Pattern making is the systematic process of creating a two-dimensional paper.',
          hint: 'If stuck on measurement landmarks, review **c11_hs_cbse_09_011** (Clothing Requirements.',
          misconception: 'Students often believe that **the basic block (sloper) *is* the final pattern for a specific garment**.',
          parts: [
                { id: 'a', prompt: 'What are the two primary methods of pattern making used in garment construction, and how does each method begin?', answer: 'The two primary methods are **flat pattern drafting** and **draping**',
                  options: ['The two primary methods are **flat pattern drafting** and **draping**', 'cutting and sewing', 'tracing a ready-made pattern', 'for comfort'],
                  hint: 'If stuck on measurement landmarks, review **c11_hs_cbse_09_011** (Clothing Requirements.',
                  misconception: 'Students often believe that **the basic block (sloper) *is* the final pattern for a specific garment**.' },
                { id: 'b', prompt: 'A student has the following body measurements: Bust = 90 cm, Waist = 72 cm, Hip = 96 cm.', answer: '**Step 1:** Identify body measurements: Bust = 90 cm, Waist = 72 cm, Hip = 96 cm',
                  options: ['**Step 1:** Identify body measurements: Bust = 90 cm, Waist = 72 cm, Hip = 96 cm', 'for comfort', '**the basic block (sloper) *is* the final pattern for a specific garment**'],
                  hint: 'If stuck on measurement landmarks, review **c11_hs_cbse_09_011** (Clothing Requirements.',
                  misconception: 'Students often believe that **the basic block (sloper) *is* the final pattern for a specific garment**.' },
                { id: 'c', prompt: 'Compare flat pattern drafting and draping in terms of (a) accuracy for symmetrical designs, (b) speed for creating multiple sizes, and (c) suitability for.', answer: 'accuracy for symmetrical designs, (',
                  options: ['accuracy for symmetrical designs, (', 'for comfort', '**the basic block (sloper) *is* the final pattern for a specific garment**'],
                  hint: 'If stuck on measurement landmarks, review **c11_hs_cbse_09_011** (Clothing Requirements.',
                  misconception: 'Students often believe that **the basic block (sloper) *is* the final pattern for a specific garment**.' }
          ],
            remediations: { 'the-basic-block-sloper-is': { steps: ['If a student cannot draft the basic block or manipulate darts correctly: 1.', '**Revisit body measurements:** Practice taking bust, waist, hip, shoulder, and armhole depth on a partner using the.', '**Re-draft a rectangle:** Draw a rectangle of ¼ pattern bust width × back nape-to-waist length.', 'Verify that the student understands the *origin* of each horizontal line (across chest, bust, waist).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_012', difficulty: 'standard',
          question: 'Apparel construction is the systematic process of transforming flat pattern.',
          hint: 'If stuck on grain alignment or stitch selection, revisit c11_hs_cbse_05_009 (fabric.',
          misconception: 'Students often believe that "any sharp scissors can cut fabric" and use paper scissors, which dull quickly and cause.',
          parts: [
                { id: 'a', prompt: 'You are constructing a silk blouse with a curved neckline. Which seam finish would you choose and why? Provide the steps to execute it.', answer: 'Correct answer: French seam',
                  options: ['Correct answer: French seam', 'zigzag stitch', 'pinking shears', 'any sharp scissors can cut fabric'],
                  hint: 'If stuck on grain alignment or stitch selection, revisit c11_hs_cbse_05_009 (fabric construction).',
                  misconception: 'Students often believe that "any sharp scissors can cut fabric" and use paper scissors, which dull quickly and cause frayed edges.' }
          ],
            remediations: { 'any-sharp-scissors-can-cut': { steps: ['Have the student cut a 10 cm square of cotton, silk, and denim using paper scissors, then fabric shears; compare edge.', 'Revisit c11_hs_cbse_05_005 and c11_hs_cbse_05_006 to link fibre properties to cutting/stitching choices.', 'Practice seam allowance variations on scraps: sew 6 mm, 1 cm, 1.5 cm seams on cotton and denim, press, and evaluate.', 'Re-diagnostic: Ask the student to choose seam finish for a chiffon scarf vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
