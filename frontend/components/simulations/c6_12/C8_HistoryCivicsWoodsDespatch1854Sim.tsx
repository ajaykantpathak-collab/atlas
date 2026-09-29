'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ───
const NODE_C8_HISTCIV_031 = 'c8_histciv_031';
const NODE_C8_HISTCIV_032 = 'c8_histciv_032';
const NODE_C8_HISTCIV_033 = 'c8_histciv_033';
const NODE_C8_HISTCIV_034 = 'c8_histciv_034';
const NODE_C8_HISTCIV_035 = 'c8_histciv_035';
const NODE_C8_HISTCIV_036 = 'c8_histciv_036';
const NODE_C8_HISTCIV_037 = 'c8_histciv_037';
const NODE_C8_HISTCIV_038 = 'c8_histciv_038';
const NODE_C8_HISTCIV_039 = 'c8_histciv_039';
const NODE_C8_HISTCIV_040 = 'c8_histciv_040';

const ALL_NODE_IDS = [
  NODE_C8_HISTCIV_031,
  NODE_C8_HISTCIV_032,
  NODE_C8_HISTCIV_033,
  NODE_C8_HISTCIV_034,
  NODE_C8_HISTCIV_035,
  NODE_C8_HISTCIV_036,
  NODE_C8_HISTCIV_037,
  NODE_C8_HISTCIV_038,
  NODE_C8_HISTCIV_039,
  NODE_C8_HISTCIV_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Crucible of 19th-Century India (1829–1883)',
  intro: 'You are an archivist and historian examining the revolutionary decades that reshaped modern India. From Wood\'s Despatch and the abolition of Sati to the fiery uprisings of 1857 and the socio-religious renaissance, key decisions altered the nation\'s destiny.',
  context: 'Examine primary documents, inspect battle corridors, analyse social reforms, and reconstruct how legislative acts, military sparks, and reformist philosophies laid the foundation for modern India.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In July 1854, Sir Charles Wood issued a landmark educational despatch, and by 1857 three major universities were established. Why did this same year (1857) witness the greatest armed rebellion against the East India Company?',
  options: [
    'Wood\'s Despatch immediately closed all traditional schools, sparking instant armed revolt across India.',
    'Decades of accumulated political, economic, military, and socio-religious grievances finally converged and exploded.',
    'The 1857 uprising was purely about higher education fees in Calcutta, Bombay, and Madras.',
    'The East India Company had voluntarily decided to hand over power to the Mughal Emperor in 1857.'
  ],
  correctIndex: 1,
  hintAfter: 'Education policy was just one facet of colonial transformation; deep systemic tensions across the princely states, army, and society reached a boiling point simultaneously.',
};

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the British colonial government had NOT annexed Awadh in 1856, how would the Bengal Army sepoy morale in 1857 have been affected?',
    options: [
      'The sepoys would have rebelled even faster because they hated the Awadh Nawab.',
      'Sepoy discontent would have been significantly reduced because 60,000 soldiers would not have suffered personal family land and prestige losses.',
      'There would have been zero effect because soldiers cared only about their footwear.',
      'European soldiers would have mutinied instead.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the "Awadh Annexation Factor" to observe how the Sepoy Grievance Index shifts in real-time!',
    nodeId: NODE_C8_HISTCIV_033,
  },
  {
    question: 'Predict: If the European-to-Indian soldier ratio in the Bengal Army is changed from 1:5 (pre-1857) to 1:2 (post-1857), what will happen to the likelihood of an armed sepoy takeover?',
    options: [
      'It will drastically decrease because Indian soldiers will no longer possess overwhelming numbers or control heavy artillery.',
      'It will increase because Indian soldiers will easily outvote European officers.',
      'It will remain completely unaffected because weapons determine everything, not soldiers.',
      'European soldiers will immediately surrender their posts.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Now adjust the Bengal Army European-to-Indian Ratio slider in the Sandbox to verify how strategic balance shifts!',
    nodeId: NODE_C8_HISTCIV_036,
  }
];

// ─── OBSERVATION QUESTIONS (Brilliant 'What do you notice?' pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'What do you notice about the educational hierarchy under Wood\'s Despatch in Lab 1 as you inspect the tiers?',
    observableOptions: [
      'Apex universities use English while grassroots primary schools focus on regional vernacular languages.',
      'All primary schools are taught strictly in Latin and Greek.',
      'The Department of Public Instruction is placed at the bottom of the structure.',
      'Universities were established exclusively in rural villages.'
    ],
    correctIndex: 0,
    explanation: 'Wood\'s Despatch established a structured pyramid where primary schools used vernaculars to reach the masses, while apex universities in Calcutta, Bombay, and Madras used English.',
    nodeId: NODE_C8_HISTCIV_031,
  },
  {
    id: 'obs_02',
    question: 'What do you notice happens to the Combined 1857 Rebellion Index in Lab 3 when all four systemic pressure levers (Political, Economic, Religious, Military) exceed 75%?',
    observableOptions: [
      'The gauge transitions from "Simmering" to "Critical Explosion" as accumulated systemic tensions ignite.',
      'The gauge resets back to 0% and eliminates all unrest.',
      'Only the religious pressure bar lights up while other bars turn off.',
      'The rebellion index stays at exactly 50% regardless of input values.'
    ],
    correctIndex: 0,
    explanation: 'When multiple structural grievances combine with the military spark, the cumulative tension breaches the critical explosion threshold.',
    nodeId: NODE_C8_HISTCIV_034,
  }
];

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

