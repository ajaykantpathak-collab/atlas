## ELI5
In simple words: The Gender-related Development Index (GDI) adjusts the Human Development Index (HDI) for gender inequalities in the three basic dimensions of human development: health (life expectancy), education (literacy and enrolment), and command over resources (estimated earned income). Common mix-up: Students think GDI = (Female HDI + Male HDI)/2.

## DEFINITION
The Gender-related Development Index (GDI) adjusts the Human Development Index (HDI) for gender inequalities in the three basic dimensions of human development: health (life expectancy), education (literacy and enrolment), and command over resources (estimated earned income). The Gender Empowerment Measure (GEM) focuses on women's participation in economic and political decision-making through three indicators: share of seats in parliament held by women, share of female legislators/senior officials/managers and professional/technical workers, and gender disparity in estimated earned income. The Human Poverty Index (HPI) measures deprivation in human development using non-income indicators: probability of not surviving to age 40, adult illiteracy rate, percentage of population without access to clean water, and percentage of underweight children under five.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
Student can calculate GDI, GEM, and HPI from given data tables, interpret what each indicator reveals about gender equity and poverty that HDI alone cannot, and explain why a country might have high HDI but low GDI/GEM or high HPI.

## SCOPE_BOUNDARY
Covers GDI, GEM, and HPI as defined in UNDP Human Development Reports up to 2010 (pre-2010 methodology). Does NOT cover the 2010+ Gender Inequality Index (GII) or Multidimensional Poverty Index (MPI) which replaced GDI/GEM/HPI in later reports. Focuses on formula structure, interpretation, and comparative analysis with HDI using Indian and international examples.

## WALKTHROUGH
Imagine you're comparing two countries: Country A has HDI 0.85 and Country B has HDI 0.75. You might think Country A is clearly better. But what if in Country A, women live 5 years longer than men but earn 40% less, hold only 10% of parliamentary seats, and 30% of women are illiterate? Meanwhile Country B has near gender parity in all dimensions. Begin by recalling HDI's three dimensions from c12_geo_cbse_03_005. Then ask: "Does HDI tell us if development is equally shared between men and women?" No — it uses averages. That's why UNDP created GDI (gender-sensitive HDI) and GEM (women's empowerment). Next, consider HPI: a country with HDI 0.70 might still have 40% adults illiterate and 25% children underweight. HDI measures achievements; HPI measures shortfalls. The key principle: aggregate averages mask inequality — we need distribution-sensitive indicators.

## DIAGNOSTIC_QUESTION_1
What is the fundamental difference between what HDI measures and what HPI measures in terms of human development assessment?

## DIAGNOSTIC_ANSWER_1
HDI measures average achievements in three dimensions (health, education, income) on a 0–1 scale where higher is better. HPI measures deprivations/shortfalls in similar dimensions (probability of dying before 40, adult illiteracy, lack of clean water, underweight children) where higher values indicate worse poverty. A wrong answer reveals the student confuses "achievement indices" with "deprivation indices" and cannot distinguish between measuring what people HAVE vs. what they LACK.

## DIAGNOSTIC_QUESTION_2
A country has HDI = 0.720. Its female life expectancy = 72, male = 68. Female adult literacy = 65%, male = 80%. Female gross enrolment = 70%, male = 85%. Female estimated earned income = $4,200, male = $7,800. Without calculating exact GDI, explain whether GDI will be higher, lower, or equal to HDI and WHY.

## DIAGNOSTIC_ANSWER_2
GDI will be LOWER than HDI. GDI penalizes gender inequality by adjusting each dimension's index downward when female and male achievements differ. Here females lag in ALL three dimensions (lower life expectancy, literacy, enrolment, income). The penalty function reduces the dimension indices before averaging. A wrong answer (e.g., "GDI higher" or "equal") reveals the student thinks GDI simply averages male/female HDI or doesn't understand the inequality-aversion penalty in GDI's formula.

