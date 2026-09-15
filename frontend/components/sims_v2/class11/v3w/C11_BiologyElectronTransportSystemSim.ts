import type { SimDef } from '../../engine/types';
import C11_BiologyElectronTransportSystemSim from '../../../simulations/c6_12/C11_BiologyElectronTransportSystemSim';

/** v3 wrapped master — C11_BiologyElectronTransportSystemSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyelectrontransportsystemsim: SimDef = {
    id: 'v3w_c11_biologyelectrontransportsystemsim',
    title: 'Electron Transport System',
    subtitle: 'Covers the step-wise accounting of ATP, NADH, and FADH₂ produced per glucose molecule in.',
    classLevel: 11, subject: 'biology', topic: 'Respiratory Balance Sheet: ATP Yield',
    chapters: [],
    nodeIds: ['c11_bio_cbse_12_007', 'c11_bio_cbse_08_006', 'c11_bio_cbse_12_001', 'c11_bio_cbse_12_005', 'c11_bio_cbse_12_006', 'c11_bio_cbse_11_001', 'c11_bio_cbse_11_002', 'c11_bio_cbse_11_003', 'c11_bio_cbse_11_008', 'c11_bio_cbse_08_005', 'c11_bio_cbse_09_007', 'c11_bio_cbse_14_001', 'c11_bio_cbse_15_008', 'c11_bio_cbse_16_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a marathon runner crossing the finish line — their muscles have consumed massive amounts of glucose.', goal: 'Master Electron Transport System.' },
    discovery: {
        question: 'A student claims: "Since fermentation yields only 2 ATP per glucose and aerobic respiration yields 38 ATP, aerobic respiration is 19 times more efficient.".',
        options: ['The statement is incorrect', 'fold increase in ATP count', 'fold increase in energy capture efficiency'],
        answer: 'The statement is incorrect',
        hook: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.',
    },
    teaching: [
        { title: 'The respiratory balance sheet is a.', text: 'The respiratory balance sheet is a theoretical calculation of the net ATP yield from the complete aerobic oxidation of one molecule of glucose, accounting for ATP generated via substrate-level.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_007', title: 'The respiratory balance sheet is a.',
          scaffold: { problem: 'A Class 11 student is asked to calculate the net ATP yield from one glucose molecule in a hepatocyte (liver cell) using the theoretical.',
            steps: [
            { text: 'Identify the four stages of aerobic respiration and their cellular locations: glycolysis (cytosol), pyruvate oxidation.' },
            { text: 'Recall the ATP/NADH/FADH₂ yield per glucose for each stage: Glycolysis: 2 ATP (substrate) + 2 NADH; Pyruvate oxidation:.' },
            { text: 'Apply the P/O ratios for oxidative phosphorylation: each NADH yields 3 ATP, each FADH₂ yields 2 ATP.' },
            { text: 'Calculate total: Substrate-level ATP = 2 (glycolysis) + 2 (Krebs GTP) = 4 ATP.' },
            { text: 'Verify no ATP investment omitted: glycolysis invested 2 ATP but produced 4 ATP (net +2), already accounted in.', faded: true, blankAnswer: '38 ATP per glucose in hepatocyte (malate-aspartate.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_08_006', title: 'Mitochondria are double-membrane-bound.',
          scaffold: { problem: 'A Class 11 student examines electron micrographs of two organelles: Organelle A shows a smooth outer membrane and a highly folded inner.',
            steps: [
            { text: 'Identify Organelle A — smooth outer membrane + highly folded inner membrane (cristae) with F₁ particles (ATP synthase).' },
            { text: 'Identify Organelle B — double membrane + thylakoids stacked as grana + stroma lamellae = chloroplast.' },
            { text: 'Name metabolic process in A — aerobic respiration (Krebs cycle in matrix, oxidative phosphorylation on cristae).' },
            { text: 'Name metabolic process in B — photosynthesis (light reactions on thylakoids, Calvin cycle in stroma).' },
            { text: 'Link cristae architecture to function — folding increases inner membrane surface area ~5-fold, packing more electron.' },
            { text: 'Link thylakoid architecture to function — stacking into grana concentrates photosystems II and I for efficient light.' },
            { text: 'Synthesise — both use chemiosmotic coupling across highly folded internal membranes, but energy source differs:.', faded: true, blankAnswer: 'Organelle A = mitochondrion; process = aerobic respiration;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_001', title: 'Cellular respiration is the.',
          scaffold: { problem: 'A farmer stores wheat grains (14% moisture) and groundnut pods (8% moisture) in a silo.',
            steps: [
            { text: 'Identify the respiratory substrate in each seed – wheat endosperm is starch (carbohydrate), groundnut cotyledon is oil.' },
            { text: 'Recall RQ values – carbohydrate RQ = 1.0, fat RQ ≈ 0.7. Lower RQ means more O₂ consumed per CO₂ released.' },
            { text: 'In a sealed silo, O₂ depletes faster for fat respiration because fat requires more O₂ per carbon atom oxidised.' },
            { text: 'Wheat (carb) switches to anaerobic fermentation sooner as O₂ drops, producing ethanol/CO₂ (smell) and heat (only 2.' },
            { text: 'Conclude – the warmth and smell in wheat are due to anaerobic fermentation triggered by faster O₂ depletion relative to.', faded: true, blankAnswer: 'Wheat (starch) has RQ=1, so O₂ and CO₂ exchange 1:1; in a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_005', title: 'The Krebs cycle (tricarboxylic acid/TCA.',
          scaffold: { problem: 'A researcher isolates mitochondria from spinach leaves and adds acetyl-CoA labeled with ¹⁴C on the methyl carbon (CH₃-¹⁴CO-SCoA).',
            steps: [
            { text: 'Identify the entry point — acetyl-CoA (2C) condenses with oxaloacetate (4C) via citrate synthase to form citrate (6C).' },
            { text: 'Trace citrate → isocitrate via aconitase (isomerization, no carbon loss).' },
            { text: 'Isocitrate → α-ketoglutarate via isocitrate dehydrogenase: oxidative decarboxylation removes the carboxyl carbon.' },
            { text: 'α-ketoglutarate → succinyl-CoA via α-ketoglutarate dehydrogenase: another oxidative decarboxylation removes the.' },
            { text: 'Succinyl-CoA → succinate → fumarate → malate → oxaloacetate: symmetric molecules (succinate, fumarate) scramble the.' },
            { text: 'Conclusion: After one turn, ¹⁴C is distributed equally between the two carboxyl carbons of regenerated oxaloacetate.', faded: true, blankAnswer: 'After one turn, ¹⁴C resides in both carboxyl groups of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_006', title: 'The Electron Transport Chain (ETC) is a.',
          scaffold: { problem: 'Calculate the total ATP yield from one molecule of glucose in a hepatocyte (liver cell) assuming the malate-aspartate shuttle operates for.',
            steps: [
            { text: 'Glycolysis (cytosol) yields 2 ATP (substrate-level) + 2 NADH. Malate-aspartate shuttle transfers these 2 NADH into.' },
            { text: 'Pyruvate oxidation (matrix) produces 2 NADH per glucose → 2 × 3 = 6 ATP.' },
            { text: 'Krebs cycle (matrix) produces 2 ATP (via GTP) + 6 NADH + 2 FADH₂ per glucose. NADH → 6 × 3 = 18 ATP.' },
            { text: 'Sum all stages: 8 (glycolysis) + 6 (pyruvate oxidation) + 24 (Krebs) = 38 ATP.' },
            { text: 'Verify no step omitted: 4 substrate-level ATP (2 glycolysis + 2 Krebs) + 34 oxidative ATP (10 NADH × 3 + 2 FADH₂ × 2 =.', faded: true, blankAnswer: '38 ATP per glucose in hepatocyte (malate-aspartate shuttle).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_11_001', title: 'Photosynthesis in higher plants is a.',
          scaffold: { problem: 'A researcher isolates chloroplasts from spinach and measures oxygen evolution under monochromatic light of 440 nm (blue), 550 nm (green),.',
            steps: [
            { text: 'Identify the pigments absorbing at each wavelength – 440 nm: chlorophyll a (Soret band) + chlorophyll b + carotenoids;.' },
            { text: 'Recall that oxygen evolution requires non-cyclic electron flow through BOTH PS II and PS I (Z-scheme).' },
            { text: 'At 440 nm and 650 nm, both photosystems are excited (antenna pigments absorb broadly), driving high O₂ evolution.' },
            { text: 'At 550 nm, poor absorption by all pigments → low excitation of both photosystems → low O₂.' },
            { text: 'At 700 nm, only PS I (P700) is excited; PS II (P680) receives little light → electron flow limited by PS II → cyclic.' },
            { text: 'Conclude that balanced excitation of both photosystems maximises O₂ evolution; far-red light causes PS I.', faded: true, blankAnswer: 'High O₂ at 440 nm and 650 nm (both photosystems excited);.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_08_006', title: 'Identify each idea',
          dissect: { specimen: 'Electron Transport System', spots: [
            { id: 's1', label: 'The respiratory balance sheet is', prompt: 'Which idea is this? — The respiratory balance sheet is a theoretical calculation of the net ATP yield from the.', answer: 'The respiratory balance sheet is', options: ['The respiratory balance sheet is', 'Mitochondria are double-membrane-bound organelles present', 'Cellular respiration is the enzyme-mediated', 'The Krebs cycle tricarboxylic acidTCA'] },
            { id: 's2', label: 'Mitochondria are double-membrane-bound organelles present', prompt: 'Which idea is this? — Mitochondria are double-membrane-bound organelles present in almost all eukaryotic cells.', answer: 'Mitochondria are double-membrane-bound organelles present', options: ['Mitochondria are double-membrane-bound organelles present', 'The respiratory balance sheet is', 'Cellular respiration is the enzyme-mediated', 'The Krebs cycle tricarboxylic acidTCA'] },
            { id: 's3', label: 'Cellular respiration is the enzyme-mediated', prompt: 'Which idea is this? — Cellular respiration is the enzyme-mediated, stepwise oxidative breakdown of organic.', answer: 'Cellular respiration is the enzyme-mediated', options: ['Cellular respiration is the enzyme-mediated', 'The respiratory balance sheet is', 'Mitochondria are double-membrane-bound organelles present', 'The Krebs cycle tricarboxylic acidTCA'] },
            { id: 's4', label: 'The Krebs cycle tricarboxylic acidTCA', prompt: 'Which idea is this? — The Krebs cycle (tricarboxylic acid/TCA cycle) is a cyclic metabolic pathway occurring in.', answer: 'The Krebs cycle tricarboxylic acidTCA', options: ['The Krebs cycle tricarboxylic acidTCA', 'The respiratory balance sheet is', 'Mitochondria are double-membrane-bound organelles present', 'Cellular respiration is the enzyme-mediated'] },
            { id: 's5', label: 'The Electron Transport Chain ETC', prompt: 'Which idea is this? — The Electron Transport Chain (ETC) is a series of protein complexes (I-IV) and mobile.', answer: 'The Electron Transport Chain ETC', options: ['The Electron Transport Chain ETC', 'The respiratory balance sheet is', 'Mitochondria are double-membrane-bound organelles present', 'Cellular respiration is the enzyme-mediated'] },
            { id: 's6', label: 'Photosynthesis in higher plants is', prompt: 'Which idea is this? — Photosynthesis in higher plants is a physico-chemical process occurring in chloroplasts.', answer: 'Photosynthesis in higher plants is', options: ['Photosynthesis in higher plants is', 'The respiratory balance sheet is', 'Mitochondria are double-membrane-bound organelles present', 'Cellular respiration is the enzyme-mediated'] }
          ] } }
    ],
    explore: { component: C11_BiologyElectronTransportSystemSim, prompt: 'Explore the interactive — Electron Transport System' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_007', difficulty: 'standard',
          question: 'The respiratory balance sheet is a theoretical calculation of the net ATP yield.',
          hint: 'If stuck, review the summary tables of glycolysis (c11_bio_cbse_12_002), pyruvate.',
          misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.',
          parts: [
                { id: 'a', prompt: 'State the net ATP yield from one molecule of glucose during aerobic respiration as per the theoretical respiratory balance sheet, and list the four main stages.', answer: 'The theoretical net yield is 38 ATP per glucose',
                  options: ['The theoretical net yield is 38 ATP per glucose', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' },
                { id: 'b', prompt: 'Explain why the 2 NADH produced in glycolysis yield either 6 ATP or 4 ATP in the final balance sheet, depending on the shuttle system operating in the cell.', answer: 'Glycolysis occurs in the cytosol, but oxidative phosphorylation occurs in the',
                  options: ['Glycolysis occurs in the cytosol, but oxidative phosphorylation occurs in the', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' },
                { id: 'c', prompt: 'A researcher measures ATP production in two cell types: liver cells (using malate-aspartate shuttle) and skeletal muscle cells (using glycerol-3-phosphate.', answer: 'Liver (malate-aspartate): Glycolysis: 2 ATP (substrate) + 6 ATP (2 NADH) = 8',
                  options: ['Liver (malate-aspartate): Glycolysis: 2 ATP (substrate) + 6 ATP (2 NADH) = 8', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' }
          ],
            remediations: { 'the-38-atp-value-is': { steps: ['Revisit the mitochondrial inner membrane structure and the impermeability to NAD⁺/NADH (from c11_bio_cbse_12_006).', 'Draw the two shuttle systems side-by-side, tracing electron flow from cytosolic NADH to mitochondrial ETS entry points.', 'Recalculate the balance sheet twice — once per shuttle — to see the 2 ATP difference.', 'List three biosynthetic pathways that withdraw Krebs cycle intermediates (e.g., amino acid synthesis from.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since fermentation yields only 2 ATP per glucose and aerobic respiration yields 38 ATP, aerobic respiration is 19 times more efficient.".', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'fold increase in ATP count', 'fold increase in energy capture efficiency', 'the 38 ATP value is a fixed, universal constant for all eukaryotic cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 38 ATP value is a fixed, universal constant for all eukaryotic cells.' }
          ],
            remediations: { 'the-38-atp-value-is': { steps: ['Revisit the mitochondrial inner membrane structure and the impermeability to NAD⁺/NADH (from c11_bio_cbse_12_006).', 'Draw the two shuttle systems side-by-side, tracing electron flow from cytosolic NADH to mitochondrial ETS entry points.', 'Recalculate the balance sheet twice — once per shuttle — to see the 2 ATP difference.', 'List three biosynthetic pathways that withdraw Krebs cycle intermediates (e.g., amino acid synthesis from.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_006', difficulty: 'standard',
          question: 'Mitochondria are double-membrane-bound organelles present in almost all.',
          hint: 'Revisit c11_bio_cbse_08_002 (Prokaryotic vs Eukaryotic Cells) — specifically the table.',
          misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since both mitochondria and chloroplasts have double membranes, the inner membrane of mitochondria is equivalent to the thylakoid membrane.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'plant mitochondria', 'chloroplasts are "plant mitochondria"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in plants while.' },
                { id: 'b', prompt: 'Predict the effect on cellular ATP levels if a specific inhibitor blocks the mitochondrial outer membrane porin channels (VDAC) in a hepatocyte actively.', answer: 'ATP levels in the cytosol would decrease',
                  options: ['ATP levels in the cytosol would decrease', 'no effect because mitochondria make their own ATP', 'plant mitochondria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in plants while.' }
          ],
            remediations: { 'chloroplasts-are-plant-mitochondria-i': { steps: ['Observe a prepared slide of maize root tip (non-photosynthetic tissue) stained with Janus green — mitochondria.', 'Measure O₂ consumption in dark-adapted spinach leaves using a respirometer — O₂ uptake continues in darkness, proving.', 'Construct a Venn diagram comparing inputs/outputs of mitochondria (glucose + O₂ → CO₂ + H₂O + ATP) vs chloroplasts (CO₂.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in.',
          parts: [
                { id: 'a', prompt: 'A research team isolates a mutant Arabidopsis line lacking functional stromules (stroma-filled tubules extending from chloroplasts).', answer: 'Stromules facilitate metabolite exchange between chloroplast stroma and cytosol,',
                  options: ['Stromules facilitate metabolite exchange between chloroplast stroma and cytosol,', 'photosynthesis is impaired', 'plant mitochondria', 'chloroplasts are "plant mitochondria"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in plants while.' }
          ],
            remediations: { 'chloroplasts-are-plant-mitochondria-i': { steps: ['Observe a prepared slide of maize root tip (non-photosynthetic tissue) stained with Janus green — mitochondria.', 'Measure O₂ consumption in dark-adapted spinach leaves using a respirometer — O₂ uptake continues in darkness, proving.', 'Construct a Venn diagram comparing inputs/outputs of mitochondria (glucose + O₂ → CO₂ + H₂O + ATP) vs chloroplasts (CO₂.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_001', difficulty: 'standard',
          question: 'Cellular respiration is the enzyme-mediated, stepwise oxidative breakdown of.',
          hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_9) – specifically the mitochondrial.',
          misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.',
          parts: [
                { id: 'a', prompt: 'A maize root tip cell is treated with a mitochondrial uncoupler (allows H⁺ to leak across inner membrane without ATP synthase).', answer: 'rate of glycolysis, (',
                  options: ['rate of glycolysis, (', 'plants respire only through stomata', '"plants respire only through stomata" and forget lenticels in woody stems/roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.' }
          ],
            remediations: { 'plants-respire-only-through-stomata': { steps: ['Take a cross-section of a woody stem (e.g., bougainvillea) and a root tip (onion) under microscope; identify lenticels.', 'Perform the classic "germinating seeds in thermos flask" experiment: one flask with live seeds, one with boiled seeds;.', 'Re-read NCERT 12.1 "Do Plants Breathe?" focusing on the three reasons plants don\'t need respiratory organs.', 'Draw a concept map: "O₂ entry → stomata (leaves) / lenticels (stems) / diffusion through soil air (roots) → all living.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since fats yield more energy per gram than carbohydrates, a plant seed storing oil (e.g., groundnut) should have a higher respiratory.', answer: 'Claim is **incorrect**',
                  options: ['Claim is **incorrect**', 'plants respire only through stomata', '"plants respire only through stomata" and forget lenticels in woody stems/roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.' },
                { id: 'b', prompt: 'Design a simple experiment using germinating seeds (moong vs. groundnut), KOH, and a respirometer to demonstrate the difference in RQ between carbohydrate and.', answer: 'Setup: Two respirometers with equal *dry mass* of germinating moong (starch) and',
                  options: ['Setup: Two respirometers with equal *dry mass* of germinating moong (starch) and', 'plants respire only through stomata', '"plants respire only through stomata" and forget lenticels in woody stems/roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.' }
          ],
            remediations: { 'plants-respire-only-through-stomata': { steps: ['Take a cross-section of a woody stem (e.g., bougainvillea) and a root tip (onion) under microscope; identify lenticels.', 'Perform the classic "germinating seeds in thermos flask" experiment: one flask with live seeds, one with boiled seeds;.', 'Re-read NCERT 12.1 "Do Plants Breathe?" focusing on the three reasons plants don\'t need respiratory organs.', 'Draw a concept map: "O₂ entry → stomata (leaves) / lenticels (stems) / diffusion through soil air (roots) → all living.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_005', difficulty: 'standard',
          question: 'The Krebs cycle (tricarboxylic acid/TCA cycle) is a cyclic metabolic pathway.',
          hint: 'Revisit node c11_bio_cbse_12_004 and practice writing the pyruvate dehydrogenase complex.',
          misconception: 'Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that turn.',
          parts: [
                { id: 'a', prompt: 'Compare the carbon fate of the two carboxyl groups of oxaloacetate over two turns of the TCA cycle.', answer: 'The two carboxyl carbons of oxaloacetate are NOT lost in the first turn',
                  options: ['The two carboxyl carbons of oxaloacetate are NOT lost in the first turn', 'first turn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that turn.' }
          ],
            remediations: { 'the-two-co-released-per': { steps: ['Draw citrate with distinct labels for the two -CH₂COO⁻ arms (one from acetyl-CoA, one from oxaloacetate).', 'Trace each arm through aconitase → isocitrate → α-ketoglutarate → succinyl-CoA → succinate → fumarate → malate →.', 'Note that the "acetyl-CoA arm" becomes the *distal* carboxyl of α-ketoglutarate and is lost at the α-KG dehydrogenase.', 'Repeat for second turn to see the original acetyl-CoA carbons leave. Use different colored pens for each turn.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that turn.',
          parts: [
                { id: 'a', prompt: 'Compare the carbon fate of the two carboxyl groups of oxaloacetate over two turns of the TCA cycle.', answer: 'The two carboxyl carbons of oxaloacetate are NOT lost in the first turn',
                  options: ['The two carboxyl carbons of oxaloacetate are NOT lost in the first turn', 'first turn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that turn.' }
          ],
            remediations: { 'the-two-co-released-per': { steps: ['Draw citrate with distinct labels for the two -CH₂COO⁻ arms (one from acetyl-CoA, one from oxaloacetate).', 'Trace each arm through aconitase → isocitrate → α-ketoglutarate → succinyl-CoA → succinate → fumarate → malate →.', 'Note that the "acetyl-CoA arm" becomes the *distal* carboxyl of α-ketoglutarate and is lost at the α-KG dehydrogenase.', 'Repeat for second turn to see the original acetyl-CoA carbons leave. Use different colored pens for each turn.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_006', difficulty: 'standard',
          question: 'The Electron Transport Chain (ETC) is a series of protein complexes (I-IV) and.',
          hint: 'If stuck, review the summary tables in nodes c11_bio_cbse_12_002, c11_bio_cbse_12_004,.',
          misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.',
          parts: [
                { id: 'a', prompt: 'Explain why the oxidation of one NADH molecule yields approximately 3 ATP while one FADH₂ yields only 2 ATP, even though both donate electrons to the same.', answer: 'NADH donates electrons at Complex I',
                  options: ['NADH donates electrons at Complex I', 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.' },
                { id: 'b', prompt: 'A researcher adds a specific inhibitor that blocks electron transfer from cytochrome c to Complex IV in isolated mitochondria supplied with NADH and ADP.', answer: 'oxygen consumption, (',
                  options: ['oxygen consumption, (', 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.' }
          ],
            remediations: { 'the-38-atp-per-glucose': { steps: ['Revisit node c11_bio_cbse_12_007 (Respiratory Balance Sheet) and list the four explicit assumptions stated in NCERT.', 'Draw the two NADH shuttles (malate-aspartate vs glycerol-3-phosphate) and trace how each delivers electrons to the ETC.', 'Calculate ATP yield for one glucose in liver (malate-aspartate shuttle) vs skeletal muscle (glycerol-3-phosphate.', 'Read NCERT lines "these calculations can be made only on certain assumptions...'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Cyanide poisoning causes death because it inhibits ATP synthase, preventing ATP production." Is this correct?', answer: 'The statement is INCORRECT',
                  options: ['The statement is INCORRECT', 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.' },
                { id: 'b', prompt: 'Design a simple experiment using isolated mitochondria, a Clark-type oxygen electrode, and specific substrates/inhibitors to demonstrate that electron.', answer: 'Add mitochondria + succinate (FADH₂ substrate) → steady O₂ consumption (State 2)',
                  options: ['Add mitochondria + succinate (FADH₂ substrate) → steady O₂ consumption (State 2)', 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.' }
          ],
            remediations: { 'the-38-atp-per-glucose': { steps: ['Revisit node c11_bio_cbse_12_007 (Respiratory Balance Sheet) and list the four explicit assumptions stated in NCERT.', 'Draw the two NADH shuttles (malate-aspartate vs glycerol-3-phosphate) and trace how each delivers electrons to the ETC.', 'Calculate ATP yield for one glucose in liver (malate-aspartate shuttle) vs skeletal muscle (glycerol-3-phosphate.', 'Read NCERT lines "these calculations can be made only on certain assumptions...'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_001', difficulty: 'standard',
          question: 'Photosynthesis in higher plants is a physico-chemical process occurring in.',
          hint: 'Review c9_bio_ch1_10 (Plastids: Chloroplasts, Chromoplasts and Leucoplasts) – focus on.',
          misconception: 'Students believe "chlorophyll b and carotenoids are just backup pigments that work only when chlorophyll a is damaged.".',
          parts: [
                { id: 'a', prompt: 'Name the four pigments separated by paper chromatography of a green leaf extract, and state the colour each appears on the chromatogram.', answer: 'The four pigments are: chlorophyll a (bright or blue-green), chlorophyll b',
                  options: ['The four pigments are: chlorophyll a (bright or blue-green), chlorophyll b', 'chlorophyll is green'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chlorophyll b and carotenoids are just backup pigments that work only when chlorophyll a is damaged." The exact wrong.' }
          ],
            remediations: { 'chlorophyll-b-and-carotenoids-are': { steps: ['Revisit paper chromatography (Class 11 practical) – physically separate pigments and observe four bands; measure Rf.', 'Plot absorption spectra of each isolated pigment (use spectrophotometer or virtual lab) – see chlorophyll b peaks at.', 'Overlay on action spectrum – note photosynthesis occurs at 450–500 nm where only accessory pigments absorb.', 'Read NCERT Figure 11.3c caption: "accessory pigments enable wider wavelength utilisation AND protect chlorophyll a from.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
