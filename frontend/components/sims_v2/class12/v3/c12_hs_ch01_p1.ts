import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch01_p1: SimDef = {
    id: 'v3_c12_hs_ch01_p1',
    title: 'Work, Livelihood and Career · Part 1/2',
    subtitle: 'Same stone, three different lives',
    classLevel: 12, subject: 'home_science', topic: 'Work, Livelihood and Career · Part 1/2',
    chapters: ['c12_hs_ch01'],
    nodeIds: ['c12_hs_cbse_01_001', 'c12_hs_cbse_01_002', 'c12_hs_cbse_01_003', 'c12_hs_cbse_01_004', 'c12_hs_cbse_01_005', 'c12_hs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Work psychologist', intro: 'Why does identical labour feel like a prison to one person and a purpose to another? The answer isn\'t in the task.', goal: 'Distinguish job, career and calling — and what makes work meaningful beyond the paycheque.' },
    discovery: {
        question: 'Three people break the same stone: one sees a wage, one a livelihood, one a statue being born. What separates them?',
        options: ['Orientation — job, career and calling are relationships to work, not kinds of work; the third man\'s hammer blows build his becoming', 'Skill levels', 'Different stones', 'Pay grades'],
        answer: 'Orientation — job, career and calling are relationships to work, not kinds of work; the third man\'s hammer blows build his becoming',
        hook: 'Meaningful work isn\'t high-paying work — it\'s useful, responsible, enjoyable, skill-using work. And ergonomics isn\'t expensive chairs: it\'s adapting the whole work environment to the worker, which is what dignity of labour actually looks like in design.',
    },
    teaching: [
        { title: 'Work: Definition, Meaning and Its Role in Human Life', text: 'Work is any purposeful human activity — paid or unpaid, formal or informal — that creates value for self, family, organisation, or society by applying physical, mental, or creative effort, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit three kinds of work-love: classify job, career and calling in real lives, weigh pay against meaning, and see how quality of work life outruns standard of living.',
        labels: ['Work: Definition, Meaning', 'Types of Work: Paid,', 'Livelihood: Concept and Sustainable', 'Career: Definition and Distinction', 'Factors Influencing Career Choice', 'Career Stages: Exploration, Establishment,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_001', title: 'Work: Definition, Meaning and Its Role in Human Life',
          caseStudy: { intro: 'Imagine three Class 12 students discussing their summer plans: one takes a data-entry job for pocket money, another interns at a law firm to build a legal.',
            decisions: [{ prompt: 'According to the NCERT textbook, which of the following is NOT a criterion for work to be considered "meaningful work"? A.', options: [
                { text: 'Correct answer: C', outcome: 'Correct answer: C. The work provides high financial compensation.' },
                { text: 'meaningful work = high-paying work', outcome: 'Not quite — Students equate "career" with "high-status, high-pay profession" (doctor, engineer, IAS) and "job".', reveals: 'students-equate-career-with-high' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_002', title: 'Types of Work: Paid, Unpaid, Formal and Informal',
          caseStudy: { intro: 'Imagine your neighbour, Meena, who works 10 hours a day as a domestic helper in three different apartments, earns ₹8,000/month in cash, has no written.',
            decisions: [{ prompt: 'State the defining feature that distinguishes **formal work** from **informal work** in the Indian context. Answer in one sentence.', options: [
                { text: 'Correct answer: Formal work is characterised by a legally recognised employer-employee', outcome: 'Correct answer: Formal work is characterised by a legally recognised employer-employee relationship.' },
                { text: 'Formal work pays more', outcome: 'Not quite — **Misconception:** "Unpaid work is not *real* work because it doesn\'t earn money, and informal work.', reveals: 'misconception-unpaid-work-is-not' },
                { text: 'Informal work is illegal', outcome: 'Not quite — **Misconception:** "Unpaid work is not *real* work because it doesn\'t earn money, and informal work.', reveals: 'misconception-unpaid-work-is-not' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_005', title: 'Factors Influencing Career Choice: Aptitude, Interest and Personality',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, who loves painting (interest), scores high on spatial reasoning tests (aptitude), but describes herself as extremely.',
            decisions: [{ prompt: 'Define aptitude, interest, and personality in the context of career choice.', options: [
                { text: 'Aptitude is a measurable potential for skill acquisition (e.g., mechanical reasoning,', outcome: 'Aptitude is a measurable potential for skill acquisition (e.g., mechanical reasoning, verbal.' },
                { text: 'what you like', outcome: 'Not quite — Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude.', reveals: 'students-conflate-interest-with-aptitude' },
                { text: 'what you are good at', outcome: 'Not quite — Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude.', reveals: 'students-conflate-interest-with-aptitude' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Work, Livelihood and Career · Part 1/2', spots: [
            { id: 's1', label: 'Work Definition Meaning and Its Role in Human Life', prompt: 'Which idea is this? — Work is any purposeful human activity — paid or unpaid, formal or informal — that creates.', answer: 'Work Definition Meaning and Its Role in Human Life', options: ['Work Definition Meaning and Its Role in Human Life', 'Types of Work Paid Unpaid Formal and Informal', 'Livelihood Concept and Sustainable Livelihood Framework', 'Career Definition and Distinction from Job and Occupation'] },
            { id: 's2', label: 'Types of Work Paid Unpaid Formal and Informal', prompt: 'Which idea is this? — Work can be classified into four interrelated categories based on remuneration and.', answer: 'Types of Work Paid Unpaid Formal and Informal', options: ['Types of Work Paid Unpaid Formal and Informal', 'Work Definition Meaning and Its Role in Human Life', 'Livelihood Concept and Sustainable Livelihood Framework', 'Career Definition and Distinction from Job and Occupation'] },
            { id: 's3', label: 'Livelihood Concept and Sustainable Livelihood Framework', prompt: 'Which idea is this? — Livelihood refers to the capabilities, assets (including both material and social.', answer: 'Livelihood Concept and Sustainable Livelihood Framework', options: ['Livelihood Concept and Sustainable Livelihood Framework', 'Work Definition Meaning and Its Role in Human Life', 'Types of Work Paid Unpaid Formal and Informal', 'Career Definition and Distinction from Job and Occupation'] },
            { id: 's4', label: 'Career Definition and Distinction from Job and Occupation', prompt: 'Which idea is this? — Career is a dynamic, lifelong sequence of progressive professional roles and achievements.', answer: 'Career Definition and Distinction from Job and Occupation', options: ['Career Definition and Distinction from Job and Occupation', 'Work Definition Meaning and Its Role in Human Life', 'Types of Work Paid Unpaid Formal and Informal', 'Livelihood Concept and Sustainable Livelihood Framework'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a career seminar, a speaker says a neighbour who cooks, cleans and cares for an elderly parent all day \'doesn\'t work\', while her husband\'s office job \'counts.\' A classmate also argues that the street vendor outside, who has a municipal licence, \'does informal work, so it\'s basically illegal.\'',
            decisions: [{ prompt: 'How does the paid/unpaid and formal/informal matrix correct both claims?', options: [
                { text: 'Separate the two axes — the neighbour does unpaid informal work with real economic value and no protection; the vendor is paid but informal — legal yet without contract, PF or sick leave; \'informal\' describes missing legal safeguards, not illegality or low worth.', outcome: 'The chapter\'s matrix exists to expose the double blindness: unpaid care work substitutes for market services and enables others\' paid work, while informal workers lack protection — neither means \'not work\' or \'illegal.\'' },
                { text: 'Agree on both — unpaid work isn\'t employment, and no-contract work is outside the law.', outcome: 'Both conflate categories the chapter separates: unpaid ≠ valueless, and informal ≠ illegal — a licensed vendor trades lawfully; she just lacks the employer-employee relationship that carries statutory protection.', reveals: 'informal-equals-illegal' },
                { text: 'Fix it by re-labelling — call the vendor \'formal\' since she has a licence, and the caregiver \'paid\' since her work has value.', outcome: 'A vending licence grants spatial legitimacy, not employment status, and economic value isn\'t wages; renaming the cells doesn\'t move the worker into them — the matrix is about protection and pay, not dignity labels.', reveals: 'rename-equals-reclassify' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell employment from calling — and argue that meaning, not money, is the measure of work well chosen.',
            decisions: [{ prompt: 'What comes next? Work, Livelihood and Career · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Work, Livelihood and Career · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_001', difficulty: 'standard',
          question: 'Work is any purposeful human activity — paid or unpaid, formal or informal.',
          hint: 'If unable to distinguish job/career/calling, revisit the three stone-breakers anecdote.',
          misconception: 'Students equate "career" with "high-status, high-pay profession" (doctor, engineer, IAS) and "job" with "low-status.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT textbook, which of the following is NOT a criterion for work to be considered "meaningful work"? A.', answer: 'Correct answer: C',
                  options: ['Correct answer: C', 'meaningful work = high-paying work'],
                  hint: 'If unable to distinguish job/career/calling, revisit the three stone-breakers anecdote in the.',
                  misconception: 'Students equate "career" with "high-status, high-pay profession" (doctor, engineer, IAS) and "job" with "low-status work," missing that the.' }
          ],
            remediations: { 'students-equate-career-with-high': { steps: ['Have the student re-read the three stone-breakers anecdote and write one sentence for each man describing his *internal.', 'Ask the student to interview one adult they know (parent, teacher, shopkeeper) and classify that person\'s work.', 'Student creates a two-column table: "External markers of career (society\'s view)" vs "Internal markers of career.', 'Re-attempt Diagnostic Question 2 with a new pair of examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_002', difficulty: 'standard',
          question: 'Work can be classified into four interrelated categories based on remuneration.',
          hint: 'If stuck, revisit c12_hs_cbse_01_001\'s section "Work, Careers and Livelihoods" (NCERT pp.',
          misconception: '**Misconception:** "Unpaid work is not *real* work because it doesn\'t earn money, and informal work is just \'illegal\'.',
          parts: [
                { id: 'a', prompt: 'A street vendor in Delhi sells homemade snacks from a pushcart.', answer: 'Classification: **Paid + Informal**',
                  options: ['Classification: **Paid + Informal**', 'formal because she has a licence'],
                  hint: 'If stuck, revisit c12_hs_cbse_01_001\'s section "Work, Careers and Livelihoods" (NCERT pp.',
                  misconception: '**Misconception:** "Unpaid work is not *real* work because it doesn\'t earn money, and informal work is just \'illegal\' or \'black money\'.' }
          ],
            remediations: { 'misconception-unpaid-work-is-not': { steps: ['** Re-read the NCERT paragraphs on "Work, Careers and Livelihoods" (pp.', '** Watch the 10-minute video "Unpaid Care Work: The Invisible Engine" (UN Women / ILO) — note the **third-person.', '** Take a blank 2×2 matrix (Paid/Unpaid × Formal/Informal). Place these 6 roles: (a) ASHA worker, (b) MNREGA labourer.', '** Re-attempt Diagnostic Questions 2 and 3. If you still misclassify, discuss with teacher focusing on: *What specific.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Unpaid work is not *real* work because it doesn\'t earn money, and informal work is just \'illegal\'.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement from a newspaper editorial: *"India\'s female labour force participation rate (FLFPR) is low at 24% because most women choose.', answer: 'The statement is **flawed on three grounds**: 1',
                  options: ['The statement is **flawed on three grounds**: 1', 'work, gender, and dignity of labour'],
                  hint: 'If stuck, revisit c12_hs_cbse_01_001\'s section "Work, Careers and Livelihoods" (NCERT pp.',
                  misconception: '**Misconception:** "Unpaid work is not *real* work because it doesn\'t earn money, and informal work is just \'illegal\' or \'black money\'.' }
          ],
            remediations: { 'misconception-unpaid-work-is-not': { steps: ['** Re-read the NCERT paragraphs on "Work, Careers and Livelihoods" (pp.', '** Watch the 10-minute video "Unpaid Care Work: The Invisible Engine" (UN Women / ILO) — note the **third-person.', '** Take a blank 2×2 matrix (Paid/Unpaid × Formal/Informal). Place these 6 roles: (a) ASHA worker, (b) MNREGA labourer.', '** Re-attempt Diagnostic Questions 2 and 3. If you still misclassify, discuss with teacher focusing on: *What specific.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_003', difficulty: 'standard',
          question: 'Livelihood refers to the capabilities, assets (including both material and.',
          hint: 'If stuck, revisit Class 11 Home Science Chapter 4 (Resource Management) nodes.',
          misconception: 'Students often think livelihood = income = job, and that the sustainable livelihood framework is just a checklist.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Livelihood refers to the capabilities, assets (including both material and social',
                  options: ['Livelihood refers to the capabilities, assets (including both material and social', 'Work is any purposeful human activity', 'Work can be classified into four interrelated categories based on remuneration and', 'Career is a dynamic, lifelong sequence of progressive professional roles and achievements'],
                  hint: 'If stuck, revisit Class 11 Home Science Chapter 4 (Resource Management) nodes c11_hs_cbse_04_001.',
                  misconception: 'Students often think livelihood = income = job, and that the sustainable livelihood framework is just a checklist of assets.' }
          ],
            remediations: { 'livelihood-income-job': { steps: ['If the student conflates livelihood with job/income: Step 1 — Have them list all activities their own family does in.', 'Step 2 — Map each to the five capitals (e.g., cooking skills = human capital; family recipe = social capital).', 'Step 3 — Introduce a shock (parent loses job) and ask which capitals buffer the impact.', 'Step 4 — Re-diagnose with Question 2 (weaver household) to check if they can now correctly classify capitals without.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_004', difficulty: 'standard',
          question: 'Career is a dynamic, lifelong sequence of progressive professional roles and.',
          hint: 'Revisit c12_hs_cbse_01_001 (Work: Definition, Meaning and Its Role in Human Life) and.',
          misconception: 'Students often think **\'career\' just means \'a good job with promotion prospects\'** and therefore equate any stable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Career is a dynamic, lifelong sequence of progressive professional roles and achievements',
                  options: ['Career is a dynamic, lifelong sequence of progressive professional roles and achievements', 'Work is any purposeful human activity', 'Work can be classified into four interrelated categories based on remuneration and', 'Livelihood refers to the capabilities, assets (including both material and social'],
                  hint: 'Revisit c12_hs_cbse_01_001 (Work: Definition, Meaning and Its Role in Human Life) and complete the.',
                  misconception: 'Students often think **\'career\' just means \'a good job with promotion prospects\'** and therefore equate any stable, well-paying, long-term.' }
          ],
            remediations: { 'career-just-means-a-good': { steps: ['Re-read the three stone-breakers anecdote (NCERT p.5-6) and explicitly label each man\'s statement with the correct.', 'Make a 4-column table: Dimension | Job/Livelihood | Career | Calling.', 'Fill each cell using only textbook phrases (e.g., for Career: "progressive achievement", "continually upgrade skills".', 'Take the Arjun mini-case from Diagnostic 6 and classify each path using the table — not your intuition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_005', difficulty: 'standard',
          question: 'Aptitude refers to an individual\'s innate or acquired potential to acquire.',
          hint: 'Revisit c11_hs_cbse_02_006 (adolescence as critical period for identity) and.',
          misconception: 'Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude for software.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a career counsellor would use (a) a differential aptitude battery, (b) a vocational interest inventory, and (c) a personality.', answer: 'a differential aptitude battery, (',
                  options: ['a differential aptitude battery, (', 'strengths and weaknesses'],
                  hint: 'Revisit c11_hs_cbse_02_006 (adolescence as critical period for identity) and c11_psy_cbse_08_001.',
                  misconception: 'Students conflate **interest** with **aptitude** — believing "I enjoy coding, so I have aptitude for software engineering" — or conflate.' }
          ],
            remediations: { 'students-conflate-interest-with-aptitude': { steps: ['If a student conflates the three factors: (1) Have them complete a **three-column sorting task** with 15 career-related.', '(2) Present two contrasting case studies: *Case A* — High interest, low aptitude (fails training); *Case B* — High.', 'Ask: "Which factor caused each outcome?" (3) Re-diagnose using Diagnostic Question 2 — if they still omit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_01_006', difficulty: 'standard',
          question: 'Career stages are sequential phases in an individual\'s professional life cycle.',
          hint: 'If unclear on career vs job, re-read c12_hs_cbse_01_004\'s anecdote of the three.',
          misconception: '**Misconception:** "Career stages are rigid age boxes — if you\'re 30, you *must* be in Establishment; if 60, you *must*.',
          parts: [
                { id: 'a', prompt: 'A 22-year-old graduate is doing internships in three different fields to "find the right fit." Which career stage is she in, and what is the PRIMARY.', answer: 'She is in the **Exploration** stage (approx',
                  options: ['She is in the **Exploration** stage (approx', 'Establishment', 'skill mastery'],
                  hint: 'If unclear on career vs job, re-read c12_hs_cbse_01_004\'s anecdote of the three stone-breakers.',
                  misconception: '**Misconception:** "Career stages are rigid age boxes — if you\'re 30, you *must* be in Establishment; if 60, you *must* disengage." **Why.' }
          ],
            remediations: { 'misconception-career-stages-are-rigid': { steps: ['If a student cannot distinguish stages or applies age rigidly: 1.', '**Revisit c12_hs_cbse_01_004** (Career vs Job vs Occupation) — clarify that career is a *subjective, evolving.', '**Revisit c12_hs_cbse_01_005** (Factors Influencing Career Choice) — map how aptitude, interest, and opportunity.', '**Do a "Life Interview" activity:** Interview one person in each stage (e.g., college senior, mid-career parent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
