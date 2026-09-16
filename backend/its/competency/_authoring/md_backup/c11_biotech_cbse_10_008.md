## DEFINITION
Protein-protein interaction (PPI) prediction methods are computational techniques used to identify and characterize physical associations between two or more protein molecules based on sequence, structure, or network data, enabling the reconstruction of interactomes without exhaustive experimental screening.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can differentiate between sequence-based, structure-based, and network-based PPI prediction approaches, justify the selection of a specific method for a given biological question (e.g., predicting partners for a hypothetical protein vs. modelling a known complex), and interpret the reliability metrics (e.g., confidence scores in STRING, docking energy scores) associated with each prediction.

## SCOPE_BOUNDARY
This node covers computational prediction of binary and multi-protein interactions using sequence homology (interologs), domain-domain interaction databases, protein-protein docking (rigid-body and flexible), and network-based guilt-by-association methods. It does NOT cover experimental techniques (yeast two-hybrid, co-immunoprecipitation, AP-MS) or advanced deep-learning architectures (AlphaFold-Multimer) beyond conceptual awareness.

## WALKTHROUGH
Imagine you have discovered a novel hypothetical protein from a genomic sequence (as discussed in c11_biotech_cbse_10_008) and you need to find its functional partners to understand its role in a disease pathway. You cannot run wet-lab experiments for thousands of candidates. Begin by asking: "What computational evidence can link this protein to others?" First, check if its sequence has homologs in databases like STRING or BioGRID where interactions are already annotated (interolog mapping). If no homologs exist, analyse its domain architecture using InterPro (from c11_biotech_cbse_10_001) to infer partners via known domain-domain interactions. If a 3D structure is available (from homology modelling in c11_biotech_cbse_10_004), perform protein-protein docking against a library of potential binders. Finally, integrate these predictions into a network context using guilt-by-association: if your protein co-expresses or shares pathways with known disease proteins, prioritize those edges. The key insight is that PPI prediction is a hierarchy of evidence — start with the strongest evolutionary signal (interologs), then structural complementarity, then network topology — and always validate with confidence scores.

## DIAGNOSTIC_QUESTION_1
Define "interolog" in the context of protein-protein interaction prediction and state the primary assumption underlying this method.

## DIAGNOSTIC_ANSWER_1
An interolog is a conserved protein-protein interaction where orthologous proteins in different species interact in the same manner. The primary assumption is that interaction interfaces are evolutionarily conserved, so if protein A interacts with protein B in species X, their orthologs A' and B' in species Y will also interact. A wrong answer (e.g., defining interolog as "any predicted interaction" or citing sequence similarity alone as the assumption) reveals the student confuses homology-based inference with the specific concept of conserved interaction pairs across species.

## DIAGNOSTIC_QUESTION_2
A student claims: "Protein-protein docking is always more accurate than sequence-based interolog mapping because it uses 3D structural physics." Explain why this statement is an oversimplification, referencing at least two limitations of docking and one strength of interologs.

## DIAGNOSTIC_ANSWER_2
Docking suffers from (1) conformational flexibility — proteins undergo induced fit upon binding, which rigid-body docking ignores, and (2) scoring function inaccuracies — energy functions often fail to rank near-native poses top. Interologs, when available, provide direct evolutionary evidence of a biologically validated interaction in a living cell, including correct stoichiometry and cellular context, which a static docking simulation cannot guarantee. A wrong answer focusing only on "docking needs structures" misses the deeper issue: even with structures, docking accuracy for protein-protein interfaces is significantly lower than for protein-ligand due to larger, flatter interfaces and flexibility.

## DIAGNOSTIC_QUESTION_3
You have a hypothetical protein "X" from a newly sequenced bacterium. No experimental structure exists. You find a homolog in *E. coli* (Protein Y) with 45% sequence identity over 80% length. Protein Y is known to interact with Protein Z in the STRING database (confidence score 0.9). Describe the step-by-step computational workflow to predict the interaction partner of X, naming the specific method and database at each step.

