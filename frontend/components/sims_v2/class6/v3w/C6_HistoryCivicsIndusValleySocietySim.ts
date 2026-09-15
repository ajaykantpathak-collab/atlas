import type { SimDef } from '../../engine/types';
import C6_HistoryCivicsIndusValleySocietySim from '../../../simulations/c6_12/C6_HistoryCivicsIndusValleySocietySim';

/** v3 wrapped master — C6_HistoryCivicsIndusValleySocietySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_historycivicsindusvalleysocietysim: SimDef = {
    id: 'v3w_c6_historycivicsindusvalleysocietysim',
    title: 'Indus Valley Society',
    subtitle: 'This node covers the discovery and the geographical extent of the Harappan Civilisation.',
    classLevel: 6, subject: 'history', topic: 'The Harappan Civilisation: Discovery and Extent',
    chapters: [],
    nodeIds: ['c6_history_ch04_002', 'c6_history_ch04_001', 'c6_history_ch04_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'If you were exploring a dusty site in Pakistan and found ancient bricks and city walls, how would you know.', goal: 'Master Indus Valley Society.' },
    discovery: {
        question: 'In which decade did archaeologists begin the discovery of the major sites of the Harappan Civilisation?',
        options: ['The discovery began in the 1920s', 'discovered', 'discovery'],
        answer: 'The discovery began in the 1920s',
        hook: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).',
    },
    teaching: [
        { title: 'The Harappan Civilisation was one of the.', text: 'The Harappan Civilisation was one of the world\'s first major urban societies, flourishing in the Indus Valley between 2600 BCE and 1900 BCE.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_history_ch04_002', title: 'The Harappan Civilisation was one of.',
          caseStudy: { intro: 'If you were exploring a dusty site in Pakistan and found ancient bricks and city walls, how would you know how old they are?',
            decisions: [{ prompt: 'In which decade did archaeologists begin the discovery of the major sites of the Harappan Civilisation?', options: [
                { text: 'The discovery began in the 1920s', outcome: 'The discovery began in the 1920s. A wrong answer here suggests the student has not distinguished.' },
                { text: 'discovered', outcome: 'Not quite — Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the.', reveals: 'students-often-confuse-the-discovery' },
                { text: 'discovery', outcome: 'Not quite — Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the.', reveals: 'students-often-confuse-the-discovery' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_history_ch04_001', title: 'Early cities were large, organized.',
          scaffold: { problem: 'A village of 20 people needs 50kg of grain to survive a month. They currently produce 50kg. Can this village turn into a city?',
            steps: [
            { text: 'Identify the current production (50kg) vs. needs (50kg).' },
            { text: 'Determine if there is a "surplus" (extra food).' },
            { text: 'Analyze if they have enough to support people who don\'t farm.' },
            { text: 'Conclude if it can become a city.', faded: true, blankAnswer: 'No, because they have no surplus, everyone must focus.' }
            ] } },
        { type: 'case', nodeId: 'c6_history_ch04_003', title: 'Harappan town planning refers to the.',
          caseStudy: { intro: 'Imagine you are walking through a busy market in your town; are the lanes straight and organized, or do they twist and turn in every direction?',
            decisions: [{ prompt: 'What geometric pattern did Harappan streets follow?', options: [
                { text: 'The streets followed a grid pattern, crossing each other at right angles', outcome: 'The streets followed a grid pattern, crossing each other at right angles.' },
                { text: 'because they think', outcome: 'Not quite — Students often assume that all ancient cities were disorganized or "messy" because they think "old".', reveals: 'all-ancient-cities-were-disorganized' },
                { text: 'equals', outcome: 'Not quite — Students often assume that all ancient cities were disorganized or "messy" because they think "old".', reveals: 'all-ancient-cities-were-disorganized' }
            ] }] } }
    ],
    explore: { component: C6_HistoryCivicsIndusValleySocietySim, prompt: 'Explore the interactive — Indus Valley Society' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch04_002', difficulty: 'standard',
          question: 'The Harappan Civilisation was one of the world\'s first major urban societies,.',
          hint: 'Review the definitions of BCE and the role of an archaeologist from Chapter 4.',
          misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).',
          parts: [
                { id: 'a', prompt: 'In which decade did archaeologists begin the discovery of the major sites of the Harappan Civilisation?', answer: 'The discovery began in the 1920s',
                  options: ['The discovery began in the 1920s', 'discovered', 'discovery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).' },
                { id: 'b', prompt: 'Why do historians classify the Harappan Civilisation as an "urban" civilisation?', answer: 'It is called urban',
                  options: ['It is called urban', 'discovery', 'existence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).' }
          ],
            remediations: { 'students-often-confuse-the-discovery': { steps: ['Clarify that history is like a puzzle: the "event" happened thousands of years ago, but the "discovery" is the moment.', 'Use the analogy of finding a lost diary in your attic; the diary was written years ago (existence), but you only just.', 'Emphasize that "1920s" is the date the researchers started the excavation, not the date the cities were built.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).',
          parts: [
                { id: 'a', prompt: 'Could we call the Harappan Civilisation "modern" because it had cities? Justify your stance.', answer: 'No, we call it "early urban,"',
                  options: ['No, we call it "early urban,"', 'discovery', 'existence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).' }
          ],
            remediations: { 'students-often-confuse-the-discovery': { steps: ['Clarify that history is like a puzzle: the "event" happened thousands of years ago, but the "discovery" is the moment.', 'Use the analogy of finding a lost diary in your attic; the diary was written years ago (existence), but you only just.', 'Emphasize that "1920s" is the date the researchers started the excavation, not the date the cities were built.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_001', difficulty: 'standard',
          question: 'Early cities were large, organized settlements that emerged after humans.',
          hint: 'Review the shift from gathering to farming in the early history section of the chapter.',
          misconception: 'Students often assume early humans "decided" to build cities overnight.',
          parts: [
                { id: 'a', prompt: 'What was the primary way humans gathered food before they started farming?', answer: 'Early humans survived by hunting animals and gathering wild plants and fruits',
                  options: ['Early humans survived by hunting animals and gathering wild plants and fruits', 'hunter-gatherer', 'farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' },
                { id: 'b', prompt: 'How does a city differ from a small, temporary camp in terms of how people spend their time?', answer: 'In a temporary camp, everyone\'s energy is spent finding food',
                  options: ['In a temporary camp, everyone\'s energy is spent finding food', 'specialization', 'decided'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' }
          ],
            remediations: { 'early-humans-decided-to-build': { steps: ['First, ask the student to draw a line representing 10,000 years.', 'Explain that the transition from a single hut to a city took thousands of years, not a few days.', 'Use the analogy of a "seed growing into a tree"—it needs time, stability, and nourishment (food surplus) to become.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume early humans "decided" to build cities overnight.',
          parts: [
                { id: 'a', prompt: 'How does a city differ from a small, temporary camp in terms of how people spend their time?', answer: 'In a temporary camp, everyone\'s energy is spent finding food',
                  options: ['In a temporary camp, everyone\'s energy is spent finding food', 'specialization', 'decided', 'early humans "decided" to build cities overnight'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' }
          ],
            remediations: { 'early-humans-decided-to-build': { steps: ['First, ask the student to draw a line representing 10,000 years.', 'Explain that the transition from a single hut to a city took thousands of years, not a few days.', 'Use the analogy of a "seed growing into a tree"—it needs time, stability, and nourishment (food surplus) to become.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_003', difficulty: 'standard',
          question: 'Harappan town planning refers to the highly organized, systematic layout of.',
          hint: 'Review the transition from nomadic life to permanent settlements in the previous chapter.',
          misconception: 'Students often assume that all ancient cities were disorganized or "messy" because they think "old" equals "primitive.".',
          parts: [
                { id: 'a', prompt: 'What geometric pattern did Harappan streets follow?', answer: 'The streets followed a grid pattern, crossing each other at right angles',
                  options: ['The streets followed a grid pattern, crossing each other at right angles', 'because they think', 'equals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all ancient cities were disorganized or "messy" because they think "old" equals "primitive." They may struggle.' },
                { id: 'b', prompt: 'Why do historians believe Harappan cities were planned before they were built?', answer: 'Because the city was divided into orderly rectangular blocks by straight streets',
                  options: ['Because the city was divided into orderly rectangular blocks by straight streets', 'because they think', 'equals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all ancient cities were disorganized or "messy" because they think "old" equals "primitive." They may struggle.' }
          ],
            remediations: { 'all-ancient-cities-were-disorganized': { steps: ['Ask the student to draw a square on a piece of paper and divide it into four smaller squares using only straight lines.', 'Explain that if they can do this, they have created a "grid." Tell them to imagine an entire city built on that same.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
