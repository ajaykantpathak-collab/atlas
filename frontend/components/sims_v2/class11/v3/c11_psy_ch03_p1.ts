import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch03_p1: SimDef = {
    id: 'v3_c11_psy_ch03_p1',
    title: 'Human Development · Part 1/2',
    subtitle: 'Discover that growing up is only half of developing.',
    classLevel: 11, subject: 'psychology', topic: 'Human Development · Part 1/2',
    chapters: ['c11_psy_ch03'],
    nodeIds: ['c11_psy_cbse_03_001', 'c11_psy_cbse_03_002', 'c11_psy_cbse_03_003', 'c11_psy_cbse_03_004', 'c11_psy_cbse_03_005', 'c11_psy_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lifespan scientist tracking gains and losses together', intro: 'A behaviour appears untaught — maturation, or quiet learning you never noticed? The distinction changes what development means.', goal: 'Apply the life-span view — lifelong, multidirectional, plastic, contextual — to human development.' },
    discovery: {
        question: '\'Development is just growth plus maturation.\' Does the formula capture it?',
        options: ['No — development is lifelong, multidirectional and plastic, and includes losses alongside gains', 'Yes — the two processes sum to development', 'Yes — anything not learned is maturation', 'No — development ends at adolescence'],
        answer: 'No — development is lifelong, multidirectional and plastic, and includes losses alongside gains',
        hook: 'Plasticity isn\'t unlimited potential — \'plastic\' means modifiable within biological limits, not expert-at-anything-at-any-age.',
    },
    teaching: [
        { title: 'Meaning of Development: Growth, Maturation and Evolution', text: 'Development is the pattern of progressive, orderly, and predictable changes that begin at conception and continue throughout the lifespan, involving both gains and losses across biological.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weigh whether wisdom gaining while processing speed loses is one process or two, then test \'any skill at any age\' against the plasticity clause.',
        labels: ['Meaning of Development: Growth,', 'Life-Span Perspective on Development', 'Prenatal Development: Stages from', 'Neonate and Infant Development', 'Piaget\'s Stages of Cognitive', 'Erikson\'s Stages of Psychosocial'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_001', title: 'Meaning of Development: Growth, Maturation and Evolution',
          caseStudy: { intro: 'Imagine you are observing your 6-month-old cousin: she has gained 3 kg since birth (growth), she can now sit without support because her spine and muscles have.',
            decisions: [{ prompt: 'Define "growth" as used in developmental psychology. How does it differ from the everyday use of the word?', options: [
                { text: 'Growth in developmental psychology refers specifically to quantitative, measurable', outcome: 'Growth in developmental psychology refers specifically to quantitative, measurable increases.' },
                { text: 'growth in intelligence', outcome: 'Not quite — Students frequently treat "maturation" and "learning" as synonyms, or assume maturation means.', reveals: 'students-frequently-treat-maturation-and' },
                { text: 'growth in social skills', outcome: 'Not quite — Students frequently treat "maturation" and "learning" as synonyms, or assume maturation means.', reveals: 'students-frequently-treat-maturation-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_002', title: 'Life-Span Perspective on Development: Continuous Process',
          caseStudy: { intro: 'Imagine your 68-year-old grandmother decides to learn digital painting on a tablet, while your 14-year-old cousin struggles with identity questions after.',
            decisions: [{ prompt: 'State the seven assumptions of the Life-Span Perspective on development as outlined in the NCERT textbook.', options: [
                { text: 'The seven assumptions are: (1) Development is lifelong (conception to death), (2)', outcome: 'The seven assumptions are: (1) Development is lifelong (conception to death), (2) Biological.' },
                { text: 'development continues throughout life', outcome: 'Not quite — Students equate Life-Span Perspective with "development continues throughout life" (simple.', reveals: 'students-equate-life-span-perspective' },
                { text: 'LSP means we keep developing until we die', outcome: 'Not quite — Students equate Life-Span Perspective with "development continues throughout life" (simple.', reveals: 'students-equate-life-span-perspective' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_003', title: 'Prenatal Development: Stages from Zygote to Foetus',
          caseStudy: { intro: 'Imagine a pregnant woman\'s 8-week ultrasound showing a tiny being with a beating heart and limb buds. How did a single cell become this?',
            decisions: [{ prompt: 'List the three stages of prenatal development in correct chronological order with their approximate week ranges.', options: [
                { text: 'Correct: Germinal stage (conception to week 2), Embryonic stage (week 3 to week 8),', outcome: 'Correct: Germinal stage (conception to week 2), Embryonic stage (week 3 to week 8), Foetal stage.' },
                { text: 'embryo', outcome: 'Not quite — Students believe "embryo" and "foetus" are just size differences, not qualitatively distinct.', reveals: 'embryo-and-foetus-are-just' },
                { text: 'foetus', outcome: 'Not quite — Students believe "embryo" and "foetus" are just size differences, not qualitatively distinct.', reveals: 'embryo-and-foetus-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_004', title: 'Neonate and Infant Development: Reflexes and Motor Milestones',
          caseStudy: { intro: 'Imagine you are a pediatric nurse observing a 2‑week‑old baby: when you stroke the cheek, the baby turns toward the touch and makes sucking motions — why does.',
            decisions: [{ prompt: 'A newborn turns its head toward the breast and makes sucking movements when the cheek is stroked.', options: [
                { text: 'The reflex is the **rooting reflex**', outcome: 'The reflex is the **rooting reflex**; it typically disappears between **3 and 6 months**.' },
                { text: 'sucking reflex', outcome: 'Not quite — Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e.', reveals: 'reflexes-disappear-because-the-baby' },
                { text: 'learns', outcome: 'Not quite — Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e.', reveals: 'reflexes-disappear-because-the-baby' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_005', title: 'Piaget\'s Stages of Cognitive Development',
          caseStudy: { intro: 'Imagine you show a 4-year-old and a 9-year-old two identical glasses of juice, then pour one into a taller, narrower glass.',
            decisions: [{ prompt: 'A 5-year-old watches as a researcher rolls a ball of clay into a long snake shape.', options: [
                { text: 'The response illustrates **centration**—the tendency to focus on a single salient', outcome: 'The response illustrates **centration**—the tendency to focus on a single salient dimension.' },
                { text: 'conservation error in concrete operational stage', outcome: 'Not quite — Students conflate **stage names** with **age norms**, treating them as fixed biological milestones.', reveals: 'students-conflate-stage-names-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_006', title: 'Erikson\'s Stages of Psychosocial Development',
          caseStudy: { intro: 'Imagine a 14-year-old student, Rohan, who suddenly refuses to attend family functions, experiments with drastically different clothing styles, and argues with.',
            decisions: [{ prompt: 'A REMEMBER level question: List the eight psychosocial stages in correct sequential order along with their corresponding crises (e.g.', options: [
                { text: 'Correct sequence: 1', outcome: 'Correct sequence: 1. Infancy (0-1 yr): Trust vs. Mistrust → Hope; 2.' },
                { text: 'Autonomy', outcome: 'Not quite — **Students treat the eight stages as independent "boxes" to memorize, ignoring the epigenetic.', reveals: 'students-treat-the-eight-stages' },
                { text: 'independence', outcome: 'Not quite — **Students treat the eight stages as independent "boxes" to memorize, ignoring the epigenetic.', reveals: 'students-treat-the-eight-stages' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A parenting workshop hears: \'A baby who walks at 10 months instead of 12 shows faster maturation — biology sets the timetable, environment can\'t change it.\' Another adds: \'Development ends at adulthood; after that it\'s just decline.\'',
            decisions: [{ prompt: 'What do development science and the life-span view say?', options: [
                { text: 'Separate the processes first: growth is measurable size increase; maturation is the genetically-timed unfolding that still needs adequate environment and a little practice — early walking reflects maturational timing AND opportunity, not a fixed program. And the life-span perspective says development is lifelong, multi-directional (gains like wisdom beside losses like speed), plastic within limits, and historically embedded — not a stage ladder ending at 18.', outcome: 'The workshop corrects both myths: biology provides the timetable but environment writes the performance — and development runs to life\'s end in both directions at once.' },
                { text: 'Agree on pure maturation — untaught milestones are genes doing their schedule.', outcome: 'Untaught isn\'t unmodifiable: maturation sets the sequence but rate varies with nutrition, freedom of movement and cultural practice — plasticity is real within limits.', reveals: 'maturation-is-fixed-program' },
                { text: 'Accept the decline story — development is childhood growth, the rest is loss.', outcome: 'Multi-directionality rejects that: later life combines gains (expertise, emotional regulation) with losses — and a 20-year-old in 1947 vs today shows historical embeddedness matters.', reveals: 'development-ends-at-adulthood' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Old age can mean slower reflexes and better judgement in the same person — development runs both directions at once.',
            decisions: [{ prompt: 'What comes next? Human Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_001', difficulty: 'standard',
          question: 'Development is the pattern of progressive, orderly, and predictable changes.',
          hint: 'If stuck, revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) for evolution.',
          misconception: 'Students frequently treat "maturation" and "learning" as synonyms, or assume maturation means "becoming mature" in the.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "Since maturation is genetically programmed, environmental enrichment cannot accelerate motor milestones like walking." Using the concepts.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'environment has no role', 'practice can make a 6-month-old walk', 'proficiency requires adequate environment and little practice'],
                  hint: 'If stuck, revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) for evolution mechanism, and.',
                  misconception: 'Students frequently treat "maturation" and "learning" as synonyms, or assume maturation means "becoming mature" in the colloquial sense.' }
          ],
            remediations: { 'students-frequently-treat-maturation-and': { steps: ['Ask the student to list three behaviours that appear "automatically" in infancy (e.g., sucking, grasping reflex.', 'For each, ask: "Would this behaviour appear if the infant were physically restrained 24/7? If the infant were deaf?', 'Guide them to see that reflexes (sucking, grasping) are robust to deprivation (strong maturation), but babbling.', 'Use the NCERT Box 3.1 line: "Once the underlying physical structure is sufficiently developed, proficiency requires.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently treat "maturation" and "learning" as synonyms, or assume maturation means "becoming mature" in the.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Development is just growth plus maturation." Use the NCERT definition of development (biological, cognitive, socio-emotional.', answer: 'The statement is reductionist and inaccurate',
                  options: ['The statement is reductionist and inaccurate', 'proficiency requires adequate environment and little practice', 'he evolved to be smart', 'A baby walking at 10 months instead of 12 months shows faster maturation'],
                  hint: 'If stuck, revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) for evolution mechanism, and.',
                  misconception: 'Students frequently treat "maturation" and "learning" as synonyms, or assume maturation means "becoming mature" in the colloquial sense.' }
          ],
            remediations: { 'students-frequently-treat-maturation-and': { steps: ['Ask the student to list three behaviours that appear "automatically" in infancy (e.g., sucking, grasping reflex.', 'For each, ask: "Would this behaviour appear if the infant were physically restrained 24/7? If the infant were deaf?', 'Guide them to see that reflexes (sucking, grasping) are robust to deprivation (strong maturation), but babbling.', 'Use the NCERT Box 3.1 line: "Once the underlying physical structure is sufficiently developed, proficiency requires.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_002', difficulty: 'standard',
          question: 'Life-Span Perspective (LSP) is a comprehensive theoretical framework that.',
          hint: 'Revisit c11_psy_cbse_03_001: Practice classifying changes as growth, maturation,.',
          misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its.',
          parts: [
                { id: 'a', prompt: 'A 60-year-old retired professor decides to learn Spanish using a language app, practicing 30 minutes daily.', answer: 'Step 1: Plasticity',
                  options: ['Step 1: Plasticity', 'age-related decline', 'LSP means we keep developing until we die'],
                  hint: 'Revisit c11_psy_cbse_03_001: Practice classifying changes as growth, maturation, or development.',
                  misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its five other defining.' },
                { id: 'b', prompt: 'Compare and contrast the Life-Span Perspective with traditional stage theories (e.g., Piaget\'s cognitive stages, Erikson\'s psychosocial stages) on three.', answer: 'endpoint of development, (',
                  options: ['endpoint of development, (', 'stage theories also cover adulthood', 'LSP means we keep developing until we die'],
                  hint: 'Revisit c11_psy_cbse_03_001: Practice classifying changes as growth, maturation, or development.',
                  misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its five other defining.' }
          ],
            remediations: { 'students-equate-life-span-perspective': { steps: ['Create a 7-column table with each LSP assumption as a column header.', 'For a single case (e.g., 50-year-old learning coding), fill each column with specific evidence from the case — this.', 'Contrast with a stage theory prediction for the same case (e.g., "Piaget would say formal operations are complete.', 'Identify which LSP assumptions explain the discrepancy — this reveals LSP\'s explanatory power beyond mere timeline.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_003', difficulty: 'standard',
          question: 'Prenatal development is the orderly, sequential process of growth and.',
          hint: 'Review Class 10 Biology Chapter 3: "Fertilisation, Implantation and Placenta in Humans".',
          misconception: 'Students believe "embryo" and "foetus" are just size differences, not qualitatively distinct developmental phases.',
          parts: [
                { id: 'a', prompt: 'A pregnant woman consumes alcohol heavily at week 5 and another woman consumes the same amount at week 25.', answer: 'Correct: Week 5 falls in the embryonic stage when organogenesis occurs',
                  options: ['Correct: Week 5 falls in the embryonic stage when organogenesis occurs', 'both cause birth defects', 'embryo', 'foetus'],
                  hint: 'Review Class 10 Biology Chapter 3: "Fertilisation, Implantation and Placenta in Humans".',
                  misconception: 'Students believe "embryo" and "foetus" are just size differences, not qualitatively distinct developmental phases.' },
                { id: 'b', prompt: 'Design a prenatal health advisory for a rural clinic. Include three specific teratogens to avoid and three protective behaviours, each linked to the prenatal.', answer: 'Correct advisory: Embryonic stage (weeks 3-8)',
                  options: ['Correct advisory: Embryonic stage (weeks 3-8)', 'embryo', 'foetus'],
                  hint: 'Review Class 10 Biology Chapter 3: "Fertilisation, Implantation and Placenta in Humans".',
                  misconception: 'Students believe "embryo" and "foetus" are just size differences, not qualitatively distinct developmental phases.' }
          ],
            remediations: { 'embryo-and-foetus-are-just': { steps: ['Draw a 40-week horizontal timeline. Mark weeks 0, 2, 8, 38. Label three zones: Germinal (0-2), Embryonic (3-8), Foetal.', 'In each zone, write ONE structural milestone (e.g., implantation, neural tube closure, quickening).', 'Use red pen to shade "critical period" peaks: embryonic for structural defects, early foetal for brain growth.', 'Verbally explain to a peer why thalidomide at week 7 causes limb defects but at week 20 does not — using "organogenesis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_004', difficulty: 'standard',
          question: 'Neonate and infant reflexes are involuntary, automatic motor responses.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 “Reflex Action and Reflex Arc”.',
          misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression.',
          parts: [
                { id: 'a', prompt: 'A newborn turns its head toward the breast and makes sucking movements when the cheek is stroked.', answer: 'The reflex is the **rooting reflex**',
                  options: ['The reflex is the **rooting reflex**', 'sucking reflex', 'learns', 'it “sucking reflex” or giving an incorrect disappearance age'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 “Reflex Action and Reflex Arc” (c10_bio_cbse_02_003).',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' },
                { id: 'b', prompt: 'Compare the Babinski reflex and the plantar grasp reflex (toe curling when the sole is touched).', answer: '**Babinski reflex**: stimulus = stroking lateral sole',
                  options: ['**Babinski reflex**: stimulus = stroking lateral sole', 'learns', '**reflexes disappear'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 “Reflex Action and Reflex Arc” (c10_bio_cbse_02_003).',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' }
          ],
            remediations: { 'reflexes-disappear-because-the-baby': { steps: ['If a student holds this misconception, do the following: (1) Show a video of a 1‑month‑old and a 7‑month‑old both.', '(2) Use the analogy of a **software update**: the brainstem “firmware” runs the reflex; the cortex “installs an update”.', '(3) Ask the student to predict what happens to the Babinski reflex in an adult with a spinal cord injury (it reappears.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_005', difficulty: 'standard',
          question: 'Piaget\'s theory of cognitive development proposes that children progress.',
          hint: 'If stuck, revisit **c11_psy_cbse_03_001** (Meaning of Development) and focus on Box 3.1\'s.',
          misconception: 'Students conflate **stage names** with **age norms**, treating them as fixed biological milestones (e.g., "At 7 years.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Piaget\'s theory of cognitive development proposes that children progress through four',
                  options: ['Piaget\'s theory of cognitive development proposes that children progress through four', 'Development is the pattern of progressive, orderly, and predictable changes that begin at', 'Life-Span Perspective (LSP) is a comprehensive theoretical framework that conceptualises', 'Prenatal development is the orderly, sequential process of growth and differentiation'],
                  hint: 'If stuck, revisit **c11_psy_cbse_03_001** (Meaning of Development) and focus on Box 3.1\'s.',
                  misconception: 'Students conflate **stage names** with **age norms**, treating them as fixed biological milestones (e.g., "At 7 years, a child *becomes*.' }
          ],
            remediations: { 'students-conflate-stage-names-with': { steps: ['**Re-teach the stage–structure distinction**: Draw a 2×4 matrix (Stages × Dimensions: Object Permanence, Egocentrism.', 'Have the student fill in *how each dimension transforms* across stages (e.g., egocentrism: "cannot differentiate.', '**Conduct a micro-decalage demo**: Give the student three conservation tasks (number, liquid, weight) to administer.', 'Record *which* are passed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_006', difficulty: 'standard',
          question: 'Erikson\'s psychosocial theory proposes eight sequential stages across the.',
          hint: 'If stuck on "why stages are fixed sequence," revisit **Epigenetic Principle**.',
          misconception: '**Students treat the eight stages as independent "boxes" to memorize, ignoring the epigenetic principle.** They write.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the eight psychosocial stages in correct sequential order along with their corresponding crises (e.g., Stage 1: Trust vs.', answer: 'Correct sequence: 1',
                  options: ['Correct sequence: 1', 'Autonomy', 'independence', 'Indian toddlers don\'t show autonomy'],
                  hint: 'If stuck on "why stages are fixed sequence," revisit **Epigenetic Principle**.',
                  misconception: '**Students treat the eight stages as independent "boxes" to memorize, ignoring the epigenetic principle.** They write: "Stage 5 is Identity.' },
                { id: 'b', prompt: 'An UNDERSTAND level question: A 4-year-old child insists on pouring her own milk, spills it, and says "I do it myself!" Her mother scolds her: "You\'re clumsy.', answer: 'Stage: Preschool (3-6 yr)',
                  options: ['Stage: Preschool (3-6 yr)', 'Autonomy vs', 'doing things myself', 'Autonomy'],
                  hint: 'If stuck on "why stages are fixed sequence," revisit **Epigenetic Principle**.',
                  misconception: '**Students treat the eight stages as independent "boxes" to memorize, ignoring the epigenetic principle.** They write: "Stage 5 is Identity.' },
                { id: 'c', prompt: 'An APPLY level question: Priya, 35, has a successful career but avoids deep friendships and romantic relationships, saying "I don\'t need anyone; people just.', answer: 'Unresolved crisis: **Intimacy vs',
                  options: ['Unresolved crisis: **Intimacy vs', 'Identity vs', 'Autonomy', 'independence'],
                  hint: 'If stuck on "why stages are fixed sequence," revisit **Epigenetic Principle**.',
                  misconception: '**Students treat the eight stages as independent "boxes" to memorize, ignoring the epigenetic principle.** They write: "Stage 5 is Identity.' }
          ],
            remediations: { 'students-treat-the-eight-stages': { steps: ['** Draw the **Epigenetic Diagram** (8 overlapping ovals, each emerging from the previous). **', '** Pick ONE stage (e.g., Stage 3 Initiative). Trace **backward**: What Stage 2 outcome (Autonomy/Shame) does Initiative.', '** Write one sentence for each link: "Without ______, ______ cannot develop." **', '** Re-attempt Diagnostic Q3 and Q4 using this chain logic. Do not re-memorize the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
