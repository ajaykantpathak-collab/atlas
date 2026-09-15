import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch10_p2: SimDef = {
    id: 'v3_c12_bio_ch10_p2',
    title: 'Microbes in Human Welfare · Part 2/2',
    subtitle: 'Your kitchen runs on microbes — that spoonful of dahi is a starter culture.',
    classLevel: 12, subject: 'biology', topic: 'Microbes in Human Welfare · Part 2/2',
    chapters: ['c12_bio_ch10'],
    nodeIds: ['c12_bio_cbse_10_007', 'c12_bio_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Food microbiologist', intro: 'Long before labs existed, humans were running biotech in their kitchens — here\'s the science behind it.', goal: 'Explain microbial roles in household products, antibiotics and industrial enzymes.' },
    discovery: {
        question: 'A spoonful of yesterday\'s curd turns a pot of warm milk into dahi by morning. What did that spoonful actually carry?',
        options: ['A starter culture of Lactobacillus that ferments milk sugar into lactic acid', 'Enzymes left over from yesterday that digest the new milk directly', 'Vitamins that thicken the milk proteins overnight', 'Nothing — curd forms spontaneously in any warm milk'],
        answer: 'A starter culture of Lactobacillus that ferments milk sugar into lactic acid',
        hook: 'It looks like magic or chemistry — it\'s inoculation. That spoonful is a living workforce, and the same principle scales from your kitchen to industrial fermenters producing antibiotics and enzymes.',
    },
    teaching: [
        { title: 'Microbes as Biofertilizers: Nitrogen Fixation', text: 'Biofertilizers are microorganisms (bacteria, cyanobacteria, fungi) that enhance soil fertility by fixing atmospheric nitrogen into ammonia, solubilizing phosphorus, or decomposing organic matter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_10_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Trace microbes through your home and industry: explain curd-setting and cheese-making at household scale, then connect the same fermentation logic to antibiotic and enzyme production in fermenters.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_007', title: 'Microbes as Biofertilizers: Nitrogen Fixation',
          caseStudy: { intro: 'Observe a paddy field in Punjab or a soybean farm in Madhya Pradesh — farmers apply white granules (urea) but also use packets of black powder labeled.',
            decisions: [{ prompt: 'Name the enzyme responsible for biological nitrogen fixation and state its two key properties that dictate the cellular environment.', options: [
                { text: 'Nitrogenase; it is extremely O₂-sensitive (irreversibly inactivated by O₂) and requires', outcome: 'Nitrogenase; it is extremely O₂-sensitive (irreversibly inactivated by O₂) and requires high energy.' },
                { text: 'nitrate reductase', outcome: 'Not quite — Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall.', reveals: 'nitrogen-fixation-conversion-of-n' },
                { text: 'nitrogenase works in aerobic conditions', outcome: 'Not quite — Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall.', reveals: 'nitrogen-fixation-conversion-of-n' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_008', title: 'Microbes in Gobar Gas Production',
          caseStudy: { intro: 'Walk into any rural Indian household with a gobar gas plant: you see a buried brick dome fed daily with a slurry of fresh dung and water, and a gas pipe.',
            decisions: [{ prompt: 'Name the four sequential stages of anaerobic digestion in a gobar gas plant and the primary microbial group responsible for each stage.', options: [
                { text: 'Correct answer: (1) Hydrolysis', outcome: 'Correct answer: (1) Hydrolysis — hydrolytic bacteria (e.g., *Clostridium*, *Bacteroides*) secrete.' },
                { text: 'gobar gas is produced by bacteria', outcome: 'Not quite — Students think "gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium.', reveals: 'gobar-gas-is-produced-by' },
                { text: '"gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium', outcome: 'Not quite — Students think "gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium.', reveals: 'gobar-gas-is-produced-by' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Microbes in Human Welfare · Part 2/2', spots: [
            { id: 's1', label: 'Microbes as Biofertilizers Nitrogen Fixation', prompt: 'Which idea is this? — Biofertilizers are microorganisms (bacteria, cyanobacteria, fungi) that enhance soil.', answer: 'Microbes as Biofertilizers Nitrogen Fixation', options: ['Microbes as Biofertilizers Nitrogen Fixation', 'Microbes in Gobar Gas Production'] },
            { id: 's2', label: 'Microbes in Gobar Gas Production', prompt: 'Which idea is this? — Gobar gas production is the anaerobic digestion of cattle dung (gobar) by a consortium.', answer: 'Microbes in Gobar Gas Production', options: ['Microbes in Gobar Gas Production', 'Microbes as Biofertilizers Nitrogen Fixation'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_007', title: 'A real-world call',
          caseStudy: { intro: 'Bacteria evolve antibiotic resistance because we overuse antibiotics — in medicine AND in farm animals raised for meat. Stopping farm use helps everyone\'s future; it raises food prices now.',
            decisions: [{ prompt: 'Who pays for antibiotic stewardship?', options: [
                { text: 'Ban farm use — resistance is a shared emergency', outcome: 'The public-health answer; the cost lands on farmers and on the price of food — someone absorbs it either way.' },
                { text: 'Regulate, don\'t ban — target misuse not use', outcome: 'The surgical answer — treatment stays, growth-promotion goes; only works if enforcement is real.' },
                { text: 'Let the market decide — consumers pay for antibiotic-free', outcome: 'The market answer; the poorest consumers can\'t pay the premium, so the cheapest meat keeps the practice alive.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two students run a kitchen experiment: identical milk and starter curd, one bowl kept at 15°C and one at 35°C. After 8 hours the warm bowl is firm and tangy while the cold bowl is still liquid — the cold-batch student concludes \'the Lactobacillus died\'.',
            decisions: [{ prompt: 'What actually explains the difference?', options: [
                { text: 'Lactobacillus is mesophilic with an optimum around 30–40°C — at 15°C it grows but far more slowly, so too little lactic acid accumulates to coagulate casein in 8 hours; it isn\'t dead, just slow.', outcome: 'Growth rate, not survival, is the limit — give the cold batch more time or warmer conditions and the same starter still sets curd.' },
                { text: 'He\'s right — 15°C kills the starter bacteria, which is why no curd formed.', outcome: 'Suboptimal temperature only stretches generation time; the population creeps up instead of crashing.', reveals: 'cold-kills-starter' },
                { text: 'The cold bowl just needed no starter at all — milk left at room temperature curdles on its own anyway.', outcome: 'Without a starter, random contaminants dominate and spoil the milk; the inoculum is what drives clean lactic fermentation.', reveals: 'milk-self-curdles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_008', title: 'You made it',
          caseStudy: { intro: 'You now recognise the invisible workforce in your kitchen. Microbial products are quick board marks — and the entry point to food science and industrial microbiology careers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_007', difficulty: 'standard',
          question: 'Biofertilizers are microorganisms (bacteria, cyanobacteria, fungi) that enhance.',
          hint: 'Review c11_bio_cbse_05_005 (root nodule structure) and c9_bio_ch4_1 (nitrogen cycle).',
          misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.',
          parts: [
                { id: 'a', prompt: 'A farmer inoculates soybean seeds with *Rhizobium japonicum* but gets poor nodulation. The soil pH is 5.2 and he applied 100 kg/ha urea at sowing.', answer: '(1) Low pH (5.2) inhibits *Rhizobium* survival and nod gene expression',
                  options: ['(1) Low pH (5.2) inhibits *Rhizobium* survival and nod gene expression', 'poor quality inoculant', 'nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)'],
                  hint: 'Review c11_bio_cbse_05_005 (root nodule structure) and c9_bio_ch4_1 (nitrogen cycle) — focus on the.',
                  misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.' }
          ],
            remediations: { 'nitrogen-fixation-conversion-of-n': { steps: ['Revisit Class 11 nitrogen metabolism (c11_bio_cbse_13_003) — specifically the GS-GOGAT cycle and nitrogen assimilation.', 'Draw the nodule cross-section labeling infection thread, bacteroids, leghemoglobin, vascular bundle — label O₂.', 'Write the balanced equation: N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂ + 16ADP + 16Pi.', 'Re-attempt Diagnostic Q1 and Q4. If still stuck, watch the NCERT video on "Root Nodule Formation" and note the.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Blue-green algae (BGA) like *Nostoc* and *Anabaena* are ideal biofertilizers for all Indian crops because they fix nitrogen and add.', answer: 'Flaw: BGA require standing water for growth and dispersal',
                  options: ['Flaw: BGA require standing water for growth and dispersal', 'nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)'],
                  hint: 'Review c11_bio_cbse_05_005 (root nodule structure) and c9_bio_ch4_1 (nitrogen cycle) — focus on the.',
                  misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.' },
                { id: 'b', prompt: 'Design a simple low-cost experiment for a Class 12 student to demonstrate that *Rhizobium* inoculation increases nitrogen content in legume plants compared.', answer: 'Grow soybean in sterilized sand culture (N-free nutrient solution) in pots: (1)',
                  options: ['Grow soybean in sterilized sand culture (N-free nutrient solution) in pots: (1)', 'nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)'],
                  hint: 'Review c11_bio_cbse_05_005 (root nodule structure) and c9_bio_ch4_1 (nitrogen cycle) — focus on the.',
                  misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.' }
          ],
            remediations: { 'nitrogen-fixation-conversion-of-n': { steps: ['Revisit Class 11 nitrogen metabolism (c11_bio_cbse_13_003) — specifically the GS-GOGAT cycle and nitrogen assimilation.', 'Draw the nodule cross-section labeling infection thread, bacteroids, leghemoglobin, vascular bundle — label O₂.', 'Write the balanced equation: N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂ + 16ADP + 16Pi.', 'Re-attempt Diagnostic Q1 and Q4. If still stuck, watch the NCERT video on "Root Nodule Formation" and note the.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_008', difficulty: 'standard',
          question: 'Gobar gas production is the anaerobic digestion of cattle dung (gobar) by.',
          hint: 'If stuck on archaeal vs bacterial features, review c11_bio_cbse_02_002; if stuck.',
          misconception: 'Students think "gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium.',
          parts: [
                { id: 'a', prompt: 'Name the four sequential stages of anaerobic digestion in a gobar gas plant and the primary microbial group responsible for each stage.', answer: 'Correct answer: (1) Hydrolysis',
                  options: ['Correct answer: (1) Hydrolysis', 'gobar gas is produced by bacteria', '"gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium'],
                  hint: 'If stuck on archaeal vs bacterial features, review c11_bio_cbse_02_002; if stuck on anaerobic.',
                  misconception: 'Students think "gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium.' },
                { id: 'b', prompt: 'Why does a gobar gas digester fail to produce methane if the slurry pH drops below 6.0, even though hydrolytic and acidogenic bacteria are still active?', answer: 'Correct answer: Methanogenic archaea are extremely pH-sensitive',
                  options: ['Correct answer: Methanogenic archaea are extremely pH-sensitive', 'digester souring', 'bacteria die at low pH', 'gobar gas is produced by bacteria'],
                  hint: 'If stuck on archaeal vs bacterial features, review c11_bio_cbse_02_002; if stuck on anaerobic.',
                  misconception: 'Students think "gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium.' },
                { id: 'c', prompt: 'A 10 m³ fixed-dome plant is fed 50 kg fresh cattle dung (20% total solids, 80% volatile solids) daily.', answer: 'Step 1: Total solids = 50 kg × 0.20 = 10 kg TS/day',
                  options: ['Step 1: Total solids = 50 kg × 0.20 = 10 kg TS/day', 'gobar gas is produced by bacteria', '"gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium'],
                  hint: 'If stuck on archaeal vs bacterial features, review c11_bio_cbse_02_002; if stuck on anaerobic.',
                  misconception: 'Students think "gobar gas is produced by bacteria" and write *Methanobacterium* as a bacterium.' }
          ],
            remediations: { 'gobar-gas-is-produced-by': { steps: ['Revisit c11_bio_cbse_02_002 (Kingdom Monera: Bacteria and Archaea) — compare archaeal vs bacterial cell membrane lipids.', 'Re-watch the methanogenesis animation in c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration) focusing on coenzyme.', 'Redo Diagnostic Question 1, explicitly writing "Archaea" for methanogens.', 'Attempt a board-style short answer: "Methanogens are archaea, not bacteria; two differences: (i) ether-linked.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
