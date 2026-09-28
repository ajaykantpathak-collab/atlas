# -*- coding: utf-8 -*-
"""test_compapp_families.py -- hand-verified textbook-style cases for
model_compapp.  Every expected value below is hand-computed:

  (1011)2 = 11 decimal ; 45 decimal = 101101 binary ; 200 decimal -> C8 hex
  1011 binary + 0110 binary = 10001 binary (11 + 6 = 17)
  (23)8 - (15)8 = (6)8    (19 - 13 = 6) ; 2F + 1A hex = 49 hex (47 + 26 = 73)
  8 bits -> 256 values ; largest 5-bit = 31 ; 100 needs 7 bits (2^6=64 < 100 <= 128)
  MSB weight of a 6-bit number = 2^5 = 32
  2 MB = 2048 KB ; 3 GB = 3072 MB ; 4 bytes = 32 bits
  AND(1,0)=0 ; NAND truth table rows 1,1,1,0 ; NOT(0)=1 ; XOR(1,1)=0
  half adder A=1 B=1 -> Sum 0 Carry 1
  A + A.B simplifies to A (absorption) ; De Morgan: (A + B)' = A' . B'
  A.B + C at A=1 B=0 C=1 = 1
  Math.pow(2,10) = 1024.0 ; Math.sqrt(144) = 12.0 ; Math.ceil(-3.5) = -3.0
  sum 1..10 = 55 ; 5! = 120 ; sum of odd 1..9 = 25 ; break at i=5 gives 10
  x=5: x++ + ++x = 5 + 7 = 12 ; 7/2 int = 3 ; 7%2 = 1 ; (double)7/2 = 3.5
  (int)9.99 = 9 ; (char)('A'+2) = C ; PROGRAM length 7
  HELLO charAt(1) = E ; substring(1,3) = EL ; indexOf(L) = 2
  compareTo book/bottle: 'o'-'t' = 111-116 = -5
  string immutability: s.concat returns new string, s unchanged
  1+2+"3"+4+5 -> "3345" ; print-loop 5..1 -> 54321
  escape \n = newline ; \t = tab
  ASCII A = 65, Z = 90 ; char = 16-bit unsigned 0-65535
  <br> line break ; <hr> horizontal rule ; <a> hyperlink ; <ul> bullets

STEP CONTRACT (standard bar, enforced below on every matched case):
  len(steps) >= 3 AND sum(len(step)) >= 150 chars, shaped as
  method/rule line -> substitution -> computation -> verification ->
  interpretation.  Output prediction must carry an explicit trace.
  Thin steps are a permanent test failure.

NEGATIVE REQUIREMENT: compapp families must DECLINE on other-subject
probes (maths/economics/physics/biology) and on taught-subset
violations (nested loops, arrays, recursion, objects, Scanner).
"""
import sys
try:
    sys.path.insert(0, 'D:/platform')
    from backend.its.solver.compapp_families import model_compapp
except SyntaxError:
    # a sibling subject's solver file is mid-edit in the root tree;
    # fall back to the deploy tree copy (kept identical).
    for mod in [m for m in list(sys.modules)
                if m == 'backend' or m.startswith('backend.')]:
        del sys.modules[mod]
    sys.path = [p for p in sys.path if p != 'D:/platform']
    sys.path.insert(0, 'D:/platform/deploy')
    from backend.its.solver.compapp_families import model_compapp

