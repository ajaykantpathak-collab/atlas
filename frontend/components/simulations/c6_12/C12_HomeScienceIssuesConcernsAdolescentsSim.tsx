'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC HOME SCIENCE CLASS 12 NODE CONSTANTS ───
const NODE_C12_HOME_021 = 'c12_home_021';
const NODE_C12_HOME_022 = 'c12_home_022';
const NODE_C12_HOME_023 = 'c12_home_023';
const NODE_C12_HOME_024 = 'c12_home_024';
const NODE_C12_HOME_025 = 'c12_home_025';
const NODE_C12_HOME_026 = 'c12_home_026';
const NODE_C12_HOME_027 = 'c12_home_027';
const NODE_C12_HOME_028 = 'c12_home_028';
const NODE_C12_HOME_029 = 'c12_home_029';
const NODE_C12_HOME_030 = 'c12_home_030';
const NODE_C12_HOME_031 = 'c12_home_031';
const NODE_C12_HOME_032 = 'c12_home_032';

const ALL_NODE_IDS = [
  NODE_C12_HOME_021,
  NODE_C12_HOME_022,
  NODE_C12_HOME_023,
  NODE_C12_HOME_024,
  NODE_C12_HOME_025,
  NODE_C12_HOME_026,
  NODE_C12_HOME_027,
  NODE_C12_HOME_028,
  NODE_C12_HOME_029,
  NODE_C12_HOME_030,
  NODE_C12_HOME_031,
  NODE_C12_HOME_032,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Community Empowerment & Heritage Studio: The Adolescent & Lifespan Odyssey',
  intro: 'Welcome to the Viksit Bharat Community & Design Resource Lab in Lucknow. You have been appointed the Chief Lead Counselor & Heritage Curator.',
  context: 'Across your desks lie real challenges: supporting distressed adolescents navigating peer pressure and digital burnout, curating rare Indian heritage textiles (Chikankari, Patola, Jamdani, Kalamkari), and designing grassroots public health solutions (Water Purification, SBM 2.0, ICDS Anganwadi systems) to transform rural and urban lives.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An adolescent in a school sports team is encouraged by peers to run 5 km daily and eat ragi-sprout salads, while their cousin is pressured into vaping behind the hostel. How does Home Science classify these two peer forces?',
  options: [
    'Both are inherently negative because adolescents must always remain strictly independent.',
    'First is Positive Peer Pressure (growth-promoting); second is Negative Peer Pressure (harmful).',
    'Peer pressure only applies to illegal substance abuse and cannot be positive.',
    'Both are natural biological impulses with no psychosocial categorization.',
  ],
  correctIndex: 1,
  hintAfter: "Exactly! Peer influence can be constructive or destructive. Let's delve deep into the lifespan, textiles, and community health ecosystems!",
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 24 RICH CHALLENGES COVERING ALL 12 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_home_021)
  {
    id: 'ch_01_f_recall_021',
    nodeId: NODE_C12_HOME_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the POCSO Act 2012 and national child helpline infrastructure, which emergency toll-free number provides 24/7 care and rescue for distressed children and adolescents in India?',
    options: ['100', '1098 (Childline)', '102', '1800-200-1000'],
    correctIndex: 1,
    explanation: 'Childline 1098 is India’s dedicated 24-hour emergency phone outreach service for children and adolescents in need of care and protection, operating under the Ministry of Women and Child Development alongside POCSO mechanisms.',
    hints: [
      'It is a 4-digit emergency helpline beginning with 10.',
      'It ends with the digits 98 and is operated under child protection frameworks.',
      'The number is 1098.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Foundation - Drag Label (c12_home_025)
  {
    id: 'ch_02_f_drag_025',
    nodeId: NODE_C12_HOME_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each iconic Indian textile tradition to its primary structural classification technique.',
    dragItems: [
      { label: 'Chikankari', targetId: 'box_emb' },
      { label: 'Banarasi Brocade', targetId: 'box_wov' },
      { label: 'Patola Double Ikat', targetId: 'box_dye' },
      { label: 'Bagh Print', targetId: 'box_prt' },
    ],
    correctMapping: {
      box_emb: 'Chikankari',
      box_wov: 'Banarasi Brocade',
      box_dye: 'Patola Double Ikat',
      box_prt: 'Bagh Print',
    },
    explanation: 'Chikankari is embroidered (needle & thread added on fabric), Banarasi is woven (extra-weft zari on loom), Patola is dyed (yarn-resist double ikat), and Bagh is printed (wooden block relief stamping).',
    hints: [
      'Think of which technique uses needles on finished cloth vs weaving on a pit-loom.',
      'Patola ties and dyes yarn before weaving; Bagh stamps pigment with carved blocks.',
      'Chikankari = Embroidered, Banarasi = Woven, Patola = Dyed, Bagh = Printed.',
    ],
    misconceptionIndex: 4,
  },
  // 3. Foundation - Understanding (c12_home_030)
  {
    id: 'ch_03_f_und_030',
    nodeId: NODE_C12_HOME_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise chemical role of alum (potassium aluminium sulphate) when added to turbid monsoon water in rural households?',
    options: [
      'It acts as an antibacterial antibiotic killing 100% of hepatitis viruses.',
      'It acts as a chemical coagulant, forming a sticky gelatinous floc that aggregates suspended silt and clay.',
      'It removes dissolved chemical fluorides and arsenic permanently by reverse osmosis.',
      'It softens water by vaporising dissolved minerals into gas.',
    ],
    correctIndex: 1,
    explanation: 'Alum is a coagulant. It neutralizes electrical charges of suspended colloids, creating flocs that drag clay and silt to the bottom as sediment. It does NOT disinfect bacteria/viruses on its own.',
    hints: [
      'Does alum kill pathogens or settle suspended mud particles?',
      'Alum binds colloidal silt so it can be decanted.',
      'It is a coagulant that forms flocs to settle suspended mud.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation - Recall (c12_home_032)
  {
    id: 'ch_04_f_recall_032',
    nodeId: NODE_C12_HOME_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On which historic date was the Integrated Child Development Scheme (ICDS) first launched in 33 experimental blocks across India?',
    options: ['15th August 1947', '2nd October 1975', '26th January 1950', '2nd October 2014'],
    correctIndex: 1,
    explanation: 'ICDS was launched on 2nd October 1975 (Mahatma Gandhi’s birth anniversary) to provide a holistic package of 6 services for children (0-6 years) and expectant/nursing mothers at village Anganwadis.',
    hints: [
      'It coincides with Gandhi Jayanti during the 1970s.',
      'The year is 1975.',
      'Choose 2nd October 1975.',
    ],
  },
  // 5. Foundation - Understanding (c12_home_026)
  {
    id: 'ch_05_f_und_026',
    nodeId: NODE_C12_HOME_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does traditional Phulkari from Punjab employ coarse hand-spun khaddar rather than translucent muslin as its base cloth?',
    options: [
      'Khaddar is cheap and disposable after a single festival use.',
      'The open, even weave of khaddar allows counting warp/weft yarns while darning with untwisted silk floss (pat) from the reverse side.',
      'Muslin repels silk thread and causes needle breakage.',
      'Khaddar absorbs chemical mordants faster during post-embroidery bleaching.',
    ],
    correctIndex: 1,
    explanation: 'Phulkari is a counted-thread geometry worked from the reverse side using darning stitch with pat (silk floss). Coarse khaddar provides an even grid where artisans count the threads easily.',
    hints: [
      'Think about the darning stitch technique worked from the reverse.',
      'The fabric needs a measurable, count-friendly weave grid.',
      'Coarse khaddar provides the structural grid for counting threads.',
    ],
  },
  // 6. Foundation - Application (c12_home_022)
  {
    id: 'ch_06_f_app_022',
    nodeId: NODE_C12_HOME_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An ISC Class 12 student is experiencing extreme exam anxiety and aggressive outburst triggers. Which evidence-based psychological technique taught in Home Science provides immediate autonomic nervous system calming?',
    options: [
      'Complete suppression of all emotions and skipping sleep.',
      'Diaphragmatic deep breathing and Anulom-Vilom pranayama with cognitive reframing.',
      'Retaliating aggressively against peers to release pent-up energy.',
      'Continuous binge-scrolling on social media until late night.',
    ],
    correctIndex: 1,
    explanation: 'Controlled diaphragmatic breathing and Anulom-Vilom activate the parasympathetic nervous system, lowering cortisol and heart rate, while cognitive reframing helps examine triggers objectively.',
    hints: [
      'Look for yogic and evidence-based self-regulation strategies.',
      'Deep breathing combined with reframing helps de-escalate emotional reactivity.',
      'Anulom-Vilom pranayama and cognitive reframing is the answer.',
    ],
  },
  // 7. Foundation - Drag Sort (c12_home_030)
  {
    id: 'ch_07_f_sort_030',
    nodeId: NODE_C12_HOME_030,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Arrange the multi-barrier water purification steps in the correct scientific sequence for turbid rural river water.',
    sortItems: [
      'Cloth filtration to remove coarse debris and cyclops',
      'Alum addition and 30-minute undisturbed settling (coagulation)',
      'Careful decantation of clear supernatant water',
      'Rolling boiling for at least 1 minute (or chlorination) for pathogen destruction',
      'Storage in clean, covered container with tap',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The logical hygiene cascade: strain large debris -> coagulate colloidal turbidity with alum -> decant clear liquid -> disinfect micro-organisms via boiling/chlorination -> store safely.',
    hints: [
      'First remove big dirt, then settle mud flocs with alum.',
      'Decant before boiling/disinfecting.',
      'Sequence: Cloth strain -> Alum floc -> Decant -> Boil -> Covered storage.',
    ],
  },
  // 8. Foundation - Recall (c12_home_031)
  {
    id: 'ch_08_f_recall_031',
    nodeId: NODE_C12_HOME_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which two distinct central ministries administer Swachh Bharat Mission (Gramin) and Swachh Bharat Mission (Urban) respectively?',
    options: [
      'Ministry of Health and Ministry of Education',
      'Ministry of Jal Shakti and Ministry of Housing & Urban Affairs (MoHUA)',
      'Ministry of Social Justice and Ministry of Rural Development',
      'Ministry of Women & Child Development and Ministry of Environment',
    ],
    correctIndex: 1,
    explanation: 'SBM-Gramin is steered by the Ministry of Jal Shakti (Department of Drinking Water & Sanitation), while SBM-Urban is steered by the Ministry of Housing and Urban Affairs.',
    hints: [
      'Gramin links to water & sanitation (Jal Shakti); Urban links to Housing & Urban Affairs.',
      'Check the twin ministries responsible for national sanitation governance.',
      'Ministry of Jal Shakti & Ministry of Housing and Urban Affairs.',
    ],
  },
  // 9. Standard - Application (c12_home_021)
  {
    id: 'ch_09_s_app_021',
    nodeId: NODE_C12_HOME_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 15-year-old student in a residential school displays sudden academic drop, bloodshot eyes, slurred speech, financial secrecy, and withdrawal from longtime friends. How should the student counselor categorize these indicators?',
    options: [
      'Normal cognitive maturation with no intervention required.',
      'Four classic symptom clusters of adolescent Substance Abuse: physical, behavioural, psychological, and social.',
      'Simple adolescent day-dreaming that will resolve spontaneously.',
      'Mild perfectionism resulting from excessive sports training.',
    ],
    correctIndex: 1,
    explanation: 'Bloodshot eyes/slurred speech (physical), academic drop/lying (behavioural), mood swings (psychological), and withdrawal/new suspicious peers (social) represent the 4 classic warning clusters of substance abuse.',
    hints: [
      'Notice the multi-systemic changes across health, grades, and peer relationships.',
      'These match the diagnostic symptom clusters defined in NIMHANS and ISC Home Science textbooks.',
      'They are the four symptom clusters of substance abuse.',
    ],
  },
  // 10. Standard - Analysis (c12_home_027)
  {
    id: 'ch_10_s_ana_027',
    nodeId: NODE_C12_HOME_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the structural construction of a Kanjeevaram silk saree border differ fundamentally from a Banarasi brocade kadhwa motif?',
    options: [
      'Kanjeevaram borders are machine-stitched with synthetic nylon after washing.',
      'Kanjeevaram uses the "Korvai" 3-shuttle interlocking weave on the loom, whereas Banarasi kadhwa weaves each supplementary zari motif individually without loose floats.',
      'Banarasi uses tie-dyed warp threads while Kanjeevaram uses block-printed resist mud.',
      'Both use running embroidery stitches worked on discarded cotton dhotis.',
    ],
    correctIndex: 1,
    explanation: 'Korvai in Kanjeevaram interlocks the contrasting border warp/weft with the body using three shuttles and two weavers. Banarasi kadhwa weaves each extra-weft zari motif individually into the silk ground.',
    hints: [
      'Focus on the Korvai interlocking technique vs the Kadhwa supplementary weft.',
      'Kanjeevaram joins contrasting borders structurally on the loom using shuttles.',
      'Kanjeevaram uses Korvai interlocking; Banarasi uses kadhwa supplementary weft.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard - Evaluation (c12_home_023)
  {
    id: 'ch_11_s_eval_023',
    nodeId: NODE_C12_HOME_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate the role of social media in adolescent career preparation: When does it act as an empowering catalyst versus a developmental impairment?',
    options: [
      'Social media is 100% harmful due to dopamine addiction and has zero career utility.',
      'It empowers when used purposefully for SWAYAM/NCS career portals and networking, but impairs when passive doom-scrolling creates sleep disruption, FOMO, and body-image anxiety.',
      'Social media is purely educational and completely immune to misinformation.',
      'It only affects physical bone density without impacting psychological stability.',
    ],
    correctIndex: 1,
    explanation: 'A balanced evaluation highlights dual aspects: curated access to SWAYAM/NCS, webinars, and role models fosters career growth; unregulated screen exposure triggers FOMO, anxiety, sleep deprivation, and reduced focus.',
    hints: [
      'The ISC syllabus requires a balanced "evaluate" perspective.',
      'Consider both the educational platforms (SWAYAM, NCS) and mental health risks (FOMO, sleep disruption).',
      'Select the balanced perspective highlighting purposeful learning vs passive screen distress.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard - Analysis (c12_home_024)
  {
    id: 'ch_12_s_ana_024',
    nodeId: NODE_C12_HOME_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A 48-year-old manager in Bengaluru is simultaneously financing her daughter’s college tuition, caring for her stroke-recovering father-in-law, and experiencing perimenopausal symptoms. Which developmental concept does this exemplify?',
    options: [
      'Early Adulthood exploratory phase.',
      'The "Sandwich Generation" crisis of Middle Adulthood (40-65 years) across physical, emotional, and social dimensions.',
      'Late Adulthood retirement disengagement.',
      'Adolescent identity moratorium.',
    ],
    correctIndex: 1,
    explanation: 'Middle adults (40-65 years) frequently occupy the "sandwich generation" role—supporting dependent children while caregiving for ageing parents, managing career summits, and navigating hormonal/physical shifts.',
    hints: [
      'The age range is 40-65 years.',
      'They are "sandwiched" between growing children and elderly parents.',
      'Middle Adulthood Sandwich Generation.',
    ],
  },
  // 13. Standard - Numeric Calculation (c12_home_032)
  {
    id: 'ch_13_s_num_032',
    nodeId: NODE_C12_HOME_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to ICDS nutritional provisioning norms, calculate the minimum supplementary calories (in kcal) mandated per day for a Pregnant or Lactating Mother at an Anganwadi centre.',
    correctAnswer: 600,
    tolerance: 20,
    unit: 'kcal',
    explanation: 'ICDS supplementary nutrition norms mandate 500 kcal (12-15g protein) for children 6m-6y, 800 kcal (20-25g protein) for severely malnourished children, and 600 kcal (18-20g protein) for pregnant & nursing mothers.',
    hints: [
      'Children receive 500 kcal, while expectant mothers receive 100 kcal more.',
      'The standard value is 600 kcal with 18-20g of protein.',
      'Enter 600.',
    ],
  },
  // 14. Standard - Distinguish (c12_home_028)
  {
    id: 'ch_14_s_dist_028',
    nodeId: NODE_C12_HOME_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between Gujarat Bandhini and Patan Patola based on the stage at which resist dyeing occurs.',
    options: [
      'Bandhini dyes the yarn on a spinning wheel; Patola prints wooden blocks onto wet silk.',
      'Bandhini is a fabric-level tie-and-dye (plangi) done on finished cloth; Patola is a double-ikat yarn-resist technique where both warp and weft yarns are tie-dyed before weaving.',
      'Bandhini uses only synthetic azo dyes; Patola uses gold zari embroidery without dyes.',
      'Both are painted freehand with a bamboo kalam.',
    ],
    correctIndex: 1,
    explanation: 'Bandhini ties pinched dots on woven fabric (plangi). Patola double-ikat resist-dyes both warp and weft yarns with mathematical alignment before mounting them onto the loom.',
    hints: [
      'Fabric resist vs Yarn resist.',
      'Patola is double Ikat—yarns are dyed before weaving.',
      'Bandhini = fabric resist; Patola = double-ikat yarn resist before weaving.',
    ],
    misconceptionIndex: 1,
  },
  // 15. Standard - Construct (c12_home_022)
  {
    id: 'ch_15_s_const_022',
    nodeId: NODE_C12_HOME_022,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the nationally recognized QPR Suicide Gatekeeper Intervention sequence in proper order.',
    availableParts: ['Persuade to seek help', 'Question the individual directly', 'Refer to professional helplines/counsellor'],
    targetState: 'Question the individual directly Persuade to seek help Refer to professional helplines/counsellor',
    validationHint: 'The acronym is Q-P-R: Question -> Persuade -> Refer.',
    explanation: 'QPR stands for: (1) Question the person directly about suicidal intent without judgment, (2) Persuade them to stay safe and accept assistance, and (3) Refer immediately to trusted adults, KIRAN (1800-599-0019) or psychiatrists.',
    hints: [
      'Start with Questioning directly.',
      'Follow with Persuading them to accept care.',
      'Finish with Referring to a mental health professional.',
    ],
  },
  // 16. Standard - Analysis (c12_home_029)
  {
    id: 'ch_16_s_ana_029',
    nodeId: NODE_C12_HOME_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In traditional Dabu block printing of Rajasthan (Sanganer-Baghru), what is the specific function of the mud paste (lime, gum, sawdust, and clay)?',
    options: [
      'It acts as an acidic bleach that etches flower patterns onto dark polyester.',
      'It serves as a physical resist agent, shielding covered areas from dye absorption during the subsequent indigo bath.',
      'It bonds permanently with cotton fibres to create a raised 3D plastic coating.',
      'It prevents the fabric from drying in the desert sun.',
    ],
    correctIndex: 1,
    explanation: 'Dabu is a mud-resist technique. The printed mud paste hardens and resists the liquid dye when submerged in the cold dye vat. Once washed, the mud flakes off, revealing pristine white/cream motifs.',
    hints: [
      'Dabu is mud-resist printing.',
      'The mud blocks the dye from entering specific fabric areas.',
      'It acts as a physical resist shield during immersion dyeing.',
    ],
  },
  // 17. Advanced - Evaluation (c12_home_021)
  {
    id: 'ch_17_a_eval_021',
    nodeId: NODE_C12_HOME_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the sociocultural barriers that hinder adolescent disclosure of sexual abuse in the Indian joint/nuclear family context, and identify the most critical institutional safeguard.',
    options: [
      'Sexual abuse is exclusively committed by unknown strangers in streets, so home communication is unnecessary.',
      'Family silence arises from patriarchal shame, fear of social stigma, and victim-blaming because abusers are often known relatives; POCSO Act 2012 and school life-skills provide vital mandatory reporting channels.',
      'Adolescents never experience trauma if incidents are kept strictly confidential within the family.',
      'The legal system in India requires adult consent before any adolescent abuse can be registered.',
    ],
    correctIndex: 1,
    explanation: 'NFHS-5 and NCRB data establish that perpetrators are overwhelmingly known to the child (family/acquaintances). Cultural stigma breeds silence; the POCSO Act 2012 provides child-friendly justice, mandatory reporting, and identity protection.',
    hints: [
      'Think about the myth of "stranger danger" vs actual data on known offenders.',
      'Examine the protective role of the POCSO Act 2012 and institutional reporting.',
      'Select the option acknowledging known perpetrators, social stigma, and POCSO safeguards.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced - Analysis & Application (c12_home_027)
  {
    id: 'ch_18_a_ana_027',
    nodeId: NODE_C12_HOME_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A museum conservator discovers a 60-year-old heirloom Baluchari saree with oxidised silver zari and fractured silk along fold lines. What conservation protocol is prescribed by Home Science textile science?',
    options: [
      'Machine wash with heavy bleaching powder and iron on high heat directly over the zari.',
      'Fold in airtight PVC polythene bags and spray synthetic floral perfume.',
      'Professional gentle solvent dry-cleaning, interleaving folds with acid-free muslin, rolling around padded acid-free tubes, and storing with dried neem leaves in dark, breathable storage.',
      'Soak in hot caustic soda solution to dissolve tarnished silver.',
    ],
    correctIndex: 2,
    explanation: 'Pure silk and zari are ruined by moisture, acid, heat, and synthetic plastics (which emit harmful plasticizer gases). Acid-free muslin wrapping, padded rolling, and natural repellents (neem/camphor) prevent creasing and tarnishing.',
    hints: [
      'Plastic traps moisture and tarnishes zari; harsh washing destroys silk protein.',
      'Acid-free tissue or muslin wrapping with padded support is essential.',
      'Choose solvent dry-cleaning, acid-free muslin interleaving, and neem leaf protection.',
    ],
  },
  // 19. Advanced - Evaluation (c12_home_032)
  {
    id: 'ch_19_a_eval_032',
    nodeId: NODE_C12_HOME_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Analyze why ICDS is termed a "Grassroots Convergence Platform" between the Ministries of Women & Child Development, Health & Family Welfare, and Education.',
    options: [
      'Because it merges all three ministries into a single commercial private corporation.',
      'Because at the single focal point of the Anganwadi Centre, it integrates supplementary food & preschool education (WCD), immunization & growth monitoring (Health/ANM), and primary school transition (Education).',
      'Because it eliminates the need for doctors, nurses, and school teachers in rural India.',
      'Because it solely distributes imported packaged baby foods without community involvement.',
    ],
    correctIndex: 1,
    explanation: 'Convergence breaks bureaucratic silos: the Anganwadi Worker (WCD), the ANM/ASHA (Health), and local primary teachers (Education) unite at the Anganwadi to deliver holistic health, nutrition, and early cognitive stimulation.',
    hints: [
      'Think about the 3 distinct ministries operating through one village Anganwadi hub.',
      'WCD gives nutrition, Health provides vaccines/check-ups, Education aligns preschool learning.',
      'Select the option describing integrated services delivered at the Anganwadi focal point.',
    ],
  },
  // 20. Advanced - Drag Sort (c12_home_029)
  {
    id: 'ch_20_a_sort_029',
    nodeId: NODE_C12_HOME_029,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the authentic Srikalahasti Kalamkari hand-painting process in the correct chronological craft sequence.',
    sortItems: [
      'Bleaching cotton fabric and treatment with Myrobalan (harda) & buffalo milk',
      'Freehand sketching of epic characters using charcoal from burnt tamarind twigs',
      'Black line outlining with bamboo kalam using Kasimi (fermented iron & jaggery)',
      'Alum mordanting and boiling in madder/alizarin for crimson red development',
      'Indigo application and final washing in flowing river water (Swarnamukhi river)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Srikalahasti sequence: Milk-myrobalan mordant prep -> charcoal sketch -> Kasimi iron-black outline -> Alum mordant & red boil -> Indigo vat painting & river washing.',
    hints: [
      'Preparation of fabric with milk/myrobalan comes first to prevent dye spreading.',
      'Charcoal outline precedes iron kasimi pen-work; boiling and indigo painting follow.',
      'Order: Milk prep -> Charcoal sketch -> Kasimi ink -> Alum/madder -> Indigo/wash.',
    ],
  },
  // 21. Advanced - Evaluation (c12_home_031)
  {
    id: 'ch_21_a_eval_031',
    nodeId: NODE_C12_HOME_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Critique why Swachh Bharat Mission Phase 2 (SBM 2.0, 2021-2026) prioritizes "ODF-Plus" and Faecal Sludge & Liquid Waste Management over simply counting constructed latrines.',
    options: [
      'Toilet construction has been permanently banned across Indian states.',
      'Building toilets alone does not guarantee continuous usage, water availability, or safe sanitation if waste leaches into groundwater; ODF-Plus ensures sustainability, greywater treatment, and plastic management.',
      'Open defecation is no longer biologically linked to diarrhoeal illnesses.',
      'SBM 2.0 is purely a digital mobile application with no environmental mandate.',
    ],
    correctIndex: 1,
    explanation: 'ODF was infrastructure-centric; ODF-Plus focuses on behavioral permanence (IEC), functional tap water connectivity (Jal Jeevan integration), faecal sludge treatment, and solid-liquid resource management (SLRM).',
    hints: [
      'Think about what happens after a toilet is built: water access, maintenance, sludge treatment.',
      'ODF-Plus tackles sustained usage and ecological waste management.',
      'ODF-Plus ensures long-term behavioral usage and safe liquid/solid waste management.',
    ],
  },
  // 22. Advanced - Analysis (c12_home_026)
  {
    id: 'ch_22_a_ana_026',
    nodeId: NODE_C12_HOME_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze how Kasuti of Karnataka (Dharwad) differs from Bengal Kantha in both fabric source and geometric execution.',
    options: [
      'Kasuti is printed with copper blocks; Kantha is woven with gold wire on jacquard looms.',
      'Kasuti is worked on dark silk/cotton counting warp/weft yarns without frames using Gavanti, Murgi, Negi, and Menthi stitches; Kantha layers recycled worn-out saris quilted with freehand running stitches.',
      'Kasuti uses mirrors (abhla) exclusively; Kantha uses wooden beads on wool.',
      'Both use untwisted white cotton thread on transparent Lucknow mull.',
    ],
    correctIndex: 1,
    explanation: 'Kasuti is disciplined counted-thread geometry (chariots, lamps, gopurams) on Ilkal saris. Kantha is an upcycling folk tradition where layered cotton saris/dhotis are quilted with running stitch.',
    hints: [
      'Counted thread geometry (Gavanti, Murgi) vs recycled layered quilting (running stitch).',
      'Kasuti uses specific four stitches on Ilkal saris; Kantha repurposes old saris.',
      'Kasuti uses counted stitches (Gavanti/Murgi); Kantha quilts recycled saris with running stitch.',
    ],
    misconceptionIndex: 4,
  },
  // 23. Advanced - Application (c12_home_030)
  {
    id: 'ch_23_a_app_030',
    nodeId: NODE_C12_HOME_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A district in Rajasthan reports high prevalence of skeletal fluorosis despite clear, pathogen-free well water. As a public health extension officer, what water safety intervention must be recommended?',
    options: [
      'Boiling water for 10 minutes, as heat destroys fluoride ions.',
      'Adding alum flocculant, which neutralizes all chemical minerals into sugar.',
      'Activated alumina adsorption (Nalgonda technique) or Reverse Osmosis (RO) filtration, since boiling only concentrates dissolved fluoride.',
      'Passing water through a simple 2-fold cotton cloth.',
    ],
    correctIndex: 2,
    explanation: 'Boiling evaporates pure water and CONCENTRATES dissolved non-volatile chemical toxins like fluoride and arsenic. Chemical defluoridation (Nalgonda technique using alum + lime) or RO membrane separation is mandatory.',
    hints: [
      'Fluoride is a dissolved mineral, not a biological germ.',
      'Boiling evaporates water and increases fluoride concentration.',
      'Recommend Nalgonda technique or Reverse Osmosis (RO).',
    ],
    misconceptionIndex: 3,
  },
  // 24. Advanced - Creativity & Synthesis (c12_home_023)
  {
    id: 'ch_24_a_create_023',
    nodeId: NODE_C12_HOME_023,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 essential pillars of a comprehensive Adolescent Life-Planning & Digital Wellness blueprint.',
    availableParts: [
      'Evidence-based Goal Setting (Realistic & Aptitude-aligned)',
      'Dual Skill Acquisition (Hard technical + Soft socio-emotional skills)',
      'Institutional Guidance Access (NCS Portal, School Counsellors, NEP Cells)',
      'Digital Boundary Regulation (<2h recreational screen-time & curated educational media)',
    ],
    targetState: 'Evidence-based Goal Setting (Realistic & Aptitude-aligned) Dual Skill Acquisition (Hard technical + Soft socio-emotional skills) Institutional Guidance Access (NCS Portal, School Counsellors, NEP Cells) Digital Boundary Regulation (<2h recreational screen-time & curated educational media)',
    validationHint: 'Add all four pillars in sequence: Goal Setting -> Dual Skills -> Institutional Guidance -> Digital Boundary.',
    explanation: 'A balanced adolescent transition requires clear vocational targets, holistic hard/soft skills, formal counselling access (NCS/NEP), and proactive digital hygiene to safeguard mental health.',
    hints: [
      'Start with Goal Setting, then add Skills.',
      'Include Guidance from NCS/counsellors and finish with Digital Boundaries.',
      'Add all four comprehensive pillars in logical order.',
    ],
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_HOME_021,
  title: 'ISC Class 12 Home Science: Adolescent Lifespan, Traditional Textiles & Community Health',
  definition: 'An integrated study of adolescent psychosocial health, lifespan developmental dimensions, master craft classification of Indian traditional textiles, household water safety, and landmark national extension programmes (SBM & ICDS).',
  eli5: 'Think of human life as a rich tapestry: you need strong emotional roots during teen years, healthy wisdom in adulthood, beautiful heritage crafts to wear, clean safe water to drink, and community schemes like Anganwadis and Swachh Bharat to keep everyone thriving.',
  misconceptions: [
    { misconception: 'Social media is purely destructive for adolescents.', correction: 'Social media has dual impacts: while passive doom-scrolling and comparison cause FOMO and sleep distress, purposeful engagement provides SWAYAM courses, career guidance, and creative networks.' },
    { misconception: 'Patola is a fabric-level tie-and-dye craft just like Bandhini.', correction: 'Patola is an intricate double-ikat yarn-resist craft where warp and weft are tied and dyed before weaving; Bandhini ties finished cloth.' },
    { misconception: 'Sexual abuse is primarily committed by strangers.', correction: 'NFHS-5 and NCRB empirical data show the overwhelming majority of perpetrators are persons known to the victim. POCSO and open family trust are vital safeguards.' },
    { misconception: 'Boiling water removes chemical toxins like fluoride and arsenic.', correction: 'Boiling kills pathogens (bacteria/viruses) but evaporates water, thereby concentrating dissolved chemical toxins. Membrane RO or Nalgonda techniques are required for chemicals.' },
    { misconception: 'All patterned traditional textiles are embroidered.', correction: 'Indian textiles are classified into 5 distinct categories: Embroidered (needle on cloth), Woven (loom extra-weft), Dyed (resist/ikat), Printed (block stamped), and Painted (kalam pen-work).' },
  ],
  diagnosticQuestions: [
    { question: 'Which helpline provides emergency 24/7 child protection in India?', options: ['100', '1098', '102', '108'], correctIndex: 1 },
    { question: 'What is the base fabric traditionally used in Punjabi Phulkari embroidery?', options: ['Fine Silk', 'Coarse Khaddar', 'Organza', 'Velvet'], correctIndex: 1 },
    { question: 'What does double-ikat mean in Patan Patola?', options: ['Two colors only', 'Both warp and weft yarns are resist-dyed before weaving', 'Embroidered with two needles', 'Printed with double blocks'], correctIndex: 1 },
    { question: 'Which stage of adulthood is known as the "sandwich generation"?', options: ['Early Adulthood (20-40)', 'Middle Adulthood (40-65)', 'Late Adulthood (65+)', 'Adolescence (10-19)'], correctIndex: 1 },
    { question: 'What is the role of alum in water purification?', options: ['Kills all viruses', 'Coagulates suspended clay & silt colloids', 'Removes fluoride', 'Softens hard water'], correctIndex: 1 },
    { question: 'When was the Integrated Child Development Scheme (ICDS) launched?', options: ['2 Oct 2014', '2 Oct 1975', '15 Aug 1947', '26 Jan 1950'], correctIndex: 1 },
    { question: 'Which technique characterizes Srikalahasti Kalamkari?', options: ['Jacquard weaving', 'Freehand drawing with bamboo kalam and natural dyes', 'Tie-and-dye with thread', 'Synthetic screen printing'], correctIndex: 1 },
    { question: 'What does the QPR approach in mental health stand for?', options: ['Quick-Peace-Rest', 'Question, Persuade, Refer', 'Quality-Protection-Response', 'Quiet-Patience-Recovery'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student achieves 80%+ mastery across adolescent development, mental health, textile classification, water safety, and national community schemes.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Adolescent Psychosocial & Stress Equilibrium',
    instruction: 'Adjust the Peer Pressure & Digital Screen Sliders to observe real-time impacts on Academic Focus, Emotional Stability, and Sleep Quality.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HOME_021,
  },
  {
    title: 'Lab 2: Master Textile Classification & Craft Anatomy',
    instruction: 'Click each traditional Indian craft swatch to inspect its origin, technique, yarn, and iconic GI-protected motifs under the microscope.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_HOME_025,
  },
  {
    title: 'Lab 3: Lifespan Multidimensional Matrix',
    instruction: 'Toggle between Early, Middle, and Late Adulthood to analyze physical, cognitive, emotional, and social role transformations.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_HOME_024,
  },
  {
    title: 'Lab 4: Multi-Barrier Potable Water Purifier Simulator',
    instruction: 'Test and assemble physical, chemical coagulant, and biological disinfection filters to achieve 100% WHO/BIS potable water safety.',
    interactionType: 'drag-position',
    nodeId: NODE_C12_HOME_030,
  },
  {
    title: 'Lab 5: The ICDS Grassroots Convergence Hub',
    instruction: 'Interact with the Anganwadi 6-service matrix and observe how health, nutrition, and early education converge at village level.',
    interactionType: 'drag-match',
    nodeId: NODE_C12_HOME_032,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an adolescent increases daily recreational doom-scrolling from 1 hour to 5 hours late at night, what will happen to emotional stability and academic focus?',
    options: [
      'Both will improve dramatically due to multitasking prowess.',
      'Melatonin suppression and comparison-anxiety will sharply degrade sleep and concentration.',
      'No physiological or psychological change will occur.',
      'Only muscular strength will decline without affecting mood.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Digital Screen-time slider above 4.5 hours in the interactive lab to verify the physiological collapse gauge!',
    nodeId: NODE_C12_HOME_023,
  },
  {
    question: 'Predict: If you boil turbid river water without prior alum coagulation or filtration, what is the health outcome?',
    options: [
      'Pathogenic microbes are killed, but suspended silt, heavy mud, and chemical impurities remain fully suspended.',
      'Boiling miraculously converts mud and suspended sand into pure oxygen gas.',
      'The water becomes 100% chemically pure distilled water instantly.',
      'The mud immediately vanishes through nuclear sublimation.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Turn on the Heat Boil simulator on raw turbid water without settling to observe the remaining sediment alert!',
    nodeId: NODE_C12_HOME_030,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the "Resilience Index" when Positive Peer Support and Family Dialogue are maximized together?',
    observableOptions: [
      'Resilience surges to peak levels, buffering against peer conformity and depression.',
      'Resilience drops because adolescents become overly dependent.',
      'There is zero correlation between family dialogue and adolescent well-being.',
      'It triggers instant academic fatigue.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HOME_022,
  },
  {
    question: 'Observation: Under the craft microscope, what is unique about Patan Patola compared to Lucknow Chikankari?',
    observableOptions: [
      'Patola shows interlocking dyed warp-weft intersections in silk; Chikankari shows white shadow-work stitches on the surface of muslin.',
      'Both look completely identical with white cotton threads.',
      'Patola is made of carved wood while Chikankari is made of metal wire.',
      'Neither uses any thread or fabric.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HOME_028,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Extension & Heritage Preservation Action Plan',
  description: 'Design a grassroots Home Science intervention portfolio for your neighborhood or school!',
  steps: [
    '1. Adolescent Wellness: Create a pocket-sized emergency card featuring KIRAN (1800-599-0019) and Childline (1098).',
    '2. Digital Detox Challenge: Log daily academic vs recreational screen-time for 7 days, maintaining <2 hours recreational use.',
    '3. Heritage Care Audit: Inspect an heirloom silk or embroidered saree at home; draft an acid-free muslin wrapping & neem storage plan.',
    '4. Safe Water & Anganwadi Visit: Demonstrate the 5-step water purification cascade (strain -> alum floc -> decant -> boil -> covered tap) and map your nearest ICDS Anganwadi centre.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_HomeScienceIssuesConcernsAdolescentsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_HOME_021,
  title = DEFAULT_PROPS.title || 'Adolescent Issues, Textiles & Community Schemes',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject Config
  const subjectConfig = SUBJECT_CONFIG['homesc'] || { name: 'Home Science', emoji: '🏡', color: 'rose' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Lab Sliders & Toggles (Direct Real-Time State Updates)
  const [screenTimeHours, setScreenTimeHours] = useState(2);
  const [peerPressureLevel, setPeerPressureLevel] = useState(60); // 0-100 (negative to positive)
  const [familySupportScore, setFamilySupportScore] = useState(75);
  const [selectedTextile, setSelectedTextile] = useState<'chikankari' | 'phulkari' | 'patola' | 'kanjeevaram' | 'kalamkari' | 'bagh'>('chikankari');
  const [adulthoodStage, setAdulthoodStage] = useState<'early' | 'middle' | 'late'>('early');
  const [waterAlumAdded, setWaterAlumAdded] = useState(false);
  const [waterFiltered, setWaterFiltered] = useState(false);
  const [waterBoiled, setWaterBoiled] = useState(false);
  const [activeIcdsService, setActiveIcdsService] = useState<number | null>(null);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Challenge Flow & Hints State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop / Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual & Audio Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textileCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED ADOLESCENT PSYCHOLOGICAL GAUGES ───
  const emotionalStability = useMemo(() => {
    const raw = 50 + (familySupportScore * 0.4) + ((peerPressureLevel - 50) * 0.3) - (screenTimeHours * 6);
    return Math.max(5, Math.min(100, Math.round(raw)));
  }, [familySupportScore, peerPressureLevel, screenTimeHours]);

  const academicFocus = useMemo(() => {
    const raw = 40 + (familySupportScore * 0.3) + ((peerPressureLevel - 50) * 0.2) - (screenTimeHours * 8);
    return Math.max(5, Math.min(100, Math.round(raw)));
  }, [familySupportScore, peerPressureLevel, screenTimeHours]);

  const sleepQuality = useMemo(() => {
    const raw = 100 - (screenTimeHours * 12) + (familySupportScore * 0.1);
    return Math.max(10, Math.min(100, Math.round(raw)));
  }, [screenTimeHours, familySupportScore]);

  // ─── SPACED REPETITION SCHEDULE CALCULATION ───
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATES ─���─
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION: PSYCHOSOCIAL WAVE ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = emotionalStability > 50 ? '#10b981' : '#f43f5e';
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x++) {
        const freq = 0.02 + (100 - sleepQuality) * 0.0005;
        const amp = (100 - emotionalStability) * 0.3 + 5;
        const y = canvas.height / 2 + Math.sin(x * freq + frame * 0.05) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const px = (frame * 2) % canvas.width;
      const py = canvas.height / 2 + Math.sin(px * 0.03 + frame * 0.05) * 15;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [emotionalStability, sleepQuality]);

  // ─── 2D TEXTILE WEAVE / PRINT MICROSCOPE CANVAS ───
  useEffect(() => {
    const canvas = textileCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedTextile === 'chikankari') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 6) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 100);
      ctx.lineTo(100, 40);
      ctx.lineTo(160, 100);
      ctx.lineTo(100, 160);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.fill();
    } else if (selectedTextile === 'phulkari') {
      ctx.fillStyle = '#451a03';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4;
      for (let x = 20; x < canvas.width - 20; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, canvas.height - 20);
        ctx.stroke();
      }
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(100, 30);
      ctx.lineTo(170, 100);
      ctx.lineTo(100, 170);
      ctx.lineTo(30, 100);
      ctx.closePath();
      ctx.fill();
    } else if (selectedTextile === 'patola') {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? '#b91c1c' : '#ca8a04';
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#fbbf24';
          ctx.fillRect(30 + c * 38, 30 + r * 38, 32, 32);
        }
      }
      ctx.shadowBlur = 0;
    } else if (selectedTextile === 'kanjeevaram') {
      ctx.fillStyle = '#831843';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(0, 130, canvas.width, 70);
      ctx.fillStyle = '#fbbf24';
      for (let i = 10; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 130);
        ctx.lineTo(i + 15, 100);
        ctx.lineTo(i + 30, 130);
        ctx.closePath();
        ctx.fill();
      }
    } else if (selectedTextile === 'kalamkari') {
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.arc(80, 80, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1e40af';
      ctx.beginPath();
      ctx.arc(120, 110, 15, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#881337';
      for (let i = 20; i < canvas.width; i += 50) {
        for (let j = 20; j < canvas.height; j += 50) {
          ctx.fillRect(i, j, 30, 30);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(i + 5, j + 5, 20, 20);
          ctx.fillStyle = '#881337';
        }
      }
    }
  }, [selectedTextile]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration laboratories. Manipulate variables and discover principles firsthand!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment without constraints!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Apply your insights to master the ISC Home Science board standards!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Interact with the laboratory controls to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Observe the gauges closely.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowSparkles(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully mastered the ISC Home Science simulation suite.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems!.map((_, i) => i);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent application of concepts.');
      setShowConfetti(true);
      setShowSparkles(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, 'proficient');
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete scientific rationale together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">ISC Class 12 • Humanities</span>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">Phase: <span className="text-white capitalize">{phase}</span></span>
          </div>
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase border ${
              difficulty === 'foundation' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700' :
              difficulty === 'advanced' ? 'bg-rose-950/60 text-rose-400 border-rose-700' :
              'bg-indigo-950/60 text-indigo-400 border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold text-sm tracking-wide">
              <span>🌟</span> PROLOGUE: THE LIFE-SPAN & COMMUNITY RESOURCE LAB
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 mt-2 text-xs leading-relaxed italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <span>🎯</span> Curiosity Discovery Hook (Non-graded)
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Discovery option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-indigo-500'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-indigo-400">
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-700/60 mt-4 space-y-3">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Peer pressure functions as both a positive asset and negative risk factor.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    aria-label="Enter Interactive Research Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white rounded-xl font-bold shadow-lg text-sm flex items-center gap-2"
                  >
                    Enter Interactive Research Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigation Bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Go to Lab ${idx + 1}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase text-rose-400 tracking-wider">Guided Investigation • Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
                <h3 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: ADOLESCENT PSYCHOSOCIAL SIMULATOR WITH MULTI-REPRESENTATION & SVG ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Controls Panel (Live Sliders) */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-slate-200">Interactive Psychosocial Controls</h4>
                      
                      {/* Screen Time Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Recreational Screen-Time (Social Media / Reels)</span>
                          <span className={`${screenTimeHours > 3 ? 'text-rose-400 font-bold' : 'text-indigo-400'}`}>{screenTimeHours} hrs/day</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={8}
                          step={0.5}
                          aria-label="Recreational screen time in hours"
                          value={screenTimeHours}
                          onChange={(e) => setScreenTimeHours(Number(e.target.value))}
                          className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[11px] text-slate-500">WHO Guideline: &lt; 2 hrs recreational limit</span>
                      </div>

                      {/* Peer Support Quality Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Peer Pressure Vector (Destructive ↔ Positive)</span>
                          <span className="text-indigo-400">{peerPressureLevel < 40 ? 'Negative (Substance Risk)' : peerPressureLevel > 60 ? 'Positive (Sports/Study)' : 'Neutral'} ({peerPressureLevel}%)</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          aria-label="Peer pressure vector level"
                          value={peerPressureLevel}
                          onChange={(e) => setPeerPressureLevel(Number(e.target.value))}
                          className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Family Dialogue & Trust Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Family Communication & Protective Buffer</span>
                          <span className="text-emerald-400">{familySupportScore}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          aria-label="Family communication and support percentage"
                          value={familySupportScore}
                          onChange={(e) => setFamilySupportScore(Number(e.target.value))}
                          className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Multi-Representation 1: Live Canvas + SVG 1: Psychosocial Equilibrium Balance Diagram */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-bold text-slate-200">Representation A: Live Autonomic Wave</h4>
                          <span className="text-[10px] text-indigo-400 font-mono">Dynamic Frequency: {(100 - sleepQuality)} Hz</span>
                        </div>
                        <canvas ref={canvasRef} width={380} height={80} className="w-full bg-slate-900 rounded-xl border border-slate-800" />
                      </div>

                      {/* TOPIC SVG 1: Psychosocial Equilibrium Lever & Fulcrum Diagram */}
                      <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 mb-1">Representation B: Psychosocial Equilibrium Lever Diagram</div>
                        <svg viewBox="0 0 360 80" className="w-full h-16" aria-label="Psychosocial equilibrium balance diagram">
                          {/* Fulcrum */}
                          <polygon points="180,60 170,75 190,75" fill="#6366f1" />
                          <line x1="20" y1="75" x2="340" y2="75" stroke="#334155" strokeWidth="3" />
                          {/* Tilting Lever */}
                          <g transform={`rotate(${(50 - emotionalStability) * 0.25}, 180, 60)`}>
                            <line x1="40" y1="60" x2="320" y2="60" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                            {/* Left weight: Screen Time & Distress */}
                            <circle cx="60" cy={60 - screenTimeHours * 2} r={10 + screenTimeHours * 1.5} fill="#f43f5e" opacity="0.85" />
                            <text x="60" y={55 - screenTimeHours * 2} fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">Screen</text>
                            {/* Right weight: Family + Positive Peer */}
                            <circle cx="300" cy={60 - familySupportScore * 0.15} r={8 + familySupportScore * 0.15} fill="#10b981" opacity="0.85" />
                            <text x="300" y={55 - familySupportScore * 0.15} fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">Support</text>
                          </g>
                          <text x="180" y="20" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Equilibrium Status: {emotionalStability > 60 ? '✓ Resilient & Stable' : '✗ Distress Vulnerability'}
                          </text>
                        </svg>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                          <span className="text-[9px] uppercase font-bold text-slate-400">Emotional</span>
                          <div className={`text-base font-black ${emotionalStability > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {emotionalStability}% {emotionalStability > 60 ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                          <span className="text-[9px] uppercase font-bold text-slate-400">Focus</span>
                          <div className={`text-base font-black ${academicFocus > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {academicFocus}% {academicFocus > 60 ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                          <span className="text-[9px] uppercase font-bold text-slate-400">Sleep</span>
                          <div className={`text-base font-black ${sleepQuality > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {sleepQuality}% {sleepQuality > 60 ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PREDICT-THEN-CHECK CARD */}
                  <div className="p-4 bg-slate-950/70 rounded-2xl border border-indigo-900/50 space-y-3">
                    <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                      <span>🔮</span> Predict-Then-Check Investigation
                    </span>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    
                    {!predictionMade ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction choice ${String.fromCharCode(65 + i)}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs text-slate-200"
                          >
                            <span className="font-bold text-indigo-400 mr-1">{String.fromCharCode(65 + i)}.</span> {opt}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <p className="text-xs text-emerald-400 font-semibold">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                        {screenTimeHours >= 4.5 && (
                          <div className="p-2.5 bg-emerald-950/40 border border-emerald-700 rounded-xl text-xs text-emerald-300">
                            ✓ Observation Verified: Late screen-time disrupts melatonin release, severely reducing both sleep architecture and emotional resilience!
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 2: MASTER TRADITIONAL TEXTILES & SVG 2 CRAFT ANATOMY ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Textile Selector Swatches */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { id: 'chikankari', label: 'Chikankari', cat: 'Embroidered', state: 'Lucknow, UP' },
                      { id: 'phulkari', label: 'Phulkari', cat: 'Embroidered', state: 'Punjab' },
                      { id: 'patola', label: 'Patola', cat: 'Dyed (Ikat)', state: 'Patan, Gujarat' },
                      { id: 'kanjeevaram', label: 'Kanjeevaram', cat: 'Woven', state: 'Tamil Nadu' },
                      { id: 'kalamkari', label: 'Kalamkari', cat: 'Painted/Printed', state: 'Andhra Pradesh' },
                      { id: 'bagh', label: 'Bagh Print', cat: 'Printed', state: 'Madhya Pradesh' },
                    ].map((t) => (
                      <motion.button
                        key={t.id}
                        aria-label={`Select textile swatch ${t.label}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedTextile(t.id as any);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedTextile === t.id
                            ? 'bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50'
                            : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{t.label}</div>
                        <div className="text-[10px] text-rose-400 font-medium mt-0.5">{t.cat}</div>
                        <div className="text-[9px] text-slate-500">{t.state}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Craft Microscope & TOPIC SVG 2: Textile Layer Anatomy */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Representation A: Surface Microscope</span>
                      <canvas ref={textileCanvasRef} width={260} height={160} className="w-full max-w-[280px] h-[160px] mx-auto rounded-xl border border-slate-700 shadow-inner" />
                      
                      {/* TOPIC SVG 2: Traditional Textile Structural Cross-Section */}
                      <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-left">
                        <span className="text-[10px] font-bold text-slate-400">Representation B: Structural Cross-Section Schematic</span>
                        <svg viewBox="0 0 300 70" className="w-full h-14" aria-label="Textile structural cross section diagram">
                          <rect x="10" y="35" width="280" height="12" rx="3" fill="#334155" />
                          <text x="150" y="44" fill="#94a3b8" fontSize="8" textAnchor="middle">Base Fabric Substrate (Warp & Weft Grid)</text>
                          {selectedTextile === 'chikankari' && (
                            <>
                              <path d="M 40 35 Q 60 10 80 35 Q 100 10 120 35 Q 140 10 160 35" stroke="#38bdf8" strokeWidth="3" fill="none" />
                              <text x="150" y="20" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Shadow Stitch (Bakhiya on Reverse) ✓</text>
                            </>
                          )}
                          {selectedTextile === 'patola' && (
                            <>
                              <rect x="40" y="30" width="40" height="22" fill="#e11d48" opacity="0.8" />
                              <rect x="120" y="30" width="40" height="22" fill="#d97706" opacity="0.8" />
                              <text x="150" y="20" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">Resist-Dyed Warp & Weft Yarns (Double Ikat) ✓</text>
                            </>
                          )}
                          {(selectedTextile !== 'chikankari' && selectedTextile !== 'patola') && (
                            <>
                              <circle cx="80" cy="20" r="10" fill="#ec4899" />
                              <circle cx="220" cy="20" r="10" fill="#ec4899" />
                              <text x="150" y="20" fill="#f472b6" fontSize="9" textAnchor="middle" fontWeight="bold">Surface Ornamentation / Zari / Block Pigment ✓</text>
                            </>
                          )}
                        </svg>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <h4 className="font-bold text-rose-400 text-sm border-b border-slate-800 pb-1">Prescribed 7-Parameter Analysis</h4>
                      <div className="grid grid-cols-2 gap-2 text-slate-300">
                        <div><strong className="text-slate-400">Origin:</strong> {selectedTextile === 'chikankari' ? 'Lucknow, UP (Nur Jahan patronage)' : selectedTextile === 'phulkari' ? 'Punjab rural trousseau' : selectedTextile === 'patola' ? 'Patan, Gujarat (Salvi weavers)' : selectedTextile === 'kanjeevaram' ? 'Kanchipuram, Tamil Nadu' : selectedTextile === 'kalamkari' ? 'Srikalahasti & Machilipatnam, AP' : 'Bagh village, Dhar (MP)'}</div>
                        <div><strong className="text-slate-400">Thread/Yarn:</strong> {selectedTextile === 'chikankari' ? 'Untwisted white cotton' : selectedTextile === 'phulkari' ? 'Silk floss (pat)' : selectedTextile === 'patola' ? 'Pure mulberry silk' : selectedTextile === 'kanjeevaram' ? 'Heavy mulberry silk & gold zari' : selectedTextile === 'kalamkari' ? 'Cotton yarn with natural dye' : 'Cotton, silk, tussar'}</div>
                        <div><strong className="text-slate-400">Color Palette:</strong> {selectedTextile === 'chikankari' ? 'White on white (pristine)' : selectedTextile === 'phulkari' ? 'Vibrant red, yellow, magenta' : selectedTextile === 'patola' ? 'Fast madder red, indigo, yellow' : selectedTextile === 'kanjeevaram' ? 'High contrast jewel tones' : selectedTextile === 'kalamkari' ? 'Indigo, madder, kasimi black' : 'Alizarin red, indigo, iron black'}</div>
                        <div><strong className="text-slate-400">Stitches/Tech:</strong> {selectedTextile === 'chikankari' ? 'Bakhiya, Murri, Phanda, Jali' : selectedTextile === 'phulkari' ? 'Darning stitch from reverse' : selectedTextile === 'patola' ? 'Double Ikat loom alignment' : selectedTextile === 'kanjeevaram' ? 'Korvai interlocking' : selectedTextile === 'kalamkari' ? 'Bamboo kalam freehand / blocks' : 'Hand block stamping + river wash'}</div>
                        <div className="col-span-2"><strong className="text-slate-400">Motifs:</strong> {selectedTextile === 'chikankari' ? 'Paisley (ambi), jasmine, lotus, creepers' : selectedTextile === 'phulkari' ? 'Geometrical flowers, bagh patterns' : selectedTextile === 'patola' ? 'Popat (parrot), Kunjar (elephant), Navratna' : selectedTextile === 'kanjeevaram' ? 'Temple gopuram, Mayil kan (peacock eye), Rudraksha' : selectedTextile === 'kalamkari' ? 'Ramayana epics, Tree of Life, Peacocks' : 'Boota, Buti, Jaal patterns'}</div>
                        <div className="col-span-2"><strong className="text-slate-400">Care & Storage:</strong> Muslin wrapping, acid-free padded folding, dried neem leaves, gentle dry-clean only.</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: LIFESPAN MULTIDIMENSIONAL MATRIX ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {[
                      { key: 'early', label: 'Early Adulthood (20-40y)' },
                      { key: 'middle', label: 'Middle Adulthood (40-65y)' },
                      { key: 'late', label: 'Late Adulthood / Old Age (65+y)' },
                    ].map((st) => (
                      <motion.button
                        key={st.key}
                        aria-label={`Select lifespan stage ${st.label}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setAdulthoodStage(st.key as any);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          adulthoodStage === st.key
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {st.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-rose-400">1. Physical Dimension</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {adulthoodStage === 'early' && 'Peak muscular strength, sensory acuity, optimal cardiovascular stamina, reproductive readiness.'}
                        {adulthoodStage === 'middle' && 'Gradual slowdown in metabolism, visual presbyopia (reading glasses), menopause in women (~45-50y).'}
                        {adulthoodStage === 'late' && 'Reduction in bone density, diminished muscle mass (sarcopenia), joint stiffness; needs ICMR calcium/vit-D.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-indigo-400">2. Cognitive Dimension</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {adulthoodStage === 'early' && 'Transition from knowledge acquisition to practical career problem-solving and expertise.'}
                        {adulthoodStage === 'middle' && 'Peak Crystallized Intelligence: deep practical wisdom, strategic leadership, managerial mastery.'}
                        {adulthoodStage === 'late' && 'Processing speed slows, but crystallized wisdom, vocabulary, and moral advisory skills endure.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-amber-400">3. Emotional Dimension</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {adulthoodStage === 'early' && 'Erikson: Intimacy vs Isolation. Navigating marriage, deep emotional bonds, and work-life balance.'}
                        {adulthoodStage === 'middle' && 'Generativity vs Stagnation. Mentoring youth, coping with empty-nest syndrome or dual caregiving.'}
                        {adulthoodStage === 'late' && 'Integrity vs Despair. Reflecting on life achievements, finding peace, coping with bereavement.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400">4. Social / Indian Norms</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {adulthoodStage === 'early' && 'Entering workforce, arranged marriage norms (avg ~22-25y), setting up household unit.'}
                        {adulthoodStage === 'middle' && 'Classic "Sandwich Generation" supporting college-going youth and elderly parents together.'}
                        {adulthoodStage === 'late' && 'Grandparenting, community mentorship; safeguarded by Maintenance & Welfare of Senior Citizens Act.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: MULTI-BARRIER WATER PURIFIER & TOPIC SVG 3 PURIFICATION CASCADE ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-bold text-slate-200 mb-3">Multi-Barrier Treatment Sequence for Turbid Surface Water</h4>
                    
                    {/* TOPIC SVG 3: Water Purification Multi-Barrier Cascade */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mb-4">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">Multi-Barrier Household Water Safety Cascade (IS 10500)</div>
                      <svg viewBox="0 0 450 80" className="w-full h-16" aria-label="Water purification process diagram">
                        {/* Step 1 Box */}
                        <rect x="10" y="10" width="120" height="60" rx="8" fill={waterAlumAdded ? '#065f46' : '#1e293b'} stroke={waterAlumAdded ? '#34d399' : '#475569'} strokeWidth="2" />
                        <text x="70" y="32" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">1. Alum Flocculation</text>
                        <text x="70" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">{waterAlumAdded ? '✓ Flocs Settled' : 'Colloids Suspended'}</text>

                        {/* Arrow 1 */}
                        <path d="M 135 40 L 155 40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Step 2 Box */}
                        <rect x="160" y="10" width="120" height="60" rx="8" fill={waterFiltered ? '#065f46' : '#1e293b'} stroke={waterFiltered ? '#34d399' : '#475569'} strokeWidth="2" />
                        <text x="220" y="32" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">2. Sand/Cloth Filter</text>
                        <text x="220" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">{waterFiltered ? '✓ Turbidity Removed' : 'Turbid Supernatant'}</text>

                        {/* Arrow 2 */}
                        <path d="M 285 40 L 305 40" stroke="#64748b" strokeWidth="2" />

                        {/* Step 3 Box */}
                        <rect x="310" y="10" width="130" height="60" rx="8" fill={waterBoiled ? '#065f46' : '#1e293b'} stroke={waterBoiled ? '#34d399' : '#475569'} strokeWidth="2" />
                        <text x="375" y="32" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">3. Boil / Disinfect</text>
                        <text x="375" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">{waterBoiled ? '✓ Pathogen Free' : 'Germ Hazard'}</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Step 1: Alum Coagulation */}
                      <div className={`p-4 rounded-xl border transition-all ${waterAlumAdded ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">Step 1: Alum Flocculation</span>
                          <span className="text-lg">🧪</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Add potassium aluminium sulphate to bind colloidal clay into flocs.</p>
                        <motion.button
                          aria-label="Toggle Alum addition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setWaterAlumAdded(!waterAlumAdded);
                            audioManager.play('tap');
                          }}
                          className={`w-full py-1.5 rounded-lg text-xs font-bold ${waterAlumAdded ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                        >
                          {waterAlumAdded ? '✓ Alum Added (Settled)' : '+ Add Alum Dose'}
                        </motion.button>
                      </div>

                      {/* Step 2: Filtration / Decanting */}
                      <div className={`p-4 rounded-xl border transition-all ${waterFiltered ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">Step 2: Clean Filtration</span>
                          <span className="text-lg">🏺</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Decant clear supernatant and pass through candle/sand-charcoal filter.</p>
                        <motion.button
                          aria-label="Filter supernatant water"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!waterAlumAdded}
                          onClick={() => {
                            setWaterFiltered(!waterFiltered);
                            audioManager.play('tap');
                          }}
                          className={`w-full py-1.5 rounded-lg text-xs font-bold ${!waterAlumAdded ? 'bg-slate-900 text-slate-600 cursor-not-allowed' : waterFiltered ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                        >
                          {waterFiltered ? '✓ Filtered & Decanted' : 'Pass Through Filter'}
                        </motion.button>
                      </div>

                      {/* Step 3: Rolling Boiling / Chlorination */}
                      <div className={`p-4 rounded-xl border transition-all ${waterBoiled ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">Step 3: Biological Disinfection</span>
                          <span className="text-lg">🔥</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Rolling boil for &ge;1 min (3 min at altitude) to destroy bacteria/viruses.</p>
                        <motion.button
                          aria-label="Boil water for disinfection"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!waterFiltered}
                          onClick={() => {
                            setWaterBoiled(!waterBoiled);
                            audioManager.play(waterBoiled ? 'tap' : 'success');
                          }}
                          className={`w-full py-1.5 rounded-lg text-xs font-bold ${!waterFiltered ? 'bg-slate-900 text-slate-600 cursor-not-allowed' : waterBoiled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                        >
                          {waterBoiled ? '✓ Disinfected & Potable' : 'Boil Water (1 min)'}
                        </motion.button>
                      </div>
                    </div>

                    {/* Water Status Output */}
                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">Potability Quality Index:</span>
                      <span className={`text-xs font-black ${waterAlumAdded && waterFiltered && waterBoiled ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {waterAlumAdded && waterFiltered && waterBoiled
                          ? '✓ 100% SAFE POTABLE WATER (BIS IS 10500 Compliant)'
                          : '✗ INCOMPLETE PURIFICATION — Pathogen/Turbidity Risk'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: ICDS 6-SERVICE CONVERGENCE HUB ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Village Anganwadi Focal Center (0-6 Years & Mothers)</span>
                    <h4 className="text-base font-bold text-white mt-1 mb-4">The 6 Landmark Integrated Services</h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: 0, name: 'Supplementary Nutrition', desc: '500 kcal for kids (800 for SAM), 600 kcal for pregnant mothers (ragi, dal, local millets).' },
                        { id: 1, name: 'Immunization UIP', desc: 'BCG, OPV, Pentavalent, Measles-Rubella under Mission Indradhanush.' },
                        { id: 2, name: 'Health Check-ups', desc: 'Monthly growth monitoring by ANM and AWW using WHO growth charts.' },
                        { id: 3, name: 'Referral Services', desc: 'Fast-track emergency transfer to Nutrition Rehabilitation Centres (NRC) / PHCs.' },
                        { id: 4, name: 'Non-formal Preschool', desc: 'Play-based cognitive, motor, and social readiness for 3-6 year olds.' },
                        { id: 5, name: 'Nutrition & Health Ed (NHE)', desc: 'Empowering reproductive mothers on exclusive breastfeeding & dietary diversity.' },
                      ].map((srv) => (
                        <motion.button
                          key={srv.id}
                          aria-label={`View details for ICDS service: ${srv.name}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setActiveIcdsService(srv.id);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            activeIcdsService === srv.id
                              ? 'bg-indigo-950 border-indigo-500 shadow-md shadow-indigo-950/50'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{srv.name}</div>
                          <p className="text-[10px] text-slate-400 mt-1 leading-snug">{srv.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Bottom Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('whoosh');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold text-white"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-bold text-slate-400">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Open Sandbox"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Enter Open Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Zero-Stakes Free Play Sandbox</span>
              <h3 className="text-xl font-bold text-white">Adolescent & Community Ecosystem Playground</h3>
              <p className="text-slate-400 text-xs mt-1">Freely manipulate all sliders and observe dynamic systemic feedback with no test scoring.</p>
            </div>
            <motion.button
              aria-label="Start Board Mastery Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold shadow-xl flex items-center gap-2"
            >
              Start Board Mastery Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase text-indigo-400">Psychosocial Sandbox Matrix</h4>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Recreational Screen-Time</span>
                  <span className="text-rose-400 font-bold">{screenTimeHours}h</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={0.5}
                  aria-label="Adjust screen time in sandbox"
                  value={screenTimeHours}
                  onChange={(e) => setScreenTimeHours(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Family Openness & Trust</span>
                  <span className="text-emerald-400 font-bold">{familySupportScore}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  aria-label="Adjust family openness in sandbox"
                  value={familySupportScore}
                  onChange={(e) => setFamilySupportScore(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl flex justify-around text-center">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold">EMOTIONAL INDEX</span>
                  <div className="text-base font-black text-white">{emotionalStability}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold">FOCUS INDEX</span>
                  <div className="text-base font-black text-white">{academicFocus}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold">SLEEP ARCHITECTURE</span>
                  <div className="text-base font-black text-white">{sleepQuality}%</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-rose-400">Observation Checkpoint</h4>
                <p className="text-xs text-slate-300 mt-2">{OBSERVATION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 gap-2 mt-3">
                  {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Select observation answer ${i + 1}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleObservation(i)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
              {observationAnswered && (
                <div className="p-2 bg-emerald-950/50 border border-emerald-800 rounded-lg text-emerald-300 text-[11px]">
                  ✓ Correct observation! Strong family dialogue and constructive peers create an unshakeable protective buffer.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE SUITE (NEP 2020 / CISCE 2026) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-900/80 text-indigo-300 border border-indigo-700">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 uppercase tracking-wider">
                  NEP Level: {challenge.competencyLevel}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-400">
                Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/50 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ & Distinguish Formats */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-900/40 border-rose-600 text-rose-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-indigo-500'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Diagram Format */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-bold">Palette: Drag labels to destination boxes below:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable textile label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'box_emb', title: '1. Embroidered (Surface Stitching)' },
                    { id: 'box_wov', title: '2. Woven (Structural Loom Design)' },
                    { id: 'box_dye', title: '3. Dyed (Yarn / Fabric Resist)' },
                    { id: 'box_prt', title: '4. Printed (Relief Block Stamped)' },
                  ].map((box) => (
                    <div
                      key={box.id}
                      aria-label={`Dropzone for ${box.title}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(box.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                    >
                      <span className="text-xs font-semibold text-slate-400">{box.title}</span>
                      <div className="text-sm font-bold text-rose-400 mt-2">
                        {droppedLabels[box.id] ? `✓ ${droppedLabels[box.id]}` : 'Drop matching textile here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Classification Mapping"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Verify Classification Mapping
                </motion.button>
              </div>
            )}

            {/* Drag Sort Sequence Format */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-semibold">Rearrange items in sequential chronological order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-indigo-400 text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check step ordering"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Check Step Order
                </motion.button>
              </div>
            )}

            {/* Numeric Format */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter numeric answer"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-48"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric value"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Parts Assembly Format */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300 font-semibold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] space-y-2">
                  <span className="text-[11px] text-slate-500 block">Assembled Strategy Pipeline:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((cPart, cIdx) => (
                      <motion.div
                        key={cIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-indigo-950 border border-indigo-700 rounded-lg text-xs text-indigo-200 flex items-center gap-2"
                      >
                        <span>{cIdx + 1}. {cPart}</span>
                        <button
                          aria-label={`Remove part: ${cPart}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to assemble sequence...</span>}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Constructed Sequence"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Verify Constructed Sequence
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <span>📖</span> Detailed Board Examination Rationale
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{sIdx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next reasoning step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold mt-2"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <div className="pt-2">
                    <motion.button
                      aria-label="Proceed to next question"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Proceed to Next Question →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK SUITE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-indigo-950/70 rounded-2xl border border-emerald-700/60 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Board Mastery Achievement Complete!</h2>
            
            {/* MOTIVATIONAL FEEDBACK TIERS */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-700 max-w-lg mx-auto">
              <span className="text-base font-extrabold text-amber-300">
                {errors === 0 && 'PERFECT SCORE!'}
                {errors >= 1 && errors <= 3 && 'Great work!'}
                {errors >= 4 && errors <= 7 && 'Good effort!'}
                {errors >= 8 && 'Do not give up — You WILL get this!'}
              </span>
            </div>

            {/* SPACED REPETITION VISIBILITY CARD */}
            <div className="p-4 bg-indigo-950/70 rounded-xl border border-indigo-600/80 max-w-lg mx-auto text-center space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                📅 Spaced Repetition Schedule (SRS)
              </span>
              <div className="text-lg font-black text-white">
                Review this topic again in <span className="text-emerald-400">{srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {errors === 0
                  ? 'Outstanding retention! 0 errors recorded — review in 7 days to maintain long-term memory.'
                  : errors <= 3
                  ? 'Strong foundational mastery! 1-3 errors recorded — review in 3 days to consolidate nuances.'
                  : 'Needs timely reinforcement! 4+ errors recorded — review in 1 day to solidify key frameworks.'}
              </p>
            </div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have thoroughly synthesized the 12 ISC Home Science Class 12 nodes across Human Development, Traditional Textiles, and Communication Extension.
            </p>
            
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center min-w-[110px]">
                <span className="text-[10px] uppercase font-bold text-slate-400">Final Score</span>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center min-w-[110px]">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Errors</span>
                <div className="text-2xl font-black text-rose-400">{errors}</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center min-w-[110px]">
                <span className="text-[10px] uppercase font-bold text-slate-400">Mastery Level</span>
                <div className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Rectifications:</h3>
              <div className="grid grid-cols-1 gap-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-400">✗ Misconception: {m.misconception}</p>
                      <p className="text-xs font-semibold text-emerald-400">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Action Portfolio */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🌱</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE INTERACTIVE OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSparkles && <SparkleBurst x={0} y={0} onComplete={() => setShowSparkles(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Unlocked!" onComplete={() => setShowSuccess(false)} />}
    </div>
  );
}

export default C12_HomeScienceIssuesConcernsAdolescentsSim;