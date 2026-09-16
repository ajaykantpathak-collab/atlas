## DEFINITION
Contamination in animal cell culture refers to the unwanted presence of microorganisms (bacteria, fungi, yeast, mycoplasma, viruses) or foreign cells that compromise culture integrity, alter cellular physiology, and invalidate experimental results. It arises from aseptic technique breaches, contaminated reagents (especially serum), or environmental sources, and exploits the slow doubling time (18–24 h) of animal cells versus rapid microbial proliferation (20–30 min for bacteria).

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student must be able to (1) differentiate bacterial, fungal, and mycoplasma contamination based on microscopic morphology, growth kinetics, pH changes, and detection methods; (2) design a contamination‑control workflow incorporating laminar‑flow hood classification, antibiotic stewardship, and routine mycoplasma testing; and (3) evaluate a given culture scenario to identify the contamination source and propose corrective actions that comply with biosafety guidelines.

## SCOPE_BOUNDARY
This node covers the three major contaminant classes (bacteria, fungi/yeast, mycoplasma) — their characteristics, detection (microscopy, PCR, biochemical assays), prevention (aseptic technique, HEPA filtration, antibiotic use), and eradication strategies. It does NOT cover viral contamination, prions, cross‑contamination between cell lines (misidentification), or detailed validation of serum‑free media sterility testing beyond the scope of NCERT Class 12.

## WALKTHROUGH
Imagine you are culturing CHO cells for recombinant EPO production. On Day 3, the medium turns yellow‑orange and tiny moving dots appear under the inverted microscope. **Step 1:** Recognise that a pH drop (phenol red shift) plus motile particles signal bacterial contamination — bacteria divide every 20–30 min, outpacing your 24‑h doubling CHO cells. **Step 2:** Check the laminar‑flow hood log: was the HEPA filter certified? Was the sash height correct? **Step 3:** Review reagent sterility — was the FBS heat‑inactivated and filtered? **Step 4:** Decide whether to discard (bacterial/fungal) or attempt cure (mycoplasma with specific antibiotics). **Key insight:** Contamination is not random; it follows predictable routes (operator, reagents, equipment) and each contaminant class leaves a distinct signature that guides the response.

## DIAGNOSTIC_QUESTION_1
A researcher notes that the culture medium in a T‑75 flask has become turbid and the phenol red indicator has shifted from red to yellow within 24 hours of subculturing. Under an inverted phase‑contrast microscope (20×), numerous small, highly motile rod‑shaped particles are seen moving rapidly between the adherent cells. What is the MOST likely contaminant, and why does it outgrow the animal cells so quickly?

## DIAGNOSTIC_ANSWER_1
**Answer:** Bacterial contamination (likely Gram‑negative rods such as *Pseudomonas* or *E. coli*). Bacteria have a generation time of 20–30 minutes versus 18–24 hours for animal cells, so even a few bacteria reach 10⁸–10⁹ CFU/mL within hours, consuming nutrients, producing acidic metabolic waste (lactic acid), and dropping the pH (phenol red turns yellow).  
**Wrong‑answer diagnosis:** If a student says "fungal contamination" they confuse the timeline — fungi grow slower (hours to days) and usually form visible hyphae/clumps, not rapid uniform turbidity with motile rods. If they say "mycoplasma" they miss that mycoplasma are non‑motile, too small to see at 20×, and do not cause rapid pH shifts or turbidity.

## DIAGNOSTIC_QUESTION_2
Explain why routine addition of penicillin‑streptomycin (Pen‑Strep) to culture medium does NOT guarantee protection against mycoplasma contamination, and describe one specific detection method that can reliably identify mycoplasma in a culture that appears clear and healthy under the microscope.

