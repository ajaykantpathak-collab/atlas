## ELI5
Tomatoes at 45.85 rupees a kilo, a ten-kilo bundle: no long multiplication is needed - the point simply walks. Multiply by ten and the point steps right once; by a hundred, twice; by a thousand, thrice. Division walks it left the same number of places. The walk works because each place value column is ten times its neighbour, so sliding the point re-dresses the same digits in bigger or smaller uniforms. Point-walking is the fastest arithmetic in the market.

## DEFINITION
Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by 1, 2, or 3 places respectively, while dividing by 10, 100, or 1000 shifts the decimal point to the left by 1, 2, or 3 places. This rule is derived from our base-10 place value system where each step to the left multiplies place value by 10 and each step to the right divides it by 10.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can quickly multiply and divide any given decimal number by powers of 10 (10, 100, 1000, etc.) by shifting the decimal point correctly without performing traditional long multiplication or division, handling cases where place-holding zeros must be added.
## SCOPE_BOUNDARY
Covers multiplication and division of finite decimals by positive powers of 10 (10, 100, 1000, 10000). Does not cover operations with negative exponents of 10 or standard scientific notation for very large numbers (which is reserved for higher classes).
## WALKTHROUGH
Imagine you are at the vegetable market buying tomatoes, and the shopkeeper tells you that 1 kg costs ₹45.85, but if you buy a bundle of 10 kg, the calculation changes. Instead of doing long multiplication, there is a clever pattern we can use based on our place value system. We already know from studying decimals that moving a digit one place to the left makes it 10 times larger. When we multiply a decimal by 10, 100, or 1000, we do not move the digits; instead, we shift the decimal point to the right because the value of each digit increases relative to the decimal marker. Conversely, when dividing by 10, 100, or 1000, we shift the decimal point to the left because the value decreases. The key insight is counting the number of zeros in 10, 100, or 1000, which tells you the exact number of decimal places to jump.

**Takeaway:** powers of ten walk the point: right as many places as the zeros, left for division. **In the exam:** count the zeros, move the point that many places, and pad with zeros when the digits run out. **Check yourself:** price the ten-kilo tomato bundle by walking the point once to the right. **Why students miss it:** they move the point the wrong way, or one place short of the zero count.

