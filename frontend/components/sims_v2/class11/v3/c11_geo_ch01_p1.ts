import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch01_p1: SimDef = {
    id: 'v3_c11_geo_ch01_p1',
    title: 'Geography as a Discipline · Part 1/2',
    subtitle: 'Trade map-recitation for the spatial questions that define the discipline.',
    classLevel: 11, subject: 'geography', topic: 'Geography as a Discipline · Part 1/2',
    chapters: ['c11_geo_ch01'],
    nodeIds: ['c11_geo_cbse_01_001', 'c11_geo_cbse_01_002', 'c11_geo_cbse_01_003', 'c11_geo_cbse_01_004', 'c11_geo_cbse_01_005', 'c11_geo_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geographer interrogating a landscape', intro: 'A school building, a road, a monsoon, a market — same scene, but geography asks the questions that connect them.', goal: 'Define geography\'s spatial perspective and separate physical, human and environmental geography.' },
    discovery: {
        question: 'Asked what geographers do, a student answers \'memorise capitals and make maps.\' What does the discipline actually do?',
        options: ['Ask where things are, why they\'re there, and what follows — maps are the tool, not the subject', 'Catalogue every river, mountain and capital for exams', 'Draw and colour maps of countries', 'Study only natural landscapes, never human activity'],
        answer: 'Ask where things are, why they\'re there, and what follows — maps are the tool, not the subject',
        hook: 'Google Maps shows terrain, cities and live traffic in one view — that integration of nature and humanity in space is the whole discipline.',
    },
    teaching: [
        { title: 'Geography: Definition, Meaning and Scope', text: 'Geography is the scientific discipline that studies the Earth\'s surface as the home of humankind, analyzing the spatial patterns and processes of both natural phenomena (physical geography) and human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort a list of observations into natural and human, then reframe \'Delhi is at 28.6°N\' into the spatial questions geography actually asks.',
        labels: ['Geography: Definition, Meaning', 'Evolution of Geography: From', 'Approaches to Geography: Systematic', 'Branches of Geography: Physical', 'Branches of Geography: Human', 'Branches of Geography: Biogeography'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_001', title: 'Geography: Definition, Meaning and Scope',
          caseStudy: { intro: 'Begin by asking students to observe their immediate surroundings: the school building, the road outside, the vegetation, the weather, and the activities.',
            decisions: [{ prompt: 'State the literal meaning of the word "geography" from its Greek roots and give the formal definition used in senior secondary geography.', options: [
                { text: '"Geography" derives from Greek *geo* (Earth) and *graphia* (description/writing),', outcome: '"Geography" derives from Greek *geo* (Earth) and *graphia* (description/writing), literally "Earth.' },
                { text: 'study of rocks', outcome: 'Not quite — Students often think "geography is the study of maps" because school atlases and map-work exercises.', reveals: 'geography-is-the-study-of' },
                { text: 'study of maps only', outcome: 'Not quite — Students often think "geography is the study of maps" because school atlases and map-work exercises.', reveals: 'geography-is-the-study-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_002', title: 'Evolution of Geography: From Ancient to Modern Period',
          caseStudy: { intro: 'Begin with a familiar observation: open Google Maps on your phone and notice how it simultaneously shows physical terrain (Himalayas), human settlements.',
            decisions: [{ prompt: 'Identify the scholar who first used the term "geography" (*geographia*) and the approximate century, then name the specific work in which.', options: [
                { text: 'Eratosthenes (276–194 BCE), 3rd century BCE, in his work *Geographika* (now lost, known', outcome: 'Eratosthenes (276–194 BCE), 3rd century BCE, in his work *Geographika* (now lost, known through.' },
                { text: 'Greeks generally', outcome: 'Not quite — Students conflate *chronological sequence* with *conceptual progression* — believing geography.', reveals: 'students-conflate-chronological-sequence-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_003', title: 'Approaches to Geography: Systematic vs Regional Approach',
          caseStudy: { intro: 'Imagine you are planning a trip from Leh (Ladakh) to Thiruvananthapuram (Kerala).',
            decisions: [{ prompt: 'Which of the following studies exemplifies the systematic approach: (a) A monograph on the economy, culture, and physical setting of the.', options: [
                { text: 'Correct answer: (b) A global analysis of the distribution and formation of laterite soils', outcome: 'Correct answer: (b) A global analysis of the distribution and formation of laterite soils.' },
                { text: '\'systematic = physical geography\' and \'regional = human geography\'', outcome: 'Not quite — Students think \'systematic = physical geography\' and \'regional = human geography\'.', reveals: 'systematic-physical-geography-and-regional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_004', title: 'Branches of Geography: Physical Geography and Its Sub-branches',
          caseStudy: { intro: 'Begin by asking students to observe their immediate surroundings — the slope of the school ground, the temperature difference between morning and afternoon.',
            decisions: [{ prompt: 'Name the six major sub-branches of Physical Geography as classified in the NCERT Class 11 textbook and state the primary focus of each.', options: [
                { text: 'The six major sub-branches are: (1) Geomorphology', outcome: 'The six major sub-branches are: (1) Geomorphology — study of landforms and their evolution; (2).' },
                { text: 'Meteorology', outcome: 'Not quite — Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about.', reveals: 'students-often-treat-each-sub' },
                { text: 'Climatology', outcome: 'Not quite — Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about.', reveals: 'students-often-treat-each-sub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_005', title: 'Branches of Geography: Human Geography and Its Sub-branches',
          caseStudy: { intro: 'Look at your daily commute to school: you travel through residential colonies, cross a market area, maybe pass a factory zone, and see people of different.',
            decisions: [{ prompt: 'Define Human Geography and name any four of its sub-branches as classified in the NCERT Class 11 textbook.', options: [
                { text: 'Human Geography studies the interrelationship between the physical environment and the', outcome: 'Human Geography studies the interrelationship between the physical environment and the.' },
                { text: 'migration', outcome: 'Not quite — Students often equate Human Geography sub-branches with *topics* (e.g., "migration is.', reveals: 'students-often-equate-human-geography' },
                { text: 'urbanization', outcome: 'Not quite — Students often equate Human Geography sub-branches with *topics* (e.g., "migration is.', reveals: 'students-often-equate-human-geography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a career fair, a junior says she won\'t pick geography because \'it\'s basically making maps and memorising capitals — everything\'s already mapped by satellites anyway.\' You\'re manning the geography stall.',
            decisions: [{ prompt: 'How do you show her what geographers actually do?', options: [
                { text: 'Reframe the subject: geography studies the Earth\'s surface as the home of humankind — asking \'where?\', \'why there?\', and \'with what consequences?\' Maps are tools for spatial analysis, not the subject itself. A geographer analyses spatial patterns — e.g., how monsoon rainfall patterns shape cropping patterns — integrating natural and human phenomena that other disciplines study separately.', outcome: 'She sees the shift: maps answer \'where\', but geography asks why the pattern is there and what follows from it — a perspective satellites feed but can\'t replace.' },
                { text: 'Agree partly — admit geography is mostly map-work, but argue maps are still a useful skill.', outcome: 'That surrenders the real point: atlases dominate earlier classes precisely because map-skills are easy to test, while the spatial-analytic framework is the discipline.', reveals: 'geography-is-mapmaking' },
                { text: 'Tell her geography evolved from primitive description to modern science, so old geography was maps but new geography is better science.', outcome: 'Chronology isn\'t progress: determinism, possibilism, probabilism were contextual responses to different research questions, not \'wrong → right → more right\'.', reveals: 'evolution-is-linear-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Geography isn\'t where things are — it\'s why there, and what that placement does to everything else.',
            decisions: [{ prompt: 'What comes next? Geography as a Discipline · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geography as a Discipline · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_001', difficulty: 'standard',
          question: 'Geography is the scientific discipline that studies the Earth\'s surface as the.',
          hint: 'Revisit Class 9 "Physical Features of India" (c9_geo_ch1_1) and Class 10 "Resources and.',
          misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier.',
          parts: [
                { id: 'a', prompt: 'Explain why geography is classified as both a natural science and a social science, using the concepts of "physical geography" and "human geography."', answer: 'Geography straddles natural and social sciences',
                  options: ['Geography straddles natural and social sciences', 'geography is only about maps', 'geography is only about nature', 'geography is the study of maps'],
                  hint: 'Revisit Class 9 "Physical Features of India" (c9_geo_ch1_1) and Class 10 "Resources and.',
                  misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier classes.' },
                { id: 'b', prompt: 'A student claims, "Geography is just memorizing capitals, rivers, and mountain ranges." Using the definition and scope of geography, write a 3-sentence.', answer: 'Geography goes far beyond rote memorization',
                  options: ['Geography goes far beyond rote memorization', 'geography is the study of maps'],
                  hint: 'Revisit Class 9 "Physical Features of India" (c9_geo_ch1_1) and Class 10 "Resources and.',
                  misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier classes.' }
          ],
            remediations: { 'geography-is-the-study-of': { steps: ['Give the student a blank outline map of India and ask them to mark three physical features and three human features.', 'Then ask: "What geographical *questions* can you ask about the pattern you see?" (e.g., "Why are cities clustered along.', 'Guide them to articulate each question in the form "Where?', 'Finally, show how each question maps to a branch (physical, human, environmental) and an approach (systematic/regional).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Environmental geography is merely a sub-field of physical geography." Justify your evaluation with reference to the human–environment.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'geography is the study of maps'],
                  hint: 'Revisit Class 9 "Physical Features of India" (c9_geo_ch1_1) and Class 10 "Resources and.',
                  misconception: 'Students often think "geography is the study of maps" because school atlases and map-work exercises dominate earlier classes.' }
          ],
            remediations: { 'geography-is-the-study-of': { steps: ['Give the student a blank outline map of India and ask them to mark three physical features and three human features.', 'Then ask: "What geographical *questions* can you ask about the pattern you see?" (e.g., "Why are cities clustered along.', 'Guide them to articulate each question in the form "Where?', 'Finally, show how each question maps to a branch (physical, human, environmental) and an approach (systematic/regional).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_002', difficulty: 'standard',
          question: 'The evolution of geography traces the disciplinary transformation from ancient.',
          hint: 'If stuck on "why does intellectual history matter for exams?", revisit.',
          misconception: 'Students conflate *chronological sequence* with *conceptual progression* — believing geography evolved linearly.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student claims: "Alexander von Humboldt and Carl Ritter founded modern geography together because they both worked in Berlin and wrote multi-volume.', answer: 'The claim is partially true institutionally but false epistemologically',
                  options: ['The claim is partially true institutionally but false epistemologically', 'both German'],
                  hint: 'If stuck on "why does intellectual history matter for exams?", revisit c11_geo_cbse_01_001\'s.',
                  misconception: 'Students conflate *chronological sequence* with *conceptual progression* — believing geography evolved linearly: "Ancient → Medieval →.' }
          ],
            remediations: { 'students-conflate-chronological-sequence-with': { steps: ['Re-read the NCERT Class 11 *Geography as a Discipline* section "Evolution of Geographical Thought" (pp.', 'For each dualism (idiographic/nomothetic, determinism/possibilism, physical/human), write one Indian case where *both.', 'Practice a 2022 board question: "Geography is the study of areal differentiation" (Hartshorne) — explain with reference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_003', difficulty: 'standard',
          question: 'Systematic approach studies a single geographical phenomenon (e.g., climate.',
          hint: 'Revisit Class 9 \'Physical Features of India\' (regional) and \'Drainage\' (systematic).',
          misconception: 'Students think \'systematic = physical geography\' and \'regional = human geography\'.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to understand why the Deccan Traps region has black cotton soil, specific cropping patterns, and a concentration of cotton textile.', answer: 'Regional approach',
                  options: ['Regional approach', '\'systematic = physical geography\' and \'regional = human geography\''],
                  hint: 'Revisit Class 9 \'Physical Features of India\' (regional) and \'Drainage\' (systematic) — ask: does.',
                  misconception: 'Students think \'systematic = physical geography\' and \'regional = human geography\'.' },
                { id: 'b', prompt: 'Compare the systematic and regional approaches in studying the Indian Monsoon.', answer: 'Systematic climatologist: Research question',
                  options: ['Systematic climatologist: Research question', '\'systematic = physical geography\' and \'regional = human geography\''],
                  hint: 'Revisit Class 9 \'Physical Features of India\' (regional) and \'Drainage\' (systematic) — ask: does.',
                  misconception: 'Students think \'systematic = physical geography\' and \'regional = human geography\'.' }
          ],
            remediations: { 'systematic-physical-geography-and-regional': { steps: ['Take two Class 10 chapters — \'Water Resources\' (systematic: studies water scarcity, dams, rainwater harvesting across.', 'Take \'Lifelines of National Economy\' (regional: integrates transport, communication, trade for India as a region).', 'Create a 2x2 table: rows = systematic/regional, columns = physical/human. Fill with four examples from your textbooks.', 'Explain aloud why \'Water Resources\' is systematic physical and \'Mumbai Metropolitan Region study\' would be regional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that systematically studies the.',
          hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Name the six major sub-branches of Physical Geography as classified in the NCERT Class 11 textbook and state the primary focus of each in one phrase.', answer: 'The six major sub-branches are: (1) Geomorphology',
                  options: ['The six major sub-branches are: (1) Geomorphology', 'Meteorology', 'Climatology', 'Pedology'],
                  hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'b', prompt: 'A student claims: "Physical Geography only studies static features like mountains and rivers; it does not deal with processes." Using the definition of any two.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Hydrology', 'Oceanography', 'plant geography'],
                  hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'c', prompt: 'The Brahmaputra River forms a large delta in Bangladesh. Identify which THREE sub-branches of Physical Geography are directly involved in explaining this.', answer: 'The three sub-branches are: (1) Geomorphology',
                  options: ['The three sub-branches are: (1) Geomorphology', 'Hydrology', 'Oceanography', 'plant geography'],
                  hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_005', difficulty: 'standard',
          question: 'Human Geography is the branch of geography that studies the spatial patterns.',
          hint: 'Revisit c11_geo_cbse_01_003: create a Venn diagram comparing Systematic (topical).',
          misconception: 'Students often equate Human Geography sub-branches with *topics* (e.g., "migration is a sub-branch") rather than.',
          parts: [
                { id: 'a', prompt: 'Explain why Urban Geography and Settlement Geography are distinct sub-branches despite both studying human habitations.', answer: 'Settlement Geography focuses on the *spatial pattern* of human habitations',
                  options: ['Settlement Geography focuses on the *spatial pattern* of human habitations', 'urbanization'],
                  hint: 'Revisit c11_geo_cbse_01_003: create a Venn diagram comparing Systematic (topical) vs Regional.',
                  misconception: 'Students often equate Human Geography sub-branches with *topics* (e.g., "migration is a sub-branch") rather than *systematic analytical.' }
          ],
            remediations: { 'students-often-equate-human-geography': { steps: ['Create a two-column table. Column A: List 10 real-world phenomena (e.g., farmer suicide, traffic congestion, language.', 'Verify each pair against NCERT definitions.', 'Practice converting a topic into a research question for two different sub-branches (e.g., "slum" → Settlement.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_006', difficulty: 'standard',
          question: 'Biogeography is the study of the geographic distribution of plants and animals.',
          hint: 'If stuck, revisit the systematic vs regional approach (c11_geo_cbse_01_003) and the.',
          misconception: 'Students often think biogeography is merely listing which animals live where (like a catalogue), missing the emphasis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biogeography is the study of the geographic distribution of plants and animals (flora and',
                  options: ['Biogeography is the study of the geographic distribution of plants and animals (flora and', 'Geography is the scientific discipline that studies the Earth\'s surface as the home of', 'The evolution of geography traces the disciplinary transformation from ancient', 'Systematic approach studies a single geographical phenomenon (e.g., climate, population,'],
                  hint: 'If stuck, revisit the systematic vs regional approach (c11_geo_cbse_01_003) and the sub-fields.',
                  misconception: 'Students often think biogeography is merely listing which animals live where (like a catalogue), missing the emphasis on processes like.' }
          ],
            remediations: { 'biogeography-is-merely-listing-which': { steps: ['To remediate, have the student: (1) Take a transect walk in a nearby park or forest patch, recording tree species and.', '(2) Plot these observations on a simple sketch map to visualize spatial patterns.', '(3) Compare two contrasting areas (e.g., a sacred grove vs.', 'a roadside plantation) to see how human management alters species composition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
