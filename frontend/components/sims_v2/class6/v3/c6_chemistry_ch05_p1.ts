import type { SimDef } from '../../engine/types';

/** v3 generated — c6_chemistry_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_chemistry_ch05_p1: SimDef = {
    id: 'v3_c6_chemistry_ch05_p1',
    title: 'Changes Around Us: Physical and Chemical · Part 1/2',
    subtitle: 'Same stuff in disguise, or brand-new substance?',
    classLevel: 6, subject: 'chemistry', topic: 'Changes Around Us: Physical and Chemical · Part 1/2',
    chapters: ['c6_chemistry_ch05'],
    nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a change detective in a kitchen full of mysteries', intro: 'Ice melting, chalk crushed to powder, a nail going orange with rust — your job is to decide which changes only dressed matter up and which truly transformed it.', goal: 'Separate physical from chemical changes using the one question that matters: did a new substance appear?' },
    discovery: {
        question: 'You crumple a sheet of paper — still paper. You burn it — it becomes ash and smoke, and no amount of unfolding brings it back. What did the fire do that your hands couldn\'t?',
        options: ['It created entirely new substances — a chemical change; crumpling only changed the shape', 'It made a bigger mess — drastic changes are always chemical', 'Fire is hot, and hot changes are chemical while cold changes are physical', 'Nothing — ash is just paper in a different shape'],
        answer: 'It created entirely new substances — a chemical change; crumpling only changed the shape',
        hook: 'Physical changes can be drastic and permanent — a glass shattered forever is still glass. The real question isn\'t \'can it change back?\' but \'did something NEW appear?\'',
    },
    teaching: [
        { title: 'Physical Changes: What Changes and What Stays the Same', text: 'A physical change is a change in the form, shape, size, or state of a substance where no new material is created. The original substance remains the same, even though it may look different.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_chemistry_ch05_001', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Run a change-detective lab: sort melting ice, torn paper, rusting nails and burnt toast into \'same stuff\' vs \'new stuff\' — and defend every call.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_001', title: 'Physical Changes: What Changes and What Stays the Same',
          caseStudy: { intro: 'Imagine you have a crisp, clean sheet of paper. If you crumple it into a ball or tear it into tiny confetti pieces, has the paper suddenly turned into wood.',
            decisions: [{ prompt: 'If you stretch a rubber band, is it still a rubber band?', options: [
                { text: 'Yes, it is still a rubber band', outcome: 'Yes, it is still a rubber band. A wrong answer suggests the student confuses "shape change" with.' },
                { text: 'shape change', outcome: 'Not quite — Students often believe that if a change is "permanent" or "drastic" (like breaking an object),.', reveals: 'if-a-change-is-permanent' },
                { text: 'substance change', outcome: 'Not quite — Students often believe that if a change is "permanent" or "drastic" (like breaking an object),.', reveals: 'if-a-change-is-permanent' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_002', title: 'Chemical Changes: New Substances Are Born',
          caseStudy: { intro: 'Have you ever wondered why a piece of paper turns into ash when it burns, but simply turns into smaller pieces when you rip it?',
            decisions: [{ prompt: 'What is the most important sign that a chemical change has occurred?', options: [
                { text: 'The formation of a new substance with different properties is the key sign', outcome: 'The formation of a new substance with different properties is the key sign.' },
                { text: 'a change in shape', outcome: 'Not quite — Students often believe that any change in appearance (like color) or any change involving heat is.', reveals: 'any-change-in-appearance-like' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_003', title: 'Rusting as a Chemical Change: Understanding the Process',
          caseStudy: { intro: 'Have you ever noticed how the iron gate in your garden or a bicycle left in the rain turns a reddish-brown color over time?',
            decisions: [{ prompt: 'What are the two specific substances present in the environment that must react with iron to cause rusting?', options: [
                { text: 'The two substances are oxygen (from air) and water (from moisture)', outcome: 'The two substances are oxygen (from air) and water (from moisture).' },
                { text: 'stains', outcome: 'Not quite — Students often believe that rusting is just "dirt" or "stains" that can be wiped off, or that it.', reveals: 'rusting-is-just-dirt-or' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_004', title: 'Combustion: Burning and Its Characteristics',
          caseStudy: { intro: 'Have you ever wondered why a candle flame glows or why a wood fire keeps us warm on a winter night?',
            decisions: [{ prompt: 'What are the two forms of energy released during the process of combustion?', options: [
                { text: 'The two forms of energy released are heat and light', outcome: 'The two forms of energy released are heat and light. A wrong answer here suggests the student.' },
                { text: 'combustion is merely "fire," rather than a chemical reaction involving oxygen', outcome: 'Not quite — Students often believe that combustion is merely "fire," rather than a chemical reaction involving.', reveals: 'combustion-is-merely-fire' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_005', title: 'Can Changes Be Reversed? Reversible vs Irreversible',
          caseStudy: { intro: 'Have you ever wondered why you can turn ice back into water, but you can’t turn a cooked omelet back into a raw egg?',
            decisions: [{ prompt: 'Is freezing water into ice a reversible or an irreversible change?', options: [
                { text: 'It is a reversible change', outcome: 'It is a reversible change. A wrong answer suggests the student confuses "hardened" states (like.' },
                { text: 'hardened', outcome: 'Not quite — Students often think that if a change involves physical force (like tearing or breaking), it.', reveals: 'if-a-change-involves-physical' },
                { text: 'physical', outcome: 'Not quite — Students often think that if a change involves physical force (like tearing or breaking), it.', reveals: 'if-a-change-involves-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a bonfire, a student insists that the burning paper is only a physical change: \'Look, the paper is still there — it just became smaller grey ash.\' His friend is asked to check the claim.',
            decisions: [{ prompt: 'Is burning paper a physical or chemical change?', options: [
                { text: 'Chemical — the paper did not just get smaller; it turned into new substances (ash, smoke and gases) that cannot be gathered up and turned back into paper. Compare grinding chalk: the powder is still chalk, so that is physical even though you cannot rebuild the stick. The test is whether a new substance formed, not whether something remains.', outcome: 'The \'still there\' argument fails because what remains is no longer paper — irreversibility and a new material are the marks of a chemical change.' },
                { text: 'The student is right — as long as some material survives, the change is physical.', outcome: 'Survival of material is not the test — ash is a different substance from paper, and the change cannot be undone, which makes it chemical.', reveals: 'still-there-is-physical' },
                { text: 'It is physical because fire only makes things smaller, like cutting or tearing.', outcome: 'Burning is not cutting — it rearranges the paper\'s substance into gases and ash; no amount of reassembling gives back paper.', reveals: 'burning-is-cutting' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The shape can shatter, melt or shrink — but if no new substance appears, it\'s the same old stuff in disguise. New material means a chemical story.',
            decisions: [{ prompt: 'What comes next? Changes Around Us: Physical and Chemical · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Changes Around Us: Physical and Chemical · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_001', difficulty: 'standard',
          question: 'A physical change is a change in the form, shape, size, or state of a substance.',
          hint: 'Review the properties of solids and liquids from the chapter on matter.',
          misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.',
          parts: [
                { id: 'a', prompt: 'If you stretch a rubber band, is it still a rubber band?', answer: 'Yes, it is still a rubber band',
                  options: ['Yes, it is still a rubber band', 'shape change', 'substance change', 'permanent'],
                  hint: 'Review the properties of solids and liquids from the chapter on matter.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' },
                { id: 'b', prompt: 'When you dissolve salt in water, does the salt disappear and become a new substance, or does it stay as salt?', answer: 'The salt stays as salt, it just changes its state (by mixing/dissolving)',
                  options: ['The salt stays as salt, it just changes its state (by mixing/dissolving)', 'permanent', 'drastic'],
                  hint: 'Review the properties of solids and liquids from the chapter on matter.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' }
          ],
            remediations: { 'if-a-change-is-permanent': { steps: ['Ask the student to name the material before and after the change (e.g., "Glass before, glass after").', 'Remind them that a physical change is about the *identity* of the stuff, not whether it is easy to put back together.', 'Use the example of a jigsaw puzzle: cutting the picture into pieces is a physical change because it is still the same.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.',
          parts: [
                { id: 'a', prompt: 'If a boy breaks a glass bottle, is this a physical change? Justify your answer.', answer: 'Yes, it is a physical change',
                  options: ['Yes, it is a physical change', 'destruction', 'damage', 'chemical change'],
                  hint: 'Review the properties of solids and liquids from the chapter on matter.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' },
                { id: 'b', prompt: 'Think of a real-world object in your kitchen. Describe how you could perform a physical change on it.', answer: 'An example would be crushing a dry biscuit into crumbs',
                  options: ['An example would be crushing a dry biscuit into crumbs', 'permanent', 'drastic'],
                  hint: 'Review the properties of solids and liquids from the chapter on matter.',
                  misconception: 'Students often believe that if a change is "permanent" or "drastic" (like breaking an object), it cannot be physical.' }
          ],
            remediations: { 'if-a-change-is-permanent': { steps: ['Ask the student to name the material before and after the change (e.g., "Glass before, glass after").', 'Remind them that a physical change is about the *identity* of the stuff, not whether it is easy to put back together.', 'Use the example of a jigsaw puzzle: cutting the picture into pieces is a physical change because it is still the same.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_002', difficulty: 'standard',
          question: 'A chemical change is a process in which one or more substances undergo.',
          hint: 'Review the properties of matter (solid, liquid, gas) and physical changes.',
          misconception: 'Students often believe that any change in appearance (like color) or any change involving heat is a chemical change.',
          parts: [
                { id: 'a', prompt: 'What is the most important sign that a chemical change has occurred?', answer: 'The formation of a new substance with different properties is the key sign',
                  options: ['The formation of a new substance with different properties is the key sign', 'a change in shape'],
                  hint: 'Review the properties of matter (solid, liquid, gas) and physical changes.',
                  misconception: 'Students often believe that any change in appearance (like color) or any change involving heat is a chemical change.' }
          ],
            remediations: { 'any-change-in-appearance-like': { steps: ['Ask the student: "If you change the shape or state of an object, can you get the original back?" Explain that if the.', 'If the answer is \'no\' (like burnt paper), it is chemical because the identity of the material has changed forever.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_003', difficulty: 'standard',
          question: 'Rusting is a chemical change where iron reacts with oxygen and moisture from.',
          hint: 'Review the definitions of physical properties like magnetism, hardness, and color.',
          misconception: 'Students often believe that rusting is just "dirt" or "stains" that can be wiped off, or that it is a physical change.',
          parts: [
                { id: 'a', prompt: 'What are the two specific substances present in the environment that must react with iron to cause rusting?', answer: 'The two substances are oxygen (from air) and water (from moisture)',
                  options: ['The two substances are oxygen (from air) and water (from moisture)', 'stains'],
                  hint: 'Review the definitions of physical properties like magnetism, hardness, and color.',
                  misconception: 'Students often believe that rusting is just "dirt" or "stains" that can be wiped off, or that it is a physical change like melting ice.' },
                { id: 'b', prompt: 'Why is the formation of rust considered a "chemical change" rather than a "physical change"?', answer: 'It is a chemical change',
                  options: ['It is a chemical change', 'stains'],
                  hint: 'Review the definitions of physical properties like magnetism, hardness, and color.',
                  misconception: 'Students often believe that rusting is just "dirt" or "stains" that can be wiped off, or that it is a physical change like melting ice.' },
                { id: 'c', prompt: 'If you have a block of pure iron and it turns into rust, what happens to its ability to stick to a magnet?', answer: 'The block will lose its ability to stick to a magnet',
                  options: ['The block will lose its ability to stick to a magnet', 'stains'],
                  hint: 'Review the definitions of physical properties like magnetism, hardness, and color.',
                  misconception: 'Students often believe that rusting is just "dirt" or "stains" that can be wiped off, or that it is a physical change like melting ice.' },
                { id: 'd', prompt: 'Compare the physical appearance of iron and rust.', answer: 'Iron is grey, hard, and strong, whereas rust is reddish-brown, brittle, and weak',
                  options: ['Iron is grey, hard, and strong, whereas rust is reddish-brown, brittle, and weak', 'stains'],
                  hint: 'Review the definitions of physical properties like magnetism, hardness, and color.',
                  misconception: 'Students often believe that rusting is just "dirt" or "stains" that can be wiped off, or that it is a physical change like melting ice.' }
          ],
            remediations: { 'rusting-is-just-dirt-or': { steps: ['First, show the student a magnet attracting a clean iron nail but failing to attract a heavily rusted one.', 'Second, ask them to scrape the rust off—point out that the metal beneath is thinner, proving the iron was consumed.', 'Explain that because the iron disappeared to become something else, it is a permanent chemical change.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_004', difficulty: 'standard',
          question: 'Combustion is a chemical change where a substance reacts rapidly with oxygen.',
          hint: 'Review the properties of chemical changes (new substances formed).',
          misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.',
          parts: [
                { id: 'a', prompt: 'What are the two forms of energy released during the process of combustion?', answer: 'The two forms of energy released are heat and light',
                  options: ['The two forms of energy released are heat and light', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Review the properties of chemical changes (new substances formed).',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' },
                { id: 'b', prompt: 'If you cover a burning candle with a glass jar, the flame eventually goes out. Why does this happen?', answer: 'The flame goes out',
                  options: ['The flame goes out', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Review the properties of chemical changes (new substances formed).',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' },
                { id: 'c', prompt: 'Compare the burning of a candle to the melting of an ice cube; which one is a chemical change and why?', answer: 'Burning a candle is a chemical change',
                  options: ['Burning a candle is a chemical change', 'combustion is merely "fire," rather than a chemical reaction involving oxygen'],
                  hint: 'Review the properties of chemical changes (new substances formed).',
                  misconception: 'Students often believe that combustion is merely "fire," rather than a chemical reaction involving oxygen.' }
          ],
            remediations: { 'combustion-is-merely-fire': { steps: ['First, explain that in chemistry, "matter is never destroyed, only transformed." Use the candle example: point out that.', 'Ask the student: "If the wax just vanished, where did the energy come from?" Guide them to see that the change is the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_005', difficulty: 'standard',
          question: 'A reversible change is one that can be undone to restore the original.',
          hint: 'Review "Changes Around Us" to categorize objects by their physical state.',
          misconception: 'Students often think that if a change involves physical force (like tearing or breaking), it is "physical" and.',
          parts: [
                { id: 'a', prompt: 'Is freezing water into ice a reversible or an irreversible change?', answer: 'It is a reversible change',
                  options: ['It is a reversible change', 'hardened', 'physical', 'reversible'],
                  hint: 'Review "Changes Around Us" to categorize objects by their physical state.',
                  misconception: 'Students often think that if a change involves physical force (like tearing or breaking), it is "physical" and therefore "reversible." They.' },
                { id: 'b', prompt: 'If you bake a clay pot in a kiln, why is it considered an irreversible change?', answer: 'It is irreversible',
                  options: ['It is irreversible', 'new substance', 'permanent state', 'physical'],
                  hint: 'Review "Changes Around Us" to categorize objects by their physical state.',
                  misconception: 'Students often think that if a change involves physical force (like tearing or breaking), it is "physical" and therefore "reversible." They.' },
                { id: 'c', prompt: 'A rubber band is stretched and then released. Why is this a reversible change?', answer: 'It is reversible',
                  options: ['It is reversible', 'physical', 'reversible', 'any change in shape (even temporary) is irreversible'],
                  hint: 'Review "Changes Around Us" to categorize objects by their physical state.',
                  misconception: 'Students often think that if a change involves physical force (like tearing or breaking), it is "physical" and therefore "reversible." They.' },
                { id: 'd', prompt: 'Compare burning a candle to melting a candle. Which is reversible, and which is not?', answer: 'Melting is reversible (you can collect and re-freeze the wax), but burning is',
                  options: ['Melting is reversible (you can collect and re-freeze the wax), but burning is', 'physical', 'reversible'],
                  hint: 'Review "Changes Around Us" to categorize objects by their physical state.',
                  misconception: 'Students often think that if a change involves physical force (like tearing or breaking), it is "physical" and therefore "reversible." They.' }
          ],
            remediations: { 'if-a-change-involves-physical': { steps: ['Ask the student to perform a "reversibility test" on a piece of paper.', 'First, fold it (reversible) and have them unfold it.', 'Then, tear it (irreversible) and ask them to try to tape it back perfectly.', 'Point out that while the *material* is the same, the *original object* has been permanently altered, which is the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_006', difficulty: 'standard',
          question: 'A temporary change is a process that alters an object\'s state or appearance.',
          hint: 'Review basic states of matter (Solid, Liquid, Gas) to see how temperature affects them.',
          misconception: 'Students often mistake "easy to undo" with "temporary." For example, they might think cutting paper is temporary.',
          parts: [
                { id: 'a', prompt: 'If you paint a wooden toy red, is the change temporary or permanent? Why?', answer: 'It is permanent because the paint stays on the wood even after you stop painting',
                  options: ['It is permanent because the paint stays on the wood even after you stop painting', 'temporary'],
                  hint: 'Review basic states of matter (Solid, Liquid, Gas) to see how temperature affects them.',
                  misconception: 'Students often mistake "easy to undo" with "temporary." For example, they might think cutting paper is temporary because you can use tape.' }
          ],
            remediations: { 'students-often-mistake-easy-to': { steps: ['Ask the student to compare "crumpling a piece of paper" (which is difficult to perfectly reverse) with "melting an ice.', 'Emphasize that "temporary" means it disappears when the condition is removed, not that you can physically "fix" the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
