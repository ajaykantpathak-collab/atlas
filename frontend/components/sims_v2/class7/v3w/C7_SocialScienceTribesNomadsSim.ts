import type { SimDef } from '../../engine/types';
import C7_SocialScienceTribesNomadsSim from '../../../simulations/c6_12/C7_SocialScienceTribesNomadsSim';

/** v3 wrapped master — C7_SocialScienceTribesNomadsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_socialsciencetribesnomadssim: SimDef = {
    id: 'v3w_c7_socialsciencetribesnomadssim',
    title: 'Janapadas: Early Kingdoms and Their Formation',
    subtitle: 'Covers the socio-political transition, land settlement patterns, and early political.',
    classLevel: 7, subject: 'science', topic: 'Janapadas: Early Kingdoms and Their Formation',
    chapters: [],
    nodeIds: ['c7_hist_ch01_002', 'c7_hist_ch01_003', 'c7_hist_ch01_004', 'c7_hist_ch01_005', 'c7_hist_ch01_010', 'c7_hist_ch02_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine visiting an old village where generations of your family have farmed the exact same plots of land,.', goal: 'Master Janapadas: Early Kingdoms and Their Formation.' },
    discovery: {
        question: 'What major geographical feature defined the region where the most powerful Mahajanapadas, such as Magadha and Kosala, grew during the first millennium BCE?',
        options: ['The fertile middle basin of the Ganga river system (Gangetic plains)', 'the Thar desert', 'the Deccan plateau'],
        answer: 'The fertile middle basin of the Ganga river system (Gangetic plains)',
        hook: 'Students often think that cities and states appeared suddenly in the Gangetic plains without any connection to.',
    },
    teaching: [
        { title: 'Janapadas were early territorial states that.', text: 'Janapadas were early territorial states that emerged in the Indian subcontinent around the 6th century BCE, representing a major shift from tribal nomadic life to settled, land-based kingdoms ruled.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
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
        { type: 'scaffold', nodeId: 'c7_hist_ch01_003', title: 'The Mahajanapadas were sixteen large,.',
          scaffold: { problem: 'Analyze the transformation of a tribal community into a Mahajanapada by identifying the four key structural changes that occurred during.',
            steps: [
            { text: 'Identify the starting point of the society as a pastoral or small agricultural tribe (Janapada) with kinship-based.' },
            { text: 'Recognize the adoption of iron technology, which enabled deep ploughsolving and forest clearance, creating a reliable.' },
            { text: 'Observe the shift from temporary tribal loyalty to fixed territorial boundaries where the ruler claimed ownership and.' },
            { text: 'Identify the establishment of institutionalized governance, including a standing army, regular tax collection, and a.', faded: true, blankAnswer: 'The transition involves moving from kinship-based tribal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_004', title: 'The geographical environment of the.',
          scaffold: { problem: 'Analyze how the physical environment of the middle Gangetic plains enabled the transformation of small tribal settlements into powerful.',
            steps: [
            { text: 'Identify the key environmental characteristics of the middle Gangetic plains, noting heavy rainfall, dense forests, and.' },
            { text: 'Examine the technological catalyst that interacted with this environment, specifically the availability of iron ore.' },
            { text: 'Trace the agricultural outcome: iron tools allowed communities to clear thick jungle vegetation and till the heavy,.' },
            { text: 'Connect the economic outcome to political centralisation: the agricultural surplus supported growing urban populations,.' },
            { text: 'Synthesize the historical process to show that geographical advantage was the root cause enabling political expansion.', faded: true, blankAnswer: 'The fertile alluvial soil and perennial water of the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_005', title: 'The governance systems of the.',
          scaffold: { problem: 'Analyze the economic and political reasons why the introduction of regular taxation transformed Janapadas into powerful Mahajanapadas.',
            steps: [
            { text: 'Identify the primary economic shift—increased agricultural output from iron tools creating a surplus beyond family.' },
            { text: 'Recognize the administrative need—rulers could no longer rely on voluntary gifts or temporary war plunder to run a.' },
            { text: 'Connect taxation to state power—taxes on crops (bhag), crafts, and trade provided steady revenue for the royal treasury.' },
            { text: 'Trace the final political outcome—treasury funds were used to build massive stone fortifications and maintain permanent.' },
            { text: 'Synthesize the cause-effect chain showing how economic surplus enabled institutionalized governance.', faded: true, blankAnswer: 'Regular taxation transformed Janapadas by providing a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_010', title: 'The development of organized military.',
          scaffold: { problem: 'Analyze how a 6th-century BCE king transformed his military forces from seasonal tribal warriors into a professional standing army.',
            steps: [
            { text: 'Identify the limitation of seasonal tribal militias, who had to return home during planting and harvesting seasons.' },
            { text: 'Examine the introduction of regular taxation on agricultural produce (bhaga) and trade crafts to generate a steady.' },
            { text: 'Explain how the king used this treasury to pay fixed cash or grain wages to soldiers year-round, converting them into.' },
            { text: 'Trace the military consequence: the ruler could now launch long campaigns without worrying about soldiers leaving for.', faded: true, blankAnswer: 'Kings replaced seasonal farmers with professional standing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch02_001', title: 'The transition from kingdoms.',
          scaffold: { problem: 'Analyze how the discovery of iron ore in regions like modern-day Jharkhand contributed to the transition from small *mahajanapadas* to.',
            steps: [
            { text: 'Identify the geographical and material context of the Ganga-Son river valley region in ancient times.' },
            { text: 'Determine the direct impact of iron on agriculture (clearing dense forests, deeper plowing with iron plowshares).' },
            { text: 'Determine the direct impact of iron on warfare (stronger swords, armor, and chariot fittings).' },
            { text: 'Trace the cause-effect chain from increased food production and military strength to the ability to conquer and tax.', faded: true, blankAnswer: 'Iron ore enabled the clearing of tough forested land for.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_hist_ch01_003', title: 'Identify each idea',
          dissect: { specimen: 'Janapadas: Early Kingdoms and Their Formation', spots: [
            { id: 's1', label: 'Janapadas were early territorial states', prompt: 'Which idea is this? — Janapadas were early territorial states that emerged in the Indian subcontinent around.', answer: 'Janapadas were early territorial states', options: ['Janapadas were early territorial states', 'The Mahajanapadas were sixteen large', 'The geographical environment of the', 'The governance systems of the'] },
            { id: 's2', label: 'The Mahajanapadas were sixteen large', prompt: 'Which idea is this? — The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient.', answer: 'The Mahajanapadas were sixteen large', options: ['The Mahajanapadas were sixteen large', 'Janapadas were early territorial states', 'The geographical environment of the', 'The governance systems of the'] },
            { id: 's3', label: 'The geographical environment of the', prompt: 'Which idea is this? — The geographical environment of the Gangetic plains, characterised by fertile alluvial.', answer: 'The geographical environment of the', options: ['The geographical environment of the', 'Janapadas were early territorial states', 'The Mahajanapadas were sixteen large', 'The governance systems of the'] },
            { id: 's4', label: 'The governance systems of the', prompt: 'Which idea is this? — The governance systems of the Mahajanapadas (c. 600–300 BCE) marked a major shift in.', answer: 'The governance systems of the', options: ['The governance systems of the', 'Janapadas were early territorial states', 'The Mahajanapadas were sixteen large', 'The geographical environment of the'] },
            { id: 's5', label: 'The development of organized military', prompt: 'Which idea is this? — The development of organized military structures, standing armies, and defensive.', answer: 'The development of organized military', options: ['The development of organized military', 'Janapadas were early territorial states', 'The Mahajanapadas were sixteen large', 'The geographical environment of the'] },
            { id: 's6', label: 'The transition from kingdoms janapadas', prompt: 'Which idea is this? — The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient.', answer: 'The transition from kingdoms janapadas', options: ['The transition from kingdoms janapadas', 'Janapadas were early territorial states', 'The Mahajanapadas were sixteen large', 'The geographical environment of the'] }
          ] } }
    ],
    explore: { component: C7_SocialScienceTribesNomadsSim, prompt: 'Explore the interactive — Janapadas: Early Kingdoms and Their Formation' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch01_002', difficulty: 'standard',
          question: 'Janapadas were early territorial states that emerged in the Indian subcontinent.',
          hint: 'Review the transition from the Vedic period\'s tribal setup to early iron-age settlements,.',
          misconception: 'Students often confuse Janapadas with large, highly centralized empires like the Mauryas or Guptas, assuming they had.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Janapadas were early territorial states that emerged in the Indian subcontinent around',
                  options: ['Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient', 'The geographical environment of the Gangetic plains, characterised by fertile alluvial', 'The governance systems of the Mahajanapadas (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Janapadas with large, highly centralized empires like the Mauryas or Guptas, assuming they had vast professional.' }
          ],
            remediations: { 'students-often-confuse-janapadas-with': { steps: ['To fix this misconception, compare a local village panchayat or a small regional district council with a national.', 'Point out that a Janapada was like a regional community taking root in a specific river basin, whereas an empire like.', 'Review the shift from mobile pastoral clans to fixed village settlements using a map of early river valley sites.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_003', difficulty: 'standard',
          question: 'The Mahajanapadas were sixteen large, powerful territorial states that emerged.',
          hint: 'Review node c7_hist_ch01_002 on Janapadas to understand the difference between a small.',
          misconception: 'Students often confuse smaller *Janapadas* (early tribal settlements) with *Mahajanapadas* (large territorial states),.',
          parts: [
                { id: 'a', prompt: 'How many major kingdoms known as Mahajanapadas emerged in ancient India during the 6th century BCE?', answer: 'There were sixteen major Mahajanapadas',
                  options: ['There were sixteen major Mahajanapadas', 'sixteen great realms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse smaller *Janapadas* (early tribal settlements) with *Mahajanapadas* (large territorial states), assuming they were.' }
          ],
            remediations: { 'students-often-confuse-smaller-janapadas': { steps: ['To fix this misconception, have the student draw a comparison table with two columns: Janapadas and Mahajanapadas.', 'In the Janapada row, note tribal loyalty, smaller territory, and subsistence farming; in the Mahajanapada row, note.', 'Review the specific names of the sixteen kingdoms from historical texts to reinforce their elite status.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_004', difficulty: 'standard',
          question: 'The geographical environment of the Gangetic plains, characterised by fertile.',
          hint: 'Review the geography of northern river basins in Class 6 history (early cities) and basic.',
          misconception: 'Students often think that cities and states appeared suddenly in the Gangetic plains without any connection to.',
          parts: [
                { id: 'a', prompt: 'What major geographical feature defined the region where the most powerful Mahajanapadas, such as Magadha and Kosala, grew during the first millennium BCE?', answer: 'The fertile middle basin of the Ganga river system (Gangetic plains)',
                  options: ['The fertile middle basin of the Ganga river system (Gangetic plains)', 'the Thar desert', 'the Deccan plateau'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that cities and states appeared suddenly in the Gangetic plains without any connection to technological changes or.' }
          ],
            remediations: { 'cities-and-states-appeared-suddenly': { steps: ['To fix this, guide the student through a cause-and-effect chain using a regional map and an agriculture flowchart.', 'First, point out the location of rivers like the Ganga, Son, and Gandak on a map.', 'Second, ask the student to trace how annual river floods deposit fertile silt.', 'Third, link this silt and iron ploughshares to bumper crop harvests.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_005', difficulty: 'standard',
          question: 'The governance systems of the Mahajanapadas (c. 600–300 BCE) marked a major.',
          hint: 'Review node c7_hist_ch01_004 to see how geography and farming surpluses enabled larger.',
          misconception: 'Students often think that all ancient Indian kingdoms were absolute monarchies identical to the later Mughal or Mauryan.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The governance systems of the Mahajanapadas (c',
                  options: ['The governance systems of the Mahajanapadas (c', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient', 'The geographical environment of the Gangetic plains, characterised by fertile alluvial'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all ancient Indian kingdoms were absolute monarchies identical to the later Mughal or Mauryan empires, completely.' }
          ],
            remediations: { 'all-ancient-indian-kingdoms-were': { steps: ['To fix this misconception, compare two contrasting administrative maps and text sources: one for monarchical Magadha.', 'Have the student trace who holds decision-making power in each (the king vs.', 'the assembly of rajas) and list three differences in how laws were passed and taxes collected.'] } } },
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
            remediations: { 'early-kings-maintained-massive-standing': { steps: ['Review how agricultural taxes were collected in early villages by examining the shift from voluntary gifts to.', 'Compare how a part-time tribal militia requires no salary versus how a professional soldier needs regular cash or grain.'] } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_001', difficulty: 'standard',
          question: 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in.',
          hint: 'Review Class 6 topics on the rise of kingdoms and the use of iron tools in agriculture.',
          misconception: 'Students often think that empires were formed overnight purely through brilliant military generals winning a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient',
                  options: ['The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient', 'The geographical environment of the Gangetic plains, characterised by fertile alluvial'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that empires were formed overnight purely through brilliant military generals winning a single massive war, completely.' }
          ],
            remediations: { 'empires-were-formed-overnight-purely': { steps: ['To fix this, guide the student to examine an economic map of ancient river valleys alongside a political map.', 'Have them trace how iron ore deposits and fertile alluvial soil provided the raw materials and food surplus needed to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
