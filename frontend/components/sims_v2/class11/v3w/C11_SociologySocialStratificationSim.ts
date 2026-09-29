import type { SimDef } from '../../engine/types';
import C11_SociologySocialStratificationSim from '../../../simulations/c6_12/C11_SociologySocialStratificationSim';

/** v3 wrapped master — C11_SociologySocialStratificationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologysocialstratificationsim: SimDef = {
    id: 'v3w_c11_sociologysocialstratificationsim',
    title: 'Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction',
    subtitle: 'This node covers the conceptual foundations of social structure as a sociological.',
    classLevel: 11, subject: 'sociology', topic: 'Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction',
    chapters: [],
    nodeIds: ['c11_soc_cbse_06_001', 'c11_soc_cbse_06_002', 'c11_soc_cbse_06_003', 'c11_soc_cbse_06_006', 'c11_soc_cbse_06_007', 'c11_soc_cbse_06_008', 'c11_soc_cbse_06_009', 'c11_soc_cbse_06_010', 'c11_soc_cbse_07_003', 'c11_soc_cbse_07_004', 'c11_soc_cbse_07_005', 'c11_soc_cbse_07_010', 'c11_soc_cbse_02_001', 'c11_soc_cbse_02_002', 'c11_soc_cbse_02_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you walk into your school every morning — you know exactly where to sit, when to speak, how to.', goal: 'Master Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction.' },
    discovery: {
        question: 'A student argues: "Caste discrimination is illegal now, so caste stratification no longer exists in India." Using the concept of *life chances*, explain why.',
        options: ['The argument confuses *legal equality* with *substantive equality*', 'caste doesn\'t matter anymore', 'stratification'],
        answer: 'The argument confuses *legal equality* with *substantive equality*',
        hook: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality.',
    },
    teaching: [
        { title: 'Social structure is the patterned,.', text: 'Social structure is the patterned, relatively stable arrangement of social institutions, statuses, roles, and norms that organises human interaction into predictable regularities across time and.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_001', title: 'Social structure is the patterned,.',
          scaffold: { problem: 'Analyse the social structure of a government primary school in a rural Indian village using the structural framework: identify (1) key.',
            steps: [
            { text: 'Identify structural positions — Principal (administrative authority), Teachers (instructional authority,.' },
            { text: 'Specify role expectations — Principal: manage resources, enforce rules, liaise with block office; Teachers: teach,.' },
            { text: 'Map resource distribution — Principal controls: teacher attendance, fund utilisation, leave approval; Teachers control:.' },
            { text: 'Identify structural norms — Hierarchy norm: principal > teacher > student; Caste norm: non-Dalit teachers avoid eating.' },
            { text: 'Analyse Dalit girl\'s constrained/enabled agency — Constraints: seated separately, called last for meals, denied.', faded: true, blankAnswer: 'The school\'s social structure comprises 6 key positions.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_002', title: 'Social stratification is a system of.',
          scaffold: { problem: 'A sociologist studies two neighbourhoods in Delhi: **Neighbourhood A** (predominantly upper-caste, professional families, average household.',
            steps: [
            { text: 'Identify the stratification bases operating — Neighbourhood A: upper caste + high class; Neighbourhood B: Dalit caste +.' },
            { text: 'Recognise that government schools are *public institutions* meant to provide equal life chances (education as a.' },
            { text: 'Analyse *political influence* — Neighbourhood A parents have social capital (bureaucrat networks, media access,.' },
            { text: 'Analyse *social status* — The *prestige* of the school follows the neighbourhood\'s status.' },
            { text: 'Conclude — Stratification *structures* the conversion of formal equality (same government school system) into.', faded: true, blankAnswer: 'The disparity reflects stratified *political influence*.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_003', title: 'Life chances refer to material.',
          scaffold: { problem: 'Analyze the three forms of social advantage for a student admitted to AIIMS Delhi under the general category versus a student admitted.',
            steps: [
            { text: 'Identify the stratification bases at play — category (General vs OBC) and institution (AIIMS).' },
            { text: 'Compare life chances — both get identical medical education, hospital access, degree, future income potential.' },
            { text: 'Compare status — General category student carries no "quota stigma"; OBC student may face covert prejudice ("merit vs.' },
            { text: 'Compare political influence — OBC student benefits from OBC collective mobilization (student unions, faculty.' },
            { text: 'Synthesize — Same score, same institution, same class background, but stratification (caste category) creates.', faded: true, blankAnswer: 'Life chances: near-equal. Status: General > OBC (due to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_006', title: 'The conflict perspective views social.',
          scaffold: { problem: 'A 14-year-old girl in rural Bihar "cooperates" with her parents\' decision to withdraw her from school and help with domestic work.',
            steps: [
            { text: 'Identify groups — Dominant: parents/patriarchal household (control decision-making, resources); Subordinate: girl.' },
            { text: 'Identify resource — Girl\'s labor (domestic, care) and future life chances (education, employment, autonomy).' },
            { text: 'Identify masking norm — "Filial duty," "family honor," "girls don\'t need education" — cultural ideology framing.' },
            { text: 'Identify material constraint — No independent income, no safe housing outside family, legal guardianship until 18,.' },
            { text: 'Long-term consequence — Girl enters adulthood with low education, confined to low-wage informal work or dependent.', faded: true, blankAnswer: 'Dominant: parents/patriarchy; Subordinate: girl. Resource:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_007', title: 'Cooperation as a social process refers.',
          scaffold: { problem: 'A landless Dalit agricultural labourer in Bihar works 12-hour days for a dominant-caste landlord during harvest season.',
            steps: [
            { text: 'Identify the structural positions – labourer lacks land (means of production), landlord owns land and controls surplus.' },
            { text: 'Determine the labourer\'s alternatives – without land, the labourer must sell labour-power to survive; refusal means.' },
            { text: 'Apply Marx\'s concept of alienation – the labourer does not control the labour process (what to grow, how to work) nor.' },
            { text: 'Conclude – cooperation is enforced because the labourer\'s participation is compelled by class structure, not free will.', faded: true, blankAnswer: 'Enforced cooperation – structurally compelled by the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_008', title: 'Competition as a social process refers.',
          scaffold: { problem: 'A village in Punjab has two irrigation systems: a traditional Persian wheel (rehat) owned by a large landowner, and a community-managed.',
            steps: [
            { text: 'Identify the two irrigation technologies and their social requirements: rehat needs capital (owned by one), canal needs.' },
            { text: 'Recognize that the rehat introduces market competition: peasants compete to pay for water, and the landowner.' },
            { text: 'Note that the canal represents enforced cooperation: households must contribute labor (sanctioned by norms) to maintain.' },
            { text: 'Apply the textbook\'s insight: "The level of technology in a system may determine the need for cooperation between men.' },
            { text: 'Evaluate stratification impact: landless peasants may lack cash for rehat and labor for canal, facing double exclusion.' },
            { text: 'Conclude that both processes coexist: cooperation in canal maintenance, competition in rehat market, and the choice of.', faded: true, blankAnswer: 'The village illustrates coexistence of cooperation (canal.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction', spots: [
            { id: 's1', label: 'Social structure is the patterned', prompt: 'Which idea is this? — Social structure is the patterned, relatively stable arrangement of social institutions,.', answer: 'Social structure is the patterned', options: ['Social structure is the patterned', 'Social stratification is a system', 'Life chances refer to material', 'The conflict perspective views social'] },
            { id: 's2', label: 'Social stratification is a system', prompt: 'Which idea is this? — Social stratification is a system of structured, persistent inequalities between social.', answer: 'Social stratification is a system', options: ['Social stratification is a system', 'Social structure is the patterned', 'Life chances refer to material', 'The conflict perspective views social'] },
            { id: 's3', label: 'Life chances refer to material', prompt: 'Which idea is this? — Life chances refer to material advantages (wealth, income, health, job security,.', answer: 'Life chances refer to material', options: ['Life chances refer to material', 'Social structure is the patterned', 'Social stratification is a system', 'The conflict perspective views social'] },
            { id: 's4', label: 'The conflict perspective views social', prompt: 'Which idea is this? — The conflict perspective views social processes (cooperation, competition, conflict) as.', answer: 'The conflict perspective views social', options: ['The conflict perspective views social', 'Social structure is the patterned', 'Social stratification is a system', 'Life chances refer to material'] },
            { id: 's5', label: 'Cooperation as a social process', prompt: 'Which idea is this? — Cooperation as a social process refers to the joint activity of two or more individuals.', answer: 'Cooperation as a social process', options: ['Cooperation as a social process', 'Social structure is the patterned', 'Social stratification is a system', 'Life chances refer to material'] },
            { id: 's6', label: 'Competition as a social process', prompt: 'Which idea is this? — Competition as a social process refers to a structured struggle between individuals or.', answer: 'Competition as a social process', options: ['Competition as a social process', 'Social structure is the patterned', 'Social stratification is a system', 'Life chances refer to material'] }
          ] } }
    ],
    explore: { component: C11_SociologySocialStratificationSim, prompt: 'Explore the interactive — Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_001', difficulty: 'standard',
          question: 'Social structure is the patterned, relatively stable arrangement of social.',
          hint: 'Revisit "Social Stratification" in Introducing Sociology (Class XI), specifically the.',
          misconception: 'Students conflate social structure with "social rules" or "customs" — treating it as a list of dos and don\'ts rather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social structure is the patterned, relatively stable arrangement of social institutions,',
                  options: ['Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,', 'The conflict perspective views social processes (cooperation, competition, conflict) as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate social structure with "social rules" or "customs" — treating it as a list of dos and don\'ts rather than a relational.' }
          ],
            remediations: { 'students-conflate-social-structure-with': { steps: ['Have the student map their own school using only positions and resources — no rules.', 'Ask: "If all written rules vanished tomorrow, which arrows would still exist? Why?"', 'Reveal that those persistent arrows — the authority, resource, and dependency relations — are the structure.', 'Apply to family: map positions (father, mother, elder brother, younger sister) and resource flows (income, care,.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_002', difficulty: 'standard',
          question: 'Social stratification is a system of structured, persistent inequalities.',
          hint: 'If stuck, revisit **c11_soc_cbse_06_001 (Social Structure as a Conceptual Framework)** —.',
          misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Caste discrimination is illegal now, so caste stratification no longer exists in India." Using the concept of *life chances*, explain why.', answer: 'The argument confuses *legal equality* with *substantive equality*',
                  options: ['The argument confuses *legal equality* with *substantive equality*', 'caste doesn\'t matter anymore', 'stratification'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality will automatically.' },
                { id: 'b', prompt: 'Compare and contrast how *class stratification* and *caste stratification* operate as systems of inequality.', answer: '| Dimension | Class Stratification | Caste Stratification |',
                  options: ['| Dimension | Class Stratification | Caste Stratification |', 'caste is just traditional class', 'stratification'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality will automatically.' }
          ],
            remediations: { 'misconception-stratification-is-just-about': { steps: ['**Step-by-step remediation**: 1.', '**Confront the conflation**: Ask student to list *non-economic* disadvantages a wealthy Dalit faces (temple entry,.', 'Ask: "Can money buy temple entry in a village that bars Dalits?" → No.', 'Money cannot buy *ritual status*.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality.',
          parts: [
                { id: 'a', prompt: 'Create a original, realistic case study of a *rural Indian household* that demonstrates how social stratification (caste, class, gender) shapes: (a) division.', answer: '**Case Study**: The *Meena household* in a Rajasthan village',
                  options: ['**Case Study**: The *Meena household* in a Rajasthan village', 'stratification', 'economic layers', 'everything is class'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality will automatically.' },
                { id: 'b', prompt: 'Compare and contrast how *class stratification* and *caste stratification* operate as systems of inequality.', answer: '| Dimension | Class Stratification | Caste Stratification |',
                  options: ['| Dimension | Class Stratification | Caste Stratification |', 'caste is just traditional class', 'stratification', 'economic layers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality will automatically.' }
          ],
            remediations: { 'misconception-stratification-is-just-about': { steps: ['**Step-by-step remediation**: 1.', '**Confront the conflation**: Ask student to list *non-economic* disadvantages a wealthy Dalit faces (temple entry,.', 'Ask: "Can money buy temple entry in a village that bars Dalits?" → No.', 'Money cannot buy *ritual status*.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_003', difficulty: 'standard',
          question: 'Life chances refer to material advantages (wealth, income, health, job.',
          hint: 'Revisit node c11_soc_cbse_06_002 (Social Stratification: Structured Inequalities) and the.',
          misconception: 'Students treat the three forms as interchangeable synonyms for "privilege" or "power." They write "life chances means.',
          parts: [
                { id: 'a', prompt: 'In a village, the Sarpanch belongs to a dominant caste. Villagers seek his help for ration cards, police complaints, and school admissions.', answer: 'Political influence',
                  options: ['Political influence', 'status', 'life chances'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the three forms as interchangeable synonyms for "privilege" or "power." They write "life chances means political power" or.' }
          ],
            remediations: { 'students-treat-the-three-forms': { steps: ['Make a three-column table with headers "Life Chances (Material)", "Status (Symbolic)", "Political Influence (Decision.', 'Take 10 concrete examples (private jet, family name, MLA ticket, hospital suite, PhD degree, police protection, luxury.', 'For each, write one sentence justifying why it belongs there using textbook definitions.', 'Identify 3 examples that could fit multiple columns and explain the overlap (e.g., factory owner: life chances via.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_006', difficulty: 'standard',
          question: 'The conflict perspective views social processes (cooperation, competition,.',
          hint: 'Revisit c11_soc_cbse_06_002 (stratification definition and persistence) and.',
          misconception: 'Students equate "conflict perspective" with "society is always in open battle" and miss that its core insight is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The conflict perspective views social processes (cooperation, competition, conflict) as',
                  options: ['The conflict perspective views social processes (cooperation, competition, conflict) as', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "conflict perspective" with "society is always in open battle" and miss that its core insight is **structural coercion.' }
          ],
            remediations: { 'students-equate-conflict-perspective-with': { steps: ['Re-read the Marx quote in NCERT (p.11): "cooperation is not voluntary...', 'appears as an alien force." 2.', 'Draw a 2-column table: Left column "Functionalist sees" (voluntary cooperation, shared norms), Right column "Conflict.', 'Fill it with the domestic worker, landless laborer, and daughter-in-law examples from text.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_007', difficulty: 'standard',
          question: 'Cooperation as a social process refers to the joint activity of two or more.',
          hint: 'If stuck, revisit the distinction between \'social structure as constraint\' and.',
          misconception: 'Students often equate \'cooperation\' with \'voluntary harmony\' and assume that if no open conflict is visible,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cooperation as a social process refers to the joint activity of two or more individuals',
                  options: ['Cooperation as a social process refers to the joint activity of two or more individuals', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'cooperation\' with \'voluntary harmony\' and assume that if no open conflict is visible, cooperation is genuinely.' }
          ],
            remediations: { 'students-often-equate-cooperation-with': { steps: ['If a student insists cooperation is always voluntary: (1) Ask them to list three things they did today with others; (2).', '9-10) and identify the specific sanctions (brothers\' wives\' hatred, loss of natal home access) that enforce.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_008', difficulty: 'standard',
          question: 'Competition as a social process refers to a structured struggle between.',
          hint: 'If stuck, revisit c11_soc_cbse_06_002 (Social Stratification) and c11_soc_cbse_06_003.',
          misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Competition as a social process refers to a structured struggle between individuals or',
                  options: ['Competition as a social process refers to a structured struggle between individuals or', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that capitalist competition is.' }
          ],
            remediations: { 'competition-is-a-natural': { steps: ['Revisit the African classroom anecdote (Activity 6 in textbook) and ask: "If competition were natural, why did those.', 'Map the three forms of advantage (life chances, social status, political influence) onto the JEE/NEET example: list.', 'Reread the Bottomore and Mill extracts in the textbook; highlight phrases like "less welcome effects" and "generally.', 'Write a one-paragraph answer to: "Does the same exam paper guarantee equal competition?" using the concepts of.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Competition in a capitalist market ensures the most efficient outcome for society as a whole." Use the textbook\'s reference to Bottomore.', answer: 'The claim is contested',
                  options: ['The claim is contested', 'survival of the fittest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that capitalist competition is.' },
                { id: 'b', prompt: 'Create a brief scenario (3-4 sentences) set in an Indian village or urban neighborhood that illustrates how competition and cooperation coexist and overlap,.', answer: 'Example: "In a Maharashtra village, farmers once cooperated to operate a charas',
                  options: ['Example: "In a Maharashtra village, farmers once cooperated to operate a charas', 'survival of the fittest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe competition is a natural, universal human instinct ("survival of the fittest") and that capitalist competition is.' }
          ],
            remediations: { 'competition-is-a-natural': { steps: ['Revisit the African classroom anecdote (Activity 6 in textbook) and ask: "If competition were natural, why did those.', 'Map the three forms of advantage (life chances, social status, political influence) onto the JEE/NEET example: list.', 'Reread the Bottomore and Mill extracts in the textbook; highlight phrases like "less welcome effects" and "generally.', 'Write a one-paragraph answer to: "Does the same exam paper guarantee equal competition?" using the concepts of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
