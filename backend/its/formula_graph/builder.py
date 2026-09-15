"""builder.py — Builds the formula knowledge graph from all data sources.

Sources:
1. backend/formulas/**/*.yaml  (6,062 formulas, 5,520 useful)
2. cbse_data/bloom_enrichment/*.bloom.marker  (52 nodes with 5 diagnostic Qs each)
3. cbse_data/nodes/  (curriculum nodes with prerequisite chains)

Output:
- backend/its/formula_graph/graph.json  (the full context-aware formula graph)
- Prerequisite chains starting from Class 6
- Cross-subject variable disambiguation table
- Concept-to-formula mapping for Graph-RAG retrieval
"""

from __future__ import annotations

import hashlib
import json
import os
import re
from collections import defaultdict, deque
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

import yaml

from backend.its.formula_graph.schema import (
    ContextualFormula, Domain, VariableDef,
    SYMBOL_DISAMBIGUATION,
)

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

REPO = Path(__file__).parent.parent.parent.parent  # D:\platform
FORMULA_DIR = REPO / "backend" / "formulas"
BLOOM_DIR = REPO / "cbse_data" / "bloom_enrichment"
OUTPUT = Path(__file__).parent / "graph.json"


# ---------------------------------------------------------------------------
# Domain classification from keywords
# ---------------------------------------------------------------------------

DOMAIN_KEYWORDS = {
    Domain.MECHANICS: [
        "force", "velocity", "acceleration", "momentum", "friction", "incline",
        "projectile", "newton", "motion", "speed", "displacement", "gravity",
        "free fall", "kinematics", "dynamics", "mass", "weight", "inertia",
        "tension", "normal", "equilibrium", " pulley", "string", "spring",
    ],
    Domain.THERMODYNAMICS: [
        "heat", "temperature", "thermal", "entropy", "adiabatic", "isothermal",
        "carnot", "efficiency", "internal energy", "specific heat", "latent",
        "calorimeter", "expansion", "gas", "pressure", "volume", "mole",
        "kinetic theory", "boltzmann",
    ],
    Domain.ELECTRICITY: [
        "current", "voltage", "resistance", "ohm", "circuit", "resistor",
        "capacitor", "inductor", "power", "electric", "battery", "cell",
        "kirchhoff", "wheatstone", "potentiometer", "ammeter", "voltmeter",
        "drift velocity", "conductivity", "resistivity",
    ],
    Domain.ELECTROSTATICS: [
        "charge", "coulomb", "electric field", "electric potential", "electrostatic",
        "capacitance", "dielectric", "flux", "gauss", "dipole", "equipotential",
    ],
    Domain.MAGNETISM: [
        "magnetic", "magnet", "lorentz", "faraday", "lenz", "induction",
        "solenoid", "toroid", "ampere", "biot", "savage",
    ],
    Domain.OPTICS: [
        "lens", "mirror", "focal", "refraction", "reflection", "snell",
        "dispersion", "prism", "interference", "diffraction", "polarization",
        "magnification", "image", "object", "ray", "wavefront",
    ],
    Domain.MODERN_PHYSICS: [
        "photoelectric", "photon", "de broglie", "bohr", "nucleus", "radioactive",
        "fission", "fusion", "semiconductor", "diode", "electron", "quantum",
        "wave function", "uncertainty", "x-ray", "laser",
    ],
    Domain.WAVES: [
        "wave", "frequency", "wavelength", "amplitude", "oscillation", "harmonic",
        "sound", "doppler", "resonance", "standing wave", "superposition",
    ],
    Domain.CHEMISTRY: [
        "mole", "molarity", "molality", "reaction", "equilibrium", "acid", "base",
        "ph", "buffer", "electrochemistry", "nernst", "oxidation", "reduction",
        "organic", "alkane", "alkene", "benzene", "isomer", "stoichiometry",
        "enthalpy", "entropy", "gibbs", "rate constant", "activation energy",
    ],
    Domain.MATHEMATICS: [
        "derivative", "integral", "limit", "matrix", "determinant", "vector",
        "probability", "permutation", "combination", "trigonometry", "sine",
        "cosine", "tangent", "logarithm", "parabola", "hyperbola", "complex",
        "binomial", "sequence", "series", "function", "domain", "range",
    ],
    Domain.BIOLOGY: [
        "cell", "dna", "rna", "protein", "enzyme", "photosynthesis", "respiration",
        "genetics", "dna replication", "mendel", "evolution", "ecology", "tissue",
        "organ", "bacteria", "virus", "immune", "digestion", "circulation",
    ],
}


