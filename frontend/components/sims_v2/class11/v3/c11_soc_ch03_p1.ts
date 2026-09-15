import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch03_p1: SimDef = {
    id: 'v3_c11_soc_ch03_p1',
    title: 'Understanding Social Institutions · Part 1/2',
    subtitle: 'Tell the building from the institution — and the data from the modernisation myth.',
    classLevel: 11, subject: 'sociology', topic: 'Understanding Social Institutions · Part 1/2',
    chapters: ['c11_soc_ch03'],
    nodeIds: ['c11_soc_cbse_03_001', 'c11_soc_cbse_03_002', 'c11_soc_cbse_03_003', 'c11_soc_cbse_03_004', 'c11_soc_cbse_03_005', 'c11_soc_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist refusing to call a building a pattern', intro: 'The principal changed the rules; the institution didn\'t blink — institutions are the pattern, organisations merely their local costumes.', goal: 'Distinguish institutions from organisations and apply empirical checks to family-change theory.' },
    discovery: {
        question: 'Industrialisation marches in, and the nuclear family inevitably replaces the joint family — a law of modernisation?',
        options: ['No — Shah\'s evidence showed joint families grew with post-independence life expectancy; \'broken\' and \'modern\' family stories don\'t fit India', 'Yes — cities atomise kin', 'Yes — joint families are a relic', 'No — joint families never existed anyway'],
        answer: 'No — Shah\'s evidence showed joint families grew with post-independence life expectancy; \'broken\' and \'modern\' family stories don\'t fit India',
        hook: 'And your school isn\'t the institution — education is; the school is an organisation that embodies it, which is why a principal can change rules but not \'the institution.\'',
    },
    teaching: [
        { title: 'Social Institutions: Definition, Characteristics and Functionalist vs Conflict Perspectives', text: 'A social institution is a stable, structured pattern of norms, roles, values, and sanctions organised around the satisfaction of a fundamental societal need (e.g., family for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Correct \'school = institution\' into \'school = organisation,\' then weigh functionalist versus conflict readings of one institution.',
        labels: ['Social Institutions: Definition, Characteristics', 'Family: Definition, Functions, Types', 'Kinship: Consanguineous and Affinal', 'Marriage: Forms (Monogamy, Polygamy),', 'Religion as a Social', 'Education as a Social'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_001', title: 'Social Institutions: Definition, Characteristics and Functionalist vs Conflict Perspectives',
          caseStudy: { intro: 'Imagine you are waiting in a long queue at a government office to get a caste certificate.',
            decisions: [{ prompt: 'State the textbook definition of a social institution in your own words, ensuring you include the three elements: (a) rules acknowledged.', options: [
                { text: 'A social institution is an established pattern of rules (legal or customary) that', outcome: 'A social institution is an established pattern of rules (legal or customary) that operates.' },
                { text: 'continuous operation', outcome: 'Not quite — Students routinely equate "social institution" with "organisation" (e.g., "My school is.', reveals: 'students-routinely-equate-social-institution' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_003', title: 'Kinship: Consanguineous and Affinal Ties in Indian Society',
          caseStudy: { intro: 'Start by asking students to list all the relatives they interact with during a family wedding—notice how some are \'blood relatives\' (like cousins) while others.',
            decisions: [{ prompt: 'Define consanguineous kin and affinal kin as per the sociological understanding in the NCERT textbook.', options: [
                { text: 'Consanguineous kin are relatives related by blood/descent (e.g., parents, siblings,', outcome: 'Consanguineous kin are relatives related by blood/descent (e.g., parents, siblings, children).' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often think that \'consanguineous\' means only close blood relatives (parents, siblings) and.', reveals: 'consanguineous-means-only-close-blood' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_004', title: 'Marriage: Forms (Monogamy, Polygamy), Rules of Endogamy and Exogamy',
          caseStudy: { intro: 'Imagine you are scrolling through a Sunday matrimonial column in an Indian newspaper: you see ads specifying "caste no bar" but "gotra must differ" and.',
            decisions: [{ prompt: 'Define endogamy and exogamy in one sentence each, and give one Indian example of each from the textbook.', options: [
                { text: 'Endogamy: marriage within a culturally defined group (e.g., caste endogamy in India)', outcome: 'Endogamy: marriage within a culturally defined group (e.g., caste endogamy in India).' },
                { text: 'exogamy means marrying outside one\'s caste', outcome: 'Not quite — Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste.', reveals: 'exogamy-means-marrying-outside-one' },
                { text: 'inter-caste marriage', outcome: 'Not quite — Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste.', reveals: 'exogamy-means-marrying-outside-one' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_005', title: 'Religion as a Social Institution: Sacred, Profane and Ritual',
          caseStudy: { intro: 'Begin by asking students: "When you enter a temple, mosque, church, or gurudwara, what specific actions do you perform automatically—removing shoes, covering.',
            decisions: [{ prompt: 'Define the \'sacred\' and the \'profane\' in Durkheim\'s sociological framework. How are they fundamentally different from a simple \'holy vs.', options: [
                { text: 'The sacred refers to things set apart and forbidden, inspiring awe and reverence,', outcome: 'The sacred refers to things set apart and forbidden, inspiring awe and reverence, representing the.' },
                { text: 'sacred means holy, profane means sinful', outcome: 'Not quite — Students conflate *ritual* with *routine/habit* or *superstition*.', reveals: 'students-conflate-ritual-with-routine' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_006', title: 'Education as a Social Institution: Functions and Role in Stratification',
          caseStudy: { intro: 'Imagine two Class 11 students: Rohan attends a well-funded private school in Delhi with AC classrooms, coding labs, and career counseling; Priya attends.',
            decisions: [{ prompt: 'Define "universalistic values" in the context of modern education as described by Durkheim and the NCERT textbook.', options: [
                { text: 'Universalistic values are abstract, impersonal standards (e.g., punctuality, merit,', outcome: 'Universalistic values are abstract, impersonal standards (e.g., punctuality, merit, rule-following).' },
                { text: 'secular values', outcome: 'Not quite — Students believe the "meritocracy myth" — that because exams are *theoretically* open to all.', reveals: 'the-meritocracy-myth-that-because' },
                { text: 'modern values', outcome: 'Not quite — Students believe the "meritocracy myth" — that because exams are *theoretically* open to all.', reveals: 'the-meritocracy-myth-that-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a social-institutions debate, a student says: \'My school is an institution, so the principal changed the institution.\' He also asserts \'nuclear families are modern and progressive; joint families are traditional relics urbanisation dissolves.\'',
            decisions: [{ prompt: 'What do institution and family actually denote?', options: [
                { text: 'Separate pattern from organisation: education is the institution — a stable arrangement of norms, roles and sanctions around a societal need; his school is an ORGANISATION embodying it, so the principal changed the school, not the institution. And the family evidence contradicts him: joint families grew with rising life expectancy post-independence (Shah), and female-headed migrant households are distinct forms, not \'broken\' nuclear ones.', outcome: 'The debate corrects on both axes: institution = normative pattern vs organisation = concrete body — and household form tracks demography and economy, not a march toward modernity.' },
                { text: 'Keep school-as-institution — the words are interchangeable in common use.', outcome: 'Common use blurs exactly what sociology needs distinct: institutions are abstract normative patterns; organisations are their concrete embodiments.', reveals: 'institution-equals-organisation' },
                { text: 'Keep the nuclear-is-modern story — urbanisation naturally shrinks families.', outcome: 'That\'s modernization theory read as fact: the data show joint households expanding with longevity — a snapshot of composition isn\'t the family\'s developmental cycle.', reveals: 'nuclear-equals-modern' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Institutions are patterns, not buildings — education persists while every school in it reorganises.',
            decisions: [{ prompt: 'What comes next? Understanding Social Institutions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding Social Institutions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_001', difficulty: 'standard',
          question: 'A social institution is a stable, structured pattern of norms, roles, values.',
          hint: 'Revisit the Class 10 Civics distinction between "rules" (explicit, written) and "norms".',
          misconception: 'Students routinely equate "social institution" with "organisation" (e.g., "My school is an institution" instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A social institution is a stable, structured pattern of norms, roles, values, and',
                  options: ['A social institution is a stable, structured pattern of norms, roles, values, and', 'Family is a social institution comprising a group of persons directly linked by kin', 'Kinship is the culturally defined system of social relationships based on blood ties', 'Marriage is a socially acknowledged and approved sexual union between two adult'],
                  hint: 'Revisit the Class 10 Civics distinction between "rules" (explicit, written) and "norms" (implicit.',
                  misconception: 'Students routinely equate "social institution" with "organisation" (e.g., "My school is an institution" instead of "Education is.' }
          ],
            remediations: { 'students-routinely-equate-social-institution': { steps: ['Ask the student to list five "institutions" they interacted with today (school, bus, family, temple, bank).', 'For each, ask: "If this building/organisation disappeared tomorrow, would the *rules, roles, and expectations*.', 'Guide them to see that the *pattern* (e.g., "teacher teaches, student learns") persists across buildings — *that*.', 'Have them rewrite the definition replacing "institution" with "normative pattern" to break the reification habit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_002', difficulty: 'standard',
          question: 'Family is a social institution comprising a group of persons directly linked.',
          hint: 'Revisit c11_soc_cbse_03_001: Practice applying the functionalist/conflict lens to.',
          misconception: 'Students conflate \'joint family\' with \'large household size\' and assume nuclear family = modern/progressive while joint.',
          parts: [
                { id: 'a', prompt: 'In a village in Haryana, 65-year-old Ram Singh lives with his wife, their married son, daughter-in-law, and two grandchildren.', answer: 'Classification: Joint family',
                  options: ['Classification: Joint family', 'because the daughter visits', 'tradition'],
                  hint: 'Revisit c11_soc_cbse_03_001: Practice applying the functionalist/conflict lens to a non-family.',
                  misconception: 'Students conflate \'joint family\' with \'large household size\' and assume nuclear family = modern/progressive while joint family.' }
          ],
            remediations: { 'students-conflate-joint-family-with': { steps: ['Have the student construct a family developmental cycle diagram for their own family — mark births, marriages, deaths.', 'Ask: "At which points was your household nuclear? Joint? Female-headed? Who held authority?"', 'Map each phase to the causal mechanism: demographic (life expectancy), economic (migration/remittances), cultural.', 'Re-read Shah\'s quote: "in what kind of household do these elderly people live?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_003', difficulty: 'standard',
          question: 'Kinship is the culturally defined system of social relationships based on blood.',
          hint: 'If stuck, revisit the definitions of \'family of orientation\' and \'family of procreation\'.',
          misconception: 'Students often think that \'consanguineous\' means only close blood relatives (parents, siblings) and forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Kinship is the culturally defined system of social relationships based on blood ties',
                  options: ['Kinship is the culturally defined system of social relationships based on blood ties', 'A social institution is a stable, structured pattern of norms, roles, values, and', 'Family is a social institution comprising a group of persons directly linked by kin', 'Marriage is a socially acknowledged and approved sexual union between two adult'],
                  hint: 'If stuck, revisit the definitions of \'family of orientation\' and \'family of procreation\' in the.',
                  misconception: 'Students often think that \'consanguineous\' means only close blood relatives (parents, siblings) and forget that it extends to all blood.' }
          ],
            remediations: { 'consanguineous-means-only-close-blood': { steps: ['Have the student take their own family (or a known family) and list every relative they can think of.', 'Then, using two highlighters, mark each person as consanguineous (blood) or affinal (marriage) by tracing the.', 'Practice with at least 10 relatives.', 'Then, ask them to explain why a cousin\'s spouse is affinal even though they feel like \'family\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_004', difficulty: 'standard',
          question: 'Marriage is a socially acknowledged and approved sexual union between two adult.',
          hint: 'If stuck, revisit c11_soc_cbse_03_003 (Kinship) to clarify affinal vs.',
          misconception: 'Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste marriage" discussed.',
          parts: [
                { id: 'a', prompt: 'A student claims, "Polygamy is illegal in India, so it is not a sociological reality." Explain why this statement is sociologically incorrect, using the.', answer: 'Sociology studies actual social practices, not just legal statutes',
                  options: ['Sociology studies actual social practices, not just legal statutes', 'exogamy means marrying outside one\'s caste', 'inter-caste marriage'],
                  hint: 'If stuck, revisit c11_soc_cbse_03_003 (Kinship) to clarify affinal vs.',
                  misconception: 'Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste marriage" discussed as a modern trend.' },
                { id: 'b', prompt: 'Compare serial monogamy and polygyny in terms of (a) number of simultaneous spouses and (b) rights of children born in each union.', answer: 'Serial monogamy: one spouse at a time, sequential',
                  options: ['Serial monogamy: one spouse at a time, sequential', 'exogamy means marrying outside one\'s caste', 'inter-caste marriage'],
                  hint: 'If stuck, revisit c11_soc_cbse_03_003 (Kinship) to clarify affinal vs.',
                  misconception: 'Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste marriage" discussed as a modern trend.' }
          ],
            remediations: { 'exogamy-means-marrying-outside-one': { steps: ['Draw a two-circle Venn diagram: outer circle = caste (endogamy: marry inside), inner circle = gotra (exogamy: marry.', 'Place "self" in the center; shade the permissible zone (same caste, different gotra).', 'Read the NCERT folk-song excerpt again and identify which circle the bride crosses (village exogamy) and which she.', 'Write one sentence defining each rule using the diagram as a visual anchor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste marriage" discussed.',
          parts: [
                { id: 'a', prompt: 'Design a hypothetical matrimonial advertisement for a community that practices both caste endogamy and gotra exogamy, and explain how the ad\'s wording.', answer: 'Example ad: "Seeking bride for Brahmin groom, 28, engineer',
                  options: ['Example ad: "Seeking bride for Brahmin groom, 28, engineer', 'exogamy means marrying outside one\'s caste', 'inter-caste marriage'],
                  hint: 'If stuck, revisit c11_soc_cbse_03_003 (Kinship) to clarify affinal vs.',
                  misconception: 'Students often think "exogamy means marrying outside one\'s caste" because they hear "inter-caste marriage" discussed as a modern trend.' }
          ],
            remediations: { 'exogamy-means-marrying-outside-one': { steps: ['Draw a two-circle Venn diagram: outer circle = caste (endogamy: marry inside), inner circle = gotra (exogamy: marry.', 'Place "self" in the center; shade the permissible zone (same caste, different gotra).', 'Read the NCERT folk-song excerpt again and identify which circle the bride crosses (village exogamy) and which she.', 'Write one sentence defining each rule using the diagram as a visual anchor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_005', difficulty: 'standard',
          question: 'Religion as a social institution is a structured system of beliefs, symbols.',
          hint: 'If stuck, revisit c11_soc_cbse_03_001 and practice classifying family, school, and law.',
          misconception: 'Students conflate *ritual* with *routine/habit* or *superstition*.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Sociology of religion is just studying what people believe about God." Using the NCERT distinction between theological and sociological.', answer: 'The statement reduces religion to private belief (theology)',
                  options: ['The statement reduces religion to private belief (theology)', 'beliefs, rituals, gods'],
                  hint: 'If stuck, revisit c11_soc_cbse_03_001 and practice classifying family, school, and law.',
                  misconception: 'Students conflate *ritual* with *routine/habit* or *superstition*.' }
          ],
            remediations: { 'students-conflate-ritual-with-routine': { steps: ['Ask the student to list three things they do every morning (brush teeth, check phone, drink tea).', 'Ask: "Which of these changes your *social status* or *moral state*? Which connects you to a *community of believers*?"', 'Introduce the definition: Ritual = formal, stylized, repetitive action *oriented to a sacred symbol* that *effects.', 'Contrast: Brushing teeth = hygiene (biological/technical); Bathing in Ganga at Kumbh = ritual (symbolic/social).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_006', difficulty: 'standard',
          question: 'Education as a social institution is a formally organized system of teaching.',
          hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions: Definition, Characteristics) and.',
          misconception: 'Students believe the "meritocracy myth" — that because exams are *theoretically* open to all, outcomes reflect.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the functionalist perspective sees education as "an important mechanism for the selection and allocation of individuals in their.', answer: 'Functionalists argue education objectively assesses talent and effort through',
                  options: ['Functionalists argue education objectively assesses talent and effort through', 'functionalists think education helps everyone get good jobs', 'meritocracy myth'],
                  hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions: Definition, Characteristics) and.',
                  misconception: 'Students believe the "meritocracy myth" — that because exams are *theoretically* open to all, outcomes reflect individual ability/effort.' },
                { id: 'b', prompt: 'Apply the conflict perspective to this scenario: A prestigious Delhi university announces 50% weightage for Class 12 board marks and 50% for an entrance test.', answer: 'Step 1: Identify the policy\'s manifest criterion',
                  options: ['Step 1: Identify the policy\'s manifest criterion', 'the student should study harder', 'meritocracy myth'],
                  hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions: Definition, Characteristics) and.',
                  misconception: 'Students believe the "meritocracy myth" — that because exams are *theoretically* open to all, outcomes reflect individual ability/effort.' },
                { id: 'c', prompt: 'Analyze the relationship between the "hidden curriculum" (implicit lessons like obedience, competition, gendered expectations) and social stratification.', answer: 'The hidden curriculum teaches middle-class children that "work is compulsory,',
                  options: ['The hidden curriculum teaches middle-class children that "work is compulsory,', 'meritocracy myth'],
                  hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions: Definition, Characteristics) and.',
                  misconception: 'Students believe the "meritocracy myth" — that because exams are *theoretically* open to all, outcomes reflect individual ability/effort.' }
          ],
            remediations: { 'the-meritocracy-myth-that-because': { steps: ['Ask the student to list 5 factors affecting exam performance *unrelated* to intelligence (e.g., quiet study space.', 'Map each factor to caste/class/gender using Indian data (e.g., NFHS on electricity access by caste; NSSO on women\'s.', 'Re-read the Pratichi quote: "If you come during cultivation season you may see almost zero attendance from SC/ST.', 'Rewrite the definition of "merit" as "merit = ability + effort + *enabling conditions*."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
