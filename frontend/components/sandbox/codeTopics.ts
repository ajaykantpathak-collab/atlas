/**
 * codeTopics.ts — class-wise topic picker data for the E8 Code Runtime
 * sandbox, grounded in the authored corpora:
 *
 *   Classes 6-8  → cisce_nodes_v2/c6|c7|c8_compst_icse_* (Computer Studies:
 *                  ch3 algorithms & flowcharts, ch4 from algorithms to
 *                  programs, ch6 scratch-style programming, ch2 number
 *                  systems) — the Flowchart Bench drives these classes.
 *   Classes 9-10 → cisce_nodes_v2/c9|c10_compapp_icse_* (ICSE Computer
 *                  Applications Java: values & types, operators, input,
 *                  math library, conditionals, loops, nested loops,
 *                  methods, arrays, strings) — the Java runner's home.
 *   Classes 11-12→ enhanced_nodes_md/c11|c12_cs_cbse_* (CBSE Computer
 *                  Science) — only the language-neutral topics (boolean
 *                  algebra, problem solving/algorithms, control-flow
 *                  concepts) are offered here; the runtime is a Java
 *                  subset, so Python-specific chapters stay out.
 *
 * Misconception wiring (closed-world, honest degradation):
 *   - `nodeId` (ICSE corpus) → served by GET /api/sandbox/code-node/{id},
 *     which parses the authored COMMON_MISCONCEPTION bullets, wrong-answer
 *     clauses and diagnostics straight out of the corpus markdown.
 *   - `enhancedNodeId` (CBSE c11/c12_cs) → served by the standard
 *     /api/content/nodes/{id}/enrichment endpoint (remediation.ts).
 *   A node id that serves nothing renders NO invented text — the
 *   MisconceptionPanel honestly stays empty (same rule as mathsTopics).
 *
 * Every `starter` program runs on the deterministic interpreter in
 * codeTrace.ts; expected outputs for the Predict tab are never
 * hand-computed — the engine itself is the ground truth.
 */

export interface CodeTopic {
  key: string
  label: string
  /** Authored corpus node (ICSE) for misconception content. */
  nodeId?: string
  /** Servable enhanced-nodes node (CBSE 11-12) for fetchEnrichment. */
  enhancedNodeId?: string
  /** Starter program shown when the topic is opened. */
  starter?: string
  /** Sample inputs consumed by the starter's Scanner reads (one per line). */
  inputs?: string[]
  /** Predict-the-output drill: a deterministic program + its inputs. */
  predict?: { code: string; inputs?: string[]; note?: string }
  /** Error-clinic buggy program + which error family it demonstrates. */
  clinic?: { code: string; inputs?: string[]; bug: 'compile' | 'runtime' | 'logical'; hint: string }[]
}

export interface CodeChapter {
  key: string
  label: string
  /** First overview node of the corpus chapter (for panel fallback). */
  nodeId?: string
  /** Servable enhanced-nodes node covering the whole chapter (CBSE 11-12). */
  enhancedNodeId?: string
  topics: CodeTopic[]
}

export interface CodeClassBand {
  key: string
  label: string
  engine: 'flowchart' | 'java' | 'concepts'
  chapters: CodeChapter[]
}

const J = String.raw

