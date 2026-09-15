'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 NODES) ───
const NODE_C12_MASSMEDIA_011 = 'c12_massmedia_011';
const NODE_C12_MASSMEDIA_012 = 'c12_massmedia_012';
const NODE_C12_MASSMEDIA_013 = 'c12_massmedia_013';
const NODE_C12_MASSMEDIA_014 = 'c12_massmedia_014';
const NODE_C12_MASSMEDIA_015 = 'c12_massmedia_015';
const NODE_C12_MASSMEDIA_016 = 'c12_massmedia_016';
const NODE_C12_MASSMEDIA_017 = 'c12_massmedia_017';
const NODE_C12_MASSMEDIA_018 = 'c12_massmedia_018';
const NODE_C12_MASSMEDIA_019 = 'c12_massmedia_019';
const NODE_C12_MASSMEDIA_020 = 'c12_massmedia_020';

const ALL_NODE_IDS = [
  NODE_C12_MASSMEDIA_011,
  NODE_C12_MASSMEDIA_012,
  NODE_C12_MASSMEDIA_013,
  NODE_C12_MASSMEDIA_014,
  NODE_C12_MASSMEDIA_015,
  NODE_C12_MASSMEDIA_016,
  NODE_C12_MASSMEDIA_017,
  NODE_C12_MASSMEDIA_018,
  NODE_C12_MASSMEDIA_019,
  NODE_C12_MASSMEDIA_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Media Lab Studio Masterclass: From Celluloid to Cyberspace',
  intro: 'You are appointed Executive Media Director at Prasar Bharati & National Media Academy. Your mission: direct iconic cinematic sequences, engineer flawless broadcast radio productions, preserve parallel cinema legacies, and strategise viral digital media campaigns across India.',
  context: 'Navigate camera framing geometry, acoustic studio dynamics, genre hybridity, social change cinema funding, and interactive digital networks.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In S. S. Rajamouli’s "Baahubali", the 100-foot Shiva statue reveal makes viewers feel awe and reverence. Which shot/angle combination creates this monumental psychological effect?',
  options: [
    'Extreme Close-Up at High Angle',
    'Worm-Eye View / Extreme Low Angle with upward tilt',
    'Bird\'s Eye View looking straight down',
    'Eye-level Medium Shot'
  ],
  correctIndex: 1,
  hintAfter: 'Notice how camera perspective physically places the viewer beneath the subject to confer power and grandeur!',
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_mm_001',
    nodeId: NODE_C12_MASSMEDIA_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which shot size frames the human subject from roughly the waist upward, making it the workhorse for Indian TV news debates and panel discussions on NDTV and ABP News?',
    options: ['Extreme Long Shot (ELS)', 'Medium Shot (MS)', 'Close-Up (CU)', 'Aerial Shot'],
    correctIndex: 1,
    explanation: 'A Medium Shot (MS) frames subjects from the waist up. It balances facial emotion with natural hand gestures, mirroring everyday conversation.',
    hints: [
      'Think of what allows an interviewer to show both hand gestures and facial expressions.',
      'It is neither too far (full body) nor too tight (just the face).',
      'It is framed from the waist up — the Medium Shot.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_002',
    nodeId: NODE_C12_MASSMEDIA_011,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the correct shot size or viewpoint to match each iconic Indian media scene function.',
    dragItems: [
      { label: 'Extreme Long Shot', targetId: 'zone_geography' },
      { label: 'Close-Up', targetId: 'zone_emotion' },
      { label: 'Bird\'s Eye View', targetId: 'zone_pattern' },
      { label: 'Worm-Eye View', targetId: 'zone_power' },
    ],
    correctMapping: {
      zone_geography: 'Extreme Long Shot',
      zone_emotion: 'Close-Up',
      zone_power: 'Worm-Eye View',
      zone_pattern: 'Bird\'s Eye View',
    },
    explanation: 'ELS establishes vast terrain (Sholay ravines); CU isolates raw emotion (Apu\'s tear); Worm-Eye elevates power (statue reveals); Bird\'s Eye flattens into geometric patterns (Kumbh drone view).',
    hints: [
      'Establishing Ramanagara ravines requires distance; an emotional tear requires isolation.',
      'Looking straight down flattens patterns; looking up builds monumental authority.',
      'Map: ELS -> Geography, CU -> Emotion, Worm-Eye -> Power, Bird\'s Eye -> Pattern.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_mm_003',
    nodeId: NODE_C12_MASSMEDIA_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental mechanical difference between a Pan and a Tilt in cinematography?',
    options: [
      'Pan is vertical rotation; Tilt is horizontal rotation on fixed tripod axis.',
      'Pan is horizontal swivel left/right; Tilt is vertical pivot up/down on fixed axes.',
      'Pan physically moves on tracks; Tilt moves using an airborne crane arm.',
      'Pan magnifies optically; Tilt changes physical sensor focal length.'
    ],
    correctIndex: 1,
    explanation: 'A Pan (panorama) rotates horizontally on a fixed vertical axis. A Tilt pivots vertically up/down on a fixed horizontal axis.',
    hints: [
      'Think of turning your head left-right vs nodding up-down.',
      'Panorama relates to the horizontal horizon.',
      'Pan is horizontal; Tilt is vertical.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_004',
    nodeId: NODE_C12_MASSMEDIA_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does a Dolly-In create an immersive emotional depth that a Zoom-In cannot replicate?',
    options: [
      'Dolly changes focal length digitally without shifting equipment.',
      'Dolly physically moves the camera through 3D space, producing dynamic parallax shifts between foreground and background.',
      'Zoom physically transports the operator along studio floor tracks.',
      'Dolly prevents any background elements from shifting in perspective.'
    ],
    correctIndex: 1,
    explanation: 'A dolly physically traverses space, creating spatial parallax where foreground objects move faster than background objects. A zoom merely magnifies the 2D image optically.',
    hints: [
      'Consider parallax: how near objects move relative to far objects as you walk.',
      'Optical magnification flattens background; physical camera transit preserves depth.',
      'Dolly moves through space creating realistic parallax shift.',
    ],
  },
  {
    id: 'ch_mm_005',
    nodeId: NODE_C12_MASSMEDIA_013,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the radio feature script cues in standard acoustic storytelling order (Theatre of the Mind).',
    sortItems: [
      'Ambience SFX (Temple bells & river waves fade in)',
      'Specific action SFX (Boatman\'s oar splashing)',
      'Conversational Voice-over (Warm active narration introduces dawn)',
      'Soft Sitar theme music under voice (Fades out gently)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Radio scripts build acoustic imagery from broad environmental ambience to specific physical actions, followed by direct human voice and musical punctuation.',
    hints: [
      'Start with establishing the environment through ambient sound.',
      'Introduce specific focal actions before the announcer speaks.',
      'Ambience -> Action SFX -> Voice -> Music bed.',
    ],
  },
  {
    id: 'ch_mm_006',
    nodeId: NODE_C12_MASSMEDIA_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which radio script line follows the ISC principles of conversational language, active voice, and jargon-free simplicity?',
    options: [
      '"It is hereby notified to all listeners that the rainfall precipitation index has escalated beyond standard metrics."',
      '"Heavy monsoon rains flooded Chennai streets this morning, so remember to grab your umbrella before stepping out!"',
      '"A significant meteorological phenomenon was observed by atmospheric scientists across coastal boundaries."',
      '"Precipitation was experienced by urban commuters during diurnal transition intervals."'
    ],
    correctIndex: 1,
    explanation: 'Radio writing requires active voice ("Heavy monsoon rains flooded..."), conversational warmth ("remember to grab your umbrella"), and zero confusing meteorological jargon.',
    hints: [
      'Look for the sentence that sounds like a friendly conversation, not an official government gazette.',
      'Avoid passive constructions like "was observed" or "was experienced".',
      'Choose the active, warm, relatable daily warning.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mm_007',
    nodeId: NODE_C12_MASSMEDIA_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is an Indian broadcast radio facility strictly partitioned into a Talk Studio and a Control Room separated by double-glazed glass?',
    options: [
      'To prevent technical fader clicks, keyboard typing, and fan hums from leaking into ultra-sensitive studio condenser mics.',
      'To ensure the presenter cannot visually see the sound engineer during live broadcasts.',
      'Because the radio transmitter must always be physically situated inside the talk studio.',
      'To amplify the audio signal by bouncing sound waves off the glass.'
    ],
    correctIndex: 0,
    explanation: 'Double-glazed acoustic partitions isolate sensitive studio microphones from control room operational noise (fader snaps, intercom chatter, cooling fans) while preserving clear visual contact.',
    hints: [
      'Consider the sensitivity of condenser microphones inside a recording booth.',
      'Control rooms have physical equipment, computers, and talkback intercoms that make noise.',
      'Acoustic isolation prevents operational noise contamination while keeping visual cues intact.',
    ],
  },
  {
    id: 'ch_mm_008',
    nodeId: NODE_C12_MASSMEDIA_014,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the precise broadcast audio signal flow chain from speaker voice to radio receiver antenna.',
    availableParts: ['Microphone', 'Pre-Amplifier', 'Sound Mixer / Console', 'DAW / Audio Processor', 'Transmitter & Modulator', 'Radiating Antenna'],
    targetState: 'Microphone Pre-Amplifier Sound Mixer / Console DAW / Audio Processor Transmitter & Modulator Radiating Antenna',
    validationHint: 'Follow the acoustic -> electrical -> line level -> mixed -> processed -> RF modulated -> radiated wave sequence.',
    explanation: 'Acoustic voice is transduced by the Microphone, boosted by Pre-Amp to line level, balanced in the Mixer, processed in DAW/Audio Chain, modulated onto carrier waves in Transmitter, and broadcast via Antenna.',
    hints: [
      'First sound enters the microphone, which needs pre-amplification.',
      'The mixer balances levels before digital recording and RF transmission.',
      'Chain: Mic -> Pre-Amp -> Mixer -> DAW -> Transmitter -> Antenna.',
    ],
  },
  {
    id: 'ch_mm_009',
    nodeId: NODE_C12_MASSMEDIA_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which legendary Indian radio presenter pioneered audience connectedness with the iconic greeting "Bhaiyo aur Behno" on Binaca Geet Mala?',
    options: ['Melville de Mellow', 'Ameen Sayani', 'Vinod Dua', 'Satyajit Ray'],
    correctIndex: 1,
    explanation: 'Ameen Sayani anchored "Binaca Geet Mala" from 1952 to 1994, defining the gold standard of warmth, voice modulation, and audience connection in Indian broadcasting.',
    hints: [
      'He hosted the iconic countdown show broadcast on Radio Ceylon and Vividh Bharati.',
      'His warm, intimate phrasing turned radio into an evening family ritual.',
      'It is Ameen Sayani.',
    ],
  },
  {
    id: 'ch_mm_010',
    nodeId: NODE_C12_MASSMEDIA_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In contemporary Indian FM radio (Radio Mirchi, Red FM, Big FM), where playlists are largely uniform Bollywood hits, what constitutes an RJ\'s primary competitive edge?',
    options: [
      'Owning exclusive physical rights to the vinyl records in studio.',
      'Audience connectedness, relatable local wit, spontaneous caller empathy, and bilingual language command.',
      'Setting manual transmitter wattage output higher than competing towers.',
      'Refusing to use mixing console faders or headphone monitors.'
    ],
    correctIndex: 1,
    explanation: 'Uses and Gratifications theory explains that listeners tune into specific FM stations for companionship and personality; RJ connectedness and wit differentiate stations playing identical playlists.',
    hints: [
      'If every station plays the same songs, why do you listen to one specific station?',
      'It is the host\'s personal warmth, humour, and local cultural rapport.',
      'Audience connectedness and language command form the core RJ identity.',
    ],
  },
  {
    id: 'ch_mm_011',
    nodeId: NODE_C12_MASSMEDIA_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On what historic date and venue did the Lumière Brothers host the first public commercial film screening with their Cinématographe?',
    options: [
      '3 May 1913 at Coronation Cinema, Bombay',
      '28 December 1895 at Grand Café, Boulevard des Capucines, Paris',
      '14 July 1889 at the Eiffel Tower, Paris',
      '1 January 1900 at Broadway Theatre, New York'
    ],
    correctIndex: 1,
    explanation: 'Auguste and Louis Lumière projected "Workers Leaving the Lumière Factory" and "Arrival of a Train" to a paying public on 28 December 1895 at Grand Café, Paris.',
    hints: [
      'It occurred in Paris at the end of the nineteenth century.',
      'Look for December 1895 and the famous Grand Café venue.',
      '28 December 1895, Grand Café, Paris.',
    ],
  },
  {
    id: 'ch_mm_012',
    nodeId: NODE_C12_MASSMEDIA_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do the historic documentary contributions of Robert Flaherty and John Grierson fundamentally differ?',
    options: [
      'Flaherty coined the word "documentary" in 1950; Grierson made "Nanook of the North" in 1913.',
      'Flaherty was the pioneering practitioner ("Nanook of the North", 1922); Grierson was the theorist who coined "documentary" (1926) and defined it as the "creative treatment of actuality".',
      'Flaherty only directed Indian mythological films; Grierson founded the Lumière Cinematograph company.',
      'Both directed "Raja Harishchandra" jointly in Bombay.'
    ],
    correctIndex: 1,
    explanation: 'Robert Flaherty created the first feature non-fiction film ("Nanook of the North"). John Grierson coined the term in a 1926 review of "Moana" and established the British social documentary movement.',
    hints: [
      'Flaherty lived with the Inuit in the Arctic to shoot his film.',
      'Grierson wrote reviews and gave the theoretical definition "creative treatment of actuality".',
      'Flaherty = Father of Documentary film; Grierson = Coined the term & founded social documentary movement.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_013',
    nodeId: NODE_C12_MASSMEDIA_016,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In which year did Dadasaheb Phalke release India\'s first indigenous full-length feature film, "Raja Harishchandra"? (Enter 4-digit year)',
    correctAnswer: 1913,
    tolerance: 0,
    unit: 'CE',
    explanation: 'Dadasaheb Phalke released "Raja Harishchandra" on 3 May 1913 at Coronation Cinema, Girgaon, Bombay, establishing the foundation of Indian cinema.',
    hints: [
      'It was released in the second decade of the 20th century.',
      'Exactly 15 years before the talkies arrived.',
      '1913 is the celebrated birth year of Indian feature cinema.',
    ],
  },
  {
    id: 'ch_mm_014',
    nodeId: NODE_C12_MASSMEDIA_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In genre theory, Thomas Schatz defines genre as a "contract" between filmmaker and audience. Why is Ramesh Sippy\'s "Sholay" (1975) considered a landmark "Curry Western" hybrid?',
    options: [
      'It eliminated all Indian emotional relationships and cast American Hollywood actors.',
      'It synthesized American Western iconography (horseback dacoits, frontier ravines, revenge showdown) with Indian melodrama, songs, comedy, and family loyalty.',
      'It was certified as pure science-fiction by the CBFC.',
      'It strictly refused any action or stunt choreography.'
    ],
    correctIndex: 1,
    explanation: 'Sholay indigenised the American Western by marrying frontier outlaws and barren landscapes with quintessential Hindi cinema conventions: Jai-Veeru camaraderie, Thakur’s moral drama, and RD Burman musical numbers.',
    hints: [
      'Curry Western adapts cowboy/outlaw conventions into an Indian rural dacoit landscape.',
      'Notice how it blends action, western gunplay, comedy, and songs.',
      'It is a hybrid of Western + Action + Melodramatic Drama + Musical.',
    ],
  },
  {
    id: 'ch_mm_015',
    nodeId: NODE_C12_MASSMEDIA_017,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the landmark Indian film to its dominant primary genre convention: (1) Mughal-e-Azam, (2) Satya, (3) Hera Pheri, (4) Dangal.',
    options: [
      '1-Historical, 2-Crime/Underworld, 3-Comedy, 4-Sports Drama',
      '1-Western, 2-Animation, 3-Musical, 4-Fantasy/Sci-Fi',
      '1-Crime, 2-Historical, 3-Sports Drama, 4-Comedy',
      '1-Animation, 2-Fantasy, 3-Crime, 4-Historical'
    ],
    correctIndex: 0,
    explanation: 'Mughal-e-Azam is a grand Historical epic; Satya is raw Mumbai Crime realism; Hera Pheri is classic situational Comedy; Dangal is biographical Sports Drama.',
    hints: [
      'Mughal-e-Azam depicts Emperor Akbar; Satya explores the Mumbai mafia.',
      'Hera Pheri makes audiences laugh; Dangal shows wrestling championships.',
      '1-Historical, 2-Crime, 3-Comedy, 4-Sports Drama.',
    ],
  },
  {
    id: 'ch_mm_016',
    nodeId: NODE_C12_MASSMEDIA_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What made the production financing of Shyam Benegal’s "Manthan" (1976) a historic manifestation of democratic social change?',
    options: [
      'It received a multi-crore private grant from Hollywood studios.',
      'It was crowd-funded by 500,000 Gujarat dairy farmers contributing ₹2 each, directly mirroring the cooperative empowerment dramatized on screen.',
      'It was financed entirely through commercial corporate beverage advertising.',
      'It avoided taking any funds from farmers to preserve pure studio detachment.'
    ],
    correctIndex: 1,
    explanation: 'Manthan was funded by 500,000 milk farmers of the Gujarat Cooperative Milk Marketing Federation (Amul) contributing ₹2 each. The cooperative financing model mirrored the film’s narrative of collective rural liberation.',
    hints: [
      'Think of Dr. Verghese Kurien and the Amul milk cooperative movement.',
      'Half a million farmers became collective producers of a National Award winning film.',
      '500,000 farmers contributed ₹2 each — the world\'s first massive cooperative crowd-funded feature.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_mm_017',
    nodeId: NODE_C12_MASSMEDIA_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the core ideological and aesthetic divergence between Parallel Cinema (Indian New Wave) and mainstream 1970s Bollywood cinema.',
    options: [
      'Parallel Cinema used higher budgets, elaborate dance troupes, and escapist superhero tropes.',
      'Mainstream Bollywood used non-professional actors; Parallel Cinema relied strictly on multi-million dollar superstar contracts.',
      'Parallel Cinema prioritized social realism, caste/class critique, location shooting, and FFC/NFDC or cooperative funding over escapist spectacle and star formulas.',
      'Parallel Cinema refused to depict rural poverty, focusing exclusively on lavish royal fantasies.'
    ],
    correctIndex: 2,
    explanation: 'Parallel Cinema (Benegal, Sen, Kaul, Nihalani) emerged as an alternative to commercial escapism, tackling feudal exploitation, caste hierarchy, and systemic injustice using realistic aesthetics and modest institutional financing.',
    hints: [
      'Consider films like Ankur, Aakrosh, and Manthan vs Sholay and Don.',
      'Parallel cinema examined lived rural/urban realities rather than escapist songs.',
      'It prioritized realism, socio-economic critique, and non-studio independence.',
    ],
  },
  {
    id: 'ch_mm_018',
    nodeId: NODE_C12_MASSMEDIA_019,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each core characteristic of Social Media to its proper definition.',
    dragItems: [
      { label: 'User-Generated Content', targetId: 'slot_ugc' },
      { label: 'Interactivity', targetId: 'slot_interactivity' },
      { label: 'Networked Communication', targetId: 'slot_network' },
      { label: 'Digital Platforms', targetId: 'slot_platform' },
    ],
    correctMapping: {
      slot_ugc: 'User-Generated Content',
      slot_interactivity: 'Interactivity',
      slot_network: 'Networked Communication',
      slot_platform: 'Digital Platforms',
    },
    explanation: 'The 4 pillars: User-Generated (ordinary users create), Interactivity (likes/replies), Networked (many-to-many flows), Digital Platforms (internet software architectures).',
    hints: [
      'Ordinary citizens creating posts is User-Generated Content.',
      'Many-to-many message flow across profiles is Networked Communication.',
      'Mapping: UGC -> User creations, Interactivity -> Feedback loops, Networked -> Many-to-many, Platforms -> Software base.',
    ],
  },
  {
    id: 'ch_mm_019',
    nodeId: NODE_C12_MASSMEDIA_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 in India, what is a mandatory obligation for significant social media intermediaries?',
    options: [
      'Banning all user-generated political commentary unconditionally.',
      'Appointing a Chief Compliance Officer, Nodal Contact Person, and Resident Grievance Officer in India with 24-36 hr takedown mechanisms.',
      'Charging every Indian citizen an upfront monthly subscription fee.',
      'Replacing human users with centralized government news bots.'
    ],
    correctIndex: 1,
    explanation: 'The IT Rules 2021 mandate significant social media intermediaries to maintain resident officers in India, provide time-bound grievance redressal, and remove unlawful content within specified timelines.',
    hints: [
      'Think of regulatory accountability for platforms like Meta, X, and Google in India.',
      'Intermediaries must appoint India-based grievance and compliance officers.',
      'Resident Grievance Officer and compliance protocols under IT Rules 2021.',
    ],
  },
  {
    id: 'ch_mm_020',
    nodeId: NODE_C12_MASSMEDIA_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is LinkedIn classified as a Social Networking platform, whereas WordPress is classified as a Blogging platform?',
    options: [
      'LinkedIn has no users; WordPress is strictly an offline radio editing software.',
      'LinkedIn is centered on user profile identity and relational network graphs; WordPress is organized around long-form authored articles published in reverse chronological order.',
      'WordPress requires satellite dish antennas; LinkedIn operates only via SMS text messaging.',
      'LinkedIn only permits uploading 5-second videos with no text.'
    ],
    correctIndex: 1,
    explanation: 'Social networking platforms (Facebook, LinkedIn) centre on user identity profiles and connection graphs. Blogging platforms (WordPress, Medium) centre on authored, long-form editorial essays.',
    hints: [
      'Think about the primary unit: a personal/professional profile vs a written article.',
      'LinkedIn builds career networks; WordPress hosts text essays and web articles.',
      'Profile-and-network graph vs Authored long-form article structure.',
    ],
  },
  {
    id: 'ch_mm_021',
    nodeId: NODE_C12_MASSMEDIA_020,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Match each Indian communication goal to the most optimal social media platform type: (1) Artisan textile visual catalog, (2) Physics Wallah exam lectures, (3) TCS campus talent recruitment, (4) In-depth investigative journalism analysis.',
    options: [
      '1-Photo Sharing (Instagram), 2-Video Sharing (YouTube), 3-Social Networking (LinkedIn), 4-Blogging (Medium/WordPress)',
      '1-Video Sharing, 2-Blogging, 3-Photo Sharing, 4-Social Networking',
      '1-Blogging, 2-Photo Sharing, 3-Video Sharing, 4-Social Networking',
      '1-Social Networking, 2-Photo Sharing, 3-Blogging, 4-Video Sharing'
    ],
    correctIndex: 0,
    explanation: 'Instagram drives visual craft discovery; YouTube provides long-form audiovisual education; LinkedIn manages professional recruitment; Blogging delivers deep textual analysis.',
    hints: [
      'Textiles need high-resolution images; physics derivations need video lectures.',
      'Corporate hiring lives on professional networks; investigative essays thrive on blogs.',
      '1-Photo, 2-Video, 3-Professional Network, 4-Blogging.',
    ],
  },
  {
    id: 'ch_mm_022',
    nodeId: NODE_C12_MASSMEDIA_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are directing a live telecast of the Republic Day Parade on Kartavya Path for Doordarshan. Which dynamic shot sequence best transitions from grand national spectacle to intimate soldier solemnity?',
    options: [
      'Endless shaky handheld zooms only.',
      'Opening with a sweeping Crane shot descending over India Gate, transitioning to a steady tracking Pan of marching regiments, culminating in a low-angle Close-Up of the Param Vir Chakra recipient saluting.',
      'A static Extreme Close-Up of asphalt for 10 minutes followed by an unmotivated Dutch tilt.',
      'A continuous 360-degree rapid spin with no focus on parade contingents.'
    ],
    correctIndex: 1,
    explanation: 'A crane shot captures state grandeur; a pan tracks rhythmic military marching; a low-angle close-up honors individual heroism and dignified sacrifice.',
    hints: [
      'Start with macro scale, move to marching action, finish with the human hero.',
      'Crane establishes scale; Pan follows columns; Close-up reveals pride and emotion.',
      'Crane over avenue -> Tracking Pan along regiments -> Low-angle CU on the soldier.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MASSMEDIA_011,
  title: 'ISC Class 12 Mass Media & Communication Masterclass',
  definition: 'Comprehensive mastery of camera shot grammar, studio audio engineering, radio jockeying, cinema history, genre theory, parallel social cinema, and digital social media architectures.',
  eli5: 'Learn how directors compose iconic camera shots, how sound engineers broadcast crystal-clear radio shows, how Indian cinema sparked social revolutions, and how social networks connect billions.',
  misconceptions: [
    {
      misconception: 'A "Long Shot" refers to a take that lasts a long duration of time.',
      correction: 'Long Shot refers strictly to physical DISTANCE between camera and subject (full human figure visible), not temporal duration.'
    },
    {
      misconception: 'Bird\'s Eye View and Aerial Shots are identical terms.',
      correction: 'A Bird\'s Eye View is a static, directly overhead downward angle; an Aerial Shot is captured from an airborne moving platform (drone/helicopter).'
    },
    {
      misconception: 'Dolly-In and Zoom-In are identical because both enlarge the subject.',
      correction: 'Zoom magnifies 2D image optically with fixed perspective; Dolly physically travels through space creating dynamic 3D parallax.'
    },
    {
      misconception: 'John Grierson directed "Nanook of the North".',
      correction: 'Robert Flaherty directed "Nanook of the North" (1922); Grierson was the theorist who coined the term "documentary" in 1926.'
    },
    {
      misconception: 'Shyam Benegal\'s "Manthan" was funded by a commercial Hollywood studio.',
      correction: 'Manthan was crowd-funded by 500,000 Gujarat dairy farmers contributing ₹2 each through the Amul cooperative.'
    },
  ],
  diagnosticQuestions: [
    { question: 'Which shot size isolates raw facial emotion?', options: ['Extreme Long Shot', 'Close-Up', 'Medium Shot', 'Dutch Angle'], correctIndex: 1 },
    { question: 'What movement rotates the camera horizontally on a fixed tripod?', options: ['Tilt', 'Pan', 'Dolly', 'Crane'], correctIndex: 1 },
    { question: 'What voice should radio scripts predominantly use?', options: ['Passive voice', 'Active voice', 'Subjunctive voice', 'Bureaucratic voice'], correctIndex: 1 },
    { question: 'Which mic is rugged and ideal for outdoor news reporting?', options: ['Ribbon mic', 'Dynamic mic', 'Large Condenser mic', 'Laser mic'], correctIndex: 1 },
    { question: 'Who hosted the famous "Binaca Geet Mala"?', options: ['Ameen Sayani', 'Melville de Mellow', 'Satyajit Ray', 'Dadasaheb Phalke'], correctIndex: 0 },
    { question: 'What was India\'s first full-length feature film in 1913?', options: ['Alam Ara', 'Raja Harishchandra', 'Pather Panchali', 'Mother India'], correctIndex: 1 },
    { question: 'Which film pioneered Indian cooperative crowd-funding?', options: ['Sholay', 'Manthan', 'Dangal', 'Baahubali'], correctIndex: 1 },
    { question: 'Which platform type is WordPress categorized under?', options: ['Social Networking', 'Blogging', 'Photo Sharing', 'Video Sharing'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master camera framing, audio studio signal flow, film genre theory, parallel cinema analysis, and digital platform dynamics with 80%+ accuracy.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Camera Grammar Lab: Shot Size & Elevation',
    instruction: 'Adjust the Focal Distance and Camera Elevation sliders to see how framing changes character psychology in real-time.',
    interactionType: 'camera-framing',
    nodeId: NODE_C12_MASSMEDIA_011,
  },
  {
    title: 'Camera Movement: Parallax & Trajectory',
    instruction: 'Trigger Pan, Tilt, Dolly, and Crane controls to observe how foreground and background shift in physical 3D parallax.',
    interactionType: 'camera-movement',
    nodeId: NODE_C12_MASSMEDIA_012,
  },
  {
    title: 'Radio Control Room: Audio Signal & Mixing Chain',
    instruction: 'Fiddle with Mic Gain, Music Bed, and Compressor faders to achieve broadcast balance without clipping.',
    interactionType: 'radio-mixing',
    nodeId: NODE_C12_MASSMEDIA_014,
  },
  {
    title: 'Cinema Evolution & Parallel Social Cinema',
    instruction: 'Interact with the 1895-2025 cinema timeline and explore Manthan\'s ₹2 cooperative funding model.',
    interactionType: 'cinema-history',
    nodeId: NODE_C12_MASSMEDIA_018,
  },
  {
    title: 'Digital Social Media Ecosystem & Network Flows',
    instruction: 'Simulate viral information diffusion across Social Networks, Blogs, Photo Feeds, and Video Channels.',
    interactionType: 'social-network',
    nodeId: NODE_C12_MASSMEDIA_020,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you switch from an optical Zoom-In to a physical Dolly-In towards an actor, what happens to the background trees?',
    options: [
      'The trees simply enlarge uniformly without changing perspective relative to the actor.',
      'The trees shift dramatically in parallax, appearing to spread out and reveal deeper 3D perspective.',
      'The trees completely vanish from the sensor.',
      'The trees turn black and white.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test the Dolly vs Zoom toggle in the Camera Lab below to verify parallax depth shift!',
    nodeId: NODE_C12_MASSMEDIA_012,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the actor’s perceived emotional dominance when you shift elevation from Bird\'s Eye View to Worm-Eye View?',
    observableOptions: [
      'The subject transforms from small, vulnerable, and flattened to towering, authoritative, and heroic.',
      'The subject disappears entirely from view.',
      'No psychological change occurs; all angles look identical.',
      'The subject appears inverted upside down.'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MASSMEDIA_011,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Media Commission: Direct & Broadcast Your Campaign',
  description: 'Design a 360-degree mass media package for an Indian environmental initiative (e.g., "Clean Yamuna Project"). Script a 30-second radio spot with sound cues, storyboard a 3-shot film sequence with specific camera angles/movements, and outline a multi-platform social media strategy.',
  steps: [
    'Storyboard 3 Shots: (1) Aerial drone ELS of Yamuna riverbank, (2) Tracking Dolly MS of volunteers planting saplings, (3) Worm-eye CU of clean water flowing into a seedling.',
    'Write a 30-sec Radio Script: Include ambient river SFX, active conversational dialogue ("Meet Ramesh..."), and ducked sitar music.',
    'Social Media Architecture: Instagram photo carousel of before/after banks, YouTube short documentary, LinkedIn corporate volunteer drive, and WordPress in-depth policy article.',
    'Submit your creative production deck to your instructor for board review.'
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
export default function C12_MassMediaCameraAnglesCloseupSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_MASSMEDIA_011,
  title = DEFAULT_PROPS.title || 'ISC Class 12 Mass Media & Communication Masterclass',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['massmedia'] || { name: 'Mass Media & Communication', emoji: '🎬', color: 'rose' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Multi-representation tab view state (Viewfinder vs Field of View Cone vs Matrix)
  const [viewMode, setViewMode] = useState<'viewfinder' | 'geometry' | 'matrix'>('viewfinder');

  // Interactive Lab State: 1. Camera Framing & Movement
  const [cameraDistance, setCameraDistance] = useState<number>(50); // 0 (Close-Up) to 100 (Extreme Long Shot)
  const [cameraElevation, setCameraElevation] = useState<number>(0); // -45 (Worm) to +45 (Bird's Eye)
  const [cameraPanAngle, setCameraPanAngle] = useState<number>(0); // -60 to +60
  const [isDollyActive, setIsDollyActive] = useState<boolean>(true); // Dolly vs Zoom
  const [selectedShotType, setSelectedShotType] = useState<string>('Medium Shot');

  // Interactive Lab State: 2. Radio Studio Mixer
  const [micGain, setMicGain] = useState<number>(65); // 0-100
  const [musicBedVolume, setMusicBedVolume] = useState<number>(30); // 0-100
  const [isDuckingEnabled, setIsDuckingEnabled] = useState<boolean>(true);
  const [micPolarPattern, setMicPolarPattern] = useState<'cardioid' | 'omnidirectional' | 'bidirectional'>('cardioid');
  const [isLiveOnAir, setIsLiveOnAir] = useState<boolean>(false);

  // Interactive Lab State: 3. Cinema History & Social Change
  const [activeCinemaEra, setActiveCinemaEra] = useState<number>(1976);
  const [manthanFarmerContributions, setManthanFarmerContributions] = useState<number>(500000);

  // Interactive Lab State: 4. Social Media Network Simulator
  const [platformTypeFilter, setPlatformTypeFilter] = useState<'all' | 'networking' | 'blogging' | 'photo' | 'video'>('all');

  // Reflection responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Challenge Feedback & Interaction State
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs for timers & canvases
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cameraCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioWaveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive difficulty update on score changes
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Camera Canvas Rendering Effect (2D RequestAnimationFrame)
  useEffect(() => {
    const canvas = cameraCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rule of Thirds Grid
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 3, 0);
      ctx.lineTo(canvas.width / 3, canvas.height);
      ctx.moveTo((canvas.width * 2) / 3, 0);
      ctx.lineTo((canvas.width * 2) / 3, canvas.height);
      ctx.moveTo(0, canvas.height / 3);
      ctx.lineTo(canvas.width, canvas.height / 3);
      ctx.moveTo(0, (canvas.height * 2) / 3);
      ctx.lineTo(canvas.width, (canvas.height * 2) / 3);
      ctx.stroke();

      const centerX = canvas.width / 2 + Math.sin(cameraPanAngle * (Math.PI / 180)) * 60;
      const centerY = canvas.height / 2 + Math.sin(cameraElevation * (Math.PI / 180)) * 50;
      const scaleFactor = Math.max(0.2, 2.2 - (cameraDistance / 100) * 1.8);

      const bgShift = Math.sin(cameraPanAngle * (Math.PI / 180)) * (isDollyActive ? 20 : 5);
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(0, 180);
      ctx.lineTo(100 + bgShift, 110);
      ctx.lineTo(220 + bgShift, 160);
      ctx.lineTo(320 + bgShift, 90);
      ctx.lineTo(440, 180);
      ctx.closePath();
      ctx.fill();

      // Foreground Subject (Human Figure / Actor)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scaleFactor, scaleFactor);

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(-22, 10, 44, 65, 8);
      ctx.fill();

      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(0, -15, 20, 0, Math.PI * 2);
      ctx.fill();

      if (scaleFactor > 1.2) {
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(-7, -18, 3, 0, Math.PI * 2);
        ctx.arc(7, -18, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(8, -12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -8, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();
      }

      ctx.restore();

      // Viewfinder Overlay & HUD Info
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 10, canvas.height / 2);
      ctx.lineTo(canvas.width / 2 + 10, canvas.height / 2);
      ctx.moveTo(canvas.width / 2, canvas.height / 2 - 10);
      ctx.lineTo(canvas.width / 2, canvas.height / 2 + 10);
      ctx.stroke();

      ctx.fillStyle = frame % 40 < 20 ? '#ef4444' : 'transparent';
      ctx.beginPath();
      ctx.arc(25, 25, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('REC [4K 24FPS] ISC CAM 1', 38, 28);
      ctx.fillText(`DIST: ${cameraDistance}% | ELEV: ${cameraElevation}° | PAN: ${cameraPanAngle}°`, 20, canvas.height - 15);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [cameraDistance, cameraElevation, cameraPanAngle, isDollyActive]);

  // Audio Waveform Canvas Rendering Effect
  useEffect(() => {
    const canvas = audioWaveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const renderAudio = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const duckingFactor = isDuckingEnabled ? Math.max(0.15, 1 - (micGain / 100) * 0.8) : 1;
      const effectiveMusic = (musicBedVolume / 100) * duckingFactor * 25;
      const effectiveVoice = (micGain / 100) * 35;

      // Voice Waveform (Cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.08 + time * 3) * effectiveVoice * Math.sin(x * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Ducked Music Waveform (Amber)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.cos(x * 0.04 + time) * effectiveMusic;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const peakHeight = Math.min(canvas.height, (effectiveVoice + effectiveMusic) * 2);
      ctx.fillStyle = peakHeight > 68 ? '#ef4444' : peakHeight > 50 ? '#f59e0b' : '#22c55e';
      ctx.fillRect(canvas.width - 15, canvas.height - peakHeight, 10, peakHeight);

      animId = requestAnimationFrame(renderAudio);
    };

    renderAudio();
    return () => cancelAnimationFrame(animId);
  }, [micGain, musicBedVolume, isDuckingEnabled]);

  // Derived Shot Size Label computation
  useEffect(() => {
    if (cameraDistance < 20) setSelectedShotType('Extreme Close-Up (ECU)');
    else if (cameraDistance < 38) setSelectedShotType('Close-Up (CU)');
    else if (cameraDistance < 60) setSelectedShotType('Medium Shot (MS)');
    else if (cameraDistance < 82) setSelectedShotType('Long Shot (LS)');
    else setSelectedShotType('Extreme Long Shot (ELS)');
  }, [cameraDistance]);

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
    }
  }, [hintCount, activeChallenge]);

  // Inactivity Auto-hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding cinematic intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Media Interactive Studio. Manipulate each visual parameter to discover the craft.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Direct the camera and balance the audio console without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing official ISC board media challenges. Apply your visual and acoustic mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify it now in the simulation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate visual observation!' : 'Look closely at the subject framing on the monitor.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have achieved ISC Mass Media Director certification.');
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

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Precisely correct! Excellent media knowledge.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, 'proficient');
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
        speechManager.speak('Let us review the media principle together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
      const initial = prev.length === 0 ? (activeChallenge.sortItems?.map((_, i) => i) || []) : [...prev];
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [activeChallenge]);

  const handleCameraSliderChange = useCallback((distance: number, elevation: number, pan: number) => {
    setCameraDistance(distance);
    setCameraElevation(elevation);
    setCameraPanAngle(pan);
    audioManager.play('count');
  }, []);

  const handleAudioFaderChange = useCallback((mic: number, music: number) => {
    setMicGain(mic);
    setMusicBedVolume(music);
    audioManager.play('balance');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── HEADER / NAV BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">ISC Class 12 Mass Media & Communication</span>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status Badges & Phase Indicator */}
        <div className="flex items-center gap-2 md:gap-3">
          <motion.span 
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
              'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}
          >
            {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            Mastery: <strong className="text-indigo-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery_phase"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-rose-950/40 rounded-2xl border border-indigo-800/40 shadow-xl">
              <div className="inline-block px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-md uppercase tracking-wider mb-3">
                Director\'s Creative Hook
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-indigo-300 text-xs mt-2 font-mono">Context: {SCENARIO.context}</p>
            </div>

            {/* Interactive Hook Puzzle */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-base md:text-lg font-semibold text-rose-200">
                  Pre-Check Discovery: {DISCOVERY_QUESTION.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015, x: 2 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-md bg-slate-700 text-center font-mono text-xs leading-6 mr-2">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-800/80 rounded-xl border border-indigo-600/40 flex flex-wrap items-center justify-between gap-4 mt-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Worm-Eye view magnifies scale and hero authority.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 text-sm flex items-center gap-2"
                  >
                    Enter Interactive Media Lab →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Navigation Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
              <div className="flex gap-2">
                {EXPLORATION_STEPS.map((st, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentSlide(i);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentSlide === i ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    Lab {i + 1}
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            </div>

            {/* Active Exploration Interactive Container */}
            <div className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* STEP 0: CAMERA FRAMING & SHOT SIZE LAB + MULTI-REPRESENTATION */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* MULTI-REPRESENTATION SWITCHER */}
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono pl-2">Representation Mode:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode('viewfinder')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          viewMode === 'viewfinder' ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        1. 4K Camera Viewfinder
                      </button>
                      <button
                        onClick={() => setViewMode('geometry')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          viewMode === 'geometry' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        2. Field-of-View Geometry (SVG)
                      </button>
                      <button
                        onClick={() => setViewMode('matrix')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          viewMode === 'matrix' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        3. Shot Psychology Matrix
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Visual Container based on representation mode */}
                    <div className="lg:col-span-7 bg-black rounded-2xl overflow-hidden border border-slate-800 p-2 relative shadow-2xl min-h-[270px] flex items-center justify-center">
                      {viewMode === 'viewfinder' && (
                        <div className="w-full relative">
                          <canvas ref={cameraCanvasRef} width={440} height={260} className="w-full h-auto rounded-xl block" />
                          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg border border-slate-700 text-xs font-bold text-rose-400">
                            {selectedShotType}
                          </div>
                        </div>
                      )}

                      {/* SVG TOPIC DIAGRAM 1: FIELD OF VIEW GEOMETRY CONE */}
                      {viewMode === 'geometry' && (
                        <div className="w-full p-2">
                          <svg viewBox="0 0 440 240" className="w-full h-auto" aria-label="Camera Field of View and Framing Geometry Diagram">
                            <defs>
                              <linearGradient id="fovConeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
                              </linearGradient>
                            </defs>
                            <rect width="440" height="240" fill="#020617" rx="8" />
                            
                            {/* Tripod & Camera Icon */}
                            <path d="M 40 120 L 70 95 L 70 145 Z" fill="#e11d48" />
                            <rect x="20" y="105" width="22" height="30" rx="4" fill="#94a3b8" />
                            <circle cx="31" cy="95" r="8" fill="#cbd5e1" />
                            <line x1="31" y1="135" x2="15" y2="185" stroke="#64748b" strokeWidth="3" />
                            <line x1="31" y1="135" x2="47" y2="185" stroke="#64748b" strokeWidth="3" />
                            
                            {/* Dynamic FOV Light Cone */}
                            {(() => {
                              const spread = 20 + (cameraDistance / 100) * 80;
                              const targetX = 100 + (cameraDistance / 100) * 280;
                              return (
                                <g>
                                  <polygon points={`70,120 ${targetX},${120 - spread} ${targetX},${120 + spread}`} fill="url(#fovConeGrad)" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 2" />
                                  <line x1="70" y1="120" x2={targetX} y2="120" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
                                  
                                  {/* Subject Figure */}
                                  <circle cx={targetX} cy={120 - 25} r="10" fill="#fde047" />
                                  <rect x={targetX - 7} y={120 - 15} width="14" height="40" rx="3" fill="#38bdf8" />
                                  
                                  {/* Distance measurement line */}
                                  <line x1="70" y1="210" x2={targetX} y2="210" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
                                  <text x={(70 + targetX) / 2} y="200" fill="#c084fc" fontSize="11" textAnchor="middle" fontFamily="monospace">
                                    Focal Distance: {cameraDistance}%
                                  </text>
                                </g>
                              );
                            })()}

                            {/* Framing zones markers */}
                            <text x="130" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">ECU / CU</text>
                            <text x="230" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">MS / MLS</text>
                            <text x="350" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">LS / ELS</text>
                            <line x1="150" y1="40" x2="150" y2="180" stroke="#334155" strokeDasharray="2 2" />
                            <line x1="260" y1="40" x2="260" y2="180" stroke="#334155" strokeDasharray="2 2" />
                          </svg>
                        </div>
                      )}

                      {/* MATRIX REPRESENTATION */}
                      {viewMode === 'matrix' && (
                        <div className="w-full p-4 overflow-x-auto">
                          <table className="w-full text-left text-xs font-mono">
                            <thead>
                              <tr className="border-b border-slate-700 text-rose-400">
                                <th className="p-2">Shot Size</th>
                                <th className="p-2">Framing Extent</th>
                                <th className="p-2">Psychological Impact</th>
                                <th className="p-2">Classic Example</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-slate-300">
                              <tr className={cameraDistance < 20 ? 'bg-rose-950/40 text-rose-200' : ''}>
                                <td className="p-2 font-bold">ECU</td>
                                <td className="p-2">Part of face / eyes</td>
                                <td className="p-2">Extreme intimacy, tension</td>
                                <td className="p-2">Sholay eyeball twitch</td>
                              </tr>
                              <tr className={cameraDistance >= 20 && cameraDistance < 38 ? 'bg-rose-950/40 text-rose-200' : ''}>
                                <td className="p-2 font-bold">CU</td>
                                <td className="p-2">Head and shoulders</td>
                                <td className="p-2">Raw emotion, empathy</td>
                                <td className="p-2">Pather Panchali tear</td>
                              </tr>
                              <tr className={cameraDistance >= 38 && cameraDistance < 60 ? 'bg-rose-950/40 text-rose-200' : ''}>
                                <td className="p-2 font-bold">MS</td>
                                <td className="p-2">Waist to head</td>
                                <td className="p-2">Relatable conversation</td>
                                <td className="p-2">TV News panel debate</td>
                              </tr>
                              <tr className={cameraDistance >= 60 && cameraDistance < 82 ? 'bg-rose-950/40 text-rose-200' : ''}>
                                <td className="p-2 font-bold">LS</td>
                                <td className="p-2">Full human figure</td>
                                <td className="p-2">Action in physical space</td>
                                <td className="p-2">Dangal wrestling ring</td>
                              </tr>
                              <tr className={cameraDistance >= 82 ? 'bg-rose-950/40 text-rose-200' : ''}>
                                <td className="p-2 font-bold">ELS</td>
                                <td className="p-2">Vast landscape/horizon</td>
                                <td className="p-2">Awe, isolation, scale</td>
                                <td className="p-2">Ramanagara ravines</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5 space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Focal Distance (Shot Size)</span>
                          <span className="font-mono text-rose-400">{cameraDistance}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={cameraDistance}
                          onChange={e => handleCameraSliderChange(Number(e.target.value), cameraElevation, cameraPanAngle)}
                          className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                          aria-label="Set camera focal distance"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>Close-Up (CU)</span>
                          <span>Mid (MS)</span>
                          <span>Extreme Long (ELS)</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Vertical Elevation Angle</span>
                          <span className="font-mono text-rose-400">{cameraElevation}°</span>
                        </div>
                        <input
                          type="range"
                          min={-45}
                          max={45}
                          value={cameraElevation}
                          onChange={e => handleCameraSliderChange(cameraDistance, Number(e.target.value), cameraPanAngle)}
                          className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                          aria-label="Set camera vertical elevation angle"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>Worm-Eye (-45°)</span>
                          <span>Eye-Level (0°)</span>
                          <span>Bird\'s Eye (+45°)</span>
                        </div>
                      </div>

                      {/* Quick Preset Buttons */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleCameraSliderChange(15, 0, 0)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200"
                        >
                          Apu\'s Tear (CU)
                        </button>
                        <button
                          onClick={() => handleCameraSliderChange(50, 0, 0)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200"
                        >
                          NDTV News Panel (MS)
                        </button>
                        <button
                          onClick={() => handleCameraSliderChange(95, -35, 0)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200"
                        >
                          Baahubali Shiva Statue (Worm ELS)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: CAMERA MOVEMENT & PARALLAX LAB */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict Then Check Pattern */}
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-indigo-950/50 border border-indigo-700 rounded-xl space-y-3"
                    >
                      <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Predict-Then-Check:</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/40 border border-amber-600/40 rounded-xl flex justify-between items-center text-xs text-amber-300">
                      <span>👉 {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <button
                        onClick={() => {
                          setPredictionVerified(true);
                          audioManager.play('success');
                        }}
                        className="px-3 py-1 bg-amber-600 text-white rounded font-bold"
                      >
                        Verify Parallax Result
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 bg-black rounded-2xl overflow-hidden border border-slate-800 p-2 relative">
                      <canvas ref={cameraCanvasRef} width={440} height={240} className="w-full h-auto rounded-xl block" />
                    </div>

                    <div className="lg:col-span-5 space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Horizontal Pan Swivel</span>
                          <span className="font-mono text-rose-400">{cameraPanAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min={-60}
                          max={60}
                          value={cameraPanAngle}
                          onChange={e => handleCameraSliderChange(cameraDistance, cameraElevation, Number(e.target.value))}
                          className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                          aria-label="Set camera horizontal pan swivel"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-300 font-medium">Transit Mode:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setIsDollyActive(true);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 rounded text-xs font-bold ${isDollyActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                          >
                            Dolly (3D Parallax)
                          </button>
                          <button
                            onClick={() => {
                              setIsDollyActive(false);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 rounded text-xs font-bold ${!isDollyActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                          >
                            Zoom (Flat 2D)
                          </button>
                        </div>
                      </div>

                      {/* Observation Question */}
                      {predictionVerified && !observationAnswered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-3 bg-slate-900 border border-slate-700 rounded-lg space-y-2"
                        >
                          <p className="text-xs font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => handleObservation(oi)}
                              className="block w-full text-left p-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300"
                            >
                              {opt}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: RADIO STUDIO & AUDIO CHAIN LAB + SVG DIAGRAM 2 */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG TOPIC DIAGRAM 2: BROADCAST AUDIO SIGNAL FLOW ARCHITECTURE */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase mb-1 block">
                      Broadcast Audio Signal Flow Architecture (Acoustic to RF Wave)
                    </span>
                    <svg viewBox="0 0 760 110" className="w-full h-auto" aria-label="Broadcast Studio Signal Flow Architecture Diagram">
                      <rect width="760" height="110" fill="#030712" rx="6" />
                      
                      {/* Node 1: Presenter Mic */}
                      <g transform="translate(15, 20)">
                        <rect width="105" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="52" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Presenter</text>
                        <text x="52" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">Condenser Mic</text>
                        <text x="52" y="60" fill="#64748b" fontSize="8" textAnchor="middle">Acoustic → mV</text>
                      </g>
                      <path d="M 125 55 L 145 55" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowAudio)" />

                      {/* Node 2: Pre-Amplifier */}
                      <g transform="translate(150, 20)">
                        <rect width="100" height="70" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="50" y="30" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. Pre-Amp</text>
                        <text x="50" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">+48V Phantom</text>
                        <text x="50" y="60" fill="#64748b" fontSize="8" textAnchor="middle">Mic → Line Level</text>
                      </g>
                      <path d="M 255 55 L 275 55" stroke="#818cf8" strokeWidth="2" />

                      {/* Node 3: Mixing Console */}
                      <g transform="translate(280, 20)">
                        <rect width="115" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="57" y="30" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">3. Studio Mixer</text>
                        <text x="57" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">Auto-Ducking Bed</text>
                        <text x="57" y="60" fill="#64748b" fontSize="8" textAnchor="middle">Level Balancing</text>
                      </g>
                      <path d="M 400 55 L 420 55" stroke="#f59e0b" strokeWidth="2" />

                      {/* Node 4: DAW / DSP Processor */}
                      <g transform="translate(425, 20)">
                        <rect width="105" height="70" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
                        <text x="52" y="30" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">4. DAW & DSP</text>
                        <text x="52" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">Compressor / EQ</text>
                        <text x="52" y="60" fill="#64748b" fontSize="8" textAnchor="middle">Limiter (0 dBFS)</text>
                      </g>
                      <path d="M 535 55 L 555 55" stroke="#34d399" strokeWidth="2" />

                      {/* Node 5: Transmitter & Modulator */}
                      <g transform="translate(560, 20)">
                        <rect width="95" height="70" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                        <text x="47" y="30" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">5. FM Mod</text>
                        <text x="47" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">VHF Carrier</text>
                        <text x="47" y="60" fill="#64748b" fontSize="8" textAnchor="middle">88-108 MHz</text>
                      </g>
                      <path d="M 660 55 L 675 55" stroke="#f43f5e" strokeWidth="2" />

                      {/* Node 6: Radiating Tower */}
                      <g transform="translate(680, 20)">
                        <rect width="65" height="70" rx="6" fill="#1e293b" stroke="#e11d48" strokeWidth="1.5" />
                        <text x="32" y="30" fill="#e11d48" fontSize="11" fontWeight="bold" textAnchor="middle">6. Mast</text>
                        <text x="32" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">Tower</text>
                        <text x="32" y="60" fill="#64748b" fontSize="8" textAnchor="middle">Airwaves</text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${isLiveOnAir ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`} />
                          <span className="text-xs font-mono text-slate-300 font-bold">AKASHVANI / AIR DIGITAL CONSOLE</span>
                        </div>
                        <span className="text-xs text-indigo-400 font-mono">DAW: DALET / PRO TOOLS</span>
                      </div>

                      <canvas ref={audioWaveformCanvasRef} width={400} height={140} className="w-full h-auto rounded-lg block border border-slate-900" />

                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>■ Cyan: Presenter Voice</span>
                        <span>■ Amber: Music Bed (Ducked)</span>
                        <span>■ Peak Limiter: 0 dB</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Mic 1 Gain (Presenter Fader)</span>
                          <span className="font-mono text-cyan-400">{micGain}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={micGain}
                          onChange={e => handleAudioFaderChange(Number(e.target.value), musicBedVolume)}
                          className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                          aria-label="Set mic gain fader"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Music Bed Fader (Soundtrack)</span>
                          <span className="font-mono text-amber-400">{musicBedVolume}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={musicBedVolume}
                          onChange={e => handleAudioFaderChange(micGain, Number(e.target.value))}
                          className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                          aria-label="Set music bed volume fader"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-300">Auto-Ducking (Compressor):</span>
                        <button
                          onClick={() => {
                            setIsDuckingEnabled(!isDuckingEnabled);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${isDuckingEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                        >
                          {isDuckingEnabled ? 'ENABLED (-18dB)' : 'OFF'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-300">Polar Pickup:</span>
                        <div className="flex gap-1">
                          {(['cardioid', 'omnidirectional', 'bidirectional'] as const).map(pattern => (
                            <button
                              key={pattern}
                              onClick={() => {
                                setMicPolarPattern(pattern);
                                audioManager.play('tap');
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-mono capitalize ${
                                micPolarPattern === pattern ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {pattern.slice(0, 6)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CINEMA HISTORY & SOCIAL CHANGE LAB */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { year: 1895, title: 'Lumière Brothers', detail: 'Cinématographe (Grand Café, Paris)' },
                      { year: 1913, title: 'Dadasaheb Phalke', detail: 'Raja Harishchandra (Coronation Cinema)' },
                      { year: 1922, title: 'Robert Flaherty', detail: 'Nanook of the North (Father of Doc)' },
                      { year: 1976, title: 'Shyam Benegal', detail: 'Manthan (500,000 Dairy Farmers)' },
                    ].map(era => (
                      <button
                        key={era.year}
                        onClick={() => {
                          setActiveCinemaEra(era.year);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeCinemaEra === era.year
                            ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold text-rose-400 block">{era.year}</span>
                        <span className="text-xs font-bold block mt-1 text-slate-200">{era.title}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{era.detail}</span>
                      </button>
                    ))}
                  </div>

                  {/* Manthan Crowd-Funding Interactive Widget */}
                  {activeCinemaEra === 1976 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-700/60 space-y-3"
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div>
                          <h4 className="text-base font-bold text-white">Shyam Benegal\'s "Manthan" (1976) Cooperative Budget Simulator</h4>
                          <p className="text-xs text-indigo-300">World\'s first feature film financed entirely by 500,000 Gujarat dairy farmers contributing ₹2 each.</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-600/30 border border-emerald-500 text-emerald-300 rounded-lg font-mono text-sm font-bold">
                          Total Budget: ₹{(manthanFarmerContributions * 2).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <input
                        type="range"
                        min={100000}
                        max={1000000}
                        step={50000}
                        value={manthanFarmerContributions}
                        onChange={e => {
                          setManthanFarmerContributions(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set number of farmer contributors"
                      />
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>1 Lakh Farmers (₹2L)</span>
                        <span>500,000 Farmers (₹10 Lakh - Actual 1976 Budget)</span>
                        <span>10 Lakh Farmers (₹20L)</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* STEP 4: DIGITAL SOCIAL MEDIA ECOSYSTEM LAB + SVG DIAGRAM 3 */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG TOPIC DIAGRAM 3: SOCIAL MEDIA 4-PILLAR NETWORK DIFFUSION GRAPH */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase mb-1 block">
                      Digital Social Media Network Topology & UGC Flow Architecture
                    </span>
                    <svg viewBox="0 0 760 140" className="w-full h-auto" aria-label="Social Media Network Diffusion Graph Diagram">
                      <rect width="760" height="140" fill="#030712" rx="6" />

                      {/* Central Platform Hub */}
                      <circle cx="380" cy="70" r="32" fill="#4f46e5" fillOpacity="0.2" stroke="#6366f1" strokeWidth="2" />
                      <text x="380" y="68" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Digital</text>
                      <text x="380" y="80" fill="#818cf8" fontSize="8" textAnchor="middle">Platform Core</text>

                      {/* User Node 1 - UGC Creator */}
                      <line x1="160" y1="40" x2="350" y2="65" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="160" cy="40" r="22" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
                      <text x="160" y="38" fill="#f472b6" fontSize="9" fontWeight="bold" textAnchor="middle">Creator</text>
                      <text x="160" y="49" fill="#94a3b8" fontSize="7" textAnchor="middle">UGC Post</text>

                      {/* User Node 2 - Network Influencer */}
                      <line x1="160" y1="100" x2="350" y2="75" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="160" cy="100" r="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="160" y="98" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">Network</text>
                      <text x="160" y="109" fill="#94a3b8" fontSize="7" textAnchor="middle">Peer Graph</text>

                      {/* User Node 3 - Real-time Consumer & Interactivity */}
                      <line x1="600" y1="40" x2="410" y2="65" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="600" cy="40" r="22" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="600" y="38" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Interactive</text>
                      <text x="600" y="49" fill="#94a3b8" fontSize="7" textAnchor="middle">Likes / Shares</text>

                      {/* User Node 4 - Regulatory Intermediary Rules 2021 */}
                      <line x1="600" y1="100" x2="410" y2="75" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="600" cy="100" r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="600" y="98" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">IT Rules 2021</text>
                      <text x="600" y="109" fill="#94a3b8" fontSize="7" textAnchor="middle">Grievance / Redress</text>
                    </svg>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'all' as const, label: 'All 4 Pillars' },
                      { id: 'networking' as const, label: '1. Social Networking (Facebook/LinkedIn)' },
                      { id: 'blogging' as const, label: '2. Blogging (WordPress/Medium)' },
                      { id: 'photo' as const, label: '3. Photo Sharing (Instagram/Pinterest)' },
                      { id: 'video' as const, label: '4. Video Sharing (YouTube)' },
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setPlatformTypeFilter(p.id);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          platformTypeFilter === p.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { title: 'User-Generated Content', desc: 'Ordinary citizen posts review of Dangal', metric: '65% of Total Internet Traffic' },
                      { title: 'Interactivity', desc: 'Real-time likes, live shares & emoji reactions', metric: '< 2 sec Feedback Latency' },
                      { title: 'Networked Communication', desc: 'Many-to-many diffusion across peer graphs', metric: '6 Degrees of Separation' },
                      { title: 'Digital Platforms', desc: 'Regulated under India IT Rules 2021', metric: '36-hr Takedown Protocol' },
                    ].map((card, cidx) => (
                      <div key={cidx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 shadow-md">
                        <span className="w-6 h-6 rounded-md bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs font-bold font-mono">
                          {cidx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{card.title}</h4>
                        <p className="text-xs text-slate-400">{card.desc}</p>
                        <div className="pt-1 text-[11px] font-mono text-rose-400 font-semibold">{card.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  }}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-600/20"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  Enter Studio Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX (FREE PLAY) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox_phase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-md uppercase">
                Studio Free Play (Zero Grading Pressure)
              </div>
              <h3 className="text-xl font-bold text-white">Full Media Director Console</h3>
              <p className="text-sm text-slate-400">
                Direct camera angles on the live 4K monitor and mix audio levels simultaneously. Experiment with framing rules before challenges begin.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Sandbox: Camera */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Cinematic Camera Rig</h4>
                <div className="bg-black rounded-xl overflow-hidden border border-slate-800">
                  <canvas ref={cameraCanvasRef} width={400} height={200} className="w-full h-auto block" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Distance (Shot Size): {selectedShotType}</span>
                    <span className="font-mono text-rose-400">{cameraDistance}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={cameraDistance}
                    onChange={e => handleCameraSliderChange(Number(e.target.value), cameraElevation, cameraPanAngle)}
                    className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    aria-label="Set camera distance in sandbox"
                  />
                </div>
              </div>

              {/* Right Sandbox: Audio Console */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Radio Broadcast Console</h4>
                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-2">
                  <canvas ref={audioWaveformCanvasRef} width={400} height={180} className="w-full h-auto block" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Mic Gain vs Music Bed</span>
                    <span className="font-mono text-cyan-400">{micGain}% / {musicBedVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={micGain}
                    onChange={e => handleAudioFaderChange(Number(e.target.value), musicBedVolume)}
                    className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    aria-label="Set mic gain in sandbox"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-xl shadow-rose-600/30 text-base flex items-center gap-2"
              >
                I Am Ready for ISC Challenges! 🏆
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE & COMPETENCY-BASED) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge_phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Top Bar: Progress & Competency Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="font-semibold text-slate-300">
                  Challenge <strong className="text-white text-sm">{currentChallenge + 1}</strong> of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-mono text-[10px] uppercase">
                    NEP Level: {activeChallenge.competencyLevel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px] uppercase">
                    Node: {activeChallenge.nodeId}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Challenge Card with SHAKE ANIMATION on error */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 bg-slate-900 rounded-2xl border transition-colors duration-300 ${
                wrongFlash ? 'border-rose-500 bg-rose-950/40' : 'border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-5">
                {activeChallenge.question}
              </h3>

              {/* 1. MCQ OPTIONS (Classify / Distinguish / Match) with Shake Animation */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border flex items-start gap-3 ${
                        showExplanation
                          ? i === activeChallenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200 hover:border-indigo-500'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-md bg-slate-700 text-center font-mono text-xs leading-6 text-slate-300 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. DRAG-LABEL CHALLENGE TYPE */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                    {activeChallenge.dragItems.map((item, dIdx) => (
                      <motion.div
                        key={dIdx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeChallenge.dragItems.map((target, tIdx) => (
                      <div
                        key={tIdx}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[90px] transition-colors ${
                          droppedLabels[target.targetId]
                            ? 'border-emerald-500 bg-emerald-950/30'
                            : 'border-slate-700 bg-slate-950/60 hover:border-indigo-500'
                        }`}
                      >
                        <span className="text-[11px] font-mono text-slate-400 capitalize">
                          Target Zone: {target.targetId.replace('slot_', '').replace('zone_', '')}
                        </span>
                        <div className="text-sm font-bold text-white mt-1">
                          {droppedLabels[target.targetId] ? (
                            <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                              ✓ {droppedLabels[target.targetId]}
                            </span>
                          ) : (
                            <span className="text-slate-500 italic text-xs">Drop matching label here</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < activeChallenge.dragItems.length}
                    className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Validate Label Placements
                  </motion.button>
                </div>
              )}

              {/* 3. DRAG-SORT CHALLENGE TYPE */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to arrange in correct chronological/acoustic sequence:</p>
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, sIdx) => (
                    <motion.div
                      key={sIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(sIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, sIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab active:cursor-grabbing flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-md bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                        {sIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Check Ordered Sequence
                  </motion.button>
                </div>
              )}

              {/* 4. NUMERIC CHALLENGE TYPE */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="e.g. 1913"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-rose-500 outline-none w-48"
                    />
                    <span className="text-slate-400 text-sm font-mono">{activeChallenge.unit}</span>
                    <motion.button
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl text-sm font-bold shadow-lg"
                    >
                      Submit Year
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. CONSTRUCT CHALLENGE TYPE */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-mono">{activeChallenge.validationHint}</p>
                  
                  {/* Available Parts Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {activeChallenge.availableParts.map((part, pIdx) => (
                      <motion.button
                        key={pIdx}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('pop');
                        }}
                        className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-medium"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  {/* Assembled Parts Workspace */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap items-center gap-2">
                    {constructParts.map((item, cIdx) => (
                      <motion.div
                        key={cIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-rose-600/30 border border-rose-500 text-rose-200 rounded-lg text-xs font-semibold flex items-center gap-2"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                          className="hover:text-white text-rose-400 font-bold"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-500 text-xs italic">Click parts above to construct the signal flow chain...</span>
                    )}
                  </div>

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Verify Signal Flow
                  </motion.button>
                </div>
              )}

              {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-indigo-950/40 border border-indigo-700/80 rounded-xl space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-sm">💡 Media Examiner Breakdown:</span>
                  </div>

                  {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-indigo-200 text-xs md:text-sm leading-relaxed"
                    >
                      <strong className="text-indigo-400 font-mono mr-1.5">{idx + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Explanatory Step →
                    </motion.button>
                  ) : (
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Masterclass Score 🎓' : 'Proceed to Next Challenge →'}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL-WORLD ACTIVITY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete_phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Completion Banner */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-rose-950/50 rounded-2xl border border-indigo-700 shadow-2xl text-center space-y-3">
              <span className="text-5xl">🎬🏆</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                ISC Mass Media Masterclass Completed!
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
                You have demonstrated rigorous theoretical and practical mastery across Camera Grammar, Broadcast Audio Chains, Cinema History, Genre Conventions, and Digital Social Media.
              </p>
              
              <div className="flex justify-center gap-6 pt-2">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                  <span className="text-xs text-slate-400 block font-mono">Final Score</span>
                  <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                  <span className="text-xs text-slate-400 block font-mono">BKT Mastery</span>
                  <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
                </div>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-5 bg-emerald-950/40 border border-emerald-600/60 rounded-2xl">
              <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-1">Director\'s Evaluation:</h4>
              <p className="text-emerald-100 text-sm leading-relaxed">
                {errors === 0
                  ? 'PERFECT SCORE! Flawless cinematic vision and broadcast engineering competence!'
                  : errors <= 3
                  ? 'Distinction level! You demonstrate exceptional grasp of CISCE Mass Media principles.'
                  : 'Commendable effort! Review the misconception profile below to solidify your board exam preparation.'}
              </p>
            </div>

            {/* ─── REQUIRED REFLECTION SECTION ─── */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-md uppercase">
                Metacognitive Reflection
              </div>
              <h3 className="text-lg font-bold text-white">Consolidate Your Media Director Insights</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-300 mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.surprising}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g. How Dolly creates 3D parallax shifts compared to flat optical zoom, or Manthan's crowd-funding model..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-300 mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.explain}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                    placeholder="e.g. Camera angles are emotional levers: low angles make subjects towering and heroic, while close-ups evoke pure vulnerability..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-300 mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.realLife}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g. Directing school film festivals, hosting podcasts with auto-ducking music, or creating impactful social campaigns..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setReflectionSubmitted(true);
                      audioManager.play('success');
                      speechManager.speak('Reflection saved to your portfolio!');
                    }}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    {reflectionSubmitted ? '✓ Reflection Saved' : 'Save Reflection Responses'}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  ⚠️ Your Diagnostic Misconception Profile:
                </h4>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Board Standard Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition Schedule (Visible SRS) */}
            <div className="p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                📅 Spaced Repetition (SM-2 Algorithm) Next Review:
              </h4>
              <p className="text-amber-100 text-xs md:text-sm">
                Based on your response latencies and precision, your optimal memory consolidation review is scheduled in{' '}
                <strong className="text-amber-300 font-mono">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
              </p>
            </div>

            {/* Real-World Activity Card */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-md uppercase">
                Capstone Creative Assignment
              </div>
              <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              
              <div className="space-y-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-mono font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK BUBBLES & OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Director Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}