## DIAGNOSTIC_ANSWER_3
Step 1: Use BLASTP against UniProt to confirm Protein Y is the top ortholog of X (reciprocal best hit). Step 2: Retrieve the interaction neighborhood of Y from STRING v12.0, filtering for high-confidence (score >0.7) physical interactions. Step 3: Identify Protein Z as a high-confidence interactor of Y. Step 4: Find the ortholog of Z in the target bacterium (reciprocal BLAST). Step 5: Predict X-Z interaction via interolog mapping, annotating with the transferred STRING score. A wrong answer that skips reciprocal best hit verification or uses a generic "homology search" without specifying orthology criteria reveals misunderstanding of the difference between homology and orthology for interaction transfer.

## DIAGNOSTIC_QUESTION_4
Compare and contrast "domain-domain interaction (DDI) based prediction" and "phylogenetic profiling" for PPI inference. Create a table with four rows: (i) Input data required, (ii) Evolutionary principle exploited, (iii) Typical false positive source, (iv) Applicability to hypothetical proteins with no close homologs.

## DIAGNOSTIC_ANSWER_4
| Feature | DDI-based | Phylogenetic Profiling |
|---------|-----------|------------------------|
| Input | Protein domain architectures (Pfam/InterPro) + known DDI databases (3did, DOMINE) | Presence/absence patterns of genes across many genomes |
| Principle | Physical binding interfaces are mediated by specific domains that co-evolve to maintain complementarity | Functionally linked proteins (e.g., in same pathway/complex) are co-inherited or co-lost during evolution |
| False Positive | Domain promiscuity: a domain binds many partners in vitro but not in vivo due to spatial/temporal regulation | Non-functional co-occurrence: proteins in same pathway but not physically interacting (e.g., sequential enzymes) |
| Hypothetical Protein | Works if domain annotation exists (even without full-length homolog) | Fails if the protein's phylogenetic profile is unique or genome sampling is sparse |

A wrong answer that conflates DDI with "sequence similarity" or thinks phylogenetic profiling requires 3D structures reveals confusion between physical interaction mechanisms and functional linkage inference.

## DIAGNOSTIC_QUESTION_5
Critique this research plan: "To predict interactors for a human transcription factor with a known PDB structure (2.5 Å resolution), we will run ClusPro docking against the entire human proteome (20,000 structures from AlphaFold DB) and take the top 10 lowest energy poses as high-confidence predictions." Identify three critical flaws and propose a better strategy.

## DIAGNOSTIC_ANSWER_5
Flaw 1: Docking against 20,000 structures is computationally infeasible for exhaustive flexible docking; ClusPro rigid-body mode would generate massive false positives from non-specific surface complementarity. Flaw 2: AlphaFold models have variable per-residue confidence (pLDDT); docking into low-confidence regions (loops, disordered tails) yields meaningless poses. Flaw 3: Transcription factors often bind via disordered regions not resolved in PDB/AlphaFold; docking structured domains misses these. Better strategy: (1) Use known domain-motif interaction databases (ELM, 3did) to predict peptide partners from short linear motifs. (2) Restrict docking to a curated set of nuclear co-factors with high-confidence AlphaFold models (pLDDT>90 at interface). (3) Integrate with co-expression (GTEx) and chromatin co-occupancy (ChIP-seq) data for network-based filtering.

## DIAGNOSTIC_QUESTION_6
Design a novel hybrid PPI prediction pipeline for a plant pathogen effector protein that has no homologs in model organisms, no resolved structure, but has a predicted disordered N-terminus and a structured C-terminal domain. Your pipeline must integrate at least three distinct evidence types from this node and output a ranked candidate list with confidence scores. Sketch the logic flow.

## DIAGNOSTIC_ANSWER_6
Pipeline: (1) **Disordered region motif scan**: Use ELM/ANCHOR2 on N-terminus to predict short linear motifs (SLiMs) mediating host target binding; score by motif conservation in effector family. (2) **Domain-based interologs**: Run HMMER on C-terminal domain against Pfam; if a domain family (e.g., E3 ligase, kinase) is detected, retrieve known DDIs from 3did/DOMINE and map to host proteome via domain annotations. (3) **Host-pathogen network guilt-by-association**: Construct a bipartite network of known effectors and their host targets from PHI-base; use random walk with restart from query effector's sequence neighbors (even distant) to prioritize host proteins. (4) **Integration**: Combine scores via weighted sum (weights trained on known effectors) or Bayesian network. Output ranked host targets with composite confidence. A poor answer that only lists tools without defining how evidence is combined for a *no-homolog* case shows inability to synthesize methods for edge cases.

