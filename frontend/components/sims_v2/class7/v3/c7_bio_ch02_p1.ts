import type { SimDef } from '../../engine/types';

/** v3 generated — c7_bio_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_bio_ch02_p1: SimDef = {
    id: 'v3_c7_bio_ch02_p1',
    title: 'Life Processes in Animals · Part 1/2',
    subtitle: 'Covers the general overview of life processes (nutrition, respiration, and excretion).',
    classLevel: 7, subject: 'biology', topic: 'Life Processes in Animals · Part 1/2',
    chapters: ['c7_bio_ch02'],
    nodeIds: ['c7_bio_ch02_001', 'c7_bio_ch02_002', 'c7_bio_ch02_003', 'c7_bio_ch02_004', 'c7_bio_ch02_005', 'c7_bio_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you eat a heavy meal of *parathas* during lunch, your body does not just store the food; it immediately.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stray dog gulps down spoiled food crawling with bacteria. Hours later it is fine — and it kept breathing even on a day it found no food at all. Which hidden teamwork saved it?',
        options: ['Nutrition, respiration, and excretion work as one network — digestion takes in fuel, breathing releases its energy, and excretion removes the toxic leftovers', 'The dog just has a lucky stomach', 'Breathing stops whenever eating stops, so the dog was not really hungry', 'The food simply disappeared once swallowed'],
        answer: 'Nutrition, respiration, and excretion work as one network — digestion takes in fuel, breathing releases its energy, and excretion removes the toxic leftovers',
        hook: 'No life process works alone — and two wastes are not the same. Undigested food leaving the gut is egestion, but chemical waste made inside cells, like urea filtered by the kidneys, is true excretion.',
    },
    teaching: [
        { title: 'Life Processes: Nutrition, Respiration, Excretion Overview', text: 'Life processes are the essential biological activities performed by all living organisms—such as nutrition, respiration, transport, and excretion—that work together to maintain life, repair damaged.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_bio_ch02_001', title: 'Your mission',
          mission: { widget: 'digest', validate: 'digest:progress=60',
            instruction: 'On the lab: push the food to 60% — which organ is it in?.',
        context: 'Follow a glass of milk through a calf — chart how nutrition delivers it, respiration burns it with oxygen, and excretion throws out what cells cannot use.',
            observePrompt: 'What did the digest interactive show you?' } },
        { type: 'case', nodeId: 'c7_bio_ch02_002', title: 'Nutrition in Animals: Types of Food and Feeding Habits',
          caseStudy: { intro: 'Observe how a cow slowly chews cud in a village courtyard compared to how a housefly rubs its mouthparts over sugar.',
            decisions: [{ prompt: 'What term describes animals that feed exclusively on other animals\' flesh?', options: [
                { text: 'Carnivores', outcome: 'Carnivores. If a student answers "herbivores," it reveals confusion between plant-eating and.' },
                { text: 'herbivores', outcome: 'Not quite — Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat).', reveals: 'feeding-habit-refers-only-to' },
                { text: '(flesh)', outcome: 'Not quite — Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat).', reveals: 'feeding-habit-refers-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch02_003', title: 'Alimentary Canal: Structure and Function in Humans',
          caseStudy: { intro: 'When you eat a hot plate of aloo paratha for breakfast, your body does not just absorb it whole; it must travel down a long, winding muscular tube inside your.',
            decisions: [{ prompt: 'What is the primary function of the alimentary canal in humans?', options: [
                { text: 'The primary function is to ingest food, digest it into smaller absorbable molecules,', outcome: 'The primary function is to ingest food, digest it into smaller absorbable molecules, absorb.' },
                { text: 'stores food', outcome: 'Not quite — Students often believe that the alimentary canal is just a passive, open pipe where food falls.', reveals: 'the-alimentary-canal-is-just' }
            ] }] } },
        { type: 'dissect', nodeId: 'c7_bio_ch02_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes in Animals · Part 1/2', spots: [
            { id: 's1', label: 'Life Processes Nutrition Respiration Excretion Overview', prompt: 'Which idea is this? — Life processes are the essential biological activities performed by all living.', answer: 'Life Processes Nutrition Respiration Excretion Overview', options: ['Life Processes Nutrition Respiration Excretion Overview', 'Nutrition in Animals Types of Food and Feeding Habits', 'Alimentary Canal Structure and Function in Humans', 'Digestion in Humans Mouth and Salivary Glands'] },
            { id: 's2', label: 'Nutrition in Animals Types of Food and Feeding Habits', prompt: 'Which idea is this? — The classification of animals based on their dietary sources (herbivores, carnivores.', answer: 'Nutrition in Animals Types of Food and Feeding Habits', options: ['Nutrition in Animals Types of Food and Feeding Habits', 'Life Processes Nutrition Respiration Excretion Overview', 'Alimentary Canal Structure and Function in Humans', 'Digestion in Humans Mouth and Salivary Glands'] },
            { id: 's3', label: 'Alimentary Canal Structure and Function in Humans', prompt: 'Which idea is this? — The human alimentary canal is a continuous, muscular tube running from the mouth to the.', answer: 'Alimentary Canal Structure and Function in Humans', options: ['Alimentary Canal Structure and Function in Humans', 'Life Processes Nutrition Respiration Excretion Overview', 'Nutrition in Animals Types of Food and Feeding Habits', 'Digestion in Humans Mouth and Salivary Glands'] },
            { id: 's4', label: 'Digestion in Humans Mouth and Salivary Glands', prompt: 'Which idea is this? — The process of digestion in the mouth involves mechanical breakdown of food by teeth and.', answer: 'Digestion in Humans Mouth and Salivary Glands', options: ['Digestion in Humans Mouth and Salivary Glands', 'Life Processes Nutrition Respiration Excretion Overview', 'Nutrition in Animals Types of Food and Feeding Habits', 'Alimentary Canal Structure and Function in Humans'] },
            { id: 's5', label: 'Digestion in Humans Stomach and Gastric Juices', prompt: 'Which idea is this? — The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed.', answer: 'Digestion in Humans Stomach and Gastric Juices', options: ['Digestion in Humans Stomach and Gastric Juices', 'Life Processes Nutrition Respiration Excretion Overview', 'Nutrition in Animals Types of Food and Feeding Habits', 'Alimentary Canal Structure and Function in Humans'] },
            { id: 's6', label: 'Digestion in Humans Small Intestine and Absorption', prompt: 'Which idea is this? — The small intestine is a long, coiled, narrow tube where the final chemical digestion.', answer: 'Digestion in Humans Small Intestine and Absorption', options: ['Digestion in Humans Small Intestine and Absorption', 'Life Processes Nutrition Respiration Excretion Overview', 'Nutrition in Animals Types of Food and Feeding Habits', 'Alimentary Canal Structure and Function in Humans'] }
          ] } },
        { type: 'case', nodeId: 'c7_bio_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a classroom debate on \'which life process matters most,\' a student argues: \'Eating is obviously first — an animal can skip breathing hard or going to the toilet for a while, but without food it dies.\'',
            decisions: [{ prompt: 'Which life process failure is actually the fastest killer?', options: [
                { text: 'Excretion and respiration can kill faster than hunger — a mouse sealed away from releasing carbon dioxide and wastes is poisoned within hours even with food and oxygen, because used-up products accumulate and turn toxic. The processes are a chain: nutrition brings material in, respiration extracts energy, and excretion throws the waste out — break any link and the whole animal fails.', outcome: 'The debate\'s premise is wrong — life processes are interdependent, and waste removal is as urgent as intake; the fastest deaths come from blocked exits, not empty stomachs.' },
                { text: 'The student is right — food is the foundation, so failing to eat is always the quickest way an animal dies.', outcome: 'Animals survive days without food but only hours to days without excreting waste — blocked removal lets toxins build to lethal levels first.', reveals: 'food-outranks-excretion' },
                { text: 'None of them kill quickly — an animal can pause any single life process indefinitely since the others compensate.', outcome: 'No process can fully cover for another — sealed excretion kills despite perfect food and oxygen, because nothing else removes the accumulating waste.', reveals: 'processes-cover-each-other' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Your body is a three-way relay: food in, energy out, waste gone. Drop any runner and the whole race is lost.',
            decisions: [{ prompt: 'What comes next? Life Processes in Animals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Life Processes in Animals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'digest', prompt: 'Explore the digest interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'digest', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch02_001', difficulty: 'standard',
          question: 'Life processes are the essential biological activities performed by all living.',
          hint: 'Review the Class 6 introduction to the digestive system and how breathing supplies air.',
          misconception: 'Students often think that excretion and egestion (defecation) are the exact same biological process, believing that.',
          parts: [
                { id: 'a', prompt: 'If a stray dog eats a contaminated piece of food containing harmful bacteria, which life process will immediately deal with the toxins and undigested waste?', answer: 'Identify that the food enters the alimentary canal through nutrition',
                  options: ['Identify that the food enters the alimentary canal through nutrition', 'toxic substances remain inside cells forever'],
                  hint: 'Review the Class 6 introduction to the digestive system and how breathing supplies air to the body.',
                  misconception: 'Students often think that excretion and egestion (defecation) are the exact same biological process, believing that passing solid stool.' }
          ],
            remediations: { 'excretion-and-egestion-defecation-are': { steps: ['To fix this misconception, have the student trace two different pathways: 1) A banana peel fiber that passes straight.', '2) Salt and water filtered out by the kidneys from the bloodstream after cellular metabolism (excretion).', 'Ask them where the waste came from—inside a cell or straight from the digestive tract?'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_002', difficulty: 'standard',
          question: 'The classification of animals based on their dietary sources (herbivores.',
          hint: 'Review Class 6 concepts on animal nutrition and food chains before exploring physical.',
          misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how*.',
          parts: [
                { id: 'a', prompt: 'What term describes animals that feed exclusively on other animals\' flesh?', answer: 'Carnivores',
                  options: ['Carnivores', 'herbivores', '(flesh)', '"feeding habit" refers only to what an animal eats (e'],
                  hint: 'Review Class 6 concepts on animal nutrition and food chains before exploring physical feeding.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food.' },
                { id: 'b', prompt: 'Why do cows spend hours chewing their food repeatedly (rumination), whereas tigers swallow chunks of meat without prolonged grinding?', answer: 'Cows eat plant matter (cellulose)',
                  options: ['Cows eat plant matter (cellulose)', 'feeding habit', '"feeding habit" refers only to what an animal eats (e'],
                  hint: 'Review Class 6 concepts on animal nutrition and food chains before exploring physical feeding.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food.' },
                { id: 'c', prompt: 'A pond biologist discovers a microscopic organism that uses tiny hair-like cilia to sweep suspended organic particles into its oral cavity.', answer: 'Identify the food source: suspended organic particles',
                  options: ['Identify the food source: suspended organic particles', 'feeding habit', 'all animals hunt or graze, ignoring microscopic aquatic feeding adaptations', '"feeding habit" refers only to what an animal eats (e'],
                  hint: 'Review Class 6 concepts on animal nutrition and food chains before exploring physical feeding.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food.' }
          ],
            remediations: { 'feeding-habit-refers-only-to': { steps: ['To fix this, guide the student to examine two contrasting organisms—a cow grazing grass and a spider trapping an insect.', 'Ask them to physically trace what happens to the food *before* it enters the main body cavity.', 'Emphasize that feeding habits include specialized structural adaptations like scraping radula in snails or piercing.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An omnivore is simply an animal that eats anything at all, so its digestive needs are identical to a pure carnivore." Is this correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'feeding habit', '"feeding habit" refers only to what an animal eats (e'],
                  hint: 'Review Class 6 concepts on animal nutrition and food chains before exploring physical feeding.',
                  misconception: 'Students often think that "feeding habit" refers only to what an animal eats (e.g., grass or meat) and ignore *how* it gets the food.' }
          ],
            remediations: { 'feeding-habit-refers-only-to': { steps: ['To fix this, guide the student to examine two contrasting organisms—a cow grazing grass and a spider trapping an insect.', 'Ask them to physically trace what happens to the food *before* it enters the main body cavity.', 'Emphasize that feeding habits include specialized structural adaptations like scraping radula in snails or piercing.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_003', difficulty: 'standard',
          question: 'The human alimentary canal is a continuous, muscular tube running from the.',
          hint: 'Review Class 6 concepts on animal nutrition and the basic layout of the digestive system.',
          misconception: 'Students often believe that the alimentary canal is just a passive, open pipe where food falls straight down due.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The human alimentary canal is a continuous, muscular tube running from the mouth to the',
                  options: ['The human alimentary canal is a continuous, muscular tube running from the mouth to the', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The process of digestion in the mouth involves mechanical breakdown of food by teeth and'],
                  hint: 'Review Class 6 concepts on animal nutrition and the basic layout of the digestive system before.',
                  misconception: 'Students often believe that the alimentary canal is just a passive, open pipe where food falls straight down due to gravity from the mouth.' }
          ],
            remediations: { 'the-alimentary-canal-is-just': { steps: ['To correct this misconception, ask the student to try swallowing a small sip of water while hanging their head upside.', 'Point out that the water still travels upward into the stomach against gravity.', 'Explain that circular and longitudinal muscles in the wall of the esophagus squeeze rhythmically behind the food.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_004', difficulty: 'standard',
          question: 'The process of digestion in the mouth involves mechanical breakdown of food.',
          hint: 'Review c7_bio_ch02_003 to visualize the alimentary canal before studying the mouth.',
          misconception: 'Students often think that the mouth is only a passive pipe for food to pass through and that all chemical breakdown.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The process of digestion in the mouth involves mechanical breakdown of food by teeth and',
                  options: ['The process of digestion in the mouth involves mechanical breakdown of food by teeth and', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The human alimentary canal is a continuous, muscular tube running from the mouth to the'],
                  hint: 'Review c7_bio_ch02_003 to visualize the alimentary canal before studying the mouth in detail.',
                  misconception: 'Students often think that the mouth is only a passive pipe for food to pass through and that all chemical breakdown happens entirely in the.' }
          ],
            remediations: { 'the-mouth-is-only-a': { steps: ['To correct this, take a small piece of plain white bread or boiled rice, place it on your tongue, and chew slowly.', 'Notice how the taste changes from plain to slightly sweet; this sweetness is the direct chemical proof that salivary.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_005', difficulty: 'standard',
          question: 'The stomach is a muscular, J-shaped bag located in the upper abdomen that.',
          hint: 'Review c7_bio_ch02_004 to understand how food is swallowed and transported before.',
          misconception: 'Students often believe that digestion is completed entirely inside the stomach because it is the largest and most.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed',
                  options: ['The stomach is a muscular, J-shaped bag located in the upper abdomen that receives chewed', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The human alimentary canal is a continuous, muscular tube running from the mouth to the'],
                  hint: 'Review c7_bio_ch02_004 to understand how food is swallowed and transported before reaching the.',
                  misconception: 'Students often believe that digestion is completed entirely inside the stomach because it is the largest and most prominent dilated organ.' }
          ],
            remediations: { 'digestion-is-completed-entirely-inside': { steps: ['To fix this, guide the student to trace the journey of food step by step using a colored diagram of the digestive tract.', 'Emphasize that the stomach only initiates protein digestion and turns food into a liquid paste (chyme), whereas.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_006', difficulty: 'standard',
          question: 'The small intestine is a long, coiled, narrow tube where the final chemical.',
          hint: 'Review c7_bio_ch02_005 to understand how gastric juices alter food before it reaches the.',
          misconception: 'Students often believe that digestion is completely finished in the stomach and that the small intestine only acts as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The small intestine is a long, coiled, narrow tube where the final chemical digestion of',
                  options: ['The small intestine is a long, coiled, narrow tube where the final chemical digestion of', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The human alimentary canal is a continuous, muscular tube running from the mouth to the'],
                  hint: 'Review c7_bio_ch02_005 to understand how gastric juices alter food before it reaches the small.',
                  misconception: 'Students often believe that digestion is completely finished in the stomach and that the small intestine only acts as a simple empty pipe.' }
          ],
            remediations: { 'digestion-is-completely-finished-in': { steps: ['To fix this, guide the student through a step-by-step review: (1) Remind them that food leaves the stomach as.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
