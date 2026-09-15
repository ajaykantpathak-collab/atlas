import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch10_p1: SimDef = {
    id: 'v3_c11_soc_ch10_p1',
    title: 'Indian Sociologists · Part 1/2',
    subtitle: 'Discover the discipline built by necessity, not just by ideas.',
    classLevel: 11, subject: 'sociology', topic: 'Indian Sociologists · Part 1/2',
    chapters: ['c11_soc_ch10'],
    nodeIds: ['c11_soc_cbse_10_001', 'c11_soc_cbse_10_002', 'c11_soc_cbse_10_003', 'c11_soc_cbse_10_004', 'c11_soc_cbse_10_005', 'c11_soc_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist of how Indian sociology was actually assembled', intro: 'Great thinkers get the credit — but syllabi, journals and colonial survey budgets did the building.', goal: 'Explain how institutions and the colonial context shaped Indian sociology\'s questions.' },
    discovery: {
        question: 'Sociology and social anthropology merged in Indian universities because the theories had converged — an intellectual marriage?',
        options: ['Mostly an administrative compromise — resource scarcity and colonial funding structures forced the departments together', 'Yes — the theories naturally united', 'Yes — Ghurye designed it as theory', 'No — they never actually merged'],
        answer: 'Mostly an administrative compromise — resource scarcity and colonial funding structures forced the departments together',
        hook: 'The discipline was built by improvisation: Ghurye\'s 35-year headship controlled appointments and journals; Calcutta\'s anthropology existed because the colonial state needed ethnographic surveys.',
    },
    teaching: [
        { title: 'Origin and Institutional History of Sociology in India: Bombay and Calcutta Departments', text: 'The institutional history of sociology in India refers to the formal establishment and development of university departments, research centres, and professional associations that transformed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weigh A.R. Desai\'s Marxist lens against Ghurye\'s diffusionism for reading post-independence India — using the three dilemmas the colonial context created.',
        labels: ['Origin and Institutional History', 'Colonial Context and', 'Accidental Pioneers: L.K. Ananthakrishna', 'G.S. Ghurye: Founder', 'Ghurye\'s Definition of Caste', 'The Tribal Protectionist'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_001', title: 'Origin and Institutional History of Sociology in India: Bombay and Calcutta Departments',
          caseStudy: { intro: 'Imagine you are a student in 1919 Bombay: sociology doesn\'t exist as a subject in any Indian university, yet the University of Bombay just created India\'s.',
            decisions: [{ prompt: 'In which year and at which university was the first formal postgraduate department of sociology established in India, and who was its.', options: [
                { text: 'The first formal postgraduate department of sociology in India was established in 1919 at', outcome: 'The first formal postgraduate department of sociology in India was established in 1919 at the.' },
                { text: 'great thinkers', outcome: 'Not quite — Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and.', reveals: 'indian-sociology-began-with-great' },
                { text: 'trinity', outcome: 'Not quite — Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and.', reveals: 'indian-sociology-began-with-great' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_002', title: 'Colonial Context and the Specificity of Indian Modernity',
          caseStudy: { intro: 'Imagine you are a university student in 1920s Bombay, told to study "sociology" — a new subject imported from Europe to understand modern society.',
            decisions: [{ prompt: 'What is the fundamental difference between the emergence of modernity in Western Europe and its emergence in colonial India, as stated.', options: [
                { text: 'In Western Europe, modernity emerged endogenously through industrialisation,', outcome: 'In Western Europe, modernity emerged endogenously through industrialisation, urbanisation, and the.' },
                { text: 'modernity came later to India', outcome: 'Not quite — Students often think "colonial context" means only that British rule was bad or exploitative, and.', reveals: 'colonial-context-means-only-that' },
                { text: 'India lacked industry', outcome: 'Not quite — Students often think "colonial context" means only that British rule was bad or exploitative, and.', reveals: 'colonial-context-means-only-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_004', title: 'G.S. Ghurye: Founder of Institutionalised Sociology in India and Diffusionism',
          caseStudy: { intro: 'Imagine you are the first person trying to build a sociology department in an Indian university in the 1920s — no textbooks, no trained colleagues, no funding.',
            decisions: [{ prompt: 'What were the three specific institutional contributions G.S. Ghurye made to establish sociology as a discipline in India?', options: [
                { text: 'Ghurye\'s three institutional contributions were: (1) heading India\'s first postgraduate', outcome: 'Ghurye\'s three institutional contributions were: (1) heading India\'s first postgraduate sociology.' },
                { text: 'starting the department', outcome: 'Not quite — Students frequently believe Ghurye "supported British colonial anthropology" because he used.', reveals: 'students-frequently-believe-ghurye-supported' },
                { text: 'writing books', outcome: 'Not quite — Students frequently believe Ghurye "supported British colonial anthropology" because he used.', reveals: 'students-frequently-believe-ghurye-supported' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_005', title: 'Ghurye\'s Definition of Caste: Six Features and the Risley-Ghurye Debate on Race and Caste',
          caseStudy: { intro: 'Imagine you are watching a village wedding where the bride\'s family refuses to serve food to the groom\'s relatives because they belong to a different caste.',
            decisions: [{ prompt: 'State Ghurye\'s six features of caste in the correct order as presented in *Caste and Race in India*, using the exact terminology from the.', options: [
                { text: 'The six features in order: (i) Segmental division', outcome: 'The six features in order: (i) Segmental division — caste divided into closed, mutually exclusive.' },
                { text: 'segmental', outcome: 'Not quite — Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory.', reveals: 'students-conflate-ghurye-s-definition' },
                { text: 'endogamy', outcome: 'Not quite — Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory.', reveals: 'students-conflate-ghurye-s-definition' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_006', title: 'The Tribal Protectionist vs Assimilationist Debate in Colonial India',
          caseStudy: { intro: 'Imagine you\'re a district collector in 1940s central India: a mining company wants to lease land inhabited by a tribal community that practices shifting.',
            decisions: [{ prompt: 'What was Verrier Elwin\'s central argument as a Protectionist regarding tribal communities in colonial India, and what specific policy.', options: [
                { text: 'Verrier Elwin argued that tribal communities were culturally distinct "primitive" peoples', outcome: 'Verrier Elwin argued that tribal communities were culturally distinct "primitive" peoples with.' },
                { text: 'Elwin wanted tribes to modernize quickly', outcome: 'Not quite — Students often believe the debate was about *whether* tribes should assimilate — assuming.', reveals: 'the-debate-was-about-whether' },
                { text: 'protection', outcome: 'Not quite — Students often believe the debate was about *whether* tribes should assimilate — assuming.', reveals: 'the-debate-was-about-whether' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Preparing a history-of-the-discipline talk, a student says: \'Indian sociology began with great thinkers — Ghurye, Srinivas — and their ideas.\' And \'colonial context just means British rule was bad; our sociology is a nationalist reaction.\'',
            decisions: [{ prompt: 'What does institutional and colonial history actually show?', options: [
                { text: 'Rebuild it structurally: the discipline was forged administratively — Bombay\'s 1919 department under Ghurye\'s 35-year control of appointments and the Sociological Bulletin; Calcutta\'s anthropology funded by colonial ethnographic surveys; Lucknow\'s merged department because a VC refused a separate chair. And colonial context isn\'t just grievance: it posed structural dilemmas — Ghurye\'s \'backward Hindus\' was a methodological counter to colonial anthropometry using indigenous texts, and Mukerji\'s \'tradition\' theorised endogenous change, not conservatism.', outcome: 'The talk gains its real story: Indian sociology\'s shape — merged disciplines, village studies, Indology — was made in budgets and chairs, and its theory answered epistemic problems, not just political ones.' },
                { text: 'Keep the great-thinkers account — disciplines begin with ideas, not offices.', outcome: 'Institutional history shaped what ideas could be made: who was hired, funded and housed determined the discipline\'s form as much as any theory.', reveals: 'ideas-not-institutions' },
                { text: 'Keep the reaction framing — colonialism was bad, so sociology opposed it.', outcome: 'Reaction reduces epistemology to politics: the colonial context demanded theoretical innovation about evidence and categories — not just nationalist sentiment.', reveals: 'sociology-as-mere-reaction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Colonialism wasn\'t just the villain — it set the questions: what is a colony\'s sociology for, and who is the anthropologist\'s \'primitive\' inside a civilisation?',
            decisions: [{ prompt: 'What comes next? Indian Sociologists · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Indian Sociologists · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_001', difficulty: 'standard',
          question: 'The institutional history of sociology in India refers to the formal.',
          hint: 'Revisit c10_hist_cbse_03_003 (colonial economic impact) and c10_civ_cbse_02_004.',
          misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*.',
          parts: [
                { id: 'a', prompt: 'Explain why the University of Calcutta\'s early association with sociology was through an anthropology department rather than a sociology department, and how.', answer: 'Calcutta\'s first engagement was through anthropology',
                  options: ['Calcutta\'s first engagement was through anthropology', 'tribal/native', 'modern/civilised', 'great thinkers'],
                  hint: 'Revisit c10_hist_cbse_03_003 (colonial economic impact) and c10_civ_cbse_02_004 (federalism.',
                  misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*, overlooking that the.' }
          ],
            remediations: { 'indian-sociology-began-with-great': { steps: ['If a student conflates the three centres or treats disciplinary labels as neutral: 1.', '**Draw a three-column table** on board: Column headers = Bombay / Calcutta / Lucknow.', 'Rows = Year founded / Disciplinary label / Founding figure / Funding source / Intellectual orientation.', '**Fill Bombay row together**: 1919 / Sociology / Ghurye / University scholarship + minimal state grant / Indological.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The merger of sociology and social anthropology into a single composite discipline in Indian universities was an intellectual choice.', answer: 'The claim is **largely false**',
                  options: ['The claim is **largely false**', 'Sociology', 'great thinkers', 'trinity'],
                  hint: 'Revisit c10_hist_cbse_03_003 (colonial economic impact) and c10_civ_cbse_02_004 (federalism.',
                  misconception: 'Students often believe Indian sociology began with "great thinkers" (Ghurye, Srinivas, etc.) and their *ideas*, overlooking that the.' }
          ],
            remediations: { 'indian-sociology-began-with-great': { steps: ['If a student conflates the three centres or treats disciplinary labels as neutral: 1.', '**Draw a three-column table** on board: Column headers = Bombay / Calcutta / Lucknow.', 'Rows = Year founded / Disciplinary label / Founding figure / Funding source / Intellectual orientation.', '**Fill Bombay row together**: 1919 / Sociology / Ghurye / University scholarship + minimal state grant / Indological.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_002', difficulty: 'standard',
          question: 'The colonial context of Indian modernity refers to the historical condition.',
          hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_10 (Social and.',
          misconception: 'Students often think "colonial context" means only that British rule was bad or exploitative, and therefore Indian.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between the emergence of modernity in Western Europe and its emergence in colonial India, as stated in the NCERT text?', answer: 'In Western Europe, modernity emerged endogenously through industrialisation,',
                  options: ['In Western Europe, modernity emerged endogenously through industrialisation,', 'modernity came later to India', 'India lacked industry', 'reaction against colonialism'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_10 (Social and Cultural.',
                  misconception: 'Students often think "colonial context" means only that British rule was bad or exploitative, and therefore Indian sociology is just.' }
          ],
            remediations: { 'colonial-context-means-only-that': { steps: ['If the student holds this misconception, do not say "read again." Instead: (1) Have them re-read the three paragraphs.', '(2) Ask: "For each question, what *theoretical* problem does it pose — not what political feeling?" (3) Give.', 'Ghurye accepted the data but rejected the *average* as proof, showing *variation within groups*.', 'Is this nationalism or methodology?" (4) Assign: Write one sentence per sociologist naming the *concept* they invented.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_003', difficulty: 'standard',
          question: 'Accidental Pioneers refers to scholars like L.K. Ananthakrishna Iyer and Sarat.',
          hint: 'Revisit c11_soc_cbse_10_002\'s section on "colonial context and specificity of Indian.',
          misconception: 'Students often think \'accidental\' means Iyer and Roy lacked scholarly rigour or were merely lucky amateurs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Accidental Pioneers refers to scholars like L.K',
                  options: ['Accidental Pioneers refers to scholars like L.K', 'The institutional history of sociology in India refers to the formal establishment and', 'The colonial context of Indian modernity refers to the historical condition where India\'s', 'Ghurye\'s definition of caste identifies six structural features: (1) segmental division'],
                  hint: 'Revisit c11_soc_cbse_10_002\'s section on "colonial context and specificity of Indian modernity" and.',
                  misconception: 'Students often think \'accidental\' means Iyer and Roy lacked scholarly rigour or were merely lucky amateurs.' }
          ],
            remediations: { 'accidental-means-iyer-and-roy': { steps: ['If a student holds this misconception, have them compare: (1) The table of contents of Iyer\'s *The Cochin Tribes and.', '(2) Roy\'s *The Oraons of Chhotanagpur* with a contemporary legal anthropology article — identify his use of verbatim.', 'Then ask: "Which parts could only be done by someone living the reality daily?" This demonstrates that professional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_004', difficulty: 'standard',
          question: 'G.S. Ghurye (1893–1983) is the founder of institutionalised sociology in India.',
          hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity).',
          misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ghurye completely rejected Herbert Risley\'s racial theory of caste because he was a nationalist." Using evidence from Ghurye\'s actual.', answer: 'The claim is partially correct but oversimplified',
                  options: ['The claim is partially correct but oversimplified', 'Ghurye rejected Risley entirely', 'Ghurye agreed with Risley completely'],
                  hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity) — focus.',
                  misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied caste/race — missing.' },
                { id: 'b', prompt: 'Compare and contrast Ghurye\'s assimilationist position on tribal policy with Verrier Elwin\'s protectionist position.', answer: 'Ghurye (assimilationist): Tribes are "backward Hindus"',
                  options: ['Ghurye (assimilationist): Tribes are "backward Hindus"', 'Ghurye wanted tribes to become Hindu, Elwin wanted them left alone'],
                  hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity) — focus.',
                  misconception: 'Students frequently believe Ghurye "supported British colonial anthropology" because he used anthropometry and studied caste/race — missing.' }
          ],
            remediations: { 'students-frequently-believe-ghurye-supported': { steps: ['If the student holds this misconception: (1) Have them re-read Ghurye\'s exact words: "Risley\'s thesis...', 'was broadly true only for northern India" — highlight the regional qualification.', '(2) Map the intellectual genealogy: Rivers (diffusionism) → Ghurye → "tribes as backward Hindus" → nationalist.', 'Contrast with: British admin-anthropologists → "tribes as primitive isolates" → protectionist policy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_005', difficulty: 'standard',
          question: 'Ghurye\'s definition of caste identifies six structural features: (1) segmental.',
          hint: 'Revisit Class 11 Introducing Sociology Chapter 3 "Understanding Social Institutions".',
          misconception: 'Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory of caste origin*.',
          parts: [
                { id: 'a', prompt: 'State Ghurye\'s six features of caste in the correct order as presented in *Caste and Race in India*, using the exact terminology from the NCERT text (e.g.', answer: 'The six features in order: (i) Segmental division',
                  options: ['The six features in order: (i) Segmental division', 'segmental', 'endogamy', 'exogamy'],
                  hint: 'Revisit Class 11 Introducing Sociology Chapter 3 "Understanding Social Institutions" — specifically.',
                  misconception: 'Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory of caste origin* (racial theory), treating.' },
                { id: 'b', prompt: 'Explain in your own words why Ghurye argued that Risley\'s racial theory of caste origin was "broadly true only for northern India" and what this implies about.', answer: 'Ghurye accepted Risley\'s anthropometric data showing upper castes approximating',
                  options: ['Ghurye accepted Risley\'s anthropometric data showing upper castes approximating', 'Ghurye rejected Risley completely', 'Ghurye agreed everywhere', 'Ghurye\'s six features prove caste is racial'],
                  hint: 'Revisit Class 11 Introducing Sociology Chapter 3 "Understanding Social Institutions" — specifically.',
                  misconception: 'Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory of caste origin* (racial theory), treating.' },
                { id: 'c', prompt: 'A sociologist studies a contemporary urban housing society where residents claim "caste doesn\'t matter" but the managing committee unanimously rejects a Dalit.', answer: 'Operating: (i) Segmental division',
                  options: ['Operating: (i) Segmental division', 'caste is absent', 'Ghurye\'s six features prove caste is racial'],
                  hint: 'Revisit Class 11 Introducing Sociology Chapter 3 "Understanding Social Institutions" — specifically.',
                  misconception: 'Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory of caste origin* (racial theory), treating.' },
                { id: 'd', prompt: 'Compare Ghurye\'s and Risley\'s positions on the origin of caste. Then evaluate: does Ghurye\'s regional qualification (North India vs.', answer: 'Risley: Caste originated in race',
                  options: ['Risley: Caste originated in race', 'supporter', 'Ghurye\'s six features prove caste is racial'],
                  hint: 'Revisit Class 11 Introducing Sociology Chapter 3 "Understanding Social Institutions" — specifically.',
                  misconception: 'Students conflate Ghurye\'s *definition* of caste (six structural features) with Risley\'s *theory of caste origin* (racial theory), treating.' }
          ],
            remediations: { 'students-conflate-ghurye-s-definition': { steps: ['Ask the student to draw a two-column table — left column "Risley\'s Claim," right column "Ghurye\'s Response." Fill.', 'Highlight the sentence "Ghurye believed that Risley\'s thesis...', 'Give a map of India — shade the Indo-Gangetic plain. Explain: "Risley\'s data works *here*; Ghurye says elsewhere, the.', 'Re-read the six features — none mention race. Ask: "Where is race in the definition?" This visual-separation method.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_006', difficulty: 'standard',
          question: 'The Tribal Protectionist vs Assimilationist Debate refers to the 1930s-1940s.',
          hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context) and c11_soc_cbse_10_003 (Accidental.',
          misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes.',
          parts: [
                { id: 'a', prompt: 'A tribal community in 1940s Bastar practices shifting cultivation, worships a mother goddess, and has clan exogamy.', answer: 'Protectionist prediction: Excluded status preserves cultural autonomy',
                  options: ['Protectionist prediction: Excluded status preserves cultural autonomy', 'Both sides agree exploitation will happen'],
                  hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context) and c11_soc_cbse_10_003 (Accidental Pioneers).',
                  misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes to remain "pure".' },
                { id: 'b', prompt: 'Compare the Protectionist and Assimilationist views on the *cause* of tribal backwardness. How does each side\'s diagnosis shape their prescribed remedy?', answer: 'Protectionists (Elwin) diagnosed backwardness as caused by *external contact*',
                  options: ['Protectionists (Elwin) diagnosed backwardness as caused by *external contact*', 'Both blame British rule'],
                  hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context) and c11_soc_cbse_10_003 (Accidental Pioneers).',
                  misconception: 'Students often believe the debate was about *whether* tribes should assimilate — assuming Protectionists wanted tribes to remain "pure".' }
          ],
            remediations: { 'the-debate-was-about-whether': { steps: ['If a student conflates the debate with "preserve culture vs.', 'destroy culture": Step 1 — Have them re-read Ghurye\'s exact phrase: "tribes were hardly ever isolated primitive.', 'involved in constant interactions with Hinduism over a long period." Step 2 — Ask: "If tribes were already interacting.', 'Step 3 — Contrast with a contemporary parallel: "Does the Forest Rights Act 2006 stop tribal-Hindu interaction, or stop.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
