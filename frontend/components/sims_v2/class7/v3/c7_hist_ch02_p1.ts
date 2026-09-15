import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch02_p1: SimDef = {
    id: 'v3_c7_hist_ch02_p1',
    title: 'The Rise of Empires · Part 1/2',
    subtitle: 'Covers the structural, economic, and political shifts from regional kingdoms.',
    classLevel: 7, subject: 'history', topic: 'The Rise of Empires · Part 1/2',
    chapters: ['c7_hist_ch02'],
    nodeIds: ['c7_hist_ch02_001', 'c7_hist_ch02_002', 'c7_hist_ch02_003', 'c7_hist_ch02_004', 'c7_hist_ch02_005', 'c7_hist_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking through your local vegetable market and seeing goods arriving from distant states, all.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What really turns a small mahajanapada into a vast empire — one glorious battle, or something much quieter happening in the fields first?',
        options: ['Agricultural surplus paid as taxes funds a standing army and royal officials — empires are built on grain before swords', 'One brave king and one huge victory are all it takes', 'Empires appear when maps get bigger', 'Crowns — whoever forges the largest crown rules the most land'],
        answer: 'Agricultural surplus paid as taxes funds a standing army and royal officials — empires are built on grain before swords',
        hook: 'An empire is not just a kingdom that won extra battles — it needs centralised tax collection, permanent officials, and uniform law across many regions. Magadha had the winning combination: fertile soil and iron mines beneath it.',
    },
    teaching: [
        { title: 'From Kingdoms to Empires: The Transition', text: 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient India (around the 6th to 4th centuries BCE) marks a major political shift where smaller, localized tribal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit Magadha like a royal advisor — count the iron ore, the river-fed fields, and the tax channels — and explain why this kingdom, above its rivals, was built to become an empire.',
        labels: ['From Kingdoms to Empires', 'Magadha Empire: Factors Behind', 'Maurya Empire: Chandragupta Maurya', 'Ashoka: The Emperor', 'Kalinga War and Its', 'Ashoka\'s Dhamma: Principles'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch02_003', title: 'Maurya Empire: Chandragupta Maurya and His Conquests',
          caseStudy: { intro: 'Imagine visiting the ruins of an ancient fort or reading about how small kingdoms grew into massive empires through clever strategy rather than sheer numbers.',
            decisions: [{ prompt: 'Who was the primary mentor and strategist who helped Chandragupta Maurya overthrow the Nanda dynasty and establish the Maurya Empire?', options: [
                { text: 'Chanakya (also known as Kautilya or Vishnugupta)', outcome: 'The correct answer is Chanakya (also known as Kautilya or Vishnugupta).' },
                { text: 'Ashoka', outcome: 'Not quite — Students often confuse Chandragupta Maurya with Chandragupta I of the Gupta Empire, mistakenly.', reveals: 'students-often-confuse-chandragupta-maurya' },
                { text: 'Golden Age', outcome: 'Not quite — Students often confuse Chandragupta Maurya with Chandragupta I of the Gupta Empire, mistakenly.', reveals: 'students-often-confuse-chandragupta-maurya' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a class debate, Arjun argues that an empire is \'just a kingdom whose army won a few extra battles — nothing else changes.\' His opponent needs to show what really separates a mahajanapada from an empire.',
            decisions: [{ prompt: 'What is the strongest counter to Arjun\'s claim?', options: [
                { text: 'Winning battles gives only temporary dominance; an empire needs a permanent standing army, centralised tax collection through royal officials, uniform administration and control over distant, diverse regions — all funded by agricultural surplus and trade revenue, not just bravery.', outcome: 'This distinguishes short-term conquest from imperial structure: institutions and economic foundations are what turn a kingdom into an empire.' },
                { text: 'Arjun is right — once you defeat neighbouring kings, the bigger territory automatically runs itself the same way a small kingdom did.', outcome: 'Larger, diverse territories cannot be run by personal rule and local chiefs alone; without bureaucracy and standing forces, conquered lands break away.', reveals: 'empire-is-just-bigger' },
                { text: 'The real difference is that emperors had better titles — the actual administration stayed identical to a small janapada.', outcome: 'Titles signalled sovereignty, but the substance changed too: salaried officials, centralised revenue and permanent armies replaced direct local collection.', reveals: 'only-titles-changed' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Swords win battles; harvests win empires. The army marches on grain collected long before the war began.',
            decisions: [{ prompt: 'What comes next? The Rise of Empires · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Rise of Empires · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch02_001', difficulty: 'standard',
          question: 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires.',
          hint: 'Review Class 6 topics on the rise of kingdoms and the use of iron tools in agriculture.',
          misconception: 'Students often think that empires were formed overnight purely through brilliant military generals winning a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient',
                  options: ['The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda', 'This node explores the personal transformation of Emperor Ashoka from a conqueror who'],
                  hint: 'Review Class 6 topics on the rise of kingdoms and the use of iron tools in agriculture before.',
                  misconception: 'Students often think that empires were formed overnight purely through brilliant military generals winning a single massive war, completely.' }
          ],
            remediations: { 'empires-were-formed-overnight-purely': { steps: ['To fix this, guide the student to examine an economic map of ancient river valleys alongside a political map.', 'Have them trace how iron ore deposits and fertile alluvial soil provided the raw materials and food surplus needed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_002', difficulty: 'standard',
          question: 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India.',
          hint: 'Review c7_hist_ch02_001 to understand how sixteen major Mahajanapadas emerged across.',
          misconception: 'Students often believe that Magadha conquered other Mahajanapadas purely through sudden, random military aggression.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located',
                  options: ['The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda', 'This node explores the personal transformation of Emperor Ashoka from a conqueror who'],
                  hint: 'Review c7_hist_ch02_001 to understand how sixteen major Mahajanapadas emerged across northern India.',
                  misconception: 'Students often believe that Magadha conquered other Mahajanapadas purely through sudden, random military aggression without any economic.' }
          ],
            remediations: { 'magadha-conquered-other-mahajanapadas-purely': { steps: ['To fix this, draw a simple cause-and-effect flowchart with the student starting with \'Fertile Alluvial Soil\', moving.', 'Have them trace how an army cannot exist without the food surplus generated by peasants in the Gangetic valley.', 'Emphasize that war required money and food, both of which Magadha\'s geography provided abundantly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Magadha conquered other Mahajanapadas purely through sudden, random military aggression.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Magadha became an empire solely because of the military genius of King Bimbisara." Do you agree or disagree, and why?', answer: 'to disagree, arguing that while Bimbisara\'s diplomacy and conquests were vital,',
                  options: ['to disagree, arguing that while Bimbisara\'s diplomacy and conquests were vital,', 'great man theory'],
                  hint: 'Review c7_hist_ch02_001 to understand how sixteen major Mahajanapadas emerged across northern India.',
                  misconception: 'Students often believe that Magadha conquered other Mahajanapadas purely through sudden, random military aggression without any economic.' }
          ],
            remediations: { 'magadha-conquered-other-mahajanapadas-purely': { steps: ['To fix this, draw a simple cause-and-effect flowchart with the student starting with \'Fertile Alluvial Soil\', moving.', 'Have them trace how an army cannot exist without the food surplus generated by peasants in the Gangetic valley.', 'Emphasize that war required money and food, both of which Magadha\'s geography provided abundantly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_003', difficulty: 'standard',
          question: 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the.',
          hint: 'Review node c7_hist_ch02_002 to understand Magadha\'s rise before examining how.',
          misconception: 'Students often confuse Chandragupta Maurya with Chandragupta I of the Gupta Empire, mistakenly attributing Gupta-era.',
          parts: [
                { id: 'a', prompt: 'Who was the primary mentor and strategist who helped Chandragupta Maurya overthrow the Nanda dynasty and establish the Maurya Empire?', answer: 'Chanakya (also known as Kautilya or Vishnugupta)',
                  options: ['Chanakya (also known as Kautilya or Vishnugupta)', 'Ashoka', 'Golden Age'],
                  hint: 'Review node c7_hist_ch02_002 to understand Magadha\'s rise before examining how Chandragupta.',
                  misconception: 'Students often confuse Chandragupta Maurya with Chandragupta I of the Gupta Empire, mistakenly attributing Gupta-era cultural achievements.' }
          ],
            remediations: { 'students-often-confuse-chandragupta-maurya': { steps: ['To fix this misconception, have the student draw a quick chronological timeline separating the Mauryan Empire (c.', '321 BCE, founded by Chandragupta Maurya with Chanakya) from the Gupta Empire (c.', '320 CE, founded by Chandragupta I).', 'Compare their periods and note that they are separated by roughly 600 years of distinct political history.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_004', difficulty: 'standard',
          question: 'This node explores the personal transformation of Emperor Ashoka from.',
          hint: 'Review c6_history_ch05_007 and c7_hist_ch02_003 to understand the aggressive military.',
          misconception: 'Students often think Ashoka immediately disbanded his entire army and dissolved the government after the Kalinga War.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node explores the personal transformation of Emperor Ashoka from a conqueror who',
                  options: ['This node explores the personal transformation of Emperor Ashoka from a conqueror who', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda'],
                  hint: 'Review c6_history_ch05_007 and c7_hist_ch02_003 to understand the aggressive military expansion.',
                  misconception: 'Students often think Ashoka immediately disbanded his entire army and dissolved the government after the Kalinga War, turning the Mauryan.' }
          ],
            remediations: { 'ashoka-immediately-disbanded-his-entire': { steps: ['To fix this misconception, compare excerpts from Ashoka\'s edicts regarding his remorse with administrative records.', 'Guide the student to trace two parallel tracks: the state\'s internal policing and defense remained functional, but its.', 'Use a graphic organizer to separate \'military demobilization\' (which did not happen) from \'change in imperial.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_005', difficulty: 'standard',
          question: 'The Kalinga War (c. 261 BCE) was a bloody military campaign fought between the.',
          hint: 'Review node c7_hist_ch02_004 (Ashoka: The Emperor and His Transformation) to understand.',
          misconception: 'Students often believe that Ashoka became a Buddhist monk immediately after the Kalinga War and abandoned his throne.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Kalinga War (c',
                  options: ['The Kalinga War (c', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda'],
                  hint: 'Review node c7_hist_ch02_004 (Ashoka: The Emperor and His Transformation) to understand his early.',
                  misconception: 'Students often believe that Ashoka became a Buddhist monk immediately after the Kalinga War and abandoned his throne to live in a forest.' }
          ],
            remediations: { 'ashoka-became-a-buddhist-monk': { steps: ['To fix this misconception, examine Ashoka\'s Edicts closely alongside his administrative titles.', 'Point out that he appointed special officers called *Dhamma-mahamattas* to check on people\'s welfare across the empire.', 'Contrast the role of a political ruler promoting ethical governance with that of a monastic ascetic living apart from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_006', difficulty: 'standard',
          question: 'Ashoka\'s Dhamma was a moral code and ethical framework established by the.',
          hint: 'Review c7_hist_ch02_005 to understand how the suffering in Kalinga changed Ashoka\'s.',
          misconception: 'Students often confuse Ashoka\'s Dhamma with Buddhism, believing that Dhamma is simply the Pali word for Buddhism and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ashoka\'s Dhamma was a moral code and ethical framework established by the Mauryan Emperor',
                  options: ['Ashoka\'s Dhamma was a moral code and ethical framework established by the Mauryan Emperor', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda'],
                  hint: 'Review c7_hist_ch02_005 to understand how the suffering in Kalinga changed Ashoka\'s outlook.',
                  misconception: 'Students often confuse Ashoka\'s Dhamma with Buddhism, believing that Dhamma is simply the Pali word for Buddhism and that Ashoka was.' }
          ],
            remediations: { 'students-often-confuse-ashoka-s': { steps: ['To correct this, guide the student to compare specific edict inscriptions with core Buddhist monastic rules.', 'Show them that while Ashoka was a Buddhist, his edicts emphasize universal duties like honoring parents, charity.', 'Use a side-by-side comparison chart showing \'Buddhist Monastic Rules\' versus \'Ashoka\'s Dhamma Principles\' to make the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
