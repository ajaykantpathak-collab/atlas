## DEFINITION
A battery is a combination of two or more electric cells connected together to provide a higher total voltage and sustained electric current to a circuit. The standard unit for measuring the total potential difference or voltage supplied by a battery is the Volt (V).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can correctly connect two or more electric cells in series (positive terminal of one connected to the negative terminal of the next) to light up a bulb requiring higher voltage, and can calculate the total voltage by summing individual cell voltages.
## SCOPE_BOUNDARY
Covers the principle of combining multiple standard dry cells in series to form a battery and calculating total voltage, but does not cover complex electrochemical reactions or secondary rechargeable battery chemistry.
## WALKTHROUGH
When you look inside a TV remote control or a large wall clock, you notice that multiple cylindrical electric cells are placed end-to-end rather than just a single cell. If you examine the metal springs and flat contacts inside the battery compartment, you will see how the positive metal cap of one cell touches the negative flat base of the adjacent cell. Building upon how a single electric cell pushes current through a simple circuit, combining them increases the electrical push or voltage available to the components. To understand how they work together, we must observe the alignment of the terminals and trace the path of the current from cell to cell. Ultimately, the total voltage of the battery is the algebraic sum of the individual cell voltages when connected properly in series.
## DIAGNOSTIC_QUESTION_1
What is the standard SI unit used to measure the voltage supplied by an electric cell or a battery?
## DIAGNOSTIC_ANSWER_1
The correct unit is the Volt (V). A wrong answer usually confuses voltage with electric current (measured in Amperes) or electrical resistance (measured in Ohms), showing a failure to link physical quantities to their correct measuring units.
## DIAGNOSTIC_QUESTION_2
Why must the positive terminal of one electric cell be connected to the negative terminal of the next cell when forming a battery, rather than connecting positive to positive?
## DIAGNOSTIC_ANSWER_2
Connecting positive to negative ensures that the electrical pushes of the individual cells add up to increase the total voltage. If positive is connected to positive, their opposing voltages will cancel each other out, resulting in zero net voltage for the circuit. A wrong answer shows a lack of understanding of polarity and how potentials combine in series.
## DIAGNOSTIC_QUESTION_3
If a single dry cell has a voltage of 1.5 V, what will be the total voltage of a battery made by connecting 3 such identical cells in a proper series combination?
## DIAGNOSTIC_ANSWER_3
The correct answer is 4.5 V. 
Steps: 
1. Identify the voltage of one cell: $V_1 = 1.5\text{ V}$.
2. Identify the number of cells connected in series: $n = 3$.
3. Apply the series voltage addition rule: $\text{Total Voltage} = V_1 \times n$.
4. Compute: $1.5\text{ V} \times 3 = 4.5\text{ V}$.
A wrong answer, such as 1.5 V or multiplying incorrectly, reveals that the student does not understand how voltages accumulate in a series cell combination.
## DIAGNOSTIC_QUESTION_4
A torchlight requires 3.0 V to glow brightly, but you only have cells that provide 1.5 V each. How many cells must you use, and how must they be arranged to make the torchlight work?
## DIAGNOSTIC_ANSWER_4
You must use 2 cells connected in series, where the positive terminal of the first cell touches the negative terminal of the second cell. A wrong answer indicates confusion about how multiple cells are combined to meet the required operating voltage of an electrical appliance.
## DIAGNOSTIC_QUESTION_5
Suppose a student connects four 1.5 V cells in a battery holder, but accidentally inserts one cell facing backward (positive touching positive). What will be the effective total voltage of this 4-cell battery pack?
## DIAGNOSTIC_ANSWER_5
The effective total voltage will be 3.0 V. 
Reasoning: Three cells pointing in the correct direction give $3 \times 1.5\text{ V} = 4.5\text{ V}$, but the one backward cell subtracts $1.5\text{ V}$, leaving $4.5\text{ V} - 1.5\text{ V} = 3.0\text{ V}$. A wrong answer shows that the student fails to account for opposing polarities cancelling out individual cell potentials.
## DIAGNOSTIC_QUESTION_6
Design a simple setup using standard household items to test whether a homemade battery of three lemon cells can light up a small LED, explaining the exact arrangement of the copper and zinc electrodes.
## DIAGNOSTIC_ANSWER_6
The setup requires three lemons, three copper strips, and three zinc strips. Insert one copper and one zinc strip into each lemon. Connect the copper strip of lemon 1 to the zinc strip of lemon 2, and the copper strip of lemon 2 to the zinc strip of lemon 3. Finally, connect the remaining free copper and zinc ends to the LED terminals, ensuring correct polarity. A poor answer lacks the correct alternating series connection between dissimilar metals of adjacent cells.
## COMMON_MISCONCEPTION
Students often believe that adding more cells to a battery increases the physical size of the current automatically without needing a closed path, or they think that placing cells side-by-side (parallel without proper holders) increases voltage just because there are more cells present. In reality, voltage only increases when cells are connected in series (positive to negative), and current only flows when a complete closed circuit path is established through conductors.
## ON_FAILURE
To fix this misconception, take two 1.5 V cells and connect them in various ways: first side-by-side with no wire contact, then positive-to-positive, and finally positive-to-negative in a battery holder connected to a small bulb. Observe that the bulb only lights up brightly when the positive-to-negative series arrangement is used. This tactile experiment proves that proper terminal alignment is essential for combining voltages.
## PREREQUISITE_NODE_IDS
c6_physics_ch03_011, c6_physics_ch03_016, c7_physics_ch02_003
## PREREQUISITE_REASONS
c6_physics_ch03_011: Understanding torchlight parts helps students visualize how multiple cells fit inside a real device.
c6_physics_ch03_016: Basic knowledge of electric cells and batteries from Class 6 provides the foundation for series combinations.
c7_physics_ch02_003: Detailed study of an individual electric cell as a source of current is required before combining multiple cells.
## FORWARD_NODE_IDS
c7_physics_ch02_005, c7_physics_ch02_006, c8_physics_ch2_11
## FORWARD_REASONS
c7_physics_ch02_005: Combining cells into a battery provides the necessary higher voltage required to test and run electric lamps.
c7_physics_ch02_006: Building simple circuits requires understanding how the power source (battery) connects to other circuit components.
c8_physics_ch2_11: Explains how cells are combined into batteries, relevant for comparing packs of primary vs secondary cells.

