## DEFINITION
Data transformation and normalisation are statistical preprocessing techniques used to convert raw geographical data into a standardised format that enables meaningful comparison, correlation analysis, and mapping across variables with different units, scales, or distributions. Transformation modifies the distribution shape (e.g., reducing skewness via log or square root), while normalisation rescales values to a common range (e.g., 0–1 or z-scores) so that variables like rainfall (mm), population density (persons/km²), and literacy rate (%) can be combined in composite indices or multivariate analysis.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can: (1) identify when a geographical dataset requires transformation (skewness, outliers, non-normality) or normalisation (different units/scales), (2) select and correctly apply the appropriate technique (log, square root, min-max, z-score, decimal scaling), (3) compute transformed/normalised values step-by-step for a given dataset, and (4) interpret the effect on subsequent correlation, mapping, or index construction.

## SCOPE_BOUNDARY
This node covers transformation (log, square root, reciprocal, Box-Cox concept) and normalisation (min-max, z-score, decimal scaling) techniques for geographical data preprocessing. It does NOT cover advanced multivariate methods (PCA, factor analysis), time-series decomposition, or spatial autocorrelation — those belong to higher-level geostatistics courses. It stays within Class 12 NCERT Practical Work in Geography Part-II scope: preparing data for correlation, composite indices, and choropleth mapping.

## WALKTHROUGH
Imagine you have district-level data for Madhya Pradesh: annual rainfall (mm), groundwater depth (m), and crop yield (quintals/hectare). You want to find which factor correlates most with yield, but the variables have wildly different units and ranges — rainfall varies 600–1400, groundwater 5–50, yield 10–60. First, observe the raw distributions: rainfall is roughly symmetric, groundwater is right-skewed (many shallow wells, few very deep), yield is slightly left-skewed. Next, recall from c12_geo_cbse_19_006 that dispersion measures (standard deviation) and from c12_geo_cbse_19_009 that Karl Pearson's correlation assumes linearity and normality. Therefore, you must normalise all variables to a common scale (z-score) and transform the skewed ones (log for groundwater) before computing correlations. The key principle: **comparability requires same scale; valid correlation requires approximate normality**.

## DIAGNOSTIC_QUESTION_1
A researcher has district-level data on literacy rate (percentage, range 45–98) and per capita income (rupees, range 25,000–1,20,000). She wants to compute Karl Pearson's correlation coefficient between them. Which preprocessing step is ESSENTIAL before correlation, and why?

## DIAGNOSTIC_ANSWER_1
**Correct answer:** Normalisation (e.g., z-score or min-max scaling) is essential because Karl Pearson's correlation uses covariance divided by product of standard deviations — if variables are on vastly different scales, the covariance magnitude becomes dominated by the larger-scale variable, distorting the correlation interpretation. Also, correlation assumes both variables are approximately normally distributed; if either is skewed, transformation (e.g., log for income) may be needed first.

**What a wrong answer reveals:** If the student says "no preprocessing needed" or "just compute correlation directly", they confuse correlation's mathematical invariance to linear scaling (which is true for Pearson's r) with the practical need for comparability in geographical analysis and the normality assumption. If they say "transform both with log", they miss that literacy rate (bounded 0–100, often symmetric) may not need transformation, while income (right-skewed) does.

## DIAGNOSTIC_QUESTION_2
The groundwater depth data for 20 districts in a region shows strong right-skewness (most values 5–15 m, a few 40–60 m). A student applies min-max normalisation directly to the raw data and then computes correlation with crop yield. What is the flaw in this approach, and what should be done instead?

