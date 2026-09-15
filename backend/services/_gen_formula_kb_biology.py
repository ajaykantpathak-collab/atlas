"""Ask Fable to generate the COMPLETE biology formula + model knowledge base as YAML.
Covers class 6 to PhD level. Output saved to formulas/biology/ directory.
"""
import urllib.request, json, ssl, os, time

KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

prompt = """\
Generate a COMPLETE biology formula + model knowledge base as YAML for a K-12 to PhD learning platform.

This is NOT code. This is DATA. Every entry is a YAML item.

# SCOPE: Class 6 to PhD level biology

Biology is less formula-heavy than physics/chemistry, but has MANY quantitative models, laws, and computational formulas.

Cover EVERY biology subdomain:

## Genetics & Heredity
1. Mendelian ratios (monohybrid 3:1, dihybrid 9:3:3:1, testcross 1:1, etc.)
2. Hardy-Weinberg equilibrium (p² + 2pq + q² = 1, allele frequency formulas)
3. Punnett square probability formulas
4. Pedigree analysis rules (autosomal dominant/recessive, X-linked, Y-linked probability)
5. Linkage and recombination frequency (map distance = recombination %)
6. Chi-square test for genetic ratios
7. Population genetics: Wright's F-statistics, inbreeding coefficient, gene flow formulas

## Physiology — Human
8. Cardiac output = stroke volume × heart rate
9. Blood pressure formulas (mean arterial pressure, pulse pressure)
10. Respiratory: tidal volume, vital capacity, FEV1/FVC ratio, alveolar gas equation
11. Renal: clearance formulas (creatinine clearance, GFR, filtration fraction), Fick principle
12. Nervous system: Nernst equation for membrane potential, Goldman equation, action potential thresholds
13. Endocrine: hormone concentration, receptor binding (Kd, Bmax), Hill equation
14. Digestive: basal metabolic rate (Harris-Benedict), BMI, body surface area
15. Blood: hematocrit, RBC count formulas, oxygen content, oxygen-hemoglobin dissociation

## Physiology — Plant
16. Photosynthesis: light reaction efficiency, Calvin cycle carbon fixation rate
17. Transpiration: transpiration rate, guttation, water potential (ψ = ψs + ψp)
18. Transport: pressure flow hypothesis, apoplast/symplast flow rates
19. Growth: relative growth rate, absolute growth rate, growth curves (logistic, exponential)

## Ecology & Environment
20. Population growth: exponential (dN/dt = rN), logistic (K-carrying capacity), Lotka-Volterra predator-prey
21. Species diversity: Shannon index, Simpson index, evenness
22. Energy flow: 10% law (Lindemann), ecological efficiency, trophic transfer
23. Biomass and productivity: GPP, NPP, R = GPP - NPP
24. Biogeochemical cycles: carbon cycle flux, nitrogen fixation rates

## Cell Biology
25. Cell cycle duration formulas, mitotic index
26. Osmosis: water potential, osmotic pressure (π = MRT)
27. Surface area to volume ratio (cell size constraints)
28. Diffusion: Fick's law (rate = k×A×ΔC/d)
29. Enzyme kinetics: Michaelis-Menten (v = Vmax×[S]/(Km+[S])), Lineweaver-Burk, competitive/non-competitive inhibition

## Molecular Biology
30. DNA: melting temperature (Tm), GC content formulas, annealing temperature
31. PCR: efficiency formulas, cycle number vs product
32. Protein: molecular weight from amino acid count, extinction coefficient
33. Central dogma: transcription rate, translation rate, codon usage bias
34. Gene expression: fold change, RPKM/FPKM normalization, qPCR ΔΔCt method

## Evolution
35. Fitness: relative fitness, selection coefficient (s = 1 - w)
36. Rate of evolution: Haldane's formula (darwin = ln(change)/time)
37. Molecular clock: divergence time = genetic distance / rate
38. Effective population size (Ne) formulas

## Biostatistics & Epidemiology
39. Incidence, prevalence, mortality rate formulas
40. Relative risk, odds ratio, attributable risk
41. Sensitivity, specificity, positive/negative predictive value
42. Kaplan-Meier survival, hazard function

## Advanced / PhD level
43. Bioinformatics: BLAST E-value, sequence alignment scoring, phylogenetic distance (Jukes-Cantor, Kimura)
44. Systems biology: rate equations for gene regulatory networks, feedback loop stability
45. Pharmacokinetics: one-compartment model (C = Dose/V × e^(-kt)), half-life, AUC, bioavailability
46. Pharmacodynamics: Emax model, sigmoid Emax (Hill equation), isobologram
47. Population dynamics advanced: R0 (basic reproduction number), SIR model equations
48. Quantitative genetics: heritability (h²), response to selection (R = h²×S), breeder's equation
49. Ecological modeling: Lotka-Volterra generalized, metapopulation (Levins model)
50. Biophysics: membrane potential, ion channel conductance, Boltzmann distribution in biology

# TWO YAML FORMATS

## Format 1: Formula entries
```yaml
- formula_id: "BIO_<SUBDOMAIN>_<NNN>"
  name: "Hardy-Weinberg equilibrium"
  latex: "p^2 + 2pq + q^2 = 1"
  variables:
    - symbol: "p"
      name: "dominant_allele_frequency"
      unit: ""
      dimensional_formula: ""
      quantity_type: "frequency"
    - symbol: "q"
      name: "recessive_allele_frequency"
      unit: ""
      dimensional_formula: ""
      quantity_type: "frequency"
  preconditions: ["random_mating", "no_selection", "no_mutation", "no_migration", "large_population"]
  grade_range: ["class12", "neet", "undergraduate", "graduate"]
  chapter: "Evolution"
  subject: "biology"
  concept_tags: ["BIO_GEN", "BIO_POP_GEN"]
```

## Format 2: Model entries (for conceptual/ecological models)
```yaml
- model_id: "BIO_MODEL_<NNN>"
  name: "SIR Epidemiological Model"
  equations:
    - "dS/dt = -beta*S*I"
    - "dI/dt = beta*S*I - gamma*I"
    - "dR/dt = gamma*I"
  variables:
    - symbol: "S"
      name: "susceptible"
    - symbol: "I"
      name: "infected"
    - symbol: "R"
      name: "recovered"
    - symbol: "beta"
      name: "transmission_rate"
    - symbol: "gamma"
      name: "recovery_rate"
  preconditions: ["closed_population", "homogeneous_mixing"]
  grade_range: ["undergraduate", "graduate", "phd"]
  chapter: "Epidemiology"
  subject: "biology"
  concept_tags: ["BIO_EPI", "BIO_MODEL"]
```

# RULES
1. Output ONLY valid YAML. No markdown fences, no commentary.
2. Start with `---` and then a YAML list.
3. Use sequential IDs: BIO_GEN_001, BIO_PHYSIO_001, BIO_MODEL_001, etc.
4. Biology formulas are mostly dimensionless or use biological units — use unit: "" where appropriate.
5. Be EXHAUSTIVE. Cover CBSE + CISCE + NEET + undergraduate + graduate + PhD.
6. Include ALL quantitative models, even conceptual ones with equations.
7. Target: 200+ formula entries + 50+ model entries.
"""