export const CODE_SANDBOX_CLASSES: CodeClassBand[] = [
  // ---------------------------------------------------------- classes 6-8
  {
    key: 'c6', label: 'Class 6', engine: 'flowchart',
    chapters: [
      {
        key: 'c6_ch6', label: 'Programming (make the computer DO things)',
        nodeId: 'c6_compst_icse_06_001',
        topics: [
          {
            key: 'c6_seq', label: 'Sequence: a recipe for the computer',
            nodeId: 'c6_compst_icse_06_001',
            predict: {
              code: J`int mangoes = 3;
mangoes = mangoes + 2;
System.out.println(mangoes);`,
              note: 'The computer follows the steps in order — exactly like the chapter says.',
            },
            clinic: [
              {
                code: J`int mangoes = 3
mangoes = mangoes + 2;
System.out.println(mangoes);`,
                bug: 'compile',
                hint: 'Read the first line carefully — what is missing at the end?',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'c7', label: 'Class 7', engine: 'flowchart',
    chapters: [
      {
        key: 'c7_ch2', label: 'Number Systems (the computer counts in 0 and 1)',
        nodeId: 'c7_compst_icse_02_001',
        topics: [
          {
            key: 'c7_bin', label: 'Binary doubling machine',
            nodeId: 'c7_compst_icse_02_001',
            predict: {
              code: J`int bit = 1;
System.out.println(bit);
bit = bit * 2;
System.out.println(bit);
bit = bit * 2;
System.out.println(bit);
bit = bit * 2;
System.out.println(bit);`,
              note: 'Each binary place is worth double the one before it — 1, 2, 4, 8…',
            },
            clinic: [
              {
                code: J`int bit = 1;
while (bit > 0) {
  bit = bit * 2;
}
System.out.println(bit);`,
                bug: 'runtime',
                hint: 'The condition is always true — what does the sandbox do to protect itself? (It stops runs that never end.)',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'c8', label: 'Class 8', engine: 'flowchart',
    chapters: [
      {
        key: 'c8_ch3', label: 'Algorithms & Flowcharts',
        nodeId: 'c8_compst_icse_03_001',
        topics: [
          {
            key: 'c8_symbols', label: 'Symbols → steps (open the Flowchart Bench)',
            nodeId: 'c8_compst_icse_03_003',
          },
          {
            key: 'c8_trace', label: 'Trace tables (the dry-run table)',
            nodeId: 'c8_compst_icse_03_005',
            predict: {
              code: J`int a = 2;
int b = 5;
a = a + b;
b = a - b;
a = a - b;
System.out.println(a);
System.out.println(b);`,
              note: 'Fill a dry-run table row by row — a, b after EVERY step. This is the swap.',
            },
            clinic: [
              {
                code: J`int a = 2;
int b = 5;
if (a > b) System.out.println("a is bigger");
else System.out.println("b is bigger");`,
                bug: 'logical',
                hint: 'It runs without any error message. Read the output — is it what the problem asked for?',
              },
            ],
          },
          {
            key: 'c8_decision', label: 'Decisions: the diamond asks a question',
            nodeId: 'c8_compst_icse_03_006',
            predict: {
              code: J`int marks = 38;
if (marks >= 40) {
  System.out.println("pass");
} else {
  System.out.println("try again");
}`,
            },
          },
          {
            key: 'c8_loops', label: 'Loops in flowcharts',
            nodeId: 'c8_compst_icse_03_007',
            predict: {
              code: J`int count = 1;
while (count <= 3) {
  System.out.println(count);
  count = count + 1;
}`,
              note: 'Watch the trace table: count climbs 1, 2, 3 — then the condition fails and the loop ends.',
            },
          },
        ],
      },
      {
        key: 'c8_ch4', label: 'From Algorithms to Programs',
        nodeId: 'c8_compst_icse_04_001',
        topics: [
          {
            key: 'c8_prog', label: 'Your first real program',
            nodeId: 'c8_compst_icse_04_001',
            starter: J`// The same flowchart, written as a program:
int length = 8;
int breadth = 5;
int area = length * breadth;
System.out.println(area);`,
          },
        ],
      },
    ],
  },
  // --------------------------------------------------------- classes 9-10
  {
    key: 'c9', label: 'Class 9', engine: 'java',
    chapters: [
      {
        key: 'c9_ch2', label: 'Objects & Classes (concepts)',
        nodeId: 'c9_compapp_icse_02_001',
        topics: [
          {
            key: 'c9_oop', label: 'Object-thinking drill',
            nodeId: 'c9_compapp_icse_02_001',
            predict: {
              code: J`// Two objects from one blueprint keep separate state:
int paratha1Butter = 1;
int paratha2Butter = 3;
paratha1Butter = paratha1Butter + 1;
System.out.println(paratha1Butter);
System.out.println(paratha2Butter);`,
              note: 'A class is the recipe card; each object holds its OWN values — changing one paratha never touches the other.',
            },
          },
        ],
      },
      {
        key: 'c9_ch3', label: 'Values & Types',
        nodeId: 'c9_compapp_icse_03_001',
        topics: [
          {
            key: 'c9_types', label: 'int vs double: 7/2 is NOT 3.5',
            nodeId: 'c9_compapp_icse_03_002',
            starter: J`int total = 7;
int count = 2;
System.out.println(total / count);

double t = 7.0;
double c = 2.0;
System.out.println(t / c);`,
            predict: {
              code: J`System.out.println(7 / 2);
System.out.println(7.0 / 2);
System.out.println(7 % 2);`,
              note: 'The SAME / behaves by the types of its operands — the corpus calls this the single most donated mark.',
            },
            clinic: [
              {
                code: J`byte crate = 900;
System.out.println(crate);`,
                bug: 'compile',
                hint: 'The store-room keeper (compiler) refuses this before the program runs — the value does not fit the container.',
              },
              {
                code: J`char grade = "A";
System.out.println(grade);`,
                bug: 'compile',
                hint: 'One character uses SINGLE quotes; double quotes make text.',
              },
              {
                code: J`int avg = 7 / 2 + 0.5;
System.out.println(avg);`,
                bug: 'compile',
                hint: '7/2 + 0.5 is a double value — can it sit inside an int container?',
              },
            ],
          },
        ],
      },
      {
        key: 'c9_ch4', label: 'Operators',
        nodeId: 'c9_compapp_icse_04_001',
        topics: [
          {
            key: 'c9_ops', label: 'Arithmetic, %, ++ and precedence',
            nodeId: 'c9_compapp_icse_04_001',
            starter: J`int x = 5;
System.out.println(x++); // prints 5, THEN adds
System.out.println(x);
System.out.println(++x); // adds FIRST, then prints
System.out.println(17 / 5);
System.out.println(17 % 5);`,
            predict: {
              code: J`int a = 10;
int b = 3;
int c = a % b;
a = a - b * 2;
System.out.println(a);
System.out.println(c);`,
              note: '* and / bind before + and -; % is the remainder.',
            },
            clinic: [
              {
                code: J`int marks = 40;
if (marks = 40) {
  System.out.println("pass");
}`,
                bug: 'compile',
                hint: '= stores a value; == asks a question. Conditions must be true/false.',
              },
            ],
          },
        ],
      },
      {
        key: 'c9_ch5', label: 'Input (Scanner)',
        nodeId: 'c9_compapp_icse_05_001',
        topics: [
          {
            key: 'c9_input', label: 'Reading values with Scanner',
            nodeId: 'c9_compapp_icse_05_001',
            starter: J`Scanner sc = new Scanner(System.in);
int roll = sc.nextInt();
System.out.println("Roll no: " + roll);`,
            inputs: ['25'],
          },
        ],
      },
      {
        key: 'c9_ch6', label: 'Math Library Methods',
        nodeId: 'c9_compapp_icse_06_001',
        topics: [
          {
            key: 'c9_math', label: 'sqrt, pow, max, min, abs',
            nodeId: 'c9_compapp_icse_06_001',
            starter: J`System.out.println(Math.sqrt(144));
System.out.println(Math.pow(2, 5));
System.out.println(Math.max(13, 7));
System.out.println(Math.abs(-9));`,
            predict: {
              code: J`int a = -8;
int b = 3;
System.out.println(Math.max(a, b) - Math.min(a, b));
System.out.println(Math.sqrt(Math.abs(a)));`,
            },
          },
        ],
      },
      {
        key: 'c9_ch7', label: 'Conditional Statements',
        nodeId: 'c9_compapp_icse_07_001',
        topics: [
          {
            key: 'c9_ifelse', label: 'if / else if / else',
            nodeId: 'c9_compapp_icse_07_001',
            starter: J`int marks = 72;
if (marks >= 90) {
  System.out.println("A");
} else if (marks >= 75) {
  System.out.println("B");
} else if (marks >= 60) {
  System.out.println("C");
} else {
  System.out.println("D");
}`,
            predict: {
              code: J`int n = 7;
if (n % 2 == 0) {
  System.out.println("even");
} else {
  System.out.println("odd");
}
System.out.println(n > 0 ? "positive" : "not positive");`,
            },
            clinic: [
              {
                code: J`int age = 15;
if (age > 10);
  System.out.println("teen");`,
                bug: 'logical',
                hint: 'That semicolon after if(…) ends the if — the println is NOT inside it. It always runs.',
              },
            ],
          },
          {
            key: 'c9_switch', label: 'switch and the fall-through trap',
            nodeId: 'c9_compapp_icse_07_005',
            starter: J`int day = 3;
switch (day) {
  case 1:
    System.out.println("Mon");
    break;
  case 2:
    System.out.println("Tue");
    break;
  case 3:
    System.out.println("Wed");
    break;
  default:
    System.out.println("later");
}`,
            predict: {
              code: J`int d = 2;
switch (d) {
  case 1:
    System.out.println("one");
  case 2:
    System.out.println("two");
  case 3:
    System.out.println("three");
    break;
  default:
    System.out.println("other");
}`,
              note: 'No break after case 1? Execution FALLS THROUGH into the next case — the corpus lists this among the classic loop/conditional traps.',
            },
          },
        ],
      },
      {
        key: 'c9_ch8', label: 'Iterative Constructs (loops)',
        nodeId: 'c9_compapp_icse_08_001',
        topics: [
          {
            key: 'c9_for', label: 'for loops and dry-run tables',
            nodeId: 'c9_compapp_icse_08_001',
            starter: J`int sum = 0;
for (int i = 1; i <= 5; i++) {
  sum += i;
}
System.out.println(sum);`,
            predict: {
              code: J`int f = 1;
for (int i = 1; i <= 5; i++) {
  f = f * i;
}
System.out.println(f);`,
              note: 'Trace f row by row: 1, 2, 6, 24, … the factorial chain.',
            },
            clinic: [
              {
                code: J`int i = 1;
while (i <= 5) {
  System.out.println(i);
}`,
                bug: 'runtime',
                hint: 'i never changes — the condition stays true forever. The sandbox stops it and tells you why.',
              },
              {
                code: J`for (int i = 5; i > 0; i++) {
  System.out.println(i);
}`,
                bug: 'runtime',
                hint: 'The update moves i AWAY from the exit condition. A for loop can run zero times — or forever.',
              },
            ],
          },
          {
            key: 'c9_dowhile', label: 'do-while runs at least once',
            nodeId: 'c9_compapp_icse_08_004',
            predict: {
              code: J`int i = 100;
do {
  System.out.println(i);
  i++;
} while (i < 3);`,
              note: 'A for/while checks FIRST (a false condition means zero runs); do-while checks AFTER — the corpus flags students who think every loop body always runs.',
            },
          },
        ],
      },
      {
        key: 'c9_ch9', label: 'Nested Loops',
        nodeId: 'c9_compapp_icse_09_001',
        topics: [
          {
            key: 'c9_nested', label: 'Row-by-row patterns',
            nodeId: 'c9_compapp_icse_09_001',
            starter: J`for (int i = 1; i <= 4; i++) {
  for (int j = 1; j <= i; j++) {
    System.out.print(j);
  }
  System.out.println();
}`,
            predict: {
              code: J`for (int i = 1; i <= 3; i++) {
  for (int j = 1; j <= 3; j++) {
    System.out.print(i * j + " ");
  }
  System.out.println();
}`,
              note: 'One loop walks rows, the inner walks benches — the corpus opens the chapter exactly like this.',
            },
          },
        ],
      },
    ],
  },
  {
    key: 'c10', label: 'Class 10', engine: 'java',
    chapters: [
      {
        key: 'c10_ch1', label: 'Revision of Class IX Fundamentals',
        nodeId: 'c10_compapp_icse_01_001',
        topics: [
          {
            key: 'c10_rev', label: 'Value, type and variable recap',
            nodeId: 'c10_compapp_icse_01_001',
            predict: {
              code: J`int total = 7;
int count = 2;
System.out.println(total / count);
double avg = total / (double) count;
System.out.println(avg);`,
              note: 'The cast (double) promotes BEFORE the division — predict both lines carefully.',
            },
          },
        ],
      },
      {
        key: 'c10_ch3', label: 'User-defined Methods',
        nodeId: 'c10_compapp_icse_03_001',
        topics: [
          {
            key: 'c10_methods', label: 'Write once, call anywhere',
            nodeId: 'c10_compapp_icse_03_001',
            starter: J`static int square(int n) {
  return n * n;
}
System.out.println(square(9));
System.out.println(square(square(2)));`,
            predict: {
              code: J`static void swap(int a, int b) {
  int t = a;
  a = b;
  b = t;
}
int x = 1;
int y = 9;
swap(x, y);
System.out.println(x + " " + y);`,
              note: 'Primitives are passed BY VALUE — the method swaps its copies, never the caller\'s variables. The classic ICSE logical-error question.',
            },
            clinic: [
              {
                code: J`static int doubleIt(int n) {
  n = n * 2;
}
System.out.println(doubleIt(4));`,
                bug: 'compile',
                hint: 'The method promises to return an int — which path forgets the return?',
              },
            ],
          },
        ],
      },
      {
        key: 'c10_ch7', label: 'Arrays',
        nodeId: 'c10_compapp_icse_07_001',
        topics: [
          {
            key: 'c10_arrays', label: 'One name, many boxes',
            nodeId: 'c10_compapp_icse_07_001',
            starter: J`int[] marks = new int[4];
marks[0] = 88;
marks[1] = 92;
marks[2] = 79;
marks[3] = 95;
int sum = 0;
for (int i = 0; i < marks.length; i++) {
  sum += marks[i];
}
System.out.println(sum);
System.out.println(sum / marks.length);`,
            predict: {
              code: J`int[] a = {5, 10, 15};
System.out.println(a[1]);
System.out.println(a[3]);`,
              note: 'Indexes run 0..length-1. a[3] does not exist — which exception does the JVM name?',
            },
            clinic: [
              {
                code: J`int[] a = new int[3];
a[3] = 7;
System.out.println(a[3]);`,
                bug: 'runtime',
                hint: 'Count the valid indexes for length 3.',
              },
            ],
          },
        ],
      },
      {
        key: 'c10_ch8', label: 'Strings',
        nodeId: 'c10_compapp_icse_08_001',
        topics: [
          {
            key: 'c10_strings', label: 'Immutable text: length, charAt, substring',
            nodeId: 'c10_compapp_icse_08_001',
            starter: J`String word = "IMMUTABLE";
System.out.println(word.length());
System.out.println(word.charAt(0));
System.out.println(word.substring(2, 5));
System.out.println(word.toLowerCase());`,
            predict: {
              code: J`String s = "ICSE";
int n = s.length();
System.out.println(s + n);
System.out.println(s.charAt(n - 1));`,
            },
          },
        ],
      },
    ],
  },
  // -------------------------------------------------------- classes 11-12
  {
    key: 'c11', label: 'Class 11', engine: 'concepts',
    chapters: [
      {
        key: 'c11_ch2', label: 'Boolean Algebra',
        nodeId: undefined, enhancedNodeId: 'c11_cs_cbse_02_001',
        topics: [
          {
            key: 'c11_bool', label: 'Boolean logic the runtime can execute',
            enhancedNodeId: 'c11_cs_cbse_02_001',
            starter: J`boolean p = true;
boolean q = false;
System.out.println(p && q);
System.out.println(p || q);
System.out.println(!p);
System.out.println((p && !q) || false);`,
            predict: {
              code: J`boolean a = true;
boolean b = false;
boolean r = (a || b) && !(a && b);
System.out.println(r);`,
              note: 'XOR in disguise — exactly one of a, b true.',
            },
          },
        ],
      },
      {
        key: 'c11_ch3', label: 'Problem Solving & Algorithms',
        enhancedNodeId: 'c11_cs_cbse_03_001',
        topics: [
          {
            key: 'c11_algo', label: 'Algorithms → flowcharts → programs',
            enhancedNodeId: 'c11_cs_cbse_03_001',
            starter: J`// stepwise refinement: largest of three
int a = 12;
int b = 45;
int c = 27;
int largest = a;
if (b > largest) largest = b;
if (c > largest) largest = c;
System.out.println(largest);`,
          },
        ],
      },
      {
        key: 'c11_ch5', label: 'Control Flow (concepts)',
        enhancedNodeId: 'c11_cs_cbse_05_001',
        topics: [
          {
            key: 'c11_flow', label: 'Sequence, selection, iteration',
            enhancedNodeId: 'c11_cs_cbse_05_001',
            predict: {
              code: J`int n = 5;
int fact = 1;
int i = 1;
while (i <= n) {
  fact = fact * i;
  i++;
}
System.out.println(fact);`,
            },
          },
        ],
      },
    ],
  },
  {
    key: 'c12', label: 'Class 12', engine: 'concepts',
    chapters: [
      {
        key: 'c12_ch7', label: 'Boolean Algebra',
        enhancedNodeId: 'c12_cs_cbse_07_001',
        topics: [
          {
            key: 'c12_bool', label: 'De Morgan\'s laws, executed',
            enhancedNodeId: 'c12_cs_cbse_07_001',
            starter: J`boolean p = true;
boolean q = false;
System.out.println(!(p && q));
System.out.println(!p || !q);
System.out.println(!(p || q));
System.out.println(!p && !q);`,
            predict: {
              code: J`boolean p = false;
boolean q = false;
System.out.println(!(p && q) == (!p || !q));
System.out.println(!(p || q) == (!p && !q));`,
              note: 'Both print true — De Morgan verified by machine.',
            },
          },
        ],
      },
    ],
  },
]

// --------------------------------------------------------- remediation API

export interface CodeMisconceptionData {
  found: boolean
  common_misconception?: string | null
  misconceptions?: string[]
  wrong_answer_clauses?: string[]
  diagnostic_questions?: { question: string; answer: string }[]
}

const codeNodeCache = new Map<string, CodeMisconceptionData>()

/**
 * fetchCodeNode — authored misconception content for an ICSE corpus node
 * via the sandbox's deterministic corpus parser. Cached; failures return
 * {found:false} and the UI renders nothing invented.
 */
export async function fetchCodeNode(nodeId: string): Promise<CodeMisconceptionData | null> {
  const hit = codeNodeCache.get(nodeId)
  if (hit) return hit
  try {
    const r = await fetch(`/api/sandbox/code-node/${encodeURIComponent(nodeId)}`)
    if (!r.ok) return { found: false }
    const d = await r.json() as CodeMisconceptionData
    codeNodeCache.set(nodeId, d)
    return d
  } catch {
    return { found: false }
  }
}