## DIAGNOSTIC_ANSWER_2
**Correct answer:** Min-max normalisation (x' = (x - min)/(max - min)) is sensitive to outliers — the few very deep wells (40–60 m) will stretch the denominator, compressing the majority of values (5–15 m) into a narrow range near 0, losing discriminatory power. The correct sequence: (1) apply log transformation (or square root) to reduce skewness, (2) then normalise the transformed values. This preserves relative differences among the bulk of the data.

**What a wrong answer reveals:** If the student says "min-max is fine because it scales to 0–1", they ignore outlier sensitivity — a classic error in geographical data where extreme values (e.g., flood depth, landslide area) are common. If they say "use z-score instead", they miss that z-score also assumes approximate normality; the skew must be addressed first.

## DIAGNOSTIC_QUESTION_3
Given the following raw data for 5 districts: Annual Rainfall (mm): [850, 920, 780, 1100, 950]; Groundwater Depth (m): [8, 12, 5, 25, 10]. Compute the z-score normalised values for both variables. Show all steps. Then explain why z-score is preferable to min-max here.

## DIAGNOSTIC_ANSWER_3
**Correct answer with steps:**
1. Rainfall: mean = (850+920+780+1100+950)/5 = 4600/5 = 920; SD = √[Σ(x-920)²/5] = √[(4900+0+19600+32400+900)/5] = √[57800/5] = √11560 ≈ 107.5. Z-scores: (850-920)/107.5 = -0.65; (920-920)/107.5 = 0; (780-920)/107.5 = -1.30; (1100-920)/107.5 = 1.67; (950-920)/107.5 = 0.28.
2. Groundwater: mean = (8+12+5+25+10)/5 = 60/5 = 12; SD = √[Σ(x-12)²/5] = √[(16+0+49+169+4)/5] = √[238/5] = √47.6 ≈ 6.9. Z-scores: (8-12)/6.9 = -0.58; (12-12)/6.9 = 0; (5-12)/6.9 = -1.01; (25-12)/6.9 = 1.88; (10-12)/6.9 = -0.29.

**Why z-score > min-max:** Groundwater has an outlier (25 m). Min-max would use range 25-5=20, compressing the 4 values (5,8,10,12) into 0–0.35, losing discrimination. Z-score uses mean and SD, so the outlier influences SD but less extremely; the bulk of data spreads over ~±1 SD, preserving structure.

**What a wrong answer reveals:** If the student computes min-max instead, they miss the outlier issue. If they forget to divide by SD (or use n-1), they confuse population vs sample SD — but for geographical census data (all districts), population SD (denominator n) is correct.

## DIAGNOSTIC_QUESTION_4
A student constructs a "Drought Vulnerability Index" for 100 districts using three normalised indicators: (1) rainfall deficit (z-score), (2) groundwater decline (z-score), (3) crop yield loss (z-score). She averages the three z-scores to get the index. Critique this method. What assumption about the indicators does it violate? Propose a better weighting scheme.

## DIAGNOSTIC_ANSWER_4
**Correct answer:** Averaging z-scores assumes all three indicators contribute equally to drought vulnerability and are uncorrelated. In reality, rainfall deficit drives groundwater decline and crop loss — they are correlated (multicollinearity), so averaging double-counts the rainfall signal. Also, z-scores have mean 0, SD 1, but the index then has mean 0, SD < 1 (since averaging reduces variance), making interpretation unintuitive. Better: use Principal Component Analysis (PCA) on the correlation matrix to derive weights from the first principal component, or assign expert weights based on causal importance (e.g., rainfall 0.5, groundwater 0.3, yield 0.2) after checking VIF (Variance Inflation Factor) for multicollinearity.

**What a wrong answer reveals:** If the student says "z-scores are already standardised, so averaging is fine", they miss multicollinearity and equal-weighting assumptions. If they suggest "min-max then average", they don't solve the core issue. This tests understanding that normalisation ≠ valid index construction.

## DIAGNOSTIC_QUESTION_5
Evaluate the claim: "For choropleth mapping of district-level population density, log transformation should always be applied before classification into classes." Is this always true? When would it be inappropriate? Give a geographical example where log transformation distorts the spatial pattern.

## DIAGNOSTIC_ANSWER_5
**Correct answer:** Not always true. Log transformation is appropriate when data is strongly right-skewed (e.g., population density: many low-density rural districts, few very high-density urban districts) to reveal detail in the dense tail. It is inappropriate when: (a) data is already symmetric (e.g., literacy rate across districts), (b) data contains zeros or negatives (log undefined), (c) the map purpose is to show absolute density thresholds (e.g., "districts > 1000 persons/km² qualify for urban scheme") — log compresses high values, making thresholds visually indistinct. Example: Mapping population density in Rajasthan — most districts are 100–300, Jaipur is 5000. Log transformation makes Jaipur only ~3.7 (log10) vs others ~2–2.5, visually minimising the extreme urban-rural contrast that policymakers need to see.

**What a wrong answer reveals:** If the student says "always log-transform for choropleth", they treat it as a ritual, not a purpose-driven choice. If they say "never log-transform", they ignore skewness handling. The key is matching transformation to data distribution AND map purpose.

## DIAGNOSTIC_QUESTION_6
Design a preprocessing workflow for a dataset containing 15 variables (rainfall, temperature, soil pH, elevation, population density, literacy, road density, forest cover %, etc.) for 50 districts, intended for: (a) Karl Pearson correlation matrix, (b) composite "Development Index", (c) choropleth maps of each variable. Specify the sequence of steps, decision rules at each step, and how you would document the choices for reproducibility.

## DIAGNOSTIC_ANSWER_6
**Expected answer criteria (a good answer includes):**
1. **Exploratory step:** Compute skewness, kurtosis, outliers (boxplots), zero/negative checks for each variable.
2. **Transformation decisions:** For each variable, if skewness > |1| → apply log (if all positive) or square root; if still skewed → Box-Cox (note: conceptual only at Class 12). Document: "Variable X: skewness 2.3 → log10 applied".
3. **Normalisation decisions:** For correlation matrix → z-score all transformed variables (preserves correlation structure). For composite index → min-max on transformed variables to 0–1 (so index is 0–1 interpretable). For choropleth → keep transformed but unnormalised values; choose classification scheme (quantile, natural breaks) per variable.
4. **Documentation:** Create a metadata table: Variable | Original Unit | Skewness | Transformation | Normalisation for Correlation | Normalisation for Index | Classification for Map.
5. **Reproducibility:** Save transformation parameters (e.g., log base, min/max, mean/SD) in a codebook.

**What a poor answer reveals:** Missing decision rules (e.g., "transform all variables"), applying same normalisation to all purposes, ignoring zeros in log, or no documentation plan. This tests synthesis of the entire chapter's techniques.

## COMMON_MISCONCEPTION
Students often believe that **normalisation (scaling to 0–1 or z-scores) "fixes" skewness** — they apply min-max or z-score to right-skewed data (e.g., river discharge, landslide area) and think the distribution is now "normal". In reality, min-max and z-score are linear transformations: they preserve the exact shape of the distribution (skewness, kurtosis unchanged). Only non-linear transformations (log, square root, Box-Cox) alter distribution shape. Example: Groundwater depth [5, 8, 10, 12, 50] — min-max gives [0, 0.07, 0.11, 0.15, 1.0]; the outlier still dominates at 1.0, others compressed near 0. Log gives [0.7, 0.9, 1.0, 1.08, 1.7] — spread is now proportional to relative differences.

## ON_FAILURE
If the student confuses normalisation with transformation: (1) Give them a tiny right-skewed dataset (5 values: 2, 3, 4, 5, 20). (2) Have them compute min-max and z-score — show skewness coefficient unchanged. (3) Have them compute log10 — show skewness reduced. (4) Refer back to c12_geo_cbse_19_006 (Measures of Dispersion) to review skewness calculation, and c12_geo_cbse_19_009 (Karl Pearson) to review normality assumption. (5) Re-do Diagnostic Question 2 with this insight.

## PREREQUISITE_NODE_IDS
c12_geo_cbse_19_004, c12_geo_cbse_19_005, c12_geo_cbse_19_006, c12_geo_cbse_19_007, c12_geo_cbse_19_009, c12_geo_cbse_19_010, c12_geo_cbse_19_001, c12_geo_cbse_19_008

## PREREQUISITE_REASONS
c12_geo_cbse_19_004: Understanding mean, median, mode is needed to assess distribution symmetry before transformation.
c12_geo_cbse_19_005: Computation methods for grouped/ungrouped data are used when calculating transformation parameters (e.g., mean for z-score).
c12_geo_cbse_19_006: Variance and standard deviation are essential for z-score normalisation and for measuring skewness.
c12_geo_cbse_19_007: Quartile deviation and mean deviation provide alternative dispersion measures for robust normalisation (e.g., median/IQR scaling).
c12_geo_cbse_19_009: Karl Pearson's correlation assumes linearity and normality — the primary reason for transformation/normalisation.
c12_geo_cbse_19_010: Spearman's rank correlation is a non-parametric alternative when transformation fails — knowing when to switch.
c12_geo_cbse_19_001: Data transformation/normalization prepares processed data for advanced modeling.  
c12_geo_cbse_19_008: Data normalization (e.g., percentile scaling) transforms raw values into uniform distributions for comparative mapping.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
N/A

## CROSS_SUBJECT_PREREQS
c11_psy_cbse_02_009, c11_psy_cbse_02_010, c11_soc_cbse_05_005, c11_soc_cbse_05_008
## CROSS_SUBJECT_REASONS
c11_psy_cbse_02_009: Inferential statistics and hypothesis testing in psychology require normalised/transformed data for t-tests, ANOVA — same preprocessing principles.
c11_psy_cbse_02_010: Ethical issues in psychological research include proper data handling — transformation choices must be transparent.
c11_soc_cbse_05_005: Quantitative vs qualitative research methods in sociology — normalisation enables quantitative comparison of survey indicators.
c11_soc_cbse_05_008: Survey research and sampling theory — weighting and standardisation of survey variables across strata.

## CHAIN_DESCRIPTION
c12_geo_cbse_19_006 -> c12_geo_cbse_19_011 -> N/A (terminal node in Chapter 19; enables geostatistics in higher education)

## THIS_FORMULA
**Z-score normalisation:** z = (x - μ) / σ  (population) or z = (x - x̄) / s (sample)
**Min-max normalisation:** x' = (x - min) / (max - min)
**Log transformation:** x' = log₁₀(x) or ln(x)  (x > 0)
**Square root transformation:** x' = √x  (x ≥ 0)

## FORMULA_VARIABLES
x: raw data value; μ: population mean; σ: population standard deviation; x̄: sample mean; s: sample standard deviation; min: minimum value in dataset; max: maximum value in dataset; log₁₀: base-10 logarithm; ln: natural logarithm; √: square root

## FORMULA_UNITS
z-score: dimensionless (standard deviations from mean); min-max: dimensionless (0 to 1); log: dimensionless (log units); square root: √(original units) — e.g., √mm for rainfall

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c11_psy_cbse_02_009 | Both require data normalisation before parametric tests (t-test, ANOVA, Pearson correlation) — same z-score/log transformation logic.
c11_soc_cbse_05_005 | Quantitative sociology uses standardisation of survey indicators (e.g., Likert scales) to construct composite indices — identical min-max/z-score workflow.
c11_psy_cbse_02_010 | Research ethics in psychology demands transparency in data transformation — same documentation standard for geographical indices.
## PREREQ_CONCEPT
Understanding that statistical techniques (correlation, composite indices, parametric tests) require data to meet assumptions: comparable scales (normalisation) and approximate normality (transformation).

## PREREQ_BEFORE
Student must be able to compute mean, standard deviation, skewness, and identify outliers from a raw geographical dataset (covered in c12_geo_cbse_19_004, 19_005, 19_006).

## PREREQ_STUCK
If stuck, revisit c12_geo_cbse_19_006 (Measures of Dispersion) to practice SD and skewness calculation, then c12_geo_cbse_19_009 (Karl Pearson) to see why normality matters for correlation.

## WORKED_EXAMPLE_1
PROBLEM: For 6 districts in Vidarbha, Maharashtra, you have annual rainfall (mm): [720, 850, 680, 920, 780, 1150] and soybean yield (quintals/ha): [12, 18, 10, 22, 14, 30]. You want to compute Karl Pearson's correlation. Preprocess both variables appropriately and compute the correlation on transformed/normalised data.

STEPS:
- Step 1: Examine distributions. Rainfall: range 680–1150, roughly symmetric (mean ≈ 850, median ≈ 815). Soybean yield: range 10–30, right-skewed (mean ≈ 17.7, median ≈ 16) — high yield district (30) is an outlier.
- Step 2: Apply log transformation to soybean yield (all positive, right-skewed). log10(yield): [1.08, 1.26, 1.00, 1.34, 1.15, 1.48]. Rainfall left untransformed (symmetric).
- Step 3: Normalise both to z-scores for correlation. Rainfall: mean = 850, SD ≈ 158.1 → z: [-0.82, 0.00, -1.08, 0.44, -0.44, 1.90]. Log-yield: mean = 1.22, SD ≈ 0.17 → z: [-0.82, 0.24, -1.29, 0.71, -0.41, 1.53].
- Step 4: Compute Pearson's r on z-scores. Σ(z_rain × z_logyield) = 0.67 + 0.00 + 1.39 + 0.31 + 0.18 + 2.91 = 5.46. r = 5.46 / 6 = 0.91. (Note: r on z-scores = r on raw data, but z-scores allow checking linearity visually).
- Step 5: Verify. Scatterplot of z-scores shows linear trend. High r confirms strong positive relationship. Transformation improved normality of yield; normalisation enabled direct comparison of effect sizes.

REASONING: Correlation requires linearity and normality for valid significance testing. Log transformation reduces skewness in yield; z-score normalisation puts both variables on same scale (mean 0, SD 1) so the correlation coefficient directly reflects the standardised covariance. The steps follow the sequence: explore → transform → normalise → analyse.

ANSWER: Preprocessed correlation r = 0.91 (strong positive). Rainfall used raw (symmetric); soybean yield log-transformed then z-scored. Both then z-scored for correlation computation.

## WORKED_EXAMPLE_2
PROBLEM: Construct a "Water Stress Index" for 5 districts using three indicators: (1) Annual rainfall deficit (mm): [200, 150, 300, 100, 250] — higher = more stress; (2) Groundwater depth (m): [15, 10, 25, 8, 20] — higher = more stress; (3) Irrigation coverage (%): [40, 60, 30, 70, 35] — lower = more stress. Normalise all to 0–1 (min-max) where 1 = highest stress, then average to get index. Show steps.

STEPS:
- Step 1: Direction alignment. Rainfall deficit and groundwater depth: higher = more stress (keep as is). Irrigation coverage: higher = less stress → invert: stress_irr = 100 - coverage = [60, 40, 70, 30, 65].
- Step 2: Min-max normalisation for each (x' = (x - min)/(max - min)).
  - Rainfall deficit: min=100, max=300 → [0.5, 0.25, 1.0, 0.0, 0.75]
  - Groundwater depth: min=8, max=25 → [0.41, 0.12, 1.0, 0.0, 0.71]
  - Irrigation stress: min=30, max=70 → [0.75, 0.25, 1.0, 0.0, 0.875]
- Step 3: Average the three normalised scores for each district.
  - District 1: (0.5 + 0.41 + 0.75)/3 = 0.55
  - District 2: (0.25 + 0.12 + 0.25)/3 = 0.21
  - District 3: (1.0 + 1.0 + 1.0)/3 = 1.00
  - District 4: (0.0 + 0.0 + 0.0)/3 = 0.00
  - District 5: (0.75 + 0.71 + 0.875)/3 = 0.78
- Step 4: Rank districts by index: Dist 3 (1.00) > Dist 5 (0.78) > Dist 1 (0.55) > Dist 2 (0.21) > Dist 4 (0.00).
- Step 5: Validate. District 3 has highest deficit, deepest groundwater, lowest irrigation — correctly ranked highest stress. District 4 best on all — lowest stress.

REASONING: Min-max to 0–1 ensures each indicator contributes equally to the average (equal weighting). Direction alignment is critical — irrigation coverage must be inverted so that "high value = high stress" for all three. The index is interpretable: 0 = no stress, 1 = maximum observed stress.

ANSWER: Water Stress Index: Dist1=0.55, Dist2=0.21, Dist3=1.00, Dist4=0.00, Dist5=0.78. District 3 most stressed, District 4 least.

## WORKED_EXAMPLE_3
PROBLEM: You have district-level data for 20 districts in Karnataka: (1) Forest cover (%) — range 5–65, right-skewed; (2) Tribal population (%) — range 2–45, right-skewed; (3) Literacy rate (%) — range 55–92, roughly symmetric. You want to: (a) test correlation between forest cover and tribal % using Pearson, (b) create a "Forest-Tribal Interface Index" (composite), (c) map forest cover in a choropleth. Design the full preprocessing pipeline with decision justifications.

STEPS:
- Step 1: Assess distributions. Forest cover: skewness ~1.8 (many low, few high). Tribal %: skewness ~1.5. Literacy: skewness ~0.3 (symmetric).
- Step 2: Transformation for correlation (Pearson needs normality). Apply log10 to forest cover and tribal % (both >0). Literacy: no transform. Check post-transform skewness — should be < |0.5|.
- Step 3: Normalisation for correlation. Z-score all three transformed variables (mean 0, SD 1). Compute Pearson's r on z-scores for forest-tribal pair.
- Step 4: Normalisation for composite index. Min-max on transformed variables to 0–1. But: forest and tribal are "positive" for interface (high both = high interface), literacy is "negative" (high literacy = low interface?) — clarify concept. Assume index = (forest + tribal)/2, literacy separate. Min-max forest_log and tribal_log to 0–1, average.
- Step 5: Choropleth for forest cover. Use transformed (log) values for classification? No — map readers need original % values. Classify raw forest % using natural breaks (Jenks) to show real thresholds (e.g., <10%, 10–30%, 30–50%, >50%). Log transformation would distort policy-relevant thresholds.
- Step 6: Document pipeline in metadata table: Variable | Transform | Norm for Corr | Norm for Index | Map Classification.

REASONING: Different analytical purposes demand different preprocessing. Correlation needs normality → log + z-score. Composite index needs equal contribution → min-max on transformed. Mapping needs interpretable classes → raw data with natural breaks. This multi-purpose workflow is standard in geographical analysis.

ANSWER: Pipeline: (1) Log-transform forest & tribal; (2) Z-score all for Pearson correlation; (3) Min-max log-values for Forest-Tribal Index; (4) Raw forest % with natural breaks for choropleth. Literacy used only if added to index — min-max raw literacy (inverted if needed).

## COMPETENCY_QUESTION_1
QUESTION: A Class 12 student collects data on "Distance from nearest town (km)" for 50 villages in a district. The values range from 2 to 85 km, with strong right-skewness (most villages 2–15 km, a few remote ones 60–85 km). She wants to use this variable in a multiple regression predicting household income (also right-skewed). She asks: "Should I normalise distance using z-score, or transform it using log, or both? In what order?" Provide a complete answer with reasoning.

COMPETENCY: Statistical reasoning and method selection for geographical data preprocessing

STEPS:
- Step 1: Identify the core issue — regression assumes normality of residuals, not necessarily raw variables, but skewed predictors can cause leverage/influence problems.
- Step 2: Recognise that distance is strictly positive and right-skewed → log transformation is appropriate to reduce skewness and compress the long tail.
- Step 3: Recognise that after log transformation, the variable may still need scaling if combined with other predictors of different units → z-score normalisation (mean 0, SD 1) aids coefficient interpretation and numerical stability.
- Step 4: Order matters: TRANSFORM FIRST (log), THEN NORMALISE (z-score). Normalising raw skewed data does not fix skewness; transforming after normalising is mathematically messy (log of z-score can be negative → undefined).
- Step 5: Apply to income too: log-transform income (right-skewed), then z-score both for standardised regression coefficients.

ANSWER: Transform first (log10 distance, log10 income), then z-score normalise both. Order: raw → log → z-score. Never z-score then log (log of negative z-scores undefined). This satisfies regression assumptions: linearity, normality of residuals, no extreme leverage points.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The government wants to rank 30 districts on "Agricultural Resilience" using 5 indicators: (1) Crop diversity index (0–1, higher=better), (2) Irrigation coverage (%), (3) Fertiliser use (kg/ha), (4) Soil organic carbon (%), (5) Crop insurance penetration (%). Indicators 3 and 4 are right-skewed; 5 has many zeros. Propose a complete, defensible preprocessing and aggregation methodology. Justify every choice. Include how you would handle zeros in indicator 5 for log transformation.

COMPETENCY: Composite index construction with real-world data complexities

STEPS:
- Step 1: Direction alignment — all indicators must be "higher = more resilience". Fertiliser use: higher may indicate intensity, not resilience → invert or cap? Decide based on literature: moderate use = resilience, excessive = degradation. Use quadratic or cap at 90th percentile. For simplicity: assume higher fertiliser = more input access = resilience (keep).
- Step 2: Handle zeros in insurance penetration (indicator 5). Cannot log(0). Options: (a) add small constant (e.g., 0.1%) before log, (b) use log(x+1), (c) use square root (handles 0), (d) keep raw and use min-max. Best: square root (preserves 0, reduces skew) or log(x+1). Choose square root for interpretability.
- Step 3: Transform skewed indicators (3, 4): log10(fertiliser), log10(soil carbon). Indicator 5: sqrt(insurance). Indicators 1, 2: no transform (bounded 0–1, 0–100).
- Step 4: Normalise ALL transformed indicators to 0–1 using min-max (so index is 0–1). Why min-max not z-score? Index must be bounded and interpretable; z-score can give negative values.
- Step 5: Weighting. Equal weighting (1/5 each) is transparent but may not reflect importance. Use Analytic Hierarchy Process (AHP) or expert weights: e.g., crop diversity 0.25, irrigation 0.20, fertiliser 0.15, soil carbon 0.20, insurance 0.20. Justify: diversity and soil health are foundational.
- Step 6: Aggregate: Index = Σ (weight_i × norm_i). Validate with sensitivity analysis (vary weights ±10%).
- Step 7: Document all parameters (transform type, min/max, weights) for reproducibility.

ANSWER: Full pipeline: Align directions → Transform (log for 3,4; sqrt for 5) → Min-max normalise all to 0–1 → Apply expert weights → Weighted average → Sensitivity check. Zeros in insurance handled by sqrt (no constant needed). Min-max chosen over z-score for bounded index. Weights justified by agricultural science.

DIFFICULTY: hard