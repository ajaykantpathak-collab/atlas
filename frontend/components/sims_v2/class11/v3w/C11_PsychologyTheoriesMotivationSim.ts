import type { SimDef } from '../../engine/types';
import C11_PsychologyTheoriesMotivationSim from '../../../simulations/c6_12/C11_PsychologyTheoriesMotivationSim';

/** v3 wrapped master — C11_PsychologyTheoriesMotivationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psychologytheoriesmotivationsim: SimDef = {
    id: 'v3w_c11_psychologytheoriesmotivationsim',
    title: 'Theories Motivation',
    subtitle: 'This node covers the three core biological motives—hunger, thirst, and sex—their.',
    classLevel: 11, subject: 'psychology', topic: 'Types of Motives: Biological (Physiological) Motives',
    chapters: [],
    nodeIds: ['c11_psy_cbse_08_002', 'c11_psy_cbse_08_004', 'c11_psy_cbse_04_007', 'c11_psy_cbse_05_006', 'c11_psy_cbse_08_001', 'c11_psy_cbse_08_003', 'c11_psy_cbse_07_004', 'c11_psy_cbse_07_009', 'c11_psy_cbse_04_001', 'c11_psy_cbse_08_005', 'c11_psy_cbse_08_006', 'c11_psy_cbse_08_007', 'c11_psy_cbse_08_008', 'c11_psy_cbse_08_009', 'c11_psy_cbse_05_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you skip breakfast and by 11 AM your stomach growls, you feel irritable, and the smell of samosas.', goal: 'Master Theories Motivation.' },
    discovery: {
        question: 'Critique the statement: "Since hunger and thirst are biological motives, they are identical across all humans and unaffected by culture or learning."',
        options: ['The statement is false', 'misconception; a vague', 'low glucose → automatic eating'],
        answer: 'The statement is false',
        hook: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry.',
    },
    teaching: [
        { title: 'Biological (physiological) motives are.', text: 'Biological (physiological) motives are innate, genetically programmed drives arising from internal physiological imbalances or deficits (e.g., nutrient depletion, fluid loss, hormonal changes) that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_08_002', title: 'Biological (physiological) motives are.',
          scaffold: { problem: 'Riya, a Class 11 student, skips breakfast to study for an exam.',
            steps: [
            { text: 'Identify the internal physiological hunger signals present at 10:30 AM: (a) gastric contractions detected by vagal.' },
            { text: 'Identify the brain integration site: These signals converge on the hypothalamus—lateral hypothalamus (LH) "feeding.' },
            { text: 'Identify the cortical override mechanism: Prefrontal cortex (executive control, goal maintenance: "must study") sends.' },
            { text: 'Explain the role of external cues: The coffee aroma activates olfactory pathways → piriform cortex → orbitofrontal.' },
            { text: 'Synthesize: Hunger drive is *generated* (LH active, ghrelin high, glucose low) but *not expressed* behaviorally because.', faded: true, blankAnswer: 'At 10:30 AM, Riya has active gastric contraction signals.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_08_004', title: 'Maslow\'s Hierarchy of Needs is a.',
          scaffold: { problem: 'A 16-year-old student, Meera, lives in a conflict-affected region.',
            steps: [
            { text: 'Identify Meera\'s deficit needs: Physiological (intermittent water/food), Safety (conflict zone, unstable shelter).' },
            { text: 'Identify her active higher needs: Belongingness (peer group), Esteem (leadership recognition), Self-actualization.' },
            { text: 'Apply "relative satisfaction": Her physiological/safety needs are not *zero*—she has *some* food, *some* shelter.' },
            { text: 'Apply "subjective valuation": Meera *cognitively appraises* her peer group and teaching as *more critical* to her.' },
            { text: 'Conclude: This is not a hierarchy violation but a demonstration of Maslow\'s principle that "adequate satisfaction" is.', faded: true, blankAnswer: 'Meera\'s behaviour illustrates that prepotency operates on.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_04_007', title: 'Determinants of attention are the.',
          scaffold: { problem: 'During a cricket match at Wankhede Stadium, a spectator is watching the bowler (selective attention).',
            steps: [
            { text: 'Segment the timeline into three phases: (a) watching bowler, (b) ball hit → duck, (c) checking phone.' },
            { text: 'For phase (a), list determinants maintaining attention on bowler: external — motion of bowler, size of figure against.' },
            { text: 'For phase (b), list determinants capturing attention to ball: external — sudden motion, high intensity (looming),.' },
            { text: 'For phase (c), list determinants shifting attention to phone: external — phone screen light (intensity), motion.' },
            { text: 'Classify each factor as External (E) or Internal (I) and sub-type (size, intensity, motion, novelty, complexity,.' },
            { text: 'Note the failure of divided attention: phone checking exceeded capacity because match monitoring was not yet automatic.', faded: true, blankAnswer: 'Phase (a): E-motion, E-size; I-preparatory set, I-interest..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_05_006', title: 'Observational learning is a process.',
          scaffold: { problem: 'Riya (12) watches her mother negotiate a vegetable price from ₹40/kg to ₹30/kg using a calm tone and specific phrases ("Bhaiya, regular.',
            steps: [
            { text: 'Identify the model (mother), the behaviour (negotiation script), and the consequence (successful discount + vendor\'s.' },
            { text: 'Map attention — Riya observed the interaction closely (eye contact, proximity).' },
            { text: 'Map retention — Riya remembered the exact phrases and tone after 48 hours (symbolic coding in memory).' },
            { text: 'Map reproduction — Riya had the verbal ability and social confidence to replicate the script (component skills present).' },
            { text: 'Map motivation — Vicarious reinforcement: mother\'s success + vendor\'s smile created outcome expectancy; Riya\'s own need.' },
            { text: 'Explain acquisition-performance gap: During observation, Riya had no immediate need to negotiate (no motivation), so.', faded: true, blankAnswer: 'Attention (observed negotiation), Retention (recalled.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_08_001', title: 'The motivational cycle is a sequential.',
          scaffold: { problem: 'Analyse the motivational cycle in this scenario: "Meera, a Class 11 student, realises her Physics practical file is incomplete two days.',
            steps: [
            { text: 'Identify the **Need** – the deficit state: "Incomplete practical file / risk of poor grade / teacher\'s disapproval.".' },
            { text: 'Identify the **Drive** – the internal tension state: "Sinking feeling, anxiety, urgency." This is the psychological.' },
            { text: 'Identify **Arousal** – the physiological/behavioural activation: "Heightened alertness, racing thoughts, staying up.' },
            { text: 'Identify **Goal-directed behaviour** – the specific actions aimed at the goal: "Completing pending experiments, writing.' },
            { text: 'Identify **Achievement** – goal attainment: "File submitted on time, teacher accepts it." The deficit is objectively.' },
            { text: 'Identify **Reduction of arousal** – return to equilibrium: "Peaceful sleep, anxiety gone." The drive state dissipates;.', faded: true, blankAnswer: 'Need = Incomplete file; Drive = Anxiety/urgency; Arousal =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_08_003', title: 'Psychosocial motives are learned.',
          scaffold: { problem: 'Rahul, a 16-year-old, spends hours learning coding from free online tutorials. He doesn\'t get school credit for it.',
            steps: [
            { text: 'List the observed behaviors: learns without external reward, enjoys debugging challenge, chooses moderately difficult.' },
            { text: 'Recall the three criteria for high need for achievement (n-Ach) from textbook: (i) preference for moderately difficult.' },
            { text: 'Map each behavior to a criterion: "chooses projects slightly above skill level" → moderately difficult; "posts code for.' },
            { text: 'Conclude that need for achievement is the dominant motive.' },
            { text: 'Verify that other motives (affiliation, power, curiosity) are less supported: no mention of socializing, influencing.', faded: true, blankAnswer: 'Dominant motive: Need for achievement (n-Ach)..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_psy_cbse_08_004', title: 'Identify each idea',
          dissect: { specimen: 'Theories Motivation', spots: [
            { id: 's1', label: 'Biological physiological motives are innate', prompt: 'Which idea is this? — Biological (physiological) motives are innate, genetically programmed drives arising from.', answer: 'Biological physiological motives are innate', options: ['Biological physiological motives are innate', 'Maslows Hierarchy of Needs is', 'Determinants of attention are the', 'Observational learning is a process'] },
            { id: 's2', label: 'Maslows Hierarchy of Needs is', prompt: 'Which idea is this? — Maslow\'s Hierarchy of Needs is a motivational theory proposing that human needs are.', answer: 'Maslows Hierarchy of Needs is', options: ['Maslows Hierarchy of Needs is', 'Biological physiological motives are innate', 'Determinants of attention are the', 'Observational learning is a process'] },
            { id: 's3', label: 'Determinants of attention are the', prompt: 'Which idea is this? — Determinants of attention are the specific external stimulus characteristics (e.g., size,.', answer: 'Determinants of attention are the', options: ['Determinants of attention are the', 'Biological physiological motives are innate', 'Maslows Hierarchy of Needs is', 'Observational learning is a process'] },
            { id: 's4', label: 'Observational learning is a process', prompt: 'Which idea is this? — Observational learning is a process through which individuals acquire new behaviours or.', answer: 'Observational learning is a process', options: ['Observational learning is a process', 'Biological physiological motives are innate', 'Maslows Hierarchy of Needs is', 'Determinants of attention are the'] },
            { id: 's5', label: 'The motivational cycle is a', prompt: 'Which idea is this? — The motivational cycle is a sequential process where a physiological or psychological.', answer: 'The motivational cycle is a', options: ['The motivational cycle is a', 'Biological physiological motives are innate', 'Maslows Hierarchy of Needs is', 'Determinants of attention are the'] },
            { id: 's6', label: 'Psychosocial motives are learned motivational', prompt: 'Which idea is this? — Psychosocial motives are learned motivational states that arise from an individual\'s.', answer: 'Psychosocial motives are learned motivational', options: ['Psychosocial motives are learned motivational', 'Biological physiological motives are innate', 'Maslows Hierarchy of Needs is', 'Determinants of attention are the'] }
          ] } }
    ],
    explore: { component: C11_PsychologyTheoriesMotivationSim, prompt: 'Explore the interactive — Theories Motivation' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_002', difficulty: 'standard',
          question: 'Biological (physiological) motives are innate, genetically programmed drives.',
          hint: 'Revisit the motivational cycle diagram (Fig. 8.1 in NCERT) and practice identifying need,.',
          misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biological (physiological) motives are innate, genetically programmed drives arising from',
                  options: ['Biological (physiological) motives are innate, genetically programmed drives arising from', 'Maslow\'s Hierarchy of Needs is a motivational theory proposing that human needs are', 'Determinants of attention are the specific external stimulus characteristics (e.g., size,', 'Observational learning is a process through'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry mouth → automatic.' }
          ],
            remediations: { 'biological-motives-operate-like-simple': { steps: ['If a student holds the reflex misconception, do this 3-step remediation: (1) Have them trace the *full* hunger pathway.', 'POMC neurons) → cortex (insula, orbitofrontal) → conscious urge.', 'Emphasize the *decision points* where learning, attention, and context intervene.', '(2) Give a concrete contrast: "A rat with lateral hypothalamus lesion starves despite food present; a human with.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since hunger and thirst are biological motives, they are identical across all humans and unaffected by culture or learning."', answer: 'The statement is false',
                  options: ['The statement is false', 'misconception; a vague', 'low glucose → automatic eating', 'dry mouth → automatic drinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry mouth → automatic.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration (ethical, non-invasive) that would allow Class 11 students to observe the interaction between an internal hunger signal.', answer: 'Independent variable: Presence vs',
                  options: ['Independent variable: Presence vs', 'low glucose → automatic eating', 'dry mouth → automatic drinking', 'set point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry mouth → automatic.' }
          ],
            remediations: { 'biological-motives-operate-like-simple': { steps: ['If a student holds the reflex misconception, do this 3-step remediation: (1) Have them trace the *full* hunger pathway.', 'POMC neurons) → cortex (insula, orbitofrontal) → conscious urge.', 'Emphasize the *decision points* where learning, attention, and context intervene.', '(2) Give a concrete contrast: "A rat with lateral hypothalamus lesion starves despite food present; a human with.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_004', difficulty: 'standard',
          question: 'Maslow\'s Hierarchy of Needs is a motivational theory proposing that human needs.',
          hint: 'If stuck, revisit c11_psy_cbse_08_001 (motivational cycle diagram) and.',
          misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2.',
          parts: [
                { id: 'a', prompt: 'The textbook states: "Lower level needs dominate as long as they are unsatisfied.', answer: '"Adequately satisfied" means *relatively* or *partially* met, not 100% fulfilled',
                  options: ['"Adequately satisfied" means *relatively* or *partially* met, not 100% fulfilled', 'step-ladder'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2 appears." This error stems.' },
                { id: 'b', prompt: 'The textbook notes: "Soldiers, police officers, and fire personnel have been known to protect others by facing very endangering situations, seemingly in direct.', answer: 'which higher need(s) override safety, and (',
                  options: ['which higher need(s) override safety, and (', 'training', 'altruism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2 appears." This error stems.' }
          ],
            remediations: { 'students-treat-the-hierarchy-as': { steps: ['**Re-read the textbook\'s exact phrasing**: "Lower level needs dominate *as long as they are unsatisfied*.', 'Once they are *adequately satisfied*..." — highlight "adequately" ≠ "completely." 2.', '**Draw a bar graph**, not a pyramid: five vertical bars showing % satisfaction (e.g., Physio 80%, Safety 60%, Belonging.', 'This visualizes simultaneous partial satisfaction.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2.',
          parts: [
                { id: 'a', prompt: 'The textbook notes: "Soldiers, police officers, and fire personnel have been known to protect others by facing very endangering situations, seemingly in direct.', answer: 'which higher need(s) override safety, and (',
                  options: ['which higher need(s) override safety, and (', 'training', 'altruism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2 appears." This error stems.' }
          ],
            remediations: { 'students-treat-the-hierarchy-as': { steps: ['**Re-read the textbook\'s exact phrasing**: "Lower level needs dominate *as long as they are unsatisfied*.', 'Once they are *adequately satisfied*..." — highlight "adequately" ≠ "completely." 2.', '**Draw a bar graph**, not a pyramid: five vertical bars showing % satisfaction (e.g., Physio 80%, Safety 60%, Belonging.', 'This visualizes simultaneous partial satisfaction.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_007', difficulty: 'standard',
          question: 'Determinants of attention are the specific external stimulus characteristics.',
          hint: 'Revisit the \'Selective Attention\' subsection in c11_psy_cbse_04_006, specifically the.',
          misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the.',
          parts: [
                { id: 'a', prompt: 'List the seven external factors of selective attention mentioned in the NCERT textbook and give one original example for each.', answer: 'The seven external factors are: (1) Size',
                  options: ['The seven external factors are: (1) Size', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' },
                { id: 'b', prompt: 'A driver is navigating a busy Delhi intersection while listening to a podcast. Suddenly, a pedestrian steps onto the road.', answer: 'External: sudden motion of pedestrian, high intensity (looming visual angle)',
                  options: ['External: sudden motion of pedestrian, high intensity (looming visual angle)', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' },
                { id: 'c', prompt: 'Compare how \'novelty\' and \'preparatory set\' differently influence attentional selection in a student entering an examination hall for the first time versus a.', answer: 'For the first-time student, novelty dominates: unfamiliar architecture, seating',
                  options: ['For the first-time student, novelty dominates: unfamiliar architecture, seating', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' }
          ],
            remediations: { 'internal-factors-mean-only-conscious': { steps: ['Present the \'cocktail party effect\' (hearing your name in unattended ear) and ask: "Did you *decide* to hear your name?"', 'Show that the name captures attention even when you are intensely focused elsewhere — proving an automatic internal.', 'Contrast with a voluntary goal (\'I will listen for the word \'apple\'\') to separate preparatory set (cognitive) from.', 'Have the student re-classify the textbook\'s internal factors into \'automatic/unconscious\' (biological needs, personal.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Internal factors are more powerful determinants of attention than external factors because they reflect the observer\'s goals." Use.', answer: 'The statement is false',
                  options: ['The statement is false', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' }
          ],
            remediations: { 'internal-factors-mean-only-conscious': { steps: ['Present the \'cocktail party effect\' (hearing your name in unattended ear) and ask: "Did you *decide* to hear your name?"', 'Show that the name captures attention even when you are intensely focused elsewhere — proving an automatic internal.', 'Contrast with a voluntary goal (\'I will listen for the word \'apple\'\') to separate preparatory set (cognitive) from.', 'Have the student re-classify the textbook\'s internal factors into \'automatic/unconscious\' (biological needs, personal.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_006', difficulty: 'standard',
          question: 'Observational learning is a process through which individuals acquire new.',
          hint: 'If stuck, revisit c11_psy_cbse_05_004 (operant conditioning basics) and.',
          misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast observational learning with operant conditioning on three dimensions: (a) role of direct reinforcement, (b) necessity of the learner\'s own.', answer: 'role of direct reinforcement, (',
                  options: ['role of direct reinforcement, (', 'both need reinforcement', 'copying'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to perform the.' }
          ],
            remediations: { 'observational-learning-is-simply-copying': { steps: ['Re-read the Bobo doll study\'s three conditions and identify which group learned but didn\'t perform — ask: "If they.', 'Draw a flowchart: Model\'s behaviour → Attention → Retention (symbolic coding) → [Learning acquired] → Motivation →.', 'Practice with a new scenario: "You watch a chef on TV but never cook.', 'When would performance occur?" 4.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to.',
          parts: [
                { id: 'a', prompt: 'Critique the claim: "Bandura\'s Bobo doll study proves that watching violent media causes children to become aggressive." Base your evaluation on the study\'s.', answer: 'The claim overstates the findings',
                  options: ['The claim overstates the findings', 'copying', 'imitation', 'The child didn\'t learn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to perform the.' },
                { id: 'b', prompt: 'Design a mini-experiment to test whether a 6-year-old can learn a novel multi-step task (e.g., origami crane) solely by observing a peer model, without any.', answer: 'Experimental group: child watches peer fold crane twice',
                  options: ['Experimental group: child watches peer fold crane twice', 'copying', 'imitation', 'The child didn\'t learn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to perform the.' },
                { id: 'c', prompt: 'Compare and contrast observational learning with operant conditioning on three dimensions: (a) role of direct reinforcement, (b) necessity of the learner\'s own.', answer: 'role of direct reinforcement, (',
                  options: ['role of direct reinforcement, (', 'both need reinforcement', 'copying', 'imitation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to perform the.' }
          ],
            remediations: { 'observational-learning-is-simply-copying': { steps: ['Re-read the Bobo doll study\'s three conditions and identify which group learned but didn\'t perform — ask: "If they.', 'Draw a flowchart: Model\'s behaviour → Attention → Retention (symbolic coding) → [Learning acquired] → Motivation →.', 'Practice with a new scenario: "You watch a chef on TV but never cook.', 'When would performance occur?" 4.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_001', difficulty: 'standard',
          question: 'The motivational cycle is a sequential process where a physiological or.',
          hint: 'If stuck, revisit the Class 10 Biology concept of **homeostasis** (c10_bio_cbse_02_004 –.',
          misconception: 'Students often believe the motivational cycle is a **linear, one-way sequence that terminates permanently after.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain the difference between a \'need\' and a \'drive\' using the example of a student who stays up all night to complete a project deadline.', answer: 'Need is the *deficit* (lack of completed project/good grade)',
                  options: ['Need is the *deficit* (lack of completed project/good grade)', 'the need drives me'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the motivational cycle is a **linear, one-way sequence that terminates permanently after \'Reduction of arousal\'**.' }
          ],
            remediations: { 'the-motivational-cycle-is-a': { steps: ['Draw the cycle on paper as a **clock face** (12 o\'clock = Need, 2 = Drive, 4 = Arousal, 6 = Behaviour, 8 = Achievement,.', 'Place a pen at 12 and physically rotate it clockwise while saying: "Need creates drive, drive fuels arousal...', 'Ask: "When the clock hits 10 (reduction), does time stop? No – it continues to 12. What need appears next?"', 'Have the student generate three personal examples where a satisfied need re-emerged within 24 hours (hunger, thirst,.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_003', difficulty: 'standard',
          question: 'Psychosocial motives are learned motivational states that arise from an.',
          hint: 'If stuck, revisit the motivational cycle diagram (Figure 8.1) and the biological motives.',
          misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "need for power" is considered a psychosocial motive and not a biological motive, using the concept of homeostasis.', answer: 'Biological motives like hunger and thirst aim to restore homeostasis (internal',
                  options: ['Biological motives like hunger and thirst aim to restore homeostasis (internal', 'need for achievement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.' },
                { id: 'b', prompt: 'Compare and contrast the "need for affiliation" and "need for power" in terms of (a) the typical social situation that arouses them, and (b) the behavioral.', answer: 'the typical social situation that arouses them, and (',
                  options: ['the typical social situation that arouses them, and (', 'need for achievement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.' }
          ],
            remediations: { 'need-for-achievement-n-ach': { steps: ['If a student exhibits this misconception, do NOT just re-read the definition.', 'Instead: 1) Present two case vignettes: Student A chooses a very easy project to guarantee an A; Student B chooses a.', '2) Ask the student to apply the three criteria (moderate difficulty, feedback-seeking, personal excellence) to each.', '3) Have the student write a one-sentence rule: "High n-Ach is shown by choosing _______ tasks and using feedback to.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Psychosocial motives are completely independent of biological motives; they operate in separate domains." Use the NCERT concept of.', answer: 'The statement is false',
                  options: ['The statement is false', 'need for achievement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.' },
                { id: 'b', prompt: 'Compare and contrast the "need for affiliation" and "need for power" in terms of (a) the typical social situation that arouses them, and (b) the behavioral.', answer: 'the typical social situation that arouses them, and (',
                  options: ['the typical social situation that arouses them, and (', 'need for achievement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.' }
          ],
            remediations: { 'need-for-achievement-n-ach': { steps: ['If a student exhibits this misconception, do NOT just re-read the definition.', 'Instead: 1) Present two case vignettes: Student A chooses a very easy project to guarantee an A; Student B chooses a.', '2) Ask the student to apply the three criteria (moderate difficulty, feedback-seeking, personal excellence) to each.', '3) Have the student write a one-sentence rule: "High n-Ach is shown by choosing _______ tasks and using feedback to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
