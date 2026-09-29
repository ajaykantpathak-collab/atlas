import type { SimDef } from '../../engine/types';
import C7_ScienceRespirationInOrganismsSim from '../../../simulations/c6_12/C7_ScienceRespirationInOrganismsSim';

/** v3 wrapped master — C7_ScienceRespirationInOrganismsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_sciencerespirationinorganismssim: SimDef = {
    id: 'v3w_c7_sciencerespirationinorganismssim',
    title: 'Life Processes: Nutrition, Respiration, Excretion Overview',
    subtitle: 'Covers the general overview of life processes (nutrition, respiration, and excretion) in.',
    classLevel: 7, subject: 'science', topic: 'Life Processes: Nutrition, Respiration, Excretion Overview',
    chapters: [],
    nodeIds: ['c7_bio_ch02_001', 'c7_bio_ch02_012', 'c7_bio_ch02_006', 'c7_bio_ch02_008', 'c7_bio_ch02_009', 'c7_bio_ch02_011', 'c7_bio_ch03_002', 'c7_bio_ch03_006', 'c7_bio_ch03_007', 'c7_bio_ch03_010', 'c7_bio_ch03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you eat a heavy meal of *parathas* during lunch, your body does not just store the food; it immediately.', goal: 'Master Life Processes: Nutrition, Respiration, Excretion Overview.' },
    // discovery omitted — no cleanly extractable hook
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
        { type: 'scaffold', nodeId: 'c7_bio_ch02_012', title: 'Different animals utilize specialized.',
          scaffold: { problem: 'A Rohu fish is placed in an aquarium where the water pump breaks down, causing the water to become stagnant and low in dissolved oxygen.',
            steps: [
            { text: 'Identify that fish extract dissolved oxygen from water using gills.' },
            { text: 'Recall that gill filaments contain tiny blood vessels (capillaries) where diffusion of oxygen occurs.' },
            { text: 'Apply the condition of stagnant water—low oxygen concentration means less diffusion gradient.' },
            { text: 'Trace the cause-effect chain: fish increases opercular movement (pumping water faster) to catch more oxygen, and swims.' },
            { text: 'Verify and state conclusion: despite behavioral adjustments, if dissolved oxygen drops too low, the fish suffocates.', faded: true, blankAnswer: 'The fish rapidly pumps its gills and surfaces to seek.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch02_006', title: 'The small intestine is a long, coiled,.',
          scaffold: { problem: 'A student eats a meal containing chapati (starch) and paneer (protein).',
            steps: [
            { text: 'Identify that starch and protein enter the small intestine in a partially digested or complex form from the stomach and.' },
            { text: 'Recall that pancreatic juice and intestinal juice contain specific enzymes (like amylase and trypsin/peptidases).' },
            { text: 'Apply the enzymatic action: complex starch is broken down into simple sugars (like glucose), and complex proteins are.' },
            { text: 'Trace the movement of these simple, soluble molecules to the inner wall of the small intestine where villi absorb them.', faded: true, blankAnswer: 'Starch is converted into simple sugars and proteins into.' }
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
        { type: 'scaffold', nodeId: 'c7_bio_ch02_009', title: 'Aerobic respiration is the process of.',
          scaffold: { problem: 'Rohit ran a 100-meter sprint during his school sports day in New Delhi and immediately felt a sharp, tight pain in his calf muscles.',
            steps: [
            { text: 'Identify the biological process happening in Rohit\'s leg muscles during the sudden sprint (rapid cellular respiration.' },
            { text: 'Determine the availability of oxygen in the muscle cells during this heavy, sudden exertion (oxygen supply from blood.' },
            { text: 'Identify the shift in metabolic pathway from aerobic to anaerobic respiration due to oxygen shortage.' },
            { text: 'Trace the byproduct of this anaerobic pathway in human muscles (accumulation of lactic acid).' },
            { text: 'Conclude that the buildup of lactic acid causes muscle cramps and stiffness, which resolves once he rests and normal.', faded: true, blankAnswer: 'Rohit\'s leg muscle pain is caused by lactic acid.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch02_011', title: 'Breathing mechanism is the physical.',
          scaffold: { problem: 'During a yoga breathing exercise, a student takes a very deep breath.',
            steps: [
            { text: 'Identify the active muscles involved in inhalation, which are the diaphragm and the rib muscles (intercostal muscles).' },
            { text: 'Determine the movement of the diaphragm, noting that it contracts and flattens downward.' },
            { text: 'Determine the movement of the rib cage, noting that the ribs move upward and outward.' },
            { text: 'Analyze the effect of these movements on the chest cavity, concluding that the volume of the chest cavity increases.' },
            { text: 'Apply the principle of air pressure, recognizing that increased volume leads to decreased internal pressure, forcing.', faded: true, blankAnswer: 'The diaphragm flattens downward, ribs move upward and.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_bio_ch02_012', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes: Nutrition, Respiration, Excretion Overview', spots: [
            { id: 's1', label: 'Life processes are the essential', prompt: 'Which idea is this? — Life processes are the essential biological activities performed by all living.', answer: 'Life processes are the essential', options: ['Life processes are the essential', 'Different animals utilize specialized respiratory', 'The small intestine is a', 'Variations in digestion across animal'] },
            { id: 's2', label: 'Different animals utilize specialized respiratory', prompt: 'Which idea is this? — Different animals utilize specialized respiratory structures such as gills (for aquatic.', answer: 'Different animals utilize specialized respiratory', options: ['Different animals utilize specialized respiratory', 'Life processes are the essential', 'The small intestine is a', 'Variations in digestion across animal'] },
            { id: 's3', label: 'The small intestine is a', prompt: 'Which idea is this? — The small intestine is a long, coiled, narrow tube where the final chemical digestion of.', answer: 'The small intestine is a', options: ['The small intestine is a', 'Life processes are the essential', 'Different animals utilize specialized respiratory', 'Variations in digestion across animal'] },
            { id: 's4', label: 'Variations in digestion across animal', prompt: 'Which idea is this? — Variations in digestion across animal groups refer to the structural and physiological.', answer: 'Variations in digestion across animal', options: ['Variations in digestion across animal', 'Life processes are the essential', 'Different animals utilize specialized respiratory', 'The small intestine is a'] },
            { id: 's5', label: 'Aerobic respiration is the process', prompt: 'Which idea is this? — Aerobic respiration is the process of cellular energy release that occurs in the presence.', answer: 'Aerobic respiration is the process', options: ['Aerobic respiration is the process', 'Life processes are the essential', 'Different animals utilize specialized respiratory', 'The small intestine is a'] },
            { id: 's6', label: 'Breathing mechanism is the physical', prompt: 'Which idea is this? — Breathing mechanism is the physical process of inhaling oxygen-rich air into the lungs.', answer: 'Breathing mechanism is the physical', options: ['Breathing mechanism is the physical', 'Life processes are the essential', 'Different animals utilize specialized respiratory', 'The small intestine is a'] }
          ] } }
    ],
    explore: { component: C7_ScienceRespirationInOrganismsSim, prompt: 'Explore the interactive — Life Processes: Nutrition, Respiration, Excretion Overview' },
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
        { type: 'subpart', nodeId: 'c7_bio_ch02_012', difficulty: 'standard',
          question: 'Different animals utilize specialized respiratory structures such as gills (for.',
          hint: 'Review cellular respiration and human breathing basics from Grade 6 (c6_biology_ch09_004).',
          misconception: 'Students often think that insects breathe through their mouth or nose like humans do, completely ignoring the tiny.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Different animals utilize specialized respiratory structures such as gills (for aquatic',
                  options: ['Different animals utilize specialized respiratory structures such as gills (for aquatic', 'Life processes are the essential biological activities performed by all living', 'The small intestine is a long, coiled, narrow tube where the final chemical digestion of', 'Variations in digestion across animal groups refer to the structural and physiological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that insects breathe through their mouth or nose like humans do, completely ignoring the tiny holes on the sides of.' }
          ],
            remediations: { 'insects-breathe-through-their-mouth': { steps: ['To fix this, take a live specimen observation approach or show a detailed diagram of a cockroach abdomen and a fish.', 'Point out the spiracles on the side of an insect\'s body using a magnifying glass or picture, and trace the path of air.', 'For fish, demonstrate with a simple analogy of a sieve filtering water while blood vessels absorb the vital components.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_006', difficulty: 'standard',
          question: 'The small intestine is a long, coiled, narrow tube where the final chemical.',
          hint: 'Review c7_bio_ch02_005 to understand how gastric juices alter food before it reaches the.',
          misconception: 'Students often believe that digestion is completely finished in the stomach and that the small intestine only acts as a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The small intestine is a long, coiled, narrow tube where the final chemical digestion of',
                  options: ['The small intestine is a long, coiled, narrow tube where the final chemical digestion of', 'Life processes are the essential biological activities performed by all living', 'Different animals utilize specialized respiratory structures such as gills (for aquatic', 'Variations in digestion across animal groups refer to the structural and physiological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that digestion is completely finished in the stomach and that the small intestine only acts as a simple empty pipe.' }
          ],
            remediations: { 'digestion-is-completely-finished-in': { steps: ['To fix this, guide the student through a step-by-step review: (1) Remind them that food leaves the stomach as a.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_008', difficulty: 'standard',
          question: 'Variations in digestion across animal groups refer to the structural and.',
          hint: 'Review c7_bio_ch02_002 and c6_biology_ch09_002 to reinforce how diet types dictate.',
          misconception: 'Students often think that all animals digest food in the same way as humans do, assuming that a cow\'s stomach is just a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Variations in digestion across animal groups refer to the structural and physiological',
                  options: ['Variations in digestion across animal groups refer to the structural and physiological', 'Life processes are the essential biological activities performed by all living', 'Different animals utilize specialized respiratory structures such as gills (for aquatic', 'The small intestine is a long, coiled, narrow tube where the final chemical digestion of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all animals digest food in the same way as humans do, assuming that a cow\'s stomach is just a larger version of a.' }
          ],
            remediations: { 'all-animals-digest-food-in': { steps: ['To fix this, guide the student to compare a diagram of a human stomach with a four-chambered ruminant stomach.', 'Explain that cows cannot produce cellulase enzymes on their own, so they need a specialized "fermentation vat" (rumen).'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_009', difficulty: 'standard',
          question: 'Aerobic respiration is the process of cellular energy release that occurs in.',
          hint: 'Review cellular structure and the basic definition of respiration from c7_bio_ch02_001.',
          misconception: 'Students often think that breathing and cellular respiration are the exact same thing, believing that when air enters.',
          parts: [
                { id: 'a', prompt: 'What is the primary gas required for aerobic respiration to take place in animal cells?', answer: 'Oxygen is the primary gas required for aerobic respiration',
                  options: ['Oxygen is the primary gas required for aerobic respiration', 'carbon dioxide'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that breathing and cellular respiration are the exact same thing, believing that when air enters the lungs,.' },
                { id: 'b', prompt: 'Why do muscle cells undergo anaerobic respiration temporarily during very heavy physical exercise like sprinting?', answer: 'Muscle cells undergo anaerobic respiration',
                  options: ['Muscle cells undergo anaerobic respiration', 'because muscles hate oxygen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that breathing and cellular respiration are the exact same thing, believing that when air enters the lungs,.' }
          ],
            remediations: { 'breathing-and-cellular-respiration-are': { steps: ['To fix this, guide the student to trace a single oxygen molecule: 1.', 'Point out that chest movement brings air into the lungs (breathing).', 'Explain how blood carries that oxygen to a toe muscle cell (circulation).', 'Show how the cell uses that oxygen inside tiny cell structures to burn glucose for energy (cellular respiration).'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch02_011', difficulty: 'standard',
          question: 'Breathing mechanism is the physical process of inhaling oxygen-rich air into.',
          hint: 'Review node c7_bio_ch02_010 to re-familiarize yourself with the structures of the human.',
          misconception: 'Students often think that the lungs are muscular organs that actively suck air in and push air out, similar to how a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Breathing mechanism is the physical process of inhaling oxygen-rich air into the lungs',
                  options: ['Breathing mechanism is the physical process of inhaling oxygen-rich air into the lungs', 'Life processes are the essential biological activities performed by all living', 'Different animals utilize specialized respiratory structures such as gills (for aquatic', 'The small intestine is a long, coiled, narrow tube where the final chemical digestion of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs are muscular organs that actively suck air in and push air out, similar to how a bicycle pump works.' }
          ],
            remediations: { 'the-lungs-are-muscular-organs': { steps: ['To fix this misconception, take a flexible plastic syringe or a balloon inside a jar.', 'Show that the balloon does not inflate itself; something else must pull or push the walls of the container to change.', 'Emphasize that the diaphragm and rib muscles are the active movers, while the lungs simply follow the volume changes of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
