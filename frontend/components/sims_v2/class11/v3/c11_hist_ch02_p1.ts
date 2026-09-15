import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch02_p1: SimDef = {
    id: 'v3_c11_hist_ch02_p1',
    title: 'An Empire Across Three Continents · Part 1/2',
    subtitle: 'Read an empire as a lake with edges — and a republic wearing a crown.',
    classLevel: 11, subject: 'history', topic: 'An Empire Across Three Continents · Part 1/2',
    chapters: ['c11_hist_ch02'],
    nodeIds: ['c11_hist_cbse_02_001', 'c11_hist_cbse_02_002', 'c11_hist_cbse_02_003', 'c11_hist_cbse_02_004', 'c11_hist_cbse_02_005', 'c11_hist_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geographer tracing where Rome stopped and why', intro: 'A city-state in Italy ended up ruling Scotland to Syria — because it owned the sea between them.', goal: 'Explain Mediterranean integration, provincial cities, and the Augustan settlement\'s disguise.' },
    discovery: {
        question: 'Did Rome expand like an ink blot, seeping outward equally in every direction?',
        options: ['No — it followed resource corridors along the Mediterranean and stopped dead at the Rhine-Danube, the Euphrates and the Sahara', 'Yes — empires grow uniformly in all directions', 'Yes — legions marched wherever they pleased', 'No — it only expanded east toward India'],
        answer: 'No — it followed resource corridors along the Mediterranean and stopped dead at the Rhine-Danube, the Euphrates and the Sahara',
        hook: 'The sea was the empire\'s private highway — Spanish olive oil could undercut Italian producers 2,000 km away because \'Mare Nostrum\' made bulk trade coastal and cheap.',
    },
    teaching: [
        { title: 'The Roman Empire: Geography and the Three Continents', text: 'The Roman Empire (27 BCE – 476 CE in the west; 1453 CE in the east) was a transcontinental imperial state centered on the Mediterranean Sea, spanning Europe, North Africa, and West Asia.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compare Rome\'s self-governing civitates with the Maurya-appointed nagara, then test whether Augustus\'s Principate was a republic or a monarchy in disguise.',
        labels: ['The Roman Empire: Geography', 'The Mediterranean Sea', 'The Roman Republic', 'The Army and', 'The City of Rome', 'The Countryside: Villas, Latifundia'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_001', title: 'The Roman Empire: Geography and the Three Continents',
          caseStudy: { intro: 'Imagine you are standing at the Gateway of India in Mumbai, looking at the Arabian Sea — a historic highway connecting India to Rome.',
            decisions: [{ prompt: 'Name the three continents spanned by the Roman Empire at its peak and the two major rivers that formed its northern frontier.', options: [
                { text: 'The Roman Empire spanned Europe, Africa, and Asia', outcome: 'The Roman Empire spanned Europe, Africa, and Asia. Its northern frontier was formed by the Rhine.' },
                { text: 'in all directions equally', outcome: 'Not quite — Students often think the Roman Empire expanded "in all directions equally" like a spreading ink.', reveals: 'the-roman-empire-expanded-in' },
                { text: 'Rome conquered up to the Urals', outcome: 'Not quite — Students often think the Roman Empire expanded "in all directions equally" like a spreading ink.', reveals: 'the-roman-empire-expanded-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_002', title: 'The Mediterranean Sea and Roman Expansion',
          caseStudy: { intro: 'Imagine you are standing at Marina Beach in Chennai watching ships wait for the monsoon winds to change direction — Indian Ocean trade depended entirely.',
            decisions: [{ prompt: 'What name did the Romans give to the Mediterranean Sea once they established control over all its shores, and what does this Latin term.', options: [
                { text: 'The Romans called it *Mare Nostrum* ("Our Sea"), signifying their perception of the', outcome: 'The Romans called it *Mare Nostrum* ("Our Sea"), signifying their perception of the Mediterranean.' },
                { text: 'Mediterraneum', outcome: 'Not quite — Students conflate "Mediterranean trade" with "long-distance luxury trade" (silk, spices, pepper).', reveals: 'students-conflate-mediterranean-trade-with' },
                { text: 'Great Sea', outcome: 'Not quite — Students conflate "Mediterranean trade" with "long-distance luxury trade" (silk, spices, pepper).', reveals: 'students-conflate-mediterranean-trade-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_003', title: 'The Roman Republic to Empire: Augustus and the Principate',
          caseStudy: { intro: 'Imagine if India\'s Parliament voted to give the Prime Minister lifetime \'emergency powers\' while keeping all elections, the Cabinet, and the Supreme Court.',
            decisions: [{ prompt: 'What title did Octavian take in 27 BCE and what did it mean literally?', options: [
                { text: 'Octavian took the title Augustus (\'revered one\') and Princeps (\'first citizen\')', outcome: 'Octavian took the title Augustus (\'revered one\') and Princeps (\'first citizen\').' },
                { text: 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator', outcome: 'Not quite — Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator;.', reveals: 'augustus-became-emperor-in-27' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_004', title: 'The Army and the Administration of the Empire',
          caseStudy: { intro: 'Imagine you are visiting the ruins of a Roman city like Pompeii or the Pont du Gard aqueduct in France — massive structures built without modern machinery or.',
            decisions: [{ prompt: 'What was the minimum length of service required for a Roman soldier in the professional army of the early empire, and how did this differ.', options: [
                { text: 'The minimum service was 25 years in a paid professional army, unlike the Persian', outcome: 'The minimum service was 25 years in a paid professional army, unlike the Persian conscripted army.' },
                { text: '10 years', outcome: 'Not quite — Students often believe the Roman emperor ruled through a centralised bureaucracy like the Mughal.', reveals: 'the-roman-emperor-ruled-through' },
                { text: 'conscripted like Persia', outcome: 'Not quite — Students often believe the Roman emperor ruled through a centralised bureaucracy like the Mughal.', reveals: 'the-roman-emperor-ruled-through' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_005', title: 'The City of Rome: Urbanisation and Public Architecture',
          caseStudy: { intro: 'Imagine you are standing at the Qutub Minar complex in Delhi—layers of history built atop each other, each ruler adding a monument to legitimise power.',
            decisions: [{ prompt: 'Identify the three main types of monumental public architecture that defined Roman urban centres in the early imperial period and state one.', options: [
                { text: 'The three main types are: (1) Public baths (thermae)—served as social levellers where', outcome: 'The three main types are: (1) Public baths (thermae)—served as social levellers where citizens.' },
                { text: 'temples or private villas', outcome: 'Not quite — Students often think Roman cities grew naturally like modern metropolises due to trade and.', reveals: 'roman-cities-grew-naturally-like' },
                { text: 'Roman cities grew naturally like modern metropolises due to trade and migration', outcome: 'Not quite — Students often think Roman cities grew naturally like modern metropolises due to trade and.', reveals: 'roman-cities-grew-naturally-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_006', title: 'The Countryside: Villas, Latifundia and Agricultural Slavery',
          caseStudy: { intro: 'Imagine you are standing at the site of a Roman villa in modern-day Rajasthan\'s Aravalli hills — though no Roman villa exists there, picture a large fortified.',
            decisions: [{ prompt: 'What was the primary container used for transporting Spanish olive oil during the peak years 140-160 CE, and what does its widespread.', options: [
                { text: 'The primary container was the *Dressel 20* amphora, a globular vessel with thick handles', outcome: 'The primary container was the *Dressel 20* amphora, a globular vessel with thick handles stamped.' },
                { text: 'Dressel 1', outcome: 'Not quite — Students believe Roman *latifundia* were worked *exclusively* by chained slave gangs throughout the.', reveals: 'roman-latifundia-were-worked-exclusively' },
                { text: 'barrels', outcome: 'Not quite — Students believe Roman *latifundia* were worked *exclusively* by chained slave gangs throughout the.', reveals: 'roman-latifundia-were-worked-exclusively' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In an empire-mapping exercise, a student shades Rome\'s expansion as \'spreading equally in all directions like an ink blot\' and describes Mediterranean trade as \'galleys running luxury cargo — silk and spices — straight from Italy to India.\'',
            decisions: [{ prompt: 'How should the empire\'s geography and trade really be pictured?', options: [
                { text: 'Redraw along corridors and hard stops: the Mediterranean was Rome\'s \'private lake\' — control of the sea meant control of the empire; expansion followed resource corridors and halted at non-navigable barriers — the Rhine-Danube line, the Sahara, the Euphrates facing Parthia. And the sea trade was bulk cabotage — grain, oil, wine moving coast to coast; Indian Ocean luxury goods were a separate circuit meeting it only at Red Sea ports.', outcome: 'The map gets accurate: a maritime empire bounded by ecology and rivals, running on bulk goods — not an ink blot and not a silk road on water.' },
                { text: 'Keep the ink-blot model — empires expand until they naturally stop.', outcome: 'The stops were specific and structural: desert, ocean and a rival empire marked real limits — expansion was never directionless.', reveals: 'empire-expands-equally' },
                { text: 'Keep the luxury-trade image — Rome\'s wealth famously came from Eastern luxuries.', outcome: 'The Mediterranean system\'s engine was high-volume staples; pepper and silk moved on a peripheral Indian Ocean circuit through intermediaries — a different network entirely.', reveals: 'mediterranean-was-luxury-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Trajan watched a merchant ship leave for India with longing — the Mediterranean was a closed lake Rome owned; the Indian Ocean was a market it could only envy.',
            decisions: [{ prompt: 'What comes next? An Empire Across Three Continents · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — An Empire Across Three Continents · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_001', difficulty: 'standard',
          question: 'The Roman Empire (27 BCE – 476 CE in the west; 1453 CE in the east) was.',
          hint: 'Revisit Class 7 "Gangetic Plains and Growth of Mahajanapadas" (c7_hist_ch01_004) — the.',
          misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.',
          parts: [
                { id: 'a', prompt: 'Name the three continents spanned by the Roman Empire at its peak and the two major rivers that formed its northern frontier.', answer: 'The Roman Empire spanned Europe, Africa, and Asia',
                  options: ['The Roman Empire spanned Europe, Africa, and Asia', 'in all directions equally', 'Rome conquered up to the Urals', 'the Atlantic Ocean or the Nile as frontiers'],
                  hint: 'Revisit Class 7 "Gangetic Plains and Growth of Mahajanapadas" (c7_hist_ch01_004) — the logic.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' },
                { id: 'b', prompt: 'Analyze why the Roman Empire stopped expanding after the early 2nd century CE despite having a professional army of 600,000.', answer: 'The Rhine-Danube line marked the ecological limit of Mediterranean agriculture',
                  options: ['The Rhine-Danube line marked the ecological limit of Mediterranean agriculture', 'the army got weak', 'in all directions equally', 'Rome conquered up to the Urals'],
                  hint: 'Revisit Class 7 "Gangetic Plains and Growth of Mahajanapadas" (c7_hist_ch01_004) — the logic.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' }
          ],
            remediations: { 'the-roman-empire-expanded-in': { steps: ['39 (Map 1: Europe and North Africa).', 'Trace the Mediterranean coastline with your finger — note every major city (Carthage, Alexandria, Antioch, Rome) is.', 'Draw the 200mm rainfall isohyet mentally — that\'s the olive/wine line.', 'The empire stops *exactly* where it ends.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Principate (27 BCE – 284 CE) was a monarchy disguised as a republic." Support your judgment with two pieces of institutional evidence.', answer: 'The claim is *largely accurate but incomplete*',
                  options: ['The claim is *largely accurate but incomplete*', 'in all directions equally', 'Rome conquered up to the Urals', 'the Roman Empire expanded "in all directions equally" like a spreading ink blot'],
                  hint: 'Revisit Class 7 "Gangetic Plains and Growth of Mahajanapadas" (c7_hist_ch01_004) — the logic.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' }
          ],
            remediations: { 'the-roman-empire-expanded-in': { steps: ['39 (Map 1: Europe and North Africa).', 'Trace the Mediterranean coastline with your finger — note every major city (Carthage, Alexandria, Antioch, Rome) is.', 'Draw the 200mm rainfall isohyet mentally — that\'s the olive/wine line.', 'The empire stops *exactly* where it ends.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_002', difficulty: 'standard',
          question: 'The Mediterranean Sea served as the central geographical and economic artery.',
          hint: 'Revisit Class 10 "Pre-Modern World" (c10_hist_cbse_03_001) section on "cost of transport".',
          misconception: 'Students conflate "Mediterranean trade" with "long-distance luxury trade" (silk, spices, pepper) and assume Roman ships.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mediterranean Sea served as the central geographical and economic artery of the Roman',
                  options: ['The Mediterranean Sea served as the central geographical and economic artery of the Roman', 'The Roman Empire (27 BCE – 476 CE in the west', 'The Principate (27 BCE – 284 CE) was the political system established by Augustus', 'The Roman army was a professional, paid standing force requiring 25 years of service,'],
                  hint: 'Revisit Class 10 "Pre-Modern World" (c10_hist_cbse_03_001) section on "cost of transport" and Class.',
                  misconception: 'Students conflate "Mediterranean trade" with "long-distance luxury trade" (silk, spices, pepper) and assume Roman ships sailed directly.' }
          ],
            remediations: { 'students-conflate-mediterranean-trade-with': { steps: ['**Map exercise**: Plot 20 major Roman ports from the NCERT map (p.', '39) and measure inter-port distances — all under 200 km.', '**Amphorae typology**: Match Dressel 1 (Italian wine), Dressel 20 (Spanish oil), African 1A/2A (Tunisian oil).', '**Wind rose comparison**: Draw Mediterranean etesian wind rose vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_003', difficulty: 'standard',
          question: 'The Principate (27 BCE – 284 CE) was the political system established.',
          hint: 'Review the fall of the Roman Republic: Caesar\'s dictatorship (44 BCE), the Second.',
          misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully.',
          parts: [
                { id: 'a', prompt: 'What title did Octavian take in 27 BCE and what did it mean literally?', answer: 'Octavian took the title Augustus (\'revered one\') and Princeps (\'first citizen\')',
                  options: ['Octavian took the title Augustus (\'revered one\') and Princeps (\'first citizen\')', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Review the fall of the Roman Republic: Caesar\'s dictatorship (44 BCE), the Second Triumvirate.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles.' },
                { id: 'b', prompt: 'Why did Augustus pretend to \'restore the Republic\' instead of declaring himself king or dictator?', answer: 'Romans had a deep cultural hatred for \'rex\' (king)',
                  options: ['Romans had a deep cultural hatred for \'rex\' (king)', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Review the fall of the Roman Republic: Caesar\'s dictatorship (44 BCE), the Second Triumvirate.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles.' },
                { id: 'c', prompt: 'If you were a Roman senator in 27 BCE, would you support Augustus? Use two pieces of evidence from the NCERT text to justify your position.', answer: 'Yes, most senators did support him',
                  options: ['Yes, most senators did support him', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Review the fall of the Roman Republic: Caesar\'s dictatorship (44 BCE), the Second Triumvirate.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles.' }
          ],
            remediations: { 'augustus-became-emperor-in-27': { steps: ['Have students create a two-column table: Column A = Republican institutions Augustus kept (consuls, Senate, elections.', 'Then ask: "If Column A still existed, why was the Republic dead?" This reveals the distinction between form and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_004', difficulty: 'standard',
          question: 'The Roman army was a professional, paid standing force requiring 25 years.',
          hint: 'Revisit c11_hist_cbse_02_003: focus on the distinction between *auctoritas* (Senate\'s.',
          misconception: 'Students often believe the Roman emperor ruled through a centralised bureaucracy like the Mughal *mansabdari* system.',
          parts: [
                { id: 'a', prompt: 'What was the minimum length of service required for a Roman soldier in the professional army of the early empire, and how did this differ from the Persian army.', answer: 'The minimum service was 25 years in a paid professional army, unlike the Persian',
                  options: ['The minimum service was 25 years in a paid professional army, unlike the Persian', '10 years', 'conscripted like Persia'],
                  hint: 'Revisit c11_hist_cbse_02_003: focus on the distinction between *auctoritas* (Senate\'s moral.',
                  misconception: 'Students often believe the Roman emperor ruled through a centralised bureaucracy like the Mughal *mansabdari* system or the British ICS.' },
                { id: 'b', prompt: 'Why did the Roman Senate fear and hate the army, especially during the third-century crisis?', answer: 'The Senate, representing the landed aristocracy, feared the army',
                  options: ['The Senate, representing the landed aristocracy, feared the army', 'the army threatened Senate\'s legislative powers'],
                  hint: 'Revisit c11_hist_cbse_02_003: focus on the distinction between *auctoritas* (Senate\'s moral.',
                  misconception: 'Students often believe the Roman emperor ruled through a centralised bureaucracy like the Mughal *mansabdari* system or the British ICS.' }
          ],
            remediations: { 'the-roman-emperor-ruled-through': { steps: ['If the student confuses Roman administration with a modern bureaucracy: (1) Re-read the Galen passage on city vs.', 'countryside grain collection (p.', '43) — note who "collects and stores" grain: city-dwellers, not state granaries.', '(2) Compare with Mauryan *samaharta* (collector-general) in c7_hist_ch02_008 — a salaried central officer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_005', difficulty: 'standard',
          question: 'The City of Rome: Urbanisation and Public Architecture refers to the.',
          hint: 'Revisit c11_hist_cbse_02_003: focus on "Principate," "Senate," "provincial.',
          misconception: 'Students often think Roman cities grew naturally like modern metropolises due to trade and migration.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The City of Rome: Urbanisation and Public Architecture refers to the transformation of',
                  options: ['The City of Rome: Urbanisation and Public Architecture refers to the transformation of', 'The Roman Empire (27 BCE – 476 CE in the west', 'The Mediterranean Sea served as the central geographical and economic artery of the Roman', 'The Principate (27 BCE – 284 CE) was the political system established by Augustus'],
                  hint: 'Revisit c11_hist_cbse_02_003: focus on "Principate," "Senate," "provincial administration," and.',
                  misconception: 'Students often think Roman cities grew naturally like modern metropolises due to trade and migration.' }
          ],
            remediations: { 'roman-cities-grew-naturally-like': { steps: ['If the student conflates organic and planned urbanisation: (1) Have them compare the legal definition of a Roman city.', '(2) Use the Galen famine passage: ask why cities "collected and stored enough grain for the whole next year" while.', '(3) Map exercise: plot Carthage, Alexandria, Antioch on a Mediterranean map; note they were refounded/reorganised.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_006', difficulty: 'standard',
          question: 'The Roman countryside was organised around large landed estates called.',
          hint: 'Revisit c11_hist_cbse_02_005 (Urbanisation) and ask: "If Rome imported 400,000 tons.',
          misconception: 'Students believe Roman *latifundia* were worked *exclusively* by chained slave gangs throughout the empire\'s history.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Roman countryside was organised around large landed estates called *latifundia* and',
                  options: ['The Roman countryside was organised around large landed estates called *latifundia* and', 'The Roman Empire (27 BCE – 476 CE in the west', 'The Mediterranean Sea served as the central geographical and economic artery of the Roman', 'The Principate (27 BCE – 284 CE) was the political system established by Augustus'],
                  hint: 'Revisit c11_hist_cbse_02_005 (Urbanisation) and ask: "If Rome imported 400,000 tons of grain/year.',
                  misconception: 'Students believe Roman *latifundia* were worked *exclusively* by chained slave gangs throughout the empire\'s history, ignoring the.' }
          ],
            remediations: { 'roman-latifundia-were-worked-exclusively': { steps: ['Re-read the "Controlling Workers" section (textbook pp. 48-49) and list *four* distinct labour types: slave gangs, wage.', 'Create a timeline: 1st century BCE (slave gangs dominant in Italy) → 1st-2nd century CE (mixed labour, *coloni* rise) →.', 'Compare with Mughal India (c6_history_ch09_038): *ryots* were not slaves but owed revenue; similarly, Roman *coloni*.', 'Write one paragraph explaining why "slave-only" is wrong using the Columella quote on slave cost vs. hired workers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
