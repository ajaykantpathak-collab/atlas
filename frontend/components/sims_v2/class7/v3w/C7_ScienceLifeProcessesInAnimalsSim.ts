import type { SimDef } from '../../engine/types';
import C7_ScienceLifeProcessesInAnimalsSim from '../../../simulations/c6_12/C7_ScienceLifeProcessesInAnimalsSim';

/** v3 wrapped master — C7_ScienceLifeProcessesInAnimalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_sciencelifeprocessesinanimalssim: SimDef = {
    id: 'v3w_c7_sciencelifeprocessesinanimalssim',
    title: 'Life Processes: Nutrition, Respiration, Excretion Overview',
    subtitle: 'Covers the general overview of life processes (nutrition, respiration, and excretion) in.',
    classLevel: 7, subject: 'science', topic: 'Life Processes: Nutrition, Respiration, Excretion Overview',
    chapters: [],
    nodeIds: ['c7_bio_ch02_001', 'c7_bio_ch03_010', 'c7_bio_ch03_001', 'c7_bio_ch01_011', 'c7_bio_ch02_002', 'c7_bio_ch02_005', 'c7_bio_ch02_008', 'c7_bio_ch02_009', 'c7_bio_ch02_012', 'c7_bio_ch02_003', 'c7_bio_ch02_004', 'c7_bio_ch02_007', 'c7_bio_ch03_002', 'c7_bio_ch03_006', 'c7_bio_ch03_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you eat a heavy meal of *parathas* during lunch, your body does not just store the food; it immediately.', goal: 'Master Life Processes: Nutrition, Respiration, Excretion Overview.' },
    discovery: {
        question: 'A student claims that plants can grow taller and healthier in a dark room as long as they are given plenty of water and rich soil.',
        options: ['The claim is false', 'soil contains ready-made food that the plant absorbs directly to grow', 'soil acts as the "food" for plants, similar to how animals eat food'],
        answer: 'The claim is false',
        hook: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.',
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
        { type: 'scaffold', nodeId: 'c7_bio_ch03_010', title: 'Cellular respiration in plants is the.',
          scaffold: { problem: 'A farmer in Punjab notices that during a prolonged winter flood in his wheat field, many young wheat seedlings turn yellow and die, even.',
            steps: [
            { text: 'Identify the primary biological processes occurring in the seedling: photosynthesis (requires light and carbon dioxide).' },
            { text: 'Analyze the environmental condition: the field is flooded, meaning water has displaced the air spaces in the soil.' },
            { text: 'Connect the environmental condition to gas exchange: roots need oxygen from soil air spaces to perform cellular.' },
            { text: 'Trace the cause-effect chain: lack of oxygen halts cellular respiration in root cells, starving them of ATP energy.' },
            { text: 'Verify and state the conclusion: even with abundant sunlight for photosynthesis, roots cannot survive without cellular.', faded: true, blankAnswer: 'The seedlings died because their roots were deprived of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch03_001', title: 'The growth of a plant is the permanent.',
          scaffold: { problem: 'A farmer in Punjab notices that wheat crops in a shaded corner near a tall brick wall are shorter and paler than those in the open field,.',
            steps: [
            { text: 'Identify the environmental factors present and absent in the shaded corner versus the open field.' },
            { text: 'Recall the biological requirement of plants for sunlight to drive food production (photosynthesis).' },
            { text: 'Analyze the effect of reduced light intensity on the shaded wheat plants\' ability to manufacture sugars.' },
            { text: 'Connect reduced sugar production to decreased cell division, stunted height, and pale coloration due to lack of proper.' },
            { text: 'Conclude that sunlight is the limiting factor causing the difference in growth.', faded: true, blankAnswer: 'The wheat plants near the wall are shorter and paler.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_011', title: 'Hormones are chemical messengers.',
          scaffold: { problem: 'A 14-year-old girl experiences the onset of menstruation and development of breasts.',
            steps: [
            { text: 'Identify the master control center in the brain, which is the pituitary gland, responsible for releasing stimulating.' },
            { text: 'Trace the release of gonad-stimulating hormones from the pituitary gland into the bloodstream.' },
            { text: 'Identify the target organs in females that receive this signal, which are the ovaries.' },
            { text: 'Describe how the ovaries respond by producing female sex hormones, specifically estrogen.' },
            { text: 'Verify that estrogen travels through the blood to target tissues, bringing about breast development and regulating the.', faded: true, blankAnswer: 'The pituitary gland releases stimulating hormones into the.' }
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
        { type: 'dissect', nodeId: 'c7_bio_ch03_010', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes: Nutrition, Respiration, Excretion Overview', spots: [
            { id: 's1', label: 'Life processes are the essential', prompt: 'Which idea is this? — Life processes are the essential biological activities performed by all living.', answer: 'Life processes are the essential', options: ['Life processes are the essential', 'Cellular respiration in plants is', 'The growth of a plant', 'Hormones are chemical messengers secreted'] },
            { id: 's2', label: 'Cellular respiration in plants is', prompt: 'Which idea is this? — Cellular respiration in plants is the biochemical process by which plant cells break down.', answer: 'Cellular respiration in plants is', options: ['Cellular respiration in plants is', 'Life processes are the essential', 'The growth of a plant', 'Hormones are chemical messengers secreted'] },
            { id: 's3', label: 'The growth of a plant', prompt: 'Which idea is this? — The growth of a plant is the permanent increase in size, mass, and complexity of its.', answer: 'The growth of a plant', options: ['The growth of a plant', 'Life processes are the essential', 'Cellular respiration in plants is', 'Hormones are chemical messengers secreted'] },
            { id: 's4', label: 'Hormones are chemical messengers secreted', prompt: 'Which idea is this? — Hormones are chemical messengers secreted directly into the bloodstream by endocrine.', answer: 'Hormones are chemical messengers secreted', options: ['Hormones are chemical messengers secreted', 'Life processes are the essential', 'Cellular respiration in plants is', 'The growth of a plant'] },
            { id: 's5', label: 'The classification of animals based', prompt: 'Which idea is this? — The classification of animals based on their dietary sources (herbivores, carnivores,.', answer: 'The classification of animals based', options: ['The classification of animals based', 'Life processes are the essential', 'Cellular respiration in plants is', 'The growth of a plant'] },
            { id: 's6', label: 'The stomach is a muscular', prompt: 'Which idea is this? — The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed.', answer: 'The stomach is a muscular', options: ['The stomach is a muscular', 'Life processes are the essential', 'Cellular respiration in plants is', 'The growth of a plant'] }
          ] } }
    ],
    explore: { component: C7_ScienceLifeProcessesInAnimalsSim, prompt: 'Explore the interactive — Life Processes: Nutrition, Respiration, Excretion Overview' },
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
        { type: 'subpart', nodeId: 'c7_bio_ch03_010', difficulty: 'standard',
          question: 'Cellular respiration in plants is the biochemical process by which plant cells.',
          hint: 'Review c7_bio_ch03_004 (Photosynthesis) to understand how glucose is made, and.',
          misconception: 'Students frequently believe that plants only perform photosynthesis and do not respire, or that they "breathe in carbon.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cellular respiration in plants is the biochemical process by',
                  options: ['Cellular respiration in plants is the biochemical process by', 'Life processes are the essential biological activities performed by all living', 'The growth of a plant is the permanent increase in size, mass, and complexity of its', 'Hormones are chemical messengers secreted directly into the bloodstream by endocrine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that plants only perform photosynthesis and do not respire, or that they "breathe in carbon dioxide and breathe.' }
          ],
            remediations: { 'students-frequently-believe-that-plants': { steps: ['To fix this, guide the student through a two-step remediation: First, remind them that just like a human body needs.', 'Second, have them examine a germinating seed experiment in total darkness: point out that since there is no light for.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_001', difficulty: 'standard',
          question: 'The growth of a plant is the permanent increase in size, mass, and complexity.',
          hint: 'Review Class 6 concepts on how plants absorb water from soil and how seeds sprout into.',
          misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.',
          parts: [
                { id: 'a', prompt: 'A potted hibiscus plant is placed in a bright room, but its soil is kept completely dry. Over two weeks, the plant stops growing and its leaves droop.', answer: 'Step 1: Identify the missing factor as water',
                  options: ['Step 1: Identify the missing factor as water', 'soil acts as the "food" for plants, similar to how animals eat food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.' }
          ],
            remediations: { 'soil-acts-as-the-food': { steps: ['To fix this misconception, have the student weigh a dry pot of soil before planting a seed, and weigh the soil again.', 'The soil weight remains nearly the same, proving the plant did not "eat" the soil.', 'Explain that soil is merely an anchor and a supply store for minerals and water, not a source of food.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.',
          parts: [
                { id: 'a', prompt: 'A student claims that plants can grow taller and healthier in a dark room as long as they are given plenty of water and rich soil.', answer: 'The claim is false',
                  options: ['The claim is false', 'soil contains ready-made food that the plant absorbs directly to grow', 'soil acts as the "food" for plants, similar to how animals eat food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that soil acts as the "food" for plants, similar to how animals eat food.' }
          ],
            remediations: { 'soil-acts-as-the-food': { steps: ['To fix this misconception, have the student weigh a dry pot of soil before planting a seed, and weigh the soil again.', 'The soil weight remains nearly the same, proving the plant did not "eat" the soil.', 'Explain that soil is merely an anchor and a supply store for minerals and water, not a source of food.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_011', difficulty: 'standard',
          question: 'Hormones are chemical messengers secreted directly into the bloodstream by.',
          hint: 'Review node c7_bio_ch01_005 to list the exact physical differences before trying to learn.',
          misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair.',
          parts: [
                { id: 'a', prompt: 'What is the general term for chemical substances secreted by endocrine glands that act as messengers in the human body?', answer: 'The correct answer is hormones',
                  options: ['The correct answer is hormones', 'enzymes', 'nutrients'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair follicles produce the.' },
                { id: 'b', prompt: 'How do hormones know which specific organ in the body to affect, given that they travel everywhere through the bloodstream?', answer: 'The correct answer is that hormones affect only specific target organs',
                  options: ['The correct answer is that hormones affect only specific target organs', 'hormones are produced by organs directly where the change happens (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair follicles produce the.' }
          ],
            remediations: { 'hormones-are-produced-by-organs': { steps: ['To fix this, trace the path of a hormone using a physical map analogy: point out that the pituitary gland is located in.', 'Emphasize that endocrine glands are ductless factories that ship their products through the blood highway to distant.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair.',
          parts: [
                { id: 'a', prompt: 'A student claims that because hormones are secreted in very tiny amounts, they cannot have a significant impact on growth and development.', answer: 'The claim is false',
                  options: ['The claim is false', 'hormones are produced by organs directly where the change happens (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair follicles produce the.' },
                { id: 'b', prompt: 'How do hormones know which specific organ in the body to affect, given that they travel everywhere through the bloodstream?', answer: 'The correct answer is that hormones affect only specific target organs',
                  options: ['The correct answer is that hormones affect only specific target organs', 'hormones are produced by organs directly where the change happens (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair follicles produce the.' }
          ],
            remediations: { 'hormones-are-produced-by-organs': { steps: ['To fix this, trace the path of a hormone using a physical map analogy: point out that the pituitary gland is located in.', 'Emphasize that endocrine glands are ductless factories that ship their products through the blood highway to distant.'] } } },
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
                  options: ['The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed', 'Life processes are the essential biological activities performed by all living', 'Cellular respiration in plants is the biochemical process by', 'The growth of a plant is the permanent increase in size, mass, and complexity of its'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that digestion is completed entirely inside the stomach because it is the largest and most prominent dilated organ.' }
          ],
            remediations: { 'digestion-is-completed-entirely-inside': { steps: ['To fix this, guide the student to trace the journey of food step by step using a colored diagram of the digestive tract.', 'Emphasize that the stomach only initiates protein digestion and turns food into a liquid paste (chyme), whereas.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
