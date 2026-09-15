import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch01_p1: SimDef = {
    id: 'v3_c11_cs_ch01_p1',
    title: 'Computer System and Organisation · Part 1/3',
    subtitle: 'Draw the line between calculators and computers, and between memory and storage.',
    classLevel: 11, subject: 'computer_science', topic: 'Computer System and Organisation · Part 1/3',
    chapters: ['c11_cs_ch01'],
    nodeIds: ['c11_cs_cbse_01_001', 'c11_cs_cbse_01_002', 'c11_cs_cbse_01_003', 'c11_cs_cbse_01_004', 'c11_cs_cbse_01_005', 'c11_cs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a systems archivist sorting devices and data formats', intro: 'A museum labels every calculating gadget a \'computer.\' Your job is to correct the record.', goal: 'Identify the components of a computer system and classify data and software correctly.' },
    discovery: {
        question: 'An abacus, Pascal\'s Pascaline and Babbage\'s Analytical Engine all perform calculations. Only one is a true ancestor of the computer — which, and what\'s the dividing line?',
        options: ['The Analytical Engine — it was programmable via punched cards, with input, store, mill and output', 'The abacus — it is the oldest, so everything descends from it', 'The Pascaline — gears make it a real machine, unlike the others', 'All three — calculation alone makes a device a computer'],
        answer: 'The Analytical Engine — it was programmable via punched cards, with input, store, mill and output',
        hook: 'Calculating isn\'t computing — the line is programmability: stored instructions driving automatic execution.',
    },
    teaching: [
        { title: 'Introduction to Computers and their Evolution', text: 'A computer is an electronic device that accepts data (input), processes it according to a set of instructions (program), and produces meaningful results (output).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a school\'s attendance data into structured, unstructured and semi-structured, then separate the hardware from the software that boots a laptop.',
        labels: ['Introduction to Computers', 'Components of a Computer', 'Input Devices: Keyboard, Mouse,', 'Output Devices: Monitor, Printer,', 'Central Processing Unit (CPU)', 'Memory Units: Primary Memory'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_001', title: 'Introduction to Computers and their Evolution',
          caseStudy: { intro: 'Imagine you\'re using your smartphone to send a message - you type on the screen (input), the phone processes your keystrokes, and the message appears on your.',
            decisions: [{ prompt: 'List the four main hardware components of a computer system and state the primary function of each component in one sentence.', options: [
                { text: 'The four main hardware components are: (1) CPU - processes data and executes instructions', outcome: 'The four main hardware components are: (1) CPU - processes data and executes instructions; (2).' },
                { text: 'monitor', outcome: 'Not quite — Students often believe that "CPU = computer" and that the monitor or keyboard is the computer.', reveals: 'cpu-computer-and-that-the' },
                { text: 'keyboard', outcome: 'Not quite — Students often believe that "CPU = computer" and that the monitor or keyboard is the computer.', reveals: 'cpu-computer-and-that-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_002', title: 'Components of a Computer System: Hardware and Software',
          caseStudy: { intro: 'Imagine you press the power button on your laptop — the screen lights up, a logo appears, and eventually you see a desktop with icons.',
            decisions: [{ prompt: 'Name the four primary hardware components of a computer system as per the von Neumann architecture and state the one-word function of each.', options: [
                { text: 'The four primary hardware components are: (1) CPU', outcome: 'The four primary hardware components are: (1) CPU — processing, (2) Primary Memory — storage.' },
                { text: 'hard disk', outcome: 'Not quite — Students often believe "software is only the apps I see on screen (like Chrome, Word)" and.', reveals: 'software-is-only-the-apps' },
                { text: 'monitor', outcome: 'Not quite — Students often believe "software is only the apps I see on screen (like Chrome, Word)" and.', reveals: 'software-is-only-the-apps' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_003', title: 'Input Devices: Keyboard, Mouse, Scanner and Others',
          caseStudy: { intro: 'Imagine you are designing a computer kiosk for a rural Indian post office where many users are elderly, semi-literate, and speak only their local language.',
            decisions: [{ prompt: 'List any four input devices mentioned in the NCERT textbook and state the type of data each primarily captures (e.g., text, positional.', options: [
                { text: 'Correct answer: Keyboard (text/character codes), Mouse (relative positional coordinates),', outcome: 'Correct answer: Keyboard (text/character codes), Mouse (relative positional coordinates), Scanner.' },
                { text: 'monitor', outcome: 'Not quite — Students often think "input device = the physical thing you touch" and therefore classify.', reveals: 'input-device-the-physical-thing' },
                { text: 'printer', outcome: 'Not quite — Students often think "input device = the physical thing you touch" and therefore classify.', reveals: 'input-device-the-physical-thing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_004', title: 'Output Devices: Monitor, Printer, Speaker',
          caseStudy: { intro: 'Imagine you are setting up a workstation for a freelance graphic designer who also prints client proofs and edits short video clips with background music.',
            decisions: [{ prompt: 'Name the three output devices discussed in this topic and state the primary human sense each one targets.', options: [
                { text: 'The three devices are monitor (targets vision), printer (targets touch/vision via hard', outcome: 'The three devices are monitor (targets vision), printer (targets touch/vision via hard copy), and.' },
                { text: 'projector', outcome: 'Not quite — Students often believe that a higher numeric specification is always better: "4K monitor is better.', reveals: 'a-higher-numeric-specification-is' },
                { text: '4K monitor is better than 1080p for everyone', outcome: 'Not quite — Students often believe that a higher numeric specification is always better: "4K monitor is better.', reveals: 'a-higher-numeric-specification-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_005', title: 'Central Processing Unit (CPU): ALU, CU and Registers',
          caseStudy: { intro: 'Imagine you are the manager of a busy restaurant kitchen: orders (instructions) come in, ingredients (data) are fetched from the pantry (memory), the prep.',
            decisions: [{ prompt: 'Name the three main components of the CPU and state the primary function of each in one sentence.', options: [
                { text: 'The three main components are: (1) Arithmetic Logic Unit (ALU)', outcome: 'The three main components are: (1) Arithmetic Logic Unit (ALU) — performs arithmetic (add.' },
                { text: 'ALU stores data', outcome: 'Not quite — Students often believe the Control Unit "executes" instructions like the ALU does, thinking the.', reveals: 'the-control-unit-executes-instructions' },
                { text: 'CU does calculations', outcome: 'Not quite — Students often believe the Control Unit "executes" instructions like the ALU does, thinking the.', reveals: 'the-control-unit-executes-instructions' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_006', title: 'Memory Units: Primary Memory (RAM and ROM)',
          scaffold: { problem: 'A student\'s laptop has 16 GB of RAM. The operating system uses 2.5 GB, and a video editing software requires 4 GB.',
            steps: [
            { text: 'Identify total RAM = 16 GB. Convert to MB: 16 × 1024 = 16,384 MB.' },
            { text: 'Convert OS usage to MB: 2.5 GB × 1024 = 2,560 MB.' },
            { text: 'Convert software requirement to MB: 4 GB × 1024 = 4,096 MB.' },
            { text: 'Calculate used RAM: 2,560 + 4,096 = 6,656 MB.' },
            { text: 'Calculate free RAM: 16,384 - 6,656 = 9,728 MB.', faded: true, blankAnswer: '9,728 MB' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school computer lab is upgrading. The budget sheet from a vendor lists: \'Intel i5 CPU, 16 GB memory, 512 GB memory, monitor, keyboard, mouse.\' A junior intern asks why \'memory\' appears twice with different numbers, and whether the monitor is \'part of the computer or just an accessory\'.',
            decisions: [{ prompt: 'Explain the listing correctly.', options: [
                { text: 'The two \'memory\' lines are different things: 16 GB is RAM — volatile primary memory the CPU works in directly, wiped at power-off; 512 GB is secondary storage (SSD) — non-volatile, keeps files permanently but isn\'t accessed directly by the CPU. And the monitor is an output device: the computer system = hardware (CPU, memory, I/O, storage) + software, not just the CPU box.', outcome: 'Every computer system = four hardware blocks (CPU, memory, input, output) plus software; \'memory\' in ads conflates RAM with storage.' },
                { text: 'It\'s a typo — memory is memory; 16 GB and 512 GB are the same thing listed twice.', outcome: 'RAM and storage serve different roles: one is the CPU\'s volatile workbench, the other the permanent filing cabinet — speed, volatility and CPU access all differ.', reveals: 'memory-equals-storage' },
                { text: 'The monitor and keyboard ARE the computer — the box inside just does processing.', outcome: 'That inverts it: input/output devices are peripherals serving the CPU; the computer is the whole input→process→output system, not any single component.', reveals: 'peripherals-are-the-computer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'A computer isn\'t a clever calculator — it\'s a machine that runs stored instructions on whatever data you feed it.',
            decisions: [{ prompt: 'What comes next? Computer System and Organisation · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Computer System and Organisation · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_001', difficulty: 'standard',
          question: 'A computer is an electronic device that accepts data (input), processes.',
          hint: 'If stuck, revisit Class 8 Math Chapter 2 (Exponents and Powers) specifically the laws.',
          misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.',
          parts: [
                { id: 'a', prompt: 'Explain why a computer with only RAM but no secondary storage cannot have software permanently installed, even if the RAM is large enough to hold the operating.', answer: 'RAM is volatile memory - its contents are lost when power is turned off',
                  options: ['RAM is volatile memory - its contents are lost when power is turned off', 'RAM is too slow', 'secondary storage is faster', 'CPU = computer'],
                  hint: 'If stuck, revisit Class 8 Math Chapter 2 (Exponents and Powers) specifically the laws of exponents.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' },
                { id: 'b', prompt: 'A student claims: "The abacus, Pascaline, and Analytical Engine are all examples of early computers because they could perform calculations." Evaluate this.', answer: 'The Analytical Engine is the only one that qualifies as a computer precursor',
                  options: ['The Analytical Engine is the only one that qualifies as a computer precursor', 'CPU = computer', 'memory', 'my phone has 128GB memory'],
                  hint: 'If stuck, revisit Class 8 Math Chapter 2 (Exponents and Powers) specifically the laws of exponents.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' },
                { id: 'c', prompt: 'Compare the data bus and address bus in terms of directionality and purpose. Why is the data bus bidirectional while the address bus is unidirectional?', answer: 'The data bus is bidirectional',
                  options: ['The data bus is bidirectional', 'both are bidirectional', 'address bus carries data', 'CPU = computer'],
                  hint: 'If stuck, revisit Class 8 Math Chapter 2 (Exponents and Powers) specifically the laws of exponents.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' }
          ],
            remediations: { 'cpu-computer-and-that-the': { steps: ['If a student cannot distinguish CPU from the whole system, have them physically identify components inside an open CPU.', 'For memory confusion, create a two-column table: "Loses data when power off?" (RAM: Yes, ROM: No, HDD/SSD: No) and.', 'For the abacus error, ask: "Can the abacus run a program stored on punched cards without human moving beads?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.',
          parts: [
                { id: 'a', prompt: 'Design a simple computer system for a vending machine that accepts coins, allows item selection, and dispenses the product.', answer: 'Block diagram: Input devices = coin sensor, keypad',
                  options: ['Block diagram: Input devices = coin sensor, keypad', 'CPU = computer', 'memory', 'my phone has 128GB memory'],
                  hint: 'If stuck, revisit Class 8 Math Chapter 2 (Exponents and Powers) specifically the laws of exponents.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' }
          ],
            remediations: { 'cpu-computer-and-that-the': { steps: ['If a student cannot distinguish CPU from the whole system, have them physically identify components inside an open CPU.', 'For memory confusion, create a two-column table: "Loses data when power off?" (RAM: Yes, ROM: No, HDD/SSD: No) and.', 'For the abacus error, ask: "Can the abacus run a program stored on punched cards without human moving beads?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_002', difficulty: 'standard',
          question: 'A computer system is an integrated combination of physical components.',
          hint: 'Revisit c11_cs_cbse_01_001 — specifically the von Neumann architecture diagram (Figure.',
          misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box.',
          parts: [
                { id: 'a', prompt: 'Name the four primary hardware components of a computer system as per the von Neumann architecture and state the one-word function of each (e.g., CPU →.', answer: 'The four primary hardware components are: (1) CPU',
                  options: ['The four primary hardware components are: (1) CPU', 'hard disk', 'monitor', 'software is only the apps I see on screen (like Chrome, Word)'],
                  hint: 'Revisit c11_cs_cbse_01_001 — specifically the von Neumann architecture diagram (Figure 1.5.',
                  misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box (CPU cabinet)".' },
                { id: 'b', prompt: 'Classify each of the following into the correct software category and sub-category: (a) Ubuntu, (b) Python IDLE, (c) LibreOffice Calc, (d) Device driver for.', answer: 'Ubuntu, (',
                  options: ['Ubuntu, (', 'software is only the apps I see on screen (like Chrome, Word)', 'hardware is only the box (CPU cabinet)', 'If I uninstall all apps, the computer has no software'],
                  hint: 'Revisit c11_cs_cbse_01_001 — specifically the von Neumann architecture diagram (Figure 1.5.',
                  misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box (CPU cabinet)".' }
          ],
            remediations: { 'software-is-only-the-apps': { steps: ['Show the student a boot sequence screen (press F2/Del at startup) — point out "BIOS version", "UEFI firmware" — ask "Is.', 'Open Device Manager (Windows) or `lsmod` (Linux) — list 20+ drivers — ask "Did you install these?', 'Use the analogy: "Hardware = kitchen appliances (oven, fridge, knives); Firmware = built-in thermostat in oven; Drivers.', 'Have student re-classify the 15 items from Diagnostic Q3, this time explicitly marking "visible to user?" (Y/N).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_003', difficulty: 'standard',
          question: 'An input device is a hardware component that captures data or instructions from.',
          hint: 'If stuck, revisit c11_cs_cbse_01_002 (Components of a Computer System) and practice.',
          misconception: 'Students often think "input device = the physical thing you touch" and therefore classify a **barcode scanner**.',
          parts: [
                { id: 'a', prompt: 'A school library wants to digitize 500 old printed question papers (A4 size, text + diagrams) into searchable PDFs. The budget allows only one device purchase.', answer: 'Correct choice: Flatbed scanner',
                  options: ['Correct choice: Flatbed scanner', 'input device = the physical thing you touch'],
                  hint: 'If stuck, revisit c11_cs_cbse_01_002 (Components of a Computer System) and practice labelling.',
                  misconception: 'Students often think "input device = the physical thing you touch" and therefore classify a **barcode scanner** as *output* because.' },
                { id: 'b', prompt: 'Compare the data-representation formats produced by: (a) a keyboard pressing \'A\', (b) a scanner digitizing the printed letter \'A\' at 300 DPI, (c) a microphone.', answer: 'Correct answer: (a) Keyboard → 1–2 bytes (ASCII/Unicode code point, e.g., 0x41)',
                  options: ['Correct answer: (a) Keyboard → 1–2 bytes (ASCII/Unicode code point, e.g., 0x41)', 'all are same size', 'scanner is smallest', 'input device = the physical thing you touch'],
                  hint: 'If stuck, revisit c11_cs_cbse_01_002 (Components of a Computer System) and practice labelling.',
                  misconception: 'Students often think "input device = the physical thing you touch" and therefore classify a **barcode scanner** as *output* because.' }
          ],
            remediations: { 'input-device-the-physical-thing': { steps: ['Draw a two-column table on board: "Energy IN to device" vs "Data OUT to CPU".', 'For barcode scanner, write: "Light (laser) OUT → reflects off paper → Light variations IN → Photodiode → Electrical.', 'Ask: "Which column represents the *computer\'s perspective*?" (Data OUT to CPU).', 'Repeat for webcam: "Light IN from scene → Lens → Sensor → Video frames OUT to CPU".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_004', difficulty: 'standard',
          question: 'An output device is a peripheral hardware component that receives processed.',
          hint: 'Revisit c11_cs_cbse_01_002 (block diagram) and trace the arrow from CPU → Memory → Output.',
          misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a monitor is called a soft-copy output device while a printer is called a hard-copy output device.', answer: 'A monitor produces soft copy',
                  options: ['A monitor produces soft copy', 'soft copy means low quality', 'hard copy means thick paper', '4K monitor is better than 1080p for everyone'],
                  hint: 'Revisit c11_cs_cbse_01_002 (block diagram) and trace the arrow from CPU → Memory → Output Device.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' },
                { id: 'b', prompt: 'A school lab needs to print 500 pages of text-heavy worksheets daily.', answer: 'Laser: Printer cost ₹12,000 (one-time)',
                  options: ['Laser: Printer cost ₹12,000 (one-time)', '4K monitor is better than 1080p for everyone', '1200 DPI printer is better than 600 DPI', '100 W speaker is louder than 50 W'],
                  hint: 'Revisit c11_cs_cbse_01_002 (block diagram) and trace the arrow from CPU → Memory → Output Device.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' },
                { id: 'c', prompt: 'Compare the working principle of an LCD monitor and an OLED monitor. Why does an OLED display achieve "true black" while an LCD cannot?', answer: 'LCD uses a constant backlight (LED) that passes through liquid crystals',
                  options: ['LCD uses a constant backlight (LED) that passes through liquid crystals', 'OLED has a better backlight', 'LCD turns off backlight for black', '4K monitor is better than 1080p for everyone'],
                  hint: 'Revisit c11_cs_cbse_01_002 (block diagram) and trace the arrow from CPU → Memory → Output Device.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' }
          ],
            remediations: { 'a-higher-numeric-specification-is': { steps: ['Present two side-by-side scenarios — a programmer coding 10 hours/day (needs 1080p 27" high-refresh, low blue light).', 'Have students calculate pixel pitch (mm/pixel) for each and link to viewing distance using the visual acuity formula (1.', 'Repeat for printers: print a 10×10 cm photo at 300 DPI and 1200 DPI on plain paper; compare cost, time, and visible.', 'For speakers, play the same track at 70 dB SPL from a 20 W nearfield monitor and a 100 W PA speaker; discuss clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_005', difficulty: 'standard',
          question: 'The Central Processing Unit (CPU) is the primary electronic circuitry of.',
          hint: 'Revisit c11_cs_cbse_01_001 (Von Neumann architecture) and c11_cs_cbse_01_002 (system bus.',
          misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual.',
          parts: [
                { id: 'a', prompt: 'Name the three main components of the CPU and state the primary function of each in one sentence.', answer: 'The three main components are: (1) Arithmetic Logic Unit (ALU)',
                  options: ['The three main components are: (1) Arithmetic Logic Unit (ALU)', 'ALU stores data', 'CU does calculations', 'executes'],
                  hint: 'Revisit c11_cs_cbse_01_001 (Von Neumann architecture) and c11_cs_cbse_01_002 (system bus: data bus.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition.' },
                { id: 'b', prompt: 'A student says: "Registers are just a small part of RAM inside the CPU." Explain why this statement is incorrect, using the terms \'volatile\', \'access speed\'.', answer: 'Registers are not part of RAM',
                  options: ['Registers are not part of RAM', 'executes', 'CU controls instruction execution', 'control'],
                  hint: 'Revisit c11_cs_cbse_01_001 (Von Neumann architecture) and c11_cs_cbse_01_002 (system bus: data bus.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition.' },
                { id: 'c', prompt: 'Compare the roles of the Accumulator (ACC), Program Counter (PC), Instruction Register (IR), and Memory Address Register (MAR) in the fetch-decode-execute.', answer: '- PC: holds address of **next** instruction to fetch',
                  options: ['- PC: holds address of **next** instruction to fetch', 'PC holds current instruction', 'MAR gets ALU result', 'executes'],
                  hint: 'Revisit c11_cs_cbse_01_001 (Von Neumann architecture) and c11_cs_cbse_01_002 (system bus: data bus.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition.' }
          ],
            remediations: { 'the-control-unit-executes-instructions': { steps: ['Draw a simple CPU datapath diagram on the board: PC → MAR → Memory → MDR → IR → CU (decoder) → control lines → ALU ←.', 'Give a concrete instruction `ADD R1, R2` and ask: "Which block puts the address on the bus?" (PC→MAR) "Which block.', 'Have the student trace the same instruction on the diagram, pointing to each block and saying its action aloud.', 'Contrast with a microcontroller (node c11_cs_cbse_01_005 forward link) where CU and ALU are on same chip but still.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_006', difficulty: 'standard',
          question: 'Primary memory is the main memory directly accessible by the CPU for storing.',
          hint: 'Revisit the definition of a bit and the binary number system (c11_cs_cbse_01_011) and the.',
          misconception: 'Students often believe that "primary memory" means only RAM, and that ROM is a separate category not part of primary.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between RAM and ROM in terms of data retention when the power supply is turned off?', answer: 'RAM is volatile and loses all stored data when power is turned off, while ROM is',
                  options: ['RAM is volatile and loses all stored data when power is turned off, while ROM is', 'both lose data', 'both retain data', 'primary memory'],
                  hint: 'Revisit the definition of a bit and the binary number system (c11_cs_cbse_01_011) and the computer.',
                  misconception: 'Students often believe that "primary memory" means only RAM, and that ROM is a separate category not part of primary memory.' },
                { id: 'b', prompt: 'A student says, "ROM is called Read Only Memory because we can only read from it, never write to it.', answer: 'The term "Read Only" refers to normal operation during program execution',
                  options: ['The term "Read Only" refers to normal operation during program execution', 'Read Only', 'primary memory'],
                  hint: 'Revisit the definition of a bit and the binary number system (c11_cs_cbse_01_011) and the computer.',
                  misconception: 'Students often believe that "primary memory" means only RAM, and that ROM is a separate category not part of primary memory.' },
                { id: 'c', prompt: 'A computer has 8 GB of RAM. How many bytes is this? Show the conversion steps using the standard definition where 1 KB = 1024 Bytes.', answer: 'Step 1: 1 GB = 1024 MB',
                  options: ['Step 1: 1 GB = 1024 MB', 'primary memory'],
                  hint: 'Revisit the definition of a bit and the binary number system (c11_cs_cbse_01_011) and the computer.',
                  misconception: 'Students often believe that "primary memory" means only RAM, and that ROM is a separate category not part of primary memory.' }
          ],
            remediations: { 'primary-memory-means-only-ram': { steps: ['If the student confuses primary memory with only RAM, draw a two-column table on paper: left column "Primary Memory".', 'Right column "Secondary Memory".', 'Ask them to fill in volatility, access type, and typical use for each.', 'Then add a third column "Cache" between CPU and Primary Memory, emphasizing it\'s not part of primary memory but.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