## DIAGNOSTIC_QUESTION_1
What is the result of multiplying $3.456$ by $100$?
## DIAGNOSTIC_ANSWER_1
The correct answer is $345.6$. A student who answers $34.56$ has shifted the decimal point only one place to the right instead of two, confusing multiplication by 10 with multiplication by 100. A student who answers $3456$ has incorrectly removed the decimal point entirely without considering the original place values.
## DIAGNOSTIC_QUESTION_2
Explain why dividing a decimal number by $1000$ requires shifting the decimal point three places to the left rather than to the right.
## DIAGNOSTIC_ANSWER_2
The correct answer is that division makes a number smaller, and in our base-10 place value system, moving to the left decreases the place value of each digit by a factor of 10 for each position. Therefore, dividing by 1000 (which is $10 \times 10 \times 10$) reduces the value by three place value steps, shifting the decimal point three positions to the left. A student who thinks it shifts to the right has confused the rules of multiplication and division.
## DIAGNOSTIC_QUESTION_3
Calculate the value of $72.4 \div 100$ and show your step-by-step reasoning.
## DIAGNOSTIC_ANSWER_3
The correct answer is $0.724$. Step 1: Identify that we are dividing by 100, which has two zeros. Step 2: Set up the number $72.4$ and locate the decimal point between 2 and 4. Step 3: Shift the decimal point 2 places to the left. Since there is only one digit (7) to the left of the decimal point, we must add a place-holding zero: $0.724$. A student who writes $7.24$ has only shifted it one place (dividing by 10 instead of 100), while a student who writes $0.0724$ has shifted it three places (dividing by 1000).
## DIAGNOSTIC_QUESTION_4
Compare the operations of multiplying $5.6$ by $100$ and dividing $5600$ by $1000$. What do you notice about the final answers?
## DIAGNOSTIC_ANSWER_4
The correct answer is that $5.6 \times 100 = 560$ and $5600 \div 1000 = 5.6$. Comparing them shows that multiplying a decimal by 100 shifts the point right by 2 places, while dividing another number by 1000 shifts it left by 3 places, yielding completely different values ($560$ versus $5.6$). A student who believes these operations are inverse or yield the same result fails to account for the different starting numbers and different powers of ten applied.
## DIAGNOSTIC_QUESTION_5
A student calculated $8.9 \times 1000$ as $890$. Evaluate this student's work and explain the specific error made.
## DIAGNOSTIC_ANSWER_5
The student's answer of $890$ is incorrect. The correct answer is $8900$. The student only shifted the decimal point two places to the right (multiplying by 100) instead of three places (multiplying by 1000), failing to add a necessary place-holding zero for the third shift.
## DIAGNOSTIC_QUESTION_6
Create a decimal multiplication problem using a power of 10 where the answer becomes a whole number, and explain why the decimal point disappears.
## DIAGNOSTIC_ANSWER_6
An example is $4.25 \times 100 = 425$. The decimal point disappears because shifting it two places to the right places it immediately after the last digit (5), meaning there are no remaining decimal parts, turning the decimal into a whole number. A poor answer would use a power of 10 too small (like 10), resulting in $42.5$, which still contains a decimal part, failing to demonstrate the condition where the decimal point is eliminated.
## COMMON_MISCONCEPTION
Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when trailing or leading zeros are required. For instance, when multiplying $0.04$ by $1000$, students frequently shift the decimal point only two places or add zeros on the wrong side, writing $0.0400$ or $40$ instead of the correct value $40$.
## ON_FAILURE
If a student struggles with shift direction or adding place holders, have them physically write the number on squared paper with one digit per box and the decimal point on its own grid line. Instruct them: "For multiplication (making the number bigger), slide your finger to the right by as many jumps as there are zeros. For division (making the number smaller), slide your finger to the left. If you run out of digits while jumping, fill the empty grid boxes with zeros."
## PREREQUISITE_NODE_IDS
c7_math_ch12_001, c6_math_ch04_043, c6_math_ch01_003
## PREREQUISITE_REASONS
c7_math_ch12_001: Recalling decimal place values and representations is essential to understand why shifting a point changes a number's value.
c6_math_ch04_043: Understanding decimal place value ensures students know the value of tenths, hundredths, and thousandths positions.
c6_math_ch01_003: Place value and face value knowledge of whole numbers underpins base-10 scaling concepts.
## FORWARD_NODE_IDS
c7_math_ch12_007, c7_math_ch12_008, c7_math_ch12_010, c8_math_ch2_5
## FORWARD_REASONS
c7_math_ch12_007: Estimation and verification rely heavily on quick mental calculations using powers of 10.
c7_math_ch12_008: Word problems involving decimal multiplication often require scaling measurements by 10, 100, or 1000 (e.g., converting metres to centimetres or kilograms to grams).
c7_math_ch12_010: Checking reasonableness of answers requires mental scaling with powers of 10.
c8_math_ch2_5: Shifting decimal point when multiplying/dividing by powers of 10 is the mechanical skill for converting to standard form.

