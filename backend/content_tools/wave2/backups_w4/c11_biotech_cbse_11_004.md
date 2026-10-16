## ELI5
In simple words: Perl regular expressions (regex) are a powerful pattern-matching syntax used to search, extract, and manipulate biological sequence data by defining search patterns using metacharacters, quantifiers, and character classes that match specific nucleotide or amino acid motifs in DNA, RNA, or protein sequences.

## DEFINITION
Perl regular expressions (regex) are a powerful pattern-matching syntax used to search, extract, and manipulate biological sequence data by defining search patterns using metacharacters, quantifiers, and character classes that match specific nucleotide or amino acid motifs in DNA, RNA, or protein sequences.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to write Perl regex patterns to identify biological motifs (e.g., restriction enzyme sites, start codons, promoter elements) in a given FASTA sequence and explain the function of each metacharacter used in the pattern.

## SCOPE_BOUNDARY
This node covers Perl regex syntax (metacharacters, quantifiers, anchors, character classes, capture groups), application to biological sequence analysis (motif finding, ORF detection, restriction mapping), and basic Perl script structure for bioinformatics. It does NOT cover advanced Perl modules (BioPerl), complex parsing of GenBank/FASTA formats, or statistical analysis of sequence data.

## WALKTHROUGH
Imagine you have a 5000-base-pair DNA sequence from a patient sample and need to find all occurrences of the EcoRI restriction site (GAATTC) to design a cloning strategy. Manual searching is impossible. This is where Perl regex becomes your molecular scissors. We begin by learning the "alphabet" of regex: literal characters match themselves, but metacharacters like `.` (any base), `[AT]` (A or T), `*` (zero or more), `+` (one or more), and `^`/`$` (sequence ends) let us describe patterns like "start codon followed by any codons until a stop codon." You will write a Perl script that reads a sequence, applies the regex `/ATG(?:...)*?(?:TAA|TAG|TGA)/` to find open reading frames, and prints their positions. The key insight: regex transforms vague biological questions ("find all possible genes") into precise computational patterns the computer can execute in milliseconds.

## DIAGNOSTIC_QUESTION_1
What does the Perl regex pattern `/A[TC]G/` match in a DNA sequence, and how many different 3-base sequences can it match?

## DIAGNOSTIC_ANSWER_1
The pattern `/A[TC]G/` matches any 3-base sequence starting with A, ending with G, and having either T or C in the middle. It can match exactly 2 sequences: ATG and ACG. A wrong answer (e.g., "matches ATG only" or "matches 4 sequences") reveals the student does not understand that square brackets define a character class matching exactly ONE character from the set, not all combinations simultaneously.

## DIAGNOSTIC_QUESTION_2
A student writes the Perl regex `/ATG.*TAA/` to find open reading frames starting with ATG and ending with TAA. Explain why this pattern will incorrectly match the sequence `ATGXXXTAAYYYTAA` as a single ORF instead of two separate ORFs, and which quantifier modifier fixes this.

## DIAGNOSTIC_ANSWER_2
The `.*` quantifier is greedy by default—it matches as many characters as possible, so it consumes everything from the first ATG to the last TAA, skipping the intermediate TAA. The fix is to use the non-greedy quantifier `.*?` (adding `?` after `*`), making the pattern `/ATG.*?TAA/` which stops at the first TAA encountered. A wrong answer indicates the student does not understand greedy vs. non-greedy (lazy) matching, a critical concept for biological sequence parsing where the earliest stop codon defines the ORF.

## DIAGNOSTIC_QUESTION_3
Write a Perl regex pattern with capture groups to extract the recognition site and the overhang sequence from a restriction enzyme description string: `"EcoRI: G^AATTC"`. The pattern should capture "GAATTC" as the full site and "AATTC" as the 5' overhang after the cut (marked by ^).

