import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch06_p2: SimDef = {
    id: 'v3_c11_soc_ch06_p2',
    title: 'Social Structure, Stratification and Social Processes in Society · Part 2/2',
    subtitle: 'See hierarchy as many ladders crossing, not one economic ladder.',
    classLevel: 11, subject: 'sociology', topic: 'Social Structure, Stratification and Social Processes in Society · Part 2/2',
    chapters: ['c11_soc_ch06'],
    nodeIds: ['c11_soc_cbse_06_007', 'c11_soc_cbse_06_008', 'c11_soc_cbse_06_009', 'c11_soc_cbse_06_010', 'c11_soc_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist redrawing a school as positions, not rules', intro: 'Uniform codes aren\'t the school\'s structure — student, teacher, principal and the expectations between them are.', goal: 'Define social structure relationally and stratification as multi-dimensional.' },
    discovery: {
        question: 'Fix poverty and caste and gender inequality will fade automatically — is stratification really just economics?',
        options: ['No — stratification runs on several axes at once; gender cuts across every caste and class, so money alone can\'t level it', 'Yes — class is the master key', 'Yes — poverty causes all hierarchy', 'No — because caste no longer exists'],
        answer: 'No — stratification runs on several axes at once; gender cuts across every caste and class, so money alone can\'t level it',
        hook: 'And \'competition is human nature\' is a naturalistic fallacy — cooperation and competition are both socially organised; no society runs on instinct.',
    },
    teaching: [
        { title: 'Cooperation as a Social Process: Voluntary and Enforced Cooperation', text: 'Cooperation as a social process refers to the joint activity of two or more individuals or groups working together to achieve shared or complementary goals, which may be either voluntary (freely.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Draw a school\'s structure as statuses and roles (not rules), then test whether \'socialism failed because it fought human nature\' survives sociology.',
        labels: ['Cooperation as a Social', 'Competition as a Social', 'Conflict: Bases, Forms', 'Reservation Policy and', 'Marx\'s Concept of Alienation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_008', title: 'Competition as a Social Process and Ideology in Capitalist Society',
          caseStudy: { intro: 'Imagine you are a Class 11 student preparing for a highly competitive entrance exam like NEET or JEE.',
            decisions: [{ prompt: 'Define competition as a social process and distinguish it from competition as an ideology in capitalist society, using the textbook\'s.', options: [
                { text: 'Competition as a social process is a patterned interaction where actors strive for scarce', outcome: 'Competition as a social process is a patterned interaction where actors strive for scarce rewards.' },
                { text: 'competition is natural human nature', outcome: 'Not quite — Students often believe competition is a natural, universal human instinct ("survival of the.', reveals: 'competition-is-a-natural' },
                { text: 'survival of the fittest', outcome: 'Not quite — Students often believe competition is a natural, universal human instinct ("survival of the.', reveals: 'competition-is-a-natural' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_011', title: 'Marx\'s Concept of Alienation Under Capitalism',
          caseStudy: { intro: 'Imagine a 22-year-old gig worker in Bengaluru delivering food orders for ₹15 per delivery, algorithmically managed, penalised for delays beyond their control.',
            decisions: [{ prompt: 'Define Marx\'s concept of alienation in one sentence using the precise sociological terminology from the NCERT glossary.', options: [
                { text: 'Correct answer: "Marx used the term to refer to the loss of control on the part of', outcome: 'Correct answer: "Marx used the term to refer to the loss of control on the part of workers over the.' },
                { text: 'A wrong answer revealing misconception', outcome: 'Not quite — Students conflate alienation with exploitation, job dissatisfaction, or anomie.', reveals: 'students-conflate-alienation-with-exploitation' },
                { text: 'MGNREGA workers are alienated', outcome: 'Not quite — Students conflate alienation with exploitation, job dissatisfaction, or anomie.', reveals: 'students-conflate-alienation-with-exploitation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_007', title: 'A real-world call',
          caseStudy: { intro: 'An entrepreneur can make a product cheaper using a supplier with poor labour practices — winning on price — or a fair supplier whose higher costs may sink the business before it starts.',
            decisions: [{ prompt: 'Does \'just starting out\' excuse the cheap choice?', options: [
                { text: 'Yes — survive first, fix ethics at scale', outcome: 'The survival argument; but \'later\' rarely arrives — the supply chain you start with tends to be the one you keep.' },
                { text: 'No — ethics aren\'t a premium feature', outcome: 'The integrity argument; risks the business never existing to be ethical at all.' },
                { text: 'Choose fair AND compete on something besides price', outcome: 'The differentiation answer — \'ethically made\' is itself a market; harder, but it makes the choice sustainable.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Asked \'what is a school\'s social structure?\', a student lists \'uniform rules, attendance, homework deadlines.\' On stratification he adds: \'fix income inequality and caste and gender gaps disappear — reservations should be income-based only.\'',
            decisions: [{ prompt: 'What do structure and stratification actually describe?', options: [
                { text: 'Move from rules to relations: structure is the patterned arrangement of statuses (student, teacher, principal), attached roles, institutions (exams, houses) and resource distribution (lab access, counsellors) — the rules are just the normative surface. And stratification isn\'t economics alone: caste operates through exclusion, stigma and ritual hierarchy — a rich Dalit still faces temple-entry denial; class, caste and gender are autonomous though intersecting axes.', outcome: 'He redescribes the school structurally — positions and resources, not wall-posted rules — and sees why income-only policy can\'t reach status hierarchies.' },
                { text: 'Keep the rules list — structure is the system\'s dos and don\'ts.', outcome: 'Rules are what people should do; structure is how positions are arranged and resources flow — the \'building metaphor\' confuses the sign for the edifice.', reveals: 'structure-is-rules' },
                { text: 'Support income-only reservation — economic fix cures all inequality.', outcome: 'Stratification has independent bases: wealth doesn\'t buy out stigma — a poor Brahmin keeps ritual status a rich Dalit is denied; the axes intersect but don\'t collapse.', reveals: 'stratification-is-only-economic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'Structure isn\'t the rulebook — it\'s the arrangement of positions that the rules merely serve.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_007', difficulty: 'standard',
          question: 'Cooperation as a social process refers to the joint activity of two or more.',
          hint: 'If stuck, revisit the distinction between \'social structure as constraint\' and.',
          misconception: 'Students often equate \'cooperation\' with \'voluntary harmony\' and assume that if no open conflict is visible.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cooperation as a social process refers to the joint activity of two or more individuals',
                  options: ['Cooperation as a social process refers to the joint activity of two or more individuals', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'If stuck, revisit the distinction between \'social structure as constraint\' and \'individual agency\'.',
                  misconception: 'Students often equate \'cooperation\' with \'voluntary harmony\' and assume that if no open conflict is visible, cooperation is genuinely.' }
          ],
            remediations: { 'students-often-equate-cooperation-with': { steps: ['If a student insists cooperation is always voluntary: (1) Ask them to list three things they did today with others; (2).', '9-10) and identify the specific sanctions (brothers\' wives\' hatred, loss of natal home access) that enforce.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_008', difficulty: 'standard',
          question: 'Competition as a social process refers to a structured struggle between.',
          hint: 'If stuck, revisit c11_soc_cbse_06_002 (Social Stratification) and c11_soc_cbse_06_003.',
          misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Competition as a social process refers to a structured struggle between individuals or',
                  options: ['Competition as a social process refers to a structured struggle between individuals or', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'If stuck, revisit c11_soc_cbse_06_002 (Social Stratification) and c11_soc_cbse_06_003 (Three Forms.',
                  misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that capitalist competition.' }
          ],
            remediations: { 'competition-is-a-natural': { steps: ['Revisit the African classroom anecdote (Activity 6 in textbook) and ask: "If competition were natural, why did those.', 'Map the three forms of advantage (life chances, social status, political influence) onto the JEE/NEET example: list.', 'Reread the Bottomore and Mill extracts in the textbook; highlight phrases like "less welcome effects" and "generally.', 'Write a one-paragraph answer to: "Does the same exam paper guarantee equal competition?" using the concepts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Competition in a capitalist market ensures the most efficient outcome for society as a whole." Use the textbook\'s reference to Bottomore.', answer: 'The claim is contested',
                  options: ['The claim is contested', 'survival of the fittest', 'uncritically affirms the claim shows the student accepts the ideology as fact'],
                  hint: 'If stuck, revisit c11_soc_cbse_06_002 (Social Stratification) and c11_soc_cbse_06_003 (Three Forms.',
                  misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that capitalist competition.' },
                { id: 'b', prompt: 'Create a brief scenario (3-4 sentences) set in an Indian village or urban neighborhood that illustrates how competition and cooperation coexist and overlap.', answer: 'Example: "In a Maharashtra village, farmers once cooperated to operate a charas',
                  options: ['Example: "In a Maharashtra village, farmers once cooperated to operate a charas', 'survival of the fittest'],
                  hint: 'If stuck, revisit c11_soc_cbse_06_002 (Social Stratification) and c11_soc_cbse_06_003 (Three Forms.',
                  misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that capitalist competition.' }
          ],
            remediations: { 'competition-is-a-natural': { steps: ['Revisit the African classroom anecdote (Activity 6 in textbook) and ask: "If competition were natural, why did those.', 'Map the three forms of advantage (life chances, social status, political influence) onto the JEE/NEET example: list.', 'Reread the Bottomore and Mill extracts in the textbook; highlight phrases like "less welcome effects" and "generally.', 'Write a one-paragraph answer to: "Does the same exam paper guarantee equal competition?" using the concepts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_009', difficulty: 'standard',
          question: 'Conflict is a social process in which individuals or groups consciously oppose.',
          hint: 'Revisit the three forms of advantage (life chances, social status, political influence).',
          misconception: 'Students often think conflict and cooperation are mutually exclusive opposites – that a society or group either.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conflict is a social process in',
                  options: ['Conflict is a social process in', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'Revisit the three forms of advantage (life chances, social status, political influence) in node.',
                  misconception: 'Students often think conflict and cooperation are mutually exclusive opposites – that a society or group either cooperates or conflicts.' }
          ],
            remediations: { 'conflict-and-cooperation-are-mutually': { steps: ['If a student holds this misconception, guide them through the NCERT\'s "Land Conflicts" box: (1) Ask: "Did Ganpat and.', '(2) Show the women\'s property example: women cooperate with patriarchal norms to avoid open conflict.', '(3) Have them write a 100-word paragraph using "enforced cooperation" and "covert conflict" to describe a family.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_010', difficulty: 'standard',
          question: 'Reservation policy in India is a constitutional mechanism of compensatory.',
          hint: 'Revisit c11_soc_cbse_06_003 (Three Forms of Social Advantage) and c11_soc_cbse_06_008.',
          misconception: 'Students believe "Merit is an objective, measurable quality (marks/rank) that exists independently of social.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reservation policy in India is a constitutional mechanism of compensatory discrimination',
                  options: ['Reservation policy in India is a constitutional mechanism of compensatory discrimination', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'Revisit c11_soc_cbse_06_003 (Three Forms of Social Advantage) and c11_soc_cbse_06_008 (Competition.',
                  misconception: 'Students believe "Merit is an objective, measurable quality (marks/rank) that exists independently of social background, and reservation.' }
          ],
            remediations: { 'merit-is-an-objective': { steps: ['Ask them to list 5 things that helped them prepare for exams (coaching, books, quiet room, educated parents, internet).', 'Ask which of these a Dalit agricultural labourer\'s child likely lacks.', 'Introduce Bourdieu\'s \'cultural capital\' via the NCERT concept of \'life chances\' (c11_soc_cbse_06_003).', 'Show the 2019 NSSO data: Only 2.7% of rural SC households have internet vs. 28% urban General.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_011', difficulty: 'standard',
          question: 'Marx\'s concept of alienation refers to the systematic separation of workers.',
          hint: 'Revisit c11_soc_cbse_06_006 (Conflict Perspective) — specifically the "production.',
          misconception: 'Students conflate alienation with exploitation, job dissatisfaction, or anomie.',
          parts: [
                { id: 'a', prompt: 'Apply Marx\'s concept to analyze this scenario: A software engineer at a Bengaluru startup "owns" their code on GitHub, chooses their stack, works flexible.', answer: 'Step-by-step application: (1) Product alienation: PARTIALLY PRESENT',
                  options: ['Step-by-step application: (1) Product alienation: PARTIALLY PRESENT', 'no alienation because of autonomy/equity', 'MGNREGA workers are alienated'],
                  hint: 'Revisit c11_soc_cbse_06_006 (Conflict Perspective) — specifically the "production relations" and.',
                  misconception: 'Students conflate alienation with exploitation, job dissatisfaction, or anomie.' },
                { id: 'b', prompt: 'Compare Marx\'s alienation and Durkheim\'s anomie using this contrast: A factory worker in 1890s Manchester vs. a freelance graphic designer in 2024 Mumbai.', answer: 'Correct analysis: Manchester worker',
                  options: ['Correct analysis: Manchester worker', 'MGNREGA workers are alienated'],
                  hint: 'Revisit c11_soc_cbse_06_006 (Conflict Perspective) — specifically the "production relations" and.',
                  misconception: 'Students conflate alienation with exploitation, job dissatisfaction, or anomie.' }
          ],
            remediations: { 'students-conflate-alienation-with-exploitation': { steps: ['Have student physically enact two tasks — (a) drawing a picture of their choice with own materials; (b) copying.', 'After each, ask: "Who decided WHAT to make? HOW to make it? WHO owns the result?', 'Map answers to four dimensions — the contrast makes structural alienation visible without theory-jargon.', 'Apply to real job — "In your internship/part-time job, which task was like (a) and which like (b)?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
