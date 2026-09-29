import type { SimDef } from '../../engine/types';
import C11_HistoryLongtermCausesAllianceSim from '../../../simulations/c6_12/C11_HistoryLongtermCausesAllianceSim';

/** v3 wrapped master — C11_HistoryLongtermCausesAllianceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historylongtermcausesalliancesim: SimDef = {
    id: 'v3w_c11_historylongtermcausesalliancesim',
    title: 'The Decline of the Mongol Empire and Its Legacy',
    subtitle: 'Covers the period from Möngke Khan\'s death (1259) to the fall of the Yuan Dynasty (1368).',
    classLevel: 11, subject: 'history', topic: 'The Decline of the Mongol Empire and Its Legacy',
    chapters: [],
    nodeIds: ['c11_hist_cbse_05_011', 'c11_hist_cbse_03_008', 'c11_hist_cbse_04_010', 'c11_hist_cbse_06_011', 'c11_hist_cbse_05_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re standing at the Qutub Minar complex in Delhi, looking at the Iron Pillar that has resisted.', goal: 'Master The Decline of the Mongol Empire and Its Legacy.' },
    discovery: {
        question: 'Evaluate the claim: "The 1054 Schism was primarily a diplomatic incident, not a theological rupture." Support your judgment with evidence.',
        options: ['The claim is **partially valid but incomplete**', 'just a quarrel between two men', 'inevitable theological split'],
        answer: 'The claim is **partially valid but incomplete**',
        hook: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.',
    },
    teaching: [
        { title: 'The decline of the Mongol Empire refers to.', text: 'The decline of the Mongol Empire refers to the political fragmentation and gradual collapse of the unified Mongol imperium after 1260 CE into four independent khanates (Yuan, Il-Khanate, Golden.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_05_011', title: 'The decline of the Mongol Empire refers.',
          scaffold: { problem: 'Explain why the Il-Khanate in Persia collapsed completely by 1335 while the Golden Horde persisted in fragmented form until 1502, despite.',
            steps: [
            { text: 'Identify the Il-Khanate\'s revenue base - dependent on Persian sedentary agriculture and Silk Road trade taxes, both.' },
            { text: 'Identify the Golden Horde\'s revenue base - tribute from Russian principalities (stable "basket" system), Volga trade.' },
            { text: 'Compare succession stability - Il-Khanate had 9 rulers in 30 years (1295–1335) with no adult male heirs after Abu.' },
            { text: 'Analyze geopolitical context - Il-Khanate sandwiched between Mamluks, Chagatai, and Anatolian beyliks with no.' },
            { text: 'Evaluate cultural integration - Il-Khans became Persianized rapidly (Ghazan\'s reforms 1295), losing Mongol military.' },
            { text: 'Synthesize - The Il-Khanate\'s total collapse resulted from fiscal collapse + succession extinction + geopolitical.', faded: true, blankAnswer: 'The Il-Khanate collapsed because its Persian agrarian.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_03_008', title: 'The Great Schism of 1054 was the formal.',
          scaffold: { problem: 'Explain why the *Filioque* clause became the central theological symbol of the East-West split, tracing its origin, adoption, and Eastern.',
            steps: [
            { text: 'Identify the original Nicene-Constantinopolitan Creed (381) — "the Holy Spirit proceeds from the Father" (John 15:26).' },
            { text: 'Trace the *Filioque* insertion: Visigothic Spain (c. 589, Third Council of Toledo) to combat Arianism by emphasizing.' },
            { text: 'Note Rome\'s initial resistance: Pope Leo III (809) had the Creed engraved *without* Filioque on silver shields at St.' },
            { text: 'Analyze Eastern theological objection: (a) Violates monarchy of the Father as sole source (arche) of Trinity; (b).' },
            { text: 'Evaluate symbolic weight: *Filioque* became the shibboleth because it encapsulated both doctrinal innovation and papal.', faded: true, blankAnswer: 'The *Filioque* began as a local anti-Arian measure in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_04_010', title: 'The Crusades (1095–1291) were a series.',
          scaffold: { problem: 'Explain the causes of the First Crusade using a multi-causal framework that distinguishes between long-term structural factors and.',
            steps: [
            { text: 'Identify the long-term structural factors: (a) 11th-century European population growth creating a surplus of landless.' },
            { text: 'Identify the medium-term geopolitical shifts: (a) Seljuk conquest of Anatolia after Manzikert (1071) threatening.' },
            { text: 'Identify the immediate trigger: Byzantine Emperor Alexios I\'s appeal to Pope Urban II (1095) for mercenaries, which.' },
            { text: 'Analyze the papal agenda: Urban sought to assert papal leadership over Latin Christendom, heal the Schism by aiding.' },
            { text: 'Synthesize: The Crusade emerged from the convergence of European internal pressures (demographic, social, religious).' },
            { text: 'Evaluate significance: This multi-causal model explains why the First Crusade succeeded (Muslim disunity) while later.', faded: true, blankAnswer: 'The First Crusade resulted from the interplay of European.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_06_011', title: 'The Crisis of Feudalism (c. 1300–1450).',
          scaffold: { problem: 'Using the 1351 Statute of Labourers clauses (max wages for threshers, carters, mowers; penalties for "giving or taking" excess), explain.',
            steps: [
            { text: 'Identify the statutory wage caps (e.g., thresher 2½d/day with food) and penalties (fine, imprisonment) from the statute.' },
            { text: 'Calculate the market wage in 1360 using manorial accounts (e.g., thresher actually paid 4d/day + food) — the gap is 60%.' },
            { text: 'Map the enforcement structure: the lord\'s steward presides over the manor court; the same lord needs threshers for his.' },
            { text: 'Analyse the conflict of interest: if the lord prosecutes a thresher for taking 4d, he loses that thresher (who flees).' },
            { text: 'Note the "giving" clause — peasants could refuse to work unless paid market rate; lords "gave" excess secretly (livery,.' },
            { text: 'Conclude: the law criminalised the market equilibrium; enforcement required a neutral state apparatus that did not.', faded: true, blankAnswer: 'The Statute of Labourers was unenforceable because the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_05_007', title: 'The Mongol Empire under Ögedei Khan (r..',
          scaffold: { problem: 'Using the "Imperial Expansion" formula above, explain why the Mongol campaign in Europe (1236–1242) achieved rapid battlefield success but.',
            steps: [
            { text: 'Identify the variables for the European theatre — Charismatic Mandate (high, Genghis\'s will), Decimal System (high,.' },
            { text: 'Identify the variables for the Jin theatre — Charismatic Mandate (high), Decimal System (high, Ögedei/Tolui commanded),.' },
            { text: 'Compute the "Expansion Score" for each: Europe = (High×High) + (High×Low) − (Binding×Extreme) = High + Low − Extreme =.' },
            { text: 'Interpret the result — the formula predicts that *distance* and *low fiscal yield* make distant conquests vulnerable to.' },
            { text: 'Verify with historical outcome — Europe: Golden Horde established as *tributary suzerainty* (indirect), not direct.' },
            { text: 'Generalise — Mongol imperialism was *fiscally rational*: they held what paid for itself and could be garrisoned within.', faded: true, blankAnswer: 'The European campaign withdrew because the Succession.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'The Decline of the Mongol Empire and Its Legacy', spots: [
            { id: 's1', label: 'The decline of the Mongol', prompt: 'Which idea is this? — The decline of the Mongol Empire refers to the political fragmentation and gradual.', answer: 'The decline of the Mongol', options: ['The decline of the Mongol', 'The Great Schism of 1054', 'The Crusades 10951291 were a', 'The Crisis of Feudalism c'] },
            { id: 's2', label: 'The Great Schism of 1054', prompt: 'Which idea is this? — The Great Schism of 1054 was the formal separation between the Roman Catholic Church.', answer: 'The Great Schism of 1054', options: ['The Great Schism of 1054', 'The decline of the Mongol', 'The Crusades 10951291 were a', 'The Crisis of Feudalism c'] },
            { id: 's3', label: 'The Crusades 10951291 were a', prompt: 'Which idea is this? — The Crusades (1095–1291) were a series of religiously sanctioned military campaigns.', answer: 'The Crusades 10951291 were a', options: ['The Crusades 10951291 were a', 'The decline of the Mongol', 'The Great Schism of 1054', 'The Crisis of Feudalism c'] },
            { id: 's4', label: 'The Crisis of Feudalism c', prompt: 'Which idea is this? — The Crisis of Feudalism (c. 1300–1450) refers to the systemic breakdown of the medieval.', answer: 'The Crisis of Feudalism c', options: ['The Crisis of Feudalism c', 'The decline of the Mongol', 'The Great Schism of 1054', 'The Crusades 10951291 were a'] },
            { id: 's5', label: 'The Mongol Empire under gedei', prompt: 'Which idea is this? — The Mongol Empire under Ögedei Khan (r. 1229–1241) represents the second phase of Mongol.', answer: 'The Mongol Empire under gedei', options: ['The Mongol Empire under gedei', 'The decline of the Mongol', 'The Great Schism of 1054', 'The Crusades 10951291 were a'] }
          ] } }
    ],
    explore: { component: C11_HistoryLongtermCausesAllianceSim, prompt: 'Explore the interactive — The Decline of the Mongol Empire and Its Legacy' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_011', difficulty: 'standard',
          question: 'The decline of the Mongol Empire refers to the political fragmentation and.',
          hint: 'Revisit the kurultai election process and Genghis Khan\'s division of the empire into ulus.',
          misconception: 'Students believe the Mongol Empire "fell" in a single event like the Roman Empire, rather than understanding it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The decline of the Mongol Empire refers to the political fragmentation and gradual',
                  options: ['The decline of the Mongol Empire refers to the political fragmentation and gradual', 'The Great Schism of 1054 was the formal separation between the Roman Catholic Church', 'The Crusades (1095–1291) were a series of religiously sanctioned military campaigns', 'The Crisis of Feudalism (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mongol Empire "fell" in a single event like the Roman Empire, rather than understanding it dissolved through a 40-year.' }
          ],
            remediations: { 'the-mongol-empire-fell-in': { steps: ['Create a timeline (1259–1368) with parallel columns for each khanate showing key rulers, succession disputes, and.', 'Use the map from c11_hist_cbse_05_001 to trace how ecological zones (steppe, desert, forest, agrarian) shaped each.', 'Re-read the Yasa provisions on succession (c11_hist_cbse_05_005) and identify exactly which clauses permitted multiple.', 'Compare with the Delhi Sultanate\'s succession crises (c6_history_ch07_026) to see similar patterns in Turko-Mongol.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_008', difficulty: 'standard',
          question: 'The Great Schism of 1054 was the formal separation between the Roman Catholic.',
          hint: 'If stuck, revisit the Council of Chalcedon (451) — specifically Canon 28 and Pope Leo\'s.',
          misconception: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Great Schism of 1054 was the formal separation between the Roman Catholic Church',
                  options: ['The Great Schism of 1054 was the formal separation between the Roman Catholic Church', 'The decline of the Mongol Empire refers to the political fragmentation and gradual', 'The Crusades (1095–1291) were a series of religiously sanctioned military campaigns', 'The Crisis of Feudalism (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.' }
          ],
            remediations: { 'the-1054-schism-was-a': { steps: ['Re-read the 1054 bull of excommunication — note it anathematizes Cerularius and his followers, not "all Greeks."', 'Map the geography of post-1054 communion: identify regions (Southern Italy, Sicily, Crusader states) where Latin and.', 'Compare the 1054 anathemas with the 1204 *Partitio terrarum imperii Romaniae* — the latter imposed Latin bishops on.', 'Write a 3-sentence explanation distinguishing "canonical rupture" (1054) from "communal schism" (post-1204).'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The 1054 Schism was primarily a diplomatic incident, not a theological rupture." Support your judgment with evidence.', answer: 'The claim is **partially valid but incomplete**',
                  options: ['The claim is **partially valid but incomplete**', 'just a quarrel between two men', 'inevitable theological split'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.' }
          ],
            remediations: { 'the-1054-schism-was-a': { steps: ['Re-read the 1054 bull of excommunication — note it anathematizes Cerularius and his followers, not "all Greeks."', 'Map the geography of post-1054 communion: identify regions (Southern Italy, Sicily, Crusader states) where Latin and.', 'Compare the 1054 anathemas with the 1204 *Partitio terrarum imperii Romaniae* — the latter imposed Latin bishops on.', 'Write a 3-sentence explanation distinguishing "canonical rupture" (1054) from "communal schism" (post-1204).'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_010', difficulty: 'standard',
          question: 'The Crusades (1095–1291) were a series of religiously sanctioned military.',
          hint: 'If stuck, review the Battle of Manzikert (1071) and the Great Schism (1054) using the.',
          misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a.',
          parts: [
                { id: 'a', prompt: 'In which year and at which council did Pope Urban II deliver the sermon that launched the First Crusade?', answer: '1095, Council of Clermont',
                  options: ['1095, Council of Clermont', 'Christendom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam." In.' },
                { id: 'b', prompt: 'Compare the outcomes of the Third Crusade (1189–1192) and the Fourth Crusade (1202–1204) in terms of their impact on Muslim unity and Byzantine survival.', answer: 'Third Crusade: Failed to retake Jerusalem but secured coastal access',
                  options: ['Third Crusade: Failed to retake Jerusalem but secured coastal access', 'failures to take Jerusalem', 'Christendom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam." In.' }
          ],
            remediations: { 'the-crusades-were-a-single': { steps: ['Provide a political map of the Levant c. 1140 showing Crusader states, Zengid, Artuqid, Fatimid, and Byzantine.', 'Have students trace the shifting alliances of Raymond of Poitiers (Antioch) using primary source excerpts from William.', 'Assign a comparative table: "Crusader-Muslim Alliances vs. Internal Conflicts (1100–1187)" to visualize that.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a.',
          parts: [
                { id: 'a', prompt: 'Compare the outcomes of the Third Crusade (1189–1192) and the Fourth Crusade (1202–1204) in terms of their impact on Muslim unity and Byzantine survival.', answer: 'Third Crusade: Failed to retake Jerusalem but secured coastal access',
                  options: ['Third Crusade: Failed to retake Jerusalem but secured coastal access', 'failures to take Jerusalem', 'Christendom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam." In.' }
          ],
            remediations: { 'the-crusades-were-a-single': { steps: ['Provide a political map of the Levant c. 1140 showing Crusader states, Zengid, Artuqid, Fatimid, and Byzantine.', 'Have students trace the shifting alliances of Raymond of Poitiers (Antioch) using primary source excerpts from William.', 'Assign a comparative table: "Crusader-Muslim Alliances vs. Internal Conflicts (1100–1187)" to visualize that.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_011', difficulty: 'standard',
          question: 'The Crisis of Feudalism (c. 1300–1450) refers to the systemic breakdown of the.',
          hint: 'Revisit the "Manor and Feudal Economy" node (c11_hist_cbse_06_005) — focus on the.',
          misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the.',
          parts: [
                { id: 'a', prompt: 'Why did the English Statute of Labourers (1351) and the French Ordinance of Labourers (1351) fail to freeze wages at pre-plague levels despite severe penalties?', answer: 'The statutes failed',
                  options: ['The statutes failed', 'peasant laziness', 'weak kings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle:.' },
                { id: 'b', prompt: 'A manor record from 1360 shows a villein paying 12 pence/acre commutation rent instead of performing week-work.', answer: 'Commutation shows lords converting labour dues to money rents',
                  options: ['Commutation shows lords converting labour dues to money rents', 'generosity', 'decline of feudalism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle:.' },
                { id: 'c', prompt: 'Compare the Jacquerie (France, 1358) and the English Peasants\' Revolt (1381) on three dimensions: (a) immediate trigger, (b) social composition, (c) outcome.', answer: 'immediate trigger, (',
                  options: ['immediate trigger, (', 'both failed', 'labour shortage gave peasants freedom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle:.' }
          ],
            remediations: { 'the-black-death-alone-ended': { steps: ['Re-read the manorial court roll excerpt (c11_hist_cbse_06_005) showing a 1360 commutation entry—identify who initiates.', 'Plot wage data (carpenter/thresher) 1340–1400 on graph paper; note the lag between plague and wage rise.', 'Compare the 1351 Statute of Labourers text with the 1381 rebel demands—circle every clause about "fleeing servants" and.', 'Write a 100-word answer: "Why did lords prefer commutation over enforcing week-work?" This builds the supply-demand →.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Black Death caused the end of feudalism." Use evidence from wage data, peasant mobility, and lordly counter-measures (1350–1400) to.', answer: 'The claim is partially true but oversimplified',
                  options: ['The claim is partially true but oversimplified', 'labour shortage gave peasants freedom', 'the Black Death *alone* ended serfdom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle:.' }
          ],
            remediations: { 'the-black-death-alone-ended': { steps: ['Re-read the manorial court roll excerpt (c11_hist_cbse_06_005) showing a 1360 commutation entry—identify who initiates.', 'Plot wage data (carpenter/thresher) 1340–1400 on graph paper; note the lag between plague and wage rise.', 'Compare the 1351 Statute of Labourers text with the 1381 rebel demands—circle every clause about "fleeing servants" and.', 'Write a 100-word answer: "Why did lords prefer commutation over enforcing week-work?" This builds the supply-demand →.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_007', difficulty: 'standard',
          question: 'The Mongol Empire under Ögedei Khan (r. 1229–1241) represents the second phase.',
          hint: 'Revisit Node 003 (Temujin to Genghis Khan) — specifically the 1206 kurultai and the 1224.',
          misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the.',
          parts: [
                { id: 'a', prompt: 'In what year was Ögedei Khan elected Great Khan at the kurultai, and which of Genghis Khan\'s sons was he?', answer: 'Ögedei was elected in 1229',
                  options: ['Ögedei was elected in 1229', 'retreated from Europe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the 1241–42 withdrawal.' }
          ],
            remediations: { 'the-mongols-retreated-from-europe': { steps: ['Re-read Node 004 (Mongol Army) — focus on the *tumen* and *keshig* as mobile logistics units that *did not require.', 'Re-read Node 005 (Yasa) — locate the clauses on *kurultai mandatory attendance* and *succession*.', 'Map the 1236–1242 campaign on a physical map of Eurasia — trace the Volga-Don-Dnieper-Vistula-Danube river corridors;.', 'Write a 100-word explanation of why "castle density" in Hungary (stone castles were rare in 1241) is ahistorical as a.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Mongol invasion of Europe (1236–1242) was a strategic diversion; the real objective was always China." Use evidence from Ögedei\'s.', answer: 'Refute',
                  options: ['Refute', 'main event', 'retreated from Europe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the 1241–42 withdrawal.' },
                { id: 'b', prompt: 'Construct a timeline showing the causal chain from Ögedei\'s election (1229) to the establishment of the Golden Horde (c.', answer: 'A strong answer identifies: (1) 1229',
                  options: ['A strong answer identifies: (1) 1229', 'retreated from Europe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the 1241–42 withdrawal.' }
          ],
            remediations: { 'the-mongols-retreated-from-europe': { steps: ['Re-read Node 004 (Mongol Army) — focus on the *tumen* and *keshig* as mobile logistics units that *did not require.', 'Re-read Node 005 (Yasa) — locate the clauses on *kurultai mandatory attendance* and *succession*.', 'Map the 1236–1242 campaign on a physical map of Eurasia — trace the Volga-Don-Dnieper-Vistula-Danube river corridors;.', 'Write a 100-word explanation of why "castle density" in Hungary (stone castles were rare in 1241) is ahistorical as a.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
