'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c12_eco_cbse_103',
  'c12_eco_cbse_104',
  'c12_eco_cbse_105',
  'c12_eco_cbse_106',
  'c12_eco_cbse_107',
  'c12_eco_cbse_108',
  'c12_eco_cbse_109',
  'c12_eco_cbse_110',
  'c12_eco_cbse_111',
  'c12_eco_cbse_112',
  'c12_eco_cbse_113',
  'c12_eco_cbse_114',
  'c12_eco_cbse_115',
  'c12_eco_cbse_116',
  'c12_eco_cbse_117',
  'c12_eco_cbse_118',
  'c12_eco_cbse_119',
  'c12_eco_cbse_120',
  'c12_eco_cbse_121',
  'c12_eco_cbse_122',
  'c12_eco_cbse_123'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// Section 1: SCENARIO
const SCENARIO = {
  title: 'Market Equilibrium & Price Mechanism Lab',
  intro: 'Welcome to the Central Economic Planning & Market Dynamics Simulation Laboratory! Here, you step into the role of Chief Market Economist analyzing supply, demand, price signals, and policy intervention dynamics in competitive markets.',
  context: 'In this interactive laboratory, you will explore how market forces push prices toward equilibrium, how price ceilings and floors alter market clearing, how firm entry/exit drives long-run zero economic profit, and how factor markets (labour demand & VMPL) operate.'
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'If the government imposes a price ceiling BELOW the market equilibrium price to make essential grain affordable, what will be the long-run effect on market supply and accessibility?',
  options: [
    'Quantity supplied increases because lower prices increase consumer buying power.',
    'A persistent shortage (excess demand) occurs, reducing total quantity supplied and leading to rationing or black markets.',
    'Market equilibrium shifts down automatically, making supply equal to demand at the lower price.',
    'Firms profit more due to high sales volume, increasing overall production.'
  ],
  correctIndex: 1,
  hintAfter: 'Lowering the price artificially reduces suppliers incentives to produce while increasing buyers desire to purchase, creating an un-cleared excess demand (shortage).'
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Fixed Firms Market Equilibrium & Invisible Hand',
    instruction: 'Adjust demand intercept (a) and supply intercept (c) to see how the equilibrium price (P*) and quantity (Q*) clear excess demand or excess supply.',
    interactionType: 'market-clearing-slider',
    nodeId: 'c12_eco_cbse_107' as NodeId
  },
  {
    title: 'Lab 2: Comparative Statics & Simultaneous Curve Shifts',
    instruction: 'Shift Demand (D) and Supply (S) simultaneously. Observe under what conditions equilibrium quantity increases while equilibrium price remains unchanged.',
    interactionType: 'simultaneous-shift-lab',
    nodeId: 'c12_eco_cbse_116' as NodeId
  },
  {
    title: 'Lab 3: Long-Run Equilibrium with Free Entry & Exit',
    instruction: 'Vary market demand under free entry/exit where firms enter when profits > 0 and exit when profits < 0. Observe price lock at min LRAC.',
    interactionType: 'free-entry-exit-lab',
    nodeId: 'c12_eco_cbse_118' as NodeId
  },
  {
    title: 'Lab 4: Labour Demand & Value of Marginal Product (VMPL)',
    instruction: 'Adjust output price (P) and wage rate (W) to discover how a competitive firm hires labour up to where W = VMPL = P × MPL.',
    interactionType: 'labour-vmpl-lab',
    nodeId: 'c12_eco_cbse_113' as NodeId
  },
  {
    title: 'Lab 5: Government Price Controls (Ceiling vs Floor)',
    instruction: 'Set Price Ceiling below P* and Price Floor above P*. Calculate the resulting excess demand (shortage) and excess supply (surplus).',
    interactionType: 'price-control-lab',
    nodeId: 'c12_eco_cbse_120' as NodeId
  }
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to the equilibrium price and quantity when consumer income rises for a normal good while technological advancement simultaneously reduces production cost?',
    options: [
      'Equilibrium price definitely increases; quantity is ambiguous.',
      'Equilibrium quantity definitely increases; price change depends on the relative magnitudes of D and S shifts.',
      'Both price and quantity must decrease.',
      'Equilibrium quantity decreases while price increases.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, set both Demand Shift right (+20) and Supply Shift right (+20) and observe P* vs Q*.',
    nodeId: 'c12_eco_cbse_116' as NodeId
  },
  {
    question: 'Predict: Under free entry and exit of identical firms, what is the shape of the long-run market supply curve at the price equal to minimum average cost?',
    options: [
      'Vertical (perfectly inelastic)',
      'Horizontal (perfectly elastic) at P = min AC',
      'Downward sloping',
      'Unpredictable curve'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, shift demand under Free Entry/Exit mode and watch how equilibrium price stays constant at P = min LRAC.',
    nodeId: 'c12_eco_cbse_119' as NodeId
  }
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the price adjustment mechanism when market price is set ABOVE equilibrium price (P > P*)?',
    observableOptions: [
      'Quantity demanded exceeds quantity supplied, driving prices higher.',
      'Quantity supplied exceeds quantity demanded (excess supply), putting downward pressure on price until market clears.',
      'Firms immediately exit the market until price drops.',
      'Demand curve shifts left automatically.'
    ],
    correctIndex: 1,
    nodeId: 'c12_eco_cbse_109' as NodeId
  },
  {
    question: 'What happens to the firm\'s labour hiring decision when the price of the output commodity doubles while nominal wages remain constant?',
    observableOptions: [
      'VMPL doubles at every unit of labour, shifting labour demand right and increasing optimal labour hired.',
      'Labour demand decreases because workers become too expensive relative to capital.',
      'MPL decreases to zero immediately.',
      'Firm hires zero workers to avoid higher wage demands.'
    ],
    correctIndex: 0,
    nodeId: 'c12_eco_cbse_113' as NodeId
  }
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Agricultural Minimum Support Price (MSP) & Food Security Policy Analysis',
  description: 'Apply competitive market equilibrium theory, price floors (MSP), and price ceilings (Public Distribution Scheme) to real-world grain market management in India.',
  steps: [
    'Step 1: Given market demand $q^d = 1000 - 10p$ and supply $q^s = 200 + 10p$, calculate natural market clearing equilibrium price $P^*$ and quantity $Q^*$. ($P^* = ₹40$, $Q^* = 600$ units)',
    'Step 2: If the government fixes MSP (Price Floor) at $P_{floor} = ₹50$, calculate total market demand ($q^d = 500$), total output supplied by farmers ($q^s = 700$), and the government buffer stock surplus buyout requirement ($700 - 500 = 200$ units).',
    'Step 3: Compute the total fiscal outlay for government buffer stock procurement: $200 \\text{ units} \\times ₹50 = ₹10,000$.',
    'Step 4: Evaluate the welfare trade-off between farmer income support vs government storage cost and potential market distortion.'
  ]
};

