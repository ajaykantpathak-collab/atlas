'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Mass Media & Communication) ───
const NODE_C12_MASSMEDIA_021 = 'c12_massmedia_021';
const NODE_C12_MASSMEDIA_022 = 'c12_massmedia_022';
const NODE_C12_MASSMEDIA_023 = 'c12_massmedia_023';
const NODE_C12_MASSMEDIA_024 = 'c12_massmedia_024';
const NODE_C12_MASSMEDIA_025 = 'c12_massmedia_025';
const NODE_C12_MASSMEDIA_026 = 'c12_massmedia_026';
const NODE_C12_MASSMEDIA_027 = 'c12_massmedia_027';
const NODE_C12_MASSMEDIA_028 = 'c12_massmedia_028';

const ALL_NODE_IDS = [
  NODE_C12_MASSMEDIA_021,
  NODE_C12_MASSMEDIA_022,
  NODE_C12_MASSMEDIA_023,
  NODE_C12_MASSMEDIA_024,
  NODE_C12_MASSMEDIA_025,
  NODE_C12_MASSMEDIA_026,
  NODE_C12_MASSMEDIA_027,
  NODE_C12_MASSMEDIA_028,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Digital Newsroom & Social Sphere Crisis',
  intro: 'You are the Chief Digital Editor of "Jan-Manthan Digital", a converged Indian newsroom in New Delhi. A fast-breaking citizen-led campaign demanding public transport safety is trending on X, while unverified rumors on WhatsApp threaten mob unrest in an adjoining district.',
  context: 'Navigate the crosswinds of cyber activism, combat trolling and fraud, establish newsroom netiquette standards, and leverage the 5 dimensions of media convergence across web, app, podcast, and video channels.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When a trending hashtag mobilizes 2 million citizens overnight without any traditional newspaper front-page coverage, what sociological phenomenon is occurring?',
  options: [
    'Traditional terrestrial broadcast transmission',
    'Digitally constructed Collective Identity & Cyber Activism',
    'Pure cyber crime personation under Section 66D',
    'Unidirectional linear Shannon-Weaver noise generation',
  ],
  correctIndex: 1,
  hintAfter: "Don't worry! Let's explore how social media platforms generate collective identities and how media convergence reshapes Indian democracy.",
};

