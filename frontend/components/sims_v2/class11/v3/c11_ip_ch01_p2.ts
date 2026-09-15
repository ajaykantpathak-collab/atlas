import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch01_p2: SimDef = {
    id: 'v3_c11_ip_ch01_p2',
    title: 'Computer System and Organisation · Part 2/2',
    subtitle: 'Prove a phone is a computer — and that the CPU isn\'t one.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Computer System and Organisation · Part 2/2',
    chapters: ['c11_ip_ch01'],
    nodeIds: ['c11_ip_cbse_01_007', 'c11_ip_cbse_01_008', 'c11_ip_cbse_01_009', 'c11_ip_cbse_01_010', 'c11_ip_cbse_01_011', 'c11_ip_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a buyer decoding a spec sheet honestly', intro: 'i5, 16GB, SSD, Windows, Office — which lines are hardware you can touch and which are code that makes the touchable parts work?', goal: 'Define a computer system and separate hardware, system software and application software.' },
    discovery: {
        question: '\'A smartphone isn\'t a computer system — no separate CPU, keyboard or monitor.\' True?',
        options: ['False — the SoC carries CPU and memory, the touchscreen is input and output, and an OS runs the apps; the shape differs, the architecture doesn\'t', 'True — computers need a cabinet and keyboard', 'True — phones only run apps, not programs', 'False — but only because phones have cameras'],
        answer: 'False — the SoC carries CPU and memory, the touchscreen is input and output, and an OS runs the apps; the shape differs, the architecture doesn\'t',
        hook: 'And the CPU isn\'t the computer either — it\'s one organ in a system of input, process, storage and output, like a scanner beeping a library book in.',
    },
    teaching: [
        { title: 'Secondary Storage Devices: HDD, SSD, CD, DVD and Pen Drive', text: 'Secondary storage devices are non-volatile, high-capacity auxiliary memory units that permanently store data and programs for future use, which cannot be directly accessed by the CPU and must first.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map a barcode-scanner book issue onto input-process-output, then choose between a fast-CPU/8GB and slow-CPU/32GB laptop for a 20GB dataset.',
        labels: ['Secondary Storage Devices: HDD,', 'System Software vs Application', 'Operating System: Functions', 'Number Systems: Binary, Octal', 'Conversion Between Decimal, Binary,', 'Boolean Logic: Truth Values'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_01_007', title: 'Secondary Storage Devices: HDD, SSD, CD, DVD and Pen Drive',
          scaffold: { problem: 'A school computer lab has 30 PCs. Each needs: OS (50 GB), educational software (30 GB), student project space (20 GB).',
            steps: [
            { text: 'Calculate required storage per PC: 50 + 30 + 20 = 100 GB minimum.' },
            { text: 'Compute Option A total cost: 30 × ₹2,200 = ₹66,000.' },
            { text: 'Compute Option B total cost per PC: ₹3,500 + ₹1,500 = ₹5,000. For 30 PCs: 30 × ₹5,000 = ₹1,50,000.' },
            { text: 'Compare with budget ₹1,50,000: Option A (₹66,000) fits with ₹84,000 surplus; Option B (₹1,50,000) exactly exhausts.' },
            { text: 'Analyze performance: Option A — all data on SSD (fast boot, fast app launch, fast file access).' },
            { text: 'Consider reliability: Option A has no moving parts (better for student handling). Option B has HDD (fragile).' },
            { text: 'Final recommendation: Option A — lower cost, better performance, higher durability, leaves budget for other peripherals.', faded: true, blankAnswer: 'Option A (30 × 256 GB SSD) at ₹66,000 total — fits budget.' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_008', title: 'System Software vs Application Software with Examples',
          caseStudy: { intro: 'Imagine you press the power button on your laptop — the screen shows a logo, then a login screen appears, and only after you log in can you open Chrome or.',
            decisions: [{ prompt: 'Define system software and give two examples with their specific functions in a computer system.', options: [
                { text: 'System software is a set of programs that directly manages computer hardware and provides', outcome: 'System software is a set of programs that directly manages computer hardware and provides.' },
                { text: 'MS Word is system software', outcome: 'Not quite — Students believe "System Software = Operating System only" and forget system utilities (disk.', reveals: 'system-software-operating-system-only' },
                { text: 'System Software = Operating System only', outcome: 'Not quite — Students believe "System Software = Operating System only" and forget system utilities (disk.', reveals: 'system-software-operating-system-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_009', title: 'Operating System: Functions and Common Types',
          caseStudy: { intro: 'Imagine you walk into a busy restaurant (the computer) with many customers (users/applications), tables (memory), waiters (CPU cores), and a kitchen (storage).',
            decisions: [{ prompt: '**REMEMBER**: State the five core management functions of an Operating System as per the NCERT Class 11 curriculum.', options: [
                { text: 'The five core functions are: (1) Process Management, (2) Memory Management, (3) File', outcome: 'The five core functions are: (1) Process Management, (2) Memory Management, (3) File Management.' },
                { text: 'GUI provision', outcome: 'Not quite — **Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the.', reveals: 'misconception-the-operating-system-is' },
                { text: 'internet browsing', outcome: 'Not quite — **Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the.', reveals: 'misconception-the-operating-system-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_010', title: 'Number Systems: Binary, Octal and Hexadecimal Representations',
          caseStudy: { intro: 'Imagine you are writing a secret code using only two symbols: ● and ○. How many different messages can you send with 3 symbols? With 4?',
            decisions: [{ prompt: 'What are the valid digits in the hexadecimal number system, and what decimal value does the digit \'C\' represent?', options: [
                { text: 'Valid digits: 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F', outcome: 'Valid digits: 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F. \'C\' represents decimal 12.' },
                { text: 'base-8 means digits 0-8', outcome: 'Not quite — Students often believe that the base of a number system equals the highest digit (e.g., "base-8.', reveals: 'the-base-of-a-number' },
                { text: 'base-8', outcome: 'Not quite — Students often believe that the base of a number system equals the highest digit (e.g., "base-8.', reveals: 'the-base-of-a-number' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_012', title: 'Boolean Logic: Truth Values and Basic Logical Operations',
          caseStudy: { intro: 'Imagine you are designing a smart home system where the porch light turns on ONLY if (it is dark outside) AND (motion is detected OR the manual switch is ON).',
            decisions: [{ prompt: 'What are the two possible truth values in Boolean logic and their standard numeric representations?', options: [
                { text: 'The two truth values are TRUE (represented as 1) and FALSE (represented as 0)', outcome: 'The two truth values are TRUE (represented as 1) and FALSE (represented as 0).' },
                { text: 'YES/NO', outcome: 'Not quite — Students treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, leading.', reveals: 'students-treat-boolean-and-exactly' },
                { text: 'ON/OFF', outcome: 'Not quite — Students treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, leading.', reveals: 'students-treat-boolean-and-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping a junior buy a laptop for Class 11 projects, you hear the shopkeeper say \'this CPU comes with 16 GB RAM and Windows\' — and the junior asks: \'Isn\'t the CPU the whole computer? And Windows is an app since I click it, right?\'',
            decisions: [{ prompt: 'How do you sort the parts correctly?', options: [
                { text: 'Draw the system boundaries: the CPU is one component — the computer system is CPU + memory + input/output + storage running software. On the spec sheet, touchable items (processor, RAM, SSD, screen, keyboard) are hardware; code (Windows, Office) is software — and Windows is SYSTEM software managing hardware for other programs, not an application, even though you click its icons.', outcome: 'He stops conflating the part with the whole: a computer system is hardware orchestrated by software through the input-process-output cycle.' },
                { text: 'Let \'CPU = computer\' pass — it\'s the box everything connects to, close enough.', outcome: 'That collapses five system blocks into one: asked for \'components of a computer system\', you\'d list ALU and registers instead of the actual architecture.', reveals: 'cpu-equals-computer' },
                { text: 'Classify Windows as application software — the user interacts with it directly like Office.', outcome: 'Interactivity isn\'t the test: the OS manages hardware and serves other software — without that layer, apps can\'t reach the machine at all.', reveals: 'os-is-application-software' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'A fast brain with a tiny desk loses to a slower brain with a big one — RAM is where the data must sit while the CPU works.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_007', difficulty: 'standard',
          question: 'Secondary storage devices are non-volatile, high-capacity auxiliary memory.',
          hint: 'Revisit Node 006 (Primary Memory) — specifically the RAM vs ROM comparison table and the.',
          misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup).',
          parts: [
                { id: 'a', prompt: 'You have a 2 TB HDD (₹4,500) and a 1 TB SSD (₹5,500). A video editor needs 1.5 TB for raw footage (sequential read/write) and 200 GB for OS + editing software.', answer: 'Allocate OS + software (200 GB) to SSD for fast random access (boot, app launch)',
                  options: ['Allocate OS + software (200 GB) to SSD for fast random access (boot, app launch)', 'SSD is always better than HDD', 'Buy 4 TB SSD for backup', '"SSD is always better than HDD" and recommend SSD for bulk archival (e'],
                  hint: 'Revisit Node 006 (Primary Memory) — specifically the RAM vs ROM comparison table and the "Think and.',
                  misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup) ignoring cost per.' }
          ],
            remediations: { 'ssd-is-always-better-than': { steps: ['Have the student calculate cost per GB for current market prices of 1 TB HDD, 1 TB SATA SSD, 1 TB NVMe SSD, 16 GB pen.', 'Give three workloads: (a) OS boot drive, (b) 5 TB video archive, (c) 8 GB file transfer between air-gapped PCs.', 'Ask them to pick one device per workload and justify using ₹/GB, speed requirement, portability.', 'Reveal the optimal mapping: (a) NVMe SSD, (b) HDD, (c) pen drive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup).',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since RAM is volatile and SSD is non-volatile, we should replace RAM with SSD to make computers simpler and cheaper." Use the.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'SSD is always better than HDD', 'Buy 4 TB SSD for backup', '"SSD is always better than HDD" and recommend SSD for bulk archival (e'],
                  hint: 'Revisit Node 006 (Primary Memory) — specifically the RAM vs ROM comparison table and the "Think and.',
                  misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup) ignoring cost per.' },
                { id: 'b', prompt: 'Design a 3-device storage strategy for a freelance photographer who: (a) shoots 50 GB RAW photos per wedding, (b) edits on a laptop, (c) delivers final 10.', answer: 'Device 1: 1 TB NVMe SSD (laptop internal)',
                  options: ['Device 1: 1 TB NVMe SSD (laptop internal)', 'SSD is always better than HDD', 'Buy 4 TB SSD for backup', '"SSD is always better than HDD" and recommend SSD for bulk archival (e'],
                  hint: 'Revisit Node 006 (Primary Memory) — specifically the RAM vs ROM comparison table and the "Think and.',
                  misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup) ignoring cost per.' }
          ],
            remediations: { 'ssd-is-always-better-than': { steps: ['Have the student calculate cost per GB for current market prices of 1 TB HDD, 1 TB SATA SSD, 1 TB NVMe SSD, 16 GB pen.', 'Give three workloads: (a) OS boot drive, (b) 5 TB video archive, (c) 8 GB file transfer between air-gapped PCs.', 'Ask them to pick one device per workload and justify using ₹/GB, speed requirement, portability.', 'Reveal the optimal mapping: (a) NVMe SSD, (b) HDD, (c) pen drive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_008', difficulty: 'standard',
          question: 'System software is a collection of programs that directly manages and controls.',
          hint: 'Revisit c11_ip_cbse_01_002 (Components of a Computer System) to reinforce the.',
          misconception: 'Students believe "System Software = Operating System only" and forget system utilities (disk cleanup, antivirus, backup.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'System software is a collection of programs that directly manages and controls computer',
                  options: ['System software is a collection of programs that directly manages and controls computer', 'A computer is a programmable electronic device that accepts data (input), processes it', 'A computer system is an integrated set of physical components (hardware) and instruction', 'An input device is a hardware component that enables users to send data, commands, or'],
                  hint: 'Revisit c11_ip_cbse_01_002 (Components of a Computer System) to reinforce the hardware/software.',
                  misconception: 'Students believe "System Software = Operating System only" and forget system utilities (disk cleanup, antivirus, backup tools) and device.' }
          ],
            remediations: { 'system-software-operating-system-only': { steps: ['Draw a three-layer diagram on paper: Hardware (bottom) → System Software (middle) → Application Software (top).', 'Place "Windows OS," "Printer Driver," "Disk Defragmenter" in the middle layer; place "MS Word," "Notepad," "Chrome,".', 'For each item, ask: "Does this directly control hardware?" If yes → System.', 'Practice with 10 mixed examples until classification is instant. The key is the decision question, not memorized lists.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_009', difficulty: 'standard',
          question: 'An Operating System (OS) is a system software that acts as an interface between.',
          hint: 'If stuck, revisit **c11_ip_cbse_01_008 (System Software vs Application Software)**.',
          misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain in your own words why an Operating System is called a "Resource Manager".', answer: 'The OS is a resource manager',
                  options: ['The OS is a resource manager', 'the printer decides', 'the applications talk to each other', 'If I uninstall the desktop theme, I have uninstalled the OS'],
                  hint: 'If stuck, revisit **c11_ip_cbse_01_008 (System Software vs Application Software)** to clarify the.',
                  misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and start menu." **Why.' }
          ],
            remediations: { 'misconception-the-operating-system-is': { steps: ['**Step 1**: Show a headless Linux server (e.g., Raspberry Pi via SSH) running `htop` — no GUI, but processes, memory.', 'Ask: "Where is the OS?" **Step 2**: Use Task Manager (Windows) / System Monitor (Linux) → "Details" tab → highlight.', '**Step 4**: Assign: "Draw the layered architecture: Hardware → Kernel (Scheduler, VFS, Drivers) → System Libraries →.', 'Label where \'Windows 11\' brand lives (marketing layer) vs where the OS lives (kernel layer)."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_010', difficulty: 'standard',
          question: 'A number system is a mathematical notation for representing numbers using a set.',
          hint: 'Revisit expanded form of decimal numbers (Class 6 Place Value) and the meaning of base.',
          misconception: 'Students often believe that the base of a number system equals the highest digit (e.g., "base-8 means digits 0-8").',
          parts: [
                { id: 'a', prompt: 'What are the valid digits in the hexadecimal number system, and what decimal value does the digit \'C\' represent?', answer: 'Valid digits: 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F',
                  options: ['Valid digits: 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F', 'base-8 means digits 0-8', 'base-8', '\'C\' is 11 or listing digits up to G'],
                  hint: 'Revisit expanded form of decimal numbers (Class 6 Place Value) and the meaning of base and exponent.',
                  misconception: 'Students often believe that the base of a number system equals the highest digit (e.g., "base-8 means digits 0-8").' },
                { id: 'b', prompt: 'A student writes the octal number 78. Explain why this is invalid and what the student likely misunderstood about the octal system.', answer: 'Octal digits are only 0-7',
                  options: ['Octal digits are only 0-7', 'base-8 means digits 0-8', 'base-8', 'the base of a number system equals the highest digit (e'],
                  hint: 'Revisit expanded form of decimal numbers (Class 6 Place Value) and the meaning of base and exponent.',
                  misconception: 'Students often believe that the base of a number system equals the highest digit (e.g., "base-8 means digits 0-8").' },
                { id: 'c', prompt: 'Write the positional weights (place values) for the first five positions (from right to left, starting at position 0) in the binary, octal, and hexadecimal.', answer: 'Binary: 2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16',
                  options: ['Binary: 2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16', 'base-8 means digits 0-8', 'base-8', 'the base of a number system equals the highest digit (e'],
                  hint: 'Revisit expanded form of decimal numbers (Class 6 Place Value) and the meaning of base and exponent.',
                  misconception: 'Students often believe that the base of a number system equals the highest digit (e.g., "base-8 means digits 0-8").' },
                { id: 'd', prompt: 'Compare the binary number 1011 and the hexadecimal number B. Are they equal in value? Justify your answer by expanding both in powers of their respective bases.', answer: 'Yes, they are equal',
                  options: ['Yes, they are equal', 'base-8 means digits 0-8', 'base-8', 'the base of a number system equals the highest digit (e'],
                  hint: 'Revisit expanded form of decimal numbers (Class 6 Place Value) and the meaning of base and exponent.',
                  misconception: 'Students often believe that the base of a number system equals the highest digit (e.g., "base-8 means digits 0-8").' }
          ],
            remediations: { 'the-base-of-a-number': { steps: ['Have the student count aloud in decimal: "0,1,2,3,4,5,6,7,8,9,10" and identify that after 9 we carry because we ran out.', 'Ask: "If we only had digits 0-7, what would come after 7?" Force them to write \'10\' and explain it means "one group.', 'Use physical counters: group 8 beads into a cup, show that the cup represents the next position.', 'Explicitly state the rule: "For base b, valid digits are 0 to b-1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_011', difficulty: 'standard',
          question: 'Conversion between number systems is the process of representing a given.',
          hint: 'Revisit c11_ip_cbse_01_010 (Number Systems Representation) and c6_math_ch01_003 (Place.',
          misconception: 'Students often treat the binary point (radix point) differently from the decimal point, believing that fractional.',
          parts: [
                { id: 'a', prompt: 'Explain why the repeated-division-by-2 method for decimal-to-binary conversion produces the correct binary digits in reverse order (LSB first).', answer: 'Correct explanation: Each division by 2 yields a remainder of 0 or 1',
                  options: ['Correct explanation: Each division by 2 yields a remainder of 0 or 1', 'it\'s just a rule', 'we divide by 2 because binary is base 2'],
                  hint: 'Revisit c11_ip_cbse_01_010 (Number Systems Representation) and c6_math_ch01_003 (Place Value).',
                  misconception: 'Students often treat the binary point (radix point) differently from the decimal point, believing that fractional conversion "stops" when.' },
                { id: 'b', prompt: 'A student converts octal `73.4` to binary by writing each octal digit as a 3-bit group: `111 011 . 100` → `111011.100`.', answer: 'Yes, both are equivalent: `111011.100` = `111011.1`',
                  options: ['Yes, both are equivalent: `111011.100` = `111011.1`', 'they are different'],
                  hint: 'Revisit c11_ip_cbse_01_010 (Number Systems Representation) and c6_math_ch01_003 (Place Value).',
                  misconception: 'Students often treat the binary point (radix point) differently from the decimal point, believing that fractional conversion "stops" when.' }
          ],
            remediations: { 'students-often-treat-the-binary': { steps: ['Have the student write the positional weight table for a 4-bit binary number (8,4,2,1) and a 3-bit group (4,2,1).', 'Practice padding with leading zeros on the integer side and trailing zeros on the fractional side using a place-value.', 'Use the "reverse conversion" check: convert the result back to the original base; if it doesn\'t match, the grouping.', 'For fractional non-termination, demonstrate 0.1₁₀ → binary (0.000110011...) and explain that just as 1/3 doesn\'t.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_012', difficulty: 'standard',
          question: 'Boolean logic is a branch of algebra where variables take only two truth.',
          hint: 'If stuck, revisit binary counting (c11_ip_cbse_01_010) to relist all 3-bit patterns 000.',
          misconception: 'Students treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, leading to errors like 1+1=2.',
          parts: [
                { id: 'a', prompt: 'What are the two possible truth values in Boolean logic and their standard numeric representations?', answer: 'The two truth values are TRUE (represented as 1) and FALSE (represented as 0)',
                  options: ['The two truth values are TRUE (represented as 1) and FALSE (represented as 0)', 'YES/NO', 'ON/OFF'],
                  hint: 'If stuck, revisit binary counting (c11_ip_cbse_01_010) to relist all 3-bit patterns 000 to 111.',
                  misconception: 'Students treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, leading to errors like 1+1=2, 1·1=1 (correct.' },
                { id: 'b', prompt: 'Explain in your own words why the truth table for the OR operation has three rows with output 1 and only one row with output 0.', answer: 'OR outputs 1 whenever at least one input is 1',
                  options: ['OR outputs 1 whenever at least one input is 1', 'OR means addition so 1+1=2'],
                  hint: 'If stuck, revisit binary counting (c11_ip_cbse_01_010) to relist all 3-bit patterns 000 to 111.',
                  misconception: 'Students treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, leading to errors like 1+1=2, 1·1=1 (correct.' },
                { id: 'c', prompt: 'Compare the truth tables of (A · B)\' and A\' + B\'. Are they identical? What does this imply?', answer: 'Yes, they are identical',
                  options: ['Yes, they are identical', 'they are different'],
                  hint: 'If stuck, revisit binary counting (c11_ip_cbse_01_010) to relist all 3-bit patterns 000 to 111.',
                  misconception: 'Students treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, leading to errors like 1+1=2, 1·1=1 (correct.' }
          ],
            remediations: { 'students-treat-boolean-and-exactly': { steps: ['Explicitly contrast arithmetic vs Boolean for each symbol: show 1+1=2 (arithmetic) vs 1+1=1 (Boolean) using a truth.', 'Drill precedence with coloured brackets: compute NOT first (innermost), then AND, then OR.', 'Have students build a 3-variable truth table from scratch for (A+B\')·C, writing intermediate columns for B\', (A+B\').', 'Use the "light switch" analogy: OR is parallel switches (any ON lights bulb), AND is series switches (all must be ON).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
