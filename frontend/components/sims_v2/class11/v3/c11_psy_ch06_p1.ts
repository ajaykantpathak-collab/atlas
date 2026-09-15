import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch06_p1: SimDef = {
    id: 'v3_c11_psy_ch06_p1',
    title: 'Human Memory · Part 1/2',
    subtitle: 'Learn why confident recitation still goes blank on exam day.',
    classLevel: 11, subject: 'psychology', topic: 'Human Memory · Part 1/2',
    chapters: ['c11_psy_ch06'],
    nodeIds: ['c11_psy_cbse_06_001', 'c11_psy_cbse_06_002', 'c11_psy_cbse_06_003', 'c11_psy_cbse_06_004', 'c11_psy_cbse_06_005', 'c11_psy_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a student upgrading their rehearsal strategy', intro: 'Twenty readings, one blank exam — the loop kept the words alive and never once built them a home.', goal: 'Distinguish maintenance from elaborative rehearsal and place sensory memory correctly.' },
    discovery: {
        question: 'Recite a definition aloud twenty times, feel confident — has it reached long-term memory?',
        options: ['Probably not — maintenance rehearsal just cycles it in short-term memory; without semantic, elaborative processing it decays when repetition stops', 'Yes — repetition always transfers to LTM', 'Yes — twenty reps is plenty', 'No — because reading is not memorising at all'],
        answer: 'Probably not — maintenance rehearsal just cycles it in short-term memory; without semantic, elaborative processing it decays when repetition stops',
        hook: 'Patient KF kept long-term memory while losing short-term — the stage model survived the exception because parallel routes, not broken sequence, explain it.',
    },
    teaching: [
        { title: 'Nature of Memory: Information Processing Model', text: 'The Information Processing Model (Stage Model) conceptualizes human memory as a system that processes information through three sequential stages—encoding (transforming sensory input into a neural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Correct the idea that iconic memory is \'step one of memorising,\' then judge whether unattended sensory input is lost forever.',
        labels: ['Nature of Memory: Information', 'Sensory Memory: Iconic', 'Short-Term Memory and Working', 'Long-Term Memory: Declarative', 'Encoding: Levels of Processing', 'Forgetting: Ebbinghaus Curve'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_001', title: 'Nature of Memory: Information Processing Model',
          caseStudy: { intro: 'Imagine you hear a new friend’s phone number once and must dial it immediately—you repeat it frantically until the call connects.',
            decisions: [{ prompt: 'Define the three stages of memory in the Information Processing Model and name the memory store associated with each stage.', options: [
                { text: 'The three stages are encoding (input), storage (retention), and retrieval (output)', outcome: 'The three stages are encoding (input), storage (retention), and retrieval (output).' },
                { text: 'encoding is storage', outcome: 'Not quite — Students often believe that any repetition (maintenance rehearsal) automatically transfers.', reveals: 'any-repetition-maintenance-rehearsal-automatical' },
                { text: 'retrieval happens in sensory memory', outcome: 'Not quite — Students often believe that any repetition (maintenance rehearsal) automatically transfers.', reveals: 'any-repetition-maintenance-rehearsal-automatical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_002', title: 'Sensory Memory: Iconic and Echoic Storage',
          caseStudy: { intro: 'Imagine you\'re crossing a busy Delhi street and suddenly hear a loud horn — you instantly "replay" the sound in your mind for a couple of seconds even after.',
            decisions: [{ prompt: 'Define sensory memory and state the approximate duration of iconic and echoic memory stores.', options: [
                { text: 'Sensory memory is the initial memory system that holds exact sensory replicas for very', outcome: 'Sensory memory is the initial memory system that holds exact sensory replicas for very brief.' },
                { text: 'a few seconds', outcome: 'Not quite — Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the.', reveals: 'sensory-memory-is-where-memories' },
                { text: 'where memories start', outcome: 'Not quite — Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the.', reveals: 'sensory-memory-is-where-memories' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_003', title: 'Short-Term Memory and Working Memory',
          caseStudy: { intro: 'Imagine you are trying to mentally calculate the total cost of your grocery items while walking through a busy market: you hold the running total (₹45 + ₹30.',
            decisions: [{ prompt: 'Define Short-Term Memory (STM) according to the Atkinson-Shiffrin Stage Model, specifying its capacity, duration, and primary encoding.', options: [
                { text: 'According to the Atkinson-Shiffrin model, STM is a memory store with a limited capacity', outcome: 'According to the Atkinson-Shiffrin model, STM is a memory store with a limited capacity.' },
                { text: 'unlimited capacity', outcome: 'Not quite — Students often believe that **Short-Term Memory and Working Memory are synonymous terms for the.', reveals: 'short-term-memory-and-working' },
                { text: 'semantic encoding as primary', outcome: 'Not quite — Students often believe that **Short-Term Memory and Working Memory are synonymous terms for the.', reveals: 'short-term-memory-and-working' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_004', title: 'Long-Term Memory: Declarative and Procedural',
          caseStudy: { intro: 'Imagine you are teaching your younger cousin to ride a bicycle.',
            decisions: [{ prompt: 'Define procedural memory and give one concrete example that is NOT mentioned in the NCERT textbook.', options: [
                { text: 'Procedural memory is a type of long-term memory that stores unconscious, automatic skills', outcome: 'Procedural memory is a type of long-term memory that stores unconscious, automatic skills and.' },
                { text: 'driving a car on a familiar route while holding a conversation', outcome: 'Not quite — **Misconception:** "Declarative memory is \'knowing that\' and procedural memory is \'knowing how\'—so.', reveals: 'misconception-declarative-memory-is-knowing' },
                { text: 'remembering the steps to change a tyre', outcome: 'Not quite — **Misconception:** "Declarative memory is \'knowing that\' and procedural memory is \'knowing how\'—so.', reveals: 'misconception-declarative-memory-is-knowing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_005', title: 'Encoding: Levels of Processing Theory (Craik and Lockhart)',
          caseStudy: { intro: 'Imagine you are trying to remember a new classmate\'s name: "Aarav".',
            decisions: [{ prompt: 'State the three levels of processing in Craik and Lockhart\'s theory in order from shallowest to deepest.', options: [
                { text: 'Structural (physical features) → Phonemic (sound) → Semantic (meaning)', outcome: 'Structural (physical features) → Phonemic (sound) → Semantic (meaning).' },
                { text: 'acoustic', outcome: 'Not quite — Students often believe "deeper processing = more time spent studying".', reveals: 'deeper-processing-more-time-spent' },
                { text: 'phonemic', outcome: 'Not quite — Students often believe "deeper processing = more time spent studying".', reveals: 'deeper-processing-more-time-spent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_006', title: 'Forgetting: Ebbinghaus Curve and Causes of Forgetting',
          caseStudy: { intro: 'Imagine you cram 20 biology definitions the night before your exam, walk in feeling confident, but stare blankly at the first question — where did those.',
            decisions: [{ prompt: 'A student claims, "Ebbinghaus proved we forget everything at a constant rate — like 10% per hour." State the exact pattern Ebbinghaus.', options: [
                { text: 'Ebbinghaus found a **non-linear, two-phase pattern**: the rate of forgetting is **maximum', outcome: 'Ebbinghaus found a **non-linear, two-phase pattern**: the rate of forgetting is **maximum in the.' },
                { text: 'constant rate', outcome: 'Not quite — **Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes,.', reveals: 'misconception-ebbinghaus-s-curve-means' },
                { text: 'I\'ll just review once after 1 hour and I\'ll remember it forever', outcome: 'Not quite — **Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes,.', reveals: 'misconception-ebbinghaus-s-curve-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A study-skills workshop hears two confessions: \'I recited the definition twenty times and still blanked in the exam.\' And \'iconic memory is where visual memories are first stored on their way to becoming real memories.\'',
            decisions: [{ prompt: 'What does the memory model explain about both?', options: [
                { text: 'Diagnose via the stage model: rote reciting is maintenance rehearsal — it cycles material in short-term memory but never builds semantic links, so it decays once repetition stops; elaborative rehearsal (linking to meaning) is the bridge to long-term memory. And sensory memory isn\'t storage — iconic and echoic are raw perceptual buffers holding unprocessed input for a second or two so attention can select; encoding hasn\'t happened yet.', outcome: 'Both confusions resolve: memory is a flow system — failure can sit at encoding (no elaboration) or at the buffer stage where nothing was ever \'stored\' in the memorising sense.' },
                { text: 'Tell him twenty repetitions should have worked — repetition is how memory forms.', outcome: 'Repetition without meaning only maintains: without semantic processing the material never enters long-term storage — confidence during rehearsal isn\'t encoding.', reveals: 'repetition-equals-memorisation' },
                { text: 'Accept the buffer-as-storage view — iconic memory is stage one of memorising.', outcome: 'It\'s a perceptual buffer, not a memory store: it holds raw sensory replicas like a camera sensor — attention then selects what gets encoded into STM.', reveals: 'sensory-memory-is-storage' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sensory memory is a buffer, not a store — raw pixels, not meaning; the memory starts where attention starts.',
            decisions: [{ prompt: 'What comes next? Human Memory · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Memory · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_001', difficulty: 'standard',
          question: 'The Information Processing Model (Stage Model) conceptualizes human memory as.',
          hint: 'Review Class 10 Biology Chapter 2: “Human Nervous System: Neurons and Their Structure”.',
          misconception: 'Students often believe that any repetition (maintenance rehearsal) automatically transfers information into long-term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Information Processing Model (Stage Model) conceptualizes human memory as a system',
                  options: ['The Information Processing Model (Stage Model) conceptualizes human memory as a system', 'Sensory memory is the initial, ultra-brief memory system that holds exact replicas of', 'Short-Term Memory (STM) is a limited-capacity memory store that holds a small amount of', 'Long-term memory (LTM) is a relatively permanent memory system with virtually unlimited'],
                  hint: 'Review Class 10 Biology Chapter 2: “Human Nervous System: Neurons and Their Structure” and “Human.',
                  misconception: 'Students often believe that any repetition (maintenance rehearsal) automatically transfers information into long-term memory.' }
          ],
            remediations: { 'any-repetition-maintenance-rehearsal-automatical': { steps: ['Present the phone-number scenario: repeat a 10-digit number aloud for 30 seconds (maintenance rehearsal), then distract.', 'Contrast with elaborative rehearsal: link the same digits to a known historical date (e.g., 1947-1949-2004) and show.', 'Explicitly label the processes: “Repeating = maintenance (STM only); Meaning-linking = elaborative (LTM).” 4.', 'Have students generate their own elaborative links for a new list to cement the distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_002', difficulty: 'standard',
          question: 'Sensory memory is the initial, ultra-brief memory system that holds exact.',
          hint: 'Revisit c11_psy_cbse_06_001: focus on the definition of "control processes" and why.',
          misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step.',
          parts: [
                { id: 'a', prompt: 'In Sperling\'s partial report experiment, participants viewed a 3×4 letter grid for 50 ms. In the whole report condition, they recalled ~4.5 letters.', answer: 'Implied capacity = 3.3 letters/row × 3 rows ≈ 9-10 letters (near-complete grid)',
                  options: ['Implied capacity = 3.3 letters/row × 3 rows ≈ 9-10 letters (near-complete grid)', 'capacity is 4.5 letters', 'where memories start', 'Iconic memory is where visual memories are first stored before moving to STM'],
                  hint: 'Revisit c11_psy_cbse_06_001: focus on the definition of "control processes" and why attention.',
                  misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of memorisation*.' }
          ],
            remediations: { 'sensory-memory-is-where-memories': { steps: ['Ask the student: "When you watch a movie, do you \'memorise\' each frame in iconic memory?" (No — it\'s automatic.', 'Show a 50-ms flash of a complex image.', 'Ask: "Can you describe it in detail?" (No — but you *saw* it.) 3.', 'Explain: Sensory memory = perceptual persistence (physics/biology), not cognitive storage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step.',
          parts: [
                { id: 'a', prompt: 'A textbook claims: "Information in sensory memory is lost forever if not attended to within its duration." Critique this statement. Is it entirely accurate?', answer: 'The statement is partially inaccurate',
                  options: ['The statement is partially inaccurate', 'where memories start', 'Iconic memory is where visual memories are first stored before moving to STM', 'sensory memory is "where memories start"'],
                  hint: 'Revisit c11_psy_cbse_06_001: focus on the definition of "control processes" and why attention.',
                  misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of memorisation*.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration (using only a projector and speaker) to show the duration difference between iconic and echoic memory.', answer: '**Iconic demo**: Flash a 4×4 random letter grid for 50 ms',
                  options: ['**Iconic demo**: Flash a 4×4 random letter grid for 50 ms', 'where memories start', 'Iconic memory is where visual memories are first stored before moving to STM', 'sensory memory is "where memories start"'],
                  hint: 'Revisit c11_psy_cbse_06_001: focus on the definition of "control processes" and why attention.',
                  misconception: 'Students believe sensory memory is "where memories start" — i.e., that iconic/echoic memory is the *first step of memorisation*.' }
          ],
            remediations: { 'sensory-memory-is-where-memories': { steps: ['Ask the student: "When you watch a movie, do you \'memorise\' each frame in iconic memory?" (No — it\'s automatic.', 'Show a 50-ms flash of a complex image.', 'Ask: "Can you describe it in detail?" (No — but you *saw* it.) 3.', 'Explain: Sensory memory = perceptual persistence (physics/biology), not cognitive storage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_003', difficulty: 'standard',
          question: 'Short-Term Memory (STM) is a limited-capacity memory store that holds a small.',
          hint: 'Revisit the Stage Model diagram (Figure 6.1 in NCERT) and the definitions of control.',
          misconception: 'Students often believe that **Short-Term Memory and Working Memory are synonymous terms for the same "short-duration.',
          parts: [
                { id: 'a', prompt: 'A student reads a phone number once, closes their eyes, and repeats it aloud continuously for 20 seconds until they dial it. They successfully recall it.', answer: 'The student used maintenance rehearsal (simple repetition)',
                  options: ['The student used maintenance rehearsal (simple repetition)', 'capacity limits', 'interference from other numbers', 'short-duration memory store'],
                  hint: 'Revisit the Stage Model diagram (Figure 6.1 in NCERT) and the definitions of control processes.',
                  misconception: 'Students often believe that **Short-Term Memory and Working Memory are synonymous terms for the same "short-duration memory store."** They.' },
                { id: 'b', prompt: 'Design a simple experiment to demonstrate the existence of the Visuospatial Sketchpad as a separate component from the Phonological Loop in Working Memory.', answer: '**Experiment:** Use a dual-task paradigm',
                  options: ['**Experiment:** Use a dual-task paradigm', 'short-duration memory store'],
                  hint: 'Revisit the Stage Model diagram (Figure 6.1 in NCERT) and the definitions of control processes.',
                  misconception: 'Students often believe that **Short-Term Memory and Working Memory are synonymous terms for the same "short-duration memory store."** They.' }
          ],
            remediations: { 'short-term-memory-and-working': { steps: ['** Explicitly contrast the *definitions*: Write side-by-side: "STM (Atkinson-Shiffrin): Unitary, passive store, 7±2.', '** Use the **Dual-Task Demonstration**: Have the student perform a visuospatial task (trace a star in a mirror) while.', '** Re-analyze the KF case: Draw a flowchart: Sensory Input → [Central Executive] → (Phonological Loop ✗) BUT.', '** Practice chunking with *meaningful* vs. *meaningless* strings (e.g., "RBI CRR SLR" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_004', difficulty: 'standard',
          question: 'Long-term memory (LTM) is a relatively permanent memory system with virtually.',
          hint: 'Revisit **c11_psy_cbse_06_003** (Short-Term Memory and Working Memory), specifically the.',
          misconception: '**Misconception:** "Declarative memory is \'knowing that\' and procedural memory is \'knowing how\'—so if I can explain.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Long-term memory (LTM) is a relatively permanent memory system with virtually unlimited',
                  options: ['Long-term memory (LTM) is a relatively permanent memory system with virtually unlimited', 'The Information Processing Model (Stage Model) conceptualizes human memory as a system', 'Sensory memory is the initial, ultra-brief memory system that holds exact replicas of', 'Short-Term Memory (STM) is a limited-capacity memory store that holds a small amount of'],
                  hint: 'Revisit **c11_psy_cbse_06_003** (Short-Term Memory and Working Memory), specifically the.',
                  misconception: '**Misconception:** "Declarative memory is \'knowing that\' and procedural memory is \'knowing how\'—so if I can explain *how* to do something.' }
          ],
            remediations: { 'misconception-declarative-memory-is-knowing': { steps: ['**Confront the confusion directly:** Ask the student: "Can you explain *exactly* how you maintain balance on.', 'Then say: "Now write down the steps." They can do it.', 'Point out: *The written steps are semantic memory; the balancing is procedural memory.', 'They are different memory traces.* 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_005', difficulty: 'standard',
          question: 'The Levels of Processing Theory (Craik & Lockhart, 1972) proposes that memory.',
          hint: 'Revisit c11_psy_cbse_06_001 (Information Processing Model) and c11_psy_cbse_06_003.',
          misconception: 'Students often believe "deeper processing = more time spent studying".',
          parts: [
                { id: 'a', prompt: 'State the three levels of processing in Craik and Lockhart\'s theory in order from shallowest to deepest.', answer: 'Structural (physical features) → Phonemic (sound) → Semantic (meaning)',
                  options: ['Structural (physical features) → Phonemic (sound) → Semantic (meaning)', 'acoustic', 'phonemic', 'more complex sound analysis'],
                  hint: 'Revisit c11_psy_cbse_06_001 (Information Processing Model) and c11_psy_cbse_06_003 (Working Memory).',
                  misconception: 'Students often believe "deeper processing = more time spent studying".' },
                { id: 'b', prompt: 'Compare the Stage Model\'s view of rehearsal (maintenance vs. elaborative) with the Levels of Processing view.', answer: 'Similarity: Both distinguish shallow (maintenance/structural-phonemic) from deep',
                  options: ['Similarity: Both distinguish shallow (maintenance/structural-phonemic) from deep', 'they are the same theory', 'deeper processing = more time spent studying', '"deeper processing = more time spent studying"'],
                  hint: 'Revisit c11_psy_cbse_06_001 (Information Processing Model) and c11_psy_cbse_06_003 (Working Memory).',
                  misconception: 'Students often believe "deeper processing = more time spent studying".' }
          ],
            remediations: { 'deeper-processing-more-time-spent': { steps: ['Give the student two identical word lists.', 'Ask them to process List A by counting letters (structural) and List B by rating each word\'s pleasantness (semantic).', 'After a 2-minute distractor task, test free recall.', 'Guide them to observe their own recall difference and link it to the *type* of mental operation, not study time.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_006', difficulty: 'standard',
          question: 'Forgetting is the inability to retrieve previously stored information from.',
          hint: 'Revisit c11_psy_cbse_06_001 (Nature of Memory) — specifically the.',
          misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the.',
          parts: [
                { id: 'a', prompt: 'Explain why the "sleep vs. wake" comparison disproves trace decay theory as the *sole* explanation for forgetting, using the logic of "opportunity for trace.', answer: 'Trace decay theory predicts that memory traces fade from *disuse*',
                  options: ['Trace decay theory predicts that memory traces fade from *disuse*', 'sleep group forgets more', 'I\'ll just review once after 1 hour and I\'ll remember it forever'],
                  hint: 'Revisit c11_psy_cbse_06_001 (Nature of Memory) — specifically the encoding/storage/retrieval.',
                  misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the first hour, I\'m safe.".' },
                { id: 'b', prompt: 'Design a 2×2 experimental layout to test **retroactive interference** using nonsense syllables.', answer: 'what Group 1 learns in Phase 1 and Phase 2, (',
                  options: ['what Group 1 learns in Phase 1 and Phase 2, (', 'I\'ll just review once after 1 hour and I\'ll remember it forever'],
                  hint: 'Revisit c11_psy_cbse_06_001 (Nature of Memory) — specifically the encoding/storage/retrieval.',
                  misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the first hour, I\'m safe.".' },
                { id: 'c', prompt: 'A student memorizes 30 Spanish vocabulary words using the keyword method (e.g., *pato* → "pot" → duck in pot).', answer: 'The memory trace is **intact but inaccessible**',
                  options: ['The memory trace is **intact but inaccessible**', 'the memory decayed', 'restores recall instantly)'],
                  hint: 'Revisit c11_psy_cbse_06_001 (Nature of Memory) — specifically the encoding/storage/retrieval.',
                  misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the first hour, I\'m safe.".' }
          ],
            remediations: { 'misconception-ebbinghaus-s-curve-means': { steps: ['**Step-by-step remediation:** 1.', '**Re-plot the curve together**: Give the student blank axes (Time: 0, 20 min, 1 hr, 9 hr, 1 day, 2 days, 6 days.', 'Have them plot Ebbinghaus\'s actual data points — the visual flattening *after* day 1 makes the asymptotic loss.', '**Calculate "forgotten per day"**: Compute daily loss rates: Day 0→1 = 40% loss; Day 1→2 = 5%; Day 2→6 = ~1%/day.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
