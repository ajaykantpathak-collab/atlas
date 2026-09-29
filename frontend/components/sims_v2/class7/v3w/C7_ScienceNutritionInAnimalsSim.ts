import type { SimDef } from '../../engine/types';
import C7_ScienceNutritionInAnimalsSim from '../../../simulations/c6_12/C7_ScienceNutritionInAnimalsSim';

/** v3 wrapped master — C7_ScienceNutritionInAnimalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_sciencenutritioninanimalssim: SimDef = {
    id: 'v3w_c7_sciencenutritioninanimalssim',
    title: 'Life Processes: Nutrition, Respiration, Excretion Overview',
    subtitle: 'Covers the general overview of life processes (nutrition, respiration, and excretion) in.',
    classLevel: 7, subject: 'science', topic: 'Life Processes: Nutrition, Respiration, Excretion Overview',
    chapters: [],
    nodeIds: ['c7_bio_ch02_001', 'c7_bio_ch03_002', 'c7_bio_ch03_009', 'c7_bio_ch02_002', 'c7_bio_ch02_005', 'c7_bio_ch02_008', 'c7_bio_ch02_009', 'c7_bio_ch02_012', 'c7_bio_ch03_006', 'c7_bio_ch03_010', 'c7_bio_ch01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you eat a heavy meal of *parathas* during lunch, your body does not just store the food; it immediately.', goal: 'Master Life Processes: Nutrition, Respiration, Excretion Overview.' },
    discovery: {
        question: 'What term describes animals that feed exclusively on other animals\' flesh?',
        options: ['Carnivores', 'herbivores', '(flesh)'],
        answer: 'Carnivores',
        hook: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it.',
    },
    teaching: [
        { title: 'Life processes are the essential biological.', text: 'Life processes are the essential biological activities performed by all living organisms—such as nutrition, respiration, transport, and excretion—that work together to maintain life, repair damaged.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_bio_ch02_001', title: 'Life processes are the essential.',
          scaffold: { problem: 'A cow grazing in a field eats grass, digests it, uses the nutrients to run its muscles while walking, and produces sweat and urine.',
            steps: [
            { text: 'Identify the intake and breakdown of grass as nutrition.' },
            { text: 'Identify the usage of digested grass nutrients with oxygen to power muscle movement as cellular respiration.' },
            { text: 'Identify the elimination of liquid waste (urine and sweat) as excretion.' },
            { text: 'Connect how nutrition supplies the fuel, respiration burns it, and excretion clears the resulting byproducts.', faded: true, blankAnswer: 'Grass consumption = nutrition; muscle power generation via.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch03_002', title: 'The autotrophic mode of nutrition is a.',
          scaffold: { problem: 'A farmer in Punjab notices that his wheat crops growing in a well-lit field grow vigorously and produce grains filled with starch.',
            steps: [
            { text: 'Identify the nutritional mode of wheat plants as autotrophic, meaning they must synthesize their own organic food.' },
            { text: 'Recall that autotrophic nutrition requires essential inputs: carbon dioxide, water, and crucially, light energy.' },
            { text: 'Compare the environmental conditions of the two patches: the field patch receives abundant sunlight, whereas the shaded.' },
            { text: 'Trace the cause-effect chain: without sufficient light energy, the chloroplasts cannot drive the synthesis of glucose,.' },
            { text: 'Conclude that autotrophic nutrition is light-dependent, explaining why the shaded wheat fails to nourish itself.', faded: true, blankAnswer: 'The well-lit wheat successfully performs autotrophic.' }
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
        { type: 'scaffold', nodeId: 'c7_bio_ch02_002', title: 'The classification of animals based on.',
          scaffold: { problem: 'A farmer in Punjab notices that rats in his grain store bite hard bags and hard seeds, whereas stray dogs outside tear raw meat from bones.',
            steps: [
            { text: 'Identify the feeding habit and food type of the rat (herbivore/granivore, eating hard grains) and the dog (carnivore,.' },
            { text: 'Recall the dental structure of rodents (gnawing incisors that grow continuously) versus carnivores (sharp canines for.' },
            { text: 'Apply mechanical reasoning to show how rat incisors chisel hard seed coats and dog canines puncture flesh.' },
            { text: 'Conclude that structural dental modifications directly serve the physical demands of their respective diets.', faded: true, blankAnswer: 'The rat possesses single pairs of chisel-like incisors in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch02_005', title: 'The stomach is a muscular, J-shaped bag.',
          scaffold: { problem: 'A student eats a boiled egg white (pure protein) for breakfast.',
            steps: [
            { text: 'Identify that the egg white is primarily composed of proteins.' },
            { text: 'Recognize that upon entering the stomach, the muscular walls churn to mix the food with gastric juice.' },
            { text: 'Note that hydrochloric acid creates an acidic medium and kills bacteria while activating enzymes.' },
            { text: 'Identify that the enzyme pepsin inside the gastric juice begins breaking down complex proteins into simpler substances.' },
            { text: 'Conclude that the egg white is partially digested into a semi-liquid mixture called chyme before passing into the small.', faded: true, blankAnswer: 'The egg white is mixed with gastric juice, exposed to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch02_008', title: 'Variations in digestion across animal.',
          scaffold: { problem: 'A farmer in Punjab notices that his buffalo spends hours lying down and chewing continuously, whereas his pet dog swallows meat chunks.',
            steps: [
            { text: 'Identify the dietary category of each animal (buffalo is a herbivore, dog is a carnivore).' },
            { text: 'Recall the chemical composition of their foods (buffalo eats grass containing tough cellulose; dog eats meat containing.' },
            { text: 'Analyze the mechanical requirement of the food (cellulose cell walls require extensive physical grinding and microbial.' },
            { text: 'Link behavior to structure (the buffalo regurgitates plant matter as cud to re-chew and increase surface area, while.' },
            { text: 'State the final conclusion connecting chewing behavior to cellulose digestion.', faded: true, blankAnswer: 'The buffalo chews its cud continuously to grind tough plant.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_bio_ch03_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes: Nutrition, Respiration, Excretion Overview', spots: [
            { id: 's1', label: 'Life processes are the essential', prompt: 'Which idea is this? — Life processes are the essential biological activities performed by all living.', answer: 'Life processes are the essential', options: ['Life processes are the essential', 'The autotrophic mode of nutrition', 'Phloem is a specialized plant', 'The classification of animals based'] },
            { id: 's2', label: 'The autotrophic mode of nutrition', prompt: 'Which idea is this? — The autotrophic mode of nutrition is a physiological process in which organisms,.', answer: 'The autotrophic mode of nutrition', options: ['The autotrophic mode of nutrition', 'Life processes are the essential', 'Phloem is a specialized plant', 'The classification of animals based'] },
            { id: 's3', label: 'Phloem is a specialized plant', prompt: 'Which idea is this? — Phloem is a specialized plant vascular tissue responsible for transporting dissolved.', answer: 'Phloem is a specialized plant', options: ['Phloem is a specialized plant', 'Life processes are the essential', 'The autotrophic mode of nutrition', 'The classification of animals based'] },
            { id: 's4', label: 'The classification of animals based', prompt: 'Which idea is this? — The classification of animals based on their dietary sources (herbivores, carnivores,.', answer: 'The classification of animals based', options: ['The classification of animals based', 'Life processes are the essential', 'The autotrophic mode of nutrition', 'Phloem is a specialized plant'] },
            { id: 's5', label: 'The stomach is a muscular', prompt: 'Which idea is this? — The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed.', answer: 'The stomach is a muscular', options: ['The stomach is a muscular', 'Life processes are the essential', 'The autotrophic mode of nutrition', 'Phloem is a specialized plant'] },
            { id: 's6', label: 'Variations in digestion across animal', prompt: 'Which idea is this? — Variations in digestion across animal groups refer to the structural and physiological.', answer: 'Variations in digestion across animal', options: ['Variations in digestion across animal', 'Life processes are the essential', 'The autotrophic mode of nutrition', 'Phloem is a specialized plant'] }
          ] } }
    ],
    explore: { component: C7_ScienceNutritionInAnimalsSim, prompt: 'Explore the interactive — Life Processes: Nutrition, Respiration, Excretion Overview' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch02_001', difficulty: 'standard',
          question: 'Life processes are the essential biological activities performed by all living.',
          hint: 'Review the Class 6 introduction to the digestive system and how breathing supplies air to.',
          misconception: 'Students often think that excretion and egestion (defecation) are the exact same biological process, believing that.',
          parts: [
                { id: 'a', prompt: 'If a stray dog eats a contaminated piece of food containing harmful bacteria, which life process will immediately deal with the toxins and undigested waste?', answer: 'Identify that the food enters the alimentary canal through nutrition',
                  options: ['Identify that the food enters the alimentary canal through nutrition', 'toxic substances remain inside cells forever'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that excretion and egestion (defecation) are the exact same biological process, believing that passing solid stool is.' }
          ],
            remediations: { 'excretion-and-egestion-defecation-are': { steps: ['To fix this misconception, have the student trace two different pathways: 1) A banana peel fiber that passes straight.', '2) Salt and water filtered out by the kidneys from the bloodstream after cellular metabolism (excretion).', 'Ask them where the waste came from—inside a cell or straight from the digestive tract?'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_002', difficulty: 'standard',
          question: 'The autotrophic mode of nutrition is a physiological process in which.',
          hint: 'Review c7_bio_ch03_001 to understand how sunlight and water support fundamental plant.',
          misconception: 'Students frequently believe that plants "feed" on soil nutrients in the same way animals eat food, assuming that.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the term \'autotrophic\', and which group of living organisms primarily uses this mode of nutrition?', answer: '\'Auto\' means self, and \'troph\' means nourishment or feeding',
                  options: ['\'Auto\' means self, and \'troph\' means nourishment or feeding', 'eating other plants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that plants "feed" on soil nutrients in the same way animals eat food, assuming that fertilizers or soil.' }
          ],
            remediations: { 'students-frequently-believe-that-plants': { steps: ['To fix this, take a small pinch of table salt (minerals) and a glass of water (water), taste them separately, and note.', 'Explain that plants take in similar raw minerals from soil, but they act like master chefs in a kitchen, using sunlight.', 'Emphasize that soil is the grocery store providing raw ingredients, while autotrophic nutrition is the actual cooking.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_009', difficulty: 'standard',
          question: 'Phloem is a specialized plant vascular tissue responsible for transporting.',
          hint: 'Review c7_bio_ch03_003 (Leaves: The Food Factories of Plants) and c7_bio_ch03_008.',
          misconception: 'Students often believe that plant food (glucose) travels only downwards from the leaves to the roots, much like water.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved',
                  options: ['Phloem is a specialized plant vascular tissue responsible for transporting dissolved', 'Life processes are the essential biological activities performed by all living', 'The autotrophic mode of nutrition is a physiological process in', 'The classification of animals based on their dietary sources (herbivores, carnivores,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that plant food (glucose) travels only downwards from the leaves to the roots, much like water flowing down a drain.' }
          ],
            remediations: { 'plant-food-glucose-travels-only': { steps: ['To fix this, draw a tall neem tree with leaves at the top, flowers in the middle, and roots at the bottom.', 'Ask: "How do the flowers get their food if they are above the leaves?" Guide the student to trace arrows going both.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_002', difficulty: 'standard',
          question: 'The classification of animals based on their dietary sources (herbivores,.',
          hint: 'Review Class 6 concepts on animal nutrition and food chains before exploring physical.',
          misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it.',
          parts: [
                { id: 'a', prompt: 'What term describes animals that feed exclusively on other animals\' flesh?', answer: 'Carnivores',
                  options: ['Carnivores', 'herbivores', '(flesh)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food,.' },
                { id: 'b', prompt: 'Why do cows spend hours chewing their food repeatedly (rumination), whereas tigers swallow chunks of meat without prolonged grinding?', answer: 'Cows eat plant matter (cellulose)',
                  options: ['Cows eat plant matter (cellulose)', 'feeding habit', '"feeding habit" refers only to what an animal eats (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food,.' }
          ],
            remediations: { 'feeding-habit-refers-only-to': { steps: ['To fix this, guide the student to examine two contrasting organisms—a cow grazing grass and a spider trapping an insect.', 'Ask them to physically trace what happens to the food *before* it enters the main body cavity.', 'Emphasize that feeding habits include specialized structural adaptations like scraping radula in snails or piercing.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An omnivore is simply an animal that eats anything at all, so its digestive needs are identical to a pure carnivore." Is this correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'feeding habit', '"feeding habit" refers only to what an animal eats (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food,.' }
          ],
            remediations: { 'feeding-habit-refers-only-to': { steps: ['To fix this, guide the student to examine two contrasting organisms—a cow grazing grass and a spider trapping an insect.', 'Ask them to physically trace what happens to the food *before* it enters the main body cavity.', 'Emphasize that feeding habits include specialized structural adaptations like scraping radula in snails or piercing.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_005', difficulty: 'standard',
          question: 'The stomach is a muscular, J-shaped bag located in the upper abdomen that.',
          hint: 'Review c7_bio_ch02_004 to understand how food is swallowed and transported before.',
          misconception: 'Students often believe that digestion is completed entirely inside the stomach because it is the largest and most.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed',
                  options: ['The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed', 'Life processes are the essential biological activities performed by all living', 'The autotrophic mode of nutrition is a physiological process in', 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that digestion is completed entirely inside the stomach because it is the largest and most prominent dilated organ.' }
          ],
            remediations: { 'digestion-is-completed-entirely-inside': { steps: ['To fix this, guide the student to trace the journey of food step by step using a colored diagram of the digestive tract.', 'Emphasize that the stomach only initiates protein digestion and turns food into a liquid paste (chyme), whereas.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_008', difficulty: 'standard',
          question: 'Variations in digestion across animal groups refer to the structural and.',
          hint: 'Review c7_bio_ch02_002 and c6_biology_ch09_002 to reinforce how diet types dictate.',
          misconception: 'Students often think that all animals digest food in the same way as humans do, assuming that a cow\'s stomach is just a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Variations in digestion across animal groups refer to the structural and physiological',
                  options: ['Variations in digestion across animal groups refer to the structural and physiological', 'Life processes are the essential biological activities performed by all living', 'The autotrophic mode of nutrition is a physiological process in', 'Phloem is a specialized plant vascular tissue responsible for transporting dissolved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all animals digest food in the same way as humans do, assuming that a cow\'s stomach is just a larger version of a.' }
          ],
            remediations: { 'all-animals-digest-food-in': { steps: ['To fix this, guide the student to compare a diagram of a human stomach with a four-chambered ruminant stomach.', 'Explain that cows cannot produce cellulase enzymes on their own, so they need a specialized "fermentation vat" (rumen).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
