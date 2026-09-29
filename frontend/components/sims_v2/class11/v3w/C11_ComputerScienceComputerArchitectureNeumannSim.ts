import type { SimDef } from '../../engine/types';
import C11_ComputerScienceComputerArchitectureNeumannSim from '../../../simulations/c6_12/C11_ComputerScienceComputerArchitectureNeumannSim';

/** v3 wrapped master — C11_ComputerScienceComputerArchitectureNeumannSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencecomputerarchitectureneumannsim: SimDef = {
    id: 'v3w_c11_computersciencecomputerarchitectureneumannsim',
    title: 'Introduction to Computers and their Evolution',
    subtitle: 'This node covers the fundamental definition of a computer system, its hardware components.',
    classLevel: 11, subject: 'computer_science', topic: 'Introduction to Computers and their Evolution',
    chapters: [],
    nodeIds: ['c11_cs_cbse_01_001', 'c11_cs_cbse_01_002', 'c11_cs_cbse_01_004', 'c11_cs_cbse_01_005', 'c11_cs_cbse_01_009', 'c11_cs_cbse_01_010', 'c11_cs_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re using your smartphone to send a message - you type on the screen (input), the phone processes.', goal: 'Master Introduction to Computers and their Evolution.' },
    discovery: {
        question: 'Explain why a computer with only RAM but no secondary storage cannot have software permanently installed, even if the RAM is large enough to hold the operating.',
        options: ['RAM is volatile memory - its contents are lost when power is turned off', 'RAM is too slow', 'secondary storage is faster'],
        answer: 'RAM is volatile memory - its contents are lost when power is turned off',
        hook: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.',
    },
    teaching: [
        { title: 'A computer is an electronic device that.', text: 'A computer is an electronic device that accepts data (input), processes it according to a set of instructions (program), and produces meaningful results (output).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_001', title: 'A computer is an electronic device that.',
          scaffold: { problem: 'A school computer lab has 20 computers. Each computer has 8 GB RAM and 512 GB SSD.',
            steps: [
            { text: 'Recall memory unit conversions: 1 GB = 2^30 bytes (since 1 KB = 2^10 bytes, 1 MB = 2^20 bytes, 1 GB = 2^30 bytes).' },
            { text: 'Calculate RAM per computer in bytes: 8 GB = 8 × 2^30 bytes = 2^3 × 2^30 = 2^33 bytes.' },
            { text: 'Calculate total RAM for 20 computers: 20 × 2^33 bytes = 20 × 8,589,934,592 bytes = 171,798,691,840 bytes.' },
            { text: 'Calculate SSD per computer in bytes: 512 GB = 512 × 2^30 bytes = 2^9 × 2^30 = 2^39 bytes.' },
            { text: 'Calculate total SSD for 20 computers: 20 × 2^39 bytes = 20 × 549,755,813,888 bytes = 10,995,116,277,760 bytes.' },
            { text: 'Verify using decimal approximations: 8 GB ≈ 8×10^9 bytes, 20 computers ≈ 1.6×10^11 bytes (matches 1.717×10^11).', faded: true, blankAnswer: 'Total RAM = 171,798,691,840 bytes (20 × 2^33 bytes). Total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_002', title: 'A computer system is an integrated.',
          scaffold: { problem: 'A student is building a custom PC for video editing. They have selected: (1) AMD Ryzen 9 7950X CPU, (2) 64 GB DDR5-6000 RAM, (3) 2 TB NVMe.',
            steps: [
            { text: 'Identify the two top-level categories: Hardware (tangible, physical) vs Software (intangible, instructions).' },
            { text: 'Sub-classify Hardware items using von Neumann + modern extensions: (1) AMD Ryzen 9 7950X → CPU (central processor).' },
            { text: 'Sub-classify Software items using the three-category framework: (7) Windows 11 Pro → System Software → Operating System.' },
            { text: 'Verify completeness: All 10 items classified. No item left uncategorised.' },
            { text: 'Interpret result: The system balances high-performance hardware (CPU, GPU, fast RAM, NVMe) with professional software.', faded: true, blankAnswer: 'Hardware: (1) CPU, (2) Primary Memory, (3) Secondary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_004', title: 'An output device is a peripheral.',
          scaffold: { problem: 'A graphic design startup purchases three 27-inch monitors. Monitor A: 2560×1440 (QHD), 60 Hz, 99% sRGB, ₹22,000.',
            steps: [
            { text: 'Calculate pixel pitch (mm/pixel) for each monitor using diagonal mm and Pythagorean theorem on resolution.' },
            { text: 'Compare each pitch to human acuity limit (0.175 mm). Monitor A (0.233 mm) > 0.175 → individual pixels resolvable at 60.' },
            { text: 'Compute total pixels: A = 3.69 MP, B = 8.29 MP, C = 2.07 MP.' },
            { text: 'Compute cost per million pixels: A = ₹22,000/3.69 ≈ ₹5,962/MP. B = ₹38,000/8.29 ≈ ₹4,584/MP.' },
            { text: 'Adjust for perceptual utility: Monitor B\'s extra 4.6 MP over A are imperceptible at working distance, so effective MP.' },
            { text: 'Note Monitor C\'s 144 Hz benefits motion (video/gaming) but not static design; its low PPI makes it unsuitable despite.', faded: true, blankAnswer: 'Monitor A (QHD) provides the best cost-per-effective-pixel.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_005', title: 'The Central Processing Unit (CPU) is.',
          caseStudy: { intro: 'Imagine you are the manager of a busy restaurant kitchen: orders (instructions) come in, ingredients (data) are fetched from the pantry (memory), the prep.',
            decisions: [{ prompt: 'Name the three main components of the CPU and state the primary function of each in one sentence.', options: [
                { text: 'The three main components are: (1) Arithmetic Logic Unit (ALU)', outcome: 'The three main components are: (1) Arithmetic Logic Unit (ALU) — performs arithmetic (add,.' },
                { text: 'ALU stores data', outcome: 'Not quite — Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU.', reveals: 'the-control-unit-executes-instructions' },
                { text: 'CU does calculations', outcome: 'Not quite — Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU.', reveals: 'the-control-unit-executes-instructions' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_009', title: 'An operating system (OS) is a system.',
          scaffold: { problem: 'A student uses a laptop with Windows 11 (GUI), a smartphone with Android (touch), and a smart speaker with Alexa (voice).',
            steps: [
            { text: 'Identify the OS for each device from the problem statement: Windows 11, Android, Alexa (runs on Fire OS, a Linux-based.' },
            { text: 'Match each to its primary interface type from textbook categories: Windows 11 → Graphical User Interface; Android →.' },
            { text: 'Determine a background OS function for each: Windows 11 → Memory Management (managing RAM for browser, OS services);.' },
            { text: 'Identify the specific hardware resource each function manages: Memory Management → RAM; Process Management → CPU cores;.' },
            { text: 'Verify all three OS types are covered (desktop, mobile, embedded) and all four textbook interface types are represented.', faded: true, blankAnswer: 'Laptop: Windows 11, GUI, Memory Management, RAM..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_010', title: 'Bootstrapping is the self-initiated.',
          scaffold: { problem: 'A computer is powered on from a completely off state. The user sees the manufacturer\'s logo, then a brief text screen showing "Memory Test:.',
            steps: [
            { text: 'Recognize that the first scenario starts from power-off, so it is a cold boot.' },
            { text: 'Note the presence of the memory test (part of POST) in the first scenario.' },
            { text: 'Recognize the second scenario is initiated by the OS "Restart" command without power loss, so it is a warm boot.' },
            { text: 'Compare the two sequences: the memory test (POST) is missing in the warm boot.' },
            { text: 'Conclude that POST (Power-On Self-Test) is the stage skipped during warm boot.', faded: true, blankAnswer: 'First scenario: cold boot. Second scenario: warm boot..' }
            ] } }
    ],
    explore: { component: C11_ComputerScienceComputerArchitectureNeumannSim, prompt: 'Explore the interactive — Introduction to Computers and their Evolution' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_001', difficulty: 'standard',
          question: 'A computer is an electronic device that accepts data (input), processes it.',
          hint: 'If stuck, revisit Class 8 Math Chapter 2 (Exponents and Powers) specifically the laws of.',
          misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.',
          parts: [
                { id: 'a', prompt: 'Explain why a computer with only RAM but no secondary storage cannot have software permanently installed, even if the RAM is large enough to hold the operating.', answer: 'RAM is volatile memory - its contents are lost when power is turned off',
                  options: ['RAM is volatile memory - its contents are lost when power is turned off', 'RAM is too slow', 'secondary storage is faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' },
                { id: 'b', prompt: 'A student claims: "The abacus, Pascaline, and Analytical Engine are all examples of early computers because they could perform calculations." Evaluate this.', answer: 'The Analytical Engine is the only one that qualifies as a computer precursor',
                  options: ['The Analytical Engine is the only one that qualifies as a computer precursor', 'CPU = computer', 'memory'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' },
                { id: 'c', prompt: 'Compare the data bus and address bus in terms of directionality and purpose. Why is the data bus bidirectional while the address bus is unidirectional?', answer: 'The data bus is bidirectional',
                  options: ['The data bus is bidirectional', 'both are bidirectional', 'address bus carries data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' }
          ],
            remediations: { 'cpu-computer-and-that-the': { steps: ['If a student cannot distinguish CPU from the whole system, have them physically identify components inside an open CPU.', 'For memory confusion, create a two-column table: "Loses data when power off?" (RAM: Yes, ROM: No, HDD/SSD: No) and.', 'For the abacus error, ask: "Can the abacus run a program stored on punched cards without human moving beads?" This.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.',
          parts: [
                { id: 'a', prompt: 'Design a simple computer system for a vending machine that accepts coins, allows item selection, and dispenses the product.', answer: 'Block diagram: Input devices = coin sensor, keypad',
                  options: ['Block diagram: Input devices = coin sensor, keypad', 'CPU = computer', 'memory', 'my phone has 128GB memory'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "CPU = computer" and that the monitor or keyboard is the computer itself.' }
          ],
            remediations: { 'cpu-computer-and-that-the': { steps: ['If a student cannot distinguish CPU from the whole system, have them physically identify components inside an open CPU.', 'For memory confusion, create a two-column table: "Loses data when power off?" (RAM: Yes, ROM: No, HDD/SSD: No) and.', 'For the abacus error, ask: "Can the abacus run a program stored on punched cards without human moving beads?" This.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_002', difficulty: 'standard',
          question: 'A computer system is an integrated combination of physical components.',
          hint: 'Revisit c11_cs_cbse_01_001 — specifically the von Neumann architecture diagram (Figure.',
          misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box.',
          parts: [
                { id: 'a', prompt: 'Name the four primary hardware components of a computer system as per the von Neumann architecture and state the one-word function of each (e.g., CPU →.', answer: 'The four primary hardware components are: (1) CPU',
                  options: ['The four primary hardware components are: (1) CPU', 'hard disk', 'monitor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box (CPU cabinet)".' },
                { id: 'b', prompt: 'Classify each of the following into the correct software category and sub-category: (a) Ubuntu, (b) Python IDLE, (c) LibreOffice Calc, (d) Device driver for HP.', answer: 'Ubuntu, (',
                  options: ['Ubuntu, (', 'software is only the apps I see on screen (like Chrome, Word)', 'hardware is only the box (CPU cabinet)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box (CPU cabinet)".' }
          ],
            remediations: { 'software-is-only-the-apps': { steps: ['Show the student a boot sequence screen (press F2/Del at startup) — point out "BIOS version", "UEFI firmware" — ask "Is.', 'Open Device Manager (Windows) or `lsmod` (Linux) — list 20+ drivers — ask "Did you install these?', 'Use the analogy: "Hardware = kitchen appliances (oven, fridge, knives); Firmware = built-in thermostat in oven; Drivers.', 'Have student re-classify the 15 items from Diagnostic Q3, this time explicitly marking "visible to user?" (Y/N) to.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since RAM is volatile and loses data on power-off, it is a design flaw; computers should use only non-volatile memory like ROM or SSD.', answer: 'Refute',
                  options: ['Refute', 'software is only the apps I see on screen (like Chrome, Word)', 'hardware is only the box (CPU cabinet)', 'If I uninstall all apps, the computer has no software'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box (CPU cabinet)".' },
                { id: 'b', prompt: 'Design a minimal computer system for a rural primary health centre that must: (a) store patient records offline, (b) run a customised diagnosis-assist app, (c).', answer: 'Hardware: (1) Low-power CPU (e.g., ARM Cortex-A53)',
                  options: ['Hardware: (1) Low-power CPU (e.g., ARM Cortex-A53)', 'software is only the apps I see on screen (like Chrome, Word)', 'hardware is only the box (CPU cabinet)', 'If I uninstall all apps, the computer has no software'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "software is only the apps I see on screen (like Chrome, Word)" and "hardware is only the box (CPU cabinet)".' }
          ],
            remediations: { 'software-is-only-the-apps': { steps: ['Show the student a boot sequence screen (press F2/Del at startup) — point out "BIOS version", "UEFI firmware" — ask "Is.', 'Open Device Manager (Windows) or `lsmod` (Linux) — list 20+ drivers — ask "Did you install these?', 'Use the analogy: "Hardware = kitchen appliances (oven, fridge, knives); Firmware = built-in thermostat in oven; Drivers.', 'Have student re-classify the 15 items from Diagnostic Q3, this time explicitly marking "visible to user?" (Y/N) to.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_004', difficulty: 'standard',
          question: 'An output device is a peripheral hardware component that receives processed.',
          hint: 'Revisit c11_cs_cbse_01_002 (block diagram) and trace the arrow from CPU → Memory → Output.',
          misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a monitor is called a soft-copy output device while a printer is called a hard-copy output device.', answer: 'A monitor produces soft copy',
                  options: ['A monitor produces soft copy', 'soft copy means low quality', 'hard copy means thick paper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' },
                { id: 'b', prompt: 'A school lab needs to print 500 pages of text-heavy worksheets daily.', answer: 'Laser: Printer cost ₹12,000 (one-time)',
                  options: ['Laser: Printer cost ₹12,000 (one-time)', '4K monitor is better than 1080p for everyone', '1200 DPI printer is better than 600 DPI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' },
                { id: 'c', prompt: 'Compare the working principle of an LCD monitor and an OLED monitor. Why does an OLED display achieve "true black" while an LCD cannot?', answer: 'LCD uses a constant backlight (LED) that passes through liquid crystals',
                  options: ['LCD uses a constant backlight (LED) that passes through liquid crystals', 'OLED has a better backlight', 'LCD turns off backlight for black'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' }
          ],
            remediations: { 'a-higher-numeric-specification-is': { steps: ['Present two side-by-side scenarios — a programmer coding 10 hours/day (needs 1080p 27" high-refresh, low blue light) vs.', 'Have students calculate pixel pitch (mm/pixel) for each and link to viewing distance using the visual acuity formula (1.', 'Repeat for printers: print a 10×10 cm photo at 300 DPI and 1200 DPI on plain paper; compare cost, time, and visible.', 'For speakers, play the same track at 70 dB SPL from a 20 W nearfield monitor and a 100 W PA speaker; discuss clarity vs.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A 3D printer is just a printer that prints in three dimensions instead of two, so it should be judged by the same metrics — DPI and.', answer: 'Refute',
                  options: ['Refute', '4K monitor is better than 1080p for everyone', '1200 DPI printer is better than 600 DPI', '100 W speaker is louder than 50 W'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a higher numeric specification is always better: "4K monitor is better than 1080p for everyone," "1200 DPI.' }
          ],
            remediations: { 'a-higher-numeric-specification-is': { steps: ['Present two side-by-side scenarios — a programmer coding 10 hours/day (needs 1080p 27" high-refresh, low blue light) vs.', 'Have students calculate pixel pitch (mm/pixel) for each and link to viewing distance using the visual acuity formula (1.', 'Repeat for printers: print a 10×10 cm photo at 300 DPI and 1200 DPI on plain paper; compare cost, time, and visible.', 'For speakers, play the same track at 70 dB SPL from a 20 W nearfield monitor and a 100 W PA speaker; discuss clarity vs.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_005', difficulty: 'standard',
          question: 'The Central Processing Unit (CPU) is the primary electronic circuitry of a.',
          hint: 'Revisit c11_cs_cbse_01_001 (Von Neumann architecture) and c11_cs_cbse_01_002 (system bus:.',
          misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual.',
          parts: [
                { id: 'a', prompt: 'Name the three main components of the CPU and state the primary function of each in one sentence.', answer: 'The three main components are: (1) Arithmetic Logic Unit (ALU)',
                  options: ['The three main components are: (1) Arithmetic Logic Unit (ALU)', 'ALU stores data', 'CU does calculations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition or.' },
                { id: 'b', prompt: 'A student says: "Registers are just a small part of RAM inside the CPU." Explain why this statement is incorrect, using the terms \'volatile\', \'access speed\',.', answer: 'Registers are not part of RAM',
                  options: ['Registers are not part of RAM', 'executes', 'CU controls instruction execution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition or.' },
                { id: 'c', prompt: 'Compare the roles of the Accumulator (ACC), Program Counter (PC), Instruction Register (IR), and Memory Address Register (MAR) in the fetch-decode-execute.', answer: '- PC: holds address of **next** instruction to fetch',
                  options: ['- PC: holds address of **next** instruction to fetch', 'PC holds current instruction', 'MAR gets ALU result'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition or.' }
          ],
            remediations: { 'the-control-unit-executes-instructions': { steps: ['Draw a simple CPU datapath diagram on the board: PC → MAR → Memory → MDR → IR → CU (decoder) → control lines → ALU ←.', 'Give a concrete instruction `ADD R1, R2` and ask: "Which block puts the address on the bus?" (PC→MAR) "Which block.', 'Have the student trace the same instruction on the diagram, pointing to each block and saying its action aloud.', 'Contrast with a microcontroller (node c11_cs_cbse_01_005 forward link) where CU and ALU are on same chip but still.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual.',
          parts: [
                { id: 'a', prompt: 'A processor has 16 general-purpose registers (R0–R15), each 32 bits wide. The instruction `ADD R3, R5, R7` means R3 ← R5 + R7.', answer: 'Three-operand format is more efficient',
                  options: ['Three-operand format is more efficient', 'executes', 'CU controls instruction execution', 'control'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition or.' },
                { id: 'b', prompt: 'Design a minimal register set (name, width, purpose) for a hypothetical 8-bit CPU that can execute: load immediate, load/store direct, add, subtract,.', answer: 'Minimal set for general-register 8-bit CPU: 1',
                  options: ['Minimal set for general-register 8-bit CPU: 1', 'executes', 'CU controls instruction execution', 'control'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Control Unit "executes" instructions like the ALU does, thinking the CU performs the actual addition or.' }
          ],
            remediations: { 'the-control-unit-executes-instructions': { steps: ['Draw a simple CPU datapath diagram on the board: PC → MAR → Memory → MDR → IR → CU (decoder) → control lines → ALU ←.', 'Give a concrete instruction `ADD R1, R2` and ask: "Which block puts the address on the bus?" (PC→MAR) "Which block.', 'Have the student trace the same instruction on the diagram, pointing to each block and saying its action aloud.', 'Contrast with a microcontroller (node c11_cs_cbse_01_005 forward link) where CU and ALU are on same chip but still.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_009', difficulty: 'standard',
          question: 'An operating system (OS) is a system software that acts as a resource manager,.',
          hint: 'Revisit c11_cs_cbse_01_002 (hardware components) and c11_cs_cbse_01_008 (system vs.',
          misconception: 'Students believe the operating system "is" the graphical interface they see (desktop, icons, start menu), and that.',
          parts: [
                { id: 'a', prompt: 'What are the two primary objectives of an operating system as stated in the NCERT textbook?', answer: 'The two primary objectives are: (1) to provide services for building and running',
                  options: ['The two primary objectives are: (1) to provide services for building and running', 'to make the computer fast', 'to store files'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the operating system "is" the graphical interface they see (desktop, icons, start menu), and that without a GUI there is.' }
          ],
            remediations: { 'the-operating-system-is-the': { steps: ['Show the student a headless Linux server (e.g., Raspberry Pi via SSH) — no monitor, no GUI — and demonstrate running.', 'Ask: "What is managing the CPU right now if there\'s no desktop?" Guide them to identify the kernel.', 'Draw a layered diagram: Hardware → Kernel (process, memory, file, device managers) → Shell (CLI/GUI) → Applications.', 'Emphasise the kernel runs regardless of shell.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_010', difficulty: 'standard',
          question: 'Bootstrapping is the self-initiated process where a computer loads the.',
          hint: 'Revisit the memory units node (c11_cs_cbse_01_006) to clarify RAM vs ROM, and the CPU.',
          misconception: 'Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are identical because both.',
          parts: [
                { id: 'a', prompt: 'A user reports that after a sudden power loss, their computer takes longer to start and shows a "Press F1 to continue" message.', answer: 'This is a cold boot triggered by power loss',
                  options: ['This is a cold boot triggered by power loss', 'OS corruption', 'Restart'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are identical because both reload the OS.' }
          ],
            remediations: { 'restart-warm-boot-and-shut': { steps: ['Ask the student to physically observe a cold boot (from power-off) and a warm boot (Restart) on the same machine,.', 'Then have them list the steps that appeared in cold boot but not in warm boot.', 'Finally, connect each missing step to the firmware\'s decision to skip hardware re-initialization when a warm boot flag.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are identical because both.',
          parts: [
                { id: 'a', prompt: 'Design a flowchart that a technician could use to diagnose whether a boot failure occurs during POST, bootloader stage, or kernel loading.', answer: 'A good flowchart starts with "Power on → Observe beep codes/LEDs"',
                  options: ['A good flowchart starts with "Power on → Observe beep codes/LEDs"', 'Restart', 'Shut down → Power on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Restart" (warm boot) and "Shut down → Power on" (cold boot) are identical because both reload the OS.' }
          ],
            remediations: { 'restart-warm-boot-and-shut': { steps: ['Ask the student to physically observe a cold boot (from power-off) and a warm boot (Restart) on the same machine,.', 'Then have them list the steps that appeared in cold boot but not in warm boot.', 'Finally, connect each missing step to the firmware\'s decision to skip hardware re-initialization when a warm boot flag.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
