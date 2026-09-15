import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch03_p2: SimDef = {
    id: 'v3_c11_soc_ch03_p2',
    title: 'Understanding Social Institutions · Part 2/2',
    subtitle: 'Tell the building from the institution — and the data from the modernisation myth.',
    classLevel: 11, subject: 'sociology', topic: 'Understanding Social Institutions · Part 2/2',
    chapters: ['c11_soc_ch03'],
    nodeIds: ['c11_soc_cbse_03_007', 'c11_soc_cbse_03_008', 'c11_soc_cbse_03_009', 'c11_soc_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist refusing to call a building a pattern', intro: 'The principal changed the rules; the institution didn\'t blink — institutions are the pattern, organisations merely their local costumes.', goal: 'Distinguish institutions from organisations and apply empirical checks to family-change theory.' },
    discovery: {
        question: 'Industrialisation marches in, and the nuclear family inevitably replaces the joint family — a law of modernisation?',
        options: ['No — Shah\'s evidence showed joint families grew with post-independence life expectancy; \'broken\' and \'modern\' family stories don\'t fit India', 'Yes — cities atomise kin', 'Yes — joint families are a relic', 'No — joint families never existed anyway'],
        answer: 'No — Shah\'s evidence showed joint families grew with post-independence life expectancy; \'broken\' and \'modern\' family stories don\'t fit India',
        hook: 'And your school isn\'t the institution — education is; the school is an organisation that embodies it, which is why a principal can change rules but not \'the institution.\'',
    },
    teaching: [
        { title: 'Work and Economic Institutions: Formal and Informal Economies, Division of Labour', text: 'Work is the carrying out of tasks requiring mental or physical effort to produce goods and services that satisfy human needs, encompassing both paid employment and unpaid labour.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Correct \'school = institution\' into \'school = organisation,\' then weigh functionalist versus conflict readings of one institution.',
        labels: ['Work and Economic Institutions', 'Power and Authority', 'Citizenship Rights: Civil, Political', 'Interrelationship Among Family, Marriage,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_009', title: 'Citizenship Rights: Civil, Political and Social Dimensions (T.H. Marshall)',
          caseStudy: { intro: 'Imagine you are a daily-wage construction worker in Delhi who has an Aadhaar card (identity), votes in elections (political voice), but has no health insurance.',
            decisions: [{ prompt: 'Define T.H. Marshall\'s three dimensions of citizenship rights in one sentence each.', options: [
                { text: 'Correct answer: Civil rights are individual legal protections (e.g., free speech,', outcome: 'Correct answer: Civil rights are individual legal protections (e.g., free speech, property.' },
                { text: 'rights to participate in society', outcome: 'Not quite — Students often equate "citizenship rights" solely with Fundamental Rights (civil-political) and.', reveals: 'students-often-equate-citizenship-rights' },
                { text: 'merges civil and political rights (e', outcome: 'Not quite — Students often equate "citizenship rights" solely with Fundamental Rights (civil-political) and.', reveals: 'students-often-equate-citizenship-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_010', title: 'Interrelationship Among Family, Marriage, Kinship, Economy, Polity and Religion',
          caseStudy: { intro: 'Imagine a young woman from a rural village in Maharashtra who migrates to Bangalore to work in a garment export factory.',
            decisions: [{ prompt: 'Define \'institutional interrelationship\' in sociology and give one example from the NCERT text showing how a change in the economic sphere.', options: [
                { text: 'Institutional interrelationship means social institutions are mutually constitutive', outcome: 'Institutional interrelationship means social institutions are mutually constitutive — change in one.' },
                { text: 'economy affects family but family doesn\'t affect economy', outcome: 'Not quite — Students treat \'interrelationship\' as a simple list of pairwise effects (economy→family.', reveals: 'students-treat-interrelationship-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a social-institutions debate, a student says: \'My school is an institution, so the principal changed the institution.\' He also asserts \'nuclear families are modern and progressive; joint families are traditional relics urbanisation dissolves.\'',
            decisions: [{ prompt: 'What do institution and family actually denote?', options: [
                { text: 'Separate pattern from organisation: education is the institution — a stable arrangement of norms, roles and sanctions around a societal need; his school is an ORGANISATION embodying it, so the principal changed the school, not the institution. And the family evidence contradicts him: joint families grew with rising life expectancy post-independence (Shah), and female-headed migrant households are distinct forms, not \'broken\' nuclear ones.', outcome: 'The debate corrects on both axes: institution = normative pattern vs organisation = concrete body — and household form tracks demography and economy, not a march toward modernity.' },
                { text: 'Keep school-as-institution — the words are interchangeable in common use.', outcome: 'Common use blurs exactly what sociology needs distinct: institutions are abstract normative patterns; organisations are their concrete embodiments.', reveals: 'institution-equals-organisation' },
                { text: 'Keep the nuclear-is-modern story — urbanisation naturally shrinks families.', outcome: 'That\'s modernization theory read as fact: the data show joint households expanding with longevity — a snapshot of composition isn\'t the family\'s developmental cycle.', reveals: 'nuclear-equals-modern' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'Institutions are patterns, not buildings — education persists while every school in it reorganises.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_007', difficulty: 'standard',
          question: 'Work is the carrying out of tasks requiring mental or physical effort.',
          hint: 'Revisit c11_soc_cbse_03_001 for institution definition and perspectives; review.',
          misconception: 'Students often equate \'informal economy\' with \'illegal economy\' (e.g., smuggling, tax evasion) and assume informal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Work is the carrying out of tasks requiring mental or physical effort to produce goods',
                  options: ['Work is the carrying out of tasks requiring mental or physical effort to produce goods', 'A social institution is a stable, structured pattern of norms, roles, values, and', 'Family is a social institution comprising a group of persons directly linked by kin', 'Kinship is the culturally defined system of social relationships based on blood ties'],
                  hint: 'Revisit c11_soc_cbse_03_001 for institution definition and perspectives; review c6_civics_ch16_039.',
                  misconception: 'Students often equate \'informal economy\' with \'illegal economy\' (e.g., smuggling, tax evasion) and assume informal workers are a small.' }
          ],
            remediations: { 'students-often-equate-informal-economy': { steps: ['Ask the student to list five jobs they see daily (auto driver, vegetable vendor, construction worker, domestic help.', 'For each, check: Is there a written contract?', 'Is the employer registered?', 'Are social security contributions paid?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_008', difficulty: 'standard',
          question: 'Power is the ability of individuals or groups to enforce their will despite.',
          hint: 'Revisit c11_soc_cbse_03_001 for institution definition and c7_civ_ch03_001 for state.',
          misconception: 'Students often conflate \'state\' with \'government\' or \'nation\', and assume stateless societies are \'lawless\'.',
          parts: [
                { id: 'a', prompt: 'Explain why Max Weber\'s definition of the state as \'a human community that (successfully) claims the monopoly of the legitimate use of physical force within.', answer: '\'Monopoly\' means only the state can legally authorize force',
                  options: ['\'Monopoly\' means only the state can legally authorize force', 'stateless societies lack order entirely'],
                  hint: 'Revisit c11_soc_cbse_03_001 for institution definition and c7_civ_ch03_001 for state vs government.',
                  misconception: 'Students often conflate \'state\' with \'government\' or \'nation\', and assume stateless societies are \'lawless\' or \'primitive\'.' }
          ],
            remediations: { 'students-often-conflate-state-with': { steps: ['Ask student to list five differences between \'state\' and \'government\' using the NCERT glossary (state = political.', 'Have them read the \'Stateless Societies\' paragraph and identify three specific mechanisms of order mentioned (balanced.', 'Assign a mini-case study: The Nuer (segmentary lineage) or the Igbo (village democracy) – ask how they handle murder.', 'Re-attempt Diagnostic Q3 with this clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_009', difficulty: 'standard',
          question: 'Citizenship rights, as theorised by T.H. Marshall, are the three interlinked.',
          hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) on Fundamental Rights.',
          misconception: 'Students often equate "citizenship rights" solely with Fundamental Rights (civil-political) and treat Directive.',
          parts: [
                { id: 'a', prompt: 'A tribal woman in Jharkhand has a voter ID card and votes regularly, but cannot access the Public Distribution System (PDS) because her village lacks.', answer: 'Correct answer: Political rights (voting) are fulfilled',
                  options: ['Correct answer: Political rights (voting) are fulfilled', 'all rights are fulfilled'],
                  hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) on Fundamental Rights categories and.',
                  misconception: 'Students often equate "citizenship rights" solely with Fundamental Rights (civil-political) and treat Directive Principles as mere moral.' }
          ],
            remediations: { 'students-often-equate-citizenship-rights': { steps: ['If the student conflates dimensions, use the "Rights Triangle" activity: Draw a triangle with vertices labelled Civil.', 'Give 10 right-cards (e.g., "free legal aid", "vote", "mid-day meal", "property", "unemployment allowance").', 'Ask the student to place each card on the correct vertex and justify.', 'For misplaced cards, ask: "Does this protect you from the state, let you control the state, or require the state.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_010', difficulty: 'standard',
          question: 'The interrelationship among family, marriage, kinship, economy, polity, and.',
          hint: 'Revisit c11_soc_cbse_03_001 (perspectives) and the specific institution node (002-009).',
          misconception: 'Students treat \'interrelationship\' as a simple list of pairwise effects (economy→family, religion→polity) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The interrelationship among family, marriage, kinship, economy, polity, and religion',
                  options: ['The interrelationship among family, marriage, kinship, economy, polity, and religion', 'A social institution is a stable, structured pattern of norms, roles, values, and', 'Family is a social institution comprising a group of persons directly linked by kin', 'Kinship is the culturally defined system of social relationships based on blood ties'],
                  hint: 'Revisit c11_soc_cbse_03_001 (perspectives) and the specific institution node (002-009) where your.',
                  misconception: 'Students treat \'interrelationship\' as a simple list of pairwise effects (economy→family, religion→polity) rather than a *system.' }
          ],
            remediations: { 'students-treat-interrelationship-as-a': { steps: ['Draw a 5-node diagram (Family, Economy, Polity, Religion, Education) with bidirectional arrows.', 'Pick ONE NCERT example (German unification, Bangalore garments, Nasik, Pratichi).', 'Trace the example through ALL 5 nodes, writing one causal mechanism per arrow.', 'Identify where the loop closes (e.g., garment wages → daughter\'s education → delayed marriage → lower fertility →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
