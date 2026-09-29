import type { SimDef } from '../../engine/types';
import C12_ChemistryAldehydesKetonesandCarboxylicACBSESim from '../../../simulations/c6_12/C12_ChemistryAldehydesKetonesandCarboxylicACBSESim';

/** v3 wrapped master — C12_ChemistryAldehydesKetonesandCarboxylicACBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistryaldehydesketonesandcarboxylicacbsesim: SimDef = {
    id: 'v3w_c12_chemistryaldehydesketonesandcarboxylicacbsesim',
    title: 'Physical Properties of Aldehydes and Ketones',
    subtitle: 'Covers physical properties (state, boiling point, solubility, odor) of aldehydes and.',
    classLevel: 12, subject: 'chemistry', topic: 'Physical Properties of Aldehydes and Ketones',
    chapters: [],
    nodeIds: ['c12_chem_cbse_08_004', 'c12_chem_cbse_08_005', 'c12_chem_cbse_07_003', 'c12_chem_cbse_07_007', 'c12_chem_cbse_08_001', 'c12_chem_cbse_08_003', 'c12_chem_cbse_08_006', 'c12_chem_cbse_08_007', 'c12_chem_cbse_08_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe that formalin (aqueous methanal) is a liquid used to preserve biological specimens in school labs,.', goal: 'Master Physical Properties of Aldehydes and Ketones.' },
    discovery: {
        question: 'Name the reducing agent that can reduce a carboxylic acid to a primary alcohol but cannot be replaced by NaBH₄ for this conversion.',
        options: ['Lithium aluminium hydride (LiAlH₄) reduces carboxylic acids to primary alcohols', 'NaBH₄ reduces carboxylic acids to alcohols', 'LiAlH₄ reduces aldehydes to alkanes'],
        answer: 'Lithium aluminium hydride (LiAlH₄) reduces carboxylic acids to primary alcohols',
        hook: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing.',
    },
    teaching: [
        { title: 'Physical properties of aldehydes and ketones.', text: 'Physical properties of aldehydes and ketones refer to their observable characteristics such as state (gas, liquid, solid), boiling points, solubility in water and organic solvents, and odor, which.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_004', title: 'Physical properties of aldehydes and.',
          scaffold: { problem: 'In a school laboratory, you have three unknown liquids A, B, and C with molecular masses around 58-60 g/mol.',
            steps: [
            { text: 'List the given compounds with their molecular masses and functional groups: n-butane (alkane, 58), methoxyethane.' },
            { text: 'Recall the order of intermolecular force strength: H-bonding (alcohol) > dipole-dipole (aldehyde/ketone) > weak.' },
            { text: 'Match boiling points: Highest BP (370 K) must be the alcohol (butan-1-ol) due to H-bonding → C = butan-1-ol.' },
            { text: 'Check solubility: Butan-1-ol (C) miscible (H-bonds with water).' },
            { text: 'Conclude: A = n-butane, B = propanal, C = butan-1-ol. Methoxyethane and acetone are not in the set.', faded: true, blankAnswer: 'A = n-butane (bp 273 K, insoluble), B = propanal (bp 322 K,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_005', title: 'Nucleophilic addition reaction is the.',
          scaffold: { problem: 'When 3-methylbutanal (isovaleraldehyde, (CH₃)₂CHCH₂CHO) reacts with hydroxylamine (NH₂OH) in weakly acidic medium, what is the final.',
            steps: [
            { text: 'Identify reactants — 3-methylbutanal is an aldehyde (R-CHO where R = (CH₃)₂CHCH₂–); hydroxylamine is H₂N–OH.' },
            { text: 'Acid catalyst (H⁺) protonates carbonyl oxygen → increases δ⁺ on carbonyl carbon, making it more electrophilic.' },
            { text: 'Nucleophilic attack — lone pair on nitrogen of NH₂OH attacks carbonyl carbon perpendicular to plane; π-bond electrons.' },
            { text: 'Proton transfers — acid/base steps: OH⁻ deprotonates N⁺H₃–OH to give neutral carbinolamine (CH₃)₂CHCH₂–CH(OH)–NH–OH;.' },
            { text: 'Dehydration — loss of water from protonated carbinolamine gives iminium ion: (CH₃)₂CHCH₂–CH=N⁺H–OH; deprotonation of.' },
            { text: 'Verify — product has C=N–OH (oxime functional group); aldoxime since derived from aldehyde; stereochemistry (syn/anti).', faded: true, blankAnswer: 'Product: (CH₃)₂CHCH₂–CH=N–OH (3-methylbutanal oxime)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_003', title: 'Preparation of alcohols from carbonyl.',
          scaffold: { problem: 'A perfume chemist needs to convert cinnamaldehyde (C₆H₅–CH=CH–CHO, an α,β-unsaturated aldehyde) to cinnamyl alcohol (C₆H₅–CH=CH–CH₂OH).',
            steps: [
            { text: 'Identify functional groups — conjugated aldehyde (–CHO) and alkene (C=C). Target: reduce only –CHO to –CH₂OH.' },
            { text: 'Recall selectivity — NaBH₄ reduces aldehydes/ketones but not isolated alkenes; LiAlH₄ also does not reduce isolated.' },
            { text: 'Choose NaBH₄ in methanol at 0°C → 25°C. It delivers hydride to the carbonyl carbon via 1,2-addition; the conjugated.' },
            { text: 'Write equation: C₆H₅–CH=CH–CHO + NaBH₄ → (after H₂O workup) C₆H₅–CH=CH–CH₂OH + NaBO₂ + H₂ (simplified).' },
            { text: 'Verify — product retains C=C (UV absorption ~280 nm unchanged), IR shows loss of aldehyde C=O stretch (1700 cm⁻¹), gain.', faded: true, blankAnswer: 'NaBH₄ in MeOH, 0°C → rt. Product: cinnamyl alcohol.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_007', title: 'Dehydration of alcohols is an.',
          scaffold: { problem: '3,3-Dimethylbutan-2-ol is heated with concentrated H₂SO₄ at 443 K.',
            steps: [
            { text: 'Identify the alcohol class — OH on C-2, with two methyl groups on C-3 → secondary alcohol (C-2 attached to two carbons:.' },
            { text: 'Protonation of OH by H₂SO₄ gives good leaving group (H₂O). Loss of water forms secondary carbocation at C-2.' },
            { text: 'Check for rearrangement — adjacent C-3 is tertiary (attached to three carbons: C-2 and two CH₃).' },
            { text: 'Elimination of β-H from the tertiary carbocation. Two β-carbons: C-1 (primary, 3 H\'s) and C-3 (now quaternary after.' },
            { text: 'Verify Saytzeff vs Hofmann — only one alkene possible due to quaternary C-3 having no β-H.', faded: true, blankAnswer: 'Major product: 2,3-dimethylbut-1-ene. Mechanism:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_001', title: 'Aldehydes are prepared by controlled.',
          scaffold: { problem: 'A chemist wants to prepare benzaldehyde from benzyl alcohol (C₆H₅CH₂OH) in the laboratory.',
            steps: [
            { text: 'Identify the substrate — benzyl alcohol is a primary alcohol (–CH₂OH attached to phenyl).' },
            { text: 'Evaluate each reagent: (i) KMnO₄/NaOH is a strong oxidant in aqueous medium → over-oxidises to benzoic acid.' },
            { text: 'Select the best laboratory reagent: PCC/CH₂Cl₂ (standard for controlled oxidation to aldehyde).' },
            { text: 'Write the balanced equation: C₆H₅CH₂OH + [O] → C₆H₅CHO + H₂O. With PCC: 3C₆H₅CH₂OH + 2C₅H₅NH⁺CrO₃Cl⁻ → 3C₆H₅CHO +.' },
            { text: 'Verify — product is benzaldehyde (aldehyde), no further oxidation possible under anhydrous conditions.', faded: true, blankAnswer: 'Use PCC in CH₂Cl₂ (laboratory) or Cu/573 K (industrial)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_003', title: 'Ketones are prepared from acyl.',
          scaffold: { problem: 'Write the complete reaction sequence for preparing 3-methylbutan-2-one (CH₃COCH(CH₃)₂) from an acyl chloride using dialkylcadmium.',
            steps: [
            { text: 'Identify the two alkyl groups in the target ketone: CH₃CO- (acetyl) and -CH(CH₃)₂ (isopropyl).' },
            { text: 'Prepare isopropylmagnesium chloride: (CH₃)₂CHCl + Mg → (CH₃)₂CHMgCl (in dry ether).' },
            { text: 'Prepare diisopropylcadmium: 2 (CH₃)₂CHMgCl + CdCl₂ → ((CH₃)₂CH)₂Cd + 2 MgCl₂.' },
            { text: 'React with acyl chloride: CH₃COCl + ((CH₃)₂CH)₂Cd → CH₃COCH(CH₃)₂ + CdCl₂.' },
            { text: 'Verify atom balance: C: 2+6=8 → 8; H: 3+14=17 → 17; Cl: 1+0=1 → 0 (CdCl₂ has 2 Cl, but 2 MgCl₂ also formed; overall Cl.', faded: true, blankAnswer: 'CH₃COCl + ((CH₃)₂CH)₂Cd → CH₃COCH(CH₃)₂ + CdCl₂ (with prior.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_08_005', title: 'Identify each idea',
          dissect: { specimen: 'Physical Properties of Aldehydes and Ketones', spots: [
            { id: 's1', label: 'Physical properties of aldehydes and', prompt: 'Which idea is this? — Physical properties of aldehydes and ketones refer to their observable characteristics.', answer: 'Physical properties of aldehydes and', options: ['Physical properties of aldehydes and', 'Nucleophilic addition reaction is the', 'Preparation of alcohols from carbonyl', 'Dehydration of alcohols is an'] },
            { id: 's2', label: 'Nucleophilic addition reaction is the', prompt: 'Which idea is this? — Nucleophilic addition reaction is the characteristic reaction of aldehydes and ketones.', answer: 'Nucleophilic addition reaction is the', options: ['Nucleophilic addition reaction is the', 'Physical properties of aldehydes and', 'Preparation of alcohols from carbonyl', 'Dehydration of alcohols is an'] },
            { id: 's3', label: 'Preparation of alcohols from carbonyl', prompt: 'Which idea is this? — Preparation of alcohols from carbonyl compounds involves the reduction of the carbonyl.', answer: 'Preparation of alcohols from carbonyl', options: ['Preparation of alcohols from carbonyl', 'Physical properties of aldehydes and', 'Nucleophilic addition reaction is the', 'Dehydration of alcohols is an'] },
            { id: 's4', label: 'Dehydration of alcohols is an', prompt: 'Which idea is this? — Dehydration of alcohols is an acid-catalyzed elimination reaction where a water molecule.', answer: 'Dehydration of alcohols is an', options: ['Dehydration of alcohols is an', 'Physical properties of aldehydes and', 'Nucleophilic addition reaction is the', 'Preparation of alcohols from carbonyl'] },
            { id: 's5', label: 'Aldehydes are prepared by controlled', prompt: 'Which idea is this? — Aldehydes are prepared by controlled oxidation or dehydrogenation of primary alcohols,.', answer: 'Aldehydes are prepared by controlled', options: ['Aldehydes are prepared by controlled', 'Physical properties of aldehydes and', 'Nucleophilic addition reaction is the', 'Preparation of alcohols from carbonyl'] },
            { id: 's6', label: 'Ketones are prepared from acyl', prompt: 'Which idea is this? — Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid.', answer: 'Ketones are prepared from acyl', options: ['Ketones are prepared from acyl', 'Physical properties of aldehydes and', 'Nucleophilic addition reaction is the', 'Preparation of alcohols from carbonyl'] }
          ] } }
    ],
    explore: { component: C12_ChemistryAldehydesKetonesandCarboxylicACBSESim, prompt: 'Explore the interactive — Physical Properties of Aldehydes and Ketones' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_004', difficulty: 'standard',
          question: 'Physical properties of aldehydes and ketones refer to their observable.',
          hint: 'Review Class 11 Chemical Bonding (c11_chem_cbse_04_010) for bond polarity and States of.',
          misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they.',
          parts: [
                { id: 'a', prompt: 'Why are lower aldehydes and ketones (methanal, ethanal, propanone) miscible with water in all proportions, but solubility decreases rapidly as the alkyl chain.', answer: 'Lower members have small hydrocarbon chains',
                  options: ['Lower members have small hydrocarbon chains', 'aldehydes/ketones form hydrogen bonds with each other in water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they contain an oxygen.' }
          ],
            remediations: { 'aldehydes-and-ketones-can-form': { steps: ['If the student cannot distinguish dipole-dipole from H-bonding, have them draw the Lewis structure of propanal and.', 'Then draw ethanol and show the O-H bond.', 'Use a simple demonstration: place a drop of acetone and a drop of ethanol on a watch glass; acetone evaporates faster.', 'Revisit Class 11 node c11_chem_cbse_04_010 (polarity of bonds) and c11_chem_cbse_05_003 (hydrogen bonding in states of.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Acetone has a higher boiling point than propanal because the carbonyl group in acetone is more polar due to two electron-donating alkyl.', answer: 'The statement is false',
                  options: ['The statement is false', 'more alkyl groups increase polarity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they contain an oxygen.' },
                { id: 'b', prompt: 'Why are lower aldehydes and ketones (methanal, ethanal, propanone) miscible with water in all proportions, but solubility decreases rapidly as the alkyl chain.', answer: 'Lower members have small hydrocarbon chains',
                  options: ['Lower members have small hydrocarbon chains', 'aldehydes/ketones form hydrogen bonds with each other in water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they contain an oxygen.' }
          ],
            remediations: { 'aldehydes-and-ketones-can-form': { steps: ['If the student cannot distinguish dipole-dipole from H-bonding, have them draw the Lewis structure of propanal and.', 'Then draw ethanol and show the O-H bond.', 'Use a simple demonstration: place a drop of acetone and a drop of ethanol on a watch glass; acetone evaporates faster.', 'Revisit Class 11 node c11_chem_cbse_04_010 (polarity of bonds) and c11_chem_cbse_05_003 (hydrogen bonding in states of.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_005', difficulty: 'standard',
          question: 'Nucleophilic addition reaction is the characteristic reaction of aldehydes and.',
          hint: 'If stuck, revisit c11_chem_cbse_04_011 (resonance in carbonyl) and c11_chem_cbse_04_012.',
          misconception: 'Students often write the product of ammonia derivative addition (e.g., 2,4-DNPH, hydroxylamine, semicarbazide) as the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nucleophilic addition reaction is the characteristic reaction of aldehydes and ketones',
                  options: ['Nucleophilic addition reaction is the characteristic reaction of aldehydes and ketones', 'Physical properties of aldehydes and ketones refer to their observable characteristics', 'Preparation of alcohols from carbonyl compounds involves the reduction of the carbonyl', 'Dehydration of alcohols is an acid-catalyzed elimination reaction where a water molecule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the product of ammonia derivative addition (e.g., 2,4-DNPH, hydroxylamine, semicarbazide) as the carbinolamine.' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['If the student cannot draw the dehydration step: (1) Revisit Class 11 resonance and acid-base concepts.', '(2) Practice writing the mechanism for imine formation from acetone + NH₃: attack → carbinolamine → protonate OH → lose.', '(3) Re-diagnostic: "Draw the complete mechanism for reaction of cyclohexanone with hydroxylamine to form cyclohexanone.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_003', difficulty: 'standard',
          question: 'Preparation of alcohols from carbonyl compounds involves the reduction of the.',
          hint: 'If unable to predict product, revisit Class 11 nucleophilic addition mechanism.',
          misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing.',
          parts: [
                { id: 'a', prompt: 'Name the reducing agent that can reduce a carboxylic acid to a primary alcohol but cannot be replaced by NaBH₄ for this conversion.', answer: 'Lithium aluminium hydride (LiAlH₄) reduces carboxylic acids to primary alcohols',
                  options: ['Lithium aluminium hydride (LiAlH₄) reduces carboxylic acids to primary alcohols', 'NaBH₄ reduces carboxylic acids to alcohols', 'LiAlH₄ reduces aldehydes to alkanes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' },
                { id: 'b', prompt: 'Explain why sodium borohydride (NaBH₄) reduces aldehydes and ketones but does not reduce esters under normal conditions, whereas lithium aluminium hydride.', answer: 'NaBH₄ is a milder hydride donor',
                  options: ['NaBH₄ is a milder hydride donor', 'steric hindrance', 'NaBH₄ is not strong enough'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' },
                { id: 'c', prompt: 'Predict the major organic product (structure and IUPAC name) when 3-methylbutan-2-one is treated with (i) NaBH₄ followed by H₂O, and (ii) CH₃MgBr followed by.', answer: '(i) NaBH₄ reduction: 3-methylbutan-2-ol (secondary alcohol)',
                  options: ['(i) NaBH₄ reduction: 3-methylbutan-2-ol (secondary alcohol)', 'NaBH₄ reduces carboxylic acids to alcohols', 'LiAlH₄ reduces aldehydes to alkanes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' }
          ],
            remediations: { 'students-write-nabh-reduces-carboxylic': { steps: ['Revisit c12_chem_cbse_07_001 (classification of alcohols) to firmly link product structure (1°/2°/3°) to starting.', 'Make a 3×3 table: rows = aldehyde, ketone, carboxylic acid/ester; columns = NaBH₄, LiAlH₄, H₂/Pd; fill with "reacts →.', 'Practice 5 Grignard reactions: vary carbonyl (HCHO, CH₃CHO, CH₃COCH₃) and Grignard (CH₃MgBr, C₂H₅MgBr, PhMgBr); write.', 'Re-diagnostic: Attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 again; if error persists, review Class 11.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing.',
          parts: [
                { id: 'a', prompt: 'A student proposes this synthesis: "Convert benzoic acid to benzyl alcohol using NaBH₄ in methanol." Evaluate this proposal. Will it work?', answer: 'The proposal will NOT work',
                  options: ['The proposal will NOT work', 'NaBH₄ reduces carboxylic acids to alcohols', 'LiAlH₄ reduces aldehydes to alkanes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' }
          ],
            remediations: { 'students-write-nabh-reduces-carboxylic': { steps: ['Revisit c12_chem_cbse_07_001 (classification of alcohols) to firmly link product structure (1°/2°/3°) to starting.', 'Make a 3×3 table: rows = aldehyde, ketone, carboxylic acid/ester; columns = NaBH₄, LiAlH₄, H₂/Pd; fill with "reacts →.', 'Practice 5 Grignard reactions: vary carbonyl (HCHO, CH₃CHO, CH₃COCH₃) and Grignard (CH₃MgBr, C₂H₅MgBr, PhMgBr); write.', 'Re-diagnostic: Attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 again; if error persists, review Class 11.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_007', difficulty: 'standard',
          question: 'Dehydration of alcohols is an acid-catalyzed elimination reaction where a water.',
          hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization.',
          misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O,.',
          parts: [
                { id: 'a', prompt: 'Write the major product when 3-methylbutan-2-ol undergoes acid-catalyzed dehydration with concentrated H₂SO₄. Explain why this is the major product.', answer: 'Major product: 2-methylbut-2-ene (more substituted alkene)',
                  options: ['Major product: 2-methylbut-2-ene (more substituted alkene)', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'b', prompt: 'Why does PCC in CH₂Cl₂ oxidize primary alcohols to aldehydes while acidified KMnO₄ oxidizes them to carboxylic acids?', answer: 'PCC is a mild, anhydrous oxidant in non-aqueous CH₂Cl₂',
                  options: ['PCC is a mild, anhydrous oxidant in non-aqueous CH₂Cl₂', 'PCC is weaker so it stops', 'rate of reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'c', prompt: 'A student treats butan-2-ol with (a) Cu/573 K, (b) acidified K₂Cr₂O₇, (c) PCC. Write the organic product(s) for each case with balanced equations.', answer: 'Cu/573 K, (',
                  options: ['Cu/573 K, (', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' }
          ],
            remediations: { 'students-write-the-dehydration-of': { steps: ['Revisit carbocation stability and rearrangements: c11_chem_cbse_04_005 (VSEPR/hybridization) and c11_chem_cbse_04_006.', 'Practice drawing 3-step dehydration mechanisms for 10 different alcohols (primary, secondary, tertiary, with/without.', 'Make a reagent table: Oxidizing agent | Medium | 1° alcohol product | 2° alcohol product | 3° alcohol product — fill.', 'Redo Diagnostic Questions 1–5 after 48 hours; if any error persists, watch NPTEL lecture on alcohol oxidation.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O,.',
          parts: [
                { id: 'a', prompt: 'In the Lucas test, 2-methylpropan-2-ol (tert-butyl alcohol) produces immediate turbidity, butan-2-ol takes 5–10 minutes, and butan-1-ol shows no turbidity at.', answer: 'Lucas reagent (ZnCl₂/conc',
                  options: ['Lucas reagent (ZnCl₂/conc', 'reactivity order', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'b', prompt: 'Design a two-step sequence to convert 2-methylpropan-1-ol (isobutyl alcohol) to 2-methylpropanal (isobutyraldehyde) without over-oxidation to the acid.', answer: 'Step 1: Oxidize with PCC in CH₂Cl₂ at 0–25°C → 2-methylpropanal (aldehyde)',
                  options: ['Step 1: Oxidize with PCC in CH₂Cl₂ at 0–25°C → 2-methylpropanal (aldehyde)', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' }
          ],
            remediations: { 'students-write-the-dehydration-of': { steps: ['Revisit carbocation stability and rearrangements: c11_chem_cbse_04_005 (VSEPR/hybridization) and c11_chem_cbse_04_006.', 'Practice drawing 3-step dehydration mechanisms for 10 different alcohols (primary, secondary, tertiary, with/without.', 'Make a reagent table: Oxidizing agent | Medium | 1° alcohol product | 2° alcohol product | 3° alcohol product — fill.', 'Redo Diagnostic Questions 1–5 after 48 hours; if any error persists, watch NPTEL lecture on alcohol oxidation.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_001', difficulty: 'standard',
          question: 'Aldehydes are prepared by controlled oxidation or dehydrogenation of primary.',
          hint: 'If stuck, review **c10_chem_cbse_04_006** (Functional Groups) and practice drawing all.',
          misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give.',
          parts: [
                { id: 'a', prompt: 'Compare the products when (i) ethanol vapour is passed over heated copper at 573 K and (ii) ethanol is heated with acidified K₂Cr₂O₇.', answer: '**Answer:** (i) Cu/573 K → dehydrogenation: CH₃CH₂OH → CH₃CHO + H₂ (g)',
                  options: ['**Answer:** (i) Cu/573 K → dehydrogenation: CH₃CH₂OH → CH₃CHO + H₂ (g)', 'dehydrogenation', 'oxidation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give nothing." **Why it\'s.' }
          ],
            remediations: { 'misconception-primary-alcohols-always-give': { steps: ['If a student cannot classify alcohols or predict products: 1.', 'Revisit **c10_chem_cbse_04_006** (Functional Groups) to practice identifying 1°, 2°, 3° alcohols from structures.', 'Revisit **c11_chem_cbse_08_001** and **c11_chem_cbse_08_002** (Oxidation Number) to calculate oxidation state changes.', 'Do a **re-diagnostic**: Draw CH₃CH₂CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Using excess PCC on a primary alcohol will give the carboxylic acid because PCC is an oxidising agent." Evaluate this statement.', answer: '**Answer:** False',
                  options: ['**Answer:** False', 'strong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give nothing." **Why it\'s.' },
                { id: 'b', prompt: 'Compare the products when (i) ethanol vapour is passed over heated copper at 573 K and (ii) ethanol is heated with acidified K₂Cr₂O₇.', answer: '**Answer:** (i) Cu/573 K → dehydrogenation: CH₃CH₂OH → CH₃CHO + H₂ (g)',
                  options: ['**Answer:** (i) Cu/573 K → dehydrogenation: CH₃CH₂OH → CH₃CHO + H₂ (g)', 'dehydrogenation', 'oxidation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give nothing." **Why it\'s.' }
          ],
            remediations: { 'misconception-primary-alcohols-always-give': { steps: ['If a student cannot classify alcohols or predict products: 1.', 'Revisit **c10_chem_cbse_04_006** (Functional Groups) to practice identifying 1°, 2°, 3° alcohols from structures.', 'Revisit **c11_chem_cbse_08_001** and **c11_chem_cbse_08_002** (Oxidation Number) to calculate oxidation state changes.', 'Do a **re-diagnostic**: Draw CH₃CH₂CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_003', difficulty: 'standard',
          question: 'Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd).',
          hint: 'Review the tetrahedral intermediate formation and collapse in nucleophilic acyl.',
          misconception: 'Students often write the reaction of acyl chloride with Grignard reagent as stopping at the ketone (RCOCl + RMgX →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid',
                  options: ['Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid', 'Physical properties of aldehydes and ketones refer to their observable characteristics', 'Nucleophilic addition reaction is the characteristic reaction of aldehydes and ketones', 'Preparation of alcohols from carbonyl compounds involves the reduction of the carbonyl'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the reaction of acyl chloride with Grignard reagent as stopping at the ketone (RCOCl + RMgX → RCOR), ignoring that the.' }
          ],
            remediations: { 'students-often-write-the-reaction': { steps: ['Revisit nucleophilic addition mechanism (c12_chem_cbse_08_005) and draw the tetrahedral intermediate for both acyl.', 'Practice writing the two-step sequence for nitrile: addition → imine salt → hydrolysis.', 'Use molecular models to see steric hindrance: the ketone carbonyl is more accessible than the acyl chloride carbonyl?', 'Actually, electronic factors dominate.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
