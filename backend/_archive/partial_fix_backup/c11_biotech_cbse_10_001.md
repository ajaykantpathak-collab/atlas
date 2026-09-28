## DEFINITION
Protein Structure Databases are curated repositories that store experimentally determined three-dimensional coordinates of proteins and other macromolecules; PDB (Protein Data Bank) is the primary global archive for atomic-level structures from X-ray crystallography, NMR, and cryo-EM, while CATH (Class, Architecture, Topology, Homology) provides a hierarchical classification of protein domains based on structural and evolutionary relationships.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can navigate the PDB website to retrieve a structure file, identify the experimental method and resolution from the header, and explain how CATH's four-level hierarchy (Class → Architecture → Topology → Homology) groups domains to infer functional or evolutionary links.

## SCOPE_BOUNDARY
This node covers the purpose, content, and file format of PDB, and the hierarchical classification logic of CATH. It does NOT cover structure prediction methods (homology modelling, threading, ab initio), validation tools (Ramachandran plot), or visualization software (PyMOL/RasMol) – those are addressed in subsequent nodes.

## WALKTHROUGH
Imagine you are a researcher trying to design a drug that blocks an enzyme involved in a disease. You need the exact 3D shape of that enzyme's active site. Where do you start? You don't crystallize the protein yourself – that takes months. Instead, you go to the PDB, search by protein name or UniProt ID, download the .pdb file, and examine the atomic coordinates. But there are thousands of structures; how do you find ones with a similar fold even if the sequence is different? That's where CATH comes in: it classifies every domain into a hierarchy (Class → Architecture → Topology → Homology) so you can instantly pull up all proteins sharing the same topology. The key insight is that PDB gives you the *raw experimental data*, while CATH gives you the *organised structural knowledge* to make sense of it.

## DIAGNOSTIC_QUESTION_1
What is the primary experimental source of structures deposited in the Protein Data Bank (PDB)?

## DIAGNOSTIC_ANSWER_1
The primary experimental sources are X-ray crystallography, NMR spectroscopy, and cryo-electron microscopy. A wrong answer (e.g., "mass spectrometry" or "computational prediction only") reveals the student confuses experimental structure determination with predictive methods or other analytical techniques.

## DIAGNOSTIC_QUESTION_2
Explain why a protein structure file in PDB format (.pdb) is more useful for computational analysis than a static image of the same protein.

## DIAGNOSTIC_ANSWER_2
A PDB file contains atomic coordinates (x, y, z), occupancy, temperature factors, and metadata (experimental method, resolution, authors) in a machine-readable text format, enabling precise calculations of distances, angles, surface areas, and docking. An image is only a visual representation and cannot be computationally processed. A wrong answer indicates the student does not grasp the difference between human-readable visualization and machine-readable data.

## DIAGNOSTIC_QUESTION_3
A student downloads the PDB entry 1CRN (crambin) and sees the header line "EXPDTA X-RAY DIFFRACTION" and "RESOLUTION 1.50 ANGSTROMS". They want to use this structure as a template for homology modelling of a target protein with 35% sequence identity. Is this a suitable template? Justify using two criteria from the header.

## DIAGNOSTIC_ANSWER_3
Yes, it is suitable. First, the experimental method is X-ray crystallography, which provides high-resolution atomic coordinates. Second, the resolution of 1.50 Å is well below the typical 2.5–3.0 Å cutoff for reliable homology modelling templates. A wrong answer (e.g., focusing only on sequence identity or ignoring resolution) shows the student cannot evaluate template quality from PDB metadata.

## DIAGNOSTIC_QUESTION_4
Compare the classification philosophies of CATH and SCOP (Structural Classification of Proteins). Why might a researcher choose CATH over SCOP for automated domain assignment in a high-throughput pipeline?

