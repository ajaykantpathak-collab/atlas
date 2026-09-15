import type { SimDef } from '../../engine/types';
import C11_SociologyIndianSociologistsSim from '../../../simulations/c6_12/C11_SociologyIndianSociologistsSim';

/** v3 wrapped master — C11_SociologyIndianSociologistsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologyindiansociologistssim: SimDef = {
    id: 'v3w_c11_sociologyindiansociologistssim',
    title: 'Indian Sociologists',
    subtitle: 'This node covers the origin and early institutional history (1919-1950s) of sociology.',
    classLevel: 11, subject: 'sociology', topic: 'Origin and Institutional History of Sociology in India: Bombay and Calcutta Departments',
    chapters: [],
    nodeIds: ['c11_soc_cbse_10_001', 'c11_soc_cbse_10_002', 'c11_soc_cbse_10_003', 'c11_soc_cbse_10_004', 'c11_soc_cbse_10_006', 'c11_soc_cbse_10_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a student in 1919 Bombay: sociology doesn\'t exist as a subject in any Indian university, yet.', goal: 'Master Indian Sociologists.' },
    discovery: {
        question: 'Explain why the University of Calcutta\'s early association with sociology was through an anthropology department rather than a sociology department, and how.',
        options: ['Calcutta\'s first engagement was through anthropology', 'tribal/native', 'modern/civilised'],
        answer: 'Calcutta\'s first engagement was through anthropology',
        hook: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*,.',
    },
    teaching: [
        { title: 'The institutional history of sociology in.', text: 'The institutional history of sociology in India refers to the formal establishment and development of university departments, research centres, and professional associations that transformed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_10_001', title: 'The institutional history of sociology.',
          scaffold: { problem: 'A research scholar in 2024 wants to trace how the *physical infrastructure* of the Bombay Sociology Department (library, fieldwork funds,.',
            steps: [
            { text: 'Identify Ghurye\'s initial resource base (1919) — University of Bombay scholarship for training abroad (LSE, Cambridge);.' },
            { text: 'Note the first institutional output (1923) — PhD submitted under Haddon/Rivers; manuscript *Caste and Race in India*.' },
            { text: 'Track the appointment (1924) — Returned as Reader and Head; 35-year tenure begins.' },
            { text: 'Map the structural innovation (1936) — Launched PhD programme; first Indian sociology PhD awarded (G.R. Pradhan).' },
            { text: 'Identify the professional consolidation (1951-52) — Founded Indian Sociological Society (1951) as founding President;.' },
            { text: 'Synthesise the strategy — Ghurye used: (a) foreign training for legitimacy, (b) headship for administrative control,.', faded: true, blankAnswer: 'Ghurye\'s 6-step strategy: (1) Foreign scholarship (1919) →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_10_002', title: 'The colonial context of Indian.',
          scaffold: { problem: 'A board exam question asks: "Explain how the colonial context shaped the debate between Verrier Elwin and G.S. Ghurye on tribal policy.',
            steps: [
            { text: 'Define \'colonial specificity\' in one sentence: Indian modernity emerged through colonial subjugation, not endogenous.' },
            { text: 'Identify the colonial policy context: British administrators created \'excluded/partially excluded areas\' for tribes,.' },
            { text: 'State Elwin\'s protectionist position: As a British anthropologist-administrator, he argued tribes had distinct cultures.' },
            { text: 'State Ghurye\'s nationalist position: Using textual/historical evidence, he argued tribes were \'backward Hindus\' long.' },
            { text: 'Synthesise using colonial specificity: The debate was not just academic — it was about whether the colonial state\'s.', faded: true, blankAnswer: 'Colonial specificity means India\'s modernity was shaped by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_10_003', title: 'Accidental Pioneers refers to scholars.',
          scaffold: { problem: 'A Class 11 student is asked: "L.K. Ananthakrishna Iyer had no degree in anthropology.',
            steps: [
            { text: 'Identify Iyer\'s starting position in 1902 — college teacher at Maharajah\'s College, Ernakulam, Cochin state, with no.' },
            { text: 'Note the external trigger — Dewan of Cochin requests assistance for ethnographic survey (British wanted similar surveys.' },
            { text: 'Analyse the nature of his engagement — voluntary, unpaid Superintendent of Ethnography on weekends while teaching.' },
            { text: 'Track the recognition chain — British anthropologists/administrators appreciated his work → invited for Mysore state.' },
            { text: 'Note the honours that legitimised him — President, Ethnology section, Indian Science Congress; honorary doctorate from.' },
            { text: 'Synthesise — the bridge was *sustained, high-quality ethnographic output* produced within colonial administrative.', faded: true, blankAnswer: 'Iyer moved from voluntary ethnographic surveyor for Cochin.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_10_004', title: 'G.S. Ghurye (1893–1983) is the founder.',
          scaffold: { problem: 'A board exam question asks: "Ghurye is called the founder of institutionalised sociology in India.',
            steps: [
            { text: 'Identify the three institutional contributions from the textbook — (a) heading Bombay University\'s sociology department.' },
            { text: 'For each contribution, articulate the specific disciplinary gap it filled in the 1920s–1950s context: (a) Department →.' },
            { text: 'Connect to the textbook\'s emphasis on "combining teaching and research" and "merger of social anthropology and.' },
            { text: 'Explain why this was necessary: without these, sociology would remain amateur (like Iyer/Roy), fragmented across.' },
            { text: 'Synthesise: Ghurye\'s contributions created the "reproductive structure" of the discipline — training students who.', faded: true, blankAnswer: 'Ghurye founded institutionalised sociology through: (1).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_10_006', title: 'The Tribal Protectionist vs.',
          scaffold: { problem: 'A 1941 government report states: "The Baiga tribe of Central Provinces practices bewar (shifting cultivation) and worships Budha Deo.',
            steps: [
            { text: 'Identify the Protectionist position — the District Officer invokes Elwin\'s logic: Baigas are culturally distinct.' },
            { text: 'Identify the Assimilationist position — Congress Committee invokes Ghurye\'s logic: Baigas are "backward Hindus" (Budha.' },
            { text: 'Analyze the empirical claim — Ghurye would demand evidence: Do Baigas share kinship terms, deities, or clan rules with.' },
            { text: 'Evaluate the synthesis — A 1940s synthesis might be: Extend tenancy laws *within* a modified Excluded Area (legal.' },
            { text: 'Assess long-term consequence — Full exclusion risks creating a "museum" (Ghurye\'s critique); full assimilation risks.', faded: true, blankAnswer: 'Policy Memo: The District Officer\'s Excluded Area proposal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_10_007', title: 'D.P. Mukerji\'s concept of \'living.',
          scaffold: { problem: 'A village in Tamil Nadu has a 300-year-old tradition of a folk deity festival (Ayyanar) where only men from the dominant caste perform the.',
            steps: [
            { text: 'Identify the shruti element — the core myth of Ayyanar as protector, recited in Sanskrit verses unchanged for centuries.' },
            { text: 'Identify the smriti element — the customary rule \'only dominant-caste men dance\', transmitted orally and enforced by.' },
            { text: 'Identify the anubhava trigger — the shared experience of drought (collective anxiety) across castes/genders,.' },
            { text: 'Show generalization — the demand came from women\'s collective (not one woman), making it generalized anubhava.' },
            { text: 'Trace the smriti modification — elders\' acceptance creates a new customary rule \'women may dance in crisis years\', a.' },
            { text: 'Verify living tradition — the core myth (shruti) remains, the customary practice (smriti) adapted via collective.', faded: true, blankAnswer: 'Shruti = Ayyanar protector myth; Smriti (old) = male-only.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Indian Sociologists', spots: [
            { id: 's1', label: 'The institutional history of sociology', prompt: 'Which idea is this? — The institutional history of sociology in India refers to the formal establishment and.', answer: 'The institutional history of sociology', options: ['The institutional history of sociology', 'The colonial context of Indian', 'Accidental Pioneers refers to scholars', 'GS Ghurye 18931983 is the'] },
            { id: 's2', label: 'The colonial context of Indian', prompt: 'Which idea is this? — The colonial context of Indian modernity refers to the historical condition where India\'s.', answer: 'The colonial context of Indian', options: ['The colonial context of Indian', 'The institutional history of sociology', 'Accidental Pioneers refers to scholars', 'GS Ghurye 18931983 is the'] },
            { id: 's3', label: 'Accidental Pioneers refers to scholars', prompt: 'Which idea is this? — Accidental Pioneers refers to scholars like L.K. Ananthakrishna Iyer and Sarat Chandra.', answer: 'Accidental Pioneers refers to scholars', options: ['Accidental Pioneers refers to scholars', 'The institutional history of sociology', 'The colonial context of Indian', 'GS Ghurye 18931983 is the'] },
            { id: 's4', label: 'GS Ghurye 18931983 is the', prompt: 'Which idea is this? — G.S. Ghurye (1893–1983) is the founder of institutionalised sociology in India who.', answer: 'GS Ghurye 18931983 is the', options: ['GS Ghurye 18931983 is the', 'The institutional history of sociology', 'The colonial context of Indian', 'Accidental Pioneers refers to scholars'] },
            { id: 's5', label: 'The Tribal Protectionist vs Assimilationist', prompt: 'Which idea is this? — The Tribal Protectionist vs Assimilationist Debate refers to the 1930s-1940s intellectual.', answer: 'The Tribal Protectionist vs Assimilationist', options: ['The Tribal Protectionist vs Assimilationist', 'The institutional history of sociology', 'The colonial context of Indian', 'Accidental Pioneers refers to scholars'] },
            { id: 's6', label: 'DP Mukerjis concept of living', prompt: 'Which idea is this? — D.P. Mukerji\'s concept of \'living tradition\' refers to a dynamic social process where.', answer: 'DP Mukerjis concept of living', options: ['DP Mukerjis concept of living', 'The institutional history of sociology', 'The colonial context of Indian', 'Accidental Pioneers refers to scholars'] }
          ] } }
    ],
    explore: { component: C11_SociologyIndianSociologistsSim, prompt: 'Explore the interactive — Indian Sociologists' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_001', difficulty: 'standard',
          question: 'The institutional history of sociology in India refers to the formal.',
          hint: 'Revisit c10_hist_cbse_03_003 (colonial economic impact) and c10_civ_cbse_02_004.',
          misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*,.',
          parts: [
                { id: 'a', prompt: 'Explain why the University of Calcutta\'s early association with sociology was through an anthropology department rather than a sociology department, and how.', answer: 'Calcutta\'s first engagement was through anthropology',
                  options: ['Calcutta\'s first engagement was through anthropology', 'tribal/native', 'modern/civilised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*, overlooking that the.' }
          ],
            remediations: { 'indian-sociology-began-with-great': { steps: ['If a student conflates the three centres or treats disciplinary labels as neutral: 1.', '**Draw a three-column table** on board: Column headers = Bombay / Calcutta / Lucknow.', 'Rows = Year founded / Disciplinary label / Founding figure / Funding source / Intellectual orientation.', '**Fill Bombay row together**: 1919 / Sociology / Ghurye / University scholarship + minimal state grant / Indological +.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The merger of sociology and social anthropology into a single composite discipline in Indian universities was an intellectual choice.', answer: 'The claim is **largely false**',
                  options: ['The claim is **largely false**', 'Sociology', 'great thinkers', 'trinity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*, overlooking that the.' }
          ],
            remediations: { 'indian-sociology-began-with-great': { steps: ['If a student conflates the three centres or treats disciplinary labels as neutral: 1.', '**Draw a three-column table** on board: Column headers = Bombay / Calcutta / Lucknow.', 'Rows = Year founded / Disciplinary label / Founding figure / Funding source / Intellectual orientation.', '**Fill Bombay row together**: 1919 / Sociology / Ghurye / University scholarship + minimal state grant / Indological +.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_002', difficulty: 'standard',
          question: 'The colonial context of Indian modernity refers to the historical condition.',
          hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_10 (Social and.',
          misconception: 'Students often think "colonial context" means only that British rule was bad or exploitative, and therefore Indian.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between the emergence of modernity in Western Europe and its emergence in colonial India, as stated in the NCERT text?', answer: 'In Western Europe, modernity emerged endogenously through industrialisation,',
                  options: ['In Western Europe, modernity emerged endogenously through industrialisation,', 'modernity came later to India', 'India lacked industry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "colonial context" means only that British rule was bad or exploitative, and therefore Indian sociology is just a.' }
          ],
            remediations: { 'colonial-context-means-only-that': { steps: ['If the student holds this misconception, do not say "read again." Instead: (1) Have them re-read the three paragraphs.', '(2) Ask: "For each question, what *theoretical* problem does it pose — not what political feeling?" (3) Give a.', 'Ghurye accepted the data but rejected the *average* as proof, showing *variation within groups*.', 'Is this nationalism or methodology?" (4) Assign: Write one sentence per sociologist naming the *concept* they invented.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "colonial context" means only that British rule was bad or exploitative, and therefore Indian.',
          parts: [
                { id: 'a', prompt: 'Create a conceptual diagram (describe in words) showing how the three foundational questions of Indian sociology map onto the four founding sociologists.', answer: 'A strong answer will produce a mapping like: - Q1 (Sociology in a colony →',
                  options: ['A strong answer will produce a mapping like: - Q1 (Sociology in a colony →', 'colonial context', 'reaction against colonialism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "colonial context" means only that British rule was bad or exploitative, and therefore Indian sociology is just a.' }
          ],
            remediations: { 'colonial-context-means-only-that': { steps: ['If the student holds this misconception, do not say "read again." Instead: (1) Have them re-read the three paragraphs.', '(2) Ask: "For each question, what *theoretical* problem does it pose — not what political feeling?" (3) Give a.', 'Ghurye accepted the data but rejected the *average* as proof, showing *variation within groups*.', 'Is this nationalism or methodology?" (4) Assign: Write one sentence per sociologist naming the *concept* they invented.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_003', difficulty: 'standard',
          question: 'Accidental Pioneers refers to scholars like L.K. Ananthakrishna Iyer and Sarat.',
          hint: 'Revisit c11_soc_cbse_10_002\'s section on "colonial context and specificity of Indian.',
          misconception: 'Students often think \'accidental\' means Iyer and Roy lacked scholarly rigour or were merely lucky amateurs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Accidental Pioneers refers to scholars like L.K',
                  options: ['Accidental Pioneers refers to scholars like L.K', 'The institutional history of sociology in India refers to the formal establishment and', 'The colonial context of Indian modernity refers to the historical condition where India\'s', 'The Tribal Protectionist vs Assimilationist Debate refers to the 1930s-1940s intellectual'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'accidental\' means Iyer and Roy lacked scholarly rigour or were merely lucky amateurs.' }
          ],
            remediations: { 'accidental-means-iyer-and-roy': { steps: ['If a student holds this misconception, have them compare: (1) The table of contents of Iyer\'s *The Cochin Tribes and.', '(2) Roy\'s *The Oraons of Chhotanagpur* with a contemporary legal anthropology article — identify his use of verbatim.', 'Then ask: "Which parts could only be done by someone living the reality daily?" This demonstrates that professional.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_004', difficulty: 'standard',
          question: 'G.S. Ghurye (1893–1983) is the founder of institutionalised sociology in India.',
          hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity) —.',
          misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ghurye completely rejected Herbert Risley\'s racial theory of caste because he was a nationalist." Using evidence from Ghurye\'s actual.', answer: 'The claim is partially correct but oversimplified',
                  options: ['The claim is partially correct but oversimplified', 'Ghurye rejected Risley entirely', 'Ghurye agreed with Risley completely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied caste/race — missing.' },
                { id: 'b', prompt: 'Compare and contrast Ghurye\'s assimilationist position on tribal policy with Verrier Elwin\'s protectionist position.', answer: 'Ghurye (assimilationist): Tribes are "backward Hindus"',
                  options: ['Ghurye (assimilationist): Tribes are "backward Hindus"', 'Ghurye wanted tribes to become Hindu, Elwin wanted them left alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied caste/race — missing.' }
          ],
            remediations: { 'students-frequently-believe-ghurye-supported': { steps: ['If the student holds this misconception: (1) Have them re-read Ghurye\'s exact words: "Risley\'s thesis...', 'was broadly true only for northern India" — highlight the regional qualification.', '(2) Map the intellectual genealogy: Rivers (diffusionism) → Ghurye → "tribes as backward Hindus" → nationalist.', 'Contrast with: British admin-anthropologists → "tribes as primitive isolates" → protectionist policy.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Ghurye\'s assimilationist position on tribal policy with Verrier Elwin\'s protectionist position.', answer: 'Ghurye (assimilationist): Tribes are "backward Hindus"',
                  options: ['Ghurye (assimilationist): Tribes are "backward Hindus"', 'Ghurye wanted tribes to become Hindu, Elwin wanted them left alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied caste/race — missing.' }
          ],
            remediations: { 'students-frequently-believe-ghurye-supported': { steps: ['If the student holds this misconception: (1) Have them re-read Ghurye\'s exact words: "Risley\'s thesis...', 'was broadly true only for northern India" — highlight the regional qualification.', '(2) Map the intellectual genealogy: Rivers (diffusionism) → Ghurye → "tribes as backward Hindus" → nationalist.', 'Contrast with: British admin-anthropologists → "tribes as primitive isolates" → protectionist policy.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_006', difficulty: 'standard',
          question: 'The Tribal Protectionist vs Assimilationist Debate refers to the 1930s-1940s.',
          hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context) and c11_soc_cbse_10_003 (Accidental.',
          misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes.',
          parts: [
                { id: 'a', prompt: 'A tribal community in 1940s Bastar practices shifting cultivation, worships a mother goddess, and has clan exogamy.', answer: 'Protectionist prediction: Excluded status preserves cultural autonomy',
                  options: ['Protectionist prediction: Excluded status preserves cultural autonomy', 'Both sides agree exploitation will happen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes to remain "pure".' },
                { id: 'b', prompt: 'Compare the Protectionist and Assimilationist views on the *cause* of tribal backwardness. How does each side\'s diagnosis shape their prescribed remedy?', answer: 'Protectionists (Elwin) diagnosed backwardness as caused by *external contact*',
                  options: ['Protectionists (Elwin) diagnosed backwardness as caused by *external contact*', 'Both blame British rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes to remain "pure".' }
          ],
            remediations: { 'the-debate-was-about-whether': { steps: ['If a student conflates the debate with "preserve culture vs.', 'destroy culture": Step 1 — Have them re-read Ghurye\'s exact phrase: "tribes were hardly ever isolated primitive.', 'involved in constant interactions with Hinduism over a long period." Step 2 — Ask: "If tribes were already interacting.', 'Step 3 — Contrast with a contemporary parallel: "Does the Forest Rights Act 2006 stop tribal-Hindu interaction, or stop.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes.',
          parts: [
                { id: 'a', prompt: 'Evaluate Ghurye\'s claim that "the ill-effects of assimilation were not specific to tribal cultures, but were common to all backward and downtrodden sections of.', answer: 'Yes, valid for 1940s context',
                  options: ['Yes, valid for 1940s context', 'No, tribes had unique forest rights', 'exceptionalism fallacy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes to remain "pure".' },
                { id: 'b', prompt: 'Compare the Protectionist and Assimilationist views on the *cause* of tribal backwardness. How does each side\'s diagnosis shape their prescribed remedy?', answer: 'Protectionists (Elwin) diagnosed backwardness as caused by *external contact*',
                  options: ['Protectionists (Elwin) diagnosed backwardness as caused by *external contact*', 'Both blame British rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes to remain "pure".' }
          ],
            remediations: { 'the-debate-was-about-whether': { steps: ['If a student conflates the debate with "preserve culture vs.', 'destroy culture": Step 1 — Have them re-read Ghurye\'s exact phrase: "tribes were hardly ever isolated primitive.', 'involved in constant interactions with Hinduism over a long period." Step 2 — Ask: "If tribes were already interacting.', 'Step 3 — Contrast with a contemporary parallel: "Does the Forest Rights Act 2006 stop tribal-Hindu interaction, or stop.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