## DIAGNOSTIC_QUESTION_3
Country X: Female parliamentary seats = 12%, Female legislators/senior officials/managers = 8%, Female professional/technical workers = 35%, Gender income ratio (female/male earned income) = 0.45. Country Y: 32%, 28%, 48%, 0.72. Calculate GEM for both using the pre-2010 formula (equal weight 1/3 to each of three indices: political participation, economic participation, power over resources). Which country has higher GEM? Show steps.

## DIAGNOSTIC_ANSWER_3
**Country X:** Political index = 12/50 = 0.24 (max 50% seats). Economic index = (8+35)/2 / 50 = 21.5/50 = 0.43. Income index = 0.45. GEM_X = (0.24 + 0.43 + 0.45)/3 = 1.12/3 = 0.373.
**Country Y:** Political index = 32/50 = 0.64. Economic index = (28+48)/2 / 50 = 38/50 = 0.76. Income index = 0.72. GEM_Y = (0.64 + 0.76 + 0.72)/3 = 2.12/3 = 0.707.
**Country Y has higher GEM.** Wrong answer reveals: (a) using wrong denominator (e.g., 100 instead of 50 for political/economic indices), (b) not averaging the two economic sub-indices, (c) treating income ratio as percentage instead of decimal.

## DIAGNOSTIC_QUESTION_4
Compare the following two statements and identify which is correct and why:
Statement A: "GDI is simply the HDI calculated separately for women and men, then averaged."
Statement B: "GDI uses the same dimension indices as HDI but applies an inequality-aversion penalty (harmonic mean of male/female indices) before aggregation."

## DIAGNOSTIC_ANSWER_4
Statement B is correct. GDI computes dimension indices for males and females separately, then takes the harmonic mean (not arithmetic mean) of each pair to penalize inequality, then averages the three penalized dimension indices. Statement A describes a simple average which would NOT penalize disparity — a country with female index 0.9 and male 0.5 would get 0.7, same as 0.7/0.7, masking inequality. A wrong choice reveals the student doesn't understand the mathematical purpose of harmonic mean in inequality-sensitive indices.

## DIAGNOSTIC_QUESTION_5
Evaluate this claim: "A country with Very High HDI (>0.800) will always have low HPI (<10%) and high GEM (>0.700)." Provide a counterexample or logical reasoning using real-world patterns.

## DIAGNOSTIC_ANSWER_5
The claim is FALSE. HDI measures average achievement; HPI and GEM measure distribution. Counterexample: Some Gulf states (e.g., Qatar, UAE pre-2010) had Very High HDI (>0.85) due to high income but low GEM (<0.30) due to minimal female political representation and large gender income gaps. Similarly, countries with high HDI can have pockets of deprivation raising HPI (e.g., USA HDI ~0.92 but HPI-2 ~15% due to illiteracy/health gaps). Wrong evaluation reveals the student assumes perfect correlation between average achievement and equitable distribution — a classic ecological fallacy.

## DIAGNOSTIC_QUESTION_6
Design a 3-indicator "Gender-Equitable Development Index" (GEDI) for Indian states that combines: (1) gender gap in literacy, (2) gender gap in workforce participation, (3) sex ratio at birth. Define each indicator's formula (0–1 scale, 1 = perfect equality), weighting scheme, and aggregation method. Justify your choices in 2–3 sentences.

## DIAGNOSTIC_ANSWER_6
**Indicator 1 (Literacy Parity):** 1 - |Female_Lit - Male_Lit| / max(Male_Lit, Female_Lit). Range 0–1.
**Indicator 2 (Workforce Parity):** 1 - |Female_WFPR - Male_WFPR| / max(Male_WFPR, Female_WFPR). Range 0–1.
**Indicator 3 (Sex Ratio Parity):** (Observed_SRB / 952) capped at 1, where 952 = natural sex ratio at birth (females per 1000 males). Range 0–1.
**Weights:** 1/3 each (equal importance to education, economy, survival).
**Aggregation:** Geometric mean (penalizes imbalance across dimensions).
**Justification:** Geometric mean ensures a state cannot compensate for female infanticide (low Indicator 3) with high female literacy. Equal weights reflect constitutional commitment to equality across all domains. A poor answer uses arithmetic mean, ignores SRB, or weights income higher — revealing neglect of survival rights.

