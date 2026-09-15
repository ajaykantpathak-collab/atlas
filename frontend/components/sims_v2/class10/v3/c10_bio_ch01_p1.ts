import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch01_p1: SimDef = {
    id: 'v3_c10_bio_ch01_p1',
    title: 'Life Processes · Part 1/2',
    subtitle: 'Trace food to energy, and find out what your body throws out and why',
    classLevel: 10, subject: 'biology', topic: 'Life Processes · Part 1/2',
    chapters: ['c10_bio_ch01'],
    nodeIds: ['c10_bio_cbse_01_001', 'c10_bio_cbse_01_002', 'c10_bio_cbse_01_003', 'c10_bio_cbse_01_004', 'c10_bio_cbse_01_005', 'c10_bio_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sports physiologist figuring out what fuels a sprinter', intro: 'A student eats an aloo paratha at 7:30 and is cycling hard by 8:00. Somewhere between the plate and the leg muscles, four life processes are working in perfect relay.', goal: 'Explain how the four life processes interlock, and never again confuse excretion with simply removing undigested food.' },
    discovery: {
        question: 'You ate a samosa an hour ago — where is it right now, doing what?',
        options: ['Being broken into molecules your cells absorb', 'Sitting whole in your stomach', 'Already converted to pure energy', 'Filtered out by the liver'],
        answer: 'Being broken into molecules your cells absorb',
        hook: 'Digestion is disassembly — a samosa becomes glucose, amino acids, and fatty acids on an assembly line.',
    },
    teaching: [
        { title: 'What Are Life Processes: Nutrition, Respiration, Transportation, Excretion', text: 'Life processes are the essential biological activities — nutrition, respiration, transportation, and excretion — that living organisms perform continuously to maintain homeostasis, obtain energy, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_01_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Push the food to 60% — which organ is it in?',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_001', title: 'What Are Life Processes: Nutrition, Respiration, Transportation, Excretion',
          caseStudy: { intro: 'Observe a Class 10 student rushing to school: they eat a paratha for breakfast (nutrition), breathe heavily while running for the bus (respiration), feel their.',
            decisions: [{ prompt: 'Define "life processes" and name the four fundamental life processes identified in the CBSE Class 10 curriculum.', options: [
                { text: 'Life processes are the essential biological activities that living organisms perform to', outcome: 'Life processes are the essential biological activities that living organisms perform to maintain.' },
                { text: 'growth', outcome: 'Not quite — Students believe that "plants perform photosynthesis during the day and respiration only at night.".', reveals: 'plants-perform-photosynthesis-during-the' },
                { text: 'reproduction', outcome: 'Not quite — Students believe that "plants perform photosynthesis during the day and respiration only at night.".', reveals: 'plants-perform-photosynthesis-during-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_002', title: 'Nutrition in Plants: Autotrophic Nutrition and Photosynthesis',
          caseStudy: { intro: 'Observe a tulsi plant on your windowsill — it grows steadily without being fed cooked food, unlike a pet dog.',
            decisions: [{ prompt: 'Define autotrophic nutrition and name the two main categories of autotrophs based on their energy source.', options: [
                { text: 'Autotrophic nutrition is a mode where organisms synthesize their own food from inorganic', outcome: 'Autotrophic nutrition is a mode where organisms synthesize their own food from inorganic substances.' },
                { text: 'plants eat soil', outcome: 'Not quite — Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂).', reveals: 'the-oxygen-released-during-photosynthesis' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_003', title: 'Photosynthesis: Raw Materials, Process and Site (Chloroplast, Stomata)',
          caseStudy: { intro: 'Observe a potted plant on a sunny windowsill: its leaves are broad, green, and oriented toward light.',
            decisions: [{ prompt: 'State the four raw materials required for photosynthesis and the two main products formed.', options: [
                { text: 'Raw materials: carbon dioxide, water, light energy, chlorophyll', outcome: 'Raw materials: carbon dioxide, water, light energy, chlorophyll.' },
                { text: 'oxygen', outcome: 'Not quite — Students believe that the oxygen released in photosynthesis comes from carbon dioxide because the.', reveals: 'the-oxygen-released-in-photosynthesis' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_004', title: 'Nutrition in Animals: Human Digestive System Overview',
          caseStudy: { intro: 'Imagine eating a typical Indian lunch: roti (carbohydrate), dal (protein), and a spoonful of ghee (fat).',
            decisions: [{ prompt: 'Name the three major associated digestive glands of the human digestive system and state the main secretion of each that enters the.', options: [
                { text: 'The three major associated glands are: (1) Salivary glands', outcome: 'The three major associated glands are: (1) Salivary glands — secrete saliva containing salivary.' },
                { text: 'associated glands', outcome: 'Not quite — Students believe the **stomach is the main site of digestion** because it visibly churns food and.', reveals: 'the-stomach-is-the-main' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_005', title: 'Digestion: Mouth, Oesophagus, Stomach (Salivary and Gastric Action)',
          caseStudy: { intro: 'Watch a student eat a piece of roti — notice how chewing breaks it down and it tastes slightly sweet after a minute; that sweetness is salivary amylase.',
            decisions: [{ prompt: 'Name the enzyme present in saliva that acts on starch, state its substrate and product, and give the pH at which it works optimally.', options: [
                { text: 'Salivary amylase (ptyalin) acts on starch (substrate) to produce maltose (product) at an', outcome: 'Salivary amylase (ptyalin) acts on starch (substrate) to produce maltose (product) at an optimal.' },
                { text: 'pepsin acts on starch in the mouth at pH 2', outcome: 'Not quite — Students believe salivary amylase continues digesting starch in the stomach because "enzymes keep.', reveals: 'salivary-amylase-continues-digesting-starch' },
                { text: 'enzymes keep working', outcome: 'Not quite — Students believe salivary amylase continues digesting starch in the stomach because "enzymes keep.', reveals: 'salivary-amylase-continues-digesting-starch' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_006', title: 'Digestion: Small Intestine (Bile, Pancreatic Juice, Absorption)',
          caseStudy: { intro: 'Imagine eating a plate of rajma-chawal (kidney beans and rice) — the carbohydrates, proteins, and fats need to be broken down into tiny molecules that can.',
            decisions: [{ prompt: 'Name the three major enzymes present in pancreatic juice and state the specific substrate each acts upon.', options: [
                { text: 'Pancreatic amylase acts on starch (carbohydrates), trypsin acts on proteins, and', outcome: 'Pancreatic amylase acts on starch (carbohydrates), trypsin acts on proteins, and pancreatic lipase.' },
                { text: 'pepsin or salivary amylase', outcome: 'Not quite — Students often think bile *digests* fats because it\'s secreted into the duodenum along with.', reveals: 'bile-digests-fats-because-it' },
                { text: 'bile *digests* fats', outcome: 'Not quite — Students often think bile *digests* fats because it\'s secreted into the duodenum along with.', reveals: 'bile-digests-fats-because-it' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes · Part 1/2', spots: [
            { id: 's1', label: 'Nutrition in Plants Autotrophic Nutrition and Photosynthesis', prompt: 'Which idea is this? — Autotrophic nutrition is a mode of nutrition in which organisms synthesize their own.', answer: 'Nutrition in Plants Autotrophic Nutrition and Photosynthesis', options: ['Nutrition in Plants Autotrophic Nutrition and Photosynthesis', 'Nutrition in Animals Human Digestive System Overview', 'Digestion Small Intestine Bile Pancreatic Juice Absorption'] },
            { id: 's2', label: 'Nutrition in Animals Human Digestive System Overview', prompt: 'Which idea is this? — The human digestive system is an organ system comprising the alimentary canal (mouth.', answer: 'Nutrition in Animals Human Digestive System Overview', options: ['Nutrition in Animals Human Digestive System Overview', 'Nutrition in Plants Autotrophic Nutrition and Photosynthesis', 'Digestion Small Intestine Bile Pancreatic Juice Absorption'] },
            { id: 's3', label: 'Digestion Small Intestine Bile Pancreatic Juice Absorption', prompt: 'Which idea is this? — The small intestine is the primary site for complete digestion of carbohydrates.', answer: 'Digestion Small Intestine Bile Pancreatic Juice Absorption', options: ['Digestion Small Intestine Bile Pancreatic Juice Absorption', 'Nutrition in Plants Autotrophic Nutrition and Photosynthesis', 'Nutrition in Animals Human Digestive System Overview'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Aarav skips breakfast and plays a full football match at school. By half-time his leg muscles are burning and feel heavy, and he is panting hard. His teammate tells him to just breathe faster for a minute and he will be fine.',
            decisions: [{ prompt: 'What is actually happening in his muscles, and what will really help?', options: [
                { text: 'His muscles have outrun their oxygen supply and switched to anaerobic respiration, which releases little energy and produces lactic acid — that acid buildup is the burn. Rest, slow deep breathing, and some food help because the lactic acid must be carried to the liver and broken down using oxygen.', outcome: 'This matches how respiration and transport really work: oxygen delivery is limited by blood flow, not just breathing speed, and clearing lactic acid takes minutes of aerobic respiration.' },
                { text: 'The burn means his muscles ran out of oxygen completely, so breathing as fast as possible will instantly turn the lactic acid back into energy and he can sprint again.', outcome: 'Breathing faster cannot instantly raise oxygen delivery — that depends on the heart and circulation — and lactic acid still has to be processed biochemically, which takes time.', reveals: 'instant-oxygen-fix' },
                { text: 'It is simple dehydration — a big glass of water and the burning will stop immediately.', outcome: 'Water helps hydration but does not remove the lactic acid or restore the glucose his muscles need.', reveals: 'fatigue-is-dehydration' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ingestion to egestion — your body is a processing plant. Now you know the floor plan.',
            decisions: [{ prompt: 'What comes next? Life Processes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Life Processes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_001', difficulty: 'standard',
          question: 'Life processes are the essential biological activities — nutrition.',
          hint: 'If stuck, revisit c9_bio_ch1_9 (mitochondria function) and c9_bio_ch2_4 (xylem and phloem.',
          misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Transportation is only needed in large animals like humans because they have a heart and blood vessels.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'blood circulation', 'plants perform photosynthesis during the day and respiration only at night', '"plants perform photosynthesis during the day and respiration only at night'],
                  hint: 'If stuck, revisit c9_bio_ch1_9 (mitochondria function) and c9_bio_ch2_4 (xylem and phloem.',
                  misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong reasoning: they think.' }
          ],
            remediations: { 'plants-perform-photosynthesis-during-the': { steps: ['Place a potted plant in a dark cupboard for 24 hours — observe that it still respires (use a CO₂ sensor or lime water.', 'Place the same plant in bright light — test for O₂ release (photosynthesis) while noting CO₂ is still produced.', 'Explain that roots, which lack chlorophyll, respire continuously day and night.', 'Write the balanced equations side-by-side: Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll).'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Excretion is simply the removal of undigested food from the body." Provide a biologically accurate correction.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'plants perform photosynthesis during the day and respiration only at night', '"plants perform photosynthesis during the day and respiration only at night'],
                  hint: 'If stuck, revisit c9_bio_ch1_9 (mitochondria function) and c9_bio_ch2_4 (xylem and phloem.',
                  misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong reasoning: they think.' }
          ],
            remediations: { 'plants-perform-photosynthesis-during-the': { steps: ['Place a potted plant in a dark cupboard for 24 hours — observe that it still respires (use a CO₂ sensor or lime water.', 'Place the same plant in bright light — test for O₂ release (photosynthesis) while noting CO₂ is still produced.', 'Explain that roots, which lack chlorophyll, respire continuously day and night.', 'Write the balanced equations side-by-side: Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll).'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_002', difficulty: 'standard',
          question: 'Autotrophic nutrition is a mode of nutrition in which organisms synthesize.',
          hint: 'If stuck, review c9_bio_ch1_10 (plastids) and c8_bio_ch1_6 (plant cell vs animal cell).',
          misconception: 'Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂), not water (H₂O).',
          parts: [
                { id: 'a', prompt: 'Why is chlorophyll essential for photosynthesis in plants, but not for chemoautotrophs? Explain using the energy source for each group.', answer: 'Chlorophyll is essential for photoautotrophs',
                  options: ['Chlorophyll is essential for photoautotrophs', 'chlorophyll makes food'],
                  hint: 'If stuck, review c9_bio_ch1_10 (plastids) and c8_bio_ch1_6 (plant cell vs animal cell) to recall.',
                  misconception: 'Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂), not water (H₂O).' }
          ],
            remediations: { 'the-oxygen-released-during-photosynthesis': { steps: ['Revisit the photosynthesis equation — note that 6 CO₂ provide 12 O atoms, but 6 O₂ released has 12 O atoms; if O₂ came.', 'Recall Class 9 (c9_bio_ch1_10) — chloroplast structure: thylakoids split H₂O (photolysis).', 'Watch a 2-minute animation of photolysis showing H₂O → 2H⁺ + 2e⁻ + ½O₂.', 'Write the correct statement: "Oxygen released in photosynthesis comes from water, not carbon dioxide."'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_003', difficulty: 'standard',
          question: 'Photosynthesis is the biological process by which green plants, algae, and.',
          hint: 'Revisit c9_bio_ch1_10 (plastids/chloroplast structure) and c7_bio_ch03_004.',
          misconception: 'Students believe that the oxygen released in photosynthesis comes from carbon dioxide because the equation shows CO₂.',
          parts: [
                { id: 'a', prompt: 'State the four raw materials required for photosynthesis and the two main products formed.', answer: 'Raw materials: carbon dioxide, water, light energy, chlorophyll',
                  options: ['Raw materials: carbon dioxide, water, light energy, chlorophyll', 'oxygen'],
                  hint: 'Revisit c9_bio_ch1_10 (plastids/chloroplast structure) and c7_bio_ch03_004 (photosynthesis raw.',
                  misconception: 'Students believe that the oxygen released in photosynthesis comes from carbon dioxide because the equation shows CO₂ on the left and O₂.' }
          ],
            remediations: { 'the-oxygen-released-in-photosynthesis': { steps: ['Show the balanced equation with isotopic labels: 6CO₂ + 6H₂O* → C₆H₁₂O₆ + 6O₂* (asterisk = O¹⁸).', 'Ask "If O¹⁸ is in water, where does it appear?"', 'Demonstrate with a diagram of Z-scheme: water → PSII → O₂.', 'Contrast with respiration where O₂ is consumed.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_004', difficulty: 'standard',
          question: 'The human digestive system is an organ system comprising the alimentary canal.',
          hint: 'Review Class 7 nodes c7_bio_ch02_003 (Alimentary Canal) and c7_bio_ch02_004–007.',
          misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.',
          parts: [
                { id: 'a', prompt: 'Name the three major associated digestive glands of the human digestive system and state the main secretion of each that enters the duodenum.', answer: 'The three major associated glands are: (1) Salivary glands',
                  options: ['The three major associated glands are: (1) Salivary glands', 'associated glands'],
                  hint: 'Review Class 7 nodes c7_bio_ch02_003 (Alimentary Canal) and c7_bio_ch02_004–007 (Digestion.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' },
                { id: 'b', prompt: 'A person undergoes surgical removal of the gallbladder (cholecystectomy).', answer: 'Fat digestion becomes less efficient, especially after a fatty meal',
                  options: ['Fat digestion becomes less efficient, especially after a fatty meal', 'fat digestion stops completely', 'bile is not produced', 'stopped'],
                  hint: 'Review Class 7 nodes c7_bio_ch02_003 (Alimentary Canal) and c7_bio_ch02_004–007 (Digestion.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' },
                { id: 'c', prompt: 'Compare the role of salivary amylase (ptyalin) and pancreatic amylase in carbohydrate digestion. Why does salivary amylase stop working in the stomach?', answer: 'Both enzymes hydrolyse starch (polysaccharide) into maltose (disaccharide)',
                  options: ['Both enzymes hydrolyse starch (polysaccharide) into maltose (disaccharide)', 'salivary amylase digests protein', 'both work in stomach'],
                  hint: 'Review Class 7 nodes c7_bio_ch02_003 (Alimentary Canal) and c7_bio_ch02_004–007 (Digestion.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' }
          ],
            remediations: { 'the-stomach-is-the-main': { steps: ['**Visual comparison:** Draw two columns — "Stomach" vs "Small Intestine".', 'List: enzymes present, pH, surface area features, % absorption.', '**Hands-on model:** Use a long tube (small intestine) with folded inner surface (villi) vs a sac (stomach) to show.', '**Enzyme mapping:** Create a flowchart: Mouth → salivary amylase (starch); Stomach → pepsin (protein); Duodenum →.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_005', difficulty: 'standard',
          question: 'Digestion in the mouth, oesophagus, and stomach involves mechanical breakdown.',
          hint: 'Review c7_bio_ch02_004 and c7_bio_ch02_005 for enzyme details, and c9_bio_ch2_5 for.',
          misconception: 'Students believe salivary amylase continues digesting starch in the stomach because "enzymes keep working." They forget.',
          parts: [
                { id: 'a', prompt: 'Explain why no significant digestion occurs in the oesophagus even though food passes through it.', answer: 'The oesophagus lacks digestive glands and enzymes',
                  options: ['The oesophagus lacks digestive glands and enzymes', 'amylase continues working in the oesophagus', 'enzymes keep working', 'digestion continues everywhere'],
                  hint: 'Review c7_bio_ch02_004 and c7_bio_ch02_005 for enzyme details, and c9_bio_ch2_5 for epithelial.',
                  misconception: 'Students believe salivary amylase continues digesting starch in the stomach because "enzymes keep working." They forget that pepsin works.' },
                { id: 'b', prompt: 'A student eats a meal rich in protein (dal) and starch (rice).', answer: 'In the stomach, pepsinogen (inactive precursor) is activated by HCl to pepsin',
                  options: ['In the stomach, pepsinogen (inactive precursor) is activated by HCl to pepsin', 'pepsin digests starch', 'amylase works in the stomach', 'enzymes keep working'],
                  hint: 'Review c7_bio_ch02_004 and c7_bio_ch02_005 for enzyme details, and c9_bio_ch2_5 for epithelial.',
                  misconception: 'Students believe salivary amylase continues digesting starch in the stomach because "enzymes keep working." They forget that pepsin works.' }
          ],
            remediations: { 'salivary-amylase-continues-digesting-starch': { steps: ['Revisit c7_bio_ch02_004 (salivary amylase action) and c7_bio_ch02_005 (gastric juice composition).', 'Draw a pH-enzyme activity graph for amylase (peak at 6.8, zero at 2) and pepsin (peak at 2, zero at 7).', 'Trace a starch molecule: mouth (amylase active) → oesophagus (no enzyme) → stomach (amylase denatured, pepsin active.', 'Write the CBSE-style answer: "Salivary amylase is inactivated by HCl in the stomach; starch digestion resumes only.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_006', difficulty: 'standard',
          question: 'The small intestine is the primary site for complete digestion.',
          hint: 'If stuck, revisit c10_bio_cbse_01_005 (stomach digestion) and c7_bio_ch02_006 (small.',
          misconception: 'Students often think bile *digests* fats because it\'s secreted into the duodenum along with pancreatic juice.',
          parts: [
                { id: 'a', prompt: 'Name the three major enzymes present in pancreatic juice and state the specific substrate each acts upon.', answer: 'Pancreatic amylase acts on starch (carbohydrates), trypsin acts on proteins, and',
                  options: ['Pancreatic amylase acts on starch (carbohydrates), trypsin acts on proteins, and', 'pepsin or salivary amylase', 'bile *digests* fats'],
                  hint: 'If stuck, revisit c10_bio_cbse_01_005 (stomach digestion) and c7_bio_ch02_006 (small intestine.',
                  misconception: 'Students often think bile *digests* fats because it\'s secreted into the duodenum along with pancreatic juice.' },
                { id: 'b', prompt: 'A patient has a blocked bile duct. Predict which nutrient\'s digestion will be most severely affected and explain why the other two major nutrients are less.', answer: 'Fat digestion will be most severely affected',
                  options: ['Fat digestion will be most severely affected', 'bile *digests* fats'],
                  hint: 'If stuck, revisit c10_bio_cbse_01_005 (stomach digestion) and c7_bio_ch02_006 (small intestine.',
                  misconception: 'Students often think bile *digests* fats because it\'s secreted into the duodenum along with pancreatic juice.' }
          ],
            remediations: { 'bile-digests-fats-because-it': { steps: ['Show a video/demo of oil + water vs. oil + soap water — shake both; soap (like bile) creates tiny droplets (emulsion).', 'Add pancreatic lipase to both; only the emulsified one turns cloudy→clear as fats are digested.', 'Have student write the difference in their own words: "Bile emulsifies, lipase digests."', 'Practice a board-style question: "State the role of bile in fat digestion.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
