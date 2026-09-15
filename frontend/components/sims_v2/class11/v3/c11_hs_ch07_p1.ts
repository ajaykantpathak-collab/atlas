import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch07_p1: SimDef = {
    id: 'v3_c11_hs_ch07_p1',
    title: 'Human Development · Part 1/2',
    subtitle: 'Redefine health beyond \'not sick\' — and learn why the smallest clinic guards the biggest hospital.',
    classLevel: 11, subject: 'home_science', topic: 'Human Development · Part 1/2',
    chapters: ['c11_hs_ch07'],
    nodeIds: ['c11_hs_cbse_07_001', 'c11_hs_cbse_07_002', 'c11_hs_cbse_07_003', 'c11_hs_cbse_07_004', 'c11_hs_cbse_07_005', 'c11_hs_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a health-systems planner assigning patients to tiers', intro: 'Fever at dawn — big hospital or small centre? The wrong answer costs the system, and sometimes the patient.', goal: 'Apply the WHO definition of health and India\'s three-tier referral system.' },
    discovery: {
        question: 'A student scores 95%, has no friends, feels anxious daily and gets breathless on stairs — is she healthy?',
        options: ['No — WHO defines health as complete physical, mental AND social well-being; she\'s failing on all three counts', 'Yes — she has no diagnosed disease', 'Yes — academic fitness is what matters', 'No — but only the breathlessness counts'],
        answer: 'No — WHO defines health as complete physical, mental AND social well-being; she\'s failing on all three counts',
        hook: 'Vaccination programs fix one dimension — a jab can\'t counsel anxiety or seat a lonely child at a lunch table.',
    },
    teaching: [
        { title: 'WHO Definition of Health and Dimensions of Well-being', text: 'Health, as defined by the World Health Organization (WHO), is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Route a village child\'s diarrhoea through the three tiers of care, then diagnose what failed when a heart-attack patient bypassed the PHC for a medical college 80 km away.',
        labels: ['WHO Definition of Health', 'Levels of Health Care', 'Health Indicators: Mortality, Morbidity', 'Nutrition-Health Interrelationship and Balanced', 'Malnutrition: Undernutrition, Overnutrition', 'Nutrition-Infection Cycle and Four'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_001', title: 'WHO Definition of Health and Dimensions of Well-being',
          caseStudy: { intro: 'Begin by asking: "If a student scores 95% in exams but has no friends, feels anxious daily, and gets breathless climbing stairs—would you call them healthy?".',
            decisions: [{ prompt: 'State the exact WHO definition of health as given in your NCERT textbook, including all three dimensions and the qualifying phrase about.', options: [
                { text: 'Correct answer: "Health is a state of complete physical, mental and social well-being and', outcome: 'Correct answer: "Health is a state of complete physical, mental and social well-being and not.' },
                { text: 'A wrong answer typically omits', outcome: 'Not quite — Students equate "health" with "physical fitness" or "absence of diagnosed disease," treating mental.', reveals: 'students-equate-health-with-physical' },
                { text: 'clause', outcome: 'Not quite — Students equate "health" with "physical fitness" or "absence of diagnosed disease," treating mental.', reveals: 'students-equate-health-with-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_002', title: 'Levels of Health Care Delivery: Primary, Secondary and Tertiary',
          caseStudy: { intro: 'Imagine you wake up with a high fever and body ache – where do you go first?',
            decisions: [{ prompt: 'A student states: "Primary Health Care is only about treating minor illnesses like cold and fever." Is this statement correct?', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. NCERT defines Primary Health Care as "the first level of contact.' },
                { text: 'primary', outcome: 'Not quite — Students believe "Primary = simple diseases, Secondary = medium diseases, Tertiary = severe.', reveals: 'primary-simple-diseases' },
                { text: 'simple treatment', outcome: 'Not quite — Students believe "Primary = simple diseases, Secondary = medium diseases, Tertiary = severe.', reveals: 'primary-simple-diseases' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_003', title: 'Health Indicators: Mortality, Morbidity and Quality of Life',
          caseStudy: { intro: 'Imagine you are a public health officer in a rural district of Maharashtra reviewing the annual health report.',
            decisions: [{ prompt: 'A Class 11 student states: "Mortality rate and morbidity rate are the same thing – both measure how many people are sick." Is this.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. Mortality rate measures the frequency of **deaths** in a defined.' },
                { text: 'higher life expectancy always means better health', outcome: 'Not quite — Students believe **"higher life expectancy always means better health"** and use it interchangeably.', reveals: 'higher-life-expectancy-always-means' },
                { text: 'healthy life expectancy (HALE)', outcome: 'Not quite — Students believe **"higher life expectancy always means better health"** and use it interchangeably.', reveals: 'higher-life-expectancy-always-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_004', title: 'Nutrition-Health Interrelationship and Balanced Diet',
          caseStudy: { intro: 'Imagine you skipped breakfast and ate only chips for lunch — by evening you feel irritable, tired, and your head aches.',
            decisions: [{ prompt: 'State the WHO definition of health and name its three dimensions. How does the textbook define "nutrition" in relation to health?', options: [
                { text: 'WHO defines health as "a state of complete physical, mental, and social well-being and', outcome: 'WHO defines health as "a state of complete physical, mental, and social well-being and not merely.' },
                { text: 'concerned with maintenance of body organs and tissues in structure and function', outcome: 'Not quite — Students believe "balanced diet" means eating equal quantities from each food group (e.g., one.', reveals: 'balanced-diet-means-eating-equal' },
                { text: 'growth and development of the body', outcome: 'Not quite — Students believe "balanced diet" means eating equal quantities from each food group (e.g., one.', reveals: 'balanced-diet-means-eating-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_005', title: 'Malnutrition: Undernutrition, Overnutrition and Deficiency Disorders',
          caseStudy: { intro: 'Imagine you are a community health worker visiting two households in the same village: in one, a 3-year-old child has a mid-upper arm circumference (MUAC).',
            decisions: [{ prompt: 'A 10-year-old boy has height-for-age Z-score (HAZ) of -2.5, weight-for-height Z-score (WHZ) of -1.2, and weight-for-age Z-score (WAZ).', options: [
                { text: 'Correct answer: Stunted (chronic undernutrition) but not wasted', outcome: 'Correct answer: Stunted (chronic undernutrition) but not wasted.' },
                { text: 'wasted', outcome: 'Not quite — Students often believe "malnutrition = undernutrition = thinness" and fail to recognise that.', reveals: 'malnutrition-undernutrition-thinness-and-fail' },
                { text: 'normal', outcome: 'Not quite — Students often believe "malnutrition = undernutrition = thinness" and fail to recognise that.', reveals: 'malnutrition-undernutrition-thinness-and-fail' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_006', title: 'Nutrition-Infection Cycle and Four Factors of Nutritional Well-being',
          caseStudy: { intro: 'Imagine a 3-year-old child in a rural Indian household who has had diarrhoea four times in the last six months. Each episode lasts 3-4 days.',
            decisions: [{ prompt: 'A REMEMBER level question: State the four factors of nutritional well-being as defined by WHO in the NCERT textbook, and give one specific.', options: [
                { text: 'The four factors are: (1) Food and Nutrient Security—e.g., the child receives adequate', outcome: 'The four factors are: (1) Food and Nutrient Security—e.g., the child receives adequate.' },
                { text: 'balanced diet, exercise, sleep, hygiene', outcome: 'Not quite — Students often believe the nutrition-infection cycle means "malnutrition causes infection" as.', reveals: 'the-nutrition-infection-cycle-means' },
                { text: 'malnutrition causes infection', outcome: 'Not quite — Students often believe the nutrition-infection cycle means "malnutrition causes infection" as.', reveals: 'the-nutrition-infection-cycle-means' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Development · Part 1/2', spots: [
            { id: 's1', label: 'WHO Definition of Health and Dimensions of Well-being', prompt: 'Which idea is this? — Health, as defined by the World Health Organization (WHO), is a state of complete.', answer: 'WHO Definition of Health and Dimensions of Well-being', options: ['WHO Definition of Health and Dimensions of Well-being', 'Health Indicators Mortality Morbidity and Quality of Life', 'Nutrition-Health Interrelationship and Balanced Diet'] },
            { id: 's2', label: 'Health Indicators Mortality Morbidity and Quality of Life', prompt: 'Which idea is this? — Health indicators are quantifiable measures used to assess the health status of.', answer: 'Health Indicators Mortality Morbidity and Quality of Life', options: ['Health Indicators Mortality Morbidity and Quality of Life', 'WHO Definition of Health and Dimensions of Well-being', 'Nutrition-Health Interrelationship and Balanced Diet'] },
            { id: 's3', label: 'Nutrition-Health Interrelationship and Balanced Diet', prompt: 'Which idea is this? — Nutrition-health interrelationship refers to the bidirectional linkage where adequate.', answer: 'Nutrition-Health Interrelationship and Balanced Diet', options: ['Nutrition-Health Interrelationship and Balanced Diet', 'WHO Definition of Health and Dimensions of Well-being', 'Health Indicators Mortality Morbidity and Quality of Life'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a community-health volunteering orientation, a trainee says: \'The topper who is anxious and friendless is healthy — no disease. And our tier system is simple: primary for small illness, tertiary for serious ones — a severe pneumonia is tertiary.\'',
            decisions: [{ prompt: 'How should the trainer correct the briefing?', options: [
                { text: 'Apply the WHO frame: health is complete physical, mental AND social well-being — not merely absence of disease; the anxious, isolated topper fails two dimensions. And tiers are system functions, not severity labels: primary is first contact, secondary is referred specialist care, tertiary is super-speciality intensive care — severe pneumonia managed by a district physician is secondary, gatekeeping keeps AIIMS for what only AIIMS can do.', outcome: 'The orientation lands both points: dimensions interlock (anaemia hits mood and school attendance), and referral is upward by function — not a severity ladder.' },
                { text: 'Keep \'healthy\' for the topper — no diagnosis means healthy; the rest is lifestyle.', outcome: 'The definition explicitly says NOT merely absence of disease: mental and social well-being are constitutive, not optional add-ons.', reveals: 'no-disease-means-healthy' },
                { text: 'Keep the severity ladder — serious illness should go straight to the top tier.', outcome: 'Tier is about level of specialisation and referral pathway, not how ill you are — walk-in colds at tertiary centres is exactly the overload the system prevents.', reveals: 'tiers-are-disease-severity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Each tier gatekeeps the one above — when every fever lands at AIIMS, the system fails the patient who needed it.',
            decisions: [{ prompt: 'What comes next? Human Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_001', difficulty: 'standard',
          question: 'Health, as defined by the World Health Organization (WHO), is a state.',
          hint: 'Revisit Class 8 Biology Chapter 2 "Health: Definition (Physical, Mental, and Social.',
          misconception: 'Students equate "health" with "physical fitness" or "absence of diagnosed disease," treating mental and social.',
          parts: [
                { id: 'a', prompt: 'Compare the NCERT\'s indicators of "positive mental health" with the common layperson\'s understanding of mental health as "not having a mental illness.".', answer: 'Three missed indicators: (1) "Can lead an independent life"',
                  options: ['Three missed indicators: (1) "Can lead an independent life"', 'health means no illness', 'NOT merely the absence of disease'],
                  hint: 'Revisit Class 8 Biology Chapter 2 "Health: Definition (Physical, Mental, and Social Well-Being)".',
                  misconception: 'Students equate "health" with "physical fitness" or "absence of diagnosed disease," treating mental and social dimensions as optional.' }
          ],
            remediations: { 'students-equate-health-with-physical': { steps: ['Have the student write the WHO definition from memory, then compare word-for-word with NCERT page 92.', 'Give them a 3-column table (Physical | Mental | Social) and three mini-cases.', 'For mental health, replace "symptom spotting" with "indicator checking"—give the 7 NCERT positive indicators as.', 'Explicitly drill: "Name two social determinants from NCERT and give one way each hurts social health." Repeat until.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "health" with "physical fitness" or "absence of diagnosed disease," treating mental and social.',
          parts: [
                { id: 'a', prompt: 'Critique this statement using the WHO definition and NCERT dimensions: "The government\'s free vaccination programme ensures the health of all children in the.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'nutrition', 'health means no illness', 'NOT merely the absence of disease'],
                  hint: 'Revisit Class 8 Biology Chapter 2 "Health: Definition (Physical, Mental, and Social Well-Being)".',
                  misconception: 'Students equate "health" with "physical fitness" or "absence of diagnosed disease," treating mental and social dimensions as optional.' }
          ],
            remediations: { 'students-equate-health-with-physical': { steps: ['Have the student write the WHO definition from memory, then compare word-for-word with NCERT page 92.', 'Give them a 3-column table (Physical | Mental | Social) and three mini-cases.', 'For mental health, replace "symptom spotting" with "indicator checking"—give the 7 NCERT positive indicators as.', 'Explicitly drill: "Name two social determinants from NCERT and give one way each hurts social health." Repeat until.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_002', difficulty: 'standard',
          question: 'Health care delivery in India operates through a three-tiered referral system.',
          hint: 'Revisit c11_hs_cbse_07_001 (WHO Definition of Health and Dimensions of Well-being).',
          misconception: 'Students believe "Primary = simple diseases, Secondary = medium diseases, Tertiary = severe diseases" – classifying.',
          parts: [
                { id: 'a', prompt: 'A student states: "Primary Health Care is only about treating minor illnesses like cold and fever." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'primary', 'simple treatment', 'first contact point for comprehensive care'],
                  hint: 'Revisit c11_hs_cbse_07_001 (WHO Definition of Health and Dimensions of Well-being) – specifically.',
                  misconception: 'Students believe "Primary = simple diseases, Secondary = medium diseases, Tertiary = severe diseases" – classifying by disease severity.' }
          ],
            remediations: { 'primary-simple-diseases': { steps: ['Draw the three-tier pyramid on paper – label each level with ONLY these words: Primary = "First Contact + Gatekeeper".', 'Take 5 local health facilities (Sub-Centre, PHC, CHC, District Hospital, Medical College) and place each on the pyramid.', 'Role-play: You are the Medical Officer at a PHC. A patient arrives with acute abdomen.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_003', difficulty: 'standard',
          question: 'Health indicators are quantifiable measures used to assess the health status.',
          hint: 'Revisit c11_hs_cbse_07_001 (WHO Definition of Health) – specifically the three dimensions.',
          misconception: 'Students believe **"higher life expectancy always means better health"** and use it interchangeably with "healthy life.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student states: "Mortality rate and morbidity rate are the same thing – both measure how many people are sick." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'higher life expectancy always means better health', 'healthy life expectancy (HALE)'],
                  hint: 'Revisit c11_hs_cbse_07_001 (WHO Definition of Health) – specifically the three dimensions and why.',
                  misconception: 'Students believe **"higher life expectancy always means better health"** and use it interchangeably with "healthy life expectancy (HALE).".' },
                { id: 'b', prompt: 'Compare and contrast Infant Mortality Rate (IMR) and Under-5 Mortality Rate (U5MR) as indicators of child health.', answer: 'IMR = deaths <1 year / live births × 1000',
                  options: ['IMR = deaths <1 year / live births × 1000', 'higher life expectancy always means better health', 'healthy life expectancy (HALE)'],
                  hint: 'Revisit c11_hs_cbse_07_001 (WHO Definition of Health) – specifically the three dimensions and why.',
                  misconception: 'Students believe **"higher life expectancy always means better health"** and use it interchangeably with "healthy life expectancy (HALE).".' }
          ],
            remediations: { 'higher-life-expectancy-always-means': { steps: ['Show the student two hypothetical populations – Population A (life expectancy 70, HALE 60) and Population B (life.', 'Explain that life expectancy = average years lived; HALE = average years lived in **full health**.', 'Calculate "years in ill health" = LE - HALE (A: 10 years, B: 3 years).', 'Connect to Indian data: Kerala (LE 75, high NCD morbidity) vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_004', difficulty: 'standard',
          question: 'Nutrition-health interrelationship refers to the bidirectional linkage where.',
          hint: 'Revisit c11_hs_cbse_07_001 (WHO health definition) and.',
          misconception: 'Students believe "balanced diet" means eating equal quantities from each food group (e.g., one roti, one katori dal.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old girl consumes 1800 kcal/day, 40 g protein, 15 mg iron, and 600 mg calcium daily.', answer: 'Step 1: % adequacy = (Intake ÷ RDA) × 100',
                  options: ['Step 1: % adequacy = (Intake ÷ RDA) × 100', 'balanced diet', '"balanced diet" means eating equal quantities from each food group (e'],
                  hint: 'Revisit c11_hs_cbse_07_001 (WHO health definition) and.',
                  misconception: 'Students believe "balanced diet" means eating equal quantities from each food group (e.g., one roti, one katori dal, one vegetable, one.' },
                { id: 'b', prompt: 'Compare and contrast "undernutrition" and "overnutrition" using the textbook\'s criteria.', answer: 'Undernutrition = intake < requirement (causes low weight, stunting, wasting,',
                  options: ['Undernutrition = intake < requirement (causes low weight, stunting, wasting,', 'eating too much junk food', 'balanced diet', '"balanced diet" means eating equal quantities from each food group (e'],
                  hint: 'Revisit c11_hs_cbse_07_001 (WHO health definition) and.',
                  misconception: 'Students believe "balanced diet" means eating equal quantities from each food group (e.g., one roti, one katori dal, one vegetable, one.' }
          ],
            remediations: { 'balanced-diet-means-eating-equal': { steps: ['If a student gives the "equal portions" answer: (1) Show the ICMR table — compare protein per 100g: wheat 11.8g, bengal.', 'Ask: "If you eat 100g each, which nutrient dominates?" (2) Calculate protein from 100g each: total ~32g — below 55g RDA.', '(3) Demonstrate scaling: 300g wheat + 75g dal + 200ml milk = 35.4+12.8+6.4=54.6g protein.', '(4) Assign practice: "Plan a 2500 kcal diet for a sedentary woman using the table — show grams of each food." This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_005', difficulty: 'standard',
          question: 'Malnutrition is a pathological state resulting from a relative or absolute.',
          hint: 'If stuck, revisit c11_hs_cbse_07_004\'s "Nutrients" section (macronutrients.',
          misconception: 'Students often believe "malnutrition = undernutrition = thinness" and fail to recognise that overweight/obese.',
          parts: [
                { id: 'a', prompt: 'A 10-year-old boy has height-for-age Z-score (HAZ) of -2.5, weight-for-height Z-score (WHZ) of -1.2, and weight-for-age Z-score (WAZ) of -2.1.', answer: 'Correct answer: Stunted (chronic undernutrition) but not wasted',
                  options: ['Correct answer: Stunted (chronic undernutrition) but not wasted', 'wasted', 'normal', 'malnutrition = undernutrition = thinness'],
                  hint: 'If stuck, revisit c11_hs_cbse_07_004\'s "Nutrients" section (macronutrients vs micronutrients, RDA.',
                  misconception: 'Students often believe "malnutrition = undernutrition = thinness" and fail to recognise that overweight/obese individuals can.' },
                { id: 'b', prompt: 'Compare the long-term cognitive consequences of iodine deficiency during (a) fetal development (maternal deficiency) vs. (b) early childhood (ages 0–5 years).', answer: 'Correct answer: (a) Maternal/fetal iodine deficiency causes cretinism',
                  options: ['Correct answer: (a) Maternal/fetal iodine deficiency causes cretinism', 'malnutrition = undernutrition = thinness'],
                  hint: 'If stuck, revisit c11_hs_cbse_07_004\'s "Nutrients" section (macronutrients vs micronutrients, RDA.',
                  misconception: 'Students often believe "malnutrition = undernutrition = thinness" and fail to recognise that overweight/obese individuals can.' }
          ],
            remediations: { 'malnutrition-undernutrition-thinness-and-fail': { steps: ['Show the student a side-by-side photo of a stunted child (HAZ -3) and an obese adolescent with acanthosis nigricans and.', 'Plot both on a 2×2 matrix (x-axis: macronutrient status [deficient/excess]; y-axis: micronutrient status.', 'Introduce the term "double burden of malnutrition" and have them re-read the NFHS-5 urban-rural disparity data (31.3%.', 'Assign a 150-word reflection: "Why does a chubby child not equal a healthy child?" This forces confrontation with the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_006', difficulty: 'standard',
          question: 'The nutrition-infection cycle is a bidirectional, self-reinforcing mechanism.',
          hint: 'If stuck, revisit c10_bio_cbse_01_006 (small intestine absorption mechanisms) and.',
          misconception: 'Students often believe the nutrition-infection cycle means "malnutrition causes infection" as a one-way linear path.',
          parts: [
                { id: 'a', prompt: 'An UNDERSTAND level question: Explain in your own words why the nutrition-infection cycle is described as a "vicious cycle" rather than a simple cause-effect.', answer: 'The cycle is vicious',
                  options: ['The cycle is vicious', 'infection causes malnutrition', 'malnutrition causes infection', 'Give the child eggs and milk daily, and the infections will stop'],
                  hint: 'If stuck, revisit c10_bio_cbse_01_006 (small intestine absorption mechanisms) and c8_bio_ch2_8.',
                  misconception: 'Students often believe the nutrition-infection cycle means "malnutrition causes infection" as a one-way linear path, and therefore assume.' },
                { id: 'b', prompt: 'An APPLY level question: A 10-month-old infant in an urban slum presents with recurrent pneumonia (3 episodes in 4 months). Weight-for-age is -2.5 SD.', answer: 'Compromised factors and interventions: (1) Health for All—compromised',
                  options: ['Compromised factors and interventions: (1) Health for All—compromised', 'give more protein', 'malnutrition causes infection', 'Give the child eggs and milk daily, and the infections will stop'],
                  hint: 'If stuck, revisit c10_bio_cbse_01_006 (small intestine absorption mechanisms) and c8_bio_ch2_8.',
                  misconception: 'Students often believe the nutrition-infection cycle means "malnutrition causes infection" as a one-way linear path, and therefore assume.' }
          ],
            remediations: { 'the-nutrition-infection-cycle-means': { steps: ['If a student shows this misconception: Step 1—Draw the cycle on paper with two large arrows: Arrow 1 (Malnutrition →.', 'Arrow 2 (Infection → Malnutrition): label four mechanisms (anorexia from cytokines, malabsorption from villous atrophy.', 'Step 2—Ask: "If we only fix Arrow 1 by giving food, what happens to Arrow 2?" Guide them to see that infection.', 'Step 3—Map each of the four WHO factors to specific arrows: Food Security → Arrow 1 input; Care → buffers Arrow 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
