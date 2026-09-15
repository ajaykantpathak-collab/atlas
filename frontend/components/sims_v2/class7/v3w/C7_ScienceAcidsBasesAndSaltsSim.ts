import type { SimDef } from '../../engine/types';
import C7_ScienceAcidsBasesAndSaltsSim from '../../../simulations/c6_12/C7_ScienceAcidsBasesAndSaltsSim';

/** v3 wrapped master — C7_ScienceAcidsBasesAndSaltsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_scienceacidsbasesandsaltssim: SimDef = {
    id: 'v3w_c7_scienceacidsbasesandsaltssim',
    title: 'Acids Bases And Salts',
    subtitle: 'Covers the qualitative outcomes, temperature effects, and general chemical nature of.',
    classLevel: 7, subject: 'science', topic: 'What Happens When Acidic and Basic Substances Mix',
    chapters: [],
    nodeIds: ['c7_physics_ch07_005', 'c7_physics_ch07_006', 'c7_physics_ch07_001', 'c7_physics_ch07_004', 'c7_physics_ch07_007', 'c7_physics_ch07_008', 'c7_physics_ch07_009', 'c7_physics_ch07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine washing your hands with soap after accidentally touching lemon juice; you notice a sudden change in.', goal: 'Master Acids Bases And Salts.' },
    discovery: {
        question: 'What are the two standard products always formed in a complete neutralisation reaction between an acid and a base?',
        options: ['The products are salt and water', 'acid and salt', 'only water'],
        answer: 'The products are salt and water',
        hook: 'Students often believe that mixing an acid and a base creates a completely pure substance that is always sodium.',
    },
    teaching: [
        { title: 'When an acidic substance and a basic.', text: 'When an acidic substance and a basic substance are mixed in the correct proportions, they chemically neutralize each other\'s properties, producing a salt and water along with the release of heat.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch07_005', title: 'When an acidic substance and a basic.',
          scaffold: { problem: 'A student mixes 20 mL of dilute hydrochloric acid with 20 mL of sodium hydroxide solution in a school laboratory beaker.',
            steps: [
            { text: 'Identify the initial condition—the acid turned blue litmus red, confirming an acidic environment.' },
            { text: 'Identify the action performed—mixing an equal quantity of base (sodium hydroxide) with the acid.' },
            { text: 'Analyze the observation—the final mixture causes no color change on blue litmus paper.' },
            { text: 'Apply the neutralization principle—when an acid and a base combine, their opposing properties cancel out, yielding a.' },
            { text: 'Verify physical reasonableness—since blue litmus remains blue in neutral substances, the mixture has been successfully.', faded: true, blankAnswer: 'The final mixture is neutral.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_006', title: 'A neutralisation reaction is a chemical.',
          scaffold: { problem: 'In a school chemistry laboratory in Delhi, a student mixes 30 ml of dilute hydrochloric acid with 30 ml of sodium hydroxide solution.',
            steps: [
            { text: 'Identify given values: Initial temperature ($T_1$) = 25 °C, Final temperature ($T_2$) = 31 °C.' },
            { text: 'Identify what to find: Temperature change ($\\Delta T$) and the type of thermal energy process.' },
            { text: 'Compute temperature change: $\\Delta T = T_2 - T_1 = 31\\text{ °C} - 25\\text{ °C} = +6\\text{ °C}$.' },
            { text: 'Track unit cancellation and verify: Subtraction of temperatures results in a difference in degrees Celsius (°C).' },
            { text: 'State physical conclusion: Since the temperature increased by 6 °C, thermal energy was released, meaning the.', faded: true, blankAnswer: 'Temperature change is +6 °C (exothermic reaction releasing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch07_001', title: 'Acids and bases are two major classes.',
          scaffold: { problem: 'A student collects three household samples: tamarind extract, window cleaner, and common salt dissolved in water.',
            steps: [
            { text: 'Identify the properties of tamarind extract (contains tartaric acid, tastes sour).' },
            { text: 'Identify the properties of window cleaner (contains ammonia or cleaning agents, feels soapy and bitter/basic).' },
            { text: 'Identify the properties of salt water (neither sour nor bitter, neutral substance).' },
            { text: 'Map each property to its chemical classification (Acid, Base, or Neutral).' },
            { text: 'State final classifications with justification (Tamarind = Acid, Window cleaner = Base, Salt water = Neutral).', faded: true, blankAnswer: 'Tamarind extract is acidic, window cleaner is basic, and.' }
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
        { type: 'dissect', nodeId: 'c7_physics_ch07_006', title: 'Identify each idea',
          dissect: { specimen: 'Acids Bases And Salts', spots: [
            { id: 's1', label: 'When an acidic substance and', prompt: 'Which idea is this? — When an acidic substance and a basic substance are mixed in the correct proportions, they.', answer: 'When an acidic substance and', options: ['When an acidic substance and', 'A neutralisation reaction is a', 'Acids and bases are two', 'A neutral substance is a'] },
            { id: 's2', label: 'A neutralisation reaction is a', prompt: 'Which idea is this? — A neutralisation reaction is a chemical process in which an acid reacts completely with a.', answer: 'A neutralisation reaction is a', options: ['A neutralisation reaction is a', 'When an acidic substance and', 'Acids and bases are two', 'A neutral substance is a'] },
            { id: 's3', label: 'Acids and bases are two', prompt: 'Which idea is this? — Acids and bases are two major classes of chemical substances defined by their distinct.', answer: 'Acids and bases are two', options: ['Acids and bases are two', 'When an acidic substance and', 'A neutralisation reaction is a', 'A neutral substance is a'] },
            { id: 's4', label: 'A neutral substance is a', prompt: 'Which idea is this? — A neutral substance is a chemical substance that is neither acidic nor basic, having a.', answer: 'A neutral substance is a', options: ['A neutral substance is a', 'When an acidic substance and', 'A neutralisation reaction is a', 'Acids and bases are two'] },
            { id: 's5', label: 'The pH scale is a', prompt: 'Which idea is this? — The pH scale is a numerical scale ranging from 0 to 14 used to specify how acidic or.', answer: 'The pH scale is a', options: ['The pH scale is a', 'When an acidic substance and', 'A neutralisation reaction is a', 'Acids and bases are two'] },
            { id: 's6', label: 'Acids and bases play a', prompt: 'Which idea is this? — Acids and bases play a crucial role in our everyday lives, determining the chemical.', answer: 'Acids and bases play a', options: ['Acids and bases play a', 'When an acidic substance and', 'A neutralisation reaction is a', 'Acids and bases are two'] }
          ] } }
    ],
    explore: { component: C7_ScienceAcidsBasesAndSaltsSim, prompt: 'Explore the interactive — Acids Bases And Salts' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch07_005', difficulty: 'standard',
          question: 'When an acidic substance and a basic substance are mixed in the correct.',
          hint: 'Review c7_physics_ch07_001 and c7_physics_ch07_002 to re-familiarize yourself with.',
          misconception: 'Students often think that mixing an acid and a base simply dilutes one substance with the other, like adding water to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When an acidic substance and a basic substance are mixed in the correct proportions, they',
                  options: ['When an acidic substance and a basic substance are mixed in the correct proportions, they', 'A neutralisation reaction is a chemical process in', 'Acids and bases are two major classes of chemical substances defined by their distinct', 'A neutral substance is a chemical substance that is neither acidic nor basic, having a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that mixing an acid and a base simply dilutes one substance with the other, like adding water to juice, rather than.' }
          ],
            remediations: { 'mixing-an-acid-and-a': { steps: ['To fix this, take a small amount of vinegar in a cup, add a drop of China rose indicator (which turns dark pink), and.', 'Watch the color shift from pink to green/purple and finally to a neutral light pink or clear state, and feel the.', 'Emphasize that the original sour taste and sharp properties of the vinegar have disappeared because the molecules.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_006', difficulty: 'standard',
          question: 'A neutralisation reaction is a chemical process in which an acid reacts.',
          hint: 'Review node c7_physics_ch07_005 on what happens when acids and bases mix before.',
          misconception: 'Students often believe that mixing an acid and a base creates a completely pure substance that is always sodium.',
          parts: [
                { id: 'a', prompt: 'What are the two standard products always formed in a complete neutralisation reaction between an acid and a base?', answer: 'The products are salt and water',
                  options: ['The products are salt and water', 'acid and salt', 'only water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mixing an acid and a base creates a completely pure substance that is always sodium chloride (common salt).' }
          ],
            remediations: { 'mixing-an-acid-and-a': { steps: ['To fix this, guide the student to break down the word equation into its specific components using building blocks.', 'Show that the metal part of the base (like potassium or sodium) combines with the non-metal part of the acid (like.', 'Practice writing three different salt names using hydrochloric, sulfuric, and nitric acids with sodium hydroxide.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch07_001', difficulty: 'standard',
          question: 'Acids and bases are two major classes of chemical substances defined by their.',
          hint: 'Review natural indicators and basic substance observation techniques from Class 6.',
          misconception: 'Students often think that all acids are dangerous, artificial chemicals created in factories and that all natural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids and bases are two major classes of chemical substances defined by their distinct',
                  options: ['Acids and bases are two major classes of chemical substances defined by their distinct', 'When an acidic substance and a basic substance are mixed in the correct proportions, they', 'A neutralisation reaction is a chemical process in', 'A neutral substance is a chemical substance that is neither acidic nor basic, having a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids are dangerous, artificial chemicals created in factories and that all natural things are neutral or.' }
          ],
            remediations: { 'all-acids-are-dangerous': { steps: ['To fix this, guide the student to examine food labels or recall eating curd, tamarind, and lemons, explaining that.', 'Contrast these weak food acids with mineral acids used in industries to show that acids vary widely in strength and.'] } } },
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
                  options: ['Acids and bases play a crucial role in our everyday lives, determining the chemical', 'When an acidic substance and a basic substance are mixed in the correct proportions, they', 'A neutralisation reaction is a chemical process in', 'Acids and bases are two major classes of chemical substances defined by their distinct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids found in everyday life are dangerous and corrosive, similar to laboratory acids like concentrated.' }
          ],
            remediations: { 'all-acids-found-in-everyday': { steps: ['Remind students to differentiate between dilute edible acids found in food (like apples, curds, and lemons) and.', 'Have them check nutrition labels of common food items to see weak acids listed safely, and emphasize that concentration.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
