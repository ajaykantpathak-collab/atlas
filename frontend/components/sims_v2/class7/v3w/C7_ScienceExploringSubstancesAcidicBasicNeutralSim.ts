import type { SimDef } from '../../engine/types';
import C7_ScienceExploringSubstancesAcidicBasicNeutralSim from '../../../simulations/c6_12/C7_ScienceExploringSubstancesAcidicBasicNeutralSim';

/** v3 wrapped master — C7_ScienceExploringSubstancesAcidicBasicNeutralSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_scienceexploringsubstancesacidicbasicneutralsim: SimDef = {
    id: 'v3w_c7_scienceexploringsubstancesacidicbasicneutralsim',
    title: 'Exploring Substances Acidic Basic Neutral',
    subtitle: 'Covers the introduction to acids and bases, their general properties, and everyday.',
    classLevel: 7, subject: 'science', topic: 'Acids and Bases: Introduction and Examples',
    chapters: [],
    nodeIds: ['c7_physics_ch07_001', 'c7_physics_ch07_002', 'c7_physics_ch07_003', 'c7_physics_ch07_004', 'c7_physics_ch07_007', 'c7_physics_ch07_008', 'c7_physics_ch07_010', 'c7_physics_ch07_005', 'c7_physics_ch07_009', 'c7_physics_ch07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you squeeze a lemon in the kitchen or touch a bar of soapy water during a bath, you experience two very.', goal: 'Master Exploring Substances Acidic Basic Neutral.' },
    discovery: {
        question: 'What color does a yellow turmeric paste turn when it comes into contact with a basic substance like washing powder solution?',
        options: ['Turmeric turns reddish-brown in a basic solution', 'yellow', 'it does not react with bases'],
        answer: 'Turmeric turns reddish-brown in a basic solution',
        hook: 'Students often think that every natural plant indicator turns red in acids and blue in bases, assuming all indicators.',
    },
    teaching: [
        { title: 'Acids and bases are two major classes of.', text: 'Acids and bases are two major classes of chemical substances defined by their distinct properties, where acids generally taste sour and turn blue litmus red, while bases taste bitter, feel soapy to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch07_001', title: 'Acids and bases are two major classes.',
          scaffold: { problem: 'A student collects three household samples: tamarind extract, window cleaner, and common salt dissolved in water.',
            steps: [
            { text: 'Identify the properties of tamarind extract (contains tartaric acid, tastes sour).' },
            { text: 'Identify the properties of window cleaner (contains ammonia or cleaning agents, feels soapy and bitter/basic).' },
            { text: 'Identify the properties of salt water (neither sour nor bitter, neutral substance).' },
            { text: 'Map each property to its chemical classification (Acid, Base, or Neutral).' },
            { text: 'State final classifications with justification (Tamarind = Acid, Window cleaner = Base, Salt water = Neutral).', faded: true, blankAnswer: 'Tamarind extract is acidic, window cleaner is basic, and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_002', title: 'Litmus is a natural dye extracted from.',
          scaffold: { problem: 'A student tests a clear liquid sample from a chemistry kit in Delhi and observes that blue litmus paper turns red, while red litmus paper.',
            steps: [
            { text: 'Identify the initial test materials: blue litmus paper (starting blue) and red litmus paper (starting red).' },
            { text: 'Record the observation for blue litmus paper: it turned red upon contact with the liquid.' },
            { text: 'Record the observation for red litmus paper: it stayed red with no color change.' },
            { text: 'Apply the indicator rule: acids turn blue litmus red and leave red litmus red. Bases turn red litmus blue.' },
            { text: 'Conclude that since blue litmus turned red and red litmus stayed unchanged, the sample is acidic.', faded: true, blankAnswer: 'Acidic nature' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_003', title: 'Natural indicators are chemical.',
          scaffold: { problem: 'Priya prepares 50 mL of China rose indicator solution in a school laboratory beaker.',
            steps: [
            { text: 'Identify the starting indicator and its initial appearance in neutral water (China rose indicator is light.' },
            { text: 'Analyze what happens in Test Tube A when an acid (hydrochloric acid) is added (China rose turns a darker magenta/dark.' },
            { text: 'Analyze what happens in Test Tube B when a base (sodium hydroxide) is added (China rose turns a green color in basic.' },
            { text: 'Track the color shift relative to the initial medium, confirming that opposing chemical environments produce distinct.' },
            { text: 'State the final colors clearly with their respective test tubes (Test Tube A: dark pink/magenta; Test Tube B: green).', faded: true, blankAnswer: 'Test Tube A is dark magenta/pink; Test Tube B is green.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_004', title: 'A neutral substance is a chemical.',
          scaffold: { problem: 'A student tests a transparent liquid sample collected from a clean rainwater puddle in Delhi.',
            steps: [
            { text: 'Identify the given observations: red litmus paper shows no color change (stays red), blue litmus paper shows no color.' },
            { text: 'Recall the rule for indicators: acids turn blue litmus red, bases turn red litmus blue.' },
            { text: 'Conclude that since neither paper changed color, the substance possesses neither acidic nor basic properties.' },
            { text: 'Classify the substance as a neutral substance with an approximate pH of 7.', faded: true, blankAnswer: 'Neutral substance with an expected pH of 7.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_007', title: 'The pH scale is a numerical scale.',
          scaffold: { problem: 'A student in a Mumbai school laboratory dips universal indicator paper into a sample of household vinegar.',
            steps: [
            { text: 'Identify the given pH value from the chart reading, which is pH = 3 with units of dimensionless pH scale.' },
            { text: 'Compare the pH value to the neutral point of 7 using the rule: pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic.' },
            { text: 'Calculate the distance from neutrality: 7 - 3 = 4 units away from the neutral point toward the acidic extreme.' },
            { text: 'Verify physical reasonableness: Vinegar is a known food acid (acetic acid), so a pH of 3 is physically reasonable for a.' },
            { text: 'State the final classification and distance clearly with units.', faded: true, blankAnswer: 'Vinegar is acidic with a pH of 3, located 4 units below.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_008', title: 'Acids and bases play a crucial role in.',
          scaffold: { problem: 'A gardener has soil with an excessively low pH due to acid rain in an industrial area of Delhi.',
            steps: [
            { text: 'Identify the given quantities: total soil mass = 50 kg, mass of base per standard patch = 2 kg.' },
            { text: 'Set up a proportional relationship based on neutralisation stoichiometry: Bags needed = Total Soil / Soil per bag unit.' },
            { text: 'Substitute values with units: Bags = 50 kg / 2 kg per bag.' },
            { text: 'Compute the numerical value and track unit cancellation: 50 / 2 = 25, and kg cancels out leaving dimensionless count.' },
            { text: 'Verify the answer is physically reasonable: 25 bags is a logical amount for a large scale garden soil treatment.', faded: true, blankAnswer: '25 bags' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch07_002', title: 'Identify each idea',
          dissect: { specimen: 'Exploring Substances Acidic Basic Neutral', spots: [
            { id: 's1', label: 'Acids and bases are two', prompt: 'Which idea is this? — Acids and bases are two major classes of chemical substances defined by their distinct.', answer: 'Acids and bases are two', options: ['Acids and bases are two', 'Litmus is a natural dye', 'Natural indicators are chemical substances', 'A neutral substance is a'] },
            { id: 's2', label: 'Litmus is a natural dye', prompt: 'Which idea is this? — Litmus is a natural dye extracted from lichens used as an indicator to test whether a.', answer: 'Litmus is a natural dye', options: ['Litmus is a natural dye', 'Acids and bases are two', 'Natural indicators are chemical substances', 'A neutral substance is a'] },
            { id: 's3', label: 'Natural indicators are chemical substances', prompt: 'Which idea is this? — Natural indicators are chemical substances obtained from plants (such as red rose,.', answer: 'Natural indicators are chemical substances', options: ['Natural indicators are chemical substances', 'Acids and bases are two', 'Litmus is a natural dye', 'A neutral substance is a'] },
            { id: 's4', label: 'A neutral substance is a', prompt: 'Which idea is this? — A neutral substance is a chemical substance that is neither acidic nor basic, having a.', answer: 'A neutral substance is a', options: ['A neutral substance is a', 'Acids and bases are two', 'Litmus is a natural dye', 'Natural indicators are chemical substances'] },
            { id: 's5', label: 'The pH scale is a', prompt: 'Which idea is this? — The pH scale is a numerical scale ranging from 0 to 14 used to specify how acidic or.', answer: 'The pH scale is a', options: ['The pH scale is a', 'Acids and bases are two', 'Litmus is a natural dye', 'Natural indicators are chemical substances'] },
            { id: 's6', label: 'Acids and bases play a', prompt: 'Which idea is this? — Acids and bases play a crucial role in our everyday lives, determining the chemical.', answer: 'Acids and bases play a', options: ['Acids and bases play a', 'Acids and bases are two', 'Litmus is a natural dye', 'Natural indicators are chemical substances'] }
          ] } }
    ],
    explore: { component: C7_ScienceExploringSubstancesAcidicBasicNeutralSim, prompt: 'Explore the interactive — Exploring Substances Acidic Basic Neutral' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch07_001', difficulty: 'standard',
          question: 'Acids and bases are two major classes of chemical substances defined by their.',
          hint: 'Review natural indicators and basic substance observation techniques from Class 6.',
          misconception: 'Students often think that all acids are dangerous, artificial chemicals created in factories and that all natural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids and bases are two major classes of chemical substances defined by their distinct',
                  options: ['Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,', 'A neutral substance is a chemical substance that is neither acidic nor basic, having a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids are dangerous, artificial chemicals created in factories and that all natural things are neutral or.' }
          ],
            remediations: { 'all-acids-are-dangerous': { steps: ['To fix this, guide the student to examine food labels or recall eating curd, tamarind, and lemons, explaining that.', 'Contrast these weak food acids with mineral acids used in industries to show that acids vary widely in strength and.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_002', difficulty: 'standard',
          question: 'Litmus is a natural dye extracted from lichens used as an indicator to test.',
          hint: 'Review basic definitions of acids and bases in node c7_physics_ch07_001.',
          misconception: 'Students often think that red litmus paper turns blue in acids because they confuse the colors of red and blue.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a',
                  options: ['Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Natural indicators are chemical substances obtained from plants (such as red rose,', 'A neutral substance is a chemical substance that is neither acidic nor basic, having a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that red litmus paper turns blue in acids because they confuse the colors of red and blue indicators, or they believe.' }
          ],
            remediations: { 'red-litmus-paper-turns-blue': { steps: ['To correct this, take a clear strip of red litmus and dip it in plain tap water (neutral) to see that it stays red,.', 'Emphasize that "no change" is the diagnostic result for neutral substances.', 'Then test vinegar (acid) with blue litmus to watch it turn red.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_003', difficulty: 'standard',
          question: 'Natural indicators are chemical substances obtained from plants (such as red.',
          hint: 'Review node c7_physics_ch07_002 to reinforce how indicators visually signal the presence.',
          misconception: 'Students often think that every natural plant indicator turns red in acids and blue in bases, assuming all indicators.',
          parts: [
                { id: 'a', prompt: 'What color does a yellow turmeric paste turn when it comes into contact with a basic substance like washing powder solution?', answer: 'Turmeric turns reddish-brown in a basic solution',
                  options: ['Turmeric turns reddish-brown in a basic solution', 'yellow', 'it does not react with bases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that every natural plant indicator turns red in acids and blue in bases, assuming all indicators behave exactly like.' }
          ],
            remediations: { 'every-natural-plant-indicator-turns': { steps: ['To fix this misconception, take a real piece of white paper stained with turmeric paste.', 'Apply a few drops of lemon juice (acid) to one half and soap solution (base) to the other half.', 'Observe that the acid side stays yellow (no change), proving indicators do not all follow the same universal rule,.', 'Record these specific color charts in your notebook to separate turmeric\'s behavior from litmus paper.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_004', difficulty: 'standard',
          question: 'A neutral substance is a chemical substance that is neither acidic nor basic,.',
          hint: 'Review litmus paper behavior in c7_physics_ch07_002 before classifying neutral substances.',
          misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been.',
          parts: [
                { id: 'a', prompt: 'What happens to the color of blue litmus paper when it is dipped into a neutral substance like pure distilled water?', answer: 'The color of the blue litmus paper remains blue with no change whatsoever',
                  options: ['The color of the blue litmus paper remains blue with no change whatsoever', 'neutral'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' },
                { id: 'b', prompt: 'Why do neutral substances fail to change the color of either red or blue litmus paper?', answer: 'Neutral substances fail to change litmus color',
                  options: ['Neutral substances fail to change litmus color', 'neutral'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' },
                { id: 'c', prompt: 'Analyze the following test results for three unknown solutions: Solution A turns blue litmus red; Solution B turns red litmus blue; Solution C shows no color.', answer: 'Solution C is neutral',
                  options: ['Solution C is neutral', 'neutral'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "neutral" means a substance is just a very weak acid or a very weak base that has been diluted with water, rather.' }
          ],
            remediations: { 'neutral-means-a-substance-is': { steps: ['To fix this misconception, have the student test strong vinegar (acid), soapy water (base), and pure distilled water.', 'Emphasize that distilled water shows zero color shift on both papers, proving it is not a weak version of either, but.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_007', difficulty: 'standard',
          question: 'The pH scale is a numerical scale ranging from 0 to 14 used to specify how.',
          hint: 'Review simple litmus and natural indicator tests in node c7_physics_ch07_002 before.',
          misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in.',
          parts: [
                { id: 'a', prompt: 'What is the numerical pH value of a purely neutral substance like pure distilled water at room temperature?', answer: 'The correct pH value of a purely neutral substance is 7',
                  options: ['The correct pH value of a purely neutral substance is 7', 'stronger', 'more powerful'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating it.' },
                { id: 'b', prompt: 'Compare two household solutions: Solution A has a pH of 3, and Solution B has a pH of 6.', answer: 'Solution B (pH 6) is closer to neutral (pH 7)',
                  options: ['Solution B (pH 6) is closer to neutral (pH 7)', 'stronger', 'more powerful'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating it.' }
          ],
            remediations: { 'higher-numbers-on-the-ph': { steps: ['To fix this misconception, draw a horizontal number line from 0 to 14 on the board with 7 clearly labeled in the center.', 'Write \'ACIDIC\' on the left side with an arrow pointing toward 0 indicating increasing acid strength, and write \'BASIC\'.', 'Have the student physically point out that moving away from 7 to the left increases acidity, while moving away from 7.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in.',
          parts: [
                { id: 'a', prompt: 'A student measures the pH of soapy water and gets a pH of 8, and then measures lemon juice and gets a pH of 2.', answer: 'The student\'s claim is incorrect',
                  options: ['The student\'s claim is incorrect', 'stronger', 'more powerful'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating it.' },
                { id: 'b', prompt: 'Compare two household solutions: Solution A has a pH of 3, and Solution B has a pH of 6.', answer: 'Solution B (pH 6) is closer to neutral (pH 7)',
                  options: ['Solution B (pH 6) is closer to neutral (pH 7)', 'stronger', 'more powerful'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that higher numbers on the pH scale always indicate "stronger" or "more powerful" substances in general, treating it.' }
          ],
            remediations: { 'higher-numbers-on-the-ph': { steps: ['To fix this misconception, draw a horizontal number line from 0 to 14 on the board with 7 clearly labeled in the center.', 'Write \'ACIDIC\' on the left side with an arrow pointing toward 0 indicating increasing acid strength, and write \'BASIC\'.', 'Have the student physically point out that moving away from 7 to the left increases acidity, while moving away from 7.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_008', difficulty: 'standard',
          question: 'Acids and bases play a crucial role in our everyday lives, determining the.',
          hint: 'Review c7_physics_ch07_006 to understand how acids and bases interact before studying.',
          misconception: 'Students often think that all acids found in everyday life are dangerous and corrosive, similar to laboratory acids.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids and bases play a crucial role in our everyday lives, determining the chemical',
                  options: ['Acids and bases play a crucial role in our everyday lives, determining the chemical', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'Litmus is a natural dye extracted from lichens used as an indicator to test whether a', 'Natural indicators are chemical substances obtained from plants (such as red rose,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids found in everyday life are dangerous and corrosive, similar to laboratory acids like concentrated.' }
          ],
            remediations: { 'all-acids-found-in-everyday': { steps: ['Remind students to differentiate between dilute edible acids found in food (like apples, curds, and lemons) and.', 'Have them check nutrition labels of common food items to see weak acids listed safely, and emphasize that concentration.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
