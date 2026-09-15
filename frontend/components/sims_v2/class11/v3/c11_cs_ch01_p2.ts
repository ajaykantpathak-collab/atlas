import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch01_p2: SimDef = {
    id: 'v3_c11_cs_ch01_p2',
    title: 'Computer System and Organisation · Part 2/3',
    subtitle: 'Draw the line between calculators and computers, and between memory and storage.',
    classLevel: 11, subject: 'computer_science', topic: 'Computer System and Organisation · Part 2/3',
    chapters: ['c11_cs_ch01'],
    nodeIds: ['c11_cs_cbse_01_007', 'c11_cs_cbse_01_008', 'c11_cs_cbse_01_009', 'c11_cs_cbse_01_010', 'c11_cs_cbse_01_011', 'c11_cs_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a systems archivist sorting devices and data formats', intro: 'A museum labels every calculating gadget a \'computer.\' Your job is to correct the record.', goal: 'Identify the components of a computer system and classify data and software correctly.' },
    discovery: {
        question: 'An abacus, Pascal\'s Pascaline and Babbage\'s Analytical Engine all perform calculations. Only one is a true ancestor of the computer — which, and what\'s the dividing line?',
        options: ['The Analytical Engine — it was programmable via punched cards, with input, store, mill and output', 'The abacus — it is the oldest, so everything descends from it', 'The Pascaline — gears make it a real machine, unlike the others', 'All three — calculation alone makes a device a computer'],
        answer: 'The Analytical Engine — it was programmable via punched cards, with input, store, mill and output',
        hook: 'Calculating isn\'t computing — the line is programmability: stored instructions driving automatic execution.',
    },
    teaching: [
        { title: 'Secondary Storage Devices: HDD, SSD, CD, DVD, Pen Drive', text: 'Secondary storage devices are non-volatile, high-capacity auxiliary memory units used to permanently store data, programs, and operating system files for future use; they cannot be accessed directly.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a school\'s attendance data into structured, unstructured and semi-structured, then separate the hardware from the software that boots a laptop.',
        labels: ['Secondary Storage Devices: HDD,', 'System Software and Application', 'Operating System: Functions', 'Bootstrapping: Cold Boot', 'Number Systems: Binary, Octal,', 'Conversion Between Number Systems'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_007', title: 'Secondary Storage Devices: HDD, SSD, CD, DVD, Pen Drive',
          caseStudy: { intro: 'Imagine you have a 2 GB video project file on your laptop. You need to submit it to your teacher tomorrow, but your laptop’s internal storage is full.',
            decisions: [{ prompt: 'Name the five secondary storage devices covered in the Class 11 NCERT textbook and state whether each uses magnetic, optical,.', options: [
                { text: 'The five devices are: HDD (magnetic), SSD (solid-state), CD (optical), DVD (optical), Pen', outcome: 'The five devices are: HDD (magnetic), SSD (solid-state), CD (optical), DVD (optical), Pen Drive.' },
                { text: 'cloud storage', outcome: 'Not quite — Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for.', reveals: 'ssd-is-just-a-faster' },
                { text: 'SSD is just a faster pen drive', outcome: 'Not quite — Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for.', reveals: 'ssd-is-just-a-faster' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_008', title: 'System Software and Application Software',
          caseStudy: { intro: 'Imagine you just bought a new smartphone — it has a powerful processor, memory, camera, and screen (hardware), but when you press the power button, nothing.',
            decisions: [{ prompt: 'What is the fundamental difference between system software and application software in terms of their interaction with computer hardware?', options: [
                { text: 'System software interacts directly with hardware to manage resources (CPU, memory, I/O', outcome: 'System software interacts directly with hardware to manage resources (CPU, memory, I/O devices).' },
                { text: 'application software also manages hardware', outcome: 'Not quite — Students often believe that any software that "manages" something (like a file manager app or.', reveals: 'any-software-that-manages-something' },
                { text: 'manages', outcome: 'Not quite — Students often believe that any software that "manages" something (like a file manager app or.', reveals: 'any-software-that-manages-something' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_009', title: 'Operating System: Functions and Types',
          caseStudy: { intro: 'Imagine you\'re in a busy railway station where hundreds of passengers (processes) need to use limited platforms (CPU cores), waiting halls (RAM), and ticket.',
            decisions: [{ prompt: 'What are the two primary objectives of an operating system as stated in the NCERT textbook?', options: [
                { text: 'The two primary objectives are: (1) to provide services for building and running', outcome: 'The two primary objectives are: (1) to provide services for building and running application.' },
                { text: 'to make the computer fast', outcome: 'Not quite — Students believe the operating system "is" the graphical interface they see (desktop, icons, start.', reveals: 'the-operating-system-is-the' },
                { text: 'to store files', outcome: 'Not quite — Students believe the operating system "is" the graphical interface they see (desktop, icons, start.', reveals: 'the-operating-system-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_010', title: 'Bootstrapping: Cold Boot and Warm Boot',
          caseStudy: { intro: 'Imagine pressing the power button on a laptop that has been shut down for hours versus selecting "Restart" from the Start menu.',
            decisions: [{ prompt: 'What is the first program that executes when a computer is powered on, and where is it stored?', options: [
                { text: 'The first program is the firmware (BIOS or UEFI), stored in a non-volatile ROM chip on', outcome: 'The first program is the firmware (BIOS or UEFI), stored in a non-volatile ROM chip on the.' },
                { text: 'Windows loader', outcome: 'Not quite — Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are.', reveals: 'restart-warm-boot-and-shut' },
                { text: 'kernel', outcome: 'Not quite — Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are.', reveals: 'restart-warm-boot-and-shut' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_011', title: 'Number Systems: Binary, Octal, Hexadecimal',
          scaffold: { problem: 'Identify whether each of the following is a valid number in the indicated system. If invalid, state the specific rule violated.',
            steps: [
            { text: 'Recall the valid digit set for each base: binary={0,1}, octal={0,1,2,3,4,5,6,7}, hexadecimal={0-9,A-F}' },
            { text: 'Examine each digit of (a) 101101₂ — all digits are 0 or 1 → VALID binary' },
            { text: 'Examine each digit of (b) 7654₈ — digits 7,6,5,4 all in {0-7} → VALID octal' },
            { text: 'Examine each digit of (c) 2F9A₁₆ — 2,9 in {0-9}, F=15, A=10 in {A-F} → VALID hexadecimal' },
            { text: 'Examine (d) 128₈ — digit 8 appears, but octal max digit is 7 → INVALID (digit 8 not allowed in base-8)' },
            { text: 'Examine (e) 1G4₁₆ — digit G appears, but hexadecimal max letter is F (15) → INVALID (G not a hex digit)', faded: true, blankAnswer: '(a) Valid, (b) Valid, (c) Valid, (d) Invalid (digit 8 ≥.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school computer lab is upgrading. The budget sheet from a vendor lists: \'Intel i5 CPU, 16 GB memory, 512 GB memory, monitor, keyboard, mouse.\' A junior intern asks why \'memory\' appears twice with different numbers, and whether the monitor is \'part of the computer or just an accessory\'.',
            decisions: [{ prompt: 'Explain the listing correctly.', options: [
                { text: 'The two \'memory\' lines are different things: 16 GB is RAM — volatile primary memory the CPU works in directly, wiped at power-off; 512 GB is secondary storage (SSD) — non-volatile, keeps files permanently but isn\'t accessed directly by the CPU. And the monitor is an output device: the computer system = hardware (CPU, memory, I/O, storage) + software, not just the CPU box.', outcome: 'Every computer system = four hardware blocks (CPU, memory, input, output) plus software; \'memory\' in ads conflates RAM with storage.' },
                { text: 'It\'s a typo — memory is memory; 16 GB and 512 GB are the same thing listed twice.', outcome: 'RAM and storage serve different roles: one is the CPU\'s volatile workbench, the other the permanent filing cabinet — speed, volatility and CPU access all differ.', reveals: 'memory-equals-storage' },
                { text: 'The monitor and keyboard ARE the computer — the box inside just does processing.', outcome: 'That inverts it: input/output devices are peripherals serving the CPU; the computer is the whole input→process→output system, not any single component.', reveals: 'peripherals-are-the-computer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'A computer isn\'t a clever calculator — it\'s a machine that runs stored instructions on whatever data you feed it.',
            decisions: [{ prompt: 'What comes next? Computer System and Organisation · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Computer System and Organisation · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_007', difficulty: 'standard',
          question: 'Secondary storage devices are non-volatile, high-capacity auxiliary memory.',
          hint: 'Revisit c11_cs_cbse_01_006 (Memory Units: Primary Memory) and the “Think and Reflect”.',
          misconception: 'Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for all purposes.',
          parts: [
                { id: 'a', prompt: 'A student wants to install the operating system on a laptop that currently has only a 1 TB HDD. They have the option to replace it with a 512 GB SSD.', answer: 'Advantages: (1) Much faster boot and application load times due to no mechanical',
                  options: ['Advantages: (1) Much faster boot and application load times due to no mechanical', 'SSD is faster', 'SSD is just a faster pen drive'],
                  hint: 'Revisit c11_cs_cbse_01_006 (Memory Units: Primary Memory) and the “Think and Reflect” box: “Suppose.',
                  misconception: 'Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for all purposes.' },
                { id: 'b', prompt: 'Compare CD-R and DVD-R in terms of (a) storage capacity, (b) laser wavelength used, and (c) typical use case today.', answer: 'storage capacity, (',
                  options: ['storage capacity, (', 'SSD is just a faster pen drive', 'states CD-R holds 4'],
                  hint: 'Revisit c11_cs_cbse_01_006 (Memory Units: Primary Memory) and the “Think and Reflect” box: “Suppose.',
                  misconception: 'Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for all purposes.' }
          ],
            remediations: { 'ssd-is-just-a-faster': { steps: ['Show the student a side-by-side spec sheet of a typical 256 GB SSD (e.g., sequential R/W 500/450 MB/s, 4K random R/W.', 'Ask them to calculate how many 4 KB random writes per day a pen drive could sustain for 3 years if it had the same.', 'Have them read the NCERT line: “these days, there are secondary storage devices like SSD which support very fast data.', 'Also, data transfer between computers have become easier and simple due to the availability of small-sized and portable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for all purposes.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “For long-term archival of family photos (10+ years), a pen drive is better than an external HDD because it has no moving parts.”.', answer: 'Judgment: The statement is generally FALSE for 10+ year archival',
                  options: ['Judgment: The statement is generally FALSE for 10+ year archival', 'no moving parts', 'long-term reliability', 'SSD is just a faster pen drive'],
                  hint: 'Revisit c11_cs_cbse_01_006 (Memory Units: Primary Memory) and the “Think and Reflect” box: “Suppose.',
                  misconception: 'Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for all purposes.' },
                { id: 'b', prompt: 'Design a backup strategy for a school computer lab with 30 PCs, each having 256 GB SSD.', answer: 'primary backup medium, (',
                  options: ['primary backup medium, (', 'SSD is just a faster pen drive'],
                  hint: 'Revisit c11_cs_cbse_01_006 (Memory Units: Primary Memory) and the “Think and Reflect” box: “Suppose.',
                  misconception: 'Students often believe that “SSD is just a faster pen drive” and that both are interchangeable for all purposes.' }
          ],
            remediations: { 'ssd-is-just-a-faster': { steps: ['Show the student a side-by-side spec sheet of a typical 256 GB SSD (e.g., sequential R/W 500/450 MB/s, 4K random R/W.', 'Ask them to calculate how many 4 KB random writes per day a pen drive could sustain for 3 years if it had the same.', 'Have them read the NCERT line: “these days, there are secondary storage devices like SSD which support very fast data.', 'Also, data transfer between computers have become easier and simple due to the availability of small-sized and portable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_008', difficulty: 'standard',
          question: 'System software is a collection of programs that directly manages and controls.',
          hint: 'Revisit c11_cs_cbse_01_002 — focus on the "Hardware and Software" section and the.',
          misconception: 'Students often believe that any software that "manages" something (like a file manager app or a database tool).',
          parts: [
                { id: 'a', prompt: 'A student says: "Microsoft Word is system software because it comes pre-installed on many computers." Explain why this statement is incorrect using the.', answer: 'Pre-installation doesn\'t determine software category',
                  options: ['Pre-installation doesn\'t determine software category', 'Word manages files so it\'s system software', 'manages', 'manages resources'],
                  hint: 'Revisit c11_cs_cbse_01_002 — focus on the "Hardware and Software" section and the statement.',
                  misconception: 'Students often believe that any software that "manages" something (like a file manager app or a database tool) is system software because.' },
                { id: 'b', prompt: 'Classify each of the following as system software, programming tool, or application software, and justify each in one sentence: (a) Python IDLE, (b) Ubuntu.', answer: 'Python IDLE, (',
                  options: ['Python IDLE, (', 'manages', 'manages resources'],
                  hint: 'Revisit c11_cs_cbse_01_002 — focus on the "Hardware and Software" section and the statement.',
                  misconception: 'Students often believe that any software that "manages" something (like a file manager app or a database tool) is system software because.' },
                { id: 'c', prompt: 'Compare and contrast a compiler and an interpreter in terms of translation process, execution speed, and error detection.', answer: 'Compiler translates entire source code to machine code before execution',
                  options: ['Compiler translates entire source code to machine code before execution', 'interpreter is better', 'manages', 'manages resources'],
                  hint: 'Revisit c11_cs_cbse_01_002 — focus on the "Hardware and Software" section and the statement.',
                  misconception: 'Students often believe that any software that "manages" something (like a file manager app or a database tool) is system software because.' }
          ],
            remediations: { 'any-software-that-manages-something': { steps: ['Ask the student to list what the OS does that no app can do (e.g., schedule processes, allocate physical memory frames.', 'Show a diagram: Hardware ←→ OS (system software) ←→ App (application software).', 'Give two examples — "Disk Defragmenter" (system utility, manages disk layout at block level) vs "Google Drive Sync".', 'Have the student re-classify 5 software items using the rule: "Does it run in kernel mode / directly control hardware?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_009', difficulty: 'standard',
          question: 'An operating system (OS) is a system software that acts as a resource manager.',
          hint: 'Revisit c11_cs_cbse_01_002 (hardware components) and c11_cs_cbse_01_008 (system.',
          misconception: 'Students believe the operating system "is" the graphical interface they see (desktop, icons, start menu), and that.',
          parts: [
                { id: 'a', prompt: 'What are the two primary objectives of an operating system as stated in the NCERT textbook?', answer: 'The two primary objectives are: (1) to provide services for building and running',
                  options: ['The two primary objectives are: (1) to provide services for building and running', 'to make the computer fast', 'to store files'],
                  hint: 'Revisit c11_cs_cbse_01_002 (hardware components) and c11_cs_cbse_01_008 (system vs application.',
                  misconception: 'Students believe the operating system "is" the graphical interface they see (desktop, icons, start menu), and that without a GUI there.' }
          ],
            remediations: { 'the-operating-system-is-the': { steps: ['Show the student a headless Linux server (e.g., Raspberry Pi via SSH) — no monitor, no GUI — and demonstrate running.', 'Ask: "What is managing the CPU right now if there\'s no desktop?" Guide them to identify the kernel.', 'Draw a layered diagram: Hardware → Kernel (process, memory, file, device managers) → Shell (CLI/GUI) → Applications.', 'Emphasise the kernel runs regardless of shell.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_010', difficulty: 'standard',
          question: 'Bootstrapping is the self-initiated process where a computer loads the.',
          hint: 'Revisit the memory units node (c11_cs_cbse_01_006) to clarify RAM vs ROM, and the CPU.',
          misconception: 'Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are identical because both.',
          parts: [
                { id: 'a', prompt: 'A user reports that after a sudden power loss, their computer takes longer to start and shows a "Press F1 to continue" message.', answer: 'This is a cold boot triggered by power loss',
                  options: ['This is a cold boot triggered by power loss', 'OS corruption', 'Restart', 'Shut down → Power on'],
                  hint: 'Revisit the memory units node (c11_cs_cbse_01_006) to clarify RAM vs ROM, and the CPU node.',
                  misconception: 'Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are identical because both reload the OS.' }
          ],
            remediations: { 'restart-warm-boot-and-shut': { steps: ['Ask the student to physically observe a cold boot (from power-off) and a warm boot (Restart) on the same machine.', 'Then have them list the steps that appeared in cold boot but not in warm boot.', 'Finally, connect each missing step to the firmware\'s decision to skip hardware re-initialization when a warm boot flag.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_011', difficulty: 'standard',
          question: 'A number system is a mathematical notation for representing numbers using.',
          hint: 'Review "Exponential Notation: Base and Exponent" (c8_math_ch2_3) and "Place Value System.',
          misconception: 'Students often believe that hexadecimal digits A-F are variables or algebraic symbols (like in algebra where A×B means.',
          parts: [
                { id: 'a', prompt: 'Compare the positional weight of the leftmost digit in a 4-digit number across binary, octal, and hexadecimal systems.', answer: 'For a 4-digit number, leftmost position index is 3 (from right, starting at 0)',
                  options: ['For a 4-digit number, leftmost position index is 3 (from right, starting at 0)', 'binary gives largest weight'],
                  hint: 'Review "Exponential Notation: Base and Exponent" (c8_math_ch2_3) and "Place Value System: Power.',
                  misconception: 'Students often believe that hexadecimal digits A-F are variables or algebraic symbols (like in algebra where A×B means multiplication), not.' }
          ],
            remediations: { 'hexadecimal-digits-a-f-are': { steps: ['Write the hexadecimal digit table on board: A=10, B=11, C=12, D=13, E=14, F=15.', 'Have student expand "A3₁₆" using positional notation: A×16¹ + 3×16⁰ = 10×16 + 3×1 = 163₁₀.', 'Contrast with algebraic expression "A×3" where A is unknown.', 'Practice: "Convert 2F₁₆ to decimal" — student must say "2×16 + 15 = 47", not "2×F".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_012', difficulty: 'standard',
          question: 'Conversion between number systems is the process of representing the same.',
          hint: 'Revisit c8_math_ch2_3 (exponential notation) and c8_math_ch2_4 (powers of 2).',
          misconception: 'Students consistently **reverse the remainder reading direction** in division-method conversions (reading first.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conversion between number systems is the process of representing the same numerical value',
                  options: ['Conversion between number systems is the process of representing the same numerical value', 'A computer is an electronic device that accepts data (input), processes it according to a', 'A computer system is an integrated combination of physical components (hardware: CPU,', 'An input device is a hardware component that captures data or instructions from the'],
                  hint: 'Revisit c8_math_ch2_3 (exponential notation) and c8_math_ch2_4 (powers of 2) — specifically.',
                  misconception: 'Students consistently **reverse the remainder reading direction** in division-method conversions (reading first remainder as MSB instead.' }
          ],
            remediations: { 'students-consistently-reverse-the-remainder': { steps: ['**Anchor the direction physically**: Have student write "LSB ← ← ← MSB" above every conversion workspace.', '**Drill the "bottom-up" rule**: For division method, draw an upward arrow (↑) beside the remainder column labeled "READ.', '**Drill the "right-group" rule**: For grouping, draw a rightward bracket } under the binary number labeled "GROUP FROM.', '**Use colour coding**: Red for LSB/rightmost, Blue for MSB/leftmost.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
