import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch11_p1: SimDef = {
    id: 'v3_c11_hs_ch11_p1',
    title: 'Care and Maintenance of Fabrics · Part 1/2',
    subtitle: 'Read the tiny symbols before the washing machine reads them for you.',
    classLevel: 11, subject: 'home_science', topic: 'Care and Maintenance of Fabrics · Part 1/2',
    chapters: ['c11_hs_ch11'],
    nodeIds: ['c11_hs_cbse_11_001', 'c11_hs_cbse_11_002', 'c11_hs_cbse_11_003', 'c11_hs_cbse_11_004', 'c11_hs_cbse_11_005', 'c11_hs_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fabric-rescue specialist choosing treatments', intro: 'A red kurta fades and a silk dupatta shrinks in one wash — the care label knew; nobody read it.', goal: 'Apply fibre properties to laundering, stain removal and mending decisions.' },
    discovery: {
        question: 'Fresh blood on a silk scarf — first step: soak it in hot water to loosen the stain?',
        options: ['Never — heat coagulates the protein and fixes it permanently; cold water only, and silk won\'t tolerate alkalis', 'Yes — hot water dissolves stains fastest', 'Yes — then add chlorine bleach', 'Never — silk must go straight to dry-cleaning regardless'],
        answer: 'Never — heat coagulates the protein and fixes it permanently; cold water only, and silk won\'t tolerate alkalis',
        hook: 'And mend before you wash — the machine\'s agitation turns a 2 cm tear into a 10 cm rip; laundering is the amplifier, not the cure.',
    },
    teaching: [
        { title: 'Need for Fabric Care and Maintenance: Overview', text: 'Fabric care and maintenance refers to the systematic practices of mending, laundering, stain removal, finishing, dry-cleaning, and storage aimed at preserving the functional integrity, aesthetic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Decode a care label\'s four symbols — 40°C tub, crossed \'CL\' triangle, one-dot dryer, two-dot iron — then choose the right first aid for turmeric on cotton and blood on silk.',
        labels: ['Need for Fabric Care', 'Mending: Repair Techniques', 'Laundry Process: Overview', 'Stains: Definition, Classification', 'Stain Removal: Physical Techniques', 'Common Stains and Their'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_001', title: 'Need for Fabric Care and Maintenance: Overview',
          caseStudy: { intro: 'Imagine you just bought a vibrant red cotton kurta and a delicate silk dupatta for a festival.',
            decisions: [{ prompt: 'What are the five main aspects of care and maintenance of fabrics as outlined in the NCERT Class 11 Home Science curriculum?', options: [
                { text: 'The five main aspects are: (1) Mending (repairing tears, replacing fasteners), (2)', outcome: 'The five main aspects are: (1) Mending (repairing tears, replacing fasteners), (2) Laundry (stain.' },
                { text: 'fabric care = washing', outcome: 'Not quite — Students believe "fabric care = washing" and that natural fibres (cotton, wool) are always \'tough\'.', reveals: 'fabric-care-washing-and-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_002', title: 'Mending: Repair Techniques for Fabrics',
          caseStudy: { intro: 'Imagine you are dressing for a family function and notice a 2 cm L-shaped tear near the pocket of your favorite cotton kurta and a missing button on your wool.',
            decisions: [{ prompt: 'Define mending and list the four categories of damage it addresses according to the NCERT Class 11 Home Science textbook.', options: [
                { text: 'Mending is the general term for keeping material free of damage from normal use or', outcome: 'Mending is the general term for keeping material free of damage from normal use or accident.' },
                { text: 'restitching hems', outcome: 'Not quite — Students believe "a simple running stitch fixes any tear" because they confuse seam restitching.', reveals: 'a-simple-running-stitch-fixes' },
                { text: 'stain removal', outcome: 'Not quite — Students believe "a simple running stitch fixes any tear" because they confuse seam restitching.', reveals: 'a-simple-running-stitch-fixes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_003', title: 'Laundry Process: Overview and Stages',
          caseStudy: { intro: 'Imagine you have a white cotton kurta stained with turmeric from lunch, a silk dupatta with perfume marks, and a woollen sweater with food spills—all needing.',
            decisions: [{ prompt: 'List the six stages of the laundry process in the correct sequential order as per the NCERT textbook.', options: [
                { text: 'The six stages in sequence are: (1) Stain removal, (2) Preparation of fabrics for washing', outcome: 'The six stages in sequence are: (1) Stain removal, (2) Preparation of fabrics for washing (sorting.' },
                { text: 'stain removal is the preparatory step in laundry', outcome: 'Not quite — Students believe "laundry = washing + drying" and treat stain removal, finishing, and ironing.', reveals: 'laundry-washing-drying-and-treat' },
                { text: 'laundry = washing + drying', outcome: 'Not quite — Students believe "laundry = washing + drying" and treat stain removal, finishing, and ironing.', reveals: 'laundry-washing-drying-and-treat' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_004', title: 'Stains: Definition, Classification and General Principles of Removal',
          caseStudy: { intro: 'Imagine you are getting ready for a family function and accidentally spill turmeric-laden curry on your brand-new white cotton kurta.',
            decisions: [{ prompt: 'Define the term \'stain\' as per the NCERT Class 11 Home Science textbook and state the fundamental characteristic that distinguishes it from.', options: [
                { text: 'A stain is an unwanted mark or colouration on a fabric caused by contact and absorption', outcome: 'A stain is an unwanted mark or colouration on a fabric caused by contact and absorption of foreign.' },
                { text: 'any dirty mark', outcome: 'Not quite — **Misconception:** "All stains on white cotton can be removed by boiling with strong detergent and.', reveals: 'misconception-all-stains-on-white' },
                { text: 'Boil the blood-stained cotton sheet in water with detergent and bleach', outcome: 'Not quite — **Misconception:** "All stains on white cotton can be removed by boiling with strong detergent and.', reveals: 'misconception-all-stains-on-white' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_005', title: 'Stain Removal: Physical Techniques and Reagent Categories',
          caseStudy: { intro: 'Imagine you spill turmeric‑oil curry on your favourite cotton kurta just before a family function.',
            decisions: [{ prompt: 'List the four physical techniques of stain removal mentioned in the NCERT textbook and give one specific situation where each technique.', options: [
                { text: 'The four techniques are: (1) Scraping – for built‑up surface stains like dried mud or', outcome: 'The four techniques are: (1) Scraping – for built‑up surface stains like dried mud or candle wax.' },
                { text: 'brushing', outcome: 'Not quite — Students often think that “bleach” means only sodium hypochlorite (chlorine bleach) and that it can.', reveals: 'bleach-means-only-sodium-hypochlorite' },
                { text: 'soaking', outcome: 'Not quite — Students often think that “bleach” means only sodium hypochlorite (chlorine bleach) and that it can.', reveals: 'bleach-means-only-sodium-hypochlorite' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_006', title: 'Common Stains and Their Specific Removal Methods',
          caseStudy: { intro: 'Imagine you\'re getting ready for your Class 11 practical exam and accidentally spill turmeric-rich sambar on your white cotton lab coat — the stain is bright.',
            decisions: [{ prompt: 'List the five stain classifications given in NCERT and state the general reagent principle for each (e.g., vegetable stains → alkaline.', options: [
                { text: 'The five classifications and their reagent principles: (1) Vegetable stains (tea, coffee,', outcome: 'The five classifications and their reagent principles: (1) Vegetable stains (tea, coffee, fruit).' },
                { text: 'hot water for blood', outcome: 'Not quite — Students believe "javelle water (sodium hypochlorite) is a universal bleach for all white fabrics".', reveals: 'javelle-water-sodium-hypochlorite-is' },
                { text: 'javelle water (sodium hypochlorite) is a universal bleach for all white fabrics', outcome: 'Not quite — Students believe "javelle water (sodium hypochlorite) is a universal bleach for all white fabrics".', reveals: 'javelle-water-sodium-hypochlorite-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'Care and Maintenance of Fabrics · Part 1/2', spots: [
            { id: 's1', label: 'Need for Fabric Care and Maintenance Overview', prompt: 'Which idea is this? — Fabric care and maintenance refers to the systematic practices of mending, laundering.', answer: 'Need for Fabric Care and Maintenance Overview', options: ['Need for Fabric Care and Maintenance Overview', 'Mending Repair Techniques for Fabrics', 'Laundry Process Overview and Stages', 'Stain Removal Physical Techniques and Reagent Categories'] },
            { id: 's2', label: 'Mending Repair Techniques for Fabrics', prompt: 'Which idea is this? — Mending is the process of repairing physical damage to fabrics—such as cuts, tears.', answer: 'Mending Repair Techniques for Fabrics', options: ['Mending Repair Techniques for Fabrics', 'Need for Fabric Care and Maintenance Overview', 'Laundry Process Overview and Stages', 'Stain Removal Physical Techniques and Reagent Categories'] },
            { id: 's3', label: 'Laundry Process Overview and Stages', prompt: 'Which idea is this? — Laundry process is the systematic sequence of operations—stain removal, fabric.', answer: 'Laundry Process Overview and Stages', options: ['Laundry Process Overview and Stages', 'Need for Fabric Care and Maintenance Overview', 'Mending Repair Techniques for Fabrics', 'Stain Removal Physical Techniques and Reagent Categories'] },
            { id: 's4', label: 'Stain Removal Physical Techniques and Reagent Categories', prompt: 'Which idea is this? — Stain removal is the systematic process of eliminating unwanted discoloration from.', answer: 'Stain Removal Physical Techniques and Reagent Categories', options: ['Stain Removal Physical Techniques and Reagent Categories', 'Need for Fabric Care and Maintenance Overview', 'Mending Repair Techniques for Fabrics', 'Laundry Process Overview and Stages'] },
            { id: 's5', label: 'Common Stains and Their Specific Removal Methods', prompt: 'Which idea is this? — Common stain removal methods refer to the systematic, reagent-specific procedures for.', answer: 'Common Stains and Their Specific Removal Methods', options: ['Common Stains and Their Specific Removal Methods', 'Need for Fabric Care and Maintenance Overview', 'Mending Repair Techniques for Fabrics', 'Laundry Process Overview and Stages'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a home-skills demo, a student announces: \'Fabric care means washing — cotton takes anything: boiling water, bleach, hot dry iron. And any tear just needs a quick running stitch along the rip.\'',
            decisions: [{ prompt: 'What do fabric science and mending actually require?', options: [
                { text: 'Correct the monolith and the stitch: care is five pillars — mending, laundering, stain removal, finishing, storage — each ruled by fibre behaviour: cotton tolerates heat but wrinkles, scorches if ironed dry and mildews if stored damp; nylon dies in sunlight, acrylic melts, silk weakens wet. And a tear means fabric is LOST — running stitch pucker-pulls intact edges; darning or patching replaces the missing area.', outcome: 'The demo gets real: care is fibre-specific multi-property management, and mending rebuilds what\'s missing rather than cinching what remains.' },
                { text: 'Keep \'care = washing\' — mending, storage and finishing are extras, not essentials.', outcome: 'Shrinkage, scorch, mildew and moth all strike outside the wash: the five pillars each defend a different degradation pathway.', reveals: 'care-equals-washing' },
                { text: 'Keep the running stitch — sewing the rip shut is the fastest fix.', outcome: 'Stitching a tear shut creates tension lines that fail under stress: the missing material must be replaced by darn or patch, not pulled together.', reveals: 'running-stitch-fixes-tears' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Care isn\'t washing — it\'s five disciplines (mending, laundry, stain removal, finishing, storage) each dictated by the fibre\'s chemistry.',
            decisions: [{ prompt: 'What comes next? Care and Maintenance of Fabrics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Care and Maintenance of Fabrics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_001', difficulty: 'standard',
          question: 'Fabric care and maintenance refers to the systematic practices of mending.',
          hint: 'Revisit c8_bio_ch1_9 (microorganisms) and c8_bio_ch2_10 (personal hygiene) to reconnect.',
          misconception: 'Students believe "fabric care = washing" and that natural fibres (cotton, wool) are always \'tough\' or \'delicate\' in all.',
          parts: [
                { id: 'a', prompt: 'You have a white cotton tablecloth with an old turmeric-oil stain (curry) and a coloured silk scarf with a fresh blood stain.', answer: 'Cotton tablecloth (curry = vegetable dye + oil): First step',
                  options: ['Cotton tablecloth (curry = vegetable dye + oil): First step', 'fabric care = washing'],
                  hint: 'Revisit c8_bio_ch1_9 (microorganisms) and c8_bio_ch2_10 (personal hygiene) to reconnect fabric care.',
                  misconception: 'Students believe "fabric care = washing" and that natural fibres (cotton, wool) are always \'tough\' or \'delicate\' in all aspects.' }
          ],
            remediations: { 'fabric-care-washing-and-that': { steps: ['Have the student create a 2-column table: "Property" vs. "Care Consequence" for one fibre (e.g., cotton: "strong when.', 'Give a scenario: "You used vinegar (acid) on a cotton stain and didn\'t rinse well. What happens after 3 months storage?"', 'Connect to the care label — show how the symbols encode these property-based rules.', 'Repeat for a synthetic (polyester) to contrast. This forces property-to-action mapping, not fibre-to-stereotype.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "fabric care = washing" and that natural fibres (cotton, wool) are always \'tough\' or \'delicate\' in all.',
          parts: [
                { id: 'a', prompt: 'A care label shows: a tub with 40°C, a triangle with \'CL\' crossed out, a square with a circle and one dot, and an iron with two dots.', answer: 'washed in hot water (60°',
                  options: ['washed in hot water (60°', 'fabric care = washing'],
                  hint: 'Revisit c8_bio_ch1_9 (microorganisms) and c8_bio_ch2_10 (personal hygiene) to reconnect fabric care.',
                  misconception: 'Students believe "fabric care = washing" and that natural fibres (cotton, wool) are always \'tough\' or \'delicate\' in all aspects.' },
                { id: 'b', prompt: 'Design a care routine for a blended fabric: 60% polyester / 40% cotton, dyed dark blue, with a soft finish.', answer: 'Wash: 40°C (cotton tolerates hot, polyester shrinks above 60°C',
                  options: ['Wash: 40°C (cotton tolerates hot, polyester shrinks above 60°C', 'fabric care = washing'],
                  hint: 'Revisit c8_bio_ch1_9 (microorganisms) and c8_bio_ch2_10 (personal hygiene) to reconnect fabric care.',
                  misconception: 'Students believe "fabric care = washing" and that natural fibres (cotton, wool) are always \'tough\' or \'delicate\' in all aspects.' }
          ],
            remediations: { 'fabric-care-washing-and-that': { steps: ['Have the student create a 2-column table: "Property" vs. "Care Consequence" for one fibre (e.g., cotton: "strong when.', 'Give a scenario: "You used vinegar (acid) on a cotton stain and didn\'t rinse well. What happens after 3 months storage?"', 'Connect to the care label — show how the symbols encode these property-based rules.', 'Repeat for a synthetic (polyester) to contrast. This forces property-to-action mapping, not fibre-to-stereotype.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_002', difficulty: 'standard',
          question: 'Mending is the process of repairing physical damage to fabrics—such as cuts.',
          hint: 'Re-read Table 2 in NCERT Chapter 11 (Fibre properties that affect care and maintenance).',
          misconception: 'Students believe "a simple running stitch fixes any tear" because they confuse seam restitching (joining two intact.',
          parts: [
                { id: 'a', prompt: 'Explain why a tear in a wool sweater must be mended differently from a tear in a cotton shirt, referencing two fibre properties from Table 2 of the textbook.', answer: 'Wool weakens when wet and felts under agitation, so mending must use',
                  options: ['Wool weakens when wet and felts under agitation, so mending must use', 'a simple running stitch fixes any tear'],
                  hint: 'Re-read Table 2 in NCERT Chapter 11 (Fibre properties that affect care and maintenance) and create.',
                  misconception: 'Students believe "a simple running stitch fixes any tear" because they confuse seam restitching (joining two intact edges) with hole/tear.' },
                { id: 'b', prompt: 'A student finds a 3 mm hole in a silk blouse near the collar. Choose the correct mending method from: (a) stocking darning with silk thread, (b) calico patch.', answer: 'Correct: (a) stocking darning with silk thread',
                  options: ['Correct: (a) stocking darning with silk thread', 'a simple running stitch fixes any tear'],
                  hint: 'Re-read Table 2 in NCERT Chapter 11 (Fibre properties that affect care and maintenance) and create.',
                  misconception: 'Students believe "a simple running stitch fixes any tear" because they confuse seam restitching (joining two intact edges) with hole/tear.' }
          ],
            remediations: { 'a-simple-running-stitch-fixes': { steps: ['Give the student a cotton swatch with a 1 cm clean cut and a wool swatch with a 5 mm hole.', 'Ask them to attempt a running stitch on both; observe puckering on cotton and distortion on wool.', 'Demonstrate stocking darning on the wool hole using a darning mushroom, emphasizing loose loops.', 'Demonstrate a calico patch on the cotton cut, showing herringbone stitches on the wrong side.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_003', difficulty: 'standard',
          question: 'Laundry process is the systematic sequence of operations—stain removal, fabric.',
          hint: 'Revisit c11_hs_cbse_11_001 (Need for Fabric Care) and the fibre property table.',
          misconception: 'Students believe "laundry = washing + drying" and treat stain removal, finishing, and ironing as optional extras.',
          parts: [
                { id: 'a', prompt: 'A student washes a white cotton shirt with a turmeric stain using hot water and detergent in the first wash cycle. The stain turns red and becomes permanent.', answer: 'Turmeric contains curcumin, a pH-sensitive dye that turns red in alkaline medium',
                  options: ['Turmeric contains curcumin, a pH-sensitive dye that turns red in alkaline medium', 'laundry = washing + drying', 'I\'ll just use extra detergent and hot water for everything, then hang dry'],
                  hint: 'Revisit c11_hs_cbse_11_001 (Need for Fabric Care) and the fibre property table.',
                  misconception: 'Students believe "laundry = washing + drying" and treat stain removal, finishing, and ironing as optional extras.' },
                { id: 'b', prompt: 'Compare the finishing requirements (blueing vs. optical brighteners vs.', answer: 'white cotton bedsheet, (',
                  options: ['white cotton bedsheet, (', 'laundry = washing + drying', 'I\'ll just use extra detergent and hot water for everything, then hang dry'],
                  hint: 'Revisit c11_hs_cbse_11_001 (Need for Fabric Care) and the fibre property table.',
                  misconception: 'Students believe "laundry = washing + drying" and treat stain removal, finishing, and ironing as optional extras.' }
          ],
            remediations: { 'laundry-washing-drying-and-treat': { steps: ['Ask the student to physically sort 5 fabric swatches (cotton, wool, silk, polyester, rayon) and predict what happens.', 'Have them test (or simulate) each: cotton shrinks 3%, wool felts irreversibly, silk loses lustre, polyester retains oil.', 'Map each failure to the skipped laundry stage: no stain removal → set stains; no finishing → graying/yellowing; wrong.', 'Co-construct a decision flowchart: "IF stain type = protein THEN cold water + enzyme/alkali avoid; IF fibre = wool THEN.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_004', difficulty: 'standard',
          question: 'A stain is an unwanted mark or discoloration on a fabric resulting from the.',
          hint: 'If stuck, revisit the \'Laundry Process: Overview and Stages\' (c11_hs_cbse_11_003) to see.',
          misconception: '**Misconception:** "All stains on white cotton can be removed by boiling with strong detergent and bleach (Javelle.',
          parts: [
                { id: 'a', prompt: 'You encounter an old, yellowish-brown stain on a stored white linen saree. You cannot identify its source (unknown stain).', answer: '**Sequence for Unknown Stain (NCERT General Considerations):** 1',
                  options: ['**Sequence for Unknown Stain (NCERT General Considerations):** 1', 'Boil the blood-stained cotton sheet in water with detergent and bleach'],
                  hint: 'If stuck, revisit the \'Laundry Process: Overview and Stages\' (c11_hs_cbse_11_003) to see where.',
                  misconception: '**Misconception:** "All stains on white cotton can be removed by boiling with strong detergent and bleach (Javelle water/hypochlorite).".' },
                { id: 'b', prompt: 'Compare and contrast the **Sponging** and **Drop Method** techniques of stain removal.', answer: '**Sponging:** Stained area placed flat on absorbent blotting paper',
                  options: ['**Sponging:** Stained area placed flat on absorbent blotting paper', 'Boil the blood-stained cotton sheet in water with detergent and bleach'],
                  hint: 'If stuck, revisit the \'Laundry Process: Overview and Stages\' (c11_hs_cbse_11_003) to see where.',
                  misconception: '**Misconception:** "All stains on white cotton can be removed by boiling with strong detergent and bleach (Javelle water/hypochlorite).".' }
          ],
            remediations: { 'misconception-all-stains-on-white': { steps: ['**Targeted Remediation Steps:** 1.', '**Confront the Error:** Show the student the NCERT Table 1 entry for **Blood** ("Fresh – wash with **cold water**") and.', 'Ask: "Why is \'cold water\' bolded for blood/egg but absent for curry?" Force articulation: *Heat denatures protein.* 2.', '**Chemical Reasoning Drill:** Give 5 stain scenarios (fresh blood on cotton, old rust on cotton, fresh tea on silk.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_005', difficulty: 'standard',
          question: 'Stain removal is the systematic process of eliminating unwanted discoloration.',
          hint: 'Revisit c11_hs_cbse_11_004 (Stains: Definition, Classification and General Principles).',
          misconception: 'Students often think that “bleach” means only sodium hypochlorite (chlorine bleach) and that it can be used on all.',
          parts: [
                { id: 'a', prompt: 'You have a white cotton shirt with an old rust stain. Using only reagents from the textbook’s six categories, design a step‑by‑step removal procedure and name.', answer: 'Step 1: Apply oxalic acid (acidic reagent) to dissolve the iron oxide',
                  options: ['Step 1: Apply oxalic acid (acidic reagent) to dissolve the iron oxide', 'bleach', 'Use Javelle water for all tough stains on white clothes'],
                  hint: 'Revisit c11_hs_cbse_11_004 (Stains: Definition, Classification and General Principles) and review.',
                  misconception: 'Students often think that “bleach” means only sodium hypochlorite (chlorine bleach) and that it can be used on all white fabrics.' },
                { id: 'b', prompt: 'Compare and contrast grease solvents and grease absorbents in terms of (a) mechanism of action, (b) suitability for different fabric types, and (c) safety.', answer: 'mechanism of action, (',
                  options: ['mechanism of action, (', 'bleach', 'Use Javelle water for all tough stains on white clothes'],
                  hint: 'Revisit c11_hs_cbse_11_004 (Stains: Definition, Classification and General Principles) and review.',
                  misconception: 'Students often think that “bleach” means only sodium hypochlorite (chlorine bleach) and that it can be used on all white fabrics.' }
          ],
            remediations: { 'bleach-means-only-sodium-hypochlorite': { steps: ['Have the student create a two‑column table: left column “Bleach Type”, right column “Examples + Suitable Stains.', 'Fill it using textbook data.', 'Give three stain‑fabric scenarios (e.g., rust on cotton, mildew on wool, tea on nylon) and ask the student to pick the.', 'Reinforce the rule: “Identify stain → Identify fabric → Choose bleach category → Test on hidden area.” Repeat until the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_11_006', difficulty: 'standard',
          question: 'Common stain removal methods refer to the systematic, reagent-specific.',
          hint: 'Revisit c11_hs_cbse_11_004 "Stains: Definition, Classification and General Principles".',
          misconception: 'Students believe "javelle water (sodium hypochlorite) is a universal bleach for all white fabrics" and use it on wool.',
          parts: [
                { id: 'a', prompt: 'You have a 3-day-old curry stain (turmeric + oil) on a coloured silk blouse. The NCERT table gives methods for white cotton.', answer: 'Step 1: Identify stain class',
                  options: ['Step 1: Identify stain class', 'javelle water (sodium hypochlorite) is a universal bleach for all white fabrics', 'For old blood stain on wool sweater, soak in javelle water'],
                  hint: 'Revisit c11_hs_cbse_11_004 "Stains: Definition, Classification and General Principles" and practice.',
                  misconception: 'Students believe "javelle water (sodium hypochlorite) is a universal bleach for all white fabrics" and use it on wool, silk, or coloured.' }
          ],
            remediations: { 'javelle-water-sodium-hypochlorite-is': { steps: ['Show the student a microscopic image of wool fibre damaged by hypochlorite (scale lifting, cortical cell rupture).', 'Have them test 3 reagents (dilute ammonia, H₂O₂, NaOCl) on wool/silk/cotton swatches — observe fibre disintegration.', 'Re-teach the reagent classification table (NCERT p.205) emphasising "oxidising bleaches" column — circle NaOCl, label.', 'Practice 5 "fiber-first" drills: given stain + fabric, student names permitted reagents before stating removal steps.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
