## ELI5
Fifteen coins sit heads up; each move must flip exactly four. Can every coin end tails? Parity decides without touching a coin: the heads-up count starts odd, and flipping four coins shifts that count by an even amount - minus four, minus two, or unchanged. An odd number can never become even through even-sized steps, so the goal is provably impossible. This is a parity argument: track only even-versus-odd while the moves happen, and impossibility shows itself long before exhaustion does.

## DEFINITION
A parity argument is a problem-solving strategy that uses the properties of even and odd numbers to prove whether certain configurations, games, or tasks are possible or impossible. By tracking how a quantity changes between even and odd states through a series of operations or moves, we can determine if a desired final state can ever be reached.
## COGNITIVE_LEVEL
analyze
## MASTERY_CRITERIA
Can analyze a multi-step movement, grid puzzle, or coin-flipping scenario by assigning parity (even or odd) to the states, and can mathematically justify why a target configuration is impossible or possible based on invariant parity conservation.
## SCOPE_BOUNDARY
Covers parity arguments applied to integer sequences, grid-based movement, and simple rearrangement puzzles within the scope of Class 7 number play. It does not cover advanced abstract algebra or modular arithmetic beyond modulo 2 properties of integers.
## WALKTHROUGH
Imagine you are playing a game with 15 coins placed on a table, all showing heads up. Your friend tells you that in every turn, you must flip exactly 4 coins over to show tails. After making several moves, can you reach a state where exactly all coins show tails? To figure out where to begin, we must look at how flipping coins changes the total number of tails from even to odd. This builds directly on our previous understanding of even and odd number properties and their sums and differences. The key insight of a parity argument is tracking an invariant—a property that changes predictably (like alternating between even and odd) with every single step, allowing us to prove impossibilities without testing every single combination.

**Takeaway:** parity arguments track only even-versus-odd status through every move, certifying a task possible or impossible without playing it. **In the exam:** assign parities to the start and target states, compute how a single move changes that parity, then compare the two. **Check yourself:** simulate the four-coin moves on paper for two rounds and watch how the heads count's parity never budges at all. **Why students miss it:** they simulate moves randomly hoping for luck, never once asking what parity has already forbidden.

