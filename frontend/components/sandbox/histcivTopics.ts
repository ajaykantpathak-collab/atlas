/**
 * histcivTopics.ts — closed-world content pack for the E6 Timeline &
 * Causal-Chain sandbox (History & Civics, classes 6-10).
 *
 * EVERY date, event label and cause→effect link below is taken from the
 * authored cisce_nodes_v2 histciv corpus (c6-c10_histciv_icse_*). No
 * invented dates, no generated filler — the sandbox teaches exactly the
 * chronology and the causal chains the corpus teaches.
 *
 * `nodeId` points at the chapter's authored node used for wrong-state
 * misconception teaching via GET /api/content/nodes/{id}/enrichment
 * (remediation.ts — honest degradation when the node is absent).
 */

export interface HistEvent {
  key: string
  label: string
  /** Exact corpus date string (rendered on the axis slot). */
  date: string
  /** Sort key: years, negative = BCE (c. prefixes allowed in `date`). */
  year: number
}

export interface ChainPair {
  key: string
  cause: string
  effect: string
  /** The corpus's own causal link (shown after correct placement). */
  why: string
}

export interface HistCivChapter {
  key: string
  label: string
  /** Authored chapter-opener node (misconception source, closed-world). */
  nodeId: string
  blurb: string
  events: HistEvent[]
  chain: ChainPair[]
}

export interface HistCivBand {
  key: string
  label: string
  chapters: HistCivChapter[]
}