## DIAGNOSTIC_ANSWER_4
CATH uses a semi-automated protocol (structure comparison algorithms followed by manual curation) while SCOP is primarily manual. CATH's hierarchical levels (Class, Architecture, Topology, Homology) are more explicitly defined by structural geometry at the Architecture level, making it easier to parse programmatically. A researcher would choose CATH for high-throughput because its domain definitions and hierarchy are more algorithmically accessible. A wrong answer suggests the student thinks both databases are identical in curation method or cannot distinguish manual vs. automated classification.

## DIAGNOSTIC_QUESTION_5
Evaluate the statement: "Since PDB contains all known protein structures, CATH is redundant because one can simply search PDB for structural similarity using tools like DALI or TM-align."

## DIAGNOSTIC_ANSWER_5
The statement is flawed. PDB is a primary archive of *individual* structures; it does not provide pre-computed, hierarchical *classification* of domains. CATH groups domains into evolutionary/structural families (Homology level) and abstract fold groups (Topology), enabling rapid identification of remote homologs and fold-level relationships without running pairwise comparisons against the entire PDB. CATH also provides curated domain boundaries, which PDB entries often lack for multi-domain proteins. A wrong evaluation indicates the student confuses a primary database with a derived, value-added classification resource.

## DIAGNOSTIC_QUESTION_6
Design a mini-project workflow for a Class 11 student to explore the relationship between protein fold (CATH topology) and enzyme function (EC number) using only freely accessible web resources. List the steps, databases/tools used at each step, and the expected output.

## DIAGNOSTIC_ANSWER_6
A good answer includes: (1) Pick an EC class (e.g., EC 3.4.11 - aminopeptidases) from BRENDA or UniProt. (2) Retrieve representative UniProt IDs. (3) Map each to PDB structures via UniProt's "Structure" section. (4) For each PDB ID, fetch its CATH classification via the CATH website or PDBe. (5) Tabulate CATH Topology (T-level) vs. EC sub-subclass. (6) Analyse if same topology hosts multiple EC numbers or same EC number appears in different topologies. Expected output: a table showing fold-function mapping and a brief conclusion. A poor answer lists tools without a logical sequence or ignores domain-level mapping (using whole-chain instead of CATH domains).

## COMMON_MISCONCEPTION
Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH code. In reality, PDB stores *experimental entries* (often multi-domain, multi-chain, with ligands), while CATH classifies *individual domains* after parsing PDB entries and defining domain boundaries. A single PDB entry (e.g., 1TIM) can map to multiple CATH domains (e.g., 1TIM00 and 1TIM01 for the two TIM-barrel domains). Students also confuse CATH's "Homology" level (H) with sequence homology – it actually means *structural* homology implying common ancestry, detectable even when sequence identity is <20%.

## ON_FAILURE
1. Have the student open the PDB entry for 1TIM (triose phosphate isomerase) and the corresponding CATH entries for its two domains (1TIM00, 1TIM01). 2. Ask them to list the chains in the PDB file (A and B) and then check how many CATH domains are assigned per chain. 3. Guide them to see that each chain is a single domain but CATH splits the barrel into two evolutionary units? Actually, TIM barrel is one domain per chain. Better: use a multi-domain protein like pyruvate kinase (1PKN). 4. Explicitly contrast the PDB header (no domain info) with CATH's domain list. 5. Finally, give a 5-minute exercise: "Given PDB ID 2HHB (haemoglobin), how many CATH domains? Find them on CATH website." This forces hands-on distinction between asymmetric unit, biological assembly, and structural domain.

## PREREQUISITE_NODE_IDS


## PREREQUISITE_REASONS
none

## FORWARD_NODE_IDS
c11_biotech_cbse_10_002, c11_biotech_cbse_10_003, c11_biotech_cbse_10_004, c11_biotech_cbse_10_006, c11_biotech_cbse_10_007, c11_biotech_cbse_10_010, c11_biotech_cbse_10_005, c11_biotech_cbse_10_008, c11_biotech_cbse_10_009

