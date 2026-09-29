import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch07_p1: SimDef = {
    id: 'v3_c7_physics_ch07_p1',
    title: 'Exploring Substances: Acidic, Basic, and Neutral · Part 1/2',
    subtitle: 'Covers the introduction to acids and bases, their general properties, and everyday.',
    classLevel: 7, subject: 'physics', topic: 'Exploring Substances: Acidic, Basic, and Neutral · Part 1/2',
    chapters: ['c7_physics_ch07'],
    nodeIds: ['c7_physics_ch07_001', 'c7_physics_ch07_002', 'c7_physics_ch07_003', 'c7_physics_ch07_004', 'c7_physics_ch07_005', 'c7_physics_ch07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you squeeze a lemon in the kitchen or touch a bar of soapy water during a bath, you experience two very.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Lemons and curd are acids you safely eat every day — so a student figures lab acids must be safe to taste too. What is dangerously wrong with that logic?',
        options: ['Weak organic acids in food are nothing like strong corrosive lab acids — never taste a laboratory chemical', 'Nothing — sour is sour, all acids are alike', 'Lab acids are safe if you sip slowly', 'Only bases are dangerous, acids are fine'],
        answer: 'Weak organic acids in food are nothing like strong corrosive lab acids — never taste a laboratory chemical',
        hook: 'Acids taste sour and turn blue litmus red; bases taste bitter, feel soapy, and turn red litmus blue. But senses are for kitchen clues — in the lab, indicators do the tasting for you. And distilled water? Perfectly neutral, no matter where it is stored.',
    },
    teaching: [
        { title: 'Acids and Bases: Introduction and Examples', text: 'Acids and bases are two major classes of chemical substances defined by their distinct properties, where acids generally taste sour and turn blue litmus red, while bases taste bitter, feel soapy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch07_001', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Sort a shelf of everyday liquids — lemon juice, soap solution, vinegar, distilled water — into acid, base, and neutral using only indicator clues, no tasting allowed.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch07_003', title: 'Natural Indicators: Red Rose, Turmeric, China Rose',
          caseStudy: { intro: 'Imagine adding a spoonful of yellow turmeric powder to a white cotton shirt while eating dal, and when your mother washes it with soap, the yellow stain.',
            decisions: [{ prompt: 'What color does a yellow turmeric paste turn when it comes into contact with a basic substance like washing powder solution?', options: [
                { text: 'Turmeric turns reddish-brown in a basic solution', outcome: 'Turmeric turns reddish-brown in a basic solution. A student who answers "yellow" or "green" has.' },
                { text: 'yellow', outcome: 'Not quite — Students often think that every natural plant indicator turns red in acids and blue in bases.', reveals: 'every-natural-plant-indicator-turns' },
                { text: 'it does not react with bases', outcome: 'Not quite — Students often think that every natural plant indicator turns red in acids and blue in bases.', reveals: 'every-natural-plant-indicator-turns' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch07_004', title: 'Neutral Substances: Neither Acidic Nor Basic',
          caseStudy: { intro: 'When you touch a drop of pure distilled water or salt water from a kitchen tap, it feels neither slippery like soap nor harsh like vinegar, and it does not.',
            decisions: [{ prompt: 'What happens to the color of blue litmus paper when it is dipped into a neutral substance like pure distilled water?', options: [
                { text: 'The color of the blue litmus paper remains blue with no change whatsoever', outcome: 'The color of the blue litmus paper remains blue with no change whatsoever.' },
                { text: 'neutral', outcome: 'Not quite — Students often think that "neutral" means a substance is just a very weak acid or a very weak base.', reveals: 'neutral-means-a-substance-is' },
                { text: 'it turns red or colorless', outcome: 'Not quite — Students often think that "neutral" means a substance is just a very weak acid or a very weak base.', reveals: 'neutral-means-a-substance-is' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch07_006', title: 'Neutralisation Reaction: Acid + Base -> Salt + Water',
          caseStudy: { intro: 'When you touch a test tube in the school laboratory in which dilute hydrochloric acid and sodium hydroxide are mixed, you notice the glass feels remarkably.',
            decisions: [{ prompt: 'What are the two standard products always formed in a complete neutralisation reaction between an acid and a base?', options: [
                { text: 'The products are salt and water', outcome: 'The products are salt and water. A student who answers "acid and salt" or "only water" fails.' },
                { text: 'acid and salt', outcome: 'Not quite — Students often believe that mixing an acid and a base creates a completely pure substance that.', reveals: 'mixing-an-acid-and-a' },
                { text: 'only water', outcome: 'Not quite — Students often believe that mixing an acid and a base creates a completely pure substance that.', reveals: 'mixing-an-acid-and-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting three unlabelled kitchen liquids — lemon juice, sugar water and soap solution — Farida\'s partner suggests the fastest method: \'Sip a drop of each; sour means acid, bitter and soapy means base.\'',
            decisions: [{ prompt: 'What is the safe and correct way to classify them?', options: [
                { text: 'Never taste unknown liquids — touch-test is risky too. Use an indicator instead: red litmus turning blue marks the basic soap solution, blue litmus turning red marks the acidic lemon juice, and no change marks the neutral sugar water.', outcome: 'This uses the defining colour-change behaviour of indicators, which is exactly why scientists test with litmus or turmeric rather than their senses.' },
                { text: 'The partner is right — taste is the official test, and since lemon juice is safe, any sour liquid is just a harmless food acid.', outcome: 'Taste-testing unknown liquids is dangerous because strong acids and bases corrode tissue; and \'all sour things are safe\' forgets that corrosive mineral acids are also acidic.', reveals: 'taste-to-classify' },
                { text: 'Just smell each bottle — strong smells are always bases, mild smells always acids, and no special paper is needed.', outcome: 'Odour does not map to acid or base at all; classification rests on indicator reactions and properties like soapy feel, not on how something smells.', reveals: 'smell-sorts-chemicals' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sour suggests acid, soapy suggests base — but let litmus paper take the risk. In chemistry, curiosity should never touch the tongue.',
            decisions: [{ prompt: 'What comes next? Exploring Substances: Acidic, Basic, and Neutral · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Exploring Substances: Acidic, Basic, and Neutral · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch07_001', difficulty: 'standard',
          question: 'Acids and bases are two major classes of chemical substances defined by their.',
          hint: 'Review natural indicators and basic substance observation techniques from Class 6.',
          misconception: 'Students often think that all acids are dangerous, artificial chemicals created in factories and that all natural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids and bases are two major classes of chemical substances defined by their distinct',
                  options: ['Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,', 'A neutral substance is a chemical substance that is neither acidic nor basic, having a'],
                  hint: 'Review natural indicators and basic substance observation techniques from Class 6.',
                  misconception: 'Students often think that all acids are dangerous, artificial chemicals created in factories and that all natural things are neutral.' }
          ],
            remediations: { 'all-acids-are-dangerous': { steps: ['To fix this, guide the student to examine food labels or recall eating curd, tamarind, and lemons, explaining that.', 'Contrast these weak food acids with mineral acids used in industries to show that acids vary widely in strength and.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_002', difficulty: 'standard',
          question: 'Litmus is a natural dye extracted from lichens used as an indicator to test.',
          hint: 'Review basic definitions of acids and bases in node c7_physics_ch07_001.',
          misconception: 'Students often think that red litmus paper turns blue in acids because they confuse the colors of red and blue.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a',
                  options: ['Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Natural indicators are chemical substances obtained from plants (such as red rose,', 'A neutral substance is a chemical substance that is neither acidic nor basic, having a'],
                  hint: 'Review basic definitions of acids and bases in node c7_physics_ch07_001.',
                  misconception: 'Students often think that red litmus paper turns blue in acids because they confuse the colors of red and blue indicators, or they believe.' }
          ],
            remediations: { 'red-litmus-paper-turns-blue': { steps: ['To correct this, take a clear strip of red litmus and dip it in plain tap water (neutral) to see that it stays red.', 'Emphasize that "no change" is the diagnostic result for neutral substances.', 'Then test vinegar (acid) with blue litmus to watch it turn red.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_003', difficulty: 'standard',
          question: 'Natural indicators are chemical substances obtained from plants (such as red.',
          hint: 'Review node c7_physics_ch07_002 to reinforce how indicators visually signal the presence.',
          misconception: 'Students often think that every natural plant indicator turns red in acids and blue in bases, assuming all indicators.',
          parts: [
                { id: 'a', prompt: 'What color does a yellow turmeric paste turn when it comes into contact with a basic substance like washing powder solution?', answer: 'Turmeric turns reddish-brown in a basic solution',
                  options: ['Turmeric turns reddish-brown in a basic solution', 'yellow', 'it does not react with bases'],
                  hint: 'Review node c7_physics_ch07_002 to reinforce how indicators visually signal the presence.',
                  misconception: 'Students often think that every natural plant indicator turns red in acids and blue in bases, assuming all indicators behave exactly like.' }
          ],
            remediations: { 'every-natural-plant-indicator-turns': { steps: ['To fix this misconception, take a real piece of white paper stained with turmeric paste.', 'Apply a few drops of lemon juice (acid) to one half and soap solution (base) to the other half.', 'Observe that the acid side stays yellow (no change), proving indicators do not all follow the same universal rule.', 'Record these specific color charts in your notebook to separate turmeric\'s behavior from litmus paper.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_004', difficulty: 'standard',
          question: 'A neutral substance is a chemical substance that is neither acidic nor basic.',
          hint: 'Review litmus paper behavior in c7_physics_ch07_002 before classifying neutral substances.',
          misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been.',
          parts: [
                { id: 'a', prompt: 'What happens to the color of blue litmus paper when it is dipped into a neutral substance like pure distilled water?', answer: 'The color of the blue litmus paper remains blue with no change whatsoever',
                  options: ['The color of the blue litmus paper remains blue with no change whatsoever', 'neutral', 'it turns red or colorless'],
                  hint: 'Review litmus paper behavior in c7_physics_ch07_002 before classifying neutral substances.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' },
                { id: 'b', prompt: 'Why do neutral substances fail to change the color of either red or blue litmus paper?', answer: 'Neutral substances fail to change litmus color',
                  options: ['Neutral substances fail to change litmus color', 'neutral'],
                  hint: 'Review litmus paper behavior in c7_physics_ch07_002 before classifying neutral substances.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' },
                { id: 'c', prompt: 'If 10 mL of a sugar solution shows no color change with red litmus and no color change with blue litmus, what is its chemical classification and what is its.', answer: 'Observe indicator test results: red litmus stays red, blue litmus stays blue',
                  options: ['Observe indicator test results: red litmus stays red, blue litmus stays blue', 'neutral'],
                  hint: 'Review litmus paper behavior in c7_physics_ch07_002 before classifying neutral substances.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' },
                { id: 'd', prompt: 'Analyze the following test results for three unknown solutions: Solution A turns blue litmus red; Solution B turns red litmus blue; Solution C shows no color.', answer: 'Solution C is neutral',
                  options: ['Solution C is neutral', 'neutral'],
                  hint: 'Review litmus paper behavior in c7_physics_ch07_002 before classifying neutral substances.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' }
          ],
            remediations: { 'neutral-means-a-substance-is': { steps: ['To fix this misconception, have the student test strong vinegar (acid), soapy water (base), and pure distilled water.', 'Emphasize that distilled water shows zero color shift on both papers, proving it is not a weak version of either, but.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_005', difficulty: 'standard',
          question: 'When an acidic substance and a basic substance are mixed in the correct.',
          hint: 'Review c7_physics_ch07_001 and c7_physics_ch07_002 to re-familiarize yourself with.',
          misconception: 'Students often think that mixing an acid and a base simply dilutes one substance with the other, like adding water.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When an acidic substance and a basic substance are mixed in the correct proportions, they',
                  options: ['When an acidic substance and a basic substance are mixed in the correct proportions, they', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,'],
                  hint: 'Review c7_physics_ch07_001 and c7_physics_ch07_002 to re-familiarize yourself with indicator colors.',
                  misconception: 'Students often think that mixing an acid and a base simply dilutes one substance with the other, like adding water to juice, rather than.' }
          ],
            remediations: { 'mixing-an-acid-and-a': { steps: ['To fix this, take a small amount of vinegar in a cup, add a drop of China rose indicator (which turns dark pink), and.', 'Watch the color shift from pink to green/purple and finally to a neutral light pink or clear state, and feel the.', 'Emphasize that the original sour taste and sharp properties of the vinegar have disappeared because the molecules.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_006', difficulty: 'standard',
          question: 'A neutralisation reaction is a chemical process in which an acid reacts.',
          hint: 'Review node c7_physics_ch07_005 on what happens when acids and bases mix before.',
          misconception: 'Students often believe that mixing an acid and a base creates a completely pure substance that is always sodium.',
          parts: [
                { id: 'a', prompt: 'What are the two standard products always formed in a complete neutralisation reaction between an acid and a base?', answer: 'The products are salt and water',
                  options: ['The products are salt and water', 'acid and salt', 'only water'],
                  hint: 'Review node c7_physics_ch07_005 on what happens when acids and bases mix before attempting reaction.',
                  misconception: 'Students often believe that mixing an acid and a base creates a completely pure substance that is always sodium chloride (common salt).' }
          ],
            remediations: { 'mixing-an-acid-and-a': { steps: ['To fix this, guide the student to break down the word equation into its specific components using building blocks.', 'Show that the metal part of the base (like potassium or sodium) combines with the non-metal part of the acid (like.', 'Practice writing three different salt names using hydrochloric, sulfuric, and nitric acids with sodium hydroxide.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
