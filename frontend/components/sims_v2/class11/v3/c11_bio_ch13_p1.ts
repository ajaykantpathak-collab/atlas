import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch13_p1: SimDef = {
    id: 'v3_c11_bio_ch13_p1',
    title: 'Plant Growth and Development · Part 1/2',
    subtitle: 'Define growth strictly enough to reject swollen wood — then graph it two different ways.',
    classLevel: 11, subject: 'biology', topic: 'Plant Growth and Development · Part 1/2',
    chapters: ['c11_bio_ch13'],
    nodeIds: ['c11_bio_cbse_13_001', 'c11_bio_cbse_13_002', 'c11_bio_cbse_13_003', 'c11_bio_cbse_13_004', 'c11_bio_cbse_13_005', 'c11_bio_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crop scientist deciding whether seedlings are actually growing or just waterlogged', intro: 'Your germination trays look bigger every morning — but is that growth or just absorbed water? The distinction decides your whole experiment.', goal: 'Define growth, explain indeterminate growth via meristems, and distinguish arithmetic, geometric, and sigmoid patterns.' },
    discovery: {
        question: 'A wooden plank swells in the rain; a mango sapling grows all year. Both got bigger — but only one change is permanent, metabolic, and irreversible. What three tests does true growth pass that mere swelling fails?',
        options: ['It is irreversible, powered by metabolism, and adds protoplasm — swelling is just reversible water uptake by dead walls', 'It happens only above the soil line', 'It always produces flowers first', 'It requires sunlight; swelling happens in the dark'],
        answer: 'It is irreversible, powered by metabolism, and adds protoplasm — swelling is just reversible water uptake by dead walls',
        hook: 'Growth isn\'t \'getting bigger\' — it\'s a funded construction project run by meristems that never close, which is why plants never stop.',
    },
    teaching: [
        { title: 'Plant Growth: Characteristics and Phases', text: 'Growth in plants is an irreversible, permanent increase in the size of an organ, its parts, or an individual cell, accompanied by metabolic processes (anabolic and catabolic) that occur at the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_13_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Separate growth from imbibition, name the three phases a root-tip cell passes through, and read two datasets — a root gaining 2 mm every hour versus a fruit cell swelling 350,000-fold — as arithmetic versus geometric growth.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_13_001', title: 'Plant Growth: Characteristics and Phases',
          scaffold: { problem: 'A maize root apical meristem produces 17,500 new cells per hour. Each cell is initially 10 µm long.',
            steps: [
            { text: 'Calculate new cells produced per hour = 17,500 cells/hr (given). These are added to the elongation zone.' },
            { text: 'Length increase due to cell division = number of new cells × initial cell length = 17,500 × 10 µm = 175,000 µm = 175.' },
            { text: 'In elongation zone, existing cells elongate from 10 µm to 100 µm.' },
            { text: 'Total elongation contribution = number of cells in zone × elongation rate per cell = 2000 × 789 µm/hr = 1,578,000 µm.' },
            { text: 'Total root elongation rate = division contribution + elongation contribution = 175 + 1578 = 1753 mm/hr.', faded: true, blankAnswer: 'Cell division contributes 175 mm/hr; cell elongation.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_002', title: 'Phases of Growth: Meristematic, Elongation, Maturation',
          caseStudy: { intro: 'Begin by asking students to observe a germinating moong bean (green gram) seedling on a wet cotton bed—a common Class 6 activity—focus on the white root tip.',
            decisions: [{ prompt: 'Name the three phases of growth in a plant root apex in correct sequence from tip to base, and state one key cellular feature of the.', options: [
                { text: 'Meristematic → Elongation → Maturation', outcome: 'Meristematic → Elongation → Maturation. Key feature of meristematic phase: cells are isodiametric.' },
                { text: 'cell division', outcome: 'Not quite — Students believe the three phases are *temporal stages* through which *every* cell passes.', reveals: 'the-three-phases-are-temporal' },
                { text: 'cell division" as a feature of elongation phase', outcome: 'Not quite — Students believe the three phases are *temporal stages* through which *every* cell passes.', reveals: 'the-three-phases-are-temporal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_003', title: 'Plant Growth Regulators: Auxins',
          caseStudy: { intro: 'Observe a tea plantation hedge in Assam or Darjeeling - the dense, bushy growth results from regular plucking of shoot tips.',
            decisions: [{ prompt: 'Name the natural auxin first isolated from human urine and the two synthetic auxins widely used in horticulture and as herbicides.', options: [
                { text: 'Natural auxin: Indole-3-acetic acid (IAA)', outcome: 'Natural auxin: Indole-3-acetic acid (IAA). Synthetic auxins: NAA (naphthalene acetic acid) and.' },
                { text: 'auxin *causes* apical dominance by directly inhibiting lateral bud cells', outcome: 'Not quite — Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The.', reveals: 'auxin-causes-apical-dominance-by' },
                { text: 'gibberellic acid or kinetin', outcome: 'Not quite — Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The.', reveals: 'auxin-causes-apical-dominance-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_004', title: 'Plant Growth Regulators: Gibberellins and Cytokinins',
          caseStudy: { intro: 'Begin by showing a time-lapse video of a dwarf pea plant treated with GA₃ versus an untreated control – the dramatic stem elongation is visible within days.',
            decisions: [{ prompt: 'Name the fungal pathogen responsible for the \'bakanae\' (foolish seedling) disease of rice and the active substance isolated from it that.', options: [
                { text: 'The fungal pathogen is *Gibberella fujikuroi* and the active substance is gibberellic', outcome: 'The fungal pathogen is *Gibberella fujikuroi* and the active substance is gibberellic acid (GA₃).' },
                { text: 'growth promoters', outcome: 'Not quite — Students often think gibberellins and cytokinins always act synergistically in all processes.', reveals: 'gibberellins-and-cytokinins-always-act' },
                { text: '*Rhizopus* or auxin', outcome: 'Not quite — Students often think gibberellins and cytokinins always act synergistically in all processes.', reveals: 'gibberellins-and-cytokinins-always-act' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_005', title: 'Plant Growth Regulators: ABA and Ethylene',
          caseStudy: { intro: 'Begin with a familiar observation: a banana ripens faster when kept with a ripe apple, and a wilted plant recovers its turgidity within hours after watering.',
            decisions: [{ prompt: 'Name the gaseous plant growth regulator and its biosynthetic precursor, and state one agricultural application of its synthetic analog.', options: [
                { text: 'Ethylene (C₂H₄) is the gaseous PGR synthesized from methionine via ACC', outcome: 'Ethylene (C₂H₄) is the gaseous PGR synthesized from methionine via ACC.' },
                { text: 'ABA as gaseous or CO₂ as precursor', outcome: 'Not quite — Students believe ethylene **only** promotes fruit ripening and senescence, and that ABA **only**.', reveals: 'ethylene-only-promotes-fruit-ripening' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_006', title: 'Photoperiodism: Long Day and Short Day Plants',
          caseStudy: { intro: 'Observe a chrysanthemum (guldaudi) in your garden blooming profusely in October-November but remaining vegetative in May-June, while wheat in Punjab flowers.',
            decisions: [{ prompt: 'Define "critical photoperiod" and explain why a short-day plant like chrysanthemum (critical night length 12 hours) fails to flower when.', options: [
                { text: 'Critical photoperiod is the specific day length (or more precisely, night length)', outcome: 'Critical photoperiod is the specific day length (or more precisely, night length) threshold above.' },
                { text: 'needs short day', outcome: 'Not quite — Students believe "short-day plants need short days (less light) and long-day plants need long days.', reveals: 'short-day-plants-need-short' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Plant Growth and Development · Part 1/2', spots: [
            { id: 's1', label: 'Plant Growth Characteristics and Phases', prompt: 'Which idea is this? — Growth in plants is an irreversible, permanent increase in the size of an organ, its.', answer: 'Plant Growth Characteristics and Phases', options: ['Plant Growth Characteristics and Phases', 'Phases of Growth Meristematic Elongation Maturation', 'Plant Growth Regulators Auxins', 'Plant Growth Regulators Gibberellins and Cytokinins'] },
            { id: 's2', label: 'Phases of Growth Meristematic Elongation Maturation', prompt: 'Which idea is this? — The three phases of plant growth—meristematic, elongation, and maturation—are distinct.', answer: 'Phases of Growth Meristematic Elongation Maturation', options: ['Phases of Growth Meristematic Elongation Maturation', 'Plant Growth Characteristics and Phases', 'Plant Growth Regulators Auxins', 'Plant Growth Regulators Gibberellins and Cytokinins'] },
            { id: 's3', label: 'Plant Growth Regulators Auxins', prompt: 'Which idea is this? — Auxins are a class of plant growth regulators (phytohormones) chemically characterized.', answer: 'Plant Growth Regulators Auxins', options: ['Plant Growth Regulators Auxins', 'Plant Growth Characteristics and Phases', 'Phases of Growth Meristematic Elongation Maturation', 'Plant Growth Regulators Gibberellins and Cytokinins'] },
            { id: 's4', label: 'Plant Growth Regulators Gibberellins and Cytokinins', prompt: 'Which idea is this? — Gibberellins are a group of over 100 acidic diterpenoid plant growth regulators (denoted.', answer: 'Plant Growth Regulators Gibberellins and Cytokinins', options: ['Plant Growth Regulators Gibberellins and Cytokinins', 'Plant Growth Characteristics and Phases', 'Phases of Growth Meristematic Elongation Maturation', 'Plant Growth Regulators Auxins'] },
            { id: 's5', label: 'Plant Growth Regulators ABA and Ethylene', prompt: 'Which idea is this? — Abscisic acid (ABA) is a sesquiterpenoid plant growth regulator that functions primarily.', answer: 'Plant Growth Regulators ABA and Ethylene', options: ['Plant Growth Regulators ABA and Ethylene', 'Plant Growth Characteristics and Phases', 'Phases of Growth Meristematic Elongation Maturation', 'Plant Growth Regulators Auxins'] },
            { id: 's6', label: 'Photoperiodism Long Day and Short Day Plants', prompt: 'Which idea is this? — Photoperiodism is the physiological response of plants to the relative lengths of day and.', answer: 'Photoperiodism Long Day and Short Day Plants', options: ['Photoperiodism Long Day and Short Day Plants', 'Plant Growth Characteristics and Phases', 'Phases of Growth Meristematic Elongation Maturation', 'Plant Growth Regulators Auxins'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science exhibit you soak dry moong seeds and they visibly double in size overnight. Your partner logs this as \'growth\' in the project notebook. Meanwhile a boiled (dead) seed placed in water also swells to the same size. The partner insists both are \'growing\'.',
            decisions: [{ prompt: 'Is the swelling growth?', options: [
                { text: 'No — swelling is imbibition, a reversible physical water uptake that even a dead seed shows. True growth is irreversible, metabolic, energy-dependent increase (cell division → elongation → maturation), starting only when the live seed\'s respiration and enzymes activate. Measure radicle length, not just diameter.', outcome: 'The live/dead pair is the perfect control: identical swelling in both proves the swelling itself isn\'t growth.' },
                { text: 'Both seeds are growing — any permanent-looking size increase counts as growth.', outcome: 'The dead seed can\'t grow — it has no metabolism; its swelling shows size increase alone doesn\'t imply growth. Also imbibition reverses on drying.', reveals: 'swelling-equals-growth' },
                { text: 'Only the live seed is growing — because its swelling is bigger.', outcome: 'Right conclusion, wrong reason: the distinction isn\'t amount but mechanism — metabolic, irreversible protoplasm increase versus passive water uptake.', reveals: 'bigger-swelling-is-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell a straight line from an S-curve and explain both: arithmetic when one daughter keeps dividing, geometric when everything divides.',
            decisions: [{ prompt: 'What comes next? Plant Growth and Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Plant Growth and Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_001', difficulty: 'standard',
          question: 'Growth in plants is an irreversible, permanent increase in the size of.',
          hint: 'Revisit Class 9 node c9_bio_ch2_2 (Meristematic Tissues: Apical, Lateral and Intercalary).',
          misconception: 'Students often think \'growth\' and \'development\' are synonyms, and that any increase in size (like a swollen seed).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Growth in plants is an irreversible, permanent increase in the size of an organ, its',
                  options: ['Growth in plants is an irreversible, permanent increase in the size of an organ, its', 'The three phases of plant growth—meristematic, elongation, and maturation—are distinct', 'Auxins are a class of plant growth regulators (phytohormones) chemically characterized as', 'Gibberellins are a group of over 100 acidic diterpenoid plant growth regulators (denoted'],
                  hint: 'Revisit Class 9 node c9_bio_ch2_2 (Meristematic Tissues: Apical, Lateral and Intercalary) and.',
                  misconception: 'Students often think \'growth\' and \'development\' are synonyms, and that any increase in size (like a swollen seed) is growth.' }
          ],
            remediations: { 'growth-and-development-are-synonyms': { steps: ['Place a dry moong seed and a boiled (dead) moong seed in water. Measure diameter every hour.', 'Germinate live seeds; measure radicle length hourly. Plot graph: linear (arithmetic) initially?', 'Compare with yeast culture (cell number) — plot exponential (geometric).', 'Use the formula Lt = L0 + rt and W1 = W0 e^rt to fit data. This hands-on contrast cements irreversibility, metabolism.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_002', difficulty: 'standard',
          question: 'The three phases of plant growth—meristematic, elongation, and maturation—are.',
          hint: 'If stuck, review Class 9 node c9_bio_ch2_2 "Meristematic Tissues: Apical, Lateral and.',
          misconception: 'Students believe the three phases are *temporal stages* through which *every* cell passes sequentially in time (like.',
          parts: [
                { id: 'a', prompt: 'Name the three phases of growth in a plant root apex in correct sequence from tip to base, and state one key cellular feature of the meristematic phase.', answer: 'Meristematic → Elongation → Maturation',
                  options: ['Meristematic → Elongation → Maturation', 'cell division', 'cell division" as a feature of elongation phase'],
                  hint: 'If stuck, review Class 9 node c9_bio_ch2_2 "Meristematic Tissues: Apical, Lateral and Intercalary".',
                  misconception: 'Students believe the three phases are *temporal stages* through which *every* cell passes sequentially in time (like a lifecycle), rather.' }
          ],
            remediations: { 'the-three-phases-are-temporal': { steps: ['Revisit the parallel-line experiment (NCERT Fig 13.3) – physically mark a root with ink dots at 0.5 mm intervals, grow.', 'Plot distance from tip vs. expansion rate – students *see* the peak in elongation zone.', 'Use a time-lapse video of root growth (e.g., Arabidopsis) to show cells *moving* through zones.', 'Explicitly contrast "cell age" vs. "positional zone" with a conveyor belt analogy: new cells added at tip push older.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_003', difficulty: 'standard',
          question: 'Auxins are a class of plant growth regulators (phytohormones) chemically.',
          hint: 'Revisit c10_bio_cbse_02_005 (phototropism) and the agar block bioassay diagram.',
          misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the.',
          parts: [
                { id: 'a', prompt: 'Name the natural auxin first isolated from human urine and the two synthetic auxins widely used in horticulture and as herbicides.', answer: 'Natural auxin: Indole-3-acetic acid (IAA)',
                  options: ['Natural auxin: Indole-3-acetic acid (IAA)', 'auxin *causes* apical dominance by directly inhibiting lateral bud cells', 'gibberellic acid or kinetin', '"auxin *causes* apical dominance by directly inhibiting lateral bud cells'],
                  hint: 'Revisit c10_bio_cbse_02_005 (phototropism) and the agar block bioassay diagram - visualize auxin.',
                  misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the apex does NOT enter.' }
          ],
            remediations: { 'auxin-causes-apical-dominance-by': { steps: ['Re-read NCERT Fig 13.11 - note auxin is applied to *decapitated stump*, not lateral buds.', 'Perform the "two-bud experiment" mentally: (a) decapitate → lateral buds grow; (b) decapitate + auxin paste on stump →.', 'Conclude auxin\'s site of action is the stem, not the bud.', 'Link to "nutrient diversion" - high auxin in stem makes it a stronger sink, starving buds.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Apical dominance proves auxin is the only hormone controlling lateral bud growth." Provide evidence from cytokinin interactions.', answer: 'The statement is false',
                  options: ['The statement is false', 'PGRs act synergistically or antagonistically', 'auxin *causes* apical dominance by directly inhibiting lateral bud cells', '"auxin *causes* apical dominance by directly inhibiting lateral bud cells'],
                  hint: 'Revisit c10_bio_cbse_02_005 (phototropism) and the agar block bioassay diagram - visualize auxin.',
                  misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the apex does NOT enter.' }
          ],
            remediations: { 'auxin-causes-apical-dominance-by': { steps: ['Re-read NCERT Fig 13.11 - note auxin is applied to *decapitated stump*, not lateral buds.', 'Perform the "two-bud experiment" mentally: (a) decapitate → lateral buds grow; (b) decapitate + auxin paste on stump →.', 'Conclude auxin\'s site of action is the stem, not the bud.', 'Link to "nutrient diversion" - high auxin in stem makes it a stronger sink, starving buds.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_004', difficulty: 'standard',
          question: 'Gibberellins are a group of over 100 acidic diterpenoid plant growth regulators.',
          hint: 'If stuck, revisit c11_bio_cbse_13_003 for auxin\'s role in apical dominance and.',
          misconception: 'Students often think gibberellins and cytokinins always act synergistically in all processes because both are "growth.',
          parts: [
                { id: 'a', prompt: 'Explain why spraying gibberellins on sugarcane increases yield by up to 20 tonnes per acre, whereas the same treatment on a mature mango tree would not.', answer: 'Sugarcane stores carbohydrates in its stem',
                  options: ['Sugarcane stores carbohydrates in its stem', 'growth promoters'],
                  hint: 'If stuck, revisit c11_bio_cbse_13_003 for auxin\'s role in apical dominance and c9_bio_ch2_2 for.',
                  misconception: 'Students often think gibberellins and cytokinins always act synergistically in all processes because both are "growth promoters.".' },
                { id: 'b', prompt: 'Compare the mechanism by which gibberellins and cytokinins each overcome apical dominance in a decapitated shoot.', answer: 'Gibberellins promote elongation of the main shoot, indirectly reducing auxin',
                  options: ['Gibberellins promote elongation of the main shoot, indirectly reducing auxin', 'growth promoters'],
                  hint: 'If stuck, revisit c11_bio_cbse_13_003 for auxin\'s role in apical dominance and c9_bio_ch2_2 for.',
                  misconception: 'Students often think gibberellins and cytokinins always act synergistically in all processes because both are "growth promoters.".' }
          ],
            remediations: { 'gibberellins-and-cytokinins-always-act': { steps: ['Re-read the NCERT table summarising physiological effects of each PGR (Section 13.4.3).', 'Create a two-column comparison chart listing 5 specific functions where GA and cytokinin act differently (e.g., bolting.', 'For each function, write the molecular mechanism in one sentence (e.g., "GA induces α-amylase in aleurone layer.', 'Test yourself with the diagnostic questions above.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_005', difficulty: 'standard',
          question: 'Abscisic acid (ABA) is a sesquiterpenoid plant growth regulator that functions.',
          hint: 'Revisit c11_bio_cbse_13_003 (auxin transport/TIR1-Aux/IAA receptor) and.',
          misconception: 'Students believe ethylene **only** promotes fruit ripening and senescence, and that ABA **only** causes abscission (due.',
          parts: [
                { id: 'a', prompt: 'Name the gaseous plant growth regulator and its biosynthetic precursor, and state one agricultural application of its synthetic analog ethephon.', answer: 'Ethylene (C₂H₄) is the gaseous PGR synthesized from methionine via ACC',
                  options: ['Ethylene (C₂H₄) is the gaseous PGR synthesized from methionine via ACC', 'ABA as gaseous or CO₂ as precursor'],
                  hint: 'Revisit c11_bio_cbse_13_003 (auxin transport/TIR1-Aux/IAA receptor) and c11_bio_cbse_13_004.',
                  misconception: 'Students believe ethylene **only** promotes fruit ripening and senescence, and that ABA **only** causes abscission (due to its name).' },
                { id: 'b', prompt: 'Explain why ABA is called the "stress hormone" and describe the mechanism by which it causes stomatal closure during water deficit.', answer: 'ABA earns the name "stress hormone"',
                  options: ['ABA earns the name "stress hormone"', 'ABA closes stomata'],
                  hint: 'Revisit c11_bio_cbse_13_003 (auxin transport/TIR1-Aux/IAA receptor) and c11_bio_cbse_13_004.',
                  misconception: 'Students believe ethylene **only** promotes fruit ripening and senescence, and that ABA **only** causes abscission (due to its name).' },
                { id: 'c', prompt: 'A farmer stores unripe mangoes with a few ripe bananas to accelerate ripening.', answer: 'The mangoes will ripen faster',
                  options: ['The mangoes will ripen faster', 'respiratory climacteric'],
                  hint: 'Revisit c11_bio_cbse_13_003 (auxin transport/TIR1-Aux/IAA receptor) and c11_bio_cbse_13_004.',
                  misconception: 'Students believe ethylene **only** promotes fruit ripening and senescence, and that ABA **only** causes abscission (due to its name).' }
          ],
            remediations: { 'ethylene-only-promotes-fruit-ripening': { steps: ['Show time-lapse video of deep-water rice internode elongation under submergence (ethylene-mediated).', 'Compare stomatal aperture in *Commelina* peels treated with ABA vs.', 'Use hormone cross-talk diagram (ABA vs GA in seed; ethylene + ABA in abscission) to visualize antagonism/synergy.', 'Assign a case study: "Why does flooding induce ethylene synthesis in rice but not in wheat?" to force application.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_006', difficulty: 'standard',
          question: 'Photoperiodism is the physiological response of plants to the relative lengths.',
          hint: 'Revisit c10_bio_cbse_02_007 (plant hormones) and c10_bio_cbse_02_005.',
          misconception: 'Students believe "short-day plants need short days (less light) and long-day plants need long days (more light)" — they.',
          parts: [
                { id: 'a', prompt: 'A long-day plant (spinach, critical night length 8 hours) is grown under 16L/8D and flowers.', answer: 'No, it will not flower',
                  options: ['No, it will not flower', 'yes, because total light is 9h'],
                  hint: 'Revisit c10_bio_cbse_02_007 (plant hormones) and c10_bio_cbse_02_005 (phototropism/phytochrome.',
                  misconception: 'Students believe "short-day plants need short days (less light) and long-day plants need long days (more light)" — they confuse the *name*.' }
          ],
            remediations: { 'short-day-plants-need-short': { steps: ['Have student draw phytochrome interconversion: Pr (red-absorbing, inactive) ⇄ Pfr (far-red-absorbing, active) under.', 'Use a timeline diagram — plot a 16-hour night for SDP, mark Pfr decay in dark (Pfr→Pr).', 'Insert a 1-min red pulse at hour 8 — show Pfr spikes, "resetting" the clock.', 'Contrast with far-red pulse (no effect, confirms phytochrome).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
