'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDENTIFIERS ───
const NODE_C9_HISTCIV_021 = 'c9_histciv_021'; // Decline of Harappan Civilisation
const NODE_C9_HISTCIV_022 = 'c9_histciv_022'; // Sources of Vedic Period — 4 Vedas & Epics
const NODE_C9_HISTCIV_023 = 'c9_histciv_023'; // Early Vedic Social Organisation — Kula, King, Purohita
const NODE_C9_HISTCIV_024 = 'c9_histciv_024'; // Rig Vedic Assemblies — Sabha, Samiti, Vidhatha
const NODE_C9_HISTCIV_025 = 'c9_histciv_025'; // Position of Women in Early vs Later Vedic Society
const NODE_C9_HISTCIV_026 = 'c9_histciv_026'; // Economy of Early vs Later Vedic Period
const NODE_C9_HISTCIV_027 = 'c9_histciv_027'; // Four Varnas in Vedic Society
const NODE_C9_HISTCIV_028 = 'c9_histciv_028'; // Four Ashramas — Stages of Life
const NODE_C9_HISTCIV_029 = 'c9_histciv_029'; // Vedic Education — Gurukula & Brahmacharya
const NODE_C9_HISTCIV_030 = 'c9_histciv_030'; // Sources of Jainism & Buddhism — Angas, Tripitakas, Jatakas

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_021,
  NODE_C9_HISTCIV_022,
  NODE_C9_HISTCIV_023,
  NODE_C9_HISTCIV_024,
  NODE_C9_HISTCIV_025,
  NODE_C9_HISTCIV_026,
  NODE_C9_HISTCIV_027,
  NODE_C9_HISTCIV_028,
  NODE_C9_HISTCIV_029,
  NODE_C9_HISTCIV_030,
];

// ─── NARRATIVE SCENARIO ─���─
const SCENARIO = {
  title: 'The Great Subcontinental Transition: From Indus Cities to the Ganga Plain (1900 BCE – 400 BCE)',
  intro: 'You are the Chief Historian and Epigraphist of the Archaeological Survey of India. You have unearthed ancient strata from Mohenjo-daro, painted grey ware settlements along the Yamuna, and palm-leaf manuscripts from Valabhi and Rajgir. Your mission is to reconstruct how Bronze Age urbanism declined, how pastoral Vedic janas evolved into agrarian kingdoms, and how revolutionary religious philosophies emerged.',
  context: 'Trace the causal mechanics of deurbanisation, explore the four layers of Vedic sacred literature, simulate tribal governance in the Sapta Sindhu, witness the transformative impact of iron metallurgy, and analyse the reform canons of the Shramana traditions.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Archaeologists unearth a layer at Mohenjo-daro with scattered, unburied skeletons and no burnt buildings or weapons caches. Meanwhile, satellite radar reveals a dried palaeo-channel of the Ghaggar-Hakra river with hundreds of deserted settlements. What does this physical evidence tell us about the decline of the Harappan civilization?',
  options: [
    'Indra and the Indo-Aryans violently destroyed all Harappan fortresses in a sudden single war',
    'Decline was gradual, multi-causal, and led to deurbanisation and cultural transformation rather than total extinction',
    'A single catastrophic meteor wiped out every Harappan city in 1900 BCE simultaneously',
    'The Harappan population vanished completely without leaving any successor agrarian traditions',
  ],
  correctIndex: 1,
  hintAfter: 'Careful archaeological evaluation shows that deurbanisation was gradual and driven by ecological, tectonic, and commercial factors rather than a single violent massacre!',
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
  bloomLevel?: string;
}

