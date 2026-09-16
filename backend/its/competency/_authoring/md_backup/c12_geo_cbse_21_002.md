## DEFINITION
Field Survey Design is the systematic process of planning a primary data collection exercise by defining clear research objectives, selecting appropriate sampling techniques, constructing data collection instruments (questionnaires, interview schedules, observation checklists), and organizing logistical, ethical, and analytical frameworks before entering the field. It transforms a geographical question into an actionable, replicable fieldwork protocol that yields reliable spatial and attribute data for analysis.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently design a complete field survey plan for a given geographical problem (e.g., assessing groundwater depletion in a village, mapping urban flood vulnerability, studying crop diversification) that includes: (1) a precise problem statement with testable hypotheses, (2) justified sampling strategy with sample size calculation, (3) a pre-tested questionnaire/schedule with coded variables, (4) a fieldwork timeline and resource budget, and (5) a data management and ethics protocol.

## SCOPE_BOUNDARY
This node covers the end-to-end planning phase of a geographical field survey: problem formulation, literature review, reconnaissance, sampling design, instrument construction, pilot testing, and logistics. It does NOT cover actual data collection techniques (covered in c12_geo_cbse_21_003), sampling theory derivations (covered in c12_geo_cbse_21_004), data entry/processing (covered in c12_geo_cbse_21_005), or GIS/Remote Sensing integration (covered in c12_geo_cbse_21_006 onwards). All examples use Indian geographical contexts (villages, cities, watersheds, agricultural regions).

## WALKTHROUGH
Imagine you are a Class 12 student in Bhopal asked to investigate why the water level in your colony's borewells drops sharply every April. You cannot just walk around with a notebook — you need a plan. Start by asking: *What exactly am I measuring?* (Static water level, pumping duration, household size, roof area for rainwater harvesting). Then ask: *Where and from whom?* (Stratify colonies by housing type — plotted, apartments, slums — because water access differs). Next: *How will I ask?* (Design a 15-minute structured schedule with coded responses for pump type, depth, electricity hours). Then: *Test it* — try the schedule on 5 neighbors, fix ambiguous questions (e.g., "How much water do you use?" → "How many buckets per day for bathing?"). Finally: *Logistics* — permissions from RWA, GPS for borewell locations, two classmates as enumerators, 3 weekends in March before summer. This sequence — Problem → Population → Instrument → Pilot → Logistics — is the universal field survey design loop.

## DIAGNOSTIC_QUESTION_1
A student writes the research objective as: "To study water problems in my city." Identify the specific flaw in this objective from a field survey design perspective and rewrite it as a SMART (Specific, Measurable, Achievable, Relevant, Time-bound) objective suitable for a Class 12 geography project.

## DIAGNOSTIC_ANSWER_1
The flaw: "water problems" is vague (quality? quantity? supply? drainage?), "my city" lacks spatial boundaries, and no measurable indicator or timeframe is given. A SMART rewrite: "To compare the static groundwater level (meters below ground level) in 30 randomly selected borewells across three housing typologies (plotted, apartment, slum) in Ward 42, Bhopal, during the pre-monsoon period (15–30 April 2025), and correlate it with household water consumption (litres per capita per day) recorded via a structured schedule." A wrong answer reveals the student cannot operationalize geographical concepts into measurable variables — a critical Board exam error where "study X" fetches zero marks without defined variables and spatial limits.

## DIAGNOSTIC_QUESTION_2
During reconnaissance for a survey on "changing cropping patterns in Narmada valley villages," a student decides to skip the pilot test because "the questionnaire looks fine." Explain why this is a methodological error, using the concepts of *validity*, *reliability*, and *field logistics* specific to rural agricultural surveys in India.

## DIAGNOSTIC_ANSWER_2
Pilot testing is not optional — it validates three things simultaneously: (1) **Validity**: Farmers in Narmada valley may interpret "cropping pattern" as *which crop* but the researcher needs *sequence, timing, and input use* — only a pilot reveals this semantic gap. (2) **Reliability**: If two enumerators ask "What is your kharif yield?" and record "20 quintals" vs "2000 kg" for the same farmer, the instrument lacks reliability — pilot exposes unit inconsistency. (3) **Field logistics**: A 45-minute schedule fails when farmers are available only during 10-minute tea breaks; pilot forces redesign to a 12-minute core module. Skipping pilot guarantees non-comparable data — a classic Board practical exam deduction (3–5 marks under "design and planning").

