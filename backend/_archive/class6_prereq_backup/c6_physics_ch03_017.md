## DEFINITION
A series circuit is an electrical arrangement where components are connected end-to-end, creating one single, continuous path for the electric current to flow. If this path is broken at any point, the entire circuit stops working because the current no longer has a complete loop to travel through.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student must be able to predict that removing or breaking one component in a series circuit will cause all other components in that loop to stop functioning, and explain why this happens by describing the path of the current.
## SCOPE_BOUNDARY
This node covers the definition, structure, and behavior of series circuits (path continuity and component dependency). It excludes resistance calculations, Kirchhoff's laws, parallel circuits, and AC power systems.
## WALKTHROUGH
Have you ever noticed a string of small decorative fairy lights where, if one bulb goes out, the whole string stops glowing? This happens because those bulbs are connected in series. To understand this, imagine a single-lane road where cars (the current) must pass through every gate (the components) one after another to complete their journey back to the start. If you close just one gate, no car can move forward because there is no side-road or alternative path. The key insight is that in a series circuit, every component relies on the one before it to keep the path open.
## DIAGNOSTIC_QUESTION_1
In a series circuit with three bulbs, what happens to the other two bulbs if you unscrew one of them?
## DIAGNOSTIC_ANSWER_1
The other two bulbs will immediately go off. A student who says "they stay on" fails to realize that the current path has been physically broken, preventing electricity from completing its loop.
## DIAGNOSTIC_QUESTION_2
Why is a series circuit considered to have only "one path" for electricity?
## DIAGNOSTIC_ANSWER_2
Because the wire connects the components in a single chain from one terminal of the battery to the other. A student who says "the battery only has one terminal" is confusing the path of the wire with the structure of the battery.
## DIAGNOSTIC_QUESTION_3
If you add a third bulb to a series circuit that already has two bulbs and one battery, what happens to the path of the current?
## DIAGNOSTIC_ANSWER_3
The current must now flow through three bulbs instead of two, but it still follows the same single, unbroken path. A student who thinks the current "splits" is incorrectly applying concepts from parallel circuits.
## DIAGNOSTIC_QUESTION_4
If a string of series-connected LED lights is completely dark, but the battery is new, what is the most likely reason?
## DIAGNOSTIC_ANSWER_4
There is a break in the circuit somewhere, such as a loose wire or a burnt-out bulb, which has stopped the flow of current. If a student suggests "the current is too tired," they are using non-scientific reasoning instead of understanding the necessity of a closed loop.
## DIAGNOSTIC_QUESTION_5
Is it better to connect house lights in series or in a different way? Why?
## DIAGNOSTIC_ANSWER_5
It is not better to connect house lights in series because if one light fails, the whole house would go dark. This shows that the student understands the practical limitation of series circuits: the dependency of all parts on each other.
## DIAGNOSTIC_QUESTION_6
Design a simple mental "map" of a series circuit using a battery, a switch, and two bulbs.
## DIAGNOSTIC_ANSWER_6
The map should show a loop starting at the battery, going through the switch, through bulb 1, then bulb 2, and returning to the battery. A poor answer would show multiple loops or branches, which describes a parallel circuit.
## COMMON_MISCONCEPTION
Students often think that electricity "gets used up" as it travels through each bulb, causing them to believe the first bulb is brighter than the last. In reality, the current is the same throughout the series loop; the bulbs are equally bright (if identical), but they all dim as more are added because the total energy from the battery is shared.
## ON_FAILURE
First, ask the student to draw a single loop of string representing the wire. Then, ask them to place paper clips at two points on the string to represent bulbs. Tell them to cut the string at one clip and ask, "Can the string still form a circle?" Explain that electricity needs a complete, unbroken circle to flow, and since the string is now open, the flow stops.
## BUILDS_ON
Closed circuits and the role of the battery as a source of energy.
## LEADS_TO
Parallel circuits and the concept of voltage division.

