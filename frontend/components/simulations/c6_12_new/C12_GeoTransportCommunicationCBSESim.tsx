'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. ALL NODE IDS DEFINITION (62 NODES)
// ==========================================
const ALL_NODE_IDS = [
  'c12_geo_cbse_496', 'c12_geo_cbse_497', 'c12_geo_cbse_498', 'c12_geo_cbse_499', 'c12_geo_cbse_500',
  'c12_geo_cbse_501', 'c12_geo_cbse_502', 'c12_geo_cbse_503', 'c12_geo_cbse_504', 'c12_geo_cbse_505',
  'c12_geo_cbse_506', 'c12_geo_cbse_507', 'c12_geo_cbse_508', 'c12_geo_cbse_509', 'c12_geo_cbse_510',
  'c12_geo_cbse_511', 'c12_geo_cbse_512', 'c12_geo_cbse_513', 'c12_geo_cbse_514', 'c12_geo_cbse_515',
  'c12_geo_cbse_516', 'c12_geo_cbse_517', 'c12_geo_cbse_518', 'c12_geo_cbse_519', 'c12_geo_cbse_520',
  'c12_geo_cbse_521', 'c12_geo_cbse_522', 'c12_geo_cbse_523', 'c12_geo_cbse_524', 'c12_geo_cbse_525',
  'c12_geo_cbse_526', 'c12_geo_cbse_527', 'c12_geo_cbse_528', 'c12_geo_cbse_529', 'c12_geo_cbse_530',
  'c12_geo_cbse_531', 'c12_geo_cbse_532', 'c12_geo_cbse_533', 'c12_geo_cbse_534', 'c12_geo_cbse_535',
  'c12_geo_cbse_536', 'c12_geo_cbse_537', 'c12_geo_cbse_538', 'c12_geo_cbse_539', 'c12_geo_cbse_540',
  'c12_geo_cbse_541', 'c12_geo_cbse_542', 'c12_geo_cbse_543', 'c12_geo_cbse_544', 'c12_geo_cbse_545',
  'c12_geo_cbse_546', 'c12_geo_cbse_547', 'c12_geo_cbse_548', 'c12_geo_cbse_549', 'c12_geo_cbse_550',
  'c12_geo_cbse_551', 'c12_geo_cbse_552', 'c12_geo_cbse_553', 'c12_geo_cbse_554', 'c12_geo_cbse_555',
  'c12_geo_cbse_556', 'c12_geo_cbse_557'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// 2. MANDATORY SECTIONS: SCENARIO & DISCOVERY
// ==========================================
const SCENARIO = {
  title: 'Global Infrastructure & Logistics Control Center',
  intro: 'You are appointed Director-General of Global Infrastructure and Multimodal Logistics. Your mandate is to design, optimize, and manage inter-continental transport arteries, maritime chokepoints, transcontinental railways, telecommunication satellites, and subsea fiber optic networks.',
  context: 'To conquer friction of distance and accelerate economic development, you will simulate node-link graph connectivity, optimize trans-oceanic transit through the Suez and Panama Canals, evaluate gauge conversion on Indian Railways, manage air corridors under the UDAN scheme, and deploy INSAT/IRS satellite networks.'
};

const DISCOVERY_QUESTION = {
  question: 'Why does shipping bulk iron ore from Tubarão (Brazil) to East Asian steel mills remain vastly cheaper per ton-kilometer than hauling it just 600 km inland by heavy-haul freight trains?',
  options: [
    'Rail tracks experience magnetic drag from iron ore cargo that doubles diesel consumption.',
    'Water transport has zero friction of path, massive economy of vessel scale (Very Large Ore Carriers), and low infrastructure maintenance cost per ton.',
    'Ships consume solar energy during ocean crossings, eliminating fuel expenditure entirely.',
    'Highways and railways pay mandatory tariffs to international maritime organizations.'
  ],
  correctIndex: 1,
  hintAfter: 'Waterways provide natural, unpaved rights-of-way with minimal friction; mega-freighters spread capital costs over hundreds of thousands of tons.'
};

// ==========================================
// 3. MANDATORY SECTION: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Transport Network Topology & Connectivity Indices',
    instruction: 'Construct topological networks with nodes (cities) and links (highways/rails). Compute Alpha, Beta, and Gamma connectivity indices to evaluate transport density.',
    interactionType: 'graph-builder',
    nodeId: 'c12_geo_cbse_498' as NodeId
  },
  {
    title: 'Lab 2: Maritime Chokepoints & Inland Waterway Hydraulics',
    instruction: 'Compare sea-level canal locks vs lockless canals. Simulate transit time, toll costs, and fuel savings across the Suez Canal, Panama Canal, and Rhine-Danube waterways.',
    interactionType: 'maritime-simulator',
    nodeId: 'c12_geo_cbse_532' as NodeId
  },
  {
    title: 'Lab 3: Trans-Continental Rail Systems & Gauge Standardization',
    instruction: 'Analyze rail density along the Trans-Siberian, Trans-Canadian, and Indian Railways. Compare Broad, Meter, and Narrow gauges and test Project Unigauge throughput.',
    interactionType: 'railway-gauge-analyzer',
    nodeId: 'c12_geo_cbse_520' as NodeId
  },
  {
    title: 'Lab 4: Highway Corridors, Aviation & UDAN Regional Logistics',
    instruction: 'Map Golden Quadrilateral expressways, BRO border roads, and regional airport networks under the UDAN scheme to optimize passenger accessibility.',
    interactionType: 'highway-aviation-matrix',
    nodeId: 'c12_geo_cbse_503' as NodeId
  },
  {
    title: 'Lab 5: Satellite Communications, Subsea Optic Fiber & Cyberspace',
    instruction: 'Simulate GEO vs LEO satellite constellations (INSAT & IRS) and subsea optic fiber cable bandwidth to eliminate the global digital divide.',
    interactionType: 'telecom-cyberspace-lab',
    nodeId: 'c12_geo_cbse_547' as NodeId
  }
];

// ==========================================
// 4. MANDATORY SECTION: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the Suez Canal is blocked for 12 days, forcing container ships to detour around the Cape of Good Hope, what will happen to shipping costs and global supply chain transit times?',
    options: [
      'Transit times increase by 10-14 days; charter rates and bunker fuel costs surge by over 40-60%.',
      'Transit times decrease because open ocean speeds are 3 times faster than canal transit.',
      'Global freight rates drop due to reduced canal toll expenditures.',
      'Rail transport across Asia automatically replaces all maritime trade within 24 hours.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Use Lab 2 (Maritime Chokepoints) to switch maritime routes from Suez to Cape of Good Hope and observe freight cost dynamics.',
    nodeId: 'c12_geo_cbse_532' as NodeId
  },
  {
    question: 'Predict: What is the primary operational consequence of replacing multi-gauge rail networks (Meter and Narrow Gauge) with uniform Broad Gauge under Indian Railways’ Project Unigauge?',
    options: [
      'Trains are restricted to maximum speeds of 30 km/h due to wider rail spacing.',
      'Transshipment delays and cargo damage at gauge break-of-bulk points are eliminated, increasing freight speed.',
      'Fuel consumption triples because wider tracks increase wheel friction by 300%.',
      'Passenger capacity drops by half to accommodate wider locomotive engines.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test gauge conversion in Lab 3 to measure transshipment time savings and cargo throughput.',
    nodeId: 'c12_geo_cbse_521' as NodeId
  }
];

