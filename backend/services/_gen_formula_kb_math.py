"""Ask Fable to generate the COMPLETE mathematics formula knowledge base as YAML.
Covers class 6 to PhD level. Output saved to formulas/mathematics/ directory.
"""
import urllib.request, json, ssl, os, time

KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

prompt = """\
Generate a COMPLETE mathematics formula knowledge base as YAML for a K-12 to PhD learning platform.

This is NOT code. This is DATA. Every formula is a YAML entry.

# SCOPE: Class 6 to PhD level mathematics

Cover EVERY math subdomain:

## Arithmetic & Number Theory
1. Basic operations, fractions, decimals, percentages, ratio, proportion
2. Number theory: divisibility, HCF, LCM, modular arithmetic, Fermat's little theorem, Euler's theorem, Chinese remainder
3. Prime numbers, factorization, Diophantine equations

## Algebra
4. Linear equations, quadratic equations, cubic, quartic formulas
5. Polynomials: roots, Vieta's formulas, factor theorem, remainder theorem
6. Sequences and series: AP, GP, HP, arithmetic-geometric, telescoping, summation formulas
7. Binomial theorem, multinomial theorem
8. Permutations, combinations, pigeonhole principle
9. Complex numbers: polar form, De Moivre, roots, Euler formula
10. Matrices and determinants: operations, inverse, rank, Cramer's rule, eigenvalues, eigenvectors, Cayley-Hamilton
11. Vectors: dot product, cross product, scalar triple product, vector triple product, projection
12. Inequalities: AM-GM, Cauchy-Schwarz, triangle inequality, Jensen's inequality

## Calculus (single and multivariable)
13. Limits: standard limits, L'Hopital, squeeze theorem, epsilon-delta
14. Differentiation: power rule, product rule, quotient rule, chain rule, implicit, parametric, logarithmic
15. Standard derivatives: trig, inverse trig, exponential, logarithmic, hyperbolic
16. Applications of derivatives: maxima, minima, inflection, tangent/normal, rate, monotonicity, Rolle, Lagrange MVT, Taylor, Maclaurin
17. Integration: standard integrals, substitution, by parts, partial fractions, trigonometric substitution
18. Definite integrals: properties, Wallis formula, reduction formulas, Leibniz rule
19. Applications of integrals: area, volume, arc length, surface area, centroid, moment of inertia
20. Differential equations: variable separable, homogeneous, linear first order, Bernoulli, exact, second order linear, Euler-Cauchy
21. Partial derivatives, gradient, directional derivative, Jacobian, Hessian
22. Multiple integrals: double, triple, change of variables, polar, cylindrical, spherical
23. Vector calculus: line integrals, surface integrals, Green's theorem, Stokes' theorem, divergence theorem
24. Laplace transforms and inverse (standard pairs, properties, ODE solving)
25. Fourier series (standard formulas, half-range, Parseval's)

## Geometry & Trigonometry
26. Triangles: area formulas (Heron, sine rule, cosine rule), Pythagoras, angle bisector, median
27. Circles: area, circumference, arc, sector, segment, tangent properties, power of a point
28. Coordinate geometry: distance, section formula, slope, line equations, angle between lines
29. Conic sections: parabola, ellipse, hyperbola (standard forms, tangent, normal, asymptote, eccentricity)
30. 3D geometry: direction cosines, line in 3D, plane, distance from point to plane, angle between planes
31. Trigonometry: all identities, sum/difference, double/half angle, product-to-sum, inverse trig identities

## Probability & Statistics
32. Probability: conditional, Bayes theorem, total probability, independent events
33. Distributions: binomial, Poisson, normal, exponential, uniform, geometric, hypergeometric
34. Mean, median, mode, variance, standard deviation, moments, skewness, kurtosis
35. Correlation, regression (linear, multiple), covariance
36. Hypothesis testing: t-test, chi-square, F-test, confidence intervals
37. Bayes estimation, MLE, MAP

## Discrete Math & Logic
38. Set theory: operations, De Morgan, cardinality, power set
39. Logic: propositional, predicate, truth tables, normal forms
40. Graph theory: degree, adjacency, paths, cycles, trees, Euler circuit, Hamiltonian path, planarity
41. Combinatorics: generating functions, recurrence relations, inclusion-exclusion, Burnside lemma

## Advanced / PhD level
42. Real analysis: convergence tests (ratio, root, comparison, integral, alternating), Riemann sums, Lebesgue integration basics
43. Complex analysis: Cauchy integral theorem, residue theorem, Laurent series, contour integration
44. Topology: basic definitions, continuity, compactness, connectedness
45. Abstract algebra: group theory (Lagrange, Sylow), ring theory, field theory, Galois theory basics
46. Linear algebra advanced: SVD, QR decomposition, Gram-Schmidt, projection operators, spectral theorem
47. Numerical methods: Newton-Raphson, secant, bisection, Runge-Kutta, finite differences, interpolation (Lagrange, Newton)
48. Optimization: KKT conditions, Lagrange multipliers, gradient descent, convex optimization basics
49. Differential geometry: curvature, torsion, Frenet-Serret, geodesics
50. Partial differential equations: classification, separation of variables, heat equation, wave equation, Laplace equation solutions

# YAML SCHEMA (use EXACTLY this format)
```yaml
- formula_id: "MATH_<SUBDOMAIN>_<NNN>"
  name: "Quadratic Formula"
  latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
  variables:
    - symbol: "x"
      name: "root"
      unit: ""
      dimensional_formula: ""
      quantity_type: "number"
    - symbol: "a"
      name: "coefficient_x_squared"
      unit: ""
      dimensional_formula: ""
      quantity_type: "number"
  preconditions: ["quadratic_equation", "a_not_zero"]
  grade_range: ["class10", "class11", "class12", "jee_main", "jee_advanced"]
  chapter: "Quadratic Equations"
  subject: "mathematics"
  concept_tags: ["MATH_ALG", "MATH_QUAD"]
  related_formulas: []
```

# RULES
1. Output ONLY valid YAML. No markdown fences, no commentary.
2. Start with `---` and then a YAML list.
3. Use sequential IDs: MATH_ARITH_001, MATH_ALG_001, MATH_CALC_001, etc.
4. Math formulas are dimensionless — use unit: "" and dimensional_formula: "" for all variables.
5. Be EXHAUSTIVE. Cover CBSE + CISCE + JEE + NEET + undergraduate + graduate + PhD.
6. Include ALL standard integrals, derivatives, series, identities.
7. Include proof techniques as formula entries where they have a standard form (e.g. induction template, contradiction template).
8. Target: 400+ math formulas.
"""

print(f"Mathematics formula KB generation")
print(f"Prompt size: {len(prompt)} chars")
print(f"Sending to {URL} model={MODEL}...")

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 64000,
    "system": "You are a mathematics expert generating a comprehensive formula knowledge base as YAML. Output ONLY valid YAML. No markdown, no commentary, no code fences. Start with --- and then a YAML list.",
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

        print(f"\nResponse in {elapsed:.1f}s")
        print(f"Input tokens: {usage.get('input_tokens', '?')}")
        print(f"Output tokens: {usage.get('output_tokens', '?')}")
        print(f"Formulas generated: {formula_count}")
        print("=" * 70)

        out_dir = r"D:\platform\backend\formulas\mathematics"
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "math_formulas.yaml")
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
