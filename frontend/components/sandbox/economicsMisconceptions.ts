/**
 * economicsMisconceptions.ts — closed-world data layer for the economics
 * sandbox's wrong-state teaching.
 *
 * Every string below is VERBATIM authored corpus text from the verified
 * CBSE/ICSE economics nodes (COMMON_MISCONCEPTION sections). Nothing is
 * invented, paraphrased or extended. Where the corpus has no authored
 * misconception for a sandbox state, the entry simply does not exist and
 * the MisconceptionPanel honestly omits it (same degradation contract as
 * the remediation loop).
 *
 * Node ids below are INTERNAL provenance (grep anchors) — they are never
 * rendered; MisconceptionPanel pipes the text through AuthoredText.
 */

export interface EconMisconception {
  /** Internal corpus provenance (never rendered). */
  source: string
  /** Verbatim authored misconception text. */
  text: string
}

export const ECON_MISCONCEPTIONS: Record<string, EconMisconception> = {
  demandVsQuantityDemanded: {
    source: 'c10_econ_icse_02_001',
    text: "Misconception: Demand and quantity demanded are the same. Why students believe it: everyday language uses 'demand' loosely to mean 'amount wanted'. Why it is wrong: demand is a schedule of quantities at various prices; quantity demanded is a single point on that schedule.",
  },
  priceShiftsCurve: {
    source: 'c10_econ_icse_02_001',
    text: "Misconception: A change in price shifts the demand curve. Why students believe it: they observe price and quantity moving together and assume the curve moves. Why it is wrong: price changes cause movement along the curve; only non-price factors (income, preferences, related goods) shift the curve.",
  },
  supplyFixedStock: {
    source: 'c10_econ_icse_02_001',
    text: "Misconception: Supply is a fixed amount producers want to sell regardless of price. Why students believe it: they think of stock in a warehouse as supply. Why it is wrong: supply is a schedule showing quantities offered at different prices; it varies with price.",
  },
  movementVsShift: {
    source: 'c10_econ_icse_02_004',
    text: '"A change in price shifts the curve." Students often think that because price and quantity move together, the curve itself moves. In reality, price changes only cause movements along a fixed curve; the curve shifts only when a non-price determinant changes.',
  },
  demandShiftVsMovementTerms: {
    source: 'c10_econ_icse_02_004',
    text: '"Increase in demand" and "increase in quantity demanded" are interchangeable. Textbook language is precise: the former is a shift, the latter a movement. Confusing them leads to wrong diagram labels and lost marks.',
  },
  supplyShiftsOwnPrice: {
    source: 'c10_econ_icse_02_004',
    text: '"Supply shifts when the price of the good changes." Mirror of misconception 1 for supply. The supply curve shifts only for changes in input prices, technology, taxes, etc., not for the good\'s own price.',
  },
  demonetisationVsMonetaryPolicy: {
    source: 'c10_econ_icse_04_009',
    text: 'Misconception: "Demonetisation and monetary policy are the same thing." Why students believe it: Both involve the RBI and affect money supply; textbooks often place them in the same chapter. Why it is wrong: Demonetisation is a one-off administrative withdrawal of specific notes, while monetary policy (CRR, SLR, repo rate, OMO) is a continuous framework for regulating liquidity and credit.',
  },
  taxesDirectIndirect: {
    source: 'c10_econ_icse_04_010',
    text: 'Misconception: "All taxes paid by businesses are direct taxes." Why students believe it: Businesses write cheques to the tax department for GST, corporate tax, etc., so they appear as direct payers. Why it\'s wrong: Legal incidence ≠ economic incidence. Corporate tax is direct (on profit), but GST collected by a business is passed to consumers — it\'s indirect.',
  },
  anyPriceIncreaseIsInflation: {
    source: 'c10_econ_icse_05_001',
    text: "Misconception: Any price increase equals inflation. Why students believe it: They see prices rise daily and equate the term with \"prices going up.\" Why it's wrong: Inflation requires a sustained, broad-based rise in the general price level, not a one-off or single-commodity change.",
  },
  anyoneWithoutJobUnemployed: {
    source: 'c9_econ_icse_05_004',
    text: 'Misconception: "Anyone without a job is unemployed." Why students believe it: Everyday speech uses \'unemployed\' for every jobless person. Why it is wrong: The economic concept requires willingness, ability and active seeking — children, students, pensioners and those not seeking are OUT OF THE LABOUR FORCE, not unemployed; the statistic counts a failure of MATCHING (seekers without work), and the three tests define who is on the supply side of that match.',
  },
}

/** Wrong-state keys emitted by the sandbox labs. */
export type WrongState =
  | 'demand-slope'          // upward-sloping demand curve (law of demand broken)
  | 'supply-slope'          // downward-sloping supply curve (law of supply broken)
  | 'negative-price'        // solver produced a non-positive equilibrium price
  | 'negative-quantity'     // solver produced a non-positive equilibrium quantity
  | 'beyond-choke'          // probe price above the demand curve's choke price
  | 'zero-reserve'          // reserve ratio 0% -> infinite credit creation
  | 'full-reserve'          // reserve ratio 100% -> no credit creation at all
  | 'mpc-range'             // MPC <= 0 or MPC >= 1
  | 'non-positive-gdp'      // expenditure identity driven non-positive
  | 'market-clear'          // not an error: probe price sits at equilibrium

/** Map a solver gate refusal (or lab-side check) to authored corpus text.
 *  Returns undefined where the corpus has no authored match — the panel
 *  then renders nothing for that state (honest degradation). */
export function misconceptionFor(state: WrongState): EconMisconception | undefined {
  switch (state) {
    case 'demand-slope':
    case 'negative-price':
      return ECON_MISCONCEPTIONS.priceShiftsCurve
    case 'supply-slope':
      return ECON_MISCONCEPTIONS.supplyFixedStock
    case 'beyond-choke':
      return ECON_MISCONCEPTIONS.demandVsQuantityDemanded
    case 'zero-reserve':
    case 'full-reserve':
      return ECON_MISCONCEPTIONS.demonetisationVsMonetaryPolicy
    case 'mpc-range':
      return ECON_MISCONCEPTIONS.movementVsShift
    case 'non-positive-gdp':
      return ECON_MISCONCEPTIONS.taxesDirectIndirect
    case 'negative-quantity':
      return ECON_MISCONCEPTIONS.demandVsQuantityDemanded
    case 'market-clear':
      return ECON_MISCONCEPTIONS.movementVsShift
    default:
      return undefined
  }
}
