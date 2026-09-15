import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch13_p1: SimDef = {
    id: 'v3_c12_ps_ch13_p1',
    title: 'Rise of Popular Movements · Part 1/2',
    subtitle: 'Politics without a party flag',
    classLevel: 12, subject: 'political_science', topic: 'Rise of Popular Movements · Part 1/2',
    chapters: ['c12_ps_ch13'],
    nodeIds: ['c12_ps_cbse_13_001', 'c12_ps_cbse_13_002', 'c12_ps_cbse_13_003', 'c12_ps_cbse_13_004', 'c12_ps_cbse_13_005', 'c12_ps_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social movement analyst', intro: 'When parties stop listening, citizens don\'t stop organising — they just organise differently.', goal: 'Distinguish party-based from non-party movements by leadership, funding and accountability, and explain their democratic role.' },
    discovery: {
        question: 'The Narmada Bachao Andolan argued cases in the Supreme Court, lobbied the World Bank and faced down state governments for decades — yet refused to join or float a political party. Apolitical?',
        options: ['Deeply political — it contested power and policy through courts, media and mobilisation, just refused party affiliation to keep the freedom to pressure every party', 'Apolitical — real politics only happens inside parties', 'Anti-political — it rejected the state entirely', 'It would have joined a party if offered enough seats'],
        answer: 'Deeply political — it contested power and policy through courts, media and mobilisation, just refused party affiliation to keep the freedom to pressure every party',
        hook: 'Non-party doesn\'t mean non-political — these movements rose because the party system ignored tribals, farmers, women and forests, and staying outside parties is precisely what lets them confront all parties.',
    },
    teaching: [
        { title: 'Nature of Popular Movements: Party-Based vs Non-Party Movements', text: 'Popular movements are collective actions by citizens to address public issues, demand rights, or resist policies, operating outside formal institutional channels.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort India\'s great movements — JP\'s party-backed crusade versus Chipko and NBA\'s party-free persistence — by who leads them, who funds them and who they answer to.',
        labels: ['Nature of Popular Movements', 'The Chipko Movement: Environmental', 'The Dalit Panthers: Origins,', 'The Bharatiya Kisan Union', 'The Anti-Arrack Movement', 'Narmada Bachao Andolan: Displacement,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_001', title: 'Nature of Popular Movements: Party-Based vs Non-Party Movements',
          caseStudy: { intro: 'Imagine you see two protests on the news: one organized by a political party\'s student wing demanding fee rollback, and another by a local environmental group.',
            decisions: [{ prompt: 'Define a party-based movement and give one example from Indian politics post-1970s.', options: [
                { text: 'A party-based movement is directly organized, led, or controlled by a political party,', outcome: 'A party-based movement is directly organized, led, or controlled by a political party, using party.' },
                { text: 'Chipko Movement', outcome: 'Not quite — Students believe non-party movements are "apolitical" or "anti-political" because they don\'t.', reveals: 'non-party-movements-are-apolitical' },
                { text: 'apolitical', outcome: 'Not quite — Students believe non-party movements are "apolitical" or "anti-political" because they don\'t.', reveals: 'non-party-movements-are-apolitical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_002', title: 'The Chipko Movement: Environmental Activism in Uttarakhand',
          caseStudy: { intro: 'Imagine you see a news report about a hydroelectric project in Uttarakhand threatening a forest that local women depend on for firewood and fodder.',
            decisions: [{ prompt: 'In which year and location did the Chipko Movement begin with the first organized tree-hugging protest against commercial logging?', options: [
                { text: 'The Chipko Movement began in April 1973 at Mandal village in Chamoli district', outcome: 'The Chipko Movement began in April 1973 at Mandal village in Chamoli district (Uttarakhand, then.' },
                { text: '1974 Reni', outcome: 'Not quite — Students often believe Chipko was "only about saving trees" or "led entirely by Sunderlal.', reveals: 'chipko-was-only-about-saving' },
                { text: 'only about saving trees', outcome: 'Not quite — Students often believe Chipko was "only about saving trees" or "led entirely by Sunderlal.', reveals: 'chipko-was-only-about-saving' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_003', title: 'The Dalit Panthers: Origins, Ideology and Dalit Assertion',
          caseStudy: { intro: 'Imagine you are a college student in Mumbai in 1972 reading a newspaper report about a Dalit youth being brutally beaten for drawing water from a public well.',
            decisions: [{ prompt: 'In which year and city were the Dalit Panthers founded, and what was the immediate trigger for their formation?', options: [
                { text: 'The Dalit Panthers were founded in April 1972 in Mumbai (then Bombay)', outcome: 'The Dalit Panthers were founded in April 1972 in Mumbai (then Bombay).' },
                { text: '1975, Delhi', outcome: 'Not quite — Students often think the Dalit Panthers were "just a violent group" or "a Marxist front that used.', reveals: 'the-dalit-panthers-were-just' },
                { text: 'formed by Ambedkar', outcome: 'Not quite — Students often think the Dalit Panthers were "just a violent group" or "a Marxist front that used.', reveals: 'the-dalit-panthers-were-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_004', title: 'The Bharatiya Kisan Union and Farmers\' Mobilisation',
          caseStudy: { intro: 'Imagine you see a news clip from 1988: thousands of farmers in tractors and bullock carts surrounding the Boat Club lawns in Delhi, cooking meals on chulhas.',
            decisions: [{ prompt: 'What year was the Bharatiya Kisan Union formally founded, and who was its most prominent founding leader?', options: [
                { text: 'BKU was formally founded in 1986', outcome: 'BKU was formally founded in 1986; its most prominent founding leader was Mahendra Singh Tikait from.' },
                { text: 'peasant unity', outcome: 'Not quite — Students often conflate BKU with Chaudhary Charan Singh\'s Bharatiya Kranti Dal (1967) or Lok Dal.', reveals: 'students-often-conflate-bku-with' },
                { text: 'class-based movement', outcome: 'Not quite — Students often conflate BKU with Chaudhary Charan Singh\'s Bharatiya Kranti Dal (1967) or Lok Dal.', reveals: 'students-often-conflate-bku-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_005', title: 'The Anti-Arrack Movement and Women\'s Agency in Andhra Pradesh',
          caseStudy: { intro: 'Imagine a Class 12 student reading a news report about women in a village blocking a liquor shop and asking: "How did ordinary women with no political.',
            decisions: [{ prompt: 'What was the immediate trigger for the Anti-Arrack Movement in Dubagunta village, Nellore district, in 1992?', options: [
                { text: 'The immediate trigger was women\'s realisation, during a Mahila Samakhya literacy class', outcome: 'The immediate trigger was women\'s realisation, during a Mahila Samakhya literacy class discussion.' },
                { text: 'a government order banning arrack', outcome: 'Not quite — Students often believe the Anti-Arrack Movement was "led by the Telugu Desam Party" or "started.', reveals: 'the-anti-arrack-movement-was' },
                { text: 'a political party\'s call', outcome: 'Not quite — Students often believe the Anti-Arrack Movement was "led by the Telugu Desam Party" or "started.', reveals: 'the-anti-arrack-movement-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_006', title: 'Narmada Bachao Andolan: Displacement, Dams and Resistance',
          caseStudy: { intro: 'Imagine you see a news report about a village in Madhya Pradesh being submerged because a dam\'s gates were closed without proper rehabilitation of the families.',
            decisions: [{ prompt: 'What is the primary constitutional article invoked by the Narmada Bachao Andolan to argue that displacement without rehabilitation violates.', options: [
                { text: 'Article 21 (Right to Life and Personal Liberty)', outcome: 'Article 21 (Right to Life and Personal Liberty) — the Supreme Court has interpreted it to include.' },
                { text: 'anti-dam', outcome: 'Not quite — Students often think the NBA was "anti-dam" or "anti-development." In reality, the NBA\'s founding.', reveals: 'the-nba-was-anti-dam' },
                { text: 'anti-development', outcome: 'Not quite — Students often think the NBA was "anti-dam" or "anti-development." In reality, the NBA\'s founding.', reveals: 'the-nba-was-anti-dam' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A school exhibit labels Chipko \'anti-development villagers who wanted zero tree-cutting anywhere\' — a caption a visiting forest officer disputes.',
            decisions: [{ prompt: 'What did the movement actually oppose?', options: [
                { text: 'The displacement of subsistence by market — villagers opposed commercial felling that replaced mixed forests giving fuel, fodder and food with pine monocultures for resin; local cutting for genuine need stayed accepted — it was livelihood justice, not a ban on axes.', outcome: 'The chapter\'s political economy: \'anti-logging\' flattens a fight over whose needs the forest serves — community subsistence versus state-licensed commerce.' },
                { text: 'The exhibit is right — hugging trees is absolute protection, no cutting at all.', outcome: 'Chipko itself approved cutting for village needs — its target was commercial extraction that stripped the \'four Fs\' locals lived on; absolutism misreads a livelihood claim as a preservation cult.', reveals: 'chipko-meant-zero-cutting' },
                { text: 'It was mainly a women\'s cultural ritual — symbolic, not economic.', outcome: 'Women led because they collected the biomass the logging destroyed — the gendered participation expressed a material stake, not ceremony; calling it ritual erases the subsistence economics underneath.', reveals: 'symbolic-not-economic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell a party\'s protest from a people\'s movement — and argue why the second kind is a correction to democracy, not a threat to it.',
            decisions: [{ prompt: 'What comes next? Rise of Popular Movements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Rise of Popular Movements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_001', difficulty: 'standard',
          question: 'Popular movements are collective actions by citizens to address public issues.',
          hint: 'Revisit Class 10 Political Parties (c10_civ_cbse_04_001) and Class 11 Citizenship.',
          misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.',
          parts: [
                { id: 'a', prompt: 'Why did non-party movements gain prominence in India during the 1970s and 1980s? Explain using the concept of "party system failure."', answer: 'Non-party movements emerged',
                  options: ['Non-party movements emerged', 'Non-party movements are anti-democratic', 'non-party', 'anti-political'],
                  hint: 'Revisit Class 10 Political Parties (c10_civ_cbse_04_001) and Class 11 Citizenship.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' },
                { id: 'b', prompt: 'Scenario: A statewide farmers\' protest is led by a union whose president is also a member of a regional political party\'s state executive.', answer: 'This is a party-based movement',
                  options: ['This is a party-based movement', 'apolitical', 'anti-political'],
                  hint: 'Revisit Class 10 Political Parties (c10_civ_cbse_04_001) and Class 11 Citizenship.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' },
                { id: 'c', prompt: 'Compare the accountability mechanisms of party-based movements versus non-party movements. How does this affect their longevity and policy impact?', answer: 'Party-based movements are accountable to party leadership and electoral cycles',
                  options: ['Party-based movements are accountable to party leadership and electoral cycles', 'Both are equally accountable to the public', 'apolitical', 'anti-political'],
                  hint: 'Revisit Class 10 Political Parties (c10_civ_cbse_04_001) and Class 11 Citizenship.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' }
          ],
            remediations: { 'non-party-movements-are-apolitical': { steps: ['If the student conflates non-party with apolitical, assign this 3-step remediation: (1) Re-read NCERT Class 12 Chapter.', '(3) Write a 100-word paragraph: "How NBA\'s refusal to join any party strengthened its moral authority to question all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Non-party movements weaken political parties and fragment the party system, harming democratic stability." Use evidence from Indian.', answer: 'This argument is flawed',
                  options: ['This argument is flawed', 'apolitical', 'anti-political'],
                  hint: 'Revisit Class 10 Political Parties (c10_civ_cbse_04_001) and Class 11 Citizenship.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' }
          ],
            remediations: { 'non-party-movements-are-apolitical': { steps: ['If the student conflates non-party with apolitical, assign this 3-step remediation: (1) Re-read NCERT Class 12 Chapter.', '(3) Write a 100-word paragraph: "How NBA\'s refusal to join any party strengthened its moral authority to question all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_002', difficulty: 'standard',
          question: 'The Chipko Movement (1973–1981) was a non-violent, grassroots environmental.',
          hint: 'If unclear how satyagraha applies to trees: revisit c11_ps_cbse_09_006 — satyagraha.',
          misconception: 'Students often believe Chipko was "only about saving trees" or "led entirely by Sunderlal Bahuguna." In reality, Chipko.',
          parts: [
                { id: 'a', prompt: 'In which year and location did the Chipko Movement begin with the first organized tree-hugging protest against commercial logging?', answer: 'The Chipko Movement began in April 1973 at Mandal village in Chamoli district',
                  options: ['The Chipko Movement began in April 1973 at Mandal village in Chamoli district', '1974 Reni', 'only about saving trees', 'led entirely by Sunderlal Bahuguna'],
                  hint: 'If unclear how satyagraha applies to trees: revisit c11_ps_cbse_09_006 — satyagraha targets.',
                  misconception: 'Students often believe Chipko was "only about saving trees" or "led entirely by Sunderlal Bahuguna." In reality, Chipko was a *livelihood.' },
                { id: 'b', prompt: 'Apply the concept of "subsistence economy vs. market economy" (Guha & Gadgil) to explain why Chipko activists opposed commercial logging of pine trees but did.', answer: 'Chipko opposed replacement of mixed broadleaf forests (providing fuel, fodder,',
                  options: ['Chipko opposed replacement of mixed broadleaf forests (providing fuel, fodder,', 'they opposed all logging', 'pine is better for environment', 'only about saving trees'],
                  hint: 'If unclear how satyagraha applies to trees: revisit c11_ps_cbse_09_006 — satyagraha targets.',
                  misconception: 'Students often believe Chipko was "only about saving trees" or "led entirely by Sunderlal Bahuguna." In reality, Chipko was a *livelihood.' }
          ],
            remediations: { 'chipko-was-only-about-saving': { steps: ['If the student conflates Chipko with wilderness preservation or attributes it solely to Bahuguna: (1) Re-read the Reni.', '(2) Compare Chipko\'s "four Fs" (fuel, fodder, fertilizer, fiber) demand with the NBA\'s "rehabilitation first" demand.', '(3) Re-attempt Diagnostic Q3 and Q4, explicitly using "subsistence economy" and "gendered resource dependence".', '(4) Verify: Can you explain why Chipko activists *cut trees for their own houses* but stopped contractors?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_003', difficulty: 'standard',
          question: 'The Dalit Panthers was a radical Dalit youth organization founded in April 1972.',
          hint: 'Revisit c11_ps_cbse_03_005 (formal vs substantive equality) and c11_ps_cbse_04_010.',
          misconception: 'Students often think the Dalit Panthers were "just a violent group" or "a Marxist front that used Ambedkar\'s name.".',
          parts: [
                { id: 'a', prompt: 'In which year and city were the Dalit Panthers founded, and what was the immediate trigger for their formation?', answer: 'The Dalit Panthers were founded in April 1972 in Mumbai (then Bombay)',
                  options: ['The Dalit Panthers were founded in April 1972 in Mumbai (then Bombay)', '1975, Delhi', 'formed by Ambedkar', 'just a violent group'],
                  hint: 'Revisit c11_ps_cbse_03_005 (formal vs substantive equality) and c11_ps_cbse_04_010 (social justice.',
                  misconception: 'Students often think the Dalit Panthers were "just a violent group" or "a Marxist front that used Ambedkar\'s name." In reality, their.' }
          ],
            remediations: { 'the-dalit-panthers-were-just': { steps: ['If a student holds this misconception: 1.', 'Have them read the **Dalit Panthers Manifesto (1973)** — specifically the preamble where they declare: "We do not want.', 'Compare with the **Naxalite documents** from the same period (e.g., Charu Majumdar\'s "Historic Eight Documents") to see.', 'Re-do **Diagnostic Question 2** with the Manifesto open, annotating every sentence that references Ambedkar vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_004', difficulty: 'standard',
          question: 'The Bharatiya Kisan Union (BKU) is a non-party, farmer-led mass organisation.',
          hint: 'If stuck, revisit c12_ps_cbse_13_001 (definition of non-party movement) and.',
          misconception: 'Students often conflate BKU with Chaudhary Charan Singh\'s Bharatiya Kranti Dal (1967) or Lok Dal, assuming BKU was.',
          parts: [
                { id: 'a', prompt: 'What year was the Bharatiya Kisan Union formally founded, and who was its most prominent founding leader?', answer: 'BKU was formally founded in 1986',
                  options: ['BKU was formally founded in 1986', 'peasant unity', 'class-based movement', 'Chaudhary Charan Singh as founder, or dating it to the 1970s'],
                  hint: 'If stuck, revisit c12_ps_cbse_13_001 (definition of non-party movement) and c11_soc_cbse_07_008.',
                  misconception: 'Students often conflate BKU with Chaudhary Charan Singh\'s Bharatiya Kranti Dal (1967) or Lok Dal, assuming BKU was simply the electoral.' }
          ],
            remediations: { 'students-often-conflate-bku-with': { steps: ['If the student conflates BKU with Charan Singh\'s parties: Step 1 — Re-read c12_ps_cbse_13_001 on "non-party movements".', 'Step 2 — Create a two-column table: Charan Singh (electoral, party-based, 1960s-80s) vs Tikait/BKU (non-electoral.', 'Step 3 — Watch 10 minutes of the 1988 Boat Club footage (available on YouTube/Doordarshan archives) and identify:.', 'Step 4 — Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_005', difficulty: 'standard',
          question: 'The Anti-Arrack Movement (1992–1995) was a spontaneous, non-party mass.',
          hint: 'Revisit c10_civ_cbse_03_001 (sexual division of labour) and c10_civ_cbse_03_002.',
          misconception: 'Students often believe the Anti-Arrack Movement was "led by the Telugu Desam Party" or "started by N.T.',
          parts: [
                { id: 'a', prompt: 'Compare the Anti-Arrack Movement with the Chipko Movement (c12_ps_cbse_13_002) on three dimensions: (a) primary grievance, (b) organisational form, (c) role.', answer: 'primary grievance, (',
                  options: ['primary grievance, (', 'environmental movements', 'led by NGOs', 'led by the Telugu Desam Party'],
                  hint: 'Revisit c10_civ_cbse_03_001 (sexual division of labour) and c10_civ_cbse_03_002 (public/private.',
                  misconception: 'Students often believe the Anti-Arrack Movement was "led by the Telugu Desam Party" or "started by N.T.' }
          ],
            remediations: { 'the-anti-arrack-movement-was': { steps: ['If the student attributes the movement to party leadership: (1) Re-read the Mahila Samakhya sangha structure — note.', '(2) Trace the timeline: Dubagunta protest (1992) → state-wide spread (1992–93) → Congress announces prohibition (Oct.', '(3) Complete the diagnostic question 4 comparison with Chipko to see how external leadership differs.', '(4) Re-attempt diagnostic question 5 with the corrected timeline.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_006', difficulty: 'standard',
          question: 'The Narmada Bachao Andolan (NBA) is a non-party popular movement launched.',
          hint: 'Revisit c12_ps_cbse_13_001 (Nature of Popular Movements) to clarify NBA\'s non-party.',
          misconception: 'Students often think the NBA was "anti-dam" or "anti-development." In reality, the NBA\'s founding charter demanded.',
          parts: [
                { id: 'a', prompt: 'What is the primary constitutional article invoked by the Narmada Bachao Andolan to argue that displacement without rehabilitation violates fundamental rights?', answer: 'Article 21 (Right to Life and Personal Liberty)',
                  options: ['Article 21 (Right to Life and Personal Liberty)', 'anti-dam', 'anti-development', 'development without destruction'],
                  hint: 'Revisit c12_ps_cbse_13_001 (Nature of Popular Movements) to clarify NBA\'s non-party character, and.',
                  misconception: 'Students often think the NBA was "anti-dam" or "anti-development." In reality, the NBA\'s founding charter demanded "development without.' },
                { id: 'b', prompt: 'Compare the NBA\'s strategy of engaging with the World Bank (leading to the Morse Commission) with the Chipko Movement\'s strategy.', answer: 'Chipko (1970s) relied on local non-violent direct action and media symbolism',
                  options: ['Chipko (1970s) relied on local non-violent direct action and media symbolism', 'tree-hugging', 'anti-dam', 'anti-development'],
                  hint: 'Revisit c12_ps_cbse_13_001 (Nature of Popular Movements) to clarify NBA\'s non-party character, and.',
                  misconception: 'Students often think the NBA was "anti-dam" or "anti-development." In reality, the NBA\'s founding charter demanded "development without.' }
          ],
            remediations: { 'the-nba-was-anti-dam': { steps: ['If the student holds the "anti-development" misconception: (1) Have them read the NBA\'s 1991 "Declaration of the.', '(2) Ask them to list the alternative development models proposed (small dams, rainwater harvesting, lift irrigation).', '(3) Re-attempt Diagnostic Question 4 with this evidence.', 'If they still confuse NBA with Naxalite movements, revisit c11_ps_cbse_09_006 (Gandhi and non-violence) to contrast.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