## DIAGNOSTIC_ANSWER_3
Pattern: `/(\w+):\s*(\w)\^(\w+)/` — Step 1: `(\w+)` captures enzyme name "EcoRI". Step 2: `:\s*` matches colon and optional spaces. Step 3: `(\w)` captures the single base before `^` ("G"). Step 4: `\^` matches literal caret. Step 5: `(\w+)` captures bases after `^` ("AATTC"). The full site is `$2$3` (concatenation of captures 2 and 3). A wrong answer (e.g., missing capture groups or not escaping `^`) reveals the student cannot decompose a structured biological string into reusable components using capture groups.

## DIAGNOSTIC_QUESTION_4
Compare the regex patterns `/TATA[AT]A[AT]/` and `/TATA[AT]{2}/` for finding TATA-box promoter variants. Which pattern is more biologically accurate for the consensus TATAAA/TATATA, and why does the other pattern produce false positives?

## DIAGNOSTIC_ANSWER_4
`/TATA[AT]A[AT]/` is more accurate: it matches TATAAA and TATATA (6 bases), the known variants. `/TATA[AT]{2}/` matches TATAAA, TATATA, TATAAT, TATATT (4 variants) — the last two are false positives because they lack the conserved A at position 5. A wrong answer shows the student cannot map quantifier syntax `{n}` to positional conservation in biological motifs, treating regex as purely syntactic without semantic biological constraints.

## DIAGNOSTIC_QUESTION_5
A colleague claims: "Since Perl regex can find any pattern, we don't need specialized algorithms like Smith-Waterman for local sequence alignment; we can just use regex with wildcards." Evaluate this claim using the concepts of regex limitations and alignment scoring.

## DIAGNOSTIC_ANSWER_5
The claim is false. Regex performs exact or degenerate pattern matching (presence/absence) but cannot handle: (1) gaps/indels of variable length (regex `.*` matches any length but cannot score gap penalties), (2) substitution matrices (BLOSUM62) scoring conservative vs. non-conservative changes, (3) optimal substructure required for dynamic programming. Regex finds predefined patterns; alignment discovers similarity without a predefined motif. A wrong evaluation reveals the student conflates pattern matching (searching for known motifs) with sequence alignment (measuring similarity between unknown sequences).

## DIAGNOSTIC_QUESTION_6
Design a Perl regex pattern (with explanation) to find all potential N-linked glycosylation sites (consensus: Asn-X-Ser/Thr, where X ≠ Pro) in a protein sequence string. The pattern must use a negative lookahead or character class exclusion to enforce X ≠ Pro.

## DIAGNOSTIC_ANSWER_6
Pattern: `/N[^P][ST]/` — Explanation: `N` matches Asn; `[^P]` is a negated character class matching any amino acid except Pro; `[ST]` matches Ser or Thr. This correctly enforces the biological constraint. Alternative using negative lookahead: `/N(?!P)[ST]/` (but this only checks next char is not P, then matches any char for X — incorrect). A poor answer (e.g., `/N.[ST]/` or `/N(?!P).../`) reveals the student cannot translate "X ≠ Pro" into the correct regex construct (negated character class `[^P]` vs. lookahead) and does not understand that `.` matches Pro, violating the biological rule.

## COMMON_MISCONCEPTION
Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write patterns like `/ATG.*?TAA/s` assuming it works across multi-line FASTA sequences. In reality, `.` does NOT match newline unless the `/s` (single-line) modifier is used. This causes silent failures when parsing multi-line FASTA files where sequence lines are wrapped at 60-80 characters — the regex stops at the first newline, missing ORFs that span line breaks. The error stems from confusing Perl's `/s` modifier (dot matches newline) with `/m` modifier (anchors match line boundaries), and from not testing with realistic wrapped FASTA input.

## ON_FAILURE
1. Show the student a wrapped FASTA sequence (e.g., 80 chars/line) containing an ORF split across two lines. 2. Have them run their regex `/ATG.*?TAA/` without `/s` — it returns no match. 3. Explain: "The dot stops at newline. The ORF is there but broken by line wrapping." 4. Demonstrate fix: add `/s` modifier: `/ATG.*?TAA/s`. 5. Contrast with `/m` modifier: `^` and `$` match line starts/ends, not string ends. 6. Assign practice: write a script that reads a multi-line FASTA, removes newlines (or uses `/s`), then finds all ORFs > 100 codons. This concrete debugging cycle replaces the abstract misunderstanding with a verified mental model.

