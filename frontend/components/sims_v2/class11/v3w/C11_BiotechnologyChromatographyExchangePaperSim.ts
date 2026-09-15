import type { SimDef } from '../../engine/types';
import C11_BiotechnologyChromatographyExchangePaperSim from '../../../simulations/c6_12/C11_BiotechnologyChromatographyExchangePaperSim';

/** v3 wrapped master — C11_BiotechnologyChromatographyExchangePaperSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechnologychromatographyexchangepapersim: SimDef = {
    id: 'v3w_c11_biotechnologychromatographyexchangepapersim',
    title: 'nology Chromatography Exchange Paper',
    subtitle: 'This node covers the principles, matrices (dextran/agarose/polyacrylamide for gel.',
    classLevel: 11, subject: 'biotechnology', topic: 'Chromatography: Gel Filtration and Ion Exchange',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_12_004', 'c11_biotech_cbse_03_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you have a crude bacterial lysate containing your target protein (50 kDa, pI 6.5) mixed with larger.', goal: 'Master nology Chromatography Exchange Paper.' },
    discovery: {
        question: 'A mixture contains Protein A (pI 4.5), Protein B (pI 7.0), and Protein C (pI 9.5).',
        options: ['At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly', 'more negative binds less', 'more negative requires more counter-ions to displace'],
        answer: 'At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly',
        hook: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa.',
    },
    teaching: [
        { title: 'Chromatography is a separation technique.', text: 'Chromatography is a separation technique where components of a mixture are distributed between a mobile phase (liquid/gas) and a stationary phase (solid/gel) such that each component migrates at a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_004', title: 'Chromatography is a separation.',
          scaffold: { problem: 'You have a mixture of three proteins: Thyroglobulin (669 kDa, globular), BSA (66 kDa, globular), and Cytochrome c (12 kDa, globular).',
            steps: [
            { text: 'Identify the fractionation range of the gel (4–150 kDa) and the molecular weights of the proteins.' },
            { text: 'Compare each protein\'s MW to the fractionation range: Thyroglobulin (669 kDa) > upper limit (150 kDa) → completely.' },
            { text: 'Determine elution order: largest (most excluded) elutes first → Thyroglobulin (Vo), then BSA, then Cytochrome c (near.' },
            { text: 'Note that all are globular, so hydrodynamic radius correlates with MW; no shape correction needed.' },
            { text: 'Verify: Vo contains Thyroglobulin only; Vt contains Cytochrome c and buffer salts; BSA elutes in between.', faded: true, blankAnswer: 'Elution order: 1) Thyroglobulin (Vo), 2) BSA (between Vo.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_001', title: 'Carbohydrates are polyhydroxy aldehydes.',
          scaffold: { problem: 'A student isolates a monosaccharide from a fruit extract. Elemental analysis gives the empirical formula CH₂O, and molar mass is 180 g/mol.',
            steps: [
            { text: 'Empirical formula CH₂O gives molar mass 30 g/mol. Molecular mass 180 g/mol → n = 180/30 = 6.' },
            { text: 'Positive Benedict\'s test indicates a free carbonyl group (reducing sugar).' },
            { text: 'Two cyclic forms interconverting in water with mutarotation → the sugar cyclizes to form anomers (α and β).' },
            { text: 'Common hexoses: glucose, fructose, galactose. Fructose is a ketose (ketone at C‑2); glucose and galactose are aldoses.' },
            { text: 'Draw Haworth projections: α‑D‑glucopyranose (anomeric OH down) and β‑D‑glucopyranose (anomeric OH up).', faded: true, blankAnswer: 'Molecular formula C₆H₁₂O₆; the sugar is D‑glucose (an.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_03_001', title: 'Identify each idea',
          dissect: { specimen: 'nology Chromatography Exchange Paper', spots: [
            { id: 's1', label: 'Chromatography is a separation technique', prompt: 'Which idea is this? — Chromatography is a separation technique where components of a mixture are distributed.', answer: 'Chromatography is a separation technique', options: ['Chromatography is a separation technique', 'Carbohydrates are polyhydroxy aldehydes or'] },
            { id: 's2', label: 'Carbohydrates are polyhydroxy aldehydes or', prompt: 'Which idea is this? — Carbohydrates are polyhydroxy aldehydes or ketones, or substances that yield such.', answer: 'Carbohydrates are polyhydroxy aldehydes or', options: ['Carbohydrates are polyhydroxy aldehydes or', 'Chromatography is a separation technique'] }
          ] } }
    ],
    explore: { component: C11_BiotechnologyChromatographyExchangePaperSim, prompt: 'Explore the interactive — nology Chromatography Exchange Paper' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_004', difficulty: 'standard',
          question: 'Chromatography is a separation technique where components of a mixture are.',
          hint: 'Review Class 10 Chemistry pH/pI relationship (c10_chem_cbse_02_008) and Class 9 Chemistry.',
          misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa.',
          parts: [
                { id: 'a', prompt: 'A mixture contains Protein A (pI 4.5), Protein B (pI 7.0), and Protein C (pI 9.5).', answer: 'At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly',
                  options: ['At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly', 'more negative binds less', 'more negative requires more counter-ions to displace'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa globular protein and a 100.' }
          ],
            remediations: { 'students-consistently-confuse-molecular-weight': { steps: ['Draw a pore diagram: large molecule bypassing pores (short path) vs small molecule entering pores (long path) —.', 'Use a charge table: list protein pI, buffer pH, resulting protein charge, resin type, and binding prediction for 5.', 'Role-play the ion exchange column: student acts as "salt ion" displacing "protein" from "resin" — physically.', 'Revisit Class 10 Chemistry (c10_chem_cbse_02_008) pH/pI relationship: if pH > pI, protein is negative; if pH < pI,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa.',
          parts: [
                { id: 'a', prompt: 'Design a two-step purification scheme for a target enzyme (MW 60 kDa, pI 5.0) from a crude plant extract containing proteases (MW 25 kDa, pI 8.0),.', answer: 'Step 1: Ion exchange on DEAE-agarose at pH 7.0',
                  options: ['Step 1: Ion exchange on DEAE-agarose at pH 7.0', 'molecular weight', 'hydrodynamic size', 'Protein with pI 9 binds to DEAE at pH 7'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa globular protein and a 100.' }
          ],
            remediations: { 'students-consistently-confuse-molecular-weight': { steps: ['Draw a pore diagram: large molecule bypassing pores (short path) vs small molecule entering pores (long path) —.', 'Use a charge table: list protein pI, buffer pH, resulting protein charge, resin type, and binding prediction for 5.', 'Role-play the ion exchange column: student acts as "salt ion" displacing "protein" from "resin" — physically.', 'Revisit Class 10 Chemistry (c10_chem_cbse_02_008) pH/pI relationship: if pH > pI, protein is negative; if pH < pI,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_001', difficulty: 'standard',
          question: 'Carbohydrates are polyhydroxy aldehydes or ketones, or substances that yield.',
          hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10.',
          misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and.',
          parts: [
                { id: 'a', prompt: 'State the general formula of monosaccharides and name the two functional groups that define them as aldoses or ketoses.', answer: 'The general formula is Cₙ(H₂O)ₙ',
                  options: ['The general formula is Cₙ(H₂O)ₙ', 'CₙH₂ₙOₙ', 'alcohol and carboxyl groups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' },
                { id: 'b', prompt: 'A disaccharide gives a positive Benedict’s test and yields one molecule each of D‑glucose and D‑fructose on hydrolysis.', answer: 'The disaccharide is sucrose',
                  options: ['The disaccharide is sucrose', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' },
                { id: 'c', prompt: 'Compare the glycosidic linkages and branching patterns in amylopectin and glycogen.', answer: 'Both are α‑(1→4) linked linear chains with α‑(1→6) branches',
                  options: ['Both are α‑(1→4) linked linear chains with α‑(1→6) branches', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' }
          ],
            remediations: { 'd-and-l-sugars-refer': { steps: ['Have the student build Fischer projections of D‑ and L‑glyceraldehyde, then extend to D‑glucose by adding chiral.', 'Use a physical model or drawing to cyclize D‑glucose: show the nucleophilic attack of C‑5 OH on C‑1 carbonyl, forming a.', 'Mark the new chiral centre (C‑1) and demonstrate that the OH can be up (β) or down (α) while C‑5 configuration remains.', 'Ask the student to label the anomeric carbon in each cyclic form and state whether the sugar is D or L.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Cellulose and chitin are both β‑(1→4) linked polysaccharides, so they should be equally digestible by human enzymes."', answer: 'The statement is false',
                  options: ['The statement is false', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms', 'α‑D‑glucose is dextrorotatory, so α means D'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' },
                { id: 'b', prompt: 'Design a hypothetical disaccharide that is a reducing sugar but cannot be hydrolyzed by human digestive enzymes.', answer: 'Example: β‑D‑glucopyranosyl‑(1→3)‑β‑D‑glucopyranose (laminaribiose)',
                  options: ['Example: β‑D‑glucopyranosyl‑(1→3)‑β‑D‑glucopyranose (laminaribiose)', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms', 'α‑D‑glucose is dextrorotatory, so α means D'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' }
          ],
            remediations: { 'd-and-l-sugars-refer': { steps: ['Have the student build Fischer projections of D‑ and L‑glyceraldehyde, then extend to D‑glucose by adding chiral.', 'Use a physical model or drawing to cyclize D‑glucose: show the nucleophilic attack of C‑5 OH on C‑1 carbonyl, forming a.', 'Mark the new chiral centre (C‑1) and demonstrate that the OH can be up (β) or down (α) while C‑5 configuration remains.', 'Ask the student to label the anomeric carbon in each cyclic form and state whether the sugar is D or L.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
