import type { SimDef } from '../../engine/types';

/** v3 generated — c6_economics_ch07 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_economics_ch07: SimDef = {
    id: 'v3_c6_economics_ch07',
    title: 'Infrastructure and Development',
    subtitle: 'Why do perfect strawberries still rot on a broken road?',
    classLevel: 6, subject: 'economics', topic: 'Infrastructure and Development',
    chapters: ['c6_economics_ch07'],
    nodeIds: ['c6_economics_ch07_001', 'c6_economics_ch07_002', 'c6_economics_ch07_003', 'c6_economics_ch07_004', 'c6_economics_ch07_005', 'c6_economics_ch07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planner deciding where a village\'s first road goes', intro: 'Ripe strawberries, a broken road, no fridge, no buyers. The village has everything except the invisible skeleton every economy stands on.', goal: 'Distinguish infrastructure (the foundation) from tools (the machines) — and see who benefits when a bridge appears.' },
    discovery: {
        question: 'A farmer grows perfect strawberries, but the road to the city is broken and there\'s no electricity for a fridge. The berries are excellent — so why will they still rot unsold?',
        options: ['Great products need roads, power and water to reach buyers — the \'backbone\' beneath every business', 'The farmer should simply grow cheaper berries', 'Strawberries rot anyway — location and roads never matter', 'The only thing missing is a better picking machine'],
        answer: 'Great products need roads, power and water to reach buyers — the \'backbone\' beneath every business',
        hook: 'A factory\'s loom isn\'t infrastructure — the electricity feeding it is. Infrastructure is the invisible foundation under everything an economy builds on top.',
    },
    teaching: [
        { title: 'What is Infrastructure and Why It Matters', text: 'Infrastructure refers to the essential physical structures and service systems—such as roads, power plants, and schools—that enable a society to function and economic activities to take place.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_economics_ch07_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Rebuild a struggling village\'s foundation — choose where the first road, power line and school go — then watch which sectors spring to life.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c6_economics_ch07_001', title: 'What is Infrastructure and Why It Matters',
          caseStudy: { intro: 'Imagine you are trying to sell fresh strawberries from a farm in a remote village, but the road to the nearest city is broken and there is no electricity.',
            decisions: [{ prompt: 'List three examples of infrastructure from your daily life.', options: [
                { text: 'Roads, schools, and electricity supply', outcome: 'Roads, schools, and electricity supply. A wrong answer (like "a tractor" or "a book") reveals the.' },
                { text: 'a tractor', outcome: 'Not quite — Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom.', reveals: 'students-often-confuse-infrastructure-with' },
                { text: 'a book', outcome: 'Not quite — Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom.', reveals: 'students-often-confuse-infrastructure-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_002', title: 'Physical Infrastructure: Roads, Bridges, Power, Water',
          caseStudy: { intro: 'Have you ever noticed how your morning glass of milk arrives at your house?',
            decisions: [{ prompt: 'What are two examples of physical infrastructure mentioned in the text that help transport goods?', options: [
                { text: 'Roads and bridges are two examples', outcome: 'Roads and bridges are two examples. If a student only lists "factories," they are confusing.' },
                { text: 'factories', outcome: 'Not quite — Students often think infrastructure is only for "big cities" or "governments" and does not apply.', reveals: 'infrastructure-is-only-for-big' },
                { text: 'big cities', outcome: 'Not quite — Students often think infrastructure is only for "big cities" or "governments" and does not apply.', reveals: 'infrastructure-is-only-for-big' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_003', title: 'Social Infrastructure: Schools, Hospitals, Public Services',
          caseStudy: { intro: 'Think about your school building—why do you go there every day?',
            decisions: [{ prompt: 'What are two examples of social infrastructure mentioned in the text?', options: [
                { text: 'Schools and hospitals are two examples of social infrastructure', outcome: 'Schools and hospitals are two examples of social infrastructure.' },
                { text: 'factories', outcome: 'Not quite — Students often think "infrastructure" only means things made of concrete and steel, like roads.', reveals: 'infrastructure-only-means-things-made' },
                { text: 'infrastructure', outcome: 'Not quite — Students often think "infrastructure" only means things made of concrete and steel, like roads.', reveals: 'infrastructure-only-means-things-made' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_004', title: 'Transport Networks: Connecting People and Goods',
          caseStudy: { intro: 'Think about how the milk in your morning tea reaches your home.',
            decisions: [{ prompt: 'Name the four main modes of transport used in India to move goods and people.', options: [
                { text: 'The four modes are road, rail, water, and airway', outcome: 'The four modes are road, rail, water, and airway. If a student misses one, they are likely thinking.' },
                { text: 'traveling', outcome: 'Not quite — Students often believe that transport is only about "traveling" for leisure, rather than.', reveals: 'transport-is-only-about-traveling' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_005', title: 'Communication Networks: From Post to Internet',
          caseStudy: { intro: 'How did your grandparents send a message to a relative in another city before mobile phones existed?',
            decisions: [{ prompt: 'What was the primary method of sending messages over long distances in India for many centuries?', options: [
                { text: 'The postal system (letters)', outcome: 'The postal system (letters). A wrong answer suggests the student is confusing modern digital tools.' },
                { text: 'digital', outcome: 'Not quite — Students often think that because the internet is "digital," it is not an economic activity.', reveals: 'because-the-internet-is-digital' },
                { text: 'economic activity', outcome: 'Not quite — Students often think that because the internet is "digital," it is not an economic activity.', reveals: 'because-the-internet-is-digital' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_006', title: 'Infrastructure and Economic Growth: The Connection',
          caseStudy: { intro: 'Imagine you live in a village where there is no road to reach the main market; how would you sell your farm produce?',
            decisions: [{ prompt: 'What is one example of infrastructure that helps a farmer get their goods to the market?', options: [
                { text: 'A road or a transport vehicle (like a truck) is a key example of infrastructure', outcome: 'A road or a transport vehicle (like a truck) is a key example of infrastructure.' },
                { text: 'selling vegetables', outcome: 'Not quite — Students often think infrastructure is only about big government projects (like airports) and.', reveals: 'infrastructure-is-only-about-big' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A hill village grows superb apples, but half the harvest rots before reaching city markets. The farmers ask the government for \'development\' — and what arrives is not money, but a proper road and a cold-storage point.',
            decisions: [{ prompt: 'Why are a road and a cold store \'development\' for the village?', options: [
                { text: 'Because they are infrastructure — the supporting system that lets every economic activity work. The road connects the orchard to distant markets before the fruit spoils; the cold store holds produce until prices are right. Like a factory that cannot run without power and water, farming cannot reach its value without the invisible framework beneath it.', outcome: 'Infrastructure multiplies what producers already do — the same apples now reach buyers in Delhi, which no amount of extra farming effort alone could achieve.' },
                { text: 'The farmers were shortchanged — real development aid would have been cash, not concrete and wires.', outcome: 'Cash is spent once; a road keeps paying every season by connecting the village\'s produce to markets — infrastructure is the durable kind of help.', reveals: 'only-cash-is-development' },
                { text: 'A road helps only drivers — for farmers, \'development\' would mean new seeds and fertiliser.', outcome: 'Better seeds raise yield, but without transport the extra apples rot in the same village — infrastructure is what converts production into income.', reveals: 'infra-isnt-for-farmers' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch07_006', title: 'You made it',
          caseStudy: { intro: 'Before the shop, before the factory, before the harvest sells — somebody built a road and switched on a light. That\'s infrastructure: first in, always underneath.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_economics_ch07_001', difficulty: 'standard',
          question: 'Infrastructure refers to the essential physical structures and service.',
          hint: 'Review the definitions of Primary, Secondary, and Tertiary sectors.',
          misconception: 'Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom in a textile.',
          parts: [
                { id: 'a', prompt: 'List three examples of infrastructure from your daily life.', answer: 'Roads, schools, and electricity supply',
                  options: ['Roads, schools, and electricity supply', 'a tractor', 'a book', 'tools used for production'],
                  hint: 'Review the definitions of Primary, Secondary, and Tertiary sectors.',
                  misconception: 'Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom in a textile factory is infrastructure.' },
                { id: 'b', prompt: 'Why is infrastructure called the "backbone" of an economy?', answer: 'It is called the backbone',
                  options: ['It is called the backbone', 'infrastructure', 'manufacturing machines', 'a loom in a textile factory is infrastructure'],
                  hint: 'Review the definitions of Primary, Secondary, and Tertiary sectors.',
                  misconception: 'Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom in a textile factory is infrastructure.' },
                { id: 'c', prompt: 'Compare the impact of a road network on a farmer versus a factory worker.', answer: 'The farmer needs roads to transport perishable crops to the market',
                  options: ['The farmer needs roads to transport perishable crops to the market', 'infrastructure', 'manufacturing machines', 'a loom in a textile factory is infrastructure'],
                  hint: 'Review the definitions of Primary, Secondary, and Tertiary sectors.',
                  misconception: 'Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom in a textile factory is infrastructure.' }
          ],
            remediations: { 'students-often-confuse-infrastructure-with': { steps: ['Ask the student: "Does the loom provide power to the whole village, or just weave cloth for one factory?" Explain that.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom in a textile.',
          parts: [
                { id: 'a', prompt: 'Is a private bicycle "infrastructure"? Why or why not?', answer: 'No, it is not infrastructure',
                  options: ['No, it is not infrastructure', 'infrastructure', 'manufacturing machines', 'a loom in a textile factory is infrastructure'],
                  hint: 'Review the definitions of Primary, Secondary, and Tertiary sectors.',
                  misconception: 'Students often confuse "infrastructure" with "manufacturing machines." They might think that a loom in a textile factory is infrastructure.' }
          ],
            remediations: { 'students-often-confuse-infrastructure-with': { steps: ['Ask the student: "Does the loom provide power to the whole village, or just weave cloth for one factory?" Explain that.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch07_002', difficulty: 'standard',
          question: 'Physical infrastructure consists of the basic, tangible structures—such.',
          hint: 'Review the "Interdependence Among Sectors" section from the Chapter 14 reference to see.',
          misconception: 'Students often think infrastructure is only for "big cities" or "governments" and does not apply to their own lives.',
          parts: [
                { id: 'a', prompt: 'What are two examples of physical infrastructure mentioned in the text that help transport goods?', answer: 'Roads and bridges are two examples',
                  options: ['Roads and bridges are two examples', 'factories', 'big cities', 'governments'],
                  hint: 'Review the "Interdependence Among Sectors" section from the Chapter 14 reference to see how.',
                  misconception: 'Students often think infrastructure is only for "big cities" or "governments" and does not apply to their own lives.' }
          ],
            remediations: { 'infrastructure-is-only-for-big': { steps: ['Ask the student to list three things they bought or used today and trace how they arrived at their home.', 'Ask: "Would you have this item if the roads were blocked?" Then, have them identify the specific type of infrastructure.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch07_003', difficulty: 'standard',
          question: 'Social infrastructure refers to the essential public facilities, such.',
          hint: 'Review the definition of the Tertiary sector in Chapter 14.',
          misconception: 'Students often think "infrastructure" only means things made of concrete and steel, like roads or bridges.',
          parts: [
                { id: 'a', prompt: 'What are two examples of social infrastructure mentioned in the text?', answer: 'Schools and hospitals are two examples of social infrastructure',
                  options: ['Schools and hospitals are two examples of social infrastructure', 'factories', 'infrastructure'],
                  hint: 'Review the definition of the Tertiary sector in Chapter 14.',
                  misconception: 'Students often think "infrastructure" only means things made of concrete and steel, like roads or bridges.' },
                { id: 'b', prompt: 'Why is a school building considered an "investment in the future"?', answer: 'It is an investment',
                  options: ['It is an investment', 'infrastructure', 'of a school only as a physical structure, missing its role in human development'],
                  hint: 'Review the definition of the Tertiary sector in Chapter 14.',
                  misconception: 'Students often think "infrastructure" only means things made of concrete and steel, like roads or bridges.' },
                { id: 'c', prompt: 'If a village only has factories but no schools or clinics, why might it struggle in the long term?', answer: 'The village would struggle',
                  options: ['The village would struggle', 'infrastructure'],
                  hint: 'Review the definition of the Tertiary sector in Chapter 14.',
                  misconception: 'Students often think "infrastructure" only means things made of concrete and steel, like roads or bridges.' }
          ],
            remediations: { 'infrastructure-only-means-things-made': { steps: ['Ask the student to close their eyes and imagine a school with no teachers or a hospital with no doctors.', 'Explain that the "physical" part (the building) is just the shell, but the "social" part is the service that changes.', 'Have them list three ways their life would change if their local school disappeared, emphasizing that the loss is.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch07_004', difficulty: 'standard',
          question: 'Transport networks are the interconnected systems of roads, railways.',
          hint: 'Review the "Interdependence Among Sectors" section of Chapter 14.',
          misconception: 'Students often believe that transport is only about "traveling" for leisure, rather than an economic necessity for.',
          parts: [
                { id: 'a', prompt: 'Name the four main modes of transport used in India to move goods and people.', answer: 'The four modes are road, rail, water, and airway',
                  options: ['The four modes are road, rail, water, and airway', 'traveling'],
                  hint: 'Review the "Interdependence Among Sectors" section of Chapter 14.',
                  misconception: 'Students often believe that transport is only about "traveling" for leisure, rather than an economic necessity for moving goods.' },
                { id: 'b', prompt: 'Why do we describe transport networks as the "arteries" of an economy?', answer: 'They are called arteries',
                  options: ['They are called arteries', 'travel', 'traveling'],
                  hint: 'Review the "Interdependence Among Sectors" section of Chapter 14.',
                  misconception: 'Students often believe that transport is only about "traveling" for leisure, rather than an economic necessity for moving goods.' }
          ],
            remediations: { 'transport-is-only-about-traveling': { steps: ['Ask the student to trace the journey of their favorite snack from a farm to their desk.', 'Ask: "Who moved it?" "What vehicle did they use?" "What road or rail did that vehicle travel on?" This helps them see.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch07_005', difficulty: 'standard',
          question: 'Communication networks are systems that allow the exchange of information.',
          hint: 'Review the definition of "Tertiary Sector" in the chapter.',
          misconception: 'Students often think that because the internet is "digital," it is not an economic activity.',
          parts: [
                { id: 'a', prompt: 'What was the primary method of sending messages over long distances in India for many centuries?', answer: 'The postal system (letters)',
                  options: ['The postal system (letters)', 'digital', 'economic activity', 'making physical products'],
                  hint: 'Review the definition of "Tertiary Sector" in the chapter.',
                  misconception: 'Students often think that because the internet is "digital," it is not an economic activity.' },
                { id: 'b', prompt: 'If a farmer in a remote village wants to check the market price of their crops in a city, which communication tool helps them do this most efficiently today?', answer: 'The mobile phone or internet',
                  options: ['The mobile phone or internet', 'digital', 'economic activity', 'making physical products'],
                  hint: 'Review the definition of "Tertiary Sector" in the chapter.',
                  misconception: 'Students often think that because the internet is "digital," it is not an economic activity.' },
                { id: 'c', prompt: 'How did the telegraph differ from the telephone in terms of its impact on communication?', answer: 'The telegraph was an older, slower method of sending encoded messages, while the',
                  options: ['The telegraph was an older, slower method of sending encoded messages, while the', 'digital', 'economic activity', 'making physical products'],
                  hint: 'Review the definition of "Tertiary Sector" in the chapter.',
                  misconception: 'Students often think that because the internet is "digital," it is not an economic activity.' }
          ],
            remediations: { 'because-the-internet-is-digital': { steps: ['Explain that "economic activity" includes anything that creates value.', 'Ask them: "Does the person who fixes your internet or the company that provides the data get paid?" 3.', 'Clarify that since they are paid for a service, it is a tertiary sector activity.', 'Relate this back to the "Service Sector" definition in the textbook.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch07_006', difficulty: 'standard',
          question: 'Infrastructure refers to the basic physical and organizational structures—such.',
          hint: 'Review the "Interdependence Among Sectors" section of the NCERT text.',
          misconception: 'Students often think infrastructure is only about big government projects (like airports) and do not realize that local.',
          parts: [
                { id: 'a', prompt: 'What is one example of infrastructure that helps a farmer get their goods to the market?', answer: 'A road or a transport vehicle (like a truck) is a key example of infrastructure',
                  options: ['A road or a transport vehicle (like a truck) is a key example of infrastructure', 'selling vegetables'],
                  hint: 'Review the "Interdependence Among Sectors" section of the NCERT text.',
                  misconception: 'Students often think infrastructure is only about big government projects (like airports) and do not realize that local things like village.' }
          ],
            remediations: { 'infrastructure-is-only-about-big': { steps: ['Ask the student to list three things they use to get to school (e.g., bus, road, bridge).', 'Explain that all these are "physical structures" that help them get from A to B.', 'Ask them to imagine a world where these structures disappear and explain how it would change their daily life.', 'Connect this back to the farmer who needs the road to get his goods to the market.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
