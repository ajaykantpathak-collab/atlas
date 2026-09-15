import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch11_p2: SimDef = {
    id: 'v3_c11_hs_ch11_p2',
    title: 'Care and Maintenance of Fabrics · Part 2/2',
    subtitle: 'Read the tiny symbols before the washing machine reads them for you.',
    classLevel: 11, subject: 'home_science', topic: 'Care and Maintenance of Fabrics · Part 2/2',
    chapters: ['c11_hs_ch11'],
    nodeIds: ['c11_hs_cbse_11_007', 'c11_hs_cbse_11_008', 'c11_hs_cbse_11_009', 'c11_hs_cbse_11_010', 'c11_hs_cbse_11_011', 'c11_hs_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fabric-rescue specialist choosing treatments', intro: 'A red kurta fades and a silk dupatta shrinks in one wash — the care label knew; nobody read it.', goal: 'Apply fibre properties to laundering, stain removal and mending decisions.' },
    discovery: {
        question: 'Fresh blood on a silk scarf — first step: soak it in hot water to loosen the stain?',
        options: ['Never — heat coagulates the protein and fixes it permanently; cold water only, and silk won\'t tolerate alkalis', 'Yes — hot water dissolves stains fastest', 'Yes — then add chlorine bleach', 'Never — silk must go straight to dry-cleaning regardless'],
        answer: 'Never — heat coagulates the protein and fixes it permanently; cold water only, and silk won\'t tolerate alkalis',
        hook: 'And mend before you wash — the machine\'s agitation turns a 2 cm tear into a 10 cm rip; laundering is the amplifier, not the cure.',
    },
    teaching: [
        { title: 'Dirt: Types and Principles of Removal; Role of Water in Laundering', text: 'Dirt refers to foreign matter (grease, grime, dust, particulate soil) adhering to fabric, classified as loose dirt (mechanically trapped, removable by mechanical action) and fixed dirt (bound.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Decode a care label\'s four symbols — 40°C tub, crossed \'CL\' triangle, one-dot dryer, two-dot iron — then choose the right first aid for turmeric on cotton and blood on silk.',
        labels: ['Dirt: Types and Principles', 'Soaps and Detergents: Chemistry', 'Methods of Washing Fabrics', 'Drying Methods and Ironing', 'Dry-cleaning: Process and Application', 'Fibre-specific Care: Cotton, Linen,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_007', title: 'Dirt: Types and Principles of Removal; Role of Water in Laundering',
          caseStudy: { intro: 'Imagine you spill cold coffee on a cotton kurta and also brush against a dusty wall — two different "dirts." Why does shaking remove the dust but not the.',
            decisions: [{ prompt: 'Define "pedesis" in the context of laundering and state one factor that increases its intensity.', options: [
                { text: 'Pedesis is the random Brownian motion of water molecules that mechanically dislodges', outcome: 'Pedesis is the random Brownian motion of water molecules that mechanically dislodges non-greasy.' },
                { text: 'pedesis is the flow of water through fabric', outcome: 'Not quite — Students believe "hot water + agitation = clean" for all soils because they conflate thermal.', reveals: 'hot-water-agitation-clean-for' },
                { text: 'adding soap increases pedesis', outcome: 'Not quite — Students believe "hot water + agitation = clean" for all soils because they conflate thermal.', reveals: 'hot-water-agitation-clean-for' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_009', title: 'Methods of Washing Fabrics and Finishing: Blues, Brighteners and Stiffening Agents',
          caseStudy: { intro: 'Imagine you have just washed a white cotton kurta, a silk dupatta, and a woollen sweater—all in the same load by mistake.',
            decisions: [{ prompt: 'A student says, "Optical brighteners are just another type of bleach because they make whites whiter." Is this statement correct?', options: [
                { text: 'No, the statement is incorrect', outcome: 'No, the statement is incorrect. Optical brighteners (fluorescent brightening agents) absorb.' },
                { text: 'whiteness', outcome: 'Not quite — Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk.', reveals: 'starch-is-for-all-fabrics' },
                { text: 'bleaching', outcome: 'Not quite — Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk.', reveals: 'starch-is-for-all-fabrics' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_010', title: 'Drying Methods and Ironing: Process, Requirements and Techniques',
          caseStudy: { intro: 'Imagine you have just washed a favourite silk kurta, a cotton bedsheet, and a wool sweater — all dripping wet.',
            decisions: [{ prompt: 'State the three essential requirements for effective ironing and name the type of iron recommended by NCERT for precise temperature control.', options: [
                { text: 'The three requirements are high temperature, moisture, and pressure', outcome: 'The three requirements are high temperature, moisture, and pressure.' },
                { text: 'steam, starch, and speed', outcome: 'Not quite — Students believe "hotter iron = better wrinkle removal" and "sun drying = hygienic for all.', reveals: 'hotter-iron-better-wrinkle-removal' },
                { text: 'hotter iron = better wrinkle removal', outcome: 'Not quite — Students believe "hotter iron = better wrinkle removal" and "sun drying = hygienic for all.', reveals: 'hotter-iron-better-wrinkle-removal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_011', title: 'Dry-cleaning: Process and Application',
          caseStudy: { intro: 'Imagine you have a silk saree with a stubborn oil stain that didn\'t come out with gentle hand washing — you wonder why the care label says "Dry Clean Only" and.',
            decisions: [{ prompt: 'Define dry-cleaning and name the three most common solvents used in commercial dry-cleaning establishments.', options: [
                { text: 'Dry-cleaning is the cleaning of fabrics in a non-aqueous liquid medium using solvents', outcome: 'Dry-cleaning is the cleaning of fabrics in a non-aqueous liquid medium using solvents like.' },
                { text: 'cleaning without any liquid', outcome: 'Not quite — Students believe "dry-cleaning" means cleaning without any liquid, or that it uses heat/air like.', reveals: 'dry-cleaning-means-cleaning-without' },
                { text: 'rather than', outcome: 'Not quite — Students believe "dry-cleaning" means cleaning without any liquid, or that it uses heat/air like.', reveals: 'dry-cleaning-means-cleaning-without' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_012', title: 'Fibre-specific Care: Cotton, Linen, Wool, Silk and Synthetic Fibres',
          caseStudy: { intro: 'Imagine you\'ve just bought a beautiful silk kurta and a wool sweater for winter — both expensive, both delicate.',
            decisions: [{ prompt: 'A student reads that cotton "can withstand high temperatures, if necessary can be boiled" and concludes that boiling is the best way.', options: [
                { text: 'Correct answer: NCERT Table 2 states cotton "gets crushed easily, have to be ironed', outcome: 'Correct answer: NCERT Table 2 states cotton "gets crushed easily, have to be ironed properly.' },
                { text: 'boiling always sanitizes', outcome: 'Not quite — Students believe "mild detergent" means the same product for all delicate fibres.', reveals: 'mild-detergent-means-the-same' },
                { text: 'mild detergent', outcome: 'Not quite — Students believe "mild detergent" means the same product for all delicate fibres.', reveals: 'mild-detergent-means-the-same' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Care and Maintenance of Fabrics · Part 2/2', spots: [
            { id: 's1', label: 'Soaps and Detergents Chemistry and Function in Washing', prompt: 'Which idea is this? — Soaps and detergents are surface-active agents (surfactants) that lower the surface.', answer: 'Soaps and Detergents Chemistry and Function in Washing', options: ['Soaps and Detergents Chemistry and Function in Washing', 'Dry-cleaning Process and Application'] },
            { id: 's2', label: 'Dry-cleaning Process and Application', prompt: 'Which idea is this? — Dry-cleaning is a fabric cleaning process that uses non-aqueous chemical solvents (such.', answer: 'Dry-cleaning Process and Application', options: ['Dry-cleaning Process and Application', 'Soaps and Detergents Chemistry and Function in Washing'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a home-skills demo, a student announces: \'Fabric care means washing — cotton takes anything: boiling water, bleach, hot dry iron. And any tear just needs a quick running stitch along the rip.\'',
            decisions: [{ prompt: 'What do fabric science and mending actually require?', options: [
                { text: 'Correct the monolith and the stitch: care is five pillars — mending, laundering, stain removal, finishing, storage — each ruled by fibre behaviour: cotton tolerates heat but wrinkles, scorches if ironed dry and mildews if stored damp; nylon dies in sunlight, acrylic melts, silk weakens wet. And a tear means fabric is LOST — running stitch pucker-pulls intact edges; darning or patching replaces the missing area.', outcome: 'The demo gets real: care is fibre-specific multi-property management, and mending rebuilds what\'s missing rather than cinching what remains.' },
                { text: 'Keep \'care = washing\' — mending, storage and finishing are extras, not essentials.', outcome: 'Shrinkage, scorch, mildew and moth all strike outside the wash: the five pillars each defend a different degradation pathway.', reveals: 'care-equals-washing' },
                { text: 'Keep the running stitch — sewing the rip shut is the fastest fix.', outcome: 'Stitching a tear shut creates tension lines that fail under stress: the missing material must be replaced by darn or patch, not pulled together.', reveals: 'running-stitch-fixes-tears' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_012', title: 'You made it',
          caseStudy: { intro: 'Care isn\'t washing — it\'s five disciplines (mending, laundry, stain removal, finishing, storage) each dictated by the fibre\'s chemistry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_007', difficulty: 'standard',
          question: 'Dirt refers to foreign matter (grease, grime, dust, particulate soil) adhering.',
          hint: 'Revisit c9_bio_ch1_3 (cell membrane permeability) to rebuild the hydrophilic/hydrophobic.',
          misconception: 'Students believe "hot water + agitation = clean" for all soils because they conflate thermal softening of fats with.',
          parts: [
                { id: 'a', prompt: 'A student says: "Hot water removes all types of dirt better than cold water because it dissolves everything." Identify the two scientific inaccuracies in this.', answer: 'First, hot water does not "dissolve" grease',
                  options: ['First, hot water does not "dissolve" grease', 'hot water + agitation = clean'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane permeability) to rebuild the hydrophilic/hydrophobic.',
                  misconception: 'Students believe "hot water + agitation = clean" for all soils because they conflate thermal softening of fats with emulsification, and.' },
                { id: 'b', prompt: 'Compare the removal mechanism for loose dust on a wool sweater versus dried ghee stain on the same sweater.', answer: 'Loose dust is mechanically trapped',
                  options: ['Loose dust is mechanically trapped', 'wool delicacy', 'temperature', 'hot water + agitation = clean'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane permeability) to rebuild the hydrophilic/hydrophobic.',
                  misconception: 'Students believe "hot water + agitation = clean" for all soils because they conflate thermal softening of fats with emulsification, and.' }
          ],
            remediations: { 'hot-water-agitation-clean-for': { steps: ['Show two identical oily stains on cotton: treat one with hot water only, one with hot water + detergent.', 'After drying, compare — the water-only stain remains greasy and attracts dust (proving no emulsification/suspension).', 'Demonstrate pedesis: add ink drop to cold vs hot water beakers — faster dispersion in hot water visualises molecular.', 'Have student articulate in their own words: "Water knocks out loose dirt but cannot hold it away; it softens grease but.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_008', difficulty: 'standard',
          question: 'Soaps and detergents are surface-active agents (surfactants) that lower the.',
          hint: 'Revisit bile emulsification in Class 10 Biology (c10_bio_cbse_01_006) and the structure.',
          misconception: 'Students often believe that \'more soap = better cleaning\' and that soap\'s failure in hard water is due to \'impurities.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Soaps and detergents are surface-active agents (surfactants) that lower the surface',
                  options: ['Soaps and detergents are surface-active agents (surfactants) that lower the surface', 'Fabric care and maintenance refers to the systematic practices of mending, laundering,', 'Mending is the process of repairing physical damage to fabrics—such as cuts, tears,', 'Laundry process is the systematic sequence of operations—stain removal, fabric'],
                  hint: 'Revisit bile emulsification in Class 10 Biology (c10_bio_cbse_01_006) and the structure.',
                  misconception: 'Students often believe that \'more soap = better cleaning\' and that soap\'s failure in hard water is due to \'impurities in the soap\'.' }
          ],
            remediations: { 'more-soap-better-cleaning-and': { steps: ['Demonstrate scum formation: dissolve 1 g soap in 50 mL hard water (add CaCl₂) — white precipitate appears.', 'Repeat with detergent — solution stays clear.', 'Explain at molecular level: carboxylate vs sulfonate head groups.', 'Have student write the ionic equation: 2RCOO⁻Na⁺ + Ca²⁺ → (RCOO)₂Ca↓ + 2Na⁺.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_009', difficulty: 'standard',
          question: 'Methods of washing fabrics refer to the mechanical techniques (friction.',
          hint: 'Revisit the surfactant structure (hydrophilic head, hydrophobic tail) and micelle.',
          misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.',
          parts: [
                { id: 'a', prompt: 'A student says, "Optical brighteners are just another type of bleach because they make whites whiter." Is this statement correct?', answer: 'No, the statement is incorrect',
                  options: ['No, the statement is incorrect', 'whiteness', 'bleaching', 'starch is for all fabrics to make them stiff'],
                  hint: 'Revisit the surfactant structure (hydrophilic head, hydrophobic tail) and micelle formation in node.',
                  misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.' },
                { id: 'b', prompt: 'A homemaker starches a dark coloured cotton saree using plain rice starch. After drying, white patches appear on the fabric.', answer: 'The white patches are dried starch residue visible on the dark fabric',
                  options: ['The white patches are dried starch residue visible on the dark fabric', 'use less starch', 'rinse more', 'starch is for all fabrics to make them stiff'],
                  hint: 'Revisit the surfactant structure (hydrophilic head, hydrophobic tail) and micelle formation in node.',
                  misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.' },
                { id: 'c', prompt: 'Compare and contrast the action of borax in a starch solution with the action of gum acacia on silk. How do their mechanisms of stiffening differ?', answer: 'Borax is not a stiffener itself',
                  options: ['Borax is not a stiffener itself', 'starch is for all fabrics to make them stiff'],
                  hint: 'Revisit the surfactant structure (hydrophilic head, hydrophobic tail) and micelle formation in node.',
                  misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.' }
          ],
            remediations: { 'starch-is-for-all-fabrics': { steps: ['Show the student Table 2 (Fibre properties) from the textbook—highlight "Starching only for cotton and linen" under.', 'Demonstrate with a microscopic analogy: starch granules (like tiny bricks) interlock with cellulose fibrils (rough.', 'Have the student match each stiffening agent (starch, gum acacia, gelatin, borax) to its permitted fibres using.', 'Assign a practice question: "Why does a starched silk saree show white powder after ironing?"—forcing application.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.',
          parts: [
                { id: 'a', prompt: 'Evaluate the suitability of using friction washing (scrubbing board) for a heavily soiled wool sweater.', answer: 'Unsuitable',
                  options: ['Unsuitable', 'gentle friction', 'lukewarm water', 'starch is for all fabrics to make them stiff'],
                  hint: 'Revisit the surfactant structure (hydrophilic head, hydrophobic tail) and micelle formation in node.',
                  misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.' },
                { id: 'b', prompt: 'Design a finishing protocol for a blended fabric: 60% polyester / 40% cotton white bedsheet that has turned grey after multiple washes.', answer: 'Washing method: Machine wash (gentle cycle)',
                  options: ['Washing method: Machine wash (gentle cycle)', 'starch is for all fabrics to make them stiff'],
                  hint: 'Revisit the surfactant structure (hydrophilic head, hydrophobic tail) and micelle formation in node.',
                  misconception: 'Students believe "starch is for all fabrics to make them stiff" and apply heavy starch to silk, wool, or synthetics.' }
          ],
            remediations: { 'starch-is-for-all-fabrics': { steps: ['Show the student Table 2 (Fibre properties) from the textbook—highlight "Starching only for cotton and linen" under.', 'Demonstrate with a microscopic analogy: starch granules (like tiny bricks) interlock with cellulose fibrils (rough.', 'Have the student match each stiffening agent (starch, gum acacia, gelatin, borax) to its permitted fibres using.', 'Assign a practice question: "Why does a starched silk saree show white powder after ironing?"—forcing application.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_010', difficulty: 'standard',
          question: 'Drying is the process of removing moisture from washed fabrics using controlled.',
          hint: 'Revisit c11_hs_cbse_11_012 Table 2 — Fibre properties that affect care and maintenance.',
          misconception: 'Students believe "hotter iron = better wrinkle removal" and "sun drying = hygienic for all fabrics." They apply maximum.',
          parts: [
                { id: 'a', prompt: 'State the three essential requirements for effective ironing and name the type of iron recommended by NCERT for precise temperature control.', answer: 'The three requirements are high temperature, moisture, and pressure',
                  options: ['The three requirements are high temperature, moisture, and pressure', 'steam, starch, and speed', 'hotter iron = better wrinkle removal', 'sun drying = hygienic for all fabrics'],
                  hint: 'Revisit c11_hs_cbse_11_012 Table 2 — Fibre properties that affect care and maintenance — and.',
                  misconception: 'Students believe "hotter iron = better wrinkle removal" and "sun drying = hygienic for all fabrics." They apply maximum heat to all fabrics.' },
                { id: 'b', prompt: 'Explain why NCERT advises drying silk and wool indoors in shade rather than in direct sunlight, while cotton can be sun-dried with the wrong side facing out.', answer: 'Silk weakens irreversibly on prolonged UV exposure and yellows permanently',
                  options: ['Silk weakens irreversibly on prolonged UV exposure and yellows permanently', 'all fabrics dry faster in sun', 'silk dries better in sun', 'hotter iron = better wrinkle removal'],
                  hint: 'Revisit c11_hs_cbse_11_012 Table 2 — Fibre properties that affect care and maintenance — and.',
                  misconception: 'Students believe "hotter iron = better wrinkle removal" and "sun drying = hygienic for all fabrics." They apply maximum heat to all fabrics.' },
                { id: 'c', prompt: 'A student washes a polyester-cotton blend (65/35) shirt and a pure wool sweater.', answer: 'Both decisions are incorrect',
                  options: ['Both decisions are incorrect', 'hotter iron = better wrinkle removal', 'sun drying = hygienic for all fabrics'],
                  hint: 'Revisit c11_hs_cbse_11_012 Table 2 — Fibre properties that affect care and maintenance — and.',
                  misconception: 'Students believe "hotter iron = better wrinkle removal" and "sun drying = hygienic for all fabrics." They apply maximum heat to all fabrics.' }
          ],
            remediations: { 'hotter-iron-better-wrinkle-removal': { steps: ['Have the student create a 3-column table: Fibre | Max Iron Temp | Drying Method.', 'For each fibre (cotton, silk, wool, polyester, acrylic, rayon), they must write the NCERT-specified temperature (from.', 'Ask them to explain WHY for each using fibre properties: wet strength, thermal degradation point, UV sensitivity.', 'Give them 5 care label scenarios with deliberate errors; they must spot and correct each using their table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_011', difficulty: 'standard',
          question: 'Dry-cleaning is a fabric cleaning process that uses non-aqueous chemical.',
          hint: 'Revisit c11_hs_cbse_11_004 (stain classification) and c11_hs_cbse_11_012 Table 2 (fibre.',
          misconception: 'Students believe "dry-cleaning" means cleaning without any liquid, or that it uses heat/air like a dryer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dry-cleaning is a fabric cleaning process that uses non-aqueous chemical solvents (such',
                  options: ['Dry-cleaning is a fabric cleaning process that uses non-aqueous chemical solvents (such', 'Fabric care and maintenance refers to the systematic practices of mending, laundering,', 'Mending is the process of repairing physical damage to fabrics—such as cuts, tears,', 'Laundry process is the systematic sequence of operations—stain removal, fabric'],
                  hint: 'Revisit c11_hs_cbse_11_004 (stain classification) and c11_hs_cbse_11_012 Table 2 (fibre properties).',
                  misconception: 'Students believe "dry-cleaning" means cleaning without any liquid, or that it uses heat/air like a dryer.' }
          ],
            remediations: { 'dry-cleaning-means-cleaning-without': { steps: ['Clarify "dry" = "without water as primary medium," not "without liquid." Show video of machine cycle with solvent.', 'Demonstrate spot-board: apply few drops of water/vinegar on coffee stain on wool swab, blot — show stain lifts without.', 'Give care label matching exercise — circle symbols to solvent types (P, F, crossed-out).', 'Assign case study: "Why did this silk dupatta shrink after home hand-wash but not after dry-clean?" — student explains.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_012', difficulty: 'standard',
          question: 'Fibre-specific care is the systematic application of laundering, finishing.',
          hint: 'Revisit the fibre classification in Chapter 10 (Textile Fibres) — specifically the.',
          misconception: 'Students believe "mild detergent" means the same product for all delicate fibres.',
          parts: [
                { id: 'a', prompt: 'Compare the drying and ironing requirements of silk and nylon.', answer: 'Shared precaution: Both must be dried in shade',
                  options: ['Shared precaution: Both must be dried in shade', 'both need low heat', 'mild detergent', '"mild detergent" means the same product for all delicate fibres'],
                  hint: 'Revisit the fibre classification in Chapter 10 (Textile Fibres) — specifically the "Chemical.',
                  misconception: 'Students believe "mild detergent" means the same product for all delicate fibres.' }
          ],
            remediations: { 'mild-detergent-means-the-same': { steps: ['Have the student write the polymer repeat unit for each fibre (cellulose, keratin, fibroin, regenerated cellulose.', 'For each, identify the hydrolyzable bond (glycosidic, peptide, ester, amide) and the pH/condition that attacks it.', 'Match each detergent ingredient (builder, surfactant, enzyme, bleach) to the bond it threatens.', 'Create a decision tree: "If fibre = protein → pH 5-7, no protease, no oxidizing bleach; if fibre = regenerated.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