// ─── CHALLENGES ARRAY (24 diverse challenges across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 to 8) ---
  {
    id: 'ch_01',
    nodeId: NODE_C8_HISTCIV_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is Wood\'s Despatch of 19 July 1854 known as the "Magna Carta of English Education in India"?',
    options: [
      'It introduced English for the very first time in missionary schools.',
      'It provided the first comprehensive and systematic public education framework with universities and departments.',
      'It made English the only allowed language from grade 1 to university.',
      'It banned all vernacular primary schools across British territories.'
    ],
    correctIndex: 1,
    explanation: 'Wood\'s Despatch systematised public education by establishing Departments of Public Instruction, three universities in 1857, grants-in-aid, and a two-tier language policy. English was for higher education, vernacular for primary.',
    hints: [
      'Think about whether English was already present or being newly systematised into an institutional framework.',
      'Consider the role of the 1857 universities at Calcutta, Bombay, and Madras.',
      'It created an entire structured public education system with grants and departments.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: NODE_C8_HISTCIV_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following explains why Rani Lakshmibai of Jhansi fought against the British in 1857?',
    options: [
      'Her kingdom was annexed in 1853 because the British refused to recognise her adopted son Damodar Rao under the Doctrine of Lapse.',
      'She was accused of misgovernance like Nawab Wajid Ali Shah of Awadh.',
      'She demanded the revival of the Peshwaship and an annual pension of Rs 8 lakh.',
      'Her royal treasury was confiscated due to the Permanent Settlement of 1793.'
    ],
    correctIndex: 0,
    explanation: 'Under Lord Dalhousie\'s Doctrine of Lapse (1848), adopted heirs were excluded from inheriting sovereign power. Damodar Rao\'s claim to Jhansi was rejected in 1853, prompting Rani Lakshmibai\'s resistance.',
    hints: [
      'Look at the rule regarding adopted male heirs vs natural male heirs.',
      'Awadh was misgovernance; Jhansi was the Doctrine of Lapse.',
      'Maharaja Gangadhar Rao had adopted Damodar Rao, which Dalhousie rejected.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03',
    nodeId: NODE_C8_HISTCIV_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What specific protection did the Religious Disabilities Act of 1850 grant that alarmed orthodox Hindus?',
    options: [
      'It made conversion to Christianity mandatory for government employment.',
      'It permitted Hindu converts to Christianity to retain their right to inherit ancestral property.',
      'It abolished the caste system in all military cantonments.',
      'It made English instruction compulsory in temple schools.'
    ],
    correctIndex: 1,
    explanation: 'Orthodox Hindu customary law stripped converts of family inheritance. The 1850 Act removed this penalty, which orthodox society saw as a state-sponsored incentive to promote Christian missionary conversion.',
    hints: [
      'The law related to ancestral wealth and family inheritance.',
      'Previously, leaving Hinduism meant losing ancestral land and property rights.',
      'It protected converts\' property rights, seen as encouraging conversion.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_04',
    nodeId: NODE_C8_HISTCIV_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did the Enfield rifle cartridges introduced in January 1857 offend both Hindu and Muslim sepoys at once?',
    options: [
      'The cartridges were manufactured using cheap brass that injured fingers.',
      'The paper cartridge was greased with cow fat (sacred to Hindus) and pig fat (forbidden/haram to Muslims), requiring biting.',
      'The cartridges were overly expensive and deducted directly from the sepoys\' monthly wages.',
      'Only European soldiers were allowed to carry the newly issued rifle.'
    ],
    correctIndex: 1,
    explanation: 'Loading the Enfield rifle required biting open the cartridge wrapper. The grease, containing cow and pig tallow, simultaneously violated Hindu reverence for the cow and Islamic dietary prohibition of swine.',
    hints: [
      'Think about animal fats and dietary taboos in both major faiths.',
      'The loading procedure required using the teeth to bite open the cartridge.',
      'Cow fat offended Hindus; pig fat was haram for Muslims.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_05',
    nodeId: NODE_C8_HISTCIV_035,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each prominent 1857 leader to their primary centre of revolt.',
    dragItems: [
      { label: 'Bahadur Shah Zafar', targetId: 'loc_delhi' },
      { label: 'Nana Saheb', targetId: 'loc_kanpur' },
      { label: 'Begum Hazrat Mahal', targetId: 'loc_lucknow' },
      { label: 'Rani Lakshmibai', targetId: 'loc_jhansi' }
    ],
    correctMapping: {
      loc_delhi: 'Bahadur Shah Zafar',
      loc_kanpur: 'Nana Saheb',
      loc_lucknow: 'Begum Hazrat Mahal',
      loc_jhansi: 'Rani Lakshmibai'
    },
    explanation: 'Bahadur Shah Zafar was the symbolic figurehead at Delhi; Nana Saheb led Kanpur with Tantia Tope; Begum Hazrat Mahal led the Awadh resistance at Lucknow; Rani Lakshmibai defended Jhansi.',
    hints: [
      'The last Mughal Emperor resided at the Red Fort in Delhi.',
      'The adopted son of Peshwa Baji Rao II led at Kanpur.',
      'The Begum of Awadh led the siege at the Lucknow Residency.'
    ]
  },
  {
    id: 'ch_06',
    nodeId: NODE_C8_HISTCIV_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which legal measure in 1829 was passed by Lord William Bentinck following Raja Ram Mohan Roy\'s relentless campaign?',
    options: [
      'Regulation XVII banning Sati in the Bengal Presidency',
      'The Hindu Widows\' Remarriage Act (Act XV)',
      'The General Service Enlistment Act',
      'The Doctrine of Lapse Charter'
    ],
    correctIndex: 0,
    explanation: 'Regulation XVII of 1829 declared the practice of Sati illegal and punishable as culpable homicide in the Bengal Presidency. Raja Ram Mohan Roy supported this with both humanitarian reason and shastric evidence.',
    hints: [
      'The campaign targeted the horrific burning of widows on funeral pyres.',
      'It was enacted in 1829 under Governor-General Bentinck.',
      'Regulation XVII outlawed Sati.'
    ]
  },
  {
    id: 'ch_07',
    nodeId: NODE_C8_HISTCIV_039,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many girls\' schools did Ishwar Chandra Vidyasagar establish across Bengal between 1857 and 1858?',
    correctAnswer: 35,
    tolerance: 0,
    unit: 'schools',
    explanation: 'Vidyasagar pioneered female literacy by setting up 35 model schools for girls between 1857 and 1858 at his own expense and initiative, despite severe orthodox opposition and colonial funding refusals.',
    hints: [
      'The number is between 30 and 40.',
      'He opened exactly three dozen minus one schools.',
      'The exact historical figure is 35.'
    ]
  },
  {
    id: 'ch_08',
    nodeId: NODE_C8_HISTCIV_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What did Swami Dayanand Saraswati\'s clarion call "Back to the Vedas" specifically advocate?',
    options: [
      'Revival of all Puranic rituals, temple idol worship, and strict hereditary caste.',
      'Accepting only the four Vedas as infallible scripture while rejecting idol worship, caste by birth, and untouchability.',
      'Adopting British legal codes and modern Western secularism.',
      'Translating English scientific literature into Sanskrit alone.'
    ],
    correctIndex: 1,
    explanation: '"Back to the Vedas" meant returning to the pristine Vedic monotheism and merit-based varna system while rejecting later corruptions like idol worship, child marriage, untouchability, and the Puranas.',
    hints: [
      'Dayanand rejected the Puranas and later texts as human corruptions.',
      'He believed the original Vedas taught one formless God and merit over birth.',
      'It was a selective return to the 4 Vedas, not a blind revival of all medieval customs.'
    ],
    misconceptionIndex: 4
  },

  // --- STANDARD TIER (9 to 16) ---
  {
    id: 'ch_09',
    nodeId: NODE_C8_HISTCIV_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How did Wood\'s Despatch (1854) differ fundamentally from Macaulay\'s Minute (1835) regarding language policy?',
    options: [
      'Wood\'s Despatch rejected English entirely in favor of Persian.',
      'Wood\'s Despatch instituted a two-tier policy: vernaculars for primary education and English for higher education, unlike Macaulay\'s exclusive focus on English.',
      'Macaulay promoted Sanskrit while Wood promoted Arabic.',
      'Wood\'s Despatch mandated that all university lectures must be delivered in local dialects.'
    ],
    correctIndex: 1,
    explanation: 'Macaulay\'s Minute advocated English to create a class of Anglicised intermediaries. Wood\'s Despatch established a structured pyramid: primary schools in vernacular languages to reach the masses, transitioning to English for higher collegiate education.',
    hints: [
      'Check the medium of instruction at the primary vs university level in 1854.',
      'Macaulay pushed exclusively English education for elites (downward filtration).',
      'Wood recognized the importance of mother tongues for primary schooling.'
    ]
  },
  {
    id: 'ch_10',
    nodeId: NODE_C8_HISTCIV_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why was the annexation of Awadh (Oudh) in 1856 legally distinct from the annexations of Satara, Jhansi, and Nagpur?',
    options: [
      'Awadh was conquered in open battlefield combat during the Anglo-Maratha Wars.',
      'Awadh was annexed on the pretext of "misgovernance" by Nawab Wajid Ali Shah, despite having natural heirs, whereas Satara and Jhansi were seized under the Doctrine of Lapse for lack of natural male heirs.',
      'Awadh was bought from the French East India Company.',
      'Awadh requested voluntary merger into British India to escape Maratha raids.'
    ],
    correctIndex: 1,
    explanation: 'Dalhousie annexed Satara (1848), Jhansi (1853), and Nagpur (1853) using the Doctrine of Lapse (no biological male heir). Awadh was a faithful ally with legitimate heirs; Dalhousie annexed it under the pretext of maladministration, proving no state was safe.',
    hints: [
      'Compare the legal justifications: lack of biological heir vs administrative misrule.',
      'Nawab Wajid Ali Shah had legitimate heirs and had remained a loyal British ally.',
      'Misgovernance was the justification used for Awadh in 1856.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_11',
    nodeId: NODE_C8_HISTCIV_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did the annexation of Awadh directly ignite economic distress within the Bengal Army ranks?',
    options: [
      'It stopped food rations supplied to British naval ports.',
      'Nearly 60,000 sepoys in the Bengal Army hailed from Awadh, and their families suddenly lost land, legal privileges, and court patronage under the new British revenue settlement.',
      'All Awadh sepoys were immediately dismissed without pensions in 1856.',
      'The British forced Awadh soldiers to relocate to Burma permanently.'
    ],
    correctIndex: 1,
    explanation: 'Awadh was known as the "nursery of the Bengal Army" (supplying ~60,000 out of 1,40,000 soldiers). Annexation stripped their families of traditional tax exemptions and court prestige, making the soldier\'s family grievances personal.',
    hints: [
      'Consider the demographic origin of the sepoys in the Bengal Army.',
      'A sepoy was essentially a "peasant in uniform" connected to his home village.',
      'Over 40% of the Bengal Army came from Awadh families affected by land revenue revision.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: NODE_C8_HISTCIV_034,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the critical military milestones of early 1857 in chronological sequence.',
    sortItems: [
      'Enfield rifle introduced at Dum Dum arsenal with greased cartridges (Jan 1857)',
      'Mangal Pandey revolts at Barrackpore against officers (29 March 1857)',
      'Mangal Pandey executed by hanging after court-martial (8 April 1857)',
      '85 cavalry sepoys court-martialled & shackled at Meerut (9 May 1857)',
      'Meerut sepoys break jail, kill British officers, and march to Delhi (10 May 1857)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'January 1857 (Dum Dum rifle introduction) -> 29 March 1857 (Barrackpore attack) -> 8 April (Mangal Pandey hanged) -> 9 May (Meerut public shackling) -> 10 May (Revolt outbreak and march to Delhi).',
    hints: [
      'Start with the introduction of the rifle in January.',
      'Mangal Pandey\'s action in March preceded his April execution.',
      'The Meerut sentencing on 9 May triggered the prison break on 10 May.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: NODE_C8_HISTCIV_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the post-1857 army reorganisation, why did the British fix the European-to-Indian soldier ratio at 1:2 in Bengal and reserve all artillery for Europeans?',
    options: [
      'To reduce expenditure on Indian uniforms and rations.',
      'To ensure Indian troops could never hold superior firepower or numerical overwhelming force in any future mutiny.',
      'Because Indian troops refused to operate modern iron cannons.',
      'To comply with the international Geneva conventions of 1858.'
    ],
    correctIndex: 1,
    explanation: 'The Peel Commission recommended keeping decisive military advantages in European hands: doubling the proportion of British troops in Bengal (1:2) and reserving heavy artillery exclusively for Europeans prevented sepoys from seizing strategic firepower.',
    hints: [
      'Consider how the sepoys in 1857 seized the Delhi magazine and artillery.',
      'The British wanted to guarantee that sepoys could never overpower European garrisons.',
      'Control of artillery and strategic balance of numbers prevented repeat rebellions.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_C8_HISTCIV_037,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the historiographical interpretation of 1857 to the corresponding scholar or work.',
    options: [
      'Sir John Kaye -> Sepoy Mutiny; V.D. Savarkar -> First War of Independence; S.N. Sen -> Balanced intermediate; Eric Stokes -> Peasant & Elite dual character',
      'Sir John Kaye -> First War of Independence; V.D. Savarkar -> Sepoy Mutiny; Eric Stokes -> Pure religious crusade',
      'V.D. Savarkar -> Peasant rebellion; S.N. Sen -> Feudal conspiracy; Kaye -> National revolution',
      'Eric Stokes -> Sepoy Mutiny; Kaye -> Marxist struggle; Savarkar -> Accidental riot'
    ],
    correctIndex: 0,
    explanation: 'Kaye (1864) labelled it a "Sepoy Mutiny"; Savarkar (1909) named it the "First War of Independence"; S.N. Sen (1957) saw both mutiny and popular revolt elements; Stokes (1986) highlighted regional agrarian and elite dimensions.',
    hints: [
      'Kaye wrote from the British imperial viewpoint.',
      'Savarkar wrote the famous 1909 nationalist work banned by the colonial state.',
      'S.N. Sen provided the centennial 1957 balanced academic assessment.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: NODE_C8_HISTCIV_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What made Raja Ram Mohan Roy\'s anti-Sati strategy so intellectually devastating to orthodox pandits?',
    options: [
      'He threatened orthodox priests with physical violence and expulsion.',
      'He cited the original Sanskrit Vedas and Upanishads to prove that Sati was never mandated as an obligatory Vedic duty, combining shastric authority with humanitarian reason.',
      'He argued that British Christian morality was inherently superior to all Indian philosophy.',
      'He forged ancient manuscripts to mislead the Governor-General.'
    ],
    correctIndex: 1,
    explanation: 'Roy did not attack Hinduism from outside; as a Sanskrit scholar, he proved from the Shastras that Sati was a later corruption without Vedic mandate. This deprived orthodoxy of their scriptural defense while giving Bentinck justification to enact Regulation XVII.',
    hints: [
      'Notice his dual use of ancient scripture and Enlightenment rationality.',
      'He challenged the pandits on their own home ground of Vedic texts.',
      'He demonstrated that ancient texts recommended ascetic widowhood, not suicide.'
    ]
  },
  {
    id: 'ch_16',
    nodeId: NODE_C8_HISTCIV_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did Ishwar Chandra Vidyasagar secure the passage of the Hindu Widows\' Remarriage Act (Act XV) on 26 July 1856?',
    options: [
      'He led an armed rebellion in Midnapore against the Company courts.',
      'He cited the Parashara Smriti to prove widow remarriage was sanctioned in the Kali Yuga, submitted a mass petition with hundreds of signatures, and arranged the first legal remarriage himself.',
      'He converted to Christianity to force the colonial council into action.',
      'He persuaded Lord Dalhousie to impose martial law in orthodox quarters.'
    ],
    correctIndex: 1,
    explanation: 'Vidyasagar cited ancient authorities including Parashara Smriti ("in times of calamity..."), collected hundreds of signatures on a formal petition in 1855, and famously financed the marriage of his protégé Srischandra Vidyaratna to widow Kalimati Devi in 1856.',
    hints: [
      'He used classical Smriti texts to prove widow remarriage was legitimate.',
      'He followed Roy\'s method: shastric proof + public petition + exemplary personal action.',
      'He arranged the first remarriage between Srischandra Vidyaratna and Kalimati Devi.'
    ]
  },

  // --- ADVANCED TIER (17 to 24) ---
  {
    id: 'ch_17',
    nodeId: NODE_C8_HISTCIV_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the administrative educational hierarchy recommended by Wood\'s Despatch of 1854 from highest level to grassroots foundation.',
    availableParts: [
      'Universities at Calcutta, Bombay, Madras (English Medium)',
      'Affiliated Colleges & High Schools (Anglo-Vernacular)',
      'Middle Schools & Primary Pathshalas (Vernacular Medium)',
      'Department of Public Instruction in each Province (DPI)'
    ],
    targetState: 'Department of Public Instruction in each Province (DPI) -> Universities at Calcutta, Bombay, Madras (English Medium) -> Affiliated Colleges & High Schools (Anglo-Vernacular) -> Middle Schools & Primary Pathshalas (Vernacular Medium)',
    validationHint: 'Start with the provincial supervisory department, then the apex universities, descending through high schools to primary vernacular pathshalas.',
    explanation: 'Wood\'s Despatch established a complete administrative pyramid: the DPI governed the province, universities served as apex examining bodies, high schools prepared bilingual students, and vernacular primary schools educated the broad public.',
    hints: [
      'The Department of Public Instruction oversaw provincial administration.',
      'Universities (1857) sat at the apex of academic qualification.',
      'Vernacular primary schools formed the bottom grassroots tier.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_C8_HISTCIV_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze why Nana Saheb of Kanpur took leadership of the 1857 uprising despite not having lost a sovereign kingdom like Jhansi.',
    options: [
      'He was promised the Mughal throne in Delhi by Bahadur Shah Zafar.',
      'As the adopted son of the last Peshwa Baji Rao II, Lord Dalhousie stopped his annual pension of Rs 8 lakh in 1851, applying the anti-adoption principle to financial treaties.',
      'His private estate was confiscated by the British for refusing to pay land tax.',
      'He was court-martialled from the 3rd Light Cavalry at Meerut.'
    ],
    correctIndex: 1,
    explanation: 'Baji Rao II had surrendered his Maratha kingdom in 1818 in exchange for a guaranteed annual pension of Rs 8 lakh. When he died in 1851, Dalhousie refused to transfer the pension to adopted son Nana Saheb, creating a profound grievance of betrayal.',
    hints: [
      'Focus on the refusal of the Rs 8 lakh pension after Baji Rao II died in 1851.',
      'Dalhousie applied the anti-adoption rule to financial pensions as well.',
      'Nana Saheb sought the restoration of the Peshwa title and promised pension.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_19',
    nodeId: NODE_C8_HISTCIV_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did Rani Lakshmibai of Jhansi die at Kotah-ki-Serai near Gwalior on 17 June 1858 rather than inside the Jhansi Fort?',
    options: [
      'She surrendered Jhansi Fort voluntarily in 1857 to march peacefully towards Varanasi.',
      'After Sir Hugh Rose breached Jhansi Fort in April 1858, she executed a daring night escape with Tantia Tope, captured Gwalior fortress, and fell in open combat near Gwalior.',
      'She was captured inside Jhansi Fort and deported to Rangoon alongside Bahadur Shah Zafar.',
      'She died of cholera while retreating towards the Nepal border with Nana Saheb.'
    ],
    correctIndex: 1,
    explanation: 'Rani Lakshmibai defended Jhansi against Sir Hugh Rose (March-April 1858), escaped on horseback on 3-4 April 1858, united with Tantia Tope to seize Gwalior, and was martyred in combat at Kotah-ki-Serai on 17 June 1858.',
    hints: [
      'She did NOT die at Jhansi Fort; she broke the siege.',
      'She rode to Gwalior with her forces and Tantia Tope.',
      'She fell in battle at Kotah-ki-Serai near Gwalior dressed in warrior attire.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_20',
    nodeId: NODE_C8_HISTCIV_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did nationalist leaders like Dadabhai Naoroji and Gokhale describe Queen Victoria\'s Proclamation of 1 November 1858 as a "broken promise"?',
    options: [
      'Because the British immediately restored Company rule within three years.',
      'Because its high-minded pledges of racial equality and merit-based civil service entry were systematically undermined by discriminatory examinations and administrative exclusion.',
      'Because Queen Victoria was immediately replaced by the German Kaiser.',
      'Because all Indian princely states were annexed within the next decade.'
    ],
    correctIndex: 1,
    explanation: 'The Proclamation promised that race or creed would not bar Indians from any office. In reality, the ICS exams were held in London with prohibitive age limits, racial prejudice barred senior promotions, and India remained an exploited colony.',
    hints: [
      'Compare the written promise of equality with the reality of colonial civil service.',
      'ICS examinations were held in London with lowering age limits (down to 19).',
      'The British kept power monopolised while paying lip service to non-discrimination.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_C8_HISTCIV_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which historical evidence most strongly supports S.N. Sen\'s evaluation that 1857 was "neither wholly a mutiny nor wholly a war of independence"?',
    options: [
      'The entire subcontinent from Kashmir to Kanyakumari fought under a single democratic manifesto.',
      'It was far larger than a mere military mutiny due to massive peasant/taluqdar revolt in Awadh, yet lacked pan-Indian geographical spread (South, Punjab, Bengal stayed quiet) and a unified national goal.',
      'Only three British officers were killed during the entire two-year campaign.',
      'The rebel leaders immediately established an elected constituent assembly in Delhi.'
    ],
    correctIndex: 1,
    explanation: 'S.N. Sen noted that while civilian participation in UP and Bihar disproved the colonial "mere mutiny" theory, the absence of pan-Indian solidarity (Gurkhas and Sikhs aided the British, South India remained neutral) and distinct feudal goals precluded a true modern national war.',
    hints: [
      'Evaluate both the mass character in North India and the regional limitations elsewhere.',
      'Mughal restoration (Delhi), Peshwa revival (Kanpur), and local kingdoms (Jhansi) were distinct goals.',
      'Punjab and South India did not participate; it was massive yet regionalised.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_C8_HISTCIV_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In designing a modern synthesis of tradition and reason, how did the Brahmo Samaj (1828) differ from orthodox Hindu sampradayas?',
    options: [
      'The Brahmo Samaj worshipped multiple village deities and promoted hereditary priesthood.',
      'The Brahmo Samaj institutionalised formless monotheism (Nirguna Brahman), banned image worship in its mandir, and rejected the idea that any single human or book was infallible.',
      'The Brahmo Samaj required members to adopt European clothing and abandon Indian languages.',
      'The Brahmo Samaj merged directly into the Anglican Church.'
    ],
    correctIndex: 1,
    explanation: 'The Brahmo Samaj Trust Deed (1830) strictly prohibited idol worship, animal sacrifice, and sectarian abuse in its prayer hall. It sought to reform Hinduism from within by reviving Upanishadic monotheism coupled with rational critique.',
    hints: [
      'Look at its trust deed regarding images, sacrifices, and rituals.',
      'It worshipped the one supreme, formless Creator of the universe.',
      'It rejected idolatry and caste-based priestly monopoly.'
    ]
  },
  {
    id: 'ch_23',
    nodeId: NODE_C8_HISTCIV_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What fundamental sociological obstacle did Ishwar Chandra Vidyasagar encounter even after legalising widow remarriage in 1856?',
    options: [
      'The British Parliament immediately repealed Act XV in 1857.',
      'Deeply entrenched orthodox social boycott, loss of caste status, and ostracism prevented families from actually marrying off widows, leaving the law largely unpractised for decades.',
      'All Hindu widows refused to remarry because of government taxes.',
      'The Sanskrit College banned the study of the Parashara Smriti.'
    ],
    correctIndex: 1,
    explanation: 'Passing a progressive colonial law did not instantly change patriarchal mindset. Remarried couples were treated as outcastes, attacked in the streets, and denied family inheritance socially, proving legislation must be matched by social transformation.',
    hints: [
      'Think about the difference between changing a law on paper and changing societal habits.',
      'Orthodox society boycotted Vidyasagar and remarried couples.',
      'Social ostracism remained severe despite statutory legality.'
    ]
  },
  {
    id: 'ch_24',
    nodeId: NODE_C8_HISTCIV_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Contrast Swami Dayanand Saraswati\'s reform methodology (Arya Samaj 1875) with Raja Ram Mohan Roy\'s (Brahmo Samaj 1828).',
    options: [
      'Dayanand relied entirely on British colonial petitions, whereas Roy rejected all British courts.',
      'Roy integrated Western rationalism with Upanishadic monotheism and sought colonial legislation; Dayanand rejected Western reliance and rooted total authority strictly in the four Vedas through indigenous revival and Shuddhi.',
      'Dayanand supported idol worship while Roy opposed it.',
      'Roy established DAV schools while Dayanand founded Presidency College.'
    ],
    correctIndex: 1,
    explanation: 'Roy was a cosmopolitan humanist who used colonial legislation (Sati ban) and Western science. Dayanand championed indigenous Vedic self-reliance, rejected colonial state intervention, and initiated Shuddhi to reclaim converts.',
    hints: [
      'Compare reliance on colonial law vs reliance on indigenous Vedic authority.',
      'Dayanand rejected Westernisation; Roy sought an East-West intellectual bridge.',
      'Arya Samaj initiated Shuddhi and DAV schools; Brahmo Samaj focused on intellectual reform.'
    ]
  }
];

// ─── DEFAULT PROPS ───
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_HISTCIV_031,
  title: 'Wood\'s Despatch (1854) & The 1857 Uprising: Colonial Policy, Revolt & Reform',
  definition: 'An interactive historical simulation exploring the institutional creation of modern Indian education (Wood\'s Despatch 1854), the multidimensional causes, leaders, and consequences of the 1857 Uprising, and the 19th-century socio-religious reform movements led by Raja Ram Mohan Roy, Vidyasagar, and Swami Dayanand Saraswati.',
  eli5: 'Explore how 19th-century India was transformed: from the blueprint of modern universities and schools in 1854, to the explosion of the 1857 revolt sparked by greased cartridges and broken royal promises, to brave reformers who fought against Sati, fought for widows\' rights, and revitalised ancient Vedic wisdom.',
  misconceptions: [
    { misconception: 'Wood\'s Despatch introduced English education in India for the first time.', correction: 'English education existed through missionary schools and Macaulay\'s 1835 Minute; Wood\'s Despatch systematised it into a public departmental and university structure.' },
    { misconception: 'Awadh was annexed under the Doctrine of Lapse.', correction: 'Awadh was annexed in 1856 on the pretext of "misgovernance" by Nawab Wajid Ali Shah, not under the Doctrine of Lapse which applied only to lack of natural heirs.' },
    { misconception: 'The Religious Disabilities Act of 1850 allowed Hindu widows to remarry.', correction: 'The 1850 Act allowed religious converts to retain ancestral property inheritance; the Widow Remarriage Act was passed later in 1856.' },
    { misconception: 'The greased cartridge was the sole cause of the 1857 Uprising.', correction: 'The cartridge was the immediate military spark; decades of political, economic, socio-religious, and military grievances provided the combustible fuel.' },
    { misconception: '"Back to the Vedas" meant reviving all medieval Hindu rituals and Puranas.', correction: 'Swami Dayanand rejected the Puranas, idol worship, and caste by birth, accepting only the 4 Vedic Samhitas as infallible.' },
    { misconception: 'Rani Lakshmibai died defending the ramparts of Jhansi Fort.', correction: 'She escaped Jhansi Fort on 3-4 April 1858, captured Gwalior with Tantia Tope, and died fighting heroically at Kotah-ki-Serai near Gwalior on 17 June 1858.' }
  ],
  diagnosticQuestions: [
    { question: 'When was Wood\'s Despatch issued by Sir Charles Wood to Lord Dalhousie?', options: ['19 July 1854', '10 May 1857', '26 July 1856', '1 November 1858'], correctIndex: 0 },
    { question: 'Which was the first princely state annexed under Dalhousie\'s Doctrine of Lapse?', options: ['Satara (1848)', 'Jhansi (1853)', 'Nagpur (1853)', 'Awadh (1856)'], correctIndex: 0 },
    { question: 'How many sepoys in the Bengal Army approximately hailed from Awadh?', options: ['Around 60,000 out of 1,40,000', 'Only 2,000 soldiers', 'All 1,40,000 soldiers', 'Zero soldiers'], correctIndex: 0 },
    { question: 'On what date did Mangal Pandey revolt at Barrackpore?', options: ['29 March 1857', '10 May 1857', '8 April 1857', '27 June 1857'], correctIndex: 0 },
    { question: 'Where did Rani Lakshmibai achieve martyrdom on 17 June 1858?', options: ['Kotah-ki-Serai near Gwalior', 'Inside Jhansi Fort', 'Kanpur Ghat', 'Red Fort Delhi'], correctIndex: 0 },
    { question: 'When was the Government of India Act ending Company rule passed?', options: ['2 August 1858', '19 July 1854', '10 April 1875', '26 September 1820'], correctIndex: 0 },
    { question: 'Who published the Persian treatise Tuhfat-ul-Muwahhidin in 1804?', options: ['Raja Ram Mohan Roy', 'Ishwar Chandra Vidyasagar', 'Swami Dayanand Saraswati', 'Dadabhai Naoroji'], correctIndex: 0 },
    { question: 'When and where was the Arya Samaj founded by Swami Dayanand Saraswati?', options: ['10 April 1875 in Bombay', '1828 in Calcutta', '1856 in Midnapore', '1896 in Jalandhar'], correctIndex: 0 }
  ],
  masteryCriteria: 'Student understands Wood\'s Despatch (1854), analyzes political/military/economic causes and spread of 1857, evaluates the 1858 Proclamation, and compares 19th-century reform philosophies.'
};

// ─── EXPLORATION STEPS (Interactive Visual Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Wood\'s Educational Blueprint (1854)',
    instruction: 'Toggle the funding and medium levels to see how the 1854 Despatch created a two-tier educational pyramid.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_HISTCIV_031,
  },
  {
    title: 'Lab 2: The Map of Dalhousie\'s Annexations (1848–1856)',
    instruction: 'Click on different princely territories on the historic map to inspect the legal pretexts of annexation.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_HISTCIV_032,
  },
  {
    title: 'Lab 3: The 1857 Pressure Gauge: From Grievance to Spark',
    instruction: 'Adjust the systemic pressure levers (Political, Economic, Religious, Military) to witness how the cartridge ignited the revolt.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_HISTCIV_034,
  },
  {
    title: 'Lab 4: The Strategic Corridor of 1857 Leaders',
    instruction: 'Select each revolutionary command post to analyze commander strategies, troop movements, and British counter-offensives.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_HISTCIV_035,
  },
  {
    title: 'Lab 5: The Triad of Renaissance Reformers',
    instruction: 'Compare the three reform paths: Roy (Law & Reason), Vidyasagar (Shastras & Compassion), and Dayanand (Vedic Revival).',
    interactionType: 'drag-classify',
    nodeId: NODE_C8_HISTCIV_038,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The Young Constitutional & Social Archivist',
  description: 'Connect 19th-century colonial shifts with contemporary India. Examine how Queen Victoria\'s 1858 non-discrimination pledge evolved into Articles 14–16 & 25–28 of our Indian Constitution, and trace your local university or high school heritage back to Wood\'s 1854 grants-in-aid model.',
  steps: [
    'Identify your regional university or oldest college: Check if it originated under the 1854–1857 Wood\'s Despatch framework.',
    'Compare the 1858 Proclamation guarantees with Article 15 (Prohibition of discrimination) of the Indian Constitution.',
    'Formulate a 3-point argument on how Ishwar Chandra Vidyasagar\'s female literacy initiative shaped modern girls\' education rights.'
  ],
};

function C8_HistoryCivicsWoodsDespatch1854Sim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_HISTCIV_031,
  title = DEFAULT_PROPS.title || 'Wood\'s Despatch & 1857 Uprising Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant pattern prediction states
  const [predictionStates, setPredictionStates] = useState<Record<number, { made: boolean; chosenIndex: number }>>({
    0: { made: false, chosenIndex: -1 },
    1: { made: false, chosenIndex: -1 }
  });

  // Brilliant pattern observation states
  const [observationResponses, setObservationResponses] = useState<Record<number, { chosenIndex: number; answered: boolean }>>({
    0: { chosenIndex: -1, answered: false },
    1: { chosenIndex: -1, answered: false }
  });

  const [selectedMapState, setSelectedMapState] = useState<string | null>('jhansi');
  const [selectedLeader, setSelectedLeader] = useState<string | null>('lakshmibai');
  const [selectedReformer, setSelectedReformer] = useState<string | null>('roy');

  // Simulation Sliders / Variable state
  const [educationGrantLevel, setEducationGrantLevel] = useState(60);
  const [vernacularWeight, setVernacularWeight] = useState(50);
  const [pressurePolitical, setPressurePolitical] = useState(70);
  const [pressureEconomic, setPressureEconomic] = useState(80);
  const [pressureReligious, setPressureReligious] = useState(75);
  const [pressureMilitary, setPressureMilitary] = useState(90);
  const [armyRatioBengal, setArmyRatioBengal] = useState(50); // 1:2 ratio visual
  const [civicsEqualityIndex, setCivicsEqualityIndex] = useState(20);

  // Adaptive difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & interactive challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection responses
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Inactivity timer ref
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED METRICS ───
  const totalRebellionIndex = useMemo(() => {
    const raw = (pressurePolitical + pressureEconomic + pressureReligious + pressureMilitary) / 4;
    return Math.round(raw);
  }, [pressurePolitical, pressureEconomic, pressureReligious, pressureMilitary]);

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ───
  useEffect(() => {
    if (phase === 'explore' && timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CANVAS PARTICLE ANIMATION LOOP ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? '#f59e0b' : '#38bdf8',
      });
    }

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.35 + Math.sin(frame * 0.05) * 0.2;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding historical insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the 5 foundational historical labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free play mode to manipulate historical variables freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Test your historical mastery through interactive challenges!');
  }, []);

  const handlePrediction = useCallback((predIndex: number, optionIndex: number) => {
    setPredictionStates(prev => ({
      ...prev,
      [predIndex]: { made: true, chosenIndex: optionIndex }
    }));
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Observe the interactive controls to test it.');
  }, []);

  const handleObservationSubmit = useCallback((obsIndex: number, optionIndex: number) => {
    setObservationResponses(prev => ({
      ...prev,
      [obsIndex]: { chosenIndex: optionIndex, answered: true }
    }));
    const isCorrect = optionIndex === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the visualization closely.');
  }, []);

  const handleMapStateClick = useCallback((stateKey: string) => {
    setSelectedMapState(stateKey);
    audioManager.play('tap');
  }, []);

  const handleLeaderSelect = useCallback((leaderKey: string) => {
    setSelectedLeader(leaderKey);
    audioManager.play('tap');
  }, []);

  const handleReformerSelect = useCallback((reformerKey: string) => {
    setSelectedReformer(reformerKey);
    audioManager.play('tap');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the Wood\'s Despatch and 1857 module.');
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ mastery: 'mastered', score: 100 }));
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
        speechManager.speak('Let us review the historical evidence carefully.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/60">
                ICSE Class 8 • History & Civics
              </span>
              <span className="text-xs text-slate-400">1829–1883</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase navigation indicator */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs" role="navigation" aria-label="Simulation Phase Progress">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-xl capitalize font-medium transition-all ${
                phase === p
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-amber-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <span>📜</span>
              <span>HISTORICAL INVESTIGATION HOOK</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/70 mt-3 p-3 bg-amber-950/40 rounded-xl border border-amber-800/40">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg">
            <h3 className="text-base font-semibold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-750 hover:border-amber-500/50 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-5 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The rebellion was a multi-causal explosion of political, economic, military, and religious tension.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>

                <motion.button
                  aria-label="Step into visual history labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-sm flex items-center gap-2"
                >
                  <span>Step into the Visual History Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Lab Step Nav Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800" role="tablist" aria-label="Visual Exploration Labs">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Open Lab ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentSlide === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>Lab {idx + 1}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black text-amber-400">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-slate-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-lg text-slate-400 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ─── SLIDE 0: Wood's Despatch (1854) Educational Hierarchy ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="grant-slider" className="text-xs font-semibold text-slate-300 flex justify-between">
                          <span>Grants-in-Aid Budget Allocation:</span>
                          <span className="text-amber-400">{educationGrantLevel}%</span>
                        </label>
                        <input
                          id="grant-slider"
                          aria-label="Grants-in-Aid Budget Allocation"
                          type="range"
                          min={10}
                          max={100}
                          value={educationGrantLevel}
                          onChange={(e) => setEducationGrantLevel(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500 cursor-pointer"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Encouraged privately managed schools meeting government secular standards.
                        </p>
                      </div>

                      <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="vernacular-slider" className="text-xs font-semibold text-slate-300 flex justify-between">
                          <span>Vernacular Weightage (Primary Tier):</span>
                          <span className="text-gold-400">{vernacularWeight}%</span>
                        </label>
                        <input
                          id="vernacular-slider"
                          aria-label="Vernacular Weightage"
                          type="range"
                          min={0}
                          max={100}
                          value={vernacularWeight}
                          onChange={(e) => setVernacularWeight(Number(e.target.value))}
                          className="w-full mt-2 accent-gold-500 cursor-pointer"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Primary level taught in mother tongues (Bengali, Marathi, Tamil, Hindi).
                        </p>
                      </div>

                      <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40 text-xs text-amber-200">
                        <p className="font-bold">Key Facts (19 July 1854):</p>
                        <p className="mt-1">• Sir Charles Wood (President of Board of Control) to Lord Dalhousie.</p>
                        <p>• 1855: Department of Public Instruction in 5 Provinces.</p>
                        <p>• 1857: Universities established at Calcutta, Bombay, and Madras.</p>
                      </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 450 260" className="w-full max-w-md" aria-label="Educational hierarchy diagram from Wood's Despatch">
                        {/* Department of Public Instruction Apex */}
                        <rect x="75" y="10" width="300" height="38" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="225" y="34" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                          Department of Public Instruction (1855, 5 Provinces)
                        </text>

                        {/* Universities */}
                        <rect x="40" y="65" width="370" height="46" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="225" y="86" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">
                          Apex Universities (1857: Calcutta, Bombay, Madras)
                        </text>
                        <text x="225" y="102" textAnchor="middle" fill="#fbbf24" fontSize="9">
                          Medium: English • Modelled on University of London
                        </text>

                        {/* High Schools & Anglo-Vernacular Colleges */}
                        <rect x="20" y="130" width="410" height="46" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="225" y="151" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">
                          Anglo-Vernacular High Schools & Colleges
                        </text>
                        <text x="225" y="167" textAnchor="middle" fill="#7dd3fc" fontSize="9">
                          Grants-in-Aid active: {educationGrantLevel > 50 ? 'Well-Funded (Private + Public)' : 'Strained Resources'}
                        </text>

                        {/* Primary Vernacular Schools */}
                        <rect x="5" y="195" width="440" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                        <text x="225" y="217" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                          Grassroots Primary Schools (Pathshalas & Madrasas)
                        </text>
                        <text x="225" y="233" textAnchor="middle" fill="#6ee7b7" fontSize="9">
                          Medium: Vernacular Languages ({vernacularWeight}% Emphasis)
                        </text>

                        {/* Connective arrows */}
                        <line x1="225" y1="48" x2="225" y2="65" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="225" y1="111" x2="225" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="225" y1="176" x2="225" y2="195" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    </div>
                  </div>

                  {/* Observation Question 1 */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-gold-800/40 space-y-3">
                    <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <span>🔍</span>
                      <span>Observe & Notice (Brilliant.org Interactive Pattern)</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          aria-label={`Observation option ${String.fromCharCode(65 + oIdx)}: ${opt}`}
                          onClick={() => handleObservationSubmit(0, oIdx)}
                          className={`text-left p-3 rounded-xl text-xs transition-all border ${
                            observationResponses[0].answered
                              ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-slate-900/40 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    {observationResponses[0].answered && (
                      <p className="text-xs text-gold-300 pt-1">
                        💡 {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: Dalhousie's Annexation Map ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                  <div className="lg:col-span-7 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-center items-center">
                    <svg viewBox="0 0 420 320" className="w-full max-w-md" aria-label="Interactive map of annexed princely states">
                      {/* Stylized outline of India */}
                      <path
                        d="M170,20 L240,40 L300,90 L340,140 L310,210 L240,290 L200,310 L160,260 L130,200 L110,130 L130,70 Z"
                        fill="#0f172a"
                        stroke="#334155"
                        strokeWidth="2"
                      />

                      {/* State Nodes */}
                      {[
                        { key: 'satara', label: 'Satara (1848)', cx: 160, cy: 190, color: '#f59e0b', type: 'Lapse' },
                        { key: 'jhansi', label: 'Jhansi (1853)', cx: 210, cy: 125, color: '#ef4444', type: 'Lapse' },
                        { key: 'nagpur', label: 'Nagpur (1853)', cx: 225, cy: 175, color: '#f97316', type: 'Lapse' },
                        { key: 'awadh', label: 'Awadh (1856)', cx: 245, cy: 110, color: '#8b5cf6', type: 'Misgovernance' },
                        { key: 'kanpur', label: 'Kanpur (1851 Pension)', cx: 230, cy: 130, color: '#06b6d4', type: 'Pension Refused' }
                      ].map(st => (
                        <g
                          key={st.key}
                          role="button"
                          tabIndex={0}
                          aria-label={`Select territory ${st.label}`}
                          onClick={() => handleMapStateClick(st.key)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleMapStateClick(st.key); }}
                          className="cursor-pointer transition-all focus:outline-none"
                        >
                          <circle
                            cx={st.cx}
                            cy={st.cy}
                            r={selectedMapState === st.key ? 15 : 10}
                            fill={st.color}
                            stroke="#ffffff"
                            strokeWidth={selectedMapState === st.key ? 3 : 1}
                            className="animate-pulse"
                          />
                          <text
                            x={st.cx}
                            y={st.cy - 14}
                            textAnchor="middle"
                            fill="#f8fafc"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            {st.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Territory Analysis</span>
                      <h4 className="text-base font-bold text-white mt-1 capitalize">
                        {selectedMapState === 'jhansi' && 'Jhansi (Annexed 1853)'}
                        {selectedMapState === 'satara' && 'Satara (Annexed 1848)'}
                        {selectedMapState === 'nagpur' && 'Nagpur (Annexed 1853)'}
                        {selectedMapState === 'awadh' && 'Awadh / Oudh (Annexed 1856)'}
                        {selectedMapState === 'kanpur' && 'Kanpur / Bithoor (1851 Dispossession)'}
                      </h4>

                      <div className="text-xs text-slate-300 mt-2 space-y-1.5 leading-relaxed">
                        {selectedMapState === 'jhansi' && (
                          <>
                            <p><strong className="text-red-400">Legal Pretext:</strong> Doctrine of Lapse (Lord Dalhousie).</p>
                            <p><strong className="text-amber-300">Grievance:</strong> Maharaja Gangadhar Rao adopted Damodar Rao. British refused adoption succession.</p>
                            <p><strong className="text-emerald-400">Consequence:</strong> Rani Lakshmibai took arms to defend her realm.</p>
                          </>
                        )}
                        {selectedMapState === 'satara' && (
                          <>
                            <p><strong className="text-red-400">Legal Pretext:</strong> First state annexed under Doctrine of Lapse (1848).</p>
                            <p><strong className="text-amber-300">Principle:</strong> Natural male heirs required; adopted sons denied sovereign rule.</p>
                          </>
                        )}
                        {selectedMapState === 'nagpur' && (
                          <>
                            <p><strong className="text-red-400">Legal Pretext:</strong> Doctrine of Lapse (1853).</p>
                            <p><strong className="text-amber-300">Impact:</strong> Maratha kingdom absorbed, palace goods auctioned in public bazaar.</p>
                          </>
                        )}
                        {selectedMapState === 'awadh' && (
                          <>
                            <p><strong className="text-purple-400">Legal Pretext:</strong> "Misgovernance" (NOT Doctrine of Lapse!).</p>
                            <p><strong className="text-amber-300">Target:</strong> Nawab Wajid Ali Shah exiled to Metiabruz near Calcutta.</p>
                            <p><strong className="text-emerald-400">Revolt Link:</strong> 60,000 Awadh sepoys in Bengal Army had families dispossessed.</p>
                          </>
                        )}
                        {selectedMapState === 'kanpur' && (
                          <>
                            <p><strong className="text-gold-400">Legal Pretext:</strong> Denial of Hereditary Pension (1851).</p>
                            <p><strong className="text-amber-300">Target:</strong> Nana Saheb, adopted son of last Peshwa Baji Rao II.</p>
                            <p><strong className="text-emerald-400">Revolt Link:</strong> Refused guaranteed Rs 8 lakh/year allowance; Nana Saheb joined 1857.</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: 1857 Systemic Pressure Levers ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                  {/* Prediction Question 1 */}
                  {!predictionStates[0].made ? (
                    <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-700/50">
                      <p className="text-xs font-bold text-amber-300 uppercase">Step 1: Predict Before Experimenting</p>
                      <h4 className="text-sm font-semibold text-white mt-1">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(0, i)}
                            className="text-left p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-700/40 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-gold-200 gap-2">
                      <span>✓ Prediction recorded! {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="text-amber-400 font-bold">Now test the 4 levers below!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="p-political" className="text-xs font-bold text-red-400 flex justify-between">
                        <span>Political (Lapse & Annexation):</span>
                        <span>{pressurePolitical}%</span>
                      </label>
                      <input
                        id="p-political"
                        aria-label="Political pressure lever"
                        type="range"
                        min={0}
                        max={100}
                        value={pressurePolitical}
                        onChange={(e) => setPressurePolitical(Number(e.target.value))}
                        className="w-full mt-2 accent-red-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="p-economic" className="text-xs font-bold text-amber-400 flex justify-between">
                        <span>Economic (Ruined Weavers):</span>
                        <span>{pressureEconomic}%</span>
                      </label>
                      <input
                        id="p-economic"
                        aria-label="Economic pressure lever"
                        type="range"
                        min={0}
                        max={100}
                        value={pressureEconomic}
                        onChange={(e) => setPressureEconomic(Number(e.target.value))}
                        className="w-full mt-2 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="p-religious" className="text-xs font-bold text-purple-400 flex justify-between">
                        <span>Socio-Religious Acts:</span>
                        <span>{pressureReligious}%</span>
                      </label>
                      <input
                        id="p-religious"
                        aria-label="Socio-religious pressure lever"
                        type="range"
                        min={0}
                        max={100}
                        value={pressureReligious}
                        onChange={(e) => setPressureReligious(Number(e.target.value))}
                        className="w-full mt-2 accent-purple-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="p-military" className="text-xs font-bold text-gold-400 flex justify-between">
                        <span>Military / Cartridge Spark:</span>
                        <span>{pressureMilitary}%</span>
                      </label>
                      <input
                        id="p-military"
                        aria-label="Military pressure lever"
                        type="range"
                        min={0}
                        max={100}
                        value={pressureMilitary}
                        onChange={(e) => setPressureMilitary(Number(e.target.value))}
                        className="w-full mt-2 accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Total Pressure Gauge Visual */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-slate-300">Combined 1857 Rebellion Index:</span>
                      <span className={`font-mono font-bold ${totalRebellionIndex > 75 ? 'text-red-400' : 'text-amber-400'}`}>
                        {totalRebellionIndex}% {totalRebellionIndex > 75 ? '⚡ (CRITICAL EXPLOSION)' : '⏱️ (SIMMERING)'}
                      </span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full"
                        animate={{ width: `${totalRebellionIndex}%` }}
                      />
                    </div>
                  </div>

                  {/* Observation Question 2 */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-gold-800/40 space-y-3 mt-3">
                    <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <span>🔍</span>
                      <span>Observation Analysis: What do you notice?</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[1].question}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          aria-label={`Observation option ${String.fromCharCode(65 + oIdx)}: ${opt}`}
                          onClick={() => handleObservationSubmit(1, oIdx)}
                          className={`text-left p-3 rounded-xl text-xs transition-all border ${
                            observationResponses[1].answered
                              ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-500'
                              : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    {observationResponses[1].answered && (
                      <p className="text-xs text-gold-300 pt-1">
                        💡 {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: 1857 Leaders & Centres Corridor ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                  <div className="lg:col-span-5 flex flex-col gap-2">
                    {[
                      { key: 'delhi', name: 'Bahadur Shah Zafar', centre: 'Delhi', desc: '82-year-old Mughal Emperor proclaimed leader on 11 May 1857; exiled to Rangoon.' },
                      { key: 'kanpur', name: 'Nana Saheb & Tantia Tope', centre: 'Kanpur', desc: 'Peshwa heir; 27 June Satichaura Ghat; guerrilla warfare until 1859.' },
                      { key: 'lucknow', name: 'Begum Hazrat Mahal', centre: 'Lucknow', desc: 'Wife of exiled Nawab of Awadh; siege of Residency (Henry Lawrence killed).' },
                      { key: 'lakshmibai', name: 'Rani Lakshmibai', centre: 'Jhansi & Gwalior', desc: 'Escaped Jhansi Fort April 1858; martyred at Kotah-ki-Serai on 17 June 1858.' },
                      { key: 'arrah', name: 'Kunwar Singh', centre: 'Arrah (Bihar)', desc: '80-year-old zamindar who led brave guerrilla resistance in Bihar.' }
                    ].map(ld => (
                      <motion.button
                        key={ld.key}
                        aria-label={`Select leader ${ld.name} at ${ld.centre}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleLeaderSelect(ld.key)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all ${
                          selectedLeader === ld.key
                            ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <div className="flex justify-between font-bold">
                          <span>{ld.name}</span>
                          <span className="text-amber-400">{ld.centre}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{ld.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="lg:col-span-7 bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Commander Spotlight</span>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {selectedLeader === 'lakshmibai' && 'Rani Lakshmibai of Jhansi (1828–1858)'}
                        {selectedLeader === 'delhi' && 'Emperor Bahadur Shah Zafar (1775–1862)'}
                        {selectedLeader === 'kanpur' && 'Nana Saheb & Tantia Tope'}
                        {selectedLeader === 'lucknow' && 'Begum Hazrat Mahal (Awadh)'}
                        {selectedLeader === 'arrah' && 'Kunwar Singh (Arrah, Bihar)'}
                      </h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {selectedLeader === 'lakshmibai' &&
                          'Defended Jhansi against Sir Hugh Rose. Escaped on horseback with adopted son Damodar Rao tied to her back on 3-4 April 1858. Captured Gwalior fort with Tantia Tope. Martyred in combat at Kotah-ki-Serai on 17 June 1858. Sir Hugh Rose called her "the bravest and best military leader of the rebels."'}
                        {selectedLeader === 'delhi' &&
                          'The sepoys marching from Meerut on 10-11 May 1857 rallied under the Mughal banner to provide cross-communal legitimacy. Delhi fell in September 1857; his sons were shot by Hodson, and he was exiled to Burma where he died in 1862.'}
                        {selectedLeader === 'kanpur' &&
                          'Nana Saheb led Kanpur after Dalhousie cut his Rs 8 lakh pension. Tantia Tope fought brilliant mobile guerrilla campaigns across Central India until betrayed and hanged on 18 April 1859.'}
                        {selectedLeader === 'lucknow' &&
                          'Begum Hazrat Mahal crowned her young son Birjis Qadr as Nawab and rallied taluqdars against British forces. After Lucknow\'s recapture in March 1858, she refused British pension and sought refuge in Nepal.'}
                        {selectedLeader === 'arrah' &&
                          'The octogenarian Rajput chieftain of Jagdishpur defeated British contingents multiple times before succumbing to bullet wounds on 26 April 1858.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 mt-3">
                      <strong>Exam Takeaway:</strong> Leaders shared a common oppressor but lacked a centralised high command or joint strategy, allowing the British to reconquer centres sequentially.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: Triad of Social Reformers ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                  {[
                    {
                      key: 'roy',
                      name: 'Raja Ram Mohan Roy',
                      lifespan: '1772–1833',
                      org: 'Brahmo Samaj (1828)',
                      achievement: 'Abolition of Sati (Regulation XVII, 1829); Hindu College (1816); Tuhfat-ul-Muwahhidin (1804).',
                      method: 'Dual Method: Vedic shastric proof + Western reason + Petitions to British Government.'
                    },
                    {
                      key: 'vidyasagar',
                      name: 'Ishwar Chandra Vidyasagar',
                      lifespan: '1820–1891',
                      org: 'Sanskrit College Principal (1851)',
                      achievement: 'Hindu Widows\' Remarriage Act (Act XV, 1856); 35 Girls\' Schools (1857-58); Varnaparichay (1855).',
                      method: 'Shastric proof (Parashara Smriti) + 1855 Mass Petition + Financing first remarriage.'
                    },
                    {
                      key: 'dayanand',
                      name: 'Swami Dayanand Saraswati',
                      lifespan: '1824–1883',
                      org: 'Arya Samaj (Bombay, 1875)',
                      achievement: 'Satyarth Prakash (1875); Shuddhi Movement; Kanya Mahavidyalaya Jalandhar (1896); DAV Schools.',
                      method: '"Back to the Vedas" — Reject Puranas, idol worship, caste by birth; Indigenous Vedic revival.'
                    }
                  ].map(rf => (
                    <motion.div
                      key={rf.key}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select reformer ${rf.name}`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleReformerSelect(rf.key)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleReformerSelect(rf.key); }}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        selectedReformer === rf.key
                          ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500/50'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between font-bold text-amber-300">
                          <span>{rf.name}</span>
                          <span className="text-[10px] text-slate-400">{rf.lifespan}</span>
                        </div>
                        <p className="font-semibold text-slate-200 mt-1">{rf.org}</p>
                        <p className="text-slate-400 mt-2 text-[11px] leading-relaxed"><strong>Milestones:</strong> {rf.achievement}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-amber-200/80">
                        <strong>Strategy:</strong> {rf.method}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Go to Free Exploration Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-amber-400">Sandbox Simulator: 1858 Proclamation & Army Balance</h3>
              <p className="text-xs text-slate-400">Manipulate post-1857 imperial variables freely with no grading penalty.</p>
            </div>
            <motion.button
              aria-label="Ready for Interactive Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20"
            >
              Ready for Interactive Challenges! →
            </motion.button>
          </div>

          {/* Prediction Question 2 in Sandbox */}
          {!predictionStates[1].made ? (
            <div className="p-4 bg-gold-950/50 rounded-2xl border border-gold-700/50 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                ⚡ Prediction Challenge 2
              </span>
              <h4 className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[1].question}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[1].options.map((opt, pIdx) => (
                  <button
                    key={pIdx}
                    aria-label={`Predict: ${opt}`}
                    onClick={() => handlePrediction(1, pIdx)}
                    className="p-3 bg-slate-900 hover:bg-slate-800 text-left text-xs rounded-xl border border-slate-700 text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-700/30 text-xs text-gold-300">
              ✓ Prediction locked: {PREDICTION_QUESTIONS[1].verifyInstruction}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-950 rounded-2xl border border-slate-800">
            {/* Control 1: Army Reorganisation Ratio */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <label htmlFor="bengal-ratio-slider" className="text-xs font-bold text-slate-200 flex justify-between">
                <span>Bengal Army European-to-Indian Ratio:</span>
                <span className="text-amber-400">1 : {(100 / Math.max(20, armyRatioBengal)).toFixed(1)}</span>
              </label>
              <input
                id="bengal-ratio-slider"
                aria-label="Bengal Army Ratio"
                type="range"
                min={20}
                max={70}
                value={armyRatioBengal}
                onChange={(e) => setArmyRatioBengal(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${armyRatioBengal}%` }} className="bg-red-500 flex items-center justify-center text-[9px] font-bold text-white">
                  European
                </div>
                <div style={{ width: `${100 - armyRatioBengal}%` }} className="bg-gold-500 flex items-center justify-center text-[9px] font-bold text-white">
                  Indian Sepoy
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Post-1858 rule: Bengal ratio set at <strong>1:2 (33% European)</strong>; Bombay/Madras at <strong>1:3 (25% European)</strong>. Artillery reserved strictly for Europeans.
              </p>
            </div>

            {/* Control 2: Civics Non-Discrimination Policy vs Practice */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <label htmlFor="civics-slider" className="text-xs font-bold text-slate-200 flex justify-between">
                <span>Civil Service Non-Discrimination Reality:</span>
                <span className="text-gold-400">{civicsEqualityIndex}%</span>
              </label>
              <input
                id="civics-slider"
                aria-label="Civil Service Non-Discrimination index"
                type="range"
                min={5}
                max={100}
                value={civicsEqualityIndex}
                onChange={(e) => setCivicsEqualityIndex(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="text-xs text-slate-300 space-y-1">
                <p>• <strong>1 Nov 1858 Proclamation:</strong> Promised employment based on merit without racial bias.</p>
                <p>• <strong>Historical Reality:</strong> ICS exams held in London with age limit lowered to 19 (1878).</p>
                <p>• <strong>Nationalist View:</strong> Dadabhai Naoroji called it the "Magna Carta of Broken Pledges".</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Header indicator with particle canvas */}
          <div className="relative p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 overflow-hidden">
            <canvas ref={canvasRef} width={400} height={40} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />
            <div className="flex items-center gap-3 z-10">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800/80">
                Q {currentChallenge + 1} / {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">
                Competency: <strong className="text-slate-200">{challenge.competencyLevel}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 z-10">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'advanced' ? 'bg-red-950 text-red-400 border border-red-800' :
                  'bg-gold-950 text-gold-400 border border-gold-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs text-slate-400 font-mono">
                Mastery: <strong className="text-amber-400">{masteryLevel}</strong>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-gold-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            <h3 className="text-base font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Challenge options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Leader:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable leader: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'loc_delhi', name: 'Delhi Red Fort' },
                    { id: 'loc_kanpur', name: 'Kanpur Bithoor' },
                    { id: 'loc_lucknow', name: 'Lucknow Residency' },
                    { id: 'loc_jhansi', name: 'Jhansi Ramparts' }
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Target area: ${target.name}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border border-dashed border-slate-700 rounded-xl text-center min-h-[90px] flex flex-col justify-center items-center gap-1"
                    >
                      <span className="text-[11px] text-slate-400 font-bold">{target.name}</span>
                      <span className={`text-xs font-bold ${droppedLabels[target.id] ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[Drop Leader Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Leader Map"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Leader Map
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Reorder historical events in correct chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Chronological Sequence"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Check Chronological Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numeric answer input"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter number..."
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-gold-950 border border-gold-700 text-gold-200 text-xs rounded-lg flex items-center gap-1.5"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-400 font-bold hover:text-red-300"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click hierarchy nodes above to build sequence...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Structure"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' -> '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Constructed Structure
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-3"
              >
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Historical Analysis & Synthesis:</span>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400">{sIdx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3.5 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Go to next challenge or finalise module"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Module →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Motivational Feedback Header */}
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-amber-950/40 rounded-2xl border border-emerald-700/50 text-center space-y-3">
            <span className="text-4xl">🏛️</span>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {errors === 0
                  ? '🌟 PERFECT SCORE!'
                  : errors <= 3
                  ? '🎉 Great work!'
                  : errors <= 7
                  ? '👍 Good effort!'
                  : '💪 Do not give up — You WILL get this!'}
              </span>
              <h2 className="text-2xl font-black text-white">Historical Mastery Achieved!</h2>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? 'Flawless analysis! You navigated Wood\'s Despatch, the 1857 corridors, and socio-religious reforms with remarkable precision.'
                : errors <= 3
                ? 'Excellent grasp of 19th-century colonial policy, resistance dynamics, and social reform milestones.'
                : errors <= 7
                ? 'Good understanding of the core timeline and causes. Review the key dates and legal pretexts to lock in full mastery.'
                : 'History connects deep structural roots to sudden sparks. Replay the visual labs to solidify your understanding!'}
            </p>

            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Errors Made</span>
                <span className={`text-xl font-bold ${errors === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>{errors}</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery Level</span>
                <span className="text-xl font-bold text-amber-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Visibility Card */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/50 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <h3 className="text-sm font-bold text-gold-200 uppercase tracking-wide">
                  Spaced Repetition Schedule (SM-2 Algorithm)
                </h3>
              </div>
              <span className="px-3 py-1 bg-gold-900/80 text-amber-300 border border-gold-700 font-mono font-bold text-xs rounded-full">
                Review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your response accuracy and retrieval latency, the optimal cognitive interval for your next review is scheduled in{' '}
              <strong className="text-amber-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>. Reviewing at this interval prevents synaptic decay and guarantees long-term retention for your board examinations.
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">
                Historical Reflection & Metacognition
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  value={reflections.surprising}
                  onChange={(e) => setReflections(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. That Awadh was annexed for misgovernance, not Doctrine of Lapse..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection: How would you explain this to a friend?"
                  value={reflections.explain}
                  onChange={(e) => setReflections(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. 1857 wasn't just cartridges; it was 100 years of accumulated tension..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection: Where in real life might you use this?"
                  value={reflections.realLife}
                  onChange={(e) => setReflections(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Understanding how modern school boards and university systems were designed..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Personalized Misconception Debrief</span>
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Historical Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-world Activity Section */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-amber-400 font-bold">{sIdx + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Replay action bar */}
          <div className="flex justify-center pt-2">
            <button
              aria-label="Replay Visual Labs and Practice"
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setErrors(0);
              }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <span>↺</span>
              <span>Replay Visual Labs & Practice Again</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Dynamic Feedback Popups */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Historical Analysis Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsWoodsDespatch1854Sim;