## COMMON_MISCONCEPTION
Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most reliable* computational method for PPI prediction, analogous to protein-ligand docking in drug design. They overlook that >80% of high-confidence PPIs in databases like STRING are derived from **sequence-based interolog transfer** and **functional association networks**, not docking. Docking is typically used *after* a candidate pair is identified to model the interface, not for genome-wide partner discovery. This error stems from overemphasizing 3D structure visualization (c11_biotech_cbse_10_007) and underestimating the power of evolutionary conservation (interologs) and functional context (networks) taught in earlier nodes. A concrete wrong answer: "To find all interactors of Protein X, I will download its AlphaFold model and dock it against the PDB."

## ON_FAILURE
If a student exhibits the docking-centric misconception: (1) Show them the STRING database evidence channels for a well-studied protein (e.g., TP53) — highlight that "co-expression", "experiments", and "databases" (curated interologs) contribute far more edges than "structure". (2) Assign a mini-task: "Predict interactors for a hypothetical protein with only a sequence. You have no structure. List 3 methods you *can* use and 1 you *cannot*." (3) Explain the "inverse relationship": docking requires a *known or hypothesized partner* to be meaningful; it is not a discovery tool for unknown partners at proteome scale. (4) Revisit c11_biotech_cbse_10_001 (PDB/CATH) to reinforce that <20% of proteomes have experimental structures, making structure-based methods inapplicable for most discovery tasks.

## PREREQUISITE_NODE_IDS
c11_biotech_cbse_10_001, c11_biotech_cbse_10_002, c11_biotech_cbse_10_003, c11_biotech_cbse_10_004, c11_biotech_cbse_10_005, c11_biotech_cbse_10_006, c11_biotech_cbse_10_007
## PREREQUISITE_REASONS
c11_biotech_cbse_10_001: Protein structure databases (PDB) provide the 3D coordinate files required for structure-based docking and validation of predicted complexes.
c11_biotech_cbse_10_002: Primary structure analysis (composition, domains via ProtParam/InterPro) is the input for sequence-based methods (interologs, domain-domain interactions).
c11_biotech_cbse_10_003: Secondary structure prediction informs flexible docking protocols and identifies disordered regions that mediate transient interactions.
c11_biotech_cbse_10_004: Homology modelling generates 3D models for proteins lacking experimental structures, enabling structure-based PPI prediction for non-crystallized proteins.
c11_biotech_cbse_10_005: Threading/ab initio methods provide fold-level models when homology modelling fails, expanding the structural coverage for docking.
c11_biotech_cbse_10_006: Ramachandran validation ensures modelled structures used for docking are stereochemically plausible, reducing false positives from artefacts.
c11_biotech_cbse_10_007: Visualization tools (PyMOL) are essential for inspecting docking poses, identifying interface residues, and preparing publication figures.

## FORWARD_NODE_IDS
c11_biotech_cbse_10_009, c12_biotech_cbse_05_010

## FORWARD_REASONS
c11_biotech_cbse_10_009: Protein function prediction relies heavily on "guilt-by-association" — if a protein interacts with known functional modules (e.g., ribosome, spliceosome), its function is inferred; PPI networks are the primary evidence.
c12_biotech_cbse_05_010: Prior exposure to computational PPI prediction sets context for experimental validation.  

## CROSS_SUBJECT_PREREQS
c10_bio_cbse_02_008, c9_bio_ch1_3, c10_bio_cbse_01_010
## CROSS_SUBJECT_REASONS
c10_bio_cbse_02_008: Hormone-receptor interactions (e.g., insulin-insulin receptor) are classic protein-protein interactions; understanding endocrine signaling provides biological context for why PPI prediction matters in disease.
c9_bio_ch1_3: Cell membrane structure (receptors, channels) explains the topological constraints of PPIs — many interactions occur at membranes, requiring transmembrane domain consideration in prediction.
c10_bio_cbse_01_010: Blood protein interactions (e.g., antibody-antigen, coagulation cascade) demonstrate functional consequences of specific PPIs, motivating computational prediction for diagnostics/therapeutics.

## CHAIN_DESCRIPTION
c11_biotech_cbse_10_007 -> c11_biotech_cbse_10_008 -> c11_biotech_cbse_10_009

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c10_bio_cbse_02_008 | Hormone-receptor binding is a PPI; predicting such interactions computationally aids drug design for endocrine disorders.
c9_bio_ch1_3 | Membrane protein topology (from cell biology) constrains PPI prediction: extracellular domains interact differently than cytoplasmic ones.