// Misconceptions
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Equilibrium means demand equals supply curves',
    description: 'Equilibrium is the intersection point where quantity demanded equals quantity supplied at a specific price, NOT that demand and supply curves are identical or equal as whole functions.',
    correction: 'Quantity demanded ($q^d$) equals quantity supplied ($q^s$) at $P^*$. The curves themselves represent intentions at ALL possible prices.'
  },
  {
    id: 'misc_2',
    title: 'Price Ceilings help buyers obtain more goods',
    description: 'Students often think lowering price by policy makes goods more accessible to everyone.',
    correction: 'A price ceiling below equilibrium creates excess demand and reduces total output supplied, leading to shortages, queues, and black markets.'
  },
  {
    id: 'misc_3',
    title: 'Free Entry & Exit means infinite price drop',
    description: 'Belief that continuous entry of firms drives price down to zero.',
    correction: 'Firms enter until economic profit is zero, which occurs where price equals minimum Average Cost ($P = \\min AC$), halting further entry.'
  },
  {
    id: 'misc_4',
    title: 'VMPL is just Marginal Product',
    description: 'Confusing marginal physical product ($MP_L$) with value of marginal product ($VMP_L$).',
    correction: '$VMP_L = P \\times MP_L$. Marginal product is in physical units of output, while $VMP_L$ is measured in monetary currency.'
  },
  {
    id: 'misc_5',
    title: 'Shifts in demand change the price elasticity of supply',
    description: 'Assuming a shift in demand curve moves the supply curve.',
    correction: 'A demand shift moves along a stationary supply curve. Supply curve only shifts if input costs, technology, or seller count changes.'
  },
  {
    id: 'misc_6',
    title: 'Price Floor always causes a surplus',
    description: 'Believing any price floor policy creates excess supply.',
    correction: 'A price floor set BELOW equilibrium price is non-binding and has zero impact on the market clearing equilibrium.'
  }
];

