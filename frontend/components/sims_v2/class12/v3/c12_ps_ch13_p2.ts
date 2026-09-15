import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch13_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch13_p2: SimDef = {
    id: 'v3_c12_ps_ch13_p2',
    title: 'Rise of Popular Movements · Part 2/2',
    subtitle: 'Politics without a party flag',
    classLevel: 12, subject: 'political_science', topic: 'Rise of Popular Movements · Part 2/2',
    chapters: ['c12_ps_ch13'],
    nodeIds: ['c12_ps_cbse_13_007', 'c12_ps_cbse_13_008', 'c12_ps_cbse_13_009', 'c12_ps_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social movement analyst', intro: 'When parties stop listening, citizens don\'t stop organising — they just organise differently.', goal: 'Distinguish party-based from non-party movements by leadership, funding and accountability, and explain their democratic role.' },
    discovery: {
        question: 'The Narmada Bachao Andolan argued cases in the Supreme Court, lobbied the World Bank and faced down state governments for decades — yet refused to join or float a political party. Apolitical?',
        options: ['Deeply political — it contested power and policy through courts, media and mobilisation, just refused party affiliation to keep the freedom to pressure every party', 'Apolitical — real politics only happens inside parties', 'Anti-political — it rejected the state entirely', 'It would have joined a party if offered enough seats'],
        answer: 'Deeply political — it contested power and policy through courts, media and mobilisation, just refused party affiliation to keep the freedom to pressure every party',
        hook: 'Non-party doesn\'t mean non-political — these movements rose because the party system ignored tribals, farmers, women and forests, and staying outside parties is precisely what lets them confront all parties.',
    },
    teaching: [
        { title: 'Women\'s Movements in India: Issues, Strategies and Achievements', text: 'Women\'s movements in India refer to organized collective actions by women and their allies to challenge gender-based inequalities, secure legal and constitutional rights, and transform patriarchal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort India\'s great movements — JP\'s party-backed crusade versus Chipko and NBA\'s party-free persistence — by who leads them, who funds them and who they answer to.',
        labels: ['Women\'s Movements in India', 'Environmental Movements and', 'The Relationship between Popular', 'Limits and Achievements'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_007', title: 'Women\'s Movements in India: Issues, Strategies and Achievements',
          caseStudy: { intro: 'Imagine you read a news report about women in a Tamil Nadu village organizing against a liquor shop because domestic violence spikes when men drink — this.',
            decisions: [{ prompt: 'What is the constitutional basis for the 33% reservation for women in Panchayati Raj institutions, and which amendment introduced it?', options: [
                { text: 'The 73rd Constitutional Amendment Act, 1992 (Article 243D) mandates reservation of not', outcome: 'The 73rd Constitutional Amendment Act, 1992 (Article 243D) mandates reservation of not less than.' },
                { text: 'women\'s movement', outcome: 'Not quite — Students often think "women\'s movement" means a single unified organization with one leader and one.', reveals: 'women-s-movement-means-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_009', title: 'The Relationship between Popular Movements and Political Parties',
          caseStudy: { intro: 'Imagine you see a news report about farmers protesting at Delhi\'s borders for months, while political parties issue statements supporting or opposing them.',
            decisions: [{ prompt: 'What is the key distinction between a \'party-based movement\' and a \'non-party political movement\' as described in the NCERT textbook?', options: [
                { text: 'A party-based movement is directly organized, led, or controlled by a political party', outcome: 'A party-based movement is directly organized, led, or controlled by a political party (e.g.' },
                { text: 'non-party movement', outcome: 'Not quite — Students often think "non-party movement" means the movement is apolitical or avoids all contact.', reveals: 'non-party-movement-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_010', title: 'Limits and Achievements of Popular Movements in India',
          caseStudy: { intro: 'Imagine you see a news report about a current protest by farmers demanding legal guarantee for MSP.',
            decisions: [{ prompt: 'Name any two popular movements studied in this chapter that forced a change in government policy or law, and state the specific policy.', options: [
                { text: 'Correct answer: (1) Chipko Movement (1973) led to a 15-year ban on commercial felling in', outcome: 'Correct answer: (1) Chipko Movement (1973) led to a 15-year ban on commercial felling in Himalayan.' },
                { text: 'Dalit Panthers passed the SC/ST Act', outcome: 'Not quite — Students often think "popular movements failed because they didn\'t become political parties." The.', reveals: 'popular-movements-failed-because-they' },
                { text: 'popular movements failed', outcome: 'Not quite — Students often think "popular movements failed because they didn\'t become political parties." The.', reveals: 'popular-movements-failed-because-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A school exhibit labels Chipko \'anti-development villagers who wanted zero tree-cutting anywhere\' — a caption a visiting forest officer disputes.',
            decisions: [{ prompt: 'What did the movement actually oppose?', options: [
                { text: 'The displacement of subsistence by market — villagers opposed commercial felling that replaced mixed forests giving fuel, fodder and food with pine monocultures for resin; local cutting for genuine need stayed accepted — it was livelihood justice, not a ban on axes.', outcome: 'The chapter\'s political economy: \'anti-logging\' flattens a fight over whose needs the forest serves — community subsistence versus state-licensed commerce.' },
                { text: 'The exhibit is right — hugging trees is absolute protection, no cutting at all.', outcome: 'Chipko itself approved cutting for village needs — its target was commercial extraction that stripped the \'four Fs\' locals lived on; absolutism misreads a livelihood claim as a preservation cult.', reveals: 'chipko-meant-zero-cutting' },
                { text: 'It was mainly a women\'s cultural ritual — symbolic, not economic.', outcome: 'Women led because they collected the biomass the logging destroyed — the gendered participation expressed a material stake, not ceremony; calling it ritual erases the subsistence economics underneath.', reveals: 'symbolic-not-economic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_13_010', title: 'You made it',
          caseStudy: { intro: 'You can now tell a party\'s protest from a people\'s movement — and argue why the second kind is a correction to democracy, not a threat to it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_007', difficulty: 'standard',
          question: 'Women\'s movements in India refer to organized collective actions by women and.',
          hint: 'Revisit c11_ps_cbse_03_005 (Formal vs substantive equality) and c11_ps_cbse_11_004.',
          misconception: 'Students often think "women\'s movement" means a single unified organization with one leader and one demand.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Women\'s movements in India refer to organized collective actions by women and their',
                  options: ['Women\'s movements in India refer to organized collective actions by women and their', 'Popular movements are collective actions by citizens to address public issues, demand', 'The Chipko Movement (1973–1981) was a non-violent, grassroots environmental movement in', 'The Dalit Panthers was a radical Dalit youth organization founded in April 1972 in'],
                  hint: 'Revisit c11_ps_cbse_03_005 (Formal vs substantive equality) and c11_ps_cbse_11_004 (Article 15).',
                  misconception: 'Students often think "women\'s movement" means a single unified organization with one leader and one demand.' }
          ],
            remediations: { 'women-s-movement-means-a': { steps: ['If the student conflates the movement into a monolith: (1) Revisit c12_ps_cbse_13_001 (Nature of Popular Movements).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_008', difficulty: 'standard',
          question: 'Environmental Movements and the Politics of Development refers to the contested.',
          hint: 'If stuck: Re-read c12_ps_cbse_13_002 (Chipko\'s "ecology is permanent economy") and.',
          misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Environmental Movements and the Politics of Development refers to the contested terrain',
                  options: ['Environmental Movements and the Politics of Development refers to the contested terrain', 'Popular movements are collective actions by citizens to address public issues, demand', 'The Chipko Movement (1973–1981) was a non-violent, grassroots environmental movement in', 'The Dalit Panthers was a radical Dalit youth organization founded in April 1972 in'],
                  hint: 'If stuck: Re-read c12_ps_cbse_13_002 (Chipko\'s "ecology is permanent economy") and.',
                  misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and electricity for the.' }
          ],
            remediations: { 'misconception-environmental-movements-are-anti': { steps: ['If student holds the "anti-development" misconception: 1.', '**Revisit c12_ps_cbse_13_006 (NBA node):** Study the *specific demands* of NBA — they never said "stop all dams"; they.', '**Read the *Narmada Tribunal Award (1979)* clauses on rehabilitation** — compare with ground reality (Shah Commission.', '**Analyze *Vellore Citizens Welfare Forum* judgment:** Court said "sustainable development" = *balance* of ecology and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Forest Rights Act 2006 resolved the historical injustice against forest-dwelling communities." Use *three* specific implementation.', answer: '**Claim is false',
                  options: ['**Claim is false', 'success', 'policy = outcome'],
                  hint: 'If stuck: Re-read c12_ps_cbse_13_002 (Chipko\'s "ecology is permanent economy") and.',
                  misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and electricity for the.' }
          ],
            remediations: { 'misconception-environmental-movements-are-anti': { steps: ['If student holds the "anti-development" misconception: 1.', '**Revisit c12_ps_cbse_13_006 (NBA node):** Study the *specific demands* of NBA — they never said "stop all dams"; they.', '**Read the *Narmada Tribunal Award (1979)* clauses on rehabilitation** — compare with ground reality (Shah Commission.', '**Analyze *Vellore Citizens Welfare Forum* judgment:** Court said "sustainable development" = *balance* of ecology and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_009', difficulty: 'standard',
          question: 'The relationship between popular movements and political parties refers to the.',
          hint: 'Revisit c12_ps_cbse_13_001 for the typology and c10_civ_cbse_04_001 for party functions.',
          misconception: 'Students often think "non-party movement" means the movement is apolitical or avoids all contact with politicians.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The relationship between popular movements and political parties refers to the dynamic',
                  options: ['The relationship between popular movements and political parties refers to the dynamic', 'Popular movements are collective actions by citizens to address public issues, demand', 'The Chipko Movement (1973–1981) was a non-violent, grassroots environmental movement in', 'The Dalit Panthers was a radical Dalit youth organization founded in April 1972 in'],
                  hint: 'Revisit c12_ps_cbse_13_001 for the typology and c10_civ_cbse_04_001 for party functions; then map.',
                  misconception: 'Students often think "non-party movement" means the movement is apolitical or avoids all contact with politicians.' }
          ],
            remediations: { 'non-party-movement-means-the': { steps: ['If the student conflates non-party with apolitical, have them re-read c12_ps_cbse_13_001 (Nature of Popular Movements).', 'Then ask: "List three political actions NBA took (dharnas, court cases, meeting ministers) and explain why N/A required.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_010', difficulty: 'standard',
          question: 'Limits and Achievements of Popular Movements in India refers to the critical.',
          hint: 'If stuck, review node c12_ps_cbse_13_001 (Nature of Popular Movements) to recall the.',
          misconception: 'Students often think "popular movements failed because they didn\'t become political parties." The precise error: They.',
          parts: [
                { id: 'a', prompt: 'A new environmental movement emerges in a tribal district opposing a mining project. The movement uses Chipko-style tree-hugging and NBA-style legal petitions.', answer: 'Correct answer: The movement faces three typical limits: (1) Asymmetry of power',
                  options: ['Correct answer: The movement faces three typical limits: (1) Asymmetry of power', 'lack of unity', 'popular movements failed', '"popular movements failed'],
                  hint: 'If stuck, review node c12_ps_cbse_13_001 (Nature of Popular Movements) to recall the party-based.',
                  misconception: 'Students often think "popular movements failed because they didn\'t become political parties." The precise error: They conflate *electoral.' },
                { id: 'b', prompt: 'Compare the achievements of the Dalit Panthers (1970s) and the Anti-Arrack Movement (1990s). Which movement had a more durable institutional impact, and why?', answer: 'Correct answer: The Anti-Arrack Movement had more durable institutional impact',
                  options: ['Correct answer: The Anti-Arrack Movement had more durable institutional impact', 'failed', 'popular movements failed', '"popular movements failed'],
                  hint: 'If stuck, review node c12_ps_cbse_13_001 (Nature of Popular Movements) to recall the party-based.',
                  misconception: 'Students often think "popular movements failed because they didn\'t become political parties." The precise error: They conflate *electoral.' }
          ],
            remediations: { 'popular-movements-failed-because-they': { steps: ['If the student holds this misconception: (1) Revisit node c12_ps_cbse_13_002 (Chipko) — note the 1980 felling ban and.', '(2) Revisit node c12_ps_cbse_13_003 (Dalit Panthers) — trace how their literary/cultural legacy influenced later.', '(3) Complete a comparative table: Movement | Policy/Legal Change | Electoral Outcome | Long-term Discourse Shift.', 'This makes visible the non-electoral achievements.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
