import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch06_p2: SimDef = {
    id: 'v3_c11_psy_ch06_p2',
    title: 'Human Memory · Part 2/2',
    subtitle: 'Learn why confident recitation still goes blank on exam day.',
    classLevel: 11, subject: 'psychology', topic: 'Human Memory · Part 2/2',
    chapters: ['c11_psy_ch06'],
    nodeIds: ['c11_psy_cbse_06_007', 'c11_psy_cbse_06_008', 'c11_psy_cbse_06_009', 'c11_psy_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a student upgrading their rehearsal strategy', intro: 'Twenty readings, one blank exam — the loop kept the words alive and never once built them a home.', goal: 'Distinguish maintenance from elaborative rehearsal and place sensory memory correctly.' },
    discovery: {
        question: 'Recite a definition aloud twenty times, feel confident — has it reached long-term memory?',
        options: ['Probably not — maintenance rehearsal just cycles it in short-term memory; without semantic, elaborative processing it decays when repetition stops', 'Yes — repetition always transfers to LTM', 'Yes — twenty reps is plenty', 'No — because reading is not memorising at all'],
        answer: 'Probably not — maintenance rehearsal just cycles it in short-term memory; without semantic, elaborative processing it decays when repetition stops',
        hook: 'Patient KF kept long-term memory while losing short-term — the stage model survived the exception because parallel routes, not broken sequence, explain it.',
    },
    teaching: [
        { title: 'Theories of Forgetting: Interference, Decay and Repression', text: 'Forgetting theories explain why stored information becomes inaccessible: **Trace Decay Theory** proposes memory traces physically fade over time due to disuse; **Interference Theory** states.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Correct the idea that iconic memory is \'step one of memorising,\' then judge whether unattended sensory input is lost forever.',
        labels: ['Theories of Forgetting: Interference,', 'Memory as a Constructive', 'Improving Memory: Mnemonics', 'Eyewitness Memory and Factors'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_007', title: 'Theories of Forgetting: Interference, Decay and Repression',
          caseStudy: { intro: 'Imagine you studied Hindi vocabulary yesterday, then French vocabulary today, and now you cannot recall the Hindi words during your test.',
            decisions: [{ prompt: 'State the core assumption of Trace Decay Theory and name the classic experimental finding that contradicts it.', options: [
                { text: '**Core assumption**: Memory traces are physical changes in the brain that fade', outcome: '**Core assumption**: Memory traces are physical changes in the brain that fade automatically when.' },
                { text: 'sleep reduces interference so decay is proven', outcome: 'Not quite — **Misconception**: "Proactive and retroactive interference are just \'forgetting because of other.', reveals: 'misconception-proactive-and-retroactive-interfer' },
                { text: 'awake group forgot less', outcome: 'Not quite — **Misconception**: "Proactive and retroactive interference are just \'forgetting because of other.', reveals: 'misconception-proactive-and-retroactive-interfer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_008', title: 'Memory as a Constructive Process: Schemas and Reconstruction',
          caseStudy: { intro: 'Imagine you are telling a friend about a movie you saw last month.',
            decisions: [{ prompt: 'Define "schema" in your own words and explain how schemas influence memory at each of the three stages: encoding, storage, and retrieval.', options: [
                { text: 'A schema is a mental framework', outcome: 'A schema is a mental framework — organized knowledge structure — built from prior experiences that.' },
                { text: 'a memory', outcome: 'Not quite — **Misconception**: "Memory works like a video camera — it records events faithfully and replays.', reveals: 'misconception-memory-works-like-a' },
                { text: 'a category', outcome: 'Not quite — **Misconception**: "Memory works like a video camera — it records events faithfully and replays.', reveals: 'misconception-memory-works-like-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_009', title: 'Improving Memory: Mnemonics and Memory Strategies',
          caseStudy: { intro: 'Imagine you have a history test tomorrow with 15 Mughal emperors in chronological order, their reign years, and one major achievement each — pure rote.',
            decisions: [{ prompt: 'Define the Keyword Method and give one original example (not from the textbook) of using it to learn a foreign language vocabulary word.', options: [
                { text: 'The Keyword Method identifies a familiar native-language word (keyword) that sounds', outcome: 'The Keyword Method identifies a familiar native-language word (keyword) that sounds similar to the.' },
                { text: 'just repeating the word many times', outcome: 'Not quite — Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory.', reveals: 'any-mnemonic-e' },
                { text: '*any* mnemonic (e', outcome: 'Not quite — Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory.', reveals: 'any-mnemonic-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_010', title: 'Eyewitness Memory and Factors Affecting Recall',
          caseStudy: { intro: 'Imagine you witness a snatch-theft outside your Delhi Metro station — a person in a red hoodie grabs a phone and runs toward Gate 3.',
            decisions: [{ prompt: 'Define "estimator variables" and "system variables" in eyewitness memory research, giving one Indian-context example of each.', options: [
                { text: 'Estimator variables are uncontrolled event factors affecting encoding (e.g., poor street', outcome: 'Estimator variables are uncontrolled event factors affecting encoding (e.g., poor street lighting.' },
                { text: 'The witness is 100% sure so it must be correct', outcome: 'Not quite — Students believe eyewitness memory works like a video camera — if you "saw it," the memory.', reveals: 'eyewitness-memory-works-like-a' },
                { text: 'distorted memories', outcome: 'Not quite — Students believe eyewitness memory works like a video camera — if you "saw it," the memory.', reveals: 'eyewitness-memory-works-like-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A study-skills workshop hears two confessions: \'I recited the definition twenty times and still blanked in the exam.\' And \'iconic memory is where visual memories are first stored on their way to becoming real memories.\'',
            decisions: [{ prompt: 'What does the memory model explain about both?', options: [
                { text: 'Diagnose via the stage model: rote reciting is maintenance rehearsal — it cycles material in short-term memory but never builds semantic links, so it decays once repetition stops; elaborative rehearsal (linking to meaning) is the bridge to long-term memory. And sensory memory isn\'t storage — iconic and echoic are raw perceptual buffers holding unprocessed input for a second or two so attention can select; encoding hasn\'t happened yet.', outcome: 'Both confusions resolve: memory is a flow system — failure can sit at encoding (no elaboration) or at the buffer stage where nothing was ever \'stored\' in the memorising sense.' },
                { text: 'Tell him twenty repetitions should have worked — repetition is how memory forms.', outcome: 'Repetition without meaning only maintains: without semantic processing the material never enters long-term storage — confidence during rehearsal isn\'t encoding.', reveals: 'repetition-equals-memorisation' },
                { text: 'Accept the buffer-as-storage view — iconic memory is stage one of memorising.', outcome: 'It\'s a perceptual buffer, not a memory store: it holds raw sensory replicas like a camera sensor — attention then selects what gets encoded into STM.', reveals: 'sensory-memory-is-storage' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'Sensory memory is a buffer, not a store — raw pixels, not meaning; the memory starts where attention starts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_007', difficulty: 'standard',
          question: 'Forgetting theories explain why stored information becomes inaccessible.',
          hint: 'If stuck, revisit **c11_psy_cbse_06_006 (Ebbinghaus Curve)** — specifically the *shape*.',
          misconception: '**Misconception**: "Proactive and retroactive interference are just \'forgetting because of other learning\' — the.',
          parts: [
                { id: 'a', prompt: 'State the core assumption of Trace Decay Theory and name the classic experimental finding that contradicts it.', answer: '**Core assumption**: Memory traces are physical changes in the brain that fade',
                  options: ['**Core assumption**: Memory traces are physical changes in the brain that fade', 'sleep reduces interference so decay is proven', 'awake group forgot less'],
                  hint: 'If stuck, revisit **c11_psy_cbse_06_006 (Ebbinghaus Curve)** — specifically the *shape* of the.',
                  misconception: '**Misconception**: "Proactive and retroactive interference are just \'forgetting because of other learning\' — the direction (past→future.' }
          ],
            remediations: { 'misconception-proactive-and-retroactive-interfer': { steps: ['**Step-by-step remediation**: 1.', '**Re-enact Table 6.1 physically**: Use index cards.', 'Label "List A", "List B", "Rest".', 'Student acts as experimenter: assigns "participants" (classmates) to Proactive Exp/Control and Retroactive Exp/Control.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_008', difficulty: 'standard',
          question: 'Memory as a constructive process refers to the understanding that memory is not.',
          hint: 'If the student cannot grasp reconstruction (keeps thinking of memory as playback), return.',
          misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.',
          parts: [
                { id: 'a', prompt: 'Define "schema" in your own words and explain how schemas influence memory at each of the three stages: encoding, storage, and retrieval.', answer: 'A schema is a mental framework',
                  options: ['A schema is a mental framework', 'a memory', 'a category'],
                  hint: 'If the student cannot grasp reconstruction (keeps thinking of memory as playback), return.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' },
                { id: 'b', prompt: 'Distinguish between "reproductive memory" and "reconstructive memory." Why is the reproductive model (memory as faithful playback) empirically inadequate?', answer: '**Reproductive memory**: the mind records events like a camera and replays them',
                  options: ['**Reproductive memory**: the mind records events like a camera and replays them', 'reproductive memory is wrong'],
                  hint: 'If the student cannot grasp reconstruction (keeps thinking of memory as playback), return.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' },
                { id: 'c', prompt: 'Explain how the reconstructive nature of memory undermines the reliability of eyewitness testimony.', answer: 'The reconstructive nature of memory undermines eyewitness reliability',
                  options: ['The reconstructive nature of memory undermines eyewitness reliability', 'eyewitnesses are unreliable'],
                  hint: 'If the student cannot grasp reconstruction (keeps thinking of memory as playback), return.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' }
          ],
            remediations: { 'misconception-memory-works-like-a': { steps: ['**Step-by-step remediation**: 1.', '**Re-enact Bartlett\'s study in miniature**: Tell the student a short, culturally unfamiliar story (e.g., a folk tale.', 'After 10 minutes, ask them to recall it.', 'After 24 hours, ask again.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_009', difficulty: 'standard',
          question: 'Mnemonics are systematic memory enhancement strategies that impose meaningful.',
          hint: 'Revisit Craik & Lockhart\'s Levels of Processing (c11_psy_cbse_06_005) — specifically the.',
          misconception: 'Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory for *any* material.',
          parts: [
                { id: 'a', prompt: 'A student uses the First-Letter Technique to memorise the seven steps of the PQRST method itself (P-Q-R-S-T).', answer: 'The First-Letter Technique only encodes the *initial letters* at a shallow',
                  options: ['The First-Letter Technique only encodes the *initial letters* at a shallow', 'it\'s fine because it helps recall the order', '*any* mnemonic (e'],
                  hint: 'Revisit Craik & Lockhart\'s Levels of Processing (c11_psy_cbse_06_005) — specifically the three.',
                  misconception: 'Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory for *any* material.' },
                { id: 'b', prompt: 'You need to memorise the following 12-item grocery list *in exact order*: milk, bread, apples, soap, rice, eggs, tomatoes, toothpaste, chicken, onions, butter.', answer: '5 distinct loci in sequence, (',
                  options: ['5 distinct loci in sequence, (', '*any* mnemonic (e'],
                  hint: 'Revisit Craik & Lockhart\'s Levels of Processing (c11_psy_cbse_06_005) — specifically the three.',
                  misconception: 'Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory for *any* material.' }
          ],
            remediations: { 'any-mnemonic-e': { steps: ['**Identify the mismatch**: Ask the student: "What *exactly* does the exam require — reciting labels in order,.', '**Demonstrate the gap**: Have them use their acronym to *write a full explanation* of one stage.', 'They will stall at the mechanism.', '**Replace with appropriate strategy**: For *explanatory* content, switch to **PQRST** (for textbook chapters).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory for *any* material.',
          parts: [
                { id: 'a', prompt: 'Critique the claim: "If a student uses deep processing (semantic encoding) while studying, they do not need any mnemonic techniques." Use evidence from the.', answer: 'The claim is *false*',
                  options: ['The claim is *false*', '*any* mnemonic (e'],
                  hint: 'Revisit Craik & Lockhart\'s Levels of Processing (c11_psy_cbse_06_005) — specifically the three.',
                  misconception: 'Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory for *any* material.' },
                { id: 'b', prompt: 'Create a novel, integrated study plan for a Class 11 student preparing for a Biology exam covering: (a) 10 stages of mitosis in order, (b) 15 definitions.', answer: '10 stages of mitosis in order, (',
                  options: ['10 stages of mitosis in order, (', '*any* mnemonic (e'],
                  hint: 'Revisit Craik & Lockhart\'s Levels of Processing (c11_psy_cbse_06_005) — specifically the three.',
                  misconception: 'Students believe that *any* mnemonic (e.g., a first-letter acronym) automatically improves memory for *any* material.' }
          ],
            remediations: { 'any-mnemonic-e': { steps: ['**Identify the mismatch**: Ask the student: "What *exactly* does the exam require — reciting labels in order,.', '**Demonstrate the gap**: Have them use their acronym to *write a full explanation* of one stage.', 'They will stall at the mechanism.', '**Replace with appropriate strategy**: For *explanatory* content, switch to **PQRST** (for textbook chapters).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_010', difficulty: 'standard',
          question: 'Eyewitness memory refers to the reconstructive process by which individuals.',
          hint: 'Revisit c11_psy_cbse_06_008 "Memory as a Constructive Process: Schemas and.',
          misconception: 'Students believe eyewitness memory works like a video camera — if you "saw it," the memory is stored intact and.',
          parts: [
                { id: 'a', prompt: 'A witness views a 30-second robbery at 9 PM under a flickering sodium-vapor lamp (estimator: poor lighting).', answer: 'Step 1: Poor lighting during encoding creates weak, fragmentary memory trace',
                  options: ['Step 1: Poor lighting during encoding creates weak, fragmentary memory trace', 'police think it\'s this person', 'The witness is 100% sure so it must be correct', 'it\'s this person'],
                  hint: 'Revisit c11_psy_cbse_06_008 "Memory as a Constructive Process: Schemas and Reconstruction".',
                  misconception: 'Students believe eyewitness memory works like a video camera — if you "saw it," the memory is stored intact and retrieval simply plays.' }
          ],
            remediations: { 'eyewitness-memory-works-like-a': { steps: ['Have student watch the 8-minute "Loftus Lost in the Mall" demonstration video showing false memory implantation.', 'Give them a 2-minute crime video, then ask 5 leading vs. 5 neutral questions — compare their errors.', 'Map each error to estimator/system variable using a 2x2 grid.', 'Require them to rewrite their Diagnostic Question 5 critique incorporating the confidence-malleability hypothesis with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