## COMMON_MISCONCEPTION
Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender, applies harmonic mean to each dimension pair (penalizing disparity), then averages the three penalized dimension indices. For example, if Female Health Index=0.9, Male=0.7, simple average=0.8 but harmonic mean=2/(1/0.9+1/0.7)=0.787 — lower due to inequality. This error leads to overestimating gender-equitable development in countries with large gaps.

## ON_FAILURE
1. Revisit c12_geo_cbse_03_005 (HDI calculation) — ensure you can compute dimension indices from raw data. 2. Study harmonic mean vs arithmetic mean: take pairs (0.9,0.7), (0.8,0.8), (0.6,0.9) — compute both means, observe how harmonic mean drops when values diverge. 3. Re-read NCERT box on GDI (p.18): "The GDI adjusts the HDI for gender inequality... it uses the same variables but computes them separately for men and women." 4. Practice: Given male/female life expectancy, literacy, income for a hypothetical country, compute HDI, then GDI step-by-step. 5. Re-diagnostic: Calculate GDI for Country: Female LE=75, Male=70; Female Lit=70%, Male=85%; Female Income=$5000, Male=$10000. Compare to HDI.

## PREREQUISITE_NODE_IDS
c12_geo_cbse_03_005, c12_geo_cbse_03_001, c12_geo_cbse_03_003, c11_soc_cbse_02_003, c10_civ_cbse_03_003, c12_geo_cbse_03_004, c12_geo_cbse_03_006

## PREREQUISITE_REASONS
c12_geo_cbse_03_005: HDI components and calculation method are the foundation — GDI/GEM/HPI modify or complement HDI's structure.
c12_geo_cbse_03_001: Concept of human development (enlarging choices) explains WHY gender-specific and poverty-specific indices are needed.
c12_geo_cbse_03_003: Equity pillar directly motivates GDI (gender equity) and HPI (focus on deprived).
c11_soc_cbse_02_003: Gender as a system of social stratification provides sociological basis for measuring gender inequality in development.
c10_civ_cbse_03_003: Women's political representation concept underpins GEM's parliamentary seats indicator.
c12_geo_cbse_03_004: GDI, GEM, HPI are capability-based extensions (gender-disaggregated capabilities, empowerment measures, poverty as capability deprivation).  
c12_geo_cbse_03_006: Other indices (GDI, GEM, HPI) refine or critique the basic HDI classification—e.g., GDI adjusts for gender gaps within tiers.  

## FORWARD_NODE_IDS
c12_geo_cbse_03_008, c12_geo_cbse_03_009, c12_geo_cbse_03_010
## FORWARD_REASONS
c12_geo_cbse_03_008: State-level HDI/GDI comparisons for India require understanding GDI methodology.
c12_geo_cbse_03_009: International comparisons use GDI, GEM, HPI alongside HDI to reveal distribution patterns.
c12_geo_cbse_03_010: SDGs (especially Goal 5 Gender Equality, Goal 1 No Poverty) directly reference GDI/GEM/HPI-type indicators.

## CROSS_SUBJECT_PREREQS
c11_hs_cbse_03_004, c11_hs_cbse_03_007, c11_psy_cbse_03_010, c11_soc_cbse_04_010, c11_soc_cbse_02_003
## CROSS_SUBJECT_REASONS
c11_hs_cbse_03_004: WHO health dimensions (physical, mental, social) underlie the health component (life expectancy) in all three indices.
c11_hs_cbse_03_007: RDA concept relates to HPI's underweight children indicator — both measure nutritional deprivation.
c11_psy_cbse_03_010: Adolescent identity development includes gender role formation — relevant to GEM's empowerment focus.
c11_soc_cbse_04_010: Gendered socialization explains WHY literacy/workforce gaps exist — the "why" behind GDI's measured disparities.
c11_soc_cbse_02_003: Gender stratification as a system of structured inequality provides the theoretical framework for GDI/GEM.