// ==========================================
// 5. MANDATORY SECTION: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the spatial distribution of dense rail networks across northern plains versus the northeastern hill states of India?',
    observableOptions: [
      'The northern plains have dense grid-like rail networks due to flat terrain, high population density, and agriculture, while rugged relief limits mountain rail lines.',
      'Hilly northeastern states possess 50% more broad-gauge tracks than the Indo-Gangetic plain.',
      'Railways in plain regions only run parallel to river channels to avoid bridge construction.',
      'Mountainous terrain encourages high-speed electric lines due to lower construction costs.'
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_555' as NodeId
  },
  {
    question: 'What happens to latency and data throughput when international internet traffic transitions from satellite relays to subsea optic fiber cables (OFC)?',
    observableOptions: [
      'Latency drops dramatically from ~500 ms to <50 ms, while throughput expands from megabits to terabits per second.',
      'Optic fiber cables experience extreme ionospheric atmospheric noise, reducing speed by 80%.',
      'Data speed drops because light moves slower inside glass cores than radio waves in open air.',
      'Satellite networks carry 99% of global internet traffic due to zero physical maintenance requirements.'
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_556' as NodeId
  }
];

// ==========================================
// 6. MANDATORY SECTION: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Multimodal Transport & Telecommunication Infrastructure Audit',
  description: 'Evaluate a real-world supply chain route from the industrial cluster of Ludhiana (Punjab) to Rotterdam Port (Netherlands). Calculate transport costs, transshipment delays, mode selection, and optic fiber data synchronization speed.',
  steps: [
    'Step 1: Compute land leg via Dedicated Freight Corridor (Broad Gauge Rail) from Ludhiana to Jawaharlal Nehru Port Trust (JNPT), Mumbai (1,400 km).',
    'Step 2: Simulate maritime route through Arabian Sea, Babel-Mandeb Strait, Red Sea, Suez Canal, Mediterranean, and English Channel (6,300 nautical miles).',
    'Step 3: Analyze trade-offs of air freight via Indira Gandhi International Airport (DEL) to Amsterdam (AMS) vs ocean freight for perishable goods.',
    'Step 4: Formulate an emergency failover route via the International North-South Transport Corridor (INSTC) via Iran and Russia during Suez blockages.'
  ]
};

// ==========================================
// 7. MISCONCEPTIONS & CORRECTIONS (6 ITEMS)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Air transport is always the best mode of transport because it is the fastest.',
    correction: 'Air transport has extremely high operational costs and low load capacity, making it unviable for heavy bulk commodities like coal, iron ore, or crude oil.'
  },
  {
    id: 'misc_2',
    misconception: 'The Suez Canal uses locks like the Panama Canal to raise ships over elevated land.',
    correction: 'The Suez Canal is a sea-level waterway without locks because the Mediterranean and Red Seas have nearly identical sea surface elevations.'
  },
  {
    id: 'misc_3',
    misconception: 'Narrow gauge railways carry more freight capacity than broad gauge railways.',
    correction: 'Broad gauge (1.676 m in India) provides superior lateral stability, higher axle-load capacity, and faster speeds compared to narrow gauge (0.762 m).'
  },
  {
    id: 'misc_4',
    misconception: 'Satellites transmit 100% of global internet traffic across continents.',
    correction: 'Over 95-99% of international internet and data transmission relies on undersea optic fiber cables due to vastly superior bandwidth and lower latency.'
  },
  {
    id: 'misc_5',
    misconception: 'Pipelines can only transport liquid commodities like crude oil and refined petroleum.',
    correction: 'Pipelines can transport gases (natural gas) and solids converted into slurry (e.g., iron ore slurry pipelines).'
  },
  {
    id: 'misc_6',
    misconception: 'Pradhan Mantri Gram Sadak Yojana (PMGSY) focuses on building multi-lane National Highways.',
    correction: 'PMGSY is exclusively dedicated to providing all-weather rural road connectivity to unconnected habitations in India.'
  }
];

// ==========================================
// 8. DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which index measures network connectivity by dividing the total number of links (e) by the total number of nodes (v)?',
    options: ['Alpha Index', 'Beta Index', 'Gamma Index', 'Eta Index'],
    correctIndex: 1,
    explanation: 'Beta Index = e / v. Higher Beta values indicate higher network connectivity and structural complexity.'
  },
  {
    id: 'diag_2',
    question: 'Which sea route is known as the busiest ocean waterway in the world, connecting North America and Western Europe?',
    options: ['North Atlantic Sea Route', 'Cape of Good Hope Route', 'South Atlantic Route', 'North Pacific Route'],
    correctIndex: 0,
    explanation: 'The North Atlantic Sea Route carries over one-fourth of the world’s seaborne foreign trade, connecting two highly industrialized regions.'
  },
  {
    id: 'diag_3',
    question: 'What is the standard gauge width adopted by Indian Railways for Broad Gauge tracks?',
    options: ['1.000 meter', '1.676 meters', '0.762 meter', '1.435 meters'],
    correctIndex: 1,
    explanation: 'Broad Gauge in India measures 1.676 meters (5 ft 6 in) between inner rail heads.'
  },
  {
    id: 'diag_4',
    question: 'Which agency is responsible for constructing and maintaining roads in strategic border areas of India?',
    options: ['NHAI', 'State PWD', 'Border Roads Organisation (BRO)', 'CPWD'],
    correctIndex: 2,
    explanation: 'BRO was established in 1960 to build and maintain strategic infrastructure along northern and northeastern borders.'
  },
  {
    id: 'diag_5',
    question: 'Which inland waterway connects the industrial heartlands of Germany, France, Switzerland, and the Netherlands to the North Sea?',
    options: ['Mississippi River', 'Rhine Waterway', 'St. Lawrence Seaway', 'Volga Waterway'],
    correctIndex: 1,
    explanation: 'The Rhine flows through rich coalfields and industrial zones, making it the world’s most heavily navigated inland waterway.'
  },
  {
    id: 'diag_6',
    question: 'What is the primary objective of the UDAN scheme in Indian Civil Aviation?',
    options: ['Manufacturing commercial aircraft', 'Enhancing regional air connectivity to unserved airports with affordable airfares', 'Privatizing international hubs', 'Constructing spaceports'],
    correctIndex: 1,
    explanation: 'UDAN (Ude Desh ka Aam Nagrik) aims to make regional air travel affordable and connect tier-2 and tier-3 cities.'
  },
  {
    id: 'diag_7',
    question: 'Which satellite series developed by India is specifically designed for Earth observation and remote sensing of natural resources?',
    options: ['INSAT series', 'IRS series', 'GSAT series', 'Kalpana series'],
    correctIndex: 1,
    explanation: 'IRS (Indian Remote Sensing) satellites operate in sun-synchronous polar orbits for earth resource inventory and monitoring.'
  },
  {
    id: 'diag_8',
    question: 'Which transcontinental railway connects St. Petersburg in western Russia to Vladivostok on the Pacific coast?',
    options: ['Trans-Canadian Railway', 'Trans-Siberian Railway', 'Australian Trans-Continental Railway', 'Union Pacific Railway'],
    correctIndex: 1,
    explanation: 'The Trans-Siberian Railway stretches 9,289 km across two continents, making it the longest double-tracked electric railway line in the world.'
  }
];