## DIAGNOSTIC_ANSWER_2
**Answer:** Pen‑Strep targets bacterial cell‑wall synthesis (penicillin) and protein synthesis (streptomycin); mycoplasma lack a cell wall and are intrinsically resistant to penicillin, while many strains show variable susceptibility to streptomycin. Moreover, antibiotics suppress but do not eradicate mycoplasma, allowing persistent low‑level infection that alters cell metabolism without visible turbidity. Reliable detection: PCR‑based assay using primers for the 16S rRNA gene of *Mycoplasma* species (e.g., *M. orale*, *M. hyorhinis*), which can detect <10 CFU/mL in a culture that looks normal microscopically.  
**Wrong‑answer diagnosis:** A student who claims "Pen‑Strep kills all bacteria including mycoplasma" misunderstands the mechanism of penicillin (cell‑wall target) and mycoplasma biology (no cell wall). A student suggesting "microscopy at 40×" as detection fails to recognise mycoplasma are 0.2–0.3 µm — below the resolution limit of light microscopy.

## DIAGNOSTIC_QUESTION_3
You are troubleshooting a CHO‑cell culture that shows reduced viability (70% by trypan blue) and poor recombinant protein yield, yet the medium remains clear red (pH 7.4) and no particles are visible at 20× magnification. The lab uses heat‑inactivated FBS, Pen‑Strep, and a certified Class II biosafety cabinet. Propose a step‑by‑step investigation plan to identify if mycoplasma is the cause, including the specific test you would run and the control needed.

## DIAGNOSTIC_ANSWER_3
**Step‑by‑step plan:**  
1. **Collect samples:** Harvest 1 mL of conditioned medium (centrifuge 1000 × g, 5 min) and a cell pellet (trypsinize, wash in PBS).  
2. **DNA extraction:** Use a commercial kit (e.g., Qiagen DNeasy) on both supernatant and cell pellet to capture extracellular and intracellular mycoplasma.  
3. **PCR setup:** Run a multiplex PCR with universal mycoplasma 16S rRNA primers (e.g., *M. orale*, *M. arginini*, *M. hyorhinis*, *A. laidlawii*) plus an internal amplification control (e.g., GAPDH) to rule out PCR inhibition.  
4. **Controls:** Include (a) negative control: nuclease‑free water; (b) positive control: known mycoplasma‑infected cell line DNA; (c) extraction control: uninfected CHO DNA.  
5. **Gel electrophoresis:** Visualise amplicons (~270 bp for mycoplasma, ~200 bp for GAPDH). A band in sample lanes with positive control confirms contamination.  
6. **Action:** If positive, treat with a mycoplasma‑specific antibiotic (e.g., plasmocin™, 25 µg/mL for 2 weeks) and re‑test; if negative, investigate other causes (media formulation, passage number, viral infection).  
**Wrong‑answer diagnosis:** A student who suggests "just add more Pen‑Strep" ignores mycoplasma resistance. One who says "do a Gram stain" wastes time — mycoplasma do not Gram‑stain. Omitting the internal control (GAPDH) risks false negatives from PCR inhibitors in culture medium.

## DIAGNOSTIC_QUESTION_4
Compare and contrast the contamination risk profile of using (a) 10% heat‑inactivated fetal bovine serum (FBS) versus (b) a chemically defined, serum‑free, protein‑free medium for a GMP‑grade CHO cell line producing a therapeutic monoclonal antibody. Include in your answer the impact on downstream purification and regulatory compliance.

## DIAGNOSTIC_ANSWER_4
**Comparison:**  
- **FBS (a):** High risk of adventitious agents (viruses, mycoplasma, prions) despite heat inactivation (56°C, 30 min) and 0.1 µm filtration; batch‑to‑batch variability introduces unknown growth factors/inhibitors; requires extensive viral clearance validation (e.g., nanofiltration, low‑pH hold) in downstream processing; regulatory filings need CoA, country‑of‑origin, and TSE/BSE certificates.  
- **Serum‑free, protein‑free (b):** Eliminates animal‑derived contaminants; defined composition ensures reproducibility; simplifies downstream purification (no serum proteins to separate from product); aligns with ICH Q5A/Q5D guidelines for viral safety; reduces regulatory burden.  
- **Trade‑off:** Serum‑free media often require adaptation (weaning) and may lower initial cell density or productivity; cost per litre is higher but total cost of ownership may be lower due to simplified purification and reduced QC testing.  
**Wrong‑answer diagnosis:** A student who says "FBS is fine because we heat‑inactivate it" underestimates that heat inactivation does not remove mycoplasma (requires 0.1 µm filtration) or prions, and does not address lot variability. A student who claims "serum‑free media have zero contamination risk" ignores that water, salts, and recombinant proteins can still introduce bioburden if not properly filtered/sterilized.