## CROSS_SUBJECT_PREREQS
c6_math_ch04_049
## CROSS_SUBJECT_REASONS
c6_math_ch04_049: Real-life applications with money and measurements require converting units (like paise to rupees or cm to m), which directly uses decimal shifting by powers of 10.
## CHAIN_DESCRIPTION
c7_math_ch12_001 -> c7_math_ch12_006 -> c7_math_ch12_008
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c7_math_ch12_001 | Understanding decimal place value structure is foundational for shifting points when changing units in measurement.
c6_math_ch04_049 | Converting units of currency (paise to rupees) and mass (grams to kilograms) uses direct decimal movement by powers of 10.
## PREREQ_CONCEPT
Base-10 place value system and decimal representation.
## PREREQ_BEFORE
Students must be able to identify place values of digits in decimal numbers up to thousandths.
## PREREQ_STUCK
Review place value columns (tenths, hundredths, thousandths) and how each position is 10 times larger than the one to its right using c7_math_ch12_001.
## WORKED_EXAMPLE_1
PROBLEM: A school ordered $100$ science textbooks, and each textbook weighs $1.25$ kg. What is the total weight of the books in kilograms?
STEPS:
- Step 1: Identify given information. Weight of one textbook = $1.25$ kg; number of textbooks = $100$.
- Step 2: Determine the mathematical operation required. Finding the total weight for multiple items requires multiplication: $1.25 \times 100$.
- Step 3: Count the number of zeros in the multiplier ($100$ has two zeros), which tells us to shift the decimal point two places to the right.
- Step 4: Perform the shift algebraically: starting at $1.25$, move the decimal point past $2$ and $5$, resulting in $125$.
- Step 5: Verify with units: $1.25 \text{ kg} \times 100 = 125 \text{ kg}$.
REASONING: Multiplying by $100$ scales each digit up by two place-value positions (from tenths and hundredths to tens and hundreds), shifting the decimal point two places to the right.
ANSWER: $125 \text{ kg}$
## WORKED_EXAMPLE_2
PROBLEM: A runner drinks water from a large container holding $450.5$ litres of water, dividing it equally among $1000$ bottles for a marathon event. How many litres of water are in each bottle?
STEPS:
- Step 1: Identify given information. Total volume = $450.5$ litres; number of bottles = $1000$.
- Step 2: Determine the mathematical operation required. Sharing equally among bottles means division: $450.5 \div 1000$.
- Step 3: Count the number of zeros in the divisor ($1000$ has three zeros), which dictates shifting the decimal point three places to the left.
- Step 4: Perform the shift algebraically: starting with $450.5$, move the decimal point one place left (between 5 and 0), a second place left (between 4 and 5), and a third place left, requiring a leading zero: $0.4505$.
- Step 5: Verify with units: $450.5 \div 1000 = 0.4505 \text{ litres}$.
REASONING: Dividing by $1000$ reduces the place value of every digit by three positions, moving the decimal point three places to the left and adding a placeholder zero when digits run out.
ANSWER: $0.4505 \text{ litres}$
## WORKED_EXAMPLE_3
PROBLEM: A ribbon roll is $8.2$ metres long. A tailor cuts it into $10$ equal pieces, and then uses $100$ times a single small piece length for a grand decoration. What is the final length represented by this calculation?
STEPS:
- Step 1: Break down the multi-step problem. First operation: divide $8.2$ metres by $10$ ($8.2 \div 10$). Second operation: multiply that result by $100$ ($(\text{Result}) \times 100$).
- Step 2: Perform the first operation ($8.2 \div 10$). Since we divide by $10$ (one zero), shift the decimal point one place to the left: $8.2 \div 10 = 0.82 \text{ metres}$.
- Step 3: Take the intermediate result ($0.82$) and apply the second operation: multiply by $100$.
- Step 4: Since we multiply by $100$ (two zeros), shift the decimal point two places to the right: starting at $0.82$, moving two places gives $82$.
- Step 5: Verify the combined scaling: dividing by 10 and multiplying by 100 is mathematically equivalent to multiplying by $10$ overall ($8.2 \times 10 = 82$).
REASONING: Combining operations with powers of 10 allows us to track cumulative shifts: shifting left by 1 and right by 2 leaves a net shift of 1 place to the right.
ANSWER: $82 \text{ metres}$
## COMPETENCY_QUESTION_1
QUESTION: Priya wants to convert measurements in her science project. She has a wire of length $4.5 \text{ cm}$. She needs to find its length in metres ($1 \text{ m} = 100 \text{ cm}$) and also calculate what the length would be if magnified $1000$ times under a microscope. Show both calculations and explain the direction of the decimal shift for each.
COMPETENCY: Translating real-world measurement conversions into decimal shift operations with correct direction justification.
STEPS:
- Step 1: Understand that converting centimetres to metres requires dividing by $100$ (since $1 \text{ m} = 100 \text{ cm}$).
- Step 2: Calculate length in metres: $4.5 \div 100 = 0.045 \text{ m}$, shifting the decimal point two places to the left because division decreases the value.
- Step 3: Understand that magnifying $1000$ times requires multiplying the original length in cm by $1000$.
- Step 4: Calculate magnified length: $4.5 \times 1000 = 4500 \text{ cm}$, shifting the decimal point three places to the right because multiplication increases the value and requires placeholder zeros.
ANSWER: Length in metres is $0.045 \text{ m}$ (shift left by 2 places); magnified length is $4500 \text{ cm}$ (shift right by 3 places).
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Rahul claims that multiplying a decimal number by $1000$ and then dividing the product by $100$ is the exact same as multiplying the original number by $10$. Test his claim using the decimal number $7.35$, write out all intermediate steps, and justify whether his mathematical reasoning holds true for any decimal number.
COMPETENCY: Comparing and justifying algebraic properties of scaling operations with powers of 10.
STEPS:
- Step 1: Take the original number $7.35$ and multiply it by $1000$: $7.35 \times 1000 = 7350$ (shift decimal point 3 places right, adding one placeholder zero).
- Step 2: Take the intermediate product $7350$ and divide it by $100$: $7350 \div 100 = 73.5$ (shift decimal point 2 places left).
- Step 3: Compare this final result ($73.5$) with what you get when you multiply the original number $7.35$ directly by $10$: $7.35 \times 10 = 73.5$ (shift decimal point 1 place right).
- Step 4: Justify the reasoning: Multiplying by $1000$ shifts right by 3, and dividing by $100$ shifts left by 2. The net shift is $3 - 2 = 1$ place to the right, which is identical to multiplying by $10$. Thus, Rahul's claim is completely correct for any decimal number.
ANSWER: Rahul's claim is correct. For $7.35$, multiplying by $1000$ then dividing by $100$ gives $73.5$, which equals $7.35 \times 10$ due to a net shift of one place to the right.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by 1, 2, or 3 places ______, while dividing by 10, 100, or 1000 shifts the decimal point to the left by 1, 2, or 3 places.

