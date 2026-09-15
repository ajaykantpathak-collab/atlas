"""Ask Fable to generate the COMPLETE chemistry formula + reaction knowledge base as YAML.
Covers class 6 to PhD level. Output saved to formulas/chemistry/ directory.
"""
import urllib.request, json, ssl, os, time

KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

prompt = """\
Generate a COMPLETE chemistry formula + reaction knowledge base as YAML for a K-12 to PhD learning platform.

This is NOT code. This is DATA. Every entry is a YAML item.

# SCOPE: Class 6 to PhD level chemistry

Cover EVERY chemistry subdomain:

## Physical Chemistry
1. Mole concept, stoichiometry, limiting reagent, percent yield
2. Atomic structure (Bohr model, quantum numbers, electron configuration, orbital energies)
3. Chemical bonding (Lewis, VSEPR, hybridization, MO theory, bond order, bond energy, polarity)
4. Thermodynamics (enthalpy, entropy, Gibbs free energy, Hess law, Born-Haber cycle, calorimetry)
5. Chemical equilibrium (Kc, Kp, Le Chatelier, ICE tables, solubility product, common ion effect)
6. Acids and bases (pH, pOH, Kw, buffer Henderson-Hasselbalch, titration curves, hydrolysis)
7. Electrochemistry (Nernst, Faraday laws, galvanic cells, electrolysis, conductivity, EMF series)
8. Chemical kinetics (rate laws, integrated rate laws, Arrhenius, half-life, collision theory, catalysis)
9. Solutions (Raoult law, Henry law, colligative properties, van't Hoff factor, molality, molarity)
10. Surface chemistry (adsorption isotherms: Langmuir, Freundlich, catalysis, colloids)

## Inorganic Chemistry
11. Periodic table trends (atomic radius, ionization energy, electron affinity, electronegativity)
12. s-block, p-block, d-block, f-block chemistry (key reactions, properties, anomalous behavior)
13. Coordination compounds (crystal field theory, CFT splitting, CFSE, magnetic properties, nomenclature)
14. Metallurgy (extraction principles, Ellingham diagram, froth flotation, refining)
15. Qualitative analysis (salt analysis schemes, cation/anion identification reactions)

## Organic Chemistry
16. IUPAC nomenclature rules
17. Isomerism (structural, stereoisomerism, optical, geometrical, conformational)
18. Reaction mechanisms: SN1, SN2, E1, E2, electrophilic addition, electrophilic substitution, nucleophilic addition, free radical
19. Named reactions: Friedel-Crafts, Grignard, Aldol, Cannizzaro, Wurtz, Kolbe, Reimer-Tiemann, Hofmann, Diels-Alder, etc.
20. Functional group transformations (alcohol → aldehyde → carboxylic acid, etc.)
21. Biomolecules (carbohydrates, proteins, amino acids, nucleic acids, lipids)
22. Polymer chemistry basics
23. Reaction prediction: given reactants + conditions → predict product

## Analytical / Advanced
24. Spectroscopy basics (UV-Vis, IR, NMR chemical shifts, mass spec fragmentation patterns)
25. Chromatography basics (Rf value, HPLC, GC principles)
26. Quantum chemistry (Schrodinger for H atom, molecular orbital energies, selection rules)
27. Statistical thermodynamics (partition function, Boltzmann distribution)
28. Electrode potentials and Pourbaix diagrams
29. Solid state chemistry (crystal systems, Bravais lattices, defects, Born-Lande equation)

# TWO YAML FORMATS

## Format 1: Formula entries (same as physics)
```yaml
- formula_id: "CHM_<SUBDOMAIN>_<NNN>"
  name: "Henderson-Hasselbalch equation"
  latex: "pH = pK_a + \\log\\frac{[A^-]}{[HA]}"
  variables:
    - symbol: "pH"
      name: "pH"
      unit: ""
      dimensional_formula: ""
      quantity_type: "dimensionless"
    - symbol: "pKa"
      name: "acid_dissociation_constant_log"
      unit: ""
      dimensional_formula: ""
      quantity_type: "dimensionless"
  preconditions: ["buffer_solution", "weak_acid"]
  grade_range: ["class11", "class12", "jee_main", "jee_advanced", "neet"]
  chapter: "Equilibrium"
  subject: "chemistry"
  concept_tags: ["CHM_EQM", "CHM_BUF"]
```

## Format 2: Reaction entries (for organic/inorganic reactions)
```yaml
- reaction_id: "CHM_RXN_<NNN>"
  name: "Friedel-Crafts alkylation"
  reactants: ["C6H6", "R-Cl", "AlCl3"]
  products: ["C6H5-R", "HCl"]
  conditions: "anhydrous AlCl3, reflux"
  mechanism: "electrophilic_aromatic_substitution"
  grade_range: ["class11", "class12", "jee_main", "jee_advanced"]
  chapter: "Organic Chemistry - Hydrocarbons"
  subject: "chemistry"
  concept_tags: ["CHM_ORG", "CHM_NAMED_RXN"]
  notes: "Rearrangement possible with primary carbocations"
```

# RULES
1. Output ONLY valid YAML. No markdown fences, no commentary.
2. Start with `---` and then a YAML list.
3. Use sequential IDs: CHM_STOICH_001, CHM_ATM_001, CHM_RXN_001, etc.
4. Include ALL standard constants (Avogadro number, R gas constant, Faraday constant, etc.)
5. Be EXHAUSTIVE. Cover CBSE + CISCE + JEE + NEET + undergraduate + graduate + PhD.
6. For organic chemistry, include BOTH formulas (where they exist) AND reaction entries.
7. Include periodic table trend formulas, not just raw data.
8. Target: 300+ formula entries + 200+ reaction entries.
"""

print(f"Chemistry formula + reaction KB generation")
print(f"Prompt size: {len(prompt)} chars")
print(f"Sending to {URL} model={MODEL}...")

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 64000,
    "system": "You are a chemistry expert generating a comprehensive formula + reaction knowledge base as YAML. Output ONLY valid YAML. No markdown, no commentary, no code fences. Start with --- and then a YAML list.",
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
        reaction_count = text.count("reaction_id:")

        print(f"\nResponse in {elapsed:.1f}s")
        print(f"Input tokens: {usage.get('input_tokens', '?')}")
        print(f"Output tokens: {usage.get('output_tokens', '?')}")
        print(f"Formulas: {formula_count} | Reactions: {reaction_count}")
        print("=" * 70)

        out_dir = r"D:\platform\backend\formulas\chemistry"
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "chemistry_formulas.yaml")
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
