/**
 * businessCaseTopics.ts — the case bank for the Business Studies Case Lab
 * (E4 case simulator per SANDBOX_TAXONOMY.md / HUMANITIES_COMMERCE_PLAN.md §C).
 *
 * CLOSED WORLD — every scenario is grounded in the class-12 Business Studies
 * enhanced-nodes corpus (deploy/content/enhanced_nodes_md/c12_bs_*.md), plus
 * the class-10 economics consumer-protection nodes for the redressal case.
 * The grounding map below traces EACH case (and each decision's verdict) to
 * the node that teaches it; scenarios are derived from the nodes' WALKTHROUGH
 * / WORKED_EXAMPLE / COMPETENCY_QUESTION material, and the wrong-pick
 * teaching lines paraphrase the node's principle definitions.
 *
 * Misconception cards are NOT stored here: on a wrong pick the simulator
 * fetches the authored corpus diagnostics for the case's primary node via
 * components/learn/remediation.ts (fetchNodeRemediation) and renders them
 * through MisconceptionPanel — the same closed-world loop as
 * AccountancySandbox. Nodes without authored diagnostics honestly render
 * nothing extra; the static per-option teaching always stands on its own.
 *
 * CORPUS GROUNDING MAP (case → node ids)
 *  1. candles        c12_bs_cbse_01_001 (management: Smita Rai walkthrough,
 *                    power-failure worked example, effectiveness/efficiency
 *                    misconception) + c12_bs_cbse_01_009 (the distinction)
 *  2. fayol          c12_bs_cbse_02_004 (division of work / unity of command
 *                    + unity-of-direction misconception) + 02_001 (nature of
 *                    principles: flexible, cause-effect guidelines)
 *  3. taylor         c12_bs_cbse_02_003 (techniques of scientific
 *                    management; interdependence misconception — "if Time
 *                    Study is done before Motion Study, what goes wrong?")
 *  4. demonetisation c12_bs_cbse_03_001 (business environment: features)
 *                    + c12_bs_cbse_03_002 (five dimensions, inter-related)
 *  5. planroll       c12_bs_cbse_04_001 (planning definition/misconception:
 *                    planning ≠ forecasting) + c12_bs_cbse_04_005
 *                    (single-use plans: a product launch is one-time)
 *  6. growth         c12_bs_cbse_05_004 (functional structure advantages/
 *                    limitations) + 05_005 (divisional structure)
 *                    + 05_007 (informal organisation: cannot be eliminated)
 *  7. hire           c12_bs_cbse_06_005 (internal vs external recruitment:
 *                    context-dependent merits) + c12_bs_cbse_06_003 (HRM is
 *                    a full system, not just hiring)
 *  8. foreman        c12_bs_cbse_07_001 (directing initiates action — not
 *                    just communication) + c12_bs_cbse_07_005 (semantic
 *                    barriers: jargon/encoding; fix via feedback)
 *  9. variance       c12_bs_cbse_08_002 (controlling: five-step cycle,
 *                    management by exception) + c12_bs_cbse_08_001
 *                    (controlling ≠ fault-finding)
 * 10. debtorequity   c12_bs_cbse_09_002 (financing decision: risk, control,
 *                    flexibility, cash flow are co-equal factors — "cheapest
 *                    source" misconception) + c12_bs_cbse_09_004 (mix of
 *                    owners'/borrowed funds)
 * 11. luxcar         c12_bs_cbse_11_008 (promotion mix: luxury case —
 *                    discounts are NOT the main tool) + c12_bs_cbse_11_006
 *                    (price: the only revenue-generating P) + 11_007
 *                    (zero-level channel: company-owned showrooms)
 * 12. fridge         c10_eco_cbse_05_004 (three-tier consumer forums, ₹1
 *                    crore District Commission limit) + c10_eco_cbse_05_003
 *                    (COPRA) + c12_bs_cbse_03_006 (legal environment:
 *                    ASCI self-regulatory vs statutory law)
 */

export type Verdict = 'best' | 'wrong'

export interface DecisionOption {
  id: string
  label: string
  /** 'best' = the corpus-obeying pick; 'wrong' = deterministic failure mode. */
  verdict: Verdict
  /** The principle obeyed/violated, in the teaching node's own terms. */
  principle: string
  /** Deterministic modelled outcome of THIS pick (always the same). */
  outcome: string
}

export interface BusinessDecision {
  id: string
  /** The decision question asked of the student. */
  ask: string
  /** What the student is choosing between (drives the framing chip). */
  kind: string
  options: DecisionOption[]
  /** Node whose authored diagnostics feed the wrong-pick misconception card. */
  nodeId: string
  /** Keyword used to pick the matching authored diagnostic (e.g. "furniture"). */
  hint?: string
}

export interface BusinessCase {
  key: string
  title: string
  emoji: string
  /** CBSE chapter label for the picker chip. */
  chapter: string
  /** One-line framing shown on the case card. */
  summary: string
  /** Scenario paragraphs (corpus-derived — see grounding map). */
  scenario: string[]
  /** Primary node: fetches the authored misconception diagnostics. */
  nodeId: string
  /** Full grounding map rendered in the debrief (all node ids). */
  nodeIds: string[]
  decisions: BusinessDecision[]
}