## PREREQUISITE_NODE_IDS
c11_biotech_cbse_11_001, c11_biotech_cbse_11_002, c11_biotech_cbse_11_003
## PREREQUISITE_REASONS
c11_biotech_cbse_11_001: Provides the foundational understanding of why programming is essential for handling high-throughput biological data, establishing the context for learning Perl.
c11_biotech_cbse_11_002: Introduces basic programming concepts (variables, loops, conditionals) and Python syntax, which transfer to Perl's scalar/array/hash variables and control structures.
c11_biotech_cbse_11_003: Familiarizes students with biological sequence objects (Bio::Seq) and motif analysis, giving domain context for why regex patterns like restriction sites or ORFs matter.

## FORWARD_NODE_IDS
c11_biotech_cbse_11_006, c11_biotech_cbse_11_007, c11_biotech_cbse_11_009
## FORWARD_REASONS
c11_biotech_cbse_11_006: File handling of FASTA/GenBank requires regex to parse headers, extract sequences, and split multi-line records — direct application of pattern matching.
c11_biotech_cbse_11_007: Sequence manipulation (transcription, translation) uses regex to find start/stop codons, splice sites, and reading frames before applying biological rules.
c11_biotech_cbse_11_009: Parsing biological data formats (GFF, BLAST output, PDB) relies heavily on regex to extract fields, coordinates, and annotations from structured text.

## CROSS_SUBJECT_PREREQS
c10_bio_cbse_04_002, c10_bio_cbse_04_004, c9_bio_ch4_8
## CROSS_SUBJECT_REASONS
c10_bio_cbse_04_002: Mendel's monohybrid crosses involve recognizing phenotypic patterns (3:1 ratios) — analogous to regex recognizing sequence patterns in biological data.
c10_bio_cbse_04_004: Mendel's laws (segregation, independent assortment) describe predictable inheritance patterns; regex formalizes pattern recognition in molecular sequences (codons, motifs).
c9_bio_ch4_8: Binomial nomenclature uses structured naming patterns (Genus species); regex similarly uses structured syntax to match biological identifiers and motifs.

## CHAIN_DESCRIPTION
c11_biotech_cbse_11_001 -> c11_biotech_cbse_11_004 -> c11_biotech_cbse_11_006

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c10_bio_cbse_04_002 | Pattern recognition in Mendelian ratios (3:1) mirrors regex pattern matching in sequences — both identify recurring biological signatures from raw data.
c10_bio_cbse_04_004 | Mendel's law of segregation describes allele separation as a predictable pattern; regex captures predictable sequence patterns (e.g., splice sites GT-AG) using formal syntax.
c9_bio_ch4_8 | Taxonomic naming follows strict pattern rules (capitalized genus, lowercase species); regex enforces syntactic patterns for biological identifiers (e.g., gene symbols like /^[A-Z][A-Z0-9]*$/).

## PREREQ_CONCEPT
Basic programming constructs (variables, loops, conditionals) and familiarity with biological sequence concepts (codons, reading frames, restriction sites).

## PREREQ_BEFORE
Student must be able to write a simple Perl script that reads a string variable, uses a loop to iterate over characters, and prints output — without regex.

## PREREQ_STUCK
Revisit c11_biotech_cbse_11_002 (Python basics) and translate a simple Python loop/print script to Perl syntax (scalar variables with $, arrays with @, foreach loop).