// ==========================================
// 9. 22+ PROGRESSIVE CHALLENGES (TIERS 1, 2, 3)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'classification' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c_1',
    nodeId: 'c12_geo_cbse_496',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Why is transport classified as an economic and social infrastructure?',
    options: [
      'It creates physical terrain features like mountain ranges.',
      'It enables spatial mobility of goods, labor, services, and ideas, integrating production and market nodes.',
      'It replaces agriculture and manufacturing completely in developing nations.',
      'It restricts international trade to neighboring border posts.'
    ],
    correctIndex: 1,
    explanation: 'Transport provides the physical linkage that binds spatial units, allows trade, mobilizes labor, and fosters socio-economic integration.',
    hints: ['Think about how raw materials reach factories and workers reach jobs.', 'Infrastructure enables trade.', 'Mobility unlocks economic value.']
  },
  {
    id: 'c_2',
    nodeId: 'c12_geo_cbse_498',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'In spatial network analysis, what does a "Node" represent?',
    options: [
      'The route connecting two towns.',
      'The meeting point of two or more routes, or an origin/destination settlement.',
      'The speed of a freight train.',
      'The cost per ton-kilometer of cargo.'
    ],
    correctIndex: 1,
    explanation: 'A Node (vertex) is a point/settlement in a network, while a Link (edge) is the route connecting two nodes.',
    hints: ['Nodes are vertices.', 'Cities or terminals act as nodes.', 'Links connect nodes.']
  },
  {
    id: 'c_3',
    nodeId: 'c12_geo_cbse_500',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which transport mode offers door-to-door service with maximum flexibility for short distance carriage?',
    options: ['Railways', 'Road Transport', 'Ocean Waterways', 'Pipelines'],
    correctIndex: 1,
    explanation: 'Road transport provides direct door-to-door connectivity, flexible routing, and immediate loading without break-of-bulk transshipment.',
    hints: ['Which mode drives directly up to your house?', 'Trucks vs Trains vs Ships.', 'Door-to-door mobility.']
  },
  {
    id: 'c_4',
    nodeId: 'c12_geo_cbse_503',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which statutory autonomous body is responsible for the development, maintenance, and management of National Highways in India?',
    options: ['CPWD', 'NHAI (National Highways Authority of India)', 'State PWD', 'BRO'],
    correctIndex: 1,
    explanation: 'NHAI, established under the NHAI Act 1988 and operational since 1995, oversees the National Highway system in India.',
    hints: ['Look for NHAI.', 'Operational since mid-1990s.', 'Manages interstate highway corridors.']
  },
  {
    id: 'c_5',
    nodeId: 'c12_geo_cbse_516',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the track gauge width of Standard Gauge used widely in global urban Metro systems?',
    options: ['1.676 m', '1.435 m', '1.000 m', '0.762 m'],
    correctIndex: 1,
    explanation: 'Standard Gauge is 1.435 meters (4 ft 8.5 in), widely used across North America, Europe, and modern urban Metro rail networks.',
    hints: ['1.435 meters.', 'Standard worldwide metro gauge.', 'Slightly narrower than Indian Broad Gauge (1.676m).']
  },
  {
    id: 'c_6',
    nodeId: 'c12_geo_cbse_532',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which ocean canal connects the Mediterranean Sea directly to the Red Sea, eliminating the long voyage around Africa?',
    options: ['Panama Canal', 'Suez Canal', 'Kiel Canal', 'Erie Canal'],
    correctIndex: 1,
    explanation: 'Opened in 1869, the Suez Canal links Port Said on the Mediterranean with Port Suez on the Red Sea.',
    hints: ['Constructed across the Isthmus of Suez in Egypt.', 'No locks needed.', 'Opens directly to the Red Sea.']
  },
  {
    id: 'c_7',
    nodeId: 'c12_geo_cbse_547',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which Indian satellite system is dedicated to telecommunication, meteorological observation, and TV broadcasting?',
    options: ['IRS (Indian Remote Sensing)', 'INSAT (Indian National Satellite)', 'Cartosat', 'Astrosat'],
    correctIndex: 1,
    explanation: 'INSAT is a multipurpose geostationary satellite system commissioned for telecommunications, weather forecasting, and broadcasting.',
    hints: ['INSAT stands for Indian National Satellite System.', 'Geostationary orbit.', 'Handles telecommunications.']
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c_8',
    nodeId: 'c12_geo_cbse_498',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Analysis',
    question: 'A transport graph has 12 nodes (v) and 18 links (e). Calculate the Beta Index (β = e / v) of this transport network.',
    correctAnswer: 1.5,
    tolerance: 0.05,
    explanation: 'Beta Index β = e / v = 18 / 12 = 1.5. A value > 1 indicates a high degree of network connectivity with loops.',
    hints: ['Divide number of edges by number of vertices.', 'β = 18 / 12.', 'Result is 1.5.']
  },
  {
    id: 'c_9',
    nodeId: 'c12_geo_cbse_505',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'The Golden Quadrilateral project links which four major megacities of India?',
    options: [
      'Delhi - Mumbai - Chennai - Kolkata',
      'Srinagar - Kanyakumari - Silchar - Porbandar',
      'Ahmedabad - Hyderabad - Bengaluru - Kochi',
      'Lucknow - Patna - Guwahati - Bhubaneswar'
    ],
    correctIndex: 0,
    explanation: 'The Golden Quadrilateral connects Delhi, Mumbai, Chennai, and Kolkata, spanning approximately 5,846 km.',
    hints: ['The 4 primary metropolitan pillars of India.', 'Delhi in North, Mumbai in West, Chennai in South, Kolkata in East.']
  },
  {
    id: 'c_10',
    nodeId: 'c12_geo_cbse_520',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Computation',
    question: 'The Trans-Siberian Railway covers a distance of 9,289 km. If a heavy freight train runs at an average speed of 65 km/h including technical stops, how many hours does it take to cross Eurasia from Moscow to Vladivostok?',
    correctAnswer: 142.9,
    tolerance: 1.0,
    explanation: 'Time = Distance / Speed = 9289 km / 65 km/h ≈ 142.91 hours (roughly 5.95 days).',
    hints: ['Time = Distance / Speed', '9289 / 65', 'Approximately 142.9 hours.']
  },
  {
    id: 'c_11',
    nodeId: 'c12_geo_cbse_525',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is the Konkan Railway considered an engineering marvel in Western India?',
    options: [
      'It was constructed entirely underwater without bridges.',
      'It traverses 760 km across mountain rivers, 2,000 bridges, and 91 tunnels through Western Ghats coastal terrain.',
      'It runs on magnetic levitation (Maglev) technology.',
      'It was built without using steel tracks or ballast.'
    ],
    correctIndex: 1,
    explanation: 'Konkan Railway connects Roha to Mangaluru through rugged terrain requiring 91 tunnels (including Karbude tunnel 6.5km) and over 2,000 bridges.',
    hints: ['Crosses the Western Ghats (Sahyadri).', 'Requires dozens of long tunnels and tall viaducts.', 'Links Roha to Mangaluru.']
  },
  {
    id: 'c_12',
    nodeId: 'c12_geo_cbse_534',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How does the Panama Canal differ fundamentally from the Suez Canal in terms of engineering design?',
    options: [
      'Panama Canal is at sea-level while Suez Canal uses 12 lock gates.',
      'Panama Canal uses a freshwater lock system to raise ships 26 meters over Gatun Lake, whereas Suez is a sea-level lockless canal.',
      'Panama Canal only allows wooden sailing ships.',
      'Suez Canal is built through high mountain ranges using tunnels.'
    ],
    correctIndex: 1,
    explanation: 'Panama Canal relies on locks (Miraflores, Pedro Miguel, Gatun) to lift vessels across the Continental Divide via Gatun Lake, whereas Suez is sea-level.',
    hints: ['Gatun Lake is elevated above sea level.', 'Locks act as water elevators.', 'Suez is flat sea-level.']
  },
  {
    id: 'c_13',
    nodeId: 'c12_geo_cbse_540',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which European river waterway connects the Ruhr industrial region of Germany directly to the world seaport of Rotterdam?',
    options: ['Danube River', 'Rhine Waterway', 'Volga River', 'Thames River'],
    correctIndex: 1,
    explanation: 'The Rhine flows through Switzerland, Germany, and Netherlands, serving industrial coalfields and heavy chemical hubs with Rotterdam at its mouth.',
    hints: ['Flows into Rotterdam port.', 'World’s busiest industrial inland waterway.', 'Connects the Ruhr coal/steel valley.']
  },
  {
    id: 'c_14',
    nodeId: 'c12_geo_cbse_552',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What makes cross-country pipelines the most cost-effective mode for transporting petroleum products inland?',
    options: [
      'High initial capital cost but extremely low operating cost, zero transshipment loss, continuous uninterrupted flow, and immunity to surface traffic.',
      'Pipelines use zero energy because gravity pulls oil upward.',
      'Pipelines can carry dry goods like cotton and coal without modification.',
      'Pipelines do not require any land acquisition rights.'
    ],
    correctIndex: 0,
    explanation: 'Pipelines require high upfront capital for laying, but provide round-the-clock uninterrupted liquid/gas movement with minimal maintenance and low operational cost.',
    hints: ['Continuous flow without traffic jams.', 'Low operational maintenance.', 'High capital outlay initially.']
  },
  {
    id: 'c_15',
    nodeId: 'c12_geo_cbse_556',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Computation',
    question: 'A trans-oceanic fiber optic cable has a length of 6,600 km. If light signals propagate through silica glass fiber core at a speed of 200,000 km/s, calculate the one-way signal latency in milliseconds (ms).',
    correctAnswer: 33.0,
    tolerance: 0.5,
    explanation: 'Latency = Distance / Speed = 6600 km / 200,000 km/s = 0.033 seconds = 33 milliseconds.',
    hints: ['Time (seconds) = Distance / Speed', '6600 / 200000 = 0.033 s', 'Multiply by 1000 to get ms = 33 ms.']
  },

  // --- ADVANCED TIER (7+ Challenges) ---
  {
    id: 'c_16',
    nodeId: 'c12_geo_cbse_498',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'Calculate the Gamma Index (γ = e / [3(v - 2)]) for a regional network with v = 10 nodes and e = 16 links. Give the answer as a decimal rounded to two places.',
    correctAnswer: 0.67,
    tolerance: 0.02,
    explanation: 'Gamma Index γ = e / [3(v - 2)] = 16 / [3(10 - 2)] = 16 / [3 * 8] = 16 / 24 = 0.666... ≈ 0.67.',
    hints: ['Formula: γ = e / [3(v - 2)]', 'v - 2 = 8. 3 * 8 = 24.', '16 / 24 = 0.67.']
  },
  {
    id: 'c_17',
    nodeId: 'c12_geo_cbse_521',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Evaluate the economic impact of Project Unigauge executed by Indian Railways since 1992.',
    options: [
      'It reduced rail network capacity by standardizing all tracks to narrow mountain gauge.',
      'It eliminated transshipment delays at break-of-bulk gauge joints, expanded freight throughput, reduced operating costs, and integrated backward regions into national trunk routes.',
      'It increased imported diesel dependence by banning electric traction.',
      'It forced all freight traffic onto coastal ships instead of railways.'
    ],
    correctIndex: 1,
    explanation: 'Project Unigauge converted meter and narrow gauge lines to Broad Gauge (1.676m), enabling seamless long-distance freight movement without costly transshipment delays.',
    hints: ['Think about break-of-bulk points where freight had to be manually transferred.', 'Standardization speeds up logistics.']
  },
  {
    id: 'c_18',
    nodeId: 'c12_geo_cbse_530',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Evaluation',
    question: 'Why is the North Atlantic Ocean Route historically and economically termed the "Big Trunk Route"?',
    options: [
      'It traverses tropical islands producing rubber and spices exclusively.',
      'It connects two of the world’s most advanced, highly urbanized, and industrialized regions (Eastern North America and Western Europe), handling 25% of global maritime trade.',
      'It is the only sea route with zero ocean storms or icebergs.',
      'It is owned by a single international shipping monopoly.'
    ],
    correctIndex: 1,
    explanation: 'The North Atlantic connects Western Europe and Eastern North America—the world’s two largest industrial cores—resulting in the highest volume of high-value seaborne cargo.',
    hints: ['Connects USA/Canada with Western Europe.', 'High industrial volume.', '25% of global foreign trade.']
  },
  {
    id: 'c_19',
    nodeId: 'c12_geo_cbse_537',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How does the UDAN (Ude Desh ka Aam Nagrik) regional connectivity scheme impact spatial accessibility and socio-economic integration in India?',
    options: [
      'By replacing high-speed rail with supersonic jet airliners on major metro routes.',
      'By subsidizing airfares and upgrading unserved/underserved regional airstrips, enabling air connectivity to tier-2/3 towns and hilly isolated terrains.',
      'By building sea locks in landlocked Himalayan valleys.',
      'By banning private airline carriers from operating domestic routes.'
    ],
    correctIndex: 1,
    explanation: 'UDAN incentivizes airlines via Viability Gap Funding (VGF) to operate routes connecting tier-2/3 cities and remote regions, democratizing regional aviation.',
    hints: ['UDAN targets tier-2 and tier-3 unserved airports.', 'Uses Viability Gap Funding to lower airfares.']
  },
  {
    id: 'c_20',
    nodeId: 'c12_geo_cbse_544',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'What is the strategic significance of the Great Lakes - St. Lawrence Seaway inland navigation system in North America?',
    options: [
      'It allows ocean-going freighters to penetrate deep into the heart of the North American continent, linking Midwest grain belts and iron ranges directly to Atlantic trade routes via canals and locks.',
      'It is restricted strictly to wooden kayaks and leisure vessels.',
      'It bypasses the Atlantic Ocean by draining into the Pacific Ocean via Rocky Mountain canals.',
      'It provides natural sea-level passage with zero locks across Niagara Falls.'
    ],
    correctIndex: 0,
    explanation: 'The St. Lawrence Seaway combines deep rivers, lakes, and locks (Welland Canal bypassing Niagara Falls) to let ocean cargo ships sail 3,700 km into Duluth, Minnesota.',
    hints: ['Connects the US/Canada Midwest to the Atlantic.', 'Bypasses Niagara Falls using Welland Canal locks.']
  },
  {
    id: 'c_21',
    nodeId: 'c12_geo_cbse_557',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'What is meant by the geographic concept of "Time-Space Compression" in modern cyberspace and transport geography?',
    options: [
      'Physical land distance shrinks geographically due to continental drift.',
      'The shrinking of perceived time and distance between places due to ultra-fast transport networks (high-speed rail/air) and instant telecommunication (cyberspace).',
      'The slowdown of economic activity during global financial recessions.',
      'The physical compression of fiber optic cables under sea pressure.'
    ],
    correctIndex: 1,
    explanation: 'Time-Space Compression (David Harvey) describes how modern telecommunication and high-speed transit reduce the time required to cross space, making distant places feel adjacent.',
    hints: ['Physical distance remains fixed, but travel/communication time dramatically drops.', 'Cyberspace enables instant global interaction.']
  },
  {
    id: 'c_22',
    nodeId: 'c12_geo_cbse_551',
    type: 'classification',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Decision Making',
    question: 'Select the optimal mode of transport for exporting 100,000 metric tons of raw iron ore from Goa to Tokyo (Japan).',
    options: ['Air Freight', 'Capesize Ocean Bulk Carrier', 'Trans-Siberian Railway Freight Train', 'Cross-Country Slurry Pipeline'],
    correctIndex: 1,
    explanation: 'Massive heavy bulk raw materials across oceans are economically transported only by Large Bulk Ocean Carriers due to unmatched economies of scale.',
    hints: ['100,000 tons across the ocean.', 'Ocean bulk carrier is required.']
  }
];

