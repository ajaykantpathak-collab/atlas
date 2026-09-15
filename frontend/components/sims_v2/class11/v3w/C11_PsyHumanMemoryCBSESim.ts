import type { SimDef } from '../../engine/types';
import C11_PsyHumanMemoryCBSESim from '../../../simulations/c6_12_new/C11_PsyHumanMemoryCBSESim';

/** v3 wrapped master — C11_PsyHumanMemoryCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psyhumanmemorycbsesim: SimDef = {
    id: 'v3w_c11_psyhumanmemorycbsesim',
    title: 'Psy Human Memory CBSE',
    subtitle: 'This node covers the Atkinson-Shiffrin Stage Model (1968) including the three memory.',
    classLevel: 11, subject: 'science', topic: 'Nature of Memory: Information Processing Model',
    chapters: [],
    nodeIds: ['c11_psy_cbse_06_001', 'c11_psy_cbse_06_008', 'c11_psy_cbse_01_008', 'c11_psy_cbse_01_010', 'c11_psy_cbse_03_011', 'c11_psy_cbse_06_002', 'c11_psy_cbse_06_003', 'c11_psy_cbse_06_004', 'c11_psy_cbse_06_005', 'c11_psy_cbse_06_006', 'c11_psy_cbse_06_007', 'c11_psy_cbse_06_009', 'c11_psy_cbse_06_010', 'c11_psy_cbse_01_007', 'c11_psy_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you hear a new friend’s phone number once and must dial it immediately—you repeat it frantically.', goal: 'Master Psy Human Memory CBSE.' },
    discovery: {
        question: 'Define "schema" in your own words and explain how schemas influence memory at each of the three stages: encoding, storage, and retrieval.',
        options: ['A schema is a mental framework', 'a memory', 'a category'],
        answer: 'A schema is a mental framework',
        hook: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.',
    },
    teaching: [
        { title: 'The Information Processing Model (Stage.', text: 'The Information Processing Model (Stage Model) conceptualizes human memory as a system that processes information through three sequential stages—encoding (transforming sensory input into a neural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_001', title: 'The Information Processing Model (Stage.',
          scaffold: { problem: 'A student wants to memorize the 16-digit credit card number 5241 8793 6205 4481 for an online purchase.',
            steps: [
            { text: 'The student attends to the visual stimulus (the card number) so that selective attention transfers it from sensory.' },
            { text: 'The student chunks the 16 digits into four groups of four (5241, 8793, 6205, 4481), expanding STM’s effective capacity.' },
            { text: 'The student uses elaborative rehearsal by associating each chunk with a meaningful date or pattern (e.g., 5241 → May.' },
            { text: 'During the 2-minute distraction, the student periodically retrieves the chunks from LTM (self-testing), strengthening.' },
            { text: 'After distraction, the student retrieves the four chunks from LTM, reassembles the 16-digit number, and enters it.', faded: true, blankAnswer: 'The student will likely recall the full 16-digit number.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_008', title: 'Memory as a constructive process refers.',
          scaffold: { problem: 'Bartlett asked English participants to recall the "War of the Ghosts" story after 1 hour, 1 day, 1 week, and 1 month.',
            steps: [
            { text: 'Identify leveling transformations — at 1 hour, supernatural elements were dropped (leveling: unfamiliar details.' },
            { text: 'Identify sharpening transformations — at 1 day, the dramatic death scene was exaggerated (sharpening: striking details.' },
            { text: 'Identify assimilation transformations — at 1 day, "canoe" became "boat" and "seal-hunting" became "fishing".' },
            { text: 'Synthesize the pattern — over time, the story moved *systematically* toward the participant\'s English cultural schemas:.' },
            { text: 'Connect to the constructive model — the participant is not *forgetting* the story (forgetting would produce gaps); they.', faded: true, blankAnswer: 'The participant\'s recall shows systematic transformations.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_008', title: 'Psychoanalysis is a comprehensive.',
          scaffold: { problem: 'A 22-year-old college student, Priya, consistently procrastinates on assignments until the last minute, then works frantically and submits.',
            steps: [
            { text: 'Identify the unconscious impulse (id) — Priya may harbor repressed hostility toward authority figures (father) that.' },
            { text: 'Identify the superego\'s demand — Internalized paternal criticism creates a harsh superego that demands perfection and.' },
            { text: 'Analyze the ego\'s mediation — The ego, caught between id\'s rebellion and superego\'s perfectionism, adopts.' },
            { text: 'Recognize the defense mechanism — Rationalization ("I work better under pressure") masks the true unconscious.' },
            { text: 'Interpret the symptom\'s function — Procrastination serves as a neurotic compromise formation: it partially satisfies.', faded: true, blankAnswer: 'Priya\'s procrastination reflects an ego mediating between.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_010', title: 'Cognitive psychology is the scientific.',
          scaffold: { problem: 'Rahul is studying for his Class 11 Psychology exam. He reads a chapter on "Memory," highlights key terms, creates a mind-map connecting.',
            steps: [
            { text: 'Reading the chapter → **Perception** (visual recognition of words) and **Attention** (selective focus on text).' },
            { text: 'Highlighting key terms → **Selection/Filtering** (attentional gating) but primarily **Structural/Shallow encoding**.' },
            { text: 'Creating a mind-map → **Elaborative/Semantic encoding** (deep processing): organising concepts meaningfully, linking.' },
            { text: 'Self-testing definitions → **Retrieval practice** (active recall from long-term memory), which strengthens memory.' },
            { text: 'Explain effectiveness: Levels-of-processing theory (Craik & Lockhart) states memory durability depends on *depth* of.', faded: true, blankAnswer: 'Reading = Perception + Attention; Highlighting =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_03_011', title: 'Adulthood and old age represent the.',
          scaffold: { problem: 'Mrs. Sharma, 72, lives alone in Delhi after her husband\'s death two years ago. Her son works in Bengaluru and visits twice a year.',
            steps: [
            { text: 'Identify developmental stage — late adulthood (60+), Erikson\'s crisis: Integrity vs. Despair. Mrs.' },
            { text: 'Map ecological systems — Microsystem: isolated, no daily companionship; Mesosystem: weak family-neighbor link (son.' },
            { text: 'Differentiate ageing markers — Normative: mild forgetfulness (repeating stories = retrieval slowing), hypertension.' },
            { text: 'Analyze cultural values — "Die in my home" reflects autonomy and place-attachment valued in Indian collectivist culture.' },
            { text: 'Design interventions — (a) Community-based "Senior Buddy" program: trained volunteer visits 3x/week for meals, temple.', faded: true, blankAnswer: 'Mrs. Sharma is at risk for despair due to role loss (wife,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_002', title: 'Sensory memory is the initial,.',
          scaffold: { problem: 'A psychology teacher flashes a 3×3 grid of letters (9 letters total) on a screen for 50 milliseconds.',
            steps: [
            { text: 'Identify the capacity of iconic memory from Sperling\'s findings — near-complete grid (9 items) is held initially.' },
            { text: 'Analyse Condition A (Whole Report): Student must write 9 letters. At 200 ms/letter, writing takes 1800 ms.' },
            { text: 'Analyse Condition B (Partial Report): Tone cues one row (3 letters) immediately.' },
            { text: 'Compute implied total capacity: 3 rows × 3 letters = 9 letters.' },
            { text: 'Interpret: The difference (Condition B > Condition A) proves iconic memory has high capacity but ultra-short duration.', faded: true, blankAnswer: 'Condition A (Whole Report): ~4-5 letters. Condition B.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_psy_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Psy Human Memory CBSE', spots: [
            { id: 's1', label: 'The Information Processing Model Stage', prompt: 'Which idea is this? — The Information Processing Model (Stage Model) conceptualizes human memory as a system.', answer: 'The Information Processing Model Stage', options: ['The Information Processing Model Stage', 'Memory as a constructive process', 'Psychoanalysis is a comprehensive theory', 'Cognitive psychology is the scientific'] },
            { id: 's2', label: 'Memory as a constructive process', prompt: 'Which idea is this? — Memory as a constructive process refers to the understanding that memory is not a.', answer: 'Memory as a constructive process', options: ['Memory as a constructive process', 'The Information Processing Model Stage', 'Psychoanalysis is a comprehensive theory', 'Cognitive psychology is the scientific'] },
            { id: 's3', label: 'Psychoanalysis is a comprehensive theory', prompt: 'Which idea is this? — Psychoanalysis is a comprehensive theory of personality and a therapeutic method.', answer: 'Psychoanalysis is a comprehensive theory', options: ['Psychoanalysis is a comprehensive theory', 'The Information Processing Model Stage', 'Memory as a constructive process', 'Cognitive psychology is the scientific'] },
            { id: 's4', label: 'Cognitive psychology is the scientific', prompt: 'Which idea is this? — Cognitive psychology is the scientific study of mental processes—including attention,.', answer: 'Cognitive psychology is the scientific', options: ['Cognitive psychology is the scientific', 'The Information Processing Model Stage', 'Memory as a constructive process', 'Psychoanalysis is a comprehensive theory'] },
            { id: 's5', label: 'Adulthood and old age represent', prompt: 'Which idea is this? — Adulthood and old age represent the final two major stages of the human life-span,.', answer: 'Adulthood and old age represent', options: ['Adulthood and old age represent', 'The Information Processing Model Stage', 'Memory as a constructive process', 'Psychoanalysis is a comprehensive theory'] },
            { id: 's6', label: 'Sensory memory is the initial', prompt: 'Which idea is this? — Sensory memory is the initial, ultra-brief memory system that holds exact replicas of.', answer: 'Sensory memory is the initial', options: ['Sensory memory is the initial', 'The Information Processing Model Stage', 'Memory as a constructive process', 'Psychoanalysis is a comprehensive theory'] }
          ] } }
    ],
    explore: { component: C11_PsyHumanMemoryCBSESim, prompt: 'Explore the interactive — Psy Human Memory CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_001', difficulty: 'standard',
          question: 'The Information Processing Model (Stage Model) conceptualizes human memory as a.',
          hint: 'Review Class 10 Biology Chapter 2: “Human Nervous System: Neurons and Their Structure”.',
          misconception: 'Students often believe that any repetition (maintenance rehearsal) automatically transfers information into long-term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Information Processing Model (Stage Model) conceptualizes human memory as a system',
                  options: ['The Information Processing Model (Stage Model) conceptualizes human memory as a system', 'Memory as a constructive process refers to the understanding that memory is not a', 'Psychoanalysis is a comprehensive theory of personality and a therapeutic method', 'Cognitive psychology is the scientific study of mental processes—including attention,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any repetition (maintenance rehearsal) automatically transfers information into long-term memory.' }
          ],
            remediations: { 'any-repetition-maintenance-rehearsal-automatical': { steps: ['Present the phone-number scenario: repeat a 10-digit number aloud for 30 seconds (maintenance rehearsal), then distract.', 'Contrast with elaborative rehearsal: link the same digits to a known historical date (e.g., 1947-1949-2004) and show.', 'Explicitly label the processes: “Repeating = maintenance (STM only); Meaning-linking = elaborative (LTM).” 4.', 'Have students generate their own elaborative links for a new list to cement the distinction.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_008', difficulty: 'standard',
          question: 'Memory as a constructive process refers to the understanding that memory is not.',
          hint: 'If the student cannot grasp reconstruction (keeps thinking of memory as playback), return.',
          misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.',
          parts: [
                { id: 'a', prompt: 'Define "schema" in your own words and explain how schemas influence memory at each of the three stages: encoding, storage, and retrieval.', answer: 'A schema is a mental framework',
                  options: ['A schema is a mental framework', 'a memory', 'a category'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' },
                { id: 'b', prompt: 'Distinguish between "reproductive memory" and "reconstructive memory." Why is the reproductive model (memory as faithful playback) empirically inadequate?', answer: '**Reproductive memory**: the mind records events like a camera and replays them',
                  options: ['**Reproductive memory**: the mind records events like a camera and replays them', 'reproductive memory is wrong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' },
                { id: 'c', prompt: 'Explain how the reconstructive nature of memory undermines the reliability of eyewitness testimony.', answer: 'The reconstructive nature of memory undermines eyewitness reliability',
                  options: ['The reconstructive nature of memory undermines eyewitness reliability', 'eyewitnesses are unreliable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' }
          ],
            remediations: { 'misconception-memory-works-like-a': { steps: ['**Step-by-step remediation**: 1.', '**Re-enact Bartlett\'s study in miniature**: Tell the student a short, culturally unfamiliar story (e.g., a folk tale.', 'After 10 minutes, ask them to recall it.', 'After 24 hours, ask again.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_008', difficulty: 'standard',
          question: 'Psychoanalysis is a comprehensive theory of personality and a therapeutic.',
          hint: 'If confused about the shift from conscious to unconscious focus, revisit.',
          misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old student who was bitten by a dog at age 4 now experiences intense anxiety when seeing any dog, but has no conscious memory of the bite.', answer: 'The defense mechanism is repression',
                  options: ['The defense mechanism is repression', 'forgetting', 'suppression'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily forgotten or not currently.' }
          ],
            remediations: { 'students-frequently-equate-freud-s': { steps: ['Explicitly contrast the three terms: *preconscious* (available to awareness with attention, e.g., your breakfast.', 'Use the "censor at the gate" metaphor: the ego stands guard; repressed material pushes against the gate but cannot.', 'Assign a 5-minute writing task: "Describe a time you *chose* not to think about something (suppression) vs.', 'a time you *genuinely didn\'t know* why you felt/acted a certain way until later reflection (unconscious leak)." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the claim: "Freud\'s psychosexual stages are scientifically invalid because they cannot be falsified." Support your judgment with two.', answer: 'The claim is largely valid',
                  options: ['The claim is largely valid', 'unscientific', 'I unconsciously forgot my homework'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily forgotten or not currently.' }
          ],
            remediations: { 'students-frequently-equate-freud-s': { steps: ['Explicitly contrast the three terms: *preconscious* (available to awareness with attention, e.g., your breakfast.', 'Use the "censor at the gate" metaphor: the ego stands guard; repressed material pushes against the gate but cannot.', 'Assign a 5-minute writing task: "Describe a time you *chose* not to think about something (suppression) vs.', 'a time you *genuinely didn\'t know* why you felt/acted a certain way until later reflection (unconscious leak)." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_010', difficulty: 'standard',
          question: 'Cognitive psychology is the scientific study of mental processes—including.',
          hint: 'Revisit the "Behaviourism: Watson and the Stimulus-Response Approach" and "Gestalt.',
          misconception: 'Students often believe "cognitive psychology = studying thinking" and equate it with *only* higher-order processes like.',
          parts: [
                { id: 'a', prompt: 'Compare Piaget\'s constructivism and Vygotsky\'s socio-cultural constructivism on: (a) the primary driver of cognitive development, and (b) the role of social.', answer: 'the primary driver of cognitive development, and (',
                  options: ['the primary driver of cognitive development, and (', 'both think children construct knowledge', 'cognitive psychology = studying thinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "cognitive psychology = studying thinking" and equate it with *only* higher-order processes like problem-solving or.' }
          ],
            remediations: { 'cognitive-psychology-studying-thinking-and': { steps: ['Ask the student to walk through the "math problem in a noisy room" scenario from the Walkthrough, naming *each* mental.', 'Have them label each step with the correct cognitive process term (attention, perception, long-term memory retrieval,.', 'Explicitly contrast: "Which of these steps would a behaviourist say we can study?" (None—they\'re all internal).', '"Which would a cognitive psychologist study?" (All—they\'re information processing stages).'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "cognitive psychology = studying thinking" and equate it with *only* higher-order processes like.',
          parts: [
                { id: 'a', prompt: 'Compare Piaget\'s constructivism and Vygotsky\'s socio-cultural constructivism on: (a) the primary driver of cognitive development, and (b) the role of social.', answer: 'the primary driver of cognitive development, and (',
                  options: ['the primary driver of cognitive development, and (', 'both think children construct knowledge', 'cognitive psychology = studying thinking', 'children construct knowledge" without differentiating *how* (individual vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "cognitive psychology = studying thinking" and equate it with *only* higher-order processes like problem-solving or.' }
          ],
            remediations: { 'cognitive-psychology-studying-thinking-and': { steps: ['Ask the student to walk through the "math problem in a noisy room" scenario from the Walkthrough, naming *each* mental.', 'Have them label each step with the correct cognitive process term (attention, perception, long-term memory retrieval,.', 'Explicitly contrast: "Which of these steps would a behaviourist say we can study?" (None—they\'re all internal).', '"Which would a cognitive psychologist study?" (All—they\'re information processing stages).'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_011', difficulty: 'standard',
          question: 'Adulthood and old age represent the final two major stages of the human.',
          hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s Stages) and c11_psy_cbse_03_002 (Life-Span.',
          misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the experience of widowhood for an 80-year-old woman in a traditional joint family in rural Uttar Pradesh versus an 80-year-old woman.', answer: 'Rural joint family: Microsystem',
                  options: ['Rural joint family: Microsystem', 'same grief', 'ageing = uniform decline for everyone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' }
          ],
            remediations: { 'ageing-uniform-decline-for-everyone': { steps: ['Ask the student to list three 70+ year-old Indians they admire who are active (e.g., Ratan Tata, Amitabh Bachchan,.', 'Have them re-read NCERT\'s "Old Age" section highlighting words: "active, energetic, creative," "openness to new.', 'Use a Venn diagram to separate "Normative Changes" (wrinkles, slower recall) from "Pathological Changes".', 'Assign a mini-interview with an older adult about their life-satisfaction sources — forces confrontation with real.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Old age is inevitably a period of decline, dependency, and despair." Use evidence from NCERT\'s life-span perspective (plasticity,.', answer: 'The statement is reductionist and contradicts life-span perspective',
                  options: ['The statement is reductionist and contradicts life-span perspective', 'myth of old age as incapacitating', 'and that developmental stages in adulthood are rigidly age-locked (e.g', 'Erikson\'s stages imply everyone resolves crises at the same age'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' },
                { id: 'b', prompt: 'Design a community-based "Successful Ageing Programme" for a mixed-income urban neighborhood in India.', answer: 'Programme "Sanjeevani": (a) Physical: Weekly yoga/walking groups + health camps',
                  options: ['Programme "Sanjeevani": (a) Physical: Weekly yoga/walking groups + health camps', 'ageing = uniform decline for everyone', 'retirement at 60 means old age starts', 'Erikson\'s stages imply everyone resolves crises at the same age'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' },
                { id: 'c', prompt: 'Compare and contrast the experience of widowhood for an 80-year-old woman in a traditional joint family in rural Uttar Pradesh versus an 80-year-old woman.', answer: 'Rural joint family: Microsystem',
                  options: ['Rural joint family: Microsystem', 'same grief', 'ageing = uniform decline for everyone', 'retirement at 60 means old age starts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' }
          ],
            remediations: { 'ageing-uniform-decline-for-everyone': { steps: ['Ask the student to list three 70+ year-old Indians they admire who are active (e.g., Ratan Tata, Amitabh Bachchan,.', 'Have them re-read NCERT\'s "Old Age" section highlighting words: "active, energetic, creative," "openness to new.', 'Use a Venn diagram to separate "Normative Changes" (wrinkles, slower recall) from "Pathological Changes".', 'Assign a mini-interview with an older adult about their life-satisfaction sources — forces confrontation with real.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_002', difficulty: 'standard',
          question: 'Sensory memory is the initial, ultra-brief memory system that holds exact.',
          hint: 'Revisit c11_psy_cbse_06_001: focus on the definition of "control processes" and why.',
          misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of.',
          parts: [
                { id: 'a', prompt: 'In Sperling\'s partial report experiment, participants viewed a 3×4 letter grid for 50 ms. In the whole report condition, they recalled ~4.5 letters.', answer: 'Implied capacity = 3.3 letters/row × 3 rows ≈ 9-10 letters (near-complete grid)',
                  options: ['Implied capacity = 3.3 letters/row × 3 rows ≈ 9-10 letters (near-complete grid)', 'capacity is 4.5 letters', 'where memories start'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of memorisation*.' }
          ],
            remediations: { 'sensory-memory-is-where-memories': { steps: ['Ask the student: "When you watch a movie, do you \'memorise\' each frame in iconic memory?" (No — it\'s automatic.', 'Show a 50-ms flash of a complex image.', 'Ask: "Can you describe it in detail?" (No — but you *saw* it.) 3.', 'Explain: Sensory memory = perceptual persistence (physics/biology), not cognitive storage.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of.',
          parts: [
                { id: 'a', prompt: 'A textbook claims: "Information in sensory memory is lost forever if not attended to within its duration." Critique this statement. Is it entirely accurate?', answer: 'The statement is partially inaccurate',
                  options: ['The statement is partially inaccurate', 'where memories start', 'Iconic memory is where visual memories are first stored before moving to STM', 'sensory memory is "where memories start"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of memorisation*.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration (using only a projector and speaker) to show the duration difference between iconic and echoic memory.', answer: '**Iconic demo**: Flash a 4×4 random letter grid for 50 ms',
                  options: ['**Iconic demo**: Flash a 4×4 random letter grid for 50 ms', 'where memories start', 'Iconic memory is where visual memories are first stored before moving to STM', 'sensory memory is "where memories start"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of memorisation*.' }
          ],
            remediations: { 'sensory-memory-is-where-memories': { steps: ['Ask the student: "When you watch a movie, do you \'memorise\' each frame in iconic memory?" (No — it\'s automatic.', 'Show a 50-ms flash of a complex image.', 'Ask: "Can you describe it in detail?" (No — but you *saw* it.) 3.', 'Explain: Sensory memory = perceptual persistence (physics/biology), not cognitive storage.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
