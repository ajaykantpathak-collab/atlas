import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch05_p1: SimDef = {
    id: 'v3_c10_eco_ch05_p1',
    title: 'Consumer Rights · Part 1/2',
    subtitle: 'Turn a bad purchase into a case the law must answer',
    classLevel: 10, subject: 'economics', topic: 'Consumer Rights · Part 1/2',
    chapters: ['c10_eco_ch05'],
    nodeIds: ['c10_eco_cbse_05_001', 'c10_eco_cbse_05_002', 'c10_eco_cbse_05_003', 'c10_eco_cbse_05_004', 'c10_eco_cbse_05_005', 'c10_eco_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a consumer-rights advocate arguing before a district forum', intro: 'A pressure cooker lid bursts on first use — no instructions, no ISI mark, no refund. What sounds like bad luck is actually four legal violations at once.', goal: 'Name the consumer rights, trace the movement that won them, and apply them to real complaints.' },
    discovery: {
        question: 'A ₹500 \'pure ghee\' packet turns out adulterated. The shopkeeper blames the company, the company ignores your letter, and a lawyer costs more than the ghee. What does this prove?',
        options: ['Individual buyers are too weak to fight alone — that\'s exactly why a consumer movement had to be organised', 'Nothing — cheating on small purchases is just part of shopping', 'Only expensive products deserve legal protection', 'The consumer should simply stop buying branded goods'],
        answer: 'Individual buyers are too weak to fight alone — that\'s exactly why a consumer movement had to be organised',
        hook: 'One cheated buyer is a nuisance; a movement is a force. The rights you now take for granted were won by two decades of testing, exposing and organising.',
    },
    teaching: [
        { title: 'Consumer Movement: Origins and the Need for Consumer Protection', text: 'The consumer movement refers to the organized collective efforts by consumers, civil society, and government to protect buyers from unfair trade practices, exploitation, and information asymmetry.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a burst pressure cooker with no ISI mark and no refund to the District Forum — identify every right violated and argue for the relief a consumer deserves.',
        labels: ['Consumer Movement: Origins', 'Rights of Consumers: Safety,', 'COPRA: Consumer Protection Act', 'Consumer Disputes Redressal Forums', 'Standardisation of Products: ISI,', 'Consumer Awareness: Right'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_001', title: 'Consumer Movement: Origins and the Need for Consumer Protection',
          caseStudy: { intro: 'Imagine you buy a packet of branded ghee labelled "pure" for ₹500, but later discover it contains vanaspati adulteration.',
            decisions: [{ prompt: 'Define "consumer movement" in the Indian context and state the year the Consumer Protection Act (COPRA) was enacted.', options: [
                { text: 'The consumer movement in India is the organised effort by consumers and civil society', outcome: 'The consumer movement in India is the organised effort by consumers and civil society groups.' },
                { text: 'COPRA was passed in 1991 or confusing it with the RTI Act', outcome: 'Not quite — Students often think the consumer movement started only after COPRA 1986, ignoring the two decades.', reveals: 'the-consumer-movement-started-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_002', title: 'Rights of Consumers: Safety, Information, Choice and Redressal',
          caseStudy: { intro: 'Imagine you buy a pressure cooker from a local market in Delhi. On first use, the lid bursts due to a manufacturing defect, causing burns.',
            decisions: [{ prompt: 'State the four fundamental consumer rights guaranteed under the Consumer Protection Act in India.', options: [
                { text: 'The four fundamental consumer rights are: (1) Right to Safety, (2) Right to Information,', outcome: 'The four fundamental consumer rights are: (1) Right to Safety, (2) Right to Information, (3) Right.' },
                { text: 'Right to Education', outcome: 'Not quite — Students often think "Right to Safety" only applies to food and medicines, not to durable goods.', reveals: 'right-to-safety-only-applies' },
                { text: 'Right to Discount', outcome: 'Not quite — Students often think "Right to Safety" only applies to food and medicines, not to durable goods.', reveals: 'right-to-safety-only-applies' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_003', title: 'COPRA: Consumer Protection Act 1986 and Its Provisions',
          caseStudy: { intro: 'Imagine you bought a new smartphone online for ₹25,000, but it stops charging within a week.',
            decisions: [{ prompt: 'Who is considered a "consumer" under the Consumer Protection Act 1986?', options: [
                { text: 'A consumer under COPRA 1986 is any person who: (i) buys any goods for a consideration', outcome: 'A consumer under COPRA 1986 is any person who: (i) buys any goods for a consideration which has.' },
                { text: 'anyone who buys something', outcome: 'Not quite — Students confuse the pecuniary jurisdiction limits of the three forums under COPRA 1986 with the.', reveals: 'students-confuse-the-pecuniary-jurisdiction' },
                { text: 'consideration', outcome: 'Not quite — Students confuse the pecuniary jurisdiction limits of the three forums under COPRA 1986 with the.', reveals: 'students-confuse-the-pecuniary-jurisdiction' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_05_004', title: 'Consumer Disputes Redressal Forums: District, State and National Level',
          scaffold: { problem: 'Riya purchased a washing machine for ₹38,000 from a local dealer. It malfunctioned within the warranty period.',
            steps: [
            { text: 'Identify the economic concept — pecuniary jurisdiction of Consumer Disputes Redressal Forums under the Consumer.' },
            { text: 'Recall the formula: Total Claim Value = Price of Goods/Services + Compensation Claimed.' },
            { text: 'Calculate total claim: ₹38,000 (refund) + ₹5,000 (compensation) = ₹43,000.' },
            { text: 'Compare with jurisdiction limits: District Commission up to ₹1 crore; State Commission ₹1 crore to ₹10 crore; National.' },
            { text: 'Since ₹43,000 ≤ ₹1 crore, the appropriate forum is the District Consumer Disputes Redressal Commission in Riya\'s.', faded: true, blankAnswer: 'District Consumer Disputes Redressal Commission (District.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_005', title: 'Standardisation of Products: ISI, Agmark, Hallmark and FPO Marks',
          caseStudy: { intro: 'Imagine you buy a pressure cooker without an ISI mark and it bursts during cooking, causing burns. How could you have known it was unsafe?',
            decisions: [{ prompt: 'What is the full form of ISI mark and which organisation currently issues it in India?', options: [
                { text: 'ISI stands for Indian Standards Institute', outcome: 'ISI stands for Indian Standards Institute; it is now issued by the Bureau of Indian Standards.' },
                { text: 'International Standards Institute', outcome: 'Not quite — Students often think ISI, Agmark, Hallmark, and FPO are just different logos for "good quality" and.', reveals: 'isi' },
                { text: 'issued by ISO', outcome: 'Not quite — Students often think ISI, Agmark, Hallmark, and FPO are just different logos for "good quality" and.', reveals: 'isi' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_006', title: 'Consumer Awareness: Right to Be Heard and Represented',
          caseStudy: { intro: 'Imagine you bought a new smartphone online for ₹25,000, but the screen flickers within a week.',
            decisions: [{ prompt: 'Define the "Right to Be Heard and Represented" as per the Consumer Protection Act, 2019.', options: [
                { text: 'The Right to Be Heard and Represented means consumers have the right to voice grievances', outcome: 'The Right to Be Heard and Represented means consumers have the right to voice grievances and have.' },
                { text: 'right to get a refund', outcome: 'Not quite — Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s.', reveals: 'right-to-be-heard-means' },
                { text: 'Right to Be Heard', outcome: 'Not quite — Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s.', reveals: 'right-to-be-heard-means' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'A consumer can buy the cheap product made in poor conditions, or the expensive fair one. Buying fair costs more; buying cheap keeps the cheap system running.',
            decisions: [{ prompt: 'Is a consumer\'s wallet a vote?', options: [
                { text: 'Yes — every purchase is a choice about what continues', outcome: 'The ethical-consumption answer; true but incomplete — the cheapest option isn\'t a \'choice\' for people who can\'t afford another.' },
                { text: 'No — the system decides what\'s on the shelf', outcome: 'The structural answer — individual choices can\'t reach what was never offered; regulation reaches further than wallets.' },
                { text: 'A vote if you can afford to cast it', outcome: 'The honest answer — consumer power is real but unequally distributed; the wallet-vote works best when it\'s not the only mechanism.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family buys a sealed packet of spices and finds it adulterated with filler. When they return to the shop, the trader shrugs: \'Once sold, goods are yours — no refunds.\' Someone at home says nothing can be done for a ₹200 packet.',
            decisions: [{ prompt: 'What can the family actually do?', options: [
                { text: 'Keep the bill and packet as proof, and file a complaint — the consumer courts set up under the Consumer Protection Act are designed for exactly this: low-cost redressal where a district commission can order refund or compensation without needing an expensive lawyer.', outcome: 'COPRA 1986 created a three-tier system precisely because individual complaints about small purchases used to cost more to fight than they were worth — the Act flipped that calculus.' },
                { text: 'Nothing — a shopkeeper\'s \'no refund\' rule is final, and ₹200 is too small for any court.', outcome: 'Consumer forums exist for small claims too; \'sold goods are not taken back\' is a shop rule, not law, and does not excuse selling adulterated goods.', reveals: 'consumer-is-powerless' },
                { text: 'The only real remedy is to warn neighbours and boycott the shop, since the law only handles big purchases.', outcome: 'Boycott helps socially but the law is not limited to big purchases — adulteration is a serious violation and consumer commissions routinely hear small claims.', reveals: 'law-only-for-big-purchases' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Safety, information, choice, redressal — four rights that turned \'buyer beware\' into \'seller, be fair.\' The movement started long before the law caught up.',
            decisions: [{ prompt: 'What comes next? Consumer Rights · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Consumer Rights · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_001', difficulty: 'standard',
          question: 'The consumer movement refers to the organized collective efforts by consumers.',
          hint: 'Revisit c7_eco_ch02_010 (exploitation and information gaps) and c9_eco_ch2_12 (monopoly.',
          misconception: 'Students often think the consumer movement started only after COPRA 1986, ignoring the two decades (1966–1986).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The consumer movement refers to the organized collective efforts by consumers, civil',
                  options: ['The consumer movement refers to the organized collective efforts by consumers, civil', 'The four fundamental consumer rights', 'The Consumer Protection Act (COPRA) 1986 is a social welfare legislation enacted by', 'The Consumer Disputes Redressal Forums are a three-tier quasi-judicial machinery'],
                  hint: 'Revisit c7_eco_ch02_010 (exploitation and information gaps) and c9_eco_ch2_12 (monopoly regulation).',
                  misconception: 'Students often think the consumer movement started only after COPRA 1986, ignoring the two decades (1966–1986) of voluntary activism (CGSI.' }
          ],
            remediations: { 'the-consumer-movement-started-only': { steps: ['Create a timeline on paper: 1966 (CGSI founded) → 1970s (anti-hoarding, anti-black-marketing protests) → 1983 (VOICE.', 'For each pre-1986 event, write one concrete achievement (e.g., CGSI\'s testing of 200+ food samples exposed.', 'Read NCERT Class 10 Economics Chapter 5, "Consumer Movement" section (pages 78–79) and underline every pre-1986.', 'Practice writing: "The consumer movement originated in the 1960s due to...; COPRA 1986 gave it legal force." Repeat.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_002', difficulty: 'standard',
          question: 'The four fundamental consumer rights — Safety, Information, Choice, and.',
          hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and.',
          misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics.',
          parts: [
                { id: 'a', prompt: 'A consumer buys a packet of biscuits but the packet does not mention the date of manufacture, expiry date, or ingredients. Which consumer right is violated?', answer: 'The Right to Information is violated',
                  options: ['The Right to Information is violated', 'Right to Safety'],
                  hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and c7_eco_ch02_010.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'b', prompt: 'In a village fair, a shopkeeper sells only one brand of toothpaste at ₹50 per tube, claiming "no other stock".', answer: 'Right to Choice is violated',
                  options: ['Right to Choice is violated', 'Right to Safety'],
                  hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and c7_eco_ch02_010.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'c', prompt: 'Compare two situations: (A) A mobile phone battery explodes while charging, injuring the user.', answer: '(A) Right to Safety violated',
                  options: ['(A) Right to Safety violated', 'Right to Safety', 'both are Safety or both Redressal'],
                  hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and c7_eco_ch02_010.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' }
          ],
            remediations: { 'right-to-safety-only-applies': { steps: ['List 5 non-food items you use daily (e.g., phone charger, LPG stove, school bus, elevator, mosquito coil).', 'For each, write one safety hazard if defective.', 'Check if each has ISI/BIS/Hallmark — if not, Right to Safety is at risk.', 'Read Section 2(9) of Consumer Protection Act 2019 definition of "defect" — note it includes "any fault...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics.',
          parts: [
                { id: 'a', prompt: '"Right to Choice means a consumer can demand any product at any price they want." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Right to Safety'],
                  hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and c7_eco_ch02_010.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'b', prompt: 'Create a 4-panel comic strip storyboard (describe each panel in 1-2 sentences) showing a consumer experiencing violation of all four rights while buying.', answer: 'Panel 1: Ramesh buys a ceiling fan from "Bharat Electronics"',
                  options: ['Panel 1: Ramesh buys a ceiling fan from "Bharat Electronics"', 'Right to Safety'],
                  hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and c7_eco_ch02_010.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' }
          ],
            remediations: { 'right-to-safety-only-applies': { steps: ['List 5 non-food items you use daily (e.g., phone charger, LPG stove, school bus, elevator, mosquito coil).', 'For each, write one safety hazard if defective.', 'Check if each has ISI/BIS/Hallmark — if not, Right to Safety is at risk.', 'Read Section 2(9) of Consumer Protection Act 2019 definition of "defect" — note it includes "any fault...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_003', difficulty: 'standard',
          question: 'The Consumer Protection Act (COPRA) 1986 is a social welfare legislation.',
          hint: 'If stuck on "who is a consumer", revisit c10_eco_cbse_05_002 (Right to Safety/Choice) and.',
          misconception: 'Students confuse the pecuniary jurisdiction limits of the three forums under COPRA 1986 with the revised limits under.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Consumer Protection Act (COPRA) 1986 is a social welfare legislation enacted by',
                  options: ['The Consumer Protection Act (COPRA) 1986 is a social welfare legislation enacted by', 'The consumer movement refers to the organized collective efforts by consumers, civil', 'The four fundamental consumer rights', 'The Consumer Disputes Redressal Forums are a three-tier quasi-judicial machinery'],
                  hint: 'If stuck on "who is a consumer", revisit c10_eco_cbse_05_002 (Right to Safety/Choice) and.',
                  misconception: 'Students confuse the pecuniary jurisdiction limits of the three forums under COPRA 1986 with the revised limits under the Consumer.' }
          ],
            remediations: { 'students-confuse-the-pecuniary-jurisdiction': { steps: ['Create a comparison table on an A4 sheet: Column 1 = Forum, Column 2 = COPRA 1986 Limit (NCERT), Column 3 = CPA 2019.', 'Memorise the 1986 limits using the mnemonic "20-1-∞" (District=20 lakh, State=1 crore, National=above 1 crore).', 'Practice 5 jurisdiction questions: "Claim ₹15 lakh → ?", "Claim ₹50 lakh → ?", "Claim ₹2 crore → ?" — write the forum.', 'In every mock test, circle the claim value first, then write the forum — this builds the automatic "value → forum" link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_004', difficulty: 'standard',
          question: 'The Consumer Disputes Redressal Forums are a three-tier quasi-judicial.',
          hint: 'If stuck on jurisdiction limits, revisit c10_eco_cbse_05_003 (COPRA provisions) and.',
          misconception: 'Students often believe that the type of product (e.g., car vs. phone) or the brand (big company vs.',
          parts: [
                { id: 'a', prompt: 'Compare the composition of the District Commission and the National Commission. How does the difference reflect the complexity of cases they handle?', answer: 'District Commission: President + 2 members (one must be a woman)',
                  options: ['District Commission: President + 2 members (one must be a woman)', 'the type of product (e'],
                  hint: 'If stuck on jurisdiction limits, revisit c10_eco_cbse_05_003 (COPRA provisions) and memorise the.',
                  misconception: 'Students often believe that the type of product (e.g., car vs. phone) or the brand (big company vs. small shop) determines the forum.' }
          ],
            remediations: { 'the-type-of-product-e': { steps: ['Re-read the pecuniary limits table in the textbook (or this node\'s definition).', 'Practice 5 numerical problems where you calculate total claim value (include compensation) and pick the forum.', 'Draw the appeal hierarchy (District → State → National → Supreme Court) on a flashcard.', 'Explain aloud why a ₹50 lakh claim against a multinational company still goes to District Commission — this reinforces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_005', difficulty: 'standard',
          question: 'Standardisation marks are official certification symbols issued by authorised.',
          hint: 'Revisit c10_eco_cbse_05_002 (Rights of Consumers) and c6_economics_ch12_005 (Consumer.',
          misconception: 'Students often think ISI, Agmark, Hallmark, and FPO are just different logos for "good quality" and interchangeably.',
          parts: [
                { id: 'a', prompt: 'What is the full form of ISI mark and which organisation currently issues it in India?', answer: 'ISI stands for Indian Standards Institute',
                  options: ['ISI stands for Indian Standards Institute', 'International Standards Institute', 'issued by ISO', 'good quality'],
                  hint: 'Revisit c10_eco_cbse_05_002 (Rights of Consumers) and c6_economics_ch12_005 (Consumer Awareness.',
                  misconception: 'Students often think ISI, Agmark, Hallmark, and FPO are just different logos for "good quality" and interchangeably apply them to any.' },
                { id: 'b', prompt: 'A consumer buys a 22-carat gold necklace without a Hallmark. The jeweller claims it is pure.', answer: 'The Right to Safety and Right to Information are violated',
                  options: ['The Right to Safety and Right to Information are violated', 'Right to Choose', 'good quality'],
                  hint: 'Revisit c10_eco_cbse_05_002 (Rights of Consumers) and c6_economics_ch12_005 (Consumer Awareness.',
                  misconception: 'Students often think ISI, Agmark, Hallmark, and FPO are just different logos for "good quality" and interchangeably apply them to any.' },
                { id: 'c', prompt: 'Compare the consequences of buying a non-ISI marked pressure cooker versus a non-Agmark branded honey bottle.', answer: 'Non-ISI pressure cooker poses greater immediate physical risk (explosion, burns)',
                  options: ['Non-ISI pressure cooker poses greater immediate physical risk (explosion, burns)', 'good quality'],
                  hint: 'Revisit c10_eco_cbse_05_002 (Rights of Consumers) and c6_economics_ch12_005 (Consumer Awareness.',
                  misconception: 'Students often think ISI, Agmark, Hallmark, and FPO are just different logos for "good quality" and interchangeably apply them to any.' }
          ],
            remediations: { 'isi': { steps: ['Create a four-column table (Mark, Full Form, Issuing Authority, Product Category) and fill it using NCERT textbook.', 'Take 10 household items, find their marks, and classify them into the four categories.', 'Practice two case-based questions where you identify the correct mark for a given product and explain why the other.', 'Write one paragraph linking each mark to a specific consumer right (Safety, Information, Choice) to cement the legal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_006', difficulty: 'standard',
          question: 'The Right to Be Heard and Represented ensures that consumers have the.',
          hint: 'If stuck, revisit the six consumer rights (c10_eco_cbse_05_002) and the key sections.',
          misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Right to Be Heard and Represented ensures that consumers have the opportunity to',
                  options: ['The Right to Be Heard and Represented ensures that consumers have the opportunity to', 'The consumer movement refers to the organized collective efforts by consumers, civil', 'The four fundamental consumer rights', 'The Consumer Protection Act (COPRA) 1986 is a social welfare legislation enacted by'],
                  hint: 'If stuck, revisit the six consumer rights (c10_eco_cbse_05_002) and the key sections of the.',
                  misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.' }
          ],
            remediations: { 'right-to-be-heard-means': { steps: ['If the student confuses “being heard” with “winning the case”: 1.', '**Draw a two-column table** on paper: Column A = “Right to Be Heard (Procedure)”, Column B = “Right to Redressal.', '**Fill Column A** with: file complaint → receive hearing notice → present evidence → argue case → receive order (even.', '**Fill Column B** with: order grants refund/replacement/compensation/cease-and-desist.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
