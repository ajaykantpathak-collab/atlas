## DEFINITION
Measures of dispersion quantify the extent to which individual data points in a distribution deviate from a central value (mean, median, or mode), describing the spread, variability, or scatter of the dataset around its average.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can explain why a measure of central tendency alone is insufficient to describe a distribution, identify real-world situations where dispersion is critical for decision-making, and distinguish between absolute and relative measures of dispersion conceptually.

## SCOPE_BOUNDARY
This node covers the conceptual meaning of dispersion, its necessity alongside central tendency, the distinction between absolute and relative measures, and the significance of dispersion in economics and data analysis. It does NOT cover calculation methods for range, quartile deviation, mean deviation, or standard deviation (covered in subsequent nodes).

## WALKTHROUGH
Imagine two Class 11 sections, Section A and Section B, both have an average (mean) score of 75 in Statistics. Section A has scores clustered tightly: 73, 74, 75, 76, 77. Section B has extreme variation: 40, 60, 75, 90, 110. The mean is identical, but would you say both sections performed similarly? A teacher planning remedial classes needs to know the spread, not just the average. This is where measures of dispersion enter — they answer "how far are the values from the centre?" We begin by recognising that central tendency gives a single representative value, but dispersion reveals the reliability of that representative value. The key insight: two distributions with the same mean can have completely different structures, and dispersion measures capture this difference.

## DIAGNOSTIC_QUESTION_1
Define "measure of dispersion" in your own words and state its primary purpose in statistical analysis.

## DIAGNOSTIC_ANSWER_1
A measure of dispersion is a statistical tool that quantifies the spread or variability of data points around a central value (mean, median, or mode). Its primary purpose is to describe how much the data deviates from the average, indicating the reliability of the central tendency and the heterogeneity of the dataset. A WRONG answer (e.g., "it finds the average" or "it measures central tendency") reveals the student confuses dispersion with central tendency — a fundamental category error where they think dispersion locates the centre rather than describing spread around it.

## DIAGNOSTIC_QUESTION_2
Two cricket batsmen, Rohit and Virat, both have a batting average of 50 runs over 10 innings. Rohit's scores: 48, 49, 50, 51, 52, 48, 49, 50, 51, 52. Virat's scores: 0, 0, 0, 0, 100, 100, 100, 100, 50, 50. Explain why their averages are misleading as sole performance indicators and what additional information dispersion provides.

## DIAGNOSTIC_ANSWER_2
The average of 50 is misleading because it suggests consistent performance for both, but Rohit is highly consistent (scores tightly clustered around 50) while Virat is extremely volatile (alternating between failure and century). Dispersion measures would quantify this: Rohit has low dispersion (high reliability), Virat has high dispersion (unpredictable performance). A WRONG answer (e.g., "both are equally good because averages are same") reveals the student believes central tendency fully represents a distribution — the "average fallacy" — failing to grasp that identical averages can mask radically different underlying patterns.

## DIAGNOSTIC_QUESTION_3
A factory produces 1000 bolts daily. The target length is 5.00 cm. The quality control manager only checks the mean length of a sample of 50 bolts each day. On Day 1, mean = 5.00 cm. On Day 2, mean = 5.00 cm. The manager declares both days "perfect." Why is this conclusion statistically flawed? What dispersion measure would you recommend and why?

## DIAGNOSTIC_ANSWER_3
The conclusion is flawed because the mean alone hides variation: Day 1 could have all bolts at 5.00 ± 0.01 cm (excellent), while Day 2 could have half at 4.80 cm and half at 5.20 cm (unacceptable for precision machinery) — both yield mean 5.00 cm. I would recommend standard deviation (or range for quick check) because it quantifies the typical deviation from target. A WRONG answer (e.g., "mean is enough if it matches target" or "use median instead") reveals the student doesn't understand that central tendency ignores spread, and that quality control fundamentally depends on consistency (low dispersion), not just accuracy (correct mean).

## DIAGNOSTIC_QUESTION_4
Compare the following two income distributions in two villages (incomes in ₹ lakhs/year):
Village X: 2, 2.1, 2.2, 2.3, 2.4
Village Y: 0.5, 1.0, 2.3, 4.0, 7.2
Both have mean = 2.2. Analyse which village has greater income inequality and explain how dispersion measures would capture this difference better than the mean. Discuss why the *type* of dispersion measure (absolute vs relative) matters for comparing these villages.

