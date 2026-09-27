import type { SimDef } from '../../engine/types';
import C11_CommerceClassificationHumanActivitiesSim from '../../../simulations/c6_12/C11_CommerceClassificationHumanActivitiesSim';

/** v3 wrapped master — C11_CommerceClassificationHumanActivitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_commerceclassificationhumanactivitiessim: SimDef = {
    id: 'v3w_c11_commerceclassificationhumanactivitiessim',
    title: 'Classification Human Activities',
    subtitle: 'This node covers the definition, nature (four characteristics), and causes (four.',
    classLevel: 11, subject: 'business_studies', topic: 'Business Risk: Nature and Causes',
    chapters: [],
    nodeIds: ['c11_bs_cbse_01_010', 'c11_bs_cbse_05_003', 'c11_bs_cbse_05_001', 'c11_bs_cbse_05_004', 'c11_bs_cbse_01_002', 'c11_bs_cbse_01_003', 'c11_bs_cbse_01_004', 'c11_bs_cbse_01_005', 'c11_bs_cbse_04_001', 'c11_bs_cbse_04_008', 'c11_bs_cbse_05_006', 'c11_bs_cbse_05_008', 'c11_bs_cbse_04_006', 'c11_bs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you start a small cloud kitchen business selling biryani.', goal: 'Master Classification Human Activities.' },
    discovery: {
        question: 'Define business risk as per NCERT Class 11. How does it differ from the general dictionary meaning of "risk"?',
        options: ['Business risk is the possibility of inadequate profits or losses due to', 'risk of losing money in stock market', 'business risk = probability of loss'],
        answer: 'Business risk is the possibility of inadequate profits or losses due to',
        hook: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math.',
    },
    teaching: [
        { title: 'Business risk refers to the possibility of.', text: 'Business risk refers to the possibility of inadequate profits or even losses due to uncertainties and unexpected events that are inherent in every business activity, where profit serves as the reward.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_01_010', title: 'Business risk refers to the possibility.',
          scaffold: { problem: '"GreenThread" is a startup making eco-friendly bags from banana fibre.',
            steps: [
            { text: 'Identify the four cause categories from NCERT: Natural, Human, Economic, Other.' },
            { text: 'Analyse Event 1 — cyclone is a natural calamity, humans have little control → Natural cause.' },
            { text: 'Analyse Event 2 — artisans leaving is human behaviour (carelessness/negligence not applicable, but "human causes.' },
            { text: 'Analyse Event 3 — government subsidy changing relative prices is a change in economic policy/market condition →.' },
            { text: 'Analyse Event 4 — machine breakdown due to poor maintenance is a mechanical failure (other causes include "mechanical.' },
            { text: 'Verify each classification matches NCERT definitions exactly, not general English meanings.', faded: true, blankAnswer: '(1) Natural cause — cyclone is a natural calamity beyond.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_003', title: 'The scope of e-business is classified.',
          scaffold: { problem: 'A Mumbai-based furniture manufacturer "UrbanWood" receives a custom order from a retail chain "HomeStyle" for 500 ergonomic chairs.',
            steps: [
            { text: 'Identify Transaction 1 — HomeStyle (retail chain = business) places order with UrbanWood (manufacturer = business).' },
            { text: 'Identify Transaction 2 — UrbanWood procurement checks inventory via intranet.' },
            { text: 'Identify Transaction 3 — UrbanWood orders frames from FrameCraft (vendor = business). Both firms → B2B.' },
            { text: 'Identify Transaction 4 — Production team assembles after intranet notification.' },
            { text: 'Identify Transaction 5 — Logistics books truck on BlackBuck. Parties: UrbanWood (business) and truck owner.' },
            { text: 'Identify Transaction 6 — HomeStyle pays UrbanWood via RTGS. Payment settlement between two firms → B2B (financial.', faded: true, blankAnswer: '1. B2B | 2. Intra-B | 3. B2B | 4. Intra-B | 5. B2C (firm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_001', title: 'E-business is the conduct of industry,.',
          scaffold: { problem: 'A furniture manufacturer "WoodCraft" receives an online order from a retail chain "HomeStyle" for 500 chairs.',
            steps: [
            { text: 'Identify the transacting parties for each action — WoodCraft (manufacturer) is the central firm.' },
            { text: 'Action 1: WoodCraft → GreenWood. Both are business firms. This is procurement of inputs. Classification: B2B.' },
            { text: 'Action 2: Production scheduling involves WoodCraft\'s sales order data flowing to production department via intranet.' },
            { text: 'Action 3: Inventory allocation involves warehouse system (internal) updating stock levels. Internal parties.' },
            { text: 'Action 4: Invoicing to HomeStyle. WoodCraft (business) to HomeStyle (business). Classification: B2B.' },
            { text: 'Action 5: Dispatch coordination with FastMove. WoodCraft (business) to logistics partner (business).', faded: true, blankAnswer: 'Action 1: B2B; Action 2: Intra-B; Action 3: Intra-B; Action.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_004', title: 'E-business vs Traditional Business.',
          scaffold: { problem: '"GreenLeaf Organics" sells fresh vegetables. Traditional: Owns a 500 sq.ft shop in a local market, 3 staff, opens 9 AM–9 PM, serves 2 km.',
            steps: [
            { text: 'Identify the two models: Traditional (physical shop) vs E-business (online platform with farm tie-ups).' },
            { text: 'For each basis, extract relevant details from the case. (a) Setting up: Shop rent, interior, licenses vs website.' },
            { text: 'Map each to Table 5.1 language: (a) High vs Low, (b) High fixed charges vs Low (network relationships), (c) Indirect.' },
            { text: 'Synthesize: Traditional better for trust-building via touch; E-business better for reach, convenience, lower fixed cost.' },
            { text: 'Verify: Does each comparison align with NCERT basis definitions? Yes.', faded: true, blankAnswer: '(a) Traditional: High (rent, interior); E-business: Low.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_01_002', title: 'Business, profession, and employment.',
          scaffold: { problem: 'Ravi completed B.Tech and works as a software developer at Infosys.',
            steps: [
            { text: 'Identify the three individuals and their roles — Ravi (employee at Infosys), Sameer (founder of app company), Neha.' },
            { text: 'Recall the nine criteria from the distinction table; select the four required: mode of establishment, qualification,.' },
            { text: 'For Ravi — Mode: appointment letter/service agreement; Qualification: as prescribed by employer (B.Tech); Reward:.' },
            { text: 'For Sameer — Mode: entrepreneur\'s decision + company registration; Qualification: no minimum qualification necessary;.' },
            { text: 'For Neha — Mode: Bar Council membership + certificate of practice; Qualification: LLB + Bar exam (prescribed by.' },
            { text: 'Classify: Ravi = Employment, Sameer = Business, Neha = Profession. Verify each matches the definitional criteria.', faded: true, blankAnswer: 'Ravi — Employment; Sameer — Business; Neha — Profession.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_01_003', title: 'Business is an economic activity.',
          scaffold: { problem: 'Anjali, a homemaker, starts making pickles at home. In Month 1, she makes 5 kg, sells 4 kg to neighbours at ₹200/kg, keeps 1 kg.',
            steps: [
            { text: 'Identify the activity — Anjali produces pickles and sells them for money.' },
            { text: 'Test Characteristic 1 (Economic activity): She sells to earn money, not for family consumption only → YES.' },
            { text: 'Test Characteristic 2 (Production/procurement): She produces pickles herself → YES.' },
            { text: 'Test Characteristic 3 (Sale/exchange): She sells pickles for ₹200/kg and ₹180/kg → YES.' },
            { text: 'Test Characteristic 4 (Regularity): Month 1, 2, 3 — continuous monthly activity → YES.' },
            { text: 'Test Characteristic 5 (Profit motive): Prices set to cover cost and earn surplus → YES.' },
            { text: 'Test Characteristic 6 (Uncertainty of return): Month 2 spoilage, Month 3 cancellation — return not certain → YES.' },
            { text: 'Test Characteristic 7 (Element of risk): Spoilage, order cancellation, power cut — risk of loss present → YES.' },
            { text: 'All seven satisfied → Classify as business.', faded: true, blankAnswer: 'Anjali\'s pickle-making is a business activity because it.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_05_003', title: 'Identify each idea',
          dissect: { specimen: 'Classification Human Activities', spots: [
            { id: 's1', label: 'Business risk refers to the', prompt: 'Which idea is this? — Business risk refers to the possibility of inadequate profits or even losses due to.', answer: 'Business risk refers to the', options: ['Business risk refers to the', 'The scope of e-business is', 'E-business is the conduct of', 'E-business vs Traditional Business comparison'] },
            { id: 's2', label: 'The scope of e-business is', prompt: 'Which idea is this? — The scope of e-business is classified by the nature of transacting parties into four.', answer: 'The scope of e-business is', options: ['The scope of e-business is', 'Business risk refers to the', 'E-business is the conduct of', 'E-business vs Traditional Business comparison'] },
            { id: 's3', label: 'E-business is the conduct of', prompt: 'Which idea is this? — E-business is the conduct of industry, trade, and commerce using computer networks.', answer: 'E-business is the conduct of', options: ['E-business is the conduct of', 'Business risk refers to the', 'The scope of e-business is', 'E-business vs Traditional Business comparison'] },
            { id: 's4', label: 'E-business vs Traditional Business comparison', prompt: 'Which idea is this? — E-business vs Traditional Business comparison is the systematic analysis of how business.', answer: 'E-business vs Traditional Business comparison', options: ['E-business vs Traditional Business comparison', 'Business risk refers to the', 'The scope of e-business is', 'E-business is the conduct of'] },
            { id: 's5', label: 'Business profession and employment are', prompt: 'Which idea is this? — Business, profession, and employment are three distinct categories of economic.', answer: 'Business profession and employment are', options: ['Business profession and employment are', 'Business risk refers to the', 'The scope of e-business is', 'E-business is the conduct of'] },
            { id: 's6', label: 'Business is an economic activity', prompt: 'Which idea is this? — Business is an economic activity involving the regular production, procurement, and.', answer: 'Business is an economic activity', options: ['Business is an economic activity', 'Business risk refers to the', 'The scope of e-business is', 'E-business is the conduct of'] }
          ] } }
    ],
    explore: { component: C11_CommerceClassificationHumanActivitiesSim, prompt: 'Explore the interactive — Classification Human Activities' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_010', difficulty: 'standard',
          question: 'Business risk refers to the possibility of inadequate profits or even losses.',
          hint: 'If stuck, revisit c11_bs_cbse_01_003 (Business Characteristics) — specifically the.',
          misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math.',
          parts: [
                { id: 'a', prompt: 'Define business risk as per NCERT Class 11. How does it differ from the general dictionary meaning of "risk"?', answer: 'Business risk is the possibility of inadequate profits or losses due to',
                  options: ['Business risk is the possibility of inadequate profits or losses due to', 'risk of losing money in stock market', 'business risk = probability of loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math probability problem.' },
                { id: 'b', prompt: 'A farmer grows wheat. Classify each event into the four cause categories: (a) Flood destroys crop, (b) Labourers go on strike during harvest, (c) Government.', answer: 'Flood destroys crop, (',
                  options: ['Flood destroys crop, (', 'business risk = probability of loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math probability problem.' }
          ],
            remediations: { 'business-risk-probability-of-loss': { steps: ['Ask the student to list 5 uncertainties in a tea stall business (weather, milk price, customer taste, power cut, staff.', 'Have them categorise each into natural/human/economic/other using the NCERT definitions.', 'Explicitly contrast: "In math, risk = P(loss) × Amount. In business, risk = the UNCERTAINTY ITSELF that creates the.', 'Give a case where probability is unknown (e.g., new government policy) — ask "What is the probability?" to show it\'s.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math.',
          parts: [
                { id: 'a', prompt: '"Large businesses always face higher risk than small businesses." Evaluate this statement using the NCERT principle on \'degree of risk\'.', answer: 'Not always',
                  options: ['Not always', 'business risk = probability of loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math probability problem.' },
                { id: 'b', prompt: 'Create a mini-case study (3-4 sentences) of a business facing simultaneous risks from THREE different cause categories. Label each risk with its category.', answer: 'Example: "Rohan runs a hill-station cafe',
                  options: ['Example: "Rohan runs a hill-station cafe', 'business risk = probability of loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math probability problem.' }
          ],
            remediations: { 'business-risk-probability-of-loss': { steps: ['Ask the student to list 5 uncertainties in a tea stall business (weather, milk price, customer taste, power cut, staff.', 'Have them categorise each into natural/human/economic/other using the NCERT definitions.', 'Explicitly contrast: "In math, risk = P(loss) × Amount. In business, risk = the UNCERTAINTY ITSELF that creates the.', 'Give a case where probability is unknown (e.g., new government policy) — ask "What is the probability?" to show it\'s.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_003', difficulty: 'standard',
          question: 'The scope of e-business is classified by the nature of transacting parties into.',
          hint: 'If stuck, revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) to.',
          misconception: 'Students consistently confuse the *firm\'s identity* with the *transaction\'s model*.',
          parts: [
                { id: 'a', prompt: 'A manufacturing firm uses its intranet to let the marketing department send customised order specifications directly to the production floor, and the HR.', answer: 'These are Intra-B commerce activities',
                  options: ['These are Intra-B commerce activities', 'e-commerce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse the *firm\'s identity* with the *transaction\'s model*.' }
          ],
            remediations: { 'students-consistently-confuse-the-firm': { steps: ['Give the student a single familiar company (e.g., Apple) and ask them to list ONE transaction for each model: B2B.', 'Have them identify the two parties and network for each.', 'Explicitly contrast: "The model name describes the transaction\'s parties, not the company."', 'Practice with 3 more companies (Amazon, Tata Motors, a local bakery with Instagram orders) until they can fluidly.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_001', difficulty: 'standard',
          question: 'E-business is the conduct of industry, trade, and commerce using computer.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the.',
          misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).',
          parts: [
                { id: 'a', prompt: 'Compare traditional business and e-business on the basis of: (i) nature of internal communication, (ii) business process cycle length, (iii) opportunity for.', answer: '(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct',
                  options: ['(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct', 'because'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).' }
          ],
            remediations: { 'students-equate-e-business-with': { steps: ['Ask the student to list *all* activities in a bakery from flour arrival to cake delivery.', 'For each activity, ask: "Can this be done via computer network connecting two parties?"', 'Identify the *parties* for each networked activity — are they both businesses (B2B)? Business and customer (B2C)?', 'Show that even without a customer-facing website, if the bakery\'s purchase, production, and accounts are on a shared.', 'Contrast with "website only" — a bakery with a pretty website but manual paper-based kitchen-inventory-accounting is.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).',
          parts: [
                { id: 'a', prompt: 'Compare traditional business and e-business on the basis of: (i) nature of internal communication, (ii) business process cycle length, (iii) opportunity for.', answer: '(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct',
                  options: ['(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct', 'because'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).' }
          ],
            remediations: { 'students-equate-e-business-with': { steps: ['Ask the student to list *all* activities in a bakery from flour arrival to cake delivery.', 'For each activity, ask: "Can this be done via computer network connecting two parties?"', 'Identify the *parties* for each networked activity — are they both businesses (B2B)? Business and customer (B2C)?', 'Show that even without a customer-facing website, if the bakery\'s purchase, production, and accounts are on a shared.', 'Contrast with "website only" — a bakery with a pretty website but manual paper-based kitchen-inventory-accounting is.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_004', difficulty: 'standard',
          question: 'E-business vs Traditional Business comparison is the systematic analysis of how.',
          hint: 'Revisit c11_bs_cbse_05_001 (E-business Meaning, Scope) and c6_economics_ch12_001 (What is.',
          misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.',
          parts: [
                { id: 'a', prompt: 'State any three bases of distinction between traditional business and e-business from NCERT Table 5.1.', answer: 'Any three from: Ease of formation, Physical presence, Locational',
                  options: ['Correct answer: Any three from: Ease of formation, Physical presence, Locational', 'profit margin', 'number of employees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' },
                { id: 'b', prompt: 'Explain in your own words why the "shape of organisational structure" differs between traditional business (vertical/tall) and e-business (horizontal/flat).', answer: 'Traditional business relies on hierarchical chain of command',
                  options: ['Correct answer: Traditional business relies on hierarchical chain of command', 'less managers', 'technology makes it flat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' },
                { id: 'c', prompt: 'A traditional bookstore owner wants to start selling online. Using the "Business processes and length of the cycle" basis, explain how the order-to-delivery.', answer: 'Traditional: Sequential cycle',
                  options: ['Correct answer: Traditional: Sequential cycle', 'faster delivery', 'e-business has no physical presence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' }
          ],
            remediations: { 'e-business-has-no-physical': { steps: ['Ask student to draw the value chain for a traditional bookstore (procure → store → display → sell → deliver) and an.', 'Have them circle every physical element in both chains (warehouse, delivery van, server room, packaging).', 'Explain: "Physical presence is not required *for the customer to browse and order*, but fulfilment remains physical for.', 'Practice writing qualified answers: "Physical storefront not required; however, warehousing and logistics.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "E-business completely eliminates the need for physical infrastructure." Defend or refute using at least three bases from Table 5.1.', answer: 'Refute',
                  options: ['Correct answer: Refute', 'virtual', 'zero physical assets', 'e-business has no physical presence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' }
          ],
            remediations: { 'e-business-has-no-physical': { steps: ['Ask student to draw the value chain for a traditional bookstore (procure → store → display → sell → deliver) and an.', 'Have them circle every physical element in both chains (warehouse, delivery van, server room, packaging).', 'Explain: "Physical presence is not required *for the customer to browse and order*, but fulfilment remains physical for.', 'Practice writing qualified answers: "Physical storefront not required; however, warehousing and logistics.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_002', difficulty: 'standard',
          question: 'Business, profession, and employment are three distinct categories of economic.',
          hint: 'Revisit Class 9 Economics Chapter 1 (Factors of Production) and Class 10 Economics.',
          misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify.',
          parts: [
                { id: 'a', prompt: 'A person sells homemade pickles once at a school fair and earns ₹2,000. Is this a business activity?', answer: 'No, this is not a business activity',
                  options: ['No, this is not a business activity', 'yes, because profit was earned', 'profession is just a high-skill job'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify a salaried software.' }
          ],
            remediations: { 'profession-is-just-a-high': { steps: ['If a student misclassifies, do NOT re-read the table.', 'Instead: 1) Pick one clear example (e.g., a lawyer vs.', '2) For each of the 9 criteria, ask: "Who decides the setup?', 'What qualification is mandatory?'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "A chartered accountant who sets up a CA firm with partners is running a business, not a profession." Defend or refute with reference to the.', answer: 'Refute',
                  options: ['Refute', 'profession is just a high-skill job', 'business is any profit-making activity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify a salaried software.' },
                { id: 'b', prompt: 'Create a realistic scenario of a person transitioning from employment to profession to business over their career.', answer: 'Example: Phase 1 (Employment): Rohan works as junior accountant at a firm',
                  options: ['Example: Phase 1 (Employment): Rohan works as junior accountant at a firm', 'profession is just a high-skill job', 'business is any profit-making activity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify a salaried software.' }
          ],
            remediations: { 'profession-is-just-a-high': { steps: ['If a student misclassifies, do NOT re-read the table.', 'Instead: 1) Pick one clear example (e.g., a lawyer vs.', '2) For each of the 9 criteria, ask: "Who decides the setup?', 'What qualification is mandatory?'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_003', difficulty: 'standard',
          question: 'Business is an economic activity involving the regular production, procurement,.',
          hint: 'If stuck, revisit c11_bs_cbse_01_002 (Concepts of Business, Profession and Employment).',
          misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.',
          parts: [
                { id: 'a', prompt: 'A student sells his old bicycle on OLX for a profit of ₹2,000. He argues this is a business activity because he earned a profit.', answer: 'Selling a personal bicycle once is a single transaction, not a regular dealing',
                  options: ['Selling a personal bicycle once is a single transaction, not a regular dealing', 'it is business because he made profit', 'it is not business'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.' },
                { id: 'b', prompt: 'Rahul, a Class 11 student, bakes cookies at home and sells them to classmates during lunch break every Friday for three months.', answer: 'This is a business activity',
                  options: ['This is a business activity', 'not business because he\'s', 'not business because it\'s small scale'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.' },
                { id: 'c', prompt: 'Compare the \'reward\' and \'risk\' characteristics of Business, Profession, and Employment using a table.', answer: '| Basis | Business | Profession | Employment |',
                  options: ['| Basis | Business | Profession | Employment |', 'profession has highest risk', 'business risk is only about fire/theft'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.' }
          ],
            remediations: { 'any-activity-involving-buying-and': { steps: ['Ask the student to list the seven characteristics from memory.', 'Present the "car sale" example and have them test each characteristic one by one: "Was it regular?', 'Highlight the two failed characteristics (regularity, uncertainty) and explain that business is a SYSTEM of repeated.', 'Give a new scenario (e.g., "A farmer grows wheat and sells at mandi every harvest") and have the student verify all.', 'Assign a "Characteristic Audit" worksheet with 10 varied scenarios (salaried job, street vendor, NGO volunteer, OLX.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
