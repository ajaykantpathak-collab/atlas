import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch01_p1: SimDef = {
    id: 'v3_c7_hist_ch01_p1',
    title: 'New Beginnings: Cities and States · Part 1/2',
    subtitle: 'Covers the socio-economic and technological context marking the beginning of the Second.',
    classLevel: 7, subject: 'history', topic: 'New Beginnings: Cities and States · Part 1/2',
    chapters: ['c7_hist_ch01'],
    nodeIds: ['c7_hist_ch01_001', 'c7_hist_ch01_002', 'c7_hist_ch01_003', 'c7_hist_ch01_004', 'c7_hist_ch01_005', 'c7_hist_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever wondered why some towns grow rapidly while others remain small villages, like when a new.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A thousand years after the Harappan cities crumbled, brand-new towns began blooming along the Ganga around 600 BCE. What single technology helped wake the cities back up?',
        options: ['Iron — axes cleared the dense forests and ploughshares turned the heavy soil, growing a food surplus that fed traders and artisans', 'Bronze — shinier tools attracted city builders', 'Fire — cooking grain invented the city', 'Boats — rivers alone built the towns'],
        answer: 'Iron — axes cleared the dense forests and ploughshares turned the heavy soil, growing a food surplus that fed traders and artisans',
        hook: 'It is called the Second Urbanisation because the Harappan cities were the first — and they had declined over a thousand years earlier. The new towns rose in a different river valley, powered by surplus grain that freed people to become craftspersons and merchants.',
    },
    teaching: [
        { title: 'Second Urbanisation of India: Context and Meaning', text: 'The Second Urbanisation refers to the historical period around the 6th century BCE in ancient India when towns and cities re-emerged across the Gangetic plains, driven by surplus agricultural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow an iron axe into the Gangetic forest — clear the land, grow the surplus, and trace how that surplus gathers potters, weavers, and traders into a new town.',
        labels: ['Second Urbanisation of India', 'Janapadas: Early Kingdoms', 'Mahajanapadas: Sixteen Major Kingdoms', 'Gangetic Plains and', 'Administration in Mahajanapadas: Governance', 'Agriculture and Economy'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch01_001', title: 'Second Urbanisation of India: Context and Meaning',
          caseStudy: { intro: 'Have you ever wondered why some towns grow rapidly while others remain small villages, like when a new highway brings markets and factories to your region?',
            decisions: [{ prompt: 'What major metal technology became widespread around the 6th century BCE and helped clear the dense forests of the Gangetic plains?', options: [
                { text: 'Iron was the metal technology that became widespread during this period', outcome: 'Iron was the metal technology that became widespread during this period.' },
                { text: 'Bronze', outcome: 'Not quite — Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation.', reveals: 'students-often-confuse-the-first' },
                { text: 'Copper', outcome: 'Not quite — Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation.', reveals: 'students-often-confuse-the-first' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_003', title: 'Mahajanapadas: Sixteen Major Kingdoms of Ancient India',
          caseStudy: { intro: 'Imagine traveling across northern India and noticing how small farming villages gradually grew into massive walled capital cities with bustling markets and.',
            decisions: [{ prompt: 'How many major kingdoms known as Mahajanapadas emerged in ancient India during the 6th century BCE?', options: [
                { text: 'There were sixteen major Mahajanapadas', outcome: 'There were sixteen major Mahajanapadas. A student who answers incorrectly by confusing this with.' },
                { text: 'sixteen great realms', outcome: 'Not quite — Students often confuse smaller *Janapadas* (early tribal settlements) with *Mahajanapadas* (large.', reveals: 'students-often-confuse-smaller-janapadas' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_004', title: 'Gangetic Plains and the Growth of Mahajanapadas',
          caseStudy: { intro: 'Imagine walking through a dense forest with a wooden axe versus a sharp iron tool—which one would help you clear the land faster to grow crops?',
            decisions: [{ prompt: 'What major geographical feature defined the region where the most powerful Mahajanapadas, such as Magadha and Kosala, grew during the first.', options: [
                { text: 'The fertile middle basin of the Ganga river system (Gangetic plains)', outcome: 'The fertile middle basin of the Ganga river system (Gangetic plains).' },
                { text: 'the Thar desert', outcome: 'Not quite — Students often think that cities and states appeared suddenly in the Gangetic plains without any.', reveals: 'cities-and-states-appeared-suddenly' },
                { text: 'the Deccan plateau', outcome: 'Not quite — Students often think that cities and states appeared suddenly in the Gangetic plains without any.', reveals: 'cities-and-states-appeared-suddenly' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching a documentary, Nikhil hears a narrator say that towns grew in the Gangetic plains around 600 BCE \'because ambitious kings ordered walls to be built.\' His sister asks whether that is really how cities appear.',
            decisions: [{ prompt: 'What actually made those towns possible, and where does the king\'s order fit in?', options: [
                { text: 'Iron axes and ploughshares let farmers clear forests and till heavy Gangetic soil, producing grain surpluses that fed full-time potters, smiths and traders — towns grew from that surplus, and kings could only fortify places the economy already sustained.', outcome: 'This puts causes in the right order: technology drives surplus, surplus feeds specialists and markets, and political walls follow rather than create urban life.' },
                { text: 'The narrator is right — a royal decree to build walls is what turns a village into a city, so the economy is irrelevant.', outcome: 'Walls without food surplus cannot house craftspersons or merchants; the decree explains fortification, not urbanisation.', reveals: 'kings-create-cities' },
                { text: 'Those towns were simply Harappan cities like Mohenjo-daro that kept running continuously into the Gangetic plains.', outcome: 'The Harappan cities in the Indus basin had declined over a thousand years earlier; the Gangetic towns were a fresh, second wave in a different region.', reveals: 'unbroken-cities' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Cities are grown, not built. Clear the forest, fill the granary, and the marketplace assembles itself.',
            decisions: [{ prompt: 'What comes next? New Beginnings: Cities and States · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — New Beginnings: Cities and States · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch01_001', difficulty: 'standard',
          question: 'The Second Urbanisation refers to the historical period around the 6th century.',
          hint: 'Review the Harappan town planning and decline topics from Class 6 to remind yourself that.',
          misconception: 'Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation, assuming that.',
          parts: [
                { id: 'a', prompt: 'What major metal technology became widespread around the 6th century BCE and helped clear the dense forests of the Gangetic plains?', answer: 'Iron was the metal technology that became widespread during this period',
                  options: ['Iron was the metal technology that became widespread during this period', 'Bronze', 'Copper'],
                  hint: 'Review the Harappan town planning and decline topics from Class 6 to remind yourself that cities.',
                  misconception: 'Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation, assuming that cities in ancient India.' }
          ],
            remediations: { 'students-often-confuse-the-first': { steps: ['To fix this misconception, compare two maps side by side: one showing Harappan sites concentrated in the Indus river.', 'Highlight the time gap of over a thousand years and the shift in geographical location from the Indus to the Ganga.', 'Emphasize that cities disappeared after the Harappan collapse before a completely new wave of towns emerged in.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_002', difficulty: 'standard',
          question: 'Janapadas were early territorial states that emerged in the Indian subcontinent.',
          hint: 'Review the transition from the Vedic period\'s tribal setup to early iron-age settlements.',
          misconception: 'Students often confuse Janapadas with large, highly centralized empires like the Mauryas or Guptas, assuming they had.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Janapadas were early territorial states that emerged in the Indian subcontinent around',
                  options: ['Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Second Urbanisation refers to the historical period around the 6th century BCE in', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient', 'The geographical environment of the Gangetic plains, characterised by fertile alluvial'],
                  hint: 'Review the transition from the Vedic period\'s tribal setup to early iron-age settlements, focusing.',
                  misconception: 'Students often confuse Janapadas with large, highly centralized empires like the Mauryas or Guptas, assuming they had vast professional.' }
          ],
            remediations: { 'students-often-confuse-janapadas-with': { steps: ['To fix this misconception, compare a local village panchayat or a small regional district council with a national.', 'Point out that a Janapada was like a regional community taking root in a specific river basin, whereas an empire like.', 'Review the shift from mobile pastoral clans to fixed village settlements using a map of early river valley sites.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_003', difficulty: 'standard',
          question: 'The Mahajanapadas were sixteen large, powerful territorial states that emerged.',
          hint: 'Review node c7_hist_ch01_002 on Janapadas to understand the difference between a small.',
          misconception: 'Students often confuse smaller *Janapadas* (early tribal settlements) with *Mahajanapadas* (large territorial states).',
          parts: [
                { id: 'a', prompt: 'How many major kingdoms known as Mahajanapadas emerged in ancient India during the 6th century BCE?', answer: 'There were sixteen major Mahajanapadas',
                  options: ['There were sixteen major Mahajanapadas', 'sixteen great realms'],
                  hint: 'Review node c7_hist_ch01_002 on Janapadas to understand the difference between a small tribal.',
                  misconception: 'Students often confuse smaller *Janapadas* (early tribal settlements) with *Mahajanapadas* (large territorial states), assuming they were.' }
          ],
            remediations: { 'students-often-confuse-smaller-janapadas': { steps: ['To fix this misconception, have the student draw a comparison table with two columns: Janapadas and Mahajanapadas.', 'In the Janapada row, note tribal loyalty, smaller territory, and subsistence farming; in the Mahajanapada row, note.', 'Review the specific names of the sixteen kingdoms from historical texts to reinforce their elite status.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_004', difficulty: 'standard',
          question: 'The geographical environment of the Gangetic plains, characterised by fertile.',
          hint: 'Review the geography of northern river basins in Class 6 history (early cities) and basic.',
          misconception: 'Students often think that cities and states appeared suddenly in the Gangetic plains without any connection.',
          parts: [
                { id: 'a', prompt: 'What major geographical feature defined the region where the most powerful Mahajanapadas, such as Magadha and Kosala, grew during the first millennium BCE?', answer: 'The fertile middle basin of the Ganga river system (Gangetic plains)',
                  options: ['The fertile middle basin of the Ganga river system (Gangetic plains)', 'the Thar desert', 'the Deccan plateau'],
                  hint: 'Review the geography of northern river basins in Class 6 history (early cities) and basic landforms.',
                  misconception: 'Students often think that cities and states appeared suddenly in the Gangetic plains without any connection to technological changes.' }
          ],
            remediations: { 'cities-and-states-appeared-suddenly': { steps: ['To fix this, guide the student through a cause-and-effect chain using a regional map and an agriculture flowchart.', 'First, point out the location of rivers like the Ganga, Son, and Gandak on a map.', 'Second, ask the student to trace how annual river floods deposit fertile silt.', 'Third, link this silt and iron ploughshares to bumper crop harvests.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_005', difficulty: 'standard',
          question: 'The governance systems of the Mahajanapadas (c. 600–300 BCE) marked a major.',
          hint: 'Review node c7_hist_ch01_004 to see how geography and farming surpluses enabled larger.',
          misconception: 'Students often think that all ancient Indian kingdoms were absolute monarchies identical to the later Mughal or Mauryan.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The governance systems of the Mahajanapadas (c',
                  options: ['The governance systems of the Mahajanapadas (c', 'The Second Urbanisation refers to the historical period around the 6th century BCE in', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient'],
                  hint: 'Review node c7_hist_ch01_004 to see how geography and farming surpluses enabled larger populations.',
                  misconception: 'Students often think that all ancient Indian kingdoms were absolute monarchies identical to the later Mughal or Mauryan empires, completely.' }
          ],
            remediations: { 'all-ancient-indian-kingdoms-were': { steps: ['To fix this misconception, compare two contrasting administrative maps and text sources: one for monarchical Magadha.', 'Have the student trace who holds decision-making power in each (the king vs.', 'the assembly of rajas) and list three differences in how laws were passed and taxes collected.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch01_006', difficulty: 'standard',
          question: 'The agricultural and economic developments during the Janapada period (c.',
          hint: 'Review early village settlements and basic iron-working concepts from Class 6 history.',
          misconception: 'Students often think that the shift from Harappan cities to Janapada towns was a continuous, unbroken timeline where.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The agricultural and economic developments during the Janapada period (c',
                  options: ['The agricultural and economic developments during the Janapada period (c', 'The Second Urbanisation refers to the historical period around the 6th century BCE in', 'Janapadas were early territorial states that emerged in the Indian subcontinent around', 'The Mahajanapadas were sixteen large, powerful territorial states that emerged in ancient'],
                  hint: 'Review early village settlements and basic iron-working concepts from Class 6 history before.',
                  misconception: 'Students often think that the shift from Harappan cities to Janapada towns was a continuous, unbroken timeline where urban life simply.' }
          ],
            remediations: { 'the-shift-from-harappan-cities': { steps: ['To fix this misconception, compare a map of Harappan sites along the Indus river system with a map of Janapada sites.', 'Point out that the Indus region relied on inundation canals and bronze tools in an arid zone, whereas the Janapadas.', 'Emphasize that these are two entirely different ecological and technological zones separated by centuries of rural.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