## DIAGNOSTIC_ANSWER_7
respectively

**A wrong answer (writing 'alternately') reveals the student invented a zigzag - the shifts happen respectively: one, two, three places for ten, hundred, thousand.**

Respectively is the pairing adverb - one, two, three places for ten, hundred, thousand.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are at the vegetable market buying tomatoes, and the shopkeeper tells you that 1 kg costs ₹45.85, but if you buy a bundle of 10 kg, the ______ changes.

## DIAGNOSTIC_ANSWER_8
calculation

**A wrong answer (writing 'multiplication') reveals the student the bundle forces a new calculation - the walkthrough's word for what changes, and the blank's own noun.**

Calculation is what the ten-kilo bundle changes - the walkthrough's own word.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: We already know from studying decimals that moving a digit one place to the left makes it ______ times larger.

## DIAGNOSTIC_ANSWER_9
10

**A wrong answer (any other factor) reveals the student missed the column law - one place to the left makes a digit 10 times larger, the blank's number.**

10 is the column law - one place left, ten times larger.

10 is the column law - one place to the left makes any digit ten times larger.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can quickly multiply and divide any given decimal number by powers of 10 (10, 100, 1000, etc.) by shifting the decimal point correctly without performing traditional long multiplication or division, handling cases where place-holding zeros must be added.
