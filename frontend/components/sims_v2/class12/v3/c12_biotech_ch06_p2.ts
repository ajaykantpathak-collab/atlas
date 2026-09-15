import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch06_p2: SimDef = {
    id: 'v3_c12_biotech_ch06_p2',
    title: 'Plant Tissue Culture · Part 2/2',
    subtitle: 'One carrot cell holds the blueprint for a whole carrot — Haberlandt called it in 1902.',
    classLevel: 12, subject: 'biotechnology', topic: 'Plant Tissue Culture · Part 2/2',
    chapters: ['c12_biotech_ch06'],
    nodeIds: ['c12_biotech_cbse_06_007', 'c12_biotech_cbse_06_008', 'c12_biotech_cbse_06_009', 'c12_biotech_cbse_06_010', 'c12_biotech_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Plant biotechnologist', intro: 'A root cell \'remembering\' how to build leaves is not magic — it\'s the entire basis of plant tissue culture.', goal: 'Define totipotency and outline the history and biological basis of plant tissue culture.' },
    discovery: {
        question: 'A single differentiated carrot root cell — orange, non-dividing — is placed on nutrient gel and regenerates an entire carrot plant. What property made this possible?',
        options: ['Totipotency — the cell retains the complete genetic programme and can dedifferentiate, divide and rebuild the whole plant', 'Mutation — the gel induced new genes that built the missing organs', 'Photosynthesis — light energy reorganised the cell\'s DNA', 'Fertilisation — a hidden gamete in the root completed the development'],
        answer: 'Totipotency — the cell retains the complete genetic programme and can dedifferentiate, divide and rebuild the whole plant',
        hook: 'Differentiation silences genes — it doesn\'t delete them. Haberlandt\'s 1902 insight still startles students: every somatic cell carries the full blueprint; tissue culture just gives it permission to restart.',
    },
    teaching: [
        { title: 'Cell Suspension Culture: Establishment and Growth', text: 'Cell suspension culture is a plant tissue culture system where friable callus tissue is transferred to liquid nutrient medium and maintained under continuous agitation (typically 80–150 rpm on.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_06_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Prove totipotency yourself: take an explant from a differentiated tissue, drive it through callus to shoot and root regeneration, and trace the milestones from Haberlandt\'s concept to modern media.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_007', title: 'Cell Suspension Culture: Establishment and Growth',
          scaffold: { problem: 'A *Catharanthus roseus* suspension culture is inoculated at 5% PCV (5 mL settled cells in 100 mL medium). After 48 hours, PCV = 40 mL.',
            steps: [
            { text: 'Identify given: X₀ = 5 mL, Xₜ = 40 mL, t = 48 h = 2 days.' },
            { text: 'Use µ = (ln Xₜ - ln X₀) / t = (ln 40 - ln 5) / 2 = (3.6889 - 1.6094) / 2 = 2.0795 / 2 = 1.0397 day⁻¹.' },
            { text: 'Calculate td = ln 2 / µ = 0.6931 / 1.0397 = 0.6667 days = 16 hours.' },
            { text: 'Predict X at 72 h (3 days): X₇₂ = X₀ * e^(µ·t) = 5 * e^(1.0397 * 3) = 5 * e^3.1191 = 5 * 22.627 = 113.1 mL.' },
            { text: 'Interpret: 113 mL PCV in 100 mL medium is impossible (max ~50-60% packing) → culture will enter stationary phase before.', faded: true, blankAnswer: '(a) µ = 1.04 day⁻¹, (b) td = 16 h, (c) Predicted PCV = 113.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_008', title: 'Organogenesis: Shoot and Root Induction In Vitro',
          caseStudy: { intro: 'Imagine you have a tiny piece of tobacco leaf (explant) on nutrient gel. After weeks, it forms an unorganized callus mass.',
            decisions: [{ prompt: 'Define organogenesis in the context of plant tissue culture and distinguish it from somatic embryogenesis based on the origin of the.', options: [
                { text: 'Organogenesis is the de novo formation of organs (shoots/roots) directly from', outcome: 'Organogenesis is the de novo formation of organs (shoots/roots) directly from meristematic cells.' },
                { text: 'both form whole plants so they are the same', outcome: 'Not quite — Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute.', reveals: 'high-cytokinin-always-gives-shoots' },
                { text: 'high cytokinin always gives shoots, high auxin always gives roots', outcome: 'Not quite — Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute.', reveals: 'high-cytokinin-always-gives-shoots' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_009', title: 'Somatic Embryogenesis: Induction and Development',
          caseStudy: { intro: 'Imagine you have a single carrot cell in a petri dish — can it become a whole carrot plant? Yes, but only if you trick it into thinking it\'s a fertilized egg.',
            decisions: [{ prompt: 'Define somatic embryogenesis and state the fundamental structural difference between a somatic embryo and an adventitious shoot formed via.', options: [
                { text: 'Somatic embryogenesis is the development of bipolar embryos from somatic cells without', outcome: 'Somatic embryogenesis is the development of bipolar embryos from somatic cells without gametic.' },
                { text: 'both are same', outcome: 'Not quite — Students confuse somatic embryogenesis with organogenesis because both produce "plantlets." The.', reveals: 'students-confuse-somatic-embryogenesis-with' },
                { text: 'somatic embryos come from zygotes', outcome: 'Not quite — Students confuse somatic embryogenesis with organogenesis because both produce "plantlets." The.', reveals: 'students-confuse-somatic-embryogenesis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_010', title: 'Hardening and Acclimatization of Regenerated Plantlets',
          caseStudy: { intro: 'Imagine you have 500 tissue-cultured banana plantlets that look perfect in jars — but when you move them to soil, 80% wilt and die within a week. Why?',
            decisions: [{ prompt: 'What is the primary physiological reason in vitro plantlets cannot survive direct transfer to field conditions?', options: [
                { text: 'In vitro plantlets lack a functional cuticle and have malfunctioning stomata that remain', outcome: 'In vitro plantlets lack a functional cuticle and have malfunctioning stomata that remain open.' },
                { text: 'they are not sterile anymore', outcome: 'Not quite — Students think hardening is simply "keeping plants in a greenhouse for a few weeks" and that.', reveals: 'hardening-is-simply-keeping-plants' },
                { text: 'keeping plants in a greenhouse for a few weeks', outcome: 'Not quite — Students think hardening is simply "keeping plants in a greenhouse for a few weeks" and that.', reveals: 'hardening-is-simply-keeping-plants' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_011', title: 'Factors Affecting In Vitro Culture Responses',
          caseStudy: { intro: 'Imagine you have set up a perfect MS medium with 2,4-D and kinetin for callus induction from carrot root explants, but after four weeks you see only brown.',
            decisions: [{ prompt: 'A student prepares MS medium for tobacco leaf disc organogenesis but forgets to adjust pH to 5.8 before autoclaving; the medium solidifies.', options: [
                { text: 'Correct answer: pH alters the ionization state and thus the availability/uptake of', outcome: 'Correct answer: pH alters the ionization state and thus the availability/uptake of nutrients.' },
                { text: 'pH only affects gelling of agar', outcome: 'Not quite — Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol.".', reveals: 'optimizing-one-factor-e' },
                { text: 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', outcome: 'Not quite — Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol.".', reveals: 'optimizing-one-factor-e' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Plant Tissue Culture · Part 2/2', spots: [
            { id: 's1', label: 'Cell Suspension Culture Establishment and Growth', prompt: 'Which idea is this? — Cell suspension culture is a plant tissue culture system where friable callus tissue.', answer: 'Cell Suspension Culture Establishment and Growth', options: ['Cell Suspension Culture Establishment and Growth', 'Organogenesis Shoot and Root Induction In Vitro', 'Somatic Embryogenesis Induction and Development', 'Hardening and Acclimatization of Regenerated Plantlets'] },
            { id: 's2', label: 'Organogenesis Shoot and Root Induction In Vitro', prompt: 'Which idea is this? — Organogenesis in plant tissue culture is the process by which organized structures.', answer: 'Organogenesis Shoot and Root Induction In Vitro', options: ['Organogenesis Shoot and Root Induction In Vitro', 'Cell Suspension Culture Establishment and Growth', 'Somatic Embryogenesis Induction and Development', 'Hardening and Acclimatization of Regenerated Plantlets'] },
            { id: 's3', label: 'Somatic Embryogenesis Induction and Development', prompt: 'Which idea is this? — Somatic embryogenesis is the process by which bipolar somatic embryos, structurally.', answer: 'Somatic Embryogenesis Induction and Development', options: ['Somatic Embryogenesis Induction and Development', 'Cell Suspension Culture Establishment and Growth', 'Organogenesis Shoot and Root Induction In Vitro', 'Hardening and Acclimatization of Regenerated Plantlets'] },
            { id: 's4', label: 'Hardening and Acclimatization of Regenerated Plantlets', prompt: 'Which idea is this? — Hardening and acclimatization is the stepwise process of adapting in vitro-regenerated.', answer: 'Hardening and Acclimatization of Regenerated Plantlets', options: ['Hardening and Acclimatization of Regenerated Plantlets', 'Cell Suspension Culture Establishment and Growth', 'Organogenesis Shoot and Root Induction In Vitro', 'Somatic Embryogenesis Induction and Development'] },
            { id: 's5', label: 'Factors Affecting In Vitro Culture Responses', prompt: 'Which idea is this? — Factors affecting in vitro culture responses refer to the specific genetic.', answer: 'Factors Affecting In Vitro Culture Responses', options: ['Factors Affecting In Vitro Culture Responses', 'Cell Suspension Culture Establishment and Growth', 'Organogenesis Shoot and Root Induction In Vitro', 'Somatic Embryogenesis Induction and Development'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at a tissue-culture nursery, a student is told to clone a rare orchid. \'Every plant cell is totipotent,\' he reasons, and harvests mature xylem vessel strands from the stem as his explant.',
            decisions: [{ prompt: 'Will this explant regenerate a plant?', options: [
                { text: 'No — totipotency needs a living, nucleated cell that can dedifferentiate and re-enter the cell cycle; mature xylem vessels are dead, enucleate and lignified. Use living parenchyma or mesophyll tissue.', outcome: 'Haberlandt\'s \'theoretically all cells\' has limits: cell viability, genotype and epigenetic state decide whether the potential can actually be expressed.' },
                { text: 'Yes — totipotency means any plant cell can always regenerate a whole plant, so xylem works.', outcome: 'Steward\'s carrot proof used living phloem cells; dead, nucleus-free cells have nothing left to reprogram.', reveals: 'all-cells-always-totipotent' },
                { text: 'No — but only because xylem lacks chloroplasts; a cell with chlorophyll can always regenerate.', outcome: 'Chloroplasts aren\'t the criterion — a living nucleus and competent cytoplasm are; plenty of non-photosynthetic tissues regenerate fine.', reveals: 'chlorophyll-drives-totipotency' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'You now understand why one cell can become a whole plant — the founding idea of plant biotech. Totipotency is a short-answer certainty on boards and the working principle of the entire propagation industry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_007', difficulty: 'standard',
          question: 'Cell suspension culture is a plant tissue culture system where friable callus.',
          hint: 'If unable to distinguish friable callus, revisit c12_biotech_cbse_06_006 and practice.',
          misconception: '**Misconception:** "Suspension culture grows faster than callus because liquid medium has better nutrient diffusion.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cell suspension culture is a plant tissue culture system where friable callus tissue is',
                  options: ['Cell suspension culture is a plant tissue culture system where friable callus tissue is', 'Cell totipotency is the inherent genetic potential of a single plant cell to', 'The history and milestones of plant tissue culture trace the chronological development of', 'Murashige and Skoog (MS) medium is a chemically defined, widely used plant tissue culture'],
                  hint: 'If unable to distinguish friable callus, revisit c12_biotech_cbse_06_006 and practice with images.',
                  misconception: '**Misconception:** "Suspension culture grows faster than callus because liquid medium has better nutrient diffusion." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-suspension-culture-grows-faster': { steps: ['If a student cannot explain why agitation is needed beyond "mixing," make them: 1.', 'Revisit **c12_biotech_cbse_06_006 (Callus Culture)** — observe how friability is assessed (visual + tactile).', 'Perform a **thought experiment**: "What happens to a 5 mm callus piece in static liquid vs.', 'shaken liquid after 48 h?" Sketch both.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_008', difficulty: 'standard',
          question: 'Organogenesis in plant tissue culture is the process by which organized.',
          hint: 'Revisit c12_biotech_cbse_06_004 (PGR roles) and practice converting mg/L to μM for auxins.',
          misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Define organogenesis in the context of plant tissue culture and distinguish it from somatic embryogenesis based on the origin of the regenerated structure.', answer: 'Organogenesis is the de novo formation of organs (shoots/roots) directly from',
                  options: ['Organogenesis is the de novo formation of organs (shoots/roots) directly from', 'both form whole plants so they are the same', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Revisit c12_biotech_cbse_06_004 (PGR roles) and practice converting mg/L to μM for auxins (NAA.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' },
                { id: 'b', prompt: 'A student prepares MS medium with 2 mg/L NAA (auxin) and 0.5 mg/L BAP (cytokinin) for shoot induction from tobacco leaf callus.', answer: 'The auxin:cytokinin ratio is 4:1 (high auxin)',
                  options: ['The auxin:cytokinin ratio is 4:1 (high auxin)', 'NAA is needed for shoots', 'auxin for roots, cytokinin for shoots', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Revisit c12_biotech_cbse_06_004 (PGR roles) and practice converting mg/L to μM for auxins (NAA.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' },
                { id: 'c', prompt: 'Compare and contrast *direct organogenesis* and *indirect organogenesis* in terms of: (a) genetic fidelity of regenerants, (b) time to plantlet formation, (c).', answer: 'genetic fidelity of regenerants, (',
                  options: ['genetic fidelity of regenerants, (', 'indirect is better for transformation', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Revisit c12_biotech_cbse_06_004 (PGR roles) and practice converting mg/L to μM for auxins (NAA.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' }
          ],
            remediations: { 'high-cytokinin-always-gives-shoots': { steps: ['If a student cannot predict morphogenic outcome from hormone ratios: Step 1 — Revisit c12_biotech_cbse_06_004 (PGR.', 'Step 3 — Analyze a published protocol (e.g., tobacco leaf disc organogenesis) and identify the exact ratio used at each.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 3.', 'If still stuck, the gap is usually *quantitative reasoning with ratios* — review Class 10 math (ratios/proportions).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "For commercial micropropagation, indirect organogenesis via callus is preferred over direct organogenesis because it produces higher.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Revisit c12_biotech_cbse_06_004 (PGR roles) and practice converting mg/L to μM for auxins (NAA.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' }
          ],
            remediations: { 'high-cytokinin-always-gives-shoots': { steps: ['If a student cannot predict morphogenic outcome from hormone ratios: Step 1 — Revisit c12_biotech_cbse_06_004 (PGR.', 'Step 3 — Analyze a published protocol (e.g., tobacco leaf disc organogenesis) and identify the exact ratio used at each.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 3.', 'If still stuck, the gap is usually *quantitative reasoning with ratios* — review Class 10 math (ratios/proportions).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_009', difficulty: 'standard',
          question: 'Somatic embryogenesis is the process by which bipolar somatic embryos.',
          hint: 'If stuck on stage identification or protocol design, revisit c12_biotech_cbse_06_004 (PGR.',
          misconception: 'Students confuse somatic embryogenesis with organogenesis because both produce "plantlets." The critical error.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Somatic embryos develop directly from explant epidermis without callus formation in all plant species." Explain why this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'plantlets', 'small shoots with roots'],
                  hint: 'If stuck on stage identification or protocol design, revisit c12_biotech_cbse_06_004 (PGR roles).',
                  misconception: 'Students confuse somatic embryogenesis with organogenesis because both produce "plantlets." The critical error: assuming somatic embryos.' },
                { id: 'b', prompt: 'Design a two-phase MS medium protocol for indirect somatic embryogenesis in carrot (Daucus carota) using leaf explant.', answer: 'using leaf explant',
                  options: ['using leaf explant', 'plantlets', 'small shoots with roots'],
                  hint: 'If stuck on stage identification or protocol design, revisit c12_biotech_cbse_06_004 (PGR roles).',
                  misconception: 'Students confuse somatic embryogenesis with organogenesis because both produce "plantlets." The critical error: assuming somatic embryos.' },
                { id: 'c', prompt: 'Compare somatic embryogenesis and organogenesis across these parameters: (i) Origin of meristems, (ii) PGR requirement pattern, (iii) Genetic fidelity risk.', answer: '| Parameter | Somatic Embryogenesis | Organogenesis |',
                  options: ['| Parameter | Somatic Embryogenesis | Organogenesis |', 'plantlets', 'small shoots with roots'],
                  hint: 'If stuck on stage identification or protocol design, revisit c12_biotech_cbse_06_004 (PGR roles).',
                  misconception: 'Students confuse somatic embryogenesis with organogenesis because both produce "plantlets." The critical error: assuming somatic embryos.' }
          ],
            remediations: { 'students-confuse-somatic-embryogenesis-with': { steps: ['If a student cannot distinguish the two pathways or misidentifies stages: Step 1 — Revisit c12_biotech_cbse_06_001.', 'Step 2 — Use c12_biotech_cbse_06_006 (callus culture) to see how callus heterogeneity leads to indirect pathway.', 'Step 3 — Draw side-by-side zygotic vs.', 'somatic embryo development timelines (globular → heart → torpedo → cotyledonary) on paper; label SAM, RAM, procambium.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_010', difficulty: 'standard',
          question: 'Hardening and acclimatization is the stepwise process of adapting.',
          hint: 'If stuck, revisit c11_bio_cbse_13_005 (ABA/ethylene) and c11_bio_cbse_11_007.',
          misconception: 'Students think hardening is simply "keeping plants in a greenhouse for a few weeks" and that survival depends only.',
          parts: [
                { id: 'a', prompt: 'Explain why reducing sucrose concentration gradually during primary hardening is necessary, rather than removing it abruptly.', answer: 'In vitro plantlets are heterotrophic',
                  options: ['In vitro plantlets are heterotrophic', 'to prevent osmotic shock', 'keeping plants in a greenhouse for a few weeks'],
                  hint: 'If stuck, revisit c11_bio_cbse_13_005 (ABA/ethylene) and c11_bio_cbse_11_007 (photosynthesis.',
                  misconception: 'Students think hardening is simply "keeping plants in a greenhouse for a few weeks" and that survival depends only on humidity.' },
                { id: 'b', prompt: 'A lab hardens 200 micropropagated Gerbera plantlets. After primary hardening (2 weeks, 90% RH), 180 survive.', answer: 'Primary hardening survival = (180/200) × 100 = 90%',
                  options: ['Primary hardening survival = (180/200) × 100 = 90%', 'keeping plants in a greenhouse for a few weeks'],
                  hint: 'If stuck, revisit c11_bio_cbse_13_005 (ABA/ethylene) and c11_bio_cbse_11_007 (photosynthesis.',
                  misconception: 'Students think hardening is simply "keeping plants in a greenhouse for a few weeks" and that survival depends only on humidity.' }
          ],
            remediations: { 'hardening-is-simply-keeping-plants': { steps: ['Revisit c11_bio_cbse_13_005 (ABA and ethylene) to understand hormonal control of stomatal closure and stress response.', 'Revisit c11_bio_cbse_11_007 (Factors affecting photosynthesis) to grasp light acclimation and photosynthetic induction.', 'Draw a 2-column table: "In vitro condition" vs.', '"Ex vitro requirement" for humidity, light, carbon source, sterility, root zone.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_011', difficulty: 'standard',
          question: 'Factors affecting in vitro culture responses refer to the specific genetic.',
          hint: 'If stuck, revisit the Skoog-Miller auxin:cytokinin ratio experiment (node.',
          misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors.',
          parts: [
                { id: 'a', prompt: 'Compare the factor sensitivity of **direct organogenesis** (node 008) vs. **somatic embryogenesis** (node 009).', answer: 'Correct answer: (a) Somatic embryogenesis is far more sensitive to explant age',
                  options: ['Correct answer: (a) Somatic embryogenesis is far more sensitive to explant age', 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', '"optimizing one factor (e'],
                  hint: 'If stuck, revisit the Skoog-Miller auxin:cytokinin ratio experiment (node c12_biotech_cbse_06_004).',
                  misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors interact non-linearly.' }
          ],
            remediations: { 'optimizing-one-factor-e': { steps: ['If a student cannot diagnose factor interactions: (1) Have them reconstruct a failed culture case study (provide.', '(2) Force them to write a "change only one variable" experimental plan for the top 3 suspect factors.', '(3) Revisit node c12_biotech_cbse_06_004 (PGR roles) and node c12_biotech_cbse_06_003 (MS medium composition).', 'Re-diagnostic: Give a new scenario (e.g., "citrus epicotyl segments on MS+NAA+BAP produce callus but no shoots") and.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
