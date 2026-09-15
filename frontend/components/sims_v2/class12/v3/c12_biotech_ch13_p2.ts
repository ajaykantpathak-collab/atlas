import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch13_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch13_p2: SimDef = {
    id: 'v3_c12_biotech_ch13_p2',
    title: 'Biotechnology and Society · Part 2/2',
    subtitle: 'A scary rat photo is not data — learn to audit what you believe about GMOs.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology and Society · Part 2/2',
    chapters: ['c12_biotech_ch13'],
    nodeIds: ['c12_biotech_cbse_13_007', 'c12_biotech_cbse_13_008', 'c12_biotech_cbse_13_009', 'c12_biotech_cbse_13_010', 'c12_biotech_cbse_13_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Science communicator', intro: 'The GMO debate is where biotechnology meets society — and where your evidence literacy gets tested.', goal: 'Analyse the determinants of public perception and evaluate GMO benefits and concerns with evidence.' },
    discovery: {
        question: 'A WhatsApp forward claims \'GMOs cause infertility\' beside a photo of a tumour-covered rat. Before forwarding, what separates evidence from anecdote?',
        options: ['Checking the source, the funding, and what major science academies conclude — perception is shaped by media and culture, not only data', 'The photograph — vivid images are the strongest form of evidence', 'The number of forwards — widespread belief indicates truth', 'Rejecting it blindly — all GMO concerns are baseless'],
        answer: 'Checking the source, the funding, and what major science academies conclude — perception is shaped by media and culture, not only data',
        hook: 'Neither blind trust nor blind rejection is science — public perception is built from media framing, cultural values and real gaps in knowledge, and the skill is auditing claims, not picking a tribe.',
    },
    teaching: [
        { title: 'Ethical Issues in Genetic Engineering of Organisms', text: 'Ethical issues in genetic engineering of organisms refer to the moral dilemmas and value-based conflicts arising from the deliberate alteration of an organism\'s genome using biotechnology.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_13_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Adjudicate the GMO debate: list the claimed benefits and concerns of GM crops, sort each into agronomic, nutritional, environmental and social categories, and weigh Bt cotton\'s evidence against the headlines.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_007', title: 'Ethical Issues in Genetic Engineering of Organisms',
          caseStudy: { intro: 'Imagine a village in Maharashtra where farmers are debating whether to adopt a new genetically modified mustard variety that promises higher yields but.',
            decisions: [{ prompt: 'List three distinct ethical concerns raised by the genetic engineering of crops, and for each, name the primary stakeholder group most.', options: [
                { text: 'Correct answer: (1) Justice/equity – smallholder farmers who cannot afford proprietary', outcome: 'Correct answer: (1) Justice/equity – smallholder farmers who cannot afford proprietary seeds; (2).' },
                { text: 'health risks', outcome: 'Not quite — Students often treat ethical issues as mere opinions ("some people like GMOs, some don\'t") and fail.', reveals: 'students-often-treat-ethical-issues' },
                { text: 'playing God', outcome: 'Not quite — Students often treat ethical issues as mere opinions ("some people like GMOs, some don\'t") and fail.', reveals: 'students-often-treat-ethical-issues' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_008', title: 'Animal Rights and Biotechnology Research',
          caseStudy: { intro: 'Imagine you are a biotech entrepreneur developing a recombinant human insulin produced in the milk of transgenic goats — a "pharming" project.',
            decisions: [{ prompt: 'Define the 3Rs principle in animal research and give one specific biotechnology example for each R (Replacement, Reduction, Refinement).', options: [
                { text: 'The 3Rs principle, proposed by Russell and Burch (1959), stands for: Replacement', outcome: 'The 3Rs principle, proposed by Russell and Burch (1959), stands for: Replacement — substituting.' },
                { text: 'transgenic animals are not \'real\' animals', outcome: 'Not quite — Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer.', reveals: 'transgenic-animals-are-not-real' },
                { text: 'they don\'t suffer', outcome: 'Not quite — Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer.', reveals: 'transgenic-animals-are-not-real' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_009', title: 'Biopiracy and Protection of Indigenous Knowledge',
          caseStudy: { intro: 'Imagine you are a farmer in Punjab who has cultivated Basmati rice for generations using traditional seed selection methods.',
            decisions: [{ prompt: 'Define biopiracy in one sentence using the three essential elements: resource type, exploitation mechanism, and missing ethical/legal.', options: [
                { text: 'Biopiracy is the commercial exploitation of naturally occurring biochemical/genetic', outcome: 'Biopiracy is the commercial exploitation of naturally occurring biochemical/genetic resources and.' },
                { text: 'stealing plants', outcome: 'Not quite — Students often think biopiracy only occurs when a *patent is granted* on a natural product.', reveals: 'biopiracy-only-occurs-when-a' },
                { text: 'patenting natural products', outcome: 'Not quite — Students often think biopiracy only occurs when a *patent is granted* on a natural product.', reveals: 'biopiracy-only-occurs-when-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_010', title: 'Farmer\'s Rights and Seed Sovereignty Debates',
          caseStudy: { intro: 'Imagine a small farmer in Punjab who has saved seeds from his best wheat crop for 20 years.',
            decisions: [{ prompt: 'State the four specific rights granted to farmers under Section 39 of the PPV&FR Act, 2001.', options: [
                { text: 'The four rights are: (1) Right to save, use, sow, re-sow, exchange, share, or sell', outcome: 'The four rights are: (1) Right to save, use, sow, re-sow, exchange, share, or sell farm-saved.' },
                { text: 'right to save seeds', outcome: 'Not quite — Students often think **"Farmers\' Rights = right to save seeds for own use only"** — confusing.', reveals: 'farmers-rights-right-to-save' },
                { text: 'Farmers\' Rights', outcome: 'Not quite — Students often think **"Farmers\' Rights = right to save seeds for own use only"** — confusing.', reveals: 'farmers-rights-right-to-save' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_011', title: 'Public Engagement and Science Communication in Biotech',
          caseStudy: { intro: 'Imagine you are a biotech researcher who has just developed a drought‑tolerant GM maize variety for Indian farmers.',
            decisions: [{ prompt: 'Define “public engagement” in biotechnology and state how it differs from one‑way science communication (outreach).', options: [
                { text: 'Public engagement in biotechnology is a two‑way, iterative dialogue between experts and', outcome: 'Public engagement in biotechnology is a two‑way, iterative dialogue between experts and diverse.' },
                { text: 'educating the public', outcome: 'Not quite — Students often think “science communication = simplifying jargon” and “public engagement = holding.', reveals: 'science-communication-simplifying-jargon-and' },
                { text: 'science communication = simplifying jargon', outcome: 'Not quite — Students often think “science communication = simplifying jargon” and “public engagement = holding.', reveals: 'science-communication-simplifying-jargon-and' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_13_008', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology and Society · Part 2/2', spots: [
            { id: 's1', label: 'Ethical Issues in Genetic Engineering of Organisms', prompt: 'Which idea is this? — Ethical issues in genetic engineering of organisms refer to the moral dilemmas and.', answer: 'Ethical Issues in Genetic Engineering of Organisms', options: ['Ethical Issues in Genetic Engineering of Organisms', 'Animal Rights and Biotechnology Research', 'Biopiracy and Protection of Indigenous Knowledge', 'Farmers Rights and Seed Sovereignty Debates'] },
            { id: 's2', label: 'Animal Rights and Biotechnology Research', prompt: 'Which idea is this? — Animal rights in biotechnology research refers to the ethical framework and regulatory.', answer: 'Animal Rights and Biotechnology Research', options: ['Animal Rights and Biotechnology Research', 'Ethical Issues in Genetic Engineering of Organisms', 'Biopiracy and Protection of Indigenous Knowledge', 'Farmers Rights and Seed Sovereignty Debates'] },
            { id: 's3', label: 'Biopiracy and Protection of Indigenous Knowledge', prompt: 'Which idea is this? — Biopiracy is the unauthorized commercial exploitation of indigenous biochemical.', answer: 'Biopiracy and Protection of Indigenous Knowledge', options: ['Biopiracy and Protection of Indigenous Knowledge', 'Ethical Issues in Genetic Engineering of Organisms', 'Animal Rights and Biotechnology Research', 'Farmers Rights and Seed Sovereignty Debates'] },
            { id: 's4', label: 'Farmers Rights and Seed Sovereignty Debates', prompt: 'Which idea is this? — Farmer\'s Rights and Seed Sovereignty refer to the legal and ethical entitlement.', answer: 'Farmers Rights and Seed Sovereignty Debates', options: ['Farmers Rights and Seed Sovereignty Debates', 'Ethical Issues in Genetic Engineering of Organisms', 'Animal Rights and Biotechnology Research', 'Biopiracy and Protection of Indigenous Knowledge'] },
            { id: 's5', label: 'Public Engagement and Science Communication in Biotech', prompt: 'Which idea is this? — Public engagement and science communication in biotechnology refer to the structured.', answer: 'Public Engagement and Science Communication in Biotech', options: ['Public Engagement and Science Communication in Biotech', 'Ethical Issues in Genetic Engineering of Organisms', 'Animal Rights and Biotechnology Research', 'Biopiracy and Protection of Indigenous Knowledge'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family WhatsApp group gets a forward claiming \'GMO foods cause infertility\' over a photo of a tumour-covered rat. An aunt wants to blast it to every group she knows; the Class 12 biotech student is asked to weigh in.',
            decisions: [{ prompt: 'What\'s the scientifically honest response?', options: [
                { text: 'Check the source and the consensus before sharing — that image traces to a retracted rat study, while major science academies affirm approved GM foods; and remember opposition is driven by trust and values, not just facts.', outcome: 'Perception ≠ ignorance: media framing, corporate distrust and cultural values shape GMO attitudes, so engagement means dialogue plus verifiable evidence — not a forwarded scare.' },
                { text: 'Forward it — until scientists prove zero risk, treating every claim as probably true is the safe move.', outcome: 'That mistakes an outlier for consensus; \'no evidence of harm\' from decades of data beats a retracted, sensational study.', reveals: 'forward-first-verify-later' },
                { text: 'Reply with a fact-sheet only — people oppose GMOs purely because they don\'t understand the science.', outcome: 'That\'s the deficit model: evidence shows facts alone can even polarise — distrust of regulators and \'unnaturalness\' concerns need addressing too.', reveals: 'opposition-is-just-illiteracy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_13_011', title: 'You made it',
          caseStudy: { intro: 'You can now defend a position on GMOs with evidence instead of forwards. Perception-vs-evidence questions test scientific temper — the exact quality boards and real citizenship demand.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_007', difficulty: 'standard',
          question: 'Ethical issues in genetic engineering of organisms refer to the moral dilemmas.',
          hint: 'Revisit c11_biotech_cbse_12_008 for the technical process of making a GMO and.',
          misconception: 'Students often treat ethical issues as mere opinions ("some people like GMOs, some don\'t") and fail to recognize that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ethical issues in genetic engineering of organisms refer to the moral dilemmas and',
                  options: ['Ethical issues in genetic engineering of organisms refer to the moral dilemmas and', 'Public perception of biotechnology and GMOs refers to the collective attitudes, beliefs,', 'GMOs (Genetically Modified Organisms) are organisms whose genetic material has been', 'Labeling of genetically modified (GM) foods is a regulatory requirement that mandates the'],
                  hint: 'Revisit c11_biotech_cbse_12_008 for the technical process of making a GMO and.',
                  misconception: 'Students often treat ethical issues as mere opinions ("some people like GMOs, some don\'t") and fail to recognize that bioethics uses.' }
          ],
            remediations: { 'students-often-treat-ethical-issues': { steps: ['If a student cannot move beyond opinion-based arguments, assign the "Ethical Principle Mapping Exercise": take the.', 'Then have the student rewrite their position using the principle language.', 'Finally, ask them to propose one policy change that would address the strongest justice concern.', 'This builds the habit of principled reasoning.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_008', difficulty: 'standard',
          question: 'Animal rights in biotechnology research refers to the ethical framework and.',
          hint: 'Revisit c12_biotech_cbse_13_007 (ethical frameworks) and c11_biotech_cbse_12_008.',
          misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are.',
          parts: [
                { id: 'a', prompt: 'Define the 3Rs principle in animal research and give one specific biotechnology example for each R (Replacement, Reduction, Refinement).', answer: 'The 3Rs principle, proposed by Russell and Burch (1959), stands for: Replacement',
                  options: ['The 3Rs principle, proposed by Russell and Burch (1959), stands for: Replacement', 'transgenic animals are not \'real\' animals', 'they don\'t suffer'],
                  hint: 'Revisit c12_biotech_cbse_13_007 (ethical frameworks) and c11_biotech_cbse_12_008 (transgenic animal.',
                  misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are genetically modified".' },
                { id: 'b', prompt: 'A research team proposes to create a transgenic pig model for cystic fibrosis by microinjecting CRISPR-Cas9 components into 200 zygotes, implanting them into.', answer: 'The justification confuses scientific relevance with ethical compliance',
                  options: ['The justification confuses scientific relevance with ethical compliance', 'better model', 'ethically justified', 'transgenic animals are not \'real\' animals'],
                  hint: 'Revisit c12_biotech_cbse_13_007 (ethical frameworks) and c11_biotech_cbse_12_008 (transgenic animal.',
                  misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are genetically modified".' },
                { id: 'c', prompt: 'Apply the CPCSEA guidelines to design a compliant protocol for a study producing recombinant human factor IX in the milk of transgenic rabbits.', answer: 'IAEC composition requirements, (',
                  options: ['IAEC composition requirements, (', 'transgenic animals are not \'real\' animals', 'they don\'t suffer'],
                  hint: 'Revisit c12_biotech_cbse_13_007 (ethical frameworks) and c11_biotech_cbse_12_008 (transgenic animal.',
                  misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are genetically modified".' }
          ],
            remediations: { 'transgenic-animals-are-not-real': { steps: ['If a student holds this misconception: Step 1 — Show the CPCSEA 2001 amendment text: "The IAEC shall satisfy itself.', 'Step 4 — Re-diagnose with Question 2 (transgenic pig CRISPR) to verify they now flag welfare risks specific to the.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since organoids and microphysiological systems (MPS) can now replicate human organ-level functions, CPCSEA should ban all animal use.', answer: 'The statement is scientifically premature and regulatorily unrealistic',
                  options: ['The statement is scientifically premature and regulatorily unrealistic', 'statement-analysis', 'they don\'t suffer'],
                  hint: 'Revisit c12_biotech_cbse_13_007 (ethical frameworks) and c11_biotech_cbse_12_008 (transgenic animal.',
                  misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are genetically modified".' },
                { id: 'b', prompt: 'Design a novel 3Rs-compliant strategy for testing the immunogenicity of a recombinant therapeutic antibody produced in CHO cells, using zero live animals.', answer: 'Strategy: (1) In silico',
                  options: ['Strategy: (1) In silico', 'transgenic animals are not \'real\' animals', 'they don\'t suffer'],
                  hint: 'Revisit c12_biotech_cbse_13_007 (ethical frameworks) and c11_biotech_cbse_12_008 (transgenic animal.',
                  misconception: 'Students often believe that "transgenic animals are not \'real\' animals" or "they don\'t suffer because they are genetically modified".' }
          ],
            remediations: { 'transgenic-animals-are-not-real': { steps: ['If a student holds this misconception: Step 1 — Show the CPCSEA 2001 amendment text: "The IAEC shall satisfy itself.', 'Step 4 — Re-diagnose with Question 2 (transgenic pig CRISPR) to verify they now flag welfare risks specific to the.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_009', difficulty: 'standard',
          question: 'Biopiracy is the unauthorized commercial exploitation of indigenous biochemical.',
          hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_01_011, specifically the.',
          misconception: 'Students often think biopiracy only occurs when a *patent is granted* on a natural product.',
          parts: [
                { id: 'a', prompt: 'Explain why the US patent on turmeric\'s wound-healing use (granted 1995, revoked 1997) was a clear case of biopiracy, referencing the patent criteria.', answer: 'The turmeric patent lacked novelty',
                  options: ['The turmeric patent lacked novelty', 'turmeric is natural so it can\'t be patented', 'biopiracy only occurs when a *patent is granted* on a natural product'],
                  hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_01_011, specifically the section.',
                  misconception: 'Students often think biopiracy only occurs when a *patent is granted* on a natural product.' },
                { id: 'b', prompt: 'A pharmaceutical company isolates a compound from a rare Himalayan plant used by local healers for altitude sickness.', answer: 'Yes, this is biopiracy',
                  options: ['Yes, this is biopiracy', 'no biopiracy because the compound was isolated in the lab', 'biopiracy only occurs when a *patent is granted* on a natural product'],
                  hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_01_011, specifically the section.',
                  misconception: 'Students often think biopiracy only occurs when a *patent is granted* on a natural product.' }
          ],
            remediations: { 'biopiracy-only-occurs-when-a': { steps: ['If a student conflates biopiracy with patent granting, do this 3-step remediation: (1) Show the Nagoya Protocol Article.', '(2) Give the "trade secret" scenario above and ask: "Did the community give consent?', 'Was benefit-sharing agreed?', 'If no, is it biopiracy?" Force the student to answer yes based on the access violation.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_010', difficulty: 'standard',
          question: 'Farmer\'s Rights and Seed Sovereignty refer to the legal and ethical entitlement.',
          hint: 'Revisit c11_biotech_cbse_01_011 (IPR and Patents) for patent criteria and TRIPS; then.',
          misconception: 'Students often think **"Farmers\' Rights = right to save seeds for own use only"** — confusing India\'s PPV&FR Act with.',
          parts: [
                { id: 'a', prompt: 'Compare the neem and basmati biopiracy cases: identify the type of IPR granted (patent vs.', answer: 'Neem: W.R',
                  options: ['Neem: W.R', 'Farmers\' Rights = right to save seeds for own use only', 'farm-saved seed exemption', 'both were patents in the US'],
                  hint: 'Revisit c11_biotech_cbse_01_011 (IPR and Patents) for patent criteria and TRIPS; then read PPV&FR.',
                  misconception: 'Students often think **"Farmers\' Rights = right to save seeds for own use only"** — confusing India\'s PPV&FR Act with UPOV 1991\'s.' }
          ],
            remediations: { 'farmers-rights-right-to-save': { steps: ['If a student cannot distinguish PPV&FR farmers\' rights from UPOV exemptions: (1) Have them create a two-column table.', '(2) Assign the **neem case study** (EPO revocation) and ask: "Which IPR was used?', 'Which prior art source proved lack of novelty?" (3) Re-attempt Diagnostic Questions 2 and 5.', 'If still stuck, revisit **c12_biotech_cbse_13_009** (Biopiracy and Protection of Indigenous Knowledge) for TKDL.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_13_011', difficulty: 'standard',
          question: 'Public engagement and science communication in biotechnology refer to the.',
          hint: 'Revisit c12_biotech_cbse_13_001 (public perception) and c12_biotech_cbse_13_007 (ethical.',
          misconception: 'Students often think “science communication = simplifying jargon” and “public engagement = holding a town hall.” The.',
          parts: [
                { id: 'a', prompt: 'Compare the “deficit model,” “dialogue model,” and “participatory model” of science communication.', answer: 'Deficit model: assumes public opposition = ignorance',
                  options: ['Deficit model: assumes public opposition = ignorance', 'science communication = simplifying jargon', 'public engagement = holding a town hall', 'we need better explanations'],
                  hint: 'Revisit c12_biotech_cbse_13_001 (public perception) and c12_biotech_cbse_13_007 (ethical issues).',
                  misconception: 'Students often think “science communication = simplifying jargon” and “public engagement = holding a town hall.” The real error is assuming.' }
          ],
            remediations: { 'science-communication-simplifying-jargon-and': { steps: ['If a student equates engagement with explanation: (1) Have them read the Bt brinjal moratorium case (2010) — note how.', '(2) Assign a 30‑min role‑play: scientist vs.', 'farmer who lost native seeds to contamination; the scientist must *not* use technical terms, only acknowledge loss and.', '(3) Re‑diagnose with Question 4 — check if they now choose participatory model and justify with power/precaution.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
