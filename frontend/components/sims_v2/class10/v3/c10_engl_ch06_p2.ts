import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch06_p2: SimDef = {
    id: 'v3_c10_engl_ch06_p2',
    title: 'Mijbil the Otter · Part 2/2',
    subtitle: 'Track an otter\'s zig-zag road from Iraqi marshes to a Scottish home',
    classLevel: 10, subject: 'engl', topic: 'Mijbil the Otter · Part 2/2',
    chapters: ['c10_engl_ch06'],
    nodeIds: ['c10_engl_cbse_06_007', 'c10_engl_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an animal behaviourist observing a wild otter indoors', intro: 'A remote cottage by the water, a man grieving his dog, and a parcel from Iraq containing something that would turn bathtubs into playgrounds.', goal: 'Trace Maxwell\'s decision-making and Mijbil\'s non-linear adaptation using concrete behavioural evidence.' },
    discovery: {
        question: 'After his dog Jonnie dies, Maxwell doesn\'t get another dog — he imports an otter from Iraq. A classmate says: \'He was lonely and otters are cute.\' What\'s missing from that reading?',
        options: ['A deliberate chain of reasoning — grief, rejecting a replacement dog, a childhood fascination, and a cottage ringed by water fit for an otter', 'Nothing — loneliness fully explains an impulse purchase', 'Money — only a rich man could order an otter', 'Luck — an otter happened to be available nearby'],
        answer: 'A deliberate chain of reasoning — grief, rejecting a replacement dog, a childhood fascination, and a cottage ringed by water fit for an otter',
        hook: 'Mijbil wasn\'t a whim; he was a decision with steps. And his settling in wasn\'t a straight line — joy one day, panic the next, like any wild thing learning a house.',
    },
    teaching: [
        { title: 'Character Analysis: Maxwell as a Patient and Observant Pet Owner', text: 'Character analysis of Maxwell in "Mijbil the Otter" involves examining how the narrator\'s actions, observations, and reflections reveal his patience and attentiveness as a pet owner, using textual.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart Mijbil\'s first days — the hiding, the bathroom experiments, the glorious chaos in water — and show why \'he adapted quickly\' only earns half the marks.',
        labels: ['Character Analysis: Maxwell as', 'Descriptive Writing: Mijbil\'s Habits'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_007', title: 'Character Analysis: Maxwell as a Patient and Observant Pet Owner',
          caseStudy: { intro: 'Imagine you are watching a friend try to teach a stray kitten to use a litter box — the friend doesn\'t yell when the kitten misses, just calmly cleans up and.',
            decisions: [{ prompt: 'What are the two main character traits of Maxwell emphasized in this node, and which chapter do they come from?', options: [
                { text: 'The two main traits are patience and observation, from the chapter "Mijbil the Otter" by', outcome: 'The two main traits are patience and observation, from the chapter "Mijbil the Otter" by Gavin.' },
                { text: 'Mijbil\'s traits like playfulness or curiosity', outcome: 'Not quite — Students often write: "Maxwell is patient because he loves Mijbil." This treats patience as.', reveals: 'students-often-write-maxwell-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_008', title: 'Descriptive Writing: Mijbil\'s Habits and the London Flat',
          caseStudy: { intro: 'Imagine you are a travel blogger describing a quirky pet\'s antics in a London apartment to your readers — you need to make them see the water splashing, hear.',
            decisions: [{ prompt: 'What is the primary purpose of using sensory details (sight, sound, touch, smell) in a descriptive paragraph about Mijbil\'s habits?', options: [
                { text: 'The primary purpose is to create a vivid mental image for the reader by appealing to the', outcome: 'The primary purpose is to create a vivid mental image for the reader by appealing to the senses.' },
                { text: 'description is about quantity of words rather than quality of sensory precision', outcome: 'Not quite — Students think descriptive writing means using many adjectives (e.g., \'beautiful, big, wet.', reveals: 'descriptive-writing-means-using-many' },
                { text: 'descriptive writing means using many adjectives (e', outcome: 'Not quite — Students think descriptive writing means using many adjectives (e.g., \'beautiful, big, wet.', reveals: 'descriptive-writing-means-using-many' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s beloved dog dies, and within a week he is browsing exotic-pet ads, saying he just wants \'something unusual to stop feeling sad.\' He asks whether he should order the most interesting animal he can find.',
            decisions: [{ prompt: 'What does Maxwell\'s story of getting Mijbil the otter suggest about doing this well?', options: [
                { text: 'A new animal can genuinely heal grief — Maxwell was \'too sad to think of another dog,\' and the otter filled that emptiness — but he chose a creature that suited his watery Camusfearna home and then learned its needs. Healing through a pet works when the choice fits the animal\'s nature and your life, not just your mood.', outcome: 'Maxwell\'s decision joined emotion with suitability: the otter thrived because the environment and the owner\'s commitment matched what an otter actually is.' },
                { text: 'He should buy whatever animal looks cutest right away — Maxwell\'s story proves replacing a pet quickly is always the best cure for grief.', outcome: 'Maxwell did not pick at random — the otter fit his surroundings and habits; an impulse purchase of an unsuited animal would harm both the pet and the grieving owner.', reveals: 'any-pet-heals-grief' },
                { text: 'He should never get another pet, since getting a new animal means betraying the one he lost.', outcome: 'The story treats the new companion as healing, not betrayal — Maxwell\'s love for Mijbil did not erase his dog; it gave his affection somewhere to go.', reveals: 'new-pet-is-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_008', title: 'You made it',
          caseStudy: { intro: 'A wild animal doesn\'t \'settle\'; it negotiates. Maxwell\'s patience and Mijbil\'s zig-zag trust are the real story of two species learning each other.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_007', difficulty: 'standard',
          question: 'Character analysis of Maxwell in "Mijbil the Otter" involves examining how the.',
          hint: 'If stuck, review c10_engl_cbse_06_003 (Mijbil\'s behaviors) and c10_engl_cbse_06_005.',
          misconception: 'Students often write: "Maxwell is patient because he loves Mijbil." This treats patience as a feeling rather than.',
          parts: [
                { id: 'a', prompt: 'Compare Maxwell\'s reaction to Mijbil\'s escape on the plane (c10_engl_cbse_06_005) with his reaction to Mijbil\'s first bath.', answer: 'On the plane, Maxwell acts quickly to retrieve Mijbil',
                  options: ['On the plane, Maxwell acts quickly to retrieve Mijbil', 'he was patient in both'],
                  hint: 'If stuck, review c10_engl_cbse_06_003 (Mijbil\'s behaviors) and c10_engl_cbse_06_005 (plane.',
                  misconception: 'Students often write: "Maxwell is patient because he loves Mijbil." This treats patience as a feeling rather than a demonstrated behavior.' }
          ],
            remediations: { 'students-often-write-maxwell-is': { steps: ['Have the student reread only the first 3 pages of the chapter and highlight every verb describing Maxwell\'s actions.', 'For each highlighted verb, ask: "What trait does this action show?" and write the trait beside it.', 'Convert each action-trait pair into a PEEL sentence.', 'Practice with a timer: 10 minutes to write two full PEEL paragraphs from the highlighted evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_008', difficulty: 'standard',
          question: 'Descriptive writing in this context is the skill of vividly portraying Mijbil\'s.',
          hint: 'If stuck, review the \'slosh and splash\', \'juggle\', \'gallop\' passages in the chapter and.',
          misconception: 'Students think descriptive writing means using many adjectives (e.g., \'beautiful, big, wet, funny\').',
          parts: [
                { id: 'a', prompt: 'Compare the descriptive effect of \'Mijbil played with a ball\' versus \'Mijbil juggled a ping-pong ball on his flat belly, clattering it against the suitcase.', answer: 'The second sentence is better',
                  options: ['The second sentence is better', 'descriptive writing means using many adjectives (e'],
                  hint: 'If stuck, review the \'slosh and splash\', \'juggle\', \'gallop\' passages in the chapter and list 10.',
                  misconception: 'Students think descriptive writing means using many adjectives (e.g., \'beautiful, big, wet, funny\').' }
          ],
            remediations: { 'descriptive-writing-means-using-many': { steps: ['Ask the student to underline every verb and noun in a 5-line extract about Mijbil\'s water play.', 'Have them replace each with a more precise word from the text (e.g., \'play\' → \'slosh and splash\').', 'Guide them to rewrite one sentence using only those precise words, no adjectives.', 'Compare the original and revised sentences side-by-side to prove that verbs/nouns carry descriptive weight.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
