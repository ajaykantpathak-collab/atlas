import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch04_p2: SimDef = {
    id: 'v3_c12_soc_ch04_p2',
    title: 'The Market as a Social Institution · Part 2/2',
    subtitle: 'The invisible hand has a caste, a clan and a postcode',
    classLevel: 12, subject: 'sociology', topic: 'The Market as a Social Institution · Part 2/2',
    chapters: ['c12_soc_ch04'],
    nodeIds: ['c12_soc_cbse_04_007', 'c12_soc_cbse_04_008', 'c12_soc_cbse_04_009', 'c12_soc_cbse_04_010', 'c12_soc_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Economic sociologist', intro: 'Every price tag is the end of a chain of trust — find out who the chain trusts, and you\'ve found the real market.', goal: 'Explain embeddedness and commodification and analyse how social relations structure Indian markets.' },
    discovery: {
        question: 'At a Bastar weekly haat, the same patch of ground hosts forest produce sales, wage payments, marriage negotiations and kin reunions — all at once. Is this an economy, or a society wearing an economy\'s clothes?',
        options: ['Both at once — the haat\'s exchange rules, credit and trader dominance run on caste, kinship and colonial history; no \'invisible hand\' built this', 'Just an economy — buying and selling is all that matters', 'A society pretending to trade — the goods are incidental', 'A pre-market ritual that economics hasn\'t reached yet'],
        answer: 'Both at once — the haat\'s exchange rules, credit and trader dominance run on caste, kinship and colonial history; no \'invisible hand\' built this',
        hook: 'Don\'t read \'market as social institution\' as \'people socialise while shopping\' — the claim is stronger: caste networks like the Nakarattar bankers ran credit on community reputation alone, so markets are constituted by social relations, not merely surrounded by them.',
    },
    teaching: [
        { title: 'The Market for Labour: Bonded Labour, Attached Labour and the Informal Labour Market', text: 'The market for labour refers to the social institution through which human labour power is exchanged for wages or other compensation, shaped by historical, cultural, and structural forces such.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_04_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Read a market like a sociologist — find the caste ties, kin networks and power asymmetries holding the transactions up, then catch commodification turning hospitality into a rated service.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_008', title: 'Tribal Communities and the Market: Exploitation, Middlemen and the Forest Economy',
          caseStudy: { intro: 'Imagine you visit a weekly market in a forested region of Chhattisgarh on a Friday.',
            decisions: [{ prompt: 'In the Dhorai weekly market described in the NCERT text, who are the primary buyers of forest produce and who are the primary sellers?', options: [
                { text: 'Primary sellers: Adivasis (Gonds) who bring forest produce (tamarind, oil-seeds),', outcome: 'Primary sellers: Adivasis (Gonds) who bring forest produce (tamarind, oil-seeds), agricultural.' },
                { text: 'adivasis buy forest produce', outcome: 'Not quite — Students often think tribal exploitation in markets is simply "cheating" or "unfair pricing".', reveals: 'tribal-exploitation-in-markets-is' },
                { text: 'traders sell forest produce', outcome: 'Not quite — Students often think tribal exploitation in markets is simply "cheating" or "unfair pricing".', reveals: 'tribal-exploitation-in-markets-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_009', title: 'Colonialism and the Transformation of Markets: Commercialisation of Agriculture',
          caseStudy: { intro: 'Imagine your great-grandparents were farmers in 1850s Bengal — they grew rice, millets, and vegetables to feed their family and village.',
            decisions: [{ prompt: 'What is the fundamental difference between pre-colonial agricultural trade and colonial commercialisation of agriculture in terms.', options: [
                { text: 'Pre-colonial trade involved voluntary surplus exchange where peasants retained crop choice', outcome: 'Pre-colonial trade involved voluntary surplus exchange where peasants retained crop choice.' },
                { text: 'both involved cash crops', outcome: 'Not quite — Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton.', reveals: 'students-routinely-write-commercialisation-meant' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_010', title: 'Globalisation and the Market: Liberalisation, Privatisation and the New Market Economy',
          caseStudy: { intro: 'Imagine you order a smartphone online: it is designed in California, assembled in China with chips from Taiwan, shipped via a logistics network controlled by.',
            decisions: [{ prompt: 'Define "liberalisation" in the context of the Indian economy post-1991, listing any three specific policy measures it entailed.', options: [
                { text: 'Liberalisation is the process of reducing government controls over the economy to allow', outcome: 'Liberalisation is the process of reducing government controls over the economy to allow greater.' },
                { text: 'opening up the economy', outcome: 'Not quite — Students often equate globalisation solely with "Westernisation" or "Americanisation," assuming.', reveals: 'students-often-equate-globalisation-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup proposes \'digitising\' a tribal weekly haat — replace it with a delivery app \'because a market is just buyers, sellers and price discovery; the rest is noise.\'',
            decisions: [{ prompt: 'What would embeddedness analysis warn them they\'re deleting?', options: [
                { text: 'The social structure that makes the market work — the haat is constituted by caste, kinship, ritual and state wage flows: who trades with whom, who extends credit, what gets trusted; strip those relations and you don\'t streamline the market, you dissolve the institution that was running it.', outcome: 'The chapter\'s Polanyi point: markets aren\'t price-machines with social decoration — the relations ARE the mechanism; \'the rest is noise\' deletes the load-bearing parts.' },
                { text: 'Nothing — the app replicates transactions, which is all a market is.', outcome: 'That assumes the economic view the chapter disputes — trust, credit and access in the haat run on caste and kin networks; an app can\'t transact what only those relations make possible.', reveals: 'market-is-just-prices' },
                { text: 'Only the gossip and festivals — the trade part transfers cleanly.', outcome: 'The \'extras\' are the infrastructure — kinship decides creditworthiness, ritual timing brings the crowd, caste position sets the terms; separating \'trade\' from \'social\' is the analytical error, not a clean cut.', reveals: 'social-part-is-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'You can now explain why liberalisation raised efficiency yet left the power map intact — markets don\'t escape society; they\'re built out of it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_007', difficulty: 'standard',
          question: 'The market for labour refers to the social institution through which human.',
          hint: 'If stuck, revisit the NCERT section "Commoditisation and Consumption" (Activity 4.2) and.',
          misconception: '**Misconception:** "Bonded labour is a thing of the past — it was abolished in 1976.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The market for labour refers to the social institution through',
                  options: ['The market for labour refers to the social institution through', 'A market as a social institution is a culturally specific, socially embedded arena of', 'Embeddedness is the sociological concept (central to Karl Polanyi) that economic', 'A weekly market (haat) is a periodic market held on a fixed day in rural and tribal areas'],
                  hint: 'If stuck, revisit the NCERT section "Commoditisation and Consumption" (Activity 4.2) and the weekly.',
                  misconception: '**Misconception:** "Bonded labour is a thing of the past — it was abolished in 1976.' }
          ],
            remediations: { 'misconception-bonded-labour-is-a': { steps: ['If the student holds this misconception: 1.', '**Revisit c12_soc_cbse_04_003 (weekly tribal haat)** — identify how tribal labourers were recruited for.', '**Read the NCERT box on commodification (Activity 4.2)** — apply "bottled water" logic to labour: just as water became.', '**Do a mini-case study**: Interview a migrant construction worker or delivery person — ask: "Did you take an advance?'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_008', difficulty: 'standard',
          question: 'Tribal communities\' engagement with markets refers to the historically.',
          hint: 'Revisit the Polanyi concept of \'embeddedness\' in c12_soc_cbse_04_001 and the Dhorai haat.',
          misconception: 'Students often think tribal exploitation in markets is simply "cheating" or "unfair pricing" by individual traders.',
          parts: [
                { id: 'a', prompt: 'A Gond family collects 50 kg of tamarind over a season. The village trader offers ₹15/kg. The same tamarind sells in the district town for ₹45/kg.', answer: 'Trader\'s buying price: ₹15/kg',
                  options: ['Trader\'s buying price: ₹15/kg', 'cheating', 'unfair pricing'],
                  hint: 'Revisit the Polanyi concept of \'embeddedness\' in c12_soc_cbse_04_001 and the Dhorai haat.',
                  misconception: 'Students often think tribal exploitation in markets is simply "cheating" or "unfair pricing" by individual traders.' }
          ],
            remediations: { 'tribal-exploitation-in-markets-is': { steps: ['If the student holds the "cheating/illiteracy" misconception: Step 1 — Re-read the Dhorai haat description (Box 4.1).', 'Step 2 — For each actor, identify their source of power (legal, economic, social).', 'Step 3 — Trace the chain: Forest Act → restricted access → need for cash → advance from trader → obligation to sell.', 'Step 4 — Re-attempt Diagnostic Question 4 and 5.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think tribal exploitation in markets is simply "cheating" or "unfair pricing" by individual traders.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement using the concept of \'social embeddedness of markets\': "Tribal exploitation in markets would end if adivasis were given better.', answer: 'The statement assumes markets are purely informational/efficiency problems',
                  options: ['The statement assumes markets are purely informational/efficiency problems', 'technology helps', 'cheating', 'unfair pricing'],
                  hint: 'Revisit the Polanyi concept of \'embeddedness\' in c12_soc_cbse_04_001 and the Dhorai haat.',
                  misconception: 'Students often think tribal exploitation in markets is simply "cheating" or "unfair pricing" by individual traders.' }
          ],
            remediations: { 'tribal-exploitation-in-markets-is': { steps: ['If the student holds the "cheating/illiteracy" misconception: Step 1 — Re-read the Dhorai haat description (Box 4.1).', 'Step 2 — For each actor, identify their source of power (legal, economic, social).', 'Step 3 — Trace the chain: Forest Act → restricted access → need for cash → advance from trader → obligation to sell.', 'Step 4 — Re-attempt Diagnostic Question 4 and 5.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_009', difficulty: 'standard',
          question: 'Commercialisation of agriculture refers to the historical process during.',
          hint: 'Revisit c12_soc_cbse_04_002 (Polanyi) and c12_soc_cbse_04_004 (jajmani) — if you can\'t.',
          misconception: 'Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton and indigo for the.',
          parts: [
                { id: 'a', prompt: 'A ryot in Ryotwari Madras Presidency (1820s) owns 5 hectares. The revenue demand is 50% of estimated produce value.', answer: 'Step 1: Original revenue = 50% of millet value',
                  options: ['Step 1: Original revenue = 50% of millet value', 'ratchet effect'],
                  hint: 'Revisit c12_soc_cbse_04_002 (Polanyi) and c12_soc_cbse_04_004 (jajmani) — if you can\'t explain why.',
                  misconception: 'Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton and indigo for the market." This.' }
          ],
            remediations: { 'students-routinely-write-commercialisation-meant': { steps: ['If a student gives the "voluntary market response" answer: Step 1 — Ask: "Why did a rice-growing peasant in 1830s.', 'Did he wake up one day and decide indigo was more profitable?" Step 2 — Show the *dadon* (advance) contract.', 'Step 3 — Contrast with pre-colonial *optional* surplus trade (e.g., Gujarati merchants buying cotton for export.', 'Step 4 — Re-do Diagnostic Question 2 with emphasis on *revenue fixity → rent layers → crop coercion* chain.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_010', difficulty: 'standard',
          question: 'Globalisation refers to the increasing interconnection and integration.',
          hint: 'Revisit the Dhorai haat case study (Box 4.1) and Nakarattar caste-based banking (Box 4.2).',
          misconception: 'Students often equate globalisation solely with "Westernisation" or "Americanisation," assuming it is a one-way.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Globalisation refers to the increasing interconnection and integration of local,',
                  options: ['Globalisation refers to the increasing interconnection and integration of local,', 'A market as a social institution is a culturally specific, socially embedded arena of', 'Embeddedness is the sociological concept (central to Karl Polanyi) that economic', 'A weekly market (haat) is a periodic market held on a fixed day in rural and tribal areas'],
                  hint: 'Revisit the Dhorai haat case study (Box 4.1) and Nakarattar caste-based banking (Box 4.2).',
                  misconception: 'Students often equate globalisation solely with "Westernisation" or "Americanisation," assuming it is a one-way cultural imposition.' }
          ],
            remediations: { 'students-often-equate-globalisation-solely': { steps: ['If the student holds this misconception, do the following: (1) Re-read Box 4.3 (Pushkar fair) and the paragraph.', '(2) Create a two-column table: Column A = "Local practice before global market integration", Column B = "New global.', 'Fill it for Pushkar fair, yoga, and one more example (e.g., khadi, Bollywood).', '(3) Answer: "Does the local practice disappear, or does it acquire a new market value while retaining local.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_011', difficulty: 'standard',
          question: 'The market and social stratification refer to the systematic ways in which.',
          hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the three forms of social.',
          misconception: 'Students often think \'caste affects only traditional/rural markets (like jajmani) and disappears in modern/formal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The market and social stratification refer to the systematic ways in',
                  options: ['The market and social stratification refer to the systematic ways in', 'A market as a social institution is a culturally specific, socially embedded arena of', 'Embeddedness is the sociological concept (central to Karl Polanyi) that economic', 'A weekly market (haat) is a periodic market held on a fixed day in rural and tribal areas'],
                  hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the three forms of social advantage.',
                  misconception: 'Students often think \'caste affects only traditional/rural markets (like jajmani) and disappears in modern/formal sectors (corporate jobs.' }
          ],
            remediations: { 'caste-affects-only-traditional-rural': { steps: ['If a student holds this misconception: (1) Assign re-reading of NCERT Box 4.2 (Nakarattars) and the Marwari case (pp.', '59-60) — highlight phrases \'caste-based banking system\' and \'social networks created relations of trust\'.', '(2) Give a 15-min task: Find 3 job postings on LinkedIn for \'business development\' or \'operations\' in Indian startups.', '(3) Re-diagnose with Diagnostic Question 2 — require explicit use of \'social capital\' and \'commodification\' in the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