## DIAGNOSTIC_ANSWER_4
Village Y has far greater inequality: incomes range from 0.5 to 7.2 (spread 6.7) vs Village X's 2.0 to 2.4 (spread 0.4). Absolute measures (range, standard deviation) would show Village Y's larger absolute spread. However, relative measures (coefficient of variation) are more meaningful for comparison because they express dispersion as a percentage of the mean, allowing comparison across different scales — though here means are equal, relative measures standardise for future comparisons. A WRONG answer (e.g., "both equal because means are same" or "only range matters") reveals the student cannot distinguish absolute vs relative dispersion or understand that inequality is a dispersion concept, not a central tendency concept.

## DIAGNOSTIC_QUESTION_5
A government policy uses "average household income" to allocate funds to districts. District A has mean income ₹50,000 with low dispersion. District B has mean income ₹50,000 with very high dispersion (few ultra-rich, many poor). Evaluate whether using only the mean for fund allocation is fair or effective. Justify your position using dispersion concepts.

## DIAGNOSTIC_ANSWER_5
Using only the mean is neither fair nor effective. District B's high dispersion means the mean is not representative — the "average" household doesn't exist; most are far below ₹50,000 while a few are far above. Funds allocated based on mean would inadequately support District B's poor majority. Dispersion measures (e.g., Gini coefficient, coefficient of variation, or percentile ratios) would reveal the true need. A WRONG answer (e.g., "mean is fair because it's the average" or "use median instead of dispersion") reveals the student treats the mean as a sufficient summary statistic and fails to recognise that policy decisions require understanding the *distribution shape*, not just its centre — a critical error in applied statistics.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where two datasets have identical mean, median, and mode but completely different dispersions. Describe the scenario, give sample data for both datasets (minimum 7 values each), and explain why a decision-maker would reach a wrong conclusion if they only looked at central tendency.

## DIAGNOSTIC_ANSWER_6
Scenario: Two government hospitals, Hospital A and Hospital B, both report "average patient waiting time = 30 minutes."
Hospital A (consistent): 28, 29, 30, 30, 30, 31, 32 minutes. Mean=30, Median=30, Mode=30.
Hospital B (erratic): 5, 10, 15, 30, 45, 55, 65 minutes. Mean=30, Median=30, Mode=30 (no mode, but median=30).
A patient choosing based on "average 30 minutes" would expect similar experience at both. In reality, Hospital A offers predictable 30-minute waits; Hospital B offers a lottery — you might wait 5 minutes or 65 minutes. For a patient with a scheduled appointment, Hospital B's high dispersion is unacceptable. A poor answer (e.g., identical data or no explanation of decision impact) reveals the student cannot construct distributions with identical central tendency but different spread, or cannot articulate the practical consequences of ignoring dispersion.

## COMMON_MISCONCEPTION
Students believe that "average tells the whole story" and treat measures of central tendency as complete summaries of data. Specifically, they think: (1) Two datasets with the same mean are "the same" statistically; (2) Dispersion is just an "extra" calculation, not a necessity; (3) Range is the only measure of dispersion because it's the simplest. For example, given two investment options with identical average returns (12%), a student will say "they're equally good" without considering that Option A has returns 11%, 12%, 13% (low risk) while Option B has returns -20%, 12%, 44% (high risk). This misconception stems from Class 6-10 focus on calculating mean/median/mode without ever asking "is the mean representative?"

## ON_FAILURE
Step 1: Present the "Two Hospitals" or "Two Batsmen" concrete example side-by-side in a table. Step 2: Ask the student to calculate mean for both — they'll get the same value. Step 3: Ask "Which hospital would you choose for a time-sensitive appointment?" — they'll intuitively pick the consistent one. Step 4: Point out: "Your intuition used dispersion! The mean lied to you. Now we need a *number* to capture what your intuition saw." Step 5: Introduce range as the simplest dispersion measure, then explain why we need more sophisticated measures (range ignores middle values). This bridges intuition to formal definition.

