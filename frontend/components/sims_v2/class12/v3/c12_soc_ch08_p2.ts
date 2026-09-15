import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch08_p2: SimDef = {
    id: 'v3_c12_soc_ch08_p2',
    title: 'Structural Change · Part 2/2',
    subtitle: 'The empire that trained its own gravediggers',
    classLevel: 12, subject: 'sociology', topic: 'Structural Change · Part 2/2',
    chapters: ['c12_soc_ch08'],
    nodeIds: ['c12_soc_cbse_08_007', 'c12_soc_cbse_08_008', 'c12_soc_cbse_08_009', 'c12_soc_cbse_08_010', 'c12_soc_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Colonial-era sociologist', intro: 'We drive on the left, learn in English and fight for freedom with the coloniser\'s vocabulary — colonialism\'s contradictions are still in the room.', goal: 'Explain how capitalist colonialism restructured India\'s economy and society, and analyse its paradoxical legacies.' },
    discovery: {
        question: 'The British built schools to mass-produce loyal clerks — and out walked a generation that used English arguments about liberty to demand the British leave. What went wrong for the empire?',
        options: ['Colonial rule contradicted its own ideals: education exposed Indians to sovereignty and equality that foreign rule denied, so nationalism armed itself with the coloniser\'s tools', 'Indians mistranslated the textbooks', 'The British accidentally funded the freedom movement', 'Nationalism arrived fully formed from outside'],
        answer: 'Colonial rule contradicted its own ideals: education exposed Indians to sovereignty and equality that foreign rule denied, so nationalism armed itself with the coloniser\'s tools',
        hook: 'Colonialism wasn\'t just tribute like earlier conquests — it rewired the economic base: land became property, crops became exports, forests became timber, people became shipped labour. The railways ran port-ward, not for you.',
    },
    teaching: [
        { title: 'The Colonial Administration: The ICS, Police and the Legal-Judicial System', text: 'The colonial administration refers to the bureaucratic, policing, and judicial machinery established by the British to govern India, centred on the Indian Civil Service (ICS) as the elite executive.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the profit motive through land laws, cash crops, forest acts and indentured ships — and spot the paradoxes the empire couldn\'t see coming.',
        labels: ['The Colonial Administration', 'The English Education System', 'The Impact of', 'The Nationalist Response', 'Structural Change After Independence'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_007', title: 'The Colonial Administration: The ICS, Police and the Legal-Judicial System',
          caseStudy: { intro: 'Imagine you are a district collector in 1920s India: you hold executive, magisterial, and revenue powers simultaneously, your police superintendent reports.',
            decisions: [{ prompt: 'What was the primary reason the British introduced a competitive examination for the Indian Civil Service (ICS) in 1855?', options: [
                { text: 'The competitive examination was introduced to replace the patronage-based nomination', outcome: 'The competitive examination was introduced to replace the patronage-based nomination system of the.' },
                { text: 'efficient', outcome: 'Not quite — Students often think the ICS was "meritocratic" because of the competitive exam, and therefore.', reveals: 'the-ics-was-meritocratic-because' },
                { text: 'modern', outcome: 'Not quite — Students often think the ICS was "meritocratic" because of the competitive exam, and therefore.', reveals: 'the-ics-was-meritocratic-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_008', title: 'The English Education System and Macaulay\'s Minute (1835)',
          caseStudy: { intro: 'Imagine a Dalit student in 2024 getting a high-paying IT job solely because of English fluency — a skill their great-grandparents were denied by caste law.',
            decisions: [{ prompt: 'What was the explicit purpose of Macaulay\'s Minute (1835) according to the British colonial state?', options: [
                { text: 'The explicit purpose was to create "a class of persons, Indian in blood and colour, but', outcome: 'The explicit purpose was to create "a class of persons, Indian in blood and colour, but English.' },
                { text: 'to modernise India', outcome: 'Not quite — Students treat Macaulay\'s Minute as *either* a "modernising gift" (English gave us global.', reveals: 'students-treat-macaulay-s-minute' },
                { text: 'to spread scientific temper', outcome: 'Not quite — Students treat Macaulay\'s Minute as *either* a "modernising gift" (English gave us global.', reveals: 'students-treat-macaulay-s-minute' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_009', title: 'The Impact of the Railways on Indian Society and Economy',
          caseStudy: { intro: 'Imagine you are a cotton farmer in 1860s Berar. Before railways, your cotton travelled slowly by bullock cart to local markets; after the Great Indian.',
            decisions: [{ prompt: 'What was the primary economic purpose for which the British colonial state promoted railway construction in India?', options: [
                { text: 'The primary purpose was to facilitate the extraction of raw materials (cotton, jute,', outcome: 'The primary purpose was to facilitate the extraction of raw materials (cotton, jute, wheat, tea).' },
                { text: 'to modernise India\'s transport for the benefit of Indians', outcome: 'Not quite — Students often believe railways were an unambiguous "modernising gift" to India because they.', reveals: 'railways-were-an-unambiguous-modernising' },
                { text: 'modernising gift', outcome: 'Not quite — Students often believe railways were an unambiguous "modernising gift" to India because they.', reveals: 'railways-were-an-unambiguous-modernising' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_010', title: 'The Nationalist Response to Colonialism: Swadeshi and Economic Nationalism',
          caseStudy: { intro: 'Imagine you are a student in 1905 Bengal: the British have just partitioned your province, and leaders ask you to burn foreign cloth and buy only Indian-made.',
            decisions: [{ prompt: 'What was the core argument of Dadabhai Naoroji\'s \'Drain of Wealth\' theory?', options: [
                { text: 'The core argument was that Britain systematically extracted India\'s economic surplus', outcome: 'The core argument was that Britain systematically extracted India\'s economic surplus (through home.' },
                { text: 'the British stole gold', outcome: 'Not quite — Students often think Swadeshi was only about spinning khadi (Gandhi\'s later version) and miss its.', reveals: 'swadeshi-was-only-about-spinning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_011', title: 'Structural Change After Independence: Planning, Mixed Economy and the Public Sector',
          caseStudy: { intro: 'Imagine you are a policymaker in 1950, inheriting an economy where colonial rule deliberately stifled heavy industry and left 80% of the workforce.',
            decisions: [{ prompt: 'What was the primary objective of India\'s First Five-Year Plan (1951–56)?', options: [
                { text: 'The First Five-Year Plan prioritized agricultural development, irrigation, and power', outcome: 'The First Five-Year Plan prioritized agricultural development, irrigation, and power projects.' },
                { text: 'rapid industrialization', outcome: 'Not quite — Students often believe the "mixed economy" meant a 50-50 partnership between public and private.', reveals: 'the-mixed-economy-meant-a' },
                { text: 'heavy industry', outcome: 'Not quite — Students often believe the "mixed economy" meant a 50-50 partnership between public and private.', reveals: 'the-mixed-economy-meant-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate speech argues \'colonialism modernised India — railways, ports and cities like Bombay prove the British developed the country.\'',
            decisions: [{ prompt: 'What does colonial capitalism analysis say those ports and rails were for?', options: [
                { text: 'Extraction infrastructure — ports linked the Indian periphery to the British core for raw-material export and manufactured-goods import, which is why Bombay grew while Surat and Dhaka declined; the same industrialisation that built Britain\'s mills dismantled India\'s through one-way tariff policy.', outcome: 'The chapter\'s reframing: \'modern\' features were engineered to serve British accumulation — judging them as development mistakes the function for the intent.' },
                { text: 'The speech stands — railways move people and goods, so they developed India regardless of motive.', outcome: 'Function followed extraction — the routes ran to ports, not inland markets; the paradox the chapter names is that the same process modernised Britain and deindustrialised India.', reveals: 'infrastructure-equals-development' },
                { text: 'Both happened — colonialism just modernised and exploited equally, a wash.', outcome: 'The two weren\'t parallel effects — the extraction IS what produced the distorted shape: artisan collapse, cash-crop forcing, port enclaves; \'equal and opposite\' reads a one-directional restructuring as a balanced ledger.', reveals: 'it-was-a-wash' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue why the railways \'modernised\' India in exactly the direction Britain\'s economy needed — and why Indian democracy grew against colonialism, not from it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_007', difficulty: 'standard',
          question: 'The colonial administration refers to the bureaucratic, policing, and judicial.',
          hint: 'Revisit c11_soc_cbse_09_011 (Weber\'s bureaucracy) and c11_soc_cbse_03_008 (State and.',
          misconception: 'Students often think the ICS was "meritocratic" because of the competitive exam, and therefore "fair." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The colonial administration refers to the bureaucratic, policing, and judicial machinery',
                  options: ['The colonial administration refers to the bureaucratic, policing, and judicial machinery', 'Colonialism is a system of domination where a capitalist country establishes political,', 'Colonial capitalism refers to the specific form of capitalist penetration where British', 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue'],
                  hint: 'Revisit c11_soc_cbse_09_011 (Weber\'s bureaucracy) and c11_soc_cbse_03_008 (State and authority.',
                  misconception: 'Students often think the ICS was "meritocratic" because of the competitive exam, and therefore "fair." In reality, the exam was held only.' }
          ],
            remediations: { 'the-ics-was-meritocratic-because': { steps: ['If a student equates competitive exam with meritocracy, ask: "Where was the exam held?', 'How many Indians actually passed before 1922?" Have them calculate: exam in London + age 23 + Greek/Latin requirement.', 'Then show the 1912 Islington Commission recommendation (25% Indian quota) and the 1919 Montagu-Chelmsford reforms\' slow.', 'Finally, connect to the post-independence continuation of the ICS as the IAS — same structure, new recruits — to show.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the ICS was "meritocratic" because of the competitive exam, and therefore "fair." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Indian Penal Code (1860) was a progressive measure because it replaced arbitrary indigenous punishments with a uniform, written legal.', answer: 'The claim is partially true but misleading',
                  options: ['The claim is partially true but misleading', 'meritocratic', 'Indianisation', 'the ICS was "meritocratic"'],
                  hint: 'Revisit c11_soc_cbse_09_011 (Weber\'s bureaucracy) and c11_soc_cbse_03_008 (State and authority.',
                  misconception: 'Students often think the ICS was "meritocratic" because of the competitive exam, and therefore "fair." In reality, the exam was held only.' }
          ],
            remediations: { 'the-ics-was-meritocratic-because': { steps: ['If a student equates competitive exam with meritocracy, ask: "Where was the exam held?', 'How many Indians actually passed before 1922?" Have them calculate: exam in London + age 23 + Greek/Latin requirement.', 'Then show the 1912 Islington Commission recommendation (25% Indian quota) and the 1919 Montagu-Chelmsford reforms\' slow.', 'Finally, connect to the post-independence continuation of the ICS as the IAS — same structure, new recruits — to show.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_008', difficulty: 'standard',
          question: 'The English Education System introduced through Macaulay\'s Minute (1835) was.',
          hint: 'Revisit c12_soc_cbse_08_001 (Colonialism and Its Impact) Section 1.1 "Understanding.',
          misconception: 'Students treat Macaulay\'s Minute as *either* a "modernising gift" (English gave us global competitiveness) *or*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The English Education System introduced through Macaulay\'s Minute (1835) was a colonial',
                  options: ['The English Education System introduced through Macaulay\'s Minute (1835) was a colonial', 'Colonialism is a system of domination where a capitalist country establishes political,', 'Colonial capitalism refers to the specific form of capitalist penetration where British', 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue'],
                  hint: 'Revisit c12_soc_cbse_08_001 (Colonialism and Its Impact) Section 1.1 "Understanding Colonialism".',
                  misconception: 'Students treat Macaulay\'s Minute as *either* a "modernising gift" (English gave us global competitiveness) *or* a "colonial imposition" (it.' }
          ],
            remediations: { 'students-treat-macaulay-s-minute': { steps: ['Re-read NCERT Box 1.3 (Mukerjee quote) and Box 1.1 (indentured labour) — identify *three* groups affected differently.', 'Map a 2x2 matrix: Groups (Upper-caste elites / Dalits / Artisans / Peasants) × Outcomes (Gained status / Lost status.', 'Write one paragraph explaining why the *same* policy (English education) produced *different* results for each group.', 'Re-attempt Diagnostic Question 4 with this matrix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_009', difficulty: 'standard',
          question: 'The impact of railways on Indian society and economy refers to the profound and.',
          hint: 'If stuck, re-read the section on \'Colonial Capitalism\' in node c12_soc_cbse_08_002.',
          misconception: 'Students often believe railways were an unambiguous "modernising gift" to India because they introduced speed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The impact of railways on Indian society and economy refers to the profound and',
                  options: ['The impact of railways on Indian society and economy refers to the profound and', 'Colonialism is a system of domination where a capitalist country establishes political,', 'Colonial capitalism refers to the specific form of capitalist penetration where British', 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue'],
                  hint: 'If stuck, re-read the section on \'Colonial Capitalism\' in node c12_soc_cbse_08_002, focusing on the.',
                  misconception: 'Students often believe railways were an unambiguous "modernising gift" to India because they introduced speed, connectivity, and.' }
          ],
            remediations: { 'railways-were-an-unambiguous-modernising': { steps: ['If the student holds the "modernising gift" misconception, take these steps: (1) Revisit node c12_soc_cbse_08_002.', '(2) Examine the "guarantee system" — British investors received 5% guaranteed return from Indian revenues regardless.', '(3) Contrast the radial railway map (all lines to ports) with a hypothetical grid network that would have integrated.', '(4) Re-attempt Diagnostic Question 3 with the freight-rate lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_010', difficulty: 'standard',
          question: 'The Swadeshi movement was a nationalist economic strategy that advocated for.',
          hint: 'If stuck, revisit node c12_soc_cbse_08_004 (deindustrialisation) and the \'drain theory\'.',
          misconception: 'Students often think Swadeshi was only about spinning khadi (Gandhi\'s later version) and miss its 1905-1911 phase as.',
          parts: [
                { id: 'a', prompt: 'Explain why the Swadeshi movement used the boycott of British goods as its primary tactic, rather than petitioning the British Parliament like the earlier.', answer: 'The Moderates\' petitions failed',
                  options: ['The Moderates\' petitions failed', 'boycott was more emotional'],
                  hint: 'If stuck, revisit node c12_soc_cbse_08_004 (deindustrialisation) and the \'drain theory\' summary.',
                  misconception: 'Students often think Swadeshi was only about spinning khadi (Gandhi\'s later version) and miss its 1905-1911 phase as a modern industrial.' }
          ],
            remediations: { 'swadeshi-was-only-about-spinning': { steps: ['If the student conflates the two Swadeshi phases, have them: (1) Create a two-column table: Column A = 1905 Swadeshi.', '(2) Read the NCERT Box 1.3 (Mukherjee quote) and identify which phase it describes.', '(3) Re-answer Diagnostic Question 2 distinguishing the two phases.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_011', difficulty: 'standard',
          question: 'Structural change after independence refers to the deliberate, state-led.',
          hint: 'If stuck, revisit the contrast between colonial tea plantations (extractive.',
          misconception: 'Students often believe the "mixed economy" meant a 50-50 partnership between public and private sectors across all.',
          parts: [
                { id: 'a', prompt: 'Explain why India adopted a mixed economy model after independence instead of pure capitalism or state socialism.', answer: 'India chose a mixed economy',
                  options: ['India chose a mixed economy', 'ideological compromise', 'copying the USSR', 'mixed economy'],
                  hint: 'If stuck, revisit the contrast between colonial tea plantations (extractive, foreign-owned.',
                  misconception: 'Students often believe the "mixed economy" meant a 50-50 partnership between public and private sectors across all industries.' }
          ],
            remediations: { 'the-mixed-economy-meant-a': { steps: ['If a student holds this misconception, have them: (1) Draw a three-column table of Schedules A, B, C with 3 examples.', '(2) Identify which schedule their father\'s/grandfather\'s workplace would have fallen under in 1960.', '(3) Read the 1956 Resolution\'s preamble: "The State will progressively assume a predominant and direct responsibility.', 'The remediation must be anchored in the legal text, not general descriptions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
