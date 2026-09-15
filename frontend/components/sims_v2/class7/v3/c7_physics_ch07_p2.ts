import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch07_p2: SimDef = {
    id: 'v3_c7_physics_ch07_p2',
    title: 'Exploring Substances: Acidic, Basic, and Neutral · Part 2/2',
    subtitle: 'Covers the concept of the pH scale from 0 to 14, universal indicators, and qualitative.',
    classLevel: 7, subject: 'physics', topic: 'Exploring Substances: Acidic, Basic, and Neutral · Part 2/2',
    chapters: ['c7_physics_ch07'],
    nodeIds: ['c7_physics_ch07_007', 'c7_physics_ch07_008', 'c7_physics_ch07_009', 'c7_physics_ch07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When testing tap water or lemon juice with natural indicators like litmus or turmeric, you notice a color.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Lemons and curd are acids you safely eat every day — so a student figures lab acids must be safe to taste too. What is dangerously wrong with that logic?',
        options: ['Weak organic acids in food are nothing like strong corrosive lab acids — never taste a laboratory chemical', 'Nothing — sour is sour, all acids are alike', 'Lab acids are safe if you sip slowly', 'Only bases are dangerous, acids are fine'],
        answer: 'Weak organic acids in food are nothing like strong corrosive lab acids — never taste a laboratory chemical',
        hook: 'Acids taste sour and turn blue litmus red; bases taste bitter, feel soapy, and turn red litmus blue. But senses are for kitchen clues — in the lab, indicators do the tasting for you. And distilled water? Perfectly neutral, no matter where it is stored.',
    },
    teaching: [
        { title: 'pH Scale: Measuring Acidity and Basicity', text: 'The pH scale is a numerical scale ranging from 0 to 14 used to specify how acidic or basic (alkaline) an aqueous solution is, measured in dimensionless units.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch07_007', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Sort a shelf of everyday liquids — lemon juice, soap solution, vinegar, distilled water — into acid, base, and neutral using only indicator clues, no tasting allowed.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch07_007', title: 'pH Scale: Measuring Acidity and Basicity',
          caseStudy: { intro: 'When testing tap water or lemon juice with natural indicators like litmus or turmeric, you notice a color change, but simple indicators only tell you if.',
            decisions: [{ prompt: 'What is the numerical pH value of a purely neutral substance like pure distilled water at room temperature?', options: [
                { text: 'The correct pH value of a purely neutral substance is 7', outcome: 'The correct pH value of a purely neutral substance is 7. If a student answers 0 or 14, it shows.' },
                { text: 'stronger', outcome: 'Not quite — Students often believe that higher numbers on the pH scale always indicate "stronger" or "more.', reveals: 'higher-numbers-on-the-ph' },
                { text: 'more powerful', outcome: 'Not quite — Students often believe that higher numbers on the pH scale always indicate "stronger" or "more.', reveals: 'higher-numbers-on-the-ph' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting three unlabelled kitchen liquids — lemon juice, sugar water and soap solution — Farida\'s partner suggests the fastest method: \'Sip a drop of each; sour means acid, bitter and soapy means base.\'',
            decisions: [{ prompt: 'What is the safe and correct way to classify them?', options: [
                { text: 'Never taste unknown liquids — touch-test is risky too. Use an indicator instead: red litmus turning blue marks the basic soap solution, blue litmus turning red marks the acidic lemon juice, and no change marks the neutral sugar water.', outcome: 'This uses the defining colour-change behaviour of indicators, which is exactly why scientists test with litmus or turmeric rather than their senses.' },
                { text: 'The partner is right — taste is the official test, and since lemon juice is safe, any sour liquid is just a harmless food acid.', outcome: 'Taste-testing unknown liquids is dangerous because strong acids and bases corrode tissue; and \'all sour things are safe\' forgets that corrosive mineral acids are also acidic.', reveals: 'taste-to-classify' },
                { text: 'Just smell each bottle — strong smells are always bases, mild smells always acids, and no special paper is needed.', outcome: 'Odour does not map to acid or base at all; classification rests on indicator reactions and properties like soapy feel, not on how something smells.', reveals: 'smell-sorts-chemicals' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch07_010', title: 'You made it',
          caseStudy: { intro: 'Sour suggests acid, soapy suggests base — but let litmus paper take the risk. In chemistry, curiosity should never touch the tongue.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch07_007', difficulty: 'standard',
          question: 'The pH scale is a numerical scale ranging from 0 to 14 used to specify how.',
          hint: 'Review simple litmus and natural indicator tests in node c7_physics_ch07_002 before.',
          misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances.',
          parts: [
                { id: 'a', prompt: 'What is the numerical pH value of a purely neutral substance like pure distilled water at room temperature?', answer: 'The correct pH value of a purely neutral substance is 7',
                  options: ['The correct pH value of a purely neutral substance is 7', 'stronger', 'more powerful'],
                  hint: 'Review simple litmus and natural indicator tests in node c7_physics_ch07_002 before trying.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating.' },
                { id: 'b', prompt: 'Compare two household solutions: Solution A has a pH of 3, and Solution B has a pH of 6.', answer: 'Solution B (pH 6) is closer to neutral (pH 7)',
                  options: ['Solution B (pH 6) is closer to neutral (pH 7)', 'stronger', 'more powerful'],
                  hint: 'Review simple litmus and natural indicator tests in node c7_physics_ch07_002 before trying.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating.' }
          ],
            remediations: { 'higher-numbers-on-the-ph': { steps: ['To fix this misconception, draw a horizontal number line from 0 to 14 on the board with 7 clearly labeled in the center.', 'Write \'ACIDIC\' on the left side with an arrow pointing toward 0 indicating increasing acid strength, and write \'BASIC\'.', 'Have the student physically point out that moving away from 7 to the left increases acidity, while moving away from 7.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances.',
          parts: [
                { id: 'a', prompt: 'A student measures the pH of soapy water and gets a pH of 8, and then measures lemon juice and gets a pH of 2.', answer: 'The student\'s claim is incorrect',
                  options: ['The student\'s claim is incorrect', 'stronger', 'more powerful'],
                  hint: 'Review simple litmus and natural indicator tests in node c7_physics_ch07_002 before trying.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating.' }
          ],
            remediations: { 'higher-numbers-on-the-ph': { steps: ['To fix this misconception, draw a horizontal number line from 0 to 14 on the board with 7 clearly labeled in the center.', 'Write \'ACIDIC\' on the left side with an arrow pointing toward 0 indicating increasing acid strength, and write \'BASIC\'.', 'Have the student physically point out that moving away from 7 to the left increases acidity, while moving away from 7.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_008', difficulty: 'standard',
          question: 'Acids and bases play a crucial role in our everyday lives, determining the.',
          hint: 'Review c7_physics_ch07_006 to understand how acids and bases interact before studying.',
          misconception: 'Students often think that all acids found in everyday life are dangerous and corrosive, similar to laboratory acids.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids and bases play a crucial role in our everyday lives, determining the chemical',
                  options: ['Acids and bases play a crucial role in our everyday lives, determining the chemical', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,'],
                  hint: 'Review c7_physics_ch07_006 to understand how acids and bases interact before studying their.',
                  misconception: 'Students often think that all acids found in everyday life are dangerous and corrosive, similar to laboratory acids like concentrated.' }
          ],
            remediations: { 'all-acids-found-in-everyday': { steps: ['Remind students to differentiate between dilute edible acids found in food (like apples, curds, and lemons) and.', 'Have them check nutrition labels of common food items to see weak acids listed safely, and emphasize that concentration.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_009', difficulty: 'standard',
          question: 'Olfactory indicators are substances whose odor changes or disappears in acidic.',
          hint: 'Review the properties of basic substances and natural indicators in c7_physics_ch07_003.',
          misconception: 'Students often think that olfactory indicators change their physical color when mixed with acids and bases, confusing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Olfactory indicators are substances whose odor changes or disappears in acidic or basic',
                  options: ['Olfactory indicators are substances whose odor changes or disappears in acidic or basic', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,'],
                  hint: 'Review the properties of basic substances and natural indicators in c7_physics_ch07_003.',
                  misconception: 'Students often think that olfactory indicators change their physical color when mixed with acids and bases, confusing them with visual.' }
          ],
            remediations: { 'olfactory-indicators-change-their-physical': { steps: ['To fix this misconception, perform a hands-on activity using a handkerchief soaked in onion juice.', 'Smell the handkerchief, put a few drops of lemon juice on one corner (scent remains), and a few drops of soap solution.', 'Emphasize that we are using our nose (olfaction), not our eyes, and that only basic substances destroy the scent.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_010', difficulty: 'standard',
          question: 'Testing household substances with indicators is the process of using chemical.',
          hint: 'Review c7_physics_ch07_002 and c7_physics_ch07_003 to reinforce how individual indicators.',
          misconception: 'Students often think that every colored liquid in the kitchen is an indicator or that a single indicator can tell you.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Testing household substances with indicators is the process of using chemical',
                  options: ['Testing household substances with indicators is the process of using chemical', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,'],
                  hint: 'Review c7_physics_ch07_002 and c7_physics_ch07_003 to reinforce how individual indicators respond.',
                  misconception: 'Students often think that every colored liquid in the kitchen is an indicator or that a single indicator can tell you the exact strength.' }
          ],
            remediations: { 'every-colored-liquid-in-the': { steps: ['To fix this, guide the student to perform a controlled test using two clearly labeled cups: one with vinegar (acid) and.', 'Have them test China rose extract in both cups separately, noting the distinct pink and green outcomes.', 'Emphasize that indicators have specific, unique color ranges for acids versus bases, which is why we test known samples.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
