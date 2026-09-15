import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch10_p2: SimDef = {
    id: 'v3_c12_chem_ch10_p2',
    title: 'Biomolecules · Part 2/2',
    subtitle: 'Starch feeds you, cellulose doesn\'t — one flipped bond is the whole story',
    classLevel: 12, subject: 'chemistry', topic: 'Biomolecules · Part 2/2',
    chapters: ['c12_chem_ch10'],
    nodeIds: ['c12_chem_cbse_10_007', 'c12_chem_cbse_10_008', 'c12_chem_cbse_10_009', 'c12_chem_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Biochemist', intro: 'Sugar, starch, DNA, enzymes — life is chemistry wearing a lab coat. This chapter translates the molecules you eat into the molecules you are.', goal: 'Classify carbohydrates by hydrolysis and reducing nature, and connect structure to function across biomolecules.' },
    discovery: {
        question: 'You digest starch happily but cellulose — also pure glucose polymer — passes straight through. Same building block, so what changes?',
        options: ['The glycosidic link: starch uses α-1,4 bonds your amylase can cut; cellulose uses β-1,4 bonds you have no enzyme for', 'Cellulose isn\'t made of glucose', 'Starch is smaller so it dissolves faster', 'Cellulose is a protein, not a carbohydrate'],
        answer: 'The glycosidic link: starch uses α-1,4 bonds your amylase can cut; cellulose uses β-1,4 bonds you have no enzyme for',
        hook: 'One flipped stereochemical bond turns dinner into dietary fibre. And one hidden carbon decides \'reducing\' vs not: sucrose locks both anomeric carbons in its glycosidic bond so it can\'t reduce Fehling\'s, while maltose leaves one free.',
    },
    teaching: [
        { title: 'Denaturation of Proteins: Causes and Effects', text: 'Denaturation of proteins is the process in which a native protein loses its unique three-dimensional structure (secondary, tertiary, and quaternary) due to disruption of non-covalent interactions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_10_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Sort the sugar jar with chemistry, not taste: classify carbohydrates by hydrolysis, unmask reducing vs non-reducing sugars by their anomeric carbons, then climb the ladder to proteins, nucleic acids and the chemistry of life.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_007', title: 'Denaturation of Proteins: Causes and Effects',
          caseStudy: { intro: 'Begin with the familiar observation of boiling an egg: the transparent, runny egg white turns opaque and solid.',
            decisions: [{ prompt: 'What is the defining characteristic of denaturation that distinguishes it from hydrolysis of proteins?', options: [
                { text: 'Denaturation disrupts only non-covalent interactions and disulfide bonds, destroying', outcome: 'Denaturation disrupts only non-covalent interactions and disulfide bonds, destroying secondary.' },
                { text: 'denaturation breaks peptide bonds', outcome: 'Not quite — Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses.', reveals: 'denaturation-breaks-peptide-bonds-because' },
                { text: 'falls apart', outcome: 'Not quite — Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses.', reveals: 'denaturation-breaks-peptide-bonds-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_008', title: 'Nucleic Acids: DNA and RNA Structure',
          scaffold: { problem: 'A synthetic DNA oligonucleotide has the sequence 5′-pGATC-3′ (p = 5′-phosphate). Calculate its molecular formula and molecular weight.',
            steps: [
            { text: 'Identify the four nucleotides in order: dGMP, dAMP, dTMP, dCMP (each as 5′-monophosphate).' },
            { text: 'Sum the molecular formulas of the four monomers:' },
            { text: 'Three phosphodiester bonds form (between 4 nucleotides), each eliminating one H₂O. Subtract 3 H₂O = H₆O₃.' },
            { text: 'Final formula = C₃₉H₅₁N₁₅O₂₅P₄.' },
            { text: 'Calculate MW using atomic weights (C=12.01, H=1.008, N=14.01, O=16.00, P=30.97):', faded: true, blankAnswer: 'Molecular formula = C₃₉H₅₁N₁₅O₂₅P₄; Molecular weight ≈ 1254.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_009', title: 'Vitamins: Classification and Functions',
          caseStudy: { intro: 'Observe a bottle of multivitamin tablets at home — notice the labels "Vitamin A (as retinyl acetate)", "Vitamin D3 (cholecalciferol)", "Vitamin.',
            decisions: [{ prompt: 'List the four fat-soluble vitamins and the nine water-soluble vitamins by their letter designations (e.g., Vitamin A, Vitamin B1, etc.).', options: [
                { text: 'Fat-soluble: Vitamin A, Vitamin D, Vitamin E, Vitamin K', outcome: 'Fat-soluble: Vitamin A, Vitamin D, Vitamin E, Vitamin K. Water-soluble: Vitamin B1 (Thiamine).' },
                { text: 'fat-soluble = stored in fat', outcome: 'Not quite — Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for.', reveals: 'students-often-write-vitamin-b' },
                { text: 'fat-soluble = dissolve in cooking oil', outcome: 'Not quite — Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for.', reveals: 'students-often-write-vitamin-b' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_010', title: 'Hormones: Functions and Examples',
          caseStudy: { intro: 'Begin with a relatable observation: a student feeling sudden "adrenaline rush" before a board exam — heart racing, palms sweating, mind sharpening.',
            decisions: [{ prompt: 'Name the chemical class of each hormone: (a) insulin, (b) cortisol, (c) thyroxine, (d) epinephrine.', options: [
                { text: '(a) Insulin — polypeptide/protein hormone (51 amino acids, two chains linked by disulfide', outcome: '(a) Insulin — polypeptide/protein hormone (51 amino acids, two chains linked by disulfide bonds).' },
                { text: 'protein hormone', outcome: 'Not quite — Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.', reveals: 'insulin-and-glucagon-are-both' },
                { text: 'amino acid derivative', outcome: 'Not quite — Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.', reveals: 'insulin-and-glucagon-are-both' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_007', title: 'A real-world call',
          caseStudy: { intro: 'Food preservatives and additives keep food safe and affordable for millions — and the same chemistry enables ultra-processed foods linked to poor health.',
            decisions: [{ prompt: 'Is \'safe chemistry\' still safe when it makes unhealthy food possible?', options: [
                { text: 'Yes — preservation prevents real harm (spoilage, hunger)', outcome: 'The food-safety answer — additives prevented deaths before they enabled junk food; the technology isn\'t the problem, the use is.' },
                { text: 'No — \'safe\' compounds in an unhealthy system aren\'t safe', outcome: 'The systems answer — a preservative that\'s individually harmless still serves a food system that\'s collectively harmful.' },
                { text: 'The chemistry is neutral — regulate the food system it serves', outcome: 'The regulatory answer — additives pass safety tests; the question is what products they\'re allowed to make cheap.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab gives a student three unknown solutions: A turns brick-red with Benedict\'s and ignores iodine; B turns blue-black with iodine; C answers neither test. He must match them to glucose, starch and sucrose.',
            decisions: [{ prompt: 'What\'s the correct matching, and why does sucrose fail Benedict\'s?', options: [
                { text: 'A = glucose, B = starch, C = sucrose — sucrose\'s glucose–fructose bond ties up both anomeric carbons, leaving no free carbonyl to reduce the reagent.', outcome: 'Reducing power lives in a free anomeric carbon: maltose has one and gives a positive test, sucrose doesn\'t — hydrolysis first, then it would.' },
                { text: 'A = glucose, B = starch, C = sucrose — and sucrose is non-reducing only because it isn\'t sweet enough to react.', outcome: 'Sweetness is irrelevant; the cause is structural — the C1–C2 link occupies both anomeric carbons.', reveals: 'sweetness-decides-reducing' },
                { text: 'C = glucose, A = sucrose — any disaccharide with a glycosidic bond reduces Benedict\'s.', outcome: 'Disaccharides split both ways: sucrose and trehalose are non-reducing; the anomeric carbons have to stay free, as in maltose.', reveals: 'all-disaccharides-reduce' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain why cows eat grass and you can\'t — at the bond level. Biomolecules links chemistry to biology and it\'s the board\'s favourite short-answer mine.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_007', difficulty: 'standard',
          question: 'Denaturation of proteins is the process in which a native protein loses its.',
          hint: 'If stuck, review c12_chem_cbse_10_006 (Protein Structure) focusing on the table of forces.',
          misconception: 'Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses function.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Denaturation of proteins is the process in',
                  options: ['Denaturation of proteins is the process in', 'Carbohydrates are optically active polyhydroxy aldehydes or ketones (or compounds that', 'Glucose is an aldohexose (C₆H₁₂O₆) that exists in equilibrium between an open-chain', 'Fructose is a ketohexose monosaccharide with molecular formula C₆H₁₂O₆, containing a'],
                  hint: 'If stuck, review c12_chem_cbse_10_006 (Protein Structure) focusing on the table of forces for each.',
                  misconception: 'Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses function.' }
          ],
            remediations: { 'denaturation-breaks-peptide-bonds-because': { steps: ['Revisit node c12_chem_cbse_10_006 (Protein Structure) and explicitly list which interactions stabilize each level.', 'Perform the egg-white heat vs urea experiment above.', 'Write a one-sentence distinction: "Denaturation unfolds; hydrolysis cuts."', 'Re-attempt Diagnostic Questions 1 and 5.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses function.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Denaturation always destroys the primary structure of a protein." Justify your answer with chemical reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'falls apart', 'denaturation breaks peptide bonds'],
                  hint: 'If stuck, review c12_chem_cbse_10_006 (Protein Structure) focusing on the table of forces for each.',
                  misconception: 'Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses function.' },
                { id: 'b', prompt: 'Design a simple experiment using household materials to demonstrate that denaturation by heat is often irreversible, while denaturation by a chaotropic agent.', answer: 'Take two samples of egg white',
                  options: ['Take two samples of egg white', 'falls apart', 'denaturation breaks peptide bonds'],
                  hint: 'If stuck, review c12_chem_cbse_10_006 (Protein Structure) focusing on the table of forces for each.',
                  misconception: 'Students often think denaturation breaks peptide bonds because the protein "falls apart" and loses function.' }
          ],
            remediations: { 'denaturation-breaks-peptide-bonds-because': { steps: ['Revisit node c12_chem_cbse_10_006 (Protein Structure) and explicitly list which interactions stabilize each level.', 'Perform the egg-white heat vs urea experiment above.', 'Write a one-sentence distinction: "Denaturation unfolds; hydrolysis cuts."', 'Re-attempt Diagnostic Questions 1 and 5.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_008', difficulty: 'standard',
          question: 'Nucleic acids are long-chain polymeric biomolecules composed of repeating.',
          hint: 'If unable to draw the cyclic sugar forms or identify anomeric carbon, revisit.',
          misconception: 'Students often write the nucleoside structure with the base attached to the **anomeric carbon (C-1) of the sugar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide',
                  options: ['Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide', 'Carbohydrates are optically active polyhydroxy aldehydes or ketones (or compounds that', 'Glucose is an aldohexose (C₆H₁₂O₆) that exists in equilibrium between an open-chain', 'Fructose is a ketohexose monosaccharide with molecular formula C₆H₁₂O₆, containing a'],
                  hint: 'If unable to draw the cyclic sugar forms or identify anomeric carbon, revisit.',
                  misconception: 'Students often write the nucleoside structure with the base attached to the **anomeric carbon (C-1) of the sugar in α-configuration** (like.' }
          ],
            remediations: { 'students-often-write-the-nucleoside': { steps: ['Revisit **c12_chem_cbse_10_001** (carbohydrate classification) to review glycosidic bond formation and anomeric carbon.', 'Practice drawing β-D-ribose and β-D-2-deoxyribose in Haworth form, labeling 1′, 2′, 3′, 4′, 5′ carbons.', 'Verify: 1′ has base, 5′ has CH₂OH (which becomes CH₂O-PO₃²⁻ in nucleotide).', 'Build a physical model (or paper cutouts) of two nucleotides: connect 3′-OH of first to 5′-phosphate of second via.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_009', difficulty: 'standard',
          question: 'Vitamins are organic compounds required in the diet in small amounts.',
          hint: 'If stuck, revisit Class 9 Solutions chapter (c9_chem_ch1_2) — specifically the "like.',
          misconception: 'Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for all B vitamins.',
          parts: [
                { id: 'a', prompt: 'List the four fat-soluble vitamins and the nine water-soluble vitamins by their letter designations (e.g., Vitamin A, Vitamin B1, etc.) as per NCERT.', answer: 'Fat-soluble: Vitamin A, Vitamin D, Vitamin E, Vitamin K',
                  options: ['Fat-soluble: Vitamin A, Vitamin D, Vitamin E, Vitamin K', 'fat-soluble = stored in fat', 'fat-soluble = dissolve in cooking oil'],
                  hint: 'If stuck, revisit Class 9 Solutions chapter (c9_chem_ch1_2) — specifically the "like dissolves.',
                  misconception: 'Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for all B vitamins.' },
                { id: 'b', prompt: 'A student claims: "Since Vitamin B12 is water-soluble, it cannot be stored in the body at all, so we must eat it every single day." Evaluate this statement.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'no storage at all', 'except', 'fat-soluble = stored in fat'],
                  hint: 'If stuck, revisit Class 9 Solutions chapter (c9_chem_ch1_2) — specifically the "like dissolves.',
                  misconception: 'Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for all B vitamins.' },
                { id: 'c', prompt: 'A patient presents with bleeding gums, poor wound healing, and pinpoint hemorrhages under the skin. Which vitamin deficiency is most likely?', answer: 'Vitamin C (Ascorbic acid) deficiency → Scurvy',
                  options: ['Vitamin C (Ascorbic acid) deficiency → Scurvy', 'fat-soluble = stored in fat', 'fat-soluble = dissolve in cooking oil'],
                  hint: 'If stuck, revisit Class 9 Solutions chapter (c9_chem_ch1_2) — specifically the "like dissolves.',
                  misconception: 'Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for all B vitamins.' },
                { id: 'd', prompt: 'Compare the toxicity risk of Vitamin A (fat-soluble) vs Vitamin C (water-soluble) when consumed in large doses over weeks.', answer: 'Vitamin A (retinol) accumulates in liver stellate cells',
                  options: ['Vitamin A (retinol) accumulates in liver stellate cells', 'both are equally toxic', 'water-soluble vitamins are never toxic', 'fat-soluble = stored in fat'],
                  hint: 'If stuck, revisit Class 9 Solutions chapter (c9_chem_ch1_2) — specifically the "like dissolves.',
                  misconception: 'Students often write "Vitamin B is a single vitamin" and list deficiency disease as "Beri-beri" for all B vitamins.' }
          ],
            remediations: { 'students-often-write-vitamin-b': { steps: ['Revisit c9_chem_ch1_2 (Solutions: Solute, Solvent and Concentration) to refresh solubility principles — polar.', 'Make a two-column table: left column = Vitamin letter, right column = Chemical name + Solubility (F/W) + Deficiency.', 'For each vitamin, write ONE Indian food source (e.g., B1 → whole wheat atta, B2 → milk/paneer, B12 → curd/egg, C →.', 'Self-test: cover right column, recall from letter.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_010', difficulty: 'standard',
          question: 'Hormones are low-molecular-weight chemical messengers secreted by endocrine.',
          hint: 'If stuck on hormone mechanism, revisit c11_chem_cbse_07_011 (enzyme regulation) — the.',
          misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.',
          parts: [
                { id: 'a', prompt: 'Name the chemical class of each hormone: (a) insulin, (b) cortisol, (c) thyroxine, (d) epinephrine. Give one structural feature that places each in its class.', answer: 'insulin, (',
                  options: ['insulin, (', 'protein hormone', 'amino acid derivative', 'Insulin and glucagon are both peptides, so they work the same way'],
                  hint: 'If stuck on hormone mechanism, revisit c11_chem_cbse_07_011 (enzyme regulation) — the glycogen.',
                  misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.' },
                { id: 'b', prompt: 'A patient has fasting blood glucose 180 mg/dL (normal 70-100). The physician suspects diabetes mellitus. Which hormone is deficient or ineffective?', answer: 'Hormone: Insulin (deficient in Type 1, ineffective/resistant in Type 2)',
                  options: ['Hormone: Insulin (deficient in Type 1, ineffective/resistant in Type 2)', 'insulin activates adenylate cyclase → cAMP', 'Insulin and glucagon are both peptides, so they work the same way', 'Reason: Both are peptides'],
                  hint: 'If stuck on hormone mechanism, revisit c11_chem_cbse_07_011 (enzyme regulation) — the glycogen.',
                  misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.' }
          ],
            remediations: { 'insulin-and-glucagon-are-both': { steps: ['Revisit c12_chem_cbse_10_005 (amino acids) and c12_chem_cbse_10_006 (protein structure) — draw insulin\'s two-chain.', 'Revisit c11_chem_cbse_07_011 (enzyme regulation) — compare RTK vs GPCR signaling cascades side-by-side.', 'Make a 3×3 table: Hormone | Chemical Class | Receptor Location | Second Messenger | Key Kinase | Metabolic Direction.', 'Take a diagnostic quiz: "Classify hormone X, predict receptor type, predict effect on glycogen." If <80% correct.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
