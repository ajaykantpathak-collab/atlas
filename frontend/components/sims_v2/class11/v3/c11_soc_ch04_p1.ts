import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch04_p1: SimDef = {
    id: 'v3_c11_soc_ch04_p1',
    title: 'Culture and Socialisation · Part 1/2',
    subtitle: 'Discover that your lunch is as much culture as a raga.',
    classLevel: 11, subject: 'sociology', topic: 'Culture and Socialisation · Part 1/2',
    chapters: ['c11_soc_ch04'],
    nodeIds: ['c11_soc_cbse_04_001', 'c11_soc_cbse_04_002', 'c11_soc_cbse_04_003', 'c11_soc_cbse_04_004', 'c11_soc_cbse_04_005', 'c11_soc_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an anthropologist reading a whole way of life', intro: 'Culture isn\'t the concert hall — it\'s also the queue outside it, the ticket app, and who sits where inside.', goal: 'Define culture as a whole way of life and apply its three simultaneous dimensions.' },
    discovery: {
        question: '\'Cultured\' people attend classical concerts — so culture means refined art and literature?',
        options: ['No — Tylor\'s shift was from elite art to the whole way of life; your lunch, slang and seating habits are culture too', 'Yes — culture is high art', 'Yes — the rest is just habit', 'No — because culture only means tradition'],
        answer: 'No — Tylor\'s shift was from elite art to the whole way of life; your lunch, slang and seating habits are culture too',
        hook: 'And material culture outruns non-material — the smartphone arrived faster than the norms for it; that gap is culture lag, not chaos.',
    },
    teaching: [
        { title: 'Culture: Sociological Definitions (Tylor, Malinowski, Geertz) and Shared Meaning', text: 'Culture in sociology is the shared, learned system of meanings, symbols, values, norms, and material artifacts that members of a society use to interpret their world and guide their behaviour.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split one temple into its material, cognitive and normative layers at once, then weigh whether Geertz\'s meanings make Tylor obsolete.',
        labels: ['Culture: Sociological Definitions (Tylor,', 'Material and Non-material Culture', 'Socialisation: Definition, Process', 'Agencies of Socialisation: Family,', 'The Hidden Curriculum: How', 'Ethnocentrism and the Claim'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_002', title: 'Material and Non-material Culture: Cognitive, Normative and Material Dimensions',
          caseStudy: { intro: 'Imagine you are watching a friend use a smartphone to pay for chai at a roadside stall.',
            decisions: [{ prompt: 'Define the normative dimension of culture and give one example that is a folkway and one that is a law.', options: [
                { text: 'The normative dimension consists of rules of conduct', outcome: 'The normative dimension consists of rules of conduct — folkways, mores, customs, conventions, and.' },
                { text: 'values', outcome: 'Not quite — Students often treat the three dimensions as separate “types” of culture rather than as analytical.', reveals: 'students-often-treat-the-three' },
                { text: 'beliefs', outcome: 'Not quite — Students often treat the three dimensions as separate “types” of culture rather than as analytical.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_003', title: 'Socialisation: Definition, Process and Primary vs Secondary Socialisation',
          caseStudy: { intro: 'Imagine a 3-year-old child who refuses to share a toy, and a 25-year-old new employee who stays late at work to impress their boss.',
            decisions: [{ prompt: 'Define socialisation in your own words, and state one way it differs from "cultural programming."', options: [
                { text: 'Socialisation is the lifelong process of internalising cultural norms, values, and', outcome: 'Socialisation is the lifelong process of internalising cultural norms, values, and behaviours.' },
                { text: 'passive absorption', outcome: 'Not quite — Students often believe primary socialisation *ends* when secondary socialisation *begins* (e.g.', reveals: 'primary-socialisation-ends-when-secondary' },
                { text: 'automatic internalisation', outcome: 'Not quite — Students often believe primary socialisation *ends* when secondary socialisation *begins* (e.g.', reveals: 'primary-socialisation-ends-when-secondary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_004', title: 'Agencies of Socialisation: Family, Peer Group, School and Mass Media',
          caseStudy: { intro: 'Imagine a 14-year-old girl in Delhi who learns at home that "good girls don\'t argue with elders," but at school she\'s encouraged to debate in Model UN, while.',
            decisions: [{ prompt: 'Define "agencies of socialisation" and name the four primary agencies discussed in the NCERT Class 11 textbook.', options: [
                { text: 'Agencies of socialisation are the structured groups and institutions through', outcome: 'Agencies of socialisation are the structured groups and institutions through which individuals.' },
                { text: 'religion', outcome: 'Not quite — Students often believe that "socialisation" means each agency simply deposits a fixed set of norms.', reveals: 'socialisation-means-each-agency-simply' },
                { text: 'workplace', outcome: 'Not quite — Students often believe that "socialisation" means each agency simply deposits a fixed set of norms.', reveals: 'socialisation-means-each-agency-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_005', title: 'The Hidden Curriculum: How Schools Socialise Beyond Formal Learning',
          caseStudy: { intro: 'Begin by asking: "Have you ever noticed that your school teaches you to stand in straight lines, raise hands before speaking, or assigns classroom cleaning.',
            decisions: [{ prompt: 'Define hidden curriculum in one sentence using precise sociological terminology.', options: [
                { text: 'Hidden curriculum is the set of implicit norms, values, and behaviors transmitted through', outcome: 'Hidden curriculum is the set of implicit norms, values, and behaviors transmitted through school.' },
                { text: 'moral science textbook', outcome: 'Not quite — Students often equate hidden curriculum with "extracurricular activities" or "moral education.', reveals: 'students-often-equate-hidden-curriculum' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_006', title: 'Ethnocentrism and the Claim of Cultural Superiority',
          caseStudy: { intro: 'Imagine you\'re watching a documentary about a tribal community that eats insects as a protein source.',
            decisions: [{ prompt: 'Define ethnocentrism in one sentence using the precise sociological terminology from the NCERT textbook.', options: [
                { text: 'Ethnocentrism is the application of one\'s own cultural values in evaluating the behaviour', outcome: 'Ethnocentrism is the application of one\'s own cultural values in evaluating the behaviour and.' },
                { text: 'thinking your culture is better', outcome: 'Not quite — Students conflate *ethnocentrism* with *personal prejudice* or *individual racism*.', reveals: 'students-conflate-ethnocentrism-with-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'A community\'s traditions give it identity — and include practices that harm some members (early marriage, exclusion of certain groups). Respecting culture and protecting individuals pull in opposite directions.',
            decisions: [{ prompt: 'When does \'respect for culture\' become an excuse?', options: [
                { text: 'Protect the individual — rights outrank tradition', outcome: 'The rights-first answer; imposed from outside it can destroy the very community fabric that also protects people.' },
                { text: 'Respect the culture — change must come from within', outcome: 'The internal-reform answer; slower, but the people inside the practice are the ones it happens to.' },
                { text: 'Support the insiders already fighting for change', outcome: 'The solidarity answer — the community\'s own reformers know both the tradition and the harm; they need backing, not replacement.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a culture exhibit, a student writes: \'Culture means refined taste — classical music and fine art.\' He sorts a temple as \'material culture\', prayer as \'normative\', and belief as \'cognitive\' — \'three separate types.\'',
            decisions: [{ prompt: 'What is the sociological view of culture?', options: [
                { text: 'Widen then integrate: culture is the whole learned way of life all members share — not elite refinement; Tylor\'s shift was from \'cultured\' taste to total way of life. And the three dimensions are simultaneous lenses on ONE element: the temple is material artifact embodying architectural knowledge (cognitive) and prescribing conduct like removing shoes (normative) — integrated, not sorted into boxes.', outcome: 'The exhibit reframes: every cultural item carries all three dimensions at once — and \'culture\' belongs to everyone, not just the connoisseur.' },
                { text: 'Keep the refined-taste sense — \'cultured\' people are what the term describes.', outcome: 'That\'s the everyday meaning the discipline deliberately abandons: sociological culture is the shared way of life — street food counts as much as symphony.', reveals: 'culture-is-high-culture' },
                { text: 'Keep the three-box sort — each item belongs to one dimension.', outcome: 'The dimensions are analytical lenses, not containers: the same temple is at once material, cognitive and normative — NCERT stresses they work together.', reveals: 'dimensions-are-separate-types' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'A temple is stone (material), cosmology (cognitive) and rules of entry (normative) in one object — the dimensions are lenses, not compartments.',
            decisions: [{ prompt: 'What comes next? Culture and Socialisation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Culture and Socialisation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_001', difficulty: 'standard',
          question: 'Culture in sociology is the shared, learned system of meanings, symbols.',
          hint: 'Revisit Class 6 Civics Ch 14 \'Cultural Diversity\' (c6_civics_ch14_031) and identify 3.',
          misconception: 'Students conflate \'culture\' with \'high culture\' (classical music, fine art) or \'tradition\' (unchanging customs).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Culture in sociology is the shared, learned system of meanings, symbols, values, norms,',
                  options: ['Culture in sociology is the shared, learned system of meanings, symbols, values, norms,', 'Culture consists of three interrelated dimensions: the **cognitive dimension** (how', 'Socialisation is the lifelong process through', 'Agencies of socialisation are the structured groups, institutions, and channels through'],
                  hint: 'Revisit Class 6 Civics Ch 14 \'Cultural Diversity\' (c6_civics_ch14_031) and identify 3 practices.',
                  misconception: 'Students conflate \'culture\' with \'high culture\' (classical music, fine art) or \'tradition\' (unchanging customs).' }
          ],
            remediations: { 'students-conflate-culture-with-high': { steps: ['Ask the student to list 3 things they do daily that require *shared meaning* (e.g., using money, queuing, greeting).', 'For each, identify: (a) the material artifact (coin, queue barrier), (b) the norm/rule, (c) the shared interpretation.', 'Map each to Tylor (custom/habit), Malinowski (artifact/technical process), Geertz (web of significance).', 'Have them re-read NCERT p.63-67, highlighting every phrase that says \'shared\', \'learned\', \'meaning\', \'system\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_002', difficulty: 'standard',
          question: 'Culture consists of three interrelated dimensions: the **cognitive dimension**.',
          hint: 'Revisit c11_soc_cbse_04_001 and practice distinguishing Tylor’s “knowledge, belief, art.',
          misconception: 'Students often treat the three dimensions as separate “types” of culture rather than as analytical lenses that apply.',
          parts: [
                { id: 'a', prompt: 'Define the normative dimension of culture and give one example that is a folkway and one that is a law.', answer: 'The normative dimension consists of rules of conduct',
                  options: ['The normative dimension consists of rules of conduct', 'values', 'beliefs'],
                  hint: 'Revisit c11_soc_cbse_04_001 and practice distinguishing Tylor’s “knowledge, belief, art, morals.',
                  misconception: 'Students often treat the three dimensions as separate “types” of culture rather than as analytical lenses that apply simultaneously.' },
                { id: 'b', prompt: 'Explain why the cognitive aspects of culture are often harder to recognise than material or normative aspects.', answer: 'Cognitive aspects involve internal mental processes',
                  options: ['Cognitive aspects involve internal mental processes', 'cognitive aspects are just thoughts'],
                  hint: 'Revisit c11_soc_cbse_04_001 and practice distinguishing Tylor’s “knowledge, belief, art, morals.',
                  misconception: 'Students often treat the three dimensions as separate “types” of culture rather than as analytical lenses that apply simultaneously.' },
                { id: 'c', prompt: 'A village community traditionally uses a solar calendar for agricultural rituals.', answer: 'Step 1: Identify the material change',
                  options: ['Step 1: Identify the material change', 'technology replaces tradition'],
                  hint: 'Revisit c11_soc_cbse_04_001 and practice distinguishing Tylor’s “knowledge, belief, art, morals.',
                  misconception: 'Students often treat the three dimensions as separate “types” of culture rather than as analytical lenses that apply simultaneously.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Take a single concrete object — e.g., a mangalsutra (married woman’s necklace).', '(cognitive: marital status, auspiciousness).', 'Ask: What *rules* govern its use?', '(normative: only married women wear it; removal rituals after widowhood).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_003', difficulty: 'standard',
          question: 'Socialisation is the lifelong process through which individuals, beginning.',
          hint: 'Revisit c11_soc_cbse_04_001 (Tylor/Malinowski/Geertz definitions) and c11_soc_cbse_04_002.',
          misconception: 'Students often believe primary socialisation *ends* when secondary socialisation *begins* (e.g., "primary stops at age.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Socialisation is the lifelong process through',
                  options: ['Socialisation is the lifelong process through', 'Culture in sociology is the shared, learned system of meanings, symbols, values, norms,', 'Culture consists of three interrelated dimensions: the **cognitive dimension** (how', 'Agencies of socialisation are the structured groups, institutions, and channels through'],
                  hint: 'Revisit c11_soc_cbse_04_001 (Tylor/Malinowski/Geertz definitions) and c11_soc_cbse_04_002.',
                  misconception: 'Students often believe primary socialisation *ends* when secondary socialisation *begins* (e.g., "primary stops at age 5 when school.' }
          ],
            remediations: { 'primary-socialisation-ends-when-secondary': { steps: ['If a student holds this misconception: (1) Draw a timeline from birth to old age; mark "primary socialisation (family)".', '(2) Ask: "When your 16-year-old self argues with parents about curfew, is that primary or secondary socialisation?".', '(3) Assign Activity 8 from NCERT: "Compare your interaction with friends to that of your parents...', 'What is different?" to concretise the coexistence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe primary socialisation *ends* when secondary socialisation *begins* (e.g., "primary stops at age.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Since secondary socialisation continues throughout life, it is more important than primary socialisation for shaping adult behaviour." Use.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'primary stops at age 5 when school starts', 'primary socialisation *ends* when secondary socialisation *begins* (e'],
                  hint: 'Revisit c11_soc_cbse_04_001 (Tylor/Malinowski/Geertz definitions) and c11_soc_cbse_04_002.',
                  misconception: 'Students often believe primary socialisation *ends* when secondary socialisation *begins* (e.g., "primary stops at age 5 when school.' }
          ],
            remediations: { 'primary-socialisation-ends-when-secondary': { steps: ['If a student holds this misconception: (1) Draw a timeline from birth to old age; mark "primary socialisation (family)".', '(2) Ask: "When your 16-year-old self argues with parents about curfew, is that primary or secondary socialisation?".', '(3) Assign Activity 8 from NCERT: "Compare your interaction with friends to that of your parents...', 'What is different?" to concretise the coexistence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_004', difficulty: 'standard',
          question: 'Agencies of socialisation are the structured groups, institutions, and channels.',
          hint: 'Revisit c11_soc_cbse_04_003\'s "Socialisation and Individual Freedom" section (NCERT p.',
          misconception: 'Students often believe that "socialisation" means each agency simply deposits a fixed set of norms into a passive.',
          parts: [
                { id: 'a', prompt: 'Define "agencies of socialisation" and name the four primary agencies discussed in the NCERT Class 11 textbook.', answer: 'Agencies of socialisation are the structured groups and institutions through',
                  options: ['Agencies of socialisation are the structured groups and institutions through', 'religion', 'workplace', 'government'],
                  hint: 'Revisit c11_soc_cbse_04_003\'s "Socialisation and Individual Freedom" section (NCERT p.',
                  misconception: 'Students often believe that "socialisation" means each agency simply deposits a fixed set of norms into a passive individual, like.' },
                { id: 'b', prompt: 'Explain why peer group socialisation is described as "more egalitarian" than family socialisation, using the concept of power relations.', answer: 'In families, parents hold structural authority (power to enforce codes, control',
                  options: ['In families, parents hold structural authority (power to enforce codes, control', 'peers are nicer', 'families are stricter', 'socialisation'],
                  hint: 'Revisit c11_soc_cbse_04_003\'s "Socialisation and Individual Freedom" section (NCERT p.',
                  misconception: 'Students often believe that "socialisation" means each agency simply deposits a fixed set of norms into a passive individual, like.' },
                { id: 'c', prompt: 'Compare how family and mass media socialise a teenager regarding "career aspirations." Identify one key difference in mechanism and one in content.', answer: 'Mechanism difference: Family socialises through sustained, emotionally charged,',
                  options: ['Mechanism difference: Family socialises through sustained, emotionally charged,', 'family says X, media says Y', 'compare', 'socialisation'],
                  hint: 'Revisit c11_soc_cbse_04_003\'s "Socialisation and Individual Freedom" section (NCERT p.',
                  misconception: 'Students often believe that "socialisation" means each agency simply deposits a fixed set of norms into a passive individual, like.' }
          ],
            remediations: { 'socialisation-means-each-agency-simply': { steps: ['If a student lists agencies mechanically without analysing mechanisms or conflicts: Step 1 — Have them re-read the.', '78) and underline every verb showing agency/individual action (resist, negotiate, assert, reorganise).', 'Step 2 — Give them Activity 6 (domestic worker\'s child vs.', 'employer\'s child) and require them to write 3 specific differences in socialisation EXPERIENCE, not just resources.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_005', difficulty: 'standard',
          question: 'Hidden curriculum refers to the unwritten, unofficial, and often unintended.',
          hint: 'Revisit c11_soc_cbse_04_003 (Socialisation definition) and c11_soc_cbse_04_004 (Agencies.',
          misconception: 'Students often equate hidden curriculum with "extracurricular activities" or "moral education classes" because both are.',
          parts: [
                { id: 'a', prompt: 'A school requires all students to stand silently in gender-segregated lines during morning assembly, with boys in front rows.', answer: '1) Gender segregation → reinforces normative separation of sexes in public space',
                  options: ['1) Gender segregation → reinforces normative separation of sexes in public space', 'discipline', 'patriotism', 'formal rule'],
                  hint: 'Revisit c11_soc_cbse_04_003 (Socialisation definition) and c11_soc_cbse_04_004 (Agencies.',
                  misconception: 'Students often equate hidden curriculum with "extracurricular activities" or "moral education classes" because both are non-academic.' }
          ],
            remediations: { 'students-often-equate-hidden-curriculum': { steps: ['If the student conflates hidden curriculum with extracurriculars, have them list 10 things they did in school today.', 'Categorize each as "chosen activity" (club, sport) vs.', '"required routine" (assembly, uniform, raising hand).', 'The required routines are hidden curriculum.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_006', difficulty: 'standard',
          question: 'Ethnocentrism is the tendency to evaluate other cultures using one\'s own.',
          hint: 'Revisit c11_soc_cbse_04_002 (Material and Non-material Culture) and practice identifying.',
          misconception: 'Students conflate *ethnocentrism* with *personal prejudice* or *individual racism*.',
          parts: [
                { id: 'a', prompt: 'Compare ethnocentrism and cosmopolitanism on three dimensions: (a) stance toward cultural difference, (b) evaluation method, (c) outcome for cultural exchange.', answer: 'stance toward cultural difference, (',
                  options: ['stance toward cultural difference, (', 'cosmopolitanism likes all cultures'],
                  hint: 'Revisit c11_soc_cbse_04_002 (Material and Non-material Culture) and practice identifying the three.',
                  misconception: 'Students conflate *ethnocentrism* with *personal prejudice* or *individual racism*.' }
          ],
            remediations: { 'students-conflate-ethnocentrism-with-personal': { steps: ['Have the student list 5 "normal" practices in their daily life (e.g., eating with fork/spoon, sleeping on a bed.', 'For each, find a culture where a different practice is normal (e.g., eating with hands, sleeping on floor, no birthday.', 'Ask: "When I called my practice \'normal,\' whose standard did I use?"', 'Show that *no external standard* was consulted — their own culture was the silent benchmark.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
