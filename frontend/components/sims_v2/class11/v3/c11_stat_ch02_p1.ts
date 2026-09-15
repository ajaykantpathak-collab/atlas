import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch02_p1: SimDef = {
    id: 'v3_c11_stat_ch02_p1',
    title: 'Collection of Data · Part 1/2',
    subtitle: 'Learn when yesterday\'s data beats today\'s survey.',
    classLevel: 11, subject: 'statistics', topic: 'Collection of Data · Part 1/2',
    chapters: ['c11_stat_ch02'],
    nodeIds: ['c11_stat_cbse_02_001', 'c11_stat_cbse_02_002', 'c11_stat_cbse_02_003', 'c11_stat_cbse_02_004', 'c11_stat_cbse_02_005', 'c11_stat_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher matching method to question, budget and clock', intro: 'The census exists — yet students still want to knock on a crore doors; knowing when existing data suffices is the skill.', goal: 'Choose between primary and secondary data and apply the direct investigation method correctly.' },
    discovery: {
        question: 'Secondary data is just a fallback — always collect primary data when you can. Sound policy?',
        options: ['No — secondary data often wins on cost, time and coverage; the research objective, not the data\'s origin, chooses the method', 'Yes — firsthand is always best', 'Yes — old data is useless', 'No — secondary data is always better'],
        answer: 'No — secondary data often wins on cost, time and coverage; the research objective, not the data\'s origin, chooses the method',
        hook: 'Handing someone a questionnaire isn\'t \'direct personal investigation\' — in DPI the investigator asks aloud and records; the respondent never writes.',
    },
    teaching: [
        { title: 'Sources of Data Collection: Primary vs Secondary', text: 'Primary data refers to original data collected first-hand by the investigator for a specific research purpose through direct methods such as surveys, experiments, or observations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Pick the right collection method for a tight budget and a dispersed population, then argue three cases where DPI fails to be \'the best.\'',
        labels: ['Sources of Data Collection', 'Methods of Collecting Primary', 'Indirect Oral Investigation', 'Census vs Sample Investigation', 'Preparation of Questionnaire', 'Sources of Secondary Data'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_001', title: 'Sources of Data Collection: Primary vs Secondary',
          caseStudy: { intro: 'Imagine you want to know how many Class 11 students in your school prefer online coaching over classroom coaching.',
            decisions: [{ prompt: 'A researcher downloads the "Annual Report on Rural Employment 2023" published by the Ministry of Rural Development and uses the.', options: [
                { text: '**Answer:** Secondary data', outcome: '**Answer:** Secondary data. The defining criterion: the data was collected and processed by the.' },
                { text: 'primary data because it\'s from a government source', outcome: 'Not quite — **The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more.', reveals: 'the-hierarchy-bias-misconception-students' },
                { text: 'primary data because it\'s recent and official', outcome: 'Not quite — **The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more.', reveals: 'the-hierarchy-bias-misconception-students' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_002', title: 'Methods of Collecting Primary Data: Direct Personal Investigation',
          caseStudy: { intro: 'Imagine you want to study why farmers in a Punjab village are shifting from wheat to paddy cultivation.',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes Direct Personal Investigation from Mailed Questionnaire and Telephone Interview.', options: [
                { text: 'The defining characteristic is the investigator\'s physical, face-to-face presence with', outcome: 'The defining characteristic is the investigator\'s physical, face-to-face presence with the.' },
                { text: 'it uses a questionnaire', outcome: 'Not quite — Students confuse "Direct Personal Investigation" with "using a questionnaire personally." They.', reveals: 'students-confuse-direct-personal-investigation' },
                { text: 'it is cheaper', outcome: 'Not quite — Students confuse "Direct Personal Investigation" with "using a questionnaire personally." They.', reveals: 'students-confuse-direct-personal-investigation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_003', title: 'Indirect Oral Investigation and Mailed Questionnaire Methods',
          caseStudy: { intro: 'Imagine you are a researcher for the Ministry of Rural Development tasked with estimating the prevalence of bonded labor in remote tribal villages.',
            decisions: [{ prompt: 'Define Indirect Oral Investigation and state one situation where it is preferred over Direct Personal Investigation.', options: [
                { text: 'Indirect Oral Investigation is a method where data is collected from third parties who', outcome: 'Indirect Oral Investigation is a method where data is collected from third parties who have.' },
                { text: 'collecting data from secondary sources', outcome: 'Not quite — Students often believe Indirect Oral Investigation is a form of *secondary data* collection because.', reveals: 'indirect-oral-investigation-is-a' },
                { text: 'low cost', outcome: 'Not quite — Students often believe Indirect Oral Investigation is a form of *secondary data* collection because.', reveals: 'indirect-oral-investigation-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_004', title: 'Census vs Sample Investigation: Advantages and Limitations',
          caseStudy: { intro: 'Imagine the government wants to know the average monthly household expenditure in your city to design a new subsidy scheme.',
            decisions: [{ prompt: 'Define "population" in the statistical sense and give an example where the population is NOT all people in a country.', options: [
                { text: 'In statistics, a population (or universe) is the complete set of all items/individuals', outcome: 'In statistics, a population (or universe) is the complete set of all items/individuals possessing.' },
                { text: 'population means all citizens of India', outcome: 'Not quite — Students believe "census is always better because it gives the exact answer" and "sampling error.', reveals: 'census-is-always-better-because' },
                { text: 'census is always better', outcome: 'Not quite — Students believe "census is always better because it gives the exact answer" and "sampling error.', reveals: 'census-is-always-better-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_005', title: 'Preparation of Questionnaire and Schedule: Essentials',
          caseStudy: { intro: 'Imagine you are hired by a local NGO to study "Why do Class 11 students in your district skip breakfast?" Before knocking on doors, you need a tool that gets.',
            decisions: [{ prompt: 'List the six essential principles of questionnaire construction as specified in the NCERT textbook for Class 11 Statistics.', options: [
                { text: 'The six principles are: (1) Questionnaire should not be too long - minimum questions', outcome: 'The six principles are: (1) Questionnaire should not be too long - minimum questions possible; (2).' },
                { text: 'no double negatives', outcome: 'Not quite — Students believe "closed-ended questions are always better because they\'re easier to analyse" and.', reveals: 'closed-ended-questions-are-always' },
                { text: 'general to specific sequencing', outcome: 'Not quite — Students believe "closed-ended questions are always better because they\'re easier to analyse" and.', reveals: 'closed-ended-questions-are-always' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_006', title: 'Sources of Secondary Data: Published and Unpublished',
          caseStudy: { intro: 'Imagine you need to analyse the trend of literacy rates in Indian states over the last 20 years for a school project.',
            decisions: [{ prompt: 'What is the fundamental difference between primary data and secondary data in terms of who collects the data and for what purpose?', options: [
                { text: 'Primary data is collected first-hand by the investigator for a specific research', outcome: 'Primary data is collected first-hand by the investigator for a specific research objective, while.' },
                { text: 'secondary data is collected by the investigator from secondary sources', outcome: 'Not quite — Students often believe that any data found in a book, website, or newspaper is automatically.', reveals: 'any-data-found-in-a' },
                { text: 'published secondary data', outcome: 'Not quite — Students often believe that any data found in a book, website, or newspaper is automatically.', reveals: 'any-data-found-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Designing a survey for a school project, a teammate insists: \'Primary data is always better — secondary data is a fallback. Government publications are primary since they\'re authoritative. And handing respondents a printed form to fill is direct personal investigation.\'',
            decisions: [{ prompt: 'How do data sources and collection modes actually divide?', options: [
                { text: 'Judge by origin and fit: primary = first-hand collection by YOU for your purpose; secondary = already published by others — government data stays secondary however authoritative, and neither is inherently better; the objective, budget and population decide. And mode isn\'t instrument: in direct personal investigation the investigator ASKS and records — a form the respondent fills himself is a self-administered questionnaire, a different mode.', outcome: 'The design improves: source credibility isn\'t collection origin, \'better\' means fit-for-purpose, and who writes the answers defines the method.' },
                { text: 'Stand by \'primary is better\' — first-hand beats reused data, always.', outcome: 'NCERT\'s own point: secondary data saves time and cost — the choice depends on the study\'s objective, not a quality hierarchy.', reveals: 'primary-is-always-better' },
                { text: 'Keep \'authoritative = primary\' — official sources count as first-hand.', outcome: 'Authority isn\'t origin: published government data was collected for ITS purpose — reusing it makes it secondary however credible.', reveals: 'official-source-is-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Primary data answers your exact question at a price; secondary data answers nearly your question for free — choose by objective.',
            decisions: [{ prompt: 'What comes next? Collection of Data · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Collection of Data · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_001', difficulty: 'standard',
          question: 'Primary data refers to original data collected first-hand by the investigator.',
          hint: 'Revisit Class 7 Math "Statistical Questions vs Non-Statistical Questions".',
          misconception: '**The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more accurate," or "more.',
          parts: [
                { id: 'a', prompt: 'A researcher downloads the "Annual Report on Rural Employment 2023" published by the Ministry of Rural Development and uses the district-level MGNREGA.', answer: '**Answer:** Secondary data',
                  options: ['**Answer:** Secondary data', 'primary data because it\'s from a government source', 'primary data because it\'s recent and official', 'Hierarchy Bias'],
                  hint: 'Revisit Class 7 Math "Statistical Questions vs Non-Statistical Questions" (c7_math_ch13_001) and.',
                  misconception: '**The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more accurate," or "more scientific" than.' },
                { id: 'b', prompt: 'Explain in your own words why the Census of India data on literacy rates is primary data for the Office of the Registrar General of India but secondary data.', answer: '**Answer:** For the Registrar General\'s office, the Census data is primary',
                  options: ['**Answer:** For the Registrar General\'s office, the Census data is primary', 'Hierarchy Bias', 'better', 'more accurate'],
                  hint: 'Revisit Class 7 Math "Statistical Questions vs Non-Statistical Questions" (c7_math_ch13_001) and.',
                  misconception: '**The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more accurate," or "more scientific" than.' }
          ],
            remediations: { 'the-hierarchy-bias-misconception-students': { steps: ['**Step-by-step remediation:** 1.', '**Confront the bias directly:** Ask the student: "If you want to know India\'s population in 1901, can you collect.', '"So is secondary data (Census 1901 report) \'inferior\' or \'the only option\'?" → Establishes that secondary data.', '**Use the "Who collected for whom?" test:** Give 5 rapid-fire cases (NSSO survey, RBI bulletin, student\'s own.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more accurate," or "more.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Secondary data is always inferior to primary data because it\'s old and not collected for my research question.', answer: '**Evaluation:** The claim is **partially correct but overly absolute**',
                  options: ['**Evaluation:** The claim is **partially correct but overly absolute**', 'Hierarchy Bias', 'better', 'more accurate'],
                  hint: 'Revisit Class 7 Math "Statistical Questions vs Non-Statistical Questions" (c7_math_ch13_001) and.',
                  misconception: '**The "Hierarchy Bias" Misconception:** Students believe primary data is inherently "better," "more accurate," or "more scientific" than.' }
          ],
            remediations: { 'the-hierarchy-bias-misconception-students': { steps: ['**Step-by-step remediation:** 1.', '**Confront the bias directly:** Ask the student: "If you want to know India\'s population in 1901, can you collect.', '"So is secondary data (Census 1901 report) \'inferior\' or \'the only option\'?" → Establishes that secondary data.', '**Use the "Who collected for whom?" test:** Give 5 rapid-fire cases (NSSO survey, RBI bulletin, student\'s own.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_002', difficulty: 'standard',
          question: 'Direct Personal Investigation is a primary data collection method where the.',
          hint: 'Revisit c11_stat_cbse_02_001: focus on the distinction "primary to the source that.',
          misconception: 'Students confuse "Direct Personal Investigation" with "using a questionnaire personally." They think: *If the.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study the "impact of demonetisation on small retail shops in a metropolitan city." The population is 5,000 shops spread across 200 sq km.', answer: 'Direct Personal Investigation is NOT suitable here',
                  options: ['Direct Personal Investigation is NOT suitable here', 'yes, because it gives accurate data', 'Direct Personal Investigation', 'using a questionnaire personally'],
                  hint: 'Revisit c11_stat_cbse_02_001: focus on the distinction "primary to the source that collects and.',
                  misconception: 'Students confuse "Direct Personal Investigation" with "using a questionnaire personally." They think: *If the investigator hands the.' },
                { id: 'b', prompt: 'Compare Direct Personal Investigation and Mailed Questionnaire on these three dimensions: (a) response rate, (b) suitability for illiterate respondents, (c).', answer: '| Dimension | Direct Personal Investigation | Mailed Questionnaire |',
                  options: ['| Dimension | Direct Personal Investigation | Mailed Questionnaire |', 'Direct Personal Investigation', 'using a questionnaire personally'],
                  hint: 'Revisit c11_stat_cbse_02_001: focus on the distinction "primary to the source that collects and.',
                  misconception: 'Students confuse "Direct Personal Investigation" with "using a questionnaire personally." They think: *If the investigator hands the.' }
          ],
            remediations: { 'students-confuse-direct-personal-investigation': { steps: ['Ask the student to role-play both scenarios—(a) investigator reads questions aloud, records answers; (b) investigator.', 'Have them identify who holds the pen and who speaks in each.', 'Map to NCERT definitions: (a) = Direct Personal Investigation (Personal Interview); (b) = Mailed Questionnaire (even.', 'Give a concrete test item: "An investigator visits a village, reads questions in Hindi, ticks boxes on his schedule.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_003', difficulty: 'standard',
          question: 'Indirect Oral Investigation is a primary data collection method where the.',
          hint: 'Revisit c11_stat_cbse_02_001 (Primary vs Secondary) and c11_stat_cbse_02_002 (Direct.',
          misconception: 'Students often believe Indirect Oral Investigation is a form of *secondary data* collection because the investigator.',
          parts: [
                { id: 'a', prompt: 'Explain why the Mailed Questionnaire Method often suffers from low response rates, and describe how this introduces non-response bias into the sample estimate.', answer: 'Low response rates arise',
                  options: ['Low response rates arise', 'postal delays', 'bias is eliminated if the sample is large', 'actual'],
                  hint: 'Revisit c11_stat_cbse_02_001 (Primary vs Secondary) and c11_stat_cbse_02_002 (Direct Personal.',
                  misconception: 'Students often believe Indirect Oral Investigation is a form of *secondary data* collection because the investigator does not meet the.' },
                { id: 'b', prompt: 'A researcher wants to study the awareness of PM-KISAN scheme benefits among small farmers in a district.', answer: 'Recommendation: Indirect Oral Investigation',
                  options: ['Recommendation: Indirect Oral Investigation', 'actual', 'Indirect Oral Investigation yields secondary data'],
                  hint: 'Revisit c11_stat_cbse_02_001 (Primary vs Secondary) and c11_stat_cbse_02_002 (Direct Personal.',
                  misconception: 'Students often believe Indirect Oral Investigation is a form of *secondary data* collection because the investigator does not meet the.' }
          ],
            remediations: { 'indirect-oral-investigation-is-a': { steps: ['Ask the student: "Who *collects* the data in Indirect Oral Investigation – the researcher or a pre-existing agency?".', 'Contrast with secondary data: "In secondary data, the data already exists in a report; here, the researcher *creates*.', 'Use a concrete example: "If I ask your class teacher about your class\'s average study hours, I am collecting primary.', 'Have the student re-classify 5 scenarios (e.g., police collecting witness statements, historian using diary entries).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_004', difficulty: 'standard',
          question: 'A census (complete enumeration) collects data from every unit of the defined.',
          hint: 'If stuck, revisit c8_eco_ch2_1 (Demography: Study of Human Population) to solidify the.',
          misconception: 'Students believe "census is always better because it gives the exact answer" and "sampling error means the survey was.',
          parts: [
                { id: 'a', prompt: 'The Census of India 2011 recorded a literacy rate of 74.04%. A private NGO conducts a sample survey in 2012 covering 50,000 households and finds 76.2%.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'census is always better', 'sampling error means the survey was done badly', 'If we just survey everyone, there will be no error'],
                  hint: 'If stuck, revisit c8_eco_ch2_1 (Demography: Study of Human Population) to solidify the concept.',
                  misconception: 'Students believe "census is always better because it gives the exact answer" and "sampling error means the survey was done badly." This.' },
                { id: 'b', prompt: 'Compare census and sample surveys on these dimensions: (a) ability to provide disaggregated data at the village/block level, (b) feasibility when the.', answer: 'ability to provide disaggregated data at the village/block level, (',
                  options: ['ability to provide disaggregated data at the village/block level, (', 'census is better for everything', 'census is always better', 'sampling error means the survey was done badly'],
                  hint: 'If stuck, revisit c8_eco_ch2_1 (Demography: Study of Human Population) to solidify the concept.',
                  misconception: 'Students believe "census is always better because it gives the exact answer" and "sampling error means the survey was done badly." This.' }
          ],
            remediations: { 'census-is-always-better-because': { steps: ['If a student insists census is always superior: (1) Present the destructive testing example (bulb lifespan.', '(4) Contrast with a sample of 10,000 where you can afford ₹5,000/respondent for detailed interviews.', 'Force the student to articulate *when* census fails, not just when it works.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_005', difficulty: 'standard',
          question: 'A questionnaire/schedule is a structured research instrument consisting of.',
          hint: 'If unclear on questionnaire vs schedule distinction, revisit c11_stat_cbse_02_002 (Direct.',
          misconception: 'Students believe "closed-ended questions are always better because they\'re easier to analyse" and consequently design.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the use of open-ended vs. closed-ended questions for studying "Student satisfaction with school cafeteria food." In your analysis.', answer: 'Data coding complexity, (',
                  options: ['Data coding complexity, (', 'open = qualitative, closed = quantitative', 'Any other', 'closed-ended questions are always better'],
                  hint: 'If unclear on questionnaire vs schedule distinction, revisit c11_stat_cbse_02_002 (Direct Personal.',
                  misconception: 'Students believe "closed-ended questions are always better because they\'re easier to analyse" and consequently design questionnaires with.' }
          ],
            remediations: { 'closed-ended-questions-are-always': { steps: ['Have the student list 5 research topics where the answer categories are UNKNOWN beforehand (e.g., "Reasons for.', 'Ask them to write multiple-choice options for one topic - they will inevitably miss categories.', 'Show how adding ONE open-ended "Any other reason (specify)" captures the missing data, but also how a standalone.', 'Assign a mini-task: "Convert this 5-question all-closed questionnaire on \'Career aspirations\' into a mixed-format.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_02_006', difficulty: 'standard',
          question: 'Secondary data refers to statistical information that has already been.',
          hint: 'Revisit the primary vs secondary data distinction in c11_stat_cbse_02_001, focusing.',
          misconception: 'Students often believe that any data found in a book, website, or newspaper is automatically "published secondary data".',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between primary data and secondary data in terms of who collects the data and for what purpose?', answer: 'Primary data is collected first-hand by the investigator for a specific research',
                  options: ['Primary data is collected first-hand by the investigator for a specific research', 'secondary data is collected by the investigator from secondary sources', 'published secondary data'],
                  hint: 'Revisit the primary vs secondary data distinction in c11_stat_cbse_02_001, focusing on the.',
                  misconception: 'Students often believe that any data found in a book, website, or newspaper is automatically "published secondary data" and therefore.' },
                { id: 'b', prompt: 'A student says: "Data from a newspaper article reporting last year\'s Census findings is primary data because the newspaper published it recently." Identify the.', answer: 'The error is confusing the publisher with the original collector',
                  options: ['The error is confusing the publisher with the original collector', 'recent publication', 'published secondary data', 'recency determines data type, not the chain of collection'],
                  hint: 'Revisit the primary vs secondary data distinction in c11_stat_cbse_02_001, focusing on the.',
                  misconception: 'Students often believe that any data found in a book, website, or newspaper is automatically "published secondary data" and therefore.' }
          ],
            remediations: { 'any-data-found-in-a': { steps: ['Ask the student to trace a specific statistic (e.g., "India\'s GDP growth rate 2022-23: 7.2%") back to its origin—was.', 'Show two versions of the same table: one from the original ministry PDF and one from a news site with rounding.', 'Practice citing the original agency (NSO, MOSPI) in references, not the intermediary.', 'Give a mini-assignment: find three statistics in a newspaper and locate their primary government source documents.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
