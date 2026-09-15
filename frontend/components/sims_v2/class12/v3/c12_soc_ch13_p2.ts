import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch13_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch13_p2: SimDef = {
    id: 'v3_c12_soc_ch13_p2',
    title: 'Globalisation and Social Change · Part 2/2',
    subtitle: 'The world in your pocket, the squeeze in the village',
    classLevel: 12, subject: 'sociology', topic: 'Globalisation and Social Change · Part 2/2',
    chapters: ['c12_soc_ch13'],
    nodeIds: ['c12_soc_cbse_13_007', 'c12_soc_cbse_13_008', 'c12_soc_cbse_13_009', 'c12_soc_cbse_13_010', 'c12_soc_cbse_13_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Globalisation analyst', intro: 'Five border-crossings before breakfast — the question is who arranged them, and who pays for them.', goal: 'Define globalisation\'s dimensions and drivers, and analyse its uneven impact and glocalisation in India.' },
    discovery: {
        question: 'Your morning: alarm on a Chinese phone, shirt stitched in Bangladesh, coffee from Brazil, a tutor in Bengaluru on a US-hosted app — all before 8 AM, while your farmer uncle watches imported oilseeds crash his prices. One process or many?',
        options: ['One process — globalisation stretching social and economic relationships worldwide, driven by the ICT revolution inside a neo-liberal policy frame, creating winners and losers in the same family', 'Just more Silk Route — trade is as old as history', 'Only economics — culture and politics aren\'t involved', 'Westernisation — the West remaking everyone else'],
        answer: 'One process — globalisation stretching social and economic relationships worldwide, driven by the ICT revolution inside a neo-liberal policy frame, creating winners and losers in the same family',
        hook: 'Globalisation isn\'t just Americanisation — Korean silk displaces Bihar spinners, Sudanese gum displaces Gujarat collectors. And McDonald\'s going vegetarian for Navaratri isn\'t fusion for culture\'s sake; it\'s a market strategy that keeps the global brand in charge.',
    },
    teaching: [
        { title: 'The Impact of Globalisation on Agriculture: Contract Farming and the Agrarian Crisis', text: 'Contract farming under globalisation is a production arrangement where agribusiness corporations or intermediaries contract farmers to produce specific crops under predetermined conditions (price.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect one ordinary day into globalisation\'s economic, political and cultural threads — then trace why it lifts a Noida BPO worker while ending a Varanasi weaver\'s orders.',
        labels: ['The Impact of Globalisation', 'Globalisation and the Labour', 'Cultural Globalisation: McDonaldisation, Homogenisation', 'Globalisation and Inequality', 'Resistance to Globalisation: Anti-Globalisation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_007', title: 'The Impact of Globalisation on Agriculture: Contract Farming and the Agrarian Crisis',
          caseStudy: { intro: 'Imagine a farmer in Punjab who once grew wheat and paddy under assured MSP procurement.',
            decisions: [{ prompt: 'Define contract farming and distinguish it from tenant farming and cooperative farming in terms of who bears production risk and who.', options: [
                { text: 'Contract farming: a buyer (corporation/processor) contracts a farmer to produce a', outcome: 'Contract farming: a buyer (corporation/processor) contracts a farmer to produce a specific crop.' },
                { text: 'contract farming reduces farmer risk', outcome: 'Not quite — Students equate "contract farming" with "corporate farming" and assume the crisis is only about.', reveals: 'students-equate-contract-farming-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_011', title: 'Resistance to Globalisation: Anti-Globalisation Movements and the Critique of Neo-Liberalism',
          caseStudy: { intro: 'Imagine a farmer in Vidarbha protesting against WTO-mandated import of cheap cotton while a software engineer in Bengaluru celebrates global outsourcing jobs.',
            decisions: [{ prompt: 'Define "neo-liberalism" in the context of globalisation and name two international institutions that enforce neo-liberal policies.', options: [
                { text: 'Neo-liberalism is a political-economic ideology advocating free-market capitalism,', outcome: 'Neo-liberalism is a political-economic ideology advocating free-market capitalism, deregulation.' },
                { text: 'neo-liberalism means new liberal parties', outcome: 'Not quite — Students equate "resistance to globalisation" with "opposition to all modern technology, trade,.', reveals: 'students-equate-resistance-to-globalisation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An essay claims \'globalisation is just the latest word for something eternal — Silk Road, empire, internet, all the same process.\'',
            decisions: [{ prompt: 'What does the phased history of globalisation say to that?', options: [
                { text: 'The phases differ in kind, not just degree — pre-colonial trade was voluntary exchange, colonial integration was coerced subordination built for extraction, post-war was state-gated import-substitution, and post-1991 is ICT-speed financial interconnection; calling them one process flattens who connected, on whose terms.', outcome: 'The chapter\'s timeline: each phase built different structures — the same word covers connection by caravan, conquest, container and fibre, and those are not the same phenomenon.' },
                { text: 'The essay is right — connection is connection, whatever the century.', outcome: 'Connection erases the coercion — colonial integration moved indentured labour and raw material under force for another economy\'s profit; equating that with Silk Road exchange confuses linkage with subordination.', reveals: 'all-connection-is-equal' },
                { text: 'The real break is only the internet — everything before 1991 was one phase.', outcome: 'That merges the colonial and post-war phases, which ran opposite designs — one forced open India\'s markets for extraction, the other gated them for self-development; ICT speed isn\'t the only axis that changed.', reveals: 'only-the-internet-mattered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_011', title: 'You made it',
          caseStudy: { intro: 'You can now hold both truths at once — new opportunity and lost livelihood — which is exactly what \'uneven impact\' means.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_007', difficulty: 'standard',
          question: 'Contract farming under globalisation is a production arrangement where.',
          hint: 'If stuck on WTO AoA pillars → re-read c12_soc_cbse_13_005 section on "WTO and.',
          misconception: 'Students equate "contract farming" with "corporate farming" and assume the crisis is only about *corporate entry*.',
          parts: [
                { id: 'a', prompt: 'Compare the "cost-price squeeze" in Indian agriculture pre-1991 (Green Revolution era) and post-1991 (liberalisation era).', answer: 'Pre-1991: Squeeze driven by state procurement prices lagging input costs',
                  options: ['Pre-1991: Squeeze driven by state procurement prices lagging input costs', 'both eras had cost-price squeeze so nothing new'],
                  hint: 'If stuck on WTO AoA pillars → re-read c12_soc_cbse_13_005 section on "WTO and Agriculture".',
                  misconception: 'Students equate "contract farming" with "corporate farming" and assume the crisis is only about *corporate entry*.' }
          ],
            remediations: { 'students-equate-contract-farming-with': { steps: ['Revisit c11_soc_cbse_07_008 (Rural Society: Agrarian Relations) — re-learn the *class structure* of Indian countryside.', 'Re-read c12_soc_cbse_13_003 (LPG Policies) — specifically the *sequence*: devaluation → import liberalisation → subsidy.', 'Do a focused re-diagnostic: "Explain why a 2-hectare cotton farmer in Vidarbha *cannot* simply \'opt out\' of Bt cotton.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_008', difficulty: 'standard',
          question: 'Globalisation and the Labour Market: Flexibility, Informalisation and Job.',
          hint: 'If unclear on formal/informal distinction, revisit c11_soc_cbse_03_007 (Work and Economic.',
          misconception: 'Students often think \'informalisation\' means only \'unregistered small businesses\' and miss that *large global firms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Globalisation and the Labour Market: Flexibility, Informalisation and Job Insecurity',
                  options: ['Globalisation and the Labour Market: Flexibility, Informalisation and Job Insecurity', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'If unclear on formal/informal distinction, revisit c11_soc_cbse_03_007 (Work and Economic.',
                  misconception: 'Students often think \'informalisation\' means only \'unregistered small businesses\' and miss that *large global firms actively create.' }
          ],
            remediations: { 'informalisation-means-only-unregistered-small': { steps: ['If the student conflates informalisation with \'traditional unorganised sector\', do this: 1) Re-read the Nike and.', '2) Ask: "Who decides to use contract labour?', 'The supplier or the buyer?" 3) Watch a 10-min documentary on \'garment global value chains\' (e.g., \'The True Cost\'.', '4) Re-attempt Diagnostic Q3, explicitly naming the *global buyer\'s* role in forcing flexibilisation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_009', difficulty: 'standard',
          question: 'Cultural globalisation refers to the worldwide flow of cultural symbols.',
          hint: 'Revisit c11_soc_cbse_04_001 (culture definitions) and c12_soc_cbse_13_001 (globalisation.',
          misconception: 'Students often conflate glocalisation with hybridity, assuming any mixing of global and local is glocalisation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cultural globalisation refers to the worldwide flow of cultural symbols, practices, and',
                  options: ['Cultural globalisation refers to the worldwide flow of cultural symbols, practices, and', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'Revisit c11_soc_cbse_04_001 (culture definitions) and c12_soc_cbse_13_001 (globalisation.',
                  misconception: 'Students often conflate glocalisation with hybridity, assuming any mixing of global and local is glocalisation.' }
          ],
            remediations: { 'students-often-conflate-glocalisation-with': { steps: ['If a student cannot distinguish glocalisation from hybridity, do this 3-step remediation: (1) Re-read NCERT Box 6.6.', '(3) Ask: "Who decides the terms of mixing in Column A?', 'Who profits?" The answer — corporations — reveals the structural difference.', 'Then re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_010', difficulty: 'standard',
          question: 'The digital divide refers to the unequal access to, use of, and impact.',
          hint: 'Revisit c11_soc_cbse_02_003 (Social Stratification) and c11_soc_cbse_06_003 (Three Forms.',
          misconception: 'Students often think the digital divide is only about owning a smartphone or having an internet connection.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The digital divide refers to the unequal access to, use of, and impact of information and',
                  options: ['The digital divide refers to the unequal access to, use of, and impact of information and', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'Revisit c11_soc_cbse_02_003 (Social Stratification) and c11_soc_cbse_06_003 (Three Forms of Social.',
                  misconception: 'Students often think the digital divide is only about owning a smartphone or having an internet connection.' }
          ],
            remediations: { 'the-digital-divide-is-only': { steps: ['If the student conflates digital divide with mere device ownership, do this 3-step remediation: (1) Re-read Box 6.2.', '(2) Revisit c11_soc_cbse_06_003 (Three Forms of Social Advantage: Life Chances, Status and Power) and map digital.', '(3) Re-diagnostic: Ask the student to explain why a villager with a smartphone but no electricity, low literacy, and.', 'If they cannot articulate the capability/outcome gap, repeat step 2 with the dombari example (Box 6.6).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_011', difficulty: 'standard',
          question: 'Resistance to globalisation refers to organised social movements, protests, and.',
          hint: 'Revisit c12_soc_cbse_13_007 (agriculture) and c12_soc_cbse_13_008 (labour) — list three.',
          misconception: 'Students equate "resistance to globalisation" with "opposition to all modern technology, trade, or cultural exchange".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Resistance to globalisation refers to organised social movements, protests, and',
                  options: ['Resistance to globalisation refers to organised social movements, protests, and', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'Revisit c12_soc_cbse_13_007 (agriculture) and c12_soc_cbse_13_008 (labour) — list three concrete.',
                  misconception: 'Students equate "resistance to globalisation" with "opposition to all modern technology, trade, or cultural exchange" — imagining.' }
          ],
            remediations: { 'students-equate-resistance-to-globalisation': { steps: ['Re-read NCERT p.74-75 ("effect of globalisation is far reaching...', 'Watch 15-min documentary "The Take" (Argentina factory occupations) or "Seattle: The Battle for Global Justice".', 'Create a 3-column table: Movement | Grievance (neo-liberal policy) | Alternative Proposed.', 'Re-attempt Diagnostic Q5 — if still stuck, revisit c11_soc_cbse_09_003 (Marx\'s base-superstructure) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