// ==========================================
// 10. CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const MaritimeCanalDiagram: React.FC<{ canalType: 'suez' | 'panama' }> = ({ canalType }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-bold text-cyan-400">
          {canalType === 'suez' ? 'Suez Canal Profile (Sea-Level Cut)' : 'Panama Canal Profile (Lock System)'}
        </h4>
        <span className="text-xs bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">
          {canalType === 'suez' ? 'No Locks Needed (Sea Level)' : 'Elevated Gatun Lake (26m ASL)'}
        </span>
      </div>
      <svg viewBox="0 0 700 240" className="w-full h-auto rounded bg-slate-950">
        {canalType === 'suez' ? (
          <g>
            {/* Mediterranean Sea */}
            <rect x="0" y="140" width="120" height="70" fill="#0284c7" opacity="0.8" />
            <text x="60" y="175" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">Mediterranean</text>
            
            {/* Sea Level Canal Channel */}
            <rect x="120" y="150" width="460" height="60" fill="#0369a1" />
            <path d="M 120 140 L 140 150 L 540 150 L 560 140 Z" fill="#b45309" opacity="0.7" />
            <text x="340" y="180" fill="#7dd3fc" fontSize="13" textAnchor="middle" fontWeight="bold">Suez Canal Channel (193 km Sea-Level)</text>

            {/* Red Sea */}
            <rect x="580" y="140" width="120" height="70" fill="#0284c7" opacity="0.8" />
            <text x="640" y="175" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">Red Sea</text>

            {/* Desert Land Banks */}
            <path d="M 0 140 L 120 140 L 140 110 L 0 110 Z" fill="#d97706" opacity="0.4" />
            <path d="M 560 140 L 700 140 L 700 110 L 580 110 Z" fill="#d97706" opacity="0.4" />
            <text x="70" y="128" fill="#fcd34d" fontSize="11" textAnchor="middle">Sinai Peninsula</text>
            <text x="630" y="128" fill="#fcd34d" fontSize="11" textAnchor="middle">African Mainland</text>

            {/* Container Ship animation icon */}
            <g transform="translate(300, 130)">
              <rect x="0" y="10" width="70" height="15" fill="#ef4444" rx="2" />
              <rect x="10" y="2" width="15" height="8" fill="#f87171" />
              <rect x="30" y="2" width="15" height="8" fill="#38bdf8" />
              <rect x="50" y="2" width="12" height="8" fill="#facc15" />
              <text x="35" y="22" fill="#ffffff" fontSize="8" textAnchor="middle">Container Vessel</text>
            </g>
          </g>
        ) : (
          <g>
            {/* Atlantic Ocean */}
            <rect x="0" y="160" width="100" height="50" fill="#0284c7" opacity="0.8" />
            <text x="50" y="190" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Atlantic Ocean</text>

            {/* Gatun Locks (3 Steps) */}
            <path d="M 100 210 L 100 160 L 140 160 L 140 130 L 180 130 L 180 100 L 220 100 L 220 70 L 480 70 L 480 100 L 520 100 L 520 130 L 560 130 L 560 160 L 600 160 L 600 210 Z" fill="#334155" />
            
            {/* Gatun Lake Water (Elevated 26m) */}
            <rect x="220" y="75" width="260" height="60" fill="#0284c7" />
            <text x="350" y="105" fill="#ffffff" fontSize="13" textAnchor="middle" fontWeight="bold">Gatun Lake (26m above Sea Level)</text>
            
            {/* Locks Steps Water */}
            <rect x="100" y="165" width="40" height="45" fill="#0369a1" />
            <rect x="140" y="135" width="40" height="75" fill="#0369a1" />
            <rect x="180" y="105" width="40" height="105" fill="#0369a1" />
            
            {/* Pacific Ocean */}
            <rect x="600" y="160" width="100" height="50" fill="#0284c7" opacity="0.8" />
            <text x="650" y="190" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Pacific Ocean</text>

            {/* Ship inside Gatun Lake */}
            <g transform="translate(310, 55)">
              <rect x="0" y="10" width="60" height="12" fill="#10b981" rx="2" />
              <rect x="10" y="3" width="12" height="7" fill="#f87171" />
              <rect x="25" y="3" width="12" height="7" fill="#facc15" />
              <text x="30" y="19" fill="#ffffff" fontSize="7" textAnchor="middle">Panamax Ship</text>
            </g>

            {/* Lock Gates Labels */}
            <text x="160" y="55" fill="#38bdf8" fontSize="10" textAnchor="middle">Gatun Locks</text>
            <text x="520" y="55" fill="#38bdf8" fontSize="10" textAnchor="middle">Miraflores Locks</text>
          </g>
        )}
      </svg>
    </div>
  );
};

const TransSiberianRailwayDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-bold text-amber-400">Trans-Siberian Railway Route (St. Petersburg to Vladivostok - 9,289 km)</h4>
        <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">Longest Rail Artery</span>
      </div>
      <svg viewBox="0 0 750 200" className="w-full h-auto rounded bg-slate-950">
        {/* Eurasia land contour background */}
        <path d="M 30 150 Q 150 40 350 50 T 720 120 L 720 180 L 30 180 Z" fill="#1e293b" />
        
        {/* Railway Line Path */}
        <path d="M 50 110 L 110 120 L 190 125 L 290 130 L 400 135 L 520 130 L 630 135 L 700 150" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />

        {/* Major Station Nodes */}
        {/* St Petersburg */}
        <circle cx="50" cy="110" r="5" fill="#ef4444" />
        <text x="50" y="95" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">St. Petersburg</text>
        
        {/* Moscow */}
        <circle cx="110" cy="120" r="6" fill="#38bdf8" />
        <text x="110" y="105" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Moscow</text>

        {/* Yekaterinburg (Ural Mountains) */}
        <circle cx="290" cy="130" r="4" fill="#10b981" />
        <text x="290" y="118" fill="#cbd5e1" fontSize="9" textAnchor="middle">Yekaterinburg</text>

        {/* Novosibirsk */}
        <circle cx="400" cy="135" r="4" fill="#10b981" />
        <text x="400" y="123" fill="#cbd5e1" fontSize="9" textAnchor="middle">Novosibirsk</text>

        {/* Irkutsk & Lake Baikal */}
        <ellipse cx="525" cy="140" rx="15" ry="5" fill="#0284c7" opacity="0.8" />
        <circle cx="520" cy="130" r="4" fill="#10b981" />
        <text x="520" y="118" fill="#7dd3fc" fontSize="9" textAnchor="middle">Irkutsk (Baikal)</text>

        {/* Chita */}
        <circle cx="600" cy="132" r="4" fill="#10b981" />
        <text x="600" y="120" fill="#cbd5e1" fontSize="9" textAnchor="middle">Chita</text>

        {/* Vladivostok */}
        <circle cx="700" cy="150" r="6" fill="#ef4444" />
        <text x="700" y="170" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Vladivostok</text>

        {/* Freight Train Icon */}
        <g transform="translate(340, 126)">
          <rect x="0" y="0" width="30" height="8" fill="#38bdf8" rx="1" />
          <circle cx="5" cy="9" r="2" fill="#ffffff" />
          <circle cx="25" cy="9" r="2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};

const TelecomSatelliteOpticDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-bold text-indigo-400">Satellite Orbits (INSAT/IRS) & Subsea Optic Fiber System</h4>
        <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">Telecommunication & Remote Sensing</span>
      </div>
      <svg viewBox="0 0 750 240" className="w-full h-auto rounded bg-slate-950">
        {/* Outer Space Background */}
        <rect x="0" y="0" width="750" height="240" fill="#030712" />

        {/* Geostationary Orbit (GEO) Arc - 36,000 km */}
        <path d="M 50 30 Q 375 -10 700 30" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="375" y="18" fill="#818cf8" fontSize="10" textAnchor="middle">Geostationary Orbit (INSAT - 36,000 km height)</text>

        {/* GEO Satellite */}
        <g transform="translate(360, 22)">
          <rect x="-12" y="-6" width="24" height="12" fill="#f59e0b" />
          <line x1="-25" y1="0" x2="-12" y2="0" stroke="#38bdf8" strokeWidth="3" />
          <line x1="12" y1="0" x2="25" y2="0" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
        </g>

        {/* Low Earth Orbit / Polar Orbit Arc (IRS - 800 km) */}
        <path d="M 120 110 Q 375 75 630 110" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="375" y="72" fill="#34d399" fontSize="10" textAnchor="middle">Sun-Synchronous Polar Orbit (IRS Remote Sensing - 800 km)</text>

        {/* Polar Satellite */}
        <g transform="translate(240, 85)">
          <rect x="-8" y="-4" width="16" height="8" fill="#10b981" />
          <line x1="-15" y1="0" x2="-8" y2="0" stroke="#facc15" strokeWidth="2" />
          <line x1="8" y1="0" x2="15" y2="0" stroke="#facc15" strokeWidth="2" />
        </g>

        {/* Earth Horizon Arc */}
        <path d="M 50 240 Q 375 140 700 240 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
        
        {/* Ocean Body on Earth */}
        <path d="M 200 210 Q 375 180 550 210 Z" fill="#0284c7" opacity="0.6" />
        
        {/* Subsea Optic Fiber Cable (OFC) on Sea Floor */}
        <path d="M 210 218 Q 375 195 540 218" fill="none" stroke="#ec4899" strokeWidth="3" />
        <text x="375" y="212" fill="#f472b6" fontSize="10" textAnchor="middle" fontWeight="bold">Subsea Optic Fiber Cable (99% Global Internet Data)</text>

        {/* Signals from GEO Satellite to Earth Stations */}
        <line x1="360" y1="28" x2="180" y2="180" stroke="#818cf8" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />
        <line x1="360" y1="28" x2="570" y2="180" stroke="#818cf8" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />

        {/* Earth Stations */}
        <polygon points="175,185 185,185 180,175" fill="#f59e0b" />
        <text x="180" y="198" fill="#ffffff" fontSize="9" textAnchor="middle">Earth Station A</text>

        <polygon points="565,185 575,185 570,175" fill="#f59e0b" />
        <text x="570" y="198" fill="#ffffff" fontSize="9" textAnchor="middle">Earth Station B</text>
      </svg>
    </div>
  );
};