## DIAGNOSTIC_QUESTION_5
A junior researcher argues: "Since our CO₂ incubator has a HEPA filter and we spray 70% ethanol on everything, we don't need to waste money on routine mycoplasma testing — our cultures look healthy." Critique this statement using evidence from cell culture best practices and regulatory expectations.

## DIAGNOSTIC_ANSWER_5
**Critique:** The statement is dangerously false.  
- **HEPA filters** in incubators recirculate air but do not sterilize the internal atmosphere; they capture particles ≥0.3 µm, while mycoplasma (0.2–0.3 µm) can pass through.  
- **Ethanol spraying** disinfects surfaces but does not penetrate closed vessels or eliminate mycoplasma already inside a culture (which can enter via contaminated reagents, operator aerosols, or cross‑contamination during passaging).  
- **Mycoplasma infection is often asymptomatic** — no turbidity, no pH change, normal morphology — yet it alters chromosome number, membrane composition, cytokine expression, and viral susceptibility, invalidating experimental data.  
- **Regulatory requirement:** FDA/EMA/ICH guidelines (e.g., Points to Consider in the Characterization of Cell Lines Used to Produce Biologicals) mandate mycoplasma testing at master/working cell bank establishment, end‑of‑production, and periodically during manufacturing. Skipping testing risks batch rejection and patient safety.  
**Wrong‑answer diagnosis:** A student who agrees with the researcher confuses "clean environment" with "sterile culture." They also overlook that mycoplasma are the most common cell culture contaminant (15–35% of lines in some surveys) precisely because they evade routine visual and antibiotic surveillance.

## DIAGNOSTIC_QUESTION_6
Design a comprehensive contamination‑prevention SOP (Standard Operating Procedure) for a new academic lab starting animal cell culture. Your SOP must address: (i) personnel training, (ii) facility/equipment qualification, (iii) reagent qualification, (iv) routine monitoring schedule, and (v) response protocol for a positive mycoplasma test. Present as a numbered list with specific actionable items.

## DIAGNOSTIC_ANSWER_6
**SOP Outline:**  
1. **Personnel Training**  
   - Mandatory 2‑day aseptic technique workshop (laminar‑flow hood ergonomics, sterile reagent handling, waste segregation).  
   - Annual competency assessment: mock contamination scenario + written quiz on mycoplasma biology.  
   - No entry without lab‑coat, gloves, hair‑net; dedicated footwear or shoe covers.  
2. **Facility/Equipment Qualification**  
   - Class II Type A2 BSC: annual HEPA filter integrity test (DOP/PAO), airflow velocity validation, certification per NSF/ANSI 49.  
   - CO₂ incubator: weekly internal surface wipe with 70% IPA + quarterly HEPA filter check; continuous CO₂/O₂ monitoring with alarm.  
   - Inverted microscope: monthly phase‑contrast alignment check; dedicated for culture room only.  
3. **Reagent Qualification**  
   - FBS: only from qualified vendors with CoA showing mycoplasma‑negative (PCR), endotoxin <5 EU/mL, viral testing; each lot tested in‑house on indicator cell line (e.g., Vero) for 14 days before release.  
   - Basal media, trypsin, PBS: sterile‑filtered (0.1 µm) or purchased as sterile; aliquoted to avoid repeated opening.  
   - Antibiotics: Pen‑Strep stock prepared fresh monthly; avoid routine use — reserve for primary culture establishment only.  
4. **Routine Monitoring Schedule**  
   - **Daily:** Visual check (medium colour, turbidity) + inverted microscopy (20×) for morphology, confluency, particulate matter.  
   - **Weekly:** Mycoplasma screening by PCR on spent medium from one representative flask per cell line (rotating schedule).  
   - **Monthly:** Endotoxin test (LAL assay) on critical reagents; environmental monitoring (settle plates, air sampling) in BSC and incubator.  
   - **Quarterly:** STR profiling for cell line identity; karyotyping for finite lines.  