# (question, expected_structure, expected_numeric, answer_substring)
CASES = [
    # ---- number systems: conversions ----
    ("Convert (1011)2 to decimal.", "BASE_CONVERT", 11.0, None),
    ("Convert 45 to binary.", "BASE_CONVERT", 45.0, "101101"),
    ("What is the hexadecimal equivalent of 200?", "BASE_CONVERT",
     200.0, "C8"),
    ("Convert binary 1011 to octal.", "BASE_CONVERT", 11.0, "(13)8"),
    ("Convert (2F)16 to decimal.", "BASE_CONVERT", 47.0, None),
    ("Convert 25 to hexadecimal.", "BASE_CONVERT", 25.0, "(19)16"),
    ("Convert the decimal number 100 to octal.", "BASE_CONVERT", 100.0,
     "(144)8"),
    # ---- number systems: arithmetic in base ----
    ("Add binary 1011 and 0110.", "BASE_ARITHMETIC", 17.0, "(10001)2"),
    ("Subtract (15)8 from (23)8", "BASE_ARITHMETIC", 6.0, "(6)8"),
    ("Add (2F)16 and (1A)16", "BASE_ARITHMETIC", 73.0, "(49)16"),
    # ---- bits: range / weight ----
    ("How many different values can 8 bits represent?", "BITS_RANGE",
     256.0, None),
    ("What is the largest decimal number that can be represented in "
     "5 bits?", "BITS_RANGE", 31.0, None),
    ("How many bits are needed to represent 100?", "BITS_RANGE", 7.0,
     None),
    ("What is the MSB weight in a 6-bit number?", "BIT_WEIGHT", 32.0,
     None),
    ("For the binary number (101101)2, state the MSB and LSB with "
     "their weights.", "BIT_WEIGHT", 32.0, "MSB"),
    # ---- storage units ----
    ("How many KB are there in 2 MB?", "STORAGE_UNITS", 2048.0, None),
    ("Convert 3 GB to MB.", "STORAGE_UNITS", 3072.0, None),
    ("How many bits are there in 4 bytes?", "STORAGE_UNITS", 32.0,
     None),
    ("How many bytes make 1 TB?", "STORAGE_UNITS", 1099511627776.0,
     None),
    # ---- logic gates ----
    ("What is the output of an AND gate whose inputs are 1 and 0?",
     "LOGIC_GATE", 0.0, None),
    ("Draw the truth table for a NAND gate.", "LOGIC_GATE", None,
     "A=1,B=1 -> 0"),
    ("A NOT gate receives input 0. What is its output?", "LOGIC_GATE",
     1.0, None),
    ("Evaluate XOR(1, 1).", "LOGIC_GATE", 0.0, None),
    ("What does a NOR gate output for inputs A=0 and B=0?",
     "LOGIC_GATE", 1.0, None),
    # ---- half adder ----
    ("A half adder has inputs A=1 and B=1. Give its Sum and Carry.",
     "HALF_ADDER", 2.0, "Sum = 0, Carry = 1"),
    # ---- boolean algebra ----
    ("Simplify the boolean expression A + A.B and name the law.",
     "BOOL_SIMPLIFY", None, "absorption"),
    ("Verify De Morgan theorem: (A + B)' = A'.B'", "BOOL_SIMPLIFY",
     None, "De Morgan"),
    ("Evaluate the boolean expression A.B + C where A=1, B=0, C=1",
     "BOOL_EVAL", 1.0, None),
    # ---- Math library ----
    ("Find the value of Math.pow(2, 10).", "MATH_METHOD_EVAL", 1024.0,
     None),
    ("Evaluate Math.sqrt(144)", "MATH_METHOD_EVAL", 12.0, "12.0"),
    ("What does Math.ceil(-3.5) return?", "MATH_METHOD_EVAL", -3.0,
     None),
    ("Evaluate Math.floor(4.7)", "MATH_METHOD_EVAL", 4.0, None),
    # ---- Java output prediction (trace-evaluated) ----
    ("Predict the output: int s = 0; for (int i = 1; i <= 10; i++) "
     "{ s += i; } System.out.println(s);", "JAVA_TRACE", 55.0, None),
    ("Predict the output: int p = 1; for (int i = 1; i <= 5; i++) "
     "p *= i; System.out.println(p);", "JAVA_TRACE", 120.0, None),
    ("What is the output? int i = 0; while (i < 3) "
     "{ System.out.println(i); i++; }", "JAVA_TRACE", None, "0 | 1 | 2"),
    ("Predict the output: int x = 5; int y = x++ + ++x; "
     "System.out.println(y);", "JAVA_TRACE", 12.0, None),
    ("Predict the output: int a = 7, b = 2; "
     "System.out.println(a / b); System.out.println(a % b);",
     "JAVA_TRACE", None, "3 | 1"),
    ("Predict the output: double d = 7 / 2; "
     "System.out.println(d);", "JAVA_TRACE", 3.0, None),
    ("Predict the output: double d = (double) 7 / 2; "
     "System.out.println(d);", "JAVA_TRACE", 3.5, None),
    ("Predict the output: int n = (int) 9.99; "
     "System.out.println(n);", "JAVA_TRACE", 9.0, None),
    ("Predict the output: int s = 0; for (int i = 1; i <= 10; i++) "
     "{ if (i % 2 == 0) continue; s += i; } System.out.println(s);",
     "JAVA_TRACE", 25.0, None),
    ("Predict the output: int s = 0; for (int i = 1; i <= 10; i++) "
     "{ if (i > 4) break; s += i; } System.out.println(s);",
     "JAVA_TRACE", 10.0, None),
    ("Predict the output: int x = 10; int y = (x > 5) ? 100 : 200; "
     "System.out.println(y);", "JAVA_TRACE", 100.0, None),
    ("Predict the output: System.out.println(2 + 3 * 4);",
     "JAVA_TRACE", 14.0, None),
    ("Predict the output: System.out.println(1 + 2 + \"3\" + 4 + 5);",
     "JAVA_TRACE", None, "3345"),
    ("Predict the output: switch (2) { case 1: "
     "System.out.println(\"one\"); break; case 2: "
     "System.out.println(\"two\"); break; default: "
     "System.out.println(\"other\"); }", "JAVA_TRACE", None, "two"),
    ("Predict the output: int x = 3; if (x % 2 == 0) "
     "{ System.out.println(\"even\"); } else "
     "{ System.out.println(\"odd\"); }", "JAVA_TRACE", None, "odd"),
    ("Predict the output: for (int i = 5; i >= 1; i--) "
     "System.out.print(i);", "JAVA_TRACE", None, "54321"),
    ("Predict the output: int i = 5; do "
     "{ System.out.println(i); i++; } while (i < 5);", "JAVA_TRACE",
     5.0, None),
    ("Predict the output: char ch = (char)('A' + 2); "
     "System.out.println(ch);", "JAVA_TRACE", None, "C"),
    ("Predict the output: int n = 4; int f = 1; int i = 1; "
     "while (i <= n) { f *= i; i++; } System.out.println(f);",
     "JAVA_TRACE", 24.0, None),
    # ---- string methods ----
    ("Predict the output: System.out.println(\"PROGRAM\".length());",
     "JAVA_TRACE", 7.0, None),
    ("Predict the output: System.out.println(\"HELLO\".charAt(1));",
     "JAVA_TRACE", None, "E"),
    ("Predict the output: System.out.println(\"HELLO\""
     ".substring(1, 3));", "JAVA_TRACE", None, "EL"),
    ("Predict the output: System.out.println(\"HELLO\""
     ".indexOf(\"L\"));", "JAVA_TRACE", 2.0, None),
    ("Predict the output: String s = \"Java\"; s.concat(\"! ok\"); "
     "System.out.println(s);", "JAVA_TRACE", None, "Java"),
    ("Predict the output: System.out.println(\"book\""
     ".compareTo(\"bottle\"));", "JAVA_TRACE", -5.0, None),
    # ---- escape sequences ----
    ("What does the escape sequence \\n represent in Java?",
     "ESCAPE_SEQ", None, "NEXT LINE"),
    ("Which escape sequence inserts a horizontal tab?",
     "ESCAPE_SEQ", None, "\\t"),
    # ---- ASCII / Unicode ----
    ("What is the ASCII value of 'A'?", "ASCII_UNICODE", 65.0, None),
    ("What is the ASCII value of Z?", "ASCII_UNICODE", 90.0, None),
    ("What is the Unicode range of the char data type in Java?",
     "ASCII_UNICODE", 65535.0, "65535"),
    ("What is the difference between the ASCII codes of 'a' and 'A'?",
     "ASCII_UNICODE", 32.0, None),
    # ---- HTML tag purpose ----
    ("What is the purpose of the <br> tag?", "HTML_TAG_PURPOSE", None,
     "LINE BREAK"),
    ("Which tag is used to insert a horizontal line?", 
     "HTML_TAG_PURPOSE", None, "<hr>"),
    ("Which tag creates a hyperlink?", "HTML_TAG_PURPOSE", None, "<a>"),
    ("Which tag creates a bulleted list?", "HTML_TAG_PURPOSE", None,
     "<ul>"),
    ("What does the <title> tag do?", "HTML_TAG_PURPOSE", None,
     "browser TAB"),
    ("Which tag is used for the largest heading?", "HTML_TAG_PURPOSE",
     None, "h1"),
]

