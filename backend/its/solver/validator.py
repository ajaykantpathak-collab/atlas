"""validator.py -- The gate stack.  Build this FIRST (ARCHITECTURE.md 5).

The CAS is innocent and blind: it computes the wrong model perfectly.
These gates check the MODEL against the SOURCE, never the arithmetic.

Order of application (each failure is recorded, never raises):

    1. verbatim   -- every quantity span must literally occur in the text
    2. grammar    -- every step expression must parse under the safe
                     grammar (whitelist of AST nodes; the arithmetic
                     analogue of the relation whitelist)
    3. dataflow   -- operands defined before use; acyclic (DAG check)
    4. closure    -- S4 conservation of quantities: every given quantity
                     is used by some expression OR explicitly flagged
                     distractor; no operand resolves to nothing
    5. anchor     -- when anchor_value is known, the executed chain must
                     reproduce it within tolerance (residual gate)
    6. plausibility -- role-based sanity bounds (probability in [0,1],
                     lengths non-negative, ...) on values we can check
"""

from __future__ import annotations

import ast
import re
from dataclasses import dataclass, field
from typing import List, Optional

from backend.its.solver.ir import IR, Quantity, Step

# --------------------------------------------------------------------------- #
# Source normalization shared by the verbatim gate and all compilers.
# Tolerates OCR spacing around digits and currency symbols (repair A1/A2)
# without ever changing the numbers themselves.
# ---------------------------------------------------------------------------


def normalize_source(text: str) -> str:
    """Canonical comparable form: ASCII, single-spaced, no currency marks."""
    text = text.replace("\u2212", "-")        # unicode minus
    text = text.replace("\u2019", "'")
    text = text.replace("\u20b9", "Rs ")      # rupee sign -> Rs
    text = re.sub(r"[^ -~]", " ", text)       # remaining non-ASCII -> space
    return re.sub(r"\s+", " ", text).strip().lower()


def _spans_ok(span: str, text: str) -> bool:
    """Span occurs in text after normalization; digit-spaces tolerated."""
    ns, nt = normalize_source(span), normalize_source(text)
    if not ns:
        return False
    if ns in nt:
        return True
    # OCR split numbers: 'Rs 1,2 00' ~= 'Rs 1,200'
    squashed_t = re.sub(r"(?<=\d) (?=\d)", "", nt)
    squashed_s = re.sub(r"(?<=\d) (?=\d)", "", ns)
    return squashed_s in squashed_t


# --------------------------------------------------------------------------- #
# Gate 2 support: the safe expression grammar (the executable whitelist)
# --------------------------------------------------------------------------- #

_ALLOWED_BINOPS = (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow)
_ALLOWED_UNARY = (ast.USub, ast.UAdd)
_ALLOWED_FUNCS = {"sqrt"}


class SafeEval(ast.NodeVisitor):
    """Evaluate expressions in the safe grammar against a name environment."""

    def __init__(self, env: dict):
        self.env = env

    def visit_Expression(self, node):
        return self.visit(node.body)

    def visit_Constant(self, node):
        if isinstance(node.value, (int, float)) and not isinstance(
                node.value, bool):
            return float(node.value)
        raise ValueError(f"bad constant {node.value!r}")

    def visit_Name(self, node):
        if node.id == "pi":
            import math
            return math.pi
        if node.id in self.env:
            return float(self.env[node.id])
        raise KeyError(node.id)

    def visit_BinOp(self, node):
        if not isinstance(node.op, _ALLOWED_BINOPS):
            raise ValueError("operator not in grammar")
        left, right = self.visit(node.left), self.visit(node.right)
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            if right == 0:
                raise ZeroDivisionError
            return left / right
        # Pow: bound the exponent to keep evaluation instant (never hangs)
        if abs(right) > 64:
            raise ValueError("exponent out of bounds")
        return left ** right

    def visit_UnaryOp(self, node):
        if not isinstance(node.op, _ALLOWED_UNARY):
            raise ValueError("unary op not in grammar")
        v = self.visit(node.operand)
        return -v if isinstance(node.op, ast.USub) else v

    def visit_Call(self, node):
        if not (isinstance(node.func, ast.Name)
                and node.func.id in _ALLOWED_FUNCS
                and len(node.args) == 1):
            raise ValueError("call not in grammar")
        import math
        return math.sqrt(self.visit(node.args[0]))

    def generic_visit(self, node):
        raise ValueError(f"node {type(node).__name__} not in grammar")


def check_grammar(expression: str) -> Optional[str]:
    """None if expression parses under the grammar, else the reason."""
    try:
        tree = ast.parse(expression, mode="eval")
    except SyntaxError as exc:
        return f"syntax: {exc.msg}"
    try:
        SafeEval({}).visit(tree)   # parse-only walk: env lookups raise
    except KeyError:               # KeyError, which still proves the
        return None                # grammar accepted the expression
    except ValueError as exc:
        return str(exc)
    except ZeroDivisionError:
        return None          # grammar is fine; executability is separate
    return None


