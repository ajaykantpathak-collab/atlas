import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch07_p2: SimDef = {
    id: 'v3_c11_hs_ch07_p2',
    title: 'Human Development · Part 2/2',
    subtitle: 'Redefine health beyond \'not sick\' — and learn why the smallest clinic guards the biggest hospital.',
    classLevel: 11, subject: 'home_science', topic: 'Human Development · Part 2/2',
    chapters: ['c11_hs_ch07'],
    nodeIds: ['c11_hs_cbse_07_007', 'c11_hs_cbse_07_008', 'c11_hs_cbse_07_009', 'c11_hs_cbse_07_010', 'c11_hs_cbse_07_011', 'c11_hs_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a health-systems planner assigning patients to tiers', intro: 'Fever at dawn — big hospital or small centre? The wrong answer costs the system, and sometimes the patient.', goal: 'Apply the WHO definition of health and India\'s three-tier referral system.' },
    discovery: {
        question: 'A student scores 95%, has no friends, feels anxious daily and gets breathless on stairs — is she healthy?',
        options: ['No — WHO defines health as complete physical, mental AND social well-being; she\'s failing on all three counts', 'Yes — she has no diagnosed disease', 'Yes — academic fitness is what matters', 'No — but only the breathlessness counts'],
        answer: 'No — WHO defines health as complete physical, mental AND social well-being; she\'s failing on all three counts',
        hook: 'Vaccination programs fix one dimension — a jab can\'t counsel anxiety or seat a lonely child at a lunch table.',
    },
    teaching: [
        { title: 'Personal Hygiene: Components and Importance', text: 'Personal hygiene refers to the set of practices performed by an individual to maintain bodily cleanliness, prevent disease transmission, and promote physical, mental, and social well-being through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Route a village child\'s diarrhoea through the three tiers of care, then diagnose what failed when a heart-attack patient bypassed the PHC for a medical college 80 km away.',
        labels: ['Personal Hygiene: Components', 'Environmental Hygiene, Sanitation', 'Time as a Resource', 'Space Management: Principles', 'Work Simplification: Three Levels', 'Indian Textile Traditions: Cotton,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_007', title: 'Personal Hygiene: Components and Importance',
          caseStudy: { intro: 'Imagine you wake up with a sticky mouth, oily hair, and dirt under your fingernails—would you feel confident sitting next to your friend in class?',
            decisions: [{ prompt: 'Define personal hygiene in one sentence using the WHO health dimensions (physical, mental, social).', options: [
                { text: 'Personal hygiene is the practice of maintaining bodily cleanliness to preserve physical', outcome: 'Personal hygiene is the practice of maintaining bodily cleanliness to preserve physical health.' },
                { text: 'bathing daily', outcome: 'Not quite — Students believe "personal hygiene = bathing daily + using deodorant" because advertisements equate.', reveals: 'personal-hygiene-bathing-daily-using' },
                { text: 'looking clean', outcome: 'Not quite — Students believe "personal hygiene = bathing daily + using deodorant" because advertisements equate.', reveals: 'personal-hygiene-bathing-daily-using' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_008', title: 'Environmental Hygiene, Sanitation and Food Hygiene',
          caseStudy: { intro: 'Imagine you visit a relative\'s home in a peri-urban area where the municipal water supply runs only two hours daily, so families store water in open drums; the.',
            decisions: [{ prompt: 'List the eight components of environmental hygiene as shown in Figure 4 of the NCERT textbook, and for each component name one specific.', options: [
                { text: 'The eight components are: (1) Water supply → diarrhoea, cholera, typhoid, hepatitis A', outcome: 'The eight components are: (1) Water supply → diarrhoea, cholera, typhoid, hepatitis A; (2) Housing.' },
                { text: 'environmental hygiene', outcome: 'Not quite — Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that.', reveals: 'environmental-hygiene-and-personal-hygiene' },
                { text: 'personal hygiene', outcome: 'Not quite — Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that.', reveals: 'environmental-hygiene-and-personal-hygiene' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_009', title: 'Time as a Resource: Characteristics and Time Management Planning',
          caseStudy: { intro: 'Imagine you have a Class 11 student who wakes up at 6 AM, rushes to school without breakfast, returns at 3 PM exhausted, spends 4 hours scrolling social media.',
            decisions: [{ prompt: 'A student says: "I have 24 hours like everyone else, but I still can\'t finish my work.', options: [
                { text: 'The two characteristics are: (1) Time is limited (fixed 24 hours/day) and (2) Time is', outcome: 'The two characteristics are: (1) Time is limited (fixed 24 hours/day) and (2) Time is irreversible.' },
                { text: 'time management = filling every minute with productive work', outcome: 'Not quite — Students believe "time management = filling every minute with productive work" and equate a packed.', reveals: 'time-management-filling-every-minute' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_010', title: 'Space Management: Principles of Space Planning for Homes',
          caseStudy: { intro: 'Imagine you are helping your family reorganize your home because your grandmother has moved in and needs a quiet, accessible room near the bathroom, while your.',
            decisions: [{ prompt: 'Define the principle of \'Grouping\' in space planning and give one correct example of room grouping in a residential house.', options: [
                { text: 'Grouping means arranging rooms in relation to each other based on functional affinity so', outcome: 'Grouping means arranging rooms in relation to each other based on functional affinity so that.' },
                { text: 'grouping means putting all bedrooms together', outcome: 'Not quite — Students often treat the ten principles as a decorative checklist (e.g., "add a plant for.', reveals: 'students-often-treat-the-ten' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_011', title: 'Work Simplification: Three Levels of Change',
          caseStudy: { intro: 'Imagine you are helping your mother prepare dinner after a long school day — you notice she makes five separate trips to the pantry for spices, washes each.',
            decisions: [{ prompt: 'State the NCERT definition of work simplification and name the two resources it explicitly aims to blend and manage.', options: [
                { text: 'Work simplification is the conscious seeking of the simplest, easiest, and quickest', outcome: 'Work simplification is the conscious seeking of the simplest, easiest, and quickest method of doing.' },
                { text: 'conscious seeking', outcome: 'Not quite — Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and.', reveals: 'the-three-levels-must-be' },
                { text: 'money and space', outcome: 'Not quite — Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and.', reveals: 'the-three-levels-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_012', title: 'Indian Textile Traditions: Cotton, Silk and Wool Heritage',
          caseStudy: { intro: 'Imagine you are visiting a museum exhibition titled "Threads of Time" displaying a 5000-year-old terracotta spindle from Mohenjo-Daro, a fragment.',
            decisions: [{ prompt: 'Name the three main natural fibres that form the foundation of traditional Indian textile production according to the NCERT textbook.', options: [
                { text: 'The three main natural fibres are cotton, silk, and wool', outcome: 'The three main natural fibres are cotton, silk, and wool. A wrong answer (e.g., including jute.' },
                { text: 'tie-and-dye', outcome: 'Not quite — Students often believe that "ikat" and "tie-and-dye" are synonymous terms for the same process.', reveals: 'ikat-and-tie-and-dye' },
                { text: '"ikat" and "tie-and-dye" are synonymous terms for the same process', outcome: 'Not quite — Students often believe that "ikat" and "tie-and-dye" are synonymous terms for the same process.', reveals: 'ikat-and-tie-and-dye' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Human Development · Part 2/2', spots: [
            { id: 's1', label: 'Personal Hygiene Components and Importance', prompt: 'Which idea is this? — Personal hygiene refers to the set of practices performed by an individual to maintain.', answer: 'Personal Hygiene Components and Importance', options: ['Personal Hygiene Components and Importance', 'Environmental Hygiene Sanitation and Food Hygiene', 'Space Management Principles of Space Planning for Homes', 'Work Simplification Three Levels of Change'] },
            { id: 's2', label: 'Environmental Hygiene Sanitation and Food Hygiene', prompt: 'Which idea is this? — Environmental hygiene refers to the comprehensive set of practices and conditions in the.', answer: 'Environmental Hygiene Sanitation and Food Hygiene', options: ['Environmental Hygiene Sanitation and Food Hygiene', 'Personal Hygiene Components and Importance', 'Space Management Principles of Space Planning for Homes', 'Work Simplification Three Levels of Change'] },
            { id: 's3', label: 'Space Management Principles of Space Planning for Homes', prompt: 'Which idea is this? — Space management is the systematic process of planning, organizing, implementing, and.', answer: 'Space Management Principles of Space Planning for Homes', options: ['Space Management Principles of Space Planning for Homes', 'Personal Hygiene Components and Importance', 'Environmental Hygiene Sanitation and Food Hygiene', 'Work Simplification Three Levels of Change'] },
            { id: 's4', label: 'Work Simplification Three Levels of Change', prompt: 'Which idea is this? — Work simplification is the conscious seeking of the simplest, easiest, and quickest.', answer: 'Work Simplification Three Levels of Change', options: ['Work Simplification Three Levels of Change', 'Personal Hygiene Components and Importance', 'Environmental Hygiene Sanitation and Food Hygiene', 'Space Management Principles of Space Planning for Homes'] },
            { id: 's5', label: 'Indian Textile Traditions Cotton Silk and Wool Heritage', prompt: 'Which idea is this? — Indian Textile Traditions: Cotton, Silk and Wool Heritage refers to the historically.', answer: 'Indian Textile Traditions Cotton Silk and Wool Heritage', options: ['Indian Textile Traditions Cotton Silk and Wool Heritage', 'Personal Hygiene Components and Importance', 'Environmental Hygiene Sanitation and Food Hygiene', 'Space Management Principles of Space Planning for Homes'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a community-health volunteering orientation, a trainee says: \'The topper who is anxious and friendless is healthy — no disease. And our tier system is simple: primary for small illness, tertiary for serious ones — a severe pneumonia is tertiary.\'',
            decisions: [{ prompt: 'How should the trainer correct the briefing?', options: [
                { text: 'Apply the WHO frame: health is complete physical, mental AND social well-being — not merely absence of disease; the anxious, isolated topper fails two dimensions. And tiers are system functions, not severity labels: primary is first contact, secondary is referred specialist care, tertiary is super-speciality intensive care — severe pneumonia managed by a district physician is secondary, gatekeeping keeps AIIMS for what only AIIMS can do.', outcome: 'The orientation lands both points: dimensions interlock (anaemia hits mood and school attendance), and referral is upward by function — not a severity ladder.' },
                { text: 'Keep \'healthy\' for the topper — no diagnosis means healthy; the rest is lifestyle.', outcome: 'The definition explicitly says NOT merely absence of disease: mental and social well-being are constitutive, not optional add-ons.', reveals: 'no-disease-means-healthy' },
                { text: 'Keep the severity ladder — serious illness should go straight to the top tier.', outcome: 'Tier is about level of specialisation and referral pathway, not how ill you are — walk-in colds at tertiary centres is exactly the overload the system prevents.', reveals: 'tiers-are-disease-severity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'Each tier gatekeeps the one above — when every fever lands at AIIMS, the system fails the patient who needed it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_007', difficulty: 'standard',
          question: 'Personal hygiene refers to the set of practices performed by an individual.',
          hint: 'Revisit c11_hs_cbse_07_006 "Nutrition-Infection Cycle and Four Factors of Nutritional.',
          misconception: 'Students believe "personal hygiene = bathing daily + using deodorant" because advertisements equate hygiene with.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student argues: "I shower daily, so my personal hygiene is perfect." Identify two specific components this statement ignores and explain why each.', answer: 'The statement ignores (1) oral hygiene—adolescents have higher sugar intake and',
                  options: ['The statement ignores (1) oral hygiene—adolescents have higher sugar intake and', 'using deodorant', 'washing hair', 'personal hygiene = bathing daily + using deodorant'],
                  hint: 'Revisit c11_hs_cbse_07_006 "Nutrition-Infection Cycle and Four Factors of Nutritional Well-being".',
                  misconception: 'Students believe "personal hygiene = bathing daily + using deodorant" because advertisements equate hygiene with fragrance and social.' }
          ],
            remediations: { 'personal-hygiene-bathing-daily-using': { steps: ['Swab their dominant hand before/after washing with soap vs. using sanitiser only; culture on nutrient agar (school lab).', 'After 24h, compare colony counts—soap-water shows >90% reduction; sanitiser on dirty hands shows minimal reduction.', 'Link colonies to specific pathogens: yellow clusters = Staphylococcus aureus (boils, food poisoning); spreading.', 'Have them calculate "microbial load reduction %" for each method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "personal hygiene = bathing daily + using deodorant" because advertisements equate hygiene with.',
          parts: [
                { id: 'a', prompt: 'Evaluate this school policy: "Students must carry hand sanitiser (70% alcohol) and use it before every meal.', answer: 'The policy is flawed',
                  options: ['The policy is flawed', 'germ-killing', 'personal hygiene = bathing daily + using deodorant'],
                  hint: 'Revisit c11_hs_cbse_07_006 "Nutrition-Infection Cycle and Four Factors of Nutritional Well-being".',
                  misconception: 'Students believe "personal hygiene = bathing daily + using deodorant" because advertisements equate hygiene with fragrance and social.' }
          ],
            remediations: { 'personal-hygiene-bathing-daily-using': { steps: ['Swab their dominant hand before/after washing with soap vs. using sanitiser only; culture on nutrient agar (school lab).', 'After 24h, compare colony counts—soap-water shows >90% reduction; sanitiser on dirty hands shows minimal reduction.', 'Link colonies to specific pathogens: yellow clusters = Staphylococcus aureus (boils, food poisoning); spreading.', 'Have them calculate "microbial load reduction %" for each method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_008', difficulty: 'standard',
          question: 'Environmental hygiene refers to the comprehensive set of practices and.',
          hint: 'Revisit c11_hs_cbse_07_007 (Personal Hygiene) and Table 2 in the textbook; practice.',
          misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Environmental hygiene refers to the comprehensive set of practices and conditions in the',
                  options: ['Environmental hygiene refers to the comprehensive set of practices and conditions in the', 'Health, as defined by the World Health Organization (WHO), is a state of complete', 'Health care delivery in India operates through a three-tiered referral system: Primary', 'Health indicators are quantifiable measures used to assess the health status of a'],
                  hint: 'Revisit c11_hs_cbse_07_007 (Personal Hygiene) and Table 2 in the textbook; practice sorting 10.',
                  misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only means "keeping.' }
          ],
            remediations: { 'environmental-hygiene-and-personal-hygiene': { steps: ['Have the student re-read Table 2 (Intrinsic vs Extrinsic factors) and highlight every extrinsic factor that.', 'Give a 2-column sorting exercise—15 items (e.g., "handwashing", "covered drain", "vaccination", "fly screen".', 'For each extrinsic item, student draws the transmission pathway it blocks (e.g., covered drain → blocks mosquito.', 'Student rewrites their definition of environmental hygiene using only extrinsic factors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_009', difficulty: 'standard',
          question: 'Time management is the systematic process of planning, prioritising, and.',
          hint: 'If stuck, revisit Class 10 Biology "Control and Coordination" (c10_bio_cbse_02_004) for.',
          misconception: 'Students believe "time management = filling every minute with productive work" and equate a packed schedule with good.',
          parts: [
                { id: 'a', prompt: 'Compare the time plan of the Class XII student (p.112) and the rural homemaker (p.113). Both have "rest periods" but at different times and durations.', answer: 'Student: 1-hour nap (3–4 PM) after school',
                  options: ['Student: 1-hour nap (3–4 PM) after school', 'time management = filling every minute with productive work'],
                  hint: 'If stuck, revisit Class 10 Biology "Control and Coordination" (c10_bio_cbse_02_004) for.',
                  misconception: 'Students believe "time management = filling every minute with productive work" and equate a packed schedule with good management.' }
          ],
            remediations: { 'time-management-filling-every-minute': { steps: ['If a student presents a generic/copied plan: (1) Have them redo Activity 1 (p.109) honestly — score each item 1–5.', '(2) Identify their lowest-scoring items (e.g., Q4: "separate time for planning," Q8: "extra margin for unexpected").', '(3) Build a 3-day time LOG (not plan) — actual 30-min blocks.', '(4) Overlay their work curve: mark energy levels 1–10 per block.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_010', difficulty: 'standard',
          question: 'Space management is the systematic process of planning, organizing.',
          hint: 'If stuck, revisit c11_hs_cbse_07_009 (Time Management) and re-read the "Steps in time and.',
          misconception: 'Students often treat the ten principles as a decorative checklist (e.g., "add a plant for elegance," "use light paint.',
          parts: [
                { id: 'a', prompt: 'Analyze the relationship between the principles of Sanitation (light, ventilation, cleanliness) and Circulation in a house where the only bathroom is accessed.', answer: 'Risk 1: Moisture and odors from the bathroom flow directly into the cooking area',
                  options: ['Risk 1: Moisture and odors from the bathroom flow directly into the cooking area', 'bad smell'],
                  hint: 'If stuck, revisit c11_hs_cbse_07_009 (Time Management) and re-read the "Steps in time and activity.',
                  misconception: 'Students often treat the ten principles as a decorative checklist (e.g., "add a plant for elegance," "use light paint for roominess").' }
          ],
            remediations: { 'students-often-treat-the-ten': { steps: ['If a student cannot distinguish planning from arrangement, do this 3-step remediation: (1) Give them a blank rectangle.', '(2) Have them label each opening/wall with the principle it serves (e.g., "east window → Aspect," "toilet door off.', '(3) Ask: "If you move the kitchen here, which two principles break and why?" Force them to trace the chain: kitchen.', 'Repeat with three different layouts until they articulate principles as **constraints on the building envelope**, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_011', difficulty: 'standard',
          question: 'Work simplification is the conscious seeking of the simplest, easiest, and.',
          hint: 'If unable to analyse a task into motions/tools/storage, revisit c11_hs_cbse_07_009 (Time.',
          misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3.',
          parts: [
                { id: 'a', prompt: 'A student says: "Using a pressure cooker instead of an open pot is a change in hand and body motions because you stir less." Is this correct?', answer: 'This is incorrect',
                  options: ['This is incorrect', 'keeping the same work tools and product', 'better'],
                  hint: 'If unable to analyse a task into motions/tools/storage, revisit c11_hs_cbse_07_009 (Time.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because.' },
                { id: 'b', prompt: 'Your family currently buys whole wheat, takes it to the chakki for grinding, stores the atta in a steel container, and makes rotis daily.', answer: 'Level 1 (motions): Combine trips',
                  options: ['Level 1 (motions): Combine trips', 'buying readymade atta', 'better'],
                  hint: 'If unable to analyse a task into motions/tools/storage, revisit c11_hs_cbse_07_009 (Time.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because.' },
                { id: 'c', prompt: 'Compare and contrast "doing all dusting, then all sweeping, then all mopping" (like tasks together) versus "cleaning one room completely before moving to the.', answer: '"Doing like tasks together" better applies the rhythm and sequence principle',
                  options: ['"Doing like tasks together" better applies the rhythm and sequence principle', 'better'],
                  hint: 'If unable to analyse a task into motions/tools/storage, revisit c11_hs_cbse_07_009 (Time.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because.' }
          ],
            remediations: { 'the-three-levels-must-be': { steps: ['If a student insists levels are sequential or Level 3 is superior: (1) Have them time themselves making tea twice.', 'They\'ll see Level 1 saves ~40 seconds at zero cost.', '(2) Give a constraint scenario: "You\'re in a rented kitchen, cannot drill walls, family hates new foods — simplify.', '(3) Explicitly state: "The levels are a MENU, not a STAIRCASE.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_012', difficulty: 'standard',
          question: 'Indian Textile Traditions: Cotton, Silk and Wool Heritage refers to the.',
          hint: 'If stuck, revisit the "Three Main Fibres" subsection (7C.3) and create a three-column.',
          misconception: 'Students often believe that "ikat" and "tie-and-dye" are synonymous terms for the same process.',
          parts: [
                { id: 'a', prompt: 'Name the three main natural fibres that form the foundation of traditional Indian textile production according to the NCERT textbook.', answer: 'The three main natural fibres are cotton, silk, and wool',
                  options: ['The three main natural fibres are cotton, silk, and wool', 'tie-and-dye', '"ikat" and "tie-and-dye" are synonymous terms for the same process'],
                  hint: 'If stuck, revisit the "Three Main Fibres" subsection (7C.3) and create a three-column table: Fibre.',
                  misconception: 'Students often believe that "ikat" and "tie-and-dye" are synonymous terms for the same process.' },
                { id: 'b', prompt: 'A textile sample shows a pattern of diagonal stripes (laheria) on a cotton ground. The pattern was created by tying sections of the woven fabric before dyeing.', answer: 'This is fabric tie-and-dye (bandhani type), specifically laheria',
                  options: ['This is fabric tie-and-dye (bandhani type), specifically laheria', 'tie-and-dye', '"ikat" and "tie-and-dye" are synonymous terms for the same process'],
                  hint: 'If stuck, revisit the "Three Main Fibres" subsection (7C.3) and create a three-column table: Fibre.',
                  misconception: 'Students often believe that "ikat" and "tie-and-dye" are synonymous terms for the same process.' },
                { id: 'c', prompt: 'Compare and contrast the production process of a Patola double-ikat sari from Patan (Gujarat) with a Baluchar Butedar sari from Murshidabad (West Bengal).', answer: 'Patola: silk fibre',
                  options: ['Patola: silk fibre', 'pattern in the yarn', 'pattern added during/after weaving', 'tie-and-dye'],
                  hint: 'If stuck, revisit the "Three Main Fibres" subsection (7C.3) and create a three-column table: Fibre.',
                  misconception: 'Students often believe that "ikat" and "tie-and-dye" are synonymous terms for the same process.' }
          ],
            remediations: { 'ikat-and-tie-and-dye': { steps: ['Have the student physically simulate the two processes using graph paper.', 'Ask the student to explain why a Patola weaver must calculate the exact number of threads per pattern repeat before.', 'Show close-up images of Patola (sharp geometric edges from aligned yarns) and bandhani (soft, organic dots from fabric.', 'Assign a comparative table with columns: Stage of tying, Who ties (weaver vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
