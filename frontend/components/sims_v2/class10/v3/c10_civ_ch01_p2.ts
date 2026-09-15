import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch01_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch01_p2: SimDef = {
    id: 'v3_c10_civ_ch01_p2',
    title: 'Power Sharing · Part 2/2',
    subtitle: 'Compare two countries that answered \'who rules?\' very differently',
    classLevel: 10, subject: 'civics', topic: 'Power Sharing · Part 2/2',
    chapters: ['c10_civ_ch01'],
    nodeIds: ['c10_civ_cbse_01_007', 'c10_civ_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional designer for a divided nation', intro: 'One country speaks Dutch and French; another is Sinhalese and Tamil. Both had to answer the same question: can the majority simply take everything?', goal: 'Contrast accommodation with majoritarianism and explain why sharing power is prudential AND moral.' },
    discovery: {
        question: 'Belgium ran 541 days with NO elected government — yet salaries were paid, courts sat, schools stayed open. Sri Lanka had a rock-solid majority government — and slid into civil war. What did Belgium get right?',
        options: ['It divided power so no community could be steamrolled — regions and community governments kept everyone inside the system', 'It had richer citizens who didn\'t need a government', 'Its army kept order while politicians argued', 'It got lucky — 541 days was a fluke, not a design'],
        answer: 'It divided power so no community could be steamrolled — regions and community governments kept everyone inside the system',
        hook: 'Majority rule without accommodation is a slow-burning fuse. Belgium rewrote its constitution four times to share power; Sri Lanka let one community hoard it — and paid with a war.',
    },
    teaching: [
        { title: 'Comparison of Belgium and Sri Lanka Approaches', text: 'The comparison of Belgium and Sri Lanka illustrates two contrasting approaches to power sharing in diverse societies: Belgium\'s accommodation model (consociational democracy) where power is shared.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take a city split 60-40 between two language groups and design a power-sharing deal — then stress-test it against what happened in Sri Lanka.',
        labels: ['Comparison of Belgium', 'Prudential vs Moral Reasons'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_007', title: 'Comparison of Belgium and Sri Lanka Approaches',
          caseStudy: { intro: 'Imagine you are a student leader in a school with two large language groups.',
            decisions: [{ prompt: 'What is the fundamental difference between Belgium\'s and Sri Lanka\'s approach to power sharing in one sentence?', options: [
                { text: 'Belgium adopted a consociational accommodation model sharing power among linguistic', outcome: 'Belgium adopted a consociational accommodation model sharing power among linguistic communities.' },
                { text: 'both shared power equally', outcome: 'Not quite — Students often think Belgium and Sri Lanka are just "two examples of power sharing" and miss that.', reveals: 'belgium-and-sri-lanka-are' },
                { text: 'two examples of power sharing', outcome: 'Not quite — Students often think Belgium and Sri Lanka are just "two examples of power sharing" and miss that.', reveals: 'belgium-and-sri-lanka-are' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_008', title: 'Prudential vs Moral Reasons for Power Sharing',
          caseStudy: { intro: 'Imagine your school’s student council is dominated by one linguistic group that decides all events and rules without consulting others.',
            decisions: [{ prompt: 'Define “prudential reason” for power sharing in one sentence, using the exact terminology from the chapter.', options: [
                { text: 'A prudential reason for power sharing is a practical, calculation-based justification', outcome: 'A prudential reason for power sharing is a practical, calculation-based justification that stresses.' },
                { text: 'it is the morally right thing to do', outcome: 'Not quite — Students often treat prudential and moral reasons as mutually exclusive “either/or” choices.', reveals: 'students-often-treat-prudential-and' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_007', title: 'A real-world call',
          caseStudy: { intro: 'A state with a linguistic minority must decide how to run its schools and government offices. The majority says one language unifies; the minority says it erases them.',
            decisions: [{ prompt: 'What does power-sharing actually demand here?', options: [
                { text: 'One official language for efficiency', outcome: 'Administratively simple — but \'unity by uniformity\' is exactly what power-sharing exists to prevent.' },
                { text: 'Two languages with equal status', outcome: 'Costlier and slower, but the minority\'s dignity is protected — the whole point of sharing power.' },
                { text: 'Local language locally, majority language for state functions', outcome: 'A federal-style compromise — works only if \'local functions\' aren\'t quietly made second-class.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A new school has two large language groups among its students. The student council, dominated by the bigger group, proposes that all school announcements, the canteen menu vote and the annual-day language be decided by simple majority — meaning the larger group wins everything, every time.',
            decisions: [{ prompt: 'What would a fairer arrangement, modelled on how Belgium handled its language divide, look like?', options: [
                { text: 'Guarantee both groups seats in the council, require decisions affecting each community to have that community\'s consent, and let each group run its own cultural affairs — Belgium\'s mix of equal representation, community governments and coalition rule shows how a minority can be protected instead of permanently overruled.', outcome: 'Belgium stayed stable because no group could rule alone: Dutch and French speakers share power at the centre, run their own community governments, and Brussels has special arrangements. The same logic stops a permanent majority at school.' },
                { text: 'Simple majority is the fairest system possible — if most students agree, the minority should accept whatever is decided.', outcome: 'Permanent majority rule in a divided group means one community never wins anything — exactly the resentment that majoritarianism created in Sri Lanka and that Belgium designed its constitution to avoid.', reveals: 'majority-always-fair' },
                { text: 'The only fair fix is to split the school into two separate schools, one for each language group.', outcome: 'Separation is not the only answer — Belgium kept one country intact while giving each community autonomy and shared power at the centre.', reveals: 'only-separation-works' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_008', title: 'You made it',
          caseStudy: { intro: 'Power sharing isn\'t weakness — it\'s the load-bearing wall of a diverse country. Belgium proves a state can pause its government without breaking; Sri Lanka proves the alternative.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_007', difficulty: 'standard',
          question: 'The comparison of Belgium and Sri Lanka illustrates two contrasting approaches.',
          hint: 'If stuck, revisit c10_civ_cbse_01_001 for Belgium\'s four consociational pillars and.',
          misconception: 'Students often think Belgium and Sri Lanka are just "two examples of power sharing" and miss that Sri Lanka is.',
          parts: [
                { id: 'a', prompt: 'Analyze how the vertical division of power (federal/unitary) interacted with horizontal power sharing in both countries to produce different outcomes.', answer: 'Belgium combined vertical federalism (regions/communities) with horizontal',
                  options: ['Belgium combined vertical federalism (regions/communities) with horizontal', 'both were federal', 'two examples of power sharing', 'both countries shared power'],
                  hint: 'If stuck, revisit c10_civ_cbse_01_001 for Belgium\'s four consociational pillars and.',
                  misconception: 'Students often think Belgium and Sri Lanka are just "two examples of power sharing" and miss that Sri Lanka is a counter-example.' }
          ],
            remediations: { 'belgium-and-sri-lanka-are': { steps: ['Re-read the definition of \'majoritarianism\' from c10_civ_cbse_01_002 and \'accommodation\' from c10_civ_cbse_01_001.', 'Make a two-column table: Belgium (consociational features: grand coalition, mutual veto, proportionality, segmental.', 'For each Belgian feature, ask "Did Sri Lanka have this?" The answer is systematically \'no\'.', 'Write one paragraph explaining how the *absence* of each Belgian feature in Sri Lanka contributed to alienation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Belgium and Sri Lanka are just "two examples of power sharing" and miss that Sri Lanka is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Belgium\'s success proves power sharing always prevents conflict; Sri Lanka\'s failure proves majoritarianism always causes civil war."', answer: 'The claim overgeneralizes',
                  options: ['The claim overgeneralizes', 'yes, it\'s always true', 'two examples of power sharing', 'both countries shared power'],
                  hint: 'If stuck, revisit c10_civ_cbse_01_001 for Belgium\'s four consociational pillars and.',
                  misconception: 'Students often think Belgium and Sri Lanka are just "two examples of power sharing" and miss that Sri Lanka is a counter-example.' }
          ],
            remediations: { 'belgium-and-sri-lanka-are': { steps: ['Re-read the definition of \'majoritarianism\' from c10_civ_cbse_01_002 and \'accommodation\' from c10_civ_cbse_01_001.', 'Make a two-column table: Belgium (consociational features: grand coalition, mutual veto, proportionality, segmental.', 'For each Belgian feature, ask "Did Sri Lanka have this?" The answer is systematically \'no\'.', 'Write one paragraph explaining how the *absence* of each Belgian feature in Sri Lanka contributed to alienation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_008', difficulty: 'standard',
          question: 'Prudential reasons for power sharing emphasize practical, calculated benefits.',
          hint: 'If stuck, re-read the “Why Power Sharing is Desirable” section in the textbook and list.',
          misconception: 'Students often treat prudential and moral reasons as mutually exclusive “either/or” choices, writing in exams: “Belgium.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Prudential reasons for power sharing emphasize practical, calculated benefits such as',
                  options: ['Prudential reasons for power sharing emphasize practical, calculated benefits such as', 'The Belgian accommodation model is a consociational power-sharing arrangement where the', 'Majoritarianism in Sri Lanka refers to the political doctrine where the Sinhalese', 'Prudential reasons for power sharing emphasize its practical benefits: it reduces the'],
                  hint: 'If stuck, re-read the “Why Power Sharing is Desirable” section in the textbook and list every.',
                  misconception: 'Students often treat prudential and moral reasons as mutually exclusive “either/or” choices, writing in exams: “Belgium used moral reasons.' }
          ],
            remediations: { 'students-often-treat-prudential-and': { steps: ['Re-read the Belgium (c10_civ_cbse_01_001) and Sri Lanka (c10_civ_cbse_01_002) case studies, highlighting every sentence.', 'Create a two-column table: label one “Prudential Language” (e.g., “avoid civil war,” “ensure stability”) and the other.', 'For each country, place at least three quotes in the appropriate column.', 'Write one paragraph explaining how Belgium’s moral design *also* served prudential ends, and how Sri Lanka’s prudential.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