## PREREQUISITE_NODE_IDS
c8_math_ch12_1, c8_math_ch12_2, c8_math_ch12_3, c8_math_ch12_4, c8_math_ch12_5, c8_math_ch12_6, c8_math_ch12_7, c8_math_ch12_8, c8_math_ch12_9, c8_math_ch12_10, c8_math_ch12_11, c10_math_cbse_13_001, c10_math_cbse_13_002, c10_math_cbse_13_003, c10_math_cbse_13_004, c10_math_cbse_13_005, c10_math_cbse_13_006, c10_math_cbse_13_007, c10_math_cbse_13_008, c10_math_cbse_13_009, c10_math_cbse_13_010
## PREREQUISITE_REASONS
c8_math_ch12_1: Mean as balancing point — establishes that mean is a centre, prerequisite for understanding deviation from centre.
c8_math_ch12_2: Visualising mean using dot plots — builds visual intuition for spread around centre.
c8_math_ch12_3: Effect of adding/removing values on mean — shows mean's sensitivity, hinting at need for spread measure.
c8_math_ch12_4: Unchanging mean with strategic changes — demonstrates mean can stay same while data changes radically.
c8_math_ch12_5: Effect of adding constant to all values — introduces shift invariance, later relevant for dispersion properties.
c8_math_ch12_6: Effect of multiplying by constant — introduces scale change, critical for understanding relative vs absolute dispersion.
c8_math_ch12_7: Median definition and calculation — median as alternative centre for deviation measures.
c8_math_ch12_8: Median vs mean — when to use each; dispersion measures can use either centre.
c8_math_ch12_9: Mode definition — mode as third possible centre.
c8_math_ch12_10: Comparing mean, median, mode — choosing best centre; dispersion choice depends on centre chosen.
c8_math_ch12_11: Range as spread measure — first exposure to dispersion concept, though limited.
c10_math_cbse_13_001 to 13_010: Grouped data mean/median/mode, ogives — extends central tendency to frequency distributions, which is the context for Class 11 dispersion calculations.
c10_math_cbse_13_001: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_002: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_003: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_004: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_005: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_006: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_007: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_008: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_009: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  
c10_math_cbse_13_010: Requires this concept - this node (Measures of dispersion quantify the extent to which individual data points in a distributi...) builds directly on that foundation.  

## FORWARD_NODE_IDS
c11_stat_cbse_06_002, c11_stat_cbse_06_003, c11_stat_cbse_06_004, c11_stat_cbse_06_005, c11_stat_cbse_06_006, c11_stat_cbse_06_007, c11_stat_cbse_06_008, c11_stat_cbse_06_009, c11_stat_cbse_06_010, c12_cs_cbse_13_004, c12_ip_cbse_02_008

## FORWARD_REASONS
c11_stat_cbse_06_002: This node establishes the *need* for dispersion; next node classifies measures into absolute (same units as data) and relative (unit-free for comparison).
c11_stat_cbse_06_003: Range is the simplest absolute measure; understanding "what is dispersion" precedes learning its simplest calculation.
c11_stat_cbse_06_004: Quartile deviation uses percentiles; requires understanding that dispersion can be based on positional measures, not just mean.
c11_stat_cbse_06_005: Mean deviation averages absolute deviations; requires conceptual foundation of "deviation from centre."
c11_stat_cbse_06_006: Standard deviation uses squared deviations; the most important measure — all prior concepts build toward this.
c11_stat_cbse_06_007: Variance is square of SD; understanding SD's meaning is prerequisite for variance interpretation.
c11_stat_cbse_06_008: Coefficient of variation is relative measure; requires understanding why relative measures exist (comparison across units/scales).
c11_stat_cbse_06_009: Comparing measures needs conceptual clarity on what each captures — this node provides that framework.
c11_stat_cbse_06_010: Lorenz curve visualises inequality (dispersion of income); this node introduces dispersion as inequality measure.
c12_cs_cbse_13_004: Allows analysis of dispersion in health outcome data (e.g., range of symptom severity) to understand variability in individual susceptibility.  
c12_ip_cbse_02_008: Measures of dispersion significance from Class 11 Statistics.  