# ---------------------------------------------------------------------------
# Domain classifier: given problem text, which domain is this?
# ---------------------------------------------------------------------------

def classify_domain(text: str) -> List[Tuple[str, float]]:
    """Classify text into domains with confidence scores."""
    text_lower = text.lower()
    scores: Dict[str, float] = {}
    for domain, keywords in DOMAIN_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in text_lower)
        if score > 0:
            scores[domain.value] = score / len(keywords)
    ranked = sorted(scores.items(), key=lambda x: -x[1])
    return ranked


# ---------------------------------------------------------------------------
# Symbol disambiguator: given domain + symbol, what does it mean?
# ---------------------------------------------------------------------------

def resolve_symbol(symbol: str, domain: str) -> Optional[Dict[str, str]]:
    """Resolve a symbol to its meaning within a domain context.

    "v" + "mechanics" -> velocity (m/s)
    "v" + "thermodynamics" -> volume (m^3)
    """
    domain_lower = domain.lower().replace(" ", "_")
    entry = SYMBOL_DISAMBIGUATION.get(symbol, {})
    if domain_lower in entry:
        result = entry[domain_lower].copy()
        result["domain"] = domain_lower
        result["symbol"] = symbol
        return result
    # Try partial match
    for d_key, meaning in entry.items():
        if domain_lower in d_key or d_key in domain_lower:
            result = meaning.copy()
            result["domain"] = d_key
            result["symbol"] = symbol
            return result
    return None


# ---------------------------------------------------------------------------
# Formula loader: parse YAML files into ContextualFormula objects
# ---------------------------------------------------------------------------

def load_formulas(
    formula_dir: Path,
    skip_broken: bool = True,
) -> Tuple[List[ContextualFormula], List[str]]:
    """Load all formulas from YAML, classify domain, resolve symbols."""
    formulas: List[ContextualFormula] = []
    failed_files: List[str] = []
    seen_ids: Set[str] = set()

    for yaml_file in sorted(formula_dir.rglob("*.yaml")):
        try:
            data = yaml.safe_load(yaml_file.read_text(encoding="utf-8"))
        except Exception:
            failed_files.append(str(yaml_file))
            continue

        entries = []
        if isinstance(data, list):
            entries = data
        elif isinstance(data, dict):
            for v in data.values():
                if isinstance(v, list):
                    entries.extend(f for f in v if isinstance(f, dict))

        for f in entries:
            if not isinstance(f, dict):
                continue

            fid = f.get("formula_id") or f.get("id") or ""
            name = f.get("name", "")
            latex = f.get("latex") or f.get("formula") or f.get("expression") or ""
            if not fid or not name or len(latex) < 3:
                continue
            if fid in seen_ids:
                continue
            seen_ids.add(fid)

            # Classify domain
            search_text = f"{name} {latex} {f.get('chapter', '')} {' '.join(f.get('concept_tags', []))}"
            domain_scores = classify_domain(search_text)
            domain_str = domain_scores[0][0] if domain_scores else "general"
            try:
                domain = Domain(domain_str)
            except ValueError:
                domain = Domain.GENERAL

            # Parse variables with semantic meaning
            variables: Dict[str, VariableDef] = {}
            for var in f.get("variables", []):
                if not isinstance(var, dict):
                    continue
                symbol = (var.get("symbol") or "").strip()
                if not symbol or len(symbol) > 10:
                    continue
                # Try to resolve symbol meaning using domain
                resolved = resolve_symbol(symbol, domain.value)
                if resolved:
                    variables[symbol] = VariableDef(
                        symbol=symbol,
                        name=var.get("name", resolved.get("name", symbol)),
                        unit=var.get("unit", resolved.get("unit", "")),
                        dimension=var.get("dimensional_formula", resolved.get("dimension", "")),
                        domain=domain.value,
                    )
                else:
                    variables[symbol] = VariableDef(
                        symbol=symbol,
                        name=var.get("name", symbol),
                        unit=var.get("unit", ""),
                        dimension=var.get("dimensional_formula", ""),
                        domain=domain.value,
                    )

            # Parse class levels
            grade_range = f.get("grade_range", f.get("class_levels", []))
            class_levels = []
            for g in grade_range:
                g_str = str(g).strip().lower()
                num_match = re.search(r"(\d+)", g_str)
                if num_match:
                    class_levels.append(int(num_match.group(1)))
                elif "jee" in g_str or "neet" in g_str or "undergrad" in g_str:
                    class_levels.extend([11, 12])
            if not class_levels:
                class_levels = [11, 12]

            formulas.append(ContextualFormula(
                formula_id=fid,
                name=name[:200],
                latex=latex[:500],
                domain=domain,
                sub_domain=f.get("chapter", ""),
                variables=variables,
                class_levels=sorted(set(class_levels)),
                chapter=f.get("chapter", ""),
                concept_tags=[t for t in f.get("concept_tags", []) if t][:10],
                source_file=str(yaml_file.name),
                source_exam=",".join(f.get("source_exam", "").split(",")) if f.get("source_exam") else "",
            ))

    return formulas, failed_files