## FORWARD_REASONS
c11_biotech_cbse_10_002: Primary structure analysis tools (ProtParam) often take input from PDB-derived sequences.
c11_biotech_cbse_10_003: Secondary structure prediction methods (Chou-Fasman, GOR) are trained on known structures from PDB.
c11_biotech_cbse_10_004: Homology modelling requires a template structure retrieved from PDB.
c11_biotech_cbse_10_006: Ramachandran plot validation is performed on coordinates downloaded from PDB.
c11_biotech_cbse_10_007: RasMol/PyMOL visualize .pdb files downloaded from PDB.
c11_biotech_cbse_10_010: Homology modelling steps explicitly start with template search in PDB.
c11_biotech_cbse_10_005: Understanding PDB format and structure databases is essential because threading searches the PDB fold library and ab initio models are deposited in PDB format.  
c11_biotech_cbse_10_008: Protein structure databases (PDB) provide the 3D coordinate files required for structure-based docking and validation of predicted complexes.  
c11_biotech_cbse_10_009: Knowledge of PDB/CATH provides structural context for why sequence determines fold which determines function.  

## CROSS_SUBJECT_PREREQS
c9_bio_ch4_7, c9_bio_ch1_7, c10_bio_cbse_04_001
## CROSS_SUBJECT_REASONS
c9_bio_ch4_7: Hierarchy of Classification (Kingdom to Species) provides the conceptual framework for understanding CATH's hierarchical levels (Class, Architecture, Topology, Homology) as a structural taxonomy.
c9_bio_ch1_7: Endoplasmic Reticulum (rough ER) is the site of protein synthesis and folding; understanding that proteins must fold into specific 3D structures motivates the need for structure databases.
c10_bio_cbse_04_001: Accumulation of Variation During Reproduction establishes that protein sequence determines structure; databases like PDB/CATH store the structural outcomes of genetic sequences.

## CHAIN_DESCRIPTION
c9_bio_ch4_7 -> c11_biotech_cbse_10_001 -> c11_biotech_cbse_10_004

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c9_bio_ch4_7 | Hierarchical classification in biology (Kingdom-Phylum-Class-Order-Family-Genus-Species) mirrors CATH's structural hierarchy (Class-Architecture-Topology-Homology), providing a familiar cognitive scaffold for protein structure taxonomy.
c9_bio_ch1_7 | Rough endoplasmic reticulum synthesizes secretory/membrane proteins that must fold correctly; PDB stores the experimentally determined folded structures that result from this cellular process.
c10_bio_cbse_04_001 | Genetic variation leads to protein sequence variation; PDB/CATH archives the structural manifestations of those sequences, enabling study of structure-function-evolution relationships.

## PREREQ_CONCEPT
Understanding that proteins are polymers of amino acids with specific 3D shapes determined by their sequence, and that these shapes can be experimentally determined and stored digitally.

## PREREQ_BEFORE
The student should be able to describe the four levels of protein structure (primary, secondary, tertiary, quaternary) and name at least one experimental method for 3D structure determination (X-ray, NMR, cryo-EM).

## PREREQ_STUCK
If stuck, revisit Class 11 Biology Chapter "Biomolecules" (protein structure levels) and Class 12 Biology "Molecular Basis of Inheritance" (protein synthesis) to recall that sequence → structure → function.

## WORKED_EXAMPLE_1
PROBLEM: A student wants to study the active site geometry of human lysozyme (UniProt P61626) for a science fair project. They go to the PDB website (rcsb.org) and search "lysozyme human". The top hit is 1LZ1. They download the .pdb file and open it in a text editor. The first few lines are:
HEADER    HYDROLASE                          28-JAN-93   1LZ1
TITLE     CRYSTAL STRUCTURE OF HUMAN LYSOZYME AT 1.5 ANGSTROMS RESOLUTION
EXPDTA    X-RAY DIFFRACTION
AUTHOR    J. STRYNER, T. A. JONES
REMARK   2 RESOLUTION.    1.50 ANGSTROMS
ATOM      1  N   GLY A   1      11.230  24.560  12.340  1.00 15.00           N
...
The student needs to report the experimental method, resolution, and the coordinates of the first atom (N of Gly1) in their project notebook. Extract these three pieces of information.