## CHAIN_DESCRIPTION
c12_geo_cbse_03_005 -> c12_geo_cbse_03_007 -> c12_geo_cbse_03_008 (HDI calculation enables GDI/GEM/HPI which enable state-level analysis in India)

## THIS_FORMULA
GDI = (1/3) × [I_health* + I_education* + I_income*] where each I* = harmonic mean of male/female dimension indices = 2 / (1/I_male + 1/I_female). GEM = (1/3) × [Political_Participation_Index + Economic_Participation_Index + Power_Over_Resources_Index]. HPI-1 (developing countries) = [P1^α + P2^α + P3^α]/3^(1/α) with α=3, where P1=% not surviving to 40, P2=adult illiteracy, P3=(% no clean water + % underweight children)/2.

## FORMULA_VARIABLES
I_health* = penalized health index (harmonic mean of male/female life expectancy indices); I_education* = penalized education index (harmonic mean of male/female literacy and enrolment indices); I_income* = penalized income index (harmonic mean of male/female estimated earned income indices); Political_Participation_Index = female parliamentary seats / 50; Economic_Participation_Index = average of (female legislators+senior officials+managers / 50) and (female professional+technical workers / 50); Power_Over_Resources_Index = female estimated earned income / male estimated earned income; P1 = probability at birth of not surviving to age 40 (%); P2 = adult illiteracy rate (%); P3 = average of population without sustainable access to improved water source (%) and underweight children under 5 (%).

## FORMULA_UNITS
All indices dimensionless (0–1). Life expectancy in years. Literacy/enrolment in percentages. Income in PPP US$. Parliamentary seats in %. HPI components in percentages. Final GDI/GEM/HPI values range 0–1 (or 0–100% for HPI).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_hs_cbse_03_004 | Health dimension in HDI/GDI/HPI uses life expectancy which reflects WHO's physical well-being component
c11_soc_cbse_02_003 | Gender stratification theory explains why GDI/GEM are needed — HDI averages mask structured gender inequality
c10_civ_cbse_03_003 | Political representation indicator in GEM directly draws from civics concept of women's reservation and participation
c11_soc_cbse_04_010 | Gendered socialization process creates the literacy and workforce gaps that GDI measures
## PREREQ_CONCEPT
HDI calculation methodology (dimension indices, goalposts, aggregation) from c12_geo_cbse_03_005 — GDI/GEM/HPI are structural modifications of HDI.

## PREREQ_BEFORE
Student must be able to compute HDI from raw data (life expectancy, literacy, enrolment, GDP per capita) using the pre-2010 formula with equal weights and goalposts.

## PREREQ_STUCK
If stuck on GDI penalty calculation, revisit harmonic mean vs arithmetic mean with numerical examples (e.g., pairs 0.8/0.8 vs 0.9/0.7) — this is the mathematical core of GDI's inequality aversion.