## WORKED_EXAMPLE_1
PROBLEM: A researcher has the DNA sequence `ATGCGATACGTAAATGCGATAG` (24 bp). Write a Perl script using regex to find all open reading frames (ORFs) in the forward reading frame (frame 1) that start with ATG and end with the first in-frame stop codon (TAA, TAG, or TGA). Print the start position (1-based), end position, and length of each ORF.
STEPS:
- Step 1: Store the DNA sequence in a scalar variable `$dna = 'ATGCGATACGTAAATGCGATAG';` and define the regex pattern for an ORF in frame 1: `/ATG(?:...)*?(?:TAA|TAG|TGA)/g` — the `g` modifier enables global matching to find all non-overlapping occurrences.
- Step 2: The pattern breakdown: `ATG` matches start codon literally; `(?:...)*?` is a non-capturing group matching any codon (3 bases) zero or more times, non-greedily (`*?`); `(?:TAA|TAG|TGA)` matches the first in-frame stop codon using alternation.
- Step 3: Use a while loop with the regex in scalar context: `while ($dna =~ /ATG(?:...)*?(?:TAA|TAG|TGA)/g) { ... }` — each iteration finds the next ORF, and `$-[0]`, `$+[0]` give 0-based start/end positions of the entire match.
- Step 4: Convert to 1-based coordinates: `$start = $-[0] + 1; $end = $+[0];` (since `$+[0]` is 1-past-end in 0-based). Calculate length: `$len = $end - $start + 1;`
- Step 5: Print formatted output for each ORF. Verify by manually scanning: Sequence has ATG at pos 1, then CGT ATA CGT AAA TGC GAT AG — first in-frame stop is TAA at pos 13-15 (bases 13-15: TAA). Second ATG at pos 16, then GAT AG — no in-frame stop (needs 3 bases). So only one ORF: pos 1-15, length 15.
- Step 6: Run script mentally: Match 1: `$-[0]=0`, `$+[0]=15` → start=1, end=15, len=15. Output: "ORF 1: 1-15 (15 bp)". No more matches.
REASONING: The non-greedy quantifier `*?` ensures the match stops at the FIRST in-frame stop codon, not the last. The `(?:...)` non-capturing groups avoid overhead of capturing every codon. The `/g` modifier with while loop iterates through all non-overlapping matches in the string. Position variables `$-[0]`/`$+[0]` are Perl's built-in match position arrays (0-based), requiring +1 conversion for biological 1-based coordinates.
ANSWER: ORF 1: Start=1, End=15, Length=15 bp

## WORKED_EXAMPLE_2
PROBLEM: Given a protein sequence `"MKTIIALSYIFCLVFADYKDDDDK"`, write a Perl regex to find all potential N-linked glycosylation sites (consensus Asn-X-Ser/Thr, X ≠ Pro) and print their 1-based positions and the matching tripeptide.
STEPS:
- Step 1: Store sequence: `$prot = 'MKTIIALSYIFCLVFADYKDDDDK';` Define pattern: `/N[^P][ST]/g` — `N` = Asn, `[^P]` = any amino acid except Pro (negated character class), `[ST]` = Ser or Thr.
- Step 2: The pattern uses a negated character class `[^P]` which matches exactly one character that is NOT P. This correctly implements "X ≠ Pro". Alternative `(?!P)` lookahead would not consume a character, breaking the 3-residue frame.
- Step 3: Use while loop with match positions: `while ($prot =~ /N[^P][ST]/g) { $pos = $-[0] + 1; $tri = $&; print "Site at $pos: $tri\n"; }` — `$&` holds the matched substring.
- Step 4: Manual verification: Sequence positions (1-based): M(1) K(2) T(3) I(4) I(5) A(6) L(7) S(8) Y(9) I(10) F(11) C(12) L(13) V(14) F(15) A(16) D(17) Y(18) K(19) D(20) D(21) D(22) D(23) K(24). Scan for N: only at position 17? Wait — sequence has no N (Asn)! D is Asp. So zero matches.
- Step 5: Modify sequence to include test case: `$prot = 'MKTIIALSYIFCLVFADYKNDSTK';` Now N at pos 20, D at 21, S at 22 → NDS matches (X=D≠P). T at 23 → next would be N? No. So one match at pos 20: NDS.
- Step 6: Run: `$-[0]=19` (0-based) → pos=20. `$& = 'NDS'`. Output: "Site at 20: NDS".
REASONING: The negated character class `[^P]` is the correct construct for "any except Pro" because it consumes one residue, maintaining the triplet frame. The `/g` modifier finds all non-overlapping matches. `$-[0]` gives 0-based start of match; `$&` gives matched text. This pattern is biologically precise: it rejects NPS, NPT but accepts NDS, NES, NGS, etc.
ANSWER: Site at 20: NDS (for modified sequence); zero sites for original sequence