export const BUSINESS_CASES: BusinessCase[] = [
  // ---------------------------------------------------- 1 · ch1 nature --
  {
    key: 'candles',
    title: 'Namchi Designer Candles — the Diwali order',
    emoji: '🕯️',
    chapter: 'Ch 1 · Nature of Management',
    summary: 'Hit a 5,000-candle order in 15 days — and keep the cost per candle sane.',
    nodeId: 'c12_bs_cbse_01_001',
    nodeIds: ['c12_bs_cbse_01_001', 'c12_bs_cbse_01_009'],
    scenario: [
      'Smita Rai runs Namchi Designer Candles with 20 women workers and limited funds. A Diwali order for 5,000 customised candles is due in 15 days — and her wax supplier has just delayed a shipment.',
      'She can push the order through any way possible, or balance the result against what it costs to produce. Management, the corpus teaches, is getting results (effectiveness) while watching the input-output ratio (efficiency).',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'Raw material is delayed and the 15-day deadline is at risk. What should Smita do first?',
        kind: 'management function',
        nodeId: 'c12_bs_cbse_01_001',
        hint: 'continuous',
        options: [
          {
            id: 'a', label: 'Break the order into daily targets, reassign workers to moulding/packing, and track daily output against the plan',
            verdict: 'best',
            principle: 'Obeyed: the management process — plan, organise, staff, direct, control (c12_bs_cbse_01_001 walkthrough).',
            outcome: 'Output is staged daily; the supplier delay is absorbed by re-sequencing work instead of by emergency spending. The 5,000 candles ship on day 15 at standard cost per candle — effective AND efficient.',
          },
          {
            id: 'b', label: 'Run double shifts and pay premium freight so the order ships no matter what',
            verdict: 'wrong',
            principle: 'Violated: efficiency — doing the task with minimum cost (the node\'s power-failure example).',
            outcome: 'The 5,000 candles ship on time, but overtime and premium freight push the cost per candle far above standard: effective, NOT efficient — the exact shape of the NCERT double-shift example.',
          },
          {
            id: 'c', label: 'Tell the client the order will be late — quality takes time',
            verdict: 'wrong',
            principle: 'Violated: effectiveness — completing activities and achieving goals.',
            outcome: 'Cost stays low but the order misses the Diwali window entirely: efficient-looking inputs, zero effectiveness. NCERT: goods that don\'t reach the market don\'t count.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'Month 1: the factory hit its 2,000-loaf-equivalent candle target but used 10% extra wax and 20% extra labour hours. How do you grade the month?',
        kind: 'concept check',
        nodeId: 'c12_bs_cbse_01_009',
        hint: 'efficiency',
        options: [
          {
            id: 'a', label: 'Effective, not efficient',
            verdict: 'best',
            principle: 'Obeyed: effectiveness = target met; efficiency = minimum input per unit of output (c12_bs_cbse_01_009).',
            outcome: 'Goal achieved (✓ effectiveness), inputs exceeded standards (✗ efficiency). Exactly the quadrant NCERT places the power-failure manager in.',
          },
          {
            id: 'b', label: 'Efficient — the target was achieved, so management worked',
            verdict: 'wrong',
            principle: 'Violated: the effectiveness/efficiency distinction — hitting the target says nothing about the input-output ratio.',
            outcome: 'This is the misconception the corpus flags: "if the target is achieved, management is efficient." The 10% extra wax and 20% extra hours are precisely the efficiency failure hiding behind the met target.',
          },
          {
            id: 'c', label: 'Neither effective nor efficient',
            verdict: 'wrong',
            principle: 'Violated: the binary nature of effectiveness — the target WAS met.',
            outcome: 'Effectiveness is binary (target met/not met) — it was met. Only efficiency is comparative (actual vs standard input). Saying "neither" throws away the achieved half.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'Smita plans the collection, organises funds, briefs workers and checks quality — all in one day, every day. Which characteristic of management does this show?',
        kind: 'characteristic',
        nodeId: 'c12_bs_cbse_01_001',
        hint: 'continuous',
        options: [
          {
            id: 'a', label: 'Management is a continuous process — the functions run simultaneously',
            verdict: 'best',
            principle: 'Obeyed: "a series of continuous, composite but separate functions… performed by all managers all the time" (diagnostic answer 3 of the node).',
            outcome: 'In a small enterprise the owner-manager cannot compartmentalise: staffing, planning and controlling overlap daily. The corpus answers exactly this with the Smita scenario.',
          },
          {
            id: 'b', label: 'Management is intangible — you cannot see it, only feel it',
            verdict: 'wrong',
            principle: 'Violated: the correct mapping of observed behaviour to characteristic — the observable daily functions are the process, not the intangibility.',
            outcome: 'Intangibility is measured only through effects (orderliness, met targets, satisfied employees). The scenario evidence — daily overlapping functions — maps to "continuous process", not to intangibility.',
          },
          {
            id: 'c', label: 'Management is a group activity because 20 workers are involved',
            verdict: 'wrong',
            principle: 'Violated: precise characteristic identification — the scenario shows one owner performing the functions, not team composition.',
            outcome: 'Group activity means management unites diverse individuals toward common goals. The teaching point here is the simultaneity of the functions — the corpus marks "group activity" the wrong map for this evidence.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------- 2 · ch2 Fayol --
  {
    key: 'fayol',
    title: 'Mehak Foods — two bosses, one clerk',
    emoji: '👥',
    chapter: 'Ch 2 · Fayol\'s Principles',
    summary: 'A growing food business keeps giving one clerk two bosses. Predict the pathology.',
    nodeId: 'c12_bs_cbse_02_004',
    nodeIds: ['c12_bs_cbse_02_004', 'c12_bs_cbse_02_001'],
    scenario: [
      'Mehak Foods has grown to four departments. The production head and the sales head BOTH issue daily instructions to the same dispatch clerk — whoever shouts louder gets priority.',
      'Fayol\'s principles are flexible guidelines that cure specific organisational pathologies. The corpus stresses visualising the disease each principle cures — dual subordination, overlapping plans, generalist inefficiency.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'The clerk reports to both the production head and the sales head. Which principle is broken?',
        kind: 'principle',
        nodeId: 'c12_bs_cbse_02_004',
        hint: 'command',
        options: [
          {
            id: 'a', label: 'Unity of Command — one employee should receive orders from only one superior',
            verdict: 'best',
            principle: 'Obeyed: unity of command exists to avoid exactly this confusion, conflict and dual subordination (node definition).',
            outcome: 'Dual subordination is the diagnosed pathology: conflicting priorities, delayed dispatches, and a clerk who can be blamed by both sides. Naming the right principle is the cure\'s first step.',
          },
          {
            id: 'b', label: 'Unity of Direction — one head, one plan for each group of activities',
            verdict: 'wrong',
            principle: 'Violated: the command/direction distinction — the corpus\'s authored misconception for this node.',
            outcome: 'Unity of Direction is about activities with the same objective having ONE head and ONE plan — not about an employee\'s reporting line. The clerk\'s problem is two BOSSES (command), not two PLANS (direction).',
          },
          {
            id: 'c', label: 'Division of Work — the clerk should specialise instead of serving two departments',
            verdict: 'wrong',
            principle: 'Violated: the corpus warns division of work means specialised ROLES for efficiency, not "less work" or fewer masters.',
            outcome: 'The clerk\'s dispatch role IS already specialised. Specialisation is unrelated to the dual-ordering pathology; the diagnosis misses the disease the principle cures.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'All marketing activities — pricing, promotion, distribution — currently sit with three people who plan independently. What does Fayol prescribe?',
        kind: 'principle',
        nodeId: 'c12_bs_cbse_02_004',
        hint: 'direction',
        options: [
          {
            id: 'a', label: 'Unity of Direction: one head and one plan for the whole marketing group',
            verdict: 'best',
            principle: 'Obeyed: unity of direction — "one head one plan" for a group of activities with the same objective.',
            outcome: 'The three planners align under one marketing head with one plan; effort stops pulling in three directions. This is the principle the command/direction confusion usually hides.',
          },
          {
            id: 'b', label: 'Esprit de Corps: build team spirit so they cooperate informally',
            verdict: 'wrong',
            principle: 'Violated: matching the pathology (fragmented plans) to the wrong principle.',
            outcome: 'Team spirit helps morale, but three independent plans need structural unity — one head, one plan. Fayol treats this as unity of direction, not as a morale problem.',
          },
          {
            id: 'c', label: 'Subordination of individual interest: ask each planner to put the company first',
            verdict: 'wrong',
            principle: 'Violated: the principle targets interest conflicts, not plan duplication.',
            outcome: 'Subordination of individual interest cures self-interest over organisational interest. Here nobody is selfish — the plans simply lack a single head. Wrong map again.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'The board wants to cut every salary 20% "because principles are flexible". Does flexibility license this?',
        kind: 'nature of principles',
        nodeId: 'c12_bs_cbse_02_001',
        hint: 'remuneration',
        options: [
          {
            id: 'a', label: 'No — principles are guidelines whose application must be adapted, not ignored; fair remuneration is itself a principle',
            verdict: 'best',
            principle: 'Obeyed: principles are "broad, general guidelines… flexible, but universally applicable with varying extent" (node definition) — equity and fair remuneration remain binding in spirit.',
            outcome: 'The 20% cut breaches equity and fair remuneration: morale and turnover damage outlast the salary saving. Flexibility changes HOW a principle is applied, never whether human dignity in pay counts.',
          },
          {
            id: 'b', label: 'Yes — Fayol said principles are flexible, so any principle can be set aside when convenient',
            verdict: 'wrong',
            principle: 'Violated: the meaning of flexibility in the nature of management principles.',
            outcome: 'Flexible means the DEGREE of application varies with situation — not that principles are optional. The corpus\'s cause-effect grounding (satisfied workers → better performance) still operates.',
          },
        ],
      },
    ],
  },

  // -------------------------------------------------- 3 · ch2 Taylor --
  {
    key: 'taylor',
    title: 'Sharma Workshops — the stopwatch gambit',
    emoji: '⏱️',
    chapter: 'Ch 2 · Taylor\'s Techniques',
    summary: 'A supervisor times an untidy method with a stopwatch. Standardising waste.',
    nodeId: 'c12_bs_cbse_02_003',
    nodeIds: ['c12_bs_cbse_02_003'],
    scenario: [
      'Sharma Workshops makes 40 machine parts a day by a method nobody has ever questioned. The owner\'s son, fresh from a management course, walks the floor with a stopwatch and announces: "I will set the standard time first, then we\'ll look at how the work is done."',
      'Taylor\'s techniques form an interdependent system — the corpus\'s authored misconception for this node is treating them as standalone tools, and it poses exactly this question: if Time Study runs before Motion Study, what goes wrong?',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'Time Study before the method has been examined — what goes wrong?',
        kind: 'technique order',
        nodeId: 'c12_bs_cbse_02_003',
        hint: 'motion',
        options: [
          {
            id: 'a', label: 'Method Study must come first — design the best way, THEN time it',
            verdict: 'best',
            principle: 'Obeyed: the corpus\'s own chain — Method Study designs the workflow, Motion Study strips it to essential motions, only THEN does Time Study measure the optimised cycle.',
            outcome: 'Method Study re-sequences the steps, Motion Study eliminates the wasteful reaches, and the stopwatch finally measures a cycle worth standardising. Standard time locks in the BEST method, not the existing one.',
          },
          {
            id: 'b', label: 'Nothing — timing the current method gives a fair standard',
            verdict: 'wrong',
            principle: 'Violated: the interdependence of the techniques — the node\'s authored misconception.',
            outcome: 'Exactly what the corpus predicts: "you standardise a wasteful method." The stopwatch certifies the old wasteful sequence as the permanent standard — efficiency losses get engraved into the factory.',
          },
          {
            id: 'c', label: 'Skip the studies; pay by output and workers will fix themselves',
            verdict: 'wrong',
            principle: 'Violated: differential piece wage assumes a scientific standard exists first — incentive without method is noise.',
            outcome: 'Without a scientifically determined one-best-way, the piece rate just prices whatever wasteful motion the worker happens to use. Taylor requires the studies before the wage system.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'Two workers produce 45 and 25 parts on the same shift. What does the Differential Piece Wage System pay?',
        kind: 'wage system',
        nodeId: 'c12_bs_cbse_02_003',
        hint: 'wage',
        options: [
          {
            id: 'a', label: 'The efficient worker a higher rate per unit, the inefficient one a lower rate — on the whole output',
            verdict: 'best',
            principle: 'Obeyed: differential piece wage — different rates for above/below standard, rewarding efficiency and penalising inefficiency.',
            outcome: 'The gap between the two workers\' earnings widens deliberately: the efficient worker is rewarded on every unit, the inefficient one feels the pinch and adopts the standard method. Wage differentiation becomes the efficiency engine.',
          },
          {
            id: 'b', label: 'Both the same rate per unit — let effort decide the total',
            verdict: 'wrong',
            principle: 'Violated: the "differential" in the differential piece wage — one flat rate is exactly what Taylor rejected.',
            outcome: 'A single rate gives the inefficient worker the same per-unit reward for wasteful method. The incentive contrast — the whole point of the technique — disappears.',
          },
          {
            id: 'c', label: 'Fine the inefficient worker for the shortfall',
            verdict: 'wrong',
            principle: 'Violated: scientific management rests on mental revolution and reward, not punishment (and the node pairs the wage system with fatigue study and standardisation).',
            outcome: 'Punishment produces hiding, not method. Taylor\'s system pairs the differential rate with training on the one-best-way — fear is not one of the techniques.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'The owner wants ONE strong supervisor per shift; Taylor proposes eight specialist foremen per worker. What is the trade-off?',
        kind: 'functional foremanship',
        nodeId: 'c12_bs_cbse_02_003',
        hint: 'foremanship',
        options: [
          {
            id: 'a', label: 'Taylor trades unity of command for expert supervision — each of the 8 specialists guides one aspect of the work',
            verdict: 'best',
            principle: 'Obeyed: functional foremanship — specialisation of supervisory function; the corpus notes the technique deliberately splits planning and doing across specialists.',
            outcome: 'Each worker receives expert instruction on speed, repairs, quality and discipline from the specialist who owns that function — depth over the single-boss principle, which is why Fayol and Taylor are compared here.',
          },
          {
            id: 'b', label: 'Nothing — eight foremen is just Fayol\'s unity of command at scale',
            verdict: 'wrong',
            principle: 'Violated: the corpus\'s misconception — "functional foremanship means hiring eight foremen" misses the point of expert split supervision.',
            outcome: 'Eight foremen WITHOUT the specialist-function split is just eight bosses — the pathology Fayol warned about. The technique is about WHAT each foreman owns, not the headcount.',
          },
        ],
      },
    ],
  },

  // --------------------------------------------- 4 · ch3 environment --
  {
    key: 'demonetisation',
    title: 'Agam Pulses Mill — the November night',
    emoji: '🌪️',
    chapter: 'Ch 3 · Business Environment',
    summary: 'Currency vanished overnight. Which force hit the mill — and what can a firm do?',
    nodeId: 'c12_bs_cbse_03_002',
    nodeIds: ['c12_bs_cbse_03_001', 'c12_bs_cbse_03_002'],
    scenario: [
      'One November night, high-value currency notes were demonetised. Agam Pulses Mill\'s cash sales stopped, wages had to be deferred, and digital payment vendors started calling.',
      'Business environment is the sum of external forces outside a firm\'s control but inside its decisions. The corpus teaches the five dimensions (economic, social, technological, political, legal) and their features — totality, dynamism, uncertainty, inter-relatedness.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'Demonetisation, interest-rate changes and inflation — which dimension is Agam facing?',
        kind: 'dimension',
        nodeId: 'c12_bs_cbse_03_002',
        hint: 'economic',
        options: [
          {
            id: 'a', label: 'Economic environment — money, credit and price forces',
            verdict: 'best',
            principle: 'Obeyed: economic environment = interest rates, inflation, currency and income forces (the node\'s dimension list).',
            outcome: 'The mill\'s cash sales and wage payments are monetary phenomena — squarely the economic dimension. Interest-rate examples in the corpus sit in the same bucket.',
          },
          {
            id: 'b', label: 'Political environment — the government did it',
            verdict: 'wrong',
            principle: 'Violated: dimension classification — the corpus\'s political/economic boundary.',
            outcome: 'The DECISION was political, but the forces battering the firm (currency withdrawal hitting sales, credit and wages) are economic. Board answers lose marks for classifying the shock by its actor instead of its nature.',
          },
          {
            id: 'c', label: 'Specific forces — because customers stopped paying',
            verdict: 'wrong',
            principle: 'Violated: the specific vs general force distinction in the node definition.',
            outcome: 'Specific forces (customers, suppliers, competitors) hit ONE firm; demonetisation is a general force that hit every cash business simultaneously. The corpus draws exactly this line.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'Within weeks: wage demands rose (inflation), the RBI tightened credit, and the mill speeded up its digital-payments adoption. What does this cascade demonstrate?',
        kind: 'feature',
        nodeId: 'c12_bs_cbse_03_002',
        hint: 'inter-related',
        options: [
          {
            id: 'a', label: 'The dimensions are inter-related — one force ripples through the others',
            verdict: 'best',
            principle: 'Obeyed: the node\'s authored misconception stresses exactly this: dimensions are "closely inter-related", not an isolated checklist.',
            outcome: 'Economic (inflation) → social (wage demands) → political/legal (monetary policy) → technological (digital adoption). Reading dimensions as separate bullets is the rote-learning error the corpus names.',
          },
          {
            id: 'b', label: 'Nothing special — those are just four unrelated events',
            verdict: 'wrong',
            principle: 'Violated: inter-relatedness — treating dimensions as an independent checklist.',
            outcome: 'The corpus explicitly warns against this: examiners reward the ripple-chain (economic → social → political → technological), which is the whole point of the demonetisation-style case.',
          },
          {
            id: 'c', label: 'That the environment is simple — each force has one obvious effect',
            verdict: 'wrong',
            principle: 'Violated: complexity and uncertainty as features of business environment.',
            outcome: 'A single currency decision cascaded through credit, wages, and technology in weeks. The corpus lists complexity and uncertainty among the core features precisely for shocks like this.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'Agam asks: "If I wait long enough, will the environment revert so I need not adapt?" What is the honest answer from the corpus?',
        kind: 'feature',
        nodeId: 'c12_bs_cbse_03_001',
        hint: 'dynamic',
        options: [
          {
            id: 'a', label: 'No — the environment is dynamic and uncertain; firms scan, adapt, and turn change into first-mover advantage',
            verdict: 'best',
            principle: 'Obeyed: dynamic nature + "environment is a source of… first-mover advantage" in the corpus\'s importance of understanding environment.',
            outcome: 'The mill digitalises early and keeps selling when cash-bound competitors stall. Adaptation converts environmental threat into competitive edge — the feature the exam rewards.',
          },
          {
            id: 'b', label: 'Yes — external forces always return to the old normal',
            verdict: 'wrong',
            principle: 'Violated: dynamism — the environment "keeps changing", per the node\'s features.',
            outcome: 'The corpus is explicit: the environment is dynamic — digital payments did not revert. Waiting is itself a decision, and a losing one.',
          },
          {
            id: 'c', label: 'Irrelevant — a firm can control its environment through hard work',
            verdict: 'wrong',
            principle: 'Violated: the definition itself — environment forces are "outside the control of a business enterprise".',
            outcome: 'By definition the firm cannot control these forces — it can only understand and respond to them. Confidence is not control.',
          },
        ],
      },
    ],
  },

  // ------------------------------------------------- 5 · ch4 planning --
  {
    key: 'planroll',
    title: 'Chipster Foods — launching without a plan',
    emoji: '🗺️',
    chapter: 'Ch 4 · Planning',
    summary: 'A sales head wants to skip planning and "read the market as it comes".',
    nodeId: 'c12_bs_cbse_04_001',
    nodeIds: ['c12_bs_cbse_04_001', 'c12_bs_cbse_04_005'],
    scenario: [
      'Chipster Foods will launch a baked snack in three cities. The sales head proposes skipping the planning meeting: "We\'ll forecast demand and react as it comes — planning just slows us down."',
      'Planning is deciding in advance what to do, how, when and by whom — it bridges today and the intended future. The corpus\'s authored misconception: students equate planning with forecasting.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'The head says "I forecast, therefore I plan." What is wrong with that?',
        kind: 'concept',
        nodeId: 'c12_bs_cbse_04_001',
        hint: 'forecast',
        options: [
          {
            id: 'a', label: 'Forecasting is only the premise-gathering input; planning adds objectives, alternatives, a chosen course and action',
            verdict: 'best',
            principle: 'Obeyed: the corpus\'s umbrella analogy — forecasting predicts rain; planning carries the umbrella and leaves at 8 AM.',
            outcome: 'Forecast says "demand likely 5,000 units"; planning decides the target, the two production alternatives, the chosen one, and who executes by when. Decision-orientation is what the head is missing.',
          },
          {
            id: 'b', label: 'Nothing — forecasting and planning are the same mental exercise',
            verdict: 'wrong',
            principle: 'Violated: the planning ≠ forecasting distinction — the node\'s authored misconception.',
            outcome: 'Prediction-oriented is not decision-oriented. The board question "distinguish planning from forecasting" is precisely where this answer scores zero.',
          },
          {
            id: 'c', label: 'Forecasting is superior — numbers beat intentions',
            verdict: 'wrong',
            principle: 'Violated: planning is the PRIMARY function — it precedes and frames every number\'s use.',
            outcome: 'A forecast without a chosen course of action changes nothing. Planning is primary because organising, staffing, directing and controlling all execute the plan.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'Reluctantly, planning begins. What is the correct first step?',
        kind: 'process',
        nodeId: 'c12_bs_cbse_04_001',
        hint: 'objectives',
        options: [
          {
            id: 'a', label: 'Set the objectives — then develop and evaluate alternative courses of action',
            verdict: 'best',
            principle: 'Obeyed: the planning process starts with setting objectives; alternatives are then generated, evaluated and a course selected.',
            outcome: 'The launch gets a specific target (e.g. 20% market share in 6 months), two alternative rollout plans are costed, the better one is chosen — and later steps have a yardstick.',
          },
          {
            id: 'b', label: 'Start budgeting — money first, meaning later',
            verdict: 'wrong',
            principle: 'Violated: sequencing of the planning process — budgets derive FROM objectives, they do not set them.',
            outcome: 'A budget without objectives allocates money to no destination. In the corpus\'s sequence, budgets are derivative plans that follow the objective decision.',
          },
          {
            id: 'c', label: 'Copy the competitor\'s launch plan wholesale',
            verdict: 'wrong',
            principle: 'Violated: planning is deciding the best course from alternatives FOR THIS firm — copying skips the deciding.',
            outcome: 'The competitor\'s plan answers their objectives, channels and costs. The corpus treats planning as firm-specific selection among alternatives, not imitation.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'Mid-launch, the plan is clearly misreading one city — but the head says "we wrote the plan, so we follow it". Which limitation is he tripping on?',
        kind: 'limitation',
        nodeId: 'c12_bs_cbse_04_001',
        hint: 'rigid',
        options: [
          {
            id: 'a', label: 'Planning creates rigidity — plans must be revised as the environment speaks; follow the process, not the paper',
            verdict: 'best',
            principle: 'Obeyed: rigidity is a listed limitation of planning; the remedy is replanning, not blind adherence.',
            outcome: 'The launch plan is revised for that city; the objective survives while the course of action adapts. Planning\'s value is the discipline of deciding, not the sanctity of the document.',
          },
          {
            id: 'b', label: 'None — sticking to a written plan is what planning means',
            verdict: 'wrong',
            principle: 'Violated: the limitation list — rigidity is a recognised cost of planning that managers must actively fight.',
            outcome: 'The corpus lists rigidity among planning\'s limitations precisely because written plans resist the changing environment they were drawn for. Obedience to a stale plan converts a tool into a trap.',
          },
          {
            id: 'c', label: 'Abandon the launch entirely — planning failed',
            verdict: 'wrong',
            principle: 'Violated: the honest reading of limitations — they caution, they do not condemn.',
            outcome: 'One city misread is a premise error, not a death sentence for planning. The corpus\'s position: planning remains primary; its limitations demand revision and flexibility.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------- 6 · ch5 organising --
  {
    key: 'growth',
    title: 'Vastra Apparel — growing past the founder',
    emoji: '🏢',
    chapter: 'Ch 5 · Organising',
    summary: 'A 12-person firm becomes 60. Choose the structure — and face the WhatsApp group.',
    nodeId: 'c12_bs_cbse_05_004',
    nodeIds: ['c12_bs_cbse_05_004', 'c12_bs_cbse_05_005', 'c12_bs_cbse_05_007'],
    scenario: [
      'Vastra Apparel grew from 12 tailors to 60 employees across three product lines. The founder still personally approves every decision, and a lively WhatsApp group now moves faster than the official memo.',
      'Organising builds the framework: grouping activities, assigning duties, establishing authority. The corpus contrasts functional and divisional structures and insists the informal organisation is permanent, dual-edged — never abolishable.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'The three product lines have wildly different buyers and costs. Which structure fits?',
        kind: 'structure',
        nodeId: 'c12_bs_cbse_05_005',
        hint: 'divisional',
        options: [
          {
            id: 'a', label: 'Divisional structure — each product line becomes a self-contained division with its own functional heads',
            verdict: 'best',
            principle: 'Obeyed: divisional structure suits product-line diversity — "product specialisation… facilitates expansion… product responsibility" (node\'s advantages).',
            outcome: 'Each line gets its own production/marketing head accountable for its own results; growth in one line no longer distorts the others. The founder\'s bottleneck dissolves into divisional accountability.',
          },
          {
            id: 'b', label: 'Functional structure — production, marketing, finance departments serving all lines',
            verdict: 'wrong',
            principle: 'Violated: the structure-choice criterion — functional grouping struggles when product lines diverge (the node\'s limitations: coordination across departments, divided accountability).',
            outcome: 'Three product lines share one production department: priorities collide every week, and no one is accountable for a line\'s overall result. Functional empires grow; the founder remains the only integrator.',
          },
          {
            id: 'c', label: 'Keep the founder as the single approver of everything — structure can wait',
            verdict: 'wrong',
            principle: 'Violated: the organising function itself — grouping and authority assignment must scale with size.',
            outcome: 'Sixty employees funnel every purchase order through one desk. Decisions queue, informal channels fill the vacuum, and the organisation outgrows the person.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'A rumour of a layoff is racing through the WhatsApp group. Ban it?',
        kind: 'informal organisation',
        nodeId: 'c12_bs_cbse_05_007',
        hint: 'informal',
        options: [
          {
            id: 'a', label: 'No — the informal organisation is permanent and useful; use it to communicate the truth fast',
            verdict: 'best',
            principle: 'Obeyed: the node\'s teaching — informal organisation "cannot be eliminated"; it carries speed, social fulfillment and fills formal gaps.',
            outcome: 'Management posts the real staffing facts on the same group; the rumour dies in hours and the grapevine becomes an early-warning channel. Banning would drive it underground and worsen it — the corpus\'s exact example.',
          },
          {
            id: 'b', label: 'Yes — prohibit workplace WhatsApp groups to stop gossip at the source',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "management should ban WhatsApp groups" ignores that informal organisation is a permanent feature.',
            outcome: 'The corpus predicts the result: communication goes underground, rumours worsen, and the trust channel carrying useful feedback is destroyed. You cannot abolish the social network — only lose sight of it.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'A division head complains: "I have responsibility for output but must ask the founder for every hiring call." What is missing?',
        kind: 'authority',
        nodeId: 'c12_bs_cbse_05_004',
        hint: 'authority',
        options: [
          {
            id: 'a', label: 'Delegated authority matched to the responsibility — the two must travel together',
            verdict: 'best',
            principle: 'Obeyed: authority must equal responsibility — the organising principle the divisional design is supposed to deliver.',
            outcome: 'Hiring authority within a band is delegated to the division head; the founder retains oversight by exception. Responsibility without authority produces only excuses-with-ownership.',
          },
          {
            id: 'b', label: 'More responsibility — the head should also run the other divisions',
            verdict: 'wrong',
            principle: 'Violated: the authority-responsibility pairing — piling responsibility on unbalanced authority deepens the defect.',
            outcome: 'Adding responsibility to an unauthorised role multiplies the asks-upstairs problem. The corpus\'s organising logic pairs every assigned duty with the authority to discharge it.',
          },
          {
            id: 'c', label: 'Nothing — centralised approval is always safer',
            verdict: 'wrong',
            principle: 'Violated: the meaning of delegation in a divisional design — centralisation to the point of bottleneck defeats the structure.',
            outcome: 'The founder becomes the division\'s hiring department. The structure exists precisely to push decisions to the point where the information lives.',
          },
        ],
      },
    ],
  },

  // ----------------------------------------------- 7 · ch6 staffing --
  {
    key: 'hire',
    title: 'Nimbus Logistics — the analytics seat',
    emoji: '🧑‍💼',
    chapter: 'Ch 6 · Staffing',
    summary: 'Fill a route-planner vacancy: promote from within, or hire from outside?',
    nodeId: 'c12_bs_cbse_06_005',
    nodeIds: ['c12_bs_cbse_06_005', 'c12_bs_cbse_06_003'],
    scenario: [
      'Nimbus Logistics must fill two roles: a senior route-analytics specialist nobody in the firm is trained to be, and a fleet supervisor vacancy that four ambitious drivers already covet.',
      'Internal sources (transfer, promotion) and external sources (advertising, campus, agencies) each carry merits and limitations — the corpus insists they are context-dependent, never absolute.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'The route-analytics specialist role: internal or external?',
        kind: 'recruitment source',
        nodeId: 'c12_bs_cbse_06_005',
        hint: 'external',
        options: [
          {
            id: 'a', label: 'External — the specialised skills do not exist internally; wider choice and fresh talent',
            verdict: 'best',
            principle: 'Obeyed: the node\'s exact limitation of internal sources — "not feasible for roles requiring specialised skills not present internally"; external brings fresh talent and wider choice.',
            outcome: 'A campus/placement-agency hire brings the analytics stack the firm lacks. The corpus\'s context-dependence rule reads the situation before the rulebook.',
          },
          {
            id: 'b', label: 'Internal — cheaper and it motivates staff',
            verdict: 'wrong',
            principle: 'Violated: the corpus\'s authored misconception — "internal recruitment is better because it saves money" ignores inbreeding and skill infeasibility.',
            outcome: 'The cheapest available driver is promoted into a job nobody in the building can do. Cost-saving becomes cost-creating; inbreeding adds no new ideas where none exist.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'The fleet supervisor vacancy: internal or external?',
        kind: 'recruitment source',
        nodeId: 'c12_bs_cbse_06_005',
        hint: 'internal',
        options: [
          {
            id: 'a', label: 'Internal promotion — the skills exist, promotion motivates the workforce, and the man is already proven',
            verdict: 'best',
            principle: 'Obeyed: internal merits — cost-effective, motivates employees, the candidate\'s performance record is known.',
            outcome: 'The promoted supervisor arrives with known conduct and route knowledge; four drivers see that ambition pays inside the firm. Demotivation risk of external hiring is avoided.',
          },
          {
            id: 'b', label: 'External — new blood is always better',
            verdict: 'wrong',
            principle: 'Violated: the corpus\'s counter-misconception — external hires carry higher failure rates from cultural misfit and longer adjustment.',
            outcome: 'An outsider must learn the routes, the fleet culture, and the drivers\' trust from zero — while four internal candidates watch a stranger take a job they had earned. The motivation dividend is paid to nobody.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'The CEO proposes dissolving the HR department: "recruitment sites do hiring now." What is he missing?',
        kind: 'HRM scope',
        nodeId: 'c12_bs_cbse_06_003',
        hint: 'HRM',
        options: [
          {
            id: 'a', label: 'HRM is a full system — job analysis, compensation, training, appraisal, grievance handling, legal compliance; hiring is one link',
            verdict: 'best',
            principle: 'Obeyed: the node\'s definition — HRM spans acquiring, developing, motivating and retaining personnel.',
            outcome: 'Job analysis defines what the sites should even advertise; appraisal and compensation decide whether anyone stays. Automating recruitment while deleting HRM is buying a front door and removing the house.',
          },
          {
            id: 'b', label: 'He is right — recruitment is the whole of staffing',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "HRM = recruitment" loses the strategic and specialised duties.',
            outcome: 'Within a quarter: no appraisal system, ad-hoc pay, unresolved grievances, and compliance exposure. The corpus marks exactly this error for losing marks on HRM\'s strategic role.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------- 8 · ch7 directing --
  {
    key: 'foreman',
    title: 'Kisan Agro — the supervisor\'s jargon',
    emoji: '🗣️',
    chapter: 'Ch 7 · Directing',
    summary: 'Instructions fly, nothing lands. Diagnose the directing failure.',
    nodeId: 'c12_bs_cbse_07_005',
    nodeIds: ['c12_bs_cbse_07_001', 'c12_bs_cbse_07_005'],
    scenario: [
      'Kisan Agro\'s new supervisor briefs field staff in dense technical jargon, never asks for questions, and measures himself by how busy he sounds. Output errors double in a month.',
      'Directing initiates action through supervision, motivation, leadership and communication. The corpus\'s communication chapter classifies barriers — semantic, psychological, organisational, personal — and their remedies.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'Field staff keep mis-executing instructions. What barrier is the supervisor creating?',
        kind: 'barrier',
        nodeId: 'c12_bs_cbse_07_005',
        hint: 'semantic',
        options: [
          {
            id: 'a', label: 'Semantic barrier — technical jargon and unclarified assumptions break encoding/decoding',
            verdict: 'best',
            principle: 'Obeyed: the node\'s classification — semantic barriers cover "technical jargon, faulty translations, unclarified assumptions", not just language differences.',
            outcome: 'Naming the barrier correctly selects the right remedy: plain words, clarified meaning, checked understanding. The corpus notes that "language barrier" as a separate fifth category is itself a marked error.',
          },
          {
            id: 'b', label: 'Organisational barrier — the hierarchy is too long',
            verdict: 'wrong',
            principle: 'Violated: the classification — the failure is in the message\'s encoding, not the chain length.',
            outcome: 'Shortening the hierarchy leaves the jargon intact; mis-execution continues. The messages degrade between two adjacent people, which is semantic territory.',
          },
          {
            id: 'c', label: 'No barrier exists — the staff are simply careless',
            verdict: 'wrong',
            principle: 'Violated: the directing premise — the manager owns the clarity of communication; blaming receivers dodges the diagnosis.',
            outcome: 'Carelessness doubled the week the new supervisor arrived. Attributing to receivers guarantees the barrier survives — and the errors with it.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'What is the first remedy the corpus prescribes for this barrier?',
        kind: 'remedy',
        nodeId: 'c12_bs_cbse_07_005',
        hint: 'feedback',
        options: [
          {
            id: 'a', label: 'Build in feedback — have receivers restate the instruction; clarify before acting',
            verdict: 'best',
            principle: 'Obeyed: "using feedback, active listening, adapting to the receiver" — the node\'s listed measures.',
            outcome: 'Restatement surfaces the misread assumptions before execution, and error rates fall. Feedback is the cheapest loop-closer the corpus offers.',
          },
          {
            id: 'b', label: 'Send the same instructions in writing, louder',
            verdict: 'wrong',
            principle: 'Violated: the remedy set — repetition without decoding-verification repeats the same encoding failure.',
            outcome: 'The same jargon, now permanent, confuses everyone in writing too. Volume and repetition are not among the corpus\'s measures to overcome barriers.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'The supervisor protests: "Communication IS directing — I talk to them all day." Correct him.',
        kind: 'concept',
        nodeId: 'c12_bs_cbse_07_001',
        hint: 'directing',
        options: [
          {
            id: 'a', label: 'Directing initiates action through supervision, motivation and leadership too — communication is one element inside it',
            verdict: 'best',
            principle: 'Obeyed: the node\'s authored misconception — directing encompasses communication but also supervision, motivation, leadership.',
            outcome: 'Talking all day without motivating or leading is broadcasting, not directing. The correction re-points the supervisor at the function\'s purpose: initiating and sustaining action.',
          },
          {
            id: 'b', label: 'True — directing is the process of exchanging information',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception the corpus marks — equating directing with its communication element.',
            outcome: 'The exam answer "directing helps in coordination" instead of "directing initiates action" is the exact mark-loss the node predicts from this belief.',
          },
        ],
      },
    ],
  },

  // -------------------------------------------- 9 · ch8 controlling --
  {
    key: 'variance',
    title: 'Ravi Ceramics — the kiln\'s 8% drift',
    emoji: '🎯',
    chapter: 'Ch 8 · Controlling',
    summary: 'Actual output runs 8% below standard. Run the controlling cycle.',
    nodeId: 'c12_bs_cbse_08_002',
    nodeIds: ['c12_bs_cbse_08_002', 'c12_bs_cbse_08_001'],
    scenario: [
      'Ravi Ceramics sets a monthly standard of 10,000 finished tiles. Actual output lands at 9,200 — and the works manager wants to immediately fire the shift that "clearly underperformed".',
      'Controlling is a five-step cycle: set standards → measure → compare → analyse deviations → act. The corpus warns against two misconceptions: controlling as fault-finding, and management by exception as ignoring problems.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'Where in the cycle did the works manager already fail?',
        kind: 'process',
        nodeId: 'c12_bs_cbse_08_002',
        hint: 'standard',
        options: [
          {
            id: 'a', label: 'He skipped analysing the deviation — corrective action without diagnosis is guesswork',
            verdict: 'best',
            principle: 'Obeyed: the five-step sequence — comparing and analysing deviations PRECEDE corrective action.',
            outcome: 'The 8% shortfall is traced to two kilns running at wrong temperature (a process fault), not the shift. Corrective action fires at the cause, not the staff.',
          },
          {
            id: 'b', label: 'None — acting fast on visible underperformance is textbook controlling',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "controlling means only the last step (taking corrective action)" and treating it as fault-finding.',
            outcome: 'The wrong shift is punished, the kiln fault persists, next month misses again. The corpus\'s "catch lazy workers" reading of controlling produces exactly this loop.',
          },
          {
            id: 'c', label: 'He failed at measurement — the 9,200 figure is obviously fabricated',
            verdict: 'wrong',
            principle: 'Violated: correct process reading — the measurement exists; the unexecuted step is analysis.',
            outcome: 'The number is consistent with two known kiln faults. Accusing measurement without evidence repeats the fault-finding reflex the corpus warns against.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'The plant tracks 30 metrics. The works manager reads all of them daily and drowns. What does the corpus prescribe?',
        kind: 'technique',
        nodeId: 'c12_bs_cbse_08_002',
        hint: 'exception',
        options: [
          {
            id: 'a', label: 'Management by exception — focus on significant deviations in critical areas',
            verdict: 'best',
            principle: 'Obeyed: the node\'s correction — management by exception means concentrating on significant deviations in critical areas, not ignoring small problems.',
            outcome: 'The two critical metrics (kiln temperature, defect rate) get attention; the 27 minor variances are reviewed weekly. Managerial attention lands where goals are actually threatened.',
          },
          {
            id: 'b', label: 'Ignore all small deviations everywhere — that is management by exception',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "management by exception = ignoring small problems" is explicitly corrected in the node.',
            outcome: 'Small drifts compound silently until they become the big deviation nobody was watching. The corpus defines the technique as FOCUS on critical significance, not blanket neglect.',
          },
          {
            id: 'c', label: 'Track all 30 — vigilance can never be excessive',
            verdict: 'wrong',
            principle: 'Violated: the practical purpose of the technique — attention is scarce and must be rationed to critical-point control.',
            outcome: 'Drowning in dashboards, the manager still missed the kiln temperature. Uniform vigilance is dilute vigilance.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'A worker says: "Now that they control us, we\'ll be punished for every slip." What does the corpus say controlling does for employees?',
        kind: 'importance',
        nodeId: 'c12_bs_cbse_08_001',
        hint: 'motivation',
        options: [
          {
            id: 'a', label: 'Clear standards and fair follow-up improve motivation — people perform better knowing what "good" means',
            verdict: 'best',
            principle: 'Obeyed: the node\'s importance list — controlling improves employee motivation; it is regulation against a standard, not punishment.',
            outcome: 'Standards made visible, deviations traced to causes, corrections aimed at process: the workforce gains a fair game. Motivation rises with the clarity — the corpus\'s stated importance point.',
          },
          {
            id: 'b', label: 'Controlling exists to catch and punish lazy workers',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "controlling = finding fault and punishing" is explicitly corrected by the node.',
            outcome: 'Fear produces hiding, not performance. The corpus defines controlling as ensuring activities conform to plans — with motivation among its benefits, not casualties.',
          },
        ],
      },
    ],
  },

  // --------------------------------------- 10 · ch9 financial mgmt --
  {
    key: 'debtorequity',
    title: 'Bharat Threads — the cheapest crore',
    emoji: '🧵',
    chapter: 'Ch 9 · Financial Management',
    summary: 'A bank offers 11%; diluting equity costs more. Is cheapest really best?',
    nodeId: 'c12_bs_cbse_09_002',
    nodeIds: ['c12_bs_cbse_09_002', 'c12_bs_cbse_09_004'],
    scenario: [
      'Bharat Threads must raise ₹1 crore for new looms. The bank offers debt at 11%; a venture fund offers equity that "costs nothing monthly" but wants a stake. The CFO argues: "Take the cheapest — debt wins."',
      'The financing decision fixes the mix of owners\' funds and borrowed funds. The corpus lists risk, control, flexibility and cash-flow position as CO-EQUAL factors with cost — "cheapest source" is its authored misconception.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'Is "debt is better because it is cheaper" a sound financing decision?',
        kind: 'financing decision',
        nodeId: 'c12_bs_cbse_09_002',
        hint: 'risk',
        options: [
          {
            id: 'a', label: 'No — debt raises fixed commitments and financial risk; cost trades off against risk, control, flexibility and cash flow',
            verdict: 'best',
            principle: 'Obeyed: the node\'s factor list — Risk, Control, Flexibility, Cash Flow Position stand co-equal with cost; the "cheapest source" view is the authored misconception.',
            outcome: 'The CFO models the downside months: interest is due in good months AND bad. The final mix balances cheaper debt against the cushion equity provides — the risk-return profile, not the rate card, decides.',
          },
          {
            id: 'b', label: 'Yes — interest is tax-deductible, so debt always wins',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "debt is better because interest is tax-deductible" ignores financial risk and the ROI condition for trading on equity.',
            outcome: 'Tax deduction trims the interest bill, not the fixed commitment. In a lean year the looms still must be paid for — financial risk has no tax shield big enough.',
          },
          {
            id: 'c', label: 'No — equity is always safer, so take equity regardless of context',
            verdict: 'wrong',
            principle: 'Violated: the balanced reading — the decision weighs factors; equity forever is as one-factor-blind as debt forever.',
            outcome: 'Diluting control and paying equity\'s higher cost when debt is comfortably serviceable wastes the cushion. The corpus wants the trade-off evaluated, not a new absolute.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'Before choosing the mix, the board must first decide WHICH loom project to buy. Which financial decision is that?',
        kind: 'decision type',
        nodeId: 'c12_bs_cbse_09_002',
        hint: 'investment',
        options: [
          {
            id: 'a', label: 'Investment decision — deploying funds into long-term assets for return',
            verdict: 'best',
            principle: 'Obeyed: the node\'s triad — investment (where to deploy), financing (how to raise), dividend (distribute or retain).',
            outcome: 'Loom selection is the investment decision; the debt-equity mix is financing; both precede any dividend question. Naming the decision type is what the case-based question tests.',
          },
          {
            id: 'b', label: 'Financing decision — buying looms is about money',
            verdict: 'wrong',
            principle: 'Violated: the triad\'s boundaries — financing decides the SOURCE of funds, not their deployment.',
            outcome: 'The mix question (11% bank vs equity) is financing; choosing between loom projects is deployment — the investment decision. Blurring the triad is the classic case-study slip.',
          },
          {
            id: 'c', label: 'Dividend decision — profits will pay for the looms',
            verdict: 'wrong',
            principle: 'Violated: the triad — dividend concerns distributing earned profit, not acquiring assets.',
            outcome: 'The looms are bought with newly raised funds, not with this year\'s retained profit. The dividend question arrives only after profits exist.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'Next year Bharat earns ₹40 lakh. The founder wants all of it out as dividend "to prove the firm works". What should the dividend decision weigh?',
        kind: 'dividend decision',
        nodeId: 'c12_bs_cbse_09_002',
        hint: 'dividend',
        options: [
          {
            id: 'a', label: 'Growth funding vs shareholder reward — retain what expansion needs, distribute the rest',
            verdict: 'best',
            principle: 'Obeyed: the dividend decision\'s substance — how much profit to distribute vs retain, judged against growth needs.',
            outcome: 'A payout ratio is set that funds the next loom line while still rewarding shareholders. Wealth maximisation, the corpus\'s objective of financial management, beats the vanity signal.',
          },
          {
            id: 'b', label: 'Distribute everything — shareholder wealth means maximal dividends',
            verdict: 'wrong',
            principle: 'Violated: the objective — shareholders\' wealth grows through retained earnings funding future returns too, not through one year\'s payout alone.',
            outcome: 'The firm starves its own expansion to make a point; next year\'s growth — and the share\'s value — shrinks. The corpus frames the decision as a balance, not a maxim.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------- 11 · ch11 marketing --
  {
    key: 'luxcar',
    title: 'Aurora Motors — launching the luxury sedan',
    emoji: '🚗',
    chapter: 'Ch 11 · Marketing Mix',
    summary: 'The young manager wants launch discounts. The corpus disagrees.',
    nodeId: 'c12_bs_cbse_11_008',
    nodeIds: ['c12_bs_cbse_11_008', 'c12_bs_cbse_11_006', 'c12_bs_cbse_11_007'],
    scenario: [
      'Aurora Motors is launching a ₹45-lakh luxury sedan. The young sales manager\'s plan: aggressive launch discounts, everywhere, immediately. The marketing head asks him to think through the full mix first.',
      'The marketing mix is the 4-P blend; promotion is a four-tool system (advertising, personal selling, sales promotion, PR). The corpus\'s authored misconception: luxury cases answered with heavy discounts.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'What promotion mix should the launch actually lead with?',
        kind: 'promotion',
        nodeId: 'c12_bs_cbse_11_008',
        hint: 'promotion',
        options: [
          {
            id: 'a', label: 'Advertising for image, personal selling for customisation, PR for exclusivity — discounts only as a minor nudge',
            verdict: 'best',
            principle: 'Obeyed: the node\'s luxury-case teaching — brands rely on advertising for image, personal selling for customisation, PR for exclusivity; the promotion mix is a coordinated strategy.',
            outcome: 'Image builds desire at the price point; the showroom conversation closes the sale; earned media signals exclusivity. Discounts stay off the table because they would undercut the very positioning being sold.',
          },
          {
            id: 'b', label: 'Heavy sales promotion — discounts drive volume fastest',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — suggesting heavy discounts for a luxury launch misses the promotion mix\'s strategic roles.',
            outcome: 'The sedan becomes "the discounted luxury car" within a quarter — short-term volume, permanent brand damage. The corpus\'s exact example of the promotion-misconception failure.',
          },
          {
            id: 'c', label: 'Only advertising — a superb film replaces everything else',
            verdict: 'wrong',
            principle: 'Violated: the coordinated four-tool view — advertising informs, but personal selling persuades and PR lends credibility.',
            outcome: 'A beautiful film creates enquiries the showroom cannot convert, because ₹45-lakh purchases are closed interpersonally. One tool is not a mix.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'Which single P of the mix actually generates revenue?',
        kind: 'marketing mix',
        nodeId: 'c12_bs_cbse_11_006',
        hint: 'price',
        options: [
          {
            id: 'a', label: 'Price — the only revenue-generating element; product, place and promotion are costs',
            verdict: 'best',
            principle: 'Obeyed: the node\'s definition — price is the only element of the marketing mix that generates revenue.',
            outcome: 'The launch budget treats the discount proposal as what it is: burning the only revenue line to subsidise the cost lines. Pricing discipline is positioning discipline.',
          },
          {
            id: 'b', label: 'Product — without the car there is nothing to sell',
            verdict: 'wrong',
            principle: 'Violated: the revenue/cost classification — product creates value but recovers cost; the money arrives through price.',
            outcome: 'True that the car enables the sale — but every rupee earned enters through price. The corpus\'s classification exists precisely to catch this answer.',
          },
          {
            id: 'c', label: 'Place — distribution is where sales happen',
            verdict: 'wrong',
            principle: 'Violated: the revenue/cost classification — place is a cost-bearing convenience element.',
            outcome: 'Showrooms and logistics spend money; they collect it only when price is charged. Distribution is the pathway, not the purse.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'Aurora sells through company-owned showrooms. What channel level is that?',
        kind: 'place',
        nodeId: 'c12_bs_cbse_11_007',
        hint: 'channel',
        options: [
          {
            id: 'a', label: 'Zero-level (direct) channel — the manufacturer itself is the retailer; no independent intermediary',
            verdict: 'best',
            principle: 'Obeyed: the node\'s correction — company-owned stores (Bata, Titan, Amul examples) are still a zero-level channel.',
            outcome: 'Title moves from Aurora to customer with no independent middleman. Knowing this keeps channel-cost accounting honest and the "we have retail presence" confusion out of the plan.',
          },
          {
            id: 'b', label: 'One-level channel — the showrooms are retailers',
            verdict: 'wrong',
            principle: 'Violated: the authored misconception — "direct channel means no physical retail presence" is explicitly corrected; the manufacturer-as-retailer is still zero-level.',
            outcome: 'The showrooms are Aurora\'s own employees and capital — counting them as independent intermediaries double-counts the channel and misreads the margin structure.',
          },
        ],
      },
    ],
  },

  // --------------------------------- 12 · consumer protection (CP) --
  {
    key: 'fridge',
    title: 'The ₹65,000 refrigerator — consumer redressal',
    emoji: '⚖️',
    chapter: 'Consumer Protection',
    summary: 'A defective fridge, a stonewalling seller — where does the buyer go?',
    nodeId: 'c10_eco_cbse_05_004',
    nodeIds: ['c10_eco_cbse_05_004', 'c10_eco_cbse_05_003', 'c12_bs_cbse_03_006'],
    scenario: [
      'A buyer\'s new ₹65,000 refrigerator stops cooling within a week; the seller refuses replacement. Separately, the same brand has received an ASCI guideline notice and a draft government labelling notification for exaggerated claims.',
      'COPRA builds a three-tier quasi-judicial machinery — District, State, National Commissions — with jurisdiction by claim value. The legal-environment node separates statutory law from self-regulatory bodies like ASCI.',
    ],
    decisions: [
      {
        id: 'd1',
        ask: 'The buyer claims the fridge price plus ₹5,000 compensation. Which forum hears it first?',
        kind: 'redressal tier',
        nodeId: 'c10_eco_cbse_05_004',
        hint: 'district',
        options: [
          {
            id: 'a', label: 'District Consumer Disputes Redressal Commission — the claim (₹70,000) is within its ₹1 crore limit',
            verdict: 'best',
            principle: 'Obeyed: the node\'s rule — District Commission entertains complaints where goods/services + compensation do not exceed ₹1 crore (CPA 2019).',
            outcome: 'Filed at the district commission where the buyer lives: inexpensive, local, and jurisdictionally correct. Appeals, if needed, climb to State and then National.',
          },
          {
            id: 'b', label: 'National Commission — consumer cases start at the top for seriousness',
            verdict: 'wrong',
            principle: 'Violated: the pecuniary jurisdiction rule — tiers match claim VALUE, not perceived seriousness.',
            outcome: 'The National Commission\'s docket is for high-value claims; a ₹70,000 case filed there is beyond its original jurisdiction. The node\'s walkthrough assigns exactly this fridge to the District.',
          },
          {
            id: 'c', label: 'The seller\'s private grievance cell — COPRA requires exhausting company channels first',
            verdict: 'wrong',
            principle: 'Violated: the forum structure — company grievance cells are voluntary pre-steps, not the statutory machinery COPRA establishes.',
            outcome: 'The seller has already refused replacement — that IS the exhausted channel. COPRA\'s forums exist precisely for the stonewalling the buyer now faces.',
          },
        ],
      },
      {
        id: 'd2',
        ask: 'The brand argues: "ASCI asked us to withdraw the ad — but ASCI guidelines are not law, so we ignored them." What does the legal environment say?',
        kind: 'legal environment',
        nodeId: 'c12_bs_cbse_03_006',
        hint: 'legal',
        options: [
          {
            id: 'a', label: 'ASCI is self-regulatory — its guidelines are not law, but non-adherence can be used as evidence in consumer courts',
            verdict: 'best',
            principle: 'Obeyed: the node\'s worked example — ASCI guidelines carry persuasive weight and can trigger legal action under the Consumer Protection Act.',
            outcome: 'Ignoring ASCI is not contempt of law — but the withdrawn-ad evidence now sits in the consumer file. Self-regulation is the soft layer of the legal environment, not a shield.',
          },
          {
            id: 'b', label: 'Correct — anything not enforceable by law may be freely ignored',
            verdict: 'wrong',
            principle: 'Violated: the node\'s teaching — the legal environment includes quasi-judicial orders and self-regulatory pressure that feed statutory action.',
            outcome: 'The draft government labelling notification IS law-in-motion (delegated legislation), and the ASCI record becomes evidence. "Not law today" is not "no consequence".',
          },
          {
            id: 'c', label: 'ASCI guidelines are criminal law — the brand must be prosecuted',
            verdict: 'wrong',
            principle: 'Violated: the classification — ASCI is explicitly a self-regulatory body in the node, distinct from statutory instruments.',
            outcome: 'Overstating ASCI\'s force is the mirror error: the corpus distinguishes delegated legislation (binding) from self-regulatory guidelines (persuasive, evidence-bearing). Precision is the point.',
          },
        ],
      },
      {
        id: 'd3',
        ask: 'Why does COPRA use a THREE-tier machinery rather than one national forum?',
        kind: 'rationale',
        nodeId: 'c10_eco_cbse_05_004',
        hint: 'three',
        options: [
          {
            id: 'a', label: 'Geographical accessibility, case distribution by value, and an appellate hierarchy — decentralised, low-cost, speedy justice',
            verdict: 'best',
            principle: 'Obeyed: the node\'s stated purpose — "access to justice" through a tiered system matching claim value to forum.',
            outcome: 'The fridge buyer files in his own district at minimal cost; genuine appeals climb the ladder. The design purpose is access, not centralised power.',
          },
          {
            id: 'b', label: 'To give the National Commission more power over consumers',
            verdict: 'wrong',
            principle: 'Violated: the node\'s own correction of this exact wrong answer — the purpose is decentralised local justice.',
            outcome: 'The tiers exist to BRING justice closer to the buyer, not to concentrate it. The corpus flags this exact answer as the misconception to avoid.',
          },
          {
            id: 'c', label: 'To let companies appeal repeatedly until consumers give up',
            verdict: 'wrong',
            principle: 'Violated: the machinery\'s consumer-welfare objective — COPRA is social welfare legislation for better protection of consumers\' interests.',
            outcome: 'The hierarchy is an orderly review structure for genuine errors, not a corporate attrition device. The Act\'s stated object — better protection of consumer interests — frames every tier.',
          },
        ],
      },
    ],
  },
]

/** Total decision count across the bank (for the header progress line). */
export const BUSINESS_CASE_DECISION_TOTAL = BUSINESS_CASES.reduce(
  (n, c) => n + c.decisions.length, 0)
