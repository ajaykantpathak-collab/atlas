## DEFINITION
The genetic code is the set of rules by which information encoded in mRNA sequences (codons, three-nucleotide units) is translated into amino acid sequences during protein synthesis; the wobble hypothesis explains how a single tRNA anticodon can recognize multiple codons due to flexible base pairing at the third (5') position of the anticodon.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can (1) decode any given mRNA sequence into its corresponding amino acid sequence using the standard genetic code table, (2) explain the three key properties of the genetic code (universal, degenerate, non-overlapping, comma-less) with examples, and (3) apply the wobble rules to predict which codons a given tRNA anticodon can recognize.

## SCOPE_BOUNDARY
Covers the structure of codons, properties of the genetic code (universality, degeneracy, non-overlapping, comma-less, start/stop codons), the wobble hypothesis (Crick's rules for third-base flexibility), and the relationship between codon degeneracy and wobble. Does NOT cover translation machinery (ribosomes, initiation/elongation/termination factors), tRNA charging, or post-translational modifications — those belong to the Translation node (c12_bio_cbse_06_007).

## WALKTHROUGH
Imagine you receive a WhatsApp message written in a language where every word is exactly three letters long, there are no spaces, and the same word can mean slightly different things depending on context — that is essentially what the ribosome reads on mRNA. Begin by recalling that transcription (c12_bio_cbse_06_005) produces mRNA with a sequence of A, U, G, C. Next, observe that 4³ = 64 possible three-letter combinations (codons) must specify only 20 amino acids plus start/stop signals — this forces degeneracy. Then, use the standard codon table to translate a short mRNA fragment (e.g., AUG UUU UCU UAA) into Met-Phe-Ser-Stop. Finally, introduce Crick's wobble hypothesis: the third base of the codon (3' end) pairs loosely with the first base of the anticodon (5' end), allowing one tRNA to read multiple codons — this reduces the number of tRNAs needed and buffers against mutations.

## DIAGNOSTIC_QUESTION_1
How many different codons exist in the standard genetic code, and how many of them code for amino acids (sense codons) versus signal termination (stop codons)?

## DIAGNOSTIC_ANSWER_1
There are 64 codons (4³). 61 are sense codons specifying amino acids; 3 (UAA, UAG, UGA) are stop codons. A wrong answer (e.g., 60 sense codons) reveals the student has not memorized the exact count or confuses start codon (AUG) as separate from sense codons — AUG codes for methionine AND signals start, so it is counted among the 61.

## DIAGNOSTIC_QUESTION_2
The genetic code is described as "degenerate." Explain what this means and give a concrete example using the amino acid leucine.

## DIAGNOSTIC_ANSWER_2
Degeneracy means most amino acids are specified by more than one codon. Leucine has six codons: UUA, UUG, CUU, CUC, CUA, CUG. A wrong answer that says "degenerate means the code is broken" or "each codon codes for multiple amino acids" reveals confusion between degeneracy and ambiguity — the code is degenerate but not ambiguous (each codon specifies only one amino acid).

## DIAGNOSTIC_QUESTION_3
A tRNA molecule has the anticodon 5'-IAG-3' (where I = inosine). Using Crick's wobble rules, list all mRNA codons this tRNA can recognize and the amino acid they specify.

## DIAGNOSTIC_ANSWER_3
Inosine at the 5' anticodon position (wobble position) pairs with U, C, or A at the 3' codon position. The anticodon 5'-IAG-3' reads codons 3'-AUC-5', 3'-AUU-5', 3'-AUA-5' (written 5'→3': CUA, UUA, AUA). These are all leucine codons (CUA, UUA) and isoleucine (AUA) — wait, AUA codes for isoleucine, not leucine. Actually, 5'-IAG-3' pairs with 3'-AUC-5' (CUA, Leu), 3'-AUU-5' (UUA, Leu), 3'-AUA-5' (AUA, Ile). But a single tRNA carries only one amino acid. This reveals the student must check: in reality, tRNA^Leu with anticodon UAG (modified to IAG) reads CUA, CUG? Let's recalc: Standard wobble: I pairs with U, C, A. Anticodon 5'-IAG-3' reads codons starting with 5'-CU? Actually, codon 5'-CUA-3' pairs with anticodon 3'-GAU-5' (written 5'-UAG-3'). If first base of anticodon is I, it's 5'-IAG-3'. It pairs with codons 5'-CUN-3' where N = U, C, A? Wait, base pairing is antiparallel. mRNA codon 5'-XYZ-3' pairs with tRNA anticodon 3'-X'Y'Z'-5'. Usually we write anticodon 5'→3'. So if anticodon is 5'-IAG-3', its 3'→5' is GAI. It pairs with codon 5'-CUN-3'? Let's do properly: Codon 5'-CUA-3' pairs with anticodon 3'-GAU-5' (5'-UAG-3'). If wobble at first position of anticodon (5' end), I can pair with U, C, A of codon third position. So anticodon 5'-IAG-3' (3'-GAI-5') pairs with codons 5'-CUU-3', 5'-CUC-3', 5'-CUA-3' (all Leu). It does NOT pair with AUA because that would require anticodon 3'-UAU-5' (5'-UAU-3'). So the correct answer: This tRNA recognizes CUU, CUC, CUA (all leucine). A wrong answer listing AUA shows misunderstanding of antiparallel pairing and wobble direction.

## DIAGNOSTIC_QUESTION_4
Compare the genetic code properties "non-overlapping" and "comma-less." Are they synonymous? If not, give a hypothetical scenario where a code is non-overlapping but not comma-less.

## DIAGNOSTIC_ANSWER_4
They are distinct. Non-overlapping means each nucleotide belongs to only one codon (read in triplets consecutively). Comma-less means no punctuation (spacers) between codons; the reading frame is fixed by the start codon. A hypothetical code with a "spacer" nucleotide between each triplet (e.g., AUG X UUU X UCU) would be non-overlapping (each base still used once) but NOT comma-less (it has commas/spacers). A wrong answer saying they are the same reveals the student hasn't distinguished frame maintenance from delimiter absence.

## DIAGNOSTIC_QUESTION_5
A point mutation changes the DNA template strand sequence from 3'-TAC-5' to 3'-TAA-5' in a gene's coding region. Predict the effect on the mRNA codon and the resulting protein, assuming this is not the start codon. Justify using genetic code properties.

## DIAGNOSTIC_ANSWER_5
Original DNA template 3'-TAC-5' → mRNA 5'-AUG-3' (Met). Mutated DNA template 3'-TAA-5' → mRNA 5'-AUU-3' (Ile). This is a missense mutation (Met → Ile). The code's degeneracy did not protect against this change because the mutation altered the second base (U→A in mRNA), which is highly specific. A wrong answer claiming "no effect because code is degenerate" shows misunderstanding that degeneracy mostly involves third-base changes, not second-base.

## DIAGNOSTIC_QUESTION_6
Design a minimal set of tRNA anticodons (using standard bases A, U, G, C and inosine I) that can translate all six leucine codons (UUA, UUG, CUU, CUC, CUA, CUG). Explain how wobble reduces the number of tRNAs needed compared to a strict Watson-Crick pairing model.

## DIAGNOSTIC_ANSWER_6
Leucine codons: UUA, UUG (both UUR), CUU, CUC, CUA, CUG (all CUN). With wobble: one tRNA with anticodon 5'-UAA-3' (reads UUA, UUG via U-A and U-G wobble at third base? Actually anticodon 5'-UAA-3' pairs with 3'-AUU-5' (UUA) and 3'-AUC-5' (UUG)? Wait, standard: tRNA^Leu with anticodon UAA reads UUA and UUG? Let's use known biology: tRNA^Leu with anticodon 5'-UAA-3' (modified) reads UUA and UUG. For CUN family: one tRNA with anticodon 5'-IAG-3' reads CUU, CUC, CUA (I pairs with U,C,A). Another tRNA with anticodon 5'-CAG-3' reads CUG (C pairs with G). So minimal set = 3 tRNAs. Without wobble (strict Watson-Crick), each codon needs a unique anticodon → 6 tRNAs. Wobble reduces 6 → 3. A poor answer that lists 6 anticodons or doesn't use inosine shows failure to apply wobble rules for economy.

## COMMON_MISCONCEPTION
Students often think "wobble means the third base of the codon doesn't matter at all" — they write that any third-base change is silent. This is wrong: (1) wobble rules are specific (e.g., G in anticodon 5' position pairs only with U or C, not A), (2) some amino acids have codons split across two different first-two-base families (e.g., leucine: UUR and CUN) requiring separate tRNAs, (3) stop codons have no wobble (release factors recognize them strictly), and (4) mutations in the third base can still change the amino acid if they cross family boundaries (e.g., UUA→CUA is Leu→Leu, but UUA→UUG is Leu→Leu, but UGA→UGG is Stop→Trp). The third base matters — it's just that the code is structured to minimize impact.

## ON_FAILURE
If the student cannot apply wobble rules, have them: (1) Revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) to recall base pairing geometries, (2) Draw the anticodon-codon duplex for a specific tRNA (e.g., tRNA^Phe with anticodon 5'-GAA-3') and manually test each possible third-base substitution (UUU, UUC) to see which pair, (3) Then test a case where wobble fails (e.g., same anticodon with UUA) to see the steric clash. Re-diagnose with Diagnostic Question 3.

## PREREQUISITE_NODE_IDS
c12_bio_cbse_06_005, c11_bio_cbse_09_004, c11_biotech_cbse_07_006, c11_biotech_cbse_04_002

## PREREQUISITE_REASONS
c12_bio_cbse_06_005: Transcription produces the mRNA that carries codons; without knowing mRNA synthesis, the genetic code has no substrate.
c11_bio_cbse_09_004: Provides the chemical structure of nucleotides and base pairing rules (A-U, G-C) that underlie codon-anticodon recognition.
c11_biotech_cbse_07_006: Introduces the genetic code table and codon properties at Class 11 level; this node deepens into wobble and degeneracy mechanisms.
c11_biotech_cbse_04_002: c11_biotech_cbse_04_002 | Enzyme active site specificity (lock-and-key/induced fit) parallels the specificity of codon-anticodon pairing and wobble flexibility.  

## FORWARD_NODE_IDS
c12_bio_cbse_06_007, c12_bio_cbse_06_008
## FORWARD_REASONS
c12_bio_cbse_06_007: Translation directly uses the genetic code and wobble pairing during tRNA selection at the ribosomal A site.
c12_bio_cbse_06_008: Lac operon regulation involves mutations in operator/regulatory sequences; understanding codon changes (nonsense, missense) is essential for interpreting mutational effects on gene expression.

## CROSS_SUBJECT_PREREQS
c11_biotech_cbse_03_006, c11_biotech_cbse_03_007, c11_biotech_cbse_03_008
## CROSS_SUBJECT_REASONS
c11_biotech_cbse_03_006: DNA double helix structure explains template-directed RNA synthesis and base complementarity.
c11_biotech_cbse_03_007: RNA structure (single-stranded, U instead of T) defines the chemical nature of codons.
c11_biotech_cbse_03_008: Nucleoside/nucleotide chemistry (ribose, phosphate, base modifications like inosine) underpins wobble base modifications in tRNA.

## CHAIN_DESCRIPTION
c11_bio_cbse_09_004 -> c12_bio_cbse_06_005 -> c12_bio_cbse_06_006 -> c12_bio_cbse_06_007

## THIS_FORMULA
N/A - conceptual (genetic code table mapping 64 codons to 20 amino acids + stop; wobble pairing rules: G↔U/C, U↔A/G, I↔U/C/A, C↔G, A↔U)

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_biotech_cbse_03_006 | DNA structure and base pairing rules are the chemical foundation for codon-anticodon recognition.
c11_biotech_cbse_04_002 | Enzyme active site specificity (lock-and-key/induced fit) parallels the specificity of codon-anticodon pairing and wobble flexibility.
## PREREQ_CONCEPT
Base pairing complementarity (A-U, G-C) and the triplet nature of codons established during transcription.

## PREREQ_BEFORE
Student must be able to write the mRNA sequence transcribed from a given DNA template strand and understand that translation reads mRNA 5'→3' in triplets.

## PREREQ_STUCK
If stuck, review transcription (c12_bio_cbse_06_005) to practice DNA→mRNA conversion, and Class 11 nucleic acid structure (c11_bio_cbse_09_004) for base pairing rules.

## WORKED_EXAMPLE_1
PROBLEM: A segment of the template strand of a gene has the sequence 3'-TACTTCGAC-5'. Write the mRNA sequence transcribed from it, divide into codons, and translate into the amino acid sequence using the standard genetic code. Identify the start and stop signals if present.
STEPS:
- Step 1: Transcribe DNA template to mRNA by complementary base pairing (A→U, T→A, C→G, G→C) and reverse polarity. Template 3'-TACTTCGAC-5' → mRNA 5'-AUGAAGCUG-3'.
- Step 2: Divide mRNA into codons from the 5' end: AUG | AAG | CUG.
- Step 3: Look up each codon in the genetic code table: AUG = Methionine (Start), AAG = Lysine, CUG = Leucine.
- Step 4: Check for stop codon: N/A in this segment (UAA, UAG, UGA absent).
- Step 5: Write the peptide: Met-Lys-Leu (N-terminal to C-terminal).
REASONING: Transcription reads template 3'→5' to synthesize mRNA 5'→3'. The genetic code is read 5'→3' in non-overlapping triplets. AUG is the universal start codon coding for Met. The code's degeneracy is not needed here as each codon is unique.
ANSWER: mRNA: 5'-AUGAAGCUG-3'; Codons: AUG (Met/Start), AAG (Lys), CUG (Leu); Peptide: Met-Lys-Leu.

## WORKED_EXAMPLE_2
PROBLEM: A tRNA with anticodon 5'-GCU-3' is charged with alanine. Using wobble rules, determine all mRNA codons this tRNA can recognize. List the codons and verify they all code for alanine.
STEPS:
- Step 1: Write anticodon 5'-GCU-3'. Its 3'→5' orientation is UCG. It pairs with mRNA codon 5'-AGC-3'? Wait, antiparallel: anticodon 3'-UCG-5' pairs with codon 5'-AGC-3'. But wobble occurs at the 5' base of anticodon (G) pairing with 3' base of codon.
- Step 2: Identify wobble position: first base of anticodon (5' end) = G. Crick's rule: G in wobble position pairs with U or C in codon third position.
- Step 3: The fixed part of anticodon (positions 2 and 3) = C and U (3'→5' = C then U? Actually anticodon 5'-G-C-U-3', so positions: 1=G (wobble), 2=C, 3=U. In 3'→5' direction: U, C, G. So codon positions: 1 pairs with U (A), 2 pairs with C (G), 3 pairs with G (U/C). So codon first base = A (pairs with U), second base = G (pairs with C), third base = U or C (pairs with G). Thus codons: AGU and AGC.
- Step 4: Check genetic code: AGU = Serine, AGC = Serine. But the tRNA is charged with alanine! Contradiction. This means the anticodon 5'-GCU-3' is NOT for alanine. Alanine codons are GCU, GCC, GCA, GCG. The correct anticodon for alanine would be 5'-IGC-3' (reads GCU, GCC, GCA) and 5'-CGC-3' (reads GCG). So the problem contains a trick: the given anticodon does not match the amino acid.
- Step 5: Re-evaluate: If tRNA^Ala has anticodon 5'-IGC-3', wobble base I pairs with U, C, A → reads GCU, GCC, GCA (all Ala). Another tRNA^Ala with anticodon 5'-CGC-3' reads GCG (C pairs with G). So the minimal set for alanine is two tRNAs.
REASONING: Wobble rules are strict: the wobble base (5' of anticodon) determines which third bases of the codon can pair. The anticodon must be complementary to the codon's first two bases in standard Watson-Crick fashion. The example tests if the student blindly applies wobble without checking the fixed base pairing.
ANSWER: The anticodon 5'-GCU-3' would recognize codons AGU and AGC (both serine), not alanine. For alanine (GCU, GCC, GCA, GCG), the correct tRNAs are: one with anticodon 5'-IGC-3' (reads GCU, GCC, GCA) and one with 5'-CGC-3' (reads GCG).

## WORKED_EXAMPLE_3
PROBLEM: A mutation changes a DNA coding strand sequence from 5'-ATG GCT TAT-3' to 5'-ATG GCT TAG-3'. The original mRNA translated to Met-Ala-Tyr. Determine the type of mutation (silent, missense, nonsense) and explain using the genetic code and wobble hypothesis why this specific change has this effect.
STEPS:
- Step 1: Transcribe both sequences. Coding strand = same as mRNA (with T→U). Original mRNA: 5'-AUG GCU UAU-3'. Mutated mRNA: 5'-AUG GCU UAG-3'.
- Step 2: Divide into codons: Original: AUG (Met), GCU (Ala), UAU (Tyr). Mutated: AUG (Met), GCU (Ala), UAG (Stop).
- Step 3: Identify change: Third codon changed from UAU to UAG. UAU codes for Tyrosine. UAG is a stop codon (amber).
- Step 4: Classify mutation: Nonsense mutation (sense codon → stop codon).
- Step 5: Analyze why wobble/degeneracy didn't prevent this: The mutation is in the second base of the codon (A→A? Wait: UAU → UAG: second base A→A? No: UAU (U-A-U) → UAG (U-A-G). Third base U→G. This is a third-base change! But UAU (Tyr) and UAG (Stop) are in different amino acid families. Degeneracy groups codons by first two bases: UAU and UAC = Tyr; UAA and UAG = Stop. The third base U→G crosses the family boundary because the code assigns UAR (R=purine) to stop, and UAY (Y=pyrimidine) to Tyr. Wobble allows a tRNA^Trp? No tRNA for stop. Release factors recognize UAG strictly. So a third-base change CAN be nonsense if it hits a stop codon boundary.
- Step 6: Conclude: This is a nonsense mutation caused by a transversion (U→G) at the third position, demonstrating that degeneracy is not universal protection — it operates within synonymous blocks (usually same first two bases).
REASONING: The genetic code's degeneracy is organized in blocks of four (NNU, NNC, NNA, NNG) or two (NNY or NNR). Here, the UA_ block is split: UAU/UAC = Tyr, UAA/UAG = Stop. A third-base change from pyrimidine to purine crosses the block boundary. Wobble does not apply because stop codons are recognized by release factors, not tRNAs.
ANSWER: Nonsense mutation (Tyr → Stop). The third-base change U→G converted a tyrosine codon (UAU) into a stop codon (UAG) because the UA_ family is split between Tyr (pyrimidine at third position) and Stop (purine at third position). Degeneracy and wobble only protect within synonymous blocks, not across them.

## COMPETENCY_QUESTION_1
QUESTION: A researcher synthesizes an mRNA with the repeating sequence 5'-CUCUCUCUCU-3' and adds it to a cell-free translation system containing all amino acids, ribosomes, and tRNAs. Predict the polypeptide products formed and explain how this experiment demonstrates the triplet, non-overlapping nature of the genetic code.
COMPETENCY: Interpreting experimental evidence for genetic code properties
STEPS:
- Step 1: Recognize that a repeating dinucleotide (CU) in a triplet, non-overlapping code will produce three possible reading frames depending on start position.
- Step 2: Frame 1 (starting at first C): CUC UCU CUC UCU... → Leu-Ser-Leu-Ser...
- Step 3: Frame 2 (starting at first U): UCU CUC UCU CUC... → Ser-Leu-Ser-Leu...
- Step 4: Frame 3 (starting at second C? Actually sequence is CUCUCU..., so frames: 1=CUC, 2=UCU, 3=CUC? Wait, length 10: positions 1-3=CUC, 2-4=UCU, 3-5=CUC, 4-6=UCU... So only two distinct codons: CUC and UCU.
- Step 5: In a cell-free system without a specific start codon (AUG), initiation may occur at any position, yielding a mixture of poly(Leu-Ser) and poly(Ser-Leu) polypeptides.
- Step 6: This result (two alternating amino acid polymers) confirmed the code is triplet and non-overlapping (Nirenberg & Leder, Khorana experiments).
ANSWER: Two polypeptides: one with repeating Leu-Ser, the other with repeating Ser-Leu. The absence of other patterns (e.g., poly-Leu or poly-Ser) proves the code is read in non-overlapping triplets.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a hypothetical organism, the genetic code is altered such that the codon UGA codes for tryptophan (Trp) instead of stop, and a new stop codon is introduced at UAA only. A gene from this organism has the coding strand sequence 5'-ATG TGG TGA UAA-3'. Translate this gene in (a) the hypothetical organism and (b) standard human mitochondria (where UGA=Trp, AUA=Met, AGA/AGG=Stop). Compare the peptide products and explain the evolutionary implication of genetic code variations.
COMPETENCY: Applying genetic code variations to predict translational outcomes across organisms
STEPS:
- Step 1: Transcribe coding strand to mRNA (T→U): 5'-AUG UGG UGA UAA-3'.
- Step 2: Divide into codons: AUG | UGG | UGA | UAA.
- Step 3: Translate in hypothetical organism: AUG=Met (start), UGG=Trp, UGA=Trp (reassigned), UAA=Stop. Peptide: Met-Trp-Trp.
- Step 4: Translate in human mitochondria: AUG=Met, UGG=Trp, UGA=Trp (mitochondrial reassignment), UAA=Stop (standard). Peptide: Met-Trp-Trp.
- Step 5: Compare: Both yield Met-Trp-Trp. But note: in standard nuclear code, UGA=Stop, so peptide would be Met-Trp (terminated at third codon). The variation extends the protein.
- Step 6: Evolutionary implication: Genetic code is not absolutely universal; minor reassignments (especially stop→amino acid) occur in mitochondria and some protists, likely due to reduced tRNA set and selective pressure for genome economy. Such changes are constrained to low-usage codons to minimize disruptive effects.
ANSWER: (a) Hypothetical organism: Met-Trp-Trp. (b) Human mitochondria: Met-Trp-Trp. Standard nuclear code would give Met-Trp (truncated). Code variations show the code is evolvable but highly conserved; reassignments occur in small genomes with limited tRNA diversity.
DIFFICULTY: hard