## DIAGNOSTIC_QUESTION_3
You are designing a survey to map household-level flood vulnerability in a 2 km² urban ward in Guwahati with 1,200 households. The ward has three distinct micro-zones: riverfront (300 HH), mid-slope (600 HH), and hilltop (300 HH). Calculate the minimum sample size for a 95% confidence level and 5% margin of error using the finite population correction formula. Then justify whether proportional or disproportional stratified sampling is appropriate, and allocate the sample across strata.

## DIAGNOSTIC_ANSWER_3
**Step 1**: Finite population formula: \( n_0 = \frac{Z^2 \cdot p \cdot (1-p)}{e^2} = \frac{1.96^2 \times 0.5 \times 0.5}{0.05^2} = 384.16 \approx 385 \) (using p=0.5 for maximum variability).  
**Step 2**: Finite population correction: \( n = \frac{n_0}{1 + \frac{n_0 - 1}{N}} = \frac{385}{1 + \frac{384}{1200}} = \frac{385}{1.32} = 291.7 \approx 292 \).  
**Step 3**: Stratification choice — **disproportional** because riverfront (high vulnerability, high variability) needs larger sample to detect rare high-impact events, while hilltop (low variability) needs minimum representation.  
**Step 4**: Allocation (Neyman optimal): Assume vulnerability variance: riverfront σ²=0.25, mid-slope σ²=0.16, hilltop σ²=0.09. Sample allocation \( n_h = n \cdot \frac{N_h \sigma_h}{\sum N_h \sigma_h} \).  
Riverfront: \( 292 \times \frac{300 \times 0.5}{300 \times 0.5 + 600 \times 0.4 + 300 \times 0.3} = 292 \times \frac{150}{150+240+90} = 292 \times \frac{150}{480} = 91 \)  
Mid-slope: \( 292 \times \frac{240}{480} = 146 \)  
Hilltop: \( 292 \times \frac{90}{480} = 55 \)  
Total = 292. A wrong answer (e.g., simple random sample of 292) ignores spatial heterogeneity — flood risk is not uniformly distributed, so SRS would under-sample the critical riverfront zone.

## DIAGNOSTIC_QUESTION_4
Compare the field survey design requirements for studying (A) "Perception of heat stress among street vendors in Delhi's Chandni Chowk" vs (B) "Soil moisture variation across a 50-ha wheat farm in Punjab." Analyze how the *unit of analysis*, *spatial sampling frame*, *instrument type*, and *temporal scheduling* differ fundamentally between these two geographical problems.

## DIAGNOSTIC_ANSWER_4
| Design Element | (A) Street Vendors, Chandni Chowk | (B) Wheat Farm, Punjab |
|----------------|-----------------------------------|------------------------|
| **Unit of Analysis** | Individual vendor (human subject, mobile) | 10m × 10m grid cell (fixed spatial unit) |
| **Sampling Frame** | No listing exists → snowball/quotas from market entry points | Complete frame: 500 grid cells from GPS + satellite base map |
| **Instrument** | Semi-structured interview (thermal comfort scales, coping strategies) | Gravimetric soil cores + handheld TDR probe (quantitative, objective) |
| **Temporal Scheduling** | Peak heat hours (12–4 PM) across 3 non-consecutive days in May | Pre-irrigation (6 AM) and post-irrigation (6 PM) on same day, repeated at 3 growth stages |
| **Ethics/Access** | Informed consent, anonymity, no disruption to livelihood | Farmer permission, no crop damage, GPS coordinates shared back |
A wrong answer treats both as "questionnaire surveys" — missing that (B) is a *biophysical measurement survey* requiring instruments, not interviews. Board exams test this distinction in case-based questions (2–3 marks).

