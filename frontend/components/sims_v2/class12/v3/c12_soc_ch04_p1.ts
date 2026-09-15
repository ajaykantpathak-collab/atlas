import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch04_p1: SimDef = {
    id: 'v3_c12_soc_ch04_p1',
    title: 'The Market as a Social Institution · Part 1/2',
    subtitle: 'The invisible hand has a caste, a clan and a postcode',
    classLevel: 12, subject: 'sociology', topic: 'The Market as a Social Institution · Part 1/2',
    chapters: ['c12_soc_ch04'],
    nodeIds: ['c12_soc_cbse_04_001', 'c12_soc_cbse_04_002', 'c12_soc_cbse_04_003', 'c12_soc_cbse_04_004', 'c12_soc_cbse_04_005', 'c12_soc_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Economic sociologist', intro: 'Every price tag is the end of a chain of trust — find out who the chain trusts, and you\'ve found the real market.', goal: 'Explain embeddedness and commodification and analyse how social relations structure Indian markets.' },
    discovery: {
        question: 'At a Bastar weekly haat, the same patch of ground hosts forest produce sales, wage payments, marriage negotiations and kin reunions — all at once. Is this an economy, or a society wearing an economy\'s clothes?',
        options: ['Both at once — the haat\'s exchange rules, credit and trader dominance run on caste, kinship and colonial history; no \'invisible hand\' built this', 'Just an economy — buying and selling is all that matters', 'A society pretending to trade — the goods are incidental', 'A pre-market ritual that economics hasn\'t reached yet'],
        answer: 'Both at once — the haat\'s exchange rules, credit and trader dominance run on caste, kinship and colonial history; no \'invisible hand\' built this',
        hook: 'Don\'t read \'market as social institution\' as \'people socialise while shopping\' — the claim is stronger: caste networks like the Nakarattar bankers ran credit on community reputation alone, so markets are constituted by social relations, not merely surrounded by them.',
    },
    teaching: [
        { title: 'The Market as a Social Institution: Beyond the Economic Definition', text: 'A market as a social institution is a culturally specific, socially embedded arena of exchange where economic transactions are shaped by and simultaneously shape social relations, norms, power.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_04_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Read a market like a sociologist — find the caste ties, kin networks and power asymmetries holding the transactions up, then catch commodification turning hospitality into a rated service.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_003', title: 'The Weekly Market (Haat) and the Periodic Market System in Rural India',
          caseStudy: { intro: 'Imagine you visit a Friday market in a forested village in Chhattisgarh: trucks jam the road, Gond adivasis sell tamarind and bamboo baskets to Hindu traders.',
            decisions: [{ prompt: 'Define a \'weekly haat\' and state two features that distinguish it from a daily urban retail market.', options: [
                { text: 'A weekly haat is a periodic market held on a fixed day in rural/tribal areas where people', outcome: 'A weekly haat is a periodic market held on a fixed day in rural/tribal areas where people from.' },
                { text: '\'periodic market\' means \'traditional and unchanging\'', outcome: 'Not quite — Students think \'periodic market\' means \'traditional and unchanging\'.', reveals: 'periodic-market-means-traditional-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_004', title: 'Caste and the Market: Jajmani System, Balutedar and the Traditional Division of Labour',
          caseStudy: { intro: 'Imagine a village in 18th-century Uttar Pradesh where a Brahmin landowner needs his plough repaired, his grain ground, and his rituals performed — but no money.',
            decisions: [{ prompt: 'Define the Jajmani system in one sentence, specifying the nature of the exchange (what is exchanged, between whom, and on what basis).', options: [
                { text: 'The Jajmani system is a hereditary, caste-based patron-client relationship where service', outcome: 'The Jajmani system is a hereditary, caste-based patron-client relationship where service castes.' },
                { text: 'money wages', outcome: 'Not quite — Students often equate the Jajmani system with "barter" or "feudalism" — treating it as.', reveals: 'students-often-equate-the-jajmani' },
                { text: 'free market bargaining', outcome: 'Not quite — Students often equate the Jajmani system with "barter" or "feudalism" — treating it as.', reveals: 'students-often-equate-the-jajmani' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_005', title: 'The Market for Credit: Moneylenders, Indigenous Bankers and the Informal Credit Market',
          caseStudy: { intro: 'Imagine a small farmer in 1980s rural Bihar who needs ₹5,000 for seeds before the monsoon.',
            decisions: [{ prompt: 'Define \'indigenous banker\' in the Indian sociological context and name two historical examples from the NCERT text.', options: [
                { text: 'An indigenous banker is a traditional moneylending/banking operator embedded in', outcome: 'An indigenous banker is a traditional moneylending/banking operator embedded in caste/kinship.' },
                { text: 'any private lender', outcome: 'Not quite — Students equate \'informal credit market\' with \'unorganised sector\' and assume it is *only*.', reveals: 'students-equate-informal-credit-market' },
                { text: 'RBI-licensed small finance bank', outcome: 'Not quite — Students equate \'informal credit market\' with \'unorganised sector\' and assume it is *only*.', reveals: 'students-equate-informal-credit-market' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_006', title: 'The Market for Land: Land as a Commodity, Tenancy and the Land Market',
          caseStudy: { intro: 'Imagine a Dalit family in a Tamil Nadu village who have worked the same plot for three generations as sharecroppers — they give half the harvest to the.',
            decisions: [{ prompt: 'What is the fundamental sociological difference between viewing land as a "factor of production" (economics) and viewing land as.', options: [
                { text: 'Economics treats land as a factor of production with a market-determined price reflecting', outcome: 'Economics treats land as a factor of production with a market-determined price reflecting scarcity.' },
                { text: 'sociology just adds culture to economics', outcome: 'Not quite — Students often write: "Land reforms failed because of corruption and loopholes." This reduces.', reveals: 'students-often-write-land-reforms' },
                { text: 'add-on', outcome: 'Not quite — Students often write: "Land reforms failed because of corruption and loopholes." This reduces.', reveals: 'students-often-write-land-reforms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup proposes \'digitising\' a tribal weekly haat — replace it with a delivery app \'because a market is just buyers, sellers and price discovery; the rest is noise.\'',
            decisions: [{ prompt: 'What would embeddedness analysis warn them they\'re deleting?', options: [
                { text: 'The social structure that makes the market work — the haat is constituted by caste, kinship, ritual and state wage flows: who trades with whom, who extends credit, what gets trusted; strip those relations and you don\'t streamline the market, you dissolve the institution that was running it.', outcome: 'The chapter\'s Polanyi point: markets aren\'t price-machines with social decoration — the relations ARE the mechanism; \'the rest is noise\' deletes the load-bearing parts.' },
                { text: 'Nothing — the app replicates transactions, which is all a market is.', outcome: 'That assumes the economic view the chapter disputes — trust, credit and access in the haat run on caste and kin networks; an app can\'t transact what only those relations make possible.', reveals: 'market-is-just-prices' },
                { text: 'Only the gossip and festivals — the trade part transfers cleanly.', outcome: 'The \'extras\' are the infrastructure — kinship decides creditworthiness, ritual timing brings the crowd, caste position sets the terms; separating \'trade\' from \'social\' is the analytical error, not a clean cut.', reveals: 'social-part-is-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why liberalisation raised efficiency yet left the power map intact — markets don\'t escape society; they\'re built out of it.',
            decisions: [{ prompt: 'What comes next? The Market as a Social Institution · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Market as a Social Institution · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_001', difficulty: 'standard',
          question: 'A market as a social institution is a culturally specific, socially embedded.',
          hint: 'Revisit Class 11 Sociology Chapter 3 (Social Institutions) and Chapter 9 (Marx, Durkheim.',
          misconception: 'Students often think \'market as a social institution\' merely means \'markets exist in society\' or \'markets affect.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A market as a social institution is a culturally specific, socially embedded arena of',
                  options: ['A market as a social institution is a culturally specific, socially embedded arena of', 'Embeddedness is the sociological concept (central to Karl Polanyi) that economic', 'A weekly market (haat) is a periodic market held on a fixed day in rural and tribal areas', 'The Jajmani system is a traditional caste-based economic arrangement in rural India where'],
                  hint: 'Revisit Class 11 Sociology Chapter 3 (Social Institutions) and Chapter 9 (Marx, Durkheim, Weber).',
                  misconception: 'Students often think \'market as a social institution\' merely means \'markets exist in society\' or \'markets affect society\'.' }
          ],
            remediations: { 'market-as-a-social-institution': { steps: ['Re-read the Dhorai haat description (Box 4.1) and Nakarattar case (Box 4.2) in NCERT.', 'For each, list: (a) who buys/sells, (b) what social ties enable trust, (c) what power asymmetry exists.', 'Write a 3-sentence explanation of \'embeddedness\' using these lists.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_002', difficulty: 'standard',
          question: 'Embeddedness is the sociological concept (central to Karl Polanyi) that.',
          hint: 'If unclear on \'social institution\', revisit **c11_soc_cbse_03_001** (Social Institutions.',
          misconception: 'Students often think \'embeddedness\' means traditional/pre-modern markets are *fully* social while modern markets are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Embeddedness is the sociological concept (central to Karl Polanyi) that economic',
                  options: ['Embeddedness is the sociological concept (central to Karl Polanyi) that economic', 'A market as a social institution is a culturally specific, socially embedded arena of', 'A weekly market (haat) is a periodic market held on a fixed day in rural and tribal areas', 'The Jajmani system is a traditional caste-based economic arrangement in rural India where'],
                  hint: 'If unclear on \'social institution\', revisit **c11_soc_cbse_03_001** (Social Institutions.',
                  misconception: 'Students often think \'embeddedness\' means traditional/pre-modern markets are *fully* social while modern markets are *purely* economic.' }
          ],
            remediations: { 'embeddedness-means-traditional-pre-modern': { steps: ['If the student holds the above misconception, do this 3-step remediation: 1) Re-read the NCERT opening paragraph: \'We.', '2) Take a modern example (e.g., Zomato, Upstox).', 'Ask: \'What social relations allow this app to work?\' (Answer: labour laws, digital infrastructure built by state, trust.', '3) Re-attempt Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_003', difficulty: 'standard',
          question: 'A weekly market (haat) is a periodic market held on a fixed day in rural and.',
          hint: 'Revisit c12_soc_cbse_04_002 for Polanyi\'s embeddedness and c11_soc_cbse_07_008 for rural.',
          misconception: 'Students think \'periodic market\' means \'traditional and unchanging\'.',
          parts: [
                { id: 'a', prompt: 'Explain why sociologists describe the weekly tribal haat as a \'social institution\' rather than just an economic marketplace. Use the Dhorai market example.', answer: 'Sociologists call it a social institution',
                  options: ['Sociologists call it a social institution', '\'periodic market\' means \'traditional and unchanging\''],
                  hint: 'Revisit c12_soc_cbse_04_002 for Polanyi\'s embeddedness and c11_soc_cbse_07_008 for rural social.',
                  misconception: 'Students think \'periodic market\' means \'traditional and unchanging\'.' }
          ],
            remediations: { 'periodic-market-means-traditional-and': { steps: ['If a student holds this misconception, do: (1) Re-read the two paragraphs on Dhorai (NCERT pp.', '55-56) and highlight every change attributed to colonialism (roads, forest laws, moneylenders, labour recruitment).', '(2) Create a two-column table: \'Pre-colonial haat (inferred)\' vs \'Colonial-era Dhorai market (described)\'.', '(3) Answer: "If the market were unchanged, why does the text say forest produce is sold to outsiders and adivasis lose.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think \'periodic market\' means \'traditional and unchanging\'.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: \'Colonialism destroyed the self-sufficiency of tribal economies but also created the weekly haat as we know it today.\' Support with two.', answer: 'The statement is partially correct',
                  options: ['The statement is partially correct', '\'periodic market\' means \'traditional and unchanging\''],
                  hint: 'Revisit c12_soc_cbse_04_002 for Polanyi\'s embeddedness and c11_soc_cbse_07_008 for rural social.',
                  misconception: 'Students think \'periodic market\' means \'traditional and unchanging\'.' }
          ],
            remediations: { 'periodic-market-means-traditional-and': { steps: ['If a student holds this misconception, do: (1) Re-read the two paragraphs on Dhorai (NCERT pp.', '55-56) and highlight every change attributed to colonialism (roads, forest laws, moneylenders, labour recruitment).', '(2) Create a two-column table: \'Pre-colonial haat (inferred)\' vs \'Colonial-era Dhorai market (described)\'.', '(3) Answer: "If the market were unchanged, why does the text say forest produce is sold to outsiders and adivasis lose.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_004', difficulty: 'standard',
          question: 'The Jajmani system is a traditional caste-based economic arrangement in rural.',
          hint: 'Revisit Ghurye\'s six features of caste (c11_soc_cbse_10_005) and Srinivas\'s dominant.',
          misconception: 'Students often equate the Jajmani system with "barter" or "feudalism" — treating it as a pre-monetary market exchange.',
          parts: [
                { id: 'a', prompt: 'A Chamar (leatherworker) family in a Jajmani arrangement receives 5 maunds of wheat per year from their Thakur patron.', answer: 'The demand is sociologically grounded',
                  options: ['The demand is sociologically grounded', 'breach of contract', 'wage dispute'],
                  hint: 'Revisit Ghurye\'s six features of caste (c11_soc_cbse_10_005) and Srinivas\'s dominant caste.',
                  misconception: 'Students often equate the Jajmani system with "barter" or "feudalism" — treating it as a pre-monetary market exchange where goods are.' }
          ],
            remediations: { 'students-often-equate-the-jajmani': { steps: ['If a student conflates Jajmani with barter/feudalism: Step 1 — Have them list three features of a market exchange.', 'Step 2 — For each feature, ask: "Does Jajmani have this?" using the Chamar-Thakur example.', 'Step 3 — Introduce the term "embeddedness" (Polanyi, referenced in c12_soc_cbse_04_002) to name why economy cannot.', 'Step 4 — Re-do Diagnostic Question 3, requiring the student to use "customary fixation" and "no exit" in their answer.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_005', difficulty: 'standard',
          question: 'The market for credit refers to the socially embedded system of lending and.',
          hint: 'Revisit c12_soc_cbse_04_004 (Caste and Market) for the jajmani-to-credit transition, and.',
          misconception: 'Students equate \'informal credit market\' with \'unorganised sector\' and assume it is *only* exploitative chaos.',
          parts: [
                { id: 'a', prompt: 'Define \'indigenous banker\' in the Indian sociological context and name two historical examples from the NCERT text.', answer: 'An indigenous banker is a traditional moneylending/banking operator embedded in',
                  options: ['An indigenous banker is a traditional moneylending/banking operator embedded in', 'any private lender', 'RBI-licensed small finance bank'],
                  hint: 'Revisit c12_soc_cbse_04_004 (Caste and Market) for the jajmani-to-credit transition, and.',
                  misconception: 'Students equate \'informal credit market\' with \'unorganised sector\' and assume it is *only* exploitative chaos.' },
                { id: 'b', prompt: 'Explain in your own words why the hundi system worked across long distances without a central bank or legal enforcement, using the Nakarattar example.', answer: 'The hundi worked',
                  options: ['The hundi worked', 'legal validity of hundi', 'government guarantee'],
                  hint: 'Revisit c12_soc_cbse_04_004 (Caste and Market) for the jajmani-to-credit transition, and.',
                  misconception: 'Students equate \'informal credit market\' with \'unorganised sector\' and assume it is *only* exploitative chaos.' },
                { id: 'c', prompt: 'A tribal household in Bastar sells forest produce to a trader-moneylender at below-market prices to repay a ₹10,000 loan at 3% monthly interest.', answer: 'Mechanism 1: *Interlocking markets*',
                  options: ['Mechanism 1: *Interlocking markets*', 'high interest', 'poverty'],
                  hint: 'Revisit c12_soc_cbse_04_004 (Caste and Market) for the jajmani-to-credit transition, and.',
                  misconception: 'Students equate \'informal credit market\' with \'unorganised sector\' and assume it is *only* exploitative chaos.' }
          ],
            remediations: { 'students-equate-informal-credit-market': { steps: ['If the student conflates informal credit with mere exploitation or cannot distinguish indigenous bankers from.', '(2) Re-read the Bastar tribal market section — identify *two* interlocking markets (credit + produce + labour).', '(3) Draw a 3-column table: Indigenous Banker | Moneylender | Formal Bank — fill columns: \'Trust basis\', \'Instrument\'.', '(4) Re-attempt Diagnostic Q2 and Q3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_006', difficulty: 'standard',
          question: 'The market for land refers to the socially embedded system of transactions.',
          hint: 'Revisit c12_soc_cbse_04_002 (Polanyi) and c12_soc_cbse_04_004 (caste-market interlocking).',
          misconception: 'Students often write: "Land reforms failed because of corruption and loopholes." This reduces a structural power.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The market for land refers to the socially embedded system of transactions through which',
                  options: ['The market for land refers to the socially embedded system of transactions through which', 'A market as a social institution is a culturally specific, socially embedded arena of', 'Embeddedness is the sociological concept (central to Karl Polanyi) that economic', 'A weekly market (haat) is a periodic market held on a fixed day in rural and tribal areas'],
                  hint: 'Revisit c12_soc_cbse_04_002 (Polanyi) and c12_soc_cbse_04_004 (caste-market interlocking).',
                  misconception: 'Students often write: "Land reforms failed because of corruption and loopholes." This reduces a structural power struggle to administrative.' }
          ],
            remediations: { 'students-often-write-land-reforms': { steps: ['If a student gives the "corruption/loopholes" answer: (1) Ask them to name *who* used the loopholes — push for specific.', '(2) Show the 1970s West Bengal case: same laws, different outcome because peasant unions (KRRS, CPI-M) forced.', '(3) Assign a 200-word rewrite: "Explain why land ceiling laws transferred <2% of cultivable land nationwide, using the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