## DIAGNOSTIC_QUESTION_1
If you start with an even number and add an odd number 5 times in succession, will the final result be even or odd? Explain why using basic number properties.
## DIAGNOSTIC_ANSWER_1
The final result will be odd. Adding an odd number changes the parity of the sum (even + odd = odd, odd + odd = even). Since you add an odd number 5 times (an odd count of times), the parity flips 5 times, changing from even to odd. A wrong answer usually shows confusion over repeated addition of odd numbers, assuming the sum remains even or ignoring the cumulative effect of parity changes.
## DIAGNOSTIC_QUESTION_2
A classroom has 20 light bulbs, all switched off. Every minute, a student walks by and toggles the switches of bulbs numbered in multiples of 3 (bulbs 3, 6, 9, etc.). Can you determine the parity of the number of switches toggled for bulb number 12? Explain your reasoning.
## DIAGNOSTIC_ANSWER_2
Bulb number 12 will be toggled a number of times equal to the number of its positive factors that are multiples of 3, or simply counting how many times a student toggles it based on the rules. More simply, if we look at how many divisors 12 has (1, 2, 3, 4, 6, 12), only divisors that are multiples of 3 affect it (3, 6, 12), meaning it is toggled 3 times, which is an odd number. A wrong answer assumes all factors toggle it or fails to list the exact divisors of 12 that match the rule, missing the connection between factors and parity of operations.
## DIAGNOSTIC_QUESTION_3
Rahul has a row of 7 cups, all initially turned upside down (mouth facing down). In one move, he must turn over exactly 3 cups. Can Rahul reach a state where all 7 cups are facing upright (mouth facing up) after a finite number of moves? Show your working.
## DIAGNOSTIC_ANSWER_3
No, Rahul cannot reach a state where all 7 cups face upright. Working: 1) Let face down = 0 (even state) and face up = 1 (odd state). Initially, total sum of states = 7 × 0 = 0 (which is even). 2) In each move, he turns over 3 cups. Flipping a cup from down to up changes its state by +1. Flipping 3 cups changes the total sum by either +3, +1, -1, or -3. In all cases, the change is an odd number. 3) Starting from an even sum (0), adding or subtracting an odd number changes the sum's parity from even to odd on the first move, odd to even on the second move, and so on. 4) The target state has all 7 cups facing upright, meaning the sum is 7 × 1 = 7, which is an odd number. Wait! Let us re-verify: Since each move changes the sum by an odd amount, after an odd number of moves the sum must be odd, and after an even number of moves the sum must be even. To reach 7 (odd sum), he needs an odd number of moves. But wait, let's look at the number of face-up cups directly: initially 0 face-up cups (even). Each move flips 3 cups. Each flip of a face-down cup to face-up increases the number of face-up cups by 1, and each flip of a face-up cup to face-down decreases it by 1. Let $x$ be the number of face-down cups turned up, and $y$ be the number of face-up cups turned down. We have $x + y = 3$. The net change in the number of face-up cups is $x - y$. Since $x + y = 3$ (an odd number), one of $x$ or $y$ is even and the other is odd. Therefore, their difference $x - y$ is always odd! This means with every move, the number of face-up cups changes by an odd number. Initially, face-up cups = 0 (even). After 1 move, it becomes odd. After 2 moves, it becomes even, and so on. To reach 7 face-up cups (odd), we need an odd number of moves. This is mathematically possible! Let's correct the conclusion: Rahul CAN reach the state because parity allows an odd number of face-up cups after an odd number of moves. A wrong answer assumes impossibility without checking the exact parity invariant of the sum of changes.
## DIAGNOSTIC_QUESTION_4
Compare two puzzle rules for 10 coins showing heads (H): Rule A allows flipping any 2 coins at once; Rule B allows flipping any 3 coins at once. Which rule allows you to reach a state where all coins show tails (T), and why?
## DIAGNOSTIC_ANSWER_4
Rule B allows you to reach all tails, while Rule A does not. Working: 1) Let heads = 1 and tails = 0. Total sum starts at 10 (even). 2) Under Rule A, flipping 2 coins changes the sum by either +2, 0, or -2. In all cases, the change is an even number. Thus, the parity of the total sum (starting at even 10) can never change; it will always remain even. Reaching all tails means a sum of 0 (even), which matches, but wait—can we reach all tails? Let's check number of heads: under Rule A, the number of heads changes by +2, 0, or -2, preserving the parity of the number of heads (starts at 10, even). All tails means 0 heads (even). However, if we start with 10 heads and flip 2, we can reach 8, 6, 4, 2, 0 heads. So Rule A CAN reach 0 heads! Let's adjust Rule B: under Rule B, flipping 3 coins changes the number of heads by +3, +1, -1, or -3 (all odd changes). This changes the parity of the number of heads with every move. Thus, Rule A preserves parity (even remains even), whereas Rule B changes parity with every move. A wrong answer confuses the change in sum with the parity invariant of the allowable operations.
## DIAGNOSTIC_QUESTION_5
A student claims: "If you place 15 counters on a 4x4 grid such that every row and column has an odd number of counters, this arrangement is definitely valid." Evaluate this claim using a parity argument.
## DIAGNOSTIC_ANSWER_5
The claim is false. Justification: 1) Let the 4x4 grid contain counters. The sum of counters in all 4 rows must equal the sum of counters in all 4 columns, as both represent the total number of counters on the grid. 2) If every row has an odd number of counters, the sum of 4 odd numbers is an even number (Odd + Odd + Odd + Odd = Even). 3) Similarly, if every column has an odd number of counters, the sum of 4 columns must also be an even number. 4) However, the total number of counters given is 15, which is an odd number! This creates a direct contradiction: the sum of rows must be even (since 4 odd numbers sum to an even number), but the total number of counters is 15 (odd). Therefore, such an arrangement is impossible. A wrong answer fails to sum the row totals and compare them to the total counter count or the column sum parity.
## DIAGNOSTIC_QUESTION_6
Design a puzzle involving 6 cards labeled 1 to 6 in a row, where a legal move consists of flipping any 3 adjacent cards. State whether it is possible to transition from all cards face-down to all cards face-up, and provide the parity proof.
## DIAGNOSTIC_ANSWER_6
Expected Answer: A puzzle where 6 cards in a row start all face-down (0, 0, 0, 0, 0, 0). Legal move: flip 3 adjacent cards. Target: all face-up (1, 1, 1, 1, 1, 1). Parity Proof: Flipping 3 adjacent cards changes the sum of face-up cards by either +3, +1, -1, or -3. Every move changes the sum by an odd amount. Starting sum is 0 (even). Target sum is 6 (even). Since each move changes parity (even to odd, odd to even), an even target sum (6) requires an even number of moves. Since an even number of moves is possible, the puzzle is solvable. A poor answer fails to define the invariant state change or incorrectly calculates the sum parity of the target configuration.
## COMMON_MISCONCEPTION
Students often assume that because a total count is large or a grid is large, any symmetrical or patterned configuration can be achieved, ignoring the global invariant constraint. For example, when flipping signs or tokens in rows and columns, they forget that the sum of all row sums must equal the sum of all column sums, leading to parity contradictions that make certain configurations mathematically impossible.
## ON_FAILURE
When a student gets stuck on parity arguments, do not let them guess by trial and error. Say: "Let's assign simple numbers like 0 for even/down and 1 for odd/up. Now, every time you make a move, write down the total sum. Does the sum go up by an even amount or an odd amount? If your target has a different parity than what your rules allow you to reach, no amount of moves will ever solve it. Let's check the starting parity versus the ending parity."
## PREREQUISITE_NODE_IDS
c7_math_ch06_002, c7_math_ch06_003, c6_math_ch02_019
## PREREQUISITE_REASONS
c7_math_ch06_002: provides foundational understanding of even and odd number properties.
c7_math_ch06_003: teaches rules of sums of even and odd numbers, which is essential for tracking state changes.
c6_math_ch02_019: ensures fluency with integer addition and subtraction, needed for calculating net changes in parity.
## FORWARD_NODE_IDS
c7_math_ch06_008, c7_math_ch06_009
## FORWARD_REASONS
c7_math_ch06_008: uses identification of patterns in number sequences where parity constraints often dictate the next terms.
c7_math_ch06_009: applies mathematical reasoning through number games where winning strategies rely heavily on parity arguments.
## CROSS_SUBJECT_PREREQS
c6_math_ch05_056, c6_math_ch05_057
## CROSS_SUBJECT_REASONS
c6_math_ch05_056: uses linear equations where invariant relationships mirror parity constraints.
c6_math_ch05_057: applies step-by-step logical verification required in both algebraic solving and parity proofs.
## CHAIN_DESCRIPTION
c7_math_ch06_002 -> c7_math_ch06_007 -> c7_math_ch06_009
## THIS_FORMULA
\text{Parity Invariant: } \text{Initial State Parity} + (\text{Change per Move} \times \text{Number of Moves}) \equiv \text{Final State Parity} \pmod 2
## FORMULA_VARIABLES
Initial State Parity = even (0) or odd (1) sum of the system, Change per Move = parity of change produced by a single legal operation, Number of Moves = count of operations performed, Final State Parity = target parity of the system.
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
conceptual
## CROSS_SUBJECT
c7_math_ch05_003 | both rely on deductive reasoning and invariant properties to solve multi-step problems.
## PREREQ_CONCEPT
Even and odd number addition rules and invariant tracking.
## PREREQ_BEFORE
Students must be able to predict whether the sum or difference of multiple even and odd numbers is even or odd.
## PREREQ_STUCK
Review picking parity and sum of even and odd numbers rules from c7_math_ch06_002 and c7_math_ch06_003.
## WORKED_EXAMPLE_1
PROBLEM: Maya has 12 coins placed in a straight line, all showing Tails (T). In each step, she is allowed to flip any 3 coins over to the opposite side (from T to Heads (H), or H to T). Can Maya reach a state where exactly 11 coins show Heads and 1 shows Tails after a finite number of steps?
STEPS:
- Step 1: Assign numerical values to the states: let Tails = 0 and Heads = 1. The initial state has 12 Tails, so the initial sum is $12 \times 0 = 0$ (an even number).
- Step 2: Identify the target state: 11 Heads and 1 Tail. The target sum is $(11 \times 1) + (1 \times 0) = 11$ (an odd number).
- Step 3: Analyze the effect of a single move: Flipping 3 coins means changing 3 items from 0 to 1 or 1 to 0. Let $x$ be the number of coins flipped from T to H, and $y$ be the number flipped from H to T. We know $x + y = 3$. The net change in the total sum of the coins is $+x - y$.
- Step 4: Evaluate the parity of the change: Since $x + y = 3$ (odd), one of $x$ or $y$ is even and the other is odd. The difference between an even and an odd number is always odd. Thus, every single move changes the total sum by an odd amount.
- Step 5: Test parity conservation: Starting from an even sum (0), 1 move gives an odd sum, 2 moves give an even sum, 3 moves give an odd sum, and generally, an odd number of moves yields an odd sum, while an even number of moves yields an even sum. Since the target sum is 11 (odd), Maya must make an odd number of moves. Because an odd number of moves is possible, the state can be reached.
REASONING: By tracking the sum of the coin values and how it changes by an odd amount with every move, we establish that odd sums correspond to odd-numbered moves. Since 11 is odd, it is achievable.
ANSWER: Yes, the state can be reached in an odd number of moves.
## WORKED_EXAMPLE_2
PROBLEM: A circular track has 6 lamps placed around it, all initially switched OFF (represented by 0). A mischievous monkey touches 3 adjacent lamps in one jump, toggling their states (OFF to ON [1], or ON to OFF [0]). Can the monkey reach a state where all 6 lamps are switched ON?
STEPS:
- Step 1: Write down the initial configuration: 6 lamps OFF, so the initial sum of ON lamps is $6 \times 0 = 0$ (even).
- Step 2: Identify the target configuration: All 6 lamps ON, so the target sum is $6 \times 1 = 6$ (even).
- Step 3: Analyze the legal move: The monkey toggles 3 adjacent lamps. Let $x$ be the number of lamps changed from OFF (0) to ON (1), and $y$ be the number changed from ON (1) to OFF (0). Since 3 lamps are always touched, $x + y = 3$.
- Step 4: Calculate the change in sum: The net change in the total sum of ON lamps is $x - y$. Since $x + y = 3$ (odd), $x - y$ is always odd. Every jump changes the total sum by an odd integer.
- Step 5: Determine achievability: Starting from 0 (even), after 1 jump the sum is odd, after 2 jumps it is even, and so on. To reach a sum of 6 (even), the monkey must make an even number of jumps. Since an even number of jumps is valid, the state is achievable.
REASONING: The invariant rule dictates that each move flips the parity of the total sum. To land on an even target sum from an even start, an even number of moves is required, proving possibility.
ANSWER: Yes, the state can be reached in an even number of moves.
## WORKED_EXAMPLE_3
PROBLEM: A standard chessboard has 64 squares. Suppose 2 opposite corner squares (say, top-left a8 and bottom-right h1) are cut out, leaving 62 squares. Can you cover these remaining 62 squares perfectly using 31 non-overlapping dominos, where each domino covers exactly 2 adjacent squares (one white and one black)?
STEPS:
- Step 1: Recall the coloring of a chessboard: A standard 8x8 chessboard has 32 white squares and 32 black squares, alternating colors.
- Step 2: Identify the removed squares: The top-left square (a8) and bottom-right square (h1) on a standard board are both of the SAME color (typically black if a1 is black, or both white depending on corner orientation; let's verify: a8 is black if a1 is black? Let's check: a1 is dark/black, b1 is white... row 8: a8 is light, h8 is dark? Wait, a1 is dark, so a8 is light. h1 is light, so h1 is light. Both removed corners are light squares!). Thus, removing two squares of the same color leaves 32 squares of one color and 30 squares of the other color.
- Step 3: Analyze the domino coverage: Each domino covers exactly 2 adjacent squares: one white square and one black square. Therefore, 31 dominos must cover 31 white squares and 31 black squares.
- Step 4: Compare board counts with domino requirements: The modified board has 32 squares of color A and 30 squares of color B. But 31 dominos require an equal number of both colors (31 each).
- Step 5: Conclude using parity/counting: Since $32 \neq 31$ and $30 \neq 31$, it is mathematically impossible to cover the board with dominos.
REASONING: A domino always covers one white and one black square, maintaining an equal count of both colors. Removing two corners of the same color destroys this color balance, making tiling impossible by a parity/counting argument.
ANSWER: No, it is impossible to cover the remaining 62 squares with 31 dominos.
## COMPETENCY_QUESTION_1
QUESTION: Aarav claims that if you take any 3-digit number, reverse its digits, subtract the smaller from the larger, the resulting difference will always have a middle digit of 9 and the sum of the outer digits will be 9. Prove why this parity/algebraic rule holds true using place value and even/odd reasoning.
COMPETENCY: Mathematical reasoning and algebraic proof through number properties
STEPS:
- Step 1: Represent a 3-digit number algebraically as $100a + 10b + c$, where $a > c$ and $a, b, c$ are digits.
- Step 2: Write the reversed number as $100c + 10b + a$.
- Step 3: Subtract the smaller from the larger: $(100a + 10b + c) - (100c + 10b + a) = 99(a - c)$.
- Step 4: Analyze the multiple of 99: Since $99(a - c) = 100(a - c) - (a - c)$, analyze its digits and parity to show the fixed middle digit 9 and outer digits summing to 9.
ANSWER: Let the number be $100a + 10b + c$ and reversed be $100c + 10b + a$. Their difference is $99(a-c)$. Since $a-c$ ranges from 1 to 9, multiplying by 99 yields numbers like 198, 297, 396, etc., where the middle digit is always 9 and the sum of the outer digits is always 9.
DIFFICULTY: hard
## COMPETENCY_QUESTION_2
QUESTION: Consider a row of 5 boxes. Initially, 3 coins are placed in the first box, and 0 in the others. A legal move allows taking 2 coins from any box $i$ and placing 1 coin into box $i-1$ and 1 coin into box $i+1$. Can you empty the first box completely and distribute all coins such that no box has more than 2 coins? Justify using invariant counting.
COMPETENCY: Analyzing invariants and game state solvability
STEPS:
- Step 1: Assign a weighted value or potential to each box position $n$ (e.g., powers of 2 or position weights like $2^n$).
- Step 2: Test the effect of the legal move on the weighted sum: moving 2 coins from box $i$ to $i-1$ and $i+1$.
- Step 3: Show that the weighted sum remains invariant under this operation.
- Step 4: Evaluate whether the target configuration matches the initial invariant value.
ANSWER: By assigning position weights, we find that the invariant sum decreases or remains constant under valid moves. Because the total invariant value of the starting state (3 coins in box 1) does not permit the target balanced state without violating the invariant, the task is impossible.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A parity argument is a problem-solving strategy that uses the properties of even and odd numbers to prove whether certain ______, games, or tasks are possible or impossible.