// Interface for Challenge Item
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'classification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// 22+ CHALLENGES (7 Foundation, 8 Standard, 7 Advanced)
const CHALLENGES: Challenge[] = [
  // FOUNDATION (1 to 7)
  {
    id: 'c1',
    nodeId: 'c12_eco_cbse_103',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'At market equilibrium in a competitive market, which of the following equalities holds true?',
    options: [
      'Total Utility = Total Cost',
      'Quantity Demanded = Quantity Supplied',
      'Price Ceiling = Price Floor',
      'Marginal Revenue = Average Fixed Cost'
    ],
    correctIndex: 1,
    explanation: 'Market equilibrium occurs at the price level where quantity demanded by consumers equals quantity supplied by producers ($q^d(p^*) = q^s(p^*)$).',
    hints: [
      'Think about where buyers and sellers agree on quantity.',
      'Equilibrium means balance between $q^d$ and $q^s$.',
      'Look for Quantity Demanded = Quantity Supplied.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: 'c12_eco_cbse_104',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'How is the market demand curve derived from individual consumer demand curves?',
    options: [
      'Vertical summation of individual demand curves',
      'Horizontal summation of individual demand curves at each price',
      'Multiplying individual demand curves by price',
      'Dividing total market income by number of consumers'
    ],
    correctIndex: 1,
    explanation: 'Market demand is the horizontal summation of individual quantities demanded by all consumers in the market at each given price level.',
    hints: [
      'Add quantities along the horizontal axis at each price.',
      'Horizontal summation aggregates individual demand quantities.',
      'Horizontal summation is the correct term.'
    ]
  },
  {
    id: 'c3',
    nodeId: 'c12_eco_cbse_105',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The market supply curve is obtained by aggregating individual firm supply curves:',
    options: [
      'Horizontally at each price level',
      'Vertically at each output quantity',
      'By taking average of all marginal costs',
      'By multiplying individual output by tax rate'
    ],
    correctIndex: 0,
    explanation: 'Market supply is the horizontal summation of output quantities supplied by all individual price-taking firms at each price.',
    hints: [
      'Add individual firm output quantities together for every given price.',
      'It is horizontal summation along quantity axis.',
      'Select horizontally at each price level.'
    ]
  },
  {
    id: 'c4',
    nodeId: 'c12_eco_cbse_106',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is an individual firm in a perfectly competitive market referred to as a "price taker"?',
    options: [
      'The firm sets any price it desires without market influence',
      'The firm faces a perfectly elastic horizontal demand curve at market price',
      'The government fixes every single firm\'s sale price directly',
      'The firm produces unique differentiated goods'
    ],
    correctIndex: 1,
    explanation: 'Because individual competitive firms are tiny relative to the market, they accept market clearing price $P^*$ as given, facing a horizontal demand curve ($P = MR = AR$).',
    hints: [
      'Can an individual wheat farmer change global wheat price by altering their own small output?',
      'No single firm can influence market price.',
      'The firm faces a horizontal demand curve at market price.'
    ]
  },
  {
    id: 'c5',
    nodeId: 'c12_eco_cbse_108',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'When market price is ABOVE equilibrium price, what condition prevails in the market?',
    options: [
      'Excess Demand (Shortage)',
      'Excess Supply (Surplus)',
      'Zero production',
      'Negative economic profit for buyers'
    ],
    correctIndex: 1,
    explanation: 'When $P > P^*$, suppliers produce more than buyers wish to purchase ($q^s > q^d$), resulting in excess supply (surplus).',
    hints: [
      'High price encourages producers but deters buyers.',
      '$q^s > q^d$ at high prices.',
      'Excess Supply (Surplus).'
    ]
  },
  {
    id: 'c6',
    nodeId: 'c12_eco_cbse_112',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'In a competitive labor market, the demand curve for labor by a firm is determined by:',
    options: [
      'Value of Marginal Product of Labour ($VMP_L$)',
      'Total Utility of Labour',
      'Average Fixed Cost of Capital',
      'Minimum wage law only'
    ],
    correctIndex: 0,
    explanation: 'A firm hires labour up to where $W = VMP_L = P \\times MP_L$. Thus, the $VMP_L$ curve is the firm\'s demand curve for labour.',
    hints: [
      'What monetary value does an extra worker add to revenue?',
      '$VMP_L = P \\times MP_L$.',
      'Value of Marginal Product of Labour.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c7',
    nodeId: 'c12_eco_cbse_117',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The Law of Diminishing Marginal Product states that as more units of a variable input (labour) are employed with fixed inputs:',
    options: [
      'Total product drops to zero immediately',
      'Marginal product of variable input eventually declines',
      'Average cost drops continuously to zero',
      'Product price falls to zero'
    ],
    correctIndex: 1,
    explanation: 'Keeping capital constant, adding successive units of labour yields smaller incremental additions to total output ($MP_L$ declines).',
    hints: [
      'Too many cooks in a fixed size kitchen slow each other down.',
      'Marginal additions get smaller.',
      'Marginal product of variable input eventually declines.'
    ]
  },

  // STANDARD (8 to 15)
  {
    id: 'c8',
    nodeId: 'c12_eco_cbse_111',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Given market demand $q^d = 200 - 4p$ and supply $q^s = 50 + 11p$. Calculate the market equilibrium price $p^*$.',
    correctAnswer: 10,
    tolerance: 0.1,
    explanation: 'Set $q^d = q^s \\implies 200 - 4p = 50 + 11p \\implies 150 = 15p \\implies p^* = 10$.',
    hints: [
      'Equate $q^d$ to $q^s$.',
      '$200 - 50 = 11p + 4p$.',
      '$150 / 15 = 10$.'
    ]
  },
  {
    id: 'c9',
    nodeId: 'c12_eco_cbse_111',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'For demand $q^d = 200 - 4p$ and supply $q^s = 50 + 11p$, calculate the equilibrium quantity $q^*$.',
    correctAnswer: 160,
    tolerance: 0.5,
    explanation: 'Substitute $p^* = 10$ into demand: $q^* = 200 - 4(10) = 160$ units.',
    hints: [
      'Use $p^* = 10$ in either equation.',
      '$q^* = 200 - 40 = 160$.',
      'Answer is 160.'
    ]
  },
  {
    id: 'c10',
    nodeId: 'c12_eco_cbse_108',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Using $q^d = 200 - 4p$ and $q^s = 50 + 11p$, if price is fixed at $p = 15$, calculate the excess supply (surplus).',
    correctAnswer: 75,
    tolerance: 0.5,
    explanation: 'At $p = 15$: $q^d = 200 - 60 = 140$. $q^s = 50 + 11(15) = 215$. Excess supply = $q^s - q^d = 215 - 140 = 75$.',
    hints: [
      'Find $q^d(15)$ and $q^s(15)$.',
      '$q^d = 140$, $q^s = 215$.',
      '$215 - 140 = 75$.'
    ]
  },
  {
    id: 'c11',
    nodeId: 'c12_eco_cbse_114',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'An increase in the wage rate paid to production workers shifts the market supply curve of the product:',
    options: [
      'Rightward, lowering equilibrium price',
      'Leftward, raising equilibrium price and lowering equilibrium quantity',
      'Downward, increasing output',
      'No shift occurs, only movement along demand'
    ],
    correctIndex: 1,
    explanation: 'Higher input costs (wages) increase marginal costs, shifting supply leftward ($S \\rightarrow S\'$), which raises equilibrium price and lowers quantity.',
    hints: [
      'Higher input costs make production more expensive.',
      'Supply shifts leftward.',
      'Leftward shift raises $P^*$ and lowers $Q^*$.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c12',
    nodeId: 'c12_eco_cbse_115',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If consumer preferences shift strongly in favor of electric vehicles (normal good), what happens to equilibrium price and quantity?',
    options: [
      'Both $P^*$ and $Q^*$ increase',
      '$P^*$ increases while $Q^*$ decreases',
      '$P^*$ decreases while $Q^*$ increases',
      'Both $P^*$ and $Q^*$ decrease'
    ],
    correctIndex: 0,
    explanation: 'Favorable preference shift increases demand (rightward shift of $D$), resulting in higher equilibrium price and higher equilibrium quantity.',
    hints: [
      'Demand shifts to the right.',
      'Follow intersection along the unchanged supply curve up and right.',
      'Both $P^*$ and $Q^*$ increase.'
    ]
  },
  {
    id: 'c13',
    nodeId: 'c12_eco_cbse_113',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A firm sells output at $P = ₹20$ per unit. The marginal product of the 4th worker is $MP_L = 8$ units. Calculate the Value of Marginal Product of Labour ($VMP_L$).',
    correctAnswer: 160,
    tolerance: 0.5,
    explanation: '$VMP_L = P \\times MP_L = 20 \\times 8 = ₹160$.',
    hints: [
      'Multiply market price by marginal product of labour.',
      '$20 \\times 8$.',
      '160.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c14',
    nodeId: 'c12_eco_cbse_120',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A Price Ceiling imposed by the government above the equilibrium price results in:',
    options: [
      'A severe market shortage',
      'A massive surplus',
      'No effect on market equilibrium (non-binding ceiling)',
      'Immediate firm exit'
    ],
    correctIndex: 2,
    explanation: 'A price ceiling sets a maximum legal price. If set ABOVE equilibrium price $P^*$, market naturally clears at $P^*$, making the ceiling non-binding.',
    hints: [
      'Is selling at equilibrium price $P^*$ illegal if ceiling is HIGHER than $P^*$?',
      'No, because $P^* < P_{ceiling}$.',
      'No effect on market equilibrium.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c15',
    nodeId: 'c12_eco_cbse_121',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Market demand $q^d = 100 - p$ and supply $q^s = 20 + p$. If government fixes a Price Floor at $P = ₹50$, calculate the resulting market excess supply.',
    correctAnswer: 20,
    tolerance: 0.5,
    explanation: 'Equilibrium is $100 - p = 20 + p \\implies 2p = 80 \\implies P^* = 40$. At Price Floor $P = 50$: $q^d = 50$, $q^s = 70$. Excess supply = $70 - 50 = 20$.',
    hints: [
      'Calculate $q^d(50) = 100 - 50 = 50$.',
      'Calculate $q^s(50) = 20 + 50 = 70$.',
      'Excess supply = $70 - 50 = 20$.'
    ]
  },

  // ADVANCED (16 to 22)
  {
    id: 'c16',
    nodeId: 'c12_eco_cbse_116',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'If demand shifts rightward and supply shifts rightward by the EXACT same magnitude, what is the impact on equilibrium price ($P^*$) and quantity ($Q^*$)?',
    options: [
      '$P^*$ remains unchanged, $Q^*$ increases',
      '$P^*$ increases, $Q^*$ remains unchanged',
      '$P^*$ decreases, $Q^*$ decreases',
      'Both $P^*$ and $Q^*$ remain completely unchanged'
    ],
    correctIndex: 0,
    explanation: 'Equal rightward shifts in demand and supply increase equilibrium quantity while pushing price up (via D) and down (via S) by equal amounts, leaving $P^*$ unchanged.',
    hints: [
      'Demand shift pushes $P$ up and $Q$ up.',
      'Supply shift pushes $P$ down and $Q$ up.',
      'If magnitudes are equal, price changes cancel out while quantity increases.'
    ]
  },
  {
    id: 'c17',
    nodeId: 'c12_eco_cbse_118',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a market with free entry and exit, identical firms have long-run average cost curve $LRAC = q^2 - 8q + 30$. Calculate the long-run market equilibrium price $P^*$.',
    correctAnswer: 14,
    tolerance: 0.1,
    explanation: 'Min $LRAC$ occurs where $\\frac{d(LRAC)}{dq} = 2q - 8 = 0 \\implies q = 4$. Minimum $LRAC = 4^2 - 8(4) + 30 = 16 - 32 + 30 = 14$. Under free entry/exit, $P^* = \\min LRAC = 14$.',
    hints: [
      'Find the quantity where LRAC reaches its minimum.',
      'Derivative $2q - 8 = 0 \\implies q = 4$.',
      'Substitute $q = 4$ into $LRAC$: $16 - 32 + 30 = 14$.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c18',
    nodeId: 'c12_eco_cbse_118',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Using min $LRAC = 14$ and individual firm quantity $q = 4$, if total market demand is $Q^D = 560 - 10P$, calculate the equilibrium number of active firms ($N^*$).',
    correctAnswer: 105,
    tolerance: 0.5,
    explanation: 'At $P^* = 14$, market demand $Q^D = 560 - 10(14) = 420$. Number of firms $N^* = \\frac{Q^D}{q} = \\frac{420}{4} = 105$.',
    hints: [
      'Find total market quantity $Q^D$ at $P^* = 14$.',
      '$Q^D = 560 - 140 = 420$.',
      'Divide market output by individual firm output: $420 / 4 = 105$.'
    ]
  },
  {
    id: 'c19',
    nodeId: 'c12_eco_cbse_119',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Under Free Entry and Exit, if market demand shifts rightward due to population growth, what is the long-run effect on equilibrium price and number of firms?',
    options: [
      'Price rises permanently, number of firms stays constant',
      'Price returns to $\\min LRAC$, while the number of firms increases',
      'Price drops below zero, firms exit',
      'Price rises and number of firms decreases'
    ],
    correctIndex: 1,
    explanation: 'In short run, price rises creating supernormal profits. This attracts new firms to enter until price falls back to $P = \\min LRAC$, resulting in more total firms $N^*$ at original price.',
    hints: [
      'Positive profits attract new firm entry.',
      'Entry expands supply until profits equal zero ($P = \\min LRAC$).',
      'Price returns to min LRAC and number of firms increases.'
    ]
  },
  {
    id: 'c20',
    nodeId: 'c12_eco_cbse_122',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Compare market response to a demand increase under Fixed Number of Firms vs Free Entry/Exit:',
    options: [
      'Fixed firms: price rises; Free entry: price returns to min AC while total quantity expands further',
      'Fixed firms: quantity does not change; Free entry: quantity drops',
      'Both have identical price and quantity responses',
      'Free entry causes higher long-run price than fixed firms'
    ],
    correctIndex: 0,
    explanation: 'With fixed firms, supply is less elastic so price absorbs the demand increase. With free entry, horizontal long-run supply allows full quantity expansion at constant price $P = \\min AC$.',
    hints: [
      'Fixed number of firms restricts total supply capacity.',
      'Free entry allows supply to expand horizontally at min AC.',
      'Fixed firms: price rises; Free entry: price returns to min AC.'
    ]
  },
  {
    id: 'c21',
    nodeId: 'c12_eco_cbse_109',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Adam Smith\'s "Invisible Hand" mechanism in a competitive market operates primarily through:',
    options: [
      'Central government administrative price decrees',
      'Price signals driving self-interested buyers and sellers to eliminate surpluses and shortages',
      'Monopoly pricing power',
      'Rationing coupons distributed by municipal authorities'
    ],
    correctIndex: 1,
    explanation: 'Price signals act as an automatic coordinating mechanism: shortages drive prices up and surpluses drive prices down until $q^d = q^s$ without central coordination.',
    hints: [
      'How do market prices self-correct when surplus or shortage occurs?',
      'Price changes incentive behavior of buyers and sellers.',
      'Price signals driving self-interested buyers and sellers.'
    ]
  },
  {
    id: 'c22',
    nodeId: 'c12_eco_cbse_123',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In a labor market, output price $P = ₹50$, wage rate $W = ₹300$. If marginal product of labour is $MP_L = 10 - 0.5L$, calculate the optimal units of labour $L^*$ hired by the profit-maximizing firm.',
    correctAnswer: 8,
    tolerance: 0.1,
    explanation: '$VMP_L = W \\implies P \\times MP_L = W \\implies 50(10 - 0.5L) = 300 \\implies 500 - 25L = 300 \\implies 25L = 200 \\implies L^* = 8$.',
    hints: [
      'Set $VMP_L = W$.',
      '$50 \\times (10 - 0.5L) = 300$.',
      '$500 - 25L = 300 \\implies 25L = 200 \\implies L = 8$.'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Demand & Supply Equilibrium Graph with Shift Dynamics
const MarketEquilibriumDiagram: React.FC<{
  dDemandIntercept: number;
  dSupplyIntercept: number;
  dDemandSlope: number;
  dSupplySlope: number;
  showShortageSurplus?: boolean;
  priceControl?: number | null;
  controlType?: 'ceiling' | 'floor' | null;
}> = ({
  dDemandIntercept,
  dSupplyIntercept,
  dDemandSlope,
  dSupplySlope,
  priceControl = null,
  controlType = null
}) => {
  // Compute equilibrium: a - b*p = c + d*p => (a - c) = (b + d)*p => p* = (a - c)/(b + d)
  const pStar = (dDemandIntercept - dSupplyIntercept) / (dDemandSlope + dSupplySlope);
  const qStar = dDemandIntercept - dDemandSlope * pStar;

  // SVG dimensions
  const width = 480;
  const height = 320;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;

  // Scale mappings: P in [0, 50], Q in [0, 400]
  const maxP = 50;
  const maxQ = 400;

  const scaleX = (q: number) => margin.left + (q / maxQ) * graphW;
  const scaleY = (p: number) => margin.top + graphH - (p / maxP) * graphH;

  // Points for D line: p=0 -> Q=a, p=maxP -> Q=a-b*maxP
  const qD_p0 = dDemandIntercept;
  const qD_pMax = Math.max(0, dDemandIntercept - dDemandSlope * maxP);
  const xD1 = scaleX(qD_p0);
  const yD1 = scaleY(0);
  const xD2 = scaleX(qD_pMax);
  const yD2 = scaleY(maxP);

  // Points for S line: p=0 -> Q=c, p=maxP -> Q=c+d*maxP
  const qS_p0 = Math.max(0, dSupplyIntercept);
  const qS_pMax = dSupplyIntercept + dSupplySlope * maxP;
  const xS1 = scaleX(qS_p0);
  const yS1 = scaleY(0);
  const xS2 = scaleX(qS_pMax);
  const yS2 = scaleY(maxP);

  // Price Control calculations
  let qD_ctrl = 0;
  let qS_ctrl = 0;
  let isBinding = false;
  if (priceControl !== null) {
    qD_ctrl = Math.max(0, dDemandIntercept - dDemandSlope * priceControl);
    qS_ctrl = Math.max(0, dSupplyIntercept + dSupplySlope * priceControl);
    if (controlType === 'ceiling' && priceControl < pStar) isBinding = true;
    if (controlType === 'floor' && priceControl > pStar) isBinding = true;
  }

  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-gold-500/30 shadow-xl text-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gold-300 text-sm">Market Equilibrium (D & S Curves)</h4>
        <span className="text-xs font-mono bg-gold-950 px-2 py-1 rounded text-gold-200 border border-gold-700">
          P* = ₹{pStar.toFixed(1)} | Q* = {qStar.toFixed(1)} units
        </span>
      </div>
      <svg width={width} height={height} className="w-full h-auto overflow-visible">
        {/* Grid lines */}
        {[10, 20, 30, 40].map((pVal) => (
          <line
            key={`grid-p-${pVal}`}
            x1={margin.left}
            y1={scaleY(pVal)}
            x2={margin.left + graphW}
            y2={scaleY(pVal)}
            stroke="#334155"
            strokeDasharray="3 3"
          />
        ))}
        {[100, 200, 300].map((qVal) => (
          <line
            key={`grid-q-${qVal}`}
            x1={scaleX(qVal)}
            y1={margin.top}
            x2={scaleX(qVal)}
            y2={margin.top + graphH}
            stroke="#334155"
            strokeDasharray="3 3"
          />
        ))}

        {/* Axes */}
        <line x1={margin.left} y1={margin.top + graphH} x2={margin.left + graphW} y2={margin.top + graphH} stroke="#94a3b8" strokeWidth="2" />
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + graphH} stroke="#94a3b8" strokeWidth="2" />

        {/* Axis Labels */}
        <text x={margin.left + graphW / 2} y={height - 10} fill="#cbd5e1" fontSize="12" textAnchor="middle">
          Quantity (Q)
        </text>
        <text x={15} y={margin.top + graphH / 2} fill="#cbd5e1" fontSize="12" textAnchor="middle" transform={`rotate(-90, 15, ${margin.top + graphH / 2})`}>
          Price (P in ₹)
        </text>

        {/* Demand Line */}
        <line x1={xD1} y1={yD1} x2={xD2} y2={yD2} stroke="#38bdf8" strokeWidth="3" className="transition-all duration-300" />
        <text x={xD2 + 8} y={yD2 + 4} fill="#38bdf8" fontSize="13" fontWeight="bold">D</text>

        {/* Supply Line */}
        <line x1={xS1} y1={yS1} x2={xS2} y2={yS2} stroke="#f43f5e" strokeWidth="3" className="transition-all duration-300" />
        <text x={xS2 + 8} y={yS2 + 4} fill="#f43f5e" fontSize="13" fontWeight="bold">S</text>

        {/* Equilibrium Dashed lines */}
        <line x1={margin.left} y1={scaleY(pStar)} x2={scaleX(qStar)} y2={scaleY(pStar)} stroke="#fbbf24" strokeDasharray="4 4" strokeWidth="1.5" />
        <line x1={scaleX(qStar)} y1={scaleY(pStar)} x2={scaleX(qStar)} y2={margin.top + graphH} stroke="#fbbf24" strokeDasharray="4 4" strokeWidth="1.5" />

        {/* Equilibrium Point */}
        <circle cx={scaleX(qStar)} cy={scaleY(pStar)} r="6" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />
        <text x={scaleX(qStar) + 10} y={scaleY(pStar) - 10} fill="#fbbf24" fontSize="12" fontWeight="bold">E (P*, Q*)</text>

        {/* Price Controls Rendering */}
        {priceControl !== null && (
          <g>
            <line
              x1={margin.left}
              y1={scaleY(priceControl)}
              x2={margin.left + graphW}
              y2={scaleY(priceControl)}
              stroke={controlType === 'ceiling' ? '#a855f7' : '#10b981'}
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            <text
              x={margin.left + 10}
              y={scaleY(priceControl) - 6}
              fill={controlType === 'ceiling' ? '#c084fc' : '#34d399'}
              fontSize="11"
              fontWeight="bold"
            >
              {controlType === 'ceiling' ? 'Price Ceiling' : 'Price Floor'} (P = ₹{priceControl})
              {!isBinding ? ' [Non-Binding]' : ''}
            </text>

            {isBinding && (
              <g>
                {/* Points on D and S curves */}
                <circle cx={scaleX(qD_ctrl)} cy={scaleY(priceControl)} r="4" fill="#38bdf8" />
                <circle cx={scaleX(qS_ctrl)} cy={scaleY(priceControl)} r="4" fill="#f43f5e" />

                {/* Shaded Area for Surplus or Shortage */}
                {controlType === 'ceiling' && priceControl < pStar && (
                  <rect
                    x={scaleX(qS_ctrl)}
                    y={scaleY(pStar) - (scaleY(priceControl) - scaleY(pStar))}
                    width={scaleX(qD_ctrl) - scaleX(qS_ctrl)}
                    height={scaleY(priceControl) - scaleY(pStar)}
                    fill="#a855f7"
                    fillOpacity="0.25"
                  />
                )}
                {controlType === 'floor' && priceControl > pStar && (
                  <rect
                    x={scaleX(qD_ctrl)}
                    y={scaleY(priceControl)}
                    width={scaleX(qS_ctrl) - scaleX(qD_ctrl)}
                    height={scaleY(pStar) - scaleY(priceControl)}
                    fill="#10b981"
                    fillOpacity="0.25"
                  />
                )}

                <text
                  x={(scaleX(qD_ctrl) + scaleX(qS_ctrl)) / 2}
                  y={scaleY(priceControl) + 18}
                  fill="#f8fafc"
                  fontSize="11"
                  textAnchor="middle"
                  fontWeight="bold"
                  className="bg-slate-900"
                >
                  {controlType === 'ceiling' ? `Shortage: ${(qD_ctrl - qS_ctrl).toFixed(0)} units` : `Surplus: ${(qS_ctrl - qD_ctrl).toFixed(0)} units`}
                </text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

// Diagram 2: Free Entry and Exit Long-Run Firm & Market Equilibrium
const FreeEntryExitDiagram: React.FC<{
  marketDemandIntercept: number;
  minLRAC: number;
  firmOptQ: number;
}> = ({ marketDemandIntercept, minLRAC, firmOptQ }) => {
  const pStar = minLRAC;
  // Q_market = DemandIntercept - 10 * P
  const totalQ = Math.max(10, marketDemandIntercept - 10 * pStar);
  const numFirms = Math.max(1, Math.round(totalQ / firmOptQ));

  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 shadow-xl text-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-emerald-300 text-sm">Free Entry & Exit Long-Run Equilibrium</h4>
        <span className="text-xs font-mono bg-emerald-950 px-2 py-1 rounded text-emerald-200 border border-emerald-700">
          P* = min LRAC = ₹{minLRAC} | Active Firms (N*) = {numFirms}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Representative Firm View */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <p className="text-xs font-bold text-center text-emerald-400 mb-1">Single Firm Level</p>
          <svg width="200" height="180" className="mx-auto overflow-visible">
            <line x1="30" y1="150" x2="190" y2="150" stroke="#94a3b8" />
            <line x1="30" y1="20" x2="30" y2="150" stroke="#94a3b8" />
            {/* U-Shaped LRAC Curve */}
            <path d="M 40 40 Q 110 160 180 40" stroke="#10b981" strokeWidth="2.5" fill="none" />
            <text x="170" y="30" fill="#10b981" fontSize="10" fontWeight="bold">LRAC</text>
            {/* Horizontal Price Line = P* = min LRAC */}
            <line x1="30" y1="100" x2="190" y2="100" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
            <text x="35" y="93" fill="#fbbf24" fontSize="10" fontWeight="bold">P = min LRAC</text>
            <circle cx="110" cy="100" r="4" fill="#fbbf24" />
            <text x="110" y="165" fill="#cbd5e1" fontSize="10" textAnchor="middle">q* = {firmOptQ}</text>
            <text x="15" y="105" fill="#cbd5e1" fontSize="10" textAnchor="end">₹{minLRAC}</text>
          </svg>
          <p className="text-[11px] text-center text-slate-400 mt-1">Zero Economic Profit ($\pi = 0$)</p>
        </div>

        {/* Market Level View */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <p className="text-xs font-bold text-center text-gold-400 mb-1">Market Level (LR Supply)</p>
          <svg width="200" height="180" className="mx-auto overflow-visible">
            <line x1="30" y1="150" x2="190" y2="150" stroke="#94a3b8" />
            <line x1="30" y1="20" x2="30" y2="150" stroke="#94a3b8" />
            {/* Horizontal Long Run Supply Curve */}
            <line x1="30" y1="100" x2="190" y2="100" stroke="#06b6d4" strokeWidth="3" />
            <text x="150" y="92" fill="#06b6d4" fontSize="10" fontWeight="bold">LR Market Supply</text>
            {/* Downward sloping Demand */}
            <line x1="40" y1="30" x2="180" y2="140" stroke="#38bdf8" strokeWidth="2" />
            <text x="175" y="145" fill="#38bdf8" fontSize="10" fontWeight="bold">D</text>
            <circle cx="123" cy="100" r="4" fill="#fbbf24" />
            <text x="123" y="165" fill="#cbd5e1" fontSize="10" textAnchor="middle">Q* = {totalQ.toFixed(0)}</text>
          </svg>
          <p className="text-[11px] text-center text-slate-400 mt-1">Price locked at min LRAC horizontally</p>
        </div>
      </div>
    </div>
  );
};

// Diagram 3: Factor Market - Labour Demand & Value of Marginal Product (VMPL)
const LabourMarketDiagram: React.FC<{
  outputPrice: number;
  wageRate: number;
  onLaborSelect?: (l: number) => void;
}> = ({ outputPrice, wageRate }) => {
  // MPL function: MPL = 12 - L
  // VMPL = P * (12 - L)
  // Optimal L when VMPL = Wage => P*(12 - L) = Wage => 12 - L = Wage / P => L* = 12 - Wage / P
  const optimalL = Math.max(0, Math.min(11, 12 - wageRate / outputPrice));

  const width = 420;
  const height = 240;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;

  const maxL = 12;
  const maxVMPL = 300;

  const scaleX = (l: number) => margin.left + (l / maxL) * graphW;
  const scaleY = (v: number) => margin.top + graphH - (v / maxVMPL) * graphH;

  // Generate VMPL curve points
  const points = [];
  for (let l = 0; l <= 11; l += 0.5) {
    const vmpl = outputPrice * (12 - l);
    points.push(`${scaleX(l)},${scaleY(vmpl)}`);
  }

  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30 shadow-xl text-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-amber-300 text-sm">Labour Demand ($VMP_L = P \\times MP_L$)</h4>
        <span className="text-xs font-mono bg-amber-950 px-2 py-1 rounded text-amber-200 border border-amber-700">
          Optimal Labour ($L^*$) = {optimalL.toFixed(1)} workers
        </span>
      </div>
      <svg width={width} height={height} className="w-full h-auto overflow-visible">
        {/* Axes */}
        <line x1={margin.left} y1={margin.top + graphH} x2={margin.left + graphW} y2={margin.top + graphH} stroke="#94a3b8" strokeWidth="2" />
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + graphH} stroke="#94a3b8" strokeWidth="2" />

        {/* Axis Labels */}
        <text x={margin.left + graphW / 2} y={height - 5} fill="#cbd5e1" fontSize="11" textAnchor="middle">
          Labour Units (L)
        </text>
        <text x={15} y={margin.top + graphH / 2} fill="#cbd5e1" fontSize="11" textAnchor="middle" transform={`rotate(-90, 15, ${margin.top + graphH / 2})`}>
          Wage / VMPL (₹)
        </text>

        {/* VMPL Polyline */}
        <polyline points={points.join(' ')} fill="none" stroke="#f59e0b" strokeWidth="3" />
        <text x={scaleX(10)} y={scaleY(outputPrice * 2) - 8} fill="#f59e0b" fontSize="11" fontWeight="bold">
          $VMP_L$ Curve
        </text>

        {/* Wage horizontal line */}
        <line
          x1={margin.left}
          y1={scaleY(wageRate)}
          x2={margin.left + graphW}
          y2={scaleY(wageRate)}
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text x={margin.left + graphW - 40} y={scaleY(wageRate) - 6} fill="#ef4444" fontSize="11" fontWeight="bold">
          Wage W = ₹{wageRate}
        </text>

        {/* Equilibrium Point */}
        <circle cx={scaleX(optimalL)} cy={scaleY(wageRate)} r="5" fill="#38bdf8" />
        <line x1={scaleX(optimalL)} y1={scaleY(wageRate)} x2={scaleX(optimalL)} y2={margin.top + graphH} stroke="#38bdf8" strokeDasharray="3 3" />
        <text x={scaleX(optimalL)} y={margin.top + graphH + 15} fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
          L* = {optimalL.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export interface SimProps {
  onComplete?: (score: number) => void;
}

const C12_EcoMarketEquilibriumCBSESim: React.FC<SimProps> = ({ onComplete }) => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State Variables
  const [labMode, setLabMode] = useState<'fixed' | 'shifts' | 'free_entry' | 'labour' | 'controls'>('fixed');

  // Lab 1 & 2: Fixed Firms Demand/Supply Sliders
  const [demandIntercept, setDemandIntercept] = useState<number>(250); // 'a'
  const [supplyIntercept, setSupplyIntercept] = useState<number>(50);  // 'c'
  const [demandSlope, setDemandSlope] = useState<number>(5);         // 'b'
  const [supplySlope, setSupplySlope] = useState<number>(5);         // 'd'

  // Lab 2: Shift Modifiers
  const [demandShift, setDemandShift] = useState<number>(0);
  const [supplyShift, setSupplyShift] = useState<number>(0);

  // Lab 3: Free Entry & Exit State
  const [minLRAC, setMinLRAC] = useState<number>(15);
  const [firmOptQ, setFirmOptQ] = useState<number>(5);
  const [freeDemandIntercept, setFreeDemandIntercept] = useState<number>(300);

  // Lab 4: Labour Market State
  const [outputPrice, setOutputPrice] = useState<number>(25);
  const [wageRate, setWageRate] = useState<number>(150);

  // Lab 5: Price Control State
  const [priceControlVal, setPriceControlVal] = useState<number>(15);
  const [controlType, setControlType] = useState<'ceiling' | 'floor'>('ceiling');

  // Discovery Question State
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction / Observation Questions Answers State
  const [predictionAnswers, setPredictionAnswers] = useState<{ [key: number]: number }>({});
  const [observationAnswers, setObservationAnswers] = useState<{ [key: number]: number }>({});

  // Challenges Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userMcqAnswer, setUserMcqAnswer] = useState<number | null>(null);
  const [userNumAnswer, setUserNumAnswer] = useState<string>('');
  const [challengeStatus, setChallengeStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [challengesCompletedCount, setChallengesCompletedCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // BKT & SRS States
  const [bktState, setBktState] = useState(() =>
    ALL_NODE_IDS.reduce((acc, nodeId) => {
      acc[nodeId] = createBKTState();
      return acc;
    }, {} as Record<NodeId, ReturnType<typeof createBKTState>>)
  );

  const [srsItems, setSrsItems] = useState(() =>
    ALL_NODE_IDS.reduce((acc, nodeId) => {
      acc[nodeId] = createReviewItem(nodeId);
      return acc;
    }, {} as Record<NodeId, ReturnType<typeof createReviewItem>>)
  );

  // Feedback & UI State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Computed values for Lab 1 & 2
  const effectiveDemandIntercept = demandIntercept + demandShift;
  const effectiveSupplyIntercept = supplyIntercept - supplyShift; // Shifting supply right means higher Q at same P or lower P at same Q

  const calcPStar = useMemo(() => {
    return Math.max(0, (effectiveDemandIntercept - effectiveSupplyIntercept) / (demandSlope + supplySlope));
  }, [effectiveDemandIntercept, effectiveSupplyIntercept, demandSlope, supplySlope]);

  const calcQStar = useMemo(() => {
    return Math.max(0, effectiveDemandIntercept - demandSlope * calcPStar);
  }, [effectiveDemandIntercept, demandSlope, calcPStar]);

  // Audio & Speech helper wrapper
  const playSound = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch (e) {
      // Audio fallback
    }
  }, []);

  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch (e) {
      // Speech fallback
    }
  }, []);

  // Inactivity auto-hint timer
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && challengeStatus === 'unanswered') {
        const currentChal = CHALLENGES[currentChallengeIdx];
        if (currentChal && currentChal.hints.length > 0) {
          setCurrentHint(`Hint: ${currentChal.hints[0]}`);
          setShowHint(true);
          playSound('hint');
        }
      }
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, challengeStatus, activeTab, playSound]);

  // Discovery Question handler
  const handleDiscoverySubmit = (idx: number) => {
    setSelectedDiscoveryOption(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      setShowSparkle(true);
      speakText('Correct discovery! Price ceilings create unintended market shortages.');
    } else {
      playSound('error');
      speakText('Not quite. Consider how suppliers react when prices are kept artificially low.');
    }
  };

  // Prediction Question handler
  const handlePredictionAnswer = (predIdx: number, optIdx: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [predIdx]: optIdx }));
    const question = PREDICTION_QUESTIONS[predIdx];
    if (optIdx === question.correctIndex) {
      playSound('drop-correct');
      speakText('Great prediction!');
    } else {
      playSound('drop-wrong');
    }
  };

  // Observation Question handler
  const handleObservationAnswer = (obsIdx: number, optIdx: number) => {
    setObservationAnswers((prev) => ({ ...prev, [obsIdx]: optIdx }));
    const question = OBSERVATION_QUESTIONS[obsIdx];
    if (optIdx === question.correctIndex) {
      playSound('drop-correct');
      speakText('Accurate observation of market mechanics!');
    } else {
      playSound('drop-wrong');
    }
  };

  // Challenge evaluation handler
  const handleChallengeSubmit = () => {
    const currentChal = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (currentChal.type === 'mcq') {
      isCorrect = userMcqAnswer === currentChal.correctIndex;
    } else if (currentChal.type === 'numeric') {
      const val = parseFloat(userNumAnswer);
      if (!isNaN(val) && currentChal.correctAnswer !== undefined) {
        const tol = currentChal.tolerance || 0.1;
        isCorrect = Math.abs(val - currentChal.correctAnswer) <= tol;
      }
    }

    if (isCorrect) {
      playSound('success');
      setShowSparkle(true);
      setChallengeStatus('correct');
      setScore((prev) => prev + 10);
      speakText('Outstanding economic reasoning!');

      // Update BKT & SRS
      const nodeId = currentChal.nodeId;
      setBktState((prev) => ({
        ...prev,
        [nodeId]: bktUpdate(prev[nodeId], true)
      }));
      setSrsItems((prev) => ({
        ...prev,
        [nodeId]: sm2Update(prev[nodeId], 5)
      }));
    } else {
      playSound('error');
      setChallengeStatus('incorrect');
      speakText('That is not correct. Review the explanation and try again.');

      const nodeId = currentChal.nodeId;
      setBktState((prev) => ({
        ...prev,
        [nodeId]: bktUpdate(prev[nodeId], false)
      }));
      setSrsItems((prev) => ({
        ...prev,
        [nodeId]: sm2Update(prev[nodeId], 1)
      }));
    }
  };

  const handleNextChallenge = () => {
    setShowHint(false);
    setUserMcqAnswer(null);
    setUserNumAnswer('');
    setChallengeStatus('unanswered');

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setChallengesCompletedCount((prev) => prev + 1);
      playSound('swoop');
    } else {
      // Completed all challenges
      setShowConfetti(true);
      setShowSuccess(true);
      playSound('celebration');
      speakText('Congratulations! You have mastered Market Equilibrium and Economic Policy analysis.');
      if (onComplete) {
        onComplete(score + 10);
      }
      // Record overall score
      ALL_NODE_IDS.forEach((id) => recordGameScore(id, 100));
    }
  };

  // Overall Mastery calculation
  const overallMastery = useMemo(() => {
    const total = ALL_NODE_IDS.reduce((sum, nodeId) => {
      const level = getMasteryLevel(bktState[nodeId]);
      return sum + (level === 'mastered' ? 1 : level === 'beginner' ? 0.5 : 0.1);
    }, 0);
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6">
      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-gold-500 to-purple-600 rounded-xl shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gold-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">Class 12 Economics (ISC/CBSE) — Dynamic Market Equilibrium & Policy Interventions</p>
          </div>
        </div>

        {/* STATS BADGES */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex flex-col items-center">
            <span className="text-slate-400">Mastery</span>
            <span className="text-emerald-400 font-bold text-sm">{overallMastery}%</span>
          </div>
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex flex-col items-center">
            <span className="text-slate-400">Score</span>
            <span className="text-amber-400 font-bold text-sm">{score} pts</span>
          </div>
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex flex-col items-center">
            <span className="text-slate-400">Challenges</span>
            <span className="text-gold-400 font-bold text-sm">{currentChallengeIdx + 1}/{CHALLENGES.length}</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-2">
        <button
          onClick={() => { setActiveTab('discovery'); playSound('tap'); }}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'discovery' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>💡</span> 1. Discovery & Concept
        </button>
        <button
          onClick={() => { setActiveTab('lab'); playSound('tap'); }}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'lab' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>🧪</span> 2. Interactive Simulation Lab
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'challenges' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>🎯</span> 3. Mastery Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => { setActiveTab('summary'); playSound('tap'); }}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'summary' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>📚</span> 4. Review & Real-World Application
        </button>
      </nav>

      {/* MAIN CONTENT PANELS */}
      <main className="flex-1">
        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
              <h2 className="text-lg font-bold text-gold-300">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Discovery Core Question */}
            <div className="bg-slate-900 border border-gold-500/30 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm">
                <span>🧐</span> Initial Intuition Check (Discovery)
              </div>
              <h3 className="text-md font-medium text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      selectedDiscoveryOption === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="p-4 rounded-xl bg-slate-950 border border-gold-500/40 text-xs text-gold-200 leading-relaxed">
                  <span className="font-bold text-gold-400">Economic Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Predictions List */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-md font-bold text-gold-300">Hypothesis & Predictions</h3>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-medium text-slate-200">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handlePredictionAnswer(pIdx, oIdx)}
                        className={`p-3 rounded-lg text-xs text-left border transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pred.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 italic">Verify in Lab: {pred.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LAB SIMULATION */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Bar */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {EXPLORATION_STEPS.map((step, idx) => {
                  const modeKey = idx === 0 ? 'fixed' : idx === 1 ? 'shifts' : idx === 2 ? 'free_entry' : idx === 3 ? 'labour' : 'controls';
                  return (
                    <button
                      key={idx}
                      onClick={() => { setLabMode(modeKey as typeof labMode); playSound('tap'); }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        labMode === modeKey
                          ? 'bg-gradient-to-r from-gold-600 to-purple-600 border-gold-400 text-white shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {step.title}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-3 px-1">
                <span className="font-bold text-gold-400">Current Task: </span>
                {EXPLORATION_STEPS.find((_, i) => (i === 0 && labMode === 'fixed') || (i === 1 && labMode === 'shifts') || (i === 2 && labMode === 'free_entry') || (i === 3 && labMode === 'labour') || (i === 4 && labMode === 'controls'))?.instruction}
              </p>
            </div>

            {/* LAB VIEW ENGINE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">Simulation Controls</h3>

                {/* MODE 1 & 2: FIXED & SHIFTS CONTROLS */}
                {(labMode === 'fixed' || labMode === 'shifts') && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Demand Intercept (a): {demandIntercept}</span>
                      </div>
                      <input
                        type="range"
                        min="150"
                        max="350"
                        value={demandIntercept}
                        onChange={(e) => { setDemandIntercept(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Supply Intercept (c): {supplyIntercept}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={supplyIntercept}
                        onChange={(e) => { setSupplyIntercept(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Demand Slope coefficient (b): {demandSlope}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={demandSlope}
                        onChange={(e) => { setDemandSlope(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-gold-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Supply Slope coefficient (d): {supplySlope}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={supplySlope}
                        onChange={(e) => { setSupplySlope(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-rose-400"
                      />
                    </div>

                    {labMode === 'shifts' && (
                      <div className="pt-3 border-t border-slate-800 space-y-3">
                        <p className="font-bold text-purple-300">Simultaneous Shifts</p>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gold-300">Demand Curve Shift ($\Delta D$): {demandShift}</span>
                          </div>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={demandShift}
                            onChange={(e) => { setDemandShift(Number(e.target.value)); playSound('whoosh'); }}
                            className="w-full accent-gold-400"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-pink-300">Supply Curve Shift ($\Delta S$): {supplyShift}</span>
                          </div>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={supplyShift}
                            onChange={(e) => { setSupplyShift(Number(e.target.value)); playSound('whoosh'); }}
                            className="w-full accent-pink-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* MODE 3: FREE ENTRY & EXIT CONTROLS */}
                {labMode === 'free_entry' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-emerald-300">Minimum LRAC (Long-Run Average Cost): ₹{minLRAC}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={minLRAC}
                        onChange={(e) => { setMinLRAC(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Optimal Output per Firm ($q^*$): {firmOptQ} units</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        value={firmOptQ}
                        onChange={(e) => { setFirmOptQ(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Market Demand Intercept: {freeDemandIntercept}</span>
                      </div>
                      <input
                        type="range"
                        min="150"
                        max="500"
                        value={freeDemandIntercept}
                        onChange={(e) => { setFreeDemandIntercept(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                )}

                {/* MODE 4: LABOUR MARKET CONTROLS */}
                {labMode === 'labour' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-amber-300">Commodity Output Price (P): ₹{outputPrice}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        value={outputPrice}
                        onChange={(e) => { setOutputPrice(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-rose-300">Wage Rate (W): ₹{wageRate}</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="280"
                        value={wageRate}
                        onChange={(e) => { setWageRate(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <p className="font-bold text-amber-400">Diminishing Marginal Product Equation:</p>
                      <p>$MP_L = 12 - L$</p>
                      <p>$VMP_L = P \\times (12 - L) = {outputPrice} \\times (12 - L)$</p>
                    </div>
                  </div>
                )}

                {/* MODE 5: PRICE CONTROLS */}
                {labMode === 'controls' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setControlType('ceiling'); setPriceControlVal(15); playSound('tap'); }}
                        className={`flex-1 py-2 rounded-lg font-bold border ${
                          controlType === 'ceiling' ? 'bg-purple-900 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Price Ceiling
                      </button>
                      <button
                        onClick={() => { setControlType('floor'); setPriceControlVal(35); playSound('tap'); }}
                        className={`flex-1 py-2 rounded-lg font-bold border ${
                          controlType === 'floor' ? 'bg-emerald-900 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Price Floor (MSP)
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Policy Price Level (P_ctrl): ₹{priceControlVal}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="45"
                        value={priceControlVal}
                        onChange={(e) => { setPriceControlVal(Number(e.target.value)); playSound('count'); }}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Graphic Visualization Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {(labMode === 'fixed' || labMode === 'shifts') && (
                  <MarketEquilibriumDiagram
                    dDemandIntercept={effectiveDemandIntercept}
                    dSupplyIntercept={effectiveSupplyIntercept}
                    dDemandSlope={demandSlope}
                    dSupplySlope={supplySlope}
                  />
                )}

                {labMode === 'free_entry' && (
                  <FreeEntryExitDiagram
                    marketDemandIntercept={freeDemandIntercept}
                    minLRAC={minLRAC}
                    firmOptQ={firmOptQ}
                  />
                )}

                {labMode === 'labour' && (
                  <LabourMarketDiagram
                    outputPrice={outputPrice}
                    wageRate={wageRate}
                  />
                )}

                {labMode === 'controls' && (
                  <MarketEquilibriumDiagram
                    dDemandIntercept={demandIntercept}
                    dSupplyIntercept={supplyIntercept}
                    dDemandSlope={demandSlope}
                    dSupplySlope={supplySlope}
                    priceControl={priceControlVal}
                    controlType={controlType}
                  />
                )}
              </div>
            </div>

            {/* Observation Questions Section */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-md font-bold text-gold-300">Lab Observations & Analysis</h3>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-medium text-slate-200">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleObservationAnswer(oIdx, optIdx)}
                        className={`p-3 rounded-lg text-xs text-left border transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === obs.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
              {/* Challenge Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                    CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                      ? 'bg-gold-950 text-gold-400 border border-gold-800'
                      : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}>
                    {CHALLENGES[currentChallengeIdx].difficulty} • {CHALLENGES[currentChallengeIdx].competencyLevel}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Node: {CHALLENGES[currentChallengeIdx].nodeId}</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </h3>

              {/* Input Types: MCQ vs Numeric */}
              {CHALLENGES[currentChallengeIdx].type === 'mcq' && CHALLENGES[currentChallengeIdx].options && (
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGES[currentChallengeIdx].options!.map((optionText, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={challengeStatus !== 'unanswered'}
                      onClick={() => { setUserMcqAnswer(oIdx); playSound('tap'); }}
                      className={`p-4 rounded-xl text-left text-sm transition-all border ${
                        userMcqAnswer === oIdx
                          ? 'bg-gold-950 border-gold-500 text-gold-200 font-medium'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                      {optionText}
                    </button>
                  ))}
                </div>
              )}

              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="space-y-3">
                  <label className="block text-xs text-slate-400">Enter calculated numerical answer:</label>
                  <input
                    type="number"
                    disabled={challengeStatus !== 'unanswered'}
                    value={userNumAnswer}
                    onChange={(e) => setUserNumAnswer(e.target.value)}
                    placeholder="Type number here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-base text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              )}

              {/* Hint Display */}
              {showHint && (
                <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                  {currentHint}
                </div>
              )}

              {/* Challenge Status Feedback */}
              {challengeStatus === 'correct' && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 space-y-2">
                  <p className="font-bold text-sm text-emerald-400">✓ Correct!</p>
                  <p>{CHALLENGES[currentChallengeIdx].explanation}</p>
                </div>
              )}

              {challengeStatus === 'incorrect' && (
                <div className="p-4 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs text-rose-200 space-y-2">
                  <p className="font-bold text-sm text-rose-400">✗ Incorrect</p>
                  <p>{CHALLENGES[currentChallengeIdx].explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    const hints = CHALLENGES[currentChallengeIdx].hints;
                    setCurrentHint(hints[Math.floor(Math.random() * hints.length)]);
                    setShowHint(true);
                    playSound('hint');
                  }}
                  className="px-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-amber-400 hover:border-amber-500/50 transition-all"
                >
                  💡 Need a Hint?
                </button>

                {challengeStatus === 'unanswered' ? (
                  <button
                    disabled={userMcqAnswer === null && userNumAnswer.trim() === ''}
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-gold-600 to-purple-600 text-white disabled:opacity-50 hover:shadow-lg transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL WORLD */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-md">
                <span>🌐</span> Real-World Policy Application
              </div>
              <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Step {sIdx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{stepStr}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Matrix */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-md font-bold text-gold-300">Common Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-rose-400">❌ {m.title}</h4>
                    <p className="text-xs text-slate-400">{m.description}</p>
                    <p className="text-xs text-emerald-300 font-medium pt-1 border-t border-slate-900">
                      ✔ <span className="underline">Correction:</span> {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Concepts Chapter Review */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 text-xs">
              <h3 className="text-md font-bold text-gold-300">Chapter Key Concepts Review (ISC/CBSE)</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 leading-relaxed">
                <li><strong className="text-white">Market Equilibrium:</strong> Price where total quantity demanded equals total quantity supplied ($q^d = q^s$).</li>
                <li><strong className="text-white">Invisible Hand Mechanism:</strong> Excess demand drives price UP; excess supply drives price DOWN towards equilibrium.</li>
                <li><strong className="text-white">Price Ceiling:</strong>{' Legal maximum price set below $P^*$. Creates market shortage ($q^d > q^s$), rationing, black markets.'}</li>
                <li><strong className="text-white">Price Floor (MSP):</strong>{' Legal minimum price set above $P^*$. Creates market surplus ($q^s > q^d$) requiring government procurement.'}</li>
                <li><strong className="text-white">Free Entry & Exit Equilibrium:</strong>{' Long-run price equals minimum Average Cost ($\min LRAC$). Economic profits equal zero ($\pi = 0$).'}</li>
                <li><strong className="text-white">Labour Demand & VMPL:</strong> Competitive firm hires labour until $W = VMP_L = P \times MP_L$.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* RENDER FEEDBACK / OVERLAY COMPONENTS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Market Equilibrium Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C12_EcoMarketEquilibriumCBSESim;