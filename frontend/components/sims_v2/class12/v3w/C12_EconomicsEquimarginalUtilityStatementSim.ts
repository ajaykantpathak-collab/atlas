import type { SimDef } from '../../engine/types';
import C12_EconomicsEquimarginalUtilityStatementSim from '../../../simulations/c6_12/C12_EconomicsEquimarginalUtilityStatementSim';

/** v3 wrapped master — C12_EconomicsEquimarginalUtilityStatementSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicsequimarginalutilitystatementsim: SimDef = {
    id: 'v3w_c12_economicsequimarginalutilitystatementsim',
    title: 'Equimarginal Utility Statement',
    subtitle: 'This node covers the statement, assumptions, and intuitive explanation of the Law of.',
    classLevel: 12, subject: 'economics', topic: 'Law of Diminishing Marginal Utility: Statement and Assumptions',
    chapters: [],
    nodeIds: ['c12_eco_cbse_02_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are at a Delhi wedding buffet — the first plate of butter chicken gives immense satisfaction, the.', goal: 'Master Equimarginal Utility Statement.' },
    discovery: {
        question: 'A consumer\'s total utility (in utils) from consuming mangoes is given: TU(1)=20, TU(2)=36, TU(3)=48, TU(4)=56, TU(5)=60, TU(6)=60, TU(7)=57.',
        options: ['MU(1)=20, MU(2)=16, MU(3)=12, MU(4)=8, MU(5)=4, MU(6)=0, MU(7)=-3', 'diminishing', 'diminished relative to first'],
        answer: 'MU(1)=20, MU(2)=16, MU(3)=12, MU(4)=8, MU(5)=4, MU(6)=0, MU(7)=-3',
        hook: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with.',
    },
    teaching: [
        { title: 'The Law of Diminishing Marginal Utility.', text: 'The Law of Diminishing Marginal Utility states that as a consumer consumes successive units of a homogeneous good within a given time period, the marginal utility derived from each additional unit.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_002', title: 'The Law of Diminishing Marginal Utility.',
          scaffold: { problem: 'Ritu consumes ice cream scoops on a hot Delhi afternoon. Her total utility (in utils) is: 1 scoop = 25, 2 scoops = 45, 3 scoops = 60, 4.',
            steps: [
            { text: 'Compute MU for each scoop using MUₙ = TUₙ - TUₙ₋₁. MU₁ = 25 - 0 = 25; MU₂ = 45 - 25 = 20; MU₃ = 60 - 45 = 15; MU₄ = 70.' },
            { text: 'Observe MU sequence: 25, 20, 15, 10, 5, 0, -5. MU diminishes from the very first scoop (25 > 20 > 15...).' },
            { text: 'Total utility maximized when MU = 0 → at 5th and 6th scoops (TU = 75). Beyond 6th scoop, MU < 0 so TU falls.' },
            { text: 'Convert price to utils: Price = ₹30, MU of money = 1 util/₹5 → Price in utils = 30/5 = 6 utils.' },
            { text: 'Verify: At 4 scoops, MU = 10 utils = ₹50 worth of satisfaction > ₹30 cost. At 5 scoops, MU = 5 utils = ₹25 < ₹30 cost.', faded: true, blankAnswer: '(a) MU: 25, 20, 15, 10, 5, 0, -5 utils; (b) From 1st scoop;.' }
            ] } }
    ],
    explore: { component: C12_EconomicsEquimarginalUtilityStatementSim, prompt: 'Explore the interactive — Equimarginal Utility Statement' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_002', difficulty: 'standard',
          question: 'The Law of Diminishing Marginal Utility states that as a consumer consumes.',
          hint: 'If unable to compute MU from TU or explain why MU slope matters, revisit.',
          misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with.',
          parts: [
                { id: 'a', prompt: 'A consumer\'s total utility (in utils) from consuming mangoes is given: TU(1)=20, TU(2)=36, TU(3)=48, TU(4)=56, TU(5)=60, TU(6)=60, TU(7)=57.', answer: 'MU(1)=20, MU(2)=16, MU(3)=12, MU(4)=8, MU(5)=4, MU(6)=0, MU(7)=-3',
                  options: ['MU(1)=20, MU(2)=16, MU(3)=12, MU(4)=8, MU(5)=4, MU(6)=0, MU(7)=-3', 'diminishing', 'diminished relative to first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' },
                { id: 'b', prompt: '"Diamonds have high marginal utility, water has low marginal utility — therefore diamonds are more expensive than water." Analyze this statement using the Law.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'water is essential so it should be expensive', 'total utility decreases after a point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' }
          ],
            remediations: { 'the-law-of-dmu-means': { steps: ['Revisit c12_eco_cbse_02_001 — reconstruct the TU-MU relationship numerically: pick any 5-unit consumption schedule,.', 'Identify the exact unit where MU becomes zero and where TU peaks — verify they coincide.', 'Practice the "MU = Price" equilibrium condition with a numerical example: if MU schedule is 20, 16, 12, 8, 4 and price.', 'Re-diagnostic: Given TU = 10, 18, 24, 28, 30, 30, 28 — find where DMU starts, TU max, and MU negative.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The Law of Diminishing Marginal Utility fails for addictive goods like cigarettes because the more a person smokes, the more they crave the next.', answer: 'The evaluation is incorrect',
                  options: ['The evaluation is incorrect', 'total utility decreases after a point', 'draw TU and MU curves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' },
                { id: 'b', prompt: '"Diamonds have high marginal utility, water has low marginal utility — therefore diamonds are more expensive than water." Analyze this statement using the Law.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'water is essential so it should be expensive', 'total utility decreases after a point', 'draw TU and MU curves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' }
          ],
            remediations: { 'the-law-of-dmu-means': { steps: ['Revisit c12_eco_cbse_02_001 — reconstruct the TU-MU relationship numerically: pick any 5-unit consumption schedule,.', 'Identify the exact unit where MU becomes zero and where TU peaks — verify they coincide.', 'Practice the "MU = Price" equilibrium condition with a numerical example: if MU schedule is 20, 16, 12, 8, 4 and price.', 'Re-diagnostic: Given TU = 10, 18, 24, 28, 30, 30, 28 — find where DMU starts, TU max, and MU negative.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
