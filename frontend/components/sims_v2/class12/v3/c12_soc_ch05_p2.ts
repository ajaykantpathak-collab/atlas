import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch05_p2: SimDef = {
    id: 'v3_c12_soc_ch05_p2',
    title: 'Pattern of Social Inequality and Exclusion · Part 2/2',
    subtitle: 'Why the gap keeps reproducing itself',
    classLevel: 12, subject: 'sociology', topic: 'Pattern of Social Inequality and Exclusion · Part 2/2',
    chapters: ['c12_soc_ch05'],
    nodeIds: ['c12_soc_cbse_05_007', 'c12_soc_cbse_05_008', 'c12_soc_cbse_05_009', 'c12_soc_cbse_05_010', 'c12_soc_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Inequality researcher', intro: 'Two kids, one neighbourhood, different planets — sociology asks who built the planets.', goal: 'Distinguish social inequality from individual differences and from stratification, using Bourdieu\'s three capitals.' },
    discovery: {
        question: 'A wealthy Dalit businessman can buy the car, the house and the club membership — yet still be refused entry to a temple and a marriage alliance. If money fixed inequality, what just failed?',
        options: ['Economic capital is only one of three capitals — cultural and social capital move through networks his money can\'t force open', 'Nothing — wealth always buys status', 'The temple was breaking the law, that\'s all', 'He needed to work harder'],
        answer: 'Economic capital is only one of three capitals — cultural and social capital move through networks his money can\'t force open',
        hook: 'Social inequality isn\'t income inequality — it\'s group-patterned, inherited across generations and defended by ideologies that call it fair. Cash transfers can lift poverty without touching the hierarchy that produced it.',
    },
    teaching: [
        { title: 'The Marginalisation of Tribes: Forest Laws, Development-Induced Displacement and Identity', text: 'The marginalisation of tribes refers to the systematic historical and ongoing process by which Adivasi communities are dispossessed of their traditional forest rights, displaced by state-led and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit two children\'s life chances using three forms of capital, then test whether the difference you find is individual bad luck or a machine built to repeat itself.',
        labels: ['The Marginalisation of Tribes', 'The Aged as', 'Disability as a Social', 'The Rights of Persons', 'Gender Inequality and Exclusion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_007', title: 'The Marginalisation of Tribes: Forest Laws, Development-Induced Displacement and Identity',
          caseStudy: { intro: 'Begin with a real-world scenario: "Imagine a Gond family in Bastar whose great-grandparents practiced shifting cultivation in forests now declared a \'Reserved.',
            decisions: [{ prompt: 'A REMEMBER level question: State the year of the Indian Forest Act that established the categories of Reserved Forests, Protected Forests.', options: [
                { text: 'The Indian Forest Act of 1878 (not 1927', outcome: 'The Indian Forest Act of 1878 (not 1927 — the 1927 Act consolidated and amended it) established the.' },
                { text: 'conservation', outcome: 'Not quite — Students often believe that "forest laws were made to protect forests and tribals, but.', reveals: 'forest-laws-were-made-to' },
                { text: 'encroachment', outcome: 'Not quite — Students often believe that "forest laws were made to protect forests and tribals, but.', reveals: 'forest-laws-were-made-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_008', title: 'The Aged as a Marginalised Group: Demographic Transition and Elder Care',
          caseStudy: { intro: 'Begin by asking students: "Why do you see more elderly people living alone or in old-age homes today compared to your grandparents\' generation?" Connect this.',
            decisions: [{ prompt: 'Define \'demographic transition\' in the context of aging populations and state its two key drivers.', options: [
                { text: 'Demographic transition is the shift from high birth and death rates to low birth and', outcome: 'Demographic transition is the shift from high birth and death rates to low birth and death rates.' },
                { text: '\'aging population\' is only a demographic statistic (e', outcome: 'Not quite — Students often think \'aging population\' is only a demographic statistic (e.g., % of 60+ rising) and.', reveals: 'aging-population-is-only-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_009', title: 'Disability as a Social Issue: The Medical vs Social Model of Disability',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who uses a wheelchair. His school has a ramp at the main gate but N/A at the science lab on the first floor.',
            decisions: [{ prompt: 'Define the medical model of disability in one sentence. What is its primary location of the "problem"?', options: [
                { text: 'The medical model defines disability as a biological/medical impairment within the', outcome: 'The medical model defines disability as a biological/medical impairment within the individual that.' },
                { text: 'disability is caused by society\'s barriers', outcome: 'Not quite — Students often think the social model **denies the reality of impairment** or **rejects medical.', reveals: 'the-social-model-denies-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_010', title: 'The Rights of Persons with Disabilities Act and the Politics of Accessibility',
          caseStudy: { intro: 'Imagine a Class 12 student who uses a wheelchair arrives at a newly built "accessible" government college only to find the ramp gradient is 1:6 (too steep).',
            decisions: [{ prompt: 'State the number of disability conditions recognised under the RPwD Act 2016 and name any four conditions that were *added* compared to the.', options: [
                { text: 'The RPwD Act 2016 recognises 21 disability conditions (Section 2(zc) read with the', outcome: 'The RPwD Act 2016 recognises 21 disability conditions (Section 2(zc) read with the Schedule).' },
                { text: '7 conditions', outcome: 'Not quite — Students often think the RPwD Act 2016 is "just an update" of the 1995 Act with more disability.', reveals: 'the-rpwd-act-2016-is' },
                { text: 'just an update', outcome: 'Not quite — Students often think the RPwD Act 2016 is "just an update" of the 1995 Act with more disability.', reveals: 'the-rpwd-act-2016-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_05_011', title: 'Gender Inequality and Exclusion: Patriarchy, Son Preference and the Sex Ratio',
          scaffold: { problem: 'According to Census 2011, a state has 5,200,000 male children and 4,500,000 female children aged 0-6. Calculate the Child Sex Ratio (CSR).',
            steps: [
            { text: 'Identify given data: Males (0-6) = 5,200,000; Females (0-6) = 4,500,000; National CSR = 919.' },
            { text: 'Recall formula: CSR = (Females 0-6 / Males 0-6) × 1000.' },
            { text: 'Substitute values: CSR = (4,500,000 / 5,200,000) × 1000.' },
            { text: 'Compute: 4,500,000 / 5,200,000 = 0.86538; 0.86538 × 1000 = 865.38 ≈ 865.' },
            { text: 'Compare with national average: 865 < 919, so state is below national average by 919 - 865 = 54 points.', faded: true, blankAnswer: 'CSR = 865; the state is 54 points below the national.' }
            ] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A landlord refuses a student tenant saying \'people from that community are trouble — I had a bad experience once, so this isn\'t prejudice, it\'s pattern recognition.\'',
            decisions: [{ prompt: 'How do the three concepts map onto this refusal?', options: [
                { text: 'All three at once — \'they\'re trouble\' is the stereotype, the hostile pre-judgment of this applicant is prejudice, and the refusal is discrimination; one past incident doesn\'t make it evidence — prejudice is defined by resisting counter-evidence and generalising a group onto an individual.', outcome: 'The chapter\'s triad: cognition (fixed group trait), attitude (pre-judgment), behaviour (denial) — \'experience\' is the rationalisation prejudice wears, not an exemption from it.' },
                { text: 'He\'s right — real experience converts prejudice into reasonable caution.', outcome: 'Prejudice is judged by what it does, not what it cites — applying one incident to every member of a group is the generalisation mechanism itself; experience is the story the stereotype tells.', reveals: 'experience-excuses-prejudice' },
                { text: 'Only discrimination occurred — the thought and the feeling don\'t count until the law is broken.', outcome: 'The concepts mark the chain, not just the endpoint — the stereotype and the prejudice are what produced the refusal; treating only the act ignores how exclusion is manufactured upstream.', reveals: 'only-the-act-counts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'You can now separate inequality (the gap) from stratification (the machinery that keeps the gap) — and spot the meritocracy story hiding inside it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_007', difficulty: 'standard',
          question: 'The marginalisation of tribes refers to the systematic historical and ongoing.',
          hint: 'If stuck, revisit c11_soc_cbse_08_010 (Environmental Conflicts) and map each conflict.',
          misconception: 'Students often believe that "forest laws were made to protect forests and tribals, but implementation is weak." This.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: State the year of the Indian Forest Act that established the categories of Reserved Forests, Protected Forests, and Village Forests.', answer: 'The Indian Forest Act of 1878 (not 1927',
                  options: ['The Indian Forest Act of 1878 (not 1927', 'conservation', 'encroachment', 'trespass'],
                  hint: 'If stuck, revisit c11_soc_cbse_08_010 (Environmental Conflicts) and map each conflict type (dam.',
                  misconception: 'Students often believe that "forest laws were made to protect forests and tribals, but implementation is weak." This is fundamentally.' },
                { id: 'b', prompt: 'An ANALYZE level question: Compare the displacement caused by the Sardar Sarovar Dam (Narmada) and the Polavaram Dam (Godavari) in terms of (a) the proportion.', answer: 'and the Polavaram Dam (Godavari) in terms of (',
                  options: ['and the Polavaram Dam (Godavari) in terms of (', 'both dams displaced Adivasis equally and nothing changed', 'encroachment', 'trespass'],
                  hint: 'If stuck, revisit c11_soc_cbse_08_010 (Environmental Conflicts) and map each conflict type (dam.',
                  misconception: 'Students often believe that "forest laws were made to protect forests and tribals, but implementation is weak." This is fundamentally.' }
          ],
            remediations: { 'forest-laws-were-made-to': { steps: ['If the student holds the "conservation narrative" misconception: Step 1 — Assign a close reading of the Indian Forest.', 'Step 2 — Have them create a two-column table: "Colonial/Post-colonial Forest Law Provisions that Criminalise Adivasi.', 'Step 3 — Show the 2019 MoEFCC circular that directed states to use the Indian Forest Act 1927 for evictions *even where.', 'Step 4 — Re-attempt Diagnostic Question 2 and 5; the student must now articulate the *structural continuity* of the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "forest laws were made to protect forests and tribals, but implementation is weak." This.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: Critique the argument that "the Forest Rights Act 2006 has solved the historical injustice of forest laws for Adivasis." Base your.', answer: 'The argument is overstated',
                  options: ['The argument is overstated', 'FRA gave land titles so injustice is solved', 'encroachment', 'trespass'],
                  hint: 'If stuck, revisit c11_soc_cbse_08_010 (Environmental Conflicts) and map each conflict type (dam.',
                  misconception: 'Students often believe that "forest laws were made to protect forests and tribals, but implementation is weak." This is fundamentally.' }
          ],
            remediations: { 'forest-laws-were-made-to': { steps: ['If the student holds the "conservation narrative" misconception: Step 1 — Assign a close reading of the Indian Forest.', 'Step 2 — Have them create a two-column table: "Colonial/Post-colonial Forest Law Provisions that Criminalise Adivasi.', 'Step 3 — Show the 2019 MoEFCC circular that directed states to use the Indian Forest Act 1927 for evictions *even where.', 'Step 4 — Re-attempt Diagnostic Question 2 and 5; the student must now articulate the *structural continuity* of the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_008', difficulty: 'standard',
          question: 'The aged as a marginalised group refers to older persons (typically 60+ years).',
          hint: 'If stuck, re-read NCERT Section 5.1 \'What Is Social About Social Inequality and.',
          misconception: 'Students often think \'aging population\' is only a demographic statistic (e.g., % of 60+ rising) and not a sociological.',
          parts: [
                { id: 'a', prompt: 'Explain why the aged are considered a \'marginalised group\' in sociological terms, distinguishing this from individual old-age problems.', answer: 'The aged are a marginalised group',
                  options: ['The aged are a marginalised group', '\'aging population\' is only a demographic statistic (e'],
                  hint: 'If stuck, re-read NCERT Section 5.1 \'What Is Social About Social Inequality and Exclusion?\' and.',
                  misconception: 'Students often think \'aging population\' is only a demographic statistic (e.g., % of 60+ rising) and not a sociological issue.' },
                { id: 'b', prompt: 'A 72-year-old widow from a Scheduled Caste background in rural Uttar Pradesh has no pension, lives in a dilapidated house, and is excluded from village water.', answer: 'Her marginalisation operates at the intersection of three axes: (1) age',
                  options: ['Her marginalisation operates at the intersection of three axes: (1) age', '\'aging population\' is only a demographic statistic (e'],
                  hint: 'If stuck, re-read NCERT Section 5.1 \'What Is Social About Social Inequality and Exclusion?\' and.',
                  misconception: 'Students often think \'aging population\' is only a demographic statistic (e.g., % of 60+ rising) and not a sociological issue.' },
                { id: 'c', prompt: 'Compare the traditional joint family care model with the current institutional/state care model for the elderly in India.', answer: 'Traditional model: care as familial duty within multigenerational households,',
                  options: ['Traditional model: care as familial duty within multigenerational households,', '\'aging population\' is only a demographic statistic (e'],
                  hint: 'If stuck, re-read NCERT Section 5.1 \'What Is Social About Social Inequality and Exclusion?\' and.',
                  misconception: 'Students often think \'aging population\' is only a demographic statistic (e.g., % of 60+ rising) and not a sociological issue.' }
          ],
            remediations: { 'aging-population-is-only-a': { steps: ['Revisit c12_soc_cbse_05_003 (Social Exclusion) to re-learn the three attributes: systematic, structural.', 'Re-read NCERT Box 5.1a on transgender/third gender to see how the textbook applies exclusion framework to a non-caste.', 'Complete Activity 5.1 (diary comparison) but for an elderly person vs.', 'a young worker — map time-use, respect, decision-making power.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_009', difficulty: 'standard',
          question: 'The **medical model of disability** views disability as an individual\'s.',
          hint: 'Revisit c12_soc_cbse_05_003 (Social Exclusion: Definition, Attributes and the C) and.',
          misconception: 'Students often think the social model **denies the reality of impairment** or **rejects medical treatment**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **medical model of disability** views disability as an individual\'s biological',
                  options: ['The **medical model of disability** views disability as an individual\'s biological', 'Social inequality refers to the systematic, group-based unequal distribution of valued', 'Prejudice is a pre-conceived opinion or attitude held by members of one group towards', 'Social exclusion is a systematic process by which individuals or groups are denied full'],
                  hint: 'Revisit c12_soc_cbse_05_003 (Social Exclusion: Definition, Attributes and the C) and practice.',
                  misconception: 'Students often think the social model **denies the reality of impairment** or **rejects medical treatment**.' }
          ],
            remediations: { 'the-social-model-denies-the': { steps: ['If a student conflates impairment and disability or thinks the social model rejects medicine: (1) Have them re-read the.', '(4) Re-diagnostic: Give a new scenario (e.g., a dyslexic student denied extra exam time) and ask the student to label.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_010', difficulty: 'standard',
          question: 'The Rights of Persons with Disabilities Act (RPwD Act), 2016, is.',
          hint: 'If stuck, revisit the "Medical vs Social Model" table in c12_soc_cbse_05_009 and the.',
          misconception: 'Students often think the RPwD Act 2016 is "just an update" of the 1995 Act with more disability categories.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why "reasonable accommodation" (Section 2(y)) is not the same as "accessibility" (Section 2(b)), using a classroom example.', answer: 'Accessibility is *general, anticipatory, and universal*',
                  options: ['Accessibility is *general, anticipatory, and universal*', 'both mean making things accessible', 'undue hardship', 'just an update'],
                  hint: 'If stuck, revisit the "Medical vs Social Model" table in c12_soc_cbse_05_009 and the "Fundamental.',
                  misconception: 'Students often think the RPwD Act 2016 is "just an update" of the 1995 Act with more disability categories.' },
                { id: 'b', prompt: 'A university denies admission to a candidate with 40% locomotor disability for a B.Sc.', answer: 'Step 1: Check if the university identified the "essential requirements" *before*',
                  options: ['Step 1: Check if the university identified the "essential requirements" *before*', 'essential requirements', 'just an update'],
                  hint: 'If stuck, revisit the "Medical vs Social Model" table in c12_soc_cbse_05_009 and the "Fundamental.',
                  misconception: 'Students often think the RPwD Act 2016 is "just an update" of the 1995 Act with more disability categories.' }
          ],
            remediations: { 'the-rpwd-act-2016-is': { steps: ['If the student conflates the two Acts or reduces accessibility to ramps: (1) Re-read NCERT pp.', '88-93, highlighting every phrase that contrasts "medical model" vs "social model" and "charity" vs "rights".', '(2) Create a two-column table: Column A = 1995 Act provision (e.g., "3% reservation in jobs"), Column B = 2016 Act.', '(3) Take a real campus (your school) and apply the 5-point audit from Diagnostic Question 6 — note which points are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_011', difficulty: 'standard',
          question: 'Gender inequality refers to the systematic, socially constructed disparity.',
          hint: 'Revisit c11_soc_cbse_03_010 (Gendered Socialisation) and c11_soc_cbse_02_003 (Gender.',
          misconception: 'Students often think "son preference is natural because sons support parents in old age" — treating it as a rational.',
          parts: [
                { id: 'a', prompt: 'Explain why patriarchy is described as a "structural system" rather than merely a collection of individual sexist attitudes.', answer: 'Patriarchy is structural',
                  options: ['Patriarchy is structural', 'mindset', 'culture', 'son preference is natural'],
                  hint: 'Revisit c11_soc_cbse_03_010 (Gendered Socialisation) and c11_soc_cbse_02_003 (Gender.',
                  misconception: 'Students often think "son preference is natural because sons support parents in old age" — treating it as a rational economic choice rather.' },
                { id: 'b', prompt: 'A district has 12,500 male children and 10,000 female children aged 0-6. Calculate the child sex ratio.', answer: 'Step 1: Initial CSR = (10,000 / 12,500) × 1000 = 800',
                  options: ['Step 1: Initial CSR = (10,000 / 12,500) × 1000 = 800', 'son preference is natural', 'Poor families prefer sons'],
                  hint: 'Revisit c11_soc_cbse_03_010 (Gendered Socialisation) and c11_soc_cbse_02_003 (Gender.',
                  misconception: 'Students often think "son preference is natural because sons support parents in old age" — treating it as a rational economic choice rather.' }
          ],
            remediations: { 'son-preference-is-natural-because': { steps: ['If a student holds this misconception: (1) Ask them to compare old-age support in matrilineal Khasi society (Meghalaya).', '(2) Show Census 2011 data: CSR is lowest in rich northwestern states (Punjab, Haryana, Delhi), not poorest states.', '(3) Assign reading of Leela Visaria\'s work on "deficit of girls" among high-income groups.', '(4) Re-diagnostic: Ask them to explain why a wealthy Jat farmer in Haryana with a pension still prefers a son — forcing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
