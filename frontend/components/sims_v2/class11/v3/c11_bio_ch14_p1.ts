import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch14_p1: SimDef = {
    id: 'v3_c11_bio_ch14_p1',
    title: 'Breathing and Exchange of Gases · Part 1/2',
    subtitle: 'Walk the airway from nostril to alveolus and see structure shed everything exchange doesn\'t need.',
    classLevel: 11, subject: 'biology', topic: 'Breathing and Exchange of Gases · Part 1/2',
    chapters: ['c11_bio_ch14'],
    nodeIds: ['c11_bio_cbse_14_001', 'c11_bio_cbse_14_002', 'c11_bio_cbse_14_003', 'c11_bio_cbse_14_004', 'c11_bio_cbse_14_005', 'c11_bio_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emergency resident working out where an inhaled peanut went', intro: 'A child inhaled a peanut; it stopped at the trachea\'s fork. Right lung or left? The anatomy of the two bronchi already made that decision.', goal: 'Trace the respiratory pathway, contrast conducting versus exchange zones, and link cartilage, epithelium, and pleura to their functions.' },
    discovery: {
        question: 'The trachea\'s cartilage rings are shaped like the letter C, open at the back — an odd \'defect\' for a pipe that must stay open. Which neighbour does that gap exist to accommodate?',
        options: ['The oesophagus — it swells forward into the gap every time you swallow a food bolus', 'The thyroid gland, which needs room to pulse', 'The vagus nerve, which threads through the opening', 'The carotid artery, which expands with each heartbeat'],
        answer: 'The oesophagus — it swells forward into the gap every time you swallow a food bolus',
        hook: 'Every \'flaw\' in airway anatomy is a negotiated compromise — C-rings, cilia, and collapsing bronchioles each solve a specific engineering problem.',
    },
    teaching: [
        { title: 'Respiratory Organs: Human Respiratory System', text: 'The human respiratory system is a specialized organ system comprising the external nostrils, nasal chamber, pharynx, larynx, trachea, bronchial tree (primary, secondary, tertiary bronchi and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_14_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Trace an air molecule from nostril to alveolus, then use bronchial anatomy to predict which lung a stray peanut will lodge in — and explain why the airway\'s lining changes from ciliated pseudostratified to simple squamous along the way.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_001', title: 'Respiratory Organs: Human Respiratory System',
          caseStudy: { intro: 'Place your hand on your chest and take a deep breath — you feel your ribcage expand and your abdomen rise.',
            decisions: [{ prompt: 'Name the specific type of epithelium lining the trachea and primary bronchi, and state the function of its two main cell types.', options: [
                { text: 'The trachea and primary bronchi are lined by **ciliated pseudostratified columnar', outcome: 'The trachea and primary bronchi are lined by **ciliated pseudostratified columnar epithelium with.' },
                { text: 'simple squamous epithelium', outcome: 'Not quite — Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes".', reveals: 'gas-exchange-occurs-in-the' },
                { text: 'stratified squamous epithelium', outcome: 'Not quite — Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes".', reveals: 'gas-exchange-occurs-in-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_14_002', title: 'Mechanism of Breathing: Inspiration and Expiration',
          scaffold: { problem: 'A healthy male (TV = 500 mL, IRV = 3000 mL, ERV = 1100 mL, RV = 1200 mL) breathes quietly at 14 breaths/min.',
            steps: [
            { text: 'Identify known volumes. Resting end-expiratory volume = FRC = ERV + RV = 1100 + 1200 = 2300 mL. This is V₁.' },
            { text: 'Determine final volume after forced inspiration. Forced inspiration adds TV + IRV to FRC.' },
            { text: 'Identify initial pressure. At end of quiet expiration (FRC), intra-pulmonary pressure = atmospheric pressure = 760.' },
            { text: 'Apply Boyle\'s Law (P₁V₁ = P₂V₂) to find P₂ (intra-pulmonary pressure at end of forced inspiration). P₂ = P₁V₁ / V₂.' },
            { text: 'Substitute values. P₂ = (760 mm Hg × 2300 mL) / 5800 mL = 1,748,000 / 5800 ≈ 301.4 mm Hg.' },
            { text: 'Interpret result. Intra-pulmonary pressure drops to ~301 mm Hg, creating a massive gradient (760 - 301 = 459 mm Hg).', faded: true, blankAnswer: 'Intra-pulmonary pressure ≈ 301 mm Hg at the theoretical end.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_003', title: 'Exchange of Gases: Alveolar Exchange',
          caseStudy: { intro: 'Hold your breath for 30 seconds – the urge to breathe comes from rising CO₂, not low O₂.',
            decisions: [{ prompt: 'State the partial pressures of O₂ and CO₂ in atmospheric air, alveolar air, and deoxygenated blood arriving at the alveoli.', options: [
                { text: 'Atmospheric air: pO₂ ≈ 159 mm Hg, pCO₂ ≈ 0.3 mm Hg', outcome: 'Atmospheric air: pO₂ ≈ 159 mm Hg, pCO₂ ≈ 0.3 mm Hg. Alveolar air: pO₂ ≈ 104 mm Hg, pCO₂ ≈ 40 mm Hg.' },
                { text: 'CO₂ moves from tissues to alveoli against a bigger difference', outcome: 'Not quite — Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves.', reveals: 'the-partial-pressure-gradient-for' },
                { text: 'alveolar pO₂ equals atmospheric 159 mm Hg', outcome: 'Not quite — Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves.', reveals: 'the-partial-pressure-gradient-for' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_14_004', title: 'Transport of Oxygen: Haemoglobin and Dissociation Curve',
          scaffold: { problem: 'Calculate the volume of oxygen delivered to tissues per 100 mL of blood when arterial blood (pO₂ = 95 mm Hg, 97% saturated) passes through.',
            steps: [
            { text: 'Determine arterial O₂ content: 15 g/dL Hb × 1.34 mL O₂/g Hb × 0.97 saturation = 19.5 mL O₂/dL (bound) + 0.3.' },
            { text: 'Determine venous O₂ content at tissue pO₂ 40 mm Hg: from dissociation curve, saturation ≈ 75%.' },
            { text: 'Calculate arteriovenous O₂ difference: 19.8 – 15.2 = 4.6 mL O₂/dL delivered.' },
            { text: 'Compare with NCERT statement "every 100 mL oxygenated blood delivers around 5 mL O₂" — matches closely.' },
            { text: 'Conclude that the steep part of the curve (40–95 mm Hg) allows large O₂ release for a modest pO₂ drop.', faded: true, blankAnswer: 'Approximately 4.6–5.0 mL O₂ per 100 mL blood, consistent.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_005', title: 'Transport of Carbon Dioxide: Bicarbonate and Carbamino',
          caseStudy: { intro: 'Observe what happens when you hold your breath for 30 seconds — the urge to breathe comes not from lack of oxygen but from rising CO₂ levels in your blood.',
            decisions: [{ prompt: 'What percentage of CO₂ is transported as bicarbonate in human blood, and which enzyme catalyses its formation inside erythrocytes?', options: [
                { text: '70% of CO₂ is transported as bicarbonate (HCO₃⁻), catalysed by carbonic anhydrase inside', outcome: '70% of CO₂ is transported as bicarbonate (HCO₃⁻), catalysed by carbonic anhydrase inside.' },
                { text: '20-25% as bicarbonate', outcome: 'Not quite — Students believe the chloride shift "moves CO₂" across the RBC membrane.', reveals: 'the-chloride-shift-moves-co' },
                { text: 'carbonic anhydrase in plasma', outcome: 'Not quite — Students believe the chloride shift "moves CO₂" across the RBC membrane.', reveals: 'the-chloride-shift-moves-co' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_006', title: 'Regulation of Respiration: Neural and Chemical',
          caseStudy: { intro: 'Notice how your breathing automatically speeds up when you climb the stairs to your classroom on the third floor, but you don\'t consciously decide to breathe.',
            decisions: [{ prompt: 'Name the specific brain region that houses the respiratory rhythm centre and state its primary function in breathing regulation.', options: [
                { text: 'The respiratory rhythm centre is located in the medulla oblongata', outcome: 'The respiratory rhythm centre is located in the medulla oblongata; it generates the basic rhythmic.' },
                { text: 'cerebrum', outcome: 'Not quite — Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get.', reveals: 'oxygen-is-the-primary-chemical' },
                { text: 'we breathe to get oxygen', outcome: 'Not quite — Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get.', reveals: 'oxygen-is-the-primary-chemical' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'Breathing and Exchange of Gases · Part 1/2', spots: [
            { id: 's1', label: 'Respiratory Organs Human Respiratory System', prompt: 'Which idea is this? — The human respiratory system is a specialized organ system comprising the external.', answer: 'Respiratory Organs Human Respiratory System', options: ['Respiratory Organs Human Respiratory System', 'Mechanism of Breathing Inspiration and Expiration', 'Exchange of Gases Alveolar Exchange', 'Transport of Oxygen Haemoglobin and Dissociation Curve'] },
            { id: 's2', label: 'Mechanism of Breathing Inspiration and Expiration', prompt: 'Which idea is this? — Mechanism of breathing is the physiological process by which air moves into (inspiration).', answer: 'Mechanism of Breathing Inspiration and Expiration', options: ['Mechanism of Breathing Inspiration and Expiration', 'Respiratory Organs Human Respiratory System', 'Exchange of Gases Alveolar Exchange', 'Transport of Oxygen Haemoglobin and Dissociation Curve'] },
            { id: 's3', label: 'Exchange of Gases Alveolar Exchange', prompt: 'Which idea is this? — Alveolar exchange is the process of passive diffusion of oxygen (O₂) and carbon dioxide.', answer: 'Exchange of Gases Alveolar Exchange', options: ['Exchange of Gases Alveolar Exchange', 'Respiratory Organs Human Respiratory System', 'Mechanism of Breathing Inspiration and Expiration', 'Transport of Oxygen Haemoglobin and Dissociation Curve'] },
            { id: 's4', label: 'Transport of Oxygen Haemoglobin and Dissociation Curve', prompt: 'Which idea is this? — Transport of oxygen in human blood occurs primarily through reversible binding.', answer: 'Transport of Oxygen Haemoglobin and Dissociation Curve', options: ['Transport of Oxygen Haemoglobin and Dissociation Curve', 'Respiratory Organs Human Respiratory System', 'Mechanism of Breathing Inspiration and Expiration', 'Exchange of Gases Alveolar Exchange'] },
            { id: 's5', label: 'Transport of Carbon Dioxide Bicarbonate and Carbamino', prompt: 'Which idea is this? — Transport of carbon dioxide in blood occurs through three mechanisms: (1) dissolution.', answer: 'Transport of Carbon Dioxide Bicarbonate and Carbamino', options: ['Transport of Carbon Dioxide Bicarbonate and Carbamino', 'Respiratory Organs Human Respiratory System', 'Mechanism of Breathing Inspiration and Expiration', 'Exchange of Gases Alveolar Exchange'] },
            { id: 's6', label: 'Regulation of Respiration Neural and Chemical', prompt: 'Which idea is this? — Regulation of respiration is the neural and chemical control mechanism that maintains.', answer: 'Regulation of Respiration Neural and Chemical', options: ['Regulation of Respiration Neural and Chemical', 'Respiratory Organs Human Respiratory System', 'Mechanism of Breathing Inspiration and Expiration', 'Exchange of Gases Alveolar Exchange'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two neighbours fall ill in the same winter: one has bronchitis (inflamed bronchi) with a violent cough and mucus but normal blood oxygen; the other has pneumonia (inflamed alveoli) and turns dangerously hypoxic. Your friend is puzzled: \'Both are lung infections — why does only one starve the blood of oxygen?\'',
            decisions: [{ prompt: 'What structural fact explains the difference?', options: [
                { text: 'Gas exchange happens only in the respiratory zone — respiratory bronchioles and alveoli with simple squamous walls wrapped in pulmonary capillaries. The bronchi are conducting tubes (cartilage, ciliated epithelium, no capillaries): inflaming them causes cough and mucus but can\'t block diffusion; flooding the alveoli (pneumonia) directly attacks the exchange surface.', outcome: 'The conducting/exchange division of labour explains why same-organ diseases have different severity — location within the tree decides the functional hit.' },
                { text: 'Oxygen diffuses all along the bronchial tree, so bronchitis should cut oxygen just as much — the difference must be the germ.', outcome: 'Thick, cartilage-reinforced, ciliated bronchi have no capillaries to receive O2; diffusion is anatomically impossible there.', reveals: 'gas-exchange-everywhere' },
                { text: 'Pneumonia is worse only because it\'s a bigger infection area — any large bronchitis would drop oxygen equally.', outcome: 'Severity isn\'t about area inflamed but which histological zone is inflamed; even widespread bronchi can\'t exchange gas, while even partial alveolar flooding impairs it.', reveals: 'severity-is-area' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the airway as a graded design: conditioning and protection up top, then walls stripped to one flat cell where diffusion is the only job.',
            decisions: [{ prompt: 'What comes next? Breathing and Exchange of Gases · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Breathing and Exchange of Gases · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_001', difficulty: 'standard',
          question: 'The human respiratory system is a specialized organ system comprising the.',
          hint: 'If stuck, revisit Class 9 Animal Tissues: c9_bio_ch2_5 (epithelial tissue types) and.',
          misconception: 'Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes" and assume.',
          parts: [
                { id: 'a', prompt: 'A patient inhales a small peanut that lodges at the carina (bifurcation of the trachea).', answer: 'The peanut will most likely enter the **right lung**',
                  options: ['The peanut will most likely enter the **right lung**', 'left lung because the heart is on the left', 'air tubes', 'diffusion happens throughout'],
                  hint: 'If stuck, revisit Class 9 Animal Tissues: c9_bio_ch2_5 (epithelial tissue types) and c9_bio_ch2_6.',
                  misconception: 'Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes" and assume diffusion happens.' }
          ],
            remediations: { 'gas-exchange-occurs-in-the': { steps: ['**Observe**: Examine a prepared slide of trachea (ciliated pseudostratified epithelium, C-rings) vs.', 'lung alveoli (simple squamous, capillaries) under a microscope or virtual histology atlas.', '**Trace**: On a diagram, color-code the conducting portion (blue) and exchange portion (red); note where cartilage.', '**Reason**: Ask "If O₂ diffused in the bronchi, why would evolution create 23 generations of branching to reach.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes" and assume.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The pleural fluid primarily serves to lubricate the lung surface so the lungs can slide during breathing." Is this complete? Justify.', answer: 'The statement is **incomplete**',
                  options: ['The statement is **incomplete**', 'air tubes', 'diffusion happens throughout'],
                  hint: 'If stuck, revisit Class 9 Animal Tissues: c9_bio_ch2_5 (epithelial tissue types) and c9_bio_ch2_6.',
                  misconception: 'Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes" and assume diffusion happens.' },
                { id: 'b', prompt: 'Design a simple physical model using household materials (balloons, straws, plastic bottle, rubber sheet) to demonstrate how the thoracic cavity\'s volume.', answer: '**Model**: Cut the bottom off a plastic bottle (thoracic cage)',
                  options: ['**Model**: Cut the bottom off a plastic bottle (thoracic cage)', 'air tubes', 'diffusion happens throughout'],
                  hint: 'If stuck, revisit Class 9 Animal Tissues: c9_bio_ch2_5 (epithelial tissue types) and c9_bio_ch2_6.',
                  misconception: 'Students believe **gas exchange occurs in the bronchi or bronchioles** because they see "air tubes" and assume diffusion happens.' }
          ],
            remediations: { 'gas-exchange-occurs-in-the': { steps: ['**Observe**: Examine a prepared slide of trachea (ciliated pseudostratified epithelium, C-rings) vs.', 'lung alveoli (simple squamous, capillaries) under a microscope or virtual histology atlas.', '**Trace**: On a diagram, color-code the conducting portion (blue) and exchange portion (red); note where cartilage.', '**Reason**: Ask "If O₂ diffused in the bronchi, why would evolution create 23 generations of branching to reach.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_002', difficulty: 'standard',
          question: 'Mechanism of breathing is the physiological process by which air moves into.',
          hint: 'Revisit c11_bio_cbse_14_001 (Respiratory Organs) and focus on thoracic cage anatomy.',
          misconception: 'Students believe **expiration is always an active muscular process** because they feel abdominal effort during heavy.',
          parts: [
                { id: 'a', prompt: 'State the approximate values of Tidal Volume (TV), Inspiratory Reserve Volume (IRV), Expiratory Reserve Volume (ERV), and Residual Volume (RV) for a healthy.', answer: 'TV ≈ 500 mL, IRV ≈ 2500–3000 mL, ERV ≈ 1000–1100 mL, RV ≈ 1100–1200 mL',
                  options: ['TV ≈ 500 mL, IRV ≈ 2500–3000 mL, ERV ≈ 1000–1100 mL, RV ≈ 1100–1200 mL', 'volume in lungs', 'volume exchanged', 'all volumes are measurable'],
                  hint: 'Revisit c11_bio_cbse_14_001 (Respiratory Organs) and focus on thoracic cage anatomy - specifically.',
                  misconception: 'Students believe **expiration is always an active muscular process** because they feel abdominal effort during heavy breathing (e.g., after.' },
                { id: 'b', prompt: 'A patient has a spinal cord injury at C4 level, paralyzing the diaphragm but sparing the external intercostal muscles.', answer: 'Yes, quiet inspiration is possible but severely reduced',
                  options: ['Yes, quiet inspiration is possible but severely reduced', 'no inspiration possible', 'internal intercostals take over'],
                  hint: 'Revisit c11_bio_cbse_14_001 (Respiratory Organs) and focus on thoracic cage anatomy - specifically.',
                  misconception: 'Students believe **expiration is always an active muscular process** because they feel abdominal effort during heavy breathing (e.g., after.' },
                { id: 'c', prompt: 'Compare the mechanisms of quiet expiration and forced expiration.', answer: 'Quiet expiration: passive',
                  options: ['Quiet expiration: passive', 'external intercostals for forced expiration'],
                  hint: 'Revisit c11_bio_cbse_14_001 (Respiratory Organs) and focus on thoracic cage anatomy - specifically.',
                  misconception: 'Students believe **expiration is always an active muscular process** because they feel abdominal effort during heavy breathing (e.g., after.' }
          ],
            remediations: { 'expiration-is-always-an-active': { steps: ['Have the student sit completely still, place one hand on abdomen, one on chest.', 'Breathe quietly for 30 seconds.', 'Ask: "Which hand moves *actively* during breathing out?" (Neither - abdomen falls passively).', 'Contrast with forced expiration: blow out a candle sharply; feel abdominal muscles contract.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_003', difficulty: 'standard',
          question: 'Alveolar exchange is the process of passive diffusion of oxygen (O₂) and carbon.',
          hint: 'Revisit Class 10 node c10_bio_cbse_01_008 (gas exchange basics) and Class 11 Physics.',
          misconception: 'Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves from tissues.',
          parts: [
                { id: 'a', prompt: 'State the partial pressures of O₂ and CO₂ in atmospheric air, alveolar air, and deoxygenated blood arriving at the alveoli.', answer: 'Atmospheric air: pO₂ ≈ 159 mm Hg, pCO₂ ≈ 0.3 mm Hg',
                  options: ['Atmospheric air: pO₂ ≈ 159 mm Hg, pCO₂ ≈ 0.3 mm Hg', 'CO₂ moves from tissues to alveoli against a bigger difference', 'alveolar pO₂ equals atmospheric 159 mm Hg'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_008 (gas exchange basics) and Class 11 Physics chapter.',
                  misconception: 'Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves from tissues to alveoli against.' },
                { id: 'b', prompt: 'Why does CO₂ diffuse from blood to alveoli even though its partial pressure gradient (5 mm Hg) is much smaller than that of O₂ (64 mm Hg)?', answer: 'CO₂ is 20–25 times more soluble in the diffusion membrane than O₂',
                  options: ['CO₂ is 20–25 times more soluble in the diffusion membrane than O₂', 'CO₂ gradient is larger', 'CO₂ is lighter', 'CO₂ moves from tissues to alveoli against a bigger difference'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_008 (gas exchange basics) and Class 11 Physics chapter.',
                  misconception: 'Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves from tissues to alveoli against.' },
                { id: 'c', prompt: 'A patient has pulmonary fibrosis thickening the alveolar-capillary membrane to 2 µm (normal ≈ 0.5 µm).', answer: 'O₂ exchange will decrease significantly',
                  options: ['O₂ exchange will decrease significantly', 'CO₂ moves from tissues to alveoli against a bigger difference'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_008 (gas exchange basics) and Class 11 Physics chapter.',
                  misconception: 'Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves from tissues to alveoli against.' },
                { id: 'd', prompt: 'Compare the composition of alveolar air with atmospheric air and expired air. Explain why alveolar pO₂ is lower and pCO₂ higher than atmospheric air.', answer: 'Alveolar air: pO₂ 104 mm Hg, pCO₂ 40 mm Hg',
                  options: ['Alveolar air: pO₂ 104 mm Hg, pCO₂ 40 mm Hg', 'CO₂ moves from tissues to alveoli against a bigger difference'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_008 (gas exchange basics) and Class 11 Physics chapter.',
                  misconception: 'Students often think the partial pressure gradient for CO₂ is larger than for O₂ because "CO₂ moves from tissues to alveoli against.' }
          ],
            remediations: { 'the-partial-pressure-gradient-for': { steps: ['Draw a two-column table: "Alveolar Exchange Gradients" with rows for O₂ and CO₂.', 'Fill in alveolar pO₂ (104), capillary pO₂ (40), ΔpO₂ (64); alveolar pCO₂ (40), capillary pCO₂ (45), ΔpCO₂ (5).', 'Write Fick’s Law: Rate ∝ (ΔP × Solubility) / Thickness.', 'Insert solubility ratio (CO₂:O₂ ≈ 20:1).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_004', difficulty: 'standard',
          question: 'Transport of oxygen in human blood occurs primarily through reversible binding.',
          hint: 'Revisit c11_bio_cbse_14_003 (Exchange of Gases) and practice calculating diffusion.',
          misconception: 'Students often think the Bohr effect means "high CO₂ always decreases oxygen affinity everywhere." They fail.',
          parts: [
                { id: 'a', prompt: 'A person ascends to high altitude (3500 m) where atmospheric pO₂ drops to 90 mm Hg.', answer: 'Arterial pO₂ falls to ~60 mm Hg, moving onto the steep part of the curve',
                  options: ['Arterial pO₂ falls to ~60 mm Hg, moving onto the steep part of the curve', 'high CO₂ always decreases oxygen affinity everywhere', 'the Bohr effect means "high CO₂ always decreases oxygen affinity everywhere'],
                  hint: 'Revisit c11_bio_cbse_14_003 (Exchange of Gases) and practice calculating diffusion gradients using.',
                  misconception: 'Students often think the Bohr effect means "high CO₂ always decreases oxygen affinity everywhere." They fail to distinguish between the.' },
                { id: 'b', prompt: 'Compare the oxygen dissociation curves of adult haemoglobin (HbA) and fetal haemoglobin (HbF) at the same pO₂.', answer: 'HbF has higher oxygen affinity (curve shifted left)',
                  options: ['HbF has higher oxygen affinity (curve shifted left)', 'fetal curve is right-shifted', 'high CO₂ always decreases oxygen affinity everywhere', 'the Bohr effect means "high CO₂ always decreases oxygen affinity everywhere'],
                  hint: 'Revisit c11_bio_cbse_14_003 (Exchange of Gases) and practice calculating diffusion gradients using.',
                  misconception: 'Students often think the Bohr effect means "high CO₂ always decreases oxygen affinity everywhere." They fail to distinguish between the.' }
          ],
            remediations: { 'the-bohr-effect-means-high': { steps: ['Draw two side-by-side dissociation curves: label one "Lung capillary: pCO₂ 40 → 30 mm Hg, pH 7.45" (left shift) and the.', 'Use the NCERT Table 14.1 partial pressures to calculate the exact pO₂ gradient at each site.', 'Verbally trace one haemoglobin molecule: "I pick up O₂ in the lung because low CO₂/high pH makes me grab O₂ tight;.', 'Practice with a past board question: "Explain how CO₂ affects oxygen transport" — require the phrase "Bohr effect" and.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_005', difficulty: 'standard',
          question: 'Transport of carbon dioxide in blood occurs through three mechanisms: (1).',
          hint: 'Revisit the carbonic anhydrase reaction mechanism and the Bohr effect in node.',
          misconception: 'Students believe the chloride shift "moves CO₂" across the RBC membrane.',
          parts: [
                { id: 'a', prompt: 'Compare the direction of the chloride shift at tissues versus alveoli, and explain how it maintains electroneutrality during CO₂ transport.', answer: 'At tissues: HCO₃⁻ exits RBC → Cl⁻ enters (Hamburger phenomenon)',
                  options: ['At tissues: HCO₃⁻ exits RBC → Cl⁻ enters (Hamburger phenomenon)', 'Cl⁻ moves with HCO₃⁻ in same direction', 'chloride shift', 'moves CO₂'],
                  hint: 'Revisit the carbonic anhydrase reaction mechanism and the Bohr effect in node c11_bio_cbse_14_004.',
                  misconception: 'Students believe the chloride shift "moves CO₂" across the RBC membrane.' }
          ],
            remediations: { 'the-chloride-shift-moves-co': { steps: ['Draw the RBC membrane with CO₂, H₂O, H₂CO₃, H⁺, HCO₃⁻, Hb, HbCO₂, Cl⁻ labelled.', 'Trace one CO₂ molecule: enters RBC → carbonic anhydrase → H₂CO₃ → H⁺ + HCO₃⁻ → H⁺ binds Hb → HCO₃⁻ exits via Band 3 →.', 'Ask: "Which species crosses the membrane — CO₂ or HCO₃⁻?" 4.', 'Repeat for alveoli: reverse every arrow.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_006', difficulty: 'standard',
          question: 'Regulation of respiration is the neural and chemical control mechanism that.',
          hint: 'Review CO₂ transport as bicarbonate (c11_bio_cbse_14_005) and the blood-brain barrier.',
          misconception: 'Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get oxygen." They think.',
          parts: [
                { id: 'a', prompt: 'Name the specific brain region that houses the respiratory rhythm centre and state its primary function in breathing regulation.', answer: 'The respiratory rhythm centre is located in the medulla oblongata',
                  options: ['The respiratory rhythm centre is located in the medulla oblongata', 'cerebrum', 'we breathe to get oxygen', 'oxygen is the primary chemical regulator of breathing'],
                  hint: 'Review CO₂ transport as bicarbonate (c11_bio_cbse_14_005) and the blood-brain barrier permeability.',
                  misconception: 'Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get oxygen." They think low pO₂ is the main.' },
                { id: 'b', prompt: 'Explain why the pneumotaxic centre in the pons reduces the duration of inspiration when activated, and what would happen to breathing pattern if this centre.', answer: 'The pneumotaxic centre sends inhibitory signals to the inspiratory area of the',
                  options: ['The pneumotaxic centre sends inhibitory signals to the inspiratory area of the', 'we breathe to get oxygen', 'oxygen is the primary chemical regulator of breathing'],
                  hint: 'Review CO₂ transport as bicarbonate (c11_bio_cbse_14_005) and the blood-brain barrier permeability.',
                  misconception: 'Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get oxygen." They think low pO₂ is the main.' },
                { id: 'c', prompt: 'A person voluntarily hyperventilates for 2 minutes. Predict the immediate effect on arterial pCO₂, CSF pH, and the subsequent drive to breathe, explaining the.', answer: 'Hyperventilation blows off excess CO₂, lowering arterial pCO₂',
                  options: ['Hyperventilation blows off excess CO₂, lowering arterial pCO₂', 'drive increases due to low O₂', 'we breathe to get oxygen', 'oxygen is the primary chemical regulator of breathing'],
                  hint: 'Review CO₂ transport as bicarbonate (c11_bio_cbse_14_005) and the blood-brain barrier permeability.',
                  misconception: 'Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get oxygen." They think low pO₂ is the main.' },
                { id: 'd', prompt: 'Compare the stimuli detected by central chemoreceptors versus peripheral chemoreceptors, and explain why central chemoreceptors respond more to CO₂ than to H⁺.', answer: 'Central chemoreceptors (medulla) detect H⁺ in CSF, which reflects arterial pCO₂',
                  options: ['Central chemoreceptors (medulla) detect H⁺ in CSF, which reflects arterial pCO₂', 'we breathe to get oxygen', 'oxygen is the primary chemical regulator of breathing'],
                  hint: 'Review CO₂ transport as bicarbonate (c11_bio_cbse_14_005) and the blood-brain barrier permeability.',
                  misconception: 'Students believe oxygen is the primary chemical regulator of breathing because "we breathe to get oxygen." They think low pO₂ is the main.' }
          ],
            remediations: { 'oxygen-is-the-primary-chemical': { steps: ['Revisit the partial pressure table (NCERT Table 14.1) and trace CO₂ from tissues → blood → CSF → central chemoreceptors.', 'Draw a flowchart: arterial pCO₂ ↑ → CO₂ diffuses into CSF → H₂CO₃ → H⁺ + HCO₃⁻ → central chemoreceptors stimulated →.', 'Contrast with O₂ pathway: arterial pO₂ ↓ → carotid/aortic bodies → glossopharyngeal/vagus → respiratory rhythm centre.', 'Practice predicting ventilation changes for given arterial blood gas values (pH, pCO₂, pO₂).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
