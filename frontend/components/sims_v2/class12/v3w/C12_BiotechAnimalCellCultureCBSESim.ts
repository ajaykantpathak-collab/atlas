import type { SimDef } from '../../engine/types';
import C12_BiotechAnimalCellCultureCBSESim from '../../../simulations/c6_12_new/C12_BiotechAnimalCellCultureCBSESim';

/** v3 wrapped master — C12_BiotechAnimalCellCultureCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechanimalcellculturecbsesim: SimDef = {
    id: 'v3w_c12_biotechanimalcellculturecbsesim',
    title: 'Animal Cell Culture: History and Advantages Over Whole Organisms',
    subtitle: 'This node covers the historical perspective (1882–1975) and the advantages/limitations of.',
    classLevel: 12, subject: 'biotechnology', topic: 'Animal Cell Culture: History and Advantages Over Whole Organisms',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_08_001', 'c12_biotech_cbse_08_004', 'c12_biotech_cbse_08_005', 'c12_biotech_cbse_08_006', 'c12_biotech_cbse_08_007', 'c12_biotech_cbse_08_008', 'c12_biotech_cbse_08_009', 'c12_biotech_cbse_08_010', 'c12_biotech_cbse_08_011', 'c12_biotech_cbse_01_005', 'c12_biotech_cbse_08_002', 'c12_biotech_cbse_08_003', 'c12_biotech_cbse_07_009', 'c12_biotech_cbse_07_003', 'c12_biotech_cbse_07_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a scientist in 1950 trying to produce enough polio vaccine for millions of children.', goal: 'Master Animal Cell Culture: History and Advantages Over Whole Organisms.' },
    discovery: {
        question: 'Compare the “controlled physico-chemical environment” advantage of animal cell culture with the “may not be a holistic representation of in vivo.',
        options: ['In vitro, hepatocytes can be exposed to a drug at precise concentrations without', 'cell culture is always better for toxicity', 'the same cells'],
        answer: 'In vitro, hepatocytes can be exposed to a drug at precise concentrations without',
        hook: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave.',
    },
    teaching: [
        { title: 'Animal cell culture is the in vitro.', text: 'Animal cell culture is the in vitro maintenance and proliferation of animal cells under controlled physico-chemical conditions (temperature, pH, osmolality, gas exchange) using a defined nutrient.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_001', title: 'Animal cell culture is the in vitro.',
          scaffold: { problem: 'A Class 12 student is asked to write a 3-mark answer: “List three historical developments between 1900 and 1960 that made animal cell.',
            steps: [
            { text: 'Identify the time window (1900–1960) and the goal (routine technique).' },
            { text: 'Select three milestones from Box 2 (NCERT) within this period that represent major capability jumps.' },
            { text: 'For each milestone, name the scientist(s), year, and the new capability (not just the action).' },
            { text: 'Phrase each as “[Year] — [Scientist] — [Capability enabled]” to match board marking expectations.' },
            { text: 'Verify that capabilities are distinct: long-term aseptic culture, viral vaccine production, defined media.', faded: true, blankAnswer: '1912 — Alexis Carrel — Introduced aseptic technique and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_004', title: 'Culture media for animal cell culture.',
          scaffold: { problem: 'A research lab in Bengaluru is adapting a CHO-K1 cell line (currently in DMEM + 10% FBS) to a serum-free, chemically defined medium for.',
            steps: [
            { text: 'Map each medium to regulatory classification. Medium A = chemically defined + protein-free + serum-free = highest.' },
            { text: 'Normalise growth rates to 0–10 scale. Max = 0.032 (B) → B=10, C=0.028/0.032×10=8.75, A=0.025/0.032×10=7.8.' },
            { text: 'Normalise viability. Max = 92% (A) → A=10, C=89/92×10=9.7, B=85/92×10=9.2.' },
            { text: 'Assign cost scores (inverse to cost). A=5 (most expensive), C=7, B=10 (least expensive).' },
            { text: 'Compute weighted scores. A = 0.5×10 + 0.2×7.8 + 0.2×10 + 0.1×5 = 5 + 1.56 + 2 + 0.5 = 9.06.' },
            { text: 'Select highest weighted score. Medium A (9.06) wins despite lower growth rate because regulatory weight dominates for.', faded: true, blankAnswer: 'Medium A (CD-CHO) — weighted score 9.06, best for EMA.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_005', title: 'Serum is the liquid fraction of clotted.',
          scaffold: { problem: 'A biotech startup in Bengaluru is developing a process for a recombinant Factor VIII (for hemophilia A) in CHO cells.',
            steps: [
            { text: 'Define critical quality attributes (CQAs) for Factor VIII — glycosylation pattern, specific activity, aggregation.' },
            { text: 'Screen 3-4 commercial chemically defined media (e.g., CD-CHO, EX-CELL, PowerCHO) in small-scale (50 mL) cultures;.' },
            { text: 'Perform glycosylation analysis (HILIC-UPLC) on harvested product from each medium; compare to FBS-control profile for.' },
            { text: 'Assess viral clearance validation burden — chemically defined media eliminate need for serum viral testing, reducing.' },
            { text: 'Calculate cost of goods (COGs) per gram: include medium cost, downstream processing simplification (no serum protein.' },
            { text: 'Select medium that meets CQAs, shows comparable/better productivity, and reduces COGs; initiate stability study (10.', faded: true, blankAnswer: 'A structured 6-step framework as above, culminating in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_006', title: 'Anchorage dependence is the requirement.',
          scaffold: { problem: 'A researcher isolates primary mouse embryonic fibroblasts (MEFs) and seeds them at 1×10^5 cells/cm² in a 6-well plate (9.6 cm²/well) with.',
            steps: [
            { text: 'Calculate total surface area: 6 wells × 9.6 cm²/well = 57.6 cm².' },
            { text: 'Calculate total cells at confluence: 57.6 cm² × 1×10^6 cells/cm² = 5.76×10^7 cells.' },
            { text: 'Account for viability: 5.76×10^7 × 0.95 = 5.472×10^7 viable cells.' },
            { text: 'Determine cells per new flask for 1:3 split: total viable cells / 3 = 1.824×10^7 cells per new flask.' },
            { text: 'If seeding into T-75 flasks (75 cm²), seeding density = 1.824×10^7 / 75 = 2.43×10^5 cells/cm² — appropriate for MEFs.', faded: true, blankAnswer: '5.47×10^7 viable cells total; seed 1.82×10^7 cells per T-75.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_007', title: 'Subculturing (or passaging) is the.',
          scaffold: { problem: 'A T-75 flask (75 cm² growth area) of HEK-293 cells is 100% confluent with 1.2 × 10⁷ cells.',
            steps: [
            { text: 'A 1:6 split means the cells from one flask are divided into 6 new flasks. So (a) 6 T-25 flasks are needed.' },
            { text: 'Total cells = 1.2 × 10⁷. Cells per new flask = 1.2 × 10⁷ / 6 = 2 × 10⁶ cells. Growth area per T-25 = 25 cm².' },
            { text: 'Cells are resuspended in 12 mL total medium. Concentration = 1.2 × 10⁷ cells / 12 mL = 1 × 10⁶ cells/mL.' },
            { text: 'Volume per flask = (cells per flask) / (concentration) = (2 × 10⁶ cells) / (1 × 10⁶ cells/mL) = 2 mL. This is (c).' },
            { text: 'Verify: 6 flasks × 2 mL = 12 mL total volume used. Each flask gets 2 mL cell suspension + 3 mL additional medium = 5 mL.', faded: true, blankAnswer: '(a) 6 T-25 flasks; (b) 8 × 10⁴ cells/cm²; (c) 2 mL per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_008', title: 'Cryopreservation is the process of.',
          scaffold: { problem: 'You need to prepare 50 mL of freezing medium for cryopreserving a Vero cell line.',
            steps: [
            { text: 'Identify the total volume required (50 mL) and the percentage composition (90% FBS, 10% DMSO).' },
            { text: 'Calculate volume of FBS = 90% of 50 mL = 0.90 × 50 mL = 45 mL.' },
            { text: 'Calculate volume of DMSO = 10% of 50 mL = 0.10 × 50 mL = 5 mL.' },
            { text: 'Verify sum = 45 mL + 5 mL = 50 mL (correct).' },
            { text: 'Calculate number of aliquots from 100 mL FBS: each aliquot uses 45 mL FBS, so 100 mL / 45 mL ≈ 2.22 → only 2 full.', faded: true, blankAnswer: '45 mL FBS + 5 mL DMSO per 50 mL aliquot; 2 full aliquots.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_08_004', title: 'Identify each idea',
          dissect: { specimen: 'Animal Cell Culture: History and Advantages Over Whole Organisms', spots: [
            { id: 's1', label: 'Animal cell culture is the', prompt: 'Which idea is this? — Animal cell culture is the in vitro maintenance and proliferation of animal cells under.', answer: 'Animal cell culture is the', options: ['Animal cell culture is the', 'Culture media for animal cell', 'Serum is the liquid fraction', 'Anchorage dependence is the requirement'] },
            { id: 's2', label: 'Culture media for animal cell', prompt: 'Which idea is this? — Culture media for animal cell culture are artificially prepared nutrient solutions that.', answer: 'Culture media for animal cell', options: ['Culture media for animal cell', 'Animal cell culture is the', 'Serum is the liquid fraction', 'Anchorage dependence is the requirement'] },
            { id: 's3', label: 'Serum is the liquid fraction', prompt: 'Which idea is this? — Serum is the liquid fraction of clotted blood that provides a complex mixture of growth.', answer: 'Serum is the liquid fraction', options: ['Serum is the liquid fraction', 'Animal cell culture is the', 'Culture media for animal cell', 'Anchorage dependence is the requirement'] },
            { id: 's4', label: 'Anchorage dependence is the requirement', prompt: 'Which idea is this? — Anchorage dependence is the requirement of most normal animal cells to attach to a solid.', answer: 'Anchorage dependence is the requirement', options: ['Anchorage dependence is the requirement', 'Animal cell culture is the', 'Culture media for animal cell', 'Serum is the liquid fraction'] },
            { id: 's5', label: 'Subculturing or passaging is the', prompt: 'Which idea is this? — Subculturing (or passaging) is the process of detaching adherent cells from their growth.', answer: 'Subculturing or passaging is the', options: ['Subculturing or passaging is the', 'Animal cell culture is the', 'Culture media for animal cell', 'Serum is the liquid fraction'] },
            { id: 's6', label: 'Cryopreservation is the process of', prompt: 'Which idea is this? — Cryopreservation is the process of preserving viable animal cells at ultra-low.', answer: 'Cryopreservation is the process of', options: ['Cryopreservation is the process of', 'Animal cell culture is the', 'Culture media for animal cell', 'Serum is the liquid fraction'] }
          ] } }
    ],
    explore: { component: C12_BiotechAnimalCellCultureCBSESim, prompt: 'Explore the interactive — Animal Cell Culture: History and Advantages Over Whole Organisms' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_001', difficulty: 'standard',
          question: 'Animal cell culture is the in vitro maintenance and proliferation of animal.',
          hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_12_011 (Cell Culture:.',
          misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave.',
          parts: [
                { id: 'a', prompt: 'Compare the “controlled physico-chemical environment” advantage of animal cell culture with the “may not be a holistic representation of in vivo.', answer: 'In vitro, hepatocytes can be exposed to a drug at precise concentrations without',
                  options: ['In vitro, hepatocytes can be exposed to a drug at precise concentrations without', 'cell culture is always better for toxicity', 'the same cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish as.' }
          ],
            remediations: { 'because-animal-cell-culture-uses': { steps: ['If a student exhibits this misconception: (1) Have them list five physiological factors present in a living animal but.', '(2) Assign a 5-minute writing exercise: “Describe one drug effect that would be missed in cell culture because it.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Because animal cell culture avoids ethical clearance, it should completely replace animal testing in drug development.” Use at least.', answer: 'The statement overgeneralizes',
                  options: ['The statement overgeneralizes', 'the same cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish as.' },
                { id: 'b', prompt: 'Design a 5-event timeline (with years) that captures the evolution from “cells survive briefly” to “industrial-scale biopharmaceutical production”.', answer: 'Example timeline: 1907 Harrison',
                  options: ['Example timeline: 1907 Harrison', 'the same cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish as.' },
                { id: 'c', prompt: 'Compare the “controlled physico-chemical environment” advantage of animal cell culture with the “may not be a holistic representation of in vivo.', answer: 'In vitro, hepatocytes can be exposed to a drug at precise concentrations without',
                  options: ['In vitro, hepatocytes can be exposed to a drug at precise concentrations without', 'cell culture is always better for toxicity', 'the same cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish as.' }
          ],
            remediations: { 'because-animal-cell-culture-uses': { steps: ['If a student exhibits this misconception: (1) Have them list five physiological factors present in a living animal but.', '(2) Assign a 5-minute writing exercise: “Describe one drug effect that would be missed in cell culture because it.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_004', difficulty: 'standard',
          question: 'Culture media for animal cell culture are artificially prepared nutrient.',
          hint: 'Revisit c11_biotech_cbse_03_010 (minerals/vitamins roles), c11_chem_cbse_07_013 (buffer.',
          misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'A researcher is culturing primary human fibroblasts for a wound-healing study. She uses DMEM supplemented with 10% fetal bovine serum (FBS).', answer: 'Synthetic medium, serum-containing sub-category',
                  options: ['Correct answer: Synthetic medium, serum-containing sub-category', 'natural medium because serum is natural', 'basal medium with supplements such as hormones, growth factors, serum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' },
                { id: 'b', prompt: 'Two media formulations are compared: Medium A = RPMI-1640 + 10% FBS + 1% penicillin-streptomycin; Medium B = Chemically defined, protein-free, serum-free.', answer: 'Correct evaluation: Partially correct',
                  options: ['Correct evaluation: Partially correct', 'Serum-free media are chemically defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' },
                { id: 'c', prompt: 'Compare the osmolality contribution of glucose vs inorganic salts in a typical commercial medium (e.g., DMEM: 4.5 g/L glucose, ~6.8 g/L NaCl).', answer: 'Correct calculation: Glucose = 4.5 g/L ÷ 180 g/mol = 25 mmol/L = 25 mOsmol/L',
                  options: ['Correct calculation: Glucose = 4.5 g/L ÷ 180 g/mol = 25 mmol/L = 25 mOsmol/L', 'Serum-free media are chemically defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' }
          ],
            remediations: { 'students-conflate-serum-free-with': { steps: ['Have the student draw a Venn diagram with three circles: Serum-Free, Chemically Defined, Protein-Free.', 'Ask them to write the NCERT definition for each from Box 3 verbatim, then paraphrase in their own words.', 'Give a case: "You need a medium for a clinical-grade mAb process requiring EMA/USP <1043> compliance — which region of.', 'Re-diagnose with a new MCQ: "Which medium is chemically defined but NOT protein-free?" Options: A) DMEM + 10% FBS, B).'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'A pharmaceutical company is developing a process for recombinant Factor VIII (for Hemophilia A) in CHO cells.', answer: 'Correct defence: (i) Purification: Serum contains abundant proteins (albumin,',
                  options: ['Correct defence: (i) Purification: Serum contains abundant proteins (albumin,', 'Serum-free media are chemically defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' },
                { id: 'b', prompt: 'Design a minimal serum-free medium formulation for a hypothetical anchorage-dependent epithelial cell line that requires epidermal growth factor (EGF) and.', answer: 'Expected answer (example): 1',
                  options: ['Expected answer (example): 1', 'Serum-free media are chemically defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' }
          ],
            remediations: { 'students-conflate-serum-free-with': { steps: ['Have the student draw a Venn diagram with three circles: Serum-Free, Chemically Defined, Protein-Free.', 'Ask them to write the NCERT definition for each from Box 3 verbatim, then paraphrase in their own words.', 'Give a case: "You need a medium for a clinical-grade mAb process requiring EMA/USP <1043> compliance — which region of.', 'Re-diagnose with a new MCQ: "Which medium is chemically defined but NOT protein-free?" Options: A) DMEM + 10% FBS, B).'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_005', difficulty: 'standard',
          question: 'Serum is the liquid fraction of clotted blood that provides a complex mixture.',
          hint: 'Revisit c12_biotech_cbse_08_004 (Culture Media types) and create a comparison table:.',
          misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media.',
          parts: [
                { id: 'a', prompt: 'List three distinct categories of biomolecules provided by fetal bovine serum that are critical for animal cell culture, and give one specific example for each.', answer: '(1) Growth factors',
                  options: ['Correct answer: (1) Growth factors', 'nutrients like amino acids and glucose'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media frequently contain bovine.' },
                { id: 'b', prompt: 'Explain why serum is described as an "undefined" supplement and how this creates two specific problems for pharmaceutical manufacturing under Good.', answer: 'Serum is undefined',
                  options: ['Correct answer: Serum is undefined', 'ethical concerns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media frequently contain bovine.' },
                { id: 'c', prompt: 'A researcher switches a fibroblast cell line from 10% FBS to a serum-free medium supplemented only with insulin, transferrin, and selenium (ITS).', answer: 'Missing factors: (1) Adhesion factors (fibronectin, vitronectin)',
                  options: ['Correct answer: Missing factors: (1) Adhesion factors (fibronectin, vitronectin)', 'add more amino acids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media frequently contain bovine.' }
          ],
            remediations: { 'students-often-equate-serum-free': { steps: ['If the student cannot distinguish serum functions from basal medium components: 1) Revisit c12_biotech_cbse_08_004.', '2) Review c11_bio_cbse_09_002 (Proteins) and c11_bio_cbse_19_007 (Hormone action) to connect growth factor signaling to.', '3) Re-attempt Diagnostic Question 1 with a two-column table: "Basal medium provides..." vs.', '"Serum uniquely provides...".'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_006', difficulty: 'standard',
          question: 'Anchorage dependence is the requirement of most normal animal cells to attach.',
          hint: 'Revisit c11_biotech_cbse_02_011 (cytoskeleton/adhesion) and c11_biotech_cbse_05_010.',
          misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive.',
          parts: [
                { id: 'a', prompt: 'A student observes that a primary fibroblast culture stops growing when the flask bottom is fully covered, but a HeLa culture continues to pile up into.', answer: 'Normal fibroblasts exhibit contact inhibition: cell-cell contact (via cadherins)',
                  options: ['Normal fibroblasts exhibit contact inhibition: cell-cell contact (via cadherins)', 'nutrient depletion', 'space limitation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive crowding effect.' },
                { id: 'b', prompt: 'You are given a new cell line "X". Design a simple two-step experiment to test whether it is anchorage-dependent and whether it shows contact inhibition.', answer: 'Step 1 (anchorage): Seed cells in parallel on (a) tissue-culture treated plastic',
                  options: ['Step 1 (anchorage): Seed cells in parallel on (a) tissue-culture treated plastic', 'contact inhibition', 'adding more serum overcomes contact inhibition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive crowding effect.' },
                { id: 'c', prompt: 'Compare the roles of serum and the culture vessel surface in supporting anchorage-dependent growth.', answer: 'Serum provides adhesion factors (fibronectin, vitronectin) that adsorb onto the',
                  options: ['Serum provides adhesion factors (fibronectin, vitronectin) that adsorb onto the', 'serum contains nutrients so cells grow anywhere', 'contact inhibition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive crowding effect.' }
          ],
            remediations: { 'contact-inhibition-means-cells-physically': { steps: ['If a student confuses contact inhibition with nutrient depletion: (1) Revisit c11_biotech_cbse_05_010 (Cyclins/CDKs) to.', '(2) Watch a time-lapse video of fibroblasts reaching confluence — they stop dividing abruptly at monolayer completion,.', '(3) Do a thought experiment: if you split a confluent culture 1:2 into fresh medium, they resume dividing immediately —.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_007', difficulty: 'standard',
          question: 'Subculturing (or passaging) is the process of detaching adherent cells from.',
          hint: 'Revisit c12_biotech_cbse_08_006 and c11_biotech_cbse_05_010 (cyclin D/CDK4-Rb pathway) to.',
          misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.',
          parts: [
                { id: 'a', prompt: 'You have a T-75 flask of CHO cells at 90% confluency (approx. 1.5 × 10⁷ cells).', answer: 'Step 1: Total cells needed = 6 wells × 2 × 10⁵ cells/well = 1.2 × 10⁶ cells',
                  options: ['Step 1: Total cells needed = 6 wells × 2 × 10⁵ cells/well = 1.2 × 10⁶ cells', 'passage number', 'population doubling number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.' }
          ],
            remediations: { 'passage-number-equals-population-doubling': { steps: ['If a student conflates passage number with population doublings: (1) Have them calculate PDL for three scenarios: 1:2,.', '(2) Ask them to re-read the NCERT definition: "A passage number refers specifically to the number of times a cell line.', 'After 12 days, what is the passage number and approximate PDL?" (Passage = 4, PDL = 4 × log₂5 ≈ 9.3).', '(4) Remediate by revisiting c12_biotech_cbse_08_003 (finite vs continuous) to link PDL to Hayflick limit.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.',
          parts: [
                { id: 'a', prompt: 'A lab protocol says: "Incubate cells with 0.25% trypsin-EDTA at 37 °C for 10 minutes." A student follows this exactly, but the next passage shows 80% cell.', answer: '10 minutes at 37 °C with 0.25% trypsin is excessive for most mammalian cells',
                  options: ['10 minutes at 37 °C with 0.25% trypsin is excessive for most mammalian cells', 'complete detachment', 'minimal necessary exposure', 'passage number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.' },
                { id: 'b', prompt: 'Design a passaging workflow for a newly established primary mouse embryonic fibroblast (MEF) culture that will be used for a CRISPR screen requiring 5 × 10⁷.', answer: 'MEFs are finite, adherent, and senesce by passage 5–6',
                  options: ['MEFs are finite, adherent, and senesce by passage 5–6', 'passage number', 'population doubling number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.' }
          ],
            remediations: { 'passage-number-equals-population-doubling': { steps: ['If a student conflates passage number with population doublings: (1) Have them calculate PDL for three scenarios: 1:2,.', '(2) Ask them to re-read the NCERT definition: "A passage number refers specifically to the number of times a cell line.', 'After 12 days, what is the passage number and approximate PDL?" (Passage = 4, PDL = 4 × log₂5 ≈ 9.3).', '(4) Remediate by revisiting c12_biotech_cbse_08_003 (finite vs continuous) to link PDL to Hayflick limit.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_008', difficulty: 'standard',
          question: 'Cryopreservation is the process of preserving viable animal cells at ultra-low.',
          hint: 'Revisit Class 11 Biology node c11_bio_cbse_08_003 (Fluid Mosaic Model) for membrane.',
          misconception: 'Students believe that **faster freezing is better** because it "gets the cells to the safe low temperature quickly.".',
          parts: [
                { id: 'a', prompt: 'A researcher has 5 mL of a healthy log-phase CHO cell suspension.', answer: 'Total cells = 5 mL × 2 × 10⁶ cells/mL = 1 × 10⁷ cells',
                  options: ['Total cells = 5 mL × 2 × 10⁶ cells/mL = 1 × 10⁷ cells', 'gets the cells to the safe low temperature quickly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that **faster freezing is better** because it "gets the cells to the safe low temperature quickly." This is exactly.' }
          ],
            remediations: { 'faster-freezing-is-better-because': { steps: ['If the student insists faster freezing is better: (1) Ask them to draw a cell in a freezing medium where extracellular.', '(2) Prompt: "Where is the water concentration higher — inside or outside the cell?" (3) Guide them to realise water.', '(4) Have them revisit **c11_bio_cbse_08_003** (Fluid Mosaic Model) to recall that membrane fluidity drops at low.', '(5) Re-test with Diagnostic Question 2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