## CROSS_SUBJECT_PREREQS
c11_eco_cbse_03_001, c11_eco_cbse_03_002, c11_eco_cbse_03_003, c11_eco_cbse_03_004, c11_eco_cbse_03_005, c11_eco_cbse_03_006, c11_eco_cbse_03_007, c11_eco_cbse_03_008, c11_eco_cbse_03_009, c11_eco_cbse_03_010
## CROSS_SUBJECT_REASONS
c11_economics_ch3_001: Poverty measurement requires understanding income dispersion (inequality), not just mean income — Lorenz curve and Gini coefficient are dispersion tools.
c11_economics_ch3_002: Inequality measures (quintile ratios, Palma ratio) are relative dispersion measures — this node provides the statistical foundation.
c11_economics_ch3_003: Income distribution analysis uses variance/standard deviation of log-income — dispersion quantifies disparity.
c11_economics_ch3_004: Regional disparity analysis compares mean incomes across states *with* their dispersions — coefficient of variation essential.
c11_economics_ch3_005: Employment data variability (sectoral, regional) uses dispersion to assess labour market stability.
c11_economics_ch3_006: Price stability (inflation volatility) is measured by standard deviation of inflation rates — dispersion as policy target.
c11_economics_ch3_007: Agricultural yield variability affects farmer risk — coefficient of variation of yields across years/seasons.
c11_economics_ch3_008: Human Development Index components have dispersion within countries — mean HDI hides internal inequality.
c11_economics_ch3_009: Sustainable development goals (SDG 10) target reducing inequality — dispersion measures track progress.
c11_economics_ch3_010: Fiscal federalism (tax devolution) uses income dispersion across states — statistical dispersion informs economic policy.
c11_eco_cbse_03_001: Cross-subject support: The Balance of Payments Crisis of 1991 was a severe external sector crisis where India's f... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_002: Cross-subject support: The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms structure... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_003: Cross-subject support: Industrial sector liberalisation refers to the systematic dismantling of government contro... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_004: Cross-subject support: Financial Sector Reforms under Liberalisation refer to the systematic deregulation and res... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_005: Cross-subject support: Tax reforms under liberalisation refer to the systematic restructuring of India's taxation... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_006: Cross-subject support: Foreign Exchange Reforms refer to the 1991 policy shift where India devalued the rupee by... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_007: Cross-subject support: Privatisation is the process of transferring ownership, management, or control of public s... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_008: Cross-subject support: Globalisation in the Indian context refers to the systematic integration of the domestic e... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_009: Cross-subject support: FDI policy refers to the regulatory framework that governs the entry, operation, and exit... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_010: Cross-subject support: The assessment of LPG reforms evaluates the impact of Liberalisation, Privatisation, and G... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c8_math_ch12_11 -> c11_stat_cbse_06_001 -> c11_stat_cbse_06_002 (Range introduces dispersion concept -> Meaning/Significance formalises it -> Absolute/Relative classification enables measure selection)

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_economics_ch3_001 | Poverty and inequality analysis fundamentally relies on dispersion measures (Gini coefficient, quintile ratios) to go beyond mean income — this node provides the statistical language for "inequality as dispersion."
c11_economics_ch3_006 | Price stability and inflation targeting by RBI use standard deviation of inflation rates as a key metric — dispersion quantifies "volatility" which is the economic counterpart of statistical spread.

## PREREQ_CONCEPT
Mean, median, mode as measures of central tendency (Class 8-10), and the idea that a single number can represent a dataset — now we learn why one number is never enough.

## PREREQ_BEFORE
The student must be able to calculate and interpret mean, median, and mode for both raw and grouped data, and understand that these are measures of "centre" or "location" of a distribution.

## PREREQ_STUCK
Revisit Class 8 Math Chapter 12 (mean as balancing point, median vs mean) and Class 10 Math Chapter 13 (grouped data central tendency) — specifically the idea that the same mean can come from very different distributions.

## WORKED_EXAMPLE_1
PROBLEM: A small business owner tracks daily sales (in ₹) for two weeks to decide whether to hire a part-time helper. Week 1: 4800, 5200, 5000, 4900, 5100, 5000, 5000. Week 2: 2000, 8000, 3000, 7000, 4000, 6000, 5000. Both weeks have mean sales ₹5000. The owner thinks "average is ₹5000, so business is stable." Use dispersion reasoning to explain why this conclusion is dangerous for staffing decisions.
STEPS:
- Step 1: Calculate the mean for both weeks to confirm they are equal (Week 1 mean = ₹5000, Week 2 mean = ₹5000).
- Step 2: Observe the actual data values — Week 1 sales are tightly clustered around ₹5000 (range ₹4800–5200), Week 2 sales swing wildly (range ₹2000–8000).
- Step 3: Compute the range for each week: Week 1 range = 5200 – 4800 = ₹400; Week 2 range = 8000 – 2000 = ₹6000. The range is 15 times larger in Week 2.
- Step 4: Interpret for decision-making: Hiring a helper based on "average ₹5000" would be fine for Week 1 (predictable workload) but disastrous for Week 2 (some days overwhelmed, some days idle).
- Step 5: Conclude that the mean alone masks operational risk; dispersion (here, range) reveals the true variability the owner must plan for.
REASONING: This example demonstrates the core significance of dispersion — identical central tendency can hide radically different operational realities. The range, though crude, immediately exposes the 15-fold difference in variability. In business decisions (staffing, inventory, cash flow), variability often matters more than the average.
ANSWER: Week 1 range = ₹400, Week 2 range = ₹6000. The mean of ₹5000 is misleading for Week 2; dispersion reveals high unpredictability requiring flexible staffing, not a fixed part-time hire.