5. **Response Protocol for Positive Mycoplasma Test**  
   - Immediate quarantine: label flask "MYCO+", move to dedicated incubator (if available) or seal and place in biohazard bag.  
   - Notify PI and lab manager within 2 hours; document in lab LIMS.  
   - Discard all cultures from same passage/reagent lot; autoclave waste.  
   - Treat valuable lines: Plasmocin™ (25 µg/mL) or BM‑Cyclin (10 µg/mL tiamulin + 1 µg/mL minocycline) for 14 days with medium change every 2–3 days.  
   - Post‑treatment: PCR test at Day 14 and Day 28; only release if both negative.  
   - Root‑cause analysis: trace reagents, operator logs, equipment logs; implement corrective action (e.g., new FBS lot, BSC recertification).  
**Evaluation criteria for a good answer:** Covers all five sections with specific, measurable actions (not vague "be careful"); references regulatory standards (NSF/ANSI 49, ICH Q5A); includes both prevention and curative steps; shows understanding that mycoplasma requires PCR monitoring, not just visual checks.

## COMMON_MISCONCEPTION
Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic technique and will prevent all contamination**. This is wrong because: (1) antibiotics only target bacteria (and not all species), not fungi, yeast, mycoplasma (penicillin‑resistant due to no cell wall), or viruses; (2) they mask low‑level bacterial contamination, allowing it to persist and suddenly flare up when antibiotics degrade or are omitted; (3) chronic antibiotic exposure selects for resistant strains and can alter cell physiology (mitochondrial toxicity, gene expression changes); (4) regulatory guidelines (FDA, EMA) discourage routine antibiotic use in GMP production because it hides contamination and complicates viral clearance validation. The correct mindset: **aseptic technique is the primary barrier; antibiotics are a last resort for primary cultures or documented bacterial outbreaks, never a routine crutch.**

## ON_FAILURE
If a student cannot differentiate contaminant types or design a monitoring plan:  
1. **Re‑visit microscopy basics** — use node `c11_biotech_cbse_12_001` (Microscopy) to practice identifying bacterial rods, fungal hyphae, and the *absence* of visible particles in mycoplasma‑infected cultures.  
2. **Review microbial biology** — nodes `c11_bio_cbse_02_003` (Bacteria structure/reproduction) and `c11_bio_cbse_02_005` (Fungi) to contrast generation times, size, and antibiotic targets.  
3. **Simulate a contamination drill** — give the student three blinded culture photos (bacterial, fungal, clean‑but‑mycoplasma+) and ask for diagnosis, detection method, and action. Debrief using the diagnostic answers above.  
4. **Re‑test** with a fresh scenario: "Your CHO culture shows 60% viability, clear medium, normal morphology. What test do you run first and why?" Expect: "Mycoplasma PCR on spent medium because asymptomatic infection is common and Pen‑Strep doesn't cover it."

## PREREQUISITE_NODE_IDS
c12_biotech_cbse_08_004, c12_biotech_cbse_08_005, c12_biotech_cbse_08_007, c11_biotech_cbse_12_011, c11_bio_cbse_02_003, c11_bio_cbse_02_005, c11_biotech_cbse_01_010, c12_biotech_cbse_08_008, c11_biotech_cbse_12_001

## PREREQUISITE_REASONS
c12_biotech_cbse_08_004: Culture media composition (serum, antibiotics, pH indicator) directly influences contamination risk and detection.  
c12_biotech_cbse_08_005: Serum is a major contamination vector; understanding its pros/cons is essential for risk assessment.  
c12_biotech_cbse_08_007: Subculturing involves opening vessels — the highest‑risk moment for aseptic breach.  
c11_biotech_cbse_12_011: Introduces basic animal cell culture equipment (BSC, CO₂ incubator, inverted microscope) used in contamination control.  
c11_bio_cbse_02_003: Bacterial structure (cell wall, binary fission) explains why penicillin works on bacteria but not mycoplasma.  
c11_bio_cbse_02_005: Fungal morphology (hyphae, spores) and growth kinetics differentiate fungal from bacterial contamination.  
c11_biotech_cbse_01_010: Biosafety guidelines dictate containment levels, waste handling, and personnel protection during contamination events.
c12_biotech_cbse_08_008: Thawed cells are highly susceptible to contamination; aseptic handling during recovery is critical.  
c11_biotech_cbse_12_001: 1. Re‑visit microscopy basics — use node `c11_biotech_cbse_12_001` (Microscopy) to practice identifying bacterial rods, fungal hyphae, and the absence of visible particles in mycoplasma‑infected cultures.  