# probes where model_compapp MUST NOT match (gates / other subjects)
MUST_DECLINE = [
    # nested loops -- beyond the taught single-loop trace subset
    "Predict the output: for (int i = 1; i <= 3; i++) { for (int j = 1; "
    "j <= 3; j++) { System.out.print(i * j); } System.out.println(); }",
    # arrays -- beyond the taught subset
    "Predict the output: int[] a = {2, 4, 6}; System.out.println(a[1]);",
    # recursion / user-defined methods
    "Predict the output: int fact(int n) { return n * fact(n - 1); }",
    # objects / StringBuffer (mutable, not the taught String subset)
    "Predict the output: StringBuffer sb = new StringBuffer(\"abc\"); "
    "sb.append(\"d\"); System.out.println(sb);",
    # Scanner input -- interactive, not a closed deterministic family
    "Predict the output: Scanner sc = new Scanner(System.in); "
    "int a = sc.nextInt(); System.out.println(a * 2);",
    # infinite loop -- non-terminating
    "Predict the output: int i = 0; while (true) { i++; }",
    # ---- other subjects: must not fire ----
    "Solve 2x + 3 = 11 and find x.",
    "What is 15% of 240?",
    "Calculate the NNPfc at market price from the national income data.",
    "In a cross Tt x Tt, what is the probability of a tt offspring?",
    "A body is thrown upward with velocity 20 m/s; find the maximum "
    "height.",
    "Find the derivative of x^3 + 2x.",
    "Convert 5 metres to centimetres.",
    "Balance the equation CH4 + O2 -> CO2 + H2O.",
]


