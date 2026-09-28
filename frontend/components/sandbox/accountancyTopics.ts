/**
 * accountancyTopics.ts — class-wise topic picker data for the Accountancy
 * Sandbox (E7 Document & Ledger Workbench + E1 Parameter Lab per
 * SANDBOX_TAXONOMY.md).
 *
 * Curated from D:/platform/_cisce_build/accountancy_book_topics.json (the
 * chapter-by-chapter inventory extracted from the actual NCERT textbooks:
 * Financial Accounting I/II class 11, Partnership Accounts + Company
 * Accounts & Analysis of Financial Statements class 12, plus the ICSE
 * Commercial Studies accounting chapters in classes 9-10). Only
 * solver-able topics appear here — every `prompt` is answered by a
 * deterministic family in accountancy_families.py via
 * POST /api/sandbox/solve (subject: "accountancy").
 *
 * `nodeId` points at the authored enhanced-nodes corpus entry used for
 * wrong-state misconception teaching (closed-world via remediation.ts).
 * Classes 9-10 ICSE nodes and the class-12 ratio chapter have no authored
 * corpus yet, so nodeId stays undefined and the MisconceptionPanel
 * honestly renders nothing instead of invented text.
 */

export interface AccountancyTopic {
  key: string
  label: string
  /** Book-style sample prompt the deterministic solver family answers. */
  prompt: string
  /** Authored corpus node for misconception content (optional). */
  nodeId?: string
}

export interface AccountancyChapter {
  key: string
  label: string
  topics: AccountancyTopic[]
}

export interface AccountancyClassBand {
  key: string
  label: string
  chapters: AccountancyChapter[]
}

const t = (key: string, label: string, prompt: string, nodeId?: string):
  AccountancyTopic => ({ key, label, prompt, nodeId })

