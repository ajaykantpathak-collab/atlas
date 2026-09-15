import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch14_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch14_p2: SimDef = {
    id: 'v3_c11_bio_ch14_p2',
    title: 'Breathing and Exchange of Gases · Part 2/2',
    subtitle: 'Walk the airway from nostril to alveolus and see structure shed everything exchange doesn\'t need.',
    classLevel: 11, subject: 'biology', topic: 'Breathing and Exchange of Gases · Part 2/2',
    chapters: ['c11_bio_ch14'],
    nodeIds: ['c11_bio_cbse_14_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emergency resident working out where an inhaled peanut went', intro: 'A child inhaled a peanut; it stopped at the trachea\'s fork. Right lung or left? The anatomy of the two bronchi already made that decision.', goal: 'Trace the respiratory pathway, contrast conducting versus exchange zones, and link cartilage, epithelium, and pleura to their functions.' },
    discovery: {
        question: 'The trachea\'s cartilage rings are shaped like the letter C, open at the back — an odd \'defect\' for a pipe that must stay open. Which neighbour does that gap exist to accommodate?',
        options: ['The oesophagus — it swells forward into the gap every time you swallow a food bolus', 'The thyroid gland, which needs room to pulse', 'The vagus nerve, which threads through the opening', 'The carotid artery, which expands with each heartbeat'],
        answer: 'The oesophagus — it swells forward into the gap every time you swallow a food bolus',
        hook: 'Every \'flaw\' in airway anatomy is a negotiated compromise — C-rings, cilia, and collapsing bronchioles each solve a specific engineering problem.',
    },
    teaching: [
        { title: 'Disorders of Respiratory System: Asthma and Emphysema', text: 'Asthma is a chronic inflammatory disorder of the conducting airways (bronchi and bronchioles) characterised by reversible bronchoconstriction, excessive mucus secretion, and airway.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_14_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Trace an air molecule from nostril to alveolus, then use bronchial anatomy to predict which lung a stray peanut will lodge in — and explain why the airway\'s lining changes from ciliated pseudostratified to simple squamous along the way.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_007', title: 'Disorders of Respiratory System: Asthma and Emphysema',
          caseStudy: { intro: 'Observe a construction worker in Delhi during winter who develops a persistent cough and breathlessness after years of inhaling stone dust, and contrast this.',
            decisions: [{ prompt: 'Define asthma and emphysema precisely, stating the primary anatomical site affected, the nature of the structural change.', options: [
                { text: 'Asthma: conducting airways (bronchi/bronchioles)', outcome: 'Asthma: conducting airways (bronchi/bronchioles); reversible inflammation, bronchoconstriction.' },
                { text: 'both affect alveoli, or both are reversible', outcome: 'Not quite — Students frequently conflate asthma and emphysema as "the same thing — both cause breathing.', reveals: 'students-frequently-conflate-asthma-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two neighbours fall ill in the same winter: one has bronchitis (inflamed bronchi) with a violent cough and mucus but normal blood oxygen; the other has pneumonia (inflamed alveoli) and turns dangerously hypoxic. Your friend is puzzled: \'Both are lung infections — why does only one starve the blood of oxygen?\'',
            decisions: [{ prompt: 'What structural fact explains the difference?', options: [
                { text: 'Gas exchange happens only in the respiratory zone — respiratory bronchioles and alveoli with simple squamous walls wrapped in pulmonary capillaries. The bronchi are conducting tubes (cartilage, ciliated epithelium, no capillaries): inflaming them causes cough and mucus but can\'t block diffusion; flooding the alveoli (pneumonia) directly attacks the exchange surface.', outcome: 'The conducting/exchange division of labour explains why same-organ diseases have different severity — location within the tree decides the functional hit.' },
                { text: 'Oxygen diffuses all along the bronchial tree, so bronchitis should cut oxygen just as much — the difference must be the germ.', outcome: 'Thick, cartilage-reinforced, ciliated bronchi have no capillaries to receive O2; diffusion is anatomically impossible there.', reveals: 'gas-exchange-everywhere' },
                { text: 'Pneumonia is worse only because it\'s a bigger infection area — any large bronchitis would drop oxygen equally.', outcome: 'Severity isn\'t about area inflamed but which histological zone is inflamed; even widespread bronchi can\'t exchange gas, while even partial alveolar flooding impairs it.', reveals: 'severity-is-area' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_14_007', title: 'You made it',
          caseStudy: { intro: 'You can now read the airway as a graded design: conditioning and protection up top, then walls stripped to one flat cell where diffusion is the only job.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_007', difficulty: 'standard',
          question: 'Asthma is a chronic inflammatory disorder of the conducting airways (bronchi.',
          hint: 'If stuck, revisit c11_bio_cbse_14_001 (conducting vs. respiratory zone).',
          misconception: 'Students frequently conflate asthma and emphysema as "the same thing — both cause breathing difficulty and wheezing.".',
          parts: [
                { id: 'a', prompt: 'Define asthma and emphysema precisely, stating the primary anatomical site affected, the nature of the structural change (reversible/irreversible), and the key.', answer: 'Asthma: conducting airways (bronchi/bronchioles)',
                  options: ['Asthma: conducting airways (bronchi/bronchioles)', 'both affect alveoli, or both are reversible'],
                  hint: 'If stuck, revisit c11_bio_cbse_14_001 (conducting vs. respiratory zone), c11_bio_cbse_14_002.',
                  misconception: 'Students frequently conflate asthma and emphysema as "the same thing — both cause breathing difficulty and wheezing." The specific error.' }
          ],
            remediations: { 'students-frequently-conflate-asthma-and': { steps: ['If the student cannot differentiate the disorders, follow this remediation: (1) Draw two side-by-side diagrams: one.', '(3) Re-derive the spirometry predictions (FEV₁, FVC, RV, TLC) for each using the pressure-volume curve logic from.', '(4) Practice one board-style question: "A 25-year-old with childhood asthma and a 60-year-old smoker both have FEV₁/FVC.', 'How would their RV and TLC differ, and why?"'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently conflate asthma and emphysema as "the same thing — both cause breathing difficulty and wheezing.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Bronchodilators (β₂-agonists) are equally effective in relieving dyspnoea in both asthma and emphysema because both involve airway.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'obstruction'],
                  hint: 'If stuck, revisit c11_bio_cbse_14_001 (conducting vs. respiratory zone), c11_bio_cbse_14_002.',
                  misconception: 'Students frequently conflate asthma and emphysema as "the same thing — both cause breathing difficulty and wheezing." The specific error.' }
          ],
            remediations: { 'students-frequently-conflate-asthma-and': { steps: ['If the student cannot differentiate the disorders, follow this remediation: (1) Draw two side-by-side diagrams: one.', '(3) Re-derive the spirometry predictions (FEV₁, FVC, RV, TLC) for each using the pressure-volume curve logic from.', '(4) Practice one board-style question: "A 25-year-old with childhood asthma and a 60-year-old smoker both have FEV₁/FVC.', 'How would their RV and TLC differ, and why?"'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