## WORKED_EXAMPLE_1
PROBLEM: Calculate GDI for a hypothetical country with the following 2005 data: Female life expectancy = 72 years, Male = 68 years; Female adult literacy = 68%, Male = 82%; Female gross enrolment = 65%, Male = 78%; Female estimated earned income (PPP $) = 3,500, Male = 8,200. Use pre-2010 goalposts: Life expectancy 25–85, Adult literacy 0–100%, Gross enrolment 0–100%, Income 100–40,000 PPP $.
STEPS:
- Step 1: Compute dimension indices for EACH gender separately using goalpost formula: Index = (Actual - Minimum) / (Maximum - Minimum). For Female Health: (72-25)/(85-25) = 47/60 = 0.7833. Male Health: (68-25)/60 = 43/60 = 0.7167.
- Step 2: Compute Female Education Index = (2/3 × Adult Literacy Index) + (1/3 × Gross Enrolment Index). Female Literacy Index = (68-0)/100 = 0.68. Female Enrolment Index = (65-0)/100 = 0.65. Female Education = (2/3×0.68) + (1/3×0.65) = 0.4533 + 0.2167 = 0.6700. Male Literacy Index = 0.82. Male Enrolment Index = 0.78. Male Education = (2/3×0.82) + (1/3×0.78) = 0.5467 + 0.2600 = 0.8067.
- Step 3: Compute Income Index using log formula: Index = (log(Actual) - log(Min)) / (log(Max) - log(Min)). Female Income Index = (log(3500) - log(100)) / (log(40000) - log(100)) = (3.544 - 2) / (4.602 - 2) = 1.544 / 2.602 = 0.5934. Male Income Index = (log(8200) - 2) / 2.602 = (3.914 - 2) / 2.602 = 1.914 / 2.602 = 0.7356.
- Step 4: Apply harmonic mean penalty for EACH dimension: Equally Distributed Index (EDI) = 2 / (1/I_female + 1/I_male). Health EDI = 2 / (1/0.7833 + 1/0.7167) = 2 / (1.2767 + 1.3953) = 2 / 2.672 = 0.7485. Education EDI = 2 / (1/0.6700 + 1/0.8067) = 2 / (1.4925 + 1.2396) = 2 / 2.7321 = 0.7319. Income EDI = 2 / (1/0.5934 + 1/0.7356) = 2 / (1.6852 + 1.3594) = 2 / 3.0446 = 0.6569.
- Step 5: GDI = (1/3) × (Health EDI + Education EDI + Income EDI) = (1/3) × (0.7485 + 0.7319 + 0.6569) = (1/3) × 2.1373 = 0.7124.
REASONING: GDI reveals gender disparity by penalizing each dimension where male/female achievements differ. The harmonic mean ensures that a large gap (e.g., income 0.59 vs 0.74) reduces the dimension index more than a small gap (health 0.78 vs 0.72). This captures the equity principle from c12_geo_cbse_03_003.
ANSWER: GDI = 0.712. For comparison, HDI (using average achievements) would be: Avg Health = (0.7833+0.7167)/2 = 0.7500; Avg Education = (0.6700+0.8067)/2 = 0.7383; Avg Income = (0.5934+0.7356)/2 = 0.6645; HDI = (0.7500+0.7383+0.6645)/3 = 0.7176. GDI (0.712) < HDI (0.718) due to gender inequality.

## WORKED_EXAMPLE_2
PROBLEM: Calculate GEM for Indian state "State A" using 2001 Census and NSSO data: Women in State Legislative Assembly = 8 out of 120 seats; Female legislators/senior officials/managers = 6.2%; Female professional/technical workers = 28.5%; Female estimated earned income (PPP) = $1,850; Male = $4,200.
STEPS:
- Step 1: Political Participation Index = (Female seats / Total seats) / 0.50 = (8/120) / 0.50 = 0.0667 / 0.50 = 0.1333. (Denominator 0.50 = 50% parity benchmark).
- Step 2: Economic Participation Index has two sub-indices averaged: (a) Female legislators/senior officials/managers index = 6.2% / 50% = 0.124. (b) Female professional/technical workers index = 28.5% / 50% = 0.570. Economic Index = (0.124 + 0.570) / 2 = 0.347.
- Step 3: Power Over Resources Index = Female income / Male income = 1850 / 4200 = 0.4405.
- Step 4: GEM = (1/3) × (Political + Economic + Power) = (1/3) × (0.1333 + 0.347 + 0.4405) = (1/3) × 0.9208 = 0.3069.
- Step 5: Interpret: GEM = 0.307 indicates low women's empowerment. Political participation (0.133) is the weakest dimension — only 6.7% seats vs 50% benchmark. Economic participation (0.347) is dragged down by very low managerial representation (6.2%). Income parity (0.44) is moderate but reflects large wage gap.
REASONING: GEM focuses on AGENCY (participation in decision-making) not just well-being. The 50% benchmark for political/economic indices reflects the equity principle — parity is the norm. The income ratio captures command over resources. This differs from GDI which measures CAPABILITIES (health, education, income levels).
ANSWER: GEM = 0.307. This low value suggests State A has significant gender gaps in political and economic leadership despite moderate income parity.