## DIAGNOSTIC_QUESTION_5
Evaluate the following field survey plan for a Class 12 project: "I will visit 5 villages near my town, stand at the bus stop, and ask every 10th person coming out about their migration history. I will record answers in my notebook and make a bar chart." Identify **four** specific design flaws that violate geographical field survey principles, and explain the consequence of each flaw on data quality.

## DIAGNOSTIC_ANSWER_5
1. **No defined sampling frame**: "Every 10th person at bus stop" is a *convenience sample* biased toward daytime travelers, missing women, elderly, and night-shift migrants. Consequence: Migration rates underestimated by 30–50% (Census shows 65% rural migrants are women — absent at bus stops).  
2. **No spatial stratification**: Villages differ by distance to town, caste composition, landholding — treating them as identical ignores spatial heterogeneity. Consequence: Cannot generalize to "villages near town" — ecological fallacy.  
3. **No instrument standardization**: Notebook recording leads to inconsistent probes ("Why did you leave?" vs "When?"). Consequence: Non-comparable qualitative data — cannot code for push/pull factors.  
4. **No ethics/logistics protocol**: No consent, no RWA/panchayat permission, no enumerator training. Consequence: Data rejection by Board examiner (0/20 for fieldwork) and potential community conflict.  
A poor answer lists "small sample" or "not scientific" without naming the specific design principle violated (frame, stratification, standardization, ethics).

## DIAGNOSTIC_QUESTION_6
Design a one-page field survey protocol card (mental or paper) that a Class 12 student can carry during a household survey on "Domestic Water Use and Conservation Practices in a Bengaluru Apartment Complex." The card must include: (a) 3 core hypotheses, (b) 5 coded variables with measurement units, (c) skip logic for one filter question, (d) GPS/photo protocol, and (e) refusal conversion script. Present as a structured checklist.

## DIAGNOSTIC_ANSWER_6
**FIELD SURVEY PROTOCOL CARD — Bengaluru Apartment Water Survey**  
**A. Hypotheses**:  
H₁: Households with individual water meters consume ≤135 lpcd (BIS standard) vs flat-rate households >180 lpcd.  
H₂: Rainwater harvesting (RWH) adoption correlates with awareness score >7/10, not income.  
H₃: Greywater reuse for flushing reduces freshwater demand by ≥25%.  
**B. Coded Variables**:  
1. `HH_ID` (Apartment number, e.g., B-304)  
2. `Meter_Type` (0=Flat, 1=Individual, 2=Sub-metered)  
3. `Daily_Use_LPCD` (Litres per capita per day — calculated from meter reading / household size)  
4. `RWH_Status` (0=N/A, 1=Rooftop only, 2=Rooftop+Recharge, 3=Full reuse)  
5. `Greywater_Use` (0=No, 1=Flushing, 2=Gardening, 3=Both)  
**C. Skip Logic**:  
Q12: "Do you have a functional RWH system?" → If **No**, skip to Q18 (Greywater section). If **Yes**, ask Q13–Q17 (Capacity, Maintenance, Quality, Cost, Satisfaction).  
**D. GPS/Photo Protocol**:  
- Record `HH_ID` + GPS waypoint at entrance (accuracy ≤5m).  
- Photograph: Water meter (reading visible), RWH tank/pipe, Greywater outlet — rename file as `HH_ID_Meter.jpg`, `HH_ID_RWH.jpg`, `HH_ID_GW.jpg`.  
**E. Refusal Conversion Script**:  
"Sir/Ma'am, I'm a Class 12 student from [School] doing a CBSE project on water savings — it takes 7 minutes. Your apartment number stays anonymous. The RWA has approved this (show letter). Can we do it now or Sunday 10 AM?"  
A good answer shows operationalization (lpcd, coded categories), spatial tagging (GPS), and practical fieldcraft (refusal script). A poor answer writes vague "questions about water" without codes, units, or logic.