## FORWARD_NODE_IDS
c12_biotech_cbse_08_010, c12_biotech_cbse_08_011
## FORWARD_REASONS
c12_biotech_cbse_08_010: Scale‑up (bioreactors, microcarriers) amplifies contamination consequences; requires closed systems, in‑line sterilization, and rigorous mycoplasma clearance validation.  
c12_biotech_cbse_08_011: Applications (vaccines, therapeutic proteins) demand contaminant‑free banks; regulatory filing relies on contamination‑control documentation from this node.

## CROSS_SUBJECT_PREREQS
c11_biotech_cbse_12_002, c11_biotech_cbse_12_003, c11_chem_cbse_07_014
## CROSS_SUBJECT_REASONS
c11_biotech_cbse_12_002: Centrifugation (differential/density gradient) is used to concentrate microorganisms from culture supernatant for detection (e.g., pelleting mycoplasma for PCR).  
c11_biotech_cbse_12_003: Spectrophotometry (OD₆₀₀) provides rapid bacterial/fungal growth quantification — turbidity correlates with cell density.  
c11_chem_cbse_07_014: Solubility product (Ksp) and common‑ion effect underpin the precipitation of antimicrobial agents in media and the design of selective media for contaminant isolation.

## CHAIN_DESCRIPTION
c12_biotech_cbse_08_004 -> c12_biotech_cbse_08_005 -> c12_biotech_cbse_08_007 -> c12_biotech_cbse_08_009 -> c12_biotech_cbse_08_010 -> c12_biotech_cbse_08_011

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_biotech_cbse_12_002 | Centrifugation used to harvest microorganisms from culture supernatant for downstream detection (PCR, culture).  
c11_biotech_cbse_12_003 | Spectrophotometric OD₆₀₀ measurement quantifies bacterial/fungal turbidity as a proxy for contamination load.  
c11_chem_cbse_07_014 | Solubility equilibria (Ksp) govern the precipitation of antibiotic salts in media, affecting their effective concentration and shelf‑life.
## PREREQ_CONCEPT
Understanding that animal cells divide slowly (18–24 h) while bacteria divide every 20–30 min, creating a kinetic window where contaminants dominate if aseptic barriers fail.

## PREREQ_BEFORE
Student must be able to describe the function of a Class II biosafety cabinet, CO₂ incubator, and inverted microscope, and explain the role of serum and antibiotics in culture medium.

## PREREQ_STUCK
Review the aseptic technique workflow in node `c12_biotech_cbse_08_004` (media preparation) and the BSC operation in node `c11_biotech_cbse_12_011` (cell culture techniques).

## WORKED_EXAMPLE_1
PROBLEM: A lab uses 500 mL of complete medium (DMEM + 10% FBS + Pen‑Strep) per week for CHO cells. The FBS lot was not tested for mycoplasma. After 3 weeks, the team notices reduced transfection efficiency but no turbidity or pH shift. They decide to test for mycoplasma using a commercial PCR kit that requires 1 mL of conditioned medium. The kit's limit of detection is 10 CFU/mL. If the mycoplasma concentration in the flask is 5 × 10³ CFU/mL and the sample is taken after a 1:10 dilution in PBS during processing, will the PCR detect it? Show calculations.

STEPS:
- Step 1: Identify the initial mycoplasma concentration in the culture: 5 × 10³ CFU/mL.
- Step 2: Account for the 1:10 dilution during sample processing: diluted concentration = (5 × 10³ CFU/mL) / 10 = 5 × 10² CFU/mL.
- Step 3: Compare the diluted concentration (500 CFU/mL) with the kit's limit of detection (10 CFU/mL). Since 500 > 10, the PCR will detect mycoplasma.
- Step 4: Consider sampling volume: the kit uses 1 mL of diluted sample, so absolute CFU in reaction = 500 CFU, well above detection threshold.
- Step 5: Conclude that the test will be positive, confirming contamination despite asymptomatic culture appearance.

