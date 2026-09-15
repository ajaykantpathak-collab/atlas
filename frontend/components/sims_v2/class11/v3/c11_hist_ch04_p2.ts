import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch04_p2: SimDef = {
    id: 'v3_c11_hist_ch04_p2',
    title: 'The Central Islamic Lands · Part 2/2',
    subtitle: 'Find the trade junction hiding inside a desert sanctuary.',
    classLevel: 11, subject: 'history', topic: 'The Central Islamic Lands · Part 2/2',
    chapters: ['c11_hist_ch04'],
    nodeIds: ['c11_hist_cbse_04_007', 'c11_hist_cbse_04_008', 'c11_hist_cbse_04_009', 'c11_hist_cbse_04_010', 'c11_hist_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Quraysh merchant pricing sanctuary and water rights', intro: 'At Ajmer\'s Urs, pilgrimage and market blend — now strip away the Islam and you have seventh-century Mecca\'s whole business model.', goal: 'Explain Mecca\'s commercial-religious leverage and the tribal structure of pre-Islamic Arabia.' },
    discovery: {
        question: 'Pre-Islamic Arabia: an isolated backwater waiting for history to begin?',
        options: ['No — Mecca sat on the incense-spice routes linking the Indian Ocean to the Mediterranean, and its sanctuary made a truce zone for trade', 'Yes — deserts can\'t support trade', 'Yes — only the Prophet\'s arrival connected it', 'No — because Arabia was never a desert'],
        answer: 'No — Mecca sat on the incense-spice routes linking the Indian Ocean to the Mediterranean, and its sanctuary made a truce zone for trade',
        hook: 'The haram solved an economic problem religiously — a sanctuary where feuding tribes could safely do business, with Quraysh collecting the toll.',
    },
    teaching: [
        { title: 'The Abbasid Caliphate: Baghdad and the Golden Age', text: 'The Abbasid Caliphate (750–1258 CE) was the third Islamic caliphate, founded by descendants of the Prophet\'s uncle Abbas ibn Abd al-Muttalib, which overthrew the Umayyads and established its capital.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace a frankincense caravan from Yemen to Gaza through Mecca\'s oases, then judge whether the mala\' made Mecca a merchant republic.',
        labels: ['The Abbasid Caliphate: Baghdad', 'The Shia-Sunni Split: Origins', 'Islamic Contributions to Science,', 'The Crusades: Christian-Muslim Encounters', 'The Decline of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_007', title: 'The Abbasid Caliphate: Baghdad and the Golden Age',
          caseStudy: { intro: 'Imagine you are standing before the Qutb Minar complex in Delhi, built by Turkic rulers who claimed legitimacy from the Abbasid caliph in Baghdad.',
            decisions: [{ prompt: 'In what year was Baghdad officially founded as the Abbasid capital, and by which caliph?', options: [
                { text: 'Baghdad was founded in 762 CE by Caliph al-Mansur (r', outcome: 'Baghdad was founded in 762 CE by Caliph al-Mansur (r. 754–775).' },
                { text: 'Golden Age', outcome: 'Not quite — Students often believe the "Golden Age" was a single continuous period of peace and prosperity.', reveals: 'the-golden-age-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_008', title: 'The Shia-Sunni Split: Origins and Theological Differences',
          caseStudy: { intro: 'Imagine you\'re visiting the Jama Masjid in Delhi or the Hazratbal Shrine in Srinagar — both are Islamic places of worship, yet they follow different traditions.',
            decisions: [{ prompt: 'What was the immediate trigger for the Shia-Sunni division in 632 CE, and who were the two main claimants to leadership?', options: [
                { text: 'The trigger was Prophet Muhammad\'s death in 632 CE without a male heir or explicit', outcome: 'The trigger was Prophet Muhammad\'s death in 632 CE without a male heir or explicit successor.' },
                { text: 'the split happened at Karbala', outcome: 'Not quite — Students believe the Shia-Sunni split is *primarily about religious rituals* (prayer posture.', reveals: 'the-shia-sunni-split-is' },
                { text: 'it was about Quran interpretation', outcome: 'Not quite — Students believe the Shia-Sunni split is *primarily about religious rituals* (prayer posture.', reveals: 'the-shia-sunni-split-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_009', title: 'Islamic Contributions to Science, Philosophy and Translation',
          caseStudy: { intro: 'Imagine you\'re visiting the Qutb Minar complex in Delhi and notice the iron pillar that hasn\'t rusted in 1,600 years—Indian metallurgy was world-class.',
            decisions: [{ prompt: 'Name the Abbasid institution in Baghdad that served as the epicentre of the translation movement, and identify the caliph who founded it.', options: [
                { text: 'The Bayt al-Hikma (House of Wisdom), founded by Caliph Harun al-Rashid (r', outcome: 'The Bayt al-Hikma (House of Wisdom), founded by Caliph Harun al-Rashid (r.' },
                { text: 'Al-Azhar', outcome: 'Not quite — Students believe Islamic science was "just preservation" of Greek knowledge until the European.', reveals: 'islamic-science-was-just-preservation' },
                { text: 'House of Knowledge', outcome: 'Not quite — Students believe Islamic science was "just preservation" of Greek knowledge until the European.', reveals: 'islamic-science-was-just-preservation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_010', title: 'The Crusades: Christian-Muslim Encounters in the Holy Land',
          caseStudy: { intro: 'Imagine you are standing before the Qutb Minar complex in Delhi, noticing the blend of Hindu and Islamic architectural motifs—a testament to cultural.',
            decisions: [{ prompt: 'In which year and at which council did Pope Urban II deliver the sermon that launched the First Crusade?', options: [
                { text: '1095, Council of Clermont', outcome: '1095, Council of Clermont. A wrong answer (e.g., 1071 Council of Piacenza or 1099 Council of Rome).' },
                { text: 'Christendom', outcome: 'Not quite — Students often believe the Crusades were a single, continuous 200-year war between a monolithic.', reveals: 'the-crusades-were-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_011', title: 'The Decline of the Abbasids and the Rise of Regional Powers',
          caseStudy: { intro: 'Imagine you are visiting the Qutb Minar complex in Delhi and notice the Arabic inscriptions praising "the Commander of the Faithful" — but the ruler who built.',
            decisions: [{ prompt: 'In which year did the Anarchy at Samarra begin, marking the start of effective Abbasid central authority collapse, and which Turkish guard.', options: [
                { text: 'The Anarchy at Samarra began in 861 CE after the assassination of Caliph al-Mutawakkil', outcome: 'The Anarchy at Samarra began in 861 CE after the assassination of Caliph al-Mutawakkil; the Turkish.' },
                { text: 'caliph as figurehead', outcome: 'Not quite — Students often believe the Abbasid Caliphate "collapsed" suddenly in 1258, or that regional.', reveals: 'the-abbasid-caliphate-collapsed-suddenly' },
                { text: 'collapsed', outcome: 'Not quite — Students often believe the Abbasid Caliphate "collapsed" suddenly in 1258, or that regional.', reveals: 'the-abbasid-caliphate-collapsed-suddenly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on Islam\'s origins, one side argues: \'Pre-Islamic Arabia was a backward, isolated desert until Islam arrived — then the Prophet conquered it by the sword.\'',
            decisions: [{ prompt: 'What does the historical record show?', options: [
                { text: 'Correct the baseline and the mechanism: Arabia was deeply connected — Mecca\'s caravan trade linked Indian Ocean goods to Mediterranean markets, and \'jahiliyya\' is a theological label, not a description of material life. And the Prophet\'s success ran on non-violent preaching for 12 years, then statecraft — the Hijra as calculated migration, the Constitution of Medina, alliances and the nearly bloodless taking of Mecca in 630 — not the sword.', outcome: 'The debate reframes: a sanctuary-truce economy met a religio-political blueprint — assimilation and treaty, more than battle, built the order.' },
                { text: 'Accept \'backward desert\' — that\'s why Arabia needed Islam to civilise it.', outcome: 'Reading jahiliyya as historical description retrojects a religious judgment: the poetry, trade networks and Jewish-Christian communities show a connected, sophisticated world.', reveals: 'pre-islamic-arabia-backward' },
                { text: 'Concede the conquest point — battles like Badr prove force founded the faith.', outcome: 'Battles were episodes, not the foundation: Medina was built by treaties, and Mecca surrendered when its alliance system collapsed — expansion by Caliphate armies came later and is a different era.', reveals: 'islam-spread-by-sword-in-arabia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'Tribal feuds plus caravan profits needed one invention: a sacred zone where war paused and trade could happen.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_007', difficulty: 'standard',
          question: 'The Abbasid Caliphate (750–1258 CE) was the third Islamic caliphate, founded.',
          hint: 'Revisit the Umayyad node (c11_hist_cbse_04_006), specifically the sections on mawali.',
          misconception: 'Students often believe the "Golden Age" was a single continuous period of peace and prosperity under one caliph.',
          parts: [
                { id: 'a', prompt: 'In what year was Baghdad officially founded as the Abbasid capital, and by which caliph?', answer: 'Baghdad was founded in 762 CE by Caliph al-Mansur (r',
                  options: ['Baghdad was founded in 762 CE by Caliph al-Mansur (r', 'Golden Age'],
                  hint: 'Revisit the Umayyad node (c11_hist_cbse_04_006), specifically the sections on mawali grievances.',
                  misconception: 'Students often believe the "Golden Age" was a single continuous period of peace and prosperity under one caliph (usually Harun al-Rashid.' },
                { id: 'b', prompt: 'A student claims: "The House of Wisdom was simply a library where books were stored." Using evidence from the translation movement, explain why this.', answer: 'The House of Wisdom (Bayt al-Hikma) was a state-sponsored academy (founded c',
                  options: ['The House of Wisdom (Bayt al-Hikma) was a state-sponsored academy (founded c', 'Golden Age'],
                  hint: 'Revisit the Umayyad node (c11_hist_cbse_04_006), specifically the sections on mawali grievances.',
                  misconception: 'Students often believe the "Golden Age" was a single continuous period of peace and prosperity under one caliph (usually Harun al-Rashid.' }
          ],
            remediations: { 'the-golden-age-was-a': { steps: ['If the student conflates the Golden Age with Harun al-Rashid alone: (1) Have them create a timeline marking: 750.', '(2) Assign a map exercise: plot Baghdad, Cairo, Cordoba, Bukhara, Ghazni — show how scientific activity shifted.', '(3) Compare two sources: a panegyric poem praising Harun\'s court vs.', 'al-Tabari\'s chronicle describing the civil war between al-Amin and al-Ma\'mun — discuss how "Golden Age" is.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the "Golden Age" was a single continuous period of peace and prosperity under one caliph.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Abbasid Golden Age ended because the Mongols destroyed Baghdad in 1258." Provide two pieces of evidence that the decline began earlier.', answer: 'The claim is inaccurate',
                  options: ['The claim is inaccurate', 'Golden Age'],
                  hint: 'Revisit the Umayyad node (c11_hist_cbse_04_006), specifically the sections on mawali grievances.',
                  misconception: 'Students often believe the "Golden Age" was a single continuous period of peace and prosperity under one caliph (usually Harun al-Rashid.' }
          ],
            remediations: { 'the-golden-age-was-a': { steps: ['If the student conflates the Golden Age with Harun al-Rashid alone: (1) Have them create a timeline marking: 750.', '(2) Assign a map exercise: plot Baghdad, Cairo, Cordoba, Bukhara, Ghazni — show how scientific activity shifted.', '(3) Compare two sources: a panegyric poem praising Harun\'s court vs.', 'al-Tabari\'s chronicle describing the civil war between al-Amin and al-Ma\'mun — discuss how "Golden Age" is.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_008', difficulty: 'standard',
          question: 'The Shia-Sunni split is the primary sectarian division within Islam originating.',
          hint: 'If stuck, re-read c11_hist_cbse_04_005 focusing on *why* Ali\'s supporters refused.',
          misconception: 'Students believe the Shia-Sunni split is *primarily about religious rituals* (prayer posture, temporary marriage.',
          parts: [
                { id: 'a', prompt: 'A historian finds two 9th-century Hadith collections: one accepts narrations from Abu Hurairah (a companion close to Abu Bakr), the other rejects them.', answer: 'The collection accepting Abu Hurairah is Sunni',
                  options: ['The collection accepting Abu Hurairah is Sunni', 'both accept all companions'],
                  hint: 'If stuck, re-read c11_hist_cbse_04_005 focusing on *why* Ali\'s supporters refused to accept the.',
                  misconception: 'Students believe the Shia-Sunni split is *primarily about religious rituals* (prayer posture, temporary marriage, mourning practices).' }
          ],
            remediations: { 'the-shia-sunni-split-is': { steps: ['Revisit c11_hist_cbse_04_005 (The Caliphate: Rashidun and Question of Succession) — map the *exact sequence*: Saqifah →.', 'Use a two-column table: "Event" vs. "What each side concluded about authority."', 'Trace one theological doctrine (e.g., *Ismah* / infallibility) from its *political root* (Ali\'s legitimacy) to its.', 'Explain to a peer: "The split wasn\'t about *how* to pray, but *who has the right to define* how to pray."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_009', difficulty: 'standard',
          question: 'The Islamic Golden Age (8th–14th centuries) refers to the period of remarkable.',
          hint: 'Revisit c11_hist_cbse_04_007 "The Abbasid Caliphate: Baghdad and the Golden Age" focusing.',
          misconception: 'Students believe Islamic science was "just preservation" of Greek knowledge until the European Renaissance.',
          parts: [
                { id: 'a', prompt: 'Name the Abbasid institution in Baghdad that served as the epicentre of the translation movement, and identify the caliph who founded it.', answer: 'The Bayt al-Hikma (House of Wisdom), founded by Caliph Harun al-Rashid (r',
                  options: ['The Bayt al-Hikma (House of Wisdom), founded by Caliph Harun al-Rashid (r', 'Al-Azhar', 'House of Knowledge', 'just preservation'],
                  hint: 'Revisit c11_hist_cbse_04_007 "The Abbasid Caliphate: Baghdad and the Golden Age" focusing on the.',
                  misconception: 'Students believe Islamic science was "just preservation" of Greek knowledge until the European Renaissance "rediscovered" it.' },
                { id: 'b', prompt: 'Al-Khwarizmi\'s *Kitab al-Jabr wa-l-Muqabala* introduced systematic algebra.', answer: 'Step 1: Halve the roots (10/2 = 5)',
                  options: ['Step 1: Halve the roots (10/2 = 5)', 'restoring', 'just preservation', 'rediscovered'],
                  hint: 'Revisit c11_hist_cbse_04_007 "The Abbasid Caliphate: Baghdad and the Golden Age" focusing on the.',
                  misconception: 'Students believe Islamic science was "just preservation" of Greek knowledge until the European Renaissance "rediscovered" it.' },
                { id: 'c', prompt: 'Compare the institutional support for science under the Abbasids (Bayt al-Hikma) with the Gupta period (Nalanda, Ujjain observatory).', answer: 'Similarities: (1) State patronage of scholars across disciplines',
                  options: ['Similarities: (1) State patronage of scholars across disciplines', 'both had universities', 'just preservation', 'rediscovered'],
                  hint: 'Revisit c11_hist_cbse_04_007 "The Abbasid Caliphate: Baghdad and the Golden Age" focusing on the.',
                  misconception: 'Students believe Islamic science was "just preservation" of Greek knowledge until the European Renaissance "rediscovered" it.' }
          ],
            remediations: { 'islamic-science-was-just-preservation': { steps: ['Re-read the NCERT Theme 3 section "Science and Philosophy" (pp. 86–89 in *Themes in World History*).', 'Create a three-column table: Greek Source → Islamic Innovation → European Reception.', 'Watch the 10-minute segment "Islamic Golden Age" from *Science in a Golden Age* (Al Jazeera documentary) to visualise.', 'Explain aloud to a peer why "translation" is the wrong verb—use "transformation" instead.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_010', difficulty: 'standard',
          question: 'The Crusades (1095–1291) were a series of religiously sanctioned military.',
          hint: 'If stuck, review the Battle of Manzikert (1071) and the Great Schism (1054) using the.',
          misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and.',
          parts: [
                { id: 'a', prompt: 'In which year and at which council did Pope Urban II deliver the sermon that launched the First Crusade?', answer: '1095, Council of Clermont',
                  options: ['1095, Council of Clermont', 'Christendom'],
                  hint: 'If stuck, review the Battle of Manzikert (1071) and the Great Schism (1054) using the sibling node.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam.".' },
                { id: 'b', prompt: 'Compare the outcomes of the Third Crusade (1189–1192) and the Fourth Crusade (1202–1204) in terms of their impact on Muslim unity and Byzantine survival.', answer: 'Third Crusade: Failed to retake Jerusalem but secured coastal access',
                  options: ['Third Crusade: Failed to retake Jerusalem but secured coastal access', 'failures to take Jerusalem', 'Christendom'],
                  hint: 'If stuck, review the Battle of Manzikert (1071) and the Great Schism (1054) using the sibling node.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam.".' }
          ],
            remediations: { 'the-crusades-were-a-single': { steps: ['Provide a political map of the Levant c. 1140 showing Crusader states, Zengid, Artuqid, Fatimid, and Byzantine.', 'Have students trace the shifting alliances of Raymond of Poitiers (Antioch) using primary source excerpts from William.', 'Assign a comparative table: "Crusader-Muslim Alliances vs. Internal Conflicts (1100–1187)" to visualize that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_011', difficulty: 'standard',
          question: 'The decline of the Abbasid Caliphate (c. 9th–13th centuries) refers to the.',
          hint: 'Review the Abbasid Golden Age (node c11_hist_cbse_04_007), specifically the *diwan.',
          misconception: 'Students often believe the Abbasid Caliphate "collapsed" suddenly in 1258, or that regional dynasties like the Buyids.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The decline of the Abbasid Caliphate (c',
                  options: ['The decline of the Abbasid Caliphate (c', 'Arabia before Islam (6th-7th century CE) was a tribal society organized around kinship', 'The Life of the Prophet Muhammad and the Founding of Islam refers to the historical', 'The Five Pillars of Islam (Arkan al-Islam) are the five obligatory acts of worship that'],
                  hint: 'Review the Abbasid Golden Age (node c11_hist_cbse_04_007), specifically the *diwan al-kharaj* (land.',
                  misconception: 'Students often believe the Abbasid Caliphate "collapsed" suddenly in 1258, or that regional dynasties like the Buyids or Seljuks "replaced".' }
          ],
            remediations: { 'the-abbasid-caliphate-collapsed-suddenly': { steps: ['Re-read the distinction between *political power* (sultan/emir) and *religious legitimacy* (caliph) using the Buyid.', 'Draw a two-column table: "Caliph\'s Formal Powers" (khutba, coinage, appointment of qadis, legitimacy grants).', 'Trace one dynasty (e.g., Ghaznavids) showing how Mahmud of Ghazni sought Abbasid *manshur* (investiture deed).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