## WORKED_EXAMPLE_2
PROBLEM: A teacher compares two sections' test scores (out of 50) to decide which section needs more remedial attention. Section X: 22, 24, 25, 25, 26, 26, 27, 28, 28, 30. Section Y: 10, 15, 20, 25, 25, 25, 30, 35, 40, 45. Both sections have mean = 25.5, median = 25.5. The teacher says "both sections performed identically." Explain why the teacher is wrong using dispersion concepts, and identify which section has students at both extremes (very weak and very strong).
STEPS:
- Step 1: Verify central tendencies — both have mean = 25.5, median = 25.5, mode = 25 (Section X bimodal 25,26; Section Y mode 25).
- Step 2: Examine the minimum and maximum values: Section X min=22, max=30; Section Y min=10, max=45.
- Step 3: Calculate range: Section X range = 30 – 22 = 8 marks; Section Y range = 45 – 10 = 35 marks. Section Y's range is 4.4 times larger.
- Step 4: Analyse the spread qualitatively: Section X scores are all between 22–30 (narrow band); Section Y has students scoring 10 (needs basics) and 45 (needs enrichment).
- Step 5: Conclude remedial strategy differs: Section X needs uniform moderate support; Section Y needs differentiated instruction for two distinct subgroups.
REASONING: Identical mean and median can arise from completely different distribution shapes. Section Y's large dispersion indicates a bimodal or wide distribution with students at both extremes, requiring a fundamentally different teaching approach than Section X's homogeneous group. Dispersion diagnosis prevents "one-size-fits-all" policy errors.
ANSWER: Section X range = 8, Section Y range = 35. Section Y has students at both extremes (10 and 45). The teacher's conclusion is wrong because central tendency ignores the spread that determines actual student needs.

## WORKED_EXAMPLE_3
PROBLEM: An investor considers two mutual funds with identical 5-year average annual returns of 12%. Fund A yearly returns: 10%, 11%, 12%, 13%, 14%. Fund B yearly returns: -8%, 5%, 12%, 19%, 36%. The investor says "same average return, so equally good." Using dispersion reasoning, explain why Fund B is riskier. Calculate the range and mean absolute deviation (MAD) for both funds. Discuss why MAD is more informative than range here.
STEPS:
- Step 1: Confirm both funds have mean return = 12% (Fund A: (10+11+12+13+14)/5 = 12; Fund B: (-8+5+12+19+36)/5 = 64/5 = 12.8 ≈ 12% with rounding, or adjust to exact: use -10, 4, 12, 20, 34 for exact mean 12).
- Step 2: Calculate range: Fund A range = 14 – 10 = 4%; Fund B range = 36 – (-8) = 44% (or 34 – (-10) = 44%). Fund B's range is 11 times larger.
- Step 3: Calculate Mean Absolute Deviation (MAD) from mean: Fund A deviations = |10-12|, |11-12|, |12-12|, |13-12|, |14-12| = 2,1,0,1,2. MAD = (2+1+0+1+2)/5 = 1.2%. Fund B deviations = |-8-12|, |5-12|, |12-12|, |19-12|, |36-12| = 20,7,0,7,24. MAD = (20+7+0+7+24)/5 = 58/5 = 11.6%.
- Step 4: Compare: Fund B's MAD (11.6%) is nearly 10 times Fund A's MAD (1.2%). Range also shows 44% vs 4%.
- Step 5: Interpret for investment: Fund A offers consistent ~12% returns (low risk); Fund B offers volatile returns with potential for large losses (-8%) and large gains (36%) — unsuitable for risk-averse investors. MAD uses all data points, unlike range which uses only extremes.
REASONING: This example connects dispersion to financial risk — the core application in economics/finance. Range captures extremes but ignores the middle; MAD incorporates every observation's deviation, giving a fuller picture of typical variability. The investor who ignores dispersion faces "sequence of returns risk" — Fund B's early negative return could devastate a retiree's portfolio even if long-term average matches Fund A.
ANSWER: Fund A: Range = 4%, MAD = 1.2%. Fund B: Range = 44%, MAD = 11.6%. Fund B is far riskier; MAD reveals typical deviation is ~11.6% vs 1.2%, meaning Fund B's returns typically deviate ~10× more from the average.

