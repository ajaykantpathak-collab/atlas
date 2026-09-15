import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch14_p1: SimDef = {
    id: 'v3_c12_hs_ch14_p1',
    title: 'Care and Maintenance of Fabrics · Part 1/2',
    subtitle: 'The spill was equal — the fibre decided',
    classLevel: 12, subject: 'home_science', topic: 'Care and Maintenance of Fabrics · Part 1/2',
    chapters: ['c12_hs_ch14'],
    nodeIds: ['c12_hs_cbse_14_001', 'c12_hs_cbse_14_002', 'c12_hs_cbse_14_003', 'c12_hs_cbse_14_004', 'c12_hs_cbse_14_005', 'c12_hs_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fabric-care scientist', intro: 'Why does one kurta stain for good and the other rinse clean? The answer is written in the fibre\'s chemistry.', goal: 'Link fibre structure to soiling and deterioration — and why washing can be the damage, not the cure.' },
    discovery: {
        question: 'The same turmeric-dal spill stains cotton deep and rinses off polyester. What makes one fibre hold the soil and the other shrug it off?',
        options: ['Structure — cotton\'s hydrophilic, amorphous regions pull water-borne soil in by capillary action; polyester\'s crystalline hydrophobic surface keeps it on top', 'Cotton is cheaper', 'Polyester is coated', 'Turmeric loves cotton'],
        answer: 'Structure — cotton\'s hydrophilic, amorphous regions pull water-borne soil in by capillary action; polyester\'s crystalline hydrophobic surface keeps it on top',
        hook: 'Washing isn\'t always rescue — hot alkaline water felts wool, chlorine bleach tenders cotton; laundering is controlled deterioration. And soil and decay team up: embedded grit abrades fibres like sandpaper while sweat\'s acids hydrolyse silk.',
    },
    teaching: [
        { title: 'Need for Fabric Care: Factors Affecting Fabric Soiling and Deterioration', text: 'Fabric soiling refers to the deposition of foreign matter (particulate, oily, or combined) on fabric surfaces during use, while fabric deterioration is the progressive, irreversible degradation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a stain like a chemist: classify soils by their nature, predict which fibre suffers most, and judge when the wash itself is the damage.',
        labels: ['Need for Fabric Care', 'Stains: Classification and General', 'Common Stains and Specific', 'Laundry Process: Sorting, Steeping,', 'Water for Laundering: Hardness,', 'Soaps and Detergents: Chemistry,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_001', title: 'Need for Fabric Care: Factors Affecting Fabric Soiling and Deterioration',
          caseStudy: { intro: 'Imagine you spill turmeric-laden dal on a cotton kurta and a polyester shirt — why does the cotton stain deeper and faster?',
            decisions: [{ prompt: 'List four distinct sources of fabric soiling in a typical Indian household and classify each as particulate, oily, or combination soil.', options: [
                { text: 'Correct answer: (1) Road dust / construction dust', outcome: 'Correct answer: (1) Road dust / construction dust — particulate; (2) Cooking oil splatter / ghee.' },
                { text: 'stains', outcome: 'Not quite — Students believe "soiling is only surface dirt that washes off" and "deterioration happens only.', reveals: 'soiling-is-only-surface-dirt' },
                { text: 'soiling is only surface dirt that washes off', outcome: 'Not quite — Students believe "soiling is only surface dirt that washes off" and "deterioration happens only.', reveals: 'soiling-is-only-surface-dirt' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_002', title: 'Stains: Classification and General Principles of Stain Removal',
          caseStudy: { intro: 'Imagine you spill turmeric-laden curry on a silk kurta and a cotton shirt simultaneously. Why does the same stain require different first-aid on each fabric?',
            decisions: [{ prompt: 'A student treats a fresh blood stain on cotton with hot water and chlorine bleach. The stain sets permanently.', options: [
                { text: 'Violations: (1) Using hot water on a protein stain coagulates the protein, making it', outcome: 'Violations: (1) Using hot water on a protein stain coagulates the protein, making it insoluble and.' },
                { text: 'bleach removes stains', outcome: 'Not quite — Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol".', reveals: 'stain-type-removal-method-as' },
                { text: 'stain type = removal method', outcome: 'Not quite — Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol".', reveals: 'stain-type-removal-method-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_003', title: 'Common Stains and Specific Removal Methods for Each Type',
          caseStudy: { intro: 'Imagine you spill turmeric-laden curry on a white cotton kurta and a silk dupatta simultaneously.',
            decisions: [{ prompt: 'Name the single most effective first-aid step for a fresh blood stain on wool and explain why hot water must be avoided.', options: [
                { text: 'Correct: Flush immediately with cold water, then apply a neutral-pH enzymatic detergent', outcome: 'Correct: Flush immediately with cold water, then apply a neutral-pH enzymatic detergent.' },
                { text: 'soak in hot soapy water', outcome: 'Not quite — Students think "bleach removes all coloured stains" and use chlorine bleach on coloured cotton.', reveals: 'bleach-removes-all-coloured-stains' },
                { text: 'bleach removes all coloured stains', outcome: 'Not quite — Students think "bleach removes all coloured stains" and use chlorine bleach on coloured cotton.', reveals: 'bleach-removes-all-coloured-stains' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_004', title: 'Laundry Process: Sorting, Steeping, Washing and Finishing Stages',
          caseStudy: { intro: 'Imagine you have a laundry basket containing a white cotton kurta with turmeric stains, a dark blue denim jeans, a red silk dupatta, and a woolen sweater—all.',
            decisions: [{ prompt: 'A student sorts laundry into two piles: "whites" and "colors." They wash the white cotton bedsheets at 60°C with detergent and the colored.', options: [
                { text: 'The student ignored fibre type and fabric construction', outcome: 'The student ignored fibre type and fabric construction. Cotton tolerates 60°C but synthetics.' },
                { text: 'hotter water cleans better', outcome: 'Not quite — Students believe "hotter water cleans better" and apply it universally.', reveals: 'hotter-water-cleans-better-and' },
                { text: '"hotter water cleans better" and apply it universally', outcome: 'Not quite — Students believe "hotter water cleans better" and apply it universally.', reveals: 'hotter-water-cleans-better-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_005', title: 'Water for Laundering: Hardness, Types and Water Softening Methods',
          caseStudy: { intro: 'Imagine you are washing a white cotton kurta with a good quality soap, but instead of bright white, it comes out dull gray and feels stiff.',
            decisions: [{ prompt: 'What is the chemical composition of temporary hardness in water, and why does boiling remove it?', options: [
                { text: 'Temporary hardness is caused by dissolved calcium and magnesium bicarbonates, Ca(HCO₃)₂', outcome: 'Temporary hardness is caused by dissolved calcium and magnesium bicarbonates, Ca(HCO₃)₂ and.' },
                { text: 'boiling removes all hardness', outcome: 'Not quite — Students often believe that "boiling removes all hardness" because they see scale deposits.', reveals: 'boiling-removes-all-hardness-because' },
                { text: 'temporary hardness is due to sulfates', outcome: 'Not quite — Students often believe that "boiling removes all hardness" because they see scale deposits.', reveals: 'boiling-removes-all-hardness-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_006', title: 'Soaps and Detergents: Chemistry, Action and Selection for Laundering',
          caseStudy: { intro: 'Imagine you are helping your mother choose a laundry product for a mixed load: a white cotton kurta stained with cooking oil, a coloured wool sweater with.',
            decisions: [{ prompt: 'State the chemical reaction of saponification using a triglyceride (e.g., tripalmitin) and sodium hydroxide.', options: [
                { text: 'Tripalmitin (C₅₁H₉₈O₆) + 3 NaOH → 3 Sodium palmitate (C₁₅H₃₁COONa) + Glycerol (C₃H₈O₃)', outcome: 'Tripalmitin (C₅₁H₉₈O₆) + 3 NaOH → 3 Sodium palmitate (C₁₅H₃₁COONa) + Glycerol (C₃H₈O₃).' },
                { text: 'soap + water', outcome: 'Not quite — Students often believe "detergent is just synthetic soap" and that the only difference.', reveals: 'detergent-is-just-synthetic-soap' },
                { text: 'detergent is just synthetic soap', outcome: 'Not quite — Students often believe "detergent is just synthetic soap" and that the only difference.', reveals: 'detergent-is-just-synthetic-soap' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In the hostel laundry room, a junior dunks a fresh blood-stained kurta in hot water and reaches for the chlorine bleach, saying \'heat and bleach kill stains.\' You stop him mid-pour.',
            decisions: [{ prompt: 'What\'s about to go wrong?', options: [
                { text: 'He\'d set it permanently — hot water coagulates the protein into insolubility and chlorine locks it in as a yellowish chloro-protein; a protein stain wants cold water first, then an enzymatic detergent, oxygen bleach only if needed.', outcome: 'The chapter\'s golden rule: identify the stain\'s chemistry before the agent — heat and chlorine are tools for other stain classes and fixers of this one.' },
                { text: 'Let him proceed — aggressive treatment beats timid treatment on any stain.', outcome: 'Aggression isn\'t a principle — matching is; the strongest move is the wrong move when the chemistry turns the stain permanent, which is exactly what heat and chlorine do to protein.', reveals: 'stronger-equals-better' },
                { text: 'Switch him to cold water but keep the chlorine — cold fixes the protein risk.', outcome: 'Half the fix: chlorine still forms the stable coloured complex on protein even cold; the sequence needs an enzyme to digest the protein, not an oxidiser to dye it.', reveals: 'cold-water-makes-bleach-safe' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see fabric care as materials science — where the wrong wash destroys faster than the dirt ever could.',
            decisions: [{ prompt: 'What comes next? Care and Maintenance of Fabrics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Care and Maintenance of Fabrics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_001', difficulty: 'standard',
          question: 'Fabric soiling refers to the deposition of foreign matter (particulate, oily.',
          hint: 'Revisit c11_hs_cbse_05_005 (cotton structure) and c11_hs_cbse_11_007 (dirt.',
          misconception: 'Students believe "soiling is only surface dirt that washes off" and "deterioration happens only to old fabrics.".',
          parts: [
                { id: 'a', prompt: 'List four distinct sources of fabric soiling in a typical Indian household and classify each as particulate, oily, or combination soil.', answer: 'Correct answer: (1) Road dust / construction dust',
                  options: ['Correct answer: (1) Road dust / construction dust', 'stains', 'soiling is only surface dirt that washes off', 'deterioration happens only to old fabrics'],
                  hint: 'Revisit c11_hs_cbse_05_005 (cotton structure) and c11_hs_cbse_11_007 (dirt classification) — draw.',
                  misconception: 'Students believe "soiling is only surface dirt that washes off" and "deterioration happens only to old fabrics." In reality, (1) oily soils.' },
                { id: 'b', prompt: 'A white cotton bedsheet used in a coastal city turns yellow after six months despite regular washing.', answer: 'Correct answer: Oxidative yellowing (cellulose oxidation to carbonyl/quinone',
                  options: ['Correct answer: Oxidative yellowing (cellulose oxidation to carbonyl/quinone', 'detergent residue', 'hard water', 'soiling is only surface dirt that washes off'],
                  hint: 'Revisit c11_hs_cbse_05_005 (cotton structure) and c11_hs_cbse_11_007 (dirt classification) — draw.',
                  misconception: 'Students believe "soiling is only surface dirt that washes off" and "deterioration happens only to old fabrics." In reality, (1) oily soils.' },
                { id: 'c', prompt: 'Compare the deterioration pathways of wool and nylon when exposed to (a) prolonged sunlight, (b) carpet beetle larvae.', answer: 'Correct table: Wool',
                  options: ['Correct table: Wool', 'both degrade equally in sunlight', 'soiling is only surface dirt that washes off', 'deterioration happens only to old fabrics'],
                  hint: 'Revisit c11_hs_cbse_05_005 (cotton structure) and c11_hs_cbse_11_007 (dirt classification) — draw.',
                  misconception: 'Students believe "soiling is only surface dirt that washes off" and "deterioration happens only to old fabrics." In reality, (1) oily soils.' }
          ],
            remediations: { 'soiling-is-only-surface-dirt': { steps: ['If the student cannot classify soils by chemical nature or link fibre properties to soiling/deterioration: Step 1.', 'Step 2 — Revisit c11_hs_cbse_11_007 (dirt types and principles of removal) for soil classification.', 'Step 3 — Do a hands-on "soil pickup" demo: press adhesive tape on (a) cotton swatch rubbed with talc, (b) polyester.', 'Observe soil transfer under magnifier.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "soiling is only surface dirt that washes off" and "deterioration happens only to old fabrics.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Frequent washing always extends fabric life because it removes soil." Provide two counter-examples with mechanisms.', answer: 'Correct evaluation: False',
                  options: ['Correct evaluation: False', 'soiling is only surface dirt that washes off', 'deterioration happens only to old fabrics'],
                  hint: 'Revisit c11_hs_cbse_05_005 (cotton structure) and c11_hs_cbse_11_007 (dirt classification) — draw.',
                  misconception: 'Students believe "soiling is only surface dirt that washes off" and "deterioration happens only to old fabrics." In reality, (1) oily soils.' }
          ],
            remediations: { 'soiling-is-only-surface-dirt': { steps: ['If the student cannot classify soils by chemical nature or link fibre properties to soiling/deterioration: Step 1.', 'Step 2 — Revisit c11_hs_cbse_11_007 (dirt types and principles of removal) for soil classification.', 'Step 3 — Do a hands-on "soil pickup" demo: press adhesive tape on (a) cotton swatch rubbed with talc, (b) polyester.', 'Observe soil transfer under magnifier.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_002', difficulty: 'standard',
          question: 'A stain is a localized discoloration on a fabric caused by the deposition.',
          hint: 'If stuck, revisit the enzyme-substrate specificity concept from c11_bio_cbse_09_005 and.',
          misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen.',
          parts: [
                { id: 'a', prompt: 'Classify the following stains by their PRIMARY chemical nature: (a) grass, (b) ballpoint ink, (c) egg yolk, (d) rust.', answer: 'grass, (',
                  options: ['grass, (', 'stain type = removal method', 'ink = alcohol', 'blood = hydrogen peroxide'],
                  hint: 'If stuck, revisit the enzyme-substrate specificity concept from c11_bio_cbse_09_005 and the.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' },
                { id: 'b', prompt: 'Compare and contrast the mechanism of action for removing a tannin stain (tea) using (i) acetic acid rinse followed by sodium percarbonate, versus (ii) direct.', answer: '(i) Acetic acid protonates the phenolic -OH groups of tannin, increasing water',
                  options: ['(i) Acetic acid protonates the phenolic -OH groups of tannin, increasing water', 'bleach is bleach', 'stain type = removal method', 'ink = alcohol'],
                  hint: 'If stuck, revisit the enzyme-substrate specificity concept from c11_bio_cbse_09_005 and the.',
                  misconception: 'Students believe "stain type = removal method" as a fixed lookup table (e.g., "ink = alcohol", "blood = hydrogen peroxide").' }
          ],
            remediations: { 'stain-type-removal-method-as': { steps: ['Revisit c11_hs_cbse_11_004 (stain classification) and c11_hs_cbse_11_005 (reagent categories) to rebuild the chemical.', 'Create a 2×3 matrix: rows = stain classes (protein, tannin, oil, dye, mineral, mixed), columns = fibre vulnerabilities.', 'Fill each cell with the *safest first reagent*.', 'Take the diagnostic test again, but this time verbalize the chemical reasoning at each node: "I choose X because the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_003', difficulty: 'standard',
          question: 'Specific stain removal methods are targeted procedures using chemical reagents.',
          hint: 'If stuck, re-read the "General Principles of Stain Removal" section in node.',
          misconception: 'Students think "bleach removes all coloured stains" and use chlorine bleach on coloured cotton, silk, or wool.',
          parts: [
                { id: 'a', prompt: 'You have a ballpoint ink stain on polyester. Design a 4-step removal sequence using only household reagents, justifying each step\'s chemical action.', answer: 'Correct sequence: (1) Blot with dry cloth',
                  options: ['Correct sequence: (1) Blot with dry cloth', 'bleach removes all coloured stains'],
                  hint: 'If stuck, re-read the "General Principles of Stain Removal" section in node c12_hs_cbse_14_002 and.',
                  misconception: 'Students think "bleach removes all coloured stains" and use chlorine bleach on coloured cotton, silk, or wool.' },
                { id: 'b', prompt: 'Compare the removal of turmeric (curry) stain from cotton versus wool. Why is lemon juice (citric acid) recommended for cotton but contra-indicated for wool?', answer: 'Correct: Turmeric\'s curcumin is a pH-sensitive dye',
                  options: ['Correct: Turmeric\'s curcumin is a pH-sensitive dye', 'bleach removes all coloured stains'],
                  hint: 'If stuck, re-read the "General Principles of Stain Removal" section in node c12_hs_cbse_14_002 and.',
                  misconception: 'Students think "bleach removes all coloured stains" and use chlorine bleach on coloured cotton, silk, or wool.' }
          ],
            remediations: { 'bleach-removes-all-coloured-stains': { steps: ['Revisit node c12_hs_cbse_14_002 to re-learn the four stain classes and the "reagent ladder" concept.', 'Watch a 5-min demo of bleach damage on silk vs cotton (YouTube: "fibre bleach test").', 'Make a 4×4 table: rows = stain classes, columns = fibre types; fill each cell with the safest first reagent.', 'Re-attempt Diagnostic Questions 2 and 4; if still wrong, consult teacher for a hands-on swatch test.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_004', difficulty: 'standard',
          question: 'The laundry process is a systematic sequence of stages—sorting, steeping.',
          hint: 'If unsure about fibre limits: revisit c11_hs_cbse_05_005 (protein fibres) and.',
          misconception: 'Students believe "hotter water cleans better" and apply it universally.',
          parts: [
                { id: 'a', prompt: 'A student sorts laundry into two piles: "whites" and "colors." They wash the white cotton bedsheets at 60°C with detergent and the colored synthetic shirts.', answer: 'The student ignored fibre type and fabric construction',
                  options: ['The student ignored fibre type and fabric construction', 'hotter water cleans better', '"hotter water cleans better" and apply it universally'],
                  hint: 'If unsure about fibre limits: revisit c11_hs_cbse_05_005 (protein fibres) and c11_hs_cbse_05_006.',
                  misconception: 'Students believe "hotter water cleans better" and apply it universally.' }
          ],
            remediations: { 'hotter-water-cleans-better-and': { steps: ['If a student applies hot water universally: Step 1—Have them examine a wool swatch felted at 60°C vs.', 'one washed at 30°C; feel the stiffness and measure shrinkage.', 'Step 2—Show blood-stained cotton washed at 60°C (stain set) vs.', '30°C with enzyme (stain removed).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_005', difficulty: 'standard',
          question: 'Water hardness refers to the concentration of dissolved calcium and magnesium.',
          hint: 'If stuck, review the soap‑hardness interaction in c11_hs_cbse_11_008 (Soaps and.',
          misconception: 'Students often believe that "boiling removes all hardness" because they see scale deposits in kettles and assume that.',
          parts: [
                { id: 'a', prompt: 'A household receives groundwater that leaves a white crust on the inside of a kettle after boiling.', answer: 'The white crust indicates temporary hardness (calcium bicarbonate)',
                  options: ['The white crust indicates temporary hardness (calcium bicarbonate)', 'boiling removes all hardness', 'is the only hardness'],
                  hint: 'If stuck, review the soap‑hardness interaction in c11_hs_cbse_11_008 (Soaps and Detergents.',
                  misconception: 'Students often believe that "boiling removes all hardness" because they see scale deposits in kettles and assume that is the only hardness.' }
          ],
            remediations: { 'boiling-removes-all-hardness-because': { steps: ['If a student cannot differentiate temporary vs.', 'permanent hardness or writes incorrect softening reactions: (1) Revisit the Class 11 node c11_hs_cbse_11_007 (Role.', '(2) Watch a 5‑minute video showing the boiling test and washing soda test side‑by‑side.', '(3) Practice writing the two key reactions: Ca(HCO₃)₂ → CaCO₃ + CO₂ + H₂O (boiling) and CaSO₄ + Na₂CO₃ → CaCO₃ + Na₂SO₄.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_14_006', difficulty: 'standard',
          question: 'Soaps are sodium or potassium salts of long-chain fatty acids produced by the.',
          hint: 'Review the surfactant structure and micelle diagram in **c11_hs_cbse_11_008** and the.',
          misconception: 'Students often believe "detergent is just synthetic soap" and that the only difference is hard-water tolerance.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why soap fails to clean effectively in hard water, while an anionic detergent (e.g., sodium dodecylbenzene sulfonate) does not.', answer: 'In hard water, Ca²⁺/Mg²⁺ ions react with soap anions (RCOO⁻) to form insoluble',
                  options: ['In hard water, Ca²⁺/Mg²⁺ ions react with soap anions (RCOO⁻) to form insoluble', 'detergents don\'t react with hard water', 'detergent is just synthetic soap'],
                  hint: 'Review the surfactant structure and micelle diagram in **c11_hs_cbse_11_008** and the lipid.',
                  misconception: 'Students often believe "detergent is just synthetic soap" and that the only difference is hard-water tolerance.' },
                { id: 'b', prompt: 'A household has 200 L of hard water (300 ppm CaCO₃ equivalent). They use a soap-based powder that requires 2 g/L for effective micelle formation in soft water.', answer: 'Step 1: Soap needed in soft water = 200 L × 2 g/L = 400 g',
                  options: ['Step 1: Soap needed in soft water = 200 L × 2 g/L = 400 g', 'detergent is just synthetic soap'],
                  hint: 'Review the surfactant structure and micelle diagram in **c11_hs_cbse_11_008** and the lipid.',
                  misconception: 'Students often believe "detergent is just synthetic soap" and that the only difference is hard-water tolerance.' }
          ],
            remediations: { 'detergent-is-just-synthetic-soap': { steps: ['If a student exhibits the above misconception: 1.', 'Have them test pH of three products (soap bar solution, wool liquid detergent, heavy-duty powder) using pH strips.', 'Ask: "Which product would you use for a silk saree?', 'Why?" Guide them to connect pH > 8 → peptide bond hydrolysis → fibre weakening.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