## FORWARD_NODE_IDS
c8_physics_ch2_4, c8_physics_ch2_6, c8_physics_ch2_9
## FORWARD_REASONS
c8_physics_ch2_4: Series circuits knowledge explains how adding cells increases voltage/current.
c8_physics_ch2_6: Series circuits concept helps later when comparing heat in series vs parallel.
c8_physics_ch2_9: Establishes that in a series circuit the same current flows through all components, justifying why the fuse must be in series.

## CHAIN_DESCRIPTION
Closed circuits -> Series circuits -> Parallel circuits.
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
conceptual
## CROSS_SUBJECT

## PREREQ_CONCEPT
The concept of a complete, closed circuit loop.
## PREREQ_BEFORE
Ability to identify the positive and negative terminals of a battery.
## PREREQ_STUCK
Review the basic components of a circuit (battery, wire, switch, bulb).
## WORKED_EXAMPLE_1
PROBLEM: A student connects a 9V battery to a switch and two identical bulbs in series. What happens if the switch is opened?
STEPS:
- Identify the state of the circuit: The switch is a component that opens or closes the path.
- Analyze the condition: An open switch creates a gap in the path.
- Apply the rule: A series circuit requires a single, unbroken loop.
- Interpret the result: The gap prevents current flow.
- Conclusion: Both bulbs stop glowing immediately.
REASONING: Since all components are in one path, an open switch breaks the continuity for the entire loop, effectively disconnecting the battery from the bulbs.
ANSWER: Both bulbs go off because the circuit is no longer a complete, closed loop.
## WORKED_EXAMPLE_2
PROBLEM: Three bulbs are in series. If one bulb is removed, what happens to the remaining two?
STEPS:
- Observe the arrangement: Components are in a single line (series).
- Identify the change: One component is removed, creating a physical gap.
- Apply the rule: Current cannot jump across the gap.
- Conclude: The path is broken.
- Result: The circuit fails.
REASONING: In a series circuit, every component serves as a bridge for the current; removing one removes the bridge, stopping the flow to all others.
ANSWER: The remaining two bulbs stop glowing.
## WORKED_EXAMPLE_3
PROBLEM: A student claims that in a series circuit, the bulb closest to the battery is brighter than the one farthest away. Is this true?
STEPS:
- Recall the rule: In a series circuit, the current follows one path.
- Measure/Verify: The current passing through point A (near battery) is the same as point B (far from battery).
- Evaluate the claim: Brightness depends on the current.
- Conclusion: If the current is the same, the brightness is the same.
- Final judgment: The claim is false.
REASONING: Because there are no branches or side-paths, the amount of charge moving per second (current) must be identical throughout the entire loop.
ANSWER: False; the bulbs will have the same brightness because the current is the same at every point.
## COMPETENCY_QUESTION_1
QUESTION: You have a battery, two switches, and two bulbs. Can you connect them in series so that each switch controls its own bulb?
COMPETENCY: Error identification and correction
STEPS:
- Understand series structure: Everything is in one loop.
- Test the condition: If switch A is in the loop with bulb 1 and 2, opening it turns off both.
- Analyze the request: The request asks for independent control.
- Conclusion: This is impossible in a simple series circuit.
ANSWER: No, you cannot. In a series circuit, every component is in the same path, so any switch placed in that path will control the current to every single bulb in that loop.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Imagine a series circuit with 4 bulbs. If you add a 5th bulb, what happens to the brightness of the existing 4 bulbs?
COMPETENCY: Comparing and justifying
STEPS:
- Analyze the load: Each bulb takes a share of the battery's energy.
- Apply the concept: Adding more components increases the total work the battery must do to push the same current.
- Conclude: The total energy is distributed among more bulbs.
- Result: Each bulb glows with less intensity.
ANSWER: The brightness of the existing bulbs will decrease. Because the battery has a limited capacity to push current, adding more bulbs in series increases the total difficulty for the current to flow, resulting in each bulb receiving less energy.
DIFFICULTY: hard