export const ACCOUNTANCY_SANDBOX_CLASSES: AccountancyClassBand[] = [
  {
    key: 'c11', label: 'Class 11 · Financial Accounting',
    chapters: [
      {
        key: 'c11_ch3', label: 'Recording of Transactions (journal & ledger)',
        topics: [
          t('c11_journal_cash', 'Bought goods for cash',
            'Journalise the transaction: Bought goods for cash Rs 50,000',
            'c11_acc_cbse_03_007'),
          t('c11_journal_credit', 'Bought on credit from a supplier',
            'Pass journal entry: Bought machinery on credit from Ram for Rs 80,000',
            'c11_acc_cbse_03_006'),
          t('c11_journal_sale', 'Sold goods for cash',
            'Journal entry for: Sold goods for cash Rs 30,000',
            'c11_acc_cbse_03_005'),
          t('c11_journal_expense', 'Paid an expense (rent by cheque)',
            'Journalise the transaction: Paid rent Rs 12,000 by cheque',
            'c11_acc_cbse_03_005'),
          t('c11_journal_drawings', 'Cash withdrawn for personal use',
            'Journal entry: Withdrew cash Rs 10,000 for personal use',
            'c11_acc_cbse_03_004'),
          t('c11_journal_capital', 'Commenced business with cash',
            'Journalise: Commenced business with cash Rs 2,00,000',
            'c11_acc_cbse_03_003'),
          t('c11_journal_bank', 'Cash deposited into bank',
            'Pass journal entry: Deposited cash into bank Rs 40,000',
            'c11_acc_cbse_03_004'),
          t('c11_trial_balance', 'Trial balance difference (suspense)',
            'The trial balance shows a debit total of Rs 85,400 and a credit total of Rs 85,000. By how much does it differ? Suspense?',
            'c11_acc_cbse_03_009'),
        ],
      },
      {
        key: 'c11_ch5', label: 'Bank Reconciliation Statement',
        topics: [
          t('c11_brs_cb', 'Cash book → pass book',
            'Debit balance as per cash book Rs 25,000. Cheques issued but not presented for payment Rs 5,000; bank charges Rs 200; interest credited by bank Rs 500. Prepare a bank reconciliation statement.',
            'c11_acc_cbse_05_008'),
          t('c11_brs_pb', 'Pass book → cash book',
            'Balance as per pass book is Rs 18,000 (favourable). Cheques deposited but not yet credited Rs 6,000; cheques issued but not yet presented Rs 4,000; insurance premium paid by bank Rs 1,000. Prepare the bank reconciliation statement starting from the pass book.',
            'c11_acc_cbse_05_009'),
        ],
      },
      {
        key: 'c11_ch7', label: 'Depreciation, Provisions & Reserves',
        topics: [
          t('c11_slm', 'Straight line: annual depreciation',
            'A machine costing Rs 100,000 has a salvage value of Rs 10,000 and a useful life of 5 years. Find the annual depreciation (straight line).',
            'c11_acc_cbse_07_004'),
          t('c11_slm_bv', 'Straight line: book value after n years',
            'A plant costing Rs 200,000 with scrap value Rs 20,000 is depreciated by the straight line method over 6 years. Find its book value after 3 years.',
            'c11_acc_cbse_07_004'),
          t('c11_wdv', 'Written down value: book value after n years',
            'Machinery costing Rs 1,00,000 is depreciated at 10% per annum on written down value method. Find the book value after 3 years.',
            'c11_acc_cbse_07_005'),
          t('c11_wdv_sched', 'WDV schedule',
            'A vehicle costing Rs 500,000 is depreciated at 20% reducing balance. Prepare the depreciation schedule and give the value after 2 years.',
            'c11_acc_cbse_07_005'),
        ],
      },
      {
        key: 'c11_ch8', label: 'Financial Statements (final accounts)',
        topics: [
          t('c11_gp', 'Gross profit from trading items',
            'Sales Rs 500,000, sales returns Rs 20,000, opening stock Rs 50,000, purchases Rs 300,000, return outwards Rs 10,000, carriage inwards Rs 10,000, closing stock Rs 80,000. Find the gross profit.',
            'c11_acc_cbse_08_002'),
          t('c11_np', 'Net profit from P&L items',
            'Gross profit Rs 220,000. Salaries Rs 40,000, rent Rs 24,000, advertising Rs 6,000, depreciation Rs 10,000; commission received Rs 8,000. Find the net profit.',
            'c11_acc_cbse_08_005'),
          t('c11_bs_capital', 'Balance sheet missing capital',
            'Total assets Rs 900,000 and total liabilities Rs 350,000. Find the capital for the balance sheet to balance.',
            'c11_acc_cbse_08_001'),
        ],
      },
    ],
  },
  {
    key: 'c12', label: 'Class 12 · Partnership & Analysis',
    chapters: [
      {
        key: 'c12_ch1', label: 'Partnership: Basic Concepts',
        topics: [
          t('c12_psr', 'Divide profit in the ratio',
            'A and B are partners sharing profits in the ratio 3:2. The firm earned a profit of Rs 50,000. Divide the profit between the partners.',
            'c12_acc_cbse_01_001'),
          t('c12_psr3', 'Three-way division',
            'X, Y and Z are partners sharing profits in the ratio 2:2:1. Profit of Rs 100,000 is to be divided. Give each partner\'s share.',
            'c12_acc_cbse_01_001'),
          t('c12_ioc', 'Interest on capital',
            'Interest on capital is allowed at 6% per annum on a capital of Rs 50,000. Find the interest on capital.',
            'c12_acc_cbse_01_004'),
          t('c12_iod', 'Interest on drawings (monthly)',
            'Interest on drawings: A partner withdraws Rs 2,000 per month at the middle of each month. Interest is charged at 6% per annum. Find the interest on drawings.',
            'c12_acc_cbse_01_005'),
          t('c12_guarantee', 'Guarantee of minimum share',
            'A and B are partners sharing profits in the ratio 3:2. B is given a guarantee that his share of profit shall not be less than Rs 25,000. The profit of the firm is Rs 60,000. Show the final shares.',
            'c12_acc_cbse_01_007'),
          t('c12_admission', 'Admission: new & sacrificing ratio',
            'A and B are partners sharing profits in the ratio 3:2. C is admitted for 1/5th share of profits. Calculate the new ratio.',
            'c12_acc_cbse_02_001'),
        ],
      },
      {
        key: 'c12_ratios', label: 'Accounting Ratios',
        topics: [
          // no authored corpus chapter for ratios (leac205 has no nodes):
          // nodeId stays undefined and the misconception panel honestly
          // renders nothing.
          t('c12_current_ratio', 'Current ratio',
            'Current assets are Rs 400,000 and current liabilities are Rs 200,000. Calculate the current ratio.'),
          t('c12_quick_ratio', 'Quick ratio',
            'Current assets Rs 500,000, stock Rs 150,000, prepaid expenses Rs 10,000, current liabilities Rs 170,000. Calculate the quick ratio.'),
          t('c12_debt_equity', 'Debt-equity ratio',
            'Long term borrowings Rs 600,000; share capital Rs 400,000 and reserves and surplus Rs 200,000. Calculate the debt equity ratio.'),
          t('c12_gp_ratio', 'Gross profit ratio',
            'Gross profit is Rs 120,000 and net sales are Rs 480,000. Calculate the gross profit ratio.'),
          t('c12_np_ratio', 'Net profit ratio',
            'Net profit Rs 60,000, net sales Rs 480,000. Calculate the net profit ratio.'),
        ],
      },
    ],
  },
  {
    key: 'c9icse', label: 'Class 9 · Commercial Studies (ICSE)',
    chapters: [
      {
        key: 'c9_ch4', label: 'Introduction to Accounting & Bookkeeping',
        topics: [
          // ICSE corpus nodes are skeletons: misconception content degrades
          // honestly to nothing until they are authored.
          t('c9_journal', 'First journal entries',
            'Journalise the transaction: Bought goods for cash Rs 50,000',
            'c9_comst_icse_04_002'),
          t('c9_capital', 'Capital introduced',
            'Journalise: Commenced business with cash Rs 2,00,000',
            'c9_comst_icse_04_008'),
        ],
      },
      {
        key: 'c9_ch5', label: 'Banking',
        topics: [
          t('c9_brs', 'Reconciling the bank',
            'Debit balance as per cash book Rs 25,000. Cheques issued but not presented for payment Rs 5,000; bank charges Rs 200; interest credited by bank Rs 500. Prepare a bank reconciliation statement.',
            'c9_comst_icse_05_007'),
        ],
      },
    ],
  },
]

