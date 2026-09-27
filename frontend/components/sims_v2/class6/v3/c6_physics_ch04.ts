import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch04 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch04: SimDef = {
    id: 'v3_c6_physics_ch04',
    title: 'Exploring Magnets',
    subtitle: 'This node covers what magnets are, magnetic poles, and the attract–repel rule.',
    classLevel: 6, subject: 'physics', topic: 'Exploring Magnets',
    chapters: ['c6_physics_ch04'],
    nodeIds: ['c6_physics_ch04_001', 'c6_physics_ch04_002', 'c6_physics_ch04_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Bring a magnet near a steel spoon and the spoon jumps to it — but touch it to a plastic ruler or a rubber.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Which materials does a magnet attract?',
        options: ['A magnet attracts magnetic materials', 'all metals', 'a magnet attracts all metals'],
        answer: 'A magnet attracts magnetic materials',
        hook: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and.',
    },
    teaching: [
        { title: 'Magnets and their poles', text: 'A magnet is an object that attracts materials made of iron, nickel, or cobalt — called magnetic materials.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch04_001', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch04_001', title: 'Magnets and their poles',
          caseStudy: { intro: 'Bring a magnet near a steel spoon and the spoon jumps to it — but touch it to a plastic ruler or a rubber eraser and nothing happens.',
            decisions: [{ prompt: 'Which materials does a magnet attract?', options: [
                { text: 'A magnet attracts magnetic materials', outcome: 'A magnet attracts magnetic materials — mainly iron, nickel, and cobalt.' },
                { text: 'all metals', outcome: 'Not quite — Students often think a magnet attracts all metals. In truth, most metals are not attracted.', reveals: 'a-magnet-attracts-all-metals' },
                { text: 'a magnet attracts all metals', outcome: 'Not quite — Students often think a magnet attracts all metals. In truth, most metals are not attracted.', reveals: 'a-magnet-attracts-all-metals' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch04_002', title: 'Making and caring for magnets',
          caseStudy: { intro: 'Here is a magic trick that is really science — take an ordinary iron needle and turn it into a magnet.',
            decisions: [{ prompt: 'How can you magnetise an iron needle using a bar magnet?', options: [
                { text: 'Stroke the needle repeatedly with one pole of the magnet, always in the same direction,', outcome: 'Stroke the needle repeatedly with one pole of the magnet, always in the same direction, lifting the.' },
                { text: 'rub back and forth', outcome: 'Not quite — Students often think magnets are permanent no matter what you do to them.', reveals: 'magnets-are-permanent-no-matter' },
                { text: 'magnets are permanent no matter what you do to them', outcome: 'Not quite — Students often think magnets are permanent no matter what you do to them.', reveals: 'magnets-are-permanent-no-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch04_003', title: 'Everyday uses of magnets and the compass',
          caseStudy: { intro: 'Start at home — open the fridge and feel the door click shut. A magnet hidden in the seal pulls the iron frame, holding it airtight with no lock.',
            decisions: [{ prompt: 'Name four everyday uses of magnets.', options: [
                { text: 'Compass for navigation, magnetic door catches (fridge, cupboard), speakers and earphones,', outcome: 'Compass for navigation, magnetic door catches (fridge, cupboard), speakers and earphones, scrapyard.' },
                { text: 'magnets are only for sticking notes on the fridge', outcome: 'Not quite — Students often think magnets are only for sticking notes on the fridge.', reveals: 'magnets-are-only-for-sticking' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch04_003', title: 'You made it',
          caseStudy: { intro: 'You finished Exploring Magnets — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch04_001', difficulty: 'standard',
          question: 'A magnet is an object that attracts materials made of iron, nickel, or cobalt.',
          hint: 'If stuck, play with a real magnet and iron filings first — the pole clusters make the.',
          misconception: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and.',
          parts: [
                { id: 'a', prompt: 'Which materials does a magnet attract?', answer: 'A magnet attracts magnetic materials',
                  options: ['A magnet attracts magnetic materials', 'all metals', 'a magnet attracts all metals'],
                  hint: 'If stuck, play with a real magnet and iron filings first — the pole clusters make the idea click.',
                  misconception: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and gold ignore a magnet.' },
                { id: 'b', prompt: 'Where is the pull of a magnet strongest?', answer: 'At its two ends, called the poles',
                  options: ['At its two ends, called the poles', 'the middle', 'a magnet attracts all metals'],
                  hint: 'If stuck, play with a real magnet and iron filings first — the pole clusters make the idea click.',
                  misconception: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and gold ignore a magnet.' },
                { id: 'c', prompt: 'What happens when a bar magnet is hung freely by a thread?', answer: 'It swings and finally settles pointing in the north–south direction',
                  options: ['It swings and finally settles pointing in the north–south direction', 'a magnet attracts all metals'],
                  hint: 'If stuck, play with a real magnet and iron filings first — the pole clusters make the idea click.',
                  misconception: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and gold ignore a magnet.' }
          ],
            remediations: { 'a-magnet-attracts-all-metals': { steps: ['If the student mixes up the poles rule, hand them two magnets (or draw N–S blocks) and let them physically feel.', 'Then teach it as a rhyme — "same poles push apart, different poles pull together." 3.', 'Finish by hanging a magnet on a thread and watching it settle north–south together.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and.',
          parts: [
                { id: 'a', prompt: 'You push the north poles of two magnets together. What do you feel and why?', answer: 'You feel them pushing apart — repulsion —',
                  options: ['You feel them pushing apart — repulsion —', 'a magnet attracts all metals'],
                  hint: 'If stuck, play with a real magnet and iron filings first — the pole clusters make the idea click.',
                  misconception: 'Students often think a magnet attracts all metals. In truth, most metals are not attracted — copper, aluminium, and gold ignore a magnet.' }
          ],
            remediations: { 'a-magnet-attracts-all-metals': { steps: ['If the student mixes up the poles rule, hand them two magnets (or draw N–S blocks) and let them physically feel.', 'Then teach it as a rhyme — "same poles push apart, different poles pull together." 3.', 'Finish by hanging a magnet on a thread and watching it settle north–south together.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch04_002', difficulty: 'standard',
          question: 'A magnet can be made by stroking a magnetic material — like an iron or steel.',
          hint: 'If stuck, revisit "Exploring Magnets" — poles and the attract–repel rule.',
          misconception: 'Students often think magnets are permanent no matter what you do to them.',
          parts: [
                { id: 'a', prompt: 'Why must the strokes be in one direction only when magnetising a needle?', answer: 'One-direction stroking lines up all the needle\'s magnetic parts the same way',
                  options: ['One-direction stroking lines up all the needle\'s magnetic parts the same way', 'any rubbing works', 'magnets are permanent no matter what you do to them'],
                  hint: 'If stuck, revisit "Exploring Magnets" — poles and the attract–repel rule.',
                  misconception: 'Students often think magnets are permanent no matter what you do to them.' },
                { id: 'b', prompt: 'Name three things that can make a magnet lose its magnetism.', answer: 'Heating the magnet strongly, hammering it, or dropping it repeatedly',
                  options: ['Heating the magnet strongly, hammering it, or dropping it repeatedly', 'getting wet', 'magnets are permanent no matter what you do to them'],
                  hint: 'If stuck, revisit "Exploring Magnets" — poles and the attract–repel rule.',
                  misconception: 'Students often think magnets are permanent no matter what you do to them.' },
                { id: 'c', prompt: 'How should a pair of bar magnets be stored?', answer: 'Kept as a pair with unlike poles facing each other',
                  options: ['Kept as a pair with unlike poles facing each other', 'magnets are permanent no matter what you do to them'],
                  hint: 'If stuck, revisit "Exploring Magnets" — poles and the attract–repel rule.',
                  misconception: 'Students often think magnets are permanent no matter what you do to them.' }
          ],
            remediations: { 'magnets-are-permanent-no-matter': { steps: ['If the student forgets the care rules, teach "magnets hate heat and hits" — hammering, dropping, and heating all.', 'Then ask what the opposite of scrambling is — lining up — which is exactly how stroking magnetises a needle.', 'If possible, magnetise a real needle together and watch it pick up pins.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch04_003', difficulty: 'standard',
          question: 'Magnets are used wherever attraction, direction-finding, or motion without.',
          hint: 'If stuck, revisit "Making and Caring for Magnets" — the magnet being put to work.',
          misconception: 'Students often think magnets are only for sticking notes on the fridge.',
          parts: [
                { id: 'a', prompt: 'How does a magnetic crane help in a scrapyard?', answer: 'A powerful magnet on the crane lifts heavy iron scrap',
                  options: ['A powerful magnet on the crane lifts heavy iron scrap', 'it grabs everything', 'magnets are only for sticking notes on the fridge'],
                  hint: 'If stuck, revisit "Making and Caring for Magnets" — the magnet being put to work.',
                  misconception: 'Students often think magnets are only for sticking notes on the fridge.' },
                { id: 'b', prompt: 'Why does a compass work everywhere on Earth?', answer: 'Because the Earth itself behaves like a giant magnet',
                  options: ['Because the Earth itself behaves like a giant magnet', 'the needle is magic', 'magnets are only for sticking notes on the fridge'],
                  hint: 'If stuck, revisit "Making and Caring for Magnets" — the magnet being put to work.',
                  misconception: 'Students often think magnets are only for sticking notes on the fridge.' }
          ],
            remediations: { 'magnets-are-only-for-sticking': { steps: ['If the student cannot connect uses to the magnetism idea, ask for each example "what is being pulled or pushed without.', 'Play "find the magnet" — spot the magnet hiding in a speaker, a fridge seal, a crane — until the pattern is automatic.', 'Finish by linking the compass to Earth\'s giant magnet.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