## WORKED_EXAMPLE_3
PROBLEM: Compare HPI-1 for two Indian states using 2005 data:
State P: % not surviving to 40 = 18.2%; Adult illiteracy = 32.5%; % without clean water = 22.0%; % underweight children <5 = 41.0%.
State Q: % not surviving to 40 = 8.5%; Adult illiteracy = 15.0%; % without clean water = 12.0%; % underweight children <5 = 28.0%.
Calculate HPI-1 for both (α=3). Then explain why State P might have higher HDI than State Q but also higher HPI.
STEPS:
- Step 1: Compute P3 (deprivation in standard of living) = (% no clean water + % underweight children) / 2. State P: P3 = (22.0 + 41.0)/2 = 31.5%. State Q: P3 = (12.0 + 28.0)/2 = 20.0%.
- Step 2: HPI-1 formula: [ (P1^3 + P2^3 + P3^3) / 3 ]^(1/3). State P: P1=18.2, P2=32.5, P3=31.5. Cubes: 18.2³=6028.6, 32.5³=34328.1, 31.5³=31255.9. Sum = 71612.6. /3 = 23870.9. Cube root = 28.79%. State Q: P1=8.5, P2=15.0, P3=20.0. Cubes: 8.5³=614.1, 15.0³=3375, 20.0³=8000. Sum = 11989.1. /3 = 3996.4. Cube root = 15.86%.
- Step 3: HPI-1: State P = 28.8%, State Q = 15.9%. State P has nearly double the human poverty.
- Step 4: Why might State P have higher HDI? HDI uses AVERAGE achievements. If State P has a small wealthy elite with very high life expectancy, literacy, and income, they pull up the averages. But HPI captures the MASS deprivation. Example: State P = Gujarat (high growth, high inequality); State Q = Kerala (lower per capita but equitable). HDI_Gujarat > HDI_Kerala in some years, but HPI_Gujarat > HPI_Kerala always.
- Step 5: The α=3 parameter makes HPI sensitive to the WORST deprivation — a single very high component (e.g., 41% underweight) disproportionately raises HPI. This reflects the "priority to the worst-off" ethical stance.
REASONING: HDI and HPI can rank countries/states differently because HDI is mean-sensitive (insensitive to distribution) while HPI is distribution-sensitive (weights deprivation heavily). This is the core insight from Sen's capability approach — development is about expanding freedoms for ALL, not just raising averages.
ANSWER: HPI-1: State P = 28.8%, State Q = 15.9%. State P has higher human poverty despite potentially higher HDI due to concentration of deprivation among the poor.

