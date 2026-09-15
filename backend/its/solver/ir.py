"""ir.py -- The Intermediate Representation: what questions are MADE of.

One schema spoken by every solver path (ARCHITECTURE.md section 3):

    marking-scheme chains   -> IR (ground truth, Phase 1)
    kernel families         -> IR (Phase 2 retrofit)
    form bank / structures  -> IR (Phase 2 retrofit)
    grammar reader          -> IR (Phase 3)
    frontier LLM proposals  -> IR (Phase 5, gated the same way)

Design rules (the constitution, enforced by validator.py):
    - every Quantity carries a VERBATIM span of the source text
    - every Step is a dataflow assignment: name = expression(operands)
    - expressions live in a tiny safe grammar (numbers, + - * / **, sqrt,
      pi, parens, previously defined names) -- nothing else ever executes
    - provenance is mandatory and travels with the IR forever
    - anchor_value is the official final value when known; the validator
      requires the executed chain to reproduce it (residual gate)

Phase 1 relations are arithmetic compositions ("Volume = 22/7*7*7").
Domain-typed relations (profit_percent_of_cost etc.) are a classification
layer on top, added in Phase 3 -- never a second schema.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

# --------------------------------------------------------------------------- #
# Units: family keys used by the dimension gate. Currency symbols and OCR
# damage are normalized upstream (ms_compiler / input repair A1-A2).
# --------------------------------------------------------------------------- #

UNIT_FAMILIES = {
    "inr": "money",
    "percent": "percent",
    "count": "dimensionless",
    "ratio": "dimensionless",
    "years": "time",
    "hours": "time",
    "minutes": "time",
    "seconds": "time",
    "m": "length",
    "cm": "length",
    "km": "length",
    "m2": "area",
    "cm2": "area",
    "m3": "volume",
    "cm3": "volume",
    "kmph": "velocity",
    "mps": "velocity",
    "kg": "mass",
    "g": "mass",
    "probability": "probability",   # plausibility gate: must lie in [0, 1]
}


@dataclass
class Quantity:
    """A number grounded verbatim in the source text."""
    value: float
    span: str                        # literal substring of source_text
    unit: str = ""                   # key into UNIT_FAMILIES ("" = unknown)
    role: str = ""                   # semantic role (filled by later phases)
    provenance: str = "given"        # given | derived | default | distractor

    @property
    def family(self) -> str:
        return UNIT_FAMILIES.get(self.unit, "unknown")


@dataclass
class Step:
    """One dataflow assignment: name = expression(operands).

    executable=True means every operand resolved to a number at compile
    time, so the safe evaluator could (and did) evaluate it.  Symbolic
    steps carry structure only -- they never execute, never verify.
    """
    name: str                        # snake_case, unique within the IR
    expression: str                  # normalized safe-grammar expression
    operands: List[str] = field(default_factory=list)   # names it consumes
    value: Optional[float] = None    # evaluated value if executable
    executable: bool = False
    repairs: List[str] = field(default_factory=list)    # A2 repairs applied


@dataclass
class IR:
    source_text: str
    provenance: str                  # marking_scheme | kernel | form |
                                     # structure | grammar | frontier_llm
    quantities: List[Quantity] = field(default_factory=list)
    steps: List[Step] = field(default_factory=list)
    target: str = ""                 # name of the final step (the answer)
    anchor_value: Optional[float] = None   # official value, when known
    question_id: Optional[int] = None
    meta: Dict[str, Any] = field(default_factory=dict)

    # -- derived views ----------------------------------------------------- #

    def defined_names(self) -> List[str]:
        return [s.name for s in self.steps]

    def executable_chain(self) -> List[Step]:
        """Steps on the dataflow path that feed the target, in order."""
        if not self.steps:
            return []
        target = self.target or self.steps[-1].name
        by_name = {s.name: s for s in self.steps}
        order: List[Step] = []
        seen: set = set()

        def visit(name: str) -> None:
            if name in seen or name not in by_name:
                return
            seen.add(name)
            for op in by_name[name].operands:
                visit(op)
            order.append(by_name[name])

        visit(target)
        return order

    def final_value(self) -> Optional[float]:
        chain = self.executable_chain()
        for step in reversed(chain):
            if step.executable and step.value is not None:
                return step.value
        return None

    def uid(self) -> str:
        payload = json.dumps(self.to_dict(), sort_keys=True)
        return hashlib.sha1(payload.encode()).hexdigest()[:12]

    # -- serialization ------------------------------------------------------ #

    def to_dict(self) -> Dict[str, Any]:
        return {
            "source_text": self.source_text,
            "provenance": self.provenance,
            "quantities": [
                {"value": q.value, "span": q.span, "unit": q.unit,
                 "role": q.role, "provenance": q.provenance}
                for q in self.quantities
            ],
            "steps": [
                {"name": s.name, "expression": s.expression,
                 "operands": s.operands,
                 "value": s.value, "executable": s.executable,
                 "repairs": s.repairs}
                for s in self.steps
            ],
            "target": self.target,
            "anchor_value": self.anchor_value,
            "question_id": self.question_id,
            "meta": self.meta,
        }

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2, ensure_ascii=True)


def ir_from_dict(d: Dict[str, Any]) -> IR:
    """Rebuild an IR from its serialized dict (corpus round-trip)."""
    return IR(
        source_text=d.get("source_text", ""),
        provenance=d.get("provenance", "unknown"),
        quantities=[Quantity(**q) for q in d.get("quantities", [])],
        steps=[Step(**s) for s in d.get("steps", [])],
        target=d.get("target", ""),
        anchor_value=d.get("anchor_value"),
        question_id=d.get("question_id"),
        meta=d.get("meta", {}),
    )
