"""cross_subject_bridge.py — 10/10 Cross-Disciplinary Knowledge Graph Bridges.

Connects related concepts across Mathematics, Physics, Chemistry, and Biology.
Highlights shared mathematical structures, conflicting conventions (e.g. thermodynamic work signs),
and interdisciplinary applications.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Dict, List, Optional


@dataclass
class CrossSubjectBridge:
    primary_subject: str
    target_subject: str
    title: str
    primary_concept: str
    bridged_concept: str
    shared_foundation: str
    convention_trap: Optional[str]
    unifying_formula: str
    deep_link_topics: List[str]


# Knowledge base of canonical cross-subject bridges
CROSS_SUBJECT_BRIDGES: List[Dict[str, Any]] = [
    {
        "keywords": ["thermodynamics", "work done", "internal energy", "first law", "enthalpy", "isothermal"],
        "primary_subject": "physics",
        "target_subject": "chemistry",
        "title": "Thermodynamics Sign Convention Divergence (Physics vs Chemistry)",
        "primary_concept": "First Law of Thermodynamics (Physics: ΔU = Q - W)",
        "bridged_concept": "First Law of Thermodynamics (IUPAC Chemistry: ΔU = q + w)",
        "shared_foundation": "Conservation of energy in closed systems; internal energy U is an exact state function.",
        "convention_trap": (
            "⚠️ CRITICAL EXAM TRAP: In Physics (mechanical engineering convention), work done BY the gas is POSITIVE (W = ∫P dV, so ΔU = Q - W). "
            "In Chemistry (IUPAC convention), work done ON the system is POSITIVE (w = -∫P_ext dV, so ΔU = q + w). "
            "Both give identical physical ΔU, but swapping formulas leads to a 100% sign error!"
        ),
        "unifying_formula": "\\Delta U = Q - W_{\\text{by}} \\equiv q + w_{\\text{on}}",
        "deep_link_topics": ["Physics: Kinetic Theory & Thermodynamics", "Chemistry: Chemical Thermodynamics"],
    },
    {
        "keywords": ["nernst", "electrochemistry", "galvanic", "emf", "cell potential", "gibbs", "faraday"],
        "primary_subject": "chemistry",
        "target_subject": "physics",
        "title": "Electrochemical Potential & Electrostatic Work",
        "primary_concept": "Galvanic Cells & Nernst Equation (E_cell = E° - (RT/nF) ln Q)",
        "bridged_concept": "Electric Potential Difference & Capacitive Energy (W = q·ΔV)",
        "shared_foundation": "Chemical affinity converting free energy into electrical work across an interface.",
        "convention_trap": (
            "⚠️ EXAM TRAP: Faraday's constant F = e · N_A ≈ 96,485 C/mol is the charge of ONE MOLE of electrons. "
            "Thermodynamic spontaneity requires ΔG < 0, which corresponds to positive cell potential E_cell > 0."
        ),
        "unifying_formula": "\\Delta G = -n F E_{\\text{cell}}",
        "deep_link_topics": ["Chemistry: Electrochemistry", "Physics: Current Electricity & Potential"],
    },
    {
        "keywords": ["chemiosmosis", "mitochondria", "atp", "proton gradient", "electron transport", "respiration"],
        "primary_subject": "biology",
        "target_subject": "chemistry",
        "title": "Chemiosmotic Proton-Motive Force & Redox Free Energy",
        "primary_concept": "Mitochondrial Oxidative Phosphorylation & ATP Synthase",
        "bridged_concept": "Electrochemical Membrane Potential (Δμ_H+ = F·Δψ - 2.3 RT·ΔpH)",
        "shared_foundation": "Peter Mitchell chemiosmotic hypothesis: biological transducers storing energy in electrochemical gradients.",
        "convention_trap": (
            "⚠️ NEET/JEE TRAP: 1 mole of ATP synthesis requires ~3 to 4 H+ flowing back through F0-F1 ATP synthase, "
            "driven by both an electrical potential difference (Δψ) and a chemical pH gradient (ΔpH)."
        ),
        "unifying_formula": "\\Delta p = \\Delta \\psi - \\frac{2.303 RT}{F} \\Delta \\text{pH}",
        "deep_link_topics": ["Biology: Respiration in Plants", "Chemistry: Thermodynamics & Redox Equilibrium"],
    },
    {
        "keywords": ["dot product", "cross product", "vector", "torque", "lorentz", "work", "angular momentum"],
        "primary_subject": "maths",
        "target_subject": "physics",
        "title": "Vector Algebra as Physical Work and Rotational Mechanics",
        "primary_concept": "Inner Product (A · B) and Outer Product (A × B)",
        "bridged_concept": "Work (W = F · d), Torque (τ = r × F), and Magnetic Lorentz Force (F = q(v × B))",
        "shared_foundation": "Invariance of physical laws under coordinate rotations; scalar invariants vs pseudovector axial quantities.",
        "convention_trap": (
            "⚠️ MATHEMATICAL TRAP: A · B = |A||B| cos θ is commutative, but A × B = - (B × A) is strictly ANTI-COMMUTATIVE. "
            "Reversing the order in torque τ = r × F flips the direction of the rotational axis."
        ),
        "unifying_formula": "W = \\vec{F} \\cdot \\vec{d}, \\quad \\vec{\\tau} = \\vec{r} \\times \\vec{F}, \\quad \\vec{F}_B = q(\\vec{v} \\times \\vec{B})",
        "deep_link_topics": ["Mathematics: Vector Algebra", "Physics: Rotational Dynamics & Magnetism"],
    }
]


class CrossSubjectBridgeService:
    """Service to discover and annotate interdisciplinary connections between concepts."""

    @classmethod
    def get_bridge_for_query(cls, query: str) -> Optional[CrossSubjectBridge]:
        """Matches a query against canonical cross-subject bridges."""
        q_lower = (query or "").lower()
        best_match = None
        best_score = 0

        for bridge in CROSS_SUBJECT_BRIDGES:
            score = sum(1 for kw in bridge["keywords"] if kw in q_lower)
            if score > best_score and score >= 2:
                best_score = score
                best_match = bridge

        if not best_match:
            return None

        return CrossSubjectBridge(
            primary_subject=best_match["primary_subject"],
            target_subject=best_match["target_subject"],
            title=best_match["title"],
            primary_concept=best_match["primary_concept"],
            bridged_concept=best_match["bridged_concept"],
            shared_foundation=best_match["shared_foundation"],
            convention_trap=best_match.get("convention_trap"),
            unifying_formula=best_match["unifying_formula"],
            deep_link_topics=best_match["deep_link_topics"],
        )