## WORKED_EXAMPLE_3
PROBLEM: A GenBank entry contains the feature line: `CDS             complement(join(100..200,300..450))`. Write a Perl regex with capture groups to parse this line and extract: (1) feature type (CDS), (2) strand (complement → negative), (3) all exon coordinate pairs as an array of [start, end]. Then calculate total CDS length.
STEPS:
- Step 1: Define input line: `$line = 'CDS             complement(join(100..200,300..450))';` Note variable whitespace.
- Step 2: Regex pattern: `/^(\S+)\s+(?:complement\()?join\(((?:\d+\.\.\d+,?)*)\)\)?/` — breakdown: `^(\S+)` captures feature type (non-whitespace); `\s+` skips whitespace; `(?:complement\()?` optionally matches "complement(" (non-capturing); `join\(` matches literal; `((?:\d+\.\.\d+,?)*)` captures all exon ranges inside join; `\)\)?` matches closing parens.
- Step 3: After match, `$1` = 'CDS', `$2` = '100..200,300..450'. Strand: if line contains 'complement', strand = -1 else +1.
- Step 4: Split exon string: `@exons = split /,/, $2;` → `('100..200', '300..450')`. For each exon, split on `..`: `($start, $end) = split /\.\./, $exon;`
- Step 5: Calculate length per exon: `$len += $end - $start + 1;` (inclusive coordinates). Exon 1: 200-100+1=101. Exon 2: 450-300+1=151. Total = 252 bp.
- Step 6: Print structured output: "Feature: CDS, Strand: -1, Exons: 2, Total CDS length: 252 bp".
REASONING: This example combines regex parsing of semi-structured biological text (GenBank format) with biological computation (CDS length from exon coordinates). The regex handles optional `complement(` and nested parentheses using non-capturing groups `(?:...)` and optional `?`. Splitting the captured coordinate string converts text to computable numbers. This mirrors real bioinformatics tasks: parsing database records to extract quantitative features.
ANSWER: Feature: CDS, Strand: -1, Exons: [[100,200],[300,450]], Total CDS length: 252 bp

