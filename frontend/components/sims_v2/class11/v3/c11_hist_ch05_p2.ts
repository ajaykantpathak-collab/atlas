import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch05_p2: SimDef = {
    id: 'v3_c11_hist_ch05_p2',
    title: 'Nomadic Empires · Part 2/2',
    subtitle: 'Meet the nomads who ran empires on a calendar of grass.',
    classLevel: 11, subject: 'history', topic: 'Nomadic Empires · Part 2/2',
    chapters: ['c11_hist_ch05'],
    nodeIds: ['c11_hist_cbse_05_007', 'c11_hist_cbse_05_008', 'c11_hist_cbse_05_009', 'c11_hist_cbse_05_010', 'c11_hist_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a steppe household planning the year\'s pastures', intro: 'Minus forty winters, no rivers, no trees — and from this the largest contiguous empire ever built. The ecology is the key.', goal: 'Explain pastoral nomadism as a mapped system and its structural dependence on settled trade.' },
    discovery: {
        question: '\'Nomad\' means wandering aimlessly across empty grassland — that\'s what made the Mongols mobile, right?',
        options: ['No — migration followed precise multi-generational maps of named pastures and water points, timed to the greening of specific grasses', 'Yes — nomads moved randomly with the weather', 'Yes — that\'s why they needed no maps', 'No — nomads never actually moved at all'],
        answer: 'No — migration followed precise multi-generational maps of named pastures and water points, timed to the greening of specific grasses',
        hook: 'And the steppe was never self-sufficient — it structurally lacked grain, metal and craft, which is why pre-Genghis graves already hold Chinese silk and Persian ceramics.',
    },
    teaching: [
        { title: 'The Mongol Empire Under Ogedei and the Push into Europe', text: 'The Mongol Empire under Ögedei Khan (r. 1229–1241) represents the second phase of Mongol imperial expansion, characterised by the consolidation of Genghis Khan\'s conquests and the westward push into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Balance a herd of \'five snouts\' for risk, then test whether the steppe economy was inherently raiding-driven or trade-connected all along.',
        labels: ['The Mongol Empire Under', 'The Pax Mongolica', 'The Yuan Dynasty: Mongol', 'The Il-Khanate, Golden Horde', 'The Decline of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_007', title: 'The Mongol Empire Under Ogedei and the Push into Europe',
          caseStudy: { intro: 'Imagine you are standing at the gates of Delhi\'s Purana Qila, built by Humayun but on a site that witnessed centuries of invasions from the northwest.',
            decisions: [{ prompt: 'In what year was Ögedei Khan elected Great Khan at the kurultai, and which of Genghis Khan\'s sons was he?', options: [
                { text: 'Ögedei was elected in 1229', outcome: 'Ögedei was elected in 1229; he was Genghis Khan\'s third son (after Jochi and Chagatai).' },
                { text: 'retreated from Europe', outcome: 'Not quite — Students often believe the Mongols "retreated from Europe because of bad weather or European.', reveals: 'the-mongols-retreated-from-europe' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_008', title: 'The Pax Mongolica: The Mongol Peace and the Silk Routes',
          caseStudy: { intro: 'Imagine you are a merchant from Gujarat in 1300 CE wanting to sell cotton textiles in Khanbaliq (Beijing).',
            decisions: [{ prompt: 'Name the Mongol institution that functioned as a combined postal-relay-intelligence network across the empire, and state its primary.', options: [
                { text: 'The **yam (örtege)** system – a network of relay stations spaced 20–30 km apart providing', outcome: 'The **yam (örtege)** system – a network of relay stations spaced 20–30 km apart providing fresh.' },
                { text: 'the Yasa', outcome: 'Not quite — Students think **Pax Mongolica = "Mongols made trade safe everywhere permanently."** They miss.', reveals: 'pax-mongolica-mongols-made-trade' },
                { text: 'the decimal army', outcome: 'Not quite — Students think **Pax Mongolica = "Mongols made trade safe everywhere permanently."** They miss.', reveals: 'pax-mongolica-mongols-made-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_009', title: 'The Yuan Dynasty: Mongol Rule in China Under Kublai Khan',
          caseStudy: { intro: 'Imagine you\'re standing at the Forbidden City in Beijing — the palace complex built by the Ming, but whose layout and location were first established by Kublai.',
            decisions: [{ prompt: 'In what year did Kublai Khan formally proclaim the Yuan Dynasty, and what Chinese-era name did he adopt to legitimise his rule?', options: [
                { text: 'Kublai Khan proclaimed the Yuan Dynasty in 1271 and adopted the era name "Zhiyuan" (至元)', outcome: 'Kublai Khan proclaimed the Yuan Dynasty in 1271 and adopted the era name "Zhiyuan" (至元).' },
                { text: 'just the Mongols ruling China exactly as they did the steppes', outcome: 'Not quite — Students often think the Yuan Dynasty was "just the Mongols ruling China exactly as they did the.', reveals: 'the-yuan-dynasty-was-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_010', title: 'The Il-Khanate, Golden Horde and Chagatai Khanate: Successor States',
          caseStudy: { intro: 'Imagine you are standing at the Qutb Minar complex in Delhi and notice the Iron Pillar — it predates the Mongols, but the architectural style of the Alai.',
            decisions: [{ prompt: 'Name the founder of the Il-Khanate, the year he captured Baghdad, and the caliphate he ended.', options: [
                { text: 'Hulagu Khan, 1258, Abbasid Caliphate', outcome: 'Hulagu Khan, 1258, Abbasid Caliphate. A wrong answer (e.g., naming Batu or Chagatai, or giving.' },
                { text: 'Batu or Chagatai, or giving 1260/1241', outcome: 'Not quite — Students conflate the three khanates as "Mongol states that became Muslim" and assume a uniform.', reveals: 'students-conflate-the-three-khanates' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_011', title: 'The Decline of the Mongol Empire and Its Legacy',
          caseStudy: { intro: 'Imagine you\'re standing at the Qutub Minar complex in Delhi, looking at the Iron Pillar that has resisted rust for 1600 years.',
            decisions: [{ prompt: 'What was the immediate trigger for the Mongol Empire\'s division into competing khanates after 1259?', options: [
                { text: 'The death of Möngke Khan in 1259 without a designated successor triggered a civil war', outcome: 'The death of Möngke Khan in 1259 without a designated successor triggered a civil war (1260–1264).' },
                { text: 'the Black Death', outcome: 'Not quite — Students believe the Mongol Empire "fell" in a single event like the Roman Empire, rather than.', reveals: 'the-mongol-empire-fell-in' },
                { text: 'Ming rebellion', outcome: 'Not quite — Students believe the Mongol Empire "fell" in a single event like the Roman Empire, rather than.', reveals: 'the-mongol-empire-fell-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'Nomadic peoples built mobile civilizations across the steppe — and their raiding destroyed settled communities. History remembers them as both empire-builders and destroyers.',
            decisions: [{ prompt: 'How should we judge peoples whose survival depended on others\' loss?', options: [
                { text: 'Judge by their time — survival had different rules', outcome: 'The historical-context answer; honest about the era, but it risks excusing what the people being raided experienced as pure catastrophe.' },
                { text: 'Judge by the harm — context doesn\'t erase victims', outcome: 'The victim-centred answer; but applied alone it flattens history into a ledger of blame.' },
                { text: 'Hold both — understand without absolving', outcome: 'The historian\'s actual craft — explain why it happened AND name what it cost; the two jobs don\'t cancel.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A documentary script calls the pre-imperial Mongols \'aimless wanderers drifting across empty grassland — an egalitarian society of equals with no hierarchy, since they had no cities or kings.\'',
            decisions: [{ prompt: 'What does steppe life actually look like?', options: [
                { text: 'Rewrite both claims: nomadism was a precise system — multi-generational maps of named pastures, water points and timed migration routes, managing common grazing across thousands of households without a bureaucracy. And it was hierarchical: hereditary nobility (noyat), commoners (qara), slaves (bo\'ol) — but personal and contingent through loyalty bonds, not institutional like caste — exactly the rivalries Genghis Khan exploited.', outcome: 'The script gains the real story: ecological constraint produced a portable, kin-based, militarised society — organisation without cities, hierarchy without a state.' },
                { text: 'Keep \'aimless wanderers\' — nomad by definition means no fixed pattern.', outcome: 'Nomadic means patterned mobility, not randomness: seasonal transhumance followed pasture phenology — the steppe required precision, not drift.', reveals: 'nomad-means-aimless' },
                { text: 'Keep \'egalitarian\' — no cities or written law means no classes.', outcome: 'Absence of a state isn\'t absence of hierarchy: steep hereditary nobility, commoners and slaves existed — the ties were personal and shiftable, not flat.', reveals: 'nomads-were-egalitarian' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'The largest land empire in history grew out of an ecology that couldn\'t feed itself — the mobility was a system, not a wandering.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_007', difficulty: 'standard',
          question: 'The Mongol Empire under Ögedei Khan (r. 1229–1241) represents the second phase.',
          hint: 'Revisit Node 003 (Temujin to Genghis Khan) — specifically the 1206 kurultai and the 1224.',
          misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the.',
          parts: [
                { id: 'a', prompt: 'In what year was Ögedei Khan elected Great Khan at the kurultai, and which of Genghis Khan\'s sons was he?', answer: 'Ögedei was elected in 1229',
                  options: ['Ögedei was elected in 1229', 'retreated from Europe'],
                  hint: 'Revisit Node 003 (Temujin to Genghis Khan) — specifically the 1206 kurultai and the 1224 *ulus*.',
                  misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the 1241–42 withdrawal.' }
          ],
            remediations: { 'the-mongols-retreated-from-europe': { steps: ['Re-read Node 004 (Mongol Army) — focus on the *tumen* and *keshig* as mobile logistics units that *did not require.', 'Re-read Node 005 (Yasa) — locate the clauses on *kurultai mandatory attendance* and *succession*.', 'Map the 1236–1242 campaign on a physical map of Eurasia — trace the Volga-Don-Dnieper-Vistula-Danube river corridors.', 'Write a 100-word explanation of why "castle density" in Hungary (stone castles were rare in 1241) is ahistorical as.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Mongol invasion of Europe (1236–1242) was a strategic diversion; the real objective was always China." Use evidence from Ögedei\'s.', answer: 'Refute',
                  options: ['Refute', 'main event', 'retreated from Europe'],
                  hint: 'Revisit Node 003 (Temujin to Genghis Khan) — specifically the 1206 kurultai and the 1224 *ulus*.',
                  misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the 1241–42 withdrawal.' },
                { id: 'b', prompt: 'Construct a timeline showing the causal chain from Ögedei\'s election (1229) to the establishment of the Golden Horde (c.', answer: 'A strong answer identifies: (1) 1229',
                  options: ['A strong answer identifies: (1) 1229', 'retreated from Europe'],
                  hint: 'Revisit Node 003 (Temujin to Genghis Khan) — specifically the 1206 kurultai and the 1224 *ulus*.',
                  misconception: 'Students often believe the Mongols "retreated from Europe because of bad weather or European castles," confusing the 1241–42 withdrawal.' }
          ],
            remediations: { 'the-mongols-retreated-from-europe': { steps: ['Re-read Node 004 (Mongol Army) — focus on the *tumen* and *keshig* as mobile logistics units that *did not require.', 'Re-read Node 005 (Yasa) — locate the clauses on *kurultai mandatory attendance* and *succession*.', 'Map the 1236–1242 campaign on a physical map of Eurasia — trace the Volga-Don-Dnieper-Vistula-Danube river corridors.', 'Write a 100-word explanation of why "castle density" in Hungary (stone castles were rare in 1241) is ahistorical as.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_008', difficulty: 'standard',
          question: 'The Pax Mongolica (c. 1250–1350) refers to the period of relative peace.',
          hint: 'Revisit c11_hist_cbse_05_004 (yam system mechanics) and c11_hist_cbse_05_005 (Yasa.',
          misconception: 'Students think **Pax Mongolica = "Mongols made trade safe everywhere permanently."** They miss that: (1) safety applied.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Pax Mongolica (c',
                  options: ['The Pax Mongolica (c', 'The Mongol Steppe refers to the vast temperate grassland belt stretching across Central', 'Mongol society in the 12th–13th centuries was organised around patrilineal kinship groups', 'The process by which Temujin (c'],
                  hint: 'Revisit c11_hist_cbse_05_004 (yam system mechanics) and c11_hist_cbse_05_005 (Yasa merchant.',
                  misconception: 'Students think **Pax Mongolica = "Mongols made trade safe everywhere permanently."** They miss that: (1) safety applied **only to those.' }
          ],
            remediations: { 'pax-mongolica-mongols-made-trade': { steps: ['**Map exercise:** Plot the yam stations on a blank Eurasian map (use NCERT Atlas Map 5.3) – see the gaps in Central.', '**Source comparison:** Read Marco Polo (merchant with paiza) vs.', 'Ibn Battuta (traveller without consistent protection) – note where Ibn Battuta faces danger.', '**Timeline overlay:** Mark 1250–1350 (Pax Mongolica), 1346 (Black Death), 1368 (Yuan fall), 1370 (Timur\'s rise).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_009', difficulty: 'standard',
          question: 'The Yuan Dynasty (1271–1368) was the Mongol imperial dynasty established.',
          hint: 'Review the Toluid Civil War (1260–1264) in node c11_hist_cbse_05_003 — it explains why.',
          misconception: 'Students often think the Yuan Dynasty was "just the Mongols ruling China exactly as they did the steppes" — i.e., pure.',
          parts: [
                { id: 'a', prompt: 'Compare the Yuan use of paper currency (chao) with the Song Dynasty\'s earlier monetary experiments.', answer: 'The Song backed paper money with copper cash reserves and limited issuance',
                  options: ['The Song backed paper money with copper cash reserves and limited issuance', 'Mongol ignorance of economics', 'just the Mongols ruling China exactly as they did the steppes'],
                  hint: 'Review the Toluid Civil War (1260–1264) in node c11_hist_cbse_05_003 — it explains why Kublai.',
                  misconception: 'Students often think the Yuan Dynasty was "just the Mongols ruling China exactly as they did the steppes" — i.e., pure extraction with.' }
          ],
            remediations: { 'the-yuan-dynasty-was-just': { steps: ['Re-read the "Four-Class System" section in NCERT Theme 5 and create a table comparing legal privileges, tax burdens.', 'Map the Grand Canal route and mark Dadu, Kaifeng, Hangzhou — trace how grain moved north and why control of this artery.', 'Compare a Yuan chao banknote image (from museum collections online) with a Song jiaozi — note the absence.', 'Write a 150-word paragraph explaining why \'Phags-pa\'s title "Imperial Preceptor" was a political office, not just.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_010', difficulty: 'standard',
          question: 'The Il-Khanate (1256–1335), Golden Horde (1240s–1502), and Chagatai Khanate.',
          hint: 'Revisit c11_hist_cbse_05_003 (Temujin to Genghis Khan) section on "Appanage Distribution".',
          misconception: 'Students conflate the three khanates as "Mongol states that became Muslim" and assume a uniform trajectory: conquest →.',
          parts: [
                { id: 'a', prompt: 'Name the founder of the Il-Khanate, the year he captured Baghdad, and the caliphate he ended.', answer: 'Hulagu Khan, 1258, Abbasid Caliphate',
                  options: ['Hulagu Khan, 1258, Abbasid Caliphate', 'Batu or Chagatai, or giving 1260/1241'],
                  hint: 'Revisit c11_hist_cbse_05_003 (Temujin to Genghis Khan) section on "Appanage Distribution" and.',
                  misconception: 'Students conflate the three khanates as "Mongol states that became Muslim" and assume a uniform trajectory: conquest → conversion →.' }
          ],
            remediations: { 'students-conflate-the-three-khanates': { steps: ['Draw a three-column table (Il-Khanate, Golden Horde, Chagatai) with rows: Founder/Date, Core Geography, Subject.', 'Populate using NCERT Theme 5 (Nomadic Empires) sections on each khanate.', 'For each column, ask "Would a Persian bureaucrat, a Russian prince, or a Transoxianan merchant recognise this state.', 'Rewrite one comparative paragraph using the table, explicitly contrasting *revenue base* (tax farming vs. tribute vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_011', difficulty: 'standard',
          question: 'The decline of the Mongol Empire refers to the political fragmentation and.',
          hint: 'Revisit the kurultai election process and Genghis Khan\'s division of the empire into ulus.',
          misconception: 'Students believe the Mongol Empire "fell" in a single event like the Roman Empire, rather than understanding.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The decline of the Mongol Empire refers to the political fragmentation and gradual',
                  options: ['The decline of the Mongol Empire refers to the political fragmentation and gradual', 'The Mongol Steppe refers to the vast temperate grassland belt stretching across Central', 'Mongol society in the 12th–13th centuries was organised around patrilineal kinship groups', 'The process by which Temujin (c'],
                  hint: 'Revisit the kurultai election process and Genghis Khan\'s division of the empire into ulus for his.',
                  misconception: 'Students believe the Mongol Empire "fell" in a single event like the Roman Empire, rather than understanding it dissolved through a 40-year.' }
          ],
            remediations: { 'the-mongol-empire-fell-in': { steps: ['Create a timeline (1259–1368) with parallel columns for each khanate showing key rulers, succession disputes, and.', 'Use the map from c11_hist_cbse_05_001 to trace how ecological zones (steppe, desert, forest, agrarian) shaped each.', 'Re-read the Yasa provisions on succession (c11_hist_cbse_05_005) and identify exactly which clauses permitted multiple.', 'Compare with the Delhi Sultanate\'s succession crises (c6_history_ch07_026) to see similar patterns in Turko-Mongol.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