REASONING: Mycoplasma infections often reach 10³–10⁶ CFU/mL without visible signs. PCR sensitivity (10 CFU/mL) is sufficient even after routine dilution steps. This example illustrates why visual inspection fails and why PCR on spent medium is the gold standard.

ANSWER: Yes, the PCR will detect mycoplasma (final concentration 500 CFU/mL > 10 CFU/mL LOD).

## WORKED_EXAMPLE_2
PROBLEM: During routine environmental monitoring, a settle plate in the cell culture room grows 120 colonies after 48 h incubation at 37°C. The plate diameter is 9 cm. The lab's action limit for Grade B (ISO 7) environment is <50 CFU/90 mm plate/4 h exposure. The plate was exposed for 4 hours. Calculate the contamination level in CFU/m³ of air (assume 1 m³ air sampled per 90 mm plate for 4 h) and determine if the room meets specification.

STEPS:
- Step 1: Note the colony count: 120 CFU per plate.
- Step 2: The exposure time is 4 hours, matching the standard exposure for settle plates in Grade B.
- Step 3: The standard conversion for a 90 mm settle plate is 1 plate ≈ 1 m³ air sampled over 4 h (per ISO 14644‑1 / EU GMP Annex 1).
- Step 4: Therefore, airborne contamination = 120 CFU/m³.
- Step 5: Compare with action limit: Grade B limit is 50 CFU/m³ (for 4 h exposure). 120 > 50, so the room fails specification.
- Step 6: Immediate actions: investigate HEPA filter integrity, review personnel gowning, increase cleaning frequency, re‑test after corrective action.

REASONING: Settle plates measure sedimentation of viable particles; the 90 mm plate area (≈63.6 cm²) over 4 h approximates 1 m³ air sampling. Exceeding the limit indicates inadequate HEPA filtration or procedural breach, directly increasing culture contamination risk.

ANSWER: 120 CFU/m³ — exceeds Grade B limit of 50 CFU/m³; room does NOT meet specification.

## WORKED_EXAMPLE_3
PROBLEM: A researcher wants to eliminate mycoplasma from a valuable CHO cell line using BM‑Cyclin (tiamulin 10 µg/mL + minocycline 1 µg/mL). The treatment protocol: 14 days with medium change every 48 h. The cell line doubling time is 22 h. Starting with 2 × 10⁵ cells/mL in a T‑75 flask (15 mL medium), calculate the total number of medium changes required and the approximate final cell yield if no split is performed (assume no mycoplasma‑induced growth inhibition). Also, explain why the medium must be changed every 48 h during antibiotic treatment.

STEPS:
- Step 1: Treatment duration = 14 days = 336 hours.
- Step 2: Medium change interval = 48 hours. Number of intervals = 336 / 48 = 7. Since the first change is at 48 h, total medium changes = 7 (at 48, 96, 144, 192, 240, 288, 336 h).
- Step 3: Calculate number of doublings in 336 h: doublings = 336 h / 22 h per doubling ≈ 15.27 doublings.
- Step 4: Final cell concentration = initial × 2^(doublings) = 2 × 10⁵ × 2^15.27 ≈ 2 × 10⁵ × 3.9 × 10⁴ ≈ 7.8 × 10⁹ cells/mL.
- Step 5: Total cells in 15 mL = 7.8 × 10⁹ × 15 ≈ 1.17 × 10¹¹ cells. (Note: this exceeds confluency; in practice cells would be split. The calculation shows theoretical yield without splitting.)
- Step 6: Reason for 48‑h medium change: BM‑Cyclin antibiotics degrade in culture (tiamulin half‑life ~24 h, minocycline ~48 h at 37°C). Fresh medium maintains effective drug concentration and removes mycoplasma debris/metabolites that could protect residual organisms.

REASONING: Combines cell growth kinetics (from node c12_biotech_cbse_08_007) with antibiotic pharmacokinetics. The 48‑h change ensures bactericidal/minimum inhibitory concentrations are sustained, which is critical because mycoplasma eradication requires continuous exposure for 2–3 passages.