## COMPETENCY_QUESTION_1
QUESTION: A student writes a Perl script to find all transcription factor binding sites (TFBS) for the motif "TATAAA" (TATA box) in a promoter sequence. They use the regex `/TATAAA/g` and get 3 matches. Their colleague suggests using `/TA[T]A[A]A/g` instead, claiming it is "more flexible." Evaluate both approaches. Which regex is better for finding exact TATA boxes? If the consensus is actually degenerate (TATA[AT]A[AT]), write the correct regex and explain why the student's original regex would miss biologically valid sites.
COMPETENCY: Comparing and justifying computational approaches for biological pattern matching
STEPS:
- Step 1: Analyze student's regex `/TATAAA/g` — matches only exact string "TATAAA".
- Step 2: Analyze colleague's regex `/TA[T]A[A]A/g` — `[T]` matches only T, `[A]` matches only A, so it is functionally identical to `/TATAAA/g` but more verbose. No added flexibility.
- Step 3: Biological reality: TATA box consensus is degenerate (TATAAA, TATATA, TATAA, etc.). The correct degenerate regex is `/TATA[AT]A[AT]/` which matches TATAAA (pos5=A, pos6=A) and TATATA (pos5=T, pos6=A) — the two most common variants.
- Step 4: Student's regex misses TATATA (valid biological site) because it requires A at position 5. This is a false negative.
- Step 5: Conclusion: Colleague's regex adds no value. Degenerate regex captures biological variation. Exact matching is only appropriate for restriction sites (fixed sequence).
ANSWER: The student's regex `/TATAAA/g` and colleague's `/TA[T]A[A]A/g` are equivalent — both match only exact "TATAAA". Neither is "more flexible." For degenerate TATA consensus (TATA[AT]A[AT]), the correct regex is `/TATA[AT]A[AT]/g`. The student's regex misses TATATA (a known functional variant), causing false negatives. Degenerate motifs require character classes `[AT]`, not literal matching.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: You are analyzing a viral genome (12 kb) to find all potential frameshift signals of the form "XXX YYY Z" where XXX is a slippery sequence (heptamer: X XXY YYZ), YYY is a spacer (3-9 nt), and Z is a structural element (stem-loop). The slippery sequence consensus is `/[AUC] [AUC] [AUC] [AUC] [AUC] [AUC] [AUC]/` but with constraints: positions 1-3 identical, 4-6 identical, 7 different from 4-6. Write a Perl regex using backreferences to capture the slippery heptamer, then match a spacer of 3-9 nucleotides, then a stem-loop pattern (simplified: 4+ bases, then reverse complement within 30 nt). Explain why regex alone cannot fully validate the stem-loop and what additional computation is needed.
COMPETENCY: Translating complex biological specifications into regex with backreferences, and evaluating regex limitations for structural prediction
STEPS:
- Step 1: Slippery heptamer with backreferences: `([AUC])\1\1([AUC])\2\2([AUC])` — captures base1, repeats 3x (pos1-3); captures base4, repeats 3x (pos4-6); captures base7. Constraint: base7 ≠ base4 → use negative lookahead: `(?!\2)` before third capture: `([AUC])\1\1([AUC])\2\2(?!\2)([AUC])`.
- Step 2: Spacer: `.{3,9}` (3-9 any nucleotides).
- Step 3: Stem-loop simplified: `(.{4,}).{0,30}??` — but reverse complement cannot be expressed in regex (requires complement + reverse). Regex cannot compute reverse complement of a capture.
- Step 4: Full regex attempt: `/([AUC])\1\1([AUC])\2\2(?!\2)([AUC]).{3,9}(.{4,}).{0,30}/` — captures slippery (3 groups), spacer, stem sequence. But cannot enforce stem-loop pairing.
- Step 5: Additional computation needed: For each regex match, extract stem candidate `$4`, compute its reverse complement (A↔U, C↔G, reverse string), then search within 30 nt downstream for that exact string using a second regex or index().
- Step 6: Conclusion: Regex identifies slippery+spacer candidates efficiently; structural validation requires algorithmic complementarity check (O(n) per candidate), not pure regex.
ANSWER: Slippery regex: `/([AUC])\1\1([AUC])\2\2(?!\2)([AUC])/.{3,9}/` captures constrained heptamer. Stem-loop validation requires post-regex computation: extract candidate stem, compute reverse complement (tr/ACUG/UGAC/ + reverse), search nearby. Pure regex cannot do reverse complement or arithmetic distance constraints — needs procedural code.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Perl regular expressions (regex) are a powerful pattern-matching syntax used to search, extract, and manipulate biological sequence data by defining search patterns using ______, quantifiers, and character classes that match specific nucleotide or amino acid motifs in DNA, RNA, or protein sequences.

## DIAGNOSTIC_ANSWER_7
metacharacters

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you have a 5000-base-pair DNA sequence from a patient sample and need to find all ______ of the EcoRI restriction site (GAATTC) to design a cloning strategy.

## DIAGNOSTIC_ANSWER_8
occurrences

## DIAGNOSTIC_QUESTION_9
What is Perl regular expressions (regex)? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Perl regular expressions (regex) are a powerful pattern-matching syntax used to search, extract, and manipulate biological sequence data by defining search patterns using metacharacters, quantifiers, and character classes that match specific nucleotide or amino acid motifs in DNA, RNA, or protein sequences.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Perl regular expressions (regex)?

## DIAGNOSTIC_ANSWER_10
Students believe the dot . metacharacter in regex matches "any character including newline" by default, and write patterns like /ATG.*?TAA/s assuming it works across multi-line FASTA sequences.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student must be able to write Perl regex patterns to identify biological motifs (e.g., restriction enzyme sites, start codons, promoter elements) in a given FASTA sequence and explain the function of each metacharacter used in the pattern.
