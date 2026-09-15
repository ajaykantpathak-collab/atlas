import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch14_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch14_p2: SimDef = {
    id: 'v3_c12_soc_ch14_p2',
    title: 'Mass Media and Communications · Part 2/2',
    subtitle: 'Whoever owns the tower shapes the story',
    classLevel: 12, subject: 'sociology', topic: 'Mass Media and Communications · Part 2/2',
    chapters: ['c12_soc_ch14'],
    nodeIds: ['c12_soc_cbse_14_007', 'c12_soc_cbse_14_008', 'c12_soc_cbse_14_009', 'c12_soc_cbse_14_010', 'c12_soc_cbse_14_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Media sociologist', intro: 'Every message that reaches millions passed through a structure with interests of its own.', goal: 'Define mass media\'s structural features and analyse the dialectical relationship between media and society.' },
    discovery: {
        question: 'A Bihar village rigs an FM transmitter on a bamboo pole and broadcasts folk songs and health messages to 20 km — no company, no budget, no licence. Mass media or not?',
        options: ['Yes — mass media is defined by one-to-many reach to a large anonymous audience, not by corporate scale', 'No — real mass media needs a big organisation', 'No — it\'s just loudspeakers with extra steps', 'Yes — but only because it\'s radio'],
        answer: 'Yes — mass media is defined by one-to-many reach to a large anonymous audience, not by corporate scale',
        hook: 'Media isn\'t a neutral mirror — the big organisations behind it have owners, mandates and gatekeepers who select and frame what you see. And the digital divide isn\'t about who owns a phone; it\'s about literacy, language, data costs and who in the house is allowed to hold it.',
    },
    teaching: [
        { title: 'The Role of Mass Media in a Democracy: Information, Public Sphere and the Fourth Estate', text: 'The role of mass media in a democracy encompasses three interlinked functions: (1) **Information dissemination** – providing citizens with accurate, timely, and diverse facts necessary for informed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_14_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track how All India Radio sold the Green Revolution while farmers reshaped its programmes — then test what mass media\'s institutional machinery does to the \'news\' you trust.',
        labels: ['The Role of Mass', 'Mass Media and Globalisation', 'The Digital Revolution: Internet,', 'Mass Media and Social', 'The Regulation of Mass'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_007', title: 'The Role of Mass Media in a Democracy: Information, Public Sphere and the Fourth Estate',
          caseStudy: { intro: 'Imagine you see a front-page investigative report exposing a major irrigation scam involving a state minister.',
            decisions: [{ prompt: 'State the three core democratic functions of mass media as identified in democratic theory.', options: [
                { text: 'The three core democratic functions are: (1) Information dissemination', outcome: 'The three core democratic functions are: (1) Information dissemination — providing citizens with.' },
                { text: 'news reporting', outcome: 'Not quite — **"Fourth Estate means the media is a formal, constitutionally recognized branch of government."**.', reveals: 'fourth-estate-means-the-media' },
                { text: 'entertainment', outcome: 'Not quite — **"Fourth Estate means the media is a formal, constitutionally recognized branch of government."**.', reveals: 'fourth-estate-means-the-media' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_008', title: 'Mass Media and Globalisation: Transnational Corporations and Media Conglomerates',
          caseStudy: { intro: 'Imagine you are watching a Hindi-dubbed Hollywood movie on Star Movies while your grandmother watches a Telugu serial on Gemini TV — both channels owned by the.',
            decisions: [{ prompt: 'What is the defining feature of a transnational media corporation (TNC) that distinguishes it from a national media company?', options: [
                { text: 'A transnational media corporation owns and controls media production/distribution', outcome: 'A transnational media corporation owns and controls media production/distribution facilities in two.' },
                { text: 'a company that exports films', outcome: 'Not quite — Students often think "globalisation of media = Americanisation" and write that TNCs simply impose.', reveals: 'globalisation-of-media-americanisation-and' },
                { text: 'globalisation of media = Americanisation', outcome: 'Not quite — Students often think "globalisation of media = Americanisation" and write that TNCs simply impose.', reveals: 'globalisation-of-media-americanisation-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_011', title: 'The Regulation of Mass Media: Press Council, Prasar Bharati and the Debate on Freedom',
          caseStudy: { intro: 'Imagine you read a newspaper report that a leading news channel has been fined by a government body for broadcasting unverified claims during a communal.',
            decisions: [{ prompt: 'What is the primary statutory function of the Press Council of India under the Press Council Act, 1978?', options: [
                { text: 'The Press Council of India is a quasi-judicial body mandated to preserve press freedom', outcome: 'The Press Council of India is a quasi-judicial body mandated to preserve press freedom and improve.' },
                { text: 'it can cancel a newspaper\'s registration', outcome: 'Not quite — Students often believe the Press Council of India can legally punish newspapers (impose fines.', reveals: 'the-press-council-of-india' },
                { text: 'it regulates TV channels', outcome: 'Not quite — Students often believe the Press Council of India can legally punish newspapers (impose fines.', reveals: 'the-press-council-of-india' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A media-studies student credits the 1990s explosion of Hindi and Telugu dailies purely to \'rising literacy — more readers, more papers, simple.\'',
            decisions: [{ prompt: 'What did the language-paper revolution actually run on?', options: [
                { text: 'Organisational innovation, not just literacy — district-specific editions and local ad networks served village-level demand the city-centric English press ignored; the same printing technology that once carried nationalist mobilisation now ran on market segmentation — the press is shaped by who owns it and whom it sells to.', outcome: 'The chapter\'s throughline: each phase of the press answers a different master — colonial censorship, developmental state, market discipline — and \'more readers\' alone explains none of the editions\' local engineering.' },
                { text: 'He\'s right — demand side explains it fully; supply just follows readers.', outcome: 'Literacy created possible readers, not the product — the district-daily format, hyper-local content and rural advertiser networks had to be invented; demand without that supply-side redesign produced nothing.', reveals: 'literacy-explains-it-all' },
                { text: 'The papers grew because censorship ended — free press naturally expands.', outcome: 'The post-1991 constraint isn\'t censorship but market discipline — the expansion and the infotainment tilt share one driver; \'freedom\' explains neither the format nor the commercialisation that came with it.', reveals: 'freedom-equals-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_011', title: 'You made it',
          caseStudy: { intro: 'You can now separate the institution from the process, and see media as a two-way street: it reflects society while quietly rebuilding it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_007', difficulty: 'standard',
          question: 'The role of mass media in a democracy encompasses three interlinked functions.',
          hint: 'If stuck on "public sphere" vs. "information dissemination", revisit c12_soc_cbse_14_002.',
          misconception: '**"Fourth Estate means the media is a formal, constitutionally recognized branch of government."** Students often write.',
          parts: [
                { id: 'a', prompt: 'State the three core democratic functions of mass media as identified in democratic theory.', answer: 'The three core democratic functions are: (1) Information dissemination',
                  options: ['The three core democratic functions are: (1) Information dissemination', 'news reporting', 'entertainment'],
                  hint: 'If stuck on "public sphere" vs. "information dissemination", revisit c12_soc_cbse_14_002.',
                  misconception: '**"Fourth Estate means the media is a formal, constitutionally recognized branch of government."** Students often write in board exams.' },
                { id: 'b', prompt: 'A regional language daily in a small town publishes a series of investigative reports on illegal sand mining, naming local politicians and police officers.', answer: 'The newspaper performed all three functions: (1) **Information**',
                  options: ['The newspaper performed all three functions: (1) **Information**', 'information'],
                  hint: 'If stuck on "public sphere" vs. "information dissemination", revisit c12_soc_cbse_14_002.',
                  misconception: '**"Fourth Estate means the media is a formal, constitutionally recognized branch of government."** Students often write in board exams.' }
          ],
            remediations: { 'fourth-estate-means-the-media': { steps: ['**Clarify the metaphor**: Ask the student to list the *formal* powers of the three branches (law-making.', '**Revisit the NCERT phrase**: Read aloud Nehru\'s "watchdog of democracy" (Box 7.2) and the Emergency example.', 'Ask: "If media were a formal pillar, could the government censor it so easily?" 3.', '**Re-diagnostic**: Give a one-sentence correction task: "Rewrite: \'Media is the fourth pillar of democracy\' using the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_008', difficulty: 'standard',
          question: 'Transnational corporations (TNCs) in media are large companies that own and.',
          hint: 'Revisit the "Satellite Revolution" section in node c12_soc_cbse_14_004 (Gulf War → CNN →.',
          misconception: 'Students often think "globalisation of media = Americanisation" and write that TNCs simply impose Western content.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Transnational corporations (TNCs) in media are large companies that own and control media',
                  options: ['Transnational corporations (TNCs) in media are large companies that own and control media', 'Mass media refers to the diverse array of communication technologies and institutions', 'The Print Revolution in India refers to the historical development and impact of printing', 'Radio in India evolved through three distinct phases: the colonial-era state monopoly'],
                  hint: 'Revisit the "Satellite Revolution" section in node c12_soc_cbse_14_004 (Gulf War → CNN → Star TV →.',
                  misconception: 'Students often think "globalisation of media = Americanisation" and write that TNCs simply impose Western content on passive Indian.' }
          ],
            remediations: { 'globalisation-of-media-americanisation-and': { steps: ['If a student holds the cultural imperialism misconception: (1) Ask them to list the top 5 TV channels in India.', '(2) Have them trace Star Plus\'s schedule from 1996 (English serials) to 2000 (Hindi soaps) to 2024 (Anupamaa, Ghum Hai.', '(3) Assign a mini-case: compare Dainik Jagran\'s circulation (3.92M) vs The Times of India (1.5M) — discuss why.', '(4) Re-read NCERT Box 7.8 (Eenadu) and Box 7.10 (STAR localisation) to see empirical evidence of glocalisation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "globalisation of media = Americanisation" and write that TNCs simply impose Western content.',
          parts: [
                { id: 'a', prompt: 'Critique the argument: "Globalisation has only led to cultural imperialism — Western media giants dominate Indian minds." Use evidence from the Indian language.', answer: 'The argument is incomplete',
                  options: ['The argument is incomplete', 'globalisation of media = Americanisation'],
                  hint: 'Revisit the "Satellite Revolution" section in node c12_soc_cbse_14_004 (Gulf War → CNN → Star TV →.',
                  misconception: 'Students often think "globalisation of media = Americanisation" and write that TNCs simply impose Western content on passive Indian.' },
                { id: 'b', prompt: 'Design a hypothetical media conglomerate for 2030 that integrates print, TV, radio, streaming, and events for a specific Indian linguistic region (e.g.', answer: 'content strategy, (',
                  options: ['content strategy, (', 'globalisation of media = Americanisation'],
                  hint: 'Revisit the "Satellite Revolution" section in node c12_soc_cbse_14_004 (Gulf War → CNN → Star TV →.',
                  misconception: 'Students often think "globalisation of media = Americanisation" and write that TNCs simply impose Western content on passive Indian.' }
          ],
            remediations: { 'globalisation-of-media-americanisation-and': { steps: ['If a student holds the cultural imperialism misconception: (1) Ask them to list the top 5 TV channels in India.', '(2) Have them trace Star Plus\'s schedule from 1996 (English serials) to 2000 (Hindi soaps) to 2024 (Anupamaa, Ghum Hai.', '(3) Assign a mini-case: compare Dainik Jagran\'s circulation (3.92M) vs The Times of India (1.5M) — discuss why.', '(4) Re-read NCERT Box 7.8 (Eenadu) and Box 7.10 (STAR localisation) to see empirical evidence of glocalisation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_009', difficulty: 'standard',
          question: 'The Digital Revolution refers to the transformative shift from analog and.',
          hint: 'Revisit c12_soc_cbse_14_004 (Television: Doordarshan to Satellite) for the pre-digital.',
          misconception: 'Students equate \'digital revolution\' with \'universal internet access\' and assume digitisation automatically empowers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Digital Revolution refers to the transformative shift from analog and mechanical',
                  options: ['The Digital Revolution refers to the transformative shift from analog and mechanical', 'Mass media refers to the diverse array of communication technologies and institutions', 'The Print Revolution in India refers to the historical development and impact of printing', 'Radio in India evolved through three distinct phases: the colonial-era state monopoly'],
                  hint: 'Revisit c12_soc_cbse_14_004 (Television: Doordarshan to Satellite) for the pre-digital media.',
                  misconception: 'Students equate \'digital revolution\' with \'universal internet access\' and assume digitisation automatically empowers marginalised groups.' }
          ],
            remediations: { 'students-equate-digital-revolution-with': { steps: ['Revisit c11_soc_cbse_07_001 (Social Change: sources — technological vs structural) to distinguish technology as.', 'Re-read NCERT Box 7.14 (Raghav FM) and Box 7.8 (Eenadu\'s district dailies) — both show localisation succeeds *without*.', 'Complete a mini-exercise: Map your own WhatsApp groups by language, caste/class composition, and admin control — then.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_010', difficulty: 'standard',
          question: 'Advertising in mass media refers to paid, non-personal communication through.',
          hint: 'If stuck, revisit c12_soc_cbse_14_005 (Impact of Television) and c12_soc_cbse_14_008.',
          misconception: 'Students often believe advertising merely reflects pre-existing consumer needs (\'mirror theory\') rather than actively.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Advertising in mass media refers to paid, non-personal communication through various',
                  options: ['Advertising in mass media refers to paid, non-personal communication through various', 'Mass media refers to the diverse array of communication technologies and institutions', 'The Print Revolution in India refers to the historical development and impact of printing', 'Radio in India evolved through three distinct phases: the colonial-era state monopoly'],
                  hint: 'If stuck, revisit c12_soc_cbse_14_005 (Impact of Television) and c12_soc_cbse_14_008 (Globalisation.',
                  misconception: 'Students often believe advertising merely reflects pre-existing consumer needs (\'mirror theory\') rather than actively constructing desires.' }
          ],
            remediations: { 'advertising-merely-reflects-pre-existing': { steps: ['Revisit c11_soc_cbse_04_003 (Socialisation) and c11_soc_cbse_04_008 (Cultural Change) to recall how media acts as.', 'Watch two contrasting Indian ads — one pre-1991 (Nirma) and one post-2010 (Cred, Zomato) — and write a 150-word.', 'Re-attempt Diagnostic Question 4; if still unable to link ad form to political economy, schedule a 15-minute tutorial.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_011', difficulty: 'standard',
          question: 'Regulation of mass media in India refers to the legal and institutional.',
          hint: 'Revisit c11_ps_cbse_11_005 (Right to Freedom, Articles 19-22) to clarify Article 19(1)(a).',
          misconception: 'Students often believe the Press Council of India can legally punish newspapers (impose fines, cancel registration) and.',
          parts: [
                { id: 'a', prompt: 'Explain why the Prasar Bharati Act, 1990 was enacted and how it sought to address the problem of government control over All India Radio and Doordarshan.', answer: 'The Act created Prasar Bharati as an autonomous corporation to manage AIR and',
                  options: ['The Act created Prasar Bharati as an autonomous corporation to manage AIR and', 'it made Doordarshan independent', 'autonomous corporation', 'statutory body'],
                  hint: 'Revisit c11_ps_cbse_11_005 (Right to Freedom, Articles 19-22) to clarify Article 19(1)(a) vs 19(2).',
                  misconception: 'Students often believe the Press Council of India can legally punish newspapers (impose fines, cancel registration) and that Prasar Bharati.' },
                { id: 'b', prompt: 'A newspaper publishes a paid news item disguised as an editorial during elections. The Press Council receives a complaint.', answer: 'Steps: (1) Council inquires into the complaint under Section 14 of the Act',
                  options: ['Steps: (1) Council inquires into the complaint under Section 14 of the Act', 'fine the newspaper', 'order Election Commission action', 'autonomous corporation'],
                  hint: 'Revisit c11_ps_cbse_11_005 (Right to Freedom, Articles 19-22) to clarify Article 19(1)(a) vs 19(2).',
                  misconception: 'Students often believe the Press Council of India can legally punish newspapers (impose fines, cancel registration) and that Prasar Bharati.' }
          ],
            remediations: { 'the-press-council-of-india': { steps: ['If the student holds this misconception: (1) Have them read Section 14 of the Press Council Act, 1978 and list the.', '(2) Examine Prasar Bharati Act Sections 4-6 (Board composition) and Section 20 (grants by Parliament) — trace how.', '(3) Re-attempt Diagnostic Question 3 and 4, explicitly stating what each body CANNOT do.', '(4) Discuss the 2014 Prasar Bharati CEO controversy (Jawhar Sircar\'s resignation) as a case study of autonomy limits.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
