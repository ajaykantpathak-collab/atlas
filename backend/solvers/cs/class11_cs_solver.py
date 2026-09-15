"""
ISC Class 11 Computer Science Solver (cisce/isc)
Complete educational solver with step-by-step output.
"""

import math
import re
import random
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple


# =============================================================================
# SolverResult Dataclass
# =============================================================================

@dataclass
class SolverResult:
    """Container for solver output with step-by-step reasoning."""
    success: bool
    result: Any
    steps: List[Dict[str, Any]] = field(default_factory=list)
    error: Optional[str] = None

    def add_step(self, description: str, formula: str = "", computation: str = "", value: Any = None):
        self.steps.append({
            "step": len(self.steps) + 1,
            "description": description,
            "formula": formula,
            "computation": computation,
            "value": value,
        })

    def verify(self, expected: Any) -> bool:
        try:
            return self.result == expected
        except Exception:
            return False

    def to_dict(self) -> dict:
        return {
            "success": self.success,
            "result": self.result,
            "steps": self.steps,
            "error": self.error,
            "verification": None,
        }


# =============================================================================
# SOLVER_REGISTRY
# =============================================================================

SOLVER_REGISTRY = {}


def register_solver(name: str):
    """Decorator to register solvers in SOLVER_REGISTRY."""
    def decorator(func):
        SOLVER_REGISTRY[name] = func
        return func
    return decorator


# =============================================================================
# Helper Utilities
# =============================================================================

def _binary_bits_required(n: int) -> int:
    """Return minimum number of bits to represent n."""
    if n == 0:
        return 1
    return n.bit_length()


def _decimal_to_binary_str(n: int) -> str:
    """Return binary string without '0b' prefix."""
    if n == 0:
        return "0"
    return bin(n)[2:]


def _decimal_to_octal_str(n: int) -> str:
    if n == 0:
        return "0"
    return oct(n)[2:]


def _decimal_to_hex_str(n: int) -> str:
    if n == 0:
        return "0"
    return hex(n)[2:].upper()


# =============================================================================
# binary_convert
# =============================================================================

@register_solver("binary_convert")
def binary_convert(value: str, from_base: str, to_base: str) -> SolverResult:
    """
    Convert between number systems: binary, octal, decimal, hexadecimal.

    Args:
        value: The value to convert (as string).
        from_base: Source base ('binary', 'octal', 'decimal', 'hexadecimal').
        to_base: Target base ('binary', 'octal', 'decimal', 'hexadecimal').

    Returns:
        SolverResult with converted value and step-by-step explanation.
    """
    result = SolverResult(success=False, result=None)
    from_base = from_base.lower().strip()
    to_base = to_base.lower().strip()

    valid_bases = {"binary": 2, "octal": 8, "decimal": 10, "hexadecimal": 16}
    if from_base not in valid_bases or to_base not in valid_bases:
        result.error = f"Invalid base. Supported: {list(valid_bases.keys())}"
        return result

    base_map = valid_bases

    # Step 1: Convert to decimal
    result.add_step(
        f"Step 1: Convert from {from_base} to decimal.",
        formula=f"decimal = sum(digit * {base_map[from_base]}^position)",
    )

    try:
        decimal_val = int(value, base_map[from_base])
    except ValueError:
        result.error = f"Invalid {from_base} number: '{value}'"
        return result

    comp_str = ""
    if from_base == "decimal":
        comp_str = f"{value} (already decimal)"
    else:
        comp_str = f"int('{value}', {base_map[from_base]}) = {decimal_val}"

    result.add_step(
        f"Convert {value} ({from_base}) → decimal",
        computation=comp_str,
        value=decimal_val,
    )

    # Step 2: Convert decimal to target
    result.add_step(
        f"Step 2: Convert decimal {decimal_val} to {to_base}.",
        formula=f"Repeated division by {base_map[to_base]}, collect remainders.",
    )

    if to_base == "decimal":
        final_val = str(decimal_val)
    elif to_base == "binary":
        final_val = _decimal_to_binary_str(decimal_val)
        divisions = []
        temp = decimal_val
        while temp > 0:
            rem = temp % 2
            divisions.append(f"{temp} ÷ 2 = {temp // 2}, remainder {rem}")
            temp //= 2
        result.add_step(
            "Repeated division by 2 (bottom-up for remainders):",
            computation="\n".join(reversed(divisions)),
            value=final_val,
        )
    elif to_base == "octal":
        final_val = _decimal_to_octal_str(decimal_val)
        divisions = []
        temp = decimal_val
        while temp > 0:
            rem = temp % 8
            divisions.append(f"{temp} ÷ 8 = {temp // 8}, remainder {rem}")
            temp //= 2 if temp == 0 else temp // 8
        # Rebuild properly
        divisions.clear()
        temp = decimal_val
        while temp > 0:
            rem = temp % 8
            divisions.append(f"{temp} ÷ 8 = {temp // 8}, remainder {rem}")
            temp //= 8
        result.add_step(
            "Repeated division by 8 (bottom-up for remainders):",
            computation="\n".join(reversed(divisions)),
            value=final_val,
        )
    elif to_base == "hexadecimal":
        final_val = _decimal_to_hex_str(decimal_val)
        divisions = []
        temp = decimal_val
        hex_chars = "0123456789ABCDEF"
        while temp > 0:
            rem = temp % 16
            divisions.append(f"{temp} ÷ 16 = {temp // 16}, remainder {hex_chars[rem]}")
            temp //= 16
        result.add_step(
            "Repeated division by 16 (bottom-up for remainders):",
            computation="\n".join(reversed(divisions)),
            value=final_val,
        )

    result.add_step(
        f"Final Answer: {value} ({from_base}) = {final_val} ({to_base})",
        value=final_val,
    )

    result.result = final_val
    result.success = True

    # Verification
    verification_val = int(final_val, base_map[to_base])
    result.add_step(
        "Verification: Convert result back to decimal",
        computation=f"int('{final_val}', {base_map[to_base]}) = {verification_val}",
        value=verification_val,
    )
    if verification_val == decimal_val:
        result.add_step("✓ Verification passed: values match.")
    else:
        result.add_step("✗ Verification failed.")

    return result


# =============================================================================
# octal_convert
# =============================================================================