## COMPETENCY_QUESTION_1
QUESTION: The 2005 Human Development Report shows Country A (HDI 0.785, GDI 0.762, GEM 0.412) and Country B (HDI 0.712, GDI 0.705, GEM 0.587). A policymaker argues: "Country A is more developed and therefore better for women." Critique this statement using all three indices. What specific policy priorities would you recommend for each country?
COMPETENCY: Understanding composite indices and their policy implications
STEPS:
- Step 1: Compare HDI vs GDI gap. Country A: HDI-GDI = 0.023 (large gap = high gender inequality). Country B: HDI-GDI = 0.007 (small gap = low gender inequality). Country A's development is less equally shared.
- Step 2: Analyze GEM. Country A GEM=0.412 (low empowerment — women excluded from decision-making). Country B GEM=0.587 (moderate empowerment — women have meaningful political/economic voice).
- Step 3: Synthesize. Country A has higher average achievement (HDI) but women are disproportionately deprived (low GDI) and disempowered (low GEM). Country B has lower average achievement but more gender-equitable development and higher women's agency.
- Step 4: Policy recommendations. Country A: Targeted gender budgeting, reservation in legislatures, equal pay enforcement, girls' education incentives. Country B: Sustain equity while raising overall HDI — invest in health/education quality for all, close remaining income gap.
ANSWER: The policymaker's claim is flawed. HDI alone is insufficient; Country A's development bypasses women. Country B offers better gender justice despite lower HDI. Policies must target the specific gaps: Country A needs gender-mainstreaming; Country B needs overall human development acceleration with equity preservation.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A research team proposes a "Modified GDI" (MGDI) for India that replaces the income component with "Gender Gap in Control Over Household Resources" measured by: (a) % women owning land/house in own name, (b) % women with bank accounts, (c) % women participating in major household financial decisions. They argue this better captures Amartya Sen's "capability approach" than estimated earned income. Evaluate this proposal. Design the MGDI income-substitute index (0–1 scale) and explain how it would change GDI rankings for Indian states compared to the standard GDI.
COMPETENCY: Applying capability approach to index design and critiquing measurement validity
STEPS:
- Step 1: Assess validity. Sen's capability approach emphasizes substantive freedoms — "control over resources" is a direct capability, while "estimated earned income" is a proxy with flaws (misses unpaid work, household bargaining power). The proposal is theoretically stronger.
- Step 2: Design index. Normalize each indicator to 0–1 (higher = better). Land/house ownership: % women owners (already 0–100). Bank account: % women with accounts. Financial decisions: % women participating. Aggregate: Geometric mean of the three (penalizes zero in any dimension) = (I_land × I_bank × I_decisions)^(1/3). This becomes the "Resource Control Index" (RCI) replacing income index in GDI.
- Step 3: Compute female/male RCI separately (male data needed for harmonic mean penalty). Apply harmonic mean to get EDI_resource. Then MGDI = (1/3) × (Health_EDI + Education_EDI + Resource_EDI).
- Step 4: Predict ranking changes. States with high female employment but low asset ownership (e.g., Tamil Nadu — high female workforce but low land rights) would see MGDI < GDI. States with matrilineal traditions (Meghalaya, Kerala — high female asset control) would see MGDI > GDI. States with high male outmigration (Uttarakhand, Himachal — women de facto household heads) might show higher female RCI than income suggests.
- Step 5: Limitation. Male RCI data rarely collected — would need new surveys. Also, bank account ownership ≠ control (accounts may be operated by men).
ANSWER: The proposal is conceptually superior per Sen's capability approach but faces data challenges. MGDI would re-rank Indian states: matrilineal/outmigration states rise; high-female-employment-but-patriarchal-asset states fall. This reveals hidden gender inequalities in resource control that income-based GDI misses.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Gender-related Development Index (GDI) adjusts the Human Development Index (HDI) for gender ______ in the three basic dimensions of human development: health (life expectancy), education (literacy and enrolment), and command over resources (estimated earned income).

## DIAGNOSTIC_ANSWER_7
inequalities

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you're comparing two ______: Country A has HDI 0.85 and Country B has HDI 0.75.

## DIAGNOSTIC_ANSWER_8
countries

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The Human Poverty Index (HPI) measures deprivation in human development using non-income indicators: probability of not surviving to age ______, adult illiteracy rate, percentage of population without access to clean water, and percentage of underweight children under five.

## DIAGNOSTIC_ANSWER_9
40

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Student can calculate GDI, GEM, and HPI from given data tables, interpret what each indicator reveals about gender equity and poverty that HDI alone cannot, and explain why a country might have high HDI but low GDI/GEM or high HPI.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine you're ______ two countries: Country A has HDI 0.85 and Country B has HDI 0.75.

## DIAGNOSTIC_ANSWER_11
comparing