ANSWER: 7 medium changes; theoretical final yield ≈ 1.2 × 10¹¹ cells (but culture would require splitting well before Day 14). Medium changed every 48 h to maintain antibiotic potency.

## COMPETENCY_QUESTION_1
QUESTION: A biotech startup is developing a CHO‑cell‑derived biosimilar. Their master cell bank (MCB) tests negative for mycoplasma by PCR. During GMP manufacturing, a single‑use bioreactor run shows a gradual drop in viability from 95% to 60% over 10 days, with no change in pH, osmolality, or glucose/lactate profiles. Microscopy reveals normal morphology. The QC manager proposes: (a) continue the run and test harvest for mycoplasma; (b) discard the run immediately; (c) add plasmocin to the bioreactor feed. Evaluate each option against ICH Q5A guidelines and choose the best course of action with justification.

COMPETENCY: Evaluating and justifying decisions based on regulatory science and contamination biology

STEPS:
- Step 1: Recognize that asymptomatic viability loss with normal metabolites is classic mycoplasma signature.
- Step 2: ICH Q5A requires that cell banks and production runs be free of adventitious agents; a positive mycoplasma test at harvest invalidates the batch.
- Step 3: Option (a) risks producing a contaminated product that cannot be released; mycoplasma are not removed by standard viral clearance steps (nanofiltration pore size 15–20 nm vs mycoplasma 200–300 nm).
- Step 4: Option (b) is conservative but wastes resources; however, if contamination is confirmed, it is the only compliant action.
- Step 5: Option (c) is prohibited in GMP — adding antibiotics to a production bioreactor alters product quality, introduces unqualified reagents, and does not guarantee eradication within the run timeline.
- Step 6: Best action: Immediately quarantine the bioreactor, initiate mycoplasma PCR on perfusion harvest samples, and if positive, discard the run per SOP. Simultaneously investigate root cause (media lot, seed train, bioreactor sterilization).

ANSWER: Option (b) — discard the run — is the only GMP‑compliant choice once mycoplasma is suspected in a production run, because (1) mycoplasma cannot be cleared by downstream processing, (2) antibiotic addition is not allowed in GMP manufacturing, and (3) continuing risks patient safety and regulatory rejection. The MCB being negative does not guarantee the working cell bank or bioreactor run is negative; contamination can occur during scale‑up.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: Design a validation experiment to prove that your 0.1 µm sterile filtration step (used for serum and media) effectively removes mycoplasma. Specify: (i) challenge organism and concentration, (ii) filter type and area, (iii) sample volumes, (iv) detection method for filtrate, (v) acceptance criteria. Reference relevant pharmacopeial standards.

COMPETENCY: Designing and validating a critical contamination‑control unit operation

STEPS:
- Step 1: Choose challenge organism: *Mycoplasma orale* (ATCC 23714), a common cell culture isolate, grown to mid‑log phase.
- Step 2: Prepare challenge suspension at ≥10⁷ CFU/mL in culture medium (verified by plating on mycoplasma agar and PCR).
- Step 3: Use the exact 0.1 µm PES (polyethersulfone) filter cartridge (same lot, same surface area, e.g., 0.05 m²) as used in production.
- Step 4: Filter a minimum of 10 L of challenged medium (simulating worst‑case volume) at process flow rate and pressure.
- Step 5: Collect filtrate in sterile containers; concentrate by centrifugation (20,000 × g, 30 min) and resuspend pellet in 1 mL PBS.
- Step 6: Test concentrate by (a) culture on mycoplasma agar (incubate 14 days at 37°C, 5% CO₂) and (b) qPCR for *M. orale* 16S rRNA (LOD 10 CFU/mL).
- Step 7: Acceptance criteria: Zero CFU on agar plates and negative qPCR (Ct > 40) for all filtrate samples, demonstrating ≥7 log reduction (LRV ≥ 7). Document per USP <1211> Sterility Assurance and PDA Technical Report No. 26.

ANSWER: Validation protocol as above; LRV ≥ 7 required. If any filtrate tests positive, the filter pore size rating or integrity is compromised — investigate filter housing seals, pre‑filtration, and filter lot.

DIFFICULTY: hard