import type { SimDef } from '../../engine/types';

/** v3 generated — c6_chemistry_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_chemistry_ch04_p2: SimDef = {
    id: 'v3_c6_chemistry_ch04_p2',
    title: 'Materials: Properties and Reactions · Part 2/2',
    subtitle: 'Why is your bottle plastic and your window glass?',
    classLevel: 6, subject: 'chemistry', topic: 'Materials: Properties and Reactions · Part 2/2',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials detective sorting a jumbled storeroom', intro: 'A pile of objects — keys, chalk, cloth, glass, salt — all mixed up. Each one is hiding clues in its shine, hardness and see-through-ness.', goal: 'Group materials by their properties and explain why coloured glass is still transparent.' },
    discovery: {
        question: 'Your school bag is cloth, your bottle is plastic, your window is glass — yet nobody makes windows from cloth or bags from glass. What test is everyone secretly running?',
        options: ['They match the material\'s properties — hardness, flexibility, transparency — to the job it must do', 'They simply use whichever material is cheapest that day', 'It\'s pure tradition — bags have always been cloth', 'They pick whichever material is most colourful'],
        answer: 'They match the material\'s properties — hardness, flexibility, transparency — to the job it must do',
        hook: 'Every material has a \'personality\' — shine, hardness, see-through-ness. Choosing materials is really matchmaking between properties and purpose.',
    },
    teaching: [
        { title: 'Choosing the Right Material for the Right Purpose', text: 'Material selection is the process of choosing a substance to make an object based on its specific physical and chemical properties, such as hardness, transparency, solubility, or thermal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_chemistry_ch04_007', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Sort a messy storeroom of mystery objects — test each for shine, hardness, solubility and transparency — then decide what each is fit to become.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_007', title: 'Choosing the Right Material for the Right Purpose',
          caseStudy: { intro: 'Imagine you are trying to drink water from a sieve—would it work?',
            decisions: [{ prompt: 'Why do we prefer using metal for the base of a cooking pan instead of wood?', options: [
                { text: 'We use metal because it conducts heat efficiently, allowing the food to cook, whereas', outcome: 'We use metal because it conducts heat efficiently, allowing the food to cook, whereas wood is.' },
                { text: 'harder is always better', outcome: 'Not quite — Students often think "harder is always better." They might assume that because iron is harder than.', reveals: 'harder-is-always-better' },
                { text: '"harder is always better', outcome: 'Not quite — Students often think "harder is always better." They might assume that because iron is harder than.', reveals: 'harder-is-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_008', title: 'Metals vs Non-metals: Key Differences',
          caseStudy: { intro: 'Have you ever wondered why your kitchen spoons are made of stainless steel while your water bottle might be made of plastic?',
            decisions: [{ prompt: 'Name two physical properties that generally distinguish metals from non-metals.', options: [
                { text: 'Metals are typically lustrous (shiny) and good conductors of electricity, while', outcome: 'Metals are typically lustrous (shiny) and good conductors of electricity, while non-metals are.' },
                { text: 'because a material is shiny, it MUST be a metal', outcome: 'Not quite — Students often believe that because a material is shiny, it MUST be a metal.', reveals: 'because-a-material-is-shiny' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_009', title: 'Corrosion: Why Metals Degrade and How to Prevent It',
          caseStudy: { intro: 'Have you ever noticed how an old iron gate or a bicycle chain develops a reddish-brown, flaky layer after a rainy season?',
            decisions: [{ prompt: 'What is the specific name for the common process where iron turns into a reddish-brown, flaky substance when exposed to air and water?', options: [
                { text: 'The process is called rusting', outcome: 'The process is called rusting. A wrong answer (like "burning" or "melting") shows the student.' },
                { text: 'burning', outcome: 'Not quite — Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.', reveals: 'corrosion-is-just-dirt-or' },
                { text: 'melting', outcome: 'Not quite — Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.', reveals: 'corrosion-is-just-dirt-or' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_010', title: 'Materials in Our Daily Life: From Kitchen to Construction',
          caseStudy: { intro: 'Start by looking at the water bottle on your desk; why is it made of plastic rather than paper?',
            decisions: [{ prompt: 'What are the two requirements for something to be classified as "matter"?', options: [
                { text: 'To be matter, an object must occupy space (have volume) and possess mass', outcome: 'To be matter, an object must occupy space (have volume) and possess mass.' },
                { text: 'matter', outcome: 'Not quite — Students often think that "hardness" means "cannot be broken." They confuse hardness with strength.', reveals: 'hardness-means-cannot-be-broken' },
                { text: 'weight', outcome: 'Not quite — Students often think that "hardness" means "cannot be broken." They confuse hardness with strength.', reveals: 'hardness-means-cannot-be-broken' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting classroom objects for a \'properties of materials\' display, a student declares a rule: \'Anything hard is automatically opaque — you can tell both properties at once.\'',
            decisions: [{ prompt: 'Does one property really predict the other?', options: [
                { text: 'No — a glass pane or a diamond is hard yet transparent, and butter paper is soft but translucent. Hardness and transparency are independent properties, which is the whole point of classifying materials: each property must be tested on its own, and one tells you nothing about the other.', outcome: 'The glass counterexample breaks the rule instantly — materials are grouped by separate, measurable properties, and assuming they travel together misleads the sorting.' },
                { text: 'The student is right — hard things block light and soft things let it through, so the properties always agree.', outcome: 'Glass is the standing counterexample — hard enough to scratch many materials yet perfectly transparent, so the two properties clearly vary independently.', reveals: 'hard-equals-opaque' },
                { text: 'It is actually the reverse — transparent things are always hard and opaque things are always soft.', outcome: 'Neither pairing holds — rubber is opaque and soft, glass is transparent and hard; each property stands alone.', reveals: 'properties-always-linked' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_010', title: 'You made it',
          caseStudy: { intro: 'Glass for windows, cloth for bags — nothing is random. Once you can read a material\'s properties, every object in the room starts making sense.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_007', difficulty: 'standard',
          question: 'Material selection is the process of choosing a substance to make an object.',
          hint: 'Review the definitions of "opaque" and "transparent" in the "Materials Around Us" section.',
          misconception: 'Students often think "harder is always better." They might assume that because iron is harder than plastic, iron should.',
          parts: [
                { id: 'a', prompt: 'If you were asked to design a raincoat, would you choose cotton cloth or a thin plastic sheet? Why?', answer: 'You would choose plastic',
                  options: ['You would choose plastic', 'harder is always better', '"harder is always better'],
                  hint: 'Review the definitions of "opaque" and "transparent" in the "Materials Around Us" section.',
                  misconception: 'Students often think "harder is always better." They might assume that because iron is harder than plastic, iron should be used for.' },
                { id: 'b', prompt: 'You have a glass window, a wooden door, and a frosted glass screen. If you want to hide behind one of these so no one can see you, which do you pick and why?', answer: 'You pick the wooden door',
                  options: ['You pick the wooden door', 'harder is always better', '"harder is always better'],
                  hint: 'Review the definitions of "opaque" and "transparent" in the "Materials Around Us" section.',
                  misconception: 'Students often think "harder is always better." They might assume that because iron is harder than plastic, iron should be used for.' }
          ],
            remediations: { 'harder-is-always-better': { steps: ['Ask the student: "If you had a toy car made of solid iron, would it be easy to carry in your pocket?" 2.', 'Guide them to list properties: "It is hard, but it is also very heavy." 3.', 'Contrast this with plastic: "What property does plastic have that makes it better for a toy?" 4.', 'Emphasize that \'right\' means matching the material\'s specific traits to the user\'s needs.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "harder is always better." They might assume that because iron is harder than plastic, iron should.',
          parts: [
                { id: 'a', prompt: 'Is it appropriate to make a water-storage tank out of a porous clay pot that is not glazed? Why or why not?', answer: 'No, it is not appropriate',
                  options: ['No, it is not appropriate', 'harder is always better', '"harder is always better'],
                  hint: 'Review the definitions of "opaque" and "transparent" in the "Materials Around Us" section.',
                  misconception: 'Students often think "harder is always better." They might assume that because iron is harder than plastic, iron should be used for.' },
                { id: 'b', prompt: 'Create a list of three objects in your classroom and suggest one material change for each that would make them stop working correctly.', answer: 'Examples: 1',
                  options: ['Examples: 1', 'harder is always better', '"harder is always better'],
                  hint: 'Review the definitions of "opaque" and "transparent" in the "Materials Around Us" section.',
                  misconception: 'Students often think "harder is always better." They might assume that because iron is harder than plastic, iron should be used for.' }
          ],
            remediations: { 'harder-is-always-better': { steps: ['Ask the student: "If you had a toy car made of solid iron, would it be easy to carry in your pocket?" 2.', 'Guide them to list properties: "It is hard, but it is also very heavy." 3.', 'Contrast this with plastic: "What property does plastic have that makes it better for a toy?" 4.', 'Emphasize that \'right\' means matching the material\'s specific traits to the user\'s needs.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_008', difficulty: 'standard',
          question: 'Metals are elements typically characterized by a shiny (lustrous) appearance.',
          hint: 'Review the section on identifying materials by touch and sight in the "Materials Around.',
          misconception: 'Students often believe that because a material is shiny, it MUST be a metal.',
          parts: [
                { id: 'a', prompt: 'Name two physical properties that generally distinguish metals from non-metals.', answer: 'Metals are typically lustrous (shiny) and good conductors of electricity, while',
                  options: ['Metals are typically lustrous (shiny) and good conductors of electricity, while', 'because a material is shiny, it MUST be a metal'],
                  hint: 'Review the section on identifying materials by touch and sight in the "Materials Around Us" chapter.',
                  misconception: 'Students often believe that because a material is shiny, it MUST be a metal.' },
                { id: 'b', prompt: 'If you find a material that is dull and breaks easily when you hit it with a hammer, is it likely a metal or a non-metal?', answer: 'It is likely a non-metal',
                  options: ['It is likely a non-metal', 'because a material is shiny, it MUST be a metal'],
                  hint: 'Review the section on identifying materials by touch and sight in the "Materials Around Us" chapter.',
                  misconception: 'Students often believe that because a material is shiny, it MUST be a metal.' },
                { id: 'c', prompt: 'A piece of copper wire conducts electricity, but a piece of plastic tube does not. How does this help us categorize them?', answer: 'Copper is a metal',
                  options: ['Copper is a metal', 'conductor', 'because a material is shiny, it MUST be a metal'],
                  hint: 'Review the section on identifying materials by touch and sight in the "Materials Around Us" chapter.',
                  misconception: 'Students often believe that because a material is shiny, it MUST be a metal.' }
          ],
            remediations: { 'because-a-material-is-shiny': { steps: ['First, ask the student to touch the object and try to scratch it with their nail to check hardness.', 'Second, ask them to check if the object can complete an electrical circuit with a small bulb.', 'Explain that "lustre" is only one clue, and a true metal must pass the "hard" and "conductive" tests as well.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_009', difficulty: 'standard',
          question: 'Corrosion is the gradual, harmful chemical reaction of a metal surface with its.',
          hint: 'Review the section on "Lustrous appearance" in the textbook.',
          misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.',
          parts: [
                { id: 'a', prompt: 'What is the specific name for the common process where iron turns into a reddish-brown, flaky substance when exposed to air and water?', answer: 'The process is called rusting',
                  options: ['The process is called rusting', 'burning', 'melting', 'corrosion is just "dirt" or "dust" accumulating on the metal'],
                  hint: 'Review the section on "Lustrous appearance" in the textbook.',
                  misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.' },
                { id: 'b', prompt: 'You want to protect a new iron garden chair from the rain. If you have paint, a thin cloth, and a sponge, which would be the best choice and how would you.', answer: 'You should use paint',
                  options: ['You should use paint', 'corrosion is just "dirt" or "dust" accumulating on the metal'],
                  hint: 'Review the section on "Lustrous appearance" in the textbook.',
                  misconception: 'Students often believe that corrosion is just "dirt" or "dust" accumulating on the metal.' }
          ],
            remediations: { 'corrosion-is-just-dirt-or': { steps: ['First, ask the student to scratch the "rust" off a piece of old iron.', 'Point out that the metal underneath looks different or thinner, proving the surface has changed.', 'Explain that cleaning is not enough; the barrier (like paint) must be replaced to prevent the chemical reaction from.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_010', difficulty: 'standard',
          question: 'Matter is defined as anything that occupies space (having volume) and possesses.',
          hint: 'Review the definitions of "mass" and "volume" as measurements of matter.',
          misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.',
          parts: [
                { id: 'a', prompt: 'What are the two requirements for something to be classified as "matter"?', answer: 'To be matter, an object must occupy space (have volume) and possess mass',
                  options: ['To be matter, an object must occupy space (have volume) and possess mass', 'matter', 'weight', 'missing the complete scientific definition'],
                  hint: 'Review the definitions of "mass" and "volume" as measurements of matter.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' },
                { id: 'b', prompt: 'If you can see through a glass window clearly, but you cannot see through a wooden door, how would you classify these two materials?', answer: 'The glass is transparent, and the wood is opaque',
                  options: ['The glass is transparent, and the wood is opaque', 'hardness', 'cannot be broken', '"hardness" means "cannot be broken'],
                  hint: 'Review the definitions of "mass" and "volume" as measurements of matter.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' },
                { id: 'c', prompt: 'You have a sugar cube and a pebble. You place both in separate glasses of water and stir. What happens, and what property does this demonstrate?', answer: 'The sugar dissolves (soluble), while the pebble remains unchanged (insoluble)',
                  options: ['The sugar dissolves (soluble), while the pebble remains unchanged (insoluble)', 'hardness', 'cannot be broken', '"hardness" means "cannot be broken'],
                  hint: 'Review the definitions of "mass" and "volume" as measurements of matter.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' },
                { id: 'd', prompt: 'Compare a gold ring and a piece of coal. Why might we classify them differently based on appearance?', answer: 'The gold ring is lustrous (shiny), while the coal is non-lustrous (dull)',
                  options: ['The gold ring is lustrous (shiny), while the coal is non-lustrous (dull)', 'hardness', 'cannot be broken', '"hardness" means "cannot be broken'],
                  hint: 'Review the definitions of "mass" and "volume" as measurements of matter.',
                  misconception: 'Students often think that "hardness" means "cannot be broken." They confuse hardness with strength or durability.' }
          ],
            remediations: { 'hardness-means-cannot-be-broken': { steps: ['Ask the student to take a metal key and try to scratch a piece of wood, a piece of chalk, and a stone.', 'Explain that "hardness" specifically refers to the resistance of a material to being scratched or compressed, not how.', 'Repeat the test with an eraser versus a piece of wood to show that even if an object is solid, it has a relative level.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