STEPS:
- Step 1: Identify the line starting with EXPDTA to determine the experimental method.
- Step 2: Identify the REMARK 2 line (or the TITLE line) to extract the resolution value in Angstroms.
- Step 3: Locate the first ATOM record (line starting with ATOM) and read the atom serial number, atom name, residue name, chain identifier, residue sequence number, and the three coordinates (x, y, z).
- Step 4: Record the values: Method = X-RAY DIFFRACTION; Resolution = 1.50 Å; First atom = Atom 1, N, GLY, Chain A, Residue 1, Coordinates (11.230, 24.560, 12.340).
- Step 5: Verify that the coordinates are in Angstroms (standard for PDB) and that the resolution is suitable for detailed active-site analysis (<2.0 Å is high resolution).

REASONING: PDB files are standardized text formats where metadata is in fixed-format header lines (HEADER, TITLE, EXPDTA, REMARK) and atomic coordinates are in ATOM records. Knowing how to parse these lines manually ensures the student understands the data structure before using visualization tools.

ANSWER: Experimental method: X-ray diffraction; Resolution: 1.50 Å; First atom: Atom 1, Nitrogen (N) of Glycine (GLY) in Chain A, Residue 1, at (11.230, 24.560, 12.340) Å.

## WORKED_EXAMPLE_2
PROBLEM: A researcher finds that two proteins, Protein X (PDB: 2XYZ) and Protein Y (PDB: 3ABC), have low sequence identity (18%) but are suspected to have the same fold. They check CATH classifications: 2XYZ is classified as CATH 1.10.10.10 (Class 1: Mainly Alpha, Architecture 10: Orthogonal Bundle, Topology 10: Four-helix bundle, Homology 10). 3ABC is classified as CATH 1.10.10.20 (same Class, Architecture, Topology; different Homology). What does this tell about their evolutionary relationship and structural similarity? How would this guide a decision to use 2XYZ as a template for homology modelling of Protein Y?

STEPS:
- Step 1: Parse the CATH codes: Both share the first three levels (1.10.10) meaning they belong to the same Class (Mainly Alpha), same Architecture (Orthogonal Bundle), and same Topology (Four-helix bundle). This indicates they have the same overall fold.
- Step 2: Note the difference at the Homology level (10 vs 20). In CATH, same Homology number (H-level) implies detectable evolutionary relationship (common ancestor). Different H-levels mean they are in the same fold family but not considered homologous by CATH's criteria (likely divergent beyond recognition or convergent evolution).
- Step 3: Assess template suitability: For homology modelling, a template with the same Topology (T-level) is often sufficient even if H-level differs, provided the alignment covers the core secondary structures. However, low sequence identity (18%) is below the safe threshold (~30%) for reliable alignment.
- Step 4: Recommend checking structural alignment (e.g., using TM-align or DALI) to quantify RMSD and alignment coverage of the helical cores. If structural alignment shows good superposition (RMSD < 2Å over >80% of residues), 2XYZ can be used as a fold-recognition (threading) template rather than strict homology modelling.
- Step 5: Conclude that CATH classification quickly revealed the fold similarity (same T-level) and evolutionary distance (different H-level), guiding the choice of modelling approach (threading vs. homology modelling).

REASONING: CATH's hierarchy allows rapid inference: same T-level = same fold; same H-level = probable homology. This is faster than running pairwise structure comparisons for every candidate.

ANSWER: Proteins X and Y share the same fold (four-helix bundle) but are not classified as homologous by CATH. 2XYZ can serve as a fold-recognition template for Protein Y if structural alignment confirms core superposition, but standard homology modelling may be unreliable due to low sequence identity.