## COMMON_MISCONCEPTION
Students believe "field survey design" means only writing a questionnaire. They ignore the *pre-field* phases: (1) **Problem operationalization** — converting "I want to study traffic" into "Peak-hour PCU count at 3 intersections using 15-min intervals on 2 weekdays." (2) **Sampling frame construction** — they assume Google Maps gives a household list; it doesn't for Indian slums or unauthorized colonies. (3) **Pilot testing** — they treat it as "wasting time" rather than the *only* way to catch translation errors (Hindi/English/Kannada), skip-logic bugs, and enumerator fatigue. (4) **Ethics/logistics** — they forget RWA/panchayat permissions, leading to fieldwork shutdown. Board examiners deduct heavily for missing "Design and Planning" section in practical files (up to 8/20 marks).

## ON_FAILURE
If a student cannot design a survey plan:  
**Step 1**: Revisit **c12_geo_cbse_21_001** (Meaning, Need, Significance) — re-read the "Why field surveys?" section to internalize that design *precedes* tools.  
**Step 2**: Take a *real* CBSE Class 12 practical file (senior's or teacher's sample) and reverse-engineer its design: highlight the problem statement, sampling frame, pilot note, and ethics letter. Annotate each with "This is Step X of design."  
**Step 3**: Do a **micro-pilot** in your own building: design a 5-question schedule on "AC temperature settings," test on 3 flats, note where respondents hesitate. Rewrite. This builds the *design reflex* — the habit of asking "Will this question work in the field?" before finalizing.  
**Step 4**: Re-attempt **Diagnostic Question 5** with a new scenario (e.g., "Solid waste segregation in my colony") — write a full protocol card (as in Q6). Get teacher feedback on *design completeness*, not content.

## PREREQUISITE_NODE_IDS
c12_geo_cbse_21_001, c11_soc_cbse_05_008, c11_psy_cbse_02_006, c11_geo_cbse_24_001

## PREREQUISITE_REASONS
c12_geo_cbse_21_001: Provides the foundational understanding of what field surveys are, their need, and significance — without this, students cannot justify *why* each design step matters.  
c11_soc_cbse_05_008: Introduces survey research method and sampling theory (stratification, sampling frames) — the statistical backbone of geographical survey design.  
c11_psy_cbse_02_006: Covers questionnaire and interview construction principles (question wording, scaling, pre-testing) — directly applicable to instrument design in this node.  
c11_geo_cbse_24_001: Topographical map reading skills — essential for constructing spatial sampling frames (identifying hamlets, roads, landmarks) during reconnaissance.

## FORWARD_NODE_IDS
c12_geo_cbse_21_003, c12_geo_cbse_21_004, c12_geo_cbse_21_005
## FORWARD_REASONS
c12_geo_cbse_21_003: Field Survey Methods (Questionnaire, Interview, Observation) — this node's instrument design output (coded variables, skip logic) becomes the input for selecting and administering specific methods.  
c12_geo_cbse_21_004: Sampling Methods (Random, Stratified, Systematic) — the sampling strategy justified here (sample size, allocation) is implemented using the techniques taught in the next node.  
c12_geo_cbse_21_005: Field Data Collection (Recording, Documentation) — the protocol card (GPS, photo, refusal script) designed here is executed during actual data collection.

## CROSS_SUBJECT_PREREQS
c11_soc_cbse_05_008, c11_psy_cbse_02_006, c11_psy_cbse_02_011, c11_hs_cbse_04_008
## CROSS_SUBJECT_REASONS
c11_soc_cbse_05_008: Sociology's survey research and sampling theory provides the methodological rigour (probability sampling, sampling error) that geography adapts for spatial data.  
c11_psy_cbse_02_006: Psychology's questionnaire/interview design principles (Likert scales, leading questions, pilot testing) are directly transferred to geographical schedule construction.  
c11_psy_cbse_02_011: Ethical issues in psychological research (informed consent, anonymity, deception) map exactly to geographical field ethics (RWA consent, GPS anonymization, no coercion).  
c11_hs_cbse_04_008: Home Science's management process (planning, organizing, controlling) is the project management framework for fieldwork logistics — timeline, budget, team roles.