print(f"Biology formula + model KB generation")
print(f"Prompt size: {len(prompt)} chars")
print(f"Sending to {URL} model={MODEL}...")

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 64000,
    "system": "You are a biology expert generating a comprehensive formula + model knowledge base as YAML. Output ONLY valid YAML. No markdown, no commentary, no code fences. Start with --- and then a YAML list.",
    "messages": [{"role": "user", "content": prompt}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

t0 = time.time()
try:
    with urllib.request.urlopen(req, timeout=600, context=ctx) as resp:
        raw = resp.read().decode("utf-8")
        data = json.loads(raw)
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text += block.get("text", "")
        usage = data.get("usage", {})
        elapsed = time.time() - t0

        if "```" in text:
            lines = text.split("\n")
            in_fence = False
            cleaned = []
            for line in lines:
                if line.strip().startswith("```"):
                    in_fence = not in_fence
                    continue
                if not in_fence:
                    cleaned.append(line)
            text = "\n".join(cleaned)

        formula_count = text.count("formula_id:")
        model_count = text.count("model_id:")

        print(f"\nResponse in {elapsed:.1f}s")
        print(f"Input tokens: {usage.get('input_tokens', '?')}")
        print(f"Output tokens: {usage.get('output_tokens', '?')}")
        print(f"Formulas: {formula_count} | Models: {model_count}")
        print("=" * 70)

        out_dir = r"D:\platform\backend\formulas\biology"
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "biology_formulas.yaml")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Saved to: {out_path}")
        print(f"File size: {os.path.getsize(out_path)} bytes")

except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.reason}")
    print(e.read().decode("utf-8")[:2000])
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