export interface TxnPreset {
  key: string
  /** The transaction sentence — sent verbatim to the solver. */
  prompt: string
  short: string
  /** Amount used for the equation-pan animation + ledger posting. */
  amount: number
  /** Authored corpus node for the wrong-entry misconception panel. */
  nodeId?: string
  /** The classic trap this preset catches (drives the picker hint). */
  trap?: string
}

/**
 * Classic class-11 transaction set for the journal workbench and the 3D
 * accounting-equation pans. Only the SENTENCE is data — the expected
 * debit/credit pair is never hardcoded here; it always comes from the
 * solver's golden entry (POST /api/sandbox/solve, subject accountancy).
 */
export const TXN_PRESETS: TxnPreset[] = [
  { key: 'capital', short: 'Started business with cash', prompt: 'Journalise: Commenced business with cash Rs 2,00,000', amount: 200000, nodeId: 'c11_acc_cbse_03_003' },
  { key: 'goods_cash', short: 'Bought goods for cash', prompt: 'Journalise the transaction: Bought goods for cash Rs 50,000', amount: 50000, nodeId: 'c11_acc_cbse_03_007' },
  { key: 'goods_credit', short: 'Bought goods on credit', prompt: 'Pass journal entry: Bought goods on credit from Mohan for Rs 20,000', amount: 20000, nodeId: 'c11_acc_cbse_03_006' },
  { key: 'furniture_cash', short: 'Bought furniture (asset!) for cash', prompt: 'Journalise the transaction: Bought furniture for cash Rs 15,000', amount: 15000, nodeId: 'c11_acc_cbse_03_004', trap: 'furniture' },
  { key: 'sold_cash', short: 'Sold goods for cash', prompt: 'Journal entry for: Sold goods for cash Rs 30,000', amount: 30000, nodeId: 'c11_acc_cbse_03_005' },
  { key: 'sold_credit', short: 'Sold goods on credit', prompt: 'Journal entry for: Sold goods on credit to Ramesh for Rs 25,000', amount: 25000, nodeId: 'c11_acc_cbse_03_005' },
  { key: 'rent', short: 'Paid rent by cheque', prompt: 'Journalise the transaction: Paid rent Rs 12,000 by cheque', amount: 12000, nodeId: 'c11_acc_cbse_03_005' },
  { key: 'wages', short: 'Paid wages in cash', prompt: 'Record the transaction: Paid wages Rs 5,000 in cash', amount: 5000, nodeId: 'c11_acc_cbse_03_005' },
  { key: 'drawings', short: 'Withdrew for personal use', prompt: 'Journal entry: Withdrew cash Rs 10,000 for personal use', amount: 10000, nodeId: 'c11_acc_cbse_03_004', trap: 'drawings' },
  { key: 'deposit', short: 'Deposited cash into bank', prompt: 'Pass journal entry: Deposited cash into bank Rs 40,000', amount: 40000, nodeId: 'c11_acc_cbse_03_004' },
  { key: 'commission', short: 'Received commission', prompt: 'Record the transaction: Received commission Rs 3,000 in cash', amount: 3000, nodeId: 'c11_acc_cbse_03_005' },
  { key: 'pay_creditor', short: 'Paid a creditor', prompt: 'Journalise the transaction: Paid Rs 10,000 to Mohan in cash', amount: 10000, nodeId: 'c11_acc_cbse_03_006' },
]

/** Accounts offered on the workbench pickers (labels only — no answers). */
export const ACCOUNT_CHOICES: string[] = [
  'Cash', 'Bank', 'Capital', 'Drawings', 'Purchases', 'Sales',
  'Furniture', 'Machinery', 'Mohan (creditor)', 'Ramesh (debtor)',
  'Rent', 'Wages', 'Commission Received',
]
