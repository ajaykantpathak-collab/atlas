import type { SimDef } from '../../engine/types';

/** v3 generated — c7_bio_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_bio_ch02_p2: SimDef = {
    id: 'v3_c7_bio_ch02_p2',
    title: 'Life Processes in Animals · Part 2/2',
    subtitle: 'This node covers the structure and function of the human large intestine, including water.',
    classLevel: 7, subject: 'biology', topic: 'Life Processes in Animals · Part 2/2',
    chapters: ['c7_bio_ch02'],
    nodeIds: ['c7_bio_ch02_007', 'c7_bio_ch02_008', 'c7_bio_ch02_009', 'c7_bio_ch02_010', 'c7_bio_ch02_011', 'c7_bio_ch02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you drink a glass of nimbu pani on a hot afternoon in Delhi, your body absorbs most of the water in your.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stray dog gulps down spoiled food crawling with bacteria. Hours later it is fine — and it kept breathing even on a day it found no food at all. Which hidden teamwork saved it?',
        options: ['Nutrition, respiration, and excretion work as one network — digestion takes in fuel, breathing releases its energy, and excretion removes the toxic leftovers', 'The dog just has a lucky stomach', 'Breathing stops whenever eating stops, so the dog was not really hungry', 'The food simply disappeared once swallowed'],
        answer: 'Nutrition, respiration, and excretion work as one network — digestion takes in fuel, breathing releases its energy, and excretion removes the toxic leftovers',
        hook: 'No life process works alone — and two wastes are not the same. Undigested food leaving the gut is egestion, but chemical waste made inside cells, like urea filtered by the kidneys, is true excretion.',
    },
    teaching: [
        { title: 'Digestion in Humans: Large Intestine and Excretion', text: 'The large intestine is the final section of the human alimentary canal where water and mineral salts are absorbed from undigested food residue, and the remaining solid waste (faeces) is temporarily.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_bio_ch02_007', title: 'Your mission',
          mission: { widget: 'digest', validate: 'digest:progress=60',
            instruction: 'On the lab: push the food to 60% — which organ is it in?.',
        context: 'Follow a glass of milk through a calf — chart how nutrition delivers it, respiration burns it with oxygen, and excretion throws out what cells cannot use.',
            observePrompt: 'What did the digest interactive show you?' } },
        { type: 'case', nodeId: 'c7_bio_ch02_007', title: 'Digestion in Humans: Large Intestine and Excretion',
          caseStudy: { intro: 'When you drink a glass of nimbu pani on a hot afternoon in Delhi, your body absorbs most of the water in your stomach and small intestine, but a specific final.',
            decisions: [{ prompt: 'What is the primary substance absorbed by the large intestine from undigested food residue?', options: [
                { text: 'The large intestine primarily absorbs water and essential mineral salts', outcome: 'The large intestine primarily absorbs water and essential mineral salts.' },
                { text: 'that proteins or carbohydrates are absorbed here', outcome: 'Not quite — Students often believe that digestion and nutrient extraction continue inside the large intestine.', reveals: 'digestion-and-nutrient-extraction-continue' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch02_009', title: 'Respiration in Animals: Aerobic and Anaerobic',
          caseStudy: { intro: 'When you run fast in a sports race or play kabaddi for a long time, you start breathing heavily and sometimes feel painful cramps in your leg muscles.',
            decisions: [{ prompt: 'What is the primary gas required for aerobic respiration to take place in animal cells?', options: [
                { text: 'Oxygen is the primary gas required for aerobic respiration', outcome: 'Oxygen is the primary gas required for aerobic respiration. A student who answers "carbon dioxide".' },
                { text: 'carbon dioxide', outcome: 'Not quite — Students often think that breathing and cellular respiration are the exact same thing, believing.', reveals: 'breathing-and-cellular-respiration-are' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch02_010', title: 'Respiration in Humans: Respiratory System Structure',
          caseStudy: { intro: 'When you take a deep breath of fresh morning air during your school assembly, you might wonder where that air actually travels inside your chest.',
            decisions: [{ prompt: 'Which primary organ of the human respiratory system contains millions of microscopic air sacs called alveoli where gas exchange actually.', options: [
                { text: 'The lungs contain the alveoli where gas exchange occurs', outcome: 'The lungs contain the alveoli where gas exchange occurs. A student who answers "trachea".' },
                { text: 'trachea', outcome: 'Not quite — Students often believe that the lungs are hollow muscular bags that expand and contract on their.', reveals: 'the-lungs-are-hollow-muscular' },
                { text: 'bronchi', outcome: 'Not quite — Students often believe that the lungs are hollow muscular bags that expand and contract on their.', reveals: 'the-lungs-are-hollow-muscular' }
            ] }] } },
        { type: 'dissect', nodeId: 'c7_bio_ch02_008', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes in Animals · Part 2/2', spots: [
            { id: 's1', label: 'Digestion in Humans Large Intestine and Excretion', prompt: 'Which idea is this? — The large intestine is the final section of the human alimentary canal where water and.', answer: 'Digestion in Humans Large Intestine and Excretion', options: ['Digestion in Humans Large Intestine and Excretion', 'Variations in Digestion Across Animal Groups', 'Respiration in Animals Aerobic and Anaerobic', 'Respiration in Humans Respiratory System Structure'] },
            { id: 's2', label: 'Variations in Digestion Across Animal Groups', prompt: 'Which idea is this? — Variations in digestion across animal groups refer to the structural and physiological.', answer: 'Variations in Digestion Across Animal Groups', options: ['Variations in Digestion Across Animal Groups', 'Digestion in Humans Large Intestine and Excretion', 'Respiration in Animals Aerobic and Anaerobic', 'Respiration in Humans Respiratory System Structure'] },
            { id: 's3', label: 'Respiration in Animals Aerobic and Anaerobic', prompt: 'Which idea is this? — Aerobic respiration is the process of cellular energy release that occurs in the presence.', answer: 'Respiration in Animals Aerobic and Anaerobic', options: ['Respiration in Animals Aerobic and Anaerobic', 'Digestion in Humans Large Intestine and Excretion', 'Variations in Digestion Across Animal Groups', 'Respiration in Humans Respiratory System Structure'] },
            { id: 's4', label: 'Respiration in Humans Respiratory System Structure', prompt: 'Which idea is this? — The human respiratory system is a specialized network of organs—including the nasal.', answer: 'Respiration in Humans Respiratory System Structure', options: ['Respiration in Humans Respiratory System Structure', 'Digestion in Humans Large Intestine and Excretion', 'Variations in Digestion Across Animal Groups', 'Respiration in Animals Aerobic and Anaerobic'] },
            { id: 's5', label: 'Breathing Mechanism Inhalation and Exhalation', prompt: 'Which idea is this? — Breathing mechanism is the physical process of inhaling oxygen-rich air into the lungs.', answer: 'Breathing Mechanism Inhalation and Exhalation', options: ['Breathing Mechanism Inhalation and Exhalation', 'Digestion in Humans Large Intestine and Excretion', 'Variations in Digestion Across Animal Groups', 'Respiration in Animals Aerobic and Anaerobic'] },
            { id: 's6', label: 'Respiration in Other Animals Gills Skin Trachea', prompt: 'Which idea is this? — Different animals utilize specialized respiratory structures such as gills (for aquatic.', answer: 'Respiration in Other Animals Gills Skin Trachea', options: ['Respiration in Other Animals Gills Skin Trachea', 'Digestion in Humans Large Intestine and Excretion', 'Variations in Digestion Across Animal Groups', 'Respiration in Animals Aerobic and Anaerobic'] }
          ] } },
        { type: 'case', nodeId: 'c7_bio_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a classroom debate on \'which life process matters most,\' a student argues: \'Eating is obviously first — an animal can skip breathing hard or going to the toilet for a while, but without food it dies.\'',
            decisions: [{ prompt: 'Which life process failure is actually the fastest killer?', options: [
                { text: 'Excretion and respiration can kill faster than hunger — a mouse sealed away from releasing carbon dioxide and wastes is poisoned within hours even with food and oxygen, because used-up products accumulate and turn toxic. The processes are a chain: nutrition brings material in, respiration extracts energy, and excretion throws the waste out — break any link and the whole animal fails.', outcome: 'The debate\'s premise is wrong — life processes are interdependent, and waste removal is as urgent as intake; the fastest deaths come from blocked exits, not empty stomachs.' },
                { text: 'The student is right — food is the foundation, so failing to eat is always the quickest way an animal dies.', outcome: 'Animals survive days without food but only hours to days without excreting waste — blocked removal lets toxins build to lethal levels first.', reveals: 'food-outranks-excretion' },
                { text: 'None of them kill quickly — an animal can pause any single life process indefinitely since the others compensate.', outcome: 'No process can fully cover for another — sealed excretion kills despite perfect food and oxygen, because nothing else removes the accumulating waste.', reveals: 'processes-cover-each-other' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch02_012', title: 'You made it',
          caseStudy: { intro: 'Your body is a three-way relay: food in, energy out, waste gone. Drop any runner and the whole race is lost.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'digest', prompt: 'Explore the digest interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'digest', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch02_007', difficulty: 'standard',
          question: 'The large intestine is the final section of the human alimentary canal where.',
          hint: 'Review node c7_bio_ch02_006 to clarify what happens in the small intestine before.',
          misconception: 'Students often believe that digestion and nutrient extraction continue inside the large intestine, thinking that solid.',
          parts: [
                { id: 'a', prompt: 'What is the primary substance absorbed by the large intestine from undigested food residue?', answer: 'The large intestine primarily absorbs water and essential mineral salts',
                  options: ['The large intestine primarily absorbs water and essential mineral salts', 'that proteins or carbohydrates are absorbed here'],
                  hint: 'Review node c7_bio_ch02_006 to clarify what happens in the small intestine before tackling waste.',
                  misconception: 'Students often believe that digestion and nutrient extraction continue inside the large intestine, thinking that solid waste is created.' }
          ],
            remediations: { 'digestion-and-nutrient-extraction-continue': { steps: ['To fix this, guide the student to trace a meal step by step: remind them that proteins, fats, and carbohydrates are.', 'Show them a diagram of the small intestine with its rich blood supply absorbing nutrients, and contrast it with the.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_008', difficulty: 'standard',
          question: 'Variations in digestion across animal groups refer to the structural and.',
          hint: 'Review c7_bio_ch02_002 and c6_biology_ch09_002 to reinforce how diet types dictate.',
          misconception: 'Students often think that all animals digest food in the same way as humans do, assuming that a cow\'s stomach is just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Variations in digestion across animal groups refer to the structural and physiological',
                  options: ['Variations in digestion across animal groups refer to the structural and physiological', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The human alimentary canal is a continuous, muscular tube running from the mouth to the'],
                  hint: 'Review c7_bio_ch02_002 and c6_biology_ch09_002 to reinforce how diet types dictate feeding and.',
                  misconception: 'Students often think that all animals digest food in the same way as humans do, assuming that a cow\'s stomach is just a larger version of.' }
          ],
            remediations: { 'all-animals-digest-food-in': { steps: ['To fix this, guide the student to compare a diagram of a human stomach with a four-chambered ruminant stomach.', 'Explain that cows cannot produce cellulase enzymes on their own, so they need a specialized "fermentation vat" (rumen).'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_009', difficulty: 'standard',
          question: 'Aerobic respiration is the process of cellular energy release that occurs.',
          hint: 'Review cellular structure and the basic definition of respiration from c7_bio_ch02_001.',
          misconception: 'Students often think that breathing and cellular respiration are the exact same thing, believing that when air enters.',
          parts: [
                { id: 'a', prompt: 'What is the primary gas required for aerobic respiration to take place in animal cells?', answer: 'Oxygen is the primary gas required for aerobic respiration',
                  options: ['Oxygen is the primary gas required for aerobic respiration', 'carbon dioxide'],
                  hint: 'Review cellular structure and the basic definition of respiration from c7_bio_ch02_001.',
                  misconception: 'Students often think that breathing and cellular respiration are the exact same thing, believing that when air enters the lungs.' },
                { id: 'b', prompt: 'Why do muscle cells undergo anaerobic respiration temporarily during very heavy physical exercise like sprinting?', answer: 'Muscle cells undergo anaerobic respiration',
                  options: ['Muscle cells undergo anaerobic respiration', 'because muscles hate oxygen'],
                  hint: 'Review cellular structure and the basic definition of respiration from c7_bio_ch02_001.',
                  misconception: 'Students often think that breathing and cellular respiration are the exact same thing, believing that when air enters the lungs.' }
          ],
            remediations: { 'breathing-and-cellular-respiration-are': { steps: ['To fix this, guide the student to trace a single oxygen molecule: 1.', 'Point out that chest movement brings air into the lungs (breathing).', 'Explain how blood carries that oxygen to a toe muscle cell (circulation).', 'Show how the cell uses that oxygen inside tiny cell structures to burn glucose for energy (cellular respiration).'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_010', difficulty: 'standard',
          question: 'The human respiratory system is a specialized network of organs—including the.',
          hint: 'Review the basic concept of aerobic respiration and how oxygen is used inside cells.',
          misconception: 'Students often believe that the lungs are hollow muscular bags that expand and contract on their own like balloons.',
          parts: [
                { id: 'a', prompt: 'Which primary organ of the human respiratory system contains millions of microscopic air sacs called alveoli where gas exchange actually takes place?', answer: 'The lungs contain the alveoli where gas exchange occurs',
                  options: ['The lungs contain the alveoli where gas exchange occurs', 'trachea', 'bronchi'],
                  hint: 'Review the basic concept of aerobic respiration and how oxygen is used inside cells to release.',
                  misconception: 'Students often believe that the lungs are hollow muscular bags that expand and contract on their own like balloons being blown up by.' }
          ],
            remediations: { 'the-lungs-are-hollow-muscular': { steps: ['To fix this, take a clean plastic syringe without the needle, pull the plunger back and forth, and observe how air.', 'Then, explain that lungs are passive spongy tissues moved by the chest wall and diaphragm—just like the syringe barrel.', 'Have the student trace the air path from nose to alveoli using a tactile diagram to emphasize the physical pipes rather.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_011', difficulty: 'standard',
          question: 'Breathing mechanism is the physical process of inhaling oxygen-rich air into.',
          hint: 'Review node c7_bio_ch02_010 to re-familiarize yourself with the structures of the human.',
          misconception: 'Students often think that the lungs are muscular organs that actively suck air in and push air out, similar to how.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Breathing mechanism is the physical process of inhaling oxygen-rich air into the lungs',
                  options: ['Breathing mechanism is the physical process of inhaling oxygen-rich air into the lungs', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The human alimentary canal is a continuous, muscular tube running from the mouth to the'],
                  hint: 'Review node c7_bio_ch02_010 to re-familiarize yourself with the structures of the human respiratory.',
                  misconception: 'Students often think that the lungs are muscular organs that actively suck air in and push air out, similar to how a bicycle pump works.' }
          ],
            remediations: { 'the-lungs-are-muscular-organs': { steps: ['To fix this misconception, take a flexible plastic syringe or a balloon inside a jar.', 'Show that the balloon does not inflate itself; something else must pull or push the walls of the container to change.', 'Emphasize that the diaphragm and rib muscles are the active movers, while the lungs simply follow the volume changes.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_012', difficulty: 'standard',
          question: 'Different animals utilize specialized respiratory structures such as gills (for.',
          hint: 'Review cellular respiration and human breathing basics from Grade 6 (c6_biology_ch09_004).',
          misconception: 'Students often think that insects breathe through their mouth or nose like humans do, completely ignoring the tiny.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Different animals utilize specialized respiratory structures such as gills (for aquatic',
                  options: ['Different animals utilize specialized respiratory structures such as gills (for aquatic', 'Life processes are the essential biological activities performed by all living', 'The classification of animals based on their dietary sources (herbivores, carnivores,', 'The human alimentary canal is a continuous, muscular tube running from the mouth to the'],
                  hint: 'Review cellular respiration and human breathing basics from Grade 6 (c6_biology_ch09_004).',
                  misconception: 'Students often think that insects breathe through their mouth or nose like humans do, completely ignoring the tiny holes on the sides.' }
          ],
            remediations: { 'insects-breathe-through-their-mouth': { steps: ['To fix this, take a live specimen observation approach or show a detailed diagram of a cockroach abdomen and a fish.', 'Point out the spiracles on the side of an insect\'s body using a magnifying glass or picture, and trace the path of air.', 'For fish, demonstrate with a simple analogy of a sieve filtering water while blood vessels absorb the vital components.'], labTask: { instruction: 'On the interactive: push the food to 60% — which organ is it in? — then check.', widget: 'digest', validate: 'digest:progress=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