## WORKED_EXAMPLE_3
PROBLEM: In a class assignment, you are given a list of 5 PDB IDs: 1TIM, 1HRC, 2HHB, 1CRN, 1UBQ. You are asked to: (a) identify which are single-domain and which are multi-domain using CATH, (b) find the CATH Topology (T-level) for each domain, and (c) group them by fold. You access the CATH website (cathdb.info) and search each PDB ID. The results show:
1TIM → 1 domain: 1TIM00 (CATH 3.20.20.10)
1HRC → 1 domain: 1HRC00 (CATH 1.10.10.10)
2HHB → 4 domains: 2HHB00 (1.10.10.10), 2HHB01 (1.10.10.10), 2HHB02 (1.10.10.10), 2HHB03 (1.10.10.10)
1CRN → 1 domain: 1CRN00 (3.30.30.10)
1UBQ → 1 domain: 1UBQ00 (3.30.30.10)
Complete the assignment.

STEPS:
- Step 1: For each PDB ID, count the number of CATH domain entries (suffix 00, 01, etc.). 1TIM, 1HRC, 1CRN, 1UBQ have one domain each (single-domain proteins). 2HHB has four domains (multi-domain; note: haemoglobin tetramer has 4 chains, each a domain).
- Step 2: Extract the Topology (third number in CATH code) for each domain: 1TIM00 → 20; 1HRC00 → 10; 2HHB00-03 → all 10; 1CRN00 → 30; 1UBQ00 → 30.
- Step 3: Group by Topology (fold): Topology 10 (Four-helix bundle): 1HRC00, 2HHB00, 2HHB01, 2HHB02, 2HHB03. Topology 20 (TIM barrel): 1TIM00. Topology 30 (Ubiquitin-like): 1CRN00, 1UBQ00.
- Step 4: Note that 2HHB (haemoglobin) has four domains all with the same topology (globin fold), consistent with its four subunits. 1TIM (triose phosphate isomerase) has a TIM barrel fold. 1CRN (crambin) and 1UBQ (ubiquitin) share the ubiquitin-like fold despite different functions.
- Step 5: Present the answer as a table with columns: PDB ID, Domain(s), CATH Code(s), Topology (Fold), Group.

REASONING: This exercise demonstrates how CATH decomposes multi-chain PDB entries into structural domains and groups them by fold (Topology), revealing structural relationships not obvious from sequence or quaternary structure alone.

ANSWER: (a) Single-domain: 1TIM, 1HRC, 1CRN, 1UBQ. Multi-domain: 2HHB (4 domains). (b) Topologies: 1TIM=20, 1HRC=10, 2HHB=10, 1CRN=30, 1UBQ=30. (c) Fold groups: Four-helix bundle (Topology 10): 1HRC, 2HHB; TIM barrel (Topology 20): 1TIM; Ubiquitin-like (Topology 30): 1CRN, 1UBQ.

## COMPETENCY_QUESTION_1
QUESTION: A Class 11 student reads in a textbook: "The PDB file for insulin (2INS) contains the coordinates of the insulin monomer." They download 2INS and load it into PyMOL, but see two chains (A and B) and a zinc ion. The student is confused. Explain why the PDB entry contains two chains when insulin is a monomeric hormone in its active form. Use the concepts of "asymmetric unit", "biological assembly", and "crystallographic symmetry" in your answer. How would the student obtain the coordinates of the biologically active monomer?

