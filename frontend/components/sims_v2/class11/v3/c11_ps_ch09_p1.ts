import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch09_p1: SimDef = {
    id: 'v3_c11_ps_ch09_p1',
    title: 'Peace · Part 1/2',
    subtitle: 'Tell the silence of peace from the silence of suppression.',
    classLevel: 11, subject: 'political_science', topic: 'Peace · Part 1/2',
    chapters: ['c11_ps_ch09'],
    nodeIds: ['c11_ps_cbse_09_001', 'c11_ps_cbse_09_002', 'c11_ps_cbse_09_003', 'c11_ps_cbse_09_004', 'c11_ps_cbse_09_005', 'c11_ps_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a peace researcher reading past the crime statistics', intro: 'No riots reported — yet the river dispute festers and the prisoners wait. Something important is missing from the headline.', goal: 'Distinguish negative from positive peace and identify structural violence beneath calm.' },
    discovery: {
        question: 'A state reports zero riots and zero homicides for a decade — has it achieved peace?',
        options: ['Only negative peace — the absence of violence; structural injustice like unresolved water disputes can keep positive peace unmet', 'Yes — no violence means peace', 'Yes — law and order is peace', 'Only if the police agree'],
        answer: 'Only negative peace — the absence of violence; structural injustice like unresolved water disputes can keep positive peace unmet',
        hook: '\'Negative\' isn\'t a moral grade — a ceasefire is negative peace and still essential; it just can\'t finish the job alone.',
    },
    teaching: [
        { title: 'What is peace: Absence of violence vs positive peace', text: 'Peace is a multidimensional concept: **negative peace** refers to the absence of direct, physical violence (war, assault, riots), while **positive peace** denotes the presence of structural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Diagnose a calm Punjab as negative or positive peace, then name the structural blocks that keep ceasefires from becoming justice.',
        labels: ['What is peace: Absence', 'Negative peace vs positive', 'Structural violence and cultural', 'Pacifism: The doctrine', 'Just war theory: Jus', 'Gandhi and non-violence: Satyagraha'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_001', title: 'What is peace: Absence of violence vs positive peace',
          caseStudy: { intro: 'Imagine your neighbourhood has had no fights or thefts for six months—everyone feels “peaceful.” Ask: *Is this peace fragile?* Introduce the idea that a mere.',
            decisions: [{ prompt: 'Define negative peace and positive peace in one sentence each, using Galtung’s terminology.', options: [
                { text: 'Negative peace is the absence of direct, organised physical violence (war, riots, assault)', outcome: 'Negative peace is the absence of direct, organised physical violence (war, riots, assault).' },
                { text: 'positive peace means everyone is happy', outcome: 'Not quite — Students often equate “peace” with “calm” or “law and order,” assuming that if no riots or wars are.', reveals: 'students-often-equate-peace-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_002', title: 'Negative peace vs positive peace (Johan Galtung)',
          caseStudy: { intro: 'Imagine reading a news report: "Ceasefire declared in Region X after 10 years of civil war.',
            decisions: [{ prompt: 'Define negative peace and positive peace in Johan Galtung\'s framework. What is the fundamental difference between them?', options: [
                { text: 'Negative peace is the absence of direct violence (war, physical harm)', outcome: 'Negative peace is the absence of direct violence (war, physical harm); positive peace is the.' },
                { text: 'negative peace is bad peace, positive peace is good peace', outcome: 'Not quite — Students often think "negative peace = bad peace" and "positive peace = good peace" because of the.', reveals: 'negative-peace-bad-peace-and' },
                { text: 'negative', outcome: 'Not quite — Students often think "negative peace = bad peace" and "positive peace = good peace" because of the.', reveals: 'negative-peace-bad-peace-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_003', title: 'Structural violence and cultural violence',
          caseStudy: { intro: 'Imagine you read a news report about a Dalit student being denied midday meal in a government school because the cook refuses to serve food prepared by a Dalit.',
            decisions: [{ prompt: 'Define structural violence and give one example from contemporary India that does NOT involve direct physical force.', options: [
                { text: 'Structural violence is harm caused by social structures (laws, policies, economic', outcome: 'Structural violence is harm caused by social structures (laws, policies, economic systems.' },
                { text: 'police beating protesters', outcome: 'Not quite — Students often think structural violence requires a "villain" (a corrupt official, a biased judge).', reveals: 'structural-violence-requires-a-villain' },
                { text: 'villain', outcome: 'Not quite — Students often think structural violence requires a "villain" (a corrupt official, a biased judge).', reveals: 'structural-violence-requires-a-villain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_004', title: 'Pacifism: The doctrine of non-violence and its variants',
          caseStudy: { intro: 'Imagine you see a news report about a country invading its neighbour.',
            decisions: [{ prompt: 'Define absolute pacifism and give one historical example of a group or individual adhering to it.', options: [
                { text: 'Absolute pacifism holds that violence is *intrinsically* immoral and never permissible,', outcome: 'Absolute pacifism holds that violence is *intrinsically* immoral and never permissible, regardless.' },
                { text: 'pacifism means opposing only unjust wars', outcome: 'Not quite — Students equate pacifism with *passivity* or *cowardice* ("doing nothing").', reveals: 'students-equate-pacifism-with-passivity' },
                { text: 'did nothing', outcome: 'Not quite — Students equate pacifism with *passivity* or *cowardice* ("doing nothing").', reveals: 'students-equate-pacifism-with-passivity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_005', title: 'Just war theory: Jus ad bellum and jus in bello',
          caseStudy: { intro: 'Imagine you are reading a news report about a drone strike that eliminated a terrorist leader but also killed three civilians in a neighboring house.',
            decisions: [{ prompt: 'Define *Jus ad bellum* and *Jus in bello* and list the six criteria of *Jus ad bellum*.', options: [
                { text: '*Jus ad bellum* refers to the justice of resorting to war (the decision to go to war)', outcome: '*Jus ad bellum* refers to the justice of resorting to war (the decision to go to war); *Jus.' },
                { text: 'checklist', outcome: 'Not quite — Students often believe **Just War Theory provides a "checklist" that, once ticked, makes a war.', reveals: 'just-war-theory-provides-a' },
                { text: 'the US satisfied legitimate authority (Congress voted) so it was a just war', outcome: 'Not quite — Students often believe **Just War Theory provides a "checklist" that, once ticked, makes a war.', reveals: 'just-war-theory-provides-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_006', title: 'Gandhi and non-violence: Satyagraha as a method of resistance',
          caseStudy: { intro: 'Imagine you see a news report about farmers sitting peacefully on a highway for months, refusing to leave despite police barricades and harsh weather, saying.',
            decisions: [{ prompt: 'Define Satyagraha and state its literal meaning.', options: [
                { text: 'Satyagraha means "holding onto truth" (Satya = truth, Agraha = firm insistence)', outcome: 'Satyagraha means "holding onto truth" (Satya = truth, Agraha = firm insistence).' },
                { text: 'passive resistance', outcome: 'Not quite — Students equate Satyagraha with "peaceful protest" or "hunger strike" as a tactic, missing its.', reveals: 'students-equate-satyagraha-with-peaceful' },
                { text: 'peaceful protest', outcome: 'Not quite — Students equate Satyagraha with "peaceful protest" or "hunger strike" as a tactic, missing its.', reveals: 'students-equate-satyagraha-with-peaceful' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A peace-studies poster declares: \'Punjab after 1993 proves peace returned — no riots for decades.\' A teammate counters: \'Ceasefires are worthless — they\'re only negative peace, so they\'re not real peace at all.\'',
            decisions: [{ prompt: 'How does the negative/positive peace distinction resolve this?', options: [
                { text: 'Use Galtung\'s technical senses: the Punjab lull is negative peace — absence of direct violence — while unresolved river-water disputes, prisoners and stagnation keep structural violence alive, so \'calm\' isn\'t positive peace. But negative isn\'t \'bad\': a ceasefire is a necessary first step that must be DEEPENED into justice and institutions — absence of pathology first, presence of health next.', outcome: 'The poster gets honest: no-violence is the floor, not the building — and ceasefires are prerequisites to build on, not failures to dismiss.' },
                { text: 'Accept the calm-is-peace reading — no visible violence means peace achieved.', outcome: 'That\'s law-and-order mistaken for peace: positive peace requires the structures — justice, equity, participation — whose absence lets violence incubate silently.', reveals: 'calm-equals-positive-peace' },
                { text: 'Accept the ceasefire dismissal — negative peace isn\'t real peace.', outcome: '\'Negative\' is a technical term (absence of violence), not a value judgment: ceasefires are the prerequisite that positive peace builds upon.', reveals: 'negative-peace-is-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Quiet streets can sit over loud grievances — positive peace is the presence of justice, not merely the absence of sirens.',
            decisions: [{ prompt: 'What comes next? Peace · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Peace · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_001', difficulty: 'standard',
          question: 'Peace is a multidimensional concept: **negative peace** refers to the absence.',
          hint: 'Revisit Class 10 Chapter 1 “Power Sharing” – prudential vs moral reasons, and the Belgium.',
          misconception: 'Students often equate “peace” with “calm” or “law and order,” assuming that if no riots or wars are reported, positive.',
          parts: [
                { id: 'a', prompt: 'The Indian Constitution’s Directive Principles (Articles 38, 39, 46) mandate the state to minimise income inequalities, prevent concentration of wealth, and.', answer: 'They aim at positive peace',
                  options: ['They aim at positive peace', 'they are about negative peace'],
                  hint: 'Revisit Class 10 Chapter 1 “Power Sharing” – prudential vs moral reasons, and the Belgium vs Sri.',
                  misconception: 'Students often equate “peace” with “calm” or “law and order,” assuming that if no riots or wars are reported, positive peace exists.' },
                { id: 'b', prompt: 'Compare the 1993 Oslo Accords (Israel-PLO mutual recognition, limited Palestinian self-rule) with South Africa’s 1994 transition (Truth & Reconciliation.', answer: 'South Africa’s transition better illustrates the shift',
                  options: ['South Africa’s transition better illustrates the shift', 'both are positive peace'],
                  hint: 'Revisit Class 10 Chapter 1 “Power Sharing” – prudential vs moral reasons, and the Belgium vs Sri.',
                  misconception: 'Students often equate “peace” with “calm” or “law and order,” assuming that if no riots or wars are reported, positive peace exists.' }
          ],
            remediations: { 'students-often-equate-peace-with': { steps: ['Re-read Galtung’s original 1969 essay “Violence, Peace, and Peace Research” (extract in NCERT Political Theory Ch.9).', 'Map the 1975-77 Emergency and the post-1993 Punjab case onto a two-axis grid (Direct Violence vs. Structural Violence).', 'Write a 150-word paragraph explaining why “absence of news headlines” ≠ “presence of justice.”', 'Discuss with teacher how Directive Principles (Articles 38, 39, 46) operationalise positive peace in the Indian.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate “peace” with “calm” or “law and order,” assuming that if no riots or wars are reported, positive.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: “A society with zero homicides and zero riots has achieved positive peace.” Provide a counter-example from Indian history or contemporary.', answer: 'The claim is false',
                  options: ['The claim is false', 'yes, because no one is dying'],
                  hint: 'Revisit Class 10 Chapter 1 “Power Sharing” – prudential vs moral reasons, and the Belgium vs Sri.',
                  misconception: 'Students often equate “peace” with “calm” or “law and order,” assuming that if no riots or wars are reported, positive peace exists.' }
          ],
            remediations: { 'students-often-equate-peace-with': { steps: ['Re-read Galtung’s original 1969 essay “Violence, Peace, and Peace Research” (extract in NCERT Political Theory Ch.9).', 'Map the 1975-77 Emergency and the post-1993 Punjab case onto a two-axis grid (Direct Violence vs. Structural Violence).', 'Write a 150-word paragraph explaining why “absence of news headlines” ≠ “presence of justice.”', 'Discuss with teacher how Directive Principles (Articles 38, 39, 46) operationalise positive peace in the Indian.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_002', difficulty: 'standard',
          question: 'Negative peace refers to the mere absence of direct, organized violence (war.',
          hint: 'Revisit c11_ps_cbse_09_001 and list three situations where violence is absent but.',
          misconception: 'Students often think "negative peace = bad peace" and "positive peace = good peace" because of the everyday.',
          parts: [
                { id: 'a', prompt: 'Define negative peace and positive peace in Johan Galtung\'s framework. What is the fundamental difference between them?', answer: 'Negative peace is the absence of direct violence (war, physical harm)',
                  options: ['Negative peace is the absence of direct violence (war, physical harm)', 'negative peace is bad peace, positive peace is good peace', 'negative', 'positive'],
                  hint: 'Revisit c11_ps_cbse_09_001 and list three situations where violence is absent but injustice.',
                  misconception: 'Students often think "negative peace = bad peace" and "positive peace = good peace" because of the everyday connotations of the words.' }
          ],
            remediations: { 'negative-peace-bad-peace-and': { steps: ['Write "Negative = Absence" and "Positive = Presence" on the board.', 'Use a medical analogy: "Negative health = no disease; Positive health = fitness, nutrition, resilience."', 'Map to peace: "Ceasefire = no disease; Land reform, truth commission, inclusive policing = fitness."', 'Have students classify 5 news headlines (e.g., "Guns fall silent," "Land titles distributed," "Hate speech law passed").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_003', difficulty: 'standard',
          question: 'Structural violence refers to systematic, institutionalized patterns of harm.',
          hint: 'Revisit c11_ps_cbse_09_002\'s explanation of the violence triangle—specifically how.',
          misconception: 'Students often think structural violence requires a "villain" (a corrupt official, a biased judge) and cultural.',
          parts: [
                { id: 'a', prompt: 'A state government passes a law requiring all citizens to possess a biometric ID to access food rations.', answer: 'Direct violence: None immediately visible (no beating or arrest)',
                  options: ['Direct violence: None immediately visible (no beating or arrest)', 'corruption reduction', 'villain', 'violent culture'],
                  hint: 'Revisit c11_ps_cbse_09_002\'s explanation of the violence triangle—specifically how structural.',
                  misconception: 'Students often think structural violence requires a "villain" (a corrupt official, a biased judge) and cultural violence means "violent.' }
          ],
            remediations: { 'structural-violence-requires-a-villain': { steps: ['Re-read Galtung\'s original 1969 article "Violence, Peace, and Peace Research" focusing on the distinction between.', 'Take the midday meal example from the Walkthrough—trace each layer: Direct (cook refuses), Structural (caste-based.', 'Apply the same three-layer tracing to a new case: manual scavenging deaths.', 'Write one paragraph explaining why calling manual scavenging "unfortunate accident" is cultural violence masking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_004', difficulty: 'standard',
          question: 'Pacifism is the ethical and political doctrine that rejects war, violence, and.',
          hint: 'Revisit c11_ps_cbse_09_002 (Galtung\'s triangle: direct, structural, cultural violence).',
          misconception: 'Students equate pacifism with *passivity* or *cowardice* ("doing nothing").',
          parts: [
                { id: 'a', prompt: 'A nation faces an imminent invasion by a dictator known for ethnic cleansing. The government asks citizens to take up arms.', answer: 'Selective pacifism *would* likely permit this war',
                  options: ['Selective pacifism *would* likely permit this war', 'selective pacifism rejects all war', 'selective pacifism supports any war declared by government', 'did nothing'],
                  hint: 'Revisit c11_ps_cbse_09_002 (Galtung\'s triangle: direct, structural, cultural violence) and.',
                  misconception: 'Students equate pacifism with *passivity* or *cowardice* ("doing nothing").' }
          ],
            remediations: { 'students-equate-pacifism-with-passivity': { steps: ['If student conflates pacifism with passivity: 1) Show 2-min clip of Birmingham Children\'s Crusade (1963) or Salt March.', 'Non-violent Action" T-chart: List actions on both sides (violence: shoot, bomb; non-violence: strike, boycott, sit-in.', '3) Assign reading: Gene Sharp\'s "198 Methods of Nonviolent Action" — students categorise 10 methods as "passive".', '4) Revisit definition: Pacifism = *rejection of violence as a tool*, not rejection of *struggle*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_005', difficulty: 'standard',
          question: 'Just War Theory is a normative ethical framework that establishes criteria.',
          hint: 'Revisit c11_ps_cbse_09_002 (Galtung\'s violence triangle) and c11_ps_cbse_09_004 (pacifism.',
          misconception: 'Students often believe **Just War Theory provides a "checklist" that, once ticked, makes a war morally "legal".',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the *Jus in bello* principle of "discrimination" with the principle of "proportionality" using a concrete example of an artillery strike.', answer: '**Discrimination** forbids directly targeting non-combatants',
                  options: ['**Discrimination** forbids directly targeting non-combatants', 'checklist', 'the US satisfied legitimate authority (Congress voted) so it was a just war'],
                  hint: 'Revisit c11_ps_cbse_09_002 (Galtung\'s violence triangle) and c11_ps_cbse_09_004 (pacifism variants).',
                  misconception: 'Students often believe **Just War Theory provides a "checklist" that, once ticked, makes a war morally "legal" or "good."** In reality, the.' }
          ],
            remediations: { 'just-war-theory-provides-a': { steps: ['Have the student create a **two-column table** for a recent conflict (e.g., Russia-Ukraine, Israel-Gaza): Column.', 'For each criterion, write **one sentence of evidence** from reputable sources (UN reports, ICJ opinions, major.', 'Highlight any criterion where evidence is **mixed or absent**.', 'Conclude: "This war fails Just War Theory because it violates [specific criterion] as shown by [evidence]." This forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_006', difficulty: 'standard',
          question: 'Satyagraha is Gandhi\'s method of non-violent resistance that translates.',
          hint: 'Revisit Class 10 History Chapter 2 nodes on Non-Cooperation and Civil Disobedience.',
          misconception: 'Students equate Satyagraha with "peaceful protest" or "hunger strike" as a tactic, missing its ontological claim: the.',
          parts: [
                { id: 'a', prompt: 'Define Satyagraha and state its literal meaning.', answer: 'Satyagraha means "holding onto truth" (Satya = truth, Agraha = firm insistence)',
                  options: ['Satyagraha means "holding onto truth" (Satya = truth, Agraha = firm insistence)', 'passive resistance', 'peaceful protest'],
                  hint: 'Revisit Class 10 History Chapter 2 nodes on Non-Cooperation and Civil Disobedience movements; focus.',
                  misconception: 'Students equate Satyagraha with "peaceful protest" or "hunger strike" as a tactic, missing its ontological claim: the means (non-violence).' },
                { id: 'b', prompt: 'Explain why Gandhi distinguished Satyagraha from "passive resistance" and "pacifism".', answer: 'Gandhi rejected "passive resistance"',
                  options: ['Gandhi rejected "passive resistance"', 'they are the same'],
                  hint: 'Revisit Class 10 History Chapter 2 nodes on Non-Cooperation and Civil Disobedience movements; focus.',
                  misconception: 'Students equate Satyagraha with "peaceful protest" or "hunger strike" as a tactic, missing its ontological claim: the means (non-violence).' }
          ],
            remediations: { 'students-equate-satyagraha-with-peaceful': { steps: ['Re-read Gandhi\'s "Hind Swaraj" (Chapter 17) where he explains "means are ends in the making."', 'Analyze the 1922 Chauri Chaura incident — Gandhi withdrew Non-Cooperation Movement despite mass mobilization because.', 'Contrast with strategic non-violence (Gene Sharp) where non-violence is a technique.', 'Write a 150-word note: "Why Gandhi would reject a violent revolution that achieves independence."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
