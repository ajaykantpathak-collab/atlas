import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch01_p2: SimDef = {
    id: 'v3_c12_hs_ch01_p2',
    title: 'Work, Livelihood and Career · Part 2/2',
    subtitle: 'Same stone, three different lives',
    classLevel: 12, subject: 'home_science', topic: 'Work, Livelihood and Career · Part 2/2',
    chapters: ['c12_hs_ch01'],
    nodeIds: ['c12_hs_cbse_01_007', 'c12_hs_cbse_01_008', 'c12_hs_cbse_01_009', 'c12_hs_cbse_01_010', 'c12_hs_cbse_01_011', 'c12_hs_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Work psychologist', intro: 'Why does identical labour feel like a prison to one person and a purpose to another? The answer isn\'t in the task.', goal: 'Distinguish job, career and calling — and what makes work meaningful beyond the paycheque.' },
    discovery: {
        question: 'Three people break the same stone: one sees a wage, one a livelihood, one a statue being born. What separates them?',
        options: ['Orientation — job, career and calling are relationships to work, not kinds of work; the third man\'s hammer blows build his becoming', 'Skill levels', 'Different stones', 'Pay grades'],
        answer: 'Orientation — job, career and calling are relationships to work, not kinds of work; the third man\'s hammer blows build his becoming',
        hook: 'Meaningful work isn\'t high-paying work — it\'s useful, responsible, enjoyable, skill-using work. And ergonomics isn\'t expensive chairs: it\'s adapting the whole work environment to the worker, which is what dignity of labour actually looks like in design.',
    },
    teaching: [
        { title: 'Self-Assessment for Career Planning: SWOT Analysis', text: 'SWOT Analysis for career planning is a structured self-assessment framework where an individual systematically identifies internal **Strengths** (aptitudes, skills, values) and **Weaknesses** (skill.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit three kinds of work-love: classify job, career and calling in real lives, weigh pay against meaning, and see how quality of work life outruns standard of living.',
        labels: ['Self-Assessment for Career Planning', 'Work and Gender: Division', 'Home Science Education', 'Entrepreneurship: Meaning, Characteristics', 'Work Ethics and Values', 'Emerging Career Opportunities'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_007', title: 'Self-Assessment for Career Planning: SWOT Analysis',
          caseStudy: { intro: 'Imagine you are a Class 12 student who loves biology and art but feels pressured to pursue engineering. You don’t know where to start.',
            decisions: [{ prompt: 'Define SWOT Analysis in the context of career planning and name its four components.', options: [
                { text: 'SWOT Analysis is a self-assessment tool where an individual evaluates internal Strengths', outcome: 'SWOT Analysis is a self-assessment tool where an individual evaluates internal Strengths and.' },
                { text: 'hobbies', outcome: 'Not quite — Students treat SWOT as a one-time “list-making” exercise rather than a dynamic decision tool.', reveals: 'students-treat-swot-as-a' },
                { text: '“hobbies” as a component or confusing Weaknesses with Threats', outcome: 'Not quite — Students treat SWOT as a one-time “list-making” exercise rather than a dynamic decision tool.', reveals: 'students-treat-swot-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_008', title: 'Work and Gender: Division of Labour and Stereotyping',
          caseStudy: { intro: 'Imagine you are analysing a time-use survey of 100 households in your district: women report 5.2 hours daily on unpaid domestic work while men report 0.8.',
            decisions: [{ prompt: 'Define \'gender\' as distinct from \'sex\' in the context of work and labour division.', options: [
                { text: 'Sex refers to biological characteristics (chromosomes, reproductive anatomy) categorising', outcome: 'Sex refers to biological characteristics (chromosomes, reproductive anatomy) categorising people.' },
                { text: 'women do care work', outcome: 'Not quite — Students often write: "Women\'s low workforce participation is because Indian culture values family.', reveals: 'students-often-write-women-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_009', title: 'Home Science Education and Career Avenues in Diverse Sectors',
          caseStudy: { intro: 'Imagine you are a Class 12 student who loves cooking nutritious meals for your family and also enjoys teaching your younger cousins about healthy eating — but.',
            decisions: [{ prompt: 'List the five integrated sub-fields of Home Science (Human Ecology and Family Sciences) as defined in the NCERT Class 11 curriculum.', options: [
                { text: 'The five sub-fields are: (1) Food & Nutrition, (2) Human Development, (3) Fabric &', outcome: 'The five sub-fields are: (1) Food & Nutrition, (2) Human Development, (3) Fabric & Apparel Science.' },
                { text: 'Child Psychology', outcome: 'Not quite — Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring".', reveals: 'home-science-career-avenues-are' },
                { text: 'Interior Design', outcome: 'Not quite — Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring".', reveals: 'home-science-career-avenues-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_011', title: 'Work Ethics and Values: Professionalism and Integrity',
          caseStudy: { intro: 'Imagine you are interning at a design firm and notice a senior colleague presenting your original concept as their own to the client.',
            decisions: [{ prompt: 'Define \'dignity of labour\' as given in the NCERT textbook and give one example from the text illustrating it.', options: [
                { text: 'Dignity of labour means taking pride in whatever work one does, regardless of its nature', outcome: 'Dignity of labour means taking pride in whatever work one does, regardless of its nature or status.' },
                { text: 'dignity of labour means only respecting high-status jobs', outcome: 'Not quite — Students often believe \'professionalism\' means only external behaviours — dressing formally.', reveals: 'professionalism-means-only-external-behaviours' },
                { text: 'Professionalism is wearing a uniform and being punctual', outcome: 'Not quite — Students often believe \'professionalism\' means only external behaviours — dressing formally.', reveals: 'professionalism-means-only-external-behaviours' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_012', title: 'Emerging Career Opportunities for Home Science Graduates',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, who loves both biology and design but thinks Home Science only leads to teaching or basic tailoring.',
            decisions: [{ prompt: 'List any three emerging career domains for Home Science graduates that did not exist in their current form 15 years ago, and name the.', options: [
                { text: 'Correct answer: (1) Nutraceutical product developer', outcome: 'Correct answer: (1) Nutraceutical product developer — Food Science & Nutrition; (2) Sustainable.' },
                { text: '\'emerging careers\' means completely new jobs requiring totally new degrees (e', outcome: 'Not quite — Students believe \'emerging careers\' means completely new jobs requiring totally new degrees (e.g.', reveals: 'emerging-careers-means-completely-new' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Work, Livelihood and Career · Part 2/2', spots: [
            { id: 's1', label: 'Self-Assessment for Career Planning SWOT Analysis', prompt: 'Which idea is this? — SWOT Analysis for career planning is a structured self-assessment framework where.', answer: 'Self-Assessment for Career Planning SWOT Analysis', options: ['Self-Assessment for Career Planning SWOT Analysis', 'Work and Gender Division of Labour and Stereotyping', 'Home Science Education and Career Avenues in Diverse Sectors', 'Entrepreneurship Meaning Characteristics and Competencies'] },
            { id: 's2', label: 'Work and Gender Division of Labour and Stereotyping', prompt: 'Which idea is this? — Gender division of labour refers to the socially constructed allocation of tasks, roles.', answer: 'Work and Gender Division of Labour and Stereotyping', options: ['Work and Gender Division of Labour and Stereotyping', 'Self-Assessment for Career Planning SWOT Analysis', 'Home Science Education and Career Avenues in Diverse Sectors', 'Entrepreneurship Meaning Characteristics and Competencies'] },
            { id: 's3', label: 'Home Science Education and Career Avenues in Diverse Sectors', prompt: 'Which idea is this? — Home Science Education is a multidisciplinary field integrating five core sub-fields.', answer: 'Home Science Education and Career Avenues in Diverse Sectors', options: ['Home Science Education and Career Avenues in Diverse Sectors', 'Self-Assessment for Career Planning SWOT Analysis', 'Work and Gender Division of Labour and Stereotyping', 'Entrepreneurship Meaning Characteristics and Competencies'] },
            { id: 's4', label: 'Entrepreneurship Meaning Characteristics and Competencies', prompt: 'Which idea is this? — Entrepreneurship is the process of creating, launching, and managing a new and innovative.', answer: 'Entrepreneurship Meaning Characteristics and Competencies', options: ['Entrepreneurship Meaning Characteristics and Competencies', 'Self-Assessment for Career Planning SWOT Analysis', 'Work and Gender Division of Labour and Stereotyping', 'Home Science Education and Career Avenues in Diverse Sectors'] },
            { id: 's5', label: 'Work Ethics and Values Professionalism and Integrity', prompt: 'Which idea is this? — Work ethics refers to the set of moral principles and values that guide professional.', answer: 'Work Ethics and Values Professionalism and Integrity', options: ['Work Ethics and Values Professionalism and Integrity', 'Self-Assessment for Career Planning SWOT Analysis', 'Work and Gender Division of Labour and Stereotyping', 'Home Science Education and Career Avenues in Diverse Sectors'] },
            { id: 's6', label: 'Emerging Career Opportunities for Home Science Graduates', prompt: 'Which idea is this? — Emerging career opportunities for Home Science graduates refer to new and evolving.', answer: 'Emerging Career Opportunities for Home Science Graduates', options: ['Emerging Career Opportunities for Home Science Graduates', 'Self-Assessment for Career Planning SWOT Analysis', 'Work and Gender Division of Labour and Stereotyping', 'Home Science Education and Career Avenues in Diverse Sectors'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a career seminar, a speaker says a neighbour who cooks, cleans and cares for an elderly parent all day \'doesn\'t work\', while her husband\'s office job \'counts.\' A classmate also argues that the street vendor outside, who has a municipal licence, \'does informal work, so it\'s basically illegal.\'',
            decisions: [{ prompt: 'How does the paid/unpaid and formal/informal matrix correct both claims?', options: [
                { text: 'Separate the two axes — the neighbour does unpaid informal work with real economic value and no protection; the vendor is paid but informal — legal yet without contract, PF or sick leave; \'informal\' describes missing legal safeguards, not illegality or low worth.', outcome: 'The chapter\'s matrix exists to expose the double blindness: unpaid care work substitutes for market services and enables others\' paid work, while informal workers lack protection — neither means \'not work\' or \'illegal.\'' },
                { text: 'Agree on both — unpaid work isn\'t employment, and no-contract work is outside the law.', outcome: 'Both conflate categories the chapter separates: unpaid ≠ valueless, and informal ≠ illegal — a licensed vendor trades lawfully; she just lacks the employer-employee relationship that carries statutory protection.', reveals: 'informal-equals-illegal' },
                { text: 'Fix it by re-labelling — call the vendor \'formal\' since she has a licence, and the caregiver \'paid\' since her work has value.', outcome: 'A vending licence grants spatial legitimacy, not employment status, and economic value isn\'t wages; renaming the cells doesn\'t move the worker into them — the matrix is about protection and pay, not dignity labels.', reveals: 'rename-equals-reclassify' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'You can now tell employment from calling — and argue that meaning, not money, is the measure of work well chosen.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_007', difficulty: 'standard',
          question: 'SWOT Analysis for career planning is a structured self-assessment framework.',
          hint: 'If stuck, revisit **c11_hs_cbse_02_001** (Concept of Self) and **c12_hs_cbse_01_005**.',
          misconception: 'Students treat SWOT as a one-time “list-making” exercise rather than a dynamic decision tool.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SWOT Analysis for career planning is a structured self-assessment framework where an',
                  options: ['SWOT Analysis for career planning is a structured self-assessment framework where an', 'Work is any purposeful human activity', 'Work can be classified into four interrelated categories based on remuneration and', 'Livelihood refers to the capabilities, assets (including both material and social'],
                  hint: 'If stuck, revisit **c11_hs_cbse_02_001** (Concept of Self) and **c12_hs_cbse_01_005** (Factors.',
                  misconception: 'Students treat SWOT as a one-time “list-making” exercise rather than a dynamic decision tool.' }
          ],
            remediations: { 'students-treat-swot-as-a': { steps: ['Revisit **c12_hs_cbse_01_005** (Factors Influencing Career Choice) to relist your aptitudes, interests, and values with.', 'Re‑do the SWOT matrix using the **“Evidence → Quadrant → Link”** template: for each entry, write one proof (e.g., “won.', 'Take the **re‑diagnostic**: classify 5 new statements into quadrants and draw two strength–opportunity arrows.', 'If accuracy < 80%, repeat step 2 with a teacher/mentor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_008', difficulty: 'standard',
          question: 'Gender division of labour refers to the socially constructed allocation.',
          hint: 'Revisit c11_soc_cbse_04_010 (Gendered Socialisation) — focus on how family, school, media.',
          misconception: 'Students often write: "Women\'s low workforce participation is because Indian culture values family and women *choose*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Gender division of labour refers to the socially constructed allocation of tasks, roles,',
                  options: ['Gender division of labour refers to the socially constructed allocation of tasks, roles,', 'Work is any purposeful human activity', 'Work can be classified into four interrelated categories based on remuneration and', 'Livelihood refers to the capabilities, assets (including both material and social'],
                  hint: 'Revisit c11_soc_cbse_04_010 (Gendered Socialisation) — focus on how family, school, media transmit.',
                  misconception: 'Students often write: "Women\'s low workforce participation is because Indian culture values family and women *choose* to stay home." This.' }
          ],
            remediations: { 'students-often-write-women-s': { steps: ['Re-read NCERT pages 11–15 (Gender Issues section) with a highlighter: mark every phrase showing *structural* cause.', 'Watch the 12-min video "Unpaid Care Work and the Gender Gap" (ILO/UN Women) — note 3 data points that contradict.', 'Take the 2019–20 NSS Time Use Survey summary (Table 1: minutes/day by gender) and calculate the unpaid work gap for.', 'Re-attempt Diagnostic Q2 and Q3. If still stuck, revisit c11_soc_cbse_04_010 (Gendered Socialisation) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_009', difficulty: 'standard',
          question: 'Home Science Education is a multidisciplinary field integrating five core.',
          hint: 'Revisit c11_hs_cbse_01_010 (Multidisciplinary Nature of HEFS) and create a 5-column.',
          misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the.',
          parts: [
                { id: 'a', prompt: 'Compare the livelihood model of Shri Mahila Griha Udyog Lijjat Papad with a typical corporate food-processing company on three dimensions: (a) ownership.', answer: 'ownership structure, (',
                  options: ['ownership structure, (', 'success ascertained not by profits but by social benefits and impact', 'women making papad', 'teaching, dietetics, and tailoring'],
                  hint: 'Revisit c11_hs_cbse_01_010 (Multidisciplinary Nature of HEFS) and create a 5-column table.',
                  misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the only visible roles.' }
          ],
            remediations: { 'home-science-career-avenues-are': { steps: ['If a student cannot name >3 non-teaching careers per sub-field: Step 1 — Assign them to interview (phone/email) one.', 'Step 2 — Have them map that alumnus\'s daily tasks to the five sub-fields (e.g., a Food Safety Auditor uses Food &.', 'Step 3 — Re-attempt Diagnostic Question 3 with this new real-world reference.', 'Step 4 — If still stuck, revisit **c11_hs_cbse_01_010** (Multidisciplinary Nature of HEFS) and **c12_hs_cbse_01_005**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following claim using the chapter\'s discussion on ergonomics and quality of work life (QWL): "Investing in ergonomic workstations for home-based.', answer: 'The claim is false',
                  options: ['The claim is false', 'teaching, dietetics, and tailoring'],
                  hint: 'Revisit c11_hs_cbse_01_010 (Multidisciplinary Nature of HEFS) and create a 5-column table.',
                  misconception: 'Students believe Home Science career avenues are limited to "teaching, dietetics, and tailoring" because these are the only visible roles.' }
          ],
            remediations: { 'home-science-career-avenues-are': { steps: ['If a student cannot name >3 non-teaching careers per sub-field: Step 1 — Assign them to interview (phone/email) one.', 'Step 2 — Have them map that alumnus\'s daily tasks to the five sub-fields (e.g., a Food Safety Auditor uses Food &.', 'Step 3 — Re-attempt Diagnostic Question 3 with this new real-world reference.', 'Step 4 — If still stuck, revisit **c11_hs_cbse_01_010** (Multidisciplinary Nature of HEFS) and **c12_hs_cbse_01_005**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_010', difficulty: 'standard',
          question: 'Entrepreneurship is the process of creating, launching, and managing a new and.',
          hint: 'If unclear on "innovation" vs. "imitation," revisit c12_hs_cbse_01_001 (Work: Definition.',
          misconception: '**Misconception:** "Entrepreneurship is only about starting a business to make money; social work/NGOs are separate.".',
          parts: [
                { id: 'a', prompt: 'Rohan starts a food delivery app that uses AI to predict peak hours and reduce wait times. He invests his savings, hires a team, and faces initial losses.', answer: '**Correct answer (sample five):** 1',
                  options: ['**Correct answer (sample five):** 1', 'risk-taker'],
                  hint: 'If unclear on "innovation" vs. "imitation," revisit c12_hs_cbse_01_001 (Work: Definition, Meaning.',
                  misconception: '**Misconception:** "Entrepreneurship is only about starting a business to make money; social work/NGOs are separate." **Why students make.' },
                { id: 'b', prompt: 'A case study: "Meera, a Home Science graduate, notices that elderly people in her locality struggle to get nutritious, soft-textured meals.', answer: '**Correct answer:** **Both commercial and social entrepreneurship.** *Social',
                  options: ['**Correct answer:** **Both commercial and social entrepreneurship.** *Social', 'success ascertained not so much by profits but by social benefits', 'social = non-profit', '"social = non-profit"'],
                  hint: 'If unclear on "innovation" vs. "imitation," revisit c12_hs_cbse_01_001 (Work: Definition, Meaning.',
                  misconception: '**Misconception:** "Entrepreneurship is only about starting a business to make money; social work/NGOs are separate." **Why students make.' }
          ],
            remediations: { 'misconception-entrepreneurship-is-only-about': { steps: ['**Re-read the NCERT paragraphs on "Entrepreneurship" (pp.', '25–27) and "Social entrepreneurship" (p.', '26) side-by-side.** Highlight every verb describing what an entrepreneur *does* (creates, assembles, takes risks.', '**Create a two-column table:** Column A = 15 NCERT characteristics; Column B = *your own life example* (even small.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_011', difficulty: 'standard',
          question: 'Work ethics refers to the set of moral principles and values that guide.',
          hint: 'Revisit c12_hs_cbse_01_001 (meaningful work) and c6_civics_ch10_001 (human rights).',
          misconception: 'Students often believe \'professionalism\' means only external behaviours — dressing formally, speaking politely, meeting.',
          parts: [
                { id: 'a', prompt: 'A junior dietitian in a hospital observes that the senior dietitian consistently alters patient meal plans to use cheaper, lower-quality ingredients to cut.', answer: 'Violated values: (1) Integrity',
                  options: ['Violated values: (1) Integrity', 'stay silent to keep the job', 'Professionalism is wearing a uniform and being punctual'],
                  hint: 'Revisit c12_hs_cbse_01_001 (meaningful work) and c6_civics_ch10_001 (human rights) to ground the.',
                  misconception: 'Students often believe \'professionalism\' means only external behaviours — dressing formally, speaking politely, meeting deadlines — and.' },
                { id: 'b', prompt: 'Compare the textbook\'s view of \'work as a calling\' with \'work as a job\' and \'work as a career\'.', answer: 'Work as a job: done for income, satisfaction from pay',
                  options: ['Work as a job: done for income, satisfaction from pay', 'only work as a calling has dignity', 'Professionalism is wearing a uniform and being punctual'],
                  hint: 'Revisit c12_hs_cbse_01_001 (meaningful work) and c6_civics_ch10_001 (human rights) to ground the.',
                  misconception: 'Students often believe \'professionalism\' means only external behaviours — dressing formally, speaking politely, meeting deadlines — and.' }
          ],
            remediations: { 'professionalism-means-only-external-behaviours': { steps: ['If the student equates professionalism with etiquette or ethics with crisis-only rules: (1) Have them re-read the.', '(2) Assign a 3-day \'Ethics Log\': record three routine work/study moments where they chose integrity over convenience.', '(3) Discuss: "Which of the six values was enacted in each?" This shifts focus from appearance to value-enactment.', 'Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_012', difficulty: 'standard',
          question: 'Emerging career opportunities for Home Science graduates refer to new and.',
          hint: 'If unable to list sub-field competencies, revisit c11_hs_cbse_01_010 (Multidisciplinary.',
          misconception: 'Students believe \'emerging careers\' means completely new jobs requiring totally new degrees (e.g., \'I need a B.Tech.',
          parts: [
                { id: 'a', prompt: 'List any three emerging career domains for Home Science graduates that did not exist in their current form 15 years ago, and name the specific HEFS.', answer: 'Correct answer: (1) Nutraceutical product developer',
                  options: ['Correct answer: (1) Nutraceutical product developer', '\'emerging careers\' means completely new jobs requiring totally new degrees (e'],
                  hint: 'If unable to list sub-field competencies, revisit c11_hs_cbse_01_010 (Multidisciplinary Nature.',
                  misconception: 'Students believe \'emerging careers\' means completely new jobs requiring totally new degrees (e.g., \'I need a B.Tech to work.' }
          ],
            remediations: { 'emerging-careers-means-completely-new': { steps: ['If the student cannot map HEFS sub-disciplines to emerging roles, do this 3-step remediation: (1) Revisit node.', 'Fill each cell with one specific job title.', '(2) For 3 empty cells, search LinkedIn India with keywords "Home Science" + sector name — screenshot real job.', '(3) Re-attempt Diagnostic Question 1 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