STEPS:
- Step 1: Recognize that PDB files contain the *asymmetric unit* – the crystallographic repeating unit – which may not match the biological assembly.
- Step 2: Explain that insulin crystallizes with two chains (A and B) in the asymmetric unit, but the active monomer is a single chain (A+B linked by disulfides). Wait, insulin has two chains A and B linked by disulfides; the monomer is one A and one B chain. The asymmetric unit might contain one monomer (A+B) or more. Actually, 2INS has two chains A and B forming one monomer. The zinc ion is often present in insulin hexamers. The student sees two chains (A and B) which together form the monomer. So the confusion might be that they think monomer = one chain. Clarify: Insulin monomer = two polypeptide chains (A and B) connected by disulfide bonds. The PDB file correctly contains both chains. The student's misconception is that "monomer" means "one chain".
- Step 3: However, if the PDB entry contained a hexamer (6 monomers) in the asymmetric unit, the biological assembly would be the hexamer. For 2INS, it's likely the asymmetric unit is the monomer (A+B). The student's statement "insulin is a monomeric hormone" is correct; the PDB file shows the monomer (two chains). The confusion is semantic: monomer ≠ single chain.
- Step 4: Guide the student to check the REMARK 350 section (BIOMT records) in the PDB file or use the "Biological Assembly" download option on the PDB website to get the functional oligomeric state.
- Step 5: Conclude that the student must distinguish between polypeptide chain count and molecular assembly; insulin's active form is a heterodimer (A+B) which is a monomeric protein.

COMPETENCY: Interpreting biological data formats and distinguishing crystallographic vs. biological units.

ANSWER: The PDB file stores the asymmetric unit (crystallographic unit). For insulin (2INS), the asymmetric unit contains one insulin monomer comprising two chains (A and B) linked by disulfide bonds. The student incorrectly equated "monomer" with "single polypeptide chain". The biologically active form is indeed the A-B heterodimer. To obtain the biological assembly coordinates, the student should download the "Biological Assembly" file (e.g., 2INS.pdb1.gz) from the PDB website, which applies BIOMT transformations if the asymmetric unit differs from the functional oligomer. For 2INS, the asymmetric unit is the monomer, so the standard file is already correct.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: You are part of a team annotating a newly sequenced bacterial genome. You find a hypothetical protein (GeneX) with no known function. You run a BLAST search against PDB and get a hit to PDB 3XYZ (chain A) with 25% identity over 80% length, E-value 1e-15. 3XYZ is classified in CATH as 2.60.40.10 (Class 2: Mainly Beta, Architecture 60: Sandwich, Topology 40: Immunoglobulin-like, Homology 10). You also notice that 3XYZ chain A is a single domain. GeneX is 250 residues long. Based on this information, answer:
(a) Can you confidently assign GeneX the same CATH topology as 3XYZ? Why or why not?
(b) What additional bioinformatics step would strengthen the functional annotation?
(c) If GeneX contains two such domains in tandem, how would its CATH classification differ from 3XYZ?

STEPS:
- Step 1: (a) 25% sequence identity is in the "twilight zone" for homology inference. While the E-value is significant, CATH's Homology level (H-level) requires stronger evidence (often >35% identity or structural confirmation). You can assign the same Topology (T-level) *if* a structural model confirms the fold, but not the same Homology level based on sequence alone.
- Step 2: (b) Build a homology model of GeneX using 3XYZ as template (e.g., with SWISS-MODEL), then submit the model to CATH's structure classification service (e.g., CATH-Superfamily or Gene3D) to get an official CATH assignment. Alternatively, run HHPred/Phyre2 for fold recognition.
- Step 3: (c) If GeneX has two tandem domains of this fold, CATH would split it into two domains (e.g., GeneX00 and GeneX01), each receiving the same Topology (40) but potentially different Homology numbers if they diverged. 3XYZ has only one domain. GeneX would be a multi-domain protein with repeated immunoglobulin-like domains.
- Step 4: Synthesize: CATH classifies domains, not whole chains. Domain architecture (number and order of domains) is a separate layer of annotation.

COMPETENCY: Integrating sequence similarity, structure classification, and domain architecture for functional inference.

ANSWER: (a) Not confidently at Homology level; Topology assignment requires structural validation. (b) Build a 3D model and run it through CATH's structure classification pipeline or use fold-recognition servers. (c) GeneX would be annotated as two domains (e.g., GeneX00, GeneX01) each with Topology 40, whereas 3XYZ is a single-domain protein. The multi-domain architecture itself is functional information.

DIFFICULTY: hard