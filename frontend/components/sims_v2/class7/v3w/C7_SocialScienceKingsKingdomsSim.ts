import type { SimDef } from '../../engine/types';
import C7_SocialScienceKingsKingdomsSim from '../../../simulations/c6_12/C7_SocialScienceKingsKingdomsSim';

/** v3 wrapped master — C7_SocialScienceKingsKingdomsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_socialsciencekingskingdomssim: SimDef = {
    id: 'v3w_c7_socialsciencekingskingdomssim',
    title: 'Janapadas: Early Kingdoms and Their Formation',
    subtitle: 'Covers the socio-political transition, land settlement patterns, and early political.',
    classLevel: 7, subject: 'science', topic: 'Janapadas: Early Kingdoms and Their Formation',
    chapters: [],
    nodeIds: ['c7_hist_ch01_002', 'c7_hist_ch04_008', 'c7_hist_ch01_007', 'c7_hist_ch01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine visiting an old village where generations of your family have farmed the exact same plots of land,.', goal: 'Master Janapadas: Early Kingdoms and Their Formation.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Janapadas were early territorial states that.', text: 'Janapadas were early territorial states that emerged in the Indian subcontinent around the 6th century BCE, representing a major shift from tribal nomadic life to settled, land-based kingdoms ruled.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_hist_ch01_002', title: 'Janapadas were early territorial states.',
          scaffold: { problem: 'Analyze how the adoption of iron tools transformed a pastoral tribe (*jana*) into a settled agricultural kingdom (*janapada*).',
            steps: [
            { text: 'Identify the primary economic activity of early Vedic tribes (pastoralism, cattle rearing, and shifting cultivation.' },
            { text: 'Introduce the historical introduction of iron metallurgy around 1000–600 BCE in northern India.' },
            { text: 'Analyze the functional impact of iron (heavy iron axes cleared dense Gangetic forests; iron-tipped ploughshares cut.' },
            { text: 'Trace the resulting economic outcome (higher crop yields led to agricultural surplus, allowing people to stop moving.' },
            { text: 'Synthesize the political outcome (fixed land plots created territorial boundaries, leading to the formation of.', faded: true, blankAnswer: 'Iron tools enabled deep agriculture and forest clearing,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch04_008', title: 'This topic explores the vibrant.',
          scaffold: { problem: 'Analyze how trade guilds (*shrenis*) functioned as financial institutions during the Gupta period, using four distinct steps of historical.',
            steps: [
            { text: 'Identify the primary role of *shrenis* as associations of merchants and craftspeople who manufactured specific goods.' },
            { text: 'Examine how these guilds maintained strict quality control, fixed prices, and trained apprentices to ensure reliable.' },
            { text: 'Investigate the financial capacity of guilds, noting that merchants and citizens deposited funds with them for.' },
            { text: 'Synthesize how guilds functioned as early banks by issuing loans to traders and funding public charitable works like.', faded: true, blankAnswer: 'Gupta trade guilds were powerful socio-economic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_007', title: 'Magadha emerged as the most powerful.',
          scaffold: { problem: 'Analyze how the geographical features of Magadha contributed to both its economic prosperity and its military security during the.',
            steps: [
            { text: 'Identify the primary geographical region where Magadha was situated (the middle Gangetic plains of modern Bihar).' },
            { text: 'Examine the economic impact of the region, noting how annual river floods deposited fertile silt that generated massive.' },
            { text: 'Examine the military and defensive advantages, specifically identifying the natural hill barrier protecting Rajgir and.' },
            { text: 'Synthesize these factors into a cause-effect conclusion showing how economic wealth funded a permanent army and natural.', faded: true, blankAnswer: 'Magadha\'s location in the fertile Gangetic basin produced.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_010', title: 'The development of organized military.',
          scaffold: { problem: 'Analyze how a 6th-century BCE king transformed his military forces from seasonal tribal warriors into a professional standing army.',
            steps: [
            { text: 'Identify the limitation of seasonal tribal militias, who had to return home during planting and harvesting seasons.' },
            { text: 'Examine the introduction of regular taxation on agricultural produce (bhaga) and trade crafts to generate a steady.' },
            { text: 'Explain how the king used this treasury to pay fixed cash or grain wages to soldiers year-round, converting them into.' },
            { text: 'Trace the military consequence: the ruler could now launch long campaigns without worrying about soldiers leaving for.', faded: true, blankAnswer: 'Kings replaced seasonal farmers with professional standing.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_hist_ch04_008', title: 'Identify each idea',
          dissect: { specimen: 'Janapadas: Early Kingdoms and Their Formation', spots: [
            { id: 's1', label: 'Janapadas were early territorial states', prompt: 'Which idea is this? — Janapadas were early territorial states that emerged in the Indian subcontinent around.', answer: 'Janapadas were early territorial states', options: ['Janapadas were early territorial states', 'This topic explores the vibrant', 'Magadha emerged as the most', 'The development of organized military'] },
            { id: 's2', label: 'This topic explores the vibrant', prompt: 'Which idea is this? — This topic explores the vibrant economic life, bustling internal trade networks,.', answer: 'This topic explores the vibrant', options: ['This topic explores the vibrant', 'Janapadas were early territorial states', 'Magadha emerged as the most', 'The development of organized military'] },
            { id: 's3', label: 'Magadha emerged as the most', prompt: 'Which idea is this? — Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th.', answer: 'Magadha emerged as the most', options: ['Magadha emerged as the most', 'Janapadas were early territorial states', 'This topic explores the vibrant', 'The development of organized military'] },
            { id: 's4', label: 'The development of organized military', prompt: 'Which idea is this? — The development of organized military structures, standing armies, and defensive.', answer: 'The development of organized military', options: ['The development of organized military', 'Janapadas were early territorial states', 'This topic explores the vibrant', 'Magadha emerged as the most'] }
          ] } }
    ],
    explore: { component: C7_SocialScienceKingsKingdomsSim, prompt: 'Explore the interactive — Janapadas: Early Kingdoms and Their Formation' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch01_002', difficulty: 'standard',
          question: 'Janapadas were early territorial states that emerged in the Indian subcontinent.',
          hint: 'Review the transition from the Vedic period\'s tribal setup to early iron-age settlements,.',
          misconception: 'Students often confuse Janapadas with large, highly centralized empires like the Mauryas or Guptas, assuming they had.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Janapadas were early territorial states that emerged in the Indian subcontinent around',
                  options: ['Janapadas were early territorial states that emerged in the Indian subcontinent around', 'This topic explores the vibrant economic life, bustling internal trade networks,', 'Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th', 'The development of organized military structures, standing armies, and defensive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Janapadas with large, highly centralized empires like the Mauryas or Guptas, assuming they had vast professional.' }
          ],
            remediations: { 'students-often-confuse-janapadas-with': { steps: ['To fix this misconception, compare a local village panchayat or a small regional district council with a national.', 'Point out that a Janapada was like a regional community taking root in a specific river basin, whereas an empire like.', 'Review the shift from mobile pastoral clans to fixed village settlements using a map of early river valley sites.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_008', difficulty: 'standard',
          question: 'This topic explores the vibrant economic life, bustling internal trade.',
          hint: 'Review c7_hist_ch04_004 to understand how the Gupta administrative structure collected.',
          misconception: 'Students often think that the abundance of Gupta gold coins means every ordinary farmer and laborer used gold daily to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the vibrant economic life, bustling internal trade networks,',
                  options: ['This topic explores the vibrant economic life, bustling internal trade networks,', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th', 'The development of organized military structures, standing armies, and defensive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the abundance of Gupta gold coins means every ordinary farmer and laborer used gold daily to buy food and.' }
          ],
            remediations: { 'the-abundance-of-gupta-gold': { steps: ['To fix this, guide the student to examine the different types of coins found in archaeological sites from the Gupta.', 'Show them that while kings issued magnificent gold coins for prestige and major trade, the common marketplace used.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_007', difficulty: 'standard',
          question: 'Magadha emerged as the most powerful Mahajanapada in ancient India during the.',
          hint: 'Review node c7_hist_ch01_004 on the Gangetic plains to understand how river geography.',
          misconception: 'Students often think Magadha became powerful purely because of military brute force, ignoring the economic foundations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th',
                  options: ['Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'This topic explores the vibrant economic life, bustling internal trade networks,', 'The development of organized military structures, standing armies, and defensive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Magadha became powerful purely because of military brute force, ignoring the economic foundations such as agricultural.' }
          ],
            remediations: { 'magadha-became-powerful-purely-because': { steps: ['To fix this, guide the student to trace a two-step chain: first, look at how iron tools cleared the thick Gangetic.', 'Use a comparative chart showing crop surplus leading to tax revenue, which then funded soldiers and weapons.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_010', difficulty: 'standard',
          question: 'The development of organized military structures, standing armies, and.',
          hint: 'Review c7_hist_ch01_006 to recall how agricultural surplus and taxes operated before.',
          misconception: 'Students often think that early kings maintained massive standing armies of hundreds of thousands of soldiers all year.',
          parts: [
                { id: 'a', prompt: 'What type of weapons became widely available and significantly changed warfare during the Mahajanapada period compared to the earlier Vedic period?', answer: 'Iron weapons, such as swords, arrowheads, and spearheads, became widely used',
                  options: ['Iron weapons, such as swords, arrowheads, and spearheads, became widely used', 'bronze'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that early kings maintained massive standing armies of hundreds of thousands of soldiers all year round without any.' }
          ],
            remediations: { 'early-kings-maintained-massive-standing': { steps: ['Review how agricultural taxes were collected in early villages by examining the shift from voluntary gifts to.', 'Compare how a part-time tribal militia requires no salary versus how a professional soldier needs regular cash or grain.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