@register_solver("octal_convert")
def octal_convert(value: str, from_base: str, to_base: str) -> SolverResult:
    """
    Convert octal numbers to/from other bases with bit grouping explanation.
    Binary ↔ Octal uses 3-bit groups; Binary ↔ Hex uses 4-bit groups.
    """
    result = SolverResult(success=False, result=None)
    from_base = from_base.lower().strip()
    to_base = to_base.lower().strip()
    base_map = {"binary": 2, "octal": 8, "decimal": 10, "hexadecimal": 16}

    if from_base not in base_map or to_base not in base_map:
        result.error = "Supported bases: binary, octal, decimal, hexadecimal"
        return result

    try:
        dec = int(value, base_map[from_base])
    except ValueError:
        result.error = f"Invalid {from_base} value: '{value}'"
        return result

    result.add_step(
        f"Step 1: Interpret '{value}' as {from_base} → decimal = {dec}",
        formula=f"int('{value}', {base_map[from_base]})",
        value=dec,
    )

    # Special explanation for binary↔octal
    if from_base == "binary" and to_base == "octal":
        result.add_step(
            "Step 2: Group binary digits in groups of 3 (from right, pad left with 0).",
            formula="Each 3-bit group maps to one octal digit.",
            computation=f"Binary: {value}\nGroups of 3: " + ", ".join(
                [value[max(0, len(value)-3*(i+1)):len(value)-3*i].zfill(3)
                 for i in range((len(value)+2)//3, 0, -1)]
            ),
        )
    elif from_base == "octal" and to_base == "binary":
        result.add_step(
            "Step 2: Replace each octal digit with its 3-bit binary equivalent.",
            formula="3 bits per octal digit.",
            computation=f"Octal digits: {list(value)}",
        )

    if to_base == "decimal":
        final = str(dec)
    elif to_base == "binary":
        final = _decimal_to_binary_str(dec)
    elif to_base == "octal":
        final = _decimal_to_octal_str(dec)
    elif to_base == "hexadecimal":
        final = _decimal_to_hex_str(dec)

    result.add_step(
        f"Step 3: Convert decimal {dec} to {to_base}.",
        value=final,
    )
    result.add_step(f"Final: {value} ({from_base}) = {final} ({to_base})", value=final)

    result.result = final
    result.success = True

    # Verification
    back = int(final, base_map[to_base])
    result.add_step(
        "Verification",
        computation=f"int('{final}', {base_map[to_base]}) = {back}",
        value=back,
    )
    if back == dec:
        result.add_step("✓ Verified: round-trip matches.")
    else:
        result.add_step("✗ Verification failed.")

    return result


# =============================================================================
# hex_convert
# =============================================================================

@register_solver("hex_convert")
def hex_convert(value: str, from_base: str, to_base: str) -> SolverResult:
    """
    Convert hexadecimal numbers to/from other bases.
    Binary ↔ Hex uses 4-bit groups.
    """
    result = SolverResult(success=False, result=None)
    from_base = from_base.lower().strip()
    to_base = to_base.lower().strip()
    base_map = {"binary": 2, "octal": 8, "decimal": 10, "hexadecimal": 16}

    if from_base not in base_map or to_base not in base_map:
        result.error = "Supported bases: binary, octal, decimal, hexadecimal"
        return result

    try:
        dec = int(value, base_map[from_base])
    except ValueError:
        result.error = f"Invalid {from_base} value: '{value}'"
        return result

    result.add_step(
        f"Step 1: Interpret '{value}' as {from_base} → decimal = {dec}",
        formula=f"int('{value}', {base_map[from_base]})",
        value=dec,
    )

    # Special explanation for binary↔hex
    if from_base == "binary" and to_base == "hexadecimal":
        padded = value.zfill((len(value) + 3) // 4 * 4)
        groups = [padded[max(0, len(padded)-4*(i+1)):len(padded)-4*i].zfill(4)
                  for i in range(len(padded)//4, 0, -1)]
        hex_map = {
            "0000": "0", "0001": "1", "0010": "2", "0011": "3",
            "0100": "4", "0101": "5", "0110": "6", "0111": "7",
            "1000": "8", "1001": "9", "1010": "A", "1011": "B",
            "1100": "C", "1101": "D", "1110": "E", "1111": "F",
        }
        mapped = [hex_map[g] for g in groups]
        result.add_step(
            "Step 2: Group binary digits in groups of 4 (from right, pad left with 0).",
            formula="Each 4-bit group maps to one hex digit.",
            computation=f"Binary: {value}\nPadded: {padded}\nGroups: {groups}\nMapping: {list(zip(groups, mapped))}",
        )
    elif from_base == "hexadecimal" and to_base == "binary":
        hex_to_bin = {
            "0": "0000", "1": "0001", "2": "0010", "3": "0011",
            "4": "0100", "5": "0101", "6": "0110", "7": "0111",
            "8": "1000", "9": "1001", "A": "1010", "B": "1011",
            "C": "1100", "D": "1101", "E": "1110", "F": "1111",
        }
        bins = [hex_to_bin.get(c.upper(), "0000") for c in value]
        result.add_step(
            "Step 2: Replace each hex digit with its 4-bit binary equivalent.",
            computation=f"Hex: {list(value.upper())}\nBinary groups: {bins}",
        )

    if to_base == "decimal":
        final = str(dec)
    elif to_base == "binary":
        final = _decimal_to_binary_str(dec)
    elif to_base == "octal":
        final = _decimal_to_octal_str(dec)
    elif to_base == "hexadecimal":
        final = _decimal_to_hex_str(dec)

    result.add_step(f"Step 3: Decimal {dec} → {to_base}", value=final)
    result.add_step(f"Final: {value} ({from_base}) = {final} ({to_base})", value=final)

    result.result = final
    result.success = True

    back = int(final, base_map[to_base])
    result.add_step("Verification", computation=f"int('{final}', {base_map[to_base]}) = {back}", value=back)
    if back == dec:
        result.add_step("✓ Verified.")
    return result


# =============================================================================
# binary_arithmetic
# =============================================================================

@register_solver("binary_arithmetic")
def binary_arithmetic(a: str, b: str, operation: str) -> SolverResult:
    """
    Perform binary arithmetic: addition, subtraction, multiplication.
    """
    result = SolverResult(success=False, result=None)
    operation = operation.lower().strip()

    try:
        a_val = int(a, 2)
        b_val = int(b, 2)
    except ValueError:
        result.error = "Inputs must be valid binary strings."
        return result

    max_len = max(len(a), len(b))
    a_padded = a.zfill(max_len)
    b_padded = b.zfill(max_len)

    result.add_step(
        f"Operands: A={a} ({a_val}), B={b} ({b_val})",
        computation=f"A = {a_padded} = {a_val},  B = {b_padded} = {b_val}",
        value=f"A={a_val}, B={b_val}",
    )

    if operation in ("add", "addition", "+"):
        decimal_result = a_val + b_val
        binary_result = _decimal_to_binary_str(decimal_result)
        result.add_step(
            "Addition: A + B = A + B (decimal), then convert back to binary.",
            formula="A + B → decimal → binary",
            computation=f"{a_val} + {b_val} = {decimal_result} → {binary_result}",
        )
        # Show bit-by-bit addition
        carry = 0
        bits_a = [int(c) for c in a_padded[::-1]]
        bits_b = [int(c) for c in b_padded[::-1]]
        steps_add = []
        res_bits = []
        for i in range(max_len):
            s = bits_a[i] + bits_b[i] + carry
            res_bits.append(s % 2)
            carry = s // 2
            steps_add.append(f"  bit {i}: {bits_a[i]} + {bits_b[i]} + carry({carry_before}) = {s}, result bit={s%2}, carry={s//2}")
        if carry:
            res_bits.append(carry)
            steps_add.append(f"  Final carry: {carry}")
        res_str = ''.join(str(b) for b in res_bits[::-1])
        result.add_step(
            "Bit-by-bit addition:",
            computation="\n".join(steps_add),
            value=res_str,
        )
        result.add_step(f"Final: {a} + {b} = {binary_result} (binary) = {decimal_result} (decimal)")
        result.result = binary_result

    elif operation in ("sub", "subtraction", "-"):
        if a_val < b_val:
            result.add_step(f"Note: {a_val} < {b_val}. Result will be negative.", value=None)
        decimal_result = a_val - b_val
        if decimal_result < 0:
            binary_result = "-" + _decimal_to_binary_str(abs(decimal_result))
        else:
            binary_result = _decimal_to_binary_str(decimal_result)
        result.add_step(
            "Subtraction: A - B = A - B (decimal), then convert back to binary.",
            formula="A - B → decimal → binary",
            computation=f"{a_val} - {b_val} = {decimal_result} → {binary_result}",
        )
        result.add_step(f"Final: {a} - {b} = {binary_result} (binary) = {decimal_result} (decimal)")
        result.result = binary_result

    elif operation in ("mul", "multiply", "*", "multiplication"):
        decimal_result = a_val * b_val
        binary_result = _decimal_to_binary_str(decimal_result)
        result.add_step(
            "Multiplication: A × B = A × B (decimal), then convert back to binary.",
            formula="A × B → decimal → binary",
            computation=f"{a_val} × {b_val} = {decimal_result} → {binary_result}",
        )
        result.add_step(f"Final: {a} × {b} = {binary_result} (binary) = {decimal_result} (decimal)")
        result.result = binary_result

    else:
        result.error = f"Unsupported operation: '{operation}'. Use add, sub, mul."
        return result

    result.success = True
    result.add_step("Verification: Convert result back to decimal.", value=decimal_result)
    return result


# =============================================================================
# boolean_simplify
# =============================================================================

@register_solver("boolean_simplify")
def boolean_simplify(expression: str) -> SolverResult:
    """
    Simplify a Boolean expression using SymPy.logic.
    Supports: AND (&), OR (|), NOT (~), XOR (^), IMPLIES (>>), EQUIVALENT (~).
    Use symbols: A, B, C, etc.
    """
    result = SolverResult(success=False, result=None)

    # Map common notations to SymPy
    expr = expression.strip()
    expr = expr.replace(" AND ", " & ").replace(" and ", " & ")
    expr = expr.replace(" OR ", " | ").replace(" or ", " | ")
    expr = expr.replace(" NOT ", " ~").replace(" not ", " ~")
    expr = expr.replace(" XOR ", " ^ ").replace(" xor ", " ^ ")
    expr = expr.replace(" IMPLIES ", " >> ").replace(" -> ", " >> ")
    expr = expr.replace(" EQUIV ", " Equivalent(").replace(" EQUIVALENT ", " Equivalent(")

    # Try to import sympy
    try:
        import sympy.logic.boolalg as boolalg
        from sympy import Symbol, simplify_logic
        from sympy.logic import SOPform
    except ImportError:
        result.error = "sympy not available. Install with: pip install sympy"
        return result

    result.add_step(
        "Normalized expression",
        formula=f"Input: {expression}",
        computation=f"Converted: {expr}",
    )

    try:
        sympy_expr = eval(expr, {"__builtins__": {}}, {
            "A": Symbol("A"), "B": Symbol("B"), "C": Symbol("C"),
            "D": Symbol("D"), "E": Symbol("E"), "F": Symbol("F"),
            "G": Symbol("G"), "H": Symbol("H"),
        })
    except Exception as e:
        result.error = f"Parse error: {e}"
        return result

    result.add_step(
        "Parse expression into SymPy symbols",
        formula=str(sympy_expr),
        value=str(sympy_expr),
    )

    # Apply simplification
    simplified = simplify_logic(sympy_expr, form="dnf")
    simplified_sop = simplify_logic(sympy_expr, form="cnf")

    result.add_step(
        "Apply Boolean algebra laws (De Morgan's, distributive, absorption, etc.)",
        formula="simplify_logic(expr)",
        computation=f"DNF: {simplified}\nCNF: {simplified_sop}",
        value=str(simplified),
    )

    # Show truth table
    symbols = sorted(sympy_expr.free_symbols, key=lambda s: s.name)
    result.add_step(
        "Generate truth table",
        formula="Evaluate expression for all input combinations",
    )

    truth_rows = []
    n = len(symbols)
    for i in range(2 ** n):
        bits = [(i >> (n - 1 - j)) & 1 for j in range(n)]
        subs = {symbols[j]: bool(bits[j]) for j in range(n)}
        val = bool(sympy_expr.subs(subs))
        truth_rows.append(f"  {bits} → {val}")

    result.add_step(
        "Truth table:",
        computation="\n".join(truth_rows),
        value=truth_rows,
    )

    result.add_step(f"Simplified (DNF): {simplified}", value=str(simplified))
    result.add_step(f"Simplified (CNF): {simplified_sop}", value=str(simplified_sop))

    result.result = {
        "original": str(sympy_expr),
        "simplified_dnf": str(simplified),
        "simplified_cnf": str(simplified_sop),
        "truth_table": truth_rows,
    }
    result.success = True
    return result


# =============================================================================
# truth_table
# =============================================================================

@register_solver("truth_table")
def truth_table(expression: str) -> SolverResult:
    """
    Generate a complete truth table for a Boolean expression.
    """
    result = SolverResult(success=False, result=None)
    expr_str = expression.strip()

    result.add_step(
        "Generate Truth Table",
        formula=f"Expression: {expression}",
    )

    try:
        from sympy import Symbol
        from sympy.logic.boolalg import Implies
        import sympy
    except ImportError:
        result.error = "sympy not available."
        return result

    # Normalize
    expr = expr_str.replace(" AND ", " & ").replace(" and ", " & ")
    expr = expr.replace(" OR ", " | ").replace(" or ", " | ")
    expr = expr.replace(" NOT ", " ~").replace(" not ", " ~")
    expr = expr.replace(" XOR ", " ^ ").replace(" xor ", " ^ ")
    expr = expr.replace(" -> ", " >> ").replace(" IMPLIES ", " >> ")

    try:
        sympy_expr = eval(expr, {"__builtins__": {}}, {
            "A": Symbol("A"), "B": Symbol("B"), "C": Symbol("C"),
            "D": Symbol("D"), "E": Symbol("E"), "F": Symbol("F"),
        })
    except Exception as e:
        result.error = f"Parse error: {e}"
        return result

    symbols = sorted(sympy_expr.free_symbols, key=lambda s: s.name)
    n = len(symbols)

    if n == 0:
        result.error = "No variables found in expression."
        return result

    result.add_step(
        f"Found {n} variables: {', '.join(str(s) for s in symbols)}",
        computation=f"Total rows: {2**n}",
    )

    header = " | ".join([str(s) for s in symbols] + [f"f({','.join(str(s) for s in symbols)})"])
    divider = "-+-".join(["---" for _ in symbols] + ["-----"])
    result.add_step(f"Header: {header}", computation=header)
    result.add_step(f"Divider: {divider}", computation=divider)

    rows = []
    true_count = 0
    false_count = 0

    for i in range(2 ** n):
        bits = [(i >> (n - 1 - j)) & 1 for j in range(n)]
        subs = {symbols[j]: bool(bits[j]) for j in range(n)}
        val = bool(sympy_expr.subs(subs))
        if val:
            true_count += 1
        else:
            false_count += 1
        row_str = " | ".join([str(b) for b in bits] + [str(int(val))])
        rows.append(row_str)

    result.add_step(
        "Truth Table rows:",
        computation="\n".join(rows),
        value=rows,
    )

    result.add_step(
        "Summary",
        computation=f"True count: {true_count}, False count: {false_count}",
        value={"true": true_count, "false": false_count},
    )

    result.result = {
        "headers": [str(s) for s in symbols] + ["Result"],
        "rows": rows,
        "true_count": true_count,
        "false_count": false_count,
    }
    result.success = True
    return result


# =============================================================================
# logic_gate_output
# =============================================================================

@register_solver("logic_gate_output")
def logic_gate_output(gate: str, inputs: List[int]) -> SolverResult:
    """
    Simulate a logic gate with given inputs.
    Supported gates: AND, OR, NOT, XOR, NAND, NOR, XNOR, BUFFER.
    """
    result = SolverResult(success=False, result=None)
    gate = gate.upper().strip()

    result.add_step(
        f"Logic Gate Simulation: {gate} gate",
        formula=f"Gate: {gate}, Inputs: {inputs}",
    )

    gate_truth = {
        "AND": lambda xs: 1 if all(x == 1 for x in xs) else 0,
        "OR": lambda xs: 1 if any(x == 1 for x in xs) else 0,
        "NOT": lambda xs: 0 if xs[0] == 1 else 1,
        "XOR": lambda xs: sum(xs) % 2,
        "NAND": lambda xs: 0 if all(x == 1 for x in xs) else 1,
        "NOR": lambda xs: 1 if all(x == 0 for x in xs) else 0,
        "XNOR": lambda xs: 1 if sum(xs) % 2 == 0 else 0,
        "BUFFER": lambda xs: xs[0],
    }

    if gate not in gate_truth:
        result.error = f"Unknown gate: {gate}. Supported: {list(gate_truth.keys())}"
        return result

    # Validate inputs
    for inp in inputs:
        if inp not in (0, 1):
            result.error = f"Gate inputs must be 0 or 1, got {inp}"
            return result

    # Special arity checks
    if gate == "NOT" and len(inputs) != 1:
        result.error = "NOT gate requires exactly 1 input."
        return result
    if gate in ("AND", "NAND") and len(inputs) < 2:
        result.error = f"{gate} gate requires at least 2 inputs."
        return result

    # Show truth table for the specific inputs
    result.add_step(
        f"Evaluating {gate}({', '.join(str(x) for x in inputs)})",
        computation=f"{gate}: f({', '.join(str(x) for x in inputs)})",
    )

    output = gate_truth[gate](inputs)

    # Show evaluation
    if gate == "AND":
        eval_str = " AND ".join(str(x) for x in inputs)
        eval_step = f"{eval_str} = {output}"
    elif gate == "OR":
        eval_str = " OR ".join(str(x) for x in inputs)
        eval_step = f"{eval_str} = {output}"
    elif gate == "NOT":
        eval_step = f"NOT {inputs[0]} = {output}"
    elif gate == "XOR":
        eval_step = f"XOR({', '.join(str(x) for x in inputs)}) = {output} (odd number of 1s)"
    elif gate == "NAND":
        eval_step = f"NOT(AND({', '.join(str(x) for x in inputs)})) = {output}"
    elif gate == "NOR":
        eval_step = f"NOT(OR({', '.join(str(x) for x in inputs)})) = {output}"
    elif gate == "XNOR":
        eval_step = f"NOT(XOR({', '.join(str(x) for x in inputs)})) = {output}"
    else:
        eval_step = f"BUFFER({inputs[0]}) = {output}"

    result.add_step("Evaluation:", computation=eval_step, value=output)
    result.add_step(f"Final Output: {output}", value=output)

    result.result = output
    result.success = True
    return result


# =============================================================================
# java_trace
# =============================================================================

@register_solver("java_trace")
def java_trace(code: str) -> SolverResult:
    """
    Trace Java method execution and show variable states at each step.
    Supports basic Java constructs: variable declaration, assignment,
    arithmetic, conditionals (if/else), loops (for, while).
    """
    result = SolverResult(success=False, result=None)

    result.add_step(
        "Java Code Tracing",
        formula="Simulating execution step-by-step",
        computation=code,
    )

    lines = code.strip().split("\n")
    # Clean up lines
    lines = [l.strip() for l in lines if l.strip() and not l.strip().startswith("//")]

    variables: Dict[str, Any] = {}
    output_lines: List[str] = []
    step_num = 0
    loop_depth = 0
    max_iterations = 100
    total_iterations = 0

    i = 0
    while i < len(lines) and total_iterations < max_iterations:
        total_iterations += 1
        line = lines[i]
        step_num += 1

        # Remove trailing semicolon for parsing
        clean = line.rstrip(";").strip()

        result.add_step(
            f"Step {step_num}: {line}",
            formula=clean,
        )

        # Variable declaration: int x = 5;
        decl_match = re.match(r'(int|float|double|long|char|boolean|String)\s+(\w+)\s*=\s*(.+?)$', clean)
        if decl_match:
            var_name = decl_match.group(2)
            var_val_str = decl_match.group(3).strip()

            # Evaluate value
            try:
                var_val = eval(var_val_str, {"__builtins__": {}}, {**variables})
            except:
                # Try with variables
                try:
                    var_val = eval(var_val_str, {"__builtins__": {}}, {**variables})
                except:
                    var_val = var_val_str

            variables[var_name] = var_val
            result.add_step(
                f"  Declare {var_name} = {var_val}",
                computation=f"variables['{var_name}'] = {var_val}",
                value={var_name: var_val},
            )
            i += 1
            continue

        # Assignment: x = x + 1;
        assign_match = re.match(r'(\w+)\s*=\s*(.+?)$', clean)
        if assign_match:
            var_name = assign_match.group(1)
            expr_str = assign_match.group(2).strip()

            try:
                var_val = eval(expr_str, {"__builtins__": {}}, {**variables})
            except:
                var_val = f"<error evaluating: {expr_str}>"

            variables[var_name] = var_val
            result.add_step(
                f"  Assign {var_name} = {var_val}",
                computation=f"variables['{var_name}'] = {expr_str} = {var_val}",
                value={var_name: var_val},
            )
            i += 1
            continue

        # Print statement: System.out.println(...)
        if "System.out.println" in clean or "System.out.print" in clean:
            print_match = re.search(r'System\.out\.(print|println)\s*\(\s*(.+?)\s*\)', clean)
            if print_match:
                print_val = print_match.group(2).strip()
                try:
                    evaluated = eval(print_val, {"__builtins__": {}}, {**variables})
                except:
                    evaluated = print_val.strip('"').strip("'")

                output_lines.append(str(evaluated))
                result.add_step(
                    f"  OUTPUT: {evaluated}",
                    computation=f"print({print_val}) → {evaluated}",
                    value=evaluated,
                )
            i += 1
            continue

        # If statement: if (condition) {
        if clean.startswith("if") or clean.startswith("else if"):
            cond_match = re.search(r'if\s*\((.+?)\)\s*\{?', clean)
            if cond_match:
                cond_str = cond_match.group(1).strip()
                # Normalize
                cond_str = cond_str.replace("&&", " and ").replace("||", " or ")
                cond_str = cond_str.replace("==", " ==").replace("!=", " !=")
                cond_str = cond_str.replace("<=", " <= ").replace(">=", " >= ")

                try:
                    cond_val = eval(cond_str, {"__builtins__": {}}, {**variables})
                except:
                    cond_val = False

                result.add_step(
                    f"  IF condition: ({cond_str}) → {bool(cond_val)}",
                    computation=cond_str,
                    value=bool(cond_val),
                )
                if not bool(cond_val):
                    # Skip to else or next
                    while i < len(lines) and not lines[i].strip().startswith("else"):
                        i += 1
                    if i < len(lines) and lines[i].strip().startswith("else"):
                        i += 1  # Process else block
                        continue
                i += 1
                continue

        # Else
        if clean == "else" or clean == "else {":
            result.add_step("  ELSE block executing", value="else")
            i += 1
            continue

        # Skip braces
        if clean in ("{", "}", "};", "{"):
            i += 1
            continue

        # Class / method declarations - skip
        if any(kw in clean for kw in ["public class", "public static void main", "class ", "static void"]):
            i += 1
            continue

        # For loop start - simplified
        if clean.startswith("for"):
            result.add_step(f"  FOR loop detected: {clean}", value="loop")
            i += 1
            continue

        # Increment/decrement
        inc_match = re.match(r'(\w+)\s*(\+\+|\-\-)$', clean)
        if inc_match:
            vname = inc_match.group(1)
            op = inc_match.group(2)
            if vname in variables:
                if op == "++":
                    variables[vname] += 1
                else:
                    variables[vname] -= 1
                result.add_step(
                    f"  {vname}{op} → {variables[vname]}",
                    computation=f"variables['{vname}'] {op}= 1",
                    value=variables[vname],
                )
            i += 1
            continue

        i += 1

    result.add_step(
        "Final Variable State",
        computation=str(variables),
        value=variables,
    )
    result.add_step(
        "All Output",
        computation="\n".join(output_lines) if output_lines else "(no output)",
        value=output_lines,
    )

    result.result = {
        "variables": variables,
        "output": output_lines,
        "total_steps": step_num,
    }
    result.success = True
    return result


# =============================================================================
# array_1d_ops
# =============================================================================

@register_solver("array_1d_ops")
def array_1d_ops(operation: str, array: List[int], element: Any = None,
                index: int = None, new_element: Any = None) -> SolverResult:
    """
    Perform 1D array operations:
    - display: show the array
    - search: linear search for element
    - insert: insert at index
    - delete: delete at index
    - sort_asc: bubble sort ascending
    - sort_desc: bubble sort descending
    - reverse: reverse the array
    - max/min: find maximum/minimum element
    - sum: sum of all elements
    - average: average of all elements
    """
    result = SolverResult(success=False, result=None)
    operation = operation.lower().strip()

    arr = list(array)  # work on a copy
    result.add_step(
        f"1D Array Operation: '{operation}'",
        formula=f"Array: {arr}",
        computation=f"Initial array: {arr}",
        value=arr.copy(),
    )

    if operation == "display":
        result.add_step("Display all elements:", computation=str(arr), value=arr)
        result.result = arr
        result.success = True

    elif operation == "search":
        if element is None:
            result.error = "Search requires 'element' parameter."
            return result
        result.add_step(f"Linear Search for element {element}", formula="Linear Search: O(n)")
        found = False
        found_idx = -1
        for idx, val in enumerate(arr):
            result.add_step(
                f"  Check index {idx}: arr[{idx}] = {val}",
                computation=f"arr[{idx}] == {element} → {val == element}",
            )
            if val == element:
                found = True
                found_idx = idx
                break
        if found:
            result.add_step(f"Element {element} found at index {found_idx}.", value=found_idx)
        else:
            result.add_step(f"Element {element} not found. Return -1.", value=-1)
        result.result = found_idx if found else -1
        result.success = True

    elif operation == "insert":
        if index is None or new_element is None:
            result.error = "Insert requires 'index' and 'new_element'."
            return result
        if index < 0 or index > len(arr):
            result.error = f"Index {index} out of bounds for array of length {len(arr)}."
            return result
        result.add_step(
            f"Insert {new_element} at index {index}",
            formula="Shift elements right from index",
            computation=f"arr[{index}:] shifted right, arr[{index}] = {new_element}",
        )
        arr.insert(index, new_element)
        result.add_step("Array after insertion:", computation=str(arr), value=arr)
        result.result = arr
        result.success = True

    elif operation == "delete":
        if index is None:
            result.error = "Delete requires 'index' parameter."
            return result
        if index < 0 or index >= len(arr):
            result.error = f"Index {index} out of bounds."
            return result
        result.add_step(
            f"Delete element at index {index} (value={arr[index]})",
            formula="Shift elements left from index+1",
            computation=f"Removed arr[{index}]={arr[index]}",
        )
        deleted = arr.pop(index)
        result.add_step("Array after deletion:", computation=str(arr), value=arr)
        result.result = {"deleted_element": deleted, "array": arr}
        result.success = True

    elif operation == "sort_asc":
        result.add_step("Bubble Sort (Ascending)", formula="O(n²) bubble sort")
        n = len(arr)
        for pass_num in range(n - 1):
            swapped = False
            for j in range(n - 1 - pass_num):
                result.add_step(
                    f"  Pass {pass_num+1}: Compare arr[{j}]={arr[j]} and arr[{j+1}]={arr[j+1]}",
                )
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True
                    result.add_step(
                        f"    Swap: {arr[j+1]} ↔ {arr[j]}",
                        computation=f"arr[{j}] ↔ arr[{j+1}]",
                    )
            if not swapped:
                break
        result.add_step("Sorted array (ascending):", computation=str(arr), value=arr)
        result.result = arr
        result.success = True

    elif operation == "sort_desc":
        result.add_step("Bubble Sort (Descending)", formula="O(n²) bubble sort")
        n = len(arr)
        for pass_num in range(n - 1):
            swapped = False
            for j in range(n - 1 - pass_num):
                if arr[j] < arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True
            if not swapped:
                break
        result.add_step("Sorted array (descending):", computation=str(arr), value=arr)
        result.result = arr
        result.success = True

    elif operation == "reverse":
        result.add_step("Reverse array", formula="Swap arr[i] ↔ arr[n-1-i] for i in range(n/2)")
        n = len(arr)
        for i in range(n // 2):
            arr[i], arr[n - 1 - i] = arr[n - 1 - i], arr[i]
            result.add_step(f"  Swap arr[{i}]={arr[n-1-i]} ↔ arr[{n-1-i}]={arr[i]}")
        result.add_step("Reversed array:", computation=str(arr), value=arr)
        result.result = arr
        result.success = True

    elif operation == "max":
        max_val = arr[0]
        max_idx = 0
        for idx, val in enumerate(arr):
            if val > max_val:
                max_val = val
                max_idx = idx
            result.add_step(f"  Check arr[{idx}]={val}, current max={max_val}")
        result.add_step(f"Maximum element: {max_val} at index {max_idx}", value=max_val)
        result.result = max_val
        result.success = True

    elif operation == "min":
        min_val = arr[0]
        min_idx = 0
        for idx, val in enumerate(arr):
            if val < min_val:
                min_val = val
                min_idx = idx
            result.add_step(f"  Check arr[{idx}]={val}, current min={min_val}")
        result.add_step(f"Minimum element: {min_val} at index {min_idx}", value=min_val)
        result.result = min_val
        result.success = True

    elif operation == "sum":
        total = 0
        for idx, val in enumerate(arr):
            total += val
            result.add_step(f"  arr[{idx}]={val}, running sum={total}")
        result.add_step(f"Sum of all elements: {total}", value=total)
        result.result = total
        result.success = True

    elif operation == "average":
        total = sum(arr)
        avg = total / len(arr) if arr else 0
        result.add_step(f"Sum = {total}, Count = {len(arr)}, Average = {total}/{len(arr)} = {avg}")
        result.add_step(f"Average: {avg}", value=avg)
        result.result = avg
        result.success = True

    else:
        result.error = f"Unsupported operation: '{operation}'"
        return result

    return result


# =============================================================================
# array_2d_ops
# =============================================================================

@register_solver("array_2d_ops")
def array_2d_ops(operation: str, matrix: List[List[int]],
                 row: int = None, col: int = None, element: Any = None) -> SolverResult:
    """
    Perform 2D array/matrix operations:
    - display: show the matrix
    - sum_row: sum of a row
    - sum_col: sum of a column
    - sum_diagonal: sum of main diagonal
    - transpose: transpose the matrix
    - add: add two matrices
    - search: search for element
    - row_count / col_count: dimensions
    """
    result = SolverResult(success=False, result=None)
    operation = operation.lower().strip()

    rows = len(matrix)
    cols = len(matrix[0]) if rows > 0 else 0

    result.add_step(
        f"2D Array Operation: '{operation}'",
        formula=f"Matrix: {rows}×{cols}",
        computation=f"Matrix: {matrix}",
        value={"rows": rows, "cols": cols},
    )

    if operation == "display":
        display_str = "\n".join(["  " + str(row) for row in matrix])
        result.add_step("Matrix display:", computation=display_str, value=matrix)
        result.result = matrix
        result.success = True

    elif operation == "sum_row":
        if row is None or row < 0 or row >= rows:
            result.error = f"Invalid row index: {row}. Valid: 0 to {rows-1}"
            return result
        r = matrix[row]
        total = sum(r)
        result.add_step(
            f"Sum of row {row}: {r}",
            computation=f"{' + '.join(str(x) for x in r)} = {total}",
            value=total,
        )
        result.result = total
        result.success = True

    elif operation == "sum_col":
        if col is None or col < 0 or col >= cols:
            result.error = f"Invalid column index: {col}. Valid: 0 to {cols-1}"
            return result
        col_vals = [matrix[r][col] for r in range(rows)]
        total = sum(col_vals)
        result.add_step(
            f"Sum of column {col}: {col_vals}",
            computation=f"{' + '.join(str(x) for x in col_vals)} = {total}",
            value=total,
        )
        result.result = total
        result.success = True

    elif operation == "sum_diagonal":
        if rows != cols:
            result.error = "Diagonal sum only for square matrices."
            return result
        diag = [matrix[i][i] for i in range(rows)]
        total = sum(diag)
        result.add_step(
            f"Main diagonal: {diag}",
            computation=f"{' + '.join(str(x) for x in diag)} = {total}",
            value=total,
        )
        result.result = total
        result.success = True

    elif operation == "transpose":
        result.add_step("Transpose: rows become columns", formula="T[i][j] = M[j][i]")
        transposed = [[matrix[j][i] for j in range(rows)] for i in range(cols)]
        result.add_step(
            "Transposed matrix:",
            computation="\n".join(["  " + str(r) for r in transposed]),
            value=transposed,
        )
        result.result = transposed
        result.success = True

    elif operation == "search":
        if element is None:
            result.error = "Search requires 'element' parameter."
            return result
        found = False
        for r in range(rows):
            for c in range(cols):
                result.add_step(
                    f"  Check matrix[{r}][{c}] = {matrix[r][c]}",
                )
                if matrix[r][c] == element:
                    result.add_step(
                        f"Found {element} at position ({r}, {c})",
                        value={"row": r, "col": c},
                    )
                    result.result = {"row": r, "col": c, "found": True}
                    result.success = True
                    return result
        result.add_step(f"Element {element} not found.", value={"found": False})
        result.result = {"found": False}
        result.success = True

    else:
        result.error = f"Unsupported 2D operation: '{operation}'"
        return result

    return result


# =============================================================================
# string_ops
# =============================================================================

@register_solver("string_ops")
def string_ops(operation: str, string: str, param: Any = None,
               start: int = None, end: int = None) -> SolverResult:
    """
    String manipulation operations:
    - length: string length
    - reverse: reverse the string
    - uppercase / lowercase: case conversion
    - substring: extract substring [start:end]
    - compare: compare two strings
    - count_char: count occurrences of a character
    - is_palindrome: check palindrome
    - replace: replace old with new
    - split: split by delimiter
    - concatenate: join two strings
    - vowel_count: count vowels
    - frequency: character frequency
    """
    result = SolverResult(success=False, result=None)
    operation = operation.lower().strip()

    result.add_step(
        f"String Operation: '{operation}'",
        formula=f"Input: '{string}'",
    )

    if operation == "length":
        length = len(string)
        result.add_step(f"Length of '{string}' = {length}", value=length)
        result.result = length
        result.success = True

    elif operation == "reverse":
        reversed_str = string[::-1]
        result.add_step(
            f"Reverse '{string}'",
            computation=f"'{string}'[::-1] = '{reversed_str}'",
            value=reversed_str,
        )
        result.result = reversed_str
        result.success = True

    elif operation == "uppercase":
        upper = string.upper()
        result.add_step(f"Uppercase: '{string}' → '{upper}'", value=upper)
        result.result = upper
        result.success = True

    elif operation == "lowercase":
        lower = string.lower()
        result.add_step(f"Lowercase: '{string}' → '{lower}'", value=lower)
        result.result = lower
        result.success = True

    elif operation == "substring":
        if start is None:
            start = 0
        if end is None:
            end = len(string)
        sub = string[start:end]
        result.add_step(
            f"Substring from {start} to {end}",
            formula=f"string[{start}:{end}]",
            computation=f"'{string}'[{start}:{end}] = '{sub}'",
            value=sub,
        )
        result.result = sub
        result.success = True

    elif operation == "compare":
        if param is None:
            result.error = "Compare requires second string in 'param'."
            return result
        other = str(param)
        comp = ""
        if string == other:
            comp = "equal"
        elif string > other:
            comp = "greater (lexicographically)"
        else:
            comp = "less (lexicographically)"
        result.add_step(
            f"Compare '{string}' with '{other}'",
            computation=f"'{string}' == '{other}' → {string == other}\n'{string}' > '{other}' → {string > other}",
            value=comp,
        )
        result.result = comp
        result.success = True

    elif operation == "count_char":
        if param is None:
            result.error = "count_char requires character in 'param'."
            return result
        char = str(param)[0]
        count = string.count(char)
        indices = [i for i, c in enumerate(string) if c == char]
        result.add_step(
            f"Count '{char}' in '{string}'",
            computation=f"Found at indices: {indices}\nTotal count: {count}",
            value={"count": count, "indices": indices},
        )
        result.result = {"count": count, "indices": indices}
        result.success = True

    elif operation == "is_palindrome":
        cleaned = ''.join(c.lower() for c in string if c.isalnum())
        is_pal = cleaned == cleaned[::-1]
        result.add_step(
            f"Check if '{string}' is palindrome",
            formula="Remove non-alphanumeric, lower case, check = reverse",
            computation=f"Cleaned: '{cleaned}'\nReversed: '{cleaned[::-1]}'\nIs palindrome: {is_pal}",
            value=is_pal,
        )
        result.result = is_pal
        result.success = True

    elif operation == "replace":
        if param is None:
            result.error = "Replace requires 'param' as 'old|new'."
            return result
        parts = str(param).split("|")
        if len(parts) != 2:
            result.error = "Replace param format: 'old|new'"
            return result
        old_str, new_str = parts[0], parts[1]
        replaced = string.replace(old_str, new_str)
        result.add_step(
            f"Replace '{old_str}' with '{new_str}' in '{string}'",
            computation=f"'{string}'.replace('{old_str}', '{new_str}') = '{replaced}'",
            value=replaced,
        )
        result.result = replaced
        result.success = True

    elif operation == "split":
        if param is None:
            delimiter = ""
        else:
            delimiter = str(param)
        parts = string.split(delimiter) if delimiter else list(string)
        result.add_step(
            f"Split '{string}' by '{delimiter}'",
            computation=str(parts),
            value=parts,
        )
        result.result = parts
        result.success = True

    elif operation == "concatenate":
        if param is None:
            result.error = "Concatenate requires second string in 'param'."
            return result
        other = str(param)
        combined = string + other
        result.add_step(
            f"Concatenate '{string}' + '{other}'",
            computation=f"'{string}' + '{other}' = '{combined}'",
            value=combined,
        )
        result.result = combined
        result.success = True

    elif operation == "vowel_count":
        vowels = "aeiouAEIOU"
        vowel_chars = [c for c in string if c in vowels]
        result.add_step(
            f"Count vowels in '{string}'",
            computation=f"Vowels found: {vowel_chars}\nCount: {len(vowel_chars)}",
            value={"count": len(vowel_chars), "vowels": vowel_chars},
        )
        result.result = {"count": len(vowel_chars), "vowels": vowel_chars}
        result.success = True

    elif operation == "frequency":
        freq = {}
        for c in string:
            freq[c] = freq.get(c, 0) + 1
        result.add_step(
            f"Character frequency in '{string}'",
            computation=str(freq),
            value=freq,
        )
        result.result = freq
        result.success = True

    else:
        result.error = f"Unsupported string operation: '{operation}'"
        return result

    return result


# =============================================================================
# method_call
# =============================================================================

@register_solver("method_call")
def method_call(methods: List[Dict[str, Any]]) -> SolverResult:
    """
    Simulate method/function call stack for ISC-style Java questions.
    Each method dict has: name, params, return_value (optional), calls (list of called method names).

    Simulates call stack, parameter passing, return value propagation.
    """
    result = SolverResult(success=False, result=None)

    result.add_step(
        "Method Call Simulation",
        formula="Simulating call stack with parameter passing and return values",
    )

    call_stack: List[Dict[str, Any]] = []
    call_log: List[str] = []
    variables: Dict[str, Any] = {}
    return_values: Dict[str, Any] = {}
    method_defs = {m["name"]: m for m in methods}

    call_order = 0

    def simulate_call(method_name: str, params: Dict[str, Any], depth: int = 0):
        nonlocal call_order
        if method_name not in method_defs:
            return f"ERROR: Method '{method_name}' not found."

        mdef = method_defs[method_name]
        indent = "  " * depth
        call_order += 1
        order = call_order

        call_log.append(f"[{order}] CALL {method_name}({', '.join(f'{k}={v}' for k, v in params.items())})")
        result.add_step(
            f"{indent}→ Call #{order}: {method_name}({', '.join(f'{k}={v}' for k, v in params.items())})",
            computation=f"Call stack push: {method_name}",
            value={"call": method_name, "params": params},
        )

        # Set local parameters
        local_vars = dict(params)
        call_stack.append({"name": method_name, "vars": local_vars})

        # Execute body (simulate with step-by-step)
        body_steps = mdef.get("body_steps", [])
        ret_val = mdef.get("return_value", None)

        for step in body_steps:
            step_type = step.get("type", "assign")
            if step_type == "assign":
                var = step["var"]
                val_expr = step["value"]
                if isinstance(val_expr, str) and val_expr in local_vars:
                    val = local_vars[val_expr]
                else:
                    val = val_expr
                local_vars[var] = val
                result.add_step(
                    f"{indent}  {method_name}: {var} = {val}",
                    computation=f"{var} ← {val}",
                )
            elif step_type == "return":
                ret_val = step.get("value")
                if isinstance(ret_val, str) and ret_val in local_vars:
                    ret_val = local_vars[ret_val]
                result.add_step(
                    f"{indent}  {method_name}: return {ret_val}",
                    computation=f"return {ret_val}",
                )

        return_values[method_name] = ret_val

        # Handle nested calls
        if "calls" in mdef and mdef["calls"]:
            for called in mdef["calls"]:
                call_params = mdef.get("call_params", {}).get(called, {})
                result.add_step(
                    f"{indent}  {method_name} calls {called}({call_params})",
                )
                nested_result = simulate_call(called, call_params, depth + 1)
                if isinstance(nested_result, str) and nested_result.startswith("ERROR"):
                    return nested_result

        call_stack.pop()
        call_log.append(f"[{order}] RETURN {method_name} = {ret_val}")
        result.add_step(
            f"{indent}← Return #{order}: {method_name} returns {ret_val}",
            computation=f"Pop {method_name} from call stack",
            value={"return": method_name, "value": ret_val},
        )

        return ret_val

    # Find the entry method (first one or explicitly marked)
    entry = methods[0]["name"] if methods else None
    entry_params = methods[0].get("params", {}) if methods else {}

    if entry:
        final_result = simulate_call(entry, entry_params)
        result.add_step(
            "Call Stack Trace Summary",
            computation="\n".join(call_log),
            value=call_log,
        )
        result.add_step(
            "Final Return Value",
            computation=f"{entry}() → {final_result}",
            value=final_result,
        )
        result.result = {
            "return_value": final_result,
            "call_log": call_log,
            "return_values": return_values,
        }
        result.success = True
    else:
        result.error = "No methods provided."

    return result


# =============================================================================
# complexity_analysis
# =============================================================================

@register_solver("complexity_analysis")
def complexity_analysis(code_snippet: str) -> SolverResult:
    """
    Analyze time and space complexity of a code snippet.
    Detects: O(1), O(n), O(n²), O(n³), O(log n), O(n log n), O(2^n), O(n!).
    """
    result = SolverResult(success=False, result=None)

    result.add_step(
        "Complexity Analysis",
        formula="Analyze loops, recursion, and data structure operations",
        computation=code_snippet,
    )

    code = code_snippet.lower().strip()
    lines = [l.strip() for l in code.split("\n") if l.strip()]

    # Count loop structures
    loop_count = 0
    nested_loop_count = 0
    has_recursion = False
    has_binary_search = False
    has_merge_sort = False
    has_quick_sort = False
    has_fibonacci_recursion = False
    max_loop_depth = 0
    loop_depths: List[int] = []

    for line in lines:
        # For loops
        for_loops = len(re.findall(r'\bfor\s*\(', line))
        # While loops
        while_loops = len(re.findall(r'\bwhile\s*\(', line))

        loop_count += for_loops + while_loops

        if for_loops + while_loops > 0:
            loop_depths.append(for_loops + while_loops)

        # Check for binary search (divide by 2 / mid)
        if "mid" in line or "/ 2" in line or "// 2" in line:
            has_binary_search = True

        # Check for merge sort
        if "mergesort" in line or "merge_sort" in line or "merge(" in line:
            has_merge_sort = True

        # Check for quick sort
        if "quicksort" in line or "quick_sort" in line or "partition" in line:
            has_quick_sort = True

        # Check for fibonacci
        if "fibonacci" in line or "fib(" in line:
            has_fibonacci_recursion = True

        # Check for self-call (recursion)
        # Simple heuristic: method name appears on both sides
        func_match = re.search(r'(\w+)\s*\(', line)
        if func_match:
            func_name = func_match.group(1)
            # Count occurrences
            if line.count(func_name + "(") > 1:
                has_recursion = True

    max_loop_depth = max(loop_depths) if loop_depths else 0

    result.add_step(
        "Detected Patterns:",
        computation=f"Total loops: {loop_count}\nMax nesting depth: {max_loop_depth}\n"
                    f"Binary search: {has_binary_search}\nMerge sort: {has_merge_sort}\n"
                    f"Quick sort: {has_quick_sort}\nFibonacci recursion: {has_fibonacci_recursion}\n"
                    f"Generic recursion: {has_recursion}",
    )

    # Determine time complexity
    time_complexity = "O(1)"
    space_complexity = "O(1)"

    if has_fibonacci_recursion and not loop_count:
        time_complexity = "O(2^n)"
        space_complexity = "O(n)"
        reason = "Naive Fibonacci has two recursive calls per invocation → O(2^n) time, O(n) stack."
    elif has_recursion and loop_count == 0:
        time_complexity = "O(2^n)"
        space_complexity = "O(n)"
        reason = "Simple recursion (no memoization) → O(2^n)."
    elif has_merge_sort:
        time_complexity = "O(n log n)"
        space_complexity = "O(n)"
        reason = "Merge Sort: divide-and-conquer, O(n log n) time, O(n) auxiliary space."
    elif has_quick_sort:
        time_complexity = "O(n log n) avg / O(n²) worst"
        space_complexity = "O(log n) avg"
        reason = "Quick Sort: O(n log n) average, O(n²) worst case."
    elif has_binary_search and loop_count <= 1:
        time_complexity = "O(log n)"
        space_complexity = "O(1)"
        reason = "Binary search halves the search space each step → O(log n)."
    elif max_loop_depth == 3:
        time_complexity = "O(n³)"
        space_complexity = "O(1)"
        reason = "Three nested loops over n → O(n³)."
    elif max_loop_depth == 2:
        time_complexity = "O(n²)"
        space_complexity = "O(1)"
        reason = "Two nested loops over n → O(n²)."
    elif max_loop_depth == 1:
        time_complexity = "O(n)"
        space_complexity = "O(1)"
        reason = "Single loop over n → O(n)."
    elif loop_count == 0:
        time_complexity = "O(1)"
        space_complexity = "O(1)"
        reason = "No loops or recursion → constant time."
    else:
        time_complexity = f"O(n^{max_loop_depth})"
        space_complexity = "O(1)"
        reason = f"Based on {max_loop_depth} nested loop levels."

    # Check for additional data structures
    if "array" in code or "list" in code or "[]" in code:
        space_complexity = f"O(n) [data structures used]"

    result.add_step(
        "Time Complexity Analysis",
        formula="Count loop nesting, detect known algorithms",
        computation=reason,
        value=time_complexity,
    )

    result.add_step(
        "Space Complexity Analysis",
        formula="Count auxiliary data structures and recursion depth",
        computation=reason,
        value=space_complexity,
    )

    result.add_step(
        "Final Complexity",
        formula=f"T(n) = {time_complexity}, S(n) = {space_complexity}",
        value={"time": time_complexity, "space": space_complexity},
    )

    result.result = {
        "time_complexity": time_complexity,
        "space_complexity": space_complexity,
        "reasoning": reason,
        "loop_count": loop_count,
        "max_nesting": max_loop_depth,
        "has_recursion": has_recursion,
    }
    result.success = True
    return result


# =============================================================================
# Run self-tests when executed directly
# =============================================================================

def _run_self_tests():
    """Quick self-test of all registered solvers."""
    print("=" * 60)
    print("ISC Class 11 CS Solver - Self Tests")
    print("=" * 60)

    tests = [
        ("binary_convert", binary_convert, ("42", "decimal", "binary")),
        ("binary_convert", binary_convert, ("101010", "binary", "decimal")),
        ("octal_convert", octal_convert, ("52", "octal", "binary")),
        ("hex_convert", hex_convert, ("2A", "hexadecimal", "decimal")),
        ("binary_arithmetic", binary_arithmetic, ("1010", "0101", "add")),
        ("binary_arithmetic", binary_arithmetic, ("1111", "0011", "sub")),
        ("boolean_simplify", boolean_simplify, ("A AND (A OR B)")),
        ("boolean_simplify", boolean_simplify, ("NOT (A AND B)")),
        ("truth_table", truth_table, ("A AND B")),
        ("truth_table", truth_table, ("A OR B")),
        ("logic_gate_output", logic_gate_output, ("AND", [1, 1])),
        ("logic_gate_output", logic_gate_output, ("XOR", [1, 0])),
        ("java_trace", java_trace, ("""
            int x = 5;
            int y = x + 3;
            System.out.println(y);
        """,)),
        ("array_1d_ops", array_1d_ops, ("search", [10, 20, 30, 40, 50], 30)),
        ("array_1d_ops", array_1d_ops, ("sort_asc", [5, 3, 8, 1, 2])),
        ("array_1d_ops", array_1d_ops, ("insert", [1, 2, 4, 5], None, 2, 3)),
        ("array_1d_ops", array_1d_ops, ("max", [3, 7, 2, 9, 1])),
        ("array_2d_ops", array_2d_ops, ("sum_diagonal", [[1, 2, 3], [4, 5, 6], [7, 8, 9]])),
        ("array_2d_ops", array_2d_ops, ("transpose", [[1, 2], [3, 4]])),
        ("string_ops", string_ops, ("is_palindrome", "racecar")),
        ("string_ops", string_ops, ("reverse", "hello")),
        ("string_ops", string_ops, ("vowel_count", "education")),
        ("method_call", method_call, ([
            {
                "name": "main",
                "params": {},
                "body_steps": [
                    {"type": "assign", "var": "a", "value": 10},
                    {"type": "assign", "var": "b", "value": 20},
                    {"type": "assign", "var": "c", "value": "a + b"},
                ],
                "return_value": "c",
            }
        ],)),
        ("complexity_analysis", complexity_analysis, ("""
            for i in range(n):
                for j in range(n):
                    print(i, j)
        """,)),
    ]

    passed = 0
    failed = 0
    for name, func, args in tests:
        try:
            res = func(*args)
            status = "✓ PASS" if res.success else "✗ FAIL"
            if res.success:
                passed += 1
            else:
                failed += 1
            print(f"  {status}: {name} → {res.result}")
        except Exception as e:
            failed += 1
            print(f"  ✗ ERROR: {name} → {e}")

    print("=" * 60)
    print(f"Results: {passed} passed, {failed} failed out of {passed + failed}")
    print(f"Registry: {list(SOLVER_REGISTRY.keys())}")
    print("=" * 60)


if __name__ == "__main__":
    _run_self_tests()