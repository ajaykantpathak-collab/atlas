import type { SimDef } from '../../engine/types';
import C11_SociologySocietySocietySim from '../../../simulations/c6_12/C11_SociologySocietySocietySim';

/** v3 wrapped master — C11_SociologySocietySocietySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologysocietysocietysim: SimDef = {
    id: 'v3w_c11_sociologysocietysocietysim',
    title: 'Individual and Society: The Dialectic Relationship',
    subtitle: 'This node covers the core concept of the individual-society dialectic, Mills\'.',
    classLevel: 11, subject: 'sociology', topic: 'Individual and Society: The Dialectic Relationship',
    chapters: [],
    nodeIds: ['c11_soc_cbse_01_001', 'c11_soc_cbse_01_003', 'c11_soc_cbse_01_005', 'c11_soc_cbse_01_006', 'c11_soc_cbse_01_007', 'c11_soc_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Start with the relatable scenario: "You\'re choosing subjects for Class 11.', goal: 'Master Individual and Society: The Dialectic Relationship.' },
    discovery: {
        question: 'A student says: "Unemployment is a personal trouble because the person didn\'t study hard enough." Using C.',
        options: ['Common sense sees unemployment as individual failure (laziness, bad choices)', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
        answer: 'Common sense sees unemployment as individual failure (laziness, bad choices)',
        hook: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle.',
    },
    teaching: [
        { title: 'The dialectical relationship between.', text: 'The dialectical relationship between individual and society refers to the ongoing, dynamic interplay where social structures (institutions, norms, culture, economic systems) shape individual choices.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_001', title: 'The dialectical relationship between.',
          scaffold: { problem: 'A 16-year-old girl in a Tier-2 Indian city wants to pursue Humanities in Class 11.',
            steps: [
            { text: 'Identify the personal trouble — the student\'s anxiety, confusion, feeling trapped between conflicting advice, fear of.' },
            { text: 'Identify the public issues — (a) Job market structure: service-sector growth vs manufacturing stagnation shapes.' },
            { text: 'Show the dialectic — her individual choice (if she chooses Humanities) both reflects these structures and potentially.' },
            { text: 'Map the \'relevant societies\' — family (kinship), school (institutional), peer group (generational), labour market.' },
            { text: 'Conclude — this is not just her \'private worry\'; it\'s a patterned experience of millions of Class 10 students, making.', faded: true, blankAnswer: 'Personal trouble = individual anxiety/conflict; Public.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_003', title: 'Sociology is the systematic and.',
          scaffold: { problem: 'A Class 11 student reads a newspaper editorial claiming "Rising divorce rates in urban India prove that the younger generation has lost.',
            steps: [
            { text: 'Identify the naturalistic explanation embedded in the editorial—it attributes the trend to individual moral failings.' },
            { text: 'Recall the criteria for a sociological explanation from this node: it must (a) locate causes in social.' },
            { text: 'Brainstorm structural factors affecting divorce rates in urban India using the sociological imagination: changing.' },
            { text: 'Select 2-3 factors with available data: e.g., NFHS-5 shows urban women\'s literacy at 83% vs rural 67%; female labour.' },
            { text: 'Draft the sociological explanation: "Rising urban divorce rates reflect structural transformations, not moral decline.' },
            { text: 'Verify against criteria: Does it avoid moral language? Yes. Does it cite structural factors? Yes.', faded: true, blankAnswer: 'A 150-word response contrasting the editorial\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_005', title: 'The Enlightenment (late 17th–18th.',
          scaffold: { problem: 'A Class 11 student reads that "1810: 20% of Britain\'s population lived in towns; 1910: 80% lived in towns." They ask: "If urbanization was.',
            steps: [
            { text: 'Identify the core difference in the *mechanism* of urbanization — Britain\'s was driven by *industrial pull* (factories.' },
            { text: 'Cite the NCERT data: British manufactured goods entered India at nominal duty, ruining native cotton fabrics (Marx.' },
            { text: 'Trace the demographic consequence — ruined handicraftsmen were *not absorbed* into indigenous industries (none existed.' },
            { text: 'Note the urban growth that *did* occur was administrative/port cities (Calcutta, Bombay, Madras) serving colonial.' },
            { text: 'Conclude that the *same global capitalist system* produced *opposite* demographic trajectories because colonialism.', faded: true, blankAnswer: 'British urbanization was driven by industrial factories.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_006', title: 'Capitalism is an economic system based.',
          scaffold: { problem: 'A Santhal family in Jharkhand lost their forest rights due to the British Forest Acts (1865, 1878), became landless, and were recruited as.',
            steps: [
            { text: 'Identify the colonial policy shock — Forest Acts declared forests state property, criminalising Santhal shifting.' },
            { text: 'Link to capitalist labour demand — Assam tea industry (British-owned, London-capital) needed cheap, docile, tethered.' },
            { text: 'Analyse the plantation as a "total institution" — Workers housed in segregated lines, paid in kind/tokens, penalised.' },
            { text: 'Connect to global commodity chain — Tea produced → auctioned in Calcutta/London → profits to British shareholders →.' },
            { text: 'Apply sociological imagination — The grandson\'s "personal trouble" (low wage, no land, identity as "coolie") is the.' },
            { text: 'Verify with NCERT — The text explicitly mentions "indentured labour was taken in ships by the British for running their.', faded: true, blankAnswer: 'The family\'s intergenerational plantation labour is not a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_007', title: 'The growth of sociology in India refers.',
          scaffold: { problem: 'A Class 11 student reads that "the Indian village was portrayed by colonial writers as unchanging and self-sufficient." They ask: "But.',
            steps: [
            { text: 'Identify the colonial epistemological frame — evolutionary theory placed Indian villages at an earlier "stage" of.' },
            { text: 'Recognise the administrative utility — a "static" village is easier to govern, tax, and categorise than a dynamic one.' },
            { text: 'Contrast with empirical reality — British land revenue settlements (Permanent Settlement, Ryotwari) themselves.' },
            { text: 'Explain the contradiction — the colonial representation *denied* the very changes colonial policies *produced*, to.' },
            { text: 'Connect to sociology — early Indian sociologists (e.g., D.N. Majumdar, S.C.', faded: true, blankAnswer: 'The "unchanging village" was a colonial discursive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_008', title: 'Sociology is the systematic study of.',
          scaffold: { problem: 'A Class 11 student reads a newspaper report: "Food delivery platforms cut base pay by 15% while increasing delivery distance targets.',
            steps: [
            { text: 'Identify the core social phenomenon — algorithmic wage change triggering collective action by gig workers.' },
            { text: 'Write the economics lens: focus on incentive structures, supply-demand elasticity of labour, platform profit.' },
            { text: 'Write the political science lens: focus on labour law coverage (are gig workers "employees"?), state regulation of.' },
            { text: 'Write the sociological lens: focus on how caste, migration status, and gender shape who becomes a delivery worker; how.' },
            { text: 'Conclude with one sentence on sociology\'s unique contribution: it traces the *mutual constitution* of economic.', faded: true, blankAnswer: '(Sample 150-word analysis) "An economist would model the.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_01_003', title: 'Identify each idea',
          dissect: { specimen: 'Individual and Society: The Dialectic Relationship', spots: [
            { id: 's1', label: 'The dialectical relationship between individual', prompt: 'Which idea is this? — The dialectical relationship between individual and society refers to the ongoing,.', answer: 'The dialectical relationship between individual', options: ['The dialectical relationship between individual', 'Sociology is the systematic and', 'The Enlightenment late 17th18th century', 'Capitalism is an economic system'] },
            { id: 's2', label: 'Sociology is the systematic and', prompt: 'Which idea is this? — Sociology is the systematic and scientific study of human society, social relationships,.', answer: 'Sociology is the systematic and', options: ['Sociology is the systematic and', 'The dialectical relationship between individual', 'The Enlightenment late 17th18th century', 'Capitalism is an economic system'] },
            { id: 's3', label: 'The Enlightenment late 17th18th century', prompt: 'Which idea is this? — The Enlightenment (late 17th–18th century European intellectual movement emphasizing.', answer: 'The Enlightenment late 17th18th century', options: ['The Enlightenment late 17th18th century', 'The dialectical relationship between individual', 'Sociology is the systematic and', 'Capitalism is an economic system'] },
            { id: 's4', label: 'Capitalism is an economic system', prompt: 'Which idea is this? — Capitalism is an economic system based on private ownership of the means of production,.', answer: 'Capitalism is an economic system', options: ['Capitalism is an economic system', 'The dialectical relationship between individual', 'Sociology is the systematic and', 'The Enlightenment late 17th18th century'] },
            { id: 's5', label: 'The growth of sociology in', prompt: 'Which idea is this? — The growth of sociology in India refers to the historical process through which sociology.', answer: 'The growth of sociology in', options: ['The growth of sociology in', 'The dialectical relationship between individual', 'Sociology is the systematic and', 'The Enlightenment late 17th18th century'] },
            { id: 's6', label: 'Sociology is the systematic study', prompt: 'Which idea is this? — Sociology is the systematic study of human social life, groups, and societies that.', answer: 'Sociology is the systematic study', options: ['Sociology is the systematic study', 'The dialectical relationship between individual', 'Sociology is the systematic and', 'The Enlightenment late 17th18th century'] }
          ] } }
    ],
    explore: { component: C11_SociologySocietySocietySim, prompt: 'Explore the interactive — Individual and Society: The Dialectic Relationship' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_001', difficulty: 'standard',
          question: 'The dialectical relationship between individual and society refers to the.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) and Class 10.',
          misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle.',
          parts: [
                { id: 'a', prompt: 'A student says: "Unemployment is a personal trouble because the person didn\'t study hard enough." Using C.', answer: 'Common sense sees unemployment as individual failure (laziness, bad choices)',
                  options: ['Common sense sees unemployment as individual failure (laziness, bad choices)', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle where one wins.' },
                { id: 'b', prompt: 'Apply the concept of \'relevant society\' to this situation: A Dalit student in a metropolitan city applies for a corporate job.', answer: 'Three relevant societies: (1) Corporate professional society',
                  options: ['Three relevant societies: (1) Corporate professional society', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle where one wins.' }
          ],
            remediations: { 'dialectical-means-conflict-or-argument': { steps: ['Ask the student to draw two circles overlapping — label one \'Individual\', one \'Society\'.', 'In the overlap, write: "Language, norms, institutions, memory, identity."', 'Ask: "Can you have language without other people? Can you have society without individuals?"', 'Show the Kargil compensation case — trace how the policy (society) interacted with patrilineal family (society) to.', 'Re-read Mills: "Neither the life of an individual nor the history of a society can be understood without understanding.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The sociological imagination is just a fancy term for \'thinking about society.\' Anyone who reads the news has it." Defend your.', answer: 'The statement is false',
                  options: ['The statement is false', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle where one wins.' }
          ],
            remediations: { 'dialectical-means-conflict-or-argument': { steps: ['Ask the student to draw two circles overlapping — label one \'Individual\', one \'Society\'.', 'In the overlap, write: "Language, norms, institutions, memory, identity."', 'Ask: "Can you have language without other people? Can you have society without individuals?"', 'Show the Kargil compensation case — trace how the policy (society) interacted with patrilineal family (society) to.', 'Re-read Mills: "Neither the life of an individual nor the history of a society can be understood without understanding.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_003', difficulty: 'standard',
          question: 'Sociology is the systematic and scientific study of human society, social.',
          hint: 'If stuck, revisit the "job market and subject choice" example from Node 001 and the C.',
          misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics).',
          parts: [
                { id: 'a', prompt: 'State the precise definition of sociology as a systematic and scientific study according to the NCERT textbook, including the three key criteria that.', answer: 'Sociology is the study of human social life, groups, and societies that follows',
                  options: ['Sociology is the study of human social life, groups, and societies that follows', 'study of society', 'sociology is a science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics) and that qualitative.' },
                { id: 'b', prompt: 'A student claims: "Sociology is just common sense made complicated.', answer: 'Step 1: Identify the common sense claim—"joint families are breaking down',
                  options: ['Step 1: Identify the common sense claim—"joint families are breaking down', 'reasons for breakdown', 'sociology is a science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics) and that qualitative.' }
          ],
            remediations: { 'sociology-is-a-science-means': { steps: ['If the student holds this misconception, do NOT simply define "qualitative research." Instead: (1) Give them two 1-page.', 'How could another researcher check their work?" (3) Guide them to identify: sampling logic, recording procedures,.', '(4) Conclude: "Science is the *discipline* of the method, not the *type* of data."'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics).',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Indian sociology is merely an imitation of Western sociology because it uses Western concepts like \'class\', \'bureaucracy\', and.', answer: 'The claim is partially true in origin but false in practice',
                  options: ['The claim is partially true in origin but false in practice', 'Indian sociology is different', 'it\'s all borrowed', 'sociology is a science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics) and that qualitative.' }
          ],
            remediations: { 'sociology-is-a-science-means': { steps: ['If the student holds this misconception, do NOT simply define "qualitative research." Instead: (1) Give them two 1-page.', 'How could another researcher check their work?" (3) Guide them to identify: sampling logic, recording procedures,.', '(4) Conclude: "Science is the *discipline* of the method, not the *type* of data."'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_005', difficulty: 'standard',
          question: 'The Enlightenment (late 17th–18th century European intellectual movement.',
          hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three.',
          misconception: 'Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then Industrial.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Industrial Revolution happened in England, so why does NCERT say Indian sociology must study European origins?', answer: 'Step 1: Capitalism in the West entailed worldwide expansion',
                  options: ['Step 1: Capitalism in the West entailed worldwide expansion', 'Auguste Comte founded sociology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then Industrial Revolution, then French.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['If a student cannot explain the *interconnections* between the three revolutions, do this 4-step remediation: (1) Draw.', '(2) On each edge, write one specific causal link from the NCERT text (e.g., Enlightenment→Industrial: "scientific.', '(3) Ask the student to pick *one* early sociologist (Comte, Marx, Spencer) and trace how *all three* vertices shaped.', '(4) Have them rewrite the "chronological list" paragraph as a "causal triangle" paragraph using the edges they drew.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then Industrial.',
          parts: [
                { id: 'a', prompt: 'The NCERT text quotes Marx: "The factory was oppressive. Yet potentially liberating.', answer: 'the specific material conditions in factories that were oppressive, and (',
                  options: ['the specific material conditions in factories that were oppressive, and (', 'Auguste Comte founded sociology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then Industrial Revolution, then French.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['If a student cannot explain the *interconnections* between the three revolutions, do this 4-step remediation: (1) Draw.', '(2) On each edge, write one specific causal link from the NCERT text (e.g., Enlightenment→Industrial: "scientific.', '(3) Ask the student to pick *one* early sociologist (Comte, Marx, Spencer) and trace how *all three* vertices shaped.', '(4) Have them rewrite the "chronological list" paragraph as a "causal triangle" paragraph using the edges they drew.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_006', difficulty: 'standard',
          question: 'Capitalism is an economic system based on private ownership of the means of.',
          hint: 'Revisit C. Wright Mills\' distinction between "troubles" and "issues" (node 002) and the.',
          misconception: 'Students often think "industrialisation" is a single uniform process that happened to all countries similarly.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The indentured labour system (girmitiya) was just a labour contract; slavery was abolished, so these workers were free." Using the NCERT\'s.', answer: 'The claim is sociologically inadequate',
                  options: ['The claim is sociologically inadequate', 'industrialisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "industrialisation" is a single uniform process that happened to all countries similarly.' }
          ],
            remediations: { 'industrialisation-is-a-single-uniform': { steps: ['**Confront the data**: Show the 1810/1910 urbanisation statistics for Britain alongside India\'s census data (1901:.', 'Ask: "If industrialisation automatically causes urbanisation, why did India\'s urban share barely rise during peak.', '**Trace the commodity chain**: Map cotton: Indian raw cotton → Lancashire mills → Manchester cloth → Indian markets →.', 'Have the student draw this flow chart.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "industrialisation" is a single uniform process that happened to all countries similarly.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Karl Marx\'s analysis of British rule in India (1853) was Eurocentric because he saw colonialism as a necessary destructive.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'Marx was totally wrong', 'Marx was totally right', 'industrialisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "industrialisation" is a single uniform process that happened to all countries similarly.' }
          ],
            remediations: { 'industrialisation-is-a-single-uniform': { steps: ['**Confront the data**: Show the 1810/1910 urbanisation statistics for Britain alongside India\'s census data (1901:.', 'Ask: "If industrialisation automatically causes urbanisation, why did India\'s urban share barely rise during peak.', '**Trace the commodity chain**: Map cotton: Indian raw cotton → Lancashire mills → Manchester cloth → Indian markets →.', 'Have the student draw this flow chart.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_007', difficulty: 'standard',
          question: 'The growth of sociology in India refers to the historical process through which.',
          hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c11_soc_cbse_01_009.',
          misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the western distinction between sociology (study of modern, industrialised societies) and social anthropology (study of simple,.', answer: 'In India, "the other"',
                  options: ['In India, "the other"', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' },
                { id: 'b', prompt: 'Compare the colonial portrayal of the Indian village as "unchanging" and "the infancy of society" with M.N.', answer: 'The colonial view froze Indian society in an evolutionary past to justify rule',
                  options: ['The colonial view froze Indian society in an evolutionary past to justify rule', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' }
          ],
            remediations: { 'indian-sociology-simply-copied-western': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Give them Ghurye\'s 1932 "Caste and Race in.', '(2) Assign Srinivas\'s "Social Change in Modern India" (1966) introduction where he explains why the village study.', '(3) Ask the student to rewrite their misconception as: "Indian sociologists strategically appropriated western methods.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Indian sociology\'s convergence of sociology and social anthropology was a necessary adaptation to India\'s social reality, not merely an.', answer: 'The claim is valid',
                  options: ['The claim is valid', 'just a compromise', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' },
                { id: 'b', prompt: 'Compare the colonial portrayal of the Indian village as "unchanging" and "the infancy of society" with M.N.', answer: 'The colonial view froze Indian society in an evolutionary past to justify rule',
                  options: ['The colonial view froze Indian society in an evolutionary past to justify rule', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' }
          ],
            remediations: { 'indian-sociology-simply-copied-western': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Give them Ghurye\'s 1932 "Caste and Race in.', '(2) Assign Srinivas\'s "Social Change in Modern India" (1966) introduction where he explains why the village study.', '(3) Ask the student to rewrite their misconception as: "Indian sociologists strategically appropriated western methods.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_008', difficulty: 'standard',
          question: 'Sociology is the systematic study of human social life, groups, and societies.',
          hint: 'Revisit c11_soc_cbse_01_003 (sociology as scientific study) and c11_soc_cbse_01_004.',
          misconception: 'Students often think "interdisciplinary relationship" means each discipline studies a *separate* slice of society.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sociology is the systematic study of human social life, groups, and societies that',
                  options: ['Sociology is the systematic study of human social life, groups, and societies that', 'The dialectical relationship between individual and society refers to the ongoing,', 'Sociology is the systematic and scientific study of human society, social relationships,', 'The Enlightenment (late 17th–18th century European intellectual movement emphasizing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "interdisciplinary relationship" means each discipline studies a *separate* slice of society (economics → market,.' }
          ],
            remediations: { 'interdisciplinary-relationship-means-each-discip': { steps: ['Ask the student to pick one Indian news headline from the past week (e.g., "Farmers\' Protest Enters 100th Day" or "New.', 'Have them write three one-sentence summaries: how an economist, a political scientist, and a sociologist would *each*.', 'Compare the three sentences side-by-side and highlight words that appear in more than one (e.g., "power", "class",.', 'Explicitly state: "Sociology\'s job is to explain *why those words appear in all three* — because the same social.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "interdisciplinary relationship" means each discipline studies a *separate* slice of society.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Psychology explains individual behaviour; sociology explains group behaviour — so they don\'t overlap." Use the concept of social.', answer: 'The statement is false',
                  options: ['The statement is false', 'interdisciplinary relationship', 'findings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "interdisciplinary relationship" means each discipline studies a *separate* slice of society (economics → market,.' }
          ],
            remediations: { 'interdisciplinary-relationship-means-each-discip': { steps: ['Ask the student to pick one Indian news headline from the past week (e.g., "Farmers\' Protest Enters 100th Day" or "New.', 'Have them write three one-sentence summaries: how an economist, a political scientist, and a sociologist would *each*.', 'Compare the three sentences side-by-side and highlight words that appear in more than one (e.g., "power", "class",.', 'Explicitly state: "Sociology\'s job is to explain *why those words appear in all three* — because the same social.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
