import type { SimDef } from '../../engine/types';
import C12_SociologyCulturalChangeSim from '../../../simulations/c6_12/C12_SociologyCulturalChangeSim';

/** v3 wrapped master — C12_SociologyCulturalChangeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologyculturalchangesim: SimDef = {
    id: 'v3w_c12_sociologyculturalchangesim',
    title: 'Modernisation as a Process of Cultural Change: Definition and Features',
    subtitle: 'This node covers the sociological definition and core features of modernisation as a.',
    classLevel: 12, subject: 'sociology', topic: 'Modernisation as a Process of Cultural Change: Definition and Features',
    chapters: [],
    nodeIds: ['c12_soc_cbse_09_001', 'c12_soc_cbse_09_003', 'c12_soc_cbse_09_008', 'c12_soc_cbse_09_010', 'c12_soc_cbse_09_011', 'c12_soc_cbse_10_010', 'c12_soc_cbse_02_004', 'c12_soc_cbse_09_002', 'c12_soc_cbse_03_004', 'c12_soc_cbse_03_007', 'c12_soc_cbse_03_008', 'c12_soc_cbse_03_009', 'c12_soc_cbse_04_009', 'c12_soc_cbse_09_004', 'c12_soc_cbse_09_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a young woman from a traditional weaving family in Varanasi who gets a B.Tech degree, works in a.', goal: 'Master Modernisation as a Process of Cultural Change: Definition and Features.' },
    discovery: {
        question: 'Apply the concept of "achieved vs. ascribed identity" to analyse this situation: A Dalit student clears UPSC, becomes an IAS officer, but his marriage is still.',
        options: ['Partial modernisation', 'fully modernised', 'not modernised because arranged marriage'],
        answer: 'Partial modernisation',
        hook: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza,.',
    },
    teaching: [
        { title: 'Modernisation is a sociological process of.', text: 'Modernisation is a sociological process of cultural change where traditional, local, and parochial orientations are replaced by universal commitments, scientific rationality, individualism,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_001', title: 'Modernisation is a sociological process.',
          scaffold: { problem: 'A sociologist studies two villages in Tamil Nadu. Village A: Most households have smartphones, motorcycles, and LPG connections.',
            steps: [
            { text: 'List Rudolph & Rudolph\'s 7 features of modernisation: universalism, rationality, individualism, choice-based.' },
            { text: 'Map Village A practices: smartphones/motorcycles/LPG = material technology (modernisation\'s material base) BUT.' },
            { text: 'Map Village B practices: women reservation/Dalit president = universalism (citizenship over caste), achieved political.' },
            { text: 'Compare: Village A shows technological adoption without value/structural change (westernisation/modernisation of things.' },
            { text: 'Conclude: Village B is more modernised sociologically. Modernisation is about values and social relations, not gadgets.', faded: true, blankAnswer: 'Village B is more modernised sociologically because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_003', title: 'Critiques of Sanskritisation refer to.',
          scaffold: { problem: 'A sociologist studies the "Rathore" community (fictional), traditionally classified as Shudra, who over 30 years have: (a) adopted.',
            steps: [
            { text: 'Identify the process — this is Sanskritisation (lower caste adopting dwija customs for status mobility).' },
            { text: 'Apply Critique 1 (Positional vs Structural) — the Rathores\' *position* may have risen locally (e.g., better temple.' },
            { text: 'Apply Critique 2 (Ideological Conservatism) — by adopting vegetarianism/Brahmin priests, Rathores validate.' },
            { text: 'Apply Critique 4 (Gendered Consequences) — shift from bride-price (valuing women\'s labour) to dowry (treating daughters.' },
            { text: 'Apply Critique 5 (Erosion of Dalit/Lower-Caste Culture) — if Rathores had distinct folk deities, oral epics, or.' },
            { text: 'Synthesize — the case illustrates all five critiques simultaneously: mobility without equality, internalised.', faded: true, blankAnswer: 'The Rathore case demonstrates: (1) Positional change.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_008', title: 'The Orientalist-Anglicist debate refers.',
          scaffold: { problem: 'A CBSE board question asks: "Explain how Raja Ram Mohun Roy\'s campaign against sati illustrates the interplay of Orientalist and Anglicist.',
            steps: [
            { text: 'Identify the two intellectual resources — Orientalist (Hindu shastras, Persian/Islamic texts) and Anglicist.' },
            { text: 'Cite Roy\'s Orientalist move — he wrote in Persian (*Tuhfat-ul-Muwahhidin*, 1803) and Bengali, citing Manusmriti and.' },
            { text: 'Cite Roy\'s Anglicist move — he petitioned the British Parliament (1823, 1830), invoked "natural rights of women,".' },
            { text: 'Synthesise — Roy did not choose one; he used shastric authority to delegitimise the orthodox *within* Hindu tradition,.' },
            { text: 'Conclude — This dual strategy became the template for later reformers (Vidyasagar, Ranade, Syed Ahmed Khan).', faded: true, blankAnswer: 'Raja Ram Mohun Roy combined Orientalist textual exegesis.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_010', title: 'The role of the state in cultural.',
          scaffold: { problem: 'A village in Haryana has a Khap Panchayat that issues a diktat against inter-caste marriage.',
            steps: [
            { text: 'Identify the legal framework — inter-caste marriage is legal under the Hindu Marriage Act 1955 and Special Marriage Act.' },
            { text: 'Identify the cultural framework — the Khap asserts customary authority over marriage, invoking \'bhaichara\'.' },
            { text: 'Analyse the gap — police inaction reflects \'legal pluralism\' where state law coexists with customary norms, and local.' },
            { text: 'Apply \'state capacity\' — the state has legislative capacity (laws exist) but weak implementational capacity (police.' },
            { text: 'Conclude — cultural change requires not just laws but bureaucratic insulation from local power structures and judicial.', faded: true, blankAnswer: 'The state has legal authority but fails in enforcement due.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_011', title: 'Contemporary cultural change in India.',
          scaffold: { problem: 'A 28-year-old software engineer in Pune earns ₹1.5 lakh/month.',
            steps: [
            { text: 'Identify the subject\'s structural position — service-sector professional, high disposable income, urban,.' },
            { text: 'Map his cultural practices into two clusters: (A) Traditional/ritual (Ganesh visarjan, caste-filtered marriage) and (B).' },
            { text: 'Apply \'consumerism\' — his SUV and vacation are not just utility; they signal status in a peer group where consumption =.' },
            { text: 'Apply \'hybridity\' — he does not replace tradition with modernity; he curates both.' },
            { text: 'Conclude — he embodies the new middle class: globally connected, locally embedded, using consumption to negotiate.', faded: true, blankAnswer: 'The subject occupies the new middle class — a fraction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_10_010', title: 'Civil society refers to the sphere of.',
          scaffold: { problem: 'A village in Madhya Pradesh faces illegal sand mining destroying riverbeds and agriculture.',
            steps: [
            { text: 'Identify the grievance holders — not just "villagers" but specific groups: small farmers losing topsoil, fisherfolk.' },
            { text: 'Activate existing civil society — approach the local Jal Biradari (water community network), the Kisan Sabha (peasant.' },
            { text: 'Frame the issue — shift from "illegal mining" (legal-administrative frame) to "river as commons, livelihood as right".' },
            { text: 'Escalate tactics — start with Gram Sabha resolutions and RTI applications (institutional), move to gherao of mining.' },
            { text: 'Sustain and institutionalise — demand a River Regulation Authority with community representation; if won, monitor.', faded: true, blankAnswer: 'The movement emerges through five stages: (1) grievance.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_09_003', title: 'Identify each idea',
          dissect: { specimen: 'Modernisation as a Process of Cultural Change: Definition and Features', spots: [
            { id: 's1', label: 'Modernisation is a sociological process', prompt: 'Which idea is this? — Modernisation is a sociological process of cultural change where traditional, local, and.', answer: 'Modernisation is a sociological process', options: ['Modernisation is a sociological process', 'Critiques of Sanskritisation refer to', 'The Orientalist-Anglicist debate refers to', 'The role of the state'] },
            { id: 's2', label: 'Critiques of Sanskritisation refer to', prompt: 'Which idea is this? — Critiques of Sanskritisation refer to the sociological arguments that challenge M.N.', answer: 'Critiques of Sanskritisation refer to', options: ['Critiques of Sanskritisation refer to', 'Modernisation is a sociological process', 'The Orientalist-Anglicist debate refers to', 'The role of the state'] },
            { id: 's3', label: 'The Orientalist-Anglicist debate refers to', prompt: 'Which idea is this? — The Orientalist-Anglicist debate refers to the 19th-century colonial policy conflict over.', answer: 'The Orientalist-Anglicist debate refers to', options: ['The Orientalist-Anglicist debate refers to', 'Modernisation is a sociological process', 'Critiques of Sanskritisation refer to', 'The role of the state'] },
            { id: 's4', label: 'The role of the state', prompt: 'Which idea is this? — The role of the state in cultural change refers to the deliberate use of state power —.', answer: 'The role of the state', options: ['The role of the state', 'Modernisation is a sociological process', 'Critiques of Sanskritisation refer to', 'The Orientalist-Anglicist debate refers to'] },
            { id: 's5', label: 'Contemporary cultural change in India', prompt: 'Which idea is this? — Contemporary cultural change in India refers to the transformation of lifestyles, values,.', answer: 'Contemporary cultural change in India', options: ['Contemporary cultural change in India', 'Modernisation is a sociological process', 'Critiques of Sanskritisation refer to', 'The Orientalist-Anglicist debate refers to'] },
            { id: 's6', label: 'Civil society refers to the', prompt: 'Which idea is this? — Civil society refers to the sphere of voluntary associations, organisations, and.', answer: 'Civil society refers to the', options: ['Civil society refers to the', 'Modernisation is a sociological process', 'Critiques of Sanskritisation refer to', 'The Orientalist-Anglicist debate refers to'] }
          ] } }
    ],
    explore: { component: C12_SociologyCulturalChangeSim, prompt: 'Explore the interactive — Modernisation as a Process of Cultural Change: Definition and Features' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_001', difficulty: 'standard',
          question: 'Modernisation is a sociological process of cultural change where traditional,.',
          hint: 'Revisit Class 11 Chapter 4 (Culture) nodes c11_soc_cbse_04_001 and c11_soc_cbse_04_002.',
          misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza,.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "achieved vs. ascribed identity" to analyse this situation: A Dalit student clears UPSC, becomes an IAS officer, but his marriage is still.', answer: 'Partial modernisation',
                  options: ['Partial modernisation', 'fully modernised', 'not modernised because arranged marriage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' },
                { id: 'b', prompt: 'Compare and contrast modernisation and westernisation using the example of a middle-class family in Delhi that: (a) uses a washing machine, (b) celebrates.', answer: 'uses a washing machine, (',
                  options: ['uses a washing machine, (', 'A wrong answer classifying all four as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' }
          ],
            remediations: { 'students-equate-modernisation-with-becoming': { steps: ['If the student conflates modernisation with westernisation: Step 1 — Have them re-read Rudolph & Rudolph\'s 7 features.', 'Step 2 — Give two columns: "Modernisation (values/structure)" vs "Westernisation (forms/culture)".', 'Step 3 — Practice classifying 10 practices (e.g., love marriage, jeans, RTI filing, Diwali LED lights, women in combat.', 'Step 4 — Ask: "Can a society be modernised but not westernised?'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza,.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast modernisation and westernisation using the example of a middle-class family in Delhi that: (a) uses a washing machine, (b) celebrates.', answer: 'uses a washing machine, (',
                  options: ['uses a washing machine, (', 'A wrong answer classifying all four as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' }
          ],
            remediations: { 'students-equate-modernisation-with-becoming': { steps: ['If the student conflates modernisation with westernisation: Step 1 — Have them re-read Rudolph & Rudolph\'s 7 features.', 'Step 2 — Give two columns: "Modernisation (values/structure)" vs "Westernisation (forms/culture)".', 'Step 3 — Practice classifying 10 practices (e.g., love marriage, jeans, RTI filing, Diwali LED lights, women in combat.', 'Step 4 — Ask: "Can a society be modernised but not westernised?'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_003', difficulty: 'standard',
          question: 'Critiques of Sanskritisation refer to the sociological arguments that challenge.',
          hint: 'Revisit the definition and the Kumud Pawade case study in node c12_soc_cbse_09_002; focus.',
          misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."**.',
          parts: [
                { id: 'a', prompt: 'A dominant OBC community in a region abandons its traditional bride-price system and adopts dowry after Sanskritising.', answer: 'The fourth critique states Sanskritisation leads to adoption of',
                  options: ['Correct answer: The fourth critique states Sanskritisation leads to adoption of', 'dowry is bad', 'Sanskritisation is criticised, so it is not a real process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."** They write:.' }
          ],
            remediations: { 'critiques-of-sanskritisation-mean-the': { steps: ['If a student conflates critique with denial: (1) Ask them to reread the Kumud Pawade excerpt (NCERT p.21) — does her.', '(2) Have them list three real-world examples of Sanskritisation they observe (e.g., meat-eating communities turning.', '(3) Then map each critique to those examples: "Does this example show positional change?', 'Does it involve adopting dowry?" This concretises the critiques as analytical lenses, not debunking tools.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."**.',
          parts: [
                { id: 'a', prompt: '"Evaluate the claim: \'The Backward Classes Movement and Dalit assertion movements prove Sanskritisation has failed as a strategy for social change.\'" Defend.', answer: 'Correct evaluation: The claim is largely valid',
                  options: ['Correct evaluation: The claim is largely valid', 'yes it failed', 'no it didn\'t', 'Sanskritisation is criticised, so it is not a real process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."** They write:.' }
          ],
            remediations: { 'critiques-of-sanskritisation-mean-the': { steps: ['If a student conflates critique with denial: (1) Ask them to reread the Kumud Pawade excerpt (NCERT p.21) — does her.', '(2) Have them list three real-world examples of Sanskritisation they observe (e.g., meat-eating communities turning.', '(3) Then map each critique to those examples: "Does this example show positional change?', 'Does it involve adopting dowry?" This concretises the critiques as analytical lenses, not debunking tools.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_008', difficulty: 'standard',
          question: 'The Orientalist-Anglicist debate refers to the 19th-century colonial policy.',
          hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity).',
          misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist,.',
          parts: [
                { id: 'a', prompt: 'Explain why the Dharma Sabha petitioned the British against the abolition of sati, despite being orthodox Hindus who typically resisted colonial interference.', answer: 'The Dharma Sabha petitioned the British',
                  options: ['The Dharma Sabha petitioned the British', 'they wanted to preserve tradition', 'Orientalist = conservative, Anglicist = progressive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist, Dayanand =.' },
                { id: 'b', prompt: 'Sir Syed Ahmed Khan argued for the compatibility of Quranic revelation with modern science and promoted *ijtihad* (free enquiry).', answer: 'Sir Syed\'s approach is a distinct synthesis, not a simple blend',
                  options: ['Sir Syed\'s approach is a distinct synthesis, not a simple blend', 'Orientalist = conservative, Anglicist = progressive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist, Dayanand =.' }
          ],
            remediations: { 'orientalist-conservative': { steps: ['If a student maps reformers into binary camps, do this: (1) Give them Box 2.1 from NCERT and ask: "For each reformer,.', '(3) Ask: "If Roy was purely Anglicist, why did he learn Sanskrit and Persian?', 'If Dayanand was purely Orientalist, why did he use printing presses and public debates?" (4) Re-diagnostic: "Explain.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Orientalist-Anglicist debate was resolved in favour of Anglicism after Macaulay\'s Minute (1835), so Indian social reformers after 1835.', answer: 'The claim is false',
                  options: ['The claim is false', 'Orientalist = conservative, Anglicist = progressive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist, Dayanand =.' },
                { id: 'b', prompt: 'Create a contemporary analogy: Identify a current Indian public debate (e.g., uniform civil code, temple entry, hijab in schools) where advocates on *both*.', answer: 'Example: Sabarimala temple entry (2018)',
                  options: ['Example: Sabarimala temple entry (2018)', 'Orientalist = conservative, Anglicist = progressive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist, Dayanand =.' }
          ],
            remediations: { 'orientalist-conservative': { steps: ['If a student maps reformers into binary camps, do this: (1) Give them Box 2.1 from NCERT and ask: "For each reformer,.', '(3) Ask: "If Roy was purely Anglicist, why did he learn Sanskrit and Persian?', 'If Dayanand was purely Orientalist, why did he use printing presses and public debates?" (4) Re-diagnostic: "Explain.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_010', difficulty: 'standard',
          question: 'The role of the state in cultural change refers to the deliberate use of state.',
          hint: 'If stuck, revisit c11_ps_cbse_11_003 (Fundamental Rights) and c12_soc_cbse_09_006.',
          misconception: 'Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability) automatically changes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of the state in cultural change refers to the deliberate use of state power',
                  options: ['The role of the state in cultural change refers to the deliberate use of state power', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N', 'The Orientalist-Anglicist debate refers to the 19th-century colonial policy conflict over'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability) automatically changes cultural behaviour.' }
          ],
            remediations: { 'passing-a-law-e': { steps: ['If the student equates legislation with cultural transformation: (1) Have them compare NFHS-5 data on child marriage.', '(3) Revisit c12_soc_cbse_09_006 (Secularisation) and c11_soc_cbse_03_008 (State and Sovereignty) to distinguish state.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_5.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_011', difficulty: 'standard',
          question: 'Contemporary cultural change in India refers to the transformation of.',
          hint: 'Revisit c12_soc_cbse_09_004 (Westernisation) and Activity 2.5 in NCERT — list 3 examples.',
          misconception: 'Students often equate the new middle class\'s cultural change with \'westernisation\' — assuming that consuming global.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Contemporary cultural change in India refers to the transformation of lifestyles, values,',
                  options: ['Contemporary cultural change in India refers to the transformation of lifestyles, values,', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N', 'The Orientalist-Anglicist debate refers to the 19th-century colonial policy conflict over'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate the new middle class\'s cultural change with \'westernisation\' — assuming that consuming global brands, speaking.' }
          ],
            remediations: { 'students-often-equate-the-new': { steps: ['If a student cannot distinguish westernisation (adoption of external forms) from modernisation (internalisation of.', '(2) Assign a 2-column table: Column A = \'Visible global forms adopted\' (jeans, English, iPhone); Column B =.', 'Fill with 5 real examples from their neighbourhood.', '(3) Ask: "Which column reflects westernisation?'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_010', difficulty: 'standard',
          question: 'Civil society refers to the sphere of voluntary associations, organisations,.',
          hint: 'Revisit c12_soc_cbse_10_003 (Fundamental Rights vs Directive Principles) and.',
          misconception: 'Students often think "civil society = NGOs" and "social movement = any large protest." This error arises because media.',
          parts: [
                { id: 'a', prompt: 'Apply the distinction between reformist, revolutionary, and reactionary social movements to classify: (a) Narmada Bachao Andolan, (b) RSS-led Ram Janmabhoomi.', answer: 'Narmada Bachao Andolan, (',
                  options: ['Narmada Bachao Andolan, (', 'reformist', 'revolutionary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "civil society = NGOs" and "social movement = any large protest." This error arises because media and policy discourse.' }
          ],
            remediations: { 'civil-society-ngos-and-social': { steps: ['Re-read the NCERT Box 3.6 (Max Weber on Parties) and Box 3.7 (pressure groups vs movements) to see how sociology.', 'Make a three-column table: Column A = 5 civil society groups you know (e.g., RWAs, trade union, mahila mandal, caste.', 'For each "Yes," identify the sustained collective identity and extra-institutional tactic.', 'Re-attempt Diagnostic Questions 2 and 3 using this table.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "civil society = NGOs" and "social movement = any large protest." This error arises because media.',
          parts: [
                { id: 'a', prompt: 'Design a hypothetical social movement campaign for a current local issue (e.g., water scarcity, air pollution, caste discrimination in housing) that.', answer: 'Stage 1 (Grievance): Document water tanker mafia pricing in a Delhi slum through',
                  options: ['Stage 1 (Grievance): Document water tanker mafia pricing in a Delhi slum through', 'civil society = NGOs', 'social movement = any large protest', '"civil society = NGOs" and "social movement = any large protest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "civil society = NGOs" and "social movement = any large protest." This error arises because media and policy discourse.' }
          ],
            remediations: { 'civil-society-ngos-and-social': { steps: ['Re-read the NCERT Box 3.6 (Max Weber on Parties) and Box 3.7 (pressure groups vs movements) to see how sociology.', 'Make a three-column table: Column A = 5 civil society groups you know (e.g., RWAs, trade union, mahila mandal, caste.', 'For each "Yes," identify the sustained collective identity and extra-institutional tactic.', 'Re-attempt Diagnostic Questions 2 and 3 using this table.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