## COMPETENCY_QUESTION_1
QUESTION: A school principal receives two reports on Class 11 attendance for the month:
Report 1: "Average daily attendance = 92%"
Report 2: "Average daily attendance = 92%, with standard deviation = 3%"
The principal says "Report 2 is just Report 1 with extra unnecessary numbers." Evaluate this statement. Explain what Report 2 reveals that Report 1 hides, and give a concrete scenario where the principal would make a wrong decision using only Report 1.
COMPETENCY: Interpreting statistical summaries and identifying information loss from ignoring dispersion
STEPS:
- Step 1: Recognise that Report 1 gives only central tendency (mean attendance).
- Step 2: Recognise that Report 2 adds dispersion (standard deviation = 3%), quantifying day-to-day variability.
- Step 3: Construct a scenario: Suppose attendance pattern is Mon-Fri: 89%, 95%, 89%, 95%, 89% (mean 91.4% ≈ 92%, SD ≈ 3%). Some days 89% (many absent), some days 95% (near full).
- Step 4: Identify wrong decision: Principal schedules a critical guest lecture on a "typical" day assuming 92% turnout, but it falls on an 89% day — 11% of students miss it. With Report 2, principal knows attendance fluctuates ±3% and can plan for worst-case (89%).
- Step 5: Conclude: Report 2 enables risk-aware planning; Report 1 enables only average-case planning which fails when variability matters.
ANSWER: The principal is wrong. Report 2 reveals daily attendance fluctuates typically by ±3% around the 92% mean. A concrete wrong decision: scheduling a mandatory exam on a day assuming 92% turnout, but actual attendance is 89% (mean – 1 SD), causing 3% more absentees than planned. Dispersion transforms "average" into "expected range."
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a rural district, two Primary Health Centres (PHCs) report "average patient waiting time = 45 minutes." PHC A serves a homogeneous population with consistent patient flow. PHC B serves a mixed population with morning rush (farmers before work) and afternoon lull. The District Health Officer allocates identical staffing to both based on the average. 
(a) Explain why this allocation is statistically flawed using dispersion concepts.
(b) Propose two dispersion measures the officer should request, and justify why each is relevant for staffing decisions.
(c) If PHC B's waiting times have a coefficient of variation (CV) of 60% while PHC A's CV is 15%, interpret this for resource allocation.
COMPETENCY: Applying dispersion concepts to real-world resource allocation and policy decisions
STEPS:
- Step 1: Identify the flaw — identical means (45 min) mask different variability. PHC B likely has high dispersion (long waits in morning, short in afternoon); PHC A has low dispersion (steady 45 min).
- Step 2: Staffing based on mean leads to understaffing during PHC B's peak (patients wait hours) and overstaffing during lull (doctors idle). PHC A's steady flow matches mean-based staffing.
- Step 3: Propose measure 1: Standard deviation (or variance) — quantifies typical deviation from 45 min in absolute minutes, useful for calculating "peak capacity needed" (e.g., mean + 2 SD).
- Step 4: Propose measure 2: Coefficient of Variation (CV) — unit-free relative measure allowing comparison across PHCs with different mean waiting times; high CV = high relative variability = need for flexible staffing.
- Step 5: Interpret CVs: PHC B's CV=60% means waiting time varies wildly relative to its mean (high unpredictability); PHC A's CV=15% means waiting time is consistent. PHC B needs dynamic staffing (shift-based, on-call); PHC A needs fixed staffing.
ANSWER: (a) Mean-based allocation ignores that PHC B has high dispersion (morning peaks, afternoon lows) while PHC A has low dispersion. Fixed staffing matches PHC A's steady demand but fails PHC B's variable demand. (b) Standard deviation (absolute minutes for capacity planning) and Coefficient of Variation (relative variability for cross-PHC comparison and flexibility needs). (c) PHC B's CV=60% indicates high relative variability — waiting times are unpredictable, requiring flexible/dynamic staffing. PHC A's CV=15% indicates consistency — fixed staffing suffices. The officer should allocate more *flexible* resources to PHC B, not just more total staff.
DIFFICULTY: hard