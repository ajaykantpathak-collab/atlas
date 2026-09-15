"""Ask Fable to generate the COMPLETE physics formula knowledge base as YAML.
Covers class 6 to PhD level. Output saved to formulas/physics/ directory.
"""
import urllib.request, json, ssl, os, time

KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

prompt = """\
Generate a COMPLETE physics formula knowledge base as YAML for a K-12 to PhD learning platform.

This is NOT code. This is DATA. Every formula is a YAML entry.

# SCOPE: Class 6 to PhD level physics

Cover EVERY physics subdomain:
1. Mechanics (kinematics, dynamics, work-energy, momentum, collisions, rotational, fluid statics, fluid dynamics)
2. Gravitation (Newtonian, orbital, Kepler, tidal, gravitational potential)
3. Oscillations & Waves (SHM, damped, forced, resonance, wave equation, sound, Doppler, standing waves, beats, interference)
4. Thermodynamics (zeroth/first/second/third laws, Carnot, entropy, statistical mechanics, Maxwell relations, kinetic theory, heat transfer)
5. Electromagnetism (electrostatics, Gauss law, capacitance, dielectrics, current electricity, Kirchhoff, magnetism, Biot-Savart, Ampere, Faraday, Lenz, inductance, AC circuits, Maxwell equations, EM waves)
6. Optics (geometric: reflection, refraction, lenses, mirrors, prisms, optical instruments; wave: interference, diffraction, polarization, coherence, holography)
7. Modern Physics (photoelectric, Compton, de Broglie, Heisenberg uncertainty, Bohr model, atomic spectra, nuclear physics, radioactivity, fission, fusion, particle physics, Standard Model basics)
8. Quantum Mechanics (Schrodinger equation, operators, eigenvalues, harmonic oscillator, hydrogen atom, angular momentum, spin, perturbation theory, scattering basics)
9. Solid State / Condensed Matter (crystal structure, Bragg, band theory, semiconductors, superconductivity basics, phonons, Debye model)
10. Astrophysics / Cosmology (Stefan-Boltzmann, Hubble law, Friedmann equations basics, stellar structure basics, Chandrasekhar limit, blackbody radiation)
11. Relativity (special: Lorentz, time dilation, length contraction, relativistic momentum/energy, E=mc²; general: basics of curved spacetime, Schwarzschild radius)
12. Mathematical methods in physics (vectors, tensors, gradient/divergence/curl, line/surface integrals, Fourier series, Laplace transforms — as physics formulas not pure math)

# YAML SCHEMA (use EXACTLY this format for each formula)

```yaml
- formula_id: "PHY_<SUBDOMAIN>_<NNN>"
  name: "Human readable name"
  latex: "LaTeX expression"
  variables:
    - symbol: "v"
      name: "final_velocity"
      unit: "m/s"
      dimensional_formula: "L*T^-1"
      quantity_type: "velocity"
    - symbol: "u"
      name: "initial_velocity"
      unit: "m/s"
      dimensional_formula: "L*T^-1"
      quantity_type: "velocity"
  preconditions:
    - "constant_acceleration"
  constraints_required: []
  constraints_forbidden: []
  solve_order_priority: 1
  grade_range:
    - "class9"
    - "class10"
    - "class11"
    - "class12"
    - "jee_main"
    - "jee_advanced"
  chapter: "Motion in a Straight Line"
  subject: "physics"
  concept_tags: ["PHY_KIN", "PHY_KIN_LIN"]
  related_formulas: ["PHY_KIN_002", "PHY_KIN_003"]
```

# RULES
1. Output ONLY valid YAML. No markdown fences, no commentary.
2. Start with `---` and then a list of formula entries (each starting with `- formula_id:`)
3. Use sequential IDs: PHY_KIN_001, PHY_KIN_002, ... PHY_GRAV_001, PHY_GRAV_002, etc.
4. EVERY variable must have: symbol, name, unit, dimensional_formula, quantity_type
5. dimensional_formula uses M, L, T, I, Θ, N, J notation (e.g. "M*L*T^-2" for force)
6. Include ALL standard constants (g, G, k, c, h, h-bar, epsilon_0, mu_0, e, m_e, m_p, etc.) as formula entries or reference them
7. Cover CBSE + CISCE + JEE + NEET + undergraduate + graduate + PhD level
8. For PhD-level formulas (quantum, relativity, condensed matter), include them with grade_range including "undergraduate", "graduate", "phd"
9. Be EXHAUSTIVE. Do not skip formulas. If a formula exists in a physics textbook, include it.
10. Include derived formulas, not just fundamental ones (e.g. range of projectile, terminal velocity, escape velocity)

Generate as many formulas as you can. Target: 300+ physics formulas.
"""

print(f"Physics formula KB generation")
print(f"Prompt size: {len(prompt)} chars")
print(f"Sending to {URL} model={MODEL}...")

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 64000,
    "system": "You are a physics expert generating a comprehensive formula knowledge base as YAML. Output ONLY valid YAML. No markdown, no commentary, no code fences. Start with --- and then a YAML list.",
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

        # Strip markdown fences if present
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

        # Count formulas
        formula_count = text.count("formula_id:")

        print(f"\nResponse in {elapsed:.1f}s")
        print(f"Input tokens: {usage.get('input_tokens', '?')}")
        print(f"Output tokens: {usage.get('output_tokens', '?')}")
        print(f"Formulas generated: {formula_count}")
        print("=" * 70)

        # Save
        out_dir = r"D:\platform\backend\formulas\physics"
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "physics_formulas.yaml")
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