def _run():
    failures = []
    for q, exp_struct, exp_num, ans_sub in CASES:
        r = model_compapp(q)
        if not r.matched:
            failures.append("NO MATCH: %r (wanted %s)" % (q[:70],
                                                          exp_struct))
            continue
        if r.structure != exp_struct:
            failures.append("STRUCT %r -> %s (wanted %s)"
                            % (q[:70], r.structure, exp_struct))
        if exp_num is not None and r.numeric_answer != exp_num:
            failures.append("NUM %r -> %r (wanted %r)"
                            % (q[:70], r.numeric_answer, exp_num))
        if ans_sub is not None and (r.final_answer or "") \
                .find(ans_sub) < 0:
            failures.append("ANS %r -> %r (wanted substring %r)"
                            % (q[:70], r.final_answer, ans_sub))
        # ---- STEP CONTRACT (standard bar) ----
        steps = [s for s in r.steps if isinstance(s, str) and s.strip()]
        joined = " ".join(steps)
        if len(steps) < 3:
            failures.append("THIN steps (%d) on %r" % (len(steps),
                                                       q[:60]))
        if len(joined) < 150:
            failures.append("THIN chars (%d) on %r" % (len(joined),
                                                       q[:60]))
        low_first = steps[0].lower() if steps else ""
        if not any(w in low_first for w in
                   ("law", "formula", "rule", "method", "identity",
                    "relation", "principle", "theorem", "using")):
            failures.append("NO METHOD BEAT on %r" % q[:60])
        if not any(w in joined.lower() for w in
                   ("verif", "check", "sanity", "recomput", "tally",
                    "substitut", "cross")):
            failures.append("NO VERIFICATION BEAT on %r" % q[:60])
    for q in MUST_DECLINE:
        r = model_compapp(q)
        if r.matched:
            failures.append("LEAK: %r matched %s"
                            % (q[:70], r.structure))
    return failures


def main():
    fails = _run()
    n_cases = len(CASES)
    print("compapp families: %d cases + %d decline probes"
          % (n_cases, len(MUST_DECLINE)))
    if fails:
        for f in fails:
            print("FAIL", f)
        print("RESULT: RED (%d failures)" % len(fails))
        sys.exit(1)
    print("RESULT: GREEN -- all cases matched, contract-clean, all "
          "declines hold")


if __name__ == "__main__":
    main()
