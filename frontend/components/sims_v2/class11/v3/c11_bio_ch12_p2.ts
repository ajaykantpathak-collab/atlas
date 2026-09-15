import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch12_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch12_p2: SimDef = {
    id: 'v3_c11_bio_ch12_p2',
    title: 'Respiration in Plants · Part 2/2',
    subtitle: 'Trace glucose\'s journey through three compartments and see where each ATP is actually minted.',
    classLevel: 11, subject: 'biology', topic: 'Respiration in Plants · Part 2/2',
    chapters: ['c11_bio_ch12'],
    nodeIds: ['c11_bio_cbse_12_007', 'c11_bio_cbse_12_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biochemist diagnosing why sprouting seeds warm a sealed jar overnight', intro: 'The jar is warm and misted — proof of respiration. Your job is to say precisely where inside each cell the heat and water came from.', goal: 'Locate glycolysis, pyruvate oxidation, the Krebs cycle, and the ETS within the cell, and contrast fermentation fates of pyruvate.' },
    discovery: {
        question: 'Ask where respiration happens and everyone says \'mitochondria — the powerhouse\'. Yet the first ten reactions, the ones that split glucose in half, never enter it. Where does glycolysis run, and why does that location matter?',
        options: ['In the cytoplasm — it\'s the universal, oxygen-free first stage every cell runs before mitochondria get involved', 'In the chloroplast, paired with photosynthesis', 'In the nucleus, near the DNA that controls it', 'In the cell membrane, where oxygen enters'],
        answer: 'In the cytoplasm — it\'s the universal, oxygen-free first stage every cell runs before mitochondria get involved',
        hook: 'Respiration is compartmentalised — cytoplasm, matrix, inner membrane — and that geography is exactly how the cell captures energy stepwise instead of wasting it in one burst.',
    },
    teaching: [
        { title: 'Respiratory Balance Sheet: ATP Yield', text: 'The respiratory balance sheet is a theoretical calculation of the net ATP yield from the complete aerobic oxidation of one molecule of glucose, accounting for ATP generated via substrate-level.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_12_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Follow one glucose molecule from the cytoplasm to the mitochondrial matrix to the inner membrane, then predict what an uncoupler does to a root tip that can burn oxygen but can\'t bank ATP.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_007', title: 'Respiratory Balance Sheet: ATP Yield',
          scaffold: { problem: 'A Class 11 student is asked to calculate the net ATP yield from one glucose molecule in a hepatocyte (liver cell) using the theoretical.',
            steps: [
            { text: 'Identify the four stages of aerobic respiration and their cellular locations: glycolysis (cytosol), pyruvate oxidation.' },
            { text: 'Recall the ATP/NADH/FADH₂ yield per glucose for each stage: Glycolysis: 2 ATP (substrate) + 2 NADH; Pyruvate oxidation.' },
            { text: 'Apply the P/O ratios for oxidative phosphorylation: each NADH yields 3 ATP, each FADH₂ yields 2 ATP.' },
            { text: 'Calculate total: Substrate-level ATP = 2 (glycolysis) + 2 (Krebs GTP) = 4 ATP.' },
            { text: 'Verify no ATP investment omitted: glycolysis invested 2 ATP but produced 4 ATP (net +2), already accounted.', faded: true, blankAnswer: '38 ATP per glucose in hepatocyte (malate-aspartate.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'Respiration in Plants · Part 2/2', spots: [
            { id: 's1', label: 'Respiratory Balance Sheet ATP Yield', prompt: 'Which idea is this? — The respiratory balance sheet is a theoretical calculation of the net ATP yield from the.', answer: 'Respiratory Balance Sheet ATP Yield', options: ['Respiratory Balance Sheet ATP Yield', 'Amphibolic Pathway Respiratory Intermediates'] },
            { id: 's2', label: 'Amphibolic Pathway Respiratory Intermediates', prompt: 'Which idea is this? — The amphibolic pathway refers to the respiratory pathway (glycolysis, pyruvate oxidation.', answer: 'Amphibolic Pathway Respiratory Intermediates', options: ['Amphibolic Pathway Respiratory Intermediates', 'Respiratory Balance Sheet ATP Yield'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After three days of heavy rain, the potted plants on your school\'s terrace garden start wilting even though the soil is soaked. A classmate explains: \'Roots can\'t respire because the leaves\' stomata closed in the cloudy weather — the plant is suffocating from the top down.\'',
            decisions: [{ prompt: 'What\'s the real reason the roots are struggling?', options: [
                { text: 'Water fills the soil\'s air spaces, blocking O2 diffusion directly into root epidermal cells — roots get their oxygen from soil air (and via aerenchyma/lenticels in some plants), not shipped down from photosynthesis or through stomata. Saturated soil means hypoxic roots, whatever the leaves do.', outcome: 'Each plant part respires using locally available O2; the failure point in waterlogging is at the root surface, not the leaf.' },
                { text: 'The classmate is right — stomata are the plant\'s only breathing pores, so closed stomata starve the roots of oxygen.', outcome: 'Stomata serve leaves; stems use lenticels and roots absorb O2 from soil air spaces. Waterlogging kills by flooding those spaces, not by closing stomata.', reveals: 'stomata-only-breathing' },
                { text: 'Roots get O2 transported down through the phloem from photosynthesising leaves — cloudy skies cut off the supply.', outcome: 'Phloem carries sugars, not oxygen; root respiration depends on O2 diffusing from soil air into epidermal cells.', reveals: 'oxygen-via-phloem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_008', title: 'You made it',
          caseStudy: { intro: 'You replaced \'mitochondria make energy\' with a three-address route — glycolysis outside, Krebs in the matrix, the electron chain on the membrane.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_007', difficulty: 'standard',
          question: 'The respiratory balance sheet is a theoretical calculation of the net ATP yield.',
          hint: 'If stuck, review the summary tables of glycolysis (c11_bio_cbse_12_002), pyruvate.',
          misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.',
          parts: [
                { id: 'a', prompt: 'State the net ATP yield from one molecule of glucose during aerobic respiration as per the theoretical respiratory balance sheet, and list the four main stages.', answer: 'The theoretical net yield is 38 ATP per glucose',
                  options: ['The theoretical net yield is 38 ATP per glucose', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'If stuck, review the summary tables of glycolysis (c11_bio_cbse_12_002), pyruvate oxidation.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' },
                { id: 'b', prompt: 'Explain why the 2 NADH produced in glycolysis yield either 6 ATP or 4 ATP in the final balance sheet, depending on the shuttle system operating in the cell.', answer: 'Glycolysis occurs in the cytosol, but oxidative phosphorylation occurs in the',
                  options: ['Glycolysis occurs in the cytosol, but oxidative phosphorylation occurs in the', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'If stuck, review the summary tables of glycolysis (c11_bio_cbse_12_002), pyruvate oxidation.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' },
                { id: 'c', prompt: 'A researcher measures ATP production in two cell types: liver cells (using malate-aspartate shuttle) and skeletal muscle cells (using glycerol-3-phosphate.', answer: 'Liver (malate-aspartate): Glycolysis: 2 ATP (substrate) + 6 ATP (2 NADH) = 8',
                  options: ['Liver (malate-aspartate): Glycolysis: 2 ATP (substrate) + 6 ATP (2 NADH) = 8', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'If stuck, review the summary tables of glycolysis (c11_bio_cbse_12_002), pyruvate oxidation.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' }
          ],
            remediations: { 'the-38-atp-value-is': { steps: ['Revisit the mitochondrial inner membrane structure and the impermeability to NAD⁺/NADH (from c11_bio_cbse_12_006).', 'Draw the two shuttle systems side-by-side, tracing electron flow from cytosolic NADH to mitochondrial ETS entry points.', 'Recalculate the balance sheet twice — once per shuttle — to see the 2 ATP difference.', 'List three biosynthetic pathways that withdraw Krebs cycle intermediates (e.g., amino acid synthesis from.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since fermentation yields only 2 ATP per glucose and aerobic respiration yields 38 ATP, aerobic respiration is 19 times more efficient.".', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'fold increase in ATP count', 'fold increase in energy capture efficiency', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'If stuck, review the summary tables of glycolysis (c11_bio_cbse_12_002), pyruvate oxidation.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' }
          ],
            remediations: { 'the-38-atp-value-is': { steps: ['Revisit the mitochondrial inner membrane structure and the impermeability to NAD⁺/NADH (from c11_bio_cbse_12_006).', 'Draw the two shuttle systems side-by-side, tracing electron flow from cytosolic NADH to mitochondrial ETS entry points.', 'Recalculate the balance sheet twice — once per shuttle — to see the 2 ATP difference.', 'List three biosynthetic pathways that withdraw Krebs cycle intermediates (e.g., amino acid synthesis from.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_008', difficulty: 'standard',
          question: 'The amphibolic pathway refers to the respiratory pathway (glycolysis, pyruvate.',
          hint: 'Revisit the Krebs cycle steps (Node 005) and focus on the carbon skeleton transformations.',
          misconception: 'Students often think \'amphibolic\' means the pathway runs forward for catabolism and backward for anabolism (like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The amphibolic pathway refers to the respiratory pathway (glycolysis, pyruvate oxidation,',
                  options: ['The amphibolic pathway refers to the respiratory pathway (glycolysis, pyruvate oxidation,', 'Cellular respiration is the enzyme-mediated, stepwise oxidative breakdown of organic', 'Glycolysis is the universal, ten-step enzymatic pathway in the cytoplasm where one', 'Fermentation is an anaerobic metabolic pathway where pyruvic acid (the end product of'],
                  hint: 'Revisit the Krebs cycle steps (Node 005) and focus on the carbon skeleton transformations — draw.',
                  misconception: 'Students often think \'amphibolic\' means the pathway runs forward for catabolism and backward for anabolism (like a reversible reaction).' }
          ],
            remediations: { 'amphibolic-means-the-pathway-runs': { steps: ['Draw the Krebs cycle as a circle with arrows showing carbon entry (acetyl-CoA) and exit (CO₂).', 'Add \'exit arrows\' at citrate (fatty acids), α-ketoglutarate (glutamate family), succinyl-CoA (heme), oxaloacetate.', 'Label each exit arrow with the biosynthetic product.', 'Explain that the cycle keeps turning because anaplerotic reactions (pyruvate → oxaloacetate) refill the pool.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