# ---------------------------------------------------------------------------
# Prerequisite chain builder: Class 6 -> 12 learning order
# ---------------------------------------------------------------------------

def build_prerequisite_chains(
    formulas: List[ContextualFormula],
) -> Dict[str, List[str]]:
    """Build prerequisite chains: which formulas must be learned before which.

    Logic: formulas with shared variables are connected. The formula that
    introduces a variable (appears at a lower class level) is a prerequisite
    for formulas that use that variable at higher levels.
    """
    var_to_formulas: Dict[str, List[Tuple[int, str]]] = defaultdict(list)

    for f in formulas:
        min_class = min(f.class_levels) if f.class_levels else 11
        for var in f.variables:
            var_to_formulas[var].append((min_class, f.formula_id))

    # For each variable, sort by class level -> earlier formulas are prerequisites
    chains: Dict[str, List[str]] = {}
    for var, entries in var_to_formulas.items():
        entries.sort(key=lambda x: x[0])
        if len(entries) > 1:
            chains[var] = [fid for _, fid in entries]

    return chains


# ---------------------------------------------------------------------------
# Cross-subject link builder
# ---------------------------------------------------------------------------

def build_cross_subject_links(
    formulas: List[ContextualFormula],
) -> List[Dict[str, Any]]:
    """Find formulas from different domains that share variables."""
    var_to_formulas: Dict[str, List[Tuple[str, str]]] = defaultdict(list)
    for f in formulas:
        for var in f.variables:
            var_to_formulas[var].append((f.formula_id, f.domain.value))

    links = []
    seen = set()
    for var, entries in var_to_formulas.items():
        domains = set(d for _, d in entries)
        if len(domains) > 1:
            for i, (fid1, d1) in enumerate(entries):
                for fid2, d2 in entries[i+1:]:
                    if d1 != d2 and (fid1, fid2) not in seen:
                        seen.add((fid1, fid2))
                        links.append({
                            "formula_a": fid1,
                            "domain_a": d1,
                            "formula_b": fid2,
                            "domain_b": d2,
                            "shared_variable": var,
                            "reason": f"Both use '{var}' but with different meanings: "
                                      f"{d1} vs {d2}",
                        })
    return links


# ---------------------------------------------------------------------------
# Main builder
# ---------------------------------------------------------------------------

def build_graph(output_path: Optional[Path] = None) -> Dict[str, Any]:
    """Build the complete formula knowledge graph."""
    formulas, failed = load_formulas(FORMULA_DIR)
    chains = build_prerequisite_chains(formulas)
    cross_links = build_cross_subject_links(formulas)

    # Build concept-to-formula index (for Graph-RAG retrieval)
    concept_index: Dict[str, List[str]] = defaultdict(list)
    for f in formulas:
        for tag in f.concept_tags:
            concept_index[tag.lower()].append(f.formula_id)
        for kw in DOMAIN_KEYWORDS.get(f.domain, []):
            if kw in f.name.lower() or kw in f.sub_domain.lower():
                concept_index[kw].append(f.formula_id)

    # Deduplicate
    concept_index = {k: list(set(v)) for k, v in concept_index.items() if v}

    # Serialize
    graph = {
        "version": "1.0",
        "total_formulas": len(formulas),
        "total_concepts": len(concept_index),
        "failed_files": failed,
        "formulas": [f.to_dict() for f in formulas],
        "prerequisite_chains": chains,
        "cross_subject_links": cross_links,
        "concept_index": concept_index,
        "symbol_disambiguation": {
            sym: {d: m for d, m in meanings.items()}
            for sym, meanings in SYMBOL_DISAMBIGUATION.items()
        },
    }

    if output_path is None:
        output_path = Path(__file__).parent / "graph.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(graph, ensure_ascii=False, indent=1), encoding="utf-8"
    )

    print(f"Formula graph built: {len(formulas)} formulas, "
          f"{len(concept_index)} concepts, {len(chains)} prerequisite chains, "
          f"{len(cross_links)} cross-subject links")
    print(f"Saved to {output_path} ({output_path.stat().st_size // 1024}KB)")

    return graph


if __name__ == "__main__":
    build_graph()