export const HISTCIV_SANDBOX_CLASSES: HistCivBand[] = [
  // ------------------------------------------------------------ class 6 --
  {
    key: 'c6', label: 'Class 6',
    chapters: [
      {
        key: 'c6_ancient', label: 'Ancient India: Harappa → Guptas',
        nodeId: 'c6_histciv_icse_05_001',
        blurb: 'The river-valley-to-Golden-Age span: Harappan cities, the Vedic age, the great preachers, the Mauryan empire and the Guptas (c6/c9 corpus chronology).',
        events: [
          { key: 'har', label: 'Harappan cities flourish (earliest urban culture of the subcontinent)', date: 'c. 2600-1900 BCE', year: -2600 },
          { key: 'ved', label: 'Vedic period — the four Vedas composed and transmitted orally', date: 'c. 1500-500 BCE', year: -1500 },
          { key: 'pre', label: 'Age of the great preachers — Jainism and Buddhism arise in North India', date: '6th century BCE (c. 600-500 BCE)', year: -600 },
          { key: 'mau_b', label: 'Chandragupta Maurya overthrows the Nandas and founds the Mauryan Empire', date: 'c. 322 BCE', year: -322 },
          { key: 'kal', label: 'Kalinga War — Ashoka publishes the butcher\'s bill in Rock Edict XIII', date: '261 BCE', year: -261 },
          { key: 'mau_e', label: 'End of the Mauryan Empire — the first pan-Indian empire falls', date: '185 BCE', year: -185 },
          { key: 'gup_b', label: 'Gupta dynasty begins — the "Golden Age" opens', date: 'c. 320 CE', year: 320 },
          { key: 'gup_e', label: 'End of the Gupta era', date: 'c. 550 CE', year: 550 },
        ],
        chain: [
          { key: 'states', cause: 'Urbanisation and the rise of territorial states (6th century BCE)', effect: 'Jainism and Buddhism emerge in North India', why: 'The corpus opens Jainism/Buddhism with "a period marked by urbanisation, the rise of territorial states" — social change bred the new religious orders.' },
          { key: 'kalinga', cause: 'Kalinga War, 261 BCE', effect: 'Ashoka\'s remorse and the policy of dhamma-vijaya', why: 'Rock Edict XIII records "one hundred thousand slain…"; the emperor\'s remorse-conversion followed the war — cause before consequence.' },
          { key: 'nanda', cause: 'Chandragupta Maurya overthrows the Nanda dynasty', effect: 'First pan-Indian empire founded (c. 322 BCE)', why: 'The Mauryan Empire (c. 322-185 BCE) was founded by Chandragupta Maurya after overthrowing the Nanda dynasty.' },
          { key: 'gupta', cause: 'Political stability and efficient administration under the Guptas', effect: 'The "Golden Age" of cultural patronage (c. 320-550 CE)', why: 'The corpus: the Golden Age is when political stability, efficient administration and cultural patronage produced the era\'s achievements.' },
        ],
      },
      {
        key: 'c6_panchayat', label: 'Panchayati Raj & Urban Local Govt',
        nodeId: 'c6_histciv_icse_07_001',
        blurb: 'Rural and urban local self-government: the three-tier Panchayati Raj of the 73rd Amendment and municipal bodies — civics done at the grassroots.',
        events: [
          { key: 'amend', label: '73rd Constitutional Amendment gives panchayats constitutional status', date: '1992', year: 1992 },
          { key: 'rte', label: 'Article 21A inserted — free and compulsory education becomes a fundamental right (6-14)', date: '2002 (86th Amendment)', year: 2002 },
          { key: 'rte_act', label: 'Right of Children to Free and Compulsory Education Act in force', date: '1 April 2010', year: 2010 },
        ],
        chain: [
          { key: 'art40', cause: 'Article 40 — the State organises village panchayats (DPSP)', effect: '73rd Constitutional Amendment, 1992: three tiers, five-year elections, reservations (one in three for women)', why: 'The corpus: action began at Nagaur, permanence arrived in 1992 — the DPSP promise became a constitutional structure.' },
          { key: 'schemes', cause: 'Centrally-designed schemes (MGNREGA, PMGSY, NRLM)', effect: 'Gram Panchayats adapt and implement them locally', why: 'The corpus: such schemes "are designed centrally but need local adaptation" — the panchayat is the delivery point.' },
          { key: '21a', cause: 'Article 21A — education a fundamental right (ages 6-14)', effect: 'RTE Act 2009 operationalises the right (in force 1 April 2010)', why: 'Amendment and statute are different instruments with different years — Article 21A made the right, the RTE Act 2009 is the working statute.' },
        ],
      },
    ],
  },
  // ------------------------------------------------------------ class 7 --
  {
    key: 'c7', label: 'Class 7',
    chapters: [
      {
        key: 'c7_medieval', label: 'Medieval World: Rome → Islam',
        nodeId: 'c7_histciv_icse_01_001',
        blurb: 'Decline of the Western Roman Empire and the rise of Christianity and Islam — the two linked stories that open medieval history.',
        events: [
          { key: 'const', label: 'Constantine founds Constantinople — a new capital in the East', date: '330 CE', year: 330 },
          { key: 'islam', label: 'Prophet Muhammad begins preaching Islam in Arabia', date: '610 CE', year: 610 },
          { key: 'rome', label: 'Western Roman Empire falls — Odoacer removes the western emperor', date: '476 CE', year: 476 },
          { key: 'pope', label: 'Authority runs through the Church — the Pope "manufactures an emperor"', date: '800 CE', year: 800 },
        ],
        chain: [
          { key: 'legit', cause: 'The western emperor falls (476 CE)', effect: 'The West loses its fount of legitimacy; by 800 CE authority runs through the Church', why: 'The corpus: before 476 CE authority ran from the emperor down; after the fall there was "no fount of legitimacy at all" until the Pope could crown emperors.' },
          { key: 'survive', cause: '476 CE ends the western emperor', effect: 'The Church survives as the actual government among the Goths', why: '476 CE (Odoacer) "removed the western emperor altogether, leaving Goths as the actual government" — what survived matters more than what fell.' },
        ],
      },
      {
        key: 'c7_sultanate', label: 'Turkish Invasions → Sultanate → Mughals',
        nodeId: 'c7_histciv_icse_05_001',
        blurb: 'The two Turkish waves that broke open India\'s defences, the Sultanate\'s rise and Tughlaq disintegration, and Babur\'s decisive Panipat.',
        events: [
          { key: 'ghazni', label: 'Turkish attacks — the wave from Ghazni raids north-west India', date: '11th century (Ghazni wave)', year: 1000 },
          { key: 'ghor', label: 'The wave from Ghor — Turkish rule takes root in north India', date: '12th century (Ghor wave)', year: 1180 },
          { key: 'tughlaq', label: 'Tughlaq empire disintegrates — central authority of the Delhi Sultanate drains away', date: 'c. 1320-1413', year: 1320 },
          { key: 'panipat', label: 'First Battle of Panipat — Babur defeats Ibrahim Lodi', date: '21 April 1526', year: 1526 },
        ],
        chain: [
          { key: 'waves', cause: 'Two waves of Turkish attack — from Ghazni and from Ghor', effect: 'India\'s north-western defences break open', why: 'The corpus: the two waves from Ghazni and Ghor "broke open India\'s defences and" opened the door to Turkish rule.' },
          { key: 'tughlaq_chain', cause: 'The Tughlaq empire over-extends', effect: 'Regional kingdoms rise from the Sultanate\'s loss of central authority', why: 'Disintegration (c. 1320-1413) is the "gradual loss of central authority by the Delhi Sultanate" — the provinces drift away as power drains.' },
          { key: 'babur', cause: 'Babur, a Timurid prince from Kabul, marches on Delhi', effect: 'First Battle of Panipat (21 April 1526) — the decisive clash founds Mughal India', why: 'Panipat was "the decisive clash between Babur, a Timurid prince from Kabul, and Ibrahim Lodi, the Sultan of Delhi".' },
        ],
      },
      {
        key: 'c7_constitution', label: 'Constitution & DPSP (basics)',
        nodeId: 'c7_histciv_icse_07_001',
        blurb: 'The Constitution of India as supreme legal document, and the Directive Principles that push the State toward a welfare state.',
        events: [
          { key: 'ca', label: 'Constituent Assembly first meets — Dr. Rajendra Prasad elected President', date: '9 December 1946', year: 1946 },
          { key: 'adopt', label: 'Constitution adopted after 2 years, 11 months, 18 days of debate', date: '26 November 1949', year: 1949 },
          { key: 'force', label: 'Constitution comes into force — commemorating the 1930 Purna Swaraj declaration', date: '26 January 1950', year: 1950 },
          { key: 'parl', label: 'Constituent Assembly serves as provisional Parliament until the first general elections', date: '1952', year: 1952 },
        ],
        chain: [
          { key: 'draft', cause: 'Assembly elected in 1946; Drafting Committee chaired by Dr. B.R. Ambedkar', effect: 'Constitution adopted 26 November 1949', why: 'The Assembly of 389 members (299 after Partition) debated every clause across 11 sessions — adoption is the Assembly\'s formal approval.' },
          { key: 'enforce', cause: 'Administrative machinery needs readiness + symbolic timing', effect: 'Enforcement set for 26 January 1950 — the anniversary of the 1930 Purna Swaraj declaration', why: 'The two-month gap was kept for preparation and to align with 26 January 1930 — adoption and enforcement are NOT the same event.' },
          { key: 'welfare', cause: 'DPSP (Part IV, Articles 36-51) — non-justiciable guidelines', effect: 'The State directed toward a welfare state', why: 'DPSP embody socialist, Gandhian and liberal-intellectual ideals; Article 37 makes them "fundamental in governance" though not court-enforceable.' },
        ],
      },
    ],
  },
  // ------------------------------------------------------------ class 8 --
  {
    key: 'c8', label: 'Class 8',
    chapters: [
      {
        key: 'c8_mod_europe', label: 'Renaissance → French Revolution',
        nodeId: 'c8_histciv_icse_02_001',
        blurb: 'Rebirth in Italy, then the upheaval in France: why humanist inquiry led, chain by chain, to the storming of the Bastille.',
        events: [
          { key: 'ren', label: 'Renaissance begins in Italy — "rebirth" of classical learning', date: '14th century', year: 1300 },
          { key: 'ren_spr', label: 'Renaissance spreads across Europe (14th-16th c.)', date: '15th-16th century', year: 1450 },
          { key: 'notables', label: 'Assembly of Notables refuses reform — France nears bankruptcy', date: '1787', year: 1787 },
          { key: 'estates', label: 'Estates-General summoned — the trigger of the Revolution', date: '5 May 1789', year: 1789 },
          { key: 'bastille', label: 'Crowd storms the Bastille — the outbreak of the Revolution', date: '14 July 1789', year: 1789.5 },
          { key: 'frev_end', label: 'The French Revolution period closes', date: '1799', year: 1799 },
        ],
        chain: [
          { key: 'debt', cause: 'Near-bankruptcy (debt near four billion livres) and the Notables\' refusal of reform (1787)', effect: 'Estates-General summoned (5 May 1789)', why: 'The corpus correction: "the trigger was the summons of the Estates-General, forced by near-bankruptcy and the Notables\' refusal of reform".' },
          { key: 'bastille_c', cause: 'Estates-General summoned (5 May 1789)', effect: 'Crowd storms the Bastille (14 July 1789)', why: 'The Bastille was the OUTBREAK, twelve days into July — using it as a cause inverts the chain; the examiner\'s first mark is separating causes from events.' },
          { key: 'humanism', cause: 'Renaissance humanism questions authority', effect: 'Reformation splits Western Christianity (early 16th c.)', why: 'The corpus chain: "humanist inquiry fueled religious reform" — each movement caused the next.' },
          { key: 'industrial', cause: 'Religious fragmentation enables political centralisation; capital accumulates', effect: 'Industrial Revolution mechanises production (late 18th-19th c.)', why: 'The corpus: "political stability and capital accumulation powered industrialisation" — the Modern Age is a chain, not isolated facts.' },
        ],
      },
      {
        key: 'c8_transition', label: 'India in the 18th Century',
        nodeId: 'c8_histciv_icse_03_001',
        blurb: 'The century of TRANSITION: from Aurangzeb\'s death (1707) to the 1760s-1790s when the English East India Company stopped being a guest.',
        events: [
          { key: 'aurangzeb', label: 'Aurangzeb dies — the transition century begins', date: '1707', year: 1707 },
          { key: 'plassey', label: 'Battle of Plassey — the Company defeats Nawab Siraj-ud-Daula of Bengal', date: '1757', year: 1757 },
          { key: 'buxar', label: 'Battle of Buxar — the Company defeats Mir Qasim, Shuja-ud-Daula and Shah Alam II combined', date: '1764', year: 1764 },
          { key: 'diwani', label: 'Treaty of Allahabad grants the Diwani of Bengal, Bihar and Orissa', date: '1765', year: 1765 },
        ],
        chain: [
          { key: 'mughal', cause: 'Aurangzeb\'s death (1707)', effect: 'Mughal centre weakens; regional powers rise through the 18th century', why: 'The corpus frames the century of transition "roughly 1707, Aurangzeb\'s death, to the 1760s-1790s, when the English" Company replaced the old order.' },
          { key: 'plassey_c', cause: 'The Company exploits Bengal\'s succession disputes (supports Mir Jafar)', effect: 'Victory at Plassey (1757)', why: 'The conquest phase: the Company "exploited succession disputes (e.g., supporting Mir Jafar at Plassey)" — trade privilege turned political.' },
          { key: 'buxar_c', cause: 'Victory at Plassey (1757)', effect: 'Victory at Buxar (1764) over a combined army', why: 'Plassey against Siraj-ud-Daula, then Buxar in 1764 "against the combined forces of Mir Qasim, Shuja-ud-Daula, and the Mughal emperor Shah Alam II" — the second win made the first irreversible.' },
          { key: 'diwani_c', cause: 'Victory at Buxar (1764)', effect: 'Treaty of Allahabad (1765): Diwani of Bengal, Bihar and Orissa', why: 'Treaties converted battlefield success into revenue rights — the Diwani made the Company collector of Bengal\'s taxes.' },
        ],
      },
      {
        key: 'c8_traders', label: 'Traders to Rulers: Company Raj',
        nodeId: 'c8_histciv_icse_04_001',
        blurb: 'The full arc: charter to conquest to administration — Plassey, Buxar, Diwani, dual government, famine, and Parliament\'s response.',
        events: [
          { key: 'charter', label: 'EIC chartered by Queen Elizabeth I to trade with the East Indies', date: '31 December 1600', year: 1600 },
          { key: 'surat', label: 'First English factory at Surat (Jahangir\'s farman of 1615 grants duty-free trade)', date: '1613', year: 1613 },
          { key: 'madras', label: 'Fort St George built at Madras', date: '1639', year: 1639 },
          { key: 'bombay', label: 'Bombay received as part of Catherine of Braganza\'s dowry', date: '1668', year: 1668 },
          { key: 'calcutta', label: 'Fort William built at Calcutta', date: '1690', year: 1690 },
          { key: 'plassey', label: 'Battle of Plassey — Company against Nawab Siraj-ud-Daula', date: '1757', year: 1757 },
          { key: 'buxar', label: 'Battle of Buxar — Company against Mir Qasim, Shuja-ud-Daula, Shah Alam II', date: '1764', year: 1764 },
          { key: 'diwani', label: 'Diwani of Bengal, Bihar, Orissa granted (Treaty of Allahabad)', date: '1765', year: 1765 },
          { key: 'famine', label: 'Great Bengal famine under dual government', date: '1770', year: 1770 },
          { key: 'hastings', label: 'Warren Hastings ends the dual government — direct Company rule begins', date: '1772', year: 1772 },
          { key: 'regulating', label: 'Regulating Act — Parliament responds to the Company\'s misgovernment', date: '1773', year: 1773 },
          { key: 'supcourt', label: 'Supreme Court established at Calcutta', date: '1774', year: 1774 },
          { key: 'perm', label: 'Permanent Settlement declared by Cornwallis', date: '1793', year: 1793 },
        ],
        chain: [
          { key: 'plassey_buxar', cause: 'Battle of Plassey (1757)', effect: 'Battle of Buxar (1764)', why: 'Plassey toppled Siraj-ud-Daula; Buxar (1764) broke the combined armies of Mir Qasim, Shuja-ud-Daula and Shah Alam II — conquest chained to conquest.' },
          { key: 'buxar_diwani', cause: 'Battle of Buxar (1764)', effect: 'Diwani rights via the Treaty of Allahabad (1765)', why: 'The corpus: "legal instruments converted battlefield success into revenue rights" — the Diwani of Bengal, Bihar, Orissa.' },
          { key: 'diwani_dual', cause: 'Diwani granted (1765)', effect: 'Dual government — revenue without responsibility', why: 'With the Diwani the Company collected the land revenue while Nawab-era machinery governed — "converting commercial capital into land revenue".' },
          { key: 'dual_famine', cause: 'Dual government (revenue-first, no accountability)', effect: 'The famine of 1770 — the founding crisis', why: 'The corpus calls dual government and the famine of 1770 "this node\'s founding crisis": collecting revenue without governing killed responsibility.' },
          { key: 'famine_act', cause: 'The Company\'s misgovernment (including 1770\'s failures)', effect: 'Regulating Act, 1773 — Parliament\'s response', why: 'The corpus correction: Hastings ended dual government in 1772 as the Company\'s own measure; the Regulating Act was PARLIAMENT\'S response — "the act preceded the law" trap is a chronology mark.' },
        ],
      },
    ],
  },
  // ------------------------------------------------------------ class 9 --
  {
    key: 'c9', label: 'Class 9',
    chapters: [
      {
        key: 'c9_modern_europe', label: 'Modern Age in Europe',
        nodeId: 'c9_histciv_icse_11_001',
        blurb: 'Four transformative movements, causally linked: Renaissance → Reformation → Industrial Revolution → socialism vs capitalism.',
        events: [
          { key: 'ren', label: 'Renaissance revives classical learning, humanism and artistic innovation', date: '14th-16th century', year: 1400 },
          { key: 'ref', label: 'Reformation splits Western Christianity — individual conscience rises', date: 'early 16th century', year: 1517 },
          { key: 'ind', label: 'Industrial Revolution replaces manual labour with mechanised factories', date: 'late 18th-19th century', year: 1780 },
          { key: 'soc', label: 'Socialism vs capitalism — competing responses to industrial capitalism', date: '19th century', year: 1850 },
        ],
        chain: [
          { key: 'r_to_ref', cause: 'Renaissance humanist inquiry', effect: 'Reformation — religious reform', why: 'The corpus chain: "humanist inquiry fueled religious reform; religious fragmentation enabled political centralisation; political stability and capital accumulation powered industrialisation; industrial disparities sparked ideological debate." "Understanding the chapter means seeing this chain, not memorising isolated facts."' },
          { key: 'ref_to_ind', cause: 'Religious fragmentation → political centralisation and capital accumulation', effect: 'Industrial Revolution (late 18th-19th c.)', why: 'Political stability and accumulated capital powered industrialisation — the second link of the corpus\'s causal chain.' },
          { key: 'ind_to_soc', cause: 'Industrial disparities — factory wealth beside worker misery', effect: 'Socialism arises as a response to capitalism', why: '"Industrial disparities sparked ideological debate": capitalism defended private ownership and market competition; socialism advocated collective ownership and equitable distribution.' },
        ],
      },
      {
        key: 'c9_constitution', label: 'Making of the Constitution',
        nodeId: 'c9_histciv_icse_01_001',
        blurb: 'From the Constituent Assembly\'s first meeting to the Republic: adoption vs enforcement, and why 26 January was chosen.',
        events: [
          { key: 'elected', label: 'Constituent Assembly elected (indirect elections by provincial assemblies)', date: '1946', year: 1946 },
          { key: 'first', label: 'Assembly first meets — 389 members (299 after Partition)', date: '9 December 1946', year: 1946.9 },
          { key: 'purna', label: 'Purna Swaraj declaration — the date the Republic will later inherit', date: '26 January 1930', year: 1930 },
          { key: 'adopt', label: 'Constitution adopted (Drafting Committee chaired by Dr. B.R. Ambedkar)', date: '26 November 1949', year: 1949.9 },
          { key: 'force', label: 'Constitution comes into force — India a sovereign democratic republic', date: '26 January 1950', year: 1950 },
        ],
        chain: [
          { key: 'ambedkar', cause: 'Assembly committees report; Drafting Committee chaired by Dr. B.R. Ambedkar', effect: 'Final text prepared and adopted on 26 November 1949', why: 'Over 11 sessions spanning 2 years, 11 months and 18 days the Assembly debated every clause — adoption is the formal approval of the text.' },
          { key: 'why_jan', cause: 'Administrative machinery needs time + symbolic alignment', effect: 'Enforcement on 26 January 1950 (anniversary of the 1930 Purna Swaraj declaration)', why: 'A two-month gap was kept for preparation and to align with 26 January 1930 — NOT because "the British had to approve it" (India\'s constituent power was sovereign).' },
          { key: 'prov_parl', cause: 'Constitution enforced before the first general elections', effect: 'The Constituent Assembly serves as provisional Parliament until 1952', why: 'Until the first general elections in 1952, the Assembly also served as the provisional Parliament of India.' },
        ],
      },
    ],
  },
  // ----------------------------------------------------------- class 10 --
  {
    key: 'c10', label: 'Class 10',
    chapters: [
      {
        key: 'c10_1857', label: 'First War of Independence, 1857',
        nodeId: 'c10_histciv_icse_04_001',
        blurb: 'From the Meerut mutiny to the fall of Lucknow: where the uprising ran, and why Crown rule followed.',
        events: [
          { key: 'meerut', label: 'Meerut mutiny — sepoys refuse the Enfield cartridges, break out, march to Delhi', date: '10 May 1857', year: 1857.4 },
          { key: 'delhi', label: 'Rebels reach Delhi and proclaim the Mughal Emperor Bahadur Shah Zafar', date: 'late May 1857', year: 1857.5 },
          { key: 'kanpur', label: 'Outbreak at Kanpur — siege begins', date: 'early June 1857', year: 1857.6 },
          { key: 'lucknow', label: 'Outbreak at Lucknow — siege begins', date: 'June-July 1857', year: 1857.7 },
          { key: 'delhi_rec', label: 'British recapture Delhi', date: '20 September 1857', year: 1857.9 },
          { key: 'kanpur_cap', label: 'British capture Kanpur', date: 'early December 1857', year: 1857.95 },
          { key: 'lucknow_cap', label: 'British capture Lucknow — major rebel resistance ends', date: '21 March 1858', year: 1858.2 },
        ],
        chain: [
          { key: 'cartridge', cause: 'New Enfield rifle cartridges the sepoys refuse to use', effect: 'Meerut mutiny (10 May 1857)', why: 'The corpus: the uprising broke out at Meerut "when Indian sepoys of the Bengal Army refused to use the new Enfield rifle cartridges".' },
          { key: 'zafar', cause: 'Sepoys march to Delhi', effect: 'Bahadur Shah Zafar proclaimed — symbolic leadership for the uprising', why: '10 May 1857 "acted as the catalyst, with soldiers marching to Delhi to seek the symbolic leadership of the Mughal Emperor".' },
          { key: 'crown', cause: 'British recapture Delhi (Sep 1857) and Lucknow (Mar 1858)', effect: 'Crown rule replaces Company rule after 1858', why: 'The corpus\'s British Policies chapter surveys "the colonial government (Crown rule after 1858)" — the uprising ended the Company\'s reign.' },
        ],
      },
      {
        key: 'c10_nationalism', label: 'Growth of Nationalism 1885-1916',
        nodeId: 'c10_histciv_icse_05_001',
        blurb: 'From the first Congress session to the Lucknow Pact: the constitutional platform, the Partition shock, and the split that healed.',
        events: [
          { key: 'inc', label: 'First session of the Indian National Congress, Bombay (72 leaders; A.O. Hume\'s initiative; W.C. Bonnerjee president)', date: '28 December 1885', year: 1885.99 },
          { key: 'partition', label: 'Partition of Bengal takes effect — day of mourning, Rakhi-bandhan, Swadeshi boycott begins', date: '16 October 1905', year: 1905.8 },
          { key: 'league', label: 'Muslim League founded', date: '1906', year: 1906 },
          { key: 'surat', label: 'Surat Split — Moderates vs Extremists divide the Congress', date: '1907', year: 1907 },
          { key: 'morley', label: 'Morley-Minto reforms', date: '1909', year: 1909 },
          { key: 'annul', label: 'Partition of Bengal annulled (announced at the Delhi Durbar)', date: '1911', year: 1911 },
          { key: 'lucknow', label: 'Lucknow Pact — Congress and League agree jointly', date: '1916', year: 1916 },
        ],
        chain: [
          { key: 'inc_why', cause: 'Scattered regional protests need a single national platform', effect: 'Indian National Congress founded (December 1885, Bombay)', why: 'The corpus: the 1885 Congress united diverse regions "into a single constitutional platform" and "laid down four principal objectives" — organised nationalism\'s institutional backbone.' },
          { key: 'swadeshi', cause: 'Partition of Bengal effective (16 October 1905)', effect: 'Swadeshi Movement — boycott of British goods, promotion of indigenous industries', why: '16 October 1905 "triggered the Swadeshi Movement — a mass campaign advocating boycott of British goods (especially Manchester textiles)".' },
          { key: 'annul_why', cause: 'Swadeshi pressure radicalises a generation', effect: 'Partition annulled (1911) — but communal lines deepen toward the 1907 Surat Split', why: 'The corpus: annulment came in 1911 "announced at the Delhi Durbar"; the Swadeshi experience "deepened Hindu-Muslim communal lines, and set the stage for the 1907 Surat Split".' },
        ],
      },
      {
        key: 'c10_mass', label: 'Mass Phase 1915-1947: Gandhi',
        nodeId: 'c10_histciv_icse_07_001',
        blurb: 'The Gandhian mobilisations: Rowlatt → Jallianwala → Non-Cooperation → Dandi → Quit India — the chain the corpus drills.',
        events: [
          { key: 'rowlatt', label: 'Rowlatt Act — detention without trial; Rowlatt Satyagraha answers it', date: '1919', year: 1919 },
          { key: 'jallian', label: 'Jallianwala Bagh massacre — General Dyer fires on peaceful protesters at Amritsar', date: '13 April 1919', year: 1919.3 },
          { key: 'noncoop', label: 'Non-Cooperation Movement', date: '1920-22', year: 1920 },
          { key: 'dandi', label: 'Dandi March — Gandhi and 78 satyagrahis walk 385 km to break the salt law; Civil Disobedience begins', date: '12 March - 6 April 1930', year: 1930.2 },
          { key: 'cripps', label: 'Cripps Mission — British-Congress negotiations', date: '1942', year: 1942.1 },
          { key: 'quit', label: 'Quit India — "Do or Die" at Gowalia Tank Maidan, Bombay', date: '8 August 1942', year: 1942.6 },
        ],
        chain: [
          { key: 'rowlatt_chain', cause: 'Rowlatt Act (1919) — jail without trial', effect: 'Rowlatt Satyagraha and the Jallianwala Bagh massacre (13 April 1919)', why: 'The corpus: "Rowlatt Act (1919) triggered the Rowlatt Satyagraha and the Jallianwala Bagh massacre, leading to the Non-Cooperation Movement (1920-22)".' },
          { key: 'jallian_chain', cause: 'Jallianwala Bagh (13 April 1919) — hundreds killed', effect: 'Non-Cooperation Movement (1920-22)', why: 'Jallianwala "turn[ed] widespread shock into a demand for active resistance" — the massacre fed the first all-India mass movement.' },
          { key: 'salt', cause: 'British salt monopoly and the 1882 Salt Act', effect: 'Dandi March (12 March - 6 April 1930) launches Civil Disobedience', why: 'Gandhi and 78 followers walked 385 km "to the Arabian Sea coast and illegally produced salt, defying the British monopoly and the 1882 Salt Act" — dramatising defiance of the salt tax.' },
          { key: 'quit_chain', cause: 'British refusal of immediate self-rule during WWII', effect: 'Quit India (8 August 1942) — "Do or Die"', why: 'Launched "at Bombay\'s Gowalia Tank Maidan with his \'Do or Die\' call, backed by the Congress Quit India Resolution"; the Cripps negotiations (1942) had failed to satisfy.' },
        ],
      },
      {
        key: 'c10_ina', label: 'Forward Bloc, INA & Red Fort Trials',
        nodeId: 'c10_histciv_icse_08_001',
        blurb: 'Bose\'s dual track: the Forward Bloc at home, the INA abroad — ending in the trials that broke the loyalty of the colonial army.',
        events: [
          { key: 'tripuri', label: 'Tripuri session — Bose re-elected but the Working Committee demands he act per Gandhi\'s wishes', date: 'March 1939', year: 1939.2 },
          { key: 'fb', label: 'Bose resigns (29 April) and announces the Forward Bloc as a left-wing faction within the Congress', date: '3 May 1939', year: 1939.35 },
          { key: 'ina', label: 'Bose revitalises the INA as Azad Hind Fauj — provisional government in Singapore, Rani of Jhansi Regiment', date: '1943', year: 1943 },
          { key: 'imphal', label: 'Imphal-Kohima offensive — military failure, political proof Indians fight under their own flag', date: '1944', year: 1944 },
          { key: 'trials', label: 'Red Fort trials of INA officers (Shah Nawaz, Sahgal, Dhillon)', date: 'Nov 1945 - Jan 1946', year: 1945.9 },
          { key: 'rin', label: 'Royal Indian Navy mutiny — inspired by the trials', date: 'February 1946', year: 1946.1 },
        ],
        chain: [
          { key: 'tripuri_chain', cause: 'Tripuri (March 1939): the Working Committee refuses Bose\'s radical programme', effect: 'Bose resigns (29 April 1939), forms the Forward Bloc (3 May 1939)', why: 'The corpus: "Bose was elected President at Haripura (1938) and re-elected at Tripuri (1939) despite Gandhi\'s opposition… Bose resigned on 29 April 1939 and formed the Forward Bloc days later."' },
          { key: 'fb_ina', cause: 'Forward Bloc supplies ideological cadre and domestic network', effect: 'INA projects armed struggle abroad — the dual strategy', why: '"The Forward Bloc supplied the ideological cadre and political network inside India, while the INA projected armed struggle externally" — a coordinated plan, not isolated experiments.' },
          { key: 'trials_chain', cause: 'INA officers captured → put on trial at the Red Fort (Nov 1945 - Jan 1946)', effect: 'Cross-communal protests and the RIN mutiny (Feb 1946) — the loyalty of the Indian armed forces breaks', why: 'The corpus: sympathy for the accused spread to the Royal Indian Navy and army units — "the ultimate instrument of colonial control" became unreliable.' },
          { key: 'quit_1947', cause: 'Loyalty crisis + post-war exhaustion + global decolonisation pressure', effect: 'Attlee\'s government announces transfer of power (February 1947)', why: 'The corpus: "the trials were the catalyst that converted latent nationalist sentiment into an uncontrollable crisis, making British withdrawal inevitable."' },
        ],
      },
      {
        key: 'c10_partition', label: 'Independence & Partition 1946-47',
        nodeId: 'c10_histciv_icse_09_001',
        blurb: 'Cabinet Mission to the two dominions: the British initiatives that closed the Raj.',
        events: [
          { key: 'rin', label: 'Royal Indian Navy mutiny', date: 'February 1946', year: 1946.1 },
          { key: 'cabinet', label: 'Cabinet Mission arrives — first of three British initiatives', date: 'March 1946', year: 1946.2 },
          { key: 'plan', label: 'Mountbatten\'s 3 June partition plan', date: '3 June 1947', year: 1947.4 },
          { key: 'act', label: 'Indian Independence Act — British Parliament creates the two dominions, ends suzerainty over princely states', date: '18 July 1947', year: 1947.55 },
          { key: 'freedom', label: 'Independence — Nehru PM of India, Jinnah Governor-General of Pakistan', date: '15 August 1947', year: 1947.6 },
        ],
        chain: [
          { key: 'initiatives', cause: 'Post-war crisis: INA trials sympathy, RIN mutiny (Feb 1946), British exhaustion', effect: 'Cabinet Mission (March 1946) — first British initiative to transfer power', why: 'The corpus frames the chapter as "the catalysts for three key British initiatives: the Cabinet Mission (March 1946)" and its successors.' },
          { key: 'plan_chain', cause: 'Cabinet Mission failures and Mountbatten\'s urgency', effect: '3 June 1947 partition plan — two dominions', why: 'The 3 June 1947 plan became "Mountbatten\'s partition plan", given legal effect by the Indian Independence Act (18 July 1947) — Attlee\'s pragmatism, Cripps\' idealism and Mountbatten\'s urgency combined.' },
          { key: 'act_chain', cause: 'Indian Independence Act (18 July 1947)', effect: 'Princely states\' paramountcy lapses; Patel persuades the princes to accede', why: 'The Act "ended British suzerainty over princely states"; Patel "used the Act\'s lapse of paramountcy to persuade princes to accede".' },
        ],
      },
      {
        key: 'c10_wars_un', label: 'World Wars, UN & NAM',
        nodeId: 'c10_histciv_icse_12_001',
        blurb: 'From the dictatorships to the United Nations and non-alignment: how a second world war built a new world order.',
        events: [
          { key: 'ww1', label: 'First World War', date: '1914-1918', year: 1914 },
          { key: 'rome', label: 'March on Rome — Fascism takes power in Italy', date: '1922', year: 1922 },
          { key: 'hitler', label: 'Hitler becomes Chancellor — via backroom deals, not direct popular vote', date: '30 January 1933', year: 1933.1 },
          { key: 'poland', label: 'Germany invades Poland — the Second World War begins', date: '1 September 1939', year: 1939.7 },
          { key: 'declare', label: 'Britain and France declare war on Germany', date: '3 September 1939', year: 1939.72 },
          { key: 'pearl', label: 'Pearl Harbor — the war becomes truly global', date: 'December 1941', year: 1941.95 },
          { key: 'un', label: 'United Nations founded "to save succeeding generations from the scourge of war"', date: '24 October 1945', year: 1945.8 },
          { key: 'bandung', label: 'Bandung Conference — Afro-Asian solidarity prefigures non-alignment', date: '1955', year: 1955 },
          { key: 'belgrade', label: 'Belgrade Conference launches the Non-Aligned Movement (25 states)', date: '1961', year: 1961 },
        ],
        chain: [
          { key: 'dict', cause: 'Post-WWI discontent (Treaty of Versailles settlements)', effect: 'Rise of dictatorships: Fascism in Italy (1922-43), Nazism in Germany (1933-45)', why: 'The corpus: the Rise of Dictatorships chapter "examines how two totalitarian regimes emerged" from the post-war settlement\'s grievances.' },
          { key: 'ww2', cause: 'Germany invades Poland (1 September 1939)', effect: 'Britain and France declare war (3 September 1939)', why: 'The invasion "prompt[ed] Britain and France to declare war on 3 September 1939" — Pearl Harbor (December 1941) only globalised the conflict.' },
          { key: 'un_chain', cause: 'The Second World War (1939-45)', effect: 'United Nations founded 24 October 1945 to maintain international peace', why: 'The UN was "founded on 24 October 1945 after the Second World War to maintain international peace and" security — the war caused the order.' },
          { key: 'nam_chain', cause: 'Cold War bloc pressure on newly sovereign states', effect: 'Non-Aligned Movement launched at Belgrade (1961)', why: 'NAM is "a forum of states that, during the Cold War, refused formal alignment with either" bloc; Belgrade gave 25 states "a collective platform to assert independence".' },
        ],
      },
    ],
  },
]

export const TOTAL_HISTCIV_CHAPTERS = HISTCIV_SANDBOX_CLASSES.reduce(
  (n, b) => n + b.chapters.length, 0)

/** Fisher-Yates on a copy — shuffles the pool for a fresh attempt. */
export function shuffled<T>(arr: readonly T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
