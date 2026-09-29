import type { SimDef } from '../../engine/types';
import C11_HomeScienceIntroductionStreamsHomeSim from '../../../simulations/c6_12/C11_HomeScienceIntroductionStreamsHomeSim';

/** v3 wrapped master — C11_HomeScienceIntroductionStreamsHomeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_homescienceintroductionstreamshomesim: SimDef = {
    id: 'v3w_c11_homescienceintroductionstreamshomesim',
    title: 'Family Income: Money Income, Real Income and Psychic Income',
    subtitle: 'This node covers the NCERT Class 11 classification of family income into Money, Real.',
    classLevel: 11, subject: 'science', topic: 'Family Income: Money Income, Real Income and Psychic Income',
    chapters: [],
    nodeIds: ['c11_hs_cbse_10_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine your neighbour Mrs. Sharma earns ₹60,000/month as a teacher (Money Income), grows vegetables on her.', goal: 'Master Family Income: Money Income, Real Income and Psychic Income.' },
    discovery: {
        question: 'A family receives ₹50,000 monthly salary, grows herbs on their balcony, and the mother stitches school uniforms for the children.',
        options: ['₹50,000 salary = Money Income', 'Real Income', 'If prices rise 10% and salary rises 5%, Real Income falls'],
        answer: '₹50,000 salary = Money Income',
        hook: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for.',
    },
    teaching: [
        { title: 'Family income is the aggregate monetary and.', text: 'Family income is the aggregate monetary and non-monetary inflow available to a household over a defined period (typically a financial year April 1–March 31), comprising three distinct but.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hs_cbse_10_003', title: 'Family income is the aggregate monetary.',
          scaffold: { problem: 'The Gupta family has the following monthly inflows: Mr. Gupta\'s salary ₹75,000; Mrs.',
            steps: [
            { text: 'Identify all monetary inflows — salary (₹75,000), average freelance (₹10,000), rental (₹20,000), interest (₹5,000) —.' },
            { text: 'Identify goods/services obtained WITHOUT monetary exchange — kitchen garden vegetables (₹3,000), tailoring services.' },
            { text: 'Identify goods/services obtained THROUGH monetary exchange but enhanced by family skill — none explicitly listed in.' },
            { text: 'Identify subjective satisfaction — "satisfaction from family meals" = Psychic Income (non-quantifiable).' },
            { text: 'Calculate Total Real Income = Money Income used for purchases (Indirect Real Income) + Direct Real Income.' },
            { text: 'Interpret — 23% of the family\'s real consumption comes from self-provisioning (skills, assets, community), reducing.', faded: true, blankAnswer: 'Total Money Income = ₹1,10,000; Total Direct Real Income.' }
            ] } }
    ],
    explore: { component: C11_HomeScienceIntroductionStreamsHomeSim, prompt: 'Explore the interactive — Family Income: Money Income, Real Income and Psychic Income' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_003', difficulty: 'standard',
          question: 'Family income is the aggregate monetary and non-monetary inflow available to a.',
          hint: 'Revisit c11_hs_cbse_10_002 "Family Resources: Classification and Optimisation" —.',
          misconception: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for.',
          parts: [
                { id: 'a', prompt: 'A family receives ₹50,000 monthly salary, grows herbs on their balcony, and the mother stitches school uniforms for the children.', answer: '₹50,000 salary = Money Income',
                  options: ['₹50,000 salary = Money Income', 'Real Income', 'If prices rise 10% and salary rises 5%, Real Income falls'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for inflation / purchasing.' }
          ],
            remediations: { 'students-consistently-confuse-home-science': { steps: ['Explicitly contrast the two definitions side-by-side on a board/paper: Economics Real Income = Nominal Income / Price.', 'Give 5 items (salary, home-grown tomatoes, mother\'s cooking, rented flat, owned flat) and have student classify each.', 'Drill the NCERT phrase "Real income is a flow of goods and services, it is not stagnant" and "consists of goods and.', 'Practice board-style question: "Distinguish between Real Income in Home Science and Real Income in Economics" — require.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "A family with zero Money Income but substantial Direct Real Income (owned land, community support, diverse household skills) can have.', answer: 'Defensible with conditions',
                  options: ['Defensible with conditions', 'Real Income', 'If prices rise 10% and salary rises 5%, Real Income falls'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for inflation / purchasing.' }
          ],
            remediations: { 'students-consistently-confuse-home-science': { steps: ['Explicitly contrast the two definitions side-by-side on a board/paper: Economics Real Income = Nominal Income / Price.', 'Give 5 items (salary, home-grown tomatoes, mother\'s cooking, rented flat, owned flat) and have student classify each.', 'Drill the NCERT phrase "Real income is a flow of goods and services, it is not stagnant" and "consists of goods and.', 'Practice board-style question: "Distinguish between Real Income in Home Science and Real Income in Economics" — require.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
