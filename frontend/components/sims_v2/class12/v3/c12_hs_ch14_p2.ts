import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch14_p2: SimDef = {
    id: 'v3_c12_hs_ch14_p2',
    title: 'Care and Maintenance of Fabrics · Part 2/2',
    subtitle: 'The spill was equal — the fibre decided',
    classLevel: 12, subject: 'home_science', topic: 'Care and Maintenance of Fabrics · Part 2/2',
    chapters: ['c12_hs_ch14'],
    nodeIds: ['c12_hs_cbse_14_007', 'c12_hs_cbse_14_008', 'c12_hs_cbse_14_009', 'c12_hs_cbse_14_010', 'c12_hs_cbse_14_011', 'c12_hs_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fabric-care scientist', intro: 'Why does one kurta stain for good and the other rinse clean? The answer is written in the fibre\'s chemistry.', goal: 'Link fibre structure to soiling and deterioration — and why washing can be the damage, not the cure.' },
    discovery: {
        question: 'The same turmeric-dal spill stains cotton deep and rinses off polyester. What makes one fibre hold the soil and the other shrug it off?',
        options: ['Structure — cotton\'s hydrophilic, amorphous regions pull water-borne soil in by capillary action; polyester\'s crystalline hydrophobic surface keeps it on top', 'Cotton is cheaper', 'Polyester is coated', 'Turmeric loves cotton'],
        answer: 'Structure — cotton\'s hydrophilic, amorphous regions pull water-borne soil in by capillary action; polyester\'s crystalline hydrophobic surface keeps it on top',
        hook: 'Washing isn\'t always rescue — hot alkaline water felts wool, chlorine bleach tenders cotton; laundering is controlled deterioration. And soil and decay team up: embedded grit abrades fibres like sandpaper while sweat\'s acids hydrolyse silk.',
    },
    teaching: [
        { title: 'Laundry Aids: Builders, Bleaches, Blues and Stiffening Agents', text: 'Laundry aids are supplementary chemical agents added during the washing process to enhance detergent performance, remove stubborn stains, counteract fabric yellowing, or impart desired physical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a stain like a chemist: classify soils by their nature, predict which fibre suffers most, and judge when the wash itself is the damage.',
        labels: ['Laundry Aids: Builders, Bleaches,', 'Washing Methods: Friction, Washing', 'Drying and Ironing: Methods,', 'Dry Cleaning: Solvents, Process', 'Fibre-Specific Laundering: Cotton, Linen,', 'Storage of Fabrics'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_007', title: 'Laundry Aids: Builders, Bleaches, Blues and Stiffening Agents',
          caseStudy: { intro: 'Imagine you\'re washing a white cotton kurta that has turned yellowish after multiple washes in hard water, and it also has a stubborn turmeric stain.',
            decisions: [{ prompt: 'Name the chemical category of laundry aid that functions by sequestering calcium and magnesium ions in hard water, and give one common.', options: [
                { text: 'Builder; sodium carbonate (washing soda) or sodium tripolyphosphate (STP)', outcome: 'Builder; sodium carbonate (washing soda) or sodium tripolyphosphate (STP).' },
                { text: 'bleach', outcome: 'Not quite — Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.', reveals: 'blue-and-bleach-both-whiten' },
                { text: 'reveals the student confuses the function', outcome: 'Not quite — Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.', reveals: 'blue-and-bleach-both-whiten' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_008', title: 'Washing Methods: Friction, Washing Machines and Special Techniques',
          caseStudy: { intro: 'Imagine you have three garments: a heavily soiled cotton kurta, a delicate silk saree, and a woolen sweater.',
            decisions: [{ prompt: 'Name the three broad categories of washing methods taught in Class 12 Home Science and give one example of a fabric suitable for each.', options: [
                { text: 'The three categories are: (1) Friction washing', outcome: 'The three categories are: (1) Friction washing — e.g., cotton kurta; (2) Machine washing — e.g.' },
                { text: 'dry cleaning', outcome: 'Not quite — Students often believe "more friction = cleaner clothes" and therefore use brush/beating on all.', reveals: 'more-friction-cleaner-clothes-and' },
                { text: 'more friction = cleaner clothes', outcome: 'Not quite — Students often believe "more friction = cleaner clothes" and therefore use brush/beating on all.', reveals: 'more-friction-cleaner-clothes-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_009', title: 'Drying and Ironing: Methods, Equipment and Temperature Control',
          caseStudy: { intro: 'Imagine you just washed a favourite silk kurta and a heavy cotton towel — both are dripping wet.',
            decisions: [{ prompt: 'A student reads "Do not tumble dry" on a wool sweater label and decides to spin-dry it at 1200 rpm in the washing machine instead.', options: [
                { text: 'No', outcome: 'No. Spin-drying at high rpm subjects wet wool fibres to centrifugal forces that stretch the.' },
                { text: 'no heat', outcome: 'Not quite — Students believe "high heat + steam = better ironing for everything" because steam irons advertise.', reveals: 'high-heat-steam-better-ironing' },
                { text: 'no mechanical stress', outcome: 'Not quite — Students believe "high heat + steam = better ironing for everything" because steam irons advertise.', reveals: 'high-heat-steam-better-ironing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_010', title: 'Dry Cleaning: Solvents, Process and Suitability for Different Fabrics',
          caseStudy: { intro: 'Imagine you own a pure silk saree with zari work and a structured wool blazer — both have "Dry Clean Only" labels. Why can\'t you just hand-wash them gently?',
            decisions: [{ prompt: 'A student reads "Dry Clean Only" on a garment label and assumes the process uses no liquid at all.', options: [
                { text: 'The misconception is that "dry" means absence of liquid', outcome: 'The misconception is that "dry" means absence of liquid. In reality, dry cleaning uses liquid.' },
                { text: 'rather than', outcome: 'Not quite — Students believe "dry cleaning" means the garment stays completely dry throughout the process.', reveals: 'dry-cleaning-means-the-garment' },
                { text: '"dry cleaning" means the garment stays completely dry throughout the process', outcome: 'Not quite — Students believe "dry cleaning" means the garment stays completely dry throughout the process.', reveals: 'dry-cleaning-means-the-garment' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_011', title: 'Fibre-Specific Laundering: Cotton, Linen, Wool, Silk and Synthetics',
          caseStudy: { intro: 'Imagine you have a laundry basket containing a white cotton kurta, a linen tablecloth, a wool sweater, a silk dupatta, and a polyester sports T-shirt — all.',
            decisions: [{ prompt: 'A student washes a wool sweater in hot water (60°C) with a regular alkaline detergent (pH 10.5) and agitates vigorously in a top-load.', options: [
                { text: 'Correct answer: (1) **Felting**', outcome: 'Correct answer: (1) **Felting** — Wool scales interlock under heat, moisture, and mechanical.' },
                { text: 'wool melts', outcome: 'Not quite — **Misconception:** "Natural fibres are always more delicate than synthetics, so synthetics can take.', reveals: 'misconception-natural-fibres-are-always' },
                { text: 'dye runs', outcome: 'Not quite — **Misconception:** "Natural fibres are always more delicate than synthetics, so synthetics can take.', reveals: 'misconception-natural-fibres-are-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_012', title: 'Storage of Fabrics and Apparel: Principles and Pest Control Measures',
          caseStudy: { intro: 'Imagine opening your winter woolens in November only to find irregular holes in your favourite pashmina shawl and a musty smell in your cotton kurtas — this.',
            decisions: [{ prompt: 'A student stores a silk saree folded in a polyethylene bag with naphthalene balls after wearing it once without washing.', options: [
                { text: 'Correct answer: (1) Storing soiled garment', outcome: 'Correct answer: (1) Storing soiled garment — body oils/perfume oxidise and attract pests (violates.' },
                { text: 'visibly clean', outcome: 'Not quite — Students believe "storage = packing clothes in a suitcase with mothballs" — treating it as a single.', reveals: 'storage-packing-clothes-in-a' },
                { text: 'worn once = clean enough', outcome: 'Not quite — Students believe "storage = packing clothes in a suitcase with mothballs" — treating it as a single.', reveals: 'storage-packing-clothes-in-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_14_008', title: 'Identify each idea',
          dissect: { specimen: 'Care and Maintenance of Fabrics · Part 2/2', spots: [
            { id: 's1', label: 'Laundry Aids Builders Bleaches Blues and Stiffening Agents', prompt: 'Which idea is this? — Laundry aids are supplementary chemical agents added during the washing process.', answer: 'Laundry Aids Builders Bleaches Blues and Stiffening Agents', options: ['Laundry Aids Builders Bleaches Blues and Stiffening Agents', 'Drying and Ironing Methods Equipment and Temperature Control'] },
            { id: 's2', label: 'Drying and Ironing Methods Equipment and Temperature Control', prompt: 'Which idea is this? — Drying and ironing are the final finishing stages of fabric care where wet textiles are.', answer: 'Drying and Ironing Methods Equipment and Temperature Control', options: ['Drying and Ironing Methods Equipment and Temperature Control', 'Laundry Aids Builders Bleaches Blues and Stiffening Agents'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In the hostel laundry room, a junior dunks a fresh blood-stained kurta in hot water and reaches for the chlorine bleach, saying \'heat and bleach kill stains.\' You stop him mid-pour.',
            decisions: [{ prompt: 'What\'s about to go wrong?', options: [
                { text: 'He\'d set it permanently — hot water coagulates the protein into insolubility and chlorine locks it in as a yellowish chloro-protein; a protein stain wants cold water first, then an enzymatic detergent, oxygen bleach only if needed.', outcome: 'The chapter\'s golden rule: identify the stain\'s chemistry before the agent — heat and chlorine are tools for other stain classes and fixers of this one.' },
                { text: 'Let him proceed — aggressive treatment beats timid treatment on any stain.', outcome: 'Aggression isn\'t a principle — matching is; the strongest move is the wrong move when the chemistry turns the stain permanent, which is exactly what heat and chlorine do to protein.', reveals: 'stronger-equals-better' },
                { text: 'Switch him to cold water but keep the chlorine — cold fixes the protein risk.', outcome: 'Half the fix: chlorine still forms the stable coloured complex on protein even cold; the sequence needs an enzyme to digest the protein, not an oxidiser to dye it.', reveals: 'cold-water-makes-bleach-safe' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_012', title: 'You made it',
          caseStudy: { intro: 'You can now see fabric care as materials science — where the wrong wash destroys faster than the dirt ever could.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_007', difficulty: 'standard',
          question: 'Laundry aids are supplementary chemical agents added during the washing process.',
          hint: 'If stuck, revisit the "scum formation" reaction in c12_hs_cbse_14_005 and the fibre.',
          misconception: 'Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.',
          parts: [
                { id: 'a', prompt: 'Name the chemical category of laundry aid that functions by sequestering calcium and magnesium ions in hard water, and give one common example used in Indian.', answer: 'Builder; sodium carbonate (washing soda) or sodium tripolyphosphate (STP)',
                  options: ['Builder; sodium carbonate (washing soda) or sodium tripolyphosphate (STP)', 'bleach', 'reveals the student confuses the function', '"blue" and "bleach" both whiten clothes, so they are interchangeable'],
                  hint: 'If stuck, revisit the "scum formation" reaction in c12_hs_cbse_14_005 and the fibre burning.',
                  misconception: 'Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.' },
                { id: 'b', prompt: 'Explain why chlorine bleach (sodium hypochlorite) must never be used on wool or silk, but oxygen bleach (hydrogen peroxide) can be used with caution.', answer: 'Chlorine bleach oxidises the disulfide bonds in keratin (protein fibre), causing',
                  options: ['Chlorine bleach oxidises the disulfide bonds in keratin (protein fibre), causing', 'chlorine is stronger', 'bleach', '"blue" and "bleach" both whiten clothes, so they are interchangeable'],
                  hint: 'If stuck, revisit the "scum formation" reaction in c12_hs_cbse_14_005 and the fibre burning.',
                  misconception: 'Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.' }
          ],
            remediations: { 'blue-and-bleach-both-whiten': { steps: ['Revisit the distinction between chemical stain removal (bleach) vs.', 'Review builder function by testing detergent foaming in hard vs. softened water (add sodium carbonate to one beaker).', 'Re-read the fibre-bleach compatibility table in node c12_hs_cbse_14_011 (fibre-specific care) to reinforce why protein.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.',
          parts: [
                { id: 'a', prompt: 'Design a laundry aid protocol for a hospital laundry washing white cotton patient gowns stained with blood (protein), iodine (colour), and washed in 300 ppm.', answer: 'Pre-soak: enzyme presoak (protease) at 40°C, pH 9–10 for blood',
                  options: ['Pre-soak: enzyme presoak (protease) at 40°C, pH 9–10 for blood', 'bleach', '"blue" and "bleach" both whiten clothes, so they are interchangeable'],
                  hint: 'If stuck, revisit the "scum formation" reaction in c12_hs_cbse_14_005 and the fibre burning.',
                  misconception: 'Students believe "blue" and "bleach" both whiten clothes, so they are interchangeable.' }
          ],
            remediations: { 'blue-and-bleach-both-whiten': { steps: ['Revisit the distinction between chemical stain removal (bleach) vs.', 'Review builder function by testing detergent foaming in hard vs. softened water (add sodium carbonate to one beaker).', 'Re-read the fibre-bleach compatibility table in node c12_hs_cbse_14_011 (fibre-specific care) to reinforce why protein.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_008', difficulty: 'standard',
          question: 'Washing methods refer to the mechanical techniques used to remove dirt and.',
          hint: 'Revisit Class 11 fibre property nodes (c11_hs_cbse_05_005, c11_hs_cbse_05_006.',
          misconception: 'Students often believe "more friction = cleaner clothes" and therefore use brush/beating on all fabrics or select the.',
          parts: [
                { id: 'a', prompt: 'Name the three broad categories of washing methods taught in Class 12 Home Science and give one example of a fabric suitable for each category.', answer: 'The three categories are: (1) Friction washing',
                  options: ['The three categories are: (1) Friction washing', 'dry cleaning', 'more friction = cleaner clothes'],
                  hint: 'Revisit Class 11 fibre property nodes (c11_hs_cbse_05_005, c11_hs_cbse_05_006, c11_hs_cbse_05_007).',
                  misconception: 'Students often believe "more friction = cleaner clothes" and therefore use brush/beating on all fabrics or select the longest, most.' },
                { id: 'b', prompt: 'A student wants to wash a moderately soiled polyester-cotton blend shirt in a fully automatic front-load washing machine.', answer: 'Choose the "synthetic" cycle',
                  options: ['Choose the "synthetic" cycle', 'cotton', 'more friction = cleaner clothes'],
                  hint: 'Revisit Class 11 fibre property nodes (c11_hs_cbse_05_005, c11_hs_cbse_05_006, c11_hs_cbse_05_007).',
                  misconception: 'Students often believe "more friction = cleaner clothes" and therefore use brush/beating on all fabrics or select the longest, most.' }
          ],
            remediations: { 'more-friction-cleaner-clothes-and': { steps: ['If a student insists on aggressive washing for delicate fabrics: (1) Show a felted wool swatch vs.', 'a properly kneaded one — ask them to stretch both and observe irreversible shrinkage.', '(2) Revisit Class 11 fibre properties (c11_hs_cbse_05_005, c11_hs_cbse_05_006) linking wool scales and silk filament.', '(3) Practice kneading-and-squeezing on a sample woolen swatch with the student, emphasizing "press, don\'t rub".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_009', difficulty: 'standard',
          question: 'Drying and ironing are the final finishing stages of fabric care where wet.',
          hint: 'If stuck, review c11_hs_cbse_05_005/006/007 fibre property tables and the "burning test".',
          misconception: 'Students believe "high heat + steam = better ironing for everything" because steam irons advertise "powerful steam.',
          parts: [
                { id: 'a', prompt: 'A cotton bedsheet is line-dried in direct sunlight until bone-dry, then ironed on "cotton" setting with heavy pressure.', answer: 'Error 1: Over-drying in direct UV sunlight causes photo-oxidative degradation of',
                  options: ['Error 1: Over-drying in direct UV sunlight causes photo-oxidative degradation of', 'high heat + steam = better ironing for everything', 'powerful steam removes tough wrinkles'],
                  hint: 'If stuck, review c11_hs_cbse_05_005/006/007 fibre property tables and the "burning test".',
                  misconception: 'Students believe "high heat + steam = better ironing for everything" because steam irons advertise "powerful steam removes tough wrinkles.".' },
                { id: 'b', prompt: 'Compare the heat-transfer mechanisms in (a) tumble drying and (b) steam ironing.', answer: 'Tumble drying uses forced convection (hot air ~60–70 °C)',
                  options: ['Tumble drying uses forced convection (hot air ~60–70 °C)', 'high heat + steam = better ironing for everything', 'powerful steam removes tough wrinkles'],
                  hint: 'If stuck, review c11_hs_cbse_05_005/006/007 fibre property tables and the "burning test".',
                  misconception: 'Students believe "high heat + steam = better ironing for everything" because steam irons advertise "powerful steam removes tough wrinkles.".' }
          ],
            remediations: { 'high-heat-steam-better-ironing': { steps: ['Revisit c11_hs_cbse_11_010 (Class 11 Drying Methods and Ironing) — re-read the fibre-specific temperature table and the.', 'Create a 3-column cheat sheet: Fibre | Max Iron Temp (°C) | Drying Method | Why?', '— fill from memory, then check against NCERT.', 'Do a tactile lab: iron swatches of cotton, polyester, wool, silk at 110, 150, 180, 200 °C; observe gloss, shrinkage.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_010', difficulty: 'standard',
          question: 'Dry cleaning is a fabric cleaning process that uses non-aqueous organic.',
          hint: 'Revisit c11_hs_cbse_05_006 (wool/silk protein structure) and c11_hs_cbse_05_007.',
          misconception: 'Students believe "dry cleaning" means the garment stays completely dry throughout the process.',
          parts: [
                { id: 'a', prompt: 'A student reads "Dry Clean Only" on a garment label and assumes the process uses no liquid at all.', answer: 'The misconception is that "dry" means absence of liquid',
                  options: ['The misconception is that "dry" means absence of liquid', 'rather than', '"dry cleaning" means the garment stays completely dry throughout the process'],
                  hint: 'Revisit c11_hs_cbse_05_006 (wool/silk protein structure) and c11_hs_cbse_05_007.',
                  misconception: 'Students believe "dry cleaning" means the garment stays completely dry throughout the process.' },
                { id: 'b', prompt: 'A customer brings a rayon challis dress with a grease stain and a "Dry Clean Only" label. The cleaner uses hydrocarbon solvent instead of perc.', answer: 'Yes, hydrocarbon solvent is appropriate',
                  options: ['Yes, hydrocarbon solvent is appropriate', 'always better', 'dry cleaning', '"dry cleaning" means the garment stays completely dry throughout the process'],
                  hint: 'Revisit c11_hs_cbse_05_006 (wool/silk protein structure) and c11_hs_cbse_05_007.',
                  misconception: 'Students believe "dry cleaning" means the garment stays completely dry throughout the process.' }
          ],
            remediations: { 'dry-cleaning-means-the-garment': { steps: ['If the student confuses "dry" with "no liquid," have them: (1) Revisit c11_hs_cbse_05_006 (wool properties) and.', '(2) Watch a 2-minute video of a dry cleaning machine cycle (wash → extract → dry) showing liquid solvent filling the.', '(3) Re-attempt Diagnostic Q1 and Q2.', 'If they still think perc is universal, have them research "perc damage to acetate" and "spandex degradation in perc".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_011', difficulty: 'standard',
          question: 'Fibre-specific laundering is the systematic application of tailored cleaning.',
          hint: 'If stuck, revisit **c11_hs_cbse_05_005, c11_hs_cbse_05_006, c11_hs_cbse_05_007** and make.',
          misconception: '**Misconception:** "Natural fibres are always more delicate than synthetics, so synthetics can take harsher treatment.".',
          parts: [
                { id: 'a', prompt: 'A student washes a wool sweater in hot water (60°C) with a regular alkaline detergent (pH 10.5) and agitates vigorously in a top-load machine.', answer: 'Correct answer: (1) **Felting**',
                  options: ['Correct answer: (1) **Felting**', 'wool melts', 'dye runs'],
                  hint: 'If stuck, revisit **c11_hs_cbse_05_005, c11_hs_cbse_05_006, c11_hs_cbse_05_007** and make.',
                  misconception: '**Misconception:** "Natural fibres are always more delicate than synthetics, so synthetics can take harsher treatment." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-natural-fibres-are-always': { steps: ['If the student holds the above misconception: (1) Revisit **c11_hs_cbse_05_005** (cellulosic fibre properties) and.', '(2) Revisit **c11_hs_cbse_05_007** (synthetic fibre properties) focusing on Tg/Tm and oleophilia.', '(3) Complete a **fibre-property-to-laundering-rule mapping table** (provided in remediation worksheet) for all five.', '(4) Re-attempt **Diagnostic Questions 2, 3, and 5** with the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_012', difficulty: 'standard',
          question: 'Storage of fabrics and apparel refers to the systematic practice of preserving.',
          hint: 'If stuck on fibre classification or pest ID: Revisit c11_hs_cbse_05_005 (cellulosic.',
          misconception: 'Students believe "storage = packing clothes in a suitcase with mothballs" — treating it as a single passive action.',
          parts: [
                { id: 'a', prompt: 'A student stores a silk saree folded in a polyethylene bag with naphthalene balls after wearing it once without washing.', answer: 'Correct answer: (1) Storing soiled garment',
                  options: ['Correct answer: (1) Storing soiled garment', 'visibly clean', 'worn once = clean enough', 'storage = packing clothes in a suitcase with mothballs'],
                  hint: 'If stuck on fibre classification or pest ID: Revisit c11_hs_cbse_05_005 (cellulosic fibres).',
                  misconception: 'Students believe "storage = packing clothes in a suitcase with mothballs" — treating it as a single passive action.' },
                { id: 'b', prompt: 'Explain why wool garments require more rigorous pre-storage cleaning than cotton garments, referencing the chemical nature of wool fibres and pest feeding.', answer: 'Correct answer: Wool is protein (keratin)',
                  options: ['Correct answer: Wool is protein (keratin)', 'wool is delicate', 'wool shrinks', 'storage = packing clothes in a suitcase with mothballs'],
                  hint: 'If stuck on fibre classification or pest ID: Revisit c11_hs_cbse_05_005 (cellulosic fibres).',
                  misconception: 'Students believe "storage = packing clothes in a suitcase with mothballs" — treating it as a single passive action.' },
                { id: 'c', prompt: 'A family stores winter woolens in a steel trunk with paradichlorobenzene (PDB) crystals sprinkled directly on garments.', answer: 'Correct predictions: (1) PDB sublimation rate doubles every 10°C rise',
                  options: ['Correct predictions: (1) PDB sublimation rate doubles every 10°C rise', 'PDB evaporates', 'magic powder', 'storage = packing clothes in a suitcase with mothballs'],
                  hint: 'If stuck on fibre classification or pest ID: Revisit c11_hs_cbse_05_005 (cellulosic fibres).',
                  misconception: 'Students believe "storage = packing clothes in a suitcase with mothballs" — treating it as a single passive action.' }
          ],
            remediations: { 'storage-packing-clothes-in-a': { steps: ['If student exhibits the "passive packing" misconception: Step 1 — Show side-by-side photos: wool sweater stored.', 'Step 2 — Have student list 5 differences in condition using terminology: "oxidised protein stains", "fibre.', 'Step 3 — Assign re-do of Diagnostic Question 3 (attic scenario) requiring mechanism-based predictions.', 'Step 4 — Revisit c12_hs_cbse_14_011 (fibre-specific laundering) to reinforce that storage preparation IS the first.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
