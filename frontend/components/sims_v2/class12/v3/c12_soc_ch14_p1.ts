import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch14_p1: SimDef = {
    id: 'v3_c12_soc_ch14_p1',
    title: 'Mass Media and Communications · Part 1/2',
    subtitle: 'Whoever owns the tower shapes the story',
    classLevel: 12, subject: 'sociology', topic: 'Mass Media and Communications · Part 1/2',
    chapters: ['c12_soc_ch14'],
    nodeIds: ['c12_soc_cbse_14_001', 'c12_soc_cbse_14_002', 'c12_soc_cbse_14_003', 'c12_soc_cbse_14_004', 'c12_soc_cbse_14_005', 'c12_soc_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Media sociologist', intro: 'Every message that reaches millions passed through a structure with interests of its own.', goal: 'Define mass media\'s structural features and analyse the dialectical relationship between media and society.' },
    discovery: {
        question: 'A Bihar village rigs an FM transmitter on a bamboo pole and broadcasts folk songs and health messages to 20 km — no company, no budget, no licence. Mass media or not?',
        options: ['Yes — mass media is defined by one-to-many reach to a large anonymous audience, not by corporate scale', 'No — real mass media needs a big organisation', 'No — it\'s just loudspeakers with extra steps', 'Yes — but only because it\'s radio'],
        answer: 'Yes — mass media is defined by one-to-many reach to a large anonymous audience, not by corporate scale',
        hook: 'Media isn\'t a neutral mirror — the big organisations behind it have owners, mandates and gatekeepers who select and frame what you see. And the digital divide isn\'t about who owns a phone; it\'s about literacy, language, data costs and who in the house is allowed to hold it.',
    },
    teaching: [
        { title: 'Mass Media: Definition, Characteristics and the Means of Mass Communication', text: 'Mass media refers to the diverse array of communication technologies and institutions (e.g., print, radio, television, cinema, internet) that are structurally organised to produce and disseminate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track how All India Radio sold the Green Revolution while farmers reshaped its programmes — then test what mass media\'s institutional machinery does to the \'news\' you trust.',
        labels: ['Mass Media: Definition, Characteristics', 'The History of Mass', 'Radio in India: AIR,', 'Television in India: Doordarshan,', 'The Impact of Television', 'Cinema as Mass Media'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_001', title: 'Mass Media: Definition, Characteristics and the Means of Mass Communication',
          caseStudy: { intro: 'Begin by asking students to list every media interaction they had from waking up to leaving for school (phone alarm, WhatsApp messages, radio/TV news.',
            decisions: [{ prompt: 'Define mass media in one sentence using the three essential structural features that distinguish it from interpersonal communication.', options: [
                { text: 'Mass media are institutionally organised communication technologies that disseminate', outcome: 'Mass media are institutionally organised communication technologies that disseminate standardised.' },
                { text: 'large audience', outcome: 'Not quite — Students often treat "mass media" and "mass communication" as interchangeable synonyms, writing.', reveals: 'students-often-treat-mass-media' },
                { text: 'the role of mass media as a social institution', outcome: 'Not quite — Students often treat "mass media" and "mass communication" as interchangeable synonyms, writing.', reveals: 'students-often-treat-mass-media' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_003', title: 'Radio in India: AIR, the State Monopoly and the FM Revolution',
          caseStudy: { intro: 'Imagine you are in an auto-rickshaw in 2024: the driver switches between a private FM station playing Bollywood hits with RJ banter and a community radio.',
            decisions: [{ prompt: 'In which year did the Government of India permit privately owned FM radio stations to operate, and what critical content restriction was.', options: [
                { text: 'Correct answer: Private FM stations were permitted in 2002 under Phase-II licensing; they', outcome: 'Correct answer: Private FM stations were permitted in 2002 under Phase-II licensing; they are **not.' },
                { text: 'no restriction', outcome: 'Not quite — **Misconception:** "FM radio replaced AIR; now nobody listens to AIR." **Why it\'s wrong:** Students.', reveals: 'misconception-fm-radio-replaced-air' },
                { text: 'media regulation', outcome: 'Not quite — **Misconception:** "FM radio replaced AIR; now nobody listens to AIR." **Why it\'s wrong:** Students.', reveals: 'misconception-fm-radio-replaced-air' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_004', title: 'Television in India: Doordarshan, the Satellite Revolution and the Cable Era',
          caseStudy: { intro: 'Imagine you are flipping through channels today — hundreds of options in multiple languages, 24/7 news, reality shows, and on-demand content.',
            decisions: [{ prompt: 'What was the primary objective of the Satellite Instructional Television Experiment (SITE) conducted between August 1975 and July 1976?', options: [
                { text: 'SITE aimed to broadcast instructional programmes directly to community television sets in', outcome: 'SITE aimed to broadcast instructional programmes directly to community television sets in rural.' },
                { text: 'to entertain urban audiences', outcome: 'Not quite — Students often believe the \'satellite revolution\' began with Indian private channels like Zee.', reveals: 'the-satellite-revolution-began-with' },
                { text: 'to test colour broadcasting', outcome: 'Not quite — Students often believe the \'satellite revolution\' began with Indian private channels like Zee.', reveals: 'the-satellite-revolution-began-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_006', title: 'Cinema as Mass Media: Bollywood, Regional Cinema and the National Integration Debate',
          caseStudy: { intro: 'Begin with a question students live daily: "Why does a Tamil-speaking student in Chennai hum a Hindi film song, while a Hindi-speaking student in Delhi watches.',
            decisions: [{ prompt: 'Define "Bollywood" sociologically — not as a geographical location but as a structural position within India\'s media ecosystem.', options: [
                { text: 'Bollywood is the Mumbai-based, Hindi/Urdu-language commercial film industry that', outcome: 'Bollywood is the Mumbai-based, Hindi/Urdu-language commercial film industry that explicitly targets.' },
                { text: 'mainstream commercial', outcome: 'Not quite — Students conflate "Bollywood" with "Indian cinema" and assume regional cinema is a subordinate.', reveals: 'students-conflate-bollywood-with-indian' },
                { text: 'parallel/art', outcome: 'Not quite — Students conflate "Bollywood" with "Indian cinema" and assume regional cinema is a subordinate.', reveals: 'students-conflate-bollywood-with-indian' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A media-studies student credits the 1990s explosion of Hindi and Telugu dailies purely to \'rising literacy — more readers, more papers, simple.\'',
            decisions: [{ prompt: 'What did the language-paper revolution actually run on?', options: [
                { text: 'Organisational innovation, not just literacy — district-specific editions and local ad networks served village-level demand the city-centric English press ignored; the same printing technology that once carried nationalist mobilisation now ran on market segmentation — the press is shaped by who owns it and whom it sells to.', outcome: 'The chapter\'s throughline: each phase of the press answers a different master — colonial censorship, developmental state, market discipline — and \'more readers\' alone explains none of the editions\' local engineering.' },
                { text: 'He\'s right — demand side explains it fully; supply just follows readers.', outcome: 'Literacy created possible readers, not the product — the district-daily format, hyper-local content and rural advertiser networks had to be invented; demand without that supply-side redesign produced nothing.', reveals: 'literacy-explains-it-all' },
                { text: 'The papers grew because censorship ended — free press naturally expands.', outcome: 'The post-1991 constraint isn\'t censorship but market discipline — the expansion and the infotainment tilt share one driver; \'freedom\' explains neither the format nor the commercialisation that came with it.', reveals: 'freedom-equals-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate the institution from the process, and see media as a two-way street: it reflects society while quietly rebuilding it.',
            decisions: [{ prompt: 'What comes next? Mass Media and Communications · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mass Media and Communications · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_001', difficulty: 'standard',
          question: 'Mass media refers to the diverse array of communication technologies and.',
          hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions), specifically node.',
          misconception: 'Students often treat "mass media" and "mass communication" as interchangeable synonyms, writing definitions like "Mass.',
          parts: [
                { id: 'a', prompt: 'A village in Bihar sets up a low-power FM transmitter using a bamboo pole antenna and a cassette player, broadcasting local songs and health messages to a 20.', answer: 'It qualifies as mass media',
                  options: ['It qualifies as mass media', 'it\'s not mass media', 'the role of mass media as a social institution', 'the process of mass communication in shaping public opinion'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions), specifically node.',
                  misconception: 'Students often treat "mass media" and "mass communication" as interchangeable synonyms, writing definitions like "Mass media is the process.' }
          ],
            remediations: { 'students-often-treat-mass-media': { steps: ['If a student conflates the two terms, have them: (1) re-read the NCERT\'s first paragraph where it says "They are.', 'also sometimes referred to as mass communications" — note the "also sometimes" signalling they are not identical.', '(2) Complete a two-column table: left column "Mass Media (Institution/Technology)" — list examples (AIR, Doordarshan.', '(3) Write one sentence defining each using the words "structure" for media and "flow" for communication.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "mass media" and "mass communication" as interchangeable synonyms, writing definitions like "Mass.',
          parts: [
                { id: 'a', prompt: '"Digital divide is simply about who owns a smartphone." Evaluate this statement using the NCERT\'s discussion of differential access to mass media.', answer: 'The statement is false',
                  options: ['The statement is false', 'the role of mass media as a social institution', 'the process of mass communication in shaping public opinion'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions), specifically node.',
                  misconception: 'Students often treat "mass media" and "mass communication" as interchangeable synonyms, writing definitions like "Mass media is the process.' }
          ],
            remediations: { 'students-often-treat-mass-media': { steps: ['If a student conflates the two terms, have them: (1) re-read the NCERT\'s first paragraph where it says "They are.', 'also sometimes referred to as mass communications" — note the "also sometimes" signalling they are not identical.', '(2) Complete a two-column table: left column "Mass Media (Institution/Technology)" — list examples (AIR, Doordarshan.', '(3) Write one sentence defining each using the words "structure" for media and "flow" for communication.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_002', difficulty: 'standard',
          question: 'The Print Revolution in India refers to the historical development and impact.',
          hint: 'Revisit c12_soc_cbse_14_001 for mass media definition and c10_hist_cbse_05_009 for.',
          misconception: 'Students often believe the \'Print Revolution\' is a single event (Gutenberg) or that Indian print media *declined* after.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Print Revolution in India refers to the historical development and impact of printing',
                  options: ['The Print Revolution in India refers to the historical development and impact of printing', 'Mass media refers to the diverse array of communication technologies and institutions', 'Radio in India evolved through three distinct phases: the colonial-era state monopoly', 'Television in India evolved through three distinct phases: the state-monopoly Doordarshan'],
                  hint: 'Revisit c12_soc_cbse_14_001 for mass media definition and c10_hist_cbse_05_009 for nationalist.',
                  misconception: 'Students often believe the \'Print Revolution\' is a single event (Gutenberg) or that Indian print media *declined* after TV/Internet.' }
          ],
            remediations: { 'the-print-revolution-is-a': { steps: ['If a student conflates the two revolutions or assumes print decline: (1) Have them re-read Box 7.8 (Indian Language.', '(2) Assign a mini-comparison table: Colonial Press vs.', 'Globalised Press—columns: *Primary Driver*, *Revenue Source*, *State Relationship*, *Language Focus*.', '(3) Re-diagnostic: Ask them to explain why *Dainik Jagran* (Hindi) outsells *Times of India* (English) in 2024 using.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_003', difficulty: 'standard',
          question: 'Radio in India evolved through three distinct phases: the colonial-era state.',
          hint: 'Revisit the distinction between **public goods** and **private goods** in the context.',
          misconception: '**Misconception:** "FM radio replaced AIR; now nobody listens to AIR." **Why it\'s wrong:** Students confuse *urban.',
          parts: [
                { id: 'a', prompt: 'A district collector wants to use radio to improve maternal health outcomes in a remote tribal block where literacy is 35% and mobile data is unreliable.', answer: 'Correct answer: **Option (c) community radio** is optimal',
                  options: ['Correct answer: **Option (c) community radio** is optimal', 'FM radio replaced AIR'],
                  hint: 'Revisit the distinction between **public goods** and **private goods** in the context of media.',
                  misconception: '**Misconception:** "FM radio replaced AIR; now nobody listens to AIR." **Why it\'s wrong:** Students confuse *urban youth listenership* with.' }
          ],
            remediations: { 'misconception-fm-radio-replaced-air': { steps: ['**Re-read NCERT Boxes 7.2, 7.3, 7.14** — highlight every *date, number, and regulatory rule* (e.g., "2002 Phase-II".', '**Make a three-column timeline**: Colonial → Post-Independence (1947–2000) → Post-2002.', 'In each column write: Owner, Funding, Content Mandate, Reach, Key Example (Green Revolution / Raghav FM).', '**Do the "Prince in borewell" thought experiment (Box 7.12)**: Which radio station would have carried that live?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_004', difficulty: 'standard',
          question: 'Television in India evolved through three distinct phases: the state-monopoly.',
          hint: 'Revisit c12_soc_cbse_14_001 (mass media definition/characteristics) and.',
          misconception: 'Students often believe the \'satellite revolution\' began with Indian private channels like Zee TV (1992).',
          parts: [
                { id: 'a', prompt: 'Explain why Doordarshan\'s programming shifted from rural development themes to urban entertainment content in the 1980s, even though it remained a state-owned.', answer: 'The shift occurred',
                  options: ['The shift occurred', 'government policy change', 'audience demand', 'the \'satellite revolution\' began with Indian private channels like Zee TV (1992)'],
                  hint: 'Revisit c12_soc_cbse_14_001 (mass media definition/characteristics) and c11_soc_cbse_07_003.',
                  misconception: 'Students often believe the \'satellite revolution\' began with Indian private channels like Zee TV (1992).' }
          ],
            remediations: { 'the-satellite-revolution-began-with': { steps: ['Re-read the NCERT Box 7.12 (Prince rescue) and the paragraph on Gulf War/STAR TV (p.', 'Create a two-column table: "Before 1991" (Doordarshan monopoly, terrestrial, developmental/entertainment mix) vs.', 'Identify Zee TV\'s launch year (1992) and ask: "What satellite footprint did Zee use?" (ASIASAT, same as STAR).', 'Re-attempt Diagnostic Question 3 to verify the demand-supply logic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_005', difficulty: 'standard',
          question: 'Television\'s impact on Indian society refers to the dialectical process through.',
          hint: 'Revisit c12_soc_cbse_14_001\'s section on \'dialectical relationship\' and.',
          misconception: 'Students often think television\'s impact is limited to \'exposure to Western values\' or \'mindless entertainment\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Television\'s impact on Indian society refers to the dialectical process through which TV',
                  options: ['Television\'s impact on Indian society refers to the dialectical process through which TV', 'Mass media refers to the diverse array of communication technologies and institutions', 'The Print Revolution in India refers to the historical development and impact of printing', 'Radio in India evolved through three distinct phases: the colonial-era state monopoly'],
                  hint: 'Revisit c12_soc_cbse_14_001\'s section on \'dialectical relationship\' and c12_soc_cbse_14_004\'s.',
                  misconception: 'Students often think television\'s impact is limited to \'exposure to Western values\' or \'mindless entertainment\'.' }
          ],
            remediations: { 'television-s-impact-is-limited': { steps: ['If a student cannot move beyond \'TV shows Western culture\', assign this 3-step remediation: 1.', 'Re-watch the *Hum Log* epilogue (YouTube: "Hum Log Ashok Kumar epilogue") and the Maggi ad from 1984.', 'Note the *same* trusted figure (Ashok Kumar) delivering social message *and* product endorsement.', 'Write 150 words on why this blurring matters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_14_006', difficulty: 'standard',
          question: 'Cinema as mass media in India refers to the film industry — encompassing.',
          hint: 'If stuck, revisit NCERT Box 7.4 (Hum Log case study) and Box 7.8 (vernacular newspaper.',
          misconception: 'Students conflate "Bollywood" with "Indian cinema" and assume regional cinema is a subordinate subset.',
          parts: [
                { id: 'a', prompt: 'Define "Bollywood" sociologically — not as a geographical location but as a structural position within India\'s media ecosystem.', answer: 'Bollywood is the Mumbai-based, Hindi/Urdu-language commercial film industry that',
                  options: ['Bollywood is the Mumbai-based, Hindi/Urdu-language commercial film industry that', 'mainstream commercial', 'parallel/art', 'national media'],
                  hint: 'If stuck, revisit NCERT Box 7.4 (Hum Log case study) and Box 7.8 (vernacular newspaper revolution).',
                  misconception: 'Students conflate "Bollywood" with "Indian cinema" and assume regional cinema is a subordinate subset.' },
                { id: 'b', prompt: 'Explain how Benedict Anderson\'s concept of "imagined community" applies to the role of film songs in creating a sense of national belonging across India\'s.', answer: 'Anderson argues nations are "imagined"',
                  options: ['Anderson argues nations are "imagined"', 'Hindi films only integrate Hindi-belt audiences', 'national media', 'Hindi media'],
                  hint: 'If stuck, revisit NCERT Box 7.4 (Hum Log case study) and Box 7.8 (vernacular newspaper revolution).',
                  misconception: 'Students conflate "Bollywood" with "Indian cinema" and assume regional cinema is a subordinate subset.' },
                { id: 'c', prompt: 'Compare the "national integration" function of two cinematic moments: (a) Manoj Kumar\'s "Upkar" (1967) and "Purab aur Paschim" (1970) vs. (b) S.S.', answer: 'Manoj Kumar\'s "Upkar" (1967) and "Purab aur Paschim" (1970) vs',
                  options: ['Manoj Kumar\'s "Upkar" (1967) and "Purab aur Paschim" (1970) vs', 'patriotic films', 'national media', 'Hindi media'],
                  hint: 'If stuck, revisit NCERT Box 7.4 (Hum Log case study) and Box 7.8 (vernacular newspaper revolution).',
                  misconception: 'Students conflate "Bollywood" with "Indian cinema" and assume regional cinema is a subordinate subset.' }
          ],
            remediations: { 'students-conflate-bollywood-with-indian': { steps: ['Re-read NCERT Box 7.8 (Indian Language Newspaper Revolution) and the STAR Plus localisation case (p.', 'Retrieve Class 11 node c11_soc_cbse_10_010 (Srinivas on Sanskritisation/Westernisation) — apply "Sanskritisation".', 'Re-do Diagnostic Question 4 as a table: Manoj Kumar vs. Rajamouli on State Role, Capital Source, Address Strategy.', 'Write a 150-word answer to: "How does the shift from single-screen to multiplex to streaming alter who gets represented.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