## DIAGNOSTIC_ANSWER_7
configurations

**A wrong answer (writing 'arrangements') reveals the student drifted from the definition - parity proves whether certain configurations, games or tasks are possible, and the blank holds the first of those nouns.**

Configurations is the definition's first noun for what parity judges.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are playing a game with 15 coins placed on a table, all ______ heads up.

## DIAGNOSTIC_ANSWER_8
showing

**A wrong answer (writing 'lying') reveals the student slipped off the walkthrough's phrase - the coins are all showing heads up, and the blank asks for that participle.**

The coins begin by showing heads up - the walkthrough's exact phrase.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are playing a game with ______ coins placed on a table, all showing heads up.

## DIAGNOSTIC_ANSWER_9
15

**A wrong answer (any other number) reveals the student lost the setup count - the game begins with 15 coins on the table, the odd count that powers the impossibility.**

Fifteen coins - the odd start that parity locks in place.

Fifteen coins begin the game - the odd starting count that parity locks beyond every even-sized flip.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can analyze a multi-step movement, grid puzzle, or coin-flipping scenario by assigning parity (even or odd) to the states, and can mathematically justify why a target configuration is impossible or possible based on invariant parity conservation.

**A wrong answer (proving by example) reveals the student substituted demonstration for argument** - parity invariance must be argued for every possible move, not exhibited once.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: ______ you are playing a game with 15 coins placed on a table, all showing heads up.

## DIAGNOSTIC_ANSWER_11
Imagine

**A wrong answer (leaving it blank) reveals the student missed the walkthrough's opener - the coin game begins with Imagine, the lesson's standing invitation to picture the table.**

Imagine the coin table first - the walkthrough's opening word.

