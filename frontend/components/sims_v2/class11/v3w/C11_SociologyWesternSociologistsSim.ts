import type { SimDef } from '../../engine/types';
import C11_SociologyWesternSociologistsSim from '../../../simulations/c6_12/C11_SociologyWesternSociologistsSim';

/** v3 wrapped master — C11_SociologyWesternSociologistsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologywesternsociologistssim: SimDef = {
    id: 'v3w_c11_sociologywesternsociologistssim',
    title: 'Western Sociologists',
    subtitle: 'This node covers the systematic comparison of Marx, Durkheim, and Weber as presented in.',
    classLevel: 11, subject: 'sociology', topic: 'Comparing Marx, Durkheim and Weber: Three Foundational Perspectives',
    chapters: [],
    nodeIds: ['c11_soc_cbse_09_012', 'c11_soc_cbse_01_007', 'c11_soc_cbse_01_009', 'c11_soc_cbse_10_002', 'c11_soc_cbse_10_007', 'c11_soc_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a sociologist hired to advise a government committee studying why workers in a gig-economy.', goal: 'Master Western Sociologists.' },
    discovery: {
        question: 'Explain in your own words why the western distinction between sociology (study of modern, industrialised societies) and social anthropology (study of simple,.',
        options: ['In India, "the other"', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
        answer: 'In India, "the other"',
        hook: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.',
    },
    teaching: [
        { title: 'Comparing Marx, Durkheim, and Weber involves.', text: 'Comparing Marx, Durkheim, and Weber involves systematically analyzing their distinct theoretical frameworks — Marx\'s historical materialism and class conflict, Durkheim\'s social facts and solidarity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_09_012', title: 'Comparing Marx, Durkheim, and Weber.',
          scaffold: { problem: 'A municipal corporation introduces a biometric attendance system for sanitation workers.',
            steps: [
            { text: 'Identify the core concept for Marx (mode of production, surplus value, control over labour process).' },
            { text: 'Identify the core concept for Durkheim (social fact, regulation, anomie).' },
            { text: 'Identify the core concept for Weber (rational-legal authority, bureaucracy, formal rationality).' },
            { text: 'Write Paragraph 1 (Marx): "The biometric device is a constant capital investment that transforms the labour process.' },
            { text: 'Write Paragraph 2 (Durkheim): "The attendance rule is a restitutive legal sanction reinforcing the contractual.' },
            { text: 'Write Paragraph 3 (Weber): "The system is a rational-legal bureaucratic instrument: hierarchical, documented, and.', faded: true, blankAnswer: 'Three paragraphs as drafted in Steps 4-6, each using only.' }
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
        { type: 'scaffold', nodeId: 'c11_soc_cbse_01_009', title: 'Sociology is the systematic study of.',
          scaffold: { problem: 'A Class 11 student reads a research paper titled "Caste and Code: Algorithmic Bias in Hiring Platforms." The author uses regression.',
            steps: [
            { text: 'Identify the methods used — regression analysis (quantitative, large-N) and in-depth interviews (qualitative, small-N).' },
            { text: 'Recall traditional disciplinary associations — surveys/statistics = sociology; ethnography/interviews = anthropology.' },
            { text: 'Note the subject matter — caste (traditional anthropological topic) in a modern industrial sector (IT, traditional.' },
            { text: 'Apply the Indian convergence principle — the paper *is* both; the author likely sits in a "Department of Sociology and.' },
            { text: 'Conclude that the paper exemplifies convergence: it uses sociological methods to test structural hypotheses and.', faded: true, blankAnswer: 'The paper cannot be classified as exclusively sociology or.' }
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
        { type: 'scaffold', nodeId: 'c11_soc_cbse_03_009', title: 'Citizenship rights, as theorised by.',
          scaffold: { problem: 'A 35-year-old migrant worker from Bihar works in a Gujarat textile factory.',
            steps: [
            { text: 'List all the worker\'s attributes: Aadhaar (legal identity), voted (political participation), no sanitation/health.' },
            { text: 'Map each attribute to Marshall\'s dimensions: Aadhaar → civil right (legal personality, property); Voting → political.' },
            { text: 'Assess realisation: Civil rights – partially realised (has identity but may lack equal legal protection in practice);.' },
            { text: 'Analyse causal links: Denial of social rights (health, education) undermines civil rights (cannot seek legal remedy.' },
            { text: 'Conclude: The worker has "formal citizenship" (civil-political) but lacks "substantive citizenship" (social).', faded: true, blankAnswer: 'Civil rights: partially realised (legal identity present,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_01_007', title: 'Identify each idea',
          dissect: { specimen: 'Western Sociologists', spots: [
            { id: 's1', label: 'Comparing Marx Durkheim and Weber', prompt: 'Which idea is this? — Comparing Marx, Durkheim, and Weber involves systematically analyzing their distinct.', answer: 'Comparing Marx Durkheim and Weber', options: ['Comparing Marx Durkheim and Weber', 'The growth of sociology in', 'Sociology is the systematic study', 'The colonial context of Indian'] },
            { id: 's2', label: 'The growth of sociology in', prompt: 'Which idea is this? — The growth of sociology in India refers to the historical process through which sociology.', answer: 'The growth of sociology in', options: ['The growth of sociology in', 'Comparing Marx Durkheim and Weber', 'Sociology is the systematic study', 'The colonial context of Indian'] },
            { id: 's3', label: 'Sociology is the systematic study', prompt: 'Which idea is this? — Sociology is the systematic study of modern, complex, industrialised societies, while.', answer: 'Sociology is the systematic study', options: ['Sociology is the systematic study', 'Comparing Marx Durkheim and Weber', 'The growth of sociology in', 'The colonial context of Indian'] },
            { id: 's4', label: 'The colonial context of Indian', prompt: 'Which idea is this? — The colonial context of Indian modernity refers to the historical condition where India\'s.', answer: 'The colonial context of Indian', options: ['The colonial context of Indian', 'Comparing Marx Durkheim and Weber', 'The growth of sociology in', 'Sociology is the systematic study'] },
            { id: 's5', label: 'DP Mukerjis concept of living', prompt: 'Which idea is this? — D.P. Mukerji\'s concept of \'living tradition\' refers to a dynamic social process where.', answer: 'DP Mukerjis concept of living', options: ['DP Mukerjis concept of living', 'Comparing Marx Durkheim and Weber', 'The growth of sociology in', 'Sociology is the systematic study'] },
            { id: 's6', label: 'Citizenship rights as theorised by', prompt: 'Which idea is this? — Citizenship rights, as theorised by T.H. Marshall, are the three interlinked dimensions.', answer: 'Citizenship rights as theorised by', options: ['Citizenship rights as theorised by', 'Comparing Marx Durkheim and Weber', 'The growth of sociology in', 'Sociology is the systematic study'] }
          ] } }
    ],
    explore: { component: C11_SociologyWesternSociologistsSim, prompt: 'Explore the interactive — Western Sociologists' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_012', difficulty: 'standard',
          question: 'Comparing Marx, Durkheim, and Weber involves systematically analyzing their.',
          hint: 'If stuck, return to the specific thinker\'s node (c11_soc_cbse_09_003 for Marx,.',
          misconception: 'Students often treat the three thinkers as offering "different opinions on the same topic" like panelists on a talk.',
          parts: [
                { id: 'a', prompt: 'State the one core concept that each thinker uses to explain social order: Marx, Durkheim, and Weber.', answer: 'Marx: mode of production (economic base determining superstructure)',
                  options: ['Marx: mode of production (economic base determining superstructure)', 'Marx uses social facts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the three thinkers as offering "different opinions on the same topic" like panelists on a talk show, leading them to.' },
                { id: 'b', prompt: 'A new city metro system is built. Using each thinker\'s framework, write one sentence describing what the metro represents for (a) Marx, (b) Durkheim, (c) Weber.', answer: 'Marx, (',
                  options: ['Marx, (', 'it helps people travel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the three thinkers as offering "different opinions on the same topic" like panelists on a talk show, leading them to.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Have the student create three flashcards, each with the thinker\'s name, their *unique* unit of analysis (class, social.', 'Give a single newspaper headline (e.g., "Gig Workers Protest Algorithm Changes") and require the student to write three.', 'If the student smuggles in another thinker\'s term (e.g., uses "class" in Durkheim sentence), stop and ask "Which.'] } } },
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
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_009', difficulty: 'standard',
          question: 'Sociology is the systematic study of modern, complex, industrialised societies,.',
          hint: 'If the Western definitions feel arbitrary, re-read the section "The Intellectual Ideas.',
          misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a.',
          parts: [
                { id: 'a', prompt: 'Compare the Western and Indian trajectories of sociology and social anthropology using the following axes: (a) subject matter, (b) typical method, (c).', answer: '| Axis | Western Trajectory | Indian Trajectory |',
                  options: ['Correct answer: | Axis | Western Trajectory | Indian Trajectory |', 'Department of Sociology and Social Anthropology', 'India followed the Western model initially but later merged'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a *theoretical* truth.' }
          ],
            remediations: { 'sociology-urban-modern-quantitative-and': { steps: ['Re-read the two Giddens definitions in the text and underline the keywords: "industrialised world" vs.', '"simple societies of non-western...', 'Read the Srinivas quote ("myriad \'others\'...', 'encountered literally next door") and write a one-sentence paraphrase: "In India, cultural difference is not.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a.',
          parts: [
                { id: 'a', prompt: '"Globalisation has made the distinction between sociology and social anthropology obsolete everywhere, not just in India." Evaluate this statement using.', answer: 'Correct evaluation: The statement is partially true but overstated',
                  options: ['Correct evaluation: The statement is partially true but overstated', 'sociology = urban/modern/quantitative', 'anthropology = rural/tribal/qualitative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a *theoretical* truth.' },
                { id: 'b', prompt: 'Design a research project on "The Impact of Digital Gig Work on Family Structure in a Tier-2 Indian City" that explicitly integrates one sociological and one.', answer: 'Expected answer: Research question: "How does algorithmic management in gig work',
                  options: ['Expected answer: Research question: "How does algorithmic management in gig work', 'sociology = urban/modern/quantitative', 'anthropology = rural/tribal/qualitative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a *theoretical* truth.' },
                { id: 'c', prompt: 'Compare the Western and Indian trajectories of sociology and social anthropology using the following axes: (a) subject matter, (b) typical method, (c).', answer: '| Axis | Western Trajectory | Indian Trajectory |',
                  options: ['Correct answer: | Axis | Western Trajectory | Indian Trajectory |', 'Department of Sociology and Social Anthropology', 'India followed the Western model initially but later merged', 'native'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a *theoretical* truth.' }
          ],
            remediations: { 'sociology-urban-modern-quantitative-and': { steps: ['Re-read the two Giddens definitions in the text and underline the keywords: "industrialised world" vs.', '"simple societies of non-western...', 'Read the Srinivas quote ("myriad \'others\'...', 'encountered literally next door") and write a one-sentence paraphrase: "In India, cultural difference is not.'] } } },
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
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_009', difficulty: 'standard',
          question: 'Citizenship rights, as theorised by T.H. Marshall, are the three interlinked.',
          hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) on Fundamental Rights.',
          misconception: 'Students often equate "citizenship rights" solely with Fundamental Rights (civil-political) and treat Directive.',
          parts: [
                { id: 'a', prompt: 'A tribal woman in Jharkhand has a voter ID card and votes regularly, but cannot access the Public Distribution System (PDS) because her village lacks a.', answer: 'Political rights (voting) are fulfilled',
                  options: ['Correct answer: Political rights (voting) are fulfilled', 'all rights are fulfilled'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "citizenship rights" solely with Fundamental Rights (civil-political) and treat Directive Principles as mere moral.' }
          ],
            remediations: { 'students-often-equate-citizenship-rights': { steps: ['If the student conflates dimensions, use the "Rights Triangle" activity: Draw a triangle with vertices labelled Civil,.', 'Give 10 right-cards (e.g., "free legal aid", "vote", "mid-day meal", "property", "unemployment allowance").', 'Ask the student to place each card on the correct vertex and justify.', 'For misplaced cards, ask: "Does this protect you from the state, let you control the state, or require the state to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
