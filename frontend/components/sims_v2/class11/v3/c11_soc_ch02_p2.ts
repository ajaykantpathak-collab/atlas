import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch02_p2: SimDef = {
    id: 'v3_c11_soc_ch02_p2',
    title: 'Terms, Concepts and Their Use in Sociology · Part 2/2',
    subtitle: 'Learn why a shared label is not a shared life.',
    classLevel: 11, subject: 'sociology', topic: 'Terms, Concepts and Their Use in Sociology · Part 2/2',
    chapters: ['c11_soc_ch02'],
    nodeIds: ['c11_soc_cbse_02_007', 'c11_soc_cbse_02_008', 'c11_soc_cbse_02_009', 'c11_soc_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist auditing which collections deserve the name \'group\'', intro: 'A thousand strangers share the label \'Delhiite\' — they also share nothing else; the group begins where interaction begins.', goal: 'Distinguish social groups from categories and use status, role and institution precisely.' },
    discovery: {
        question: 'Teenagers share an age and a world of problems — so they\'re a social group?',
        options: ['No — it\'s a statistical category; a group needs interaction, roles and a sense of \'we\', not just a common label', 'Yes — a shared label makes a group', 'Yes — they\'re even a primary group', 'No — only families count as groups'],
        answer: 'No — it\'s a statistical category; a group needs interaction, roles and a sense of \'we\', not just a common label',
        hook: 'A status outlives its holder — the principal\'s chair carries rights and duties no matter who sits in it; the concept is a slot, not a person.',
    },
    teaching: [
        { title: 'Deviance: Definition and the Social Construction of Deviance', text: 'Deviance is the sociological concept referring to behaviours, actions, or conditions that violate socially established norms and elicit negative sanctions from a group or society; it is not.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate quasi-groups from real ones, then test whether contested concepts like \'caste\' are too unstable for scientific study.',
        labels: ['Deviance: Definition and', 'Honour Killing as', 'Identity: Sources and', 'Functionalist and Conflict Perspectives'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_007', title: 'Deviance: Definition and the Social Construction of Deviance',
          caseStudy: { intro: 'Imagine a young woman in a Haryana village who marries a man from a different caste against her family\'s wishes — the village panchayat declares this \'deviant\'.',
            decisions: [{ prompt: 'Define deviance in sociological terms and state the two key reasons why an act considered deviant in one society may be normative.', options: [
                { text: 'Correct answer: Deviance refers to modes of action that do not conform to norms or values', outcome: 'Correct answer: Deviance refers to modes of action that do not conform to norms or values held.' },
                { text: 'stealing is deviant', outcome: 'Not quite — Students believe deviance resides in the *act itself* (e.g., "stealing is deviant because it harms.', reveals: 'deviance-resides-in-the-act' },
                { text: 'Honour killing is deviant', outcome: 'Not quite — Students believe deviance resides in the *act itself* (e.g., "stealing is deviant because it harms.', reveals: 'deviance-resides-in-the-act' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_008', title: 'Honour Killing as an Extreme Form of Informal Social Control',
          caseStudy: { intro: 'Imagine reading a newspaper headline: "Brother beheads sister for marrying outside caste; khap panchayat had ordered couple to separate." You wonder: why would.',
            decisions: [{ prompt: 'Define honour killing in sociological terms as a form of social control, specifying the type of control (formal/informal), the nature.', options: [
                { text: 'Honour killing is an extreme form of **informal social control** where **negative', outcome: 'Honour killing is an extreme form of **informal social control** where **negative sanctions**.' },
                { text: 'formal social control', outcome: 'Not quite — Students often think honour killing is "deviance by the killers" because murder is a crime.', reveals: 'honour-killing-is-deviance-by' },
                { text: 'deviance by the killers', outcome: 'Not quite — Students often think honour killing is "deviance by the killers" because murder is a crime.', reveals: 'honour-killing-is-deviance-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_009', title: 'Identity: Sources and the Social Construction of Identity',
          caseStudy: { intro: 'Imagine you are filling out a college admission form that asks for your name, gender, religion, caste, mother tongue, state of domicile, and parents\'.',
            decisions: [{ prompt: 'Define "identity" in the sociological sense as distinct from the everyday psychological sense, and list the four main sources of identity.', options: [
                { text: 'Sociologically, identity is the distinctive characteristic of a person or group relating', outcome: 'Sociologically, identity is the distinctive characteristic of a person or group relating to who.' },
                { text: 'personality traits', outcome: 'Not quite — Students conflate "identity" with "personality" or "self-concept," treating it as an internal.', reveals: 'students-conflate-identity-with-personality' },
                { text: 'self-concept', outcome: 'Not quite — Students conflate "identity" with "personality" or "self-concept," treating it as an internal.', reveals: 'students-conflate-identity-with-personality' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_010', title: 'Functionalist and Conflict Perspectives on Society',
          caseStudy: { intro: 'Imagine you are observing a lavish Indian wedding: hundreds of guests, elaborate rituals, significant expenditure, clear gender roles, caste-based customs.',
            decisions: [{ prompt: 'Define "collective conscience" in Durkheim\'s functionalism and "class consciousness" in Marx\'s conflict theory.', options: [
                { text: 'Collective conscience (Durkheim) is the shared beliefs, values, and moral attitudes that', outcome: 'Collective conscience (Durkheim) is the shared beliefs, values, and moral attitudes that operate.' },
                { text: 'shared awareness', outcome: 'Not quite — Students treat functionalism and conflict theory as *opinions* ("optimistic vs.', reveals: 'students-treat-functionalism-and-conflict' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing sociology exam answers, a student defines status as \'your position in society\' and calls \'teenagers\' a primary social group \'because they share an age and problems.\'',
            decisions: [{ prompt: 'What does sociological precision demand instead?', options: [
                { text: 'Upgrade both concepts: status isn\'t a loose \'position\' — it\'s a structurally defined slot carrying normative rights and duties, existing independently of who fills it, forming status sets. And a social group needs persistent patterned interaction, shared belonging and structure — \'teenagers\' is a statistical category (quasi-group) lacking mutual awareness until organised into something like a youth club.', outcome: 'His answers gain analytical teeth: sociological terms do theoretical work that everyday labels don\'t — a category isn\'t a group until interaction and structure exist.' },
                { text: 'Keep the everyday senses — sociology\'s terms are just formal names for familiar things.', outcome: 'The point of the terminology is rupture from common sense: memorising the label without the structural content misses what the concept explains.', reveals: 'fancy-words-for-familiar-things' },
                { text: 'Accept \'teenagers\' as a group — shared age creates shared identity.', outcome: 'A label isn\'t a bond: without patterned interaction, norms and collective consciousness, an age bracket stays a category — group formation is something extra.', reveals: 'category-equals-group' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'A status is a position with normative rights and duties; the person occupying it is replaceable — that\'s what makes it structural.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_007', difficulty: 'standard',
          question: 'Deviance is the sociological concept referring to behaviours, actions,.',
          hint: 'Revisit c11_soc_cbse_02_006: Practice identifying formal vs informal control agencies.',
          misconception: 'Students believe deviance resides in the *act itself* (e.g., "stealing is deviant because it harms others") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Deviance is the sociological concept referring to behaviours, actions, or conditions that',
                  options: ['Deviance is the sociological concept referring to behaviours, actions, or conditions that', 'Sociological terminology refers to the precise, technical vocabulary developed by', 'A social group is a collection of individuals who engage in persistent, patterned', 'Social stratification is the systematic ranking of social groups into a hierarchy based'],
                  hint: 'Revisit c11_soc_cbse_02_006: Practice identifying formal vs informal control agencies (law/police.',
                  misconception: 'Students believe deviance resides in the *act itself* (e.g., "stealing is deviant because it harms others") rather than in the *social.' }
          ],
            remediations: { 'deviance-resides-in-the-act': { steps: ['Ask the student to list three acts they consider \'universally deviant\' (e.g., murder, theft, incest).', 'For each, guide them to find a historical or cultural context where that act was *not* defined as deviant (war killing.', 'Have them complete a table: Act | Context A (Deviant) | Norm Violated | Sanction | Agency | Context B (Normative) |.', 'Ask: "What changed — the act or the social definition?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_008', difficulty: 'standard',
          question: 'Honour killing is the premeditated murder of a family member, typically.',
          hint: 'Revisit c11_soc_cbse_02_006 (Social Control) for the formal/informal table and.',
          misconception: 'Students often think honour killing is "deviance by the killers" because murder is a crime.',
          parts: [
                { id: 'a', prompt: 'Explain why honour killing is classified as "informal" social control despite involving murder, which is a crime under formal law.', answer: 'Honour killing is informal',
                  options: ['Honour killing is informal', 'it\'s informal because it\'s illegal', 'because no police are involved', 'deviance by the killers'],
                  hint: 'Revisit c11_soc_cbse_02_006 (Social Control) for the formal/informal table and c11_soc_cbse_02_007.',
                  misconception: 'Students often think honour killing is "deviance by the killers" because murder is a crime.' },
                { id: 'b', prompt: 'A young woman from a dominant caste marries a Dalit man against her family\'s wishes. Her family kills her.', answer: 'the specific norm violated, (',
                  options: ['the specific norm violated, (', 'society at large', 'formal punishment', 'deviance by the killers'],
                  hint: 'Revisit c11_soc_cbse_02_006 (Social Control) for the formal/informal table and c11_soc_cbse_02_007.',
                  misconception: 'Students often think honour killing is "deviance by the killers" because murder is a crime.' },
                { id: 'c', prompt: 'Compare honour killing with formal legal punishment for the same act (e.g., a court sentencing a murderer).', answer: '| Dimension | Honour Killing (Informal) | Formal Legal Punishment |',
                  options: ['| Dimension | Honour Killing (Informal) | Formal Legal Punishment |', 'community honour', 'both punish wrongdoing', 'deviance by the killers'],
                  hint: 'Revisit c11_soc_cbse_02_006 (Social Control) for the formal/informal table and c11_soc_cbse_02_007.',
                  misconception: 'Students often think honour killing is "deviance by the killers" because murder is a crime.' }
          ],
            remediations: { 'honour-killing-is-deviance-by': { steps: ['If the student persists in calling the killing "deviance by the killers," do this 3-step remediation: (1) Return to the.', '"State Legal Norms." List the victim\'s act and the killer\'s act in each.', '(3) Ask: "In the caste community\'s eyes, who violated the norm?', 'Who enforced it?" This forces the shift from legalistic to sociological lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_009', difficulty: 'standard',
          question: 'Identity refers to the distinctive characteristics of a person or group that.',
          hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify how collectivities form, and.',
          misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement.',
          parts: [
                { id: 'a', prompt: 'A student says: "My identity as a \'Brahmin\' is fixed by birth and biology, so it cannot be socially constructed." Using the distinction between ascribed status.', answer: 'While caste is an ascribed status assigned at birth, its meaning, hierarchy, and',
                  options: ['While caste is an ascribed status assigned at birth, its meaning, hierarchy, and', 'ascribed at birth', 'biologically determined', 'What are the sources of your identity?'],
                  hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify how collectivities form, and.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than.' },
                { id: 'b', prompt: 'Compare how "national identity" and "caste identity" function as sources of identity in modern India.', answer: 'the role of the state in constructing each, (',
                  options: ['the role of the state in constructing each, (', 'What are the sources of your identity?', 'I am hardworking, honest, and shy'],
                  hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify how collectivities form, and.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than.' }
          ],
            remediations: { 'students-conflate-identity-with-personality': { steps: ['Ask the student to list five "labels" others use for them (e.g., "son," "Muslim," "Tamil," "poor," "student").', 'For each, identify: Who assigns this label?', 'What group does it connect you to?', 'What expectations come with it?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Globalization weakens all traditional identities (caste, religion, tribe) and replaces them with a universal consumer identity." Use the.', answer: 'The claim is partially true but sociologically incomplete',
                  options: ['The claim is partially true but sociologically incomplete', 'What are the sources of your identity?', 'I am hardworking, honest, and shy'],
                  hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify how collectivities form, and.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than.' }
          ],
            remediations: { 'students-conflate-identity-with-personality': { steps: ['Ask the student to list five "labels" others use for them (e.g., "son," "Muslim," "Tamil," "poor," "student").', 'For each, identify: Who assigns this label?', 'What group does it connect you to?', 'What expectations come with it?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_010', difficulty: 'standard',
          question: 'Functionalism views society as a system of interrelated parts (institutions.',
          hint: 'Revisit nodes c11_soc_cbse_02_003 (stratification), c11_soc_cbse_02_004 (status).',
          misconception: 'Students treat functionalism and conflict theory as *opinions* ("optimistic vs.',
          parts: [
                { id: 'a', prompt: 'Apply both perspectives to explain the persistence of khap panchayats (caste councils) in Haryana.', answer: 'Functionalist: (a) What positive functions do khap panchayats perform for social',
                  options: ['Functionalist: (a) What positive functions do khap panchayats perform for social', 'functions', 'conflicts'],
                  hint: 'Revisit nodes c11_soc_cbse_02_003 (stratification), c11_soc_cbse_02_004 (status).',
                  misconception: 'Students treat functionalism and conflict theory as *opinions* ("optimistic vs.' }
          ],
            remediations: { 'students-treat-functionalism-and-conflict': { steps: ['Ask the student to state the *ontological assumption* of each perspective in one sentence (Functionalism: "Society is.', 'Give a single social fact (e.g., "Dowry persists despite legal ban").', 'Require the student to generate *two distinct research questions* — one from each assumption — without using "good/bad".', 'Have them identify which *specific concepts* (collective conscience, anomie, surplus value, false consciousness) each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