def eval_expression(expression: str, env: dict) -> float:
    tree = ast.parse(expression, mode="eval")
    return float(SafeEval(env).visit(tree))


# --------------------------------------------------------------------------- #
# The gate stack
# --------------------------------------------------------------------------- #


@dataclass
class GateReport:
    passed: bool = True
    failures: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)

    def fail(self, gate: str, detail: str) -> None:
        self.passed = False
        self.failures.append(f"[{gate}] {detail}")

    def warn(self, gate: str, detail: str) -> None:
        self.warnings.append(f"[{gate}] {detail}")


def validate_ir(ir: IR, anchor_tol: float = 1e-6) -> GateReport:
    report = GateReport()
    _gate_verbatim(ir, report)
    _gate_grammar(ir, report)
    _gate_dataflow(ir, report)
    _gate_closure(ir, report)
    _gate_anchor(ir, report, anchor_tol)
    _gate_plausibility(ir, report)
    return report


def _gate_verbatim(ir: IR, rep: GateReport) -> None:
    for i, q in enumerate(ir.quantities):
        if q.provenance in ("derived", "default"):
            continue     # not grounded in text -- audit trail covers them
        if not _spans_ok(q.span, ir.source_text):
            rep.fail("verbatim", f"quantity {i} span {q.span!r} "
                                 "not found in source")


def _gate_grammar(ir: IR, rep: GateReport) -> None:
    for step in ir.steps:
        reason = check_grammar(step.expression)
        if reason:
            rep.fail("grammar", f"step {step.name!r}: {reason}")


def _gate_dataflow(ir: IR, rep: GateReport) -> None:
    defined: set = set()
    n_quantities = len(ir.quantities)

    def grounded(op: str) -> bool:
        """qN operands are literals grounded in the source text."""
        if op.startswith("q") and op[1:].isdigit():
            return int(op[1:]) < n_quantities
        return False

    for step in ir.steps:
        for op in step.operands:
            if op in defined or grounded(op):
                continue
            if step.executable:
                rep.fail("dataflow", f"step {step.name!r} uses {op!r} "
                                     "before it is defined")
            else:
                # symbolic step: unresolved external symbol is structure,
                # not corruption -- record, never block
                rep.warn("dataflow", f"symbolic step {step.name!r} has "
                                     f"unresolved operand {op!r}")
        if step.name in defined:
            rep.fail("dataflow", f"step {step.name!r} defined twice")
        defined.add(step.name)


def _gate_closure(ir: IR, rep: GateReport) -> None:
    """S4: conservation of quantities -- no orphans, no holes."""
    if not ir.steps:
        return
    used_names: set = set()
    for step in ir.steps:
        used_names.update(step.operands)
    # every step except the target chain end should feed something, and
    # every quantity should be used or explicitly marked a distractor
    defined = set(ir.defined_names())
    q_literals = {f"q{i}" for i in range(len(ir.quantities))}
    known = defined | q_literals
    for step in ir.steps:
        for op in step.operands:
            if op in known:
                continue
            if step.executable:
                rep.fail("closure", f"operand {op!r} resolves to nothing")
            # symbolic steps carry unresolved names by design -- warned
            # in the dataflow gate, not failed here
    # quantities: numeric literals appear inside expressions; a quantity
    # whose value appears nowhere and that no step consumes is suspect
    for i, q in enumerate(ir.quantities):
        if q.provenance == "distractor":
            continue
        consumed = (f"q{i}" in used_names) or _value_used(
            q.value, ir.steps)
        if not consumed:
            rep.warn("closure", f"quantity {i} (value {q.value}) unused -- "
                                "flag as distractor or bind it")


def _value_used(value: float, steps: List[Step]) -> bool:
    for step in steps:
        for token in step.expression.replace("(", " ").replace(
                ")", " ").split():
            try:
                if abs(float(token) - value) <= 1e-9:
                    return True
            except ValueError:
                continue
    return False


def _gate_anchor(ir: IR, rep: GateReport, tol: float) -> None:
    if ir.anchor_value is None:
        return
    computed = ir.final_value()
    if computed is None:
        rep.warn("anchor", "anchor known but chain not executable")
        return
    scale = max(1.0, abs(ir.anchor_value))
    if abs(computed - ir.anchor_value) / scale > tol:
        rep.fail("anchor", f"chain computes {computed:.6g}, "
                           f"official anchor {ir.anchor_value:.6g}")


def _gate_plausibility(ir: IR, rep: GateReport) -> None:
    for i, q in enumerate(ir.quantities):
        if q.family == "probability" and not 0.0 <= q.value <= 1.0:
            rep.fail("plausibility", f"quantity {i}: probability "
                                     f"{q.value} outside [0,1]")
    for step in ir.steps:
        if step.executable and step.value is not None and \
                step.name.startswith("p_") and not 0.0 <= step.value <= 1.0:
            rep.fail("plausibility", f"step {step.name!r}: probability "
                                     f"{step.value} outside [0,1]")
