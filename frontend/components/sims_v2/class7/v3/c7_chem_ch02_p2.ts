import type { SimDef } from '../../engine/types';

/** v3 generated — c7_chem_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_chem_ch02_p2: SimDef = {
    id: 'v3_c7_chem_ch02_p2',
    title: 'Changes Around Us: Physical and Chemical · Part 2/2',
    subtitle: 'This node covers the fundamental criteria distinguishing permanent (chemical) changes.',
    classLevel: 7, subject: 'chemistry', topic: 'Changes Around Us: Physical and Chemical · Part 2/2',
    chapters: ['c7_chem_ch02'],
    nodeIds: ['c7_chem_ch02_007', 'c7_chem_ch02_008', 'c7_chem_ch02_009', 'c7_chem_ch02_010', 'c7_chem_ch02_011', 'c7_chem_ch02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you watch your mother make fresh idli batter, leave some out overnight, and notice it turns sour and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In one busy morning, sugar vanishes into tea, milk sours into curd, and paper burns to ash. All three look dramatic — but only some can never be undone. What is the real test?',
        options: ['Ask if a new substance was born — dissolved sugar can be recovered by evaporation, but curd and ash can never turn back', 'Ask how big the change looks — dramatic changes are always chemical', 'Ask if heat was involved — heat always means chemical', 'Ask if it happened in a kitchen — kitchen changes are reversible'],
        answer: 'Ask if a new substance was born — dissolved sugar can be recovered by evaporation, but curd and ash can never turn back',
        hook: 'Looks deceive. Tearing paper, boiling water, and dissolving salt feel drastic but stay physical — the same stuff in a new form. Even heat is no proof: melting ice absorbs heat yet stays water.',
    },
    teaching: [
        { title: 'Are Changes Permanent or Reversible?', text: 'A permanent change is an irreversible chemical alteration where one or more entirely new substances with different chemical properties are formed, such as the burning of a magnesium ribbon ($2Mg.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_chem_ch02_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Run a home change-detective log — boiling water, a ripening banana, dissolved salt, a cooked egg — and label each physical or chemical using only evidence you can see.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c7_chem_ch02_007', title: 'Are Changes Permanent or Reversible?',
          caseStudy: { intro: 'When you watch your mother make fresh idli batter, leave some out overnight, and notice it turns sour and fizzy by morning, you are witnessing a permanent.',
            decisions: [{ prompt: 'Which of the following describes a permanent change observed in a typical Indian kitchen?', options: [
                { text: 'C', outcome: 'The correct answer is C. Cooking raw rice changes its chemical composition, making it soft.' },
                { text: 'permanent', outcome: 'Not quite — Students often think that any change involving heating, color change, or disappearance of a solid.', reveals: 'any-change-involving-heating' },
                { text: 'chemical', outcome: 'Not quite — Students often think that any change involving heating, color change, or disappearance of a solid.', reveals: 'any-change-involving-heating' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_012', title: 'Indicators of Chemical Change: Colour, Gas, Heat',
          caseStudy: { intro: 'When you squeeze lemon juice over sliced raw brinjals or watch an iron gate turn reddish-brown during the monsoon in India, you are witnessing nature\'s silent.',
            decisions: [{ prompt: 'What type of change is indicated when baking soda reacts with vinegar and produces bubbles of carbon dioxide gas?', options: [
                { text: 'This is a chemical change', outcome: 'This is a chemical change. A wrong answer—such as classifying it as a physical change because the.' },
                { text: 'disappeared', outcome: 'Not quite — Students often believe that if a solid completely dissolves in a liquid (like sugar dissolving.', reveals: 'if-a-solid-completely-dissolves' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two mysteries at home: the camphor in the wardrobe has vanished completely over the month, and the copper vessel in the courtyard has grown a dull green coat. A student calls both \'chemical changes — stuff reacting and disappearing.\'',
            decisions: [{ prompt: 'Are the two changes really the same type?', options: [
                { text: 'No — the camphor simply sublimed: solid turned to vapour and drifted away with no new substance, a physical change. The green copper is different — the metal reacted with moist air over months into a new compound, which is chemical. Vanishing is not the test; whether a new substance formed is.', outcome: 'The contrast teaches the real criterion — the wardrobe lost its camphor to the air unchanged chemically, while the copper gained a genuinely new material on its surface.' },
                { text: 'The student is right — both are chemical because both changed over time without anyone touching them.', outcome: 'Time and disappearance do not decide the type — camphor subliming makes no new substance, while copper\'s green coat does.', reveals: 'disappearing-is-chemical' },
                { text: 'Both are physical — nothing \'new\' is ever created by air or time alone.', outcome: 'The green layer is a genuinely new compound formed by copper reacting with moist air — air and time together are quite capable of chemistry.', reveals: 'air-cant-cause-chemistry' }
            ] }] } },
        { type: 'case', nodeId: 'c7_chem_ch02_012', title: 'You made it',
          caseStudy: { intro: 'Every change answers to one question: is the original still hiding inside? If you can win it back, nothing new was truly born.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_chem_ch02_007', difficulty: 'standard',
          question: 'A permanent change is an irreversible chemical alteration where one or more.',
          hint: 'Review physical changes in node c7_chem_ch02_002 and practice distinguishing between.',
          misconception: 'Students often think that any change involving heating, color change, or disappearance of a solid (like dissolving.',
          parts: [
                { id: 'a', prompt: 'Which of the following describes a permanent change observed in a typical Indian kitchen?', answer: 'Cooking of raw rice into soft cooked rice',
                  options: ['Cooking of raw rice into soft cooked rice', 'permanent', 'chemical'],
                  hint: 'Review physical changes in node c7_chem_ch02_002 and practice distinguishing between dissolving.',
                  misconception: 'Students often think that any change involving heating, color change, or disappearance of a solid (like dissolving sugar in water.' },
                { id: 'b', prompt: 'A student takes a shiny iron nail, leaves it in damp coastal air in Mumbai for two weeks, and observes a reddish-brown flaky coating ($Fe_2O_3 \\cdot xH_2O$).', answer: 'Steps to solve: 1',
                  options: ['Steps to solve: 1', 'permanent', 'chemical'],
                  hint: 'Review physical changes in node c7_chem_ch02_002 and practice distinguishing between dissolving.',
                  misconception: 'Students often think that any change involving heating, color change, or disappearance of a solid (like dissolving sugar in water.' }
          ],
            remediations: { 'any-change-involving-heating': { steps: ['Take a spoonful of common salt and dissolve it in half a glass of water until it completely disappears.', 'Ask the student: "Has the salt vanished forever or can we get it back?" 3.', 'Pour the salt water into a shallow steel plate and place it under the hot sun for a few hours until the water.', 'Show the student the white salt crystals left behind and explain: "Because the original substance can be recovered.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any change involving heating, color change, or disappearance of a solid (like dissolving.',
          parts: [
                { id: 'a', prompt: 'Design a simple two-step kitchen or classroom test to prove experimentally whether dissolving washing soda in water is a temporary (reversible) change or.', answer: 'The expected response must include a method to recover the original solute',
                  options: ['The expected response must include a method to recover the original solute', 'permanent', 'chemical'],
                  hint: 'Review physical changes in node c7_chem_ch02_002 and practice distinguishing between dissolving.',
                  misconception: 'Students often think that any change involving heating, color change, or disappearance of a solid (like dissolving sugar in water.' }
          ],
            remediations: { 'any-change-involving-heating': { steps: ['Take a spoonful of common salt and dissolve it in half a glass of water until it completely disappears.', 'Ask the student: "Has the salt vanished forever or can we get it back?" 3.', 'Pour the salt water into a shallow steel plate and place it under the hot sun for a few hours until the water.', 'Show the student the white salt crystals left behind and explain: "Because the original substance can be recovered.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_008', difficulty: 'standard',
          question: 'A desirable change is a chemical or physical transformation that is beneficial.',
          hint: 'Review Class 6 concepts on reversible versus irreversible changes and identify examples.',
          misconception: 'Students often mistakenly believe that "irreversible change" always means "undesirable change" and "reversible change".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A desirable change is a chemical or physical transformation that is beneficial, useful,',
                  options: ['A desirable change is a chemical or physical transformation that is beneficial, useful,', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A physical change is a temporary alteration in the physical properties of a', 'A chemical change is a process in'],
                  hint: 'Review Class 6 concepts on reversible versus irreversible changes and identify examples of each.',
                  misconception: 'Students often mistakenly believe that "irreversible change" always means "undesirable change" and "reversible change" always means.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['To correct this misconception, guide the student to list three permanent, irreversible changes that they enjoy.', 'Then, have them list two reversible changes that are harmful or annoying (such as water freezing inside a household.', 'Emphasize that utility and benefit determine desirability, not reversibility.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_009', difficulty: 'standard',
          question: 'Weathering of rocks is a slow, natural, and continuous process in which massive.',
          hint: 'Review c7_chem_ch02_003 and c7_chem_ch02_005 to master how oxygen and moisture react with.',
          misconception: 'Students frequently confuse weathering with erosion, believing that whenever a rock breaks or changes color outdoors.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Weathering of rocks is a slow, natural, and continuous process in',
                  options: ['Weathering of rocks is a slow, natural, and continuous process in', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A physical change is a temporary alteration in the physical properties of a', 'A chemical change is a process in'],
                  hint: 'Review c7_chem_ch02_003 and c7_chem_ch02_005 to master how oxygen and moisture react with minerals.',
                  misconception: 'Students frequently confuse weathering with erosion, believing that whenever a rock breaks or changes color outdoors, wind or water must.' }
          ],
            remediations: { 'students-frequently-confuse-weathering-with': { steps: ['Remind the student that weathering means the breaking down or chemical alteration of rocks *in place* (without.', 'Use a domestic analogy: Leaving an iron gate outside causes it to rust right where it stands (weathering), whereas.', 'Emphasize that chemical weathering involves forming entirely new substances (like rust or dissolved minerals), whereas.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_010', difficulty: 'standard',
          question: 'Erosion is a slow natural geological process in which surface soil, rock, and.',
          hint: 'Review weathering concepts and physical change characteristics in c7_chem_ch02_009 and.',
          misconception: 'Students often confuse erosion with weathering, believing that when a rock breaks into smaller pieces (weathering).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Erosion is a slow natural geological process in',
                  options: ['Erosion is a slow natural geological process in', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A physical change is a temporary alteration in the physical properties of a', 'A chemical change is a process in'],
                  hint: 'Review weathering concepts and physical change characteristics in c7_chem_ch02_009 and.',
                  misconception: 'Students often confuse erosion with weathering, believing that when a rock breaks into smaller pieces (weathering) or gets washed down.' }
          ],
            remediations: { 'students-often-confuse-erosion-with': { steps: ['Remind the student that changing shape, size, or location through mechanical force without forming a new chemical.', 'Have them compare grinding chalk into powder (physical change) with burning magnesium ribbon (chemical change).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_011', difficulty: 'standard',
          question: 'Crystallisation is a physical process of separating a pure solid substance.',
          hint: 'Review physical changes and solubility properties of materials to understand how.',
          misconception: 'Students often think that crystallisation creates a completely new substance because the shiny, geometric crystals look.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Crystallisation is a physical process of separating a pure solid substance in the form of',
                  options: ['Crystallisation is a physical process of separating a pure solid substance in the form of', 'Identifying changes in everyday life is the systematic process of observing, recording,', 'A physical change is a temporary alteration in the physical properties of a', 'A chemical change is a process in'],
                  hint: 'Review physical changes and solubility properties of materials to understand how particles behave.',
                  misconception: 'Students often think that crystallisation creates a completely new substance because the shiny, geometric crystals look entirely different.' }
          ],
            remediations: { 'crystallisation-creates-a-completely-new': { steps: ['To fix this misconception, have the student take the formed copper sulphate crystals, dissolve them back completely.', 'Ask them if the blue colour or the chemical nature changed (it did not).', 'Emphasize that dissolving and reforming crystals only changes how the particles pack together in space, exactly like.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c7_chem_ch02_012', difficulty: 'standard',
          question: 'Indicators of chemical change are observable physical evidence—such as.',
          hint: 'Review c7_chem_ch02_003 to reinforce the core concept of new substance creation before.',
          misconception: 'Students often believe that if a solid completely dissolves in a liquid (like sugar dissolving in water or copper.',
          parts: [
                { id: 'a', prompt: 'What type of change is indicated when baking soda reacts with vinegar and produces bubbles of carbon dioxide gas?', answer: 'This is a chemical change',
                  options: ['This is a chemical change', 'disappeared'],
                  hint: 'Review c7_chem_ch02_003 to reinforce the core concept of new substance creation before looking.',
                  misconception: 'Students often believe that if a solid completely dissolves in a liquid (like sugar dissolving in water or copper sulfate dissolving.' }
          ],
            remediations: { 'if-a-solid-completely-dissolves': { steps: ['Remind the student to check for reversibility and the creation of new chemical bonds.', 'Have them perform a physical separation technique (like evaporation of sugar water to recover sugar crystals) to prove.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
