import type { SimDef } from '../../engine/types';
import C7_BiologyTissueConceptPlantSim from '../../../simulations/c6_12/C7_BiologyTissueConceptPlantSim';

/** v3 wrapped master — C7_BiologyTissueConceptPlantSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_biologytissueconceptplantsim: SimDef = {
    id: 'v3w_c7_biologytissueconceptplantsim',
    title: 'Tissue Concept Plant',
    subtitle: 'Covers the structure and function of xylem tissue in transporting water and minerals in.',
    classLevel: 7, subject: 'biology', topic: 'Transport in Plants: Xylem and Water Movement',
    chapters: [],
    nodeIds: ['c7_bio_ch03_008', 'c7_bio_ch03_009', 'c7_bio_ch03_003', 'c7_bio_ch01_009', 'c7_bio_ch01_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you water a potted hibiscus plant in your school courtyard, the dry soil becomes moist, and within a few.', goal: 'Master Tissue Concept Plant.' },
    discovery: {
        question: 'What is the primary substance transported upward through the xylem tissue in plants?',
        options: ['Water and dissolved minerals from the soil', 'prepared food', 'glucose'],
        answer: 'Water and dissolved minerals from the soil',
        hook: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an.',
    },
    teaching: [
        { title: 'Xylem is a specialized, tube-like vascular.', text: 'Xylem is a specialized, tube-like vascular tissue in plants that transports water and dissolved minerals upward from the roots to the stem, leaves, and other aerial parts.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_bio_ch03_008', title: 'Xylem is a specialized, tube-like.',
          scaffold: { problem: 'A farmer in Punjab notices that during a hot, dry summer afternoon, his young tomato plants temporarily droop, even though the soil is wet.',
            steps: [
            { text: 'Identify the tissues involved in water movement inside the plant (xylem vessels running from roots to leaves).' },
            { text: 'Recognize the environmental factor acting on the leaves (high temperature and dry air causing rapid.' },
            { text: 'Compare the rate of water loss from leaves with the rate of water absorption by roots during peak heat (transpiration.' },
            { text: 'Trace the physical consequence on plant cells (loss of water from cells causes them to lose turgidity, resulting in.' },
            { text: 'Explain the evening recovery (as temperature drops, transpiration slows down, allowing roots to catch up and restore.', faded: true, blankAnswer: 'The plants droop on hot afternoons because water evaporates.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch03_009', title: 'Phloem is a specialized plant vascular.',
          scaffold: { problem: 'A farmer in Maharashtra notices that a beetle is feeding exclusively on the outer bark of a grapevine stem.',
            steps: [
            { text: 'Identify the tissue located in the outer bark of the stem as phloem.' },
            { text: 'Recall the function of phloem, which is to transport sugars and food from photosynthetic leaves to other plant parts.' },
            { text: 'Analyze the position of the beetle\'s bite relative to the leaves and the plant parts (grapes below, shoots above).' },
            { text: 'Determine that if the bite disrupts the phloem, food can still travel downwards to the grapes if leaves are above them,.' },
            { text: 'Conclude that the upper shoots withered because the disruption of phloem stopped the upward distribution of essential.', faded: true, blankAnswer: 'The upper shoots withered because the beetle damaged the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch03_003', title: 'Leaves act as the primary.',
          scaffold: { problem: 'A mango tree in a Delhi orchard has lower branches shaded by a concrete wall, causing the leaves on those branches to appear paler green.',
            steps: [
            { text: 'Identify the main function of the leaf as a food factory that requires light energy.' },
            { text: 'Recall that chlorophyll production and optimal leaf expansion depend on receiving adequate sunlight.' },
            { text: 'Analyze the scenario: lower shaded leaves receive less light energy than top leaves.' },
            { text: 'Trace the cause-effect chain: lower light leads to reduced food production, resulting in stunted growth and less.' },
            { text: 'Conclude that leaves adapt their growth and pigment concentration based on light availability to maximize factory.', faded: true, blankAnswer: 'The shaded lower leaves receive less sunlight, reducing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_009', title: 'Physical activities and regular.',
          scaffold: { problem: 'Priya notices that after running in the school sports race, her heart rate is very high and she is breathing rapidly.',
            steps: [
            { text: 'Identify that running requires skeletal muscles to contract rapidly, consuming stored ATP and oxygen for cellular.' },
            { text: 'Recognize that active muscle cells produce carbon dioxide and require a continuous, increased supply of oxygen and.' },
            { text: 'Trace the signal transmission: chemoreceptors detect elevated carbon dioxide and lower pH in the blood, signaling the.' },
            { text: 'Conclude that the heart beats faster to pump oxygenated blood to muscles, and breathing deepens and quickens to expel.', faded: true, blankAnswer: 'Priya\'s heart and breathing rates increase because her.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_003', title: 'The rapid and marked increase in height.',
          scaffold: { problem: 'A 12-year-old student notices that their height increased by 8 cm in one year, but their favorite jacket from last year is tight across the.',
            steps: [
            { text: 'Identify the biological structures involved in height increase (long bones of arms and legs, clavicle, and shoulder.' },
            { text: 'Recall that adolescent growth is characterized by bone elongation and expansion of the skeletal frame.' },
            { text: 'Analyze why the jacket sleeves are too short: the radius, ulna, and humerus bones in the arms have lengthened rapidly.' },
            { text: 'Analyze why the shoulders feel tight: the shoulder girdle and chest bones are widening to accommodate lung and heart.' },
            { text: 'Conclude that the jacket no longer fits because multiple skeletal elements are expanding simultaneously at rapid rates.', faded: true, blankAnswer: 'The tight jacket is direct evidence of rapid skeletal.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_bio_ch03_009', title: 'Identify each idea',
          dissect: { specimen: 'Tissue Concept Plant', spots: [
            { id: 's1', label: 'Xylem is a specialized tube-like', prompt: 'Which idea is this? — Xylem is a specialized, tube-like vascular tissue in plants that transports water and.', answer: 'Xylem is a specialized tube-like', options: ['Xylem is a specialized tube-like', 'Phloem is a specialized plant', 'Leaves act as the primary', 'Physical activities and regular exercise'] },
            { id: 's2', label: 'Phloem is a specialized plant', prompt: 'Which idea is this? — Phloem is a specialized plant vascular tissue responsible for transporting dissolved.', answer: 'Phloem is a specialized plant', options: ['Phloem is a specialized plant', 'Xylem is a specialized tube-like', 'Leaves act as the primary', 'Physical activities and regular exercise'] },
            { id: 's3', label: 'Leaves act as the primary', prompt: 'Which idea is this? — Leaves act as the primary food-producing organs of a plant, containing specialized green.', answer: 'Leaves act as the primary', options: ['Leaves act as the primary', 'Xylem is a specialized tube-like', 'Phloem is a specialized plant', 'Physical activities and regular exercise'] },
            { id: 's4', label: 'Physical activities and regular exercise', prompt: 'Which idea is this? — Physical activities and regular exercise during adolescence refer to planned, structured.', answer: 'Physical activities and regular exercise', options: ['Physical activities and regular exercise', 'Xylem is a specialized tube-like', 'Phloem is a specialized plant', 'Leaves act as the primary'] },
            { id: 's5', label: 'The rapid and marked increase', prompt: 'Which idea is this? — The rapid and marked increase in height and weight during adolescence, driven by the.', answer: 'The rapid and marked increase', options: ['The rapid and marked increase', 'Xylem is a specialized tube-like', 'Phloem is a specialized plant', 'Leaves act as the primary'] }
          ] } }
    ],
    explore: { component: C7_BiologyTissueConceptPlantSim, prompt: 'Explore the interactive — Tissue Concept Plant' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch03_008', difficulty: 'standard',
          question: 'Xylem is a specialized, tube-like vascular tissue in plants that transports.',
          hint: 'Review node c7_bio_ch03_001 to reinforce why plants need water and how roots interact.',
          misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an.',
          parts: [
                { id: 'a', prompt: 'What is the primary substance transported upward through the xylem tissue in plants?', answer: 'Water and dissolved minerals from the soil',
                  options: ['Water and dissolved minerals from the soil', 'prepared food', 'glucose'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' },
                { id: 'b', prompt: 'If a potted plant is placed inside a sealed, transparent polythene bag under bright sunlight, tiny water droplets appear on the inner surface of the bag.', answer: 'Water droplets form',
                  options: ['Water droplets form', 'pumped'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' }
          ],
            remediations: { 'water-is-pumped-upward-by': { steps: ['To correct this, take a dry straw dipped in water and suck from the top to feel how suction pulls liquid upward from.', 'Then, explain that leaves act like that suction force when water evaporates from their surface, pulling a continuous.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an.',
          parts: [
                { id: 'a', prompt: 'A student claims that if all the leaves are removed from a balsam plant, water will travel up the stem much faster because there is less resistance.', answer: 'The claim is false',
                  options: ['The claim is false', 'pumped'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' },
                { id: 'b', prompt: 'If a potted plant is placed inside a sealed, transparent polythene bag under bright sunlight, tiny water droplets appear on the inner surface of the bag.', answer: 'Water droplets form',
                  options: ['Water droplets form', 'pumped'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that water is "pumped" upward by the roots like a mechanical water pump pushing water into an overhead tank.' }
          ],
            remediations: { 'water-is-pumped-upward-by': { steps: ['To correct this, take a dry straw dipped in water and suck from the top to feel how suction pulls liquid upward from.', 'Then, explain that leaves act like that suction force when water evaporates from their surface, pulling a continuous.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_009', difficulty: 'standard',
          question: 'Phloem is a specialized plant vascular tissue responsible for transporting.',
          hint: 'Review c7_bio_ch03_003 (Leaves: The Food Factories of Plants) and c7_bio_ch03_008.',
          misconception: 'Students often believe that plant food (glucose) travels only downwards from the leaves to the roots, much like water.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved',
                  options: ['Phloem is a specialized plant vascular tissue responsible for transporting dissolved', 'Xylem is a specialized, tube-like vascular tissue in plants that transports water and', 'Leaves act as the primary food-producing organs of a plant, containing specialized green', 'Physical activities and regular exercise during adolescence refer to planned, structured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that plant food (glucose) travels only downwards from the leaves to the roots, much like water flowing down a drain.' }
          ],
            remediations: { 'plant-food-glucose-travels-only': { steps: ['To fix this, draw a tall neem tree with leaves at the top, flowers in the middle, and roots at the bottom.', 'Ask: "How do the flowers get their food if they are above the leaves?" Guide the student to trace arrows going both.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_003', difficulty: 'standard',
          question: 'Leaves act as the primary food-producing organs of a plant, containing.',
          hint: 'Review c7_bio_ch03_002 to reinforce how plants obtain nutrition before studying leaf.',
          misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Leaves act as the primary food-producing organs of a plant, containing specialized green',
                  options: ['Leaves act as the primary food-producing organs of a plant, containing specialized green', 'Xylem is a specialized, tube-like vascular tissue in plants that transports water and', 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved', 'Physical activities and regular exercise during adolescence refer to planned, structured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the exact same way human.' }
          ],
            remediations: { 'leaves-are-merely-passive-green': { steps: ['To fix this misconception, guide the student through a hands-on observation using a fresh leaf dropped in warm water to.', 'Explain that unlike human lungs that only exchange respiratory gases, leaf cells use sunlight to actively synthesize.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the.',
          parts: [
                { id: 'a', prompt: 'A student claims that since roots are underground in the dark, they do not need food made by the leaves, and leaves are completely independent structures.', answer: 'The claim is false',
                  options: ['The claim is false', 'breathe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the exact same way human.' },
                { id: 'b', prompt: 'Design a simple, observation-based investigation using a potted plant in your home or school to prove that green leaves require sunlight to produce starch.', answer: 'A complete answer should include: 1',
                  options: ['A complete answer should include: 1', 'breathe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that leaves are merely passive green decorations on a plant, or that they "breathe" air in the exact same way human.' }
          ],
            remediations: { 'leaves-are-merely-passive-green': { steps: ['To fix this misconception, guide the student through a hands-on observation using a fresh leaf dropped in warm water to.', 'Explain that unlike human lungs that only exchange respiratory gases, leaf cells use sunlight to actively synthesize.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_009', difficulty: 'standard',
          question: 'Physical activities and regular exercise during adolescence refer to planned,.',
          hint: 'Review cellular respiration and circulation from Class 6 (c6_biology_ch09_008) to.',
          misconception: 'Students often believe that physical exercise is only necessary for people who want to lose weight or build bodybuilder.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical activities and regular exercise during adolescence refer to planned, structured',
                  options: ['Physical activities and regular exercise during adolescence refer to planned, structured', 'Xylem is a specialized, tube-like vascular tissue in plants that transports water and', 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved', 'Leaves act as the primary food-producing organs of a plant, containing specialized green'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that physical exercise is only necessary for people who want to lose weight or build bodybuilder muscles, failing to.' }
          ],
            remediations: { 'physical-exercise-is-only-necessary': { steps: ['To remediate this, guide the student to compare two internal systems: ask what happens to a rubber band left stretched.', 'Have them track their own resting heart rate before and after two weeks of simple daily brisk walking to observe direct.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_003', difficulty: 'standard',
          question: 'The rapid and marked increase in height and weight during adolescence, driven.',
          hint: 'Review c7_bio_ch01_002 to refresh understanding of when adolescence begins and ends.',
          misconception: 'Students often believe that an adolescent\'s body grows uniformly and at a constant steady rate every single month,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rapid and marked increase in height and weight during adolescence, driven by the',
                  options: ['The rapid and marked increase in height and weight during adolescence, driven by the', 'Xylem is a specialized, tube-like vascular tissue in plants that transports water and', 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved', 'Leaves act as the primary food-producing organs of a plant, containing specialized green'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that an adolescent\'s body grows uniformly and at a constant steady rate every single month, similar to how a machine.' }
          ],
            remediations: { 'an-adolescent-s-body-grows': { steps: ['To correct this, have the student look at growth records or shoe size changes over the past three years.', 'Point out that a teenager might grow four centimeters in three months and then experience a long pause.', 'Show them that hands and feet grow before the torso, explaining why temporary clumsiness is a normal part of biological.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
