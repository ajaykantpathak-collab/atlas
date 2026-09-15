import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch08_p1: SimDef = {
    id: 'v3_c12_soc_ch08_p1',
    title: 'Structural Change · Part 1/2',
    subtitle: 'The empire that trained its own gravediggers',
    classLevel: 12, subject: 'sociology', topic: 'Structural Change · Part 1/2',
    chapters: ['c12_soc_ch08'],
    nodeIds: ['c12_soc_cbse_08_001', 'c12_soc_cbse_08_002', 'c12_soc_cbse_08_003', 'c12_soc_cbse_08_004', 'c12_soc_cbse_08_005', 'c12_soc_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Colonial-era sociologist', intro: 'We drive on the left, learn in English and fight for freedom with the coloniser\'s vocabulary — colonialism\'s contradictions are still in the room.', goal: 'Explain how capitalist colonialism restructured India\'s economy and society, and analyse its paradoxical legacies.' },
    discovery: {
        question: 'The British built schools to mass-produce loyal clerks — and out walked a generation that used English arguments about liberty to demand the British leave. What went wrong for the empire?',
        options: ['Colonial rule contradicted its own ideals: education exposed Indians to sovereignty and equality that foreign rule denied, so nationalism armed itself with the coloniser\'s tools', 'Indians mistranslated the textbooks', 'The British accidentally funded the freedom movement', 'Nationalism arrived fully formed from outside'],
        answer: 'Colonial rule contradicted its own ideals: education exposed Indians to sovereignty and equality that foreign rule denied, so nationalism armed itself with the coloniser\'s tools',
        hook: 'Colonialism wasn\'t just tribute like earlier conquests — it rewired the economic base: land became property, crops became exports, forests became timber, people became shipped labour. The railways ran port-ward, not for you.',
    },
    teaching: [
        { title: 'Colonialism and Its Impact on Indian Society: The Nature of Colonial Rule', text: 'Colonialism is a system of domination where a capitalist country establishes political, economic, and legal control over another territory to extract surplus and restructure the colony\'s economy for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the profit motive through land laws, cash crops, forest acts and indentured ships — and spot the paradoxes the empire couldn\'t see coming.',
        labels: ['Colonialism and Its Impact', 'Colonial Capitalism and', 'The Impact of Colonialism', 'Deindustrialisation Under Colonial Rule', 'Industrialisation in Colonial India', 'Urbanisation Under Colonialism: Presidency'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_001', title: 'Colonialism and Its Impact on Indian Society: The Nature of Colonial Rule',
          caseStudy: { intro: 'Begin by asking: "Why do we drive on the left, eat bread-omelette, and wear neck-ties in school — but also fight for liberty using the coloniser\'s language?".',
            decisions: [{ prompt: 'According to the NCERT, what is the vital difference between empire-building in pre-capitalist times and capitalist times regarding the.', options: [
                { text: 'Pre-capitalist conquerors extracted tribute from the traditionally produced economic', outcome: 'Pre-capitalist conquerors extracted tribute from the traditionally produced economic surplus.' },
                { text: 'both took tribute', outcome: 'Not quite — Students often equate colonialism with "foreign rule" or "exploitation" in a generic sense, missing.', reveals: 'students-often-equate-colonialism-with' },
                { text: 'British took wealth from India', outcome: 'Not quite — Students often equate colonialism with "foreign rule" or "exploitation" in a generic sense, missing.', reveals: 'students-often-equate-colonialism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_002', title: 'Colonial Capitalism and the Transformation of the Indian Economy',
          caseStudy: { intro: 'Imagine you are walking through a modern Indian city — you see a railway station built in 1860, a neighbourhood named "Civil Lines" with spacious bungalows.',
            decisions: [{ prompt: 'Define colonial capitalism in one sentence and state the fundamental difference between pre-capitalist conquest (tribute extraction) and.', options: [
                { text: 'Colonial capitalism is the restructuring of a colonised economy by a capitalist metropole', outcome: 'Colonial capitalism is the restructuring of a colonised economy by a capitalist metropole to serve.' },
                { text: 'both extracted wealth', outcome: 'Not quite — Students equate "colonial capitalism" with "British introduced capitalism to India" — implying.', reveals: 'students-equate-colonial-capitalism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_003', title: 'The Impact of Colonialism on the Agrarian Structure: Zamindari, Ryotwari and Mahalwari',
          caseStudy: { intro: 'Imagine a small farmer in present-day Bihar who cannot get a loan because his land records still show a "zamindari" tenure from 1793, or a cotton grower.',
            decisions: [{ prompt: 'What was the fundamental difference between the Zamindari and Ryotwari systems in terms of who was legally responsible for paying land.', options: [
                { text: 'In the Zamindari system, the zamindar (landlord/intermediary) was legally responsible for', outcome: 'In the Zamindari system, the zamindar (landlord/intermediary) was legally responsible for paying.' },
                { text: 'both made peasants pay directly', outcome: 'Not quite — Students often think the three systems were just "different tax rates" and that Ryotwari was.', reveals: 'the-three-systems-were-just' },
                { text: 'different tax rates', outcome: 'Not quite — Students often think the three systems were just "different tax rates" and that Ryotwari was.', reveals: 'the-three-systems-were-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_004', title: 'Deindustrialisation Under Colonial Rule: Decline of Handicrafts and Artisans',
          caseStudy: { intro: 'Imagine you are a weaver in Dhaka in 1830: your muslin once dressed Mughal emperors and fetched high prices in Europe, but now you cannot sell a single bolt.',
            decisions: [{ prompt: 'Define deindustrialisation in the colonial Indian context and name the single most important British policy that initiated it.', options: [
                { text: 'Deindustrialisation is the forced decline of indigenous manufacturing due to colonial', outcome: 'Deindustrialisation is the forced decline of indigenous manufacturing due to colonial policies; the.' },
                { text: 'industrialisation happened late', outcome: 'Not quite — Students often think deindustrialisation means "India did not industrialise" — they confuse the.', reveals: 'deindustrialisation-means-india-did-not' },
                { text: 'India did not industrialise', outcome: 'Not quite — Students often think deindustrialisation means "India did not industrialise" — they confuse the.', reveals: 'deindustrialisation-means-india-did-not' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_005', title: 'Industrialisation in Colonial India: Plantations, Mines and the Early Factory System',
          caseStudy: { intro: 'Imagine you are a tea plantation worker in Assam, 1890: recruited by a contractor from Bihar with false promises, bound by a penal contract that criminalises.',
            decisions: [{ prompt: 'What was the primary legal instrument used to recruit and retain labour for Assam tea plantations in the 1860s–1870s, and what made.', options: [
                { text: 'The Transport of Native Labourers Act (Act III of 1863, amended 1865, 1870, 1873) was the', outcome: 'The Transport of Native Labourers Act (Act III of 1863, amended 1865, 1870, 1873) was the primary.' },
                { text: 'industrialisation in colonial India', outcome: 'Not quite — Students often believe that "industrialisation in colonial India" means the *same process* as.', reveals: 'industrialisation-in-colonial-india-means' },
                { text: 'industrialisation', outcome: 'Not quite — Students often believe that "industrialisation in colonial India" means the *same process* as.', reveals: 'industrialisation-in-colonial-india-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_006', title: 'Urbanisation Under Colonialism: Presidency Cities, Cantonments and Hill Stations',
          caseStudy: { intro: 'Imagine you are standing at Churchgate station in Mumbai at 8:45 AM on a weekday — a tidal wave of commuters surges from the local trains onto streets.',
            decisions: [{ prompt: 'Name the three villages leased by Job Charnock in 1690 that became the nucleus of Calcutta, and identify the defensive structure that.', options: [
                { text: 'The three villages were Kolikata, Gobindapur, and Sutanuti', outcome: 'The three villages were Kolikata, Gobindapur, and Sutanuti. The defensive structure was Fort.' },
                { text: 'Bombay\'s islands or Madras\'s Fort St', outcome: 'Not quite — Students often think \'colonial urbanisation = British built cities where N/A existed.\' The NCERT.', reveals: 'colonial-urbanisation-british-built-cities' },
                { text: '\'colonial urbanisation = British built cities where N/A existed', outcome: 'Not quite — Students often think \'colonial urbanisation = British built cities where N/A existed.\' The NCERT.', reveals: 'colonial-urbanisation-british-built-cities' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate speech argues \'colonialism modernised India — railways, ports and cities like Bombay prove the British developed the country.\'',
            decisions: [{ prompt: 'What does colonial capitalism analysis say those ports and rails were for?', options: [
                { text: 'Extraction infrastructure — ports linked the Indian periphery to the British core for raw-material export and manufactured-goods import, which is why Bombay grew while Surat and Dhaka declined; the same industrialisation that built Britain\'s mills dismantled India\'s through one-way tariff policy.', outcome: 'The chapter\'s reframing: \'modern\' features were engineered to serve British accumulation — judging them as development mistakes the function for the intent.' },
                { text: 'The speech stands — railways move people and goods, so they developed India regardless of motive.', outcome: 'Function followed extraction — the routes ran to ports, not inland markets; the paradox the chapter names is that the same process modernised Britain and deindustrialised India.', reveals: 'infrastructure-equals-development' },
                { text: 'Both happened — colonialism just modernised and exploited equally, a wash.', outcome: 'The two weren\'t parallel effects — the extraction IS what produced the distorted shape: artisan collapse, cash-crop forcing, port enclaves; \'equal and opposite\' reads a one-directional restructuring as a balanced ledger.', reveals: 'it-was-a-wash' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue why the railways \'modernised\' India in exactly the direction Britain\'s economy needed — and why Indian democracy grew against colonialism, not from it.',
            decisions: [{ prompt: 'What comes next? Structural Change · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Structural Change · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_001', difficulty: 'standard',
          question: 'Colonialism is a system of domination where a capitalist country establishes.',
          hint: 'Revisit c11_soc_cbse_01_006 "Capitalism and Colonialism: Global Forces Shaping the.',
          misconception: 'Students often equate colonialism with "foreign rule" or "exploitation" in a generic sense, missing the *specific.',
          parts: [
                { id: 'a', prompt: 'Compare the movement of people under British colonialism (indentured labour to Mauritius, tribal migration to Assam tea gardens) with labour migration.', answer: 'Pre-colonial migration was largely voluntary (traders, artisans, soldiers) or',
                  options: ['Pre-colonial migration was largely voluntary (traders, artisans, soldiers) or', 'British took wealth from India'],
                  hint: 'Revisit c11_soc_cbse_01_006 "Capitalism and Colonialism: Global Forces Shaping the Discipline".',
                  misconception: 'Students often equate colonialism with "foreign rule" or "exploitation" in a generic sense, missing the *specific capitalist mechanism*.' }
          ],
            remediations: { 'students-often-equate-colonialism-with': { steps: ['If the student conflates colonialism with generic exploitation: (1) Re-read NCERT pp.4–5 "Understanding Colonialism".', '(2) Create a two-column table: Pre-capitalist conquest (tribute, no base interference) vs.', 'Capitalist colonialism (restructure base for profit).', 'Fill with 4 NCERT examples.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate colonialism with "foreign rule" or "exploitation" in a generic sense, missing the *specific.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Colonialism brought the nation-state and nationalism to India, so it laid the foundation for modern Indian democracy." Use the NCERT\'s.', answer: 'The statement is partially true but sociologically incomplete',
                  options: ['The statement is partially true but sociologically incomplete', 'British took wealth from India'],
                  hint: 'Revisit c11_soc_cbse_01_006 "Capitalism and Colonialism: Global Forces Shaping the Discipline".',
                  misconception: 'Students often equate colonialism with "foreign rule" or "exploitation" in a generic sense, missing the *specific capitalist mechanism*.' }
          ],
            remediations: { 'students-often-equate-colonialism-with': { steps: ['If the student conflates colonialism with generic exploitation: (1) Re-read NCERT pp.4–5 "Understanding Colonialism".', '(2) Create a two-column table: Pre-capitalist conquest (tribute, no base interference) vs.', 'Capitalist colonialism (restructure base for profit).', 'Fill with 4 NCERT examples.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_002', difficulty: 'standard',
          question: 'Colonial capitalism refers to the specific form of capitalist penetration where.',
          hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism: Global Forces Shaping the.',
          misconception: 'Students equate "colonial capitalism" with "British introduced capitalism to India" — implying India lacked capitalist.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Colonial capitalism refers to the specific form of capitalist penetration where British',
                  options: ['Colonial capitalism refers to the specific form of capitalist penetration where British', 'Colonialism is a system of domination where a capitalist country establishes political,', 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue', 'Deindustrialisation under colonial rule refers to the systematic decline of India\'s'],
                  hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism: Global Forces Shaping the Discipline) and.',
                  misconception: 'Students equate "colonial capitalism" with "British introduced capitalism to India" — implying India lacked capitalist elements.' }
          ],
            remediations: { 'students-equate-colonial-capitalism-with': { steps: ['If the student holds this misconception: (1) Have them re-read NCERT pp.', '4-5 (Alavi & Shanin quote) and Box 1.2 (Census 1911 on artisans moving to agriculture).', '(2) Ask: "If capitalism developed India, why did the % workforce in agriculture *rise* during colonial rule?" (3).', 'Indian deindustrialisation (one-way free trade, revenue extraction, discriminatory excise)." (4) Re-diagnose with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_003', difficulty: 'standard',
          question: 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue.',
          hint: 'Revisit c12_soc_cbse_08_002\'s distinction between pre-capitalist tribute and capitalist.',
          misconception: 'Students often think the three systems were just "different tax rates" and that Ryotwari was "better" because peasants.',
          parts: [
                { id: 'a', prompt: 'Explain why the British introduced the Permanent Settlement (Zamindari) in Bengal but chose Ryotwari for Madras and Bombay presidencies.', answer: 'The Permanent Settlement was introduced in Bengal',
                  options: ['The Permanent Settlement was introduced in Bengal', 'different local conditions', 'different tax rates', 'better'],
                  hint: 'Revisit c12_soc_cbse_08_002\'s distinction between pre-capitalist tribute and capitalist surplus.',
                  misconception: 'Students often think the three systems were just "different tax rates" and that Ryotwari was "better" because peasants owned land.' },
                { id: 'b', prompt: 'A historian argues that the Mahalwari system was "more peasant-friendly" than Zamindari because revenue was settled with the village community.', answer: 'The claim is misleading',
                  options: ['The claim is misleading', 'community settlement = better for peasants', 'different tax rates', 'better'],
                  hint: 'Revisit c12_soc_cbse_08_002\'s distinction between pre-capitalist tribute and capitalist surplus.',
                  misconception: 'Students often think the three systems were just "different tax rates" and that Ryotwari was "better" because peasants owned land.' }
          ],
            remediations: { 'the-three-systems-were-just': { steps: ['If a student conflates the systems or judges them normatively ("better/worse"), do this 3-step remediation: (1) Have.', '(2) Give two primary-source excerpts: one from a Bengal zamindar\'s rent roll (showing sub-infeudation) and one from.', 'Ask: "In each case, who bears the risk of crop failure?" (3) Re-diagnose with Question 4 above — if they still miss the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_004', difficulty: 'standard',
          question: 'Deindustrialisation under colonial rule refers to the systematic decline.',
          hint: 'Revisit c12_soc_cbse_08_003 (agrarian structure) and c12_soc_cbse_08_002 (colonial.',
          misconception: 'Students often think deindustrialisation means "India did not industrialise" — they confuse the *absence of modern.',
          parts: [
                { id: 'a', prompt: 'Analyse the paradox: British industrialisation *increased* urbanisation in Britain, but the *same* British industrialisation *decreased* urbanisation in India.', answer: 'In Britain, factory production concentrated labour in cities',
                  options: ['In Britain, factory production concentrated labour in cities', 'India was agrarian', 'India did not industrialise'],
                  hint: 'Revisit c12_soc_cbse_08_003 (agrarian structure) and c12_soc_cbse_08_002 (colonial capitalism).',
                  misconception: 'Students often think deindustrialisation means "India did not industrialise" — they confuse the *absence of modern factories* with the.' }
          ],
            remediations: { 'deindustrialisation-means-india-did-not': { steps: ['Re-read NCERT Box 1.2 (Census 1911 quote) and identify three verbs showing *active* destruction ("destroyed".', 'Map each verb to a British policy (import tariffs, revenue pressure, railway freight).', 'Write a 50-word distinction: "Deindustrialisation is the decline of X due to Y; non-industrialisation is the absence.', 'Re-attempt Diagnostic Q2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_005', difficulty: 'standard',
          question: 'Industrialisation in colonial India refers to the emergence of machine-based.',
          hint: 'If unclear on "colonial capitalism," re-read NCERT pp.4–5 (Understanding Colonialism) and.',
          misconception: 'Students often believe that "industrialisation in colonial India" means the *same process* as in Britain—just later and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Industrialisation in colonial India refers to the emergence of machine-based production',
                  options: ['Industrialisation in colonial India refers to the emergence of machine-based production', 'Colonialism is a system of domination where a capitalist country establishes political,', 'Colonial capitalism refers to the specific form of capitalist penetration where British', 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue'],
                  hint: 'If unclear on "colonial capitalism," re-read NCERT pp.4–5 (Understanding Colonialism) and.',
                  misconception: 'Students often believe that "industrialisation in colonial India" means the *same process* as in Britain—just later and slower—so they.' }
          ],
            remediations: { 'industrialisation-in-colonial-india-means': { steps: ['If the student cannot distinguish colonial from metropolitan industrialisation: Step 1 — Re-read NCERT Box 1.2 (Census.', 'Step 2 — Create a two-column table: "British Industrialisation" vs "Colonial Indian Industrialisation" with rows.', 'Step 3 — For each row, fill one cell from the tea plantation case and one from the cotton mill case.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_006', difficulty: 'standard',
          question: 'Urbanisation under colonialism refers to the historically specific process.',
          hint: 'If stuck, revisit c12_soc_cbse_08_004 (Deindustrialisation) — specifically the mechanism.',
          misconception: 'Students often think \'colonial urbanisation = British built cities where N/A existed.\' The NCERT text explicitly shows.',
          parts: [
                { id: 'a', prompt: 'Name the three villages leased by Job Charnock in 1690 that became the nucleus of Calcutta, and identify the defensive structure that anchored its early.', answer: 'The three villages were Kolikata, Gobindapur, and Sutanuti',
                  options: ['The three villages were Kolikata, Gobindapur, and Sutanuti', 'Bombay\'s islands or Madras\'s Fort St', '\'colonial urbanisation = British built cities where N/A existed'],
                  hint: 'If stuck, revisit c12_soc_cbse_08_004 (Deindustrialisation) — specifically the mechanism.',
                  misconception: 'Students often think \'colonial urbanisation = British built cities where N/A existed.\' The NCERT text explicitly shows the opposite.' },
                { id: 'b', prompt: 'A sociologist argues: \'Cantonments were the "purest" colonial urban form because they were designed from scratch on empty land, unlike Presidency cities which.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'agrees fully ignores how Presidency cities were *actively restructured* (e', '\'colonial urbanisation = British built cities where N/A existed'],
                  hint: 'If stuck, revisit c12_soc_cbse_08_004 (Deindustrialisation) — specifically the mechanism.',
                  misconception: 'Students often think \'colonial urbanisation = British built cities where N/A existed.\' The NCERT text explicitly shows the opposite.' },
                { id: 'c', prompt: 'Compare the labour recruitment mechanism for Assam tea plantations (Box 1.5) with the migrant labour pattern described in M.S.A.', answer: 'Similarities: (1) Both rely on long-distance circular migration',
                  options: ['Similarities: (1) Both rely on long-distance circular migration', 'says \'both are voluntary\' misses the structural unfreedom in both', '\'colonial urbanisation = British built cities where N/A existed'],
                  hint: 'If stuck, revisit c12_soc_cbse_08_004 (Deindustrialisation) — specifically the mechanism.',
                  misconception: 'Students often think \'colonial urbanisation = British built cities where N/A existed.\' The NCERT text explicitly shows the opposite.' }
          ],
            remediations: { 'colonial-urbanisation-british-built-cities': { steps: ['If a student cannot distinguish de-urbanisation from urbanisation: Step 1 — Have them re-read Box 1.2 (Census 1911) and.', 'Step 2 — Ask them to list *three* pre-colonial cities that declined and *three* colonial cities that grew, with one.', 'Step 3 — Give a re-diagnostic: \'Explain why the 1911 Census says village artisans abandoned crafts for agriculture.', 'If not, revisit c12_soc_cbse_08_004 (Deindustrialisation) before returning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