// ─── CHALLENGES (Foundation, Standard, Advanced across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Harappan Decline (c9_histciv_021) - Foundation - Recall
  {
    id: 'ch_021_f1',
    nodeId: NODE_C9_HISTCIV_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Around what approximate date did the mature Harappan urban phase come to an end?',
    options: ['c. 2600 BCE', 'c. 1900 BCE', 'c. 600 BCE', 'c. 326 BCE'],
    correctIndex: 1,
    explanation: 'The mature Harappan urban phase flourished from c. 2600 BCE and began deurbanising around 1900 BCE across a gradual transition of two to three centuries.',
    hints: [
      'Think about the timeline between the early urban peak and the beginning of the Vedic composition.',
      'It occurred roughly 700 years after the start of mature urban planning.',
      'The date is approximately 1900 BCE.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Harappan Decline (c9_histciv_021) - Standard - Evaluation
  {
    id: 'ch_021_s1',
    nodeId: NODE_C9_HISTCIV_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why did George Dales (1964) and modern archaeologists reject Mortimer Wheeler\'s "Aryan Invasion Theory" of Harappan decline?',
    options: [
      'Mohenjo-daro was underwater so no invasion was geographically possible',
      'Excavations revealed no widespread destruction layers, weapons caches, or massacre strata; skeletons were scattered across different chronological periods',
      'The Rig Veda mentions that Indra repaired Harappan cities rather than destroying them',
      'C-14 dating proved the Harappans migrated directly to Mesopotamia in 2500 BCE',
    ],
    correctIndex: 1,
    explanation: 'George Dales demonstrated that the skeletons at Mohenjo-daro were unburied remains scattered in different stratigraphic layers over time, not victims of a single military massacre. No widespread destruction horizons or charred weapon layers exist at major sites.',
    hints: [
      'Consider the physical archaeological layers: is there evidence of a single catastrophic battle?',
      'Wheeler relied on mythical interpretations of Rigvedic hymns mentioning Indra destroying "pur".',
      'The absence of a uniform destruction horizon and cut marks on bones disproves a single violent conquest.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Harappan Decline (c9_histciv_021) - Advanced - Analysis (Drag Label)
  {
    id: 'ch_021_a1',
    nodeId: NODE_C9_HISTCIV_021,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match each Decline Theory to its primary proponent scholar or core scientific evidence.',
    dragItems: [
      { label: 'R.L. Raikes (1965)', targetId: 't_flood' },
      { label: 'Satellite radar & M.R. Mughal', targetId: 't_dry' },
      { label: 'Walter Fairservis (1971)', targetId: 't_eco' },
      { label: 'Mortimer Wheeler (1947 - Rejected)', targetId: 't_inv' },
    ],
    correctMapping: {
      t_flood: 'R.L. Raikes (1965)',
      t_dry: 'Satellite radar & M.R. Mughal',
      t_eco: 'Walter Fairservis (1971)',
      t_inv: 'Mortimer Wheeler (1947 - Rejected)',
    },
    explanation: 'R.L. Raikes argued for Indus tectonic flooding at Mohenjo-daro; satellite imagery proved desiccation of the Ghaggar-Hakra; Fairservis proposed ecological overexploitation; Wheeler proposed the now-discredited Aryan invasion.',
    hints: [
      'Who linked tectonic damming of the Indus river to deep silt deposits?',
      'Satellite palaeo-channel tracing proved river capture of the Yamuna/Sutlej away from the Ghaggar-Hakra.',
      'Fairservis focused on brick kilns, deforestation, and overgrazing.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Sources of Vedic Period (c9_histciv_022) - Foundation - Recall (Drag Sort)
  {
    id: 'ch_022_f1',
    nodeId: NODE_C9_HISTCIV_022,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the Four Vedas in chronological order of composition (oldest to latest).',
    sortItems: ['Rig Veda (c. 1500 BCE)', 'Sama Veda (c. 1200 BCE)', 'Yajur Veda (c. 1200 BCE)', 'Atharva Veda (c. 1000 BCE)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The Rig Veda is the oldest (c. 1500 BCE), followed by the Sama Veda (musical chants) and Yajur Veda (sacrificial prose formulas) around 1200 BCE, culminating with the Atharva Veda (daily spells, medicine, Bhumi Sukta) around 1000 BCE.',
    hints: [
      'The Veda containing 1028 suktas and 10 mandalas is the oldest.',
      'Sama and Yajur emerged as sacrificial rituals grew more elaborate.',
      'Atharva Veda, dealing with domestic magic and healing, was composed last.',
    ],
  },
  // 5. Sources of Vedic Period (c9_histciv_022) - Standard - Understanding
  {
    id: 'ch_022_s1',
    nodeId: NODE_C9_HISTCIV_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs the internal layer of a Veda with its defining content?',
    options: [
      'Samhita = Forest meditative texts; Upanishads = Prose ritual manuals',
      'Brahmana = Prose ritual manuals; Upanishads = Philosophical inquiries into Atman and Brahman',
      'Aranyaka = Hymn collection; Samhita = Philosophical treatises',
      'Brahmana = Musical melodies; Aranyaka = Military chronicles',
    ],
    correctIndex: 1,
    explanation: 'Every Veda has 4 layers: Samhita (core hymns), Brahmana (prose ritual instructions), Aranyaka (forest meditation texts), and Upanishad (philosophical inquiries into self and ultimate reality).',
    hints: [
      'Samhitas are the poetic collections of mantras.',
      'Brahmanas explain how sacrifices must be performed.',
      'Upanishads form the philosophical summit (Vedanta).',
    ],
  },
  // 6. Early Vedic Social Organisation (c9_histciv_023) - Foundation - Understanding (Drag Sort)
  {
    id: 'ch_023_f1',
    nodeId: NODE_C9_HISTCIV_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the four tiers of Early Vedic social organisation in ascending order (from smallest unit to largest).',
    sortItems: ['Kula (Joint family under Grihapati)', 'Grama (Village settlement)', 'Vis (Clan cluster claiming common descent)', 'Jana (Entire tribe)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The patriarchal family (kula) headed by the grihapati formed the base; several kulas formed a grama; multiple gramas formed a clan (vis); and multiple vis formed the tribe (jana).',
    hints: [
      'Start with the domestic household where the sacred fire (agnihotra) was kept.',
      'A cluster of houses forms a village (grama).',
      'The largest political unit was the tribe (such as the Bharatas or Purus).',
    ],
  },
  // 7. Early Vedic Kingship & Purohita (c9_histciv_023) - Standard - Analysis
  {
    id: 'ch_023_s1',
    nodeId: NODE_C9_HISTCIV_023,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did the political role of the Early Vedic "Rajan" differ fundamentally from a Later Vedic or medieval absolute monarch?',
    options: [
      'The Rajan owned all land as private property and collected mandatory land revenue taxes (bhaga)',
      'The Rajan was a tribal military chieftain (gopati) constrained by tribal assemblies; wealth was voluntary tribute (bali), not fixed land taxes',
      'The Rajan had a standing bureaucratic army of 100,000 paid mercenaries',
      'The Rajan was a divine emperor whose word was absolute written law',
    ],
    correctIndex: 1,
    explanation: 'The Early Vedic rajan was a pastoral leader and protector of cattle (gopati), not owner of the land (bhupati). His power was checked by assemblies, succession required confirmation, and revenue was voluntary bali.',
    hints: [
      'In a mobile pastoral economy, land is not owned as fixed private property.',
      'Look at the title "gopati" (protector of cows/people) vs "bhupati" (lord of the earth).',
      'Tribal chiefs required assembly consensus and relied on voluntary offerings.',
    ],
  },
  // 8. Rig Vedic Assemblies (c9_histciv_024) - Standard - Application
  {
    id: 'ch_024_s1',
    nodeId: NODE_C9_HISTCIV_024,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A dispute over cattle ownership arises between two families in the Bharata tribe, while a general vote is needed to elect a war leader for an upcoming raid. Which assemblies handle these respective tasks?',
    options: [
      'Dispute = Samiti; War leader election = Vidhatha',
      'Dispute = Sabha (council of elders); War leader election = Samiti (general tribal assembly)',
      'Dispute = Vidhatha; War leader election = Sabha',
      'Both tasks were decided solely by the king without assemblies',
    ],
    correctIndex: 1,
    explanation: 'The Sabha was the smaller council of elders handling judicial disputes and administration, while the Samiti was the general assembly of the entire tribe that elected/confirmed the king.',
    hints: [
      'Which body acted like a judicial court of senior elders?',
      'Which body was the larger gathering where the whole tribe confirmed leadership?',
      'Sabha settled disputes; Samiti gave political-military legitimacy.',
    ],
  },
  // 9. Rig Vedic Assemblies Decline (c9_histciv_024) - Advanced - Evaluation
  {
    id: 'ch_024_a1',
    nodeId: NODE_C9_HISTCIV_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the Samiti disappear and the Sabha narrow in the Later Vedic period?',
    options: [
      'All citizens lost their voices due to foreign Greek invasions',
      'The economic shift to settled agriculture in the Ganga doab gave kings direct territorial land control and revenue, making tribal consent obsolete',
      'The Rig Veda was rewritten in 600 BCE to prohibit all meetings',
      'Women demanded all assembly seats, causing the king to ban assemblies',
    ],
    correctIndex: 1,
    explanation: 'When wealth shifted from mobile cattle herds to fixed agricultural land in the Ganga-Yamuna doab, territorial kingdoms arose. Monarchy became hereditary, regular taxation replaced voluntary bali, and the tribal consent of the Samiti became obsolete.',
    hints: [
      'Connect the material economic base to political institutions.',
      'Mobile cattle raiders need collective agreement; settled landowners pay taxes to a territorial king.',
      'Territorial monarchy rendered the general tribal assembly redundant.',
    ],
  },
  // 10. Position of Women (c9_histciv_025) - Foundation - Recall
  {
    id: 'ch_025_f1',
    nodeId: NODE_C9_HISTCIV_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following Early Vedic women scholars (rishikas) authored hymns preserved in the Rig Veda or participated in royal philosophical debates?',
    options: [
      'Lopamudra, Ghosha, and Gargi Vachaknavi',
      'Razia Sultana and Rani Lakshmibai',
      'Mirabai and Akka Mahadevi',
      'Sarojini Naidu and Pandita Ramabai',
    ],
    correctIndex: 0,
    explanation: 'Lopamudra (Rig Veda 1.179), Ghosha (Rig Veda 10.39-40), and Gargi Vachaknavi (who debated Yajnavalkya in the Brihadaranyaka Upanishad) are famous Early Vedic intellectual women.',
    hints: [
      'Look for ancient Vedic rishikas mentioned in the Rig Veda and Upanishads.',
      'Lopamudra and Ghosha composed Vedic hymns; Gargi debated at King Janaka\'s court.',
      'Options B, C, and D feature medieval or modern historical figures.',
    ],
  },
  // 11. Position of Women (c9_histciv_025) - Standard - Analysis
  {
    id: 'ch_025_s1',
    nodeId: NODE_C9_HISTCIV_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was the primary material cause for the decline of women\'s status from the Early Vedic to the Later Vedic period?',
    options: [
      'Sudden foreign invasions from Central Asia imposing foreign patriarchal customs',
      'Shift to settled agriculture where land was hereditary private property; patrilineal inheritance required strict control over women\'s sexuality, marriage, and mobility',
      'A religious decree issued simultaneously by all four Vedas',
      'The complete abandonment of family life in favor of ascetic wandering',
    ],
    correctIndex: 1,
    explanation: 'In the pastoral economy, women\'s cattle-rearing labour was valued and wealth was mobile. In settled agriculture, land became hereditary property; patrilineal succession demanded certainty of paternity, leading to child marriage, seclusion, and denial of education.',
    hints: [
      'Think about how property changed from cows to immovable land.',
      'Inheriting land requires guaranteeing legitimate male heirs.',
      'This economic requirement led to the restriction of female autonomy and education.',
    ],
  },
  // 12. Economy of Early vs Later Vedic (c9_histciv_026) - Foundation - Recall
  {
    id: 'ch_026_f1',
    nodeId: NODE_C9_HISTCIV_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the Rig Veda, the term "gavishti" was used to denote warfare. What did it literally mean?',
    options: ['"To build stone fortresses"', '"To search for cows"', '"To cultivate rice fields"', '"To sail across oceans"'],
    correctIndex: 1,
    explanation: '"Gavishti" literally means "to search for cows" or "desire for cattle," proving that cattle raiding was the primary economic motive for conflict in the pastoral Early Vedic society.',
    hints: [
      'The word starts with "gav-" (related to "gau" or cow).',
      'Cattle were the chief form of wealth.',
      'Warfare was driven by the quest for herds.',
    ],
  },
  // 13. Economy & Iron Technology (c9_histciv_026) - Standard - Application
  {
    id: 'ch_026_s1',
    nodeId: NODE_C9_HISTCIV_026,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the crop and metal technology to its respective Vedic period and geographical zone.',
    options: [
      'Early Vedic (Sapta Sindhu) = Yava (Barley) & Bronze/Wood; Later Vedic (Ganga Doab) = Vrihi (Rice) & Iron',
      'Early Vedic = Vrihi (Rice) & Iron; Later Vedic = Yava (Barley) & Stone',
      'Early Vedic = Maize & Aluminium; Later Vedic = Cotton & Bronze',
      'Both periods used identical crops and iron tools across the entire subcontinent',
    ],
    correctIndex: 0,
    explanation: 'Early Vedic in dry Punjab cultivated hardy barley (yava) using wooden ploughs and bronze. Later Vedic in the wet Ganga doab cleared dense monsoon forests with iron axes and cultivated paddy rice (vrihi) using iron ploughshares (e.g. at Atranjikhera c. 1000 BCE).',
    hints: [
      'Barley (yava) is suited for semi-arid Punjab.',
      'Rice (vrihi) requires heavy water in the Ganga-Yamuna alluvium.',
      'Iron smelting emerged around 1000 BCE to clear dense sal forests.',
    ],
  },
  // 14. Varna System Origin (c9_histciv_027) - Foundation - Understanding
  {
    id: 'ch_027_f1',
    nodeId: NODE_C9_HISTCIV_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which hymn from the 10th Mandala of the Rig Veda provided the mythological bodily origin of the four varnas?',
    options: ['Gayatri Mantra (3.62.10)', 'Purusha Sukta (10.90)', 'Bhumi Sukta (Atharva Veda 12.1)', 'Nasadiya Sukta (10.129)'],
    correctIndex: 1,
    explanation: 'The Purusha Sukta (Rig Veda 10.90, verses 11-12) mythologically described Brahmins from the mouth, Kshatriyas from the arms, Vaishyas from the thighs, and Shudras from the feet of the cosmic being Purusha.',
    hints: [
      'It describes the cosmic sacrifice of the primordial person (Purusha).',
      'It appears in the 10th (and chronologically latest) mandala of the Rig Veda.',
      'Mouth, arms, thighs, and feet symbolize the functional hierarchy.',
    ],
  },
  // 15. Varna vs Jati Distinction (c9_histciv_027) - Standard - Analysis
  {
    id: 'ch_027_s1',
    nodeId: NODE_C9_HISTCIV_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do historians distinguish "Varna" from "Jati"?',
    options: [
      'Varna and Jati are exact synonyms with no distinction whatsoever',
      'Varna is the theoretical four-fold macro-classification, while Jati refers to the thousands of birth-based, endogamous occupational sub-groups nested within varnas',
      'Varna applies only to Jainism and Buddhism, while Jati applies to Vedic society',
      'Varna was created in the 20th century while Jati originated in 1500 BCE',
    ],
    correctIndex: 1,
    explanation: 'Varna is the broad theoretical 4-fold framework (Brahmin, Kshatriya, Vaishya, Shudra), whereas Jatis are the thousands of concrete, endogamous, localized kinship and caste groups that developed over centuries.',
    hints: [
      'Think of Varna as 4 broad categories and Jati as thousands of nested sub-groups.',
      'Varna = 4 macro slots; Jati = birth-based endogamous communities.',
      'Conflating the two is a classic board examination error.',
    ],
  },
  // 16. Varna Early Flexibility (c9_histciv_027) - Advanced - Evaluation
  {
    id: 'ch_027_a1',
    nodeId: NODE_C9_HISTCIV_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which historical/textual examples demonstrate that the Early Vedic Varna system was occupation-based and flexible before hardening into hereditary birth-based caste?',
    options: [
      'Alexander the Great appointed Brahmin generals in 326 BCE',
      'Sage Vishwamitra (a born Kshatriya king who became a revered Brahmarshi) and Satyakama Jabala (son of a servant woman accepted for his truthfulness)',
      'The Mauryan rock edicts prohibiting caste movement in 250 BCE',
      'The Rig Veda stating that everyone was born a Shudra until age 50',
    ],
    correctIndex: 1,
    explanation: 'Vishwamitra transitioned from Kshatriya warrior to Brahmin sage (composing the Gayatri Mantra), and Satyakama Jabala was accepted by Gautama Haridrumata in the Chandogya Upanishad based on honesty rather than known lineage.',
    hints: [
      'Look for named rishis who changed their social functional status.',
      'Who composed the Gayatri Mantra despite being born into the royal Kusika lineage?',
      'Recall the boy who tended 400 cows and was initiated by sage Gautama.',
    ],
  },
  // 17. Four Ashramas (c9_histciv_028) - Foundation - Understanding (Drag Sort)
  {
    id: 'ch_028_f1',
    nodeId: NODE_C9_HISTCIV_028,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the Four Ashramas (stages of life) in their prescribed sequential order.',
    sortItems: [
      '1. Brahmacharya (Celibate student in Gurukula)',
      '2. Grihastha (Householder supporting family and society)',
      '3. Vanaprastha (Forest retreat & partial withdrawal)',
      '4. Sannyasa (Total renunciation & solitary wandering)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The life cycle proceeded from student learning (Brahmacharya) to worldly family duty (Grihastha), gradual forest detachment (Vanaprastha), and complete renunciation seeking moksha (Sannyasa).',
    hints: [
      'Begin with the student stage following upanayana.',
      'The householder stage is the economic pillar of all other stages.',
      'End with total detachment and wandering with a staff and begging bowl.',
    ],
  },
  // 18. Vanaprastha vs Sannyasa (c9_histciv_028) - Standard - Distinguish
  {
    id: 'ch_028_s1',
    nodeId: NODE_C9_HISTCIV_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the crucial difference between Vanaprastha and Sannyasa?',
    options: [
      'In Vanaprastha one gets married; in Sannyasa one enters school',
      'Vanaprastha is partial withdrawal to a forest hermitage (spouse may accompany, some contact kept); Sannyasa is total severance of all relationships, property, and solitary wandering',
      'Vanaprastha was for women only; Sannyasa was for kings only',
      'There is no difference; they are two different regional names for the householder stage',
    ],
    correctIndex: 1,
    explanation: 'Vanaprastha represents transitional, partial withdrawal where a person lives in a forest hermitage (often with a spouse). Sannyasa is absolute renunciation where one gives up all possessions and identity to wander alone.',
    hints: [
      'In which stage does one still maintain a simple forest hut and possible companionship of a wife?',
      'Which stage involves giving up everything, owning only a bowl and staff?',
      'Gradual detachment vs complete severance.',
    ],
  },
  // 19. Vedic Education & Vedangas (c9_histciv_029) - Standard - Match (Drag Label)
  {
    id: 'ch_029_s1',
    nodeId: NODE_C9_HISTCIV_029,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match each of the auxiliary Vedanga sciences to its precise field of study.',
    dragItems: [
      { label: 'Shiksha', targetId: 'v_phon' },
      { label: 'Vyakarana', targetId: 'v_gram' },
      { label: 'Chandas', targetId: 'v_metr' },
      { label: 'Jyotisha', targetId: 'v_astr' },
    ],
    correctMapping: {
      v_phon: 'Shiksha',
      v_gram: 'Vyakarana',
      v_metr: 'Chandas',
      v_astr: 'Jyotisha',
    },
    explanation: 'The six Vedangas are Shiksha (phonetics/pronunciation), Kalpa (ritual), Vyakarana (grammar), Nirukta (etymology), Chandas (poetic metre), and Jyotisha (astronomy for sacrifice timing).',
    hints: [
      'Which science ensured exact pronunciation of syllables so oral memory was preserved?',
      'Vyakarana deals with linguistic rules (Panini).',
      'Chandas regulates verse metre; Jyotisha calculates sacrificial calendar timings.',
    ],
  },
  // 20. Sources of Jainism & Buddhism (c9_histciv_030) - Foundation - Recall
  {
    id: 'ch_030_f1',
    nodeId: NODE_C9_HISTCIV_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The canonical literature of Svetambara Jainism is compiled in the 12 Angas. At which council and century were they committed to writing?',
    options: [
      'Council of Valabhi (Gujarat, c. 5th century CE / 453 CE)',
      'Council of Rajagriha (Bihar, c. 483 BCE)',
      'Council of Pataliputra under Emperor Ashoka (c. 250 BCE)',
      'Council of Taxila (c. 100 CE)',
    ],
    correctIndex: 0,
    explanation: 'The 12 Angas (including Acaranga Sutta and Bhagavati Sutra) were finalized and written down at the Council of Valabhi in Saurashtra under Devardhigani around 453 CE.',
    hints: [
      'It was a council held in Gujarat, western India.',
      'It occurred roughly 900 years after Mahavira, around the 5th century CE.',
      'Do not confuse this with the First Buddhist Council at Rajagriha in 483 BCE.',
    ],
    misconceptionIndex: 3,
  },
  // 21. Tripitaka Internal Divisions (c9_histciv_030) - Standard - Analysis
  {
    id: 'ch_030_s1',
    nodeId: NODE_C9_HISTCIV_030,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which division of the Buddhist Tripitaka ("Three Baskets") contains the monastic rules of discipline governing the daily life and conduct of the Sangha?',
    options: ['Sutta Pitaka', 'Vinaya Pitaka', 'Abhidhamma Pitaka', 'Jataka Tales'],
    correctIndex: 1,
    explanation: 'The Vinaya Pitaka contains monastic rules and discipline for monks and nuns. The Sutta Pitaka contains discourses and sermons (including Dhammapada), and the Abhidhamma Pitaka contains philosophical and psychological analysis.',
    hints: [
      '"Vinaya" translates to discipline or code of conduct.',
      'Sutta contains discourses; Abhidhamma contains high philosophy.',
      'The rulebook of the Buddhist sangha is the Vinaya Pitaka.',
    ],
    misconceptionIndex: 4,
  },
  // 22. Jatakas as Historical Sources (c9_histciv_030) - Advanced - Evaluation
  {
    id: 'ch_030_a1',
    nodeId: NODE_C9_HISTCIV_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do historians treat the Jatakas (e.g. Vessantara Jataka carved on Bharhut & Sanchi stupas) as invaluable social-historical evidence rather than literal biographies of Gautama Buddha?',
    options: [
      'Because they were written by Greek ambassadors in the 4th century CE',
      'Because they are ~550 didactic folk narratives of the Bodhisattva\'s previous births, preserving rich incidental details of trade routes, crafts, village life, and popular moral values',
      'Because they contain royal tax receipts and land grants issued by King Bimbisara',
      'Because they prove the Buddha was an incarnation of Mesopotamian rulers',
    ],
    correctIndex: 1,
    explanation: 'The Jatakas are didactic stories of previous births (purvajanma). While not literal biography, their folk settings provide historians with irreplaceable depictions of everyday social structures, merchant caravans, guilds, and ethics in ancient India.',
    hints: [
      'Are Jatakas official biographies of historical Siddhartha Gautama, or stories of previous births?',
      'Think of how folk tales inadvertently mirror the real society of the era that composed them.',
      'Their visual depiction on stupa railings proves their wide circulation as popular moral guides.',
    ],
  },
];

// ─── DEFAULT PROPS & ENRICHMENT DATA ───
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
  nodeId: 'c9_histciv_021',
  title: 'Decline of Harappa to Vedic & Shramana Sources (Class 9 ICSE)',
  definition: 'A comprehensive comparative analysis spanning the multi-causal deurbanisation of the mature Harappan civilisation (c. 1900 BCE), the transition from pastoral semi-nomadic kinship society to agrarian territorial monarchy in the Vedic period, the development of social institutions (Varna, Ashrama, Gurukula), and the emergence of heterodox Jain and Buddhist literary canons.',
  eli5: 'Think of ancient India as an epic multi-stage journey: first, grand brick cities like Mohenjo-daro gradually faded when rivers shifted and climate changed. Then, cattle-herding communities composed beautiful sacred songs by heart, lived in big family clans, and chose chiefs in big village meetings. As iron tools let them cut forests and farm rice in the rich Ganga plains, kingdoms grew stronger, life stages were planned out, and wise thinkers like Mahavira and Buddha created new teachings about non-violence and compassion.',
  misconceptions: [
    {
      misconception: 'The Aryan Invasion violently destroyed the Harappan civilisation overnight.',
      correction: 'Modern archaeological excavations show no uniform destruction layer or massacre victims; the decline was a multi-causal, gradual process of deurbanisation over 2-3 centuries driven by river desiccation, flooding, and ecological shifts.',
    },
    {
      misconception: 'The Harappan people were completely wiped out and vanished without a trace.',
      correction: 'Decline meant deurbanisation (loss of planned cities, standardized bricks, and long-distance trade). Populations transitioned into agrarian successor cultures like Jhukar in Sindh and Cemetery H at Harappa.',
    },
    {
      misconception: 'Flooding and river-drying theories refer to the same geographical phenomenon.',
      correction: 'Flooding (Raikes) refers to tectonic uplift damming the Indus at Mohenjo-daro; river-drying (Mughal/satellite imagery) refers to the desiccation of the Ghaggar-Hakra system due to the diversion of the Yamuna and Sutlej.',
    },
    {
      misconception: 'The Tripitaka and Angas were compiled at the same council and belong to the same religion.',
      correction: 'The Tripitaka is Buddhist (compiled at Rajagriha c. 483 BCE); the Angas are Jain (compiled at Valabhi c. 453 CE).',
    },
    {
      misconception: 'The Jatakas are historical biographies of the historical Buddha Siddhartha Gautama.',
      correction: 'The Jatakas are didactic folk tales of the Bodhisattva\'s previous births (purvajanma) that illustrate moral virtues and preserve evidence of ancient everyday society.',
    },
  ],
  diagnosticQuestions: [
    { question: 'When did the mature Harappan urban phase decline?', options: ['c. 3000 BCE', 'c. 1900 BCE', 'c. 1000 BCE', 'c. 500 BCE'], correctIndex: 1 },
    { question: 'Which Veda is the oldest, containing 1028 hymns?', options: ['Sama Veda', 'Yajur Veda', 'Rig Veda', 'Atharva Veda'], correctIndex: 2 },
    { question: 'What was the smallest social unit in Early Vedic society?', options: ['Jana', 'Vis', 'Grama', 'Kula'], correctIndex: 3 },
    { question: 'Which assembly was the smaller council of elders handling judicial disputes?', options: ['Samiti', 'Sabha', 'Vidhatha', 'Sangha'], correctIndex: 1 },
    { question: 'What was the decisive technological innovation around 1000 BCE in the Ganga doab?', options: ['Bronze smelting', 'Iron axes and ploughshares', 'Stone chisels', 'Steam engines'], correctIndex: 1 },
    { question: 'Which hymn describes the four varnas emerging from the cosmic Purusha?', options: ['Purusha Sukta (Rig Veda 10.90)', 'Gayatri Mantra', 'Bhumi Sukta', 'Acaranga Sutta'], correctIndex: 0 },
    { question: 'Which ashrama represents the householder who supports all other stages?', options: ['Brahmacharya', 'Grihastha', 'Vanaprastha', 'Sannyasa'], correctIndex: 1 },
    { question: 'The 12 Angas belong to which religious tradition?', options: ['Buddhism', 'Svetambara Jainism', 'Ajivika', 'Charvaka'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of Harappan decline theories, 4 Vedas & 4 textual layers, Early vs Later Vedic social/economic/political structures, Varna & Ashrama systems, Gurukula education, and Jain/Buddhist source canons.',
};

// ─── 5 INTERACTIVE BRILLIANT-STYLE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Harappan Decline Multi-Causal Simulator',
    instruction: 'Adjust the environmental and trade levers to discover why no single disaster destroyed the Indus cities.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_HISTCIV_021,
  },
  {
    title: 'Vedic Corpus & Four-Tier Architecture',
    instruction: 'Click each layer of the sacred Vedic pyramid (Samhita → Brahmana → Aranyaka → Upanishad) to uncover its transformation from ritual to philosophy.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_HISTCIV_022,
  },
  {
    title: 'Early Vedic Tribal Governance Map',
    instruction: 'Click on the social hierarchy and tribal assemblies to see how the Sabha, Samiti, and Vidhatha constrained the Rajan.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_HISTCIV_023,
  },
  {
    title: 'The Great Transformation: Pastoral to Iron Agrarian',
    instruction: 'Move the Era Slider from 1500 BCE (Early Vedic) to 600 BCE (Later Vedic) to observe the impact on economy, weapons, women\'s status, and monarchy.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_HISTCIV_026,
  },
  {
    title: 'The Shramana Canon Matrix: Jain & Buddhist Sources',
    instruction: 'Classify sacred sources into their respective religious traditions, councils, and genres.',
    interactionType: 'drag-classify',
    nodeId: NODE_C9_HISTCIV_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase River Desiccation (Ghaggar-Hakra drying) and Mesopotamian Trade Collapse to 100%, what happens to cities like Kalibangan and Lothal vs Mohenjo-daro?',
    options: [
      'All cities immediately burn down in warfare',
      'Kalibangan dries up and Lothal loses dockyard trade, while Mohenjo-daro suffers from Indus flooding/silting — demonstrating distinct regional impacts',
      'Every settlement instantly becomes a giant empire',
      'Nothing changes; the cities continue growing forever',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Environmental & Trade sliders in the simulator above to see regional deurbanisation in real-time!',
    nodeId: NODE_C9_HISTCIV_021,
  },
  {
    question: 'Predict: When iron metallurgy (1000 BCE) allows clearing the dense Ganga forests, what happens to the political power of the King and the Samiti?',
    options: [
      'The King becomes weaker and the Samiti gains total control',
      'Land revenue and standing armies emerge; the King becomes a territorial monarch while the tribal Samiti disappears',
      'People return to hunting and gathering in the mountains',
      'Assemblies become twice as large and elect kings annually',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Era Slider to 800 BCE to witness the rise of territorial kingship and the atrophy of tribal assemblies!',
    nodeId: NODE_C9_HISTCIV_026,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What do you notice about the Vedic textual pyramid as you move from the base (Samhita) to the apex (Upanishads)?',
    observableOptions: [
      'It shifts from concrete oral hymns and ritual formulas to abstract philosophical inquiry into the self (Atman) and reality (Brahman)',
      'It changes from written books to stone carvings',
      'It contains only military war instructions',
      'The later texts completely delete all earlier hymns',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_HISTCIV_022,
  },
  {
    question: 'Observation: What happens to women\'s participation and social freedom as the economy shifts from cattle pastoralism to settled iron agriculture?',
    observableOptions: [
      'Women gain more political seats in the royal assembly',
      'Upanayana is denied, assemblies are closed to women, and patrilineal property inheritance causes child marriage and seclusion to rise',
      'All women become rulers of the kingdoms',
      'No changes occur whatsoever',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_025,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Epigraphist and Constitutional Historian',
  description: 'Connect ancient subcontinental governance and literature to contemporary India! Reflect on how the 73rd Constitutional Amendment (1992) established the Gram Sabha in rural India, echoing the Rig Vedic Samiti tradition of direct village deliberation across 3,500 years.',
  steps: [
    'Identify how your local Gram Panchayat or Resident Welfare Association deliberates decisions collectively.',
    'Compare the oral preservation of the Vedas (recognized by UNESCO as Intangible Cultural Heritage) with modern digital data archiving.',
    'Examine how the Buddhist concept of the Sangha inspired democratic parliamentary procedures like quorums and voting by ballot (shalaka).',
  ],
};

// ─── MAIN COMPONENT ───
function C9_HistoryCivicsDeclineHarappanCivilisationSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c9_histciv_021',
  title = DEFAULT_PROPS.title || 'Decline of Harappa to Vedic & Shramana Sources',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org Interaction States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Variables
  const [tectonicFlooding, setTectonicFlooding] = useState(50);
  const [riverDesiccation, setRiverDesiccation] = useState(50);
  const [ecologicalOverload, setEcologicalOverload] = useState(40);
  const [tradeContraction, setTradeContraction] = useState(60);
  const [selectedPyramidLayer, setSelectedPyramidLayer] = useState<string>('samhita');
  const [selectedAssembly, setSelectedAssembly] = useState<string>('samiti');
  const [eraTimeline, setEraTimeline] = useState(1500); // 1500 BCE to 600 BCE
  const [selectedVarna, setSelectedVarna] = useState<string>('brahmin');
  const [selectedAshrama, setSelectedAshrama] = useState<string>('brahmacharya');

  // Difficulty & Mastery State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Answer State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Custom Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);

  // Visual Animation & Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // Filter challenges adaptively
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const explanationSentences = useMemo(() => {
    return (activeChallenge.explanation || '')
      .split('. ')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, [activeChallenge]);

  // Derived Simulation Calculations
  const deurbanisationImpact = useMemo(() => {
    const totalPressure = (tectonicFlooding * 0.25) + (riverDesiccation * 0.35) + (ecologicalOverload * 0.2) + (tradeContraction * 0.2);
    let status = 'Flourishing Bronze Age Urbanism (Grid cities, Great Bath, seals active)';
    if (totalPressure > 70) {
      status = 'Severe Deurbanisation: Cities deserted, shift to rural Jhukar & Cemetery H agrarian communities';
    } else if (totalPressure > 40) {
      status = 'Moderate Urban Decay: Standardized bricks & long-distance trade declining';
    }
    return { score: Math.round(totalPressure), status };
  }, [tectonicFlooding, riverDesiccation, ecologicalOverload, tradeContraction]);

  // Load Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Update Mastery via BKT
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas 2D River Flow animation
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

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x * 0.04) + (frame * 0.05)) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      const radius = 4 + Math.sin(frame * 0.08) * 1.5;
      ctx.arc(canvas.width - 25, 15, radius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP animation for Timeline shifts
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.to(timelineGsapRef.current, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      });
    }
  }, [eraTimeline]);

  // Escalating hints helper
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // Timer reset for inactivity hint
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Handlers for phase shifts
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation! Let us now explore the evidence.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ancient historical labs. Interact with each simulation to uncover the causes and evidence.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setTectonicFlooding(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with all variables with zero pressure before beginning challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Demonstrate your analytical mastery across all historical nodes.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to see what the physical evidence shows.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === 0 || idx === 1;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp historical deduction!' : 'Review the visualization closely.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - (errors as number) * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive Vedic and Harappan simulation.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setDroppedLabels({});
    setSortArrangement([]);
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

  // Answer validation
  const handleAnswer = useCallback((userResponse: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = userResponse === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(activeChallenge.correctOrder);
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent historical analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete historical explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Drag Handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? prev : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const copy = [...base];
      const [removed] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, removed);
      return copy;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  // Simulation Sliders / Clicks
  const handleTectonicChange = useCallback((val: number) => {
    setTectonicFlooding(val);
    audioManager.play('count');
  }, []);

  const handleDesiccationChange = useCallback((val: number) => {
    setRiverDesiccation(val);
    audioManager.play('count');
  }, []);

  const handleEcologicalChange = useCallback((val: number) => {
    setEcologicalOverload(val);
    audioManager.play('count');
  }, []);

  const handleTradeChange = useCallback((val: number) => {
    setTradeContraction(val);
    audioManager.play('count');
  }, []);

  const handleEraTimelineChange = useCallback((val: number) => {
    setEraTimeline(val);
    audioManager.play('count');
  }, []);

  const handleSelectPyramid = useCallback((layer: string) => {
    setSelectedPyramidLayer(layer);
    audioManager.play('tap');
  }, []);

  const handleSelectAssembly = useCallback((asm: string) => {
    setSelectedAssembly(asm);
    audioManager.play('tap');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-amber-950/60 border border-amber-600/40 rounded-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">Class 9 ICSE • Humanities & History Inquiry</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <canvas ref={canvasRef} width={120} height={30} className="rounded-lg bg-slate-900 border border-slate-800" />
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
            }`}
          >
            {difficulty} Tier
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="phase-discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 shadow-lg"
            >
              <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>🔍</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-amber-400/90 mt-3 font-semibold bg-amber-950/60 p-3 rounded-xl border border-amber-800/30">
                {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/30">Curiosity Hook</span>
                <p className="text-sm font-semibold text-white">{DISCOVERY_QUESTION.question}</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                        : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="inline-block w-6 text-amber-400 font-bold">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-emerald-400">✓ Correct</span>}
                    {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-rose-400">✗</span>}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}`}>
                    {discoveryCorrect ? '✓ Spot-on deduction! The evidence shows multi-causal deurbanisation.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Step into Archaeology Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-900/30"
                  >
                    Step into the Archaeology Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="phase-explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <motion.div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-amber-300">Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <span className="text-slate-400">Node Covered: <span className="font-mono text-amber-400">{EXPLORATION_STEPS[currentSlide].nodeId}</span></span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-sm text-slate-300 mt-1 font-medium flex items-center gap-2">
                    <span className="text-amber-400">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>

                {/* SLIDE 0: Harappan Decline Multi-Causal Simulator (SVG 1) */}
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    {!predictionMade ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-slate-950/80 rounded-xl border border-amber-800/40 space-y-3"
                      >
                        <p className="text-sm font-semibold text-amber-300">🤔 PREDICT BEFORE MANIPULATING:</p>
                        <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Predict option ${i + 1}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-600/40 text-xs text-emerald-300 flex items-center justify-between"
                      >
                        <span>✓ Prediction logged! Now drag the sliders to verify regional impacts in real-time.</span>
                        <span className="font-bold">Active Simulation</span>
                      </motion.div>
                    )}

                    {/* Multi-Causal Sliders */}
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Indus Tectonic Damming / Flooding (Raikes):</span>
                          <span className="text-amber-400 font-bold">{tectonicFlooding}%</span>
                        </div>
                        <input
                          aria-label="Indus Tectonic Damming Slider"
                          type="range"
                          min={0}
                          max={100}
                          value={tectonicFlooding}
                          onChange={(e) => handleTectonicChange(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Ghaggar-Hakra River Desiccation (Mughal/Satellite):</span>
                          <span className="text-amber-400 font-bold">{riverDesiccation}%</span>
                        </div>
                        <input
                          aria-label="Ghaggar-Hakra River Desiccation Slider"
                          type="range"
                          min={0}
                          max={100}
                          value={riverDesiccation}
                          onChange={(e) => handleDesiccationChange(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Deforestation & Salinisation (Fairservis):</span>
                          <span className="text-amber-400 font-bold">{ecologicalOverload}%</span>
                        </div>
                        <input
                          aria-label="Deforestation and Salinisation Slider"
                          type="range"
                          min={0}
                          max={100}
                          value={ecologicalOverload}
                          onChange={(e) => handleEcologicalChange(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Mesopotamian Gulf Trade Contraction (Meluhha):</span>
                          <span className="text-amber-400 font-bold">{tradeContraction}%</span>
                        </div>
                        <input
                          aria-label="Mesopotamian Gulf Trade Contraction Slider"
                          type="range"
                          min={0}
                          max={100}
                          value={tradeContraction}
                          onChange={(e) => handleTradeChange(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </motion.div>

                    {/* SVG 1: Real-time Map Simulation */}
                    <motion.div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 600 240" className="w-full h-auto" aria-label="Harappan Archaeological Map Simulation">
                        <rect width="600" height="240" fill="#0b0f19" rx={12} />
                        <text x="20" y="30" fill="#64748b" fontSize="12" fontWeight="bold">Harappan Archaeological Network (c. 2600 - 1900 BCE)</text>

                        {/* Indus River System */}
                        <path
                          d="M 120 20 Q 180 80 150 160 T 110 220"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth={tectonicFlooding > 60 ? 10 : 4}
                          className="transition-all duration-300"
                        />
                        <text x="80" y="100" fill="#38bdf8" fontSize="10">Indus River</text>

                        {/* Ghaggar-Hakra Palaeo-Channel */}
                        <path
                          d="M 280 20 Q 320 100 290 180 T 260 230"
                          fill="none"
                          stroke={riverDesiccation > 60 ? '#92400e' : '#0284c7'}
                          strokeWidth="3"
                          strokeDasharray={riverDesiccation > 50 ? '4 4' : '0'}
                          className="transition-all duration-300"
                        />
                        <text x="310" y="80" fill={riverDesiccation > 60 ? '#f59e0b' : '#38bdf8'} fontSize="10">
                          {riverDesiccation > 60 ? 'Ghaggar-Hakra (Drying Channel)' : 'Ghaggar-Hakra (Perennial)'}
                        </text>

                        {/* Mohenjo-daro Node */}
                        <circle cx="150" cy="120" r="14" fill={tectonicFlooding > 60 ? '#ef4444' : '#22c55e'} opacity="0.85" />
                        <text x="150" y="124" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Mohenjo-daro</text>
                        <text x="150" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                          {tectonicFlooding > 60 ? 'Heavy Silting & Floods' : 'Active Grid City'}
                        </text>

                        {/* Kalibangan Node */}
                        <circle cx="310" cy="90" r="12" fill={riverDesiccation > 55 ? '#f97316' : '#22c55e'} opacity="0.85" />
                        <text x="310" y="93" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Kalibangan</text>
                        <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                          {riverDesiccation > 55 ? 'Water Deprivation' : 'Ploughed Fields'}
                        </text>

                        {/* Lothal Dockyard Node */}
                        <circle cx="280" cy="200" r="12" fill={tradeContraction > 60 ? '#a855f7' : '#22c55e'} opacity="0.85" />
                        <text x="280" y="203" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Lothal</text>
                        <text x="280" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                          {tradeContraction > 60 ? 'Gulf Trade Deficit' : 'Active Tidal Basin'}
                        </text>

                        {/* Post-Urban Transformation Banner */}
                        <rect x="420" y="40" width="160" height="160" rx={8} fill="#1e293b" stroke="#334155" />
                        <text x="500" y="65" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Archaeological Status</text>
                        <text x="500" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10">Pressure Score: {deurbanisationImpact.score}%</text>
                        <foreignObject x="430" y="105" width="140" height="85">
                          <p className="text-[10px] text-slate-300 leading-tight">
                            {deurbanisationImpact.status}
                          </p>
                        </foreignObject>
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* SLIDE 1: Vedic Corpus & Four-Tier Architecture (SVG 2 Included) */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    {/* SVG 2: Four-Tier Vedic Pyramid Diagram */}
                    <motion.div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 600 200" className="w-full h-auto" aria-label="Vedic Corpus Four Tier Pyramid">
                        <rect width="600" height="200" fill="#090d16" rx={10} />
                        <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Vedic Sacred Literature: The 4 Internal Strata (Shruti)</text>

                        {/* Tier 4: Upanishad (Top) */}
                        <polygon
                          points="260,70 340,70 300,35"
                          fill={selectedPyramidLayer === 'upanishad' ? '#eab308' : '#334155'}
                          stroke="#fbbf24"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-all"
                          onClick={() => handleSelectPyramid('upanishad')}
                        />
                        <text x="300" y="58" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">4. Upanishads</text>

                        {/* Tier 3: Aranyaka */}
                        <polygon
                          points="220,110 380,110 340,73 260,73"
                          fill={selectedPyramidLayer === 'aranyaka' ? '#d97706' : '#1e293b'}
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-all"
                          onClick={() => handleSelectPyramid('aranyaka')}
                        />
                        <text x="300" y="96" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3. Aranyakas (Forest Texts)</text>

                        {/* Tier 2: Brahmana */}
                        <polygon
                          points="170,150 430,150 380,113 220,113"
                          fill={selectedPyramidLayer === 'brahmana' ? '#b45309' : '#0f172a'}
                          stroke="#d97706"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-all"
                          onClick={() => handleSelectPyramid('brahmana')}
                        />
                        <text x="300" y="136" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2. Brahmanas (Ritual Prose Manuals)</text>

                        {/* Tier 1: Samhita (Base) */}
                        <polygon
                          points="110,190 490,190 430,153 170,153"
                          fill={selectedPyramidLayer === 'samhita' ? '#92400e' : '#090f1d'}
                          stroke="#b45309"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-all"
                          onClick={() => handleSelectPyramid('samhita')}
                        />
                        <text x="300" y="176" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">1. Samhitas (Sacred Mantras: Rig, Sama, Yajur, Atharva)</text>
                      </svg>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      {[
                        { id: 'samhita', name: '1. Samhita (Base)', desc: 'Core collections of sacred oral hymns, suktas & mantras (e.g. Rig Veda 1028 hymns)' },
                        { id: 'brahmana', name: '2. Brahmana', desc: 'Prose ritual manuals explaining exact sacrificial mechanics, offerings & yajnas' },
                        { id: 'aranyaka', name: '3. Aranyaka', desc: 'Forest texts bridging ritual and contemplation for retired hermits' },
                        { id: 'upanishad', name: '4. Upanishad (Apex)', desc: 'Philosophical inquiries into Atman (Self) and Brahman (Cosmic Reality)' },
                      ].map((layer) => (
                        <motion.button
                          key={layer.id}
                          aria-label={`Select layer ${layer.name}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSelectPyramid(layer.id)}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            selectedPyramidLayer === layer.id
                              ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-lg'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          <p className="font-bold text-sm text-amber-300">{layer.name}</p>
                          <p className="text-xs text-slate-300 mt-2 leading-snug">{layer.desc}</p>
                        </motion.button>
                      ))}
                    </div>

                    <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Classification of Sacred Ancient Literature:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-700/50">
                          <p className="font-bold text-indigo-300 text-sm">Shruti ("That which is Heard")</p>
                          <p className="text-xs text-slate-300 mt-1">Divinely revealed to rishis; highest authority. Includes only the 4 Vedas and their 4 internal tiers.</p>
                        </div>
                        <div className="p-3 bg-purple-950/40 rounded-lg border border-purple-700/50">
                          <p className="font-bold text-purple-300 text-sm">Smriti ("That which is Remembered")</p>
                          <p className="text-xs text-slate-300 mt-1">Composed by human sages from tradition. Includes Ramayana (Valmiki), Mahabharata (Vyasa / Bhagavad Gita), Dharmasutras.</p>
                        </div>
                      </div>
                    </motion.div>

                    {!observationAnswered ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-slate-950/80 rounded-xl border border-amber-800/40 space-y-2"
                      >
                        <p className="text-xs font-bold text-amber-300">SCIENTIFIC OBSERVATION CHALLENGE:</p>
                        <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Observation option ${i + 1}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-400 font-medium"
                      >
                        ✓ Observation confirmed: The Vedic progression represents an evolution from concrete oral ritual to profound abstract metaphysics.
                      </motion.p>
                    )}
                  </div>
                )}

                {/* SLIDE 2: Early Vedic Social Organisation & Assemblies */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Kinship-Based Social Hierarchy:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <p className="text-xs font-bold text-amber-300">1. Kula</p>
                          <p className="text-[11px] text-slate-400 mt-1">Joint patriarchal family headed by the <span className="text-white font-semibold">Grihapati</span> (maintains agnihotra)</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <p className="text-xs font-bold text-amber-300">2. Grama</p>
                          <p className="text-[11px] text-slate-400 mt-1">Village settlement led by the <span className="text-white font-semibold">Gramani</span></p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <p className="text-xs font-bold text-amber-300">3. Vis</p>
                          <p className="text-[11px] text-slate-400 mt-1">Clan group claiming common ancestry; common people</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <p className="text-xs font-bold text-amber-300">4. Jana</p>
                          <p className="text-[11px] text-slate-400 mt-1">Entire tribe (e.g. Bharatas, Purus) led by the <span className="text-white font-semibold">Rajan (Gopati)</span></p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'vidhatha',
                          name: 'Vidhatha',
                          sub: 'Oldest Assembly',
                          role: 'Redistributive assembly for dividing cattle raid booty (vajas) and performing communal rituals.',
                          fate: 'Disappeared in Later Vedic age.',
                        },
                        {
                          id: 'samiti',
                          name: 'Samiti',
                          sub: 'General Tribal Assembly',
                          role: 'Political-military body of the entire tribe that elected/confirmed the Rajan and checked his power.',
                          fate: 'Atrophied with rise of territorial monarchy.',
                        },
                        {
                          id: 'sabha',
                          name: 'Sabha',
                          sub: 'Council of Elders',
                          role: 'Smaller body of senior elders settling judicial disputes, property inheritance, and administrative issues.',
                          fate: 'Narrowed into a specialized judicial court.',
                        },
                      ].map((asm) => (
                        <motion.button
                          key={asm.id}
                          aria-label={`Select assembly ${asm.name}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectAssembly(asm.id)}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            selectedAssembly === asm.id
                              ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-sm text-amber-300">{asm.name}</p>
                            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400 font-mono">{asm.sub}</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{asm.role}</p>
                          <p className="text-[11px] text-orange-400/90 mt-2 italic font-semibold">Later Fate: {asm.fate}</p>
                        </motion.button>
                      ))}
                    </div>

                    <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                      <span className="text-2xl">⚔️</span>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-amber-300">The Battle of the Ten Kings (Parushni River, c. 14th Century BCE):</p>
                        <p className="text-slate-300">
                          King Sudas of the Bharatas defeated a 10-tribe confederacy backed by the ritual counsel of his Purohita <span className="text-amber-400 font-semibold">Vasishtha</span>. The defection of rival priest <span className="text-amber-400 font-semibold">Vishwamitra</span> demonstrates that the royal priest was a decisive political kingmaker, not merely a religious figure.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* SLIDE 3: Early vs Later Vedic Transition Engine (SVG 3 Included) */}
                {currentSlide === 3 && (
                  <div className="space-y-6">
                    {/* SVG 3: Geographical & Technological Transition Map */}
                    <motion.div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 600 180" className="w-full h-auto" aria-label="Early vs Later Vedic Migration and Iron Transition Map">
                        <rect width="600" height="180" fill="#080c14" rx={10} />
                        <text x="20" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold">Eastward Migration & Agrarian Shift (Sapta Sindhu → Ganga-Yamuna Doab)</text>

                        {/* Sapta Sindhu Zone (Early Vedic) */}
                        <rect x="30" y="45" width="220" height="115" rx={8} fill={eraTimeline >= 1100 ? '#1e3a5f' : '#0f172a'} stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="140" y="70" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Early Vedic Zone (Sapta Sindhu)</text>
                        <text x="140" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="9">Pastoral Herding • Gavishti (Cattle Raid)</text>
                        <text x="140" y="106" textAnchor="middle" fill="#94a3b8" fontSize="9">Staple: Yava (Barley) • Ayas (Bronze)</text>
                        <text x="140" y="122" textAnchor="middle" fill="#34d399" fontSize="9">Tribal Samiti/Sabha • Women Rishikas</text>

                        {/* Migration Flow Arrow */}
                        <path d="M 260 100 L 320 100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x="290" y="90" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">c. 1000 BCE</text>
                        <text x="290" y="120" textAnchor="middle" fill="#fbbf24" fontSize="8">Iron Smelting</text>

                        {/* Ganga Doab Zone (Later Vedic) */}
                        <rect x="330" y="45" width="240" height="115" rx={8} fill={eraTimeline < 1100 ? '#451a03' : '#0f172a'} stroke="#f97316" strokeWidth="1.5" />
                        <text x="450" y="70" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">Later Vedic Zone (Ganga Plain)</text>
                        <text x="450" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="9">Iron Forest Clearance • Atranjikhera</text>
                        <text x="450" y="106" textAnchor="middle" fill="#94a3b8" fontSize="9">Paddy Rice (Vrihi) • Territorial Monarchy</text>
                        <text x="450" y="122" textAnchor="middle" fill="#f87171" fontSize="9">Rigid Hereditary Varna • Ashrama Stages</text>
                      </svg>
                    </motion.div>

                    {/* Timeline Slider with Real-time Binding */}
                    <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-300">Interactive Timeline Slider:</span>
                        <span className="font-mono text-amber-400 font-bold text-sm">{eraTimeline} BCE</span>
                      </div>
                      <input
                        aria-label="Vedic Era Timeline Slider"
                        type="range"
                        min={600}
                        max={1500}
                        step={100}
                        value={eraTimeline}
                        onChange={(e) => handleEraTimelineChange(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Later Vedic / Iron Age (600 BCE)</span>
                        <span>Transition Phase (1000 BCE)</span>
                        <span>Early Rig Vedic / Pastoral (1500 BCE)</span>
                      </div>
                    </motion.div>

                    {/* Dynamic Comparative Dashboard */}
                    <div ref={timelineGsapRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-amber-400">Primary Wealth & Economy</p>
                        <p className="text-xs text-white mt-1.5 font-medium">
                          {eraTimeline > 1000 ? 'Pastoral Herding: Cattle (Gavishti = search for cows). Staple: Yava (Barley) in Sapta Sindhu.' : 'Iron Agriculture: Land ownership, rice (Vrihi) & wheat (Godhuma) in Ganga doab.'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-amber-400">Key Technology & Crafts</p>
                        <p className="text-xs text-white mt-1.5 font-medium">
                          {eraTimeline > 1000 ? 'Bronze (ayas) & wooden ploughs; mobile pottery; minimal trade.' : 'Iron axes for forest clearing & iron ploughshares (Atranjikhera); Karmara, Rathakara, Vanij.'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-amber-400">Status of Women</p>
                        <p className="text-xs text-white mt-1.5 font-medium">
                          {eraTimeline > 1000 ? 'High Status: Upanayana initiation, attend Sabha/Samiti, Svayamvara, rishikas (Lopamudra, Ghosha, Gargi).' : 'Restricted: Denied upanayana & assemblies; child marriage (Dharmasutras) due to patrilineal land inheritance.'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-amber-400">Monarchy & Varna Structure</p>
                        <p className="text-xs text-white mt-1.5 font-medium">
                          {eraTimeline > 1000 ? 'Tribal Chieftain (Gopati) checked by Samiti; flexible occupation-based Varna (Vishwamitra, Satyakama).' : 'Territorial Hereditary King (Bhupati); rigid birth-based Varna codified by Gautama Dharmasutra & Manusmriti.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 4: Shramana Canon Matrix (Jainism & Buddhism) */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-amber-800/40 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-300 text-sm">Twelve Angas</span>
                          <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-600/30">Jainism (Svetambara)</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Preserved orally for ~900 years; committed to writing at the <span className="text-amber-400 font-semibold">Council of Valabhi (c. 453 CE)</span> under Devardhigani. Includes <span className="text-white font-medium">Acaranga Sutta</span> (monastic rules) and <span className="text-white font-medium">Bhagavati Sutra</span>.
                        </p>
                        <p className="text-[10px] text-slate-400 italic">Note: Digambara sect rejects Angas as corrupted, relying on lost Purvas.</p>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-blue-800/40 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-300 text-sm">Tripitaka ("3 Baskets")</span>
                          <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-600/30">Buddhism (Pali Canon)</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Compiled at the <span className="text-blue-400 font-semibold">First Council at Rajagriha (c. 483 BCE)</span> under Mahakassapa. Divided into:
                        </p>
                        <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                          <li><span className="text-white font-semibold">Sutta Pitaka:</span> Discourses & Dhammapada</li>
                          <li><span className="text-white font-semibold">Vinaya Pitaka:</span> Monastic Sangha rules</li>
                          <li><span className="text-white font-semibold">Abhidhamma Pitaka:</span> Philosophy of mind</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-emerald-800/40 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-emerald-300 text-sm">Jataka Tales (~550)</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-600/30">Didactic Folk Canons</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Stories of the Bodhisattva's <span className="text-emerald-400 font-semibold">previous births (purvajanma)</span> as animals and humans, teaching moral virtues (e.g. Vessantara Jataka).
                        </p>
                        <p className="text-[10px] text-slate-400 italic">Carved in stone relief on the Bharhut & Sanchi stupa railings (c. 2nd century BCE) as popular visual instruction.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Controls for Explore */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <motion.button
                    aria-label="Previous Lab Step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                  >
                    ← Previous Lab
                  </motion.button>

                  <div className="flex items-center gap-1">
                    {EXPLORATION_STEPS.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                          i === currentSlide ? 'w-6 bg-amber-500' : 'w-2 bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button
                      aria-label="Next Lab Step"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentSlide(s => s + 1)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md"
                    >
                      Next Lab →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Unlock Free Sandbox"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      Unlock Free Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="phase-sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-emerald-300">Archaeological Sandbox (Zero Pressure Exploration)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Test any combination of environmental factors and Vedic social institutions freely. No grading applies.
                  </p>
                </div>
                <span className="text-2xl p-2 bg-emerald-950/60 rounded-xl border border-emerald-600/30">🧪</span>
              </div>

              {/* Sandbox Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-amber-400 uppercase">1. Decline Factor Combinations</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Tectonic Damming: {tectonicFlooding}%</span>
                      <span className="text-slate-300">River Desiccation: {riverDesiccation}%</span>
                    </div>
                    <input
                      aria-label="Sandbox Tectonic Damming Slider"
                      type="range"
                      min={0}
                      max={100}
                      value={tectonicFlooding}
                      onChange={(e) => handleTectonicChange(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-slate-300">Ecological Overgrazing: {ecologicalOverload}%</span>
                      <span className="text-slate-300">Trade Contraction: {tradeContraction}%</span>
                    </div>
                    <input
                      aria-label="Sandbox River Desiccation Slider"
                      type="range"
                      min={0}
                      max={100}
                      value={riverDesiccation}
                      onChange={(e) => handleDesiccationChange(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-amber-300 border border-slate-800">
                    <span className="font-bold">Total Deurbanisation Pressure:</span> {deurbanisationImpact.score}% — {deurbanisationImpact.status}
                  </div>
                </motion.div>

                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-amber-400 uppercase">2. Varna & Ashrama Life-Cycle Inspector</p>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      aria-label="Select Varna"
                      value={selectedVarna}
                      onChange={(e) => setSelectedVarna(e.target.value)}
                      className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    >
                      <option value="brahmin">Brahmin (Mouth - Priestly/Learning)</option>
                      <option value="kshatriya">Kshatriya (Arms - Ruling/War)</option>
                      <option value="vaishya">Vaishya (Thighs - Agriculture/Trade)</option>
                      <option value="shudra">Shudra (Feet - Service/Labour)</option>
                    </select>

                    <select
                      aria-label="Select Ashrama"
                      value={selectedAshrama}
                      onChange={(e) => setSelectedAshrama(e.target.value)}
                      className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    >
                      <option value="brahmacharya">1. Brahmacharya (Gurukula Student)</option>
                      <option value="grihastha">2. Grihastha (Householder Support)</option>
                      <option value="vanaprastha">3. Vanaprastha (Forest Hermitage)</option>
                      <option value="sannyasa">4. Sannyasa (Total Renunciation)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800 leading-relaxed">
                    <span className="font-bold text-amber-300">Social Eligibility:</span> Ashramas applied strictly to male <span className="text-white font-semibold">Dwijas</span> (Twice-born: Brahmin, Kshatriya, Vaishya). Shudras and most women were excluded from formal Gurukula initiation (upanayana).
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  aria-label="Proceed to CISCE Master Challenges"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-amber-950/40 flex items-center gap-2"
                >
                  <span>Ready for CISCE Master Challenges!</span> <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="phase-challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Challenge Meta Bar */}
            <motion.div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-600/30">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {activeChallenge.nodeId}
                  </span>
                  <span className="text-[11px] font-semibold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-600/30 uppercase">
                    NEP: {activeChallenge.competencyLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Hints Used: {hintCount}/3</span>
                  {hintCount > 0 && (
                    <span className="text-xs text-amber-400 font-bold">({3 - hintCount} hints left)</span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>

            <div className="text-xs text-indigo-300 mt-1">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* Question Card with Shake & Red Flash on Error */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500 text-rose-100 shadow-2xl shadow-rose-950/50'
                  : 'bg-slate-900/90 border-slate-800 text-slate-100'
              }`}
            >
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">
                {activeChallenge.question}
              </p>

              {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {activeChallenge.options.map((opt, i) => {
                    const isCorrectTarget = showExplanation && i === activeChallenge.correctIndex;
                    return (
                      <motion.button
                        key={i}
                        aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        disabled={showExplanation}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                          isCorrectTarget
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700'
                        }`}
                      >
                        <span className="font-bold text-amber-400 text-sm mt-0.5">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectTarget && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* TYPE 2: Drag Label on Diagram */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <motion.div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 self-center mr-2">Drag Labels:</span>
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable label ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                      <div
                        key={targetId}
                        role="region"
                        aria-label={`Drop target for ${targetId}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-900 rounded-xl border border-dashed border-slate-700 text-center min-h-[70px] flex flex-col justify-center items-center gap-1"
                      >
                        <span className="text-[11px] text-slate-400 uppercase font-mono">{targetId.replace('t_', 'Target: ').replace('v_', 'Target: ')}</span>
                        <span className={`text-xs font-bold ${droppedLabels[targetId] ? 'text-amber-300' : 'text-slate-500'}`}>
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching label here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify Dropped Labels Mapping"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Verify Mapping ✓
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: Drag Sort (Arrangement) */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-4">
                  <p className="text-xs text-amber-400 font-semibold">Drag items up or down to arrange them into chronological / hierarchical order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === activeChallenge.sortItems.length
                      ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                      : activeChallenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable sort item ${displayIdx + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 cursor-grab flex items-center justify-between"
                      >
                        <span><span className="text-amber-400 font-bold mr-2">{displayIdx + 1}.</span> {item}</span>
                        <span className="text-slate-500 text-xs">↕ Drag</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Submit Arranged Order"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={showExplanation}
                    onClick={handleSortSubmit}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Submit Order ✓
                  </motion.button>
                </div>
              )}

              {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/60 to-slate-900 rounded-2xl border border-amber-600/40 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    <h4 className="text-sm font-bold text-amber-300">Detailed Step-by-Step Historical Analysis:</h4>
                  </div>

                  <div className="space-y-2">
                    {explanationSentences.slice(0, revealedSteps + 1).map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    {revealedSteps < explanationSentences.length - 1 ? (
                      <motion.button
                        aria-label="Show Next Explanatory Step"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg border border-amber-500/30"
                      >
                        Show Next Explanatory Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label="Proceed to Next Challenge"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Historical Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL SYNTHESIS ─── */}
        {phase === 'complete' && (
          <motion.div
            key="phase-complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <motion.div className="p-8 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 rounded-3xl border border-amber-600/40 text-center space-y-4">
              <span className="text-5xl">🏆</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Historical Inquiry Mastered!</h2>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                You have reconstructed the decline of the Indus cities, navigated the four Vedas and their social systems, and examined the foundational sources of Jainism and Buddhism.
              </p>

              <div className="flex flex-wrap justify-center gap-4 py-3">
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                  <p className="text-[11px] text-slate-400">Final Score</p>
                  <p className="text-xl font-extrabold text-amber-400">{Math.max(0, 100 - (errors as number) * 5)}%</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                  <p className="text-[11px] text-slate-400">Mastery Level</p>
                  <p className="text-xl font-extrabold text-emerald-400 capitalize">{masteryLevel}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                  <p className="text-[11px] text-slate-400">Nodes Mastered</p>
                  <p className="text-xl font-extrabold text-sky-400">10 / 10</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Motivational Feedback Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-600/40 space-y-1"
            >
              <p className="text-sm font-bold text-emerald-300">
                {errors === 0
                  ? 'PERFECT SCORE! Outstanding historical scholarship and command over physical and textual sources.'
                  : errors <= 3
                  ? 'Great work! Excellent grasp of Vedic social structures and Harappan deurbanisation.'
                  : errors <= 7
                  ? 'Good effort! You made solid progress across challenging historical concepts.'
                  : 'Do not give up — You WILL get this! Review the misconceptions below and retry to solidify your mastery.'}
              </p>
            </motion.div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span> Target Areas for Examination Revision:
                </h3>
                <div className="space-y-2.5">
                  {hitMisconceptions.map((idx) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Historical Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Visibility */}
            <motion.div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/40 text-xs text-slate-300 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-amber-300">Spaced Repetition Schedule (SM-2 Algorithm):</p>
                <p className="mt-1">
                  Based on your performance, review this topic in{' '}
                  <span className="text-amber-400 font-bold">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </span>{' '}
                  to lock it into long-term memory.
                </p>
              </div>
              <span className="text-2xl">📅</span>
            </motion.div>

            {/* Real World Activity Section */}
            <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <span>🏛️</span> {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-amber-400 font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Popups & Engine Elements */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Recorded in Profile!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export { C9_HistoryCivicsDeclineHarappanCivilisationSim };
export default C9_HistoryCivicsDeclineHarappanCivilisationSim;