import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch13_p1: SimDef = {
    id: 'v3_c12_biotech_ch13_p1',
    title: 'Biotechnology and Society · Part 1/2',
    subtitle: 'A scary rat photo is not data — learn to audit what you believe about GMOs.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology and Society · Part 1/2',
    chapters: ['c12_biotech_ch13'],
    nodeIds: ['c12_biotech_cbse_13_001', 'c12_biotech_cbse_13_002', 'c12_biotech_cbse_13_003', 'c12_biotech_cbse_13_004', 'c12_biotech_cbse_13_005', 'c12_biotech_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Science communicator', intro: 'The GMO debate is where biotechnology meets society — and where your evidence literacy gets tested.', goal: 'Analyse the determinants of public perception and evaluate GMO benefits and concerns with evidence.' },
    discovery: {
        question: 'A WhatsApp forward claims \'GMOs cause infertility\' beside a photo of a tumour-covered rat. Before forwarding, what separates evidence from anecdote?',
        options: ['Checking the source, the funding, and what major science academies conclude — perception is shaped by media and culture, not only data', 'The photograph — vivid images are the strongest form of evidence', 'The number of forwards — widespread belief indicates truth', 'Rejecting it blindly — all GMO concerns are baseless'],
        answer: 'Checking the source, the funding, and what major science academies conclude — perception is shaped by media and culture, not only data',
        hook: 'Neither blind trust nor blind rejection is science — public perception is built from media framing, cultural values and real gaps in knowledge, and the skill is auditing claims, not picking a tribe.',
    },
    teaching: [
        { title: 'Public Perception of Biotechnology and GMOs', text: 'Public perception of biotechnology and GMOs refers to the collective attitudes, beliefs, and opinions held by the general public, consumers, farmers, and other stakeholders toward the development.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_13_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Adjudicate the GMO debate: list the claimed benefits and concerns of GM crops, sort each into agronomic, nutritional, environmental and social categories, and weigh Bt cotton\'s evidence against the headlines.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_001', title: 'Public Perception of Biotechnology and GMOs',
          caseStudy: { intro: 'Imagine you see a WhatsApp forward claiming "GMOs cause infertility" with a scary image of a rat with tumors.',
            decisions: [{ prompt: 'Define "public perception of biotechnology" in one sentence, and list three non-scientific factors that can shape it.', options: [
                { text: 'Public perception of biotechnology is the aggregate of attitudes and beliefs held by', outcome: 'Public perception of biotechnology is the aggregate of attitudes and beliefs held by society toward.' },
                { text: 'toxicity data, allergenicity studies', outcome: 'Not quite — **Misconception:** "Public opposition to GMOs is mainly due to scientific illiteracy — if people.', reveals: 'misconception-public-opposition-to-gmos' },
                { text: 'lists only scientific factors (e', outcome: 'Not quite — **Misconception:** "Public opposition to GMOs is mainly due to scientific illiteracy — if people.', reveals: 'misconception-public-opposition-to-gmos' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_002', title: 'GMOs: Benefits and Public Concerns',
          caseStudy: { intro: 'Imagine you\'re a farmer in Punjab deciding whether to plant Bt cotton — your neighbor says yields doubled, but a news report claims it causes farmer suicides.',
            decisions: [{ prompt: 'Define "Genetically Modified Organism" precisely, distinguishing it from organisms developed through conventional breeding or mutagenesis.', options: [
                { text: 'A GMO is an organism whose genome has been altered by inserting a specific gene or genes', outcome: 'A GMO is an organism whose genome has been altered by inserting a specific gene or genes from.' },
                { text: 'any organism with changed DNA', outcome: 'Not quite — Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm*.', reveals: 'gmos-are-untested-unsafe-because' },
                { text: 'GMOs are untested/unsafe', outcome: 'Not quite — Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm*.', reveals: 'gmos-are-untested-unsafe-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_003', title: 'Labeling of Genetically Modified Foods',
          caseStudy: { intro: 'Imagine you pick up a packet of soybean oil at a supermarket. The ingredient list says "soybean oil" — but the soybeans might have been herbicide-tolerant.',
            decisions: [{ prompt: '**Question:** What is the current mandatory GM labeling threshold for packaged food products in India under the FSSAI (Food Safety and.', options: [
                { text: '**Correct Answer:** India\'s FSSAI regulations (2011, updated 2022) mandate labeling if', outcome: '**Correct Answer:** India\'s FSSAI regulations (2011, updated 2022) mandate labeling if the.' },
                { text: '5% for the whole product', outcome: 'Not quite — **Misconception:** "If a food product tests negative for GM DNA/protein (by PCR/ELISA), it does not.', reveals: 'misconception-if-a-food-product' },
                { text: 'only if DNA is detectable', outcome: 'Not quite — **Misconception:** "If a food product tests negative for GM DNA/protein (by PCR/ELISA), it does not.', reveals: 'misconception-if-a-food-product' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_13_004', title: 'Environmental Impact of GMOs and Risk Assessment',
          scaffold: { problem: 'A GM chickpea event expresses Cry1Ab at 8 μg/g in pods. The target pest (Helicoverpa armigera) LC₅₀ = 0.05 μg/g diet.',
            steps: [
            { text: 'Identify given values — Cry1Ab expression in pods = 8 μg/g fresh weight; Wasp dietary exposure fraction = 30% = 0.3.' },
            { text: 'Calculate Estimated Environmental Concentration (EEC) for wasp — EEC = Expression level × Dietary exposure fraction = 8.' },
            { text: 'Calculate Margin of Exposure (MoE) — MoE = LC₅₀ / EEC = 200 / 2.4 = 83.33.' },
            { text: 'Compare with regulatory threshold — MoE = 83.33 > 10 → **Tier II testing NOT triggered** for this non-target species.' },
            { text: 'Interpret — The high MoE indicates a wide safety margin; however, other exposure pathways (pollen, nectar, honeydew).', faded: true, blankAnswer: 'MoE = 83.3 (dimensionless); Tier II testing not triggered.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_005', title: 'Gene Flow from GM Crops and Biosafety Concerns',
          caseStudy: { intro: 'Imagine you are a farmer growing Bt cotton next to a field of conventional cotton. Bees visit both fields. Could the Bt gene move into the conventional cotton?',
            decisions: [{ prompt: 'Define gene flow in the context of GM crops and name the two primary natural vectors responsible for transgene movement in flowering plants.', options: [
                { text: 'Gene flow is the transfer of genetic material (here, the transgene and its regulatory', outcome: 'Gene flow is the transfer of genetic material (here, the transgene and its regulatory sequences).' },
                { text: 'or only', outcome: 'Not quite — Students often believe that gene flow requires the GM crop and the recipient to be the same.', reveals: 'gene-flow-requires-the-gm' },
                { text: 'gene flow requires the GM crop and the recipient to be the same species', outcome: 'Not quite — Students often believe that gene flow requires the GM crop and the recipient to be the same.', reveals: 'gene-flow-requires-the-gm' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_006', title: 'Cartagena Protocol on Biosafety: Key Provisions',
          caseStudy: { intro: 'Imagine you are a biotech entrepreneur in India planning to export a genetically modified drought‑tolerant maize variety to Brazil for field trials.',
            decisions: [{ prompt: 'What is the full form of LMO in the context of the Cartagena Protocol, and how does it differ from the term GMO?', options: [
                { text: 'LMO stands for Living Modified Organism, defined as any living organism that possesses a', outcome: 'LMO stands for Living Modified Organism, defined as any living organism that possesses a novel.' },
                { text: 'the Cartagena Protocol prohibits the creation or trade of GMOs altogether', outcome: 'Not quite — Students often believe the Cartagena Protocol prohibits the creation or trade of GMOs altogether.', reveals: 'the-cartagena-protocol-prohibits-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology and Society · Part 1/2', spots: [
            { id: 's1', label: 'Public Perception of Biotechnology and GMOs', prompt: 'Which idea is this? — Public perception of biotechnology and GMOs refers to the collective attitudes, beliefs.', answer: 'Public Perception of Biotechnology and GMOs', options: ['Public Perception of Biotechnology and GMOs', 'GMOs Benefits and Public Concerns', 'Labeling of Genetically Modified Foods', 'Environmental Impact of GMOs and Risk Assessment'] },
            { id: 's2', label: 'GMOs Benefits and Public Concerns', prompt: 'Which idea is this? — GMOs (Genetically Modified Organisms) are organisms whose genetic material has been.', answer: 'GMOs Benefits and Public Concerns', options: ['GMOs Benefits and Public Concerns', 'Public Perception of Biotechnology and GMOs', 'Labeling of Genetically Modified Foods', 'Environmental Impact of GMOs and Risk Assessment'] },
            { id: 's3', label: 'Labeling of Genetically Modified Foods', prompt: 'Which idea is this? — Labeling of genetically modified (GM) foods is a regulatory requirement that mandates the.', answer: 'Labeling of Genetically Modified Foods', options: ['Labeling of Genetically Modified Foods', 'Public Perception of Biotechnology and GMOs', 'GMOs Benefits and Public Concerns', 'Environmental Impact of GMOs and Risk Assessment'] },
            { id: 's4', label: 'Environmental Impact of GMOs and Risk Assessment', prompt: 'Which idea is this? — Environmental Impact Assessment (EIA) of GMOs is a systematic, science-based process that.', answer: 'Environmental Impact of GMOs and Risk Assessment', options: ['Environmental Impact of GMOs and Risk Assessment', 'Public Perception of Biotechnology and GMOs', 'GMOs Benefits and Public Concerns', 'Labeling of Genetically Modified Foods'] },
            { id: 's5', label: 'Gene Flow from GM Crops and Biosafety Concerns', prompt: 'Which idea is this? — Gene flow from GM crops refers to the transfer of transgenic DNA (including the inserted.', answer: 'Gene Flow from GM Crops and Biosafety Concerns', options: ['Gene Flow from GM Crops and Biosafety Concerns', 'Public Perception of Biotechnology and GMOs', 'GMOs Benefits and Public Concerns', 'Labeling of Genetically Modified Foods'] },
            { id: 's6', label: 'Cartagena Protocol on Biosafety Key Provisions', prompt: 'Which idea is this? — The Cartagena Protocol on Biosafety is an international treaty under the Convention.', answer: 'Cartagena Protocol on Biosafety Key Provisions', options: ['Cartagena Protocol on Biosafety Key Provisions', 'Public Perception of Biotechnology and GMOs', 'GMOs Benefits and Public Concerns', 'Labeling of Genetically Modified Foods'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family WhatsApp group gets a forward claiming \'GMO foods cause infertility\' over a photo of a tumour-covered rat. An aunt wants to blast it to every group she knows; the Class 12 biotech student is asked to weigh in.',
            decisions: [{ prompt: 'What\'s the scientifically honest response?', options: [
                { text: 'Check the source and the consensus before sharing — that image traces to a retracted rat study, while major science academies affirm approved GM foods; and remember opposition is driven by trust and values, not just facts.', outcome: 'Perception ≠ ignorance: media framing, corporate distrust and cultural values shape GMO attitudes, so engagement means dialogue plus verifiable evidence — not a forwarded scare.' },
                { text: 'Forward it — until scientists prove zero risk, treating every claim as probably true is the safe move.', outcome: 'That mistakes an outlier for consensus; \'no evidence of harm\' from decades of data beats a retracted, sensational study.', reveals: 'forward-first-verify-later' },
                { text: 'Reply with a fact-sheet only — people oppose GMOs purely because they don\'t understand the science.', outcome: 'That\'s the deficit model: evidence shows facts alone can even polarise — distrust of regulators and \'unnaturalness\' concerns need addressing too.', reveals: 'opposition-is-just-illiteracy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend a position on GMOs with evidence instead of forwards. Perception-vs-evidence questions test scientific temper — the exact quality boards and real citizenship demand.',
            decisions: [{ prompt: 'What comes next? Biotechnology and Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biotechnology and Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_001', difficulty: 'standard',
          question: 'Public perception of biotechnology and GMOs refers to the collective attitudes.',
          hint: 'Revisit **c11_biotech_cbse_01_005** (GM crops) and **c11_biotech_cbse_01_010** (Biosafety.',
          misconception: '**Misconception:** "Public opposition to GMOs is mainly due to scientific illiteracy — if people understood the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Public perception of biotechnology and GMOs refers to the collective attitudes, beliefs,',
                  options: ['Public perception of biotechnology and GMOs refers to the collective attitudes, beliefs,', 'GMOs (Genetically Modified Organisms) are organisms whose genetic material has been', 'Labeling of genetically modified (GM) foods is a regulatory requirement that mandates the', 'Environmental Impact Assessment (EIA) of GMOs is a systematic, science-based process that'],
                  hint: 'Revisit **c11_biotech_cbse_01_005** (GM crops) and **c11_biotech_cbse_01_010** (Biosafety.',
                  misconception: '**Misconception:** "Public opposition to GMOs is mainly due to scientific illiteracy — if people understood the science, they would accept.' }
          ],
            remediations: { 'misconception-public-opposition-to-gmos': { steps: ['If a student equates perception with literacy: 1.', 'Assign the *Cultural Cognition Project* 2-page brief (kahanlab.com) — read and summarize in 3 sentences.', 'Have them interview *two* people who oppose GMOs — one with high science background, one without — and compare their.', 'Re-attempt Diagnostic Question 5, now citing *at least two* perception determinants beyond knowledge.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_002', difficulty: 'standard',
          question: 'GMOs (Genetically Modified Organisms) are organisms whose genetic material has.',
          hint: 'If stuck on transgene expression: Revisit c11_biotech_cbse_07_010 (Lac operon) and.',
          misconception: 'Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm* with *evidence.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental risk of gene flow from herbicide-tolerant (HT) canola to wild relatives versus Bt cotton to wild relatives in India.', answer: 'HT canola (Brassica napus) has wild relatives (B',
                  options: ['HT canola (Brassica napus) has wild relatives (B', 'gene flow is always bad', 'GMOs are untested/unsafe'],
                  hint: 'If stuck on transgene expression: Revisit c11_biotech_cbse_07_010 (Lac operon) and.',
                  misconception: 'Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm* with *evidence of absence of harm*, and.' }
          ],
            remediations: { 'gmos-are-untested-unsafe-because': { steps: ['If student cannot distinguish hazard (intrinsic toxicity) from risk (hazard × exposure), or cannot explain.', '2) Revisit c11_bio_cbse_19_007 (Mechanism of Hormone Action: Peptide and Steroid) for receptor-ligand specificity.', '3) Re-do Diagnostic Q2 with step-by-step guidance: "Draw the insect midgut lumen → list conditions: pH, proteases.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm* with *evidence.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since GM crops reduce pesticide use, they are unambiguously better for biodiversity than conventional farming." Use evidence from.', answer: 'The statement is an oversimplification',
                  options: ['The statement is an oversimplification', 'GMOs are untested/unsafe'],
                  hint: 'If stuck on transgene expression: Revisit c11_biotech_cbse_07_010 (Lac operon) and.',
                  misconception: 'Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm* with *evidence of absence of harm*, and.' },
                { id: 'b', prompt: 'Design a scientifically rigorous 5-year monitoring study to detect unintended effects of a newly approved drought-tolerant GM maize (expressing a bacterial RNA.', answer: 'experimental design with controls, (',
                  options: ['experimental design with controls, (', 'GMOs are untested/unsafe'],
                  hint: 'If stuck on transgene expression: Revisit c11_biotech_cbse_07_010 (Lac operon) and.',
                  misconception: 'Students believe "GMOs are untested/unsafe" because they conflate *absence of evidence of harm* with *evidence of absence of harm*, and.' }
          ],
            remediations: { 'gmos-are-untested-unsafe-because': { steps: ['If student cannot distinguish hazard (intrinsic toxicity) from risk (hazard × exposure), or cannot explain.', '2) Revisit c11_bio_cbse_19_007 (Mechanism of Hormone Action: Peptide and Steroid) for receptor-ligand specificity.', '3) Re-do Diagnostic Q2 with step-by-step guidance: "Draw the insect midgut lumen → list conditions: pH, proteases.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_003', difficulty: 'standard',
          question: 'Labeling of genetically modified (GM) foods is a regulatory requirement that.',
          hint: 'If stuck, revisit **c11_biotech_cbse_12_005 (PCR: Principle, Steps and Applications)**.',
          misconception: '**Misconception:** "If a food product tests negative for GM DNA/protein (by PCR/ELISA), it does not need a GM label.',
          parts: [
                { id: 'a', prompt: '**Question:** A food manufacturer imports corn flour from the USA. The shipment documentation states "may contain up to 2% GM corn (event MON810)".', answer: '**Correct Answer:** **Yes, labeling is mandatory.** **Steps:** 1',
                  options: ['**Correct Answer:** **Yes, labeling is mandatory.** **Steps:** 1', 'No, because frying destroys DNA', 'Only if the final chip tests positive'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_12_005 (PCR: Principle, Steps and Applications)** for.',
                  misconception: '**Misconception:** "If a food product tests negative for GM DNA/protein (by PCR/ELISA), it does not need a GM label in India." **Why this.' },
                { id: 'b', prompt: '**Question:** Compare and contrast the **process-based** (India, Brazil) and **product-based** (EU, Japan, Australia) GM labeling approaches.', answer: '**Correct Answer:** | Aspect | Process-Based (India) | Product-Based (EU) |',
                  options: ['**Correct Answer:** | Aspect | Process-Based (India) | Product-Based (EU) |', 'both require PCR testing of final product', 'process-based is stricter for refined oils'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_12_005 (PCR: Principle, Steps and Applications)** for.',
                  misconception: '**Misconception:** "If a food product tests negative for GM DNA/protein (by PCR/ELISA), it does not need a GM label in India." **Why this.' }
          ],
            remediations: { 'misconception-if-a-food-product': { steps: ['**Revisit node c12_biotech_cbse_13_002 (GMOs: Benefits and Public Concerns)** to reinforce the distinction between.', '**Re-read the FSSAI 2022 amendment notification** (available on fssai.gov.in) focusing on the "Exemptions" clause for.', 'Make a two-column table: **Process-Based Trigger** vs.', '**Product-Based Trigger** with 3 examples each.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_004', difficulty: 'standard',
          question: 'Environmental Impact Assessment (EIA) of GMOs is a systematic, science-based.',
          hint: 'If unsure about transgene biology or regulatory hierarchy, revisit.',
          misconception: '**"Risk assessment = Hazard identification only."** Students equate "hazard" (inherent potential to cause harm, e.g.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Environmental risk assessment of GMOs checks if the GM crop is 100% safe for the environment." What is the fundamental flaw in this.', answer: 'The flaw is the "100% safe" absolutist standard',
                  options: ['The flaw is the "100% safe" absolutist standard', '100% safe'],
                  hint: 'If unsure about transgene biology or regulatory hierarchy, revisit **c11_biotech_cbse_01_005 (GM.',
                  misconception: '**"Risk assessment = Hazard identification only."** Students equate "hazard" (inherent potential to cause harm, e.g., "Cry protein is toxic.' }
          ],
            remediations: { 'risk-assessment-hazard-identification-only': { steps: ['If the student cannot distinguish hazard vs.', 'risk or misapplies MoE: 1.', '**Revisit c11_biotech_cbse_01_010 (Biosafety: Regulations and Guidelines)** — specifically the "Risk Assessment.', '**Do this exercise:** Take Bt brinjal (Cry1Ac, 20 μg/g fruit).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_005', difficulty: 'standard',
          question: 'Gene flow from GM crops refers to the transfer of transgenic DNA (including the.',
          hint: 'If stuck, review c10_bio_cbse_03_006 (Pollination) and c10_bio_cbse_04_008 (Speciation).',
          misconception: 'Students often believe that gene flow requires the GM crop and the recipient to be the same species.',
          parts: [
                { id: 'a', prompt: 'Explain why gene flow from a GM crop to a wild relative does not automatically create a "superweed," and identify the three biological conditions that must.', answer: 'Gene flow alone only introduces the transgene',
                  options: ['Gene flow alone only introduces the transgene', 'gene flow requires the GM crop and the recipient to be the same species'],
                  hint: 'If stuck, review c10_bio_cbse_03_006 (Pollination) and c10_bio_cbse_04_008 (Speciation) for the.',
                  misconception: 'Students often believe that gene flow requires the GM crop and the recipient to be the same species.' }
          ],
            remediations: { 'gene-flow-requires-the-gm': { steps: ['If a student cannot distinguish species-level from genus-level compatibility, have them: (1) Revisit.', '(2) List five crop–wild relative pairs from Indian agriculture (e.g., rice–Oryza rufipogon, sorghum–Sorghum halepense.', '(3) Re-attempt DIAGNOSTIC_QUESTION_2 with these concrete examples.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_006', difficulty: 'standard',
          question: 'The Cartagena Protocol on Biosafety is an international treaty under the.',
          hint: 'If stuck, revisit c12_biotech_cbse_13_002 (GMOs: Benefits and Public Concerns) for LMO.',
          misconception: 'Students often believe the Cartagena Protocol prohibits the creation or trade of GMOs altogether.',
          parts: [
                { id: 'a', prompt: 'Explain why the Advance Informed Agreement (AIA) procedure applies only to LMOs intended for intentional introduction into the environment (e.g., seeds for.', answer: 'AIA applies to intentional introductions',
                  options: ['AIA applies to intentional introductions', 'AIA applies to all LMOs', 'the Cartagena Protocol prohibits the creation or trade of GMOs altogether'],
                  hint: 'If stuck, revisit c12_biotech_cbse_13_002 (GMOs: Benefits and Public Concerns) for LMO vs GMO, and.',
                  misconception: 'Students often believe the Cartagena Protocol prohibits the creation or trade of GMOs altogether.' },
                { id: 'b', prompt: 'Compare the roles of the Biosafety Clearing‑House (BCH) and the Advance Informed Agreement (AIA) in the Cartagena Protocol.', answer: 'The BCH is a passive, centralized online portal where Parties deposit and access',
                  options: ['The BCH is a passive, centralized online portal where Parties deposit and access', 'swaps the two (e', 'the Cartagena Protocol prohibits the creation or trade of GMOs altogether'],
                  hint: 'If stuck, revisit c12_biotech_cbse_13_002 (GMOs: Benefits and Public Concerns) for LMO vs GMO, and.',
                  misconception: 'Students often believe the Cartagena Protocol prohibits the creation or trade of GMOs altogether.' }
          ],
            remediations: { 'the-cartagena-protocol-prohibits-the': { steps: ['If a student holds the "ban" misconception: (1) Re‑read the definition of LMO and the scope paragraph (Article 4).', '(2) Compare with the domestic regulatory framework node (c11_biotech_cbse_01_010) — note that India\'s GEAC approves.', '(3) Do a quick table: Column A = "Protocol bans GMOs" (False), Column B = "Protocol requires prior informed consent for.', '(4) Re‑attempt Diagnostic Question 5; if still incorrect, revisit the AIA flow‑chart in Worked Example 1.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
