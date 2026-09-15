import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch01_p1: SimDef = {
    id: 'v3_c11_ip_ch01_p1',
    title: 'Computer System and Organisation · Part 1/2',
    subtitle: 'Prove a phone is a computer — and that the CPU isn\'t one.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Computer System and Organisation · Part 1/2',
    chapters: ['c11_ip_ch01'],
    nodeIds: ['c11_ip_cbse_01_001', 'c11_ip_cbse_01_002', 'c11_ip_cbse_01_003', 'c11_ip_cbse_01_004', 'c11_ip_cbse_01_005', 'c11_ip_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a buyer decoding a spec sheet honestly', intro: 'i5, 16GB, SSD, Windows, Office — which lines are hardware you can touch and which are code that makes the touchable parts work?', goal: 'Define a computer system and separate hardware, system software and application software.' },
    discovery: {
        question: '\'A smartphone isn\'t a computer system — no separate CPU, keyboard or monitor.\' True?',
        options: ['False — the SoC carries CPU and memory, the touchscreen is input and output, and an OS runs the apps; the shape differs, the architecture doesn\'t', 'True — computers need a cabinet and keyboard', 'True — phones only run apps, not programs', 'False — but only because phones have cameras'],
        answer: 'False — the SoC carries CPU and memory, the touchscreen is input and output, and an OS runs the apps; the shape differs, the architecture doesn\'t',
        hook: 'And the CPU isn\'t the computer either — it\'s one organ in a system of input, process, storage and output, like a scanner beeping a library book in.',
    },
    teaching: [
        { title: 'Introduction to Computers: Definition and Characteristics', text: 'A computer is a programmable electronic device that accepts data (input), processes it according to a set of instructions (program), and produces meaningful information (output); a computer system.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map a barcode-scanner book issue onto input-process-output, then choose between a fast-CPU/8GB and slow-CPU/32GB laptop for a 20GB dataset.',
        labels: ['Introduction to Computers: Definition', 'Components of a Computer', 'Input Devices: Keyboard, Mouse,', 'Output Devices: Monitor, Printer,', 'Central Processing Unit (CPU)', 'Primary Memory: RAM'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_001', title: 'Introduction to Computers: Definition and Characteristics',
          caseStudy: { intro: 'Imagine you order a meal using a food-delivery app on your smartphone: you tap the screen to select dishes (input), the app sends your order to the.',
            decisions: [{ prompt: 'A student writes: "A computer is a machine that thinks like a human." Why is this statement scientifically incorrect for Class 11.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect because a computer does not "think" — it executes pre-written.' },
                { text: 'CPU = computer', outcome: 'Not quite — Students often believe "CPU = computer" and use the terms interchangeably, writing answers like.', reveals: 'cpu-computer-and-use-the' },
                { text: 'The CPU has a monitor and keyboard attached', outcome: 'Not quite — Students often believe "CPU = computer" and use the terms interchangeably, writing answers like.', reveals: 'cpu-computer-and-use-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_01_002', title: 'Components of a Computer System: Hardware and Software',
          scaffold: { problem: 'A student\'s laptop has 16 GB of RAM and a 1 TB SSD. The school\'s computer lab specification requires at least 8 GB RAM and 512 GB storage.',
            steps: [
            { text: 'Identify given values: Laptop RAM = 16 GB, Laptop SSD = 1 TB. Requirement: RAM ≥ 8 GB, Storage ≥ 512 GB.' },
            { text: 'Note that RAM is already in GB (16 GB). Convert SSD from TB to GB using the conversion formula: 1 TB = 1024 GB.' },
            { text: 'Calculate SSD in GB: 1 TB × 1024 GB/TB = 1024 GB.' },
            { text: 'Compare: Laptop RAM (16 GB) ≥ Required RAM (8 GB) → PASS. Laptop Storage (1024 GB) ≥ Required Storage (512 GB) → PASS.' },
            { text: 'Conclude that the laptop meets and exceeds both requirements.', faded: true, blankAnswer: 'Laptop RAM = 16 GB (≥ 8 GB), Laptop Storage = 1024 GB (≥.' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_003', title: 'Input Devices: Keyboard, Mouse, Scanner, Mic and Webcam',
          caseStudy: { intro: 'Imagine you are attending an online class on your laptop: you type a question in the chat (keyboard), click "raise hand" (mouse), show your handwritten notes.',
            decisions: [{ prompt: 'List any three input devices mentioned in the NCERT textbook for Class 11 Informatics Practices and state the primary type of data each.', options: [
                { text: 'Correct answer: Keyboard (text), Mouse (positional/movement), Scanner (images/documents)', outcome: 'Correct answer: Keyboard (text), Mouse (positional/movement), Scanner (images/documents).' },
                { text: 'Printer, Monitor, Speaker', outcome: 'Not quite — Students frequently believe that "input device" only means keyboard and mouse because those are the.', reveals: 'students-frequently-believe-that-input' },
                { text: 'Keyboard, Mouse, CPU', outcome: 'Not quite — Students frequently believe that "input device" only means keyboard and mouse because those are the.', reveals: 'students-frequently-believe-that-input' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_004', title: 'Output Devices: Monitor, Printer, Speaker and Projector',
          caseStudy: { intro: 'Imagine you have just written a Python program that generates a beautiful fractal pattern and plays a victory sound.',
            decisions: [{ prompt: 'List the four main categories of output devices discussed in this chapter and give one example for each.', options: [
                { text: 'Correct answer: Visual display (monitor, projector), Audio output (speaker, headphone),', outcome: 'Correct answer: Visual display (monitor, projector), Audio output (speaker, headphone), Hardcopy.' },
                { text: 'printer', outcome: 'Not quite — Students often think "printer" only means a 2D paper printer and forget that 3D printers are also.', reveals: 'printer-only-means-a-2d' },
                { text: 'omits one category or includes input devices (e', outcome: 'Not quite — Students often think "printer" only means a 2D paper printer and forget that 3D printers are also.', reveals: 'printer-only-means-a-2d' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_005', title: 'Central Processing Unit (CPU): ALU, CU and Registers',
          caseStudy: { intro: 'Imagine you type "2+3" in a calculator app and press Enter. The computer must fetch that instruction, decode what "addition" means, calculate the result, and.',
            decisions: [{ prompt: 'What are the three main components of the CPU and what is the primary function of each?', options: [
                { text: 'The three components are: (1) ALU', outcome: 'The three components are: (1) ALU — performs arithmetic (add, subtract) and logical (AND, OR, NOT).' },
                { text: 'ALU controls the monitor', outcome: 'Not quite — Students often believe the Control Unit *executes* instructions because its name suggests "control".', reveals: 'the-control-unit-executes-instructions' },
                { text: 'Registers are part of RAM', outcome: 'Not quite — Students often believe the Control Unit *executes* instructions because its name suggests "control".', reveals: 'the-control-unit-executes-instructions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_006', title: 'Primary Memory: RAM and ROM and their Types',
          caseStudy: { intro: 'Imagine you turn on your laptop: the screen lights up, the OS loads, and you open a browser. What happens in those seconds?',
            decisions: [{ prompt: 'What is the fundamental difference between RAM and ROM in terms of data retention when power is removed?', options: [
                { text: 'RAM is volatile: it loses all stored data when power is turned off', outcome: 'RAM is volatile: it loses all stored data when power is turned off.' },
                { text: 'both lose data', outcome: 'Not quite — Students often think "RAM is for running programs, ROM is for storing files" — conflating ROM with.', reveals: 'ram-is-for-running-programs' },
                { text: 'ROM is faster', outcome: 'Not quite — Students often think "RAM is for running programs, ROM is for storing files" — conflating ROM with.', reveals: 'ram-is-for-running-programs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping a junior buy a laptop for Class 11 projects, you hear the shopkeeper say \'this CPU comes with 16 GB RAM and Windows\' — and the junior asks: \'Isn\'t the CPU the whole computer? And Windows is an app since I click it, right?\'',
            decisions: [{ prompt: 'How do you sort the parts correctly?', options: [
                { text: 'Draw the system boundaries: the CPU is one component — the computer system is CPU + memory + input/output + storage running software. On the spec sheet, touchable items (processor, RAM, SSD, screen, keyboard) are hardware; code (Windows, Office) is software — and Windows is SYSTEM software managing hardware for other programs, not an application, even though you click its icons.', outcome: 'He stops conflating the part with the whole: a computer system is hardware orchestrated by software through the input-process-output cycle.' },
                { text: 'Let \'CPU = computer\' pass — it\'s the box everything connects to, close enough.', outcome: 'That collapses five system blocks into one: asked for \'components of a computer system\', you\'d list ALU and registers instead of the actual architecture.', reveals: 'cpu-equals-computer' },
                { text: 'Classify Windows as application software — the user interacts with it directly like Office.', outcome: 'Interactivity isn\'t the test: the OS manages hardware and serves other software — without that layer, apps can\'t reach the machine at all.', reveals: 'os-is-application-software' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'A fast brain with a tiny desk loses to a slower brain with a big one — RAM is where the data must sit while the CPU works.',
            decisions: [{ prompt: 'What comes next? Computer System and Organisation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Computer System and Organisation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_001', difficulty: 'standard',
          question: 'A computer is a programmable electronic device that accepts data (input).',
          hint: 'If stuck, revisit Class 8 Maths Chapter 2 (Exponents and Powers) — specifically the nodes.',
          misconception: 'Students often believe "CPU = computer" and use the terms interchangeably, writing answers like "The CPU has a monitor.',
          parts: [
                { id: 'a', prompt: 'A student writes: "A computer is a machine that thinks like a human." Why is this statement scientifically incorrect for Class 11 Informatics Practices?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'CPU = computer', 'The CPU has a monitor and keyboard attached'],
                  hint: 'If stuck, revisit Class 8 Maths Chapter 2 (Exponents and Powers) — specifically the nodes.',
                  misconception: 'Students often believe "CPU = computer" and use the terms interchangeably, writing answers like "The CPU has a monitor and keyboard.' },
                { id: 'b', prompt: 'Riya says, "My smartphone is a computer, but my digital wristwatch is not because the watch cannot install apps." Using the IPO cycle and the definition of.', answer: 'Riya\'s claim is incorrect',
                  options: ['Riya\'s claim is incorrect', 'computer', 'CPU = computer', 'The CPU has a monitor and keyboard attached'],
                  hint: 'If stuck, revisit Class 8 Maths Chapter 2 (Exponents and Powers) — specifically the nodes.',
                  misconception: 'Students often believe "CPU = computer" and use the terms interchangeably, writing answers like "The CPU has a monitor and keyboard.' },
                { id: 'c', prompt: 'A school library uses a barcode scanner to issue books. The scanner beeps, the screen shows the book title, and the database updates the student\'s record.', answer: 'Input: barcode scanner (captures book ID)',
                  options: ['Input: barcode scanner (captures book ID)', 'output', 'CPU = computer', 'The CPU has a monitor and keyboard attached'],
                  hint: 'If stuck, revisit Class 8 Maths Chapter 2 (Exponents and Powers) — specifically the nodes.',
                  misconception: 'Students often believe "CPU = computer" and use the terms interchangeably, writing answers like "The CPU has a monitor and keyboard.' }
          ],
            remediations: { 'cpu-computer-and-use-the': { steps: ['Draw the block diagram from NCERT Figure 1.1 on paper — label each box (Input Device, CPU, Primary Memory, Output.', 'Point to the CPU box and say: "This is *one* component; the *whole diagram* is the computer system."', 'Give the student three devices (mouse, pendrive, speaker) and ask them to place each on the correct box of their.', 'Have them write one sentence defining "computer system" using the phrase "integration of hardware and software" — this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "CPU = computer" and use the terms interchangeably, writing answers like "The CPU has a monitor.',
          parts: [
                { id: 'a', prompt: 'A startup must choose between two laptops for data-analysis work: Laptop A has a faster CPU but 8 GB RAM; Laptop B has a slower CPU but 32 GB RAM.', answer: 'Laptop B is more suitable',
                  options: ['Laptop B is more suitable', 'CPU-bound vs memory-bound', 'CPU = computer', 'The CPU has a monitor and keyboard attached'],
                  hint: 'If stuck, revisit Class 8 Maths Chapter 2 (Exponents and Powers) — specifically the nodes.',
                  misconception: 'Students often believe "CPU = computer" and use the terms interchangeably, writing answers like "The CPU has a monitor and keyboard.' }
          ],
            remediations: { 'cpu-computer-and-use-the': { steps: ['Draw the block diagram from NCERT Figure 1.1 on paper — label each box (Input Device, CPU, Primary Memory, Output.', 'Point to the CPU box and say: "This is *one* component; the *whole diagram* is the computer system."', 'Give the student three devices (mouse, pendrive, speaker) and ask them to place each on the correct box of their.', 'Have them write one sentence defining "computer system" using the phrase "integration of hardware and software" — this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_002', difficulty: 'standard',
          question: 'A computer system is an integrated set of physical components (hardware) and.',
          hint: 'If stuck, revisit the definition of a computer system and the idea that hardware alone.',
          misconception: 'Students often believe that the Operating System (e.g., Windows) is "application software" because they interact with.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a computer with only hardware components (CPU, memory, keyboard, monitor) but no software cannot perform any useful task for.', answer: 'Hardware provides the physical capability to compute, but without software',
                  options: ['Hardware provides the physical capability to compute, but without software', 'the computer will still work but slowly', 'the user can type commands directly into the CPU', 'application software'],
                  hint: 'If stuck, revisit the definition of a computer system and the idea that hardware alone cannot.',
                  misconception: 'Students often believe that the Operating System (e.g., Windows) is "application software" because they interact with it directly (clicking.' },
                { id: 'b', prompt: 'Classify each of the following as Hardware (H) or Software (S), and if Software, further classify as System Software (SS), Application Software (AS),.', answer: 'Linux Ubuntu, (',
                  options: ['Linux Ubuntu, (', 'application software', 'the Operating System (e'],
                  hint: 'If stuck, revisit the definition of a computer system and the idea that hardware alone cannot.',
                  misconception: 'Students often believe that the Operating System (e.g., Windows) is "application software" because they interact with it directly (clicking.' }
          ],
            remediations: { 'the-operating-system-e': { steps: ['Ask the student to list three things Windows does when they plug in a USB drive (detects hardware, loads driver, mounts.', 'Ask: "Does MS Word do any of these?" (No).', 'Explain: "Software that talks directly to hardware so that other software doesn\'t have to is SYSTEM software."', 'Have them re-classify: OS, driver, antivirus, compiler → System Software; Word, Chrome, Tally, Python script →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_003', difficulty: 'standard',
          question: 'An input device is a hardware component that enables users to send data.',
          hint: 'Review the block diagram of a computer system (NCERT Figure 1.1) and identify the Input.',
          misconception: 'Students frequently believe that "input device" only means keyboard and mouse because those are the most visible.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An input device is a hardware component that enables users to send data, commands, or',
                  options: ['An input device is a hardware component that enables users to send data, commands, or', 'A computer is a programmable electronic device that accepts data (input), processes it', 'A computer system is an integrated set of physical components (hardware) and instruction', 'Output devices are hardware components that receive processed digital data from a'],
                  hint: 'Review the block diagram of a computer system (NCERT Figure 1.1) and identify the Input Device.',
                  misconception: 'Students frequently believe that "input device" only means keyboard and mouse because those are the most visible.' }
          ],
            remediations: { 'students-frequently-believe-that-input': { steps: ['Draw the NCERT Figure 1.1 block diagram on the board.', 'Trace the arrow from "Input Device" → "Primary Memory" → "CPU".', 'Emphasize: data *enters* here.', 'Give the student 10 device cards (keyboard, mouse, scanner, mic, webcam, monitor, printer, speaker, USB drive, HDD).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_004', difficulty: 'standard',
          question: 'Output devices are hardware components that receive processed digital data from.',
          hint: 'Revisit the block diagram in c11_ip_cbse_01_001 and the input device classification.',
          misconception: 'Students often think "printer" only means a 2D paper printer and forget that 3D printers are also output devices.',
          parts: [
                { id: 'a', prompt: 'A school needs to print 500 copies of a 20-page text-only report daily. The report contains only black text.', answer: 'Correct answer: Laser printer',
                  options: ['Correct answer: Laser printer', 'printer'],
                  hint: 'Revisit the block diagram in c11_ip_cbse_01_001 and the input device classification.',
                  misconception: 'Students often think "printer" only means a 2D paper printer and forget that 3D printers are also output devices.' }
          ],
            remediations: { 'printer-only-means-a-2d': { steps: ['Have the student draw a data-flow arrow for each device (Computer → Device = Output).', 'Create a comparison table with columns: Device, Input Data Form, Output Physical Form, Example Use Case.', 'Use the braille display to demonstrate non-visual output.', 'Clarify softcopy (digital, editable, temporary) vs hardcopy (physical, permanent, tangible) with the rule: "If you can.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_005', difficulty: 'standard',
          question: 'The Central Processing Unit (CPU) is the primary electronic circuitry of.',
          hint: 'Review the block diagram in node c11_ip_cbse_01_002 and trace the path of data from input.',
          misconception: 'Students often believe the Control Unit *executes* instructions because its name suggests "control" implies "doing".',
          parts: [
                { id: 'a', prompt: 'What are the three main components of the CPU and what is the primary function of each?', answer: 'The three components are: (1) ALU',
                  options: ['The three components are: (1) ALU', 'ALU controls the monitor', 'Registers are part of RAM', 'control'],
                  hint: 'Review the block diagram in node c11_ip_cbse_01_002 and trace the path of data from input device.',
                  misconception: 'Students often believe the Control Unit *executes* instructions because its name suggests "control" implies "doing".' },
                { id: 'b', prompt: 'A student says: "The Control Unit does the calculations because it controls everything." Explain why this statement is incorrect using the specific roles of.', answer: 'The CU directs operations but does not perform calculations',
                  options: ['The CU directs operations but does not perform calculations', 'control', 'action', 'coordination'],
                  hint: 'Review the block diagram in node c11_ip_cbse_01_002 and trace the path of data from input device.',
                  misconception: 'Students often believe the Control Unit *executes* instructions because its name suggests "control" implies "doing".' }
          ],
            remediations: { 'the-control-unit-executes-instructions': { steps: ['Ask the student to physically act out "fetch-decode-execute" with three students playing CU, ALU, Register.', 'Give a written instruction "LOAD 5" and have them pass a paper (data) only when the CU student says "go".', 'Explicitly label each action: "Who decided? CU. Who calculated? ALU. Who held the number? Register."', 'Have the student re-write the definition of CU in their own words emphasizing "signals" not "calculation".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_006', difficulty: 'standard',
          question: 'Primary memory is the computer\'s main memory directly accessible by the CPU.',
          hint: 'Review the CPU-memory interaction in node c11_ip_cbse_01_005: how CU fetches instruction.',
          misconception: 'Students often think "RAM is for running programs, ROM is for storing files" — conflating ROM with secondary storage.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between RAM and ROM in terms of data retention when power is removed?', answer: 'RAM is volatile: it loses all stored data when power is turned off',
                  options: ['RAM is volatile: it loses all stored data when power is turned off', 'both lose data', 'ROM is faster', 'RAM is for running programs, ROM is for storing files'],
                  hint: 'Review the CPU-memory interaction in node c11_ip_cbse_01_005: how CU fetches instruction from.',
                  misconception: 'Students often think "RAM is for running programs, ROM is for storing files" — conflating ROM with secondary storage (hard drive/SSD).' },
                { id: 'b', prompt: 'Your computer has 8 GB of DRAM. You open a 2 GB video file, a 1.5 GB game, and a 500 MB browser. The OS reports 92% RAM usage.', answer: 'The OS itself consumes 1–2 GB',
                  options: ['The OS itself consumes 1–2 GB', 'RAM is for running programs, ROM is for storing files', 'ROM stores my photos', 'RAM is 8 GB, ROM is 256 GB'],
                  hint: 'Review the CPU-memory interaction in node c11_ip_cbse_01_005: how CU fetches instruction from.',
                  misconception: 'Students often think "RAM is for running programs, ROM is for storing files" — conflating ROM with secondary storage (hard drive/SSD).' }
          ],
            remediations: { 'ram-is-for-running-programs': { steps: ['Ask: "What happens to your Instagram photos when you turn off your phone?" → They stay.', '"Where are they stored?" → Flash storage (secondary).', '"Is that ROM?" → No, it\'s rewritable storage.', 'Show a motherboard photo: point out the SPI flash chip (BIOS, 16–32 MB) vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