## PREREQ_CONCEPT
Protein structure hierarchy (primary → quaternary) and the central dogma (sequence → structure → function → interaction).

## PREREQ_BEFORE
Student must be able to retrieve a protein sequence from NCBI, identify its domains via InterPro, and visualize a PDB structure in PyMOL.

## PREREQ_STUCK
Revisit c11_biotech_cbse_10_001 (PDB navigation) and c11_biotech_cbse_10_002 (domain analysis with InterPro) to rebuild the sequence→structure→interaction pipeline.

## WORKED_EXAMPLE_1
PROBLEM: A researcher has identified a novel plant disease resistance protein (R-protein) with an N-terminal TIR domain and a C-terminal LRR domain. No homologs exist in Arabidopsis. Predict its potential interactors in the host plant using a domain-domain interaction (DDI) approach. Use the following simulated data: Pfam scan shows TIR (PF01582) and LRR_8 (PF13855). The 3did database lists 12 known DDIs for TIR domains (median interface residue conservation 65%) and 8 for LRR_8 (median conservation 40%). The host plant proteome has 350 proteins with TIR-interacting domains and 1200 with LRR-interacting domains. Calculate a prioritized candidate list using a simple weighted scoring scheme: Score = (Number of supporting DDIs) × (Median interface conservation) / (Host proteome frequency of interacting domain). Show calculations for the top candidate from each domain type.

STEPS:
- Step 1: Identify the domain architecture of the query protein using Pfam/InterPro (already given: TIR + LRR_8).
- Step 2: Query a DDI database (3did, DOMINE, or IDDI) for known interactions mediated by each domain. Retrieve the list of partner domain families, number of structural instances (supporting DDIs), and interface residue conservation.
- Step 3: For each partner domain family, count its frequency in the host proteome (pre-computed or via HMMER scan of host proteome against Pfam).
- Step 4: Compute a confidence score for each domain-domain pair using the formula: Score = (N_DDI × Conservation) / Host_Frequency. This rewards domains with many structural examples and high conservation, but penalizes promiscuous domains abundant in the host.
- Step 5: Rank all candidate host proteins by the maximum score across their domains. Output top candidates with scores.
REASONING: This example demonstrates how to operationalize DDI-based PPI prediction quantitatively. The scoring scheme balances evolutionary evidence (conservation, number of structures) against biological specificity (penalizing ubiquitous domains). It mirrors real tools like DOMINE or PEIMAP but simplified for calculation. The step-wise logic ensures the student understands each data dependency.
ANSWER: For TIR domain: Score = (12 × 0.65) / 350 = 7.8 / 350 = 0.0223. For LRR_8 domain: Score = (8 × 0.40) / 1200 = 3.2 / 1200 = 0.00267. The TIR-mediated interaction is predicted ~8.3× more confident. Top candidate would be a host protein containing the TIR-interacting domain with highest individual score.

## WORKED_EXAMPLE_2
PROBLEM: You have a homology model of a bacterial toxin (Protein T) built on a template with 35% sequence identity (from c11_biotech_cbse_10_004). The model has 92% residues in favored Ramachandran regions (c11_biotech_cbse_10_006). You want to predict its interaction with a human receptor (Protein R) whose AlphaFold model has pLDDT > 90 at the putative binding site. Describe the protein-protein docking workflow using ClusPro, including how you would handle flexibility and validate the top cluster.