// ─── PREDICTION-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If data cost drops by 95% and smartphone penetration reaches 70%, what happens to traditional one-way mass broadcast monopoly?',
    options: [
      'It expands because people buy more analog TVs',
      'It diminishes as on-demand, interactive digital platforms (OTT, podcasts, apps) proliferate',
      'It remains completely unchanged',
      'It shuts down all regional languages',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Data Cost slider to ₹10/GB in the simulator to verify the surge in multi-platform digital engagement!',
    nodeId: NODE_C12_MASSMEDIA_024,
  },
  {
    question: 'Predict: What happens to misinformation risk when sharing velocity is maxed out while the verification gate is bypassed?',
    options: [
      'Misinformation risk drops automatically to zero',
      'Misinformation risk spikes towards 100%, triggering rumor cascades and mob hysteria',
      'The platform automatically issues Supreme Court notices',
      'Audiences instantly convert into professional investigative reporters',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Verification Gate to BYPASSED and raise Sharing Velocity above 80% to observe the spike in Misinformation Risk!',
    nodeId: NODE_C12_MASSMEDIA_021,
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    prompt: 'Observation: Look closely at Diagram 1. When the Verification Gate is toggled from ACTIVE to BYPASSED, what happens to the information pathway?',
    observableOptions: [
      'The signal diverts away from constructive policy activism into viral rumor cascades and panic',
      'The network speed drops to 2G analog frequencies',
      'The smartphone switches into a printed broadsheet newspaper',
      'The cost per GB immediately triples to ₹250',
    ],
    correctIndex: 0,
    explanation: 'Without verification gates, unverified assertions bypass ethical scrutiny and trigger panic cascades rather than structured civic reform.',
  },
  {
    id: 'obs_02',
    prompt: 'Observation: In Diagram 2 (The 2016 Telecom Shock), observe what happens as data cost falls from ₹250/GB to ₹10/GB.',
    observableOptions: [
      'Active internet users and OTT penetration rise rapidly in an inverse proportional relationship',
      'The user base shrinks because data becomes too inexpensive to maintain',
      'Broadcast television antennas replace cellular towers completely',
      'Social media netiquettes become legally non-binding',
    ],
    correctIndex: 0,
    explanation: 'The inverse curve shows that as tariff barriers collapsed by 96%, digital inclusion surged past 800 million users, driving new media adoption across India.',
  },
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
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_mm_001',
    nodeId: NODE_C12_MASSMEDIA_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which landmark 2011 Indian movement pioneered cyber activism by using Facebook pages and SMS chains to demand the Jan Lokpal Bill?',
    options: [
      'India Against Corruption (Anna Hazare movement)',
      'Chipko Movement',
      'Narmada Bachao Andolan initial print circulars',
      'Salt Satyagraha radio broadcasts',
    ],
    correctIndex: 0,
    explanation: 'The 2011 India Against Corruption movement led by Anna Hazare mobilised millions across Indian cities via Facebook pages, SMS chains, and YouTube live streams, marking a turning point in Indian cyber activism.',
    hints: [
      'Think about the 2011 anti-corruption crusade at Ramlila Ground.',
      'It championed the Jan Lokpal Bill before widespread 4G smartphones existed.',
      'Anna Hazare was the prominent figurehead of this campaign.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_002',
    nodeId: NODE_C12_MASSMEDIA_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Indian law, which landmark 2015 Supreme Court judgment struck down Section 66A of the IT Act, 2000 for being vague and overbroad?',
    options: [
      'Shreya Singhal v. Union of India',
      'K.S. Puttaswamy v. Union of India',
      'Maneka Gandhi v. Union of India',
      'Kesavananda Bharati v. State of Kerala',
    ],
    correctIndex: 0,
    explanation: 'In Shreya Singhal v. Union of India (2015), the Supreme Court struck down Section 66A of the IT Act, 2000 because its vague restriction on "offensive" speech violated Article 19(1)(a).',
    hints: [
      'This historic verdict protected free online speech after arrests of cartoonists and students.',
      'The petitioner shared the surname Singhal.',
      'The case is Shreya Singhal v. Union of India (2015).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_mm_003',
    nodeId: NODE_C12_MASSMEDIA_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is NOT one of the four key netiquettes specified in the ISC Mass Media syllabus?',
    options: [
      'Mandatory real-time video streaming in every email',
      'Identification of oneself and proper introduction',
      'Respect for others privacy and avoiding doxxing',
      'Use of appropriate language and imagery and refraining from spam',
    ],
    correctIndex: 0,
    explanation: 'The ISC syllabus prescribes four core netiquettes: (1) identification of oneself, (2) respect for others privacy, (3) use of appropriate language and imagery, and (4) do not spam. Video streaming is not a netiquette.',
    hints: [
      'Netiquettes represent polite behavioural rules rather than compulsory broadcasting.',
      'Look for the option that forces heavy multimedia rather than basic online manners.',
      'Mandatory video streaming in emails is impractical and not a syllabus netiquette.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mm_004',
    nodeId: NODE_C12_MASSMEDIA_024,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each of the 4 New Media types to its defining platform characteristic.',
    dragItems: [
      { label: 'Websites', targetId: 'box_web' },
      { label: 'Apps', targetId: 'box_app' },
      { label: 'Podcasts', targetId: 'box_pod' },
      { label: 'Smartphones', targetId: 'box_phone' },
    ],
    correctMapping: {
      box_web: 'Websites',
      box_app: 'Apps',
      box_pod: 'Podcasts',
      box_phone: 'Smartphones',
    },
    explanation: 'Websites feature hyperlinked non-linear articles, Apps provide installed device integration & push notifications, Podcasts deliver episodic on-demand audio via RSS, and Smartphones act as converged handheld hardware gateways.',
    hints: [
      'Websites live on browsers with hyperlinks.',
      'Apps install locally and send notifications.',
      'Podcasts deliver episodic audio feeds (like The Seen and the Unseen).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mm_005',
    nodeId: NODE_C12_MASSMEDIA_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Media convergence is best defined as:',
    options: [
      'The merging of previously distinct media platforms, technologies, and industries into an integrated digital ecosystem',
      'Simply uploading a print newspaper PDF onto an FTP server',
      'The complete shutdown of all traditional radio transmitters in favor of FM',
      'Replacing human journalists entirely with automated printing presses',
    ],
    correctIndex: 0,
    explanation: 'Media convergence is the blending and unification of print, television, radio, cinema, and digital technologies into unified workflows and platforms.',
    hints: [
      'It is far broader than just putting a static PDF online.',
      'Look for the merging of distinct technologies, industries, and formats.',
      'It creates an integrated digital ecosystem where content flows seamlessly.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_006',
    nodeId: NODE_C12_MASSMEDIA_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a single handheld smartphone replaces an analog camera, FM transistor, CRT television, printed newspaper, and landline phone, which dimension of convergence is active?',
    options: [
      'Technological Convergence',
      'Textual Convergence',
      'Social Convergence',
      'Economic Convergence',
    ],
    correctIndex: 0,
    explanation: 'Technological convergence refers specifically to multiple physical hardware devices and communication networks collapsing into a single device such as the smartphone.',
    hints: [
      'Ask yourself: is this about hardware devices or narrative storytelling?',
      'Merging gadgets into one single pocket device is technological.',
      'The device is the technology layer.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_007',
    nodeId: NODE_C12_MASSMEDIA_022,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the official national citizen helpline number launched under MHA / I4C to report immediate financial cyber fraud and UPI scams in India?',
    correctAnswer: 1930,
    tolerance: 0,
    unit: 'Helpline Number',
    explanation: 'Helpline 1930 (formerly 155260) connects directly to the Indian Cyber Crime Coordination Centre (I4C) under the Ministry of Home Affairs to freeze defrauded funds.',
    hints: [
      'It is a 4-digit emergency helpline starting with 19..',
      'It was upgraded by MeitY and MHA to combat real-time bank fraud.',
      'The number is 1930.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_mm_008',
    nodeId: NODE_C12_MASSMEDIA_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze the contrast: How did the 2018 #MeTooIndia movement differ fundamentally in outcome from the 2018 Palghar WhatsApp rumor incidents?',
    options: [
      '#MeTooIndia channeled information into institutional accountability and ICC compliance, while unverified forwards in Palghar manufactured panic leading to mob violence',
      '#MeTooIndia was broadcast only on Doordarshan, while Palghar occurred exclusively on television',
      'Both were unlawful cyber crimes prosecuted under IPC Section 420',
      'Palghar created a permanent democratic policy forum, whereas #MeToo had zero public discussion',
    ],
    correctIndex: 0,
    explanation: 'Both used rapid information diffusion, but #MeTooIndia utilized narrative framing and verification to demand legal compliance under the POSH Act 2013, whereas Palghar involved unverified viral rumors inciting panic and violence.',
    hints: [
      'Look at verification, legal framing, and democratic purpose.',
      'One demanded policy accountability (Internal Complaints Committees); the other was mob hysteria.',
      'Information sharing can empower democracy or trigger violence depending on verification and intent.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_009',
    nodeId: NODE_C12_MASSMEDIA_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between Cyberbullying and Trolling in an Indian media context:',
    options: [
      'Cyberbullying is repeated, targeted harassment of a known individual (e.g. classmate); Trolling is provocative posting aimed at provoking an emotional reaction from public figures or broad audiences',
      'Cyberbullying is legal under IT Act; Trolling is punishable with capital punishment',
      'Trolling only happens through SMS; Cyberbullying only occurs in newspapers',
      'There is no legal or behavioral distinction between them in communication studies',
    ],
    correctIndex: 0,
    explanation: 'Cyberbullying involves sustained personal harassment targeted at a specific individual (often known offline), while trolling is provocative, disruptive posting intended to derail discourse or provoke outrage.',
    hints: [
      'Think about target (known peer vs public figure) and intent (harming a person vs provoking a reaction).',
      'Trolls seek disruptive attention; bullies seek sustained psychological intimidation.',
      'They differ in intent, target, and legal remedies (IPC 354D/506/509 vs IT Rules).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_010',
    nodeId: NODE_C12_MASSMEDIA_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A user creates a fake Instagram account posing as a Delhi school principal to announce fake exam cancellations. Under which section of the IT Act, 2000 is this personation punishable?',
    options: [
      'Section 66D (Cheating by personation by using computer resource)',
      'Section 124A (Sedition)',
      'Section 377 (Unnatural offences)',
      'Section 144 of Code of Criminal Procedure',
    ],
    correctIndex: 0,
    explanation: 'Section 66D of the IT Act, 2000 prescribes imprisonment up to 3 years and fines for cheating by personation using any computer resource or communication device.',
    hints: [
      'Look for the IT Act provision that specifically targets digital impersonation.',
      'It contains the letter "D" for digital deception/personation.',
      'Section 66D covers cheating by personation.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_mm_011',
    nodeId: NODE_C12_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which classical mass communication function (Lasswell) is severely fragmented when algorithmic personalization creates "echo chambers" on social media?',
    options: [
      'Correlation of society & shared cultural consensus',
      'Physical printing press ink adhesion',
      'Terrestrial transmitter signal amplitude',
      'Analog tape spool rotation',
    ],
    correctIndex: 0,
    explanation: 'Algorithmic echo chambers isolate users into self-reinforcing ideological bubbles, undermining the correlation function where diverse societal segments negotiate consensus.',
    hints: [
      'Recall Harold Lasswells 4 media functions: Surveillance, Correlation, Cultural Transmission, Entertainment.',
      'Correlation connects different parts of society to build shared understanding.',
      'Echo chambers polarize rather than correlate.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mm_012',
    nodeId: NODE_C12_MASSMEDIA_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In modern Indian general elections, political parties deploy dedicated IT cells, WhatsApp broadcast lists, and AI tools. This illustrates which socio-political implication?',
    options: [
      'Transformation of election campaigning from one-to-many broadcast to micro-targeted, participatory, data-driven political communication',
      'Reversion to 19th-century telegraph bulletin boards',
      'The complete elimination of the Election Commission of India',
      'The immediate national ban on all smartphones',
    ],
    correctIndex: 0,
    explanation: 'New media enables micro-targeting by constituency, language, and demographic, bypassing traditional broadcast media while introducing challenges of algorithmic transparency.',
    hints: [
      'Consider how voters receive tailored messages directly on their personal devices.',
      'It shifts broadcasting from mass television rallies to segmented data-driven feeds.',
      'This represents micro-targeted political campaigning.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_013',
    nodeId: NODE_C12_MASSMEDIA_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Bahubali franchise expanding across theatrical films, Graphic India comic books, Netflix animated series, mobile games, and novel trilogies is a prime example of:',
    options: [
      'Textual Convergence (Transmedia Storytelling)',
      'Technological Hardware Failure',
      'Pure Economic Bankruptcy',
      'Political Censorship under Article 356',
    ],
    correctIndex: 0,
    explanation: 'Textual convergence occurs when narrative content flows seamlessly across different media formats and languages, known as transmedia storytelling.',
    hints: [
      'The story itself is traveling across novels, comics, games, and films.',
      'This is about content/text remixing across different media languages.',
      'It is Textual Convergence.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_014',
    nodeId: NODE_C12_MASSMEDIA_028,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 Dimensions of Media Convergence from hardware infrastructure up to governance & regulation.',
    sortItems: [
      'Technological Dimension (Devices & Networks merge)',
      'Textual Dimension (Content remixed across formats)',
      'Social Dimension (Audiences become active prosumers)',
      'Economic Dimension (Corporate consolidation & conglomerates)',
      'Political Dimension (Governance, overlapping regulation & policy)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The analytical ladder starts with hardware technology (1), moves to narrative content (2), engages audience practices (3), scales through corporate conglomerates (4), and requires coordinated policy/regulation (5).',
    hints: [
      'Start with the physical hardware (technology).',
      'Next comes content/text, then the audience (social).',
      'Industry mergers (economic) lead into legal/regulatory governance (political).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_015',
    nodeId: NODE_C12_MASSMEDIA_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Kunal Kamra v. Union of India (2024), the Bombay High Court scrutinized the 2023 IT Rules amendment creating a government Fact Check Unit. What was the central constitutional tension?',
    options: [
      'State-mandated fact-checking of central government content chills free speech under Article 19(1)(a) versus the States power to curb online misinformation under Article 19(2)',
      'A dispute over whether YouTube should pay higher corporate income taxes to Maharashtra',
      'A conflict regarding copyright fees for Doordarshan black-and-white archives',
      'Whether 4G spectrum should be restricted to government officials only',
    ],
    correctIndex: 0,
    explanation: 'The constitutional dilemma rests on whether an executive body acting as the sole arbiter of "truth" about government business creates a chilling effect on legitimate political dissent and investigative journalism.',
    hints: [
      'Connect free expression (Article 19(1)(a)) with government regulation of fake news (Article 19(2)).',
      'Think about who decides what is "fake" or "misleading" about state policies.',
      'It balances speech protection against state regulatory overreach.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_mm_016',
    nodeId: NODE_C12_MASSMEDIA_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The ₹70,000+ crore Reliance-Viacom18-Disney Star merger approved in 2024 illustrates Economic Convergence. What major concern did media critics highlight regarding media plurality?',
    options: [
      'Dominant market concentration across broadcast TV, OTT (Hotstar & JioCinema), and sports rights could reduce viewpoint diversity and marginalize smaller independent news outlets',
      'It would force all Indian citizens to switch to analog terrestrial radios',
      'It violated international postal treaty agreements on postage stamps',
      'It prohibited mobile phones from displaying Hindi script',
    ],
    correctIndex: 0,
    explanation: 'Cross-media consolidation creates massive conglomerates controlling both distribution rails and content libraries, raising risks of monopolistic agenda-setting and reduced media pluralism.',
    hints: [
      'Consider what happens when one conglomerate owns TV channels, OTT platforms, sports rights, and telecom networks.',
      'Think about media pluralism and agenda-setting power.',
      'Monopolistic concentration narrows the range of independent viewpoints.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_017',
    nodeId: NODE_C12_MASSMEDIA_027,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a complete converged newsroom workflow for covering an Indian space launch event.',
    availableParts: [
      'Print Long-Form Explainer',
      'Live OTT Multi-Angle Stream',
      'Interactive 3D Orbital Widget',
      'Audio Commuter Podcast',
      'Short Vertical Video Clip',
    ],
    targetState: 'Print Long-Form Explainer Live OTT Multi-Angle Stream Interactive 3D Orbital Widget Audio Commuter Podcast Short Vertical Video Clip',
    validationHint: 'Add all 5 media formats to assemble a full 360-degree converged newsroom package.',
    explanation: 'A converged newsroom repurposes a single reporting event across print depth, live video streaming, interactive graphics, commuter audio, and social media reels simultaneously.',
    hints: [
      'Include text, live video, interactive widgets, audio, and vertical reels.',
      'Click each component from the palette in sequence.',
      'All 5 elements combine into a converged news product.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mm_018',
    nodeId: NODE_C12_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the "Digital Divide" in India: Why does the rapid growth of new media fail to automatically democratize education and governance?',
    options: [
      'Roughly 40% of citizens—predominantly rural, lower-income, and female—still lack reliable high-speed connectivity and digital literacy, creating an information underclass',
      'Indian students refuse to use smartphones under any circumstances',
      'Traditional Doordarshan transmitters have jammed all digital 4G signals nationwide',
      'Digital devices are illegal under the Constitution of India',
    ],
    correctIndex: 0,
    explanation: 'While Jio reduced data costs, geographic, socioeconomic, and gender disparities persist. When government services (e.g. CoWIN, digital admissions) migrate purely online, offline populations suffer exclusion.',
    hints: [
      'Look at the ~40% offline rural/gender gap in India.',
      'Accessibility is structural, not just commercial.',
      'Without universal digital literacy and infrastructure, inequalities are magnified.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mm_019',
    nodeId: NODE_C12_MASSMEDIA_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A community WhatsApp group admin notices a member circulating an unverified video claiming food poisoning in local school lunches. Which immediate netiquette and legal action should the admin take?',
    options: [
      'Remove the message, post an official fact-check reminder citing credible health authorities, and remind members that spreading unverified rumors violates group rules and IT guidelines',
      'Forward the message to 50 other WhatsApp groups to test if anyone else fell sick',
      'Ignore the message because WhatsApp chats have no ethical or social impact',
      'Arrest the user immediately under Section 302 of the IPC without police involvement',
    ],
    correctIndex: 0,
    explanation: 'Responsible digital citizenship requires immediate mitigation: halting misinformation diffusion, verifying facts, and upholding community netiquette standards.',
    hints: [
      'Recall the lessons from the Palghar case on unchecked misinformation forwards.',
      'The admin must contain panic and restore verified information.',
      'Deleting the false claim and posting verified facts is the ethical netiquette protocol.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_020',
    nodeId: NODE_C12_MASSMEDIA_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do trending hashtags (e.g. #Nirbhaya, #FarmersProtest) function as "Visible Solidarity Markers" in forming collective identities?',
    options: [
      'They allow geographically dispersed individuals to signal common cause, overcome isolation, and build an imagined community of shared democratic demand',
      'They physically encrypt the users phone so the internet service provider cannot see it',
      'They automatically deposit government compensation into bank accounts',
      'They replace the need for any parliamentary legislation permanently',
    ],
    correctIndex: 0,
    explanation: 'Hashtags act as symbolic solidarity markers that aggregate diffuse sentiments into visible public counter-publics, validating individual grievances as shared civic demands.',
    hints: [
      'Think of Benedict Andersons concept of the digitally imagined community.',
      'Hashtags make individual outrage visible and collectively aligned.',
      'They signal belonging and shared civic intent across distant geography.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mm_021',
    nodeId: NODE_C12_MASSMEDIA_024,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Prior to September 2016 (pre-Jio), mobile data in India cost approx ₹250/GB. After 4G disruption, it dropped to ~₹10/GB. By what percentage did the cost per GB decrease? (Round to nearest whole number)',
    correctAnswer: 96,
    tolerance: 1,
    unit: '% Reduction',
    explanation: '((250 - 10) / 250) * 100 = (240 / 250) * 100 = 96% reduction in mobile data cost, triggering Indias digital mass media revolution.',
    hints: [
      'Calculate: ((Initial Price - Final Price) / Initial Price) * 100.',
      'Initial = 250, Final = 10, Difference = 240.',
      '240 / 250 = 0.96 or 96%.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mm_022',
    nodeId: NODE_C12_MASSMEDIA_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When NDTV invites viewers to record flood situations on their mobile cameras and broadcasts the footage as "Citizen Journalist" segments, which dimension of convergence is active?',
    options: [
      'Social Convergence (Prosumer Audience)',
      'Pure Radio Frequency Modulation',
      'Optical Fiber Splicing',
      'Static Print Typesetting',
    ],
    correctIndex: 0,
    explanation: 'Social convergence transforms audiences from passive spectators into active prosumers (producers + consumers) who co-create journalism and media narratives.',
    hints: [
      'Focus on the shift from passive consumer to active content creator (prosumer).',
      'This involves audiences actively participating in news production.',
      'It is Social Convergence.',
    ],
    misconceptionIndex: 3,
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
  nodeId: NODE_C12_MASSMEDIA_021,
  title: 'Social Media & Media Convergence in Modern India',
  definition:
    'The role of social media in democracy encompasses collective identity formation and cyber activism, balanced against cyber crimes (bullying, stalking, trolling, fraud) and regulated by netiquettes. New media expands across websites, apps, podcasts, and smartphones, culminating in multi-dimensional media convergence (technological, textual, social, economic, and political).',
  eli5:
    'Think of the digital world as a giant town square. Anyone can speak (cyber activism), but bad actors can cause trouble (cyber crime), which is why we need manners (netiquette). Instead of 5 separate gadgets for news, radio, TV, and movies, one phone and one network does it all (media convergence)!',
  misconceptions: [
    {
      misconception: 'Cyber activism and cyber crime are the same thing.',
      correction:
        'Cyber activism is lawful democratic advocacy (e.g. #Nirbhaya, #MeTooIndia), whereas cyber crime involves criminal offences like hacking, fraud, or stalking under the IT Act 2000.',
    },
    {
      misconception: 'Section 66A of the IT Act still applies to offensive online posts.',
      correction:
        'Section 66A was struck down as unconstitutional by the Supreme Court in Shreya Singhal (2015). Online harassment is now prosecuted under specific IPC sections and IT Act provisions.',
    },
    {
      misconception: 'New media simply means any recent gadget, like color TV.',
      correction:
        'New media specifically refers to digital, interactive, computer-mediated, internet-based platforms with on-demand and two-way capabilities.',
    },
    {
      misconception: 'Media convergence only means having a website for a newspaper.',
      correction:
        'Convergence operates across 5 dimensions: Technological (hardware), Textual (transmedia stories), Social (prosumers), Economic (conglomerates), and Political (governance).',
    },
    {
      misconception: 'Cyber crime complaints can only be made by visiting a physical police station.',
      correction:
        'Citizens can report online crimes 24x7 via cybercrime.gov.in and call the national cyber helpline 1930.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What turns individual social media posts into a collective identity?',
      options: ['Information diffusion & visible solidarity markers', 'High mobile recharge prices', 'Analog television antennas', 'Print newspaper distribution trucks'],
      correctIndex: 0,
    },
    {
      question: 'Which of the following is an example of cyberstalking?',
      options: ['Repeated unwanted digital tracking of a persons location & messaging', 'Writing an editorial for a national newspaper', 'Listening to an educational podcast on Spotify', 'Buying an e-book on Kindle'],
      correctIndex: 0,
    },
    {
      question: 'What is the "forwarded many times" label on WhatsApp designed to curb?',
      options: ['Spam, viral misinformation, and unverified bulk forwards', 'High-definition video uploads', 'Battery drain on smartphones', 'Voice call duration'],
      correctIndex: 0,
    },
    {
      question: 'Which characteristic distinguishes a podcast from traditional FM radio?',
      options: ['Episodic on-demand distribution via RSS versus scheduled linear broadcast', 'Podcasts require a satellite dish', 'FM radio can only broadcast in English', 'Podcasts cannot contain human speech'],
      correctIndex: 0,
    },
    {
      question: 'What is a major disadvantage of social media algorithmic personalization?',
      options: ['Creation of echo chambers and ideological polarization', 'Excessive paper wastage', 'Physical delivery delays by postmen', 'Inability to store photographs'],
      correctIndex: 0,
    },
    {
      question: 'How did Reliance Jio in 2016 impact Indian new media consumption?',
      options: ['Drastically reduced 4G data tariffs and brought 400M+ new users online', 'Banned all internet news portals', 'Made television sets obsolete overnight', 'Introduced analog radio transmitters'],
      correctIndex: 0,
    },
    {
      question: 'Which dimension of convergence is reflected in the Reliance-Disney Star merger?',
      options: ['Economic Convergence (Corporate media consolidation)', 'Textual syntax convergence', 'Keyboard layout convergence', 'Radio wave polarization'],
      correctIndex: 0,
    },
    {
      question: 'What role do "prosumers" play in social media convergence?',
      options: ['They simultaneously consume content and produce/share their own', 'They only repair broadcast hardware', 'They print hardbound books in factories', 'They manage satellite orbital slots'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrates comprehensive understanding of social media in democracy, cyber crimes and laws, netiquettes, new media affordances, advantages/disadvantages, socio-political implications, and the 5 dimensions of media convergence.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Collective Identity & Information Gatekeeping',
    instruction: 'Adjust the Share Velocity & Framing Quality sliders to see how verified civic activism contrasts with unverified rumor panics.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MASSMEDIA_021,
  },
  {
    title: '2. Cyber Crime Threat Matrix & Legal Statues',
    instruction: 'Click each threat tile (Bullying, Stalking, Trolling, Fraud) to inspect its specific IPC and IT Act statutory remedies.',
    interactionType: 'click-threat',
    nodeId: NODE_C12_MASSMEDIA_022,
  },
  {
    title: '3. Netiquette Filter: Digital Manners & Community Trust',
    instruction: 'Toggle syllabus netiquette rules to see how ethical moderation safeguards democratic online spaces.',
    interactionType: 'toggle-netiquette',
    nodeId: NODE_C12_MASSMEDIA_023,
  },
  {
    title: '4. The 2016 Telecom Shock: Dual Curve & Multi-Representation',
    instruction: 'Drag the Data Cost slider from ₹250/GB to ₹10/GB to analyze the mathematical and graphical inflection point.',
    interactionType: 'slider-jio',
    nodeId: NODE_C12_MASSMEDIA_024,
  },
  {
    title: '5. The 5 Dimensions of Media Convergence Pentagon',
    instruction: 'Interact with the 5 convergence dimensions to examine how hardware, texts, audiences, companies, and laws unify.',
    interactionType: 'click-convergence',
    nodeId: NODE_C12_MASSMEDIA_028,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Convergence Editor: Design a 360° Civic Campaign',
  description:
    'Design a multi-platform public interest media campaign on "Youth Voter Awareness & Fact-Checking" for the upcoming elections. Map your strategy across all four new-media types and five convergence dimensions while upholding netiquettes.',
  steps: [
    'Choose a core civic message (e.g. #VerifyBeforeYouVote).',
    'Assign specific roles to Website (in-depth fact-checks), App (notifications & quiz), Podcast (expert interviews), and Smartphone (Reels & citizen reporting).',
    'Incorporate the 4 netiquettes into your community moderation policy.',
    'Identify relevant regulatory guidelines (ECI Voluntary Code of Ethics & IT Rules 2021).',
  ],
};

function C12_MassMediaRoleSocialMediaSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['massmedia'] || {
    name: 'Mass Media & Communication',
    emoji: '📡',
    color: 'sky',
  };

  // ─── RICH STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback Components State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Discovery & Prediction State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionVerified, setPredictionVerified] = useState<Record<number, boolean>>({});

  // Observation Question State (Brilliant "What do you notice?")
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsFeedback, setObsFeedback] = useState<Record<number, boolean>>({});

  // Interactive Exploration & Sandbox Controls
  const [shareRate, setShareRate] = useState(65);
  const [framingQuality, setFramingQuality] = useState(70);
  const [verificationActive, setVerificationActive] = useState(true);
  const [selectedThreat, setSelectedThreat] = useState<string>('bullying');
  const [netiquetteFlags, setNetiquetteFlags] = useState({
    identity: true,
    privacy: true,
    language: true,
    noSpam: true,
  });
  const [dataCost, setDataCost] = useState(10);
  const [activeDimension, setActiveDimension] = useState<string>('technological');
  const [audienceProsumerScore, setAudienceProsumerScore] = useState(75);
  const [algorithmPolarization, setAlgorithmPolarization] = useState(45);

  // Challenge Sub-types State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── REAL-TIME DERIVED SIMULATION METRICS ───
  const simMovementStrength = useMemo(() => {
    const raw = (shareRate * 0.5 + framingQuality * 0.5) * (verificationActive ? 1 : 0.4);
    return Math.round(Math.min(100, Math.max(0, raw)));
  }, [shareRate, framingQuality, verificationActive]);

  const simMisinfoRisk = useMemo(() => {
    const base = shareRate * 0.8 - framingQuality * 0.3;
    const factor = verificationActive ? 0.3 : 1.2;
    return Math.round(Math.min(100, Math.max(5, base * factor)));
  }, [shareRate, framingQuality, verificationActive]);

  const simInternetUsers = useMemo(() => {
    const normalized = (250 - dataCost) / 240;
    return Math.round(200 + normalized * 550);
  }, [dataCost]);

  const simOttPenetration = useMemo(() => {
    const normalized = (250 - dataCost) / 240;
    return Math.round(15 + normalized * 75);
  }, [dataCost]);

  // ─── MOUNT MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ANIMATION (Particles of Information Diffusion) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const numParticles = 24;
    const particles = Array.from({ length: numParticles }, (_, i) => ({
      x: Math.random() * 400,
      y: Math.random() * 120,
      speed: 0.5 + Math.random() * 1.5,
      radius: 2 + Math.random() * 3,
      angle: (i / numParticles) * Math.PI * 2,
    }));

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = 18 + Math.sin(t * 3) * 4;

      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulse + 12);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse + 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p, idx) => {
        p.x += Math.cos(p.angle + t) * p.speed;
        p.y += Math.sin(p.angle + t) * (p.speed * 0.5);

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dist = Math.hypot(p.x - cx, p.y - cy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 * (1 - dist / 120)})`;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.fillStyle = idx % 2 === 0 ? '#38bdf8' : '#818cf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, shareRate, framingQuality]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent intuition! Social media creates imagined communities and collective action.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore how social media and media convergence operate in India.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to experiment with all variables in the digital newsroom sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for board-standard challenges! Read each scenario carefully.');
  }, []);

  const handlePredictionSelect = useCallback((qIdx: number, optIdx: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    audioManager.play('tap');
    speechManager.speak('Now test and verify your prediction using the interactive controls.');
  }, []);

  const handleObservationAnswer = useCallback((obsIdx: number, optIdx: number) => {
    const correct = optIdx === OBSERVATION_QUESTIONS[obsIdx].correctIndex;
    setObsAnswers((prev) => ({ ...prev, [obsIdx]: optIdx }));
    setObsFeedback((prev) => ({ ...prev, [obsIdx]: correct }));
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Great observation!' : 'Review the visualization above and try again.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3, 4];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(
    (customArr?: number[]) => {
      const arr = customArr || (sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3, 4]);
      const isCorrect = JSON.stringify(arr) === JSON.stringify(challenge.correctOrder);
      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);
      } else {
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);
        showNextHint();
      }
    },
    [sortArrangement, challenge, showNextHint]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Social Media & Media Convergence.');
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
      setCurrentChallenge((c) => c + 1);
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us examine the structured explanation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── SRS INTERVAL HELPER ───
  const reviewIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ══════════════════════════════════════════════════════════════════
  // RENDER UI
  // ══════════════════════════════════════════════════════════════════
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl shadow-inner shadow-sky-500/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                ISC Class 12 Mass Media
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-medium">
                NEP 2020 Aligned
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800" role="toolbar" aria-label="Learning stages">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                phase === p
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Card */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="p-5 sm:p-6 bg-gradient-to-br from-sky-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-sky-800/40 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-2">
              <span>📰 Live Newsroom Simulation</span>
              <span>•</span>
              <span className="text-slate-400 text-xs">Case Study Arc</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-sky-300">Your Editorial Mission: </strong>
              {SCENARIO.context}
            </div>
          </motion.div>

          {/* Discovery Question Card */}
          <div className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold">
                Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">No grades — test your instincts!</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 text-slate-500 border border-slate-800'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold">✓ Correct</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-rose-400 text-xs">✗ Incorrect</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p
                  className={`text-sm ${
                    discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎯 [✓ Correct] Spot on! Hashtags crystallize diffuse sentiments into collective action.'
                    : `⚠️ [✗ Intuition check] ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Advance to interactive laboratories"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 whitespace-nowrap"
                >
                  Step into Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Exploration Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-sky-400 font-semibold">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>

          {/* Stepper Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sky-500 rounded-full"
              animate={{ width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Active Lab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5 shadow-xl"
            >
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">🧪</span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-1.5 font-medium">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 0: Collective Identity & Gatekeeping ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* PREDICTION 2: Misinformation Spike */}
                  {predictionAnswers[1] === undefined && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 space-y-3">
                      <p className="text-xs font-semibold text-indigo-200">
                        🔮 Prediction Challenge: {PREDICTION_QUESTIONS[1].question}
                      </p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePredictionSelect(1, i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 text-xs rounded-lg text-slate-200 border border-slate-700/60"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SVG 1: Information Diffusion & Gatekeeping Model */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                      <span>Diagram 1: The Verification Gatekeeper Pipeline</span>
                      <span className="text-[10px] text-sky-400 bg-sky-950/70 px-2 py-0.5 rounded border border-sky-800">
                        Interactive Model
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 600 160"
                      className="w-full h-auto max-h-48"
                      role="img"
                      aria-label="SVG Diagram showing Social Media Citizen Input splitting through Verification Filter into Cyber Activism vs Unfiltered Rumor Cascade"
                    >
                      <defs>
                        <linearGradient id="gateGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#0284c7" />
                          <stop offset="100%" stopColor="#4f46e5" />
                        </linearGradient>
                        <linearGradient id="successPath" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="failPath" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                        </marker>
                      </defs>

                      <rect x="15" y="55" width="120" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="75" y="77" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">📱 Citizen Posts</text>
                      <text x="75" y="93" fill="#94a3b8" fontSize="9" textAnchor="middle">Hashtags & Video</text>

                      <path d="M 135 80 L 195 80" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                      <polygon
                        points="240,40 285,80 240,120 195,80"
                        fill={verificationActive ? '#065f46' : '#881337'}
                        stroke={verificationActive ? '#34d399' : '#fb7185'}
                        strokeWidth="2"
                      />
                      <text x="240" y="78" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {verificationActive ? '✓ FILTER' : '✗ BYPASS'}
                      </text>
                      <text x="240" y="90" fill="#e2e8f0" fontSize="8" textAnchor="middle">
                        Verification Gate
                      </text>

                      <path
                        d="M 285 70 C 340 50, 370 35, 430 35"
                        fill="none"
                        stroke={verificationActive ? 'url(#successPath)' : '#475569'}
                        strokeWidth={verificationActive ? '3' : '1.5'}
                        strokeDasharray={verificationActive ? 'none' : '4 4'}
                        markerEnd="url(#arrow)"
                      />
                      <rect x="430" y="12" width="155" height="46" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" opacity={verificationActive ? 1 : 0.4} />
                      <text x="507" y="32" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">✓ Cyber Activism</text>
                      <text x="507" y="48" fill="#6ee7b7" fontSize="8" textAnchor="middle">#MeToo / Jan Lokpal (ICC Reform)</text>

                      <path
                        d="M 285 90 C 340 110, 370 125, 430 125"
                        fill="none"
                        stroke={!verificationActive ? 'url(#failPath)' : '#475569'}
                        strokeWidth={!verificationActive ? '3' : '1.5'}
                        strokeDasharray={!verificationActive ? 'none' : '4 4'}
                        markerEnd="url(#arrow)"
                      />
                      <rect x="430" y="102" width="155" height="46" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" opacity={!verificationActive ? 1 : 0.4} />
                      <text x="507" y="122" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">✗ Rumor Cascade / Panic</text>
                      <text x="507" y="138" fill="#fda4af" fontSize="8" textAnchor="middle">Palghar Unrest / WhatsApp Hysteria</text>
                    </svg>
                  </div>

                  {/* OBSERVATION QUESTION 1 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-sky-800/40 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold">
                        👁️ Observation Check
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{OBSERVATION_QUESTIONS[0].prompt}</p>
                    <div className="space-y-1.5 pt-1">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservationAnswer(0, i)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                            obsAnswers[0] === i
                              ? obsFeedback[0]
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {obsAnswers[0] !== undefined && (
                      <p className="text-[11px] text-sky-300 mt-1">{OBSERVATION_QUESTIONS[0].explanation}</p>
                    )}
                  </div>

                  {/* Canvas Animation Stream */}
                  <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-hidden">
                    <canvas ref={canvasRef} width={460} height={85} className="w-full rounded-lg" />
                    <div className="absolute top-2 left-2 text-[10px] font-mono text-sky-400/80 bg-slate-900/80 px-2 py-0.5 rounded">
                      LIVE_DIFFUSION_PARTICLES
                    </div>
                  </div>

                  {/* Dual Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Information Sharing Velocity</span>
                        <span className="font-bold text-sky-400">{shareRate}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Information Sharing Velocity slider"
                        min={10}
                        max={100}
                        value={shareRate}
                        onChange={(e) => {
                          setShareRate(Number(e.target.value));
                          audioManager.play('count');
                          if (predictionAnswers[1] !== undefined && !predictionVerified[1]) {
                            setPredictionVerified((prev) => ({ ...prev, [1]: true }));
                          }
                        }}
                        className="w-full accent-sky-400"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Framing Quality (Policy Demand Focus)</span>
                        <span className="font-bold text-indigo-400">{framingQuality}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Framing Quality slider"
                        min={10}
                        max={100}
                        value={framingQuality}
                        onChange={(e) => {
                          setFramingQuality(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-400"
                      />
                    </div>
                  </div>

                  {/* Verification Toggle & Gauge Metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-800/60 rounded-xl">
                    <motion.button
                      aria-label="Toggle Newsroom Verification Gate"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setVerificationActive(!verificationActive);
                        audioManager.play('tap');
                        if (predictionAnswers[1] !== undefined && !predictionVerified[1]) {
                          setPredictionVerified((prev) => ({ ...prev, [1]: true }));
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                        verificationActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      <span>{verificationActive ? '✓ 🛡️ Verification Gate: ACTIVE' : '✗ ⚠️ Verification Gate: BYPASSED'}</span>
                    </motion.button>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-400">Civic Mobilization: </span>
                        <strong className="text-emerald-400">✓ {simMovementStrength}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Misinformation Risk: </span>
                        <strong className={simMisinfoRisk > 50 ? 'text-rose-400' : 'text-amber-400'}>
                          {simMisinfoRisk > 50 ? '✗ ' : '✓ '}{simMisinfoRisk}%
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 1: Cyber Crime Threat Matrix ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'bullying', label: 'Online Bullying', icon: '🛑', law: 'IPC 506 / 509 & IT Act 67' },
                      { id: 'stalking', label: 'Cyber Stalking', icon: '👁️', law: 'IPC Section 354D' },
                      { id: 'trolling', label: 'Abusive Trolling', icon: '⚡', law: 'IT Rules 2021 Takedowns' },
                      { id: 'fraud', label: 'Online Fraud / UPI', icon: '💳', law: 'IPC 420 & IT Act 66D' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        aria-label={`Select cyber threat: ${item.label}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedThreat(item.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedThreat === item.id
                            ? 'bg-sky-500/20 border-sky-400 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-xl mb-1">{item.icon}</div>
                        <div className="font-bold text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-500 mt-1 truncate">{item.law}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Threat Detail Inspector */}
                  <motion.div
                    key={selectedThreat}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                  >
                    {selectedThreat === 'bullying' && (
                      <div>
                        <h4 className="font-bold text-sky-300 text-sm">Online Bullying (Cyberbullying)</h4>
                        <p className="text-slate-300 mt-1 leading-relaxed">
                          Repeated, intentional harassment targeted at a known peer (e.g. school confession pages). Distinct from offline bullying by <strong>persistence (24/7)</strong>, <strong>virality</strong>, and <strong>anonymity</strong>.
                        </p>
                        <div className="mt-2 text-emerald-400 font-semibold">
                          ✓ Reporting: cybercrime.gov.in • School Counselor • National Cyber Helpline 1930
                        </div>
                      </div>
                    )}
                    {selectedThreat === 'stalking' && (
                      <div>
                        <h4 className="font-bold text-sky-300 text-sm">Cyber Stalking (IPC 354D)</h4>
                        <p className="text-slate-300 mt-1 leading-relaxed">
                          Persistent unwanted electronic surveillance, monitoring GPS/Snapchat maps, and unsolicited repeated messaging without consent.
                        </p>
                        <div className="mt-2 text-emerald-400 font-semibold">
                          ✓ Reporting: State Cyber Cell • IPC 354D FIR • Evidence screenshot preservation
                        </div>
                      </div>
                    )}
                    {selectedThreat === 'trolling' && (
                      <div>
                        <h4 className="font-bold text-sky-300 text-sm">Provocative Trolling</h4>
                        <p className="text-slate-300 mt-1 leading-relaxed">
                          Deliberately posting inflammatory, abusive messages to provoke outrage or silence public figures/journalists. Governed by 36-hour takedown notices under IT Rules 2021.
                        </p>
                        <div className="mt-2 text-emerald-400 font-semibold">
                          ✓ Legal Note: Section 66A struck down in Shreya Singhal (2015); prosecuted under IPC 506/509.
                        </div>
                      </div>
                    )}
                    {selectedThreat === 'fraud' && (
                      <div>
                        <h4 className="font-bold text-sky-300 text-sm">Online Frauds & UPI Scams (IT Act 66D)</h4>
                        <p className="text-slate-300 mt-1 leading-relaxed">
                          Phishing, fake &quot;KBC WhatsApp lotteries&quot;, OTP theft, and QR code scams. Constitutes ~60% of all registered cyber crimes according to NCRB.
                        </p>
                        <div className="mt-2 text-emerald-400 font-semibold">
                          ✓ Immediate Action: Call 1930 Helpline immediately to freeze transaction channels.
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Multi-Representation Table */}
                  <div className="overflow-x-auto bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] font-bold text-slate-300 mb-2">
                      📊 Multi-Representation 1: Statutory Framework Comparison Table
                    </div>
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-sky-400">
                          <th className="p-1.5">Offence</th>
                          <th className="p-1.5">Target</th>
                          <th className="p-1.5">Applicable Indian Law</th>
                          <th className="p-1.5">Remedy / Redressal</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300 divide-y divide-slate-900">
                        <tr>
                          <td className="p-1.5 font-semibold text-rose-300">Cyberbullying</td>
                          <td className="p-1.5">Known Individual / Peer</td>
                          <td className="p-1.5">IPC 506, 509 & IT Act 67</td>
                          <td className="p-1.5">POCSO / School Grievance Cell</td>
                        </tr>
                        <tr>
                          <td className="p-1.5 font-semibold text-amber-300">Cyberstalking</td>
                          <td className="p-1.5">Targeted Individual</td>
                          <td className="p-1.5">IPC Section 354D</td>
                          <td className="p-1.5">State Police Cyber FIR</td>
                        </tr>
                        <tr>
                          <td className="p-1.5 font-semibold text-sky-300">Trolling</td>
                          <td className="p-1.5">Public Figures / Communities</td>
                          <td className="p-1.5">IT Rules 2021 Grievance Officer</td>
                          <td className="p-1.5">36-hour content removal notice</td>
                        </tr>
                        <tr>
                          <td className="p-1.5 font-semibold text-emerald-300">UPI Fraud</td>
                          <td className="p-1.5">Banking Account Holder</td>
                          <td className="p-1.5">IT Act Section 66D & IPC 420</td>
                          <td className="p-1.5 font-bold text-emerald-400">Dial Helpline 1930 / I4C</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: Netiquette Filter Lab ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Netiquettes prevent cyber conflict before it starts. Toggle the four syllabus rules below:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'identity', label: '1. Identification of Oneself', desc: 'No anonymous impersonation (IT Act 66D)' },
                      { key: 'privacy', label: '2. Respect Others Privacy', desc: 'No doxxing or unauthorized sharing (Puttaswamy 2017)' },
                      { key: 'language', label: '3. Appropriate Language & Imagery', desc: 'Respect Indias pluralistic society' },
                      { key: 'noSpam', label: '4. Do Not Spam', desc: 'No bulk chains ("forwarded many times")' },
                    ].map((rule) => (
                      <motion.button
                        key={rule.key}
                        aria-label={`Toggle rule: ${rule.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setNetiquetteFlags((prev) => ({
                            ...prev,
                            [rule.key as keyof typeof netiquetteFlags]: !prev[rule.key as keyof typeof netiquetteFlags],
                          }));
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border flex items-start justify-between ${
                          netiquetteFlags[rule.key as keyof typeof netiquetteFlags]
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                            : 'bg-rose-950/40 border-rose-500/60 text-rose-100'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs">{rule.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{rule.desc}</div>
                        </div>
                        <span className="text-xs font-bold ml-2 px-2 py-0.5 rounded bg-slate-900/80">
                          {netiquetteFlags[rule.key as keyof typeof netiquetteFlags] ? '✓ [ON]' : '✗ [OFF]'}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Community Health Indicator */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Digital Community Trust Score:</span>
                    <strong
                      className={`text-sm ${
                        Object.values(netiquetteFlags).filter(Boolean).length === 4
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {Object.values(netiquetteFlags).filter(Boolean).length === 4 ? '✓ ' : '⚠️ '}
                      {Object.values(netiquetteFlags).filter(Boolean).length * 25}%
                    </strong>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: The Jio 2016 Revolution & Dual Curve ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* PREDICTION 1: Jio 2016 Impact */}
                  {predictionAnswers[0] === undefined && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 space-y-3">
                      <p className="text-xs font-semibold text-indigo-200">
                        🔮 Prediction Challenge: {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePredictionSelect(0, i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 text-xs rounded-lg text-slate-200 border border-slate-700/60"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SVG 2: Dual Axis Curve */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                      <span>Diagram 2: The 2016 Telecom Inflection Curve (Dual Axis)</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                        Data vs Adoption
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 600 160"
                      className="w-full h-auto max-h-48"
                      role="img"
                      aria-label="SVG Chart showing Tariff dropping from 250 rupees down to 10 rupees while internet users rise from 200 million to 800 million"
                    >
                      <line x1="50" y1="130" x2="560" y2="130" stroke="#334155" strokeWidth="1" />
                      <line x1="50" y1="30" x2="50" y2="130" stroke="#334155" strokeWidth="1" />
                      <line x1="560" y1="30" x2="560" y2="130" stroke="#334155" strokeWidth="1" />

                      <text x="80" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">2014</text>
                      <text x="220" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">2016 (Jio Launch)</text>
                      <text x="360" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">2020</text>
                      <text x="500" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">2024</text>

                      <path
                        d="M 80 40 L 200 45 C 230 45, 250 115, 300 120 L 500 124"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                      />
                      <text x="140" y="36" fill="#fb7185" fontSize="9" fontWeight="bold">₹250/GB (Pre-Jio)</text>
                      <text x="440" y="118" fill="#fb7185" fontSize="9" fontWeight="bold">₹10/GB (Post-Jio)</text>

                      <path
                        d="M 80 120 L 200 115 C 240 110, 270 60, 360 45 L 500 35"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="4 2"
                      />
                      <text x="120" y="112" fill="#34d399" fontSize="9">200M Users</text>
                      <text x="440" y="30" fill="#34d399" fontSize="9" fontWeight="bold">820M+ Users</text>

                      <circle
                        cx={500 - ((dataCost - 10) / 240) * 300}
                        cy={124 - ((250 - dataCost) / 240) * 84}
                        r="5"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* OBSERVATION QUESTION 2 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-sky-800/40 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold">
                        👁️ Observation Check
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{OBSERVATION_QUESTIONS[1].prompt}</p>
                    <div className="space-y-1.5 pt-1">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservationAnswer(1, i)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                            obsAnswers[1] === i
                              ? obsFeedback[1]
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {obsAnswers[1] !== undefined && (
                      <p className="text-[11px] text-sky-300 mt-1">{OBSERVATION_QUESTIONS[1].explanation}</p>
                    )}
                  </div>

                  {/* Formula Display */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-slate-400">Formula Representation: </span>
                      <code className="bg-slate-950 px-2 py-0.5 rounded text-sky-300 font-mono text-[11px]">
                        Cost Drop % = ((₹250 - ₹{dataCost}) / ₹250) × 100 = {Math.round(((250 - dataCost) / 250) * 100)}%
                      </code>
                    </div>
                    <div className="text-emerald-400 font-bold">
                      ✓ Active Base: {simInternetUsers}M • OTT: {simOttPenetration}%
                    </div>
                  </div>

                  {/* Data Cost Slider */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Mobile 4G Data Tariff:</span>
                      <span className="font-bold text-sky-400 text-sm">₹{dataCost} per GB</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Mobile 4G Data Tariff slider in rupees per gigabyte"
                      min={10}
                      max={250}
                      step={10}
                      value={dataCost}
                      onChange={(e) => {
                        setDataCost(Number(e.target.value));
                        audioManager.play('count');
                        if (predictionAnswers[0] !== undefined && !predictionVerified[0]) {
                          setPredictionVerified((prev) => ({ ...prev, [0]: true }));
                        }
                      }}
                      className="w-full accent-sky-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Post-Jio Revolution (~₹10/GB)</span>
                      <span>Pre-2016 Legacy Tier (~₹250/GB)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: The 5 Dimensions of Media Convergence ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG 3: The 5 Dimensions Network Diagram */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                      <span>Diagram 3: The 5 Dimensions of Media Convergence Interlock</span>
                      <span className="text-[10px] text-indigo-400 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-800">
                        Jenkins Model
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 600 170"
                      className="w-full h-auto max-h-48"
                      role="img"
                      aria-label="SVG Network diagram showing 5 dimensions: Technological, Textual, Social, Economic, and Political connected to a central converged digital ecosystem"
                    >
                      <polygon
                        points="300,20 480,60 410,145 190,145 120,60"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />

                      <line x1="300" y1="85" x2="300" y2="25" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="300" y1="85" x2="480" y2="60" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="300" y1="85" x2="410" y2="145" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="300" y1="85" x2="190" y2="145" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="300" y1="85" x2="120" y2="60" stroke="#38bdf8" strokeWidth="1.5" />

                      <circle cx="300" cy="85" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="300" y="88" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">CONVERGED</text>

                      <circle cx="300" cy="25" r="18" fill={activeDimension === 'technological' ? '#0284c7' : '#1e293b'} stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="300" y="28" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">1. TECH</text>

                      <circle cx="480" cy="60" r="18" fill={activeDimension === 'textual' ? '#0284c7' : '#1e293b'} stroke="#818cf8" strokeWidth="1.5" />
                      <text x="480" y="63" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">2. TEXT</text>

                      <circle cx="410" cy="145" r="18" fill={activeDimension === 'social' ? '#0284c7' : '#1e293b'} stroke="#34d399" strokeWidth="1.5" />
                      <text x="410" y="148" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">3. SOCIAL</text>

                      <circle cx="190" cy="145" r="18" fill={activeDimension === 'economic' ? '#0284c7' : '#1e293b'} stroke="#fbbf24" strokeWidth="1.5" />
                      <text x="190" y="148" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">4. ECON</text>

                      <circle cx="120" cy="60" r="18" fill={activeDimension === 'political' ? '#0284c7' : '#1e293b'} stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="120" y="63" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">5. POL</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'technological', label: '1. Technological', sub: 'Devices merge' },
                      { id: 'textual', label: '2. Textual', sub: 'Transmedia stories' },
                      { id: 'social', label: '3. Social', sub: 'Prosumer audience' },
                      { id: 'economic', label: '4. Economic', sub: 'Conglomerates' },
                      { id: 'political', label: '5. Political', sub: 'Governance/IT Rules' },
                    ].map((dim) => (
                      <motion.button
                        key={dim.id}
                        aria-label={`Select dimension ${dim.label}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setActiveDimension(dim.id);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          activeDimension === dim.id
                            ? 'bg-sky-500/20 border-sky-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-[11px] truncate">{dim.label}</div>
                        <div className="text-[9px] text-slate-500 truncate">{dim.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dimension Case Viewer */}
                  <motion.div
                    key={activeDimension}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                  >
                    {activeDimension === 'technological' && (
                      <div>
                        <strong className="text-sky-300">✓ Hardware & Network Merging:</strong>
                        <p className="text-slate-300 mt-1">
                          The smartphone bundles an HD camera, FM radio, TV receiver, audio recorder, and newspaper press into a single handheld device connected via 4G/5G.
                        </p>
                        <span className="text-slate-400 italic">Example: JioPhone Next bundling OTT, UPI, and AI voice search for rural India.</span>
                      </div>
                    )}
                    {activeDimension === 'textual' && (
                      <div>
                        <strong className="text-sky-300">✓ Transmedia Content Flow:</strong>
                        <p className="text-slate-300 mt-1">
                          One core narrative remixing across text articles, vertical reels, podcasts, comic novels, and OTT series without format boundaries.
                        </p>
                        <span className="text-slate-400 italic">Example: The Bahubali franchise across films, Netflix anime, Graphic India comics & games.</span>
                      </div>
                    )}
                    {activeDimension === 'social' && (
                      <div>
                        <strong className="text-sky-300">✓ Audience Transformation (Prosumers):</strong>
                        <p className="text-slate-300 mt-1">
                          Audiences no longer passively consume scheduled broadcasts; they co-create, shoot eyewitness video, comment, and distribute.
                        </p>
                        <span className="text-slate-400 italic">Example: NDTV Citizen Journalist flood reporting & YouTube video commentary.</span>
                      </div>
                    )}
                    {activeDimension === 'economic' && (
                      <div>
                        <strong className="text-sky-300">✓ Corporate Media Consolidation:</strong>
                        <p className="text-slate-300 mt-1">
                          Mergers across broadcast TV, OTT streaming, film production, and sports rights to create integrated media conglomerates.
                        </p>
                        <span className="text-slate-400 italic">Example: The ₹70,000+ Cr Reliance-Disney Star merger approved by CCI in 2024.</span>
                      </div>
                    )}
                    {activeDimension === 'political' && (
                      <div>
                        <strong className="text-sky-300">✓ Governance & Multi-Jurisdiction Regulation:</strong>
                        <p className="text-slate-300 mt-1">
                          Regulatory convergence balancing MIB, TRAI, Press Council of India, and IT Rules 2021 over digital and OTT content.
                        </p>
                        <span className="text-slate-400 italic">Example: IT Rules 2021 3-tier self-regulation mechanism for OTT & digital news.</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Advance to next lab"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open digital newsroom sandbox"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-500/20"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🎛️</span> Digital Newsroom Sandbox (Ungraded Free Play)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tweak virality, algorithm echo-chambers, and netiquette enforcement freely.
                </p>
              </div>
              <motion.button
                aria-label="Proceed to graded challenge suite"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/20"
              >
                Ready for Challenges! →
              </motion.button>
            </div>
          </div>

          {/* Sandbox Interactive Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Audience Prosumer Share:</span>
                <strong className="text-sky-400">{audienceProsumerScore}%</strong>
              </div>
              <input
                type="range"
                aria-label="Audience Prosumer Share slider"
                min={0}
                max={100}
                value={audienceProsumerScore}
                onChange={(e) => setAudienceProsumerScore(Number(e.target.value))}
                className="w-full accent-sky-400"
              />
              <p className="text-[10px] text-slate-500">High share = Active user-generated citizen news</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Algorithmic Echo Bias:</span>
                <strong className="text-amber-400">{algorithmPolarization}%</strong>
              </div>
              <input
                type="range"
                aria-label="Algorithmic Echo Bias slider"
                min={0}
                max={100}
                value={algorithmPolarization}
                onChange={(e) => setAlgorithmPolarization(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <p className="text-[10px] text-slate-500">High bias = Polarized echo chambers</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Data Cost per GB:</span>
                <strong className="text-emerald-400">₹{dataCost}</strong>
              </div>
              <input
                type="range"
                aria-label="Data Cost per Gigabyte slider"
                min={10}
                max={250}
                step={10}
                value={dataCost}
                onChange={(e) => setDataCost(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <p className="text-[10px] text-slate-500">Low cost = Democratized multi-platform reach</p>
            </div>
          </div>

          {/* Output Dashboard */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Democratic Voice</div>
              <div className="text-base font-extrabold text-sky-400 mt-1">
                ✓ {Math.round((audienceProsumerScore * 0.6 + (250 - dataCost) * 0.2))} pts
              </div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Polarization Risk</div>
              <div className="text-base font-extrabold text-amber-400 mt-1">
                {algorithmPolarization > 50 ? '✗ ' : '✓ '}{algorithmPolarization}%
              </div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Digital Reach</div>
              <div className="text-base font-extrabold text-emerald-400 mt-1">✓ {simInternetUsers}M</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Convergence Index</div>
              <div className="text-base font-extrabold text-indigo-400 mt-1">✓ 94.2 / 100</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Status & Adaptive Tier Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 capitalize">Type: {challenge.type}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">BKT Adaptive Level:</span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                }`}
              >
                {difficulty.toUpperCase()}
              </motion.span>
              <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-mono">
                NEP: {challenge.competencyLevel}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Box */}
          <div
            className={`p-5 sm:p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Select option ${i + 1}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/60 text-slate-500 border border-slate-800'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                        )}
                        {showExplanation && i !== challenge.correctIndex && (
                          <span className="text-slate-500 text-xs ml-2">✗</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable media label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'box_web', desc: 'Hyperlinked browser pages with 24/7 news updatability' },
                    { id: 'box_app', desc: 'Installed software with push alerts & offline caching' },
                    { id: 'box_pod', desc: 'Episodic on-demand RSS audio (Seen & Unseen)' },
                    { id: 'box_phone', desc: 'Handheld converged gateway with 600M+ users' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      aria-label={`Drop target for ${target.desc}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 hover:border-sky-400 transition-colors min-h-[80px] flex flex-col justify-between"
                    >
                      <div className="text-[11px] text-slate-400">{target.desc}</div>
                      <div className="mt-2 font-bold text-xs text-sky-300">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dropped media labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-sky-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Labels →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in correct hierarchical order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length > 0
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort position ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check sequence order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSortSubmit()}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-sky-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label={`Enter numeric answer in ${challenge.unit}`}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-400"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    className="px-5 py-2 bg-sky-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Submit →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add workflow component: ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs rounded-lg font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2.5 py-1 bg-sky-950 text-sky-200 border border-sky-800 text-xs rounded-lg flex items-center gap-1.5"
                    >
                      <span>✓ {part}</span>
                      <button
                        aria-label={`Remove ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble workflow</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify assembled workflow"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-sky-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Workflow →
                </motion.button>
              </div>
            )}

            {/* Stepwise Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-amber-300 text-xs uppercase tracking-wider">
                    Structured Board Solution:
                  </strong>
                  <span className="text-[10px] text-amber-400/80">ISC Examiner Criterion</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{i + 1}. </span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-amber-900/60">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next sentence of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-3 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <div className="text-[11px] text-emerald-400 font-semibold">✓ Full explanation revealed</div>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Proceed to next challenge or final score"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 rounded-2xl border border-sky-800/40 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">🎉 Simulation Complete!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You navigated the digital public sphere, solved cyber crime scenarios, upheld netiquettes, and applied multi-dimensional media convergence.
            </p>

            <div className="flex justify-center gap-6 pt-3">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 min-w-[120px]">
                <div className="text-[10px] text-slate-400 uppercase">Board Score</div>
                <div className="text-2xl font-black text-sky-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 min-w-[120px]">
                <div className="text-[10px] text-slate-400 uppercase">Mastery Tier</div>
                <div className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs sm:text-sm text-emerald-200">
            {errors === 0
              ? '🏆 PERFECT SCORE! Exemplary command over ISC Mass Media & Communication syllabus.'
              : errors <= 3
              ? '🌟 Excellent performance! Review the specific misconception nodes below to lock in top band marks.'
              : '🌱 Good effort! Digital media regulation and convergence are intricate. Review the misconception card below.'}
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Identified Board Misconception Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl text-xs text-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <strong className="text-amber-300 text-sm flex items-center gap-1.5">
                <span>🗓️</span> Spaced Repetition Schedule (SM-2 Algorithm)
              </strong>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
                Review in {reviewIntervalDays} {reviewIntervalDays === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="text-slate-300 text-xs">
              Based on your accuracy ({Math.max(0, 100 - errors * 5)}%), your optimal memory retention window is set to{' '}
              <span className="text-amber-300 font-bold">{reviewIntervalDays} {reviewIntervalDays === 1 ? 'day' : 'days'}</span>.
              Log back in on that date to complete a 3-minute rapid booster quiz!
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <span>🎯</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-sky-400">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BUBBLE OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MassMediaRoleSocialMediaSim;