## CHAIN_DESCRIPTION
c12_geo_cbse_21_001 -> c12_geo_cbse_21_002 -> c12_geo_cbse_21_003 (Design defines the problem and plan; Methods execute the plan with specific tools; Sampling operationalizes the plan's population logic; Data Collection implements the protocol.)

## THIS_FORMULA
Finite Population Sample Size: \( n = \frac{ \frac{Z^2 \cdot p \cdot (1-p)}{e^2} }{ 1 + \frac{ \frac{Z^2 \cdot p \cdot (1-p)}{e^2} - 1 }{N} } \)  
Where: \( n \) = adjusted sample size, \( Z \) = Z-score (1.96 for 95% CI), \( p \) = estimated proportion (0.5 for max variability), \( e \) = margin of error (0.05), \( N \) = population size.

## FORMULA_VARIABLES
n = final sample size after finite population correction; Z = standard normal deviate for confidence level (1.96 for 95%, 2.576 for 99%); p = anticipated proportion (use 0.5 if unknown for conservative max sample); e = acceptable margin of error (typically 0.05 or 5%); N = total population size (households, farms, borewells) in the study area.

## FORMULA_UNITS
n, N: dimensionless counts (number of units); Z: dimensionless (standard normal quantile); p: proportion (0–1); e: proportion (0–1); Confidence Level: % (e.g., 95%); Margin of Error: % (e.g., ±5%).

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c11_soc_cbse_05_008 | Sociology provides the sampling theory (stratification, cluster, systematic) and survey research logic that geography applies to spatial units (villages, wards, grid cells).  
c11_psy_cbse_02_006 | Psychology contributes questionnaire design principles — question sequencing, response formats (Likert, semantic differential), pre-testing protocols — used directly in geographical schedule construction.  
c11_hs_cbse_04_008 | Home Science's management process (planning → organizing → implementing → controlling) structures the fieldwork project timeline, resource allocation, and quality checks.  
c11_geo_cbse_26_001 | Class 11 Remote Sensing (principle, stages) enables pre-field reconnaissance via satellite imagery — identifying settlements, land use, access routes before designing the sampling frame.
## PREREQ_CONCEPT
Operationalization — the process of converting abstract geographical concepts (e.g., "water scarcity," "vulnerability," "cropping pattern") into measurable, countable variables with defined units and spatial boundaries.

## PREREQ_BEFORE
The student must be able to: (1) Write a geographical problem statement with at least two measurable variables, (2) Distinguish between probability and non-probability sampling, (3) Construct a simple frequency table from raw data, (4) Read a toposheet to identify settlement patterns and transport access.

## PREREQ_STUCK
If stuck on operationalization, revisit **c11_soc_cbse_05_008** (sampling theory) and **c11_psy_cbse_02_006** (questionnaire design) — practice converting 3 vague topics (e.g., "air pollution," "traffic jam," "soil health") into SMART objectives with coded variables.

## WORKED_EXAMPLE_1
PROBLEM: Design the sampling strategy for a field survey on "Groundwater Irrigation Equity in a 12-village Gram Panchayat in Karnataka's Kolar District." The Panchayat has 2,400 operational borewells distributed across 3 hydrogeological zones: Hard Rock (800 wells, high failure rate), Weathered Zone (1,000 wells, moderate yield), Alluvial (600 wells, high yield). The researcher wants to compare borewell depth, yield (lps), and electricity subsidy access across zones with 95% CI and 5% margin of error.  
STEPS:
- Step 1: Define population and strata — Population = 2,400 borewells; Strata = 3 hydrogeological zones (natural strata based on aquifer properties, not administrative boundaries).
- Step 2: Calculate base sample size per stratum using finite population correction for each zone separately (since variability differs). For Hard Rock: N=800, n₀=385, n=385/(1+384/800)=265. Weathered: N=1000, n=385/(1+384/1000)=278. Alluvial: N=600, n=385/(1+384/600)=234. Total = 777.
- Step 3: Apply Neyman allocation for optimal precision — but here strata ARE the comparison groups, so proportional allocation is mandatory to enable zone-wise estimates. Allocate: Hard Rock 265, Weathered 278, Alluvial 234.
- Step 4: Select sampling method within strata — Systematic random sampling from the borewell list (available from BESCOM electricity records). Sampling interval k = N_h / n_h. Hard Rock: k=800/265≈3 → select every 3rd well from random start 1–3.
- Step 5: Plan field logistics — 777 wells × 20 min/well = 259 hours. With 3 enumerators × 6 hrs/day = 14.4 days. Schedule pre-monsoon (April) when wells are accessible and static water level is measurable.
- Step 6: Build protocol card — Variables: Well_ID, Zone, Depth_m, Yield_lps, Subsidy_Y/N, Crop_Type, GPS. Skip logic: If Yield=0 (failed well), skip yield measurement, record "dry".
REASONING: Hydrogeological zones are the correct strata because groundwater behavior is physically determined by aquifer type — administrative boundaries (villages) cut across aquifers, creating false homogeneity. Finite population correction is essential because sampling fractions (265/800=33%) exceed 5% rule-of-thumb. Systematic sampling from electricity records ensures spatial spread and list availability.
ANSWER: Sample 777 borewells (265 Hard Rock, 278 Weathered, 234 Alluvial) using systematic random sampling from BESCOM list with zone-specific intervals. Fieldwork: 15 days, 3 enumerators, pre-monsoon. Protocol includes GPS, yield test, subsidy verification.

## WORKED_EXAMPLE_2
PROBLEM: A Class 12 student wants to survey "Perceived Air Quality and Health Symptoms among Auto-rickshaw Drivers at 5 Major Intersections in Lucknow." The student has 4 days (Weekend 1 & 2) and 2 classmates as enumerators. Design the complete fieldwork plan including: shift timing, sampling method, instrument structure, and quality control.  
STEPS:
- Step 1: Define unit and frame — Unit = Individual auto-rickshaw driver; Frame = No official list exists. Use *time-location sampling* (TLS): each intersection is a "venue-day-time" (VDT) unit. Drivers are mobile — capture them during shift breaks.
- Step 2: Determine shifts — Auto drivers work 2 shifts: Morning (6 AM–2 PM) and Evening (2 PM–10 PM). Survey both shifts across 2 weekdays + 1 weekend day per intersection to capture variation. Total VDTs = 5 intersections × 3 days × 2 shifts = 30 VDTs.
- Step 3: Sampling within VDT — At each VDT, use *systematic intercept*: approach every 3rd driver during 45-min break window (e.g., 11:00–11:45 AM). Target 8 drivers/VDT → 30 × 8 = 240 drivers (feasible: 3 enumerators × 8 VDTs/day × 2 days = 48 VDTs capacity, but only 30 needed).
- Step 4: Instrument design — 3 sections: (A) Exposure: Hours driving, route, AC/no-AC, mask use (coded 0/1/2). (B) Perception: 5-point Likert (1=Very Good to 5=Very Poor) for visibility, smell, irritation. (C) Symptoms: 7 binary (Y/N) items — cough, eye burn, headache, breathlessness, fatigue, nausea, sleep disturbance. Add GPS waypoint + photo of intersection.
- Step 5: Quality control — Day 1 morning: Joint calibration — all 3 enumerators interview same 3 drivers, compare coding. Resolve discrepancies. Daily: Field supervisor (teacher) checks 10% forms for completeness, GPS match, skip logic.
- Step 6: Ethics — Verbal consent script: "We're students studying air health — 5 mins, anonymous, no name. Can we ask?" RTO permission letter for intersection access.
REASONING: TLS is the gold standard for hidden mobile populations. Shift stratification captures diurnal pollution variation (morning vs evening peaks). Likert + binary symptoms allow both ordinal and prevalence analysis. Calibration ensures inter-rater reliability — critical for Board practical viva.
ANSWER: 30 venue-day-time units across 5 intersections, 3 days, 2 shifts. Systematic intercept (every 3rd driver) targeting 240 drivers. 3-section coded schedule with GPS/photo. Daily 10% QC, calibration Day 1. RTO permission + verbal consent.

## WORKED_EXAMPLE_3
PROBLEM: Integrate Class 11 Remote Sensing (c11_geo_cbse_26_001) and this node's survey design to create a **hybrid field survey plan** for "Validation of Satellite-Derived Land Surface Temperature (LST) with Micro-climatic Measurements in Delhi's Urban Heat Islands." Use Landsat-8 Band 10/11 (100m resolution) LST product as base. Design ground-truthing survey for 15th May 2024 (peak summer).  
STEPS:
- Step 1: Satellite data prep — Download Landsat-8 Collection 2 Level-2 LST for Path 146 Row 40 (Delhi) for 15 May 2024. Clip to NCT boundary. Identify 5 LST classes: <38°C, 38–40, 40–42, 42–44, >44°C. These are *strata* for ground validation.
- Step 2: Sampling design — Stratified random sampling: Select 10 random points per LST class (50 points total) within accessible areas (parks, schools, wide roads — avoid airports, defense). Use QGIS "Random points in strata" tool. Minimum distance 500m to avoid spatial autocorrelation.
- Step 3: Ground instrument package — At each point, measure: (a) Air temperature (T_air) at 1.5m height using calibrated digital thermometer (±0.1°C), (b) Surface temperature (T_surf) of 3 materials (asphalt, concrete, grass) using infrared thermometer (±0.5°C), (c) Sky View Factor (SVF) using fisheye lens + Hemispherical Photography (analyze in Gap Light Analyzer), (d) Land cover type (photo + GPS).
- Step 4: Temporal synchronization — Satellite overpass ~10:30 AM IST. Ground measurements: 10:00–11:00 AM window. 3 teams × 2 enumerators, each team covers ~17 points. Pre-program GPS waypoints on phones.
- Step 5: Data linkage protocol — Each ground point gets `Point_ID`, `LST_Class`, `LST_Satellite`, `T_air`, `T_surf_asphalt`, `T_surf_concrete`, `T_surf_grass`, `SVF`, `LC_Type`, `GPS`, `Time`. Post-field: Regression of LST_Satellite vs T_air by LST_Class; RMSE calculation.
- Step 6: Quality assurance — Pre-field: Calibrate all 6 thermometers against NPL-standard thermometer. Field: Duplicate measurements at 5 random points (10% QC). Post-field: Outlier detection (|T_air - LST| > 5°C flagged for re-check).
REASONING: This hybrid design uses RS for *stratification* (efficient, objective) and field survey for *validation* (accuracy, micro-scale processes). SVF and material-specific T_surf explain *why* LST varies within a 100m pixel — the geographical mechanism. Synchronization with overpass is non-negotiable for thermal validation. Board examiners award full marks for such RS-GIS-Field integration (Case Study Q, 5 marks).
ANSWER: 50 stratified random points across 5 LST classes from Landsat-8 15 May 2024. Ground measurements: T_air (1.5m), T_surf (3 materials), SVF, land cover — synchronized to 10:30 AM overpass. 3 teams, calibrated instruments, 10% duplicates. Output: LST vs T_air regression per class, RMSE, UHI driver analysis.

## COMPETENCY_QUESTION_1
QUESTION: A Class 12 student submits a field survey proposal on "Women's Time Use in Water Collection in a Rajasthan Desert Village." The proposal states: "I will ask 50 women how much time they spend fetching water." The teacher returns it with "Incomplete Design — Resubmit." List the **five specific design components** missing from this proposal that are mandatory for CBSE Geography Practical Examination (2024–25 syllabus), and for each, write the *minimum acceptable content* the student must add.  
COMPETENCY: Understanding spatial distribution and research design  
STEPS:
- Step 1: Recall the CBSE Practical Geography marking scheme components for Field Survey (Design & Planning section: 8 marks).
- Step 2: Map each missing component to the syllabus requirement: Problem Statement, Sampling Design, Instrument, Logistics, Ethics.
- Step 3: For each, specify the minimum operational detail required (not just headings).
- Step 4: Verify against the "Women's Time Use" context — e.g., sampling must address gender, caste, distance to source.
ANSWER:  
1. **Problem Statement with Hypotheses** — Missing: "Women from Scheduled Caste households spend ≥30 min/trip more than General Category households due to source segregation." Minimum: 2 testable hypotheses with variables (caste, time/trip, source type).  
2. **Sampling Frame & Strategy** — Missing: No list of households, no stratification. Minimum: "Complete household list from Anganwadi register (N=320). Stratified random: 3 strata by caste (SC/ST/OBC/General) proportional to population. n=80 (95% CI, 10% MoE, finite pop correction)."  
3. **Structured Schedule with Coded Variables** — Missing: "Ask how much time" is unstructured. Minimum: 15-item schedule: HH_ID, Caste, Source_Type (0=Own tap, 1=Public standpost, 2=Tanker, 3=Well), Trips_Day, Time_Trip_Min, Container_L, Queue_Time, Physical_Effort_Scale (1–5), GPS_Source, GPS_Home. Skip logic: If Source_Type=0, skip Trips/Time/Queue.  
4. **Fieldwork Logistics & Timeline** — Missing: When, who, how long. Minimum: "Pre-monsoon (May 20–25), 2 female enumerators (local language), 6 hrs/day, 7 HH/day/enumerator = 6 days. Transport: hired jeep. Accommodation: Panchayat bhawan."  
5. **Ethics & Consent Protocol** — Missing: No mention of consent, anonymity, harm. Minimum: "Written consent from Sarpanch. Oral consent from each respondent. HH_ID anonymized in data. No photos of faces. Refusal script in Marwari. Data shared with Panchayat in summary."  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Case Study — "A geography student designs a survey to estimate the **proportion of households practicing rooftop rainwater harvesting (RWH)** in a 15 km² municipal ward in Chennai with 8,000 households. The ward has 4 revenue divisions with known RWH adoption rates from a 2019 pilot: Div A (25%), Div B (15%), Div C (40%), Div D (10%). The student proposes: (i) Simple Random Sample of 400 households from the ward voter list, (ii) Single question: 'Do you have RWH? Yes/No', (iii) Data collection via Google Form link sent on WhatsApp groups."  
Critique this design by identifying **three fundamental flaws** (one each in sampling, instrument, mode) and redesign **only the sampling strategy** using optimum allocation for a stratified sample with total n=400, 95% CI, minimizing variance of the overall proportion estimate. Show allocation calculations.  
COMPETENCY: Applying statistical geography to real-world survey design  
STEPS:
- Step 1: Identify the three flaws — sampling (SRS ignores known heterogeneity), instrument (single binary question misses system type, functionality, maintenance), mode (WhatsApp excludes non-smartphone households → coverage bias).
- Step 2: For redesign, use Neyman allocation for proportion estimation: \( n_h = n \cdot \frac{N_h \sqrt{p_h(1-p_h)}}{\sum N_h \sqrt{p_h(1-p_h)}} \). Assume equal division size N_h = 2000 each.
- Step 3: Compute stratum standard deviations: σ_A = √(0.25×0.75)=0.433, σ_B = √(0.15×0.85)=0.357, σ_C = √(0.40×0.60)=0.490, σ_D = √(0.10×0.90)=0.300.
- Step 4: Compute allocation weights: N_hσ_h = 2000×σ_h → A: 866, B: 714, C: 980, D: 600. Sum = 3160.
- Step 5: Allocate n=400: n_A = 400×866/3160 = 110, n_B = 400×714/3160 = 90, n_C = 400×980/3160 = 124, n_D = 400×600/3160 = 76. Total = 400.
- Step 6: Justify why this beats proportional (100 each) — oversamples high-variability strata (C: 40% adoption, max variance) and undersamples low-variability (D: 10%).
ANSWER:  
**Flaws**: (1) Sampling: SRS wastes precision — divisions have vastly different adoption rates (10–40%), so stratification is mandatory. (2) Instrument: Single Yes/No cannot distinguish functional vs defunct RWH, system type (recharge/storage), or maintenance — violates "measurable variables" principle. (3) Mode: WhatsApp excludes 30–40% households (elderly, low-income) → severe non-coverage bias.  
**Redesigned Sampling (Optimum Allocation)**:  
Stratum A (25%): 110 HH  
Stratum B (15%): 90 HH  
Stratum C (40%): 124 HH  
Stratum D (10%): 76 HH  
Total = 400. This allocation minimizes variance of overall proportion by assigning more samples to Division C (highest p(1-p)=0.24) and fewer to Division D (lowest p(1-p)=0.09). Proportional allocation (100 each) would yield 15% higher standard error.  
DIFFICULTY: hard