## CROSS_SUBJECT_PREREQS
c6_physics_ch03_012
## CROSS_SUBJECT_REASONS
c6_physics_ch03_012: Building simple electrical circuits is essential for integrating a multi-cell battery into a working system.
## CHAIN_DESCRIPTION
c7_physics_ch02_003 -> c7_physics_ch02_004 -> c7_physics_ch02_006
## THIS_FORMULA
V_total = V_1 + V_2 + V_3 + ... (V)
## FORMULA_VARIABLES
V_total = total voltage of the battery in Volts (V), V_1, V_2, V_3 = individual voltages of the connected cells in Volts (V)
## FORMULA_UNITS
V (Volts)
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c7_physics_ch02_003 | Connects individual cell voltage properties to multi-cell battery systems.
c6_physics_ch03_016 | Builds directly upon the introductory concepts of electric cells and batteries.
## PREREQ_CONCEPT
An electric cell has a positive and negative terminal and provides a specific potential difference measured in Volts.
## PREREQ_BEFORE
Students must be able to identify the positive and negative terminals of a single dry cell.
## PREREQ_STUCK
Review node c7_physics_ch02_003 to master the structure and terminal identification of a single electric cell.
## WORKED_EXAMPLE_1
PROBLEM: A student is assembling a science project toy car in Delhi that requires a power source of 6.0 V. If each standard dry cell provides 1.5 V, how many cells must the student connect in series, and what is the mathematical proof of the total voltage?
STEPS:
- Step 1: Identify the required total voltage ($V_{\text{total}} = 6.0\text{ V}$) and the voltage of a single cell ($V_1 = 1.5\text{ V}$).
- Step 2: Identify the formula for cells in series: $V_{\text{total}} = n \times V_1$, where $n$ is the number of cells.
- Step 3: Rearrange to find the number of cells: $n = \frac{V_{\text{total}}}{V_1}$.
- Step 4: Substitute the given values with units: $n = \frac{6.0\text{ V}}{1.5\text{ V}}$.
- Step 5: Compute the result and verify physical reasonableness: $n = 4$ cells. Four cells connected in series will correctly supply 6.0 V.
REASONING: By dividing the total required voltage by the voltage of one individual cell, we determine how many energy-supplying units must be linked end-to-end. Each added cell contributes its 1.5 V potential difference cumulatively.
ANSWER: 4 cells
## WORKED_EXAMPLE_2
PROBLEM: In a school physics laboratory in Mumbai, a group of students connects five 1.5 V dry cells in a series battery holder to power a buzzer. Calculate the total voltage output of this battery pack.
STEPS:
- Step 1: Identify the number of cells ($n = 5$) and the voltage of each individual cell ($V = 1.5\text{ V}$).
- Step 2: Select the appropriate formula for series combination of cells: $V_{\text{total}} = V_1 + V_2 + V_3 + V_4 + V_5$.
- Step 3: Substitute the numerical values with their units: $V_{\text{total}} = 1.5\text{ V} + 1.5\text{ V} + 1.5\text{ V} + 1.5\text{ V} + 1.5\text{ V}$.
- Step 4: Perform the arithmetic addition while retaining the unit: $V_{\text{total}} = 5 \times 1.5\text{ V} = 7.5\text{ V}$.
- Step 5: Verify that 7.5 V is physically reasonable for five standard cells connected in series.
REASONING: When cells are connected in series with alternating terminals, their individual electric potentials add up directly, resulting in a higher combined voltage output.
ANSWER: 7.5 V
## WORKED_EXAMPLE_3
PROBLEM: A portable emergency lamp uses a battery pack consisting of four 1.5 V cells connected in series. Due to faulty handling, one of the cells is accidentally placed backwards (reversing its polarity). Calculate the net voltage output of this battery pack and explain the effect on the lamp.
STEPS:
- Step 1: Identify the total number of cells ($4$) and the voltage of each cell ($1.5\text{ V}$).
- Step 2: Determine the number of correctly aligned cells ($3$ cells) and incorrectly aligned cells ($1$ cell).
- Step 3: Calculate the voltage contributed by the correctly aligned cells: $3 \times 1.5\text{ V} = 4.5\text{ V}$.
- Step 4: Account for the reversed cell by subtracting its voltage: $1 \times 1.5\text{ V} = 1.5\text{ V}$.
- Step 5: Compute the net total voltage: $4.5\text{ V} - 1.5\text{ V} = 3.0\text{ V}$ with unit Volts.
REASONING: A reversed cell creates an opposing potential difference that cancels out the voltage of one of the properly oriented cells, thus reducing the total usable voltage available to the lamp.
ANSWER: 3.0 V
## COMPETENCY_QUESTION_1
QUESTION: A technician needs to design a 9.0 V power source using only standard 1.5 V dry cells. How many cells are required, and how should they be connected in the battery compartment?
COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Note the target voltage ($9.0\text{ V}$) and individual cell voltage ($1.5\text{ V}$).
- Step 2: Set up the equation $n \times 1.5\text{ V} = 9.0\text{ V}$.
- Step 3: Solve for $n$ by dividing $9.0$ by $1.5$, yielding $6$ cells.
- Step 4: Conclude that 6 cells must be connected in series, with the positive terminal of each cell touching the negative terminal of the next.
ANSWER: 6 cells connected in series, because $9.0\text{ V} / 1.5\text{ V} = 6$.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two identical battery packs are built using three 1.5 V cells each. Pack A has all three cells connected in proper series (+ to -, + to -). Pack B has two cells in series, but the third cell is connected backward (+ to +). Compare the total voltage outputs of Pack A and Pack B, and explain why a device connected to Pack B might fail to operate.
COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Calculate the voltage of Pack A: $1.5 + 1.5 + 1.5 = 4.5\text{ V}$.
- Step 2: Calculate the voltage of Pack B: $(1.5 + 1.5) - 1.5 = 1.5\text{ V}$.
- Step 3: Compare the outputs: Pack A outputs 4.5 V while Pack B outputs only 1.5 V.
- Step 4: Explain that if the device requires 4.5 V to operate, Pack B's voltage of 1.5 V will be insufficient, causing the device to fail.
ANSWER: Pack A provides 4.5 V, whereas Pack B provides only 1.5 V due to cancellation from the reversed cell. The device fails because 1.5 V is below its required operating voltage.
DIFFICULTY: hard