STEPS:
- Step 1: Prepare structures: Remove heteroatoms, add hydrogens at pH 7.0, assign protonation states (H++ server). For Protein T, verify model quality — if Ramachandran outliers are at the predicted interface, remodel loops with Modeller.
- Step 2: Define docking restraints (optional but recommended): Use known mutagenesis data or conserved surface patches (ConSurf) to define "attractive" residues on both proteins. If none, run blind docking.
- Step 3: Submit to ClusPro server: Select "Balanced" coefficient set (good for protein-protein). Enable "Flexible refinement" in the final stage (allows side-chain/backbone minimization in top clusters).
- Step 4: Analyze output: ClusPro returns clusters ranked by cluster size (number of low-energy poses). Select the largest cluster with a reasonable energy score (typically < -800 for balanced). Inspect the representative structure in PyMOL (c11_biotech_cbse_10_007).
- Step 5: Validate the predicted interface: Check for shape complementarity (Sc > 0.6), buried surface area (>1000 Å²), and presence of hot-spot residues (e.g., Trp, Arg, Tyr) using PDBePISA. Cross-reference with any known functional sites.
REASONING: This workflow integrates structure validation (prerequisite node) with docking best practices. The emphasis on model quality check before docking prevents garbage-in-garbage-out. Using cluster size as primary rank (not just energy) reflects the statistical mechanics principle that native-like basins are broader. Flexible refinement addresses the induced-fit limitation mentioned in misconceptions.
ANSWER: A validated docking model of Toxin-Receptor complex with cluster rank 1, energy -950 kcal/mol (balanced), buried surface area 1850 Å², shape complementarity 0.72, and 3 predicted hot-spot residues consistent with mutagenesis literature.

## WORKED_EXAMPLE_3
PROBLEM: Integrate interolog mapping, domain-domain interaction, and co-expression network data to predict interactors for a hypothetical human protein "HYP1" (sequence length 420 aa). Given: (a) BLASTP finds a fly ortholog "Dmel_HYP" (40% id, E=1e-45) with 3 high-confidence interactors in BioGRID (Dmel_A, Dmel_B, Dmel_C). (b) HYP1 contains a kinase domain (PF00069) and a SH2 domain (PF00017). 3did shows kinase domain interacts with 5 domain families (median conservation 70%), SH2 interacts with 12 families (median conservation 55%). (c) Human RNA-seq atlas shows HYP1 co-expressed (Pearson r > 0.8) with 50 proteins, including Human_A (ortholog of Dmel_A), Human_B (ortholog of Dmel_B), and Human_X (no fly ortholog). Design a Bayesian integration scheme to compute a posterior probability of interaction for each candidate. Assume prior P(interact) = 0.01. Likelihoods: Interolog transfer (if ortholog pair exists) = 10; DDI match = 5; Co-expression (r>0.8) = 3. Compute posterior for Human_A, Human_B, Human_X.

STEPS:
- Step 1: Define evidence types and likelihood ratios (LR) from benchmark studies: LR_interolog = 10, LR_DDI = 5, LR_coexp = 3. Prior odds = P/(1-P) = 0.01/0.99 ≈ 0.0101.
- Step 2: For each candidate, determine which evidence types are present.
  - Human_A: Has interolog (ortholog of Dmel_A interacts with Dmel_HYP) + Co-expression (r>0.8) + DDI? (Check if Human_A has domain interacting with kinase/SH2 — assume yes for kinase). So 3 evidences.
  - Human_B: Interolog + Co-expression + DDI? (Assume no domain match). So 2 evidences.
  - Human_X: No interolog (no fly ortholog) + Co-expression only. So 1 evidence.
- Step 3: Compute posterior odds = Prior odds × Product of LRs for present evidences.
  - Human_A: 0.0101 × 10 × 5 × 3 = 1.515 → Posterior P = 1.515 / (1+1.515) = 0.602
  - Human_B: 0.0101 × 10 × 3 = 0.303 → Posterior P = 0.303 / 1.303 = 0.233
  - Human_X: 0.0101 × 3 = 0.0303 → Posterior P = 0.0303 / 1.0303 = 0.029
- Step 4: Rank by posterior probability: Human_A (0.60) > Human_B (0.23) > Human_X (0.03).
- Step 5: Interpret: Human_A is high-confidence (supported by evolution, structure, and expression). Human_B is moderate (lacks structural support). Human_X is weak (only co-expression, could be indirect).
REASONING: This example forces integration of the three major PPI prediction pillars taught in this node. Bayesian updating is a standard framework in systems biology (e.g., STRING scoring). The calculation shows how orthogonal evidence multiplies confidence, and why single-evidence predictions (like Human_X) remain low probability despite high co-expression.
ANSWER: Posterior interaction probabilities: Human_A = 60.2%, Human_B = 23.3%, Human_X = 2.9%. Ranked list: Human_A > Human_B > Human_X.

