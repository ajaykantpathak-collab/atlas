import type { SimDef } from '../../engine/types';

/** v3 generated — c6_chemistry_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_chemistry_ch05_p2: SimDef = {
    id: 'v3_c6_chemistry_ch05_p2',
    title: 'Changes Around Us: Physical and Chemical · Part 2/2',
    subtitle: 'Same stuff in disguise, or brand-new substance?',
    classLevel: 6, subject: 'chemistry', topic: 'Changes Around Us: Physical and Chemical · Part 2/2',
    chapters: ['c6_chemistry_ch05'],
    nodeIds: ['c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_001', 'c6_chemistry_ch05_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a change detective in a kitchen full of mysteries', intro: 'Ice melting, chalk crushed to powder, a nail going orange with rust — your job is to decide which changes only dressed matter up and which truly transformed it.', goal: 'Separate physical from chemical changes using the one question that matters: did a new substance appear?' },
    discovery: {
        question: 'You crumple a sheet of paper — still paper. You burn it — it becomes ash and smoke, and no amount of unfolding brings it back. What did the fire do that your hands couldn\'t?',
        options: ['It created entirely new substances — a chemical change; crumpling only changed the shape', 'It made a bigger mess — drastic changes are always chemical', 'Fire is hot, and hot changes are chemical while cold changes are physical', 'Nothing — ash is just paper in a different shape'],
        answer: 'It created entirely new substances — a chemical change; crumpling only changed the shape',
        hook: 'Physical changes can be drastic and permanent — a glass shattered forever is still glass. The real question isn\'t \'can it change back?\' but \'did something NEW appear?\'',
    },
    teaching: [
        { title: 'Are All Changes Desirable? Good and Bad Changes', text: 'A change is considered "desirable" if it provides a benefit or fulfills a human need, while an "undesirable" change is one that causes harm, waste, or unwanted outcomes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_chemistry_ch05_007', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Run a change-detective lab: sort melting ice, torn paper, rusting nails and burnt toast into \'same stuff\' vs \'new stuff\' — and defend every call.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_007', title: 'Are All Changes Desirable? Good and Bad Changes',
          caseStudy: { intro: 'Have you ever noticed that while you love the smell of a fresh, juicy mango, you feel sad when that same mango sits on the counter too long and becomes squishy.',
            decisions: [{ prompt: 'What is the main difference between a desirable change and an undesirable change?', options: [
                { text: 'A desirable change is one that is useful or beneficial to us, while an undesirable change', outcome: 'A desirable change is one that is useful or beneficial to us, while an undesirable change is one.' },
                { text: '"fast" changes are desirable and "slow" changes are undesirable', outcome: 'Not quite — Students often think "fast" changes are desirable and "slow" changes are undesirable.', reveals: 'fast-changes-are-desirable-and' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_008', title: 'Slow Natural Changes: Weathering, Erosion, Rusting',
          caseStudy: { intro: 'Have you ever wondered why old iron gates turn reddish-brown or why mountain surfaces look rough and crumbly?',
            decisions: [{ prompt: 'Name two examples of natural changes that happen very slowly.', options: [
                { text: 'Weathering and rusting are examples', outcome: 'Weathering and rusting are examples. A wrong answer (like "burning paper") confuses chemical.' },
                { text: 'burning paper', outcome: 'Not quite — Students often think that because a change is "natural," it must be happening quickly (like.', reveals: 'because-a-change-is-natural' },
                { text: 'natural', outcome: 'Not quite — Students often think that because a change is "natural," it must be happening quickly (like.', reveals: 'because-a-change-is-natural' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_009', title: 'Distinguishing Physical from Chemical Changes: A Practical Guide',
          caseStudy: { intro: 'Have you ever wondered why water turns into ice but paper turns into ash when burnt?',
            decisions: [{ prompt: 'What is the primary difference between a physical change and a chemical change regarding the substance involved?', options: [
                { text: 'In a physical change, the original substance remains the same, while in a chemical', outcome: 'In a physical change, the original substance remains the same, while in a chemical change, a new.' },
                { text: 'they are just different types of changes', outcome: 'Not quite — Students often confuse "change in state" with "chemical change." For example, they might think.', reveals: 'students-often-confuse-change-in' },
                { text: 'change in state', outcome: 'Not quite — Students often confuse "change in state" with "chemical change." For example, they might think.', reveals: 'students-often-confuse-change-in' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_010', title: 'Changes in Food: Cooking, Spoilage, and Preservation',
          caseStudy: { intro: 'Have you ever noticed how a fresh piece of bread turns moldy after a few days, or how a raw egg changes completely when you fry it?',
            decisions: [{ prompt: 'What is the difference between a physical change and a chemical change in food?', options: [
                { text: 'A physical change alters the state or shape of food without changing its identity, while', outcome: 'A physical change alters the state or shape of food without changing its identity, while a chemical.' },
                { text: 'cooking', outcome: 'Not quite — Students often think that "cooking" is only a physical change because the food just gets "softer".', reveals: 'cooking-is-only-a-physical' },
                { text: 'softer', outcome: 'Not quite — Students often think that "cooking" is only a physical change because the food just gets "softer".', reveals: 'cooking-is-only-a-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a bonfire, a student insists that the burning paper is only a physical change: \'Look, the paper is still there — it just became smaller grey ash.\' His friend is asked to check the claim.',
            decisions: [{ prompt: 'Is burning paper a physical or chemical change?', options: [
                { text: 'Chemical — the paper did not just get smaller; it turned into new substances (ash, smoke and gases) that cannot be gathered up and turned back into paper. Compare grinding chalk: the powder is still chalk, so that is physical even though you cannot rebuild the stick. The test is whether a new substance formed, not whether something remains.', outcome: 'The \'still there\' argument fails because what remains is no longer paper — irreversibility and a new material are the marks of a chemical change.' },
                { text: 'The student is right — as long as some material survives, the change is physical.', outcome: 'Survival of material is not the test — ash is a different substance from paper, and the change cannot be undone, which makes it chemical.', reveals: 'still-there-is-physical' },
                { text: 'It is physical because fire only makes things smaller, like cutting or tearing.', outcome: 'Burning is not cutting — it rearranges the paper\'s substance into gases and ash; no amount of reassembling gives back paper.', reveals: 'burning-is-cutting' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_010', title: 'You made it',
          caseStudy: { intro: 'The shape can shatter, melt or shrink — but if no new substance appears, it\'s the same old stuff in disguise. New material means a chemical story.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_007', difficulty: 'standard',
          question: 'A change is considered "desirable" if it provides a benefit or fulfills a human.',
          hint: 'Review the definitions of physical and chemical changes in the textbook.',
          misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.',
          parts: [
                { id: 'a', prompt: 'Is the rusting of a bicycle chain a desirable or undesirable change? Why?', answer: 'It is an undesirable change',
                  options: ['It is an undesirable change', 'desirable', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Review the definitions of physical and chemical changes in the textbook.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' },
                { id: 'b', prompt: 'If a bowl of milk is left in the sun on a hot day and turns into sour curd, how would you classify this?', answer: 'It depends on the intent',
                  options: ['It depends on the intent', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Review the definitions of physical and chemical changes in the textbook.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' }
          ],
            remediations: { 'fast-changes-are-desirable-and': { steps: ['Ask the student to list three changes: one they like, one they dislike, and one that is neutral.', 'Then, ask them to write one sentence for each explaining *why* it helps or hurts them.', 'This separates the speed of the change from its impact.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.',
          parts: [
                { id: 'a', prompt: 'Can a change be both desirable and undesirable at the same time? Defend your answer.', answer: 'Yes, it can be, depending on who is affected',
                  options: ['Yes, it can be, depending on who is affected', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Review the definitions of physical and chemical changes in the textbook.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' },
                { id: 'b', prompt: 'Think of a change that happens in your kitchen. Explain why it is desirable and what might happen if we couldn\'t control it.', answer: 'A good answer would be "cooking food." It is desirable',
                  options: ['A good answer would be "cooking food." It is desirable', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Review the definitions of physical and chemical changes in the textbook.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' }
          ],
            remediations: { 'fast-changes-are-desirable-and': { steps: ['Ask the student to list three changes: one they like, one they dislike, and one that is neutral.', 'Then, ask them to write one sentence for each explaining *why* it helps or hurts them.', 'This separates the speed of the change from its impact.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_008', difficulty: 'standard',
          question: 'Slow natural changes are gradual transformations in the environment, such.',
          hint: 'Review the definitions of "Physical" and "Chemical" changes.',
          misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t.',
          parts: [
                { id: 'a', prompt: 'Name two examples of natural changes that happen very slowly.', answer: 'Weathering and rusting are examples',
                  options: ['Weathering and rusting are examples', 'burning paper', 'natural', 'change'],
                  hint: 'Review the definitions of "Physical" and "Chemical" changes.',
                  misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a "change" at all.' },
                { id: 'b', prompt: 'If you see a statue change color after ten years, why is this called a "slow change"?', answer: 'It is slow because the change is not visible in a single moment or day',
                  options: ['It is slow because the change is not visible in a single moment or day', 'natural', 'change'],
                  hint: 'Review the definitions of "Physical" and "Chemical" changes.',
                  misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a "change" at all.' },
                { id: 'c', prompt: 'Compare rusting to the movement of a swing. Which one is a "slow change" and why?', answer: 'Rusting is a slow change',
                  options: ['Rusting is a slow change', 'motion', 'material change', 'natural'],
                  hint: 'Review the definitions of "Physical" and "Chemical" changes.',
                  misconception: 'Students often think that because a change is "natural," it must be happening quickly (like a storm) or that it isn\'t a "change" at all.' }
          ],
            remediations: { 'because-a-change-is-natural': { steps: ['Ask the student to watch a piece of iron wool left in a damp place for three days.', 'Point out the color change on Day 1, Day 2, and Day 3.', 'Explain that "slow" just means it requires more time to become visible, not that it isn\'t happening.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_009', difficulty: 'standard',
          question: 'A physical change alters the state or appearance of a substance without.',
          hint: 'Review the definitions of pure substances and properties like mass and state.',
          misconception: 'Students often confuse "change in state" with "chemical change." For example, they might think melting wax is chemical.',
          parts: [
                { id: 'a', prompt: 'If you tear a piece of paper into small bits, why is it considered a physical change?', answer: 'It is physical because the paper remains paper',
                  options: ['It is physical because the paper remains paper', 'looks different', 'change in state', 'chemical change'],
                  hint: 'Review the definitions of pure substances and properties like mass and state.',
                  misconception: 'Students often confuse "change in state" with "chemical change." For example, they might think melting wax is chemical because the shape.' },
                { id: 'b', prompt: 'You add sugar to water and it disappears. Is this a physical or chemical change? Justify your answer.', answer: 'This is a physical change',
                  options: ['This is a physical change', 'change in state', 'chemical change', 'melting wax is chemical'],
                  hint: 'Review the definitions of pure substances and properties like mass and state.',
                  misconception: 'Students often confuse "change in state" with "chemical change." For example, they might think melting wax is chemical because the shape.' },
                { id: 'c', prompt: 'Why is the rusting of an iron nail classified as a chemical change?', answer: 'Rusting is chemical',
                  options: ['Rusting is chemical', 'change in state', 'chemical change', 'melting wax is chemical'],
                  hint: 'Review the definitions of pure substances and properties like mass and state.',
                  misconception: 'Students often confuse "change in state" with "chemical change." For example, they might think melting wax is chemical because the shape.' }
          ],
            remediations: { 'students-often-confuse-change-in': { steps: ['Ask the student: "If you melt this wax, can you freeze it back into a candle?" When they say yes, explain: "Since you.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_010', difficulty: 'standard',
          question: 'Cooking, spoilage, and preservation are processes that involve changes in food.',
          hint: 'Review the definitions of physical and chemical changes in the context of common.',
          misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They.',
          parts: [
                { id: 'a', prompt: 'If milk turns into yogurt (curd), is this a physical or chemical change? Explain why.', answer: 'It is a chemical change',
                  options: ['It is a chemical change', 'white and soft', 'cooking', 'softer'],
                  hint: 'Review the definitions of physical and chemical changes in the context of common household.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' },
                { id: 'b', prompt: 'You have cooked rice. If you leave it on the counter for two days, it spoils. Is this spoilage a physical or chemical change? Why?', answer: 'It is a chemical change',
                  options: ['It is a chemical change', 'cooking', 'softer', 'warmer'],
                  hint: 'Review the definitions of physical and chemical changes in the context of common household.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' },
                { id: 'c', prompt: 'Why do we put pickles or jams in jars and seal them tightly?', answer: 'We seal them to stop air and microbes from entering',
                  options: ['We seal them to stop air and microbes from entering', 'cooking', 'softer', 'warmer'],
                  hint: 'Review the definitions of physical and chemical changes in the context of common household.',
                  misconception: 'Students often think that "cooking" is only a physical change because the food just gets "softer" or "warmer." They ignore that heat causes.' }
          ],
            remediations: { 'cooking-is-only-a-physical': { steps: ['Ask the student: "If you take a piece of raw dough and bake it into bread, can you turn the bread back into dough.', 'Then, ask them to list one change they can reverse (like freezing water) and one they cannot (like burning toast).'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