// ==========================================
// 11. MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export default function C12_GeoTransportCommunicationCBSESim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // State management for tabs, BKT, SRS, Mastery
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  
  // User answers & scores
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, unknown>>({});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'correct' | 'incorrect' | 'pending'>>({});
  
  // Feedback component states
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT State tracking per node
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState(0.2, 0.1, 0.1, 0.3);
    });
    return initial;
  });

  // SRS State tracking per challenge
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach(c => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Lab 1: Interactive Network Topology State
  const [lab1Nodes, setLab1Nodes] = useState<number>(6);
  const [lab1Links, setLab1Links] = useState<number>(9);

  // Lab 2: Maritime Canal Hydraulic State
  const [lab2Canal, setLab2Canal] = useState<'suez' | 'panama'>('suez');
  const [lab2VesselSize, setLab2VesselSize] = useState<number>(12000); // TEU
  const [lab2SpeedKnots, setLab2SpeedKnots] = useState<number>(14);

  // Lab 3: Railway Gauge & Transcontinental System State
  const [lab3Gauge, setLab3Gauge] = useState<'broad' | 'meter' | 'narrow'>('broad');
  const [lab3Tonnage, setLab3Tonnage] = useState<number>(4500); // Freight gross tons

  // Lab 4: Highway & Aviation UDAN State
  const [lab4Category, setLab4Category] = useState<'golden_quad' | 'nh' | 'state_h' | 'bro' | 'pmgsy'>('golden_quad');
  const [lab4AirPass, setLab4AirPass] = useState<number>(250); // Daily passengers

  // Lab 5: Telecom Satellite & Subsea Cable State
  const [lab5System, setLab5System] = useState<'sat_geo' | 'sat_leo' | 'optic_subsea'>('optic_subsea');
  const [lab5DataRateGbps, setLab5DataRateGbps] = useState<number>(100);

  // Auto-reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[currentChallengeIndex];
      if (currentCh && currentCh.hints.length > 0) {
        setCurrentHint(currentCh.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Here is a hint for this challenge.');
      }
    }, 12000);
  }, [currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Computed Values for Lab 1
  const lab1Beta = useMemo(() => (lab1Links / lab1Nodes).toFixed(2), [lab1Links, lab1Nodes]);
  const lab1Alpha = useMemo(() => {
    const num = lab1Links - lab1Nodes + 1;
    const den = 2 * lab1Nodes - 5;
    return den > 0 ? (num / den).toFixed(2) : '0.00';
  }, [lab1Links, lab1Nodes]);
  const lab1Gamma = useMemo(() => {
    const den = 3 * (lab1Nodes - 2);
    return den > 0 ? (lab1Links / den).toFixed(2) : '0.00';
  }, [lab1Links, lab1Nodes]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (optIndex: number) => {
    setSelectedDiscoveryOption(optIndex);
    setDiscoverySubmitted(true);
    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Ocean transport has ultra-low friction and huge economies of scale.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the friction of water vs rail rights-of-way.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = (ch: Challenge, userAns: unknown) => {
    resetInactivityTimer();
    let isCorrect = false;

    if (ch.type === 'mcq' || ch.type === 'classification') {
      isCorrect = Number(userAns) === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const numVal = parseFloat(String(userAns));
      const target = Number(ch.correctAnswer);
      const tol = ch.tolerance || 0.1;
      isCorrect = !isNaN(numVal) && Math.abs(numVal - target) <= tol;
    }

    // Update BKT & SRS
    setBktStates(prev => {
      const curr = prev[ch.nodeId] || createBKTState(0.2, 0.1, 0.1, 0.3);
      const updated = bktUpdate(curr, isCorrect);
      return { ...prev, [ch.nodeId]: updated };
    });

    setSrsItems(prev => {
      const currItem = prev[ch.id] || createReviewItem(ch.id);
      const updatedItem = sm2Update(currItem, isCorrect ? 5 : 1);
      return { ...prev, [ch.id]: updatedItem };
    });

    setChallengeStatus(prev => ({ ...prev, [ch.id]: isCorrect ? 'correct' : 'incorrect' }));
    setChallengeAnswers(prev => ({ ...prev, [ch.id]: userAns }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent answer! Core geographical concept mastered.');
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That answer is incorrect. Review the hint or theoretical principle.');
    }
  };

  // Check overall completion
  const totalCorrect = useMemo(() => {
    return Object.values(challengeStatus).filter(s => s === 'correct').length;
  }, [challengeStatus]);

  useEffect(() => {
    if (totalCorrect === CHALLENGES.length && onComplete) {
      recordGameScore('C12_GeoTransportCommunicationCBSESim', totalCorrect, CHALLENGES.length);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all infrastructure and transport challenges with distinction.');
      onComplete(totalCorrect);
    }
  }, [totalCorrect, onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-6 flex flex-col justify-between">
      {/* ---------------- HARDWARE / FEEDBACK OVERLAYS ---------------- */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* ---------------- HEADER BAR ---------------- */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-lg">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">
              Class 12 CISCE/CBSE Geography • Transport, Communication & Cyberspace Networks
            </p>
          </div>
        </div>

        {/* TOP NAVIGATION TABS */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'discovery' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔍 1. Scenario & Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'lab' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🧪 2. Interactive Labs ({EXPLORATION_STEPS.length})
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎯 3. Challenges ({totalCorrect}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'summary' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 4. Real-World Audit
          </button>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT BODY ---------------- */}
      <main className="flex-grow">
        {/* ==========================================
            TAB 1: DISCOVERY & SCENARIO
        ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* SCENARIO CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Operational Context</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-cyan-900/40 text-xs text-slate-300">
                <span className="font-semibold text-cyan-300">Mandate: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md text-xs font-bold">
                  Preconception Discovery Question
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300';
                  if (discoverySubmitted) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (idx === selectedDiscoveryOption) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shrink-0 font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-indigo-200 leading-relaxed">
                  <span className="font-bold text-indigo-300">Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS RENDERING */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
                Predictive Analysis Questions
              </h3>
              {PREDICTION_QUESTIONS.map((pq, pqIdx) => (
                <div key={pqIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-semibold text-sky-300">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <div key={oIdx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                        <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    <span className="font-semibold text-slate-300">Verification Protocol:</span> {pq.verifyInstruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: INTERACTIVE EXPLORATION LABS
        ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* LAB SELECTION SUB-NAV */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabIndex(idx);
                    audioManager.play('tap');
                    speechManager.speak(`Loaded ${step.title}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedLabIndex === idx
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 border border-cyan-400'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* CURRENT LAB INSTRUCTION HEADER */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-cyan-300">
                  {EXPLORATION_STEPS[selectedLabIndex].title}
                </h3>
                <p className="text-xs text-slate-400">
                  {EXPLORATION_STEPS[selectedLabIndex].instruction}
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-slate-400">
                Node ID: {EXPLORATION_STEPS[selectedLabIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: GRAPH TOPOLOGY & CONNECTIVITY INDICES */}
            {selectedLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-sky-400">Graph Structure Parameters</h4>
                  
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Number of Nodes / Vertices (v): <span className="font-bold text-sky-300">{lab1Nodes}</span>
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="20"
                      value={lab1Nodes}
                      onChange={e => {
                        setLab1Nodes(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Number of Links / Edges (e): <span className="font-bold text-sky-300">{lab1Links}</span>
                    </label>
                    <input
                      type="range"
                      min={lab1Nodes - 1}
                      max={Math.min(30, (lab1Nodes * (lab1Nodes - 1)) / 2)}
                      value={lab1Links}
                      onChange={e => {
                        setLab1Links(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Beta Index (β = e/v):</span>
                      <span className="font-mono font-bold text-cyan-400">{lab1Beta}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Alpha Index (α):</span>
                      <span className="font-mono font-bold text-amber-400">{lab1Alpha}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gamma Index (γ):</span>
                      <span className="font-mono font-bold text-emerald-400">{lab1Gamma}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <h4 className="text-sm font-bold text-slate-300 mb-3">Live Topological Graph Visualization</h4>
                  <svg viewBox="0 0 400 300" className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800">
                    {/* Render Node Circles & Edge Lines */}
                    {Array.from({ length: lab1Nodes }).map((_, i) => {
                      const angle = (i * 2 * Math.PI) / lab1Nodes;
                      const cx = 200 + 130 * Math.cos(angle);
                      const cy = 150 + 100 * Math.sin(angle);

                      // Draw links to next nodes
                      const nextIndices = [
                        (i + 1) % lab1Nodes,
                        (i + 2) % lab1Nodes
                      ];

                      return (
                        <g key={i}>
                          {nextIndices.map((ni, nIdx) => {
                            if (i * 2 + nIdx < lab1Links) {
                              const nAngle = (ni * 2 * Math.PI) / lab1Nodes;
                              const ncx = 200 + 130 * Math.cos(nAngle);
                              const ncy = 150 + 100 * Math.sin(nAngle);
                              return (
                                <line
                                  key={nIdx}
                                  x1={cx}
                                  y1={cy}
                                  x2={ncx}
                                  y2={ncy}
                                  stroke="#38bdf8"
                                  strokeWidth="1.5"
                                  opacity="0.6"
                                />
                              );
                            }
                            return null;
                          })}
                          <circle cx={cx} cy={cy} r="8" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
                          <text x={cx} y={cy + 3} fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">
                            {i + 1}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}

            {/* LAB 2: MARITIME CANALS & WATERWAYS */}
            {selectedLabIndex === 1 && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => { setLab2Canal('suez'); audioManager.play('swoop'); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      lab2Canal === 'suez' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Suez Canal Model
                  </button>
                  <button
                    onClick={() => { setLab2Canal('panama'); audioManager.play('swoop'); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      lab2Canal === 'panama' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Panama Canal Model
                  </button>
                </div>

                <MaritimeCanalDiagram canalType={lab2Canal} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Vessel Capacity: <span className="text-cyan-400 font-bold">{lab2VesselSize} TEU</span>
                    </label>
                    <input
                      type="range"
                      min="3000"
                      max="24000"
                      step="1000"
                      value={lab2VesselSize}
                      onChange={e => setLab2VesselSize(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Transit Speed: <span className="text-cyan-400 font-bold">{lab2SpeedKnots} knots</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="22"
                      value={lab2SpeedKnots}
                      onChange={e => setLab2SpeedKnots(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div className="md:col-span-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-between">
                    <span>
                      Estimated Transit Time:{' '}
                      <strong className="text-emerald-400">
                        {lab2Canal === 'suez' ? (193 / (lab2SpeedKnots * 1.852)).toFixed(1) : (82 / (lab2SpeedKnots * 1.852) + 4).toFixed(1)} hours
                      </strong>
                    </span>
                    <span>
                      Estimated Toll Fee:{' '}
                      <strong className="text-amber-400 font-mono">
                        ${(lab2VesselSize * 35).toLocaleString()}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: TRANS-CONTINENTAL RAILWAYS & GAUGES */}
            {selectedLabIndex === 2 && (
              <div className="space-y-6">
                <TransSiberianRailwayDiagram />

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Indian Railways Gauge & Capacity Converter</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'broad', label: 'Broad Gauge (1.676 m)', desc: 'Heavy freight trunk routes' },
                      { key: 'meter', label: 'Meter Gauge (1.000 m)', desc: 'Regional branch lines' },
                      { key: 'narrow', label: 'Narrow Gauge (0.762 m)', desc: 'Hill railways (Darjeeling/Kalka)' }
                    ].map(g => (
                      <button
                        key={g.key}
                        onClick={() => { setLab3Gauge(g.key as 'broad' | 'meter' | 'narrow'); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          lab3Gauge === g.key
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-xs">{g.label}</div>
                        <div className="text-[10px] opacity-80">{g.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="flex justify-between">
                      <span>Lateral Stability & Axle Load Capacity:</span>
                      <span className="font-bold text-emerald-400">
                        {lab3Gauge === 'broad' ? '25.0 Tons/axle' : lab3Gauge === 'meter' ? '12.5 Tons/axle' : '6.0 Tons/axle'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum Operational Speed:</span>
                      <span className="font-bold text-cyan-400">
                        {lab3Gauge === 'broad' ? '160 km/h (Vande Bharat)' : lab3Gauge === 'meter' ? '75 km/h' : '35 km/h'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: HIGHWAYS & AVIATION LOGISTICS */}
            {selectedLabIndex === 3 && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Indian Highway Network Hierarchy</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[
                      { key: 'golden_quad', name: 'Golden Quad' },
                      { key: 'nh', name: 'National Highways' },
                      { key: 'state_h', name: 'State Highways' },
                      { key: 'bro', name: 'Border Roads (BRO)' },
                      { key: 'pmgsy', name: 'Rural Roads (PMGSY)' }
                    ].map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => { setLab4Category(cat.key as 'golden_quad' | 'nh' | 'state_h' | 'bro' | 'pmgsy'); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          lab4Category === cat.key
                            ? 'bg-sky-600 text-white border-sky-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    {lab4Category === 'golden_quad' && (
                      <p>
                        <strong className="text-sky-300">Golden Quadrilateral & Corridors:</strong> 5,846 km express highway system connecting Delhi, Mumbai, Chennai, Kolkata. Managed by NHAI.
                      </p>
                    )}
                    {lab4Category === 'nh' && (
                      <p>
                        <strong className="text-sky-300">National Highways (NH):</strong> Primary road system connecting state capitals and major ports. Account for 2% of total road length but carry ~40% of road traffic.
                      </p>
                    )}
                    {lab4Category === 'state_h' && (
                      <p>
                        <strong className="text-sky-300">State Highways:</strong> Constructed and maintained by State PWD, connecting district headquarters with national highways.
                      </p>
                    )}
                    {lab4Category === 'bro' && (
                      <p>
                        <strong className="text-sky-300">Border Roads Organisation (BRO):</strong> Established May 1960 for defense infrastructure and snow clearing along northern/northeastern frontiers.
                      </p>
                    )}
                    {lab4Category === 'pmgsy' && (
                      <p>
                        <strong className="text-sky-300">PMGSY (Pradhan Mantri Gram Sadak Yojana):</strong> 100% centrally sponsored scheme providing all-weather single-lane paved road connectivity to rural habitations.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: TELECOM & CYBERSPACE */}
            {selectedLabIndex === 4 && (
              <div className="space-y-6">
                <TelecomSatelliteOpticDiagram />

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-indigo-400">Communication Network Performance Benchmark</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'sat_geo', label: 'GEO Satellite (INSAT)', latency: '500 ms', capacity: 'Medium' },
                      { key: 'sat_leo', label: 'LEO Constellation', latency: '40 ms', capacity: 'High' },
                      { key: 'optic_subsea', label: 'Subsea Optic Fiber (OFC)', latency: '<35 ms', capacity: 'Ultra High (Terabits)' }
                    ].map(sys => (
                      <button
                        key={sys.key}
                        onClick={() => { setLab5System(sys.key as 'sat_geo' | 'sat_leo' | 'optic_subsea'); audioManager.play('pop'); }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          lab5System === sys.key
                            ? 'bg-indigo-950/70 border-indigo-500 text-indigo-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-xs">{sys.label}</div>
                        <div className="text-[10px] opacity-80">Latency: {sys.latency}</div>
                        <div className="text-[10px] opacity-80">Bandwidth: {sys.capacity}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS RENDERING */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
                Field Observation Questions
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                <div key={oqIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-semibold text-emerald-300">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <div key={oIdx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                        <span className="font-bold text-emerald-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: PROGRESSIVE CHALLENGES
        ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* CHALLENGE NAVIGATION HEADER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-sky-950 text-sky-300 border border-sky-800'
                    : 'bg-purple-950 text-purple-300 border border-purple-800'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentChallengeIndex === 0}
                  onClick={() => {
                    setCurrentChallengeIndex(prev => prev - 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 disabled:opacity-40"
                >
                  ← Previous
                </button>
                <button
                  disabled={currentChallengeIndex === CHALLENGES.length - 1}
                  onClick={() => {
                    setCurrentChallengeIndex(prev => prev + 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1.5 bg-indigo-600 rounded-lg text-xs text-white font-bold disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* CURRENT CHALLENGE DISPLAY CARD */}
            {(() => {
              const ch = CHALLENGES[currentChallengeIndex];
              const status = challengeStatus[ch.id];
              const savedAns = challengeAnswers[ch.id];

              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 block mb-1">
                      Competency: {ch.competencyLevel} • Node: {ch.nodeId}
                    </span>
                    <h3 className="text-base font-bold text-slate-100">{ch.question}</h3>
                  </div>

                  {/* MCQ or Classification type */}
                  {(ch.type === 'mcq' || ch.type === 'classification') && ch.options && (
                    <div className="space-y-3">
                      {ch.options.map((opt, idx) => {
                        let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300';
                        if (status) {
                          if (idx === ch.correctIndex) {
                            btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (savedAns === idx) {
                            btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                          }
                        }
                        return (
                          <button
                            key={idx}
                            disabled={status === 'correct'}
                            onClick={() => handleChallengeSubmit(ch, idx)}
                            className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${btnStyle}`}
                          >
                            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shrink-0 font-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Numeric type */}
                  {ch.type === 'numeric' && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="number"
                          step="any"
                          placeholder="Enter numerical value..."
                          disabled={status === 'correct'}
                          defaultValue={savedAns !== undefined ? String(savedAns) : ''}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              handleChallengeSubmit(ch, (e.target as HTMLInputElement).value);
                            }
                          }}
                          className="flex-grow p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                        />
                        <button
                          disabled={status === 'correct'}
                          onClick={e => {
                            const inputElem = e.currentTarget.previousElementSibling as HTMLInputElement;
                            handleChallengeSubmit(ch, inputElem.value);
                          }}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* EXPLANATION / FEEDBACK BOX */}
                  {status && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      status === 'correct' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-rose-950/60 border-rose-800 text-rose-200'
                    }`}>
                      <strong className="block font-bold mb-1">
                        {status === 'correct' ? '✓ Correct Explanation:' : '✗ Incorrect Explanation:'}
                      </strong>
                      {ch.explanation}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ==========================================
            TAB 4: REAL-WORLD AUDIT & MISCONCEPTIONS
        ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* REAL WORLD ACTIVITY SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-bold">
                  Real-World Industry Case Study
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              
              <div className="space-y-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMON MISCONCEPTIONS MATRIX */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
                Curriculum Misconceptions & Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400">
                      ⚠️ Misconception: <span className="text-slate-300 font-normal">{m.misconception}</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      ✓ Fact: <span className="text-slate-300 font-normal">{m.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC ASSESSMENT RECAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
                Diagnostic Mastery Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DIAGNOSTIC_QUESTIONS.map(dq => (
                  <div key={dq.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-sky-300">{dq.question}</div>
                    <div className="text-slate-400">{dq.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ---------------- FOOTER STATUS BAR ---------------- */}
      <footer className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>
          <span>Mastery Score: </span>
          <strong className="text-emerald-400">{totalCorrect} / {CHALLENGES.length} Completed</strong>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500">BKT Bayesian Knowledge Tracing Active</span>
          <span className="text-[10px] text-slate-500">SM-2 Spaced Repetition Engine Ready</span>
        </div>
      </footer>
    </div>
  );
}