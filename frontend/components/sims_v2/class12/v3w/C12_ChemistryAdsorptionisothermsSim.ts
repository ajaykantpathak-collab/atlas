import type { SimDef } from '../../engine/types';
import C12_ChemistryAdsorptionisothermsSim from '../../../simulations/c6_12/C12_ChemistryAdsorptionisothermsSim';

/** v3 wrapped master — C12_ChemistryAdsorptionisothermsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistryadsorptionisothermssim: SimDef = {
    id: 'v3w_c12_chemistryadsorptionisothermssim',
    title: 'Adsorptionisotherms',
    subtitle: 'Covers catalytic activity of d-block transition metals (primarily first row) and their.',
    classLevel: 12, subject: 'chemistry', topic: 'General Properties: Catalytic Activity',
    chapters: [],
    nodeIds: ['c12_chem_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a real-world Indian context: the Contact Process for sulfuric acid production uses V₂O₅, the Haber.', goal: 'Master Adsorptionisotherms.' },
    discovery: {
        question: 'In the Contact Process, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.',
        options: ['V₂O₅ works because vanadium can shift between +5 and +4 oxidation states', 'V₂O₅ provides a surface for adsorption only', 'vanadium goes from +5 to +3'],
        answer: 'V₂O₅ works because vanadium can shift between +5 and +4 oxidation states',
        hook: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and.',
    },
    teaching: [
        { title: 'Catalytic activity of transition metals.', text: 'Catalytic activity of transition metals refers to their ability to accelerate chemical reactions by providing an alternative reaction pathway with lower activation energy, utilizing their variable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_006', title: 'Catalytic activity of transition metals.',
          scaffold: { problem: 'In the Contact Process for sulfuric acid, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.',
            steps: [
            { text: 'Identify the overall reaction: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g). The catalyst must facilitate O₂ activation and SO₂ oxidation.' },
            { text: 'Recall vanadium\'s common oxidation states: +5 (in V₂O₅), +4 (in VO₂/V₂O₄), +3, +2. The +5/+4 couple is most accessible.' },
            { text: 'Write the reduction half-reaction: V₂O₅ + SO₂ → V₂O₄ + SO₃. Balance oxygen: V₂O₅ + SO₂ → V₂O₄ + SO₃ (balanced).' },
            { text: 'Write the re-oxidation half-reaction: V₂O₄ + ½O₂ → V₂O₅. Vanadium goes from +4 back to +5. Catalyst regenerated.' },
            { text: 'Explain preference: V₂O₅ has high surface area, the +5/+4 redox potential matches the SO₂/SO₃ couple, and it forms a.', faded: true, blankAnswer: 'Cycle:' }
            ] } }
    ],
    explore: { component: C12_ChemistryAdsorptionisothermsSim, prompt: 'Explore the interactive — Adsorptionisotherms' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_006', difficulty: 'standard',
          question: 'Catalytic activity of transition metals refers to their ability to accelerate.',
          hint: 'If stuck, immediately review the oxidation state table (NCERT Table 4.3) and the.',
          misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and.',
          parts: [
                { id: 'a', prompt: 'In the Contact Process, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.', answer: 'V₂O₅ works because vanadium can shift between +5 and +4 oxidation states',
                  options: ['V₂O₅ works because vanadium can shift between +5 and +4 oxidation states', 'V₂O₅ provides a surface for adsorption only', 'vanadium goes from +5 to +3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' },
                { id: 'b', prompt: 'The reaction 2I⁻ + S₂O₈²⁻ → I₂ + 2SO₄²⁻ is catalyzed by Fe³⁺ ions.', answer: 'Step 1: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe³⁺ reduced to Fe²⁺)',
                  options: ['Step 1: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe³⁺ reduced to Fe²⁺)', 'variable oxidation states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' },
                { id: 'c', prompt: 'Compare the catalytic action of finely divided iron in the Haber Process (N₂ + 3H₂ ⇌ 2NH₃) with that of nickel in the hydrogenation of ethene (C₂H₄ + H₂ →.', answer: 'Similarity: Both use surface adsorption',
                  options: ['Similarity: Both use surface adsorption', 'both work by changing oxidation state', 'variable oxidation states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' }
          ],
            remediations: { 'catalytic-activity-arises-from-only': { steps: ['If a student cannot list all three catalytic factors or write a catalytic cycle: (1) Revisit c12_chem_cbse_04_002.', '(2) Revisit c12_chem_cbse_04_004 (Oxidation States) to practice writing half-reactions for common couples (Fe³⁺/Fe²⁺,.', '(3) Do a hands-on activity: use a magnetic stirrer bar (Fe/steel) in a solution of H₂O₂ with a drop of FeCl₃ — observe.', 'Discuss why Fe works and Zn doesn\'t.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Zn²⁺ should be a good homogeneous catalyst because it\'s a d-block element." Evaluate this claim using the definition of transition metals.', answer: 'The claim is false',
                  options: ['The claim is false', 'Zn is a transition metal so it should work', 'Zn²⁺ is colourless', 'variable oxidation states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' }
          ],
            remediations: { 'catalytic-activity-arises-from-only': { steps: ['If a student cannot list all three catalytic factors or write a catalytic cycle: (1) Revisit c12_chem_cbse_04_002.', '(2) Revisit c12_chem_cbse_04_004 (Oxidation States) to practice writing half-reactions for common couples (Fe³⁺/Fe²⁺,.', '(3) Do a hands-on activity: use a magnetic stirrer bar (Fe/steel) in a solution of H₂O₂ with a drop of FeCl₃ — observe.', 'Discuss why Fe works and Zn doesn\'t.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
