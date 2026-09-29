import type { SimDef } from '../../engine/types';
import C11_SociologyRuralUrbanSocialOrderSim from '../../../simulations/c6_12/C11_SociologyRuralUrbanSocialOrderSim';

/** v3 wrapped master — C11_SociologyRuralUrbanSocialOrderSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologyruralurbansocialordersim: SimDef = {
    id: 'v3w_c11_sociologyruralurbansocialordersim',
    title: 'Social Change: Definition, Scope and the Historical Pace of Change',
    subtitle: 'This node covers the sociological definition of social change (Giddens\' criteria of.',
    classLevel: 11, subject: 'sociology', topic: 'Social Change: Definition, Scope and the Historical Pace of Change',
    chapters: [],
    nodeIds: ['c11_soc_cbse_07_001', 'c11_soc_cbse_07_007', 'c11_soc_cbse_07_008', 'c11_soc_cbse_07_010', 'c11_soc_cbse_07_011', 'c11_soc_cbse_07_009', 'c11_soc_cbse_08_004', 'c11_soc_cbse_08_006', 'c11_soc_cbse_08_007', 'c11_soc_cbse_01_005', 'c11_soc_cbse_07_002', 'c11_soc_cbse_07_003', 'c11_soc_cbse_07_004', 'c11_soc_cbse_07_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking: "List five things in your daily life—smartphone, packaged milk, motorbike, internet, plastic.', goal: 'Master Social Change: Definition, Scope and the Historical Pace of Change.' },
    discovery: {
        question: 'State the core legal entitlement that MGNREGA provides to a rural household, and name the level of government primarily responsible for its implementation.',
        options: ['MGNREGA guarantees 100 days of wage employment per financial year to every rural', '200 days', 'implemented by the District Collector alone'],
        answer: 'MGNREGA guarantees 100 days of wage employment per financial year to every rural',
        hook: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee*.',
    },
    teaching: [
        { title: 'Social change refers to significant.', text: 'Social change refers to significant alterations in the underlying structure of society—including its institutions, norms, values, and social relationships—that are both intensive (transforming.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_001', title: 'Social change refers to significant.',
          scaffold: { problem: 'A Class 11 student argues: "The shift from joint to nuclear families in urban India is social change.',
            steps: [
            { text: 'Identify the textbook\'s definitional criteria: social change must be (a) intensive—altering the underlying structure of.' },
            { text: 'Analyse \'joint to nuclear family shift\': Does it alter underlying structure?' },
            { text: 'Analyse \'Instagram reels\': Does it alter underlying structure?' },
            { text: 'Apply the \'both criteria required\' rule: Instagram reels fails the intensive criterion; therefore it is a.' },
            { text: 'Synthesise: The student\'s first claim is correct; the second is incomplete without demonstrating institutional.', faded: true, blankAnswer: 'Joint-to-nuclear shift = social change (passes both.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_007', title: 'Contestation refers to broad forms of.',
          scaffold: { problem: 'In 2020, migrant workers walked hundreds of kilometers home during lockdown.',
            steps: [
            { text: 'Identify all actors — migrant workers (walking, campaigning), police (stopping), vigilantes (attacking), state.' },
            { text: 'Define each concept operationally: Contestation = norm/law challenge with moral claim; Crime = law violation; Violence.' },
            { text: 'Classify migrant walking — violates lockdown order (crime legally), but moral claim of survival makes it contestation;.' },
            { text: 'Classify police stopping — physical force used, but authorized by Disaster Management Act/state order = legitimate.' },
            { text: 'Classify vigilante attacks — physical force, no state authorization = illegitimate violence (crime: assault).' },
            { text: 'Classify online campaigns — challenging policy without law-breaking = pure contestation (democratic dissent).' },
            { text: 'Synthesize — same situation reveals all four categories operating simultaneously; legality ≠ legitimacy ≠ morality.', faded: true, blankAnswer: 'Migrant walking: Crime (legal) + Contestation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_008', title: 'Rural society in India is characterized.',
          scaffold: { problem: 'A village in Haryana has 200 households. The Jat caste (120 households) owns 80% of the cultivable land.',
            steps: [
            { text: 'Identify the pre-reform power structure: Absentee Brahmin landlords hold legal title but are absent; Jat tenants have.' },
            { text: 'Apply the tenancy reform: The law transfers proprietary rights to tenants with 10+ years cultivation.' },
            { text: 'Calculate the shift in land ownership: Jats now own 80% (previous) + the share previously held by Brahmins (approx.' },
            { text: 'Assess political impact: With land ownership consolidated and numerical majority, Jats capture panchayat seats, control.' },
            { text: 'Evaluate impact on Dalits: No change in landlessness; they remain laborers, but now depend on Jat employers who have.' },
            { text: 'Synthesize: The reform transformed Jats from dominant tenants to dominant proprietors, intensifying their structural.', faded: true, blankAnswer: 'Post-reform, Jats consolidate near-total land ownership and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_010', title: 'Urban society refers to a form of.',
          scaffold: { problem: 'A 15-year-old slum in Bengaluru (population 3,200) sits on 2.5 hectares of state government land.',
            steps: [
            { text: 'Identify the tenure insecurity — residents have *de facto* possession (voter ID, ration card, 15-year residence) but no.' },
            { text: 'Recognise the PPP structure as a form of \'accumulation by dispossession\' — public land is used to subsidise private.' },
            { text: 'Calculate the maintenance burden — ₹4,500/month = ₹54,000/year.' },
            { text: 'Predict the distress sale trajectory — within 5 years, 40-60% of original allottees will sell to middle-class buyers,.' },
            { text: 'Analyse the new social order — the redeveloped complex will have a two-tier management: RWA dominated by luxury flat.' },
            { text: 'Evaluate the spatial justice outcome — the slum\'s *use-value* (affordable location near work, dense social support) is.', faded: true, blankAnswer: 'The redevelopment will likely result in displacement of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_011', title: 'Urbanisation is the demographic and.',
          scaffold: { problem: 'Using Census data, calculate the average annual rate of increase in India\'s urban population percentage between 1951 (17%) and 2011.',
            steps: [
            { text: 'Identify the two data points: 1951 = 17%, 2011 = 37.7%.' },
            { text: 'Calculate total increase: 37.7 - 17 = 20.7 percentage points over 60 years.' },
            { text: 'Calculate average annual increase: 20.7 / 60 = 0.345 percentage points per year.' },
            { text: 'Interpret: This means every year, roughly 0.35% of India\'s total population shifts from rural to urban classification.' },
            { text: 'Connect to social change: At this rate, rural areas lose young adults steadily, weakening agrarian labour pools and.', faded: true, blankAnswer: '0.345 percentage points per year average increase; implies.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_009', title: 'MGNREGA (Mahatma Gandhi National Rural.',
          scaffold: { problem: 'A sociologist studies Village R in Madhya Pradesh where the dominant OBC caste owns 80% of irrigated land.',
            steps: [
            { text: 'Calculate pre-MGNREGA annual wage income = 150 days × ₹80 = ₹12,000.' },
            { text: 'Calculate post-MGNREGA income = (MGNREGA: 60 days × ₹200) + (Farm: 150 days × ₹150) = ₹12,000 + ₹22,500 = ₹34,500.' },
            { text: 'Compute absolute increase = ₹34,500 - ₹12,000 = ₹22,500.' },
            { text: 'Compute percentage increase = (₹22,500 / ₹12,000) × 100 = 187.5%.' },
            { text: 'Interpret sociologically: The household\'s cash income nearly triples, reducing need for consumption loans from the.' },
            { text: 'Connect to social order: The landlord loses the ability to enforce bonded-like conditions; the worker gains \'exit.', faded: true, blankAnswer: '187.5% increase in annual wage income; sociologically, this.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_07_007', title: 'Identify each idea',
          dissect: { specimen: 'Social Change: Definition, Scope and the Historical Pace of Change', spots: [
            { id: 's1', label: 'Social change refers to significant', prompt: 'Which idea is this? — Social change refers to significant alterations in the underlying structure of.', answer: 'Social change refers to significant', options: ['Social change refers to significant', 'Contestation refers to broad forms', 'Rural society in India is', 'Urban society refers to a'] },
            { id: 's2', label: 'Contestation refers to broad forms', prompt: 'Which idea is this? — Contestation refers to broad forms of insistent disagreement with established norms,.', answer: 'Contestation refers to broad forms', options: ['Contestation refers to broad forms', 'Social change refers to significant', 'Rural society in India is', 'Urban society refers to a'] },
            { id: 's3', label: 'Rural society in India is', prompt: 'Which idea is this? — Rural society in India is characterized by small, settled agricultural communities where.', answer: 'Rural society in India is', options: ['Rural society in India is', 'Social change refers to significant', 'Contestation refers to broad forms', 'Urban society refers to a'] },
            { id: 's4', label: 'Urban society refers to a', prompt: 'Which idea is this? — Urban society refers to a form of social organisation characterised by high population.', answer: 'Urban society refers to a', options: ['Urban society refers to a', 'Social change refers to significant', 'Contestation refers to broad forms', 'Rural society in India is'] },
            { id: 's5', label: 'Urbanisation is the demographic and', prompt: 'Which idea is this? — Urbanisation is the demographic and social process through which an increasing proportion.', answer: 'Urbanisation is the demographic and', options: ['Urbanisation is the demographic and', 'Social change refers to significant', 'Contestation refers to broad forms', 'Rural society in India is'] },
            { id: 's6', label: 'MGNREGA Mahatma Gandhi National Rural', prompt: 'Which idea is this? — MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act, 2005) is a legislation.', answer: 'MGNREGA Mahatma Gandhi National Rural', options: ['MGNREGA Mahatma Gandhi National Rural', 'Social change refers to significant', 'Contestation refers to broad forms', 'Rural society in India is'] }
          ] } }
    ],
    explore: { component: C11_SociologyRuralUrbanSocialOrderSim, prompt: 'Explore the interactive — Social Change: Definition, Scope and the Historical Pace of Change' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_001', difficulty: 'standard',
          question: 'Social change refers to significant alterations in the underlying structure of.',
          hint: 'Revisit the \'Clock of Human History\' box on textbook page 21–22 and Class 10 History.',
          misconception: 'Students equate \'social change\' with any visible alteration in daily life—new gadgets, fashion, slang, or a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social change refers to significant alterations in the underlying structure of',
                  options: ['Social change refers to significant alterations in the underlying structure of', 'Contestation refers to broad forms of insistent disagreement with established norms,', 'Rural society in India is characterized by small, settled agricultural communities where', 'Urban society refers to a form of social organisation characterised by high population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'social change\' with any visible alteration in daily life—new gadgets, fashion, slang, or a single law—because these are.' }
          ],
            remediations: { 'students-equate-social-change-with': { steps: ['Have the student draw a 24-hour clock on paper.', 'Using the textbook\'s figures (500,000 years total; agriculture 12,000 BP; civilisation 6,000 BP; modern acceleration.', 'Ask: \'In which segment did the *structure* of daily life—how people produce food, relate to authority, organise.', 'Give three cards: \'Smartphone launched\', \'Child labour banned\', \'New dance trend\'.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_007', difficulty: 'standard',
          question: 'Contestation refers to broad forms of insistent disagreement with established.',
          hint: 'Revisit c11_soc_cbse_07_006 (Domination, Authority and Legitimation) — specifically the.',
          misconception: 'Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.',
          parts: [
                { id: 'a', prompt: 'Compare how \'gated communities\' in Indian cities and \'dominant caste\' control in villages both maintain social order through exclusion.', answer: 'Gated communities use *formal authority* (private security, resident welfare',
                  options: ['Gated communities use *formal authority* (private security, resident welfare', 'same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.' }
          ],
            remediations: { 'students-conflate-crime-and-violence': { steps: ['Ask student to define \'crime\' and \'violence\' in their own words.', 'Present the Gandhi Salt March case — "Was it a crime? Was it violence?', 'Introduce Weber\'s definition: "State = monopoly on *legitimate* violence." Ask: "When police arrest a protestor, is.', 'Map a 2x2 matrix: Legal/Illegal vs. Violent/Non-violent. Place: Gandhi\'s march (Illegal, Non-violent), Police.', 'Have student re-explain the three concepts using the matrix.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.',
          parts: [
                { id: 'a', prompt: 'Compare how \'gated communities\' in Indian cities and \'dominant caste\' control in villages both maintain social order through exclusion.', answer: 'Gated communities use *formal authority* (private security, resident welfare',
                  options: ['Gated communities use *formal authority* (private security, resident welfare', 'same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.' }
          ],
            remediations: { 'students-conflate-crime-and-violence': { steps: ['Ask student to define \'crime\' and \'violence\' in their own words.', 'Present the Gandhi Salt March case — "Was it a crime? Was it violence?', 'Introduce Weber\'s definition: "State = monopoly on *legitimate* violence." Ask: "When police arrest a protestor, is.', 'Map a 2x2 matrix: Legal/Illegal vs. Violent/Non-violent. Place: Gandhi\'s march (Illegal, Non-violent), Police.', 'Have student re-explain the three concepts using the matrix.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_008', difficulty: 'standard',
          question: 'Rural society in India is characterized by small, settled agricultural.',
          hint: 'Revisit Chapter 1 (Social Structure, Stratification and Social Processes) and Class 10.',
          misconception: 'Students often believe that \'dominant caste\' means the caste with the highest ritual status (Brahmins) in a village, or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural society in India is characterized by small, settled agricultural communities where',
                  options: ['Rural society in India is characterized by small, settled agricultural communities where', 'Social change refers to significant alterations in the underlying structure of', 'Contestation refers to broad forms of insistent disagreement with established norms,', 'Urban society refers to a form of social organisation characterised by high population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'dominant caste\' means the caste with the highest ritual status (Brahmins) in a village, or that land reforms.' }
          ],
            remediations: { 'dominant-caste-means-the-caste': { steps: ['If a student holds this misconception, first ask them to list the castes they think are dominant in three different.', 'Then provide census/landholding data showing the actual dominant castes are intermediate.', 'Next, walk through the legal text of a typical Zamindari Abolition Act: highlight the definition of \'tenant\' or.', 'Finally, have them read M.N.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_010', difficulty: 'standard',
          question: 'Urban society refers to a form of social organisation characterised by high.',
          hint: 'Revisit c11_soc_cbse_07_004 Section "Social Order" — focus on the distinction between.',
          misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes of.',
          parts: [
                { id: 'a', prompt: 'A municipal corporation proposes to redevelop a centrally located slum by offering residents high-rise apartments on 20% of the land and selling the remaining.', answer: 'Step 1: Identify the gentrification mechanism',
                  options: ['Step 1: Identify the gentrification mechanism', 'better housing quality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes of income differences.' }
          ],
            remediations: { 'students-conflate-slums-with-poverty': { steps: ['Take a local example — identify a slum and a gated community within 2 km of each other in your city.', 'Trace the *water supply*: compare hours of supply, pressure, and cost per litre in both.', 'Trace the *waste removal*: who collects garbage, where does it go, who pays?', 'Trace the *police response time* for a reported theft in each.', 'Map the *school access*: which schools do children attend, what are the fees, how do they commute?', 'Ask the student to explain *why* these differences exist if both are "just housing for different income groups".'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes of.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Mumbai\'s suburban local trains are the only truly democratic space in the city because everyone — rich and poor — travels together." Use.', answer: 'The claim is partially valid but sociologically incomplete',
                  options: ['The claim is partially valid but sociologically incomplete', 'fully democratic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes of income differences.' }
          ],
            remediations: { 'students-conflate-slums-with-poverty': { steps: ['Take a local example — identify a slum and a gated community within 2 km of each other in your city.', 'Trace the *water supply*: compare hours of supply, pressure, and cost per litre in both.', 'Trace the *waste removal*: who collects garbage, where does it go, who pays?', 'Trace the *police response time* for a reported theft in each.', 'Map the *school access*: which schools do children attend, what are the fees, how do they commute?', 'Ask the student to explain *why* these differences exist if both are "just housing for different income groups".'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_011', difficulty: 'standard',
          question: 'Urbanisation is the demographic and social process through which an increasing.',
          hint: 'Revisit c11_soc_cbse_07_008 (Rural Society) and c11_soc_cbse_07_010 (Urban Society) to.',
          misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.',
          parts: [
                { id: 'a', prompt: 'A village in Punjab has 8,000 residents spread over 20 sq km, with 65% of workers in agriculture.', answer: 'First settlement: Village (density = 400/sq km, low',
                  options: ['First settlement: Village (density = 400/sq km, low', 'urbanisation just means more people moving to cities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.' }
          ],
            remediations: { 'urbanisation-just-means-more-people': { steps: ['If the student conflates urbanisation with mere population growth: (1) Have them re-read the textbook\'s definition of.', 'lives in urban rather than rural areas" – emphasise PROPORTION, not absolute numbers.', '(2) Ask them to list three social relations that change when density crosses a threshold (e.g., waste disposal requires.', 'city comparison table in the textbook (pp.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Gentrification improves urban neighbourhoods." Use the textbook\'s description of gentrification and its effects on different social.', answer: 'The statement is partially true but sociologically incomplete',
                  options: ['The statement is partially true but sociologically incomplete', 'urbanisation just means more people moving to cities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.' },
                { id: 'b', prompt: 'Create a hypothetical but realistic scenario showing how a technological change in urban transport (e.g., a new Metro line) could trigger a chain of social.', answer: 'Example: A new Metro line connects a distant suburb to the CBD',
                  options: ['Example: A new Metro line connects a distant suburb to the CBD', 'urbanisation just means more people moving to cities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.' }
          ],
            remediations: { 'urbanisation-just-means-more-people': { steps: ['If the student conflates urbanisation with mere population growth: (1) Have them re-read the textbook\'s definition of.', 'lives in urban rather than rural areas" – emphasise PROPORTION, not absolute numbers.', '(2) Ask them to list three social relations that change when density crosses a threshold (e.g., waste disposal requires.', 'city comparison table in the textbook (pp.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_009', difficulty: 'standard',
          question: 'MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act, 2005) is a.',
          hint: 'Revisit the section "Social Order and Social Change in Rural Areas" in the textbook.',
          misconception: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee*.',
          parts: [
                { id: 'a', prompt: 'State the core legal entitlement that MGNREGA provides to a rural household, and name the level of government primarily responsible for its implementation.', answer: 'MGNREGA guarantees 100 days of wage employment per financial year to every rural',
                  options: ['MGNREGA guarantees 100 days of wage employment per financial year to every rural', '200 days', 'implemented by the District Collector alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee* programme requiring.' },
                { id: 'b', prompt: 'In a village where the dominant caste controls the only irrigation source, landless labourers previously accepted 150/day (below the state minimum of 250).', answer: 'The landlord must now offer at least 250/day to attract workers',
                  options: ['The landlord must now offer at least 250/day to attract workers', 'landlords will ignore MGNREGA', 'MGNREGA gives free cash to the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee* programme requiring.' }
          ],
            remediations: { 'mgnrega-is-just-a-cash': { steps: ['If a student conflates MGNREGA with cash transfers, ask them to list the *conditions* for receiving wages: (1).', 'Then contrast with a cash transfer (e.g., PM-KISAN) where no labour is required.', 'Use a concrete village scenario: "If a landlord\'s son registers, will he get wages without working?" This reveals the.', 'Finally, have them read the NCERT Activity 5 prompt and answer each sub-question using the textbook\'s framework of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
