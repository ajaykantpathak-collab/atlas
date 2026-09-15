import type { SimDef } from '../../engine/types';
import C11_BiologyCellWallPlasmodesmataSim from '../../../simulations/c6_12/C11_BiologyCellWallPlasmodesmataSim';

/** v3 wrapped master — C11_BiologyCellWallPlasmodesmataSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologycellwallplasmodesmatasim: SimDef = {
    id: 'v3w_c11_biologycellwallplasmodesmatasim',
    title: 'Cell Wall Plasmodesmata',
    subtitle: 'Covers the chemical composition, ultrastructure (primary wall, secondary wall, middle.',
    classLevel: 11, subject: 'biology', topic: 'Cell Wall: Structure and Function',
    chapters: [],
    nodeIds: ['c11_bio_cbse_08_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a raw mango slice and a ripe mango slice: the raw one is hard and crunchy, the ripe one is soft and.', goal: 'Master Cell Wall Plasmodesmata.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The cell wall is a non-living, rigid,.', text: 'The cell wall is a non-living, rigid, extracellular matrix that surrounds the plasma membrane of plant cells, fungi, algae, and most prokaryotes, composed primarily of cellulose microfibrils embedded.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_08_004', title: 'The cell wall is a non-living, rigid,.',
          scaffold: { problem: 'A farmer notices that his tomato plants have blossom-end rot (dark, sunken lesions at fruit bottom) despite adequate watering.',
            steps: [
            { text: 'Recognize that calcium (Ca²⁺) is a structural component of the middle lamella as calcium pectate, cross-linking.' },
            { text: 'Recall that calcium is phloem-immobile — it moves only via xylem with transpiration stream.' },
            { text: 'Connect: even with adequate soil calcium, low transpiration in fruit → low xylem flow → insufficient Ca²⁺ reaches.' },
            { text: 'Result: newly formed cell walls in fruit lack calcium pectate cross-links → middle lamella weak → cells separate under.' },
            { text: 'Verify: This matches the symptom (localized to low-transpiration fruit tip) and explains why foliar calcium sprays.', faded: true, blankAnswer: 'Blossom-end rot occurs because calcium is required for.' }
            ] } }
    ],
    explore: { component: C11_BiologyCellWallPlasmodesmataSim, prompt: 'Explore the interactive — Cell Wall Plasmodesmata' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_004', difficulty: 'standard',
          question: 'The cell wall is a non-living, rigid, extracellular matrix that surrounds the.',
          hint: 'If confused about why plant cells need a wall but animal cells do not, revisit the.',
          misconception: 'Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that plasmodesmata are simple.',
          parts: [
                { id: 'a', prompt: 'A researcher treats onion epidermal cells with pectinase (degrades pectin) and cellulase (degrades cellulose) separately.', answer: 'Pectinase: (a) cells become spherical (loss of shape)',
                  options: ['Pectinase: (a) cells become spherical (loss of shape)', 'brick wall'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that plasmodesmata are simple pores.' }
          ],
            remediations: { 'the-cell-wall-is-a': { steps: ['Re-examine the onion peel plasmolysis observation from c11_bio_cbse_08_003 — note the wall remains intact while.', 'Prepare temporary mounts of three tissues: (a) young pumpkin cortex (parenchyma), (b) celery petiole strings.', 'Compare wall thickness, layering, and color (lignin stains red).', 'Correlate with function: thin primary walls = growth/storage; thick lignified secondary walls = support/conduction.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that plasmodesmata are simple.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Plasmodesmata are simply holes punched through the cell wall that allow free diffusion of any molecule between plant cells."', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'brick wall'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that plasmodesmata are simple pores.' }
          ],
            remediations: { 'the-cell-wall-is-a': { steps: ['Re-examine the onion peel plasmolysis observation from c11_bio_cbse_08_003 — note the wall remains intact while.', 'Prepare temporary mounts of three tissues: (a) young pumpkin cortex (parenchyma), (b) celery petiole strings.', 'Compare wall thickness, layering, and color (lignin stains red).', 'Correlate with function: thin primary walls = growth/storage; thick lignified secondary walls = support/conduction.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