## COMPETENCY_QUESTION_1
QUESTION: A Class 11 student reads that "AlphaFold has solved the protein folding problem" and concludes that protein-protein interaction prediction is now trivial — just dock AlphaFold models of all pairs. Write a 150-word critique addressing: (i) Why AlphaFold models alone are insufficient for PPI prediction, (ii) Two specific biological complexities AlphaFold does not capture, (iii) How network-based methods complement structure-based prediction. Use terminology from this node (interolog, DDI, guilt-by-association, docking).
COMPETENCY: Translating real-world situations to scientific arguments; evaluating technological limitations
STEPS:
- Step 1: Acknowledge AlphaFold's breakthrough in monomer structure prediction.
- Step 2: Explain that PPI prediction requires *complex* structures, not monomers; AlphaFold-Multimer exists but has lower accuracy for transient/weak interactions.
- Step 3: Identify two biological complexities: (a) Conformational dynamics/induced fit — monomers may not represent bound state; (b) Context dependence — post-translational modifications, membrane localization, crowding affect interactions but aren't in the model.
- Step 4: Explain network complementarity: Interologs and guilt-by-association provide *in vivo* functional evidence independent of structure; they prioritize which pairs to dock, making proteome-scale docking feasible.
- Step 5: Conclude that integration (as in Worked Example 3) is the standard, not replacement.
ANSWER: AlphaFold predicts static monomer structures with high accuracy, but PPIs involve dynamic, context-dependent assembly of multiple chains. First, many interactions are mediated by intrinsically disordered regions (IDRs) or require induced fit — AlphaFold models often show low confidence (pLDDT < 50) precisely at these interfaces, making docking unreliable. Second, cellular context (PTMs, localization, concentration) determines *whether* an interaction occurs, which a structure alone cannot reveal. Network methods fill this gap: interolog mapping transfers *validated in vivo* interactions across species via orthology; guilt-by-association in co-expression/co-localization networks identifies functionally coupled partners even without structural data. These methods prioritize candidate pairs (e.g., top 100 instead of 20,000²), enabling focused, high-accuracy docking. Thus, AlphaFold enables structure-based modelling of *prioritized* complexes, but does not replace evolutionary and systems-level inference for interaction discovery.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: You are annotating a newly sequenced viral genome. One ORF encodes a 150-aa protein "VpX" with no homologs (BLAST E > 10), no predicted domains (InterProScan negative), and high disorder propensity (IUPred2A score > 0.8). Propose a *minimal* 3-step computational strategy to predict its human host interactors, justifying why each step is feasible for this "dark protein". Contrast with why standard homology modelling + docking would fail.
COMPETENCY: Designing solutions for novel scenarios; justifying method selection under constraints
STEPS:
- Step 1: Recognize that VpX is a short, disordered, orphan viral protein — standard structure-based methods fail (no template, no fold, no stable structure to dock).
- Step 2: Propose Step 1: **Short Linear Motif (SLiM) prediction** using ELM/ANCHOR2 on the disordered sequence. Viral effectors often mimic host SLiMs to hijack domains (e.g., SH3, PDZ). Feasible because it only needs sequence.
- Step 3: Propose Step 2: **Host-pathogen interolog mapping via domain mimicry**. If VpX contains a motif resembling a known host SLiM (e.g., "PxLP" for 14-3-3 binding), scan human proteome for proteins containing the *partner domain* (e.g., 14-3-3 family). Feasible because domain annotations are complete for human.
- Step 4: Propose Step 3: **Viral-host co-expression / temporal correlation** using public RNA-seq of infected cells (e.g., GEO datasets). Correlate VpX expression (if transcriptome data exists) or use guilt-by-association with other viral proteins' known targets. Feasible because it uses functional genomics, not structure.
- Step 5: Contrast: Homology modelling requires a template (>30% id over >50% length) — fails for orphans. Docking requires two structured partners — fails for disordered proteins that fold upon binding (coupled folding-binding).
ANSWER: Strategy: (1) Predict SLiMs in VpX disordered sequence → (2) Match SLiMs to human domain interaction partners (e.g., via ELM/3did) → (3) Filter by co-expression in infection time-courses. Justification: SLiM prediction works on raw sequence; domain partner lookup uses complete human annotations; co-expression adds functional context. Homology modelling fails (no template); docking fails (no stable structure for VpX, coupled folding-binding not modelled by rigid docking). This mirrors real viral effector discovery pipelines (e.g., for SARS-CoV-2 ORF6).
DIFFICULTY: hard