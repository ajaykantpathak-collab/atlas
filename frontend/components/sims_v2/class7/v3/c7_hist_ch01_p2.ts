import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch01_p2: SimDef = {
    id: 'v3_c7_hist_ch01_p2',
    title: 'New Beginnings: Cities and States · Part 2/2',
    subtitle: 'Covers the rise of Magadha from a regional kingdom to the dominant Mahajanapada.',
    classLevel: 7, subject: 'history', topic: 'New Beginnings: Cities and States · Part 2/2',
    chapters: ['c7_hist_ch01'],
    nodeIds: ['c7_hist_ch01_007', 'c7_hist_ch01_008', 'c7_hist_ch01_009', 'c7_hist_ch01_010', 'c7_hist_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine traveling through modern Bihar and seeing the ancient ruins of stone fortifications rising from the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A thousand years after the Harappan cities crumbled, brand-new towns began blooming along the Ganga around 600 BCE. What single technology helped wake the cities back up?',
        options: ['Iron — axes cleared the dense forests and ploughshares turned the heavy soil, growing a food surplus that fed traders and artisans', 'Bronze — shinier tools attracted city builders', 'Fire — cooking grain invented the city', 'Boats — rivers alone built the towns'],
        answer: 'Iron — axes cleared the dense forests and ploughshares turned the heavy soil, growing a food surplus that fed traders and artisans',
        hook: 'It is called the Second Urbanisation because the Harappan cities were the first — and they had declined over a thousand years earlier. The new towns rose in a different river valley, powered by surplus grain that freed people to become craftspersons and merchants.',
    },
    teaching: [
        { title: 'Magadha: Rise to Power Among Mahajanapadas', text: 'Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th centuries BCE, located in the fertile Gangetic plains of present-day Bihar.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow an iron axe into the Gangetic forest — clear the land, grow the surplus, and trace how that surplus gathers potters, weavers, and traders into a new town.',
        labels: ['Magadha: Rise to Power', 'Capitals of Mahajanapadas: Rajgir,', 'Trade and Crafts', 'Army and Warfare', 'Society and Social Structure'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch01_009', title: 'Trade and Crafts in the Mahajanapada Period',
          caseStudy: { intro: 'Imagine walking through a bustling local market in your town during a festival, where potters, weavers, and metalworkers all have their own designated lanes.',
            decisions: [{ prompt: 'What type of coins became widely used for trade during the Mahajanapada period to make buying and selling goods easier than barter?', options: [
                { text: 'Punch-marked silver and copper coins were widely used during the Mahajanapada period', outcome: 'Punch-marked silver and copper coins were widely used during the Mahajanapada period.' },
                { text: 'gold coins', outcome: 'Not quite — Students often think that trade and craft production in ancient India were completely controlled.', reveals: 'trade-and-craft-production-in' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_010', title: 'Army and Warfare in Early Kingdoms',
          caseStudy: { intro: 'Imagine standing before the massive, towering stone walls of an ancient ruined fort like Rajgir or Pataliputra—how did kings manage to build such enormous.',
            decisions: [{ prompt: 'What type of weapons became widely available and significantly changed warfare during the Mahajanapada period compared to the earlier Vedic.', options: [
                { text: 'Iron weapons, such as swords, arrowheads, and spearheads, became widely used', outcome: 'Iron weapons, such as swords, arrowheads, and spearheads, became widely used.' },
                { text: 'bronze', outcome: 'Not quite — Students often think that early kings maintained massive standing armies of hundreds of thousands.', reveals: 'early-kings-maintained-massive-standing' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_011', title: 'Society and Social Structure in Mahajanapadas',
          caseStudy: { intro: 'Imagine walking through a bustling market town in ancient northern India over 2,500 years ago, where iron tools have made farming so productive that not.',
            decisions: [{ prompt: 'What were the four main social divisions or varnas that formed the backbone of the social structure during the Mahajanapada period?', options: [
                { text: 'The four main varnas were the Brahmins, Kshatriyas, Vaishyas, and Shudras', outcome: 'The four main varnas were the Brahmins, Kshatriyas, Vaishyas, and Shudras.' },
                { text: 'kings, merchants, soldiers, and farmers as the official varna names', outcome: 'Not quite — Students often think that the Varna system in the Mahajanapada period was purely a spiritual.', reveals: 'the-varna-system-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching a documentary, Nikhil hears a narrator say that towns grew in the Gangetic plains around 600 BCE \'because ambitious kings ordered walls to be built.\' His sister asks whether that is really how cities appear.',
            decisions: [{ prompt: 'What actually made those towns possible, and where does the king\'s order fit in?', options: [
                { text: 'Iron axes and ploughshares let farmers clear forests and till heavy Gangetic soil, producing grain surpluses that fed full-time potters, smiths and traders — towns grew from that surplus, and kings could only fortify places the economy already sustained.', outcome: 'This puts causes in the right order: technology drives surplus, surplus feeds specialists and markets, and political walls follow rather than create urban life.' },
                { text: 'The narrator is right — a royal decree to build walls is what turns a village into a city, so the economy is irrelevant.', outcome: 'Walls without food surplus cannot house craftspersons or merchants; the decree explains fortification, not urbanisation.', reveals: 'kings-create-cities' },
                { text: 'Those towns were simply Harappan cities like Mohenjo-daro that kept running continuously into the Gangetic plains.', outcome: 'The Harappan cities in the Indus basin had declined over a thousand years earlier; the Gangetic towns were a fresh, second wave in a different region.', reveals: 'unbroken-cities' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_011', title: 'You made it',
          caseStudy: { intro: 'Cities are grown, not built. Clear the forest, fill the granary, and the marketplace assembles itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch01_007', difficulty: 'standard',
          question: 'Magadha emerged as the most powerful Mahajanapada in ancient India during the.',
          hint: 'Review node c7_hist_ch01_004 on the Gangetic plains to understand how river geography.',
          misconception: 'Students often think Magadha became powerful purely because of military brute force, ignoring the economic foundations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th',
                  options: ['Magadha emerged as the most powerful Mahajanapada in ancient India during the 6th to 4th', 'The Second Urbanisation refers to the historical period around the 6th century BCE in', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient'],
                  hint: 'Review node c7_hist_ch01_004 on the Gangetic plains to understand how river geography dictated.',
                  misconception: 'Students often think Magadha became powerful purely because of military brute force, ignoring the economic foundations such as agricultural.' }
          ],
            remediations: { 'magadha-became-powerful-purely-because': { steps: ['To fix this, guide the student to trace a two-step chain: first, look at how iron tools cleared the thick Gangetic.', 'Use a comparative chart showing crop surplus leading to tax revenue, which then funded soldiers and weapons.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_008', difficulty: 'standard',
          question: 'This topic explores the strategic shifting of administrative capitals among the.',
          hint: 'Review the geography of the Gangetic plain and the location of Magadha in relation.',
          misconception: 'Students often think that ancient capitals like Rajgir and Pataliputra were chosen simply because kings liked the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the strategic shifting of administrative capitals among the ancient',
                  options: ['This topic explores the strategic shifting of administrative capitals among the ancient', 'The Second Urbanisation refers to the historical period around the 6th century BCE in', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient'],
                  hint: 'Review the geography of the Gangetic plain and the location of Magadha in relation to rivers like.',
                  misconception: 'Students often think that ancient capitals like Rajgir and Pataliputra were chosen simply because kings liked the scenery or because.' }
          ],
            remediations: { 'ancient-capitals-like-rajgir-and': { steps: ['To fix this, guide the student through a comparative map exercise: look at the hills surrounding Rajgir on a relief map.', 'Then, trace the river lines meeting at Pataliputra on a drainage map of the Ganga basin and ask how boats could move.', 'This contrast proves that capital sites were chosen for survival, defense, and economic control.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_009', difficulty: 'standard',
          question: 'This node explores the vibrant expansion of craft production, artisan guilds.',
          hint: 'Review the agricultural developments in the Gangetic plains from c7_hist_ch01_006 to see.',
          misconception: 'Students often think that trade and craft production in ancient India were completely controlled and planned by kings.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node explores the vibrant expansion of craft production, artisan guilds (shrenis),',
                  options: ['This node explores the vibrant expansion of craft production, artisan guilds (shrenis),', 'The Second Urbanisation refers to the historical period around the 6th century BCE in', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient'],
                  hint: 'Review the agricultural developments in the Gangetic plains from c7_hist_ch01_006 to see how.',
                  misconception: 'Students often think that trade and craft production in ancient India were completely controlled and planned by kings, similar to modern.' }
          ],
            remediations: { 'trade-and-craft-production-in': { steps: ['To fix this misconception, compare the role of modern government regulators with ancient guild rules.', 'Have the student examine historical sources regarding \'shrenis\'—such as their ability to set their own rules, train.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_010', difficulty: 'standard',
          question: 'The development of organized military structures, standing armies, and.',
          hint: 'Review c7_hist_ch01_006 to recall how agricultural surplus and taxes operated before.',
          misconception: 'Students often think that early kings maintained massive standing armies of hundreds of thousands of soldiers all year.',
          parts: [
                { id: 'a', prompt: 'What type of weapons became widely available and significantly changed warfare during the Mahajanapada period compared to the earlier Vedic period?', answer: 'Iron weapons, such as swords, arrowheads, and spearheads, became widely used',
                  options: ['Iron weapons, such as swords, arrowheads, and spearheads, became widely used', 'bronze'],
                  hint: 'Review c7_hist_ch01_006 to recall how agricultural surplus and taxes operated before attempting.',
                  misconception: 'Students often think that early kings maintained massive standing armies of hundreds of thousands of soldiers all year round without any.' }
          ],
            remediations: { 'early-kings-maintained-massive-standing': { steps: ['Review how agricultural taxes were collected in early villages by examining the shift from voluntary gifts.', 'Compare how a part-time tribal militia requires no salary versus how a professional soldier needs regular cash or grain.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_011', difficulty: 'standard',
          question: 'The social structure in the Mahajanapadas (c. 6th to 4th centuries BCE) was.',
          hint: 'Review c7_hist_ch01_006 (Agriculture and Economy in Janapada Period) to see how surplus.',
          misconception: 'Students often think that the Varna system in the Mahajanapada period was purely a spiritual classification with.',
          parts: [
                { id: 'a', prompt: 'What were the four main social divisions or varnas that formed the backbone of the social structure during the Mahajanapada period?', answer: 'The four main varnas were the Brahmins, Kshatriyas, Vaishyas, and Shudras',
                  options: ['The four main varnas were the Brahmins, Kshatriyas, Vaishyas, and Shudras', 'kings, merchants, soldiers, and farmers as the official varna names'],
                  hint: 'Review c7_hist_ch01_006 (Agriculture and Economy in Janapada Period) to see how surplus food.',
                  misconception: 'Students often think that the Varna system in the Mahajanapada period was purely a spiritual classification with no connection to real.' }
          ],
            remediations: { 'the-varna-system-in-the': { steps: ['To fix this, guide the student to compare the economic duties of each varna with the state revenue records or taxation.', 'Show them how Vaishyas paid taxes and Shudras provided manual labor, proving that social structure was deeply tied.', 'Use a simple chart linking social groups to their economic contributions to the king.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
