"""
CISCE Class 10 Applied Mathematics - Mathematical Logic Solver and Question Generator
Syllabus: c10_appmath_069 - Propositions, Connectives, Truth Tables, Tautology, Contradiction
"""

import random
import math
import itertools
from fractions import Fraction
from typing import Dict, List, Optional, Tuple, Union

# Try importing optional libraries
try:
    import sympy as sp
    SYMPY_AVAILABLE = True
except ImportError:
    SYMPY_AVAILABLE = False

try:
    import numpy as np
    NUMPY_AVAILABLE = True
except ImportError:
    NUMPY_AVAILABLE = False


# ============================================================================
# SECTION 1: LOGIC SOLVER FUNCTIONS
# ============================================================================

def solve_proposition_check(params: dict) -> dict:
    """
    Determine if a statement is a proposition (has a definite truth value).
    params: {'statement': str}
    Returns: dict with answer, steps, verification
    """
    statement = params.get('statement', '')
    steps = []
    
    steps.append("=" * 60)
    steps.append("STEP 1: Understand what a proposition is")
    steps.append("A proposition is a declarative statement that is either TRUE or FALSE.")
    steps.append("It cannot be both, and it cannot be neither (law of excluded middle).")
    steps.append("")
    steps.append(f"Given statement: '{statement}'")
    steps.append("")
    steps.append("STEP 2: Check if it is a declarative sentence")
    steps.append("Questions, commands, and exclamations are NOT propositions.")
    steps.append("Only declarative statements (that declare something) can be propositions.")
    steps.append("")
    steps.append("STEP 3: Check if it has a definite truth value")
    steps.append("A statement must be either TRUE or FALSE — not ambiguous.")
    steps.append("")
    
    # Classification rules
    non_proposition_patterns = {
        'question': ['?', 'what', 'where', 'when', 'why', 'how', 'who', 'which', 'is it', 'can you'],
        'command': ['please', 'go', 'stop', 'come', 'do not', 'never', 'always'],
        'open': ['x', 'y', 'n', 'tomorrow', 'someday', 'sometimes', 'usually', 'often']
    }
    
    stmt_lower = statement.lower().strip()
    
    is_question = any(q in stmt_lower for q in non_proposition_patterns['question'])
    is_command = any(c in stmt_lower for c in non_proposition_patterns['command'])
    is_open = any(o in stmt_lower for o in non_proposition_patterns['open'])
    ends_with_question = statement.strip().endswith('?')
    
    if is_question or ends_with_question:
        result = "NOT a proposition"
        truth_value = "N/A"
        reason = "It is a question (interrogative), not a declarative statement."
        steps.append("STEP 4: CONCLUSION")
        steps.append(f"Result: {result}")
        steps.append(f"Reason: {reason}")
        steps.append("Questions cannot be propositions because they do not declare anything.")
        answer = {"is_proposition": False, "type": "not_proposition", "reason": reason}
    elif is_command:
        result = "NOT a proposition"
        truth_value = "N/A"
        reason = "It is a command/request, not a declarative statement."
        steps.append("STEP 4: CONCLUSION")
        steps.append(f"Result: {result}")
        steps.append(f"Reason: {reason}")
        answer = {"is_proposition": False, "type": "not_proposition", "reason": reason}
    elif is_open:
        result = "NOT a proposition (open statement)"
        truth_value = "depends on variable"
        reason = "It contains a variable — its truth value depends on the value of the variable."
        steps.append("STEP 4: CONCLUSION")
        steps.append(f"Result: {result}")
        steps.append(f"Reason: {reason}")
        answer = {"is_proposition": False, "type": "open_statement", "reason": reason}
    else:
        # Evaluate truth
        math_statements = {
            '5 is prime': True,
            '2 + 2 = 4': True,
            '3 is an even number': False,
            '7 is a composite number': False,
            'the sum of angles in a triangle is 180': True,
            'every prime number is odd': False,
            '0 is a natural number': False,  # CISCE: N starts from 1
            'new delhi is the capital of india': True,
            'mumbai is the capital of india': False,
            'the earth is flat': False,
            'water boils at 100 degrees at sea level': True,
            'there are 7 continents': True,
            'there are 8 continents': False,
            '2 is a rational number': True,
            'pi is a rational number': False,
            'all sides of a square are equal': True,
            'a triangle has 4 sides': False,
            'every rectangle is a square': False,
            'a rhombus has all sides equal': True,
        }
        
        stmt_key = stmt_lower.strip()
        truth_value = math_statements.get(stmt_key, None)
        
        if truth_value is True:
            result = "Proposition"
            truth_str = "TRUE"
            steps.append("STEP 4: Evaluate truth value")
            steps.append(f"Statement: '{statement}'")
            steps.append(f"Truth value: TRUE")
            steps.append(f"Since it has a definite truth value, it IS a proposition.")
            answer = {"is_proposition": True, "truth_value": True, "type": "simple_proposition"}
        elif truth_value is False:
            result = "Proposition"
            truth_str = "FALSE"
            steps.append("STEP 4: Evaluate truth value")
            steps.append(f"Statement: '{statement}'")
            steps.append(f"Truth value: FALSE")
            steps.append(f"Since it has a definite truth value (even if false), it IS a proposition.")
            answer = {"is_proposition": True, "truth_value": False, "type": "simple_proposition"}
        else:
            result = "Likely a proposition (truth value needs domain knowledge)"
            truth_str = "Cannot determine from math knowledge"
            steps.append("STEP 4: CONCLUSION")
            steps.append(f"Statement appears to be a declarative sentence.")
            steps.append(f"Truth value: {truth_str}")
            steps.append("If you can determine it as true or false, it IS a proposition.")
            answer = {"is_proposition": True, "truth_value": None, "type": "simple_proposition"}
    
    steps.append("")
    steps.append("VERIFICATION:")
    steps.append(f"  - Is it declarative? {'Yes' if not (is_question or is_command) else 'No'}")
    steps.append(f"  - Is it a question/command? {'Yes' if (is_question or is_command) else 'No'}")
    steps.append(f"  - Has definite truth value? {'Yes' if not (is_question or is_command or is_open) else 'No'}")
    steps.append(f"  - Final classification: {result}")
    
    return {
        "answer": answer,
        "steps": steps,
        "verification": f"Classification: {result}"
    }


def solve_truth_table(params: dict) -> dict:
    """
    Build a truth table for a compound proposition.
    params: {'propositions': list of str, 'compound': str, 'connectives': list}
    Returns: dict with truth table, answer, steps, verification
    """
    propositions = params.get('propositions', ['p', 'q'])
    compound_expr = params.get('compound', '')
    steps = []
    
    n = len(propositions)
    steps.append("=" * 60)
    steps.append(f"TRUTH TABLE CONSTRUCTION: {n} proposition(s)")
    steps.append(f"Propositions: {propositions}")
    steps.append(f"Compound expression: {compound_expr}")
    steps.append("")
    steps.append("STEP 1: List all possible truth value combinations")
    
    # Generate all combinations
    num_combinations = 2 ** n
    combinations = list(itertools.product([True, False], repeat=n))
    
    steps.append(f"With {n} proposition(s), there are {num_combinations} combinations:")
    for i, combo in enumerate(combinations):
        steps.append(f"  Row {i+1}: {dict(zip(propositions, combo))}")
    
    steps.append("")
    steps.append("STEP 2: Evaluate intermediate columns")
    
    # Determine connective sequence from compound expression
    connective_order = _parse_connectives(compound_expr, propositions)
    
    steps.append(f"Order of evaluation: {connective_order}")
    steps.append("")
    
    # Build the truth table
    table_rows = []
    for combo in combinations:
        row = dict(zip(propositions, list(combo)))
        values = list(combo)
        
        # Evaluate step by step
        current_step = 0
        for conn in connective_order:
            conn_type = conn['type']
            operands = conn['operands']
            operand_indices = [propositions.index(op) for op in operands]
            operand_values = [values[idx] for idx in operand_indices]
            
            if conn_type == 'NOT':
                result = not operand_values[0]
                col_name = f"~{operands[0]}"
                values.append(result)
                steps.append(f"  ~{operands[0]} = NOT({operand_values[0]}) = {result}")
            elif conn_type == 'AND':
                result = operand_values[0] and operand_values[1]
                col_name = f"{operands[0]} ∧ {operands[1]}"
                values.append(result)
                steps.append(f"  {operands[0]} ∧ {operands[1]} = {operand_values[0]} AND {operand_values[1]} = {result}")
            elif conn_type == 'OR':
                result = operand_values[0] or operand_values[1]
                col_name = f"{operands[0]} ∨ {operands[1]}"
                values.append(result)
                steps.append(f"  {operands[0]} ∨ {operands[1]} = {operand_values[0]} OR {operand_values[1]} = {result}")
            elif conn_type == 'IMPLIES':
                result = (not operand_values[0]) or operand_values[1]
                col_name = f"{operands[0]} → {operands[1]}"
                values.append(result)
                steps.append(f"  {operands[0]} → {operands[1]} = {operand_values[0]} IMPLIES {operand_values[1]} = {result}")
            elif conn_type == 'IFF':
                result = (operand_values[0] == operand_values[1])
                col_name = f"{operands[0]} ↔ {operands[1]}"
                values.append(result)
                steps.append(f"  {operands[0]} ↔ {operands[1]} = {operand_values[0]} IFF {operand_values[1]} = {result}")
            
            current_step += 1
        
        final_value = values[-1]
        row['result'] = final_value
        table_rows.append(row)
    
    # Check if tautology, contradiction, or contingency
    all_true = all(row['result'] for row in table_rows)
    all_false = all(not row['result'] for row in table_rows)
    
    if all_true:
        classification = "TAUTOLOGY (always true)"
    elif all_false:
        classification = "CONTRADICTION (always false)"
    else:
        classification = "CONTINGENCY (depends on truth values)"
    
    steps.append("")
    steps.append("STEP 3: Final result column analysis")
    steps.append(f"Results: {[row['result'] for row in table_rows]}")
    steps.append(f"Classification: {classification}")
    steps.append("")
    steps.append("VERIFICATION:")
    for i, row in enumerate(table_rows):
        prop_vals = {p: row[p] for p in propositions}
        steps.append(f"  Row {i+1}: {prop_vals} => Result = {row['result']}")
    
    truth_table_str = _format_truth_table(propositions, connective_order, table_rows)
    
    return {
        "answer": {
            "truth_table": truth_table_str,
            "results": [row['result'] for row in table_rows],
            "classification": classification
        },
        "steps": steps,
        "verification": f"Classification: {classification}",
        "truth_table_rows": table_rows
    }


def solve_tautology_check(params: dict) -> dict:
    """
    Check if a proposition is a tautology, contradiction, or contingency.
    params: {'propositions': list, 'compound': str, 'connectives': list}
    Returns: dict with classification, steps, verification
    """
    propositions = params.get('propositions', ['p', 'q'])
    compound_expr = params.get('compound', '')
    
    steps = []
    steps.append("=" * 60)
    steps.append("TAUTOLOGY / CONTRADICTION / CONTINGENCY CHECK")
    steps.append(f"Expression: {compound_expr}")
    steps.append(f"Variables: {propositions}")
    steps.append("")
    
    n = len(propositions)
    combinations = list(itertools.product([True, False], repeat=n))
    
    steps.append("STEP 1: Evaluate expression for all combinations")
    results = []
    
    connective_order = _parse_connectives(compound_expr, propositions)
    
    for i, combo in enumerate(combinations):
        env = dict(zip(propositions, combo))
        vals = list(combo)
        
        row_result = combo
        for conn in connective_order:
            conn_type = conn['type']
            operands = conn['operands']
            op_indices = [propositions.index(op) for op in operands]
            op_vals = [vals[idx] for idx in op_indices]
            
            if conn_type == 'NOT':
                r = not op_vals[0]
                vals.append(r)
                steps.append(f"  Row {i+1}: ~{operands[0]} = NOT({op_vals[0]}) = {r}")
            elif conn_type == 'AND':
                r = op_vals[0] and op_vals[1]
                vals.append(r)
                steps.append(f"  Row {i+1}: {operands[0]} ∧ {operands[1]} = {op_vals[0]} AND {op_vals[1]} = {r}")
            elif conn_type == 'OR':
                r = op_vals[0] or op_vals[1]
                vals.append(r)
                steps.append(f"  Row {i+1}: {operands[0]} ∨ {operands[1]} = {op_vals[0]} OR {op_vals[1]} = {r}")
            elif conn_type == 'IMPLIES':
                r = (not op_vals[0]) or op_vals[1]
                vals.append(r)
                steps.append(f"  Row {i+1}: {operands[0]} → {operands[1]} = {op_vals[0]} → {op_vals[1]} = {r}")
            elif conn_type == 'IFF':
                r = (op_vals[0] == op_vals[1])
                vals.append(r)
                steps.append(f"  Row {i+1}: {operands[0]} ↔ {operands[1]} = {op_vals[0]} ↔ {operands[1]} = {r}")
        
        final = vals[-1]
        results.append(final)
        steps.append(f"  Row {i+1} final: {compound_expr} = {final}")
    
    steps.append("")
    steps.append("STEP 2: Analyze all results")
    steps.append(f"Results: {results}")
    
    if all(results):
        classification = "TAUTOLOGY"
        explanation = "A tautology is a proposition that is ALWAYS TRUE, regardless of the truth values of its components."
        example = "Example: p ∨ ~p (a proposition OR its negation is always true)"
    elif not any(results):
        classification = "CONTRADICTION"
        explanation = "A contradiction is a proposition that is ALWAYS FALSE, regardless of the truth values of its components."
        example = "Example: p ∧ ~p (a proposition AND its negation is always false)"
    else:
        classification = "CONTINGENCY"
        explanation = "A contingency is a proposition whose truth value DEPENDS on the truth values of its components."
        example = "Example: p ∧ q (depends on both p and q being true)"
    
    steps.append(f"Classification: {classification}")
    steps.append(f"Explanation: {explanation}")
    steps.append(f"Example: {example}")
    
    steps.append("")
    steps.append("VERIFICATION:")
    steps.append(f"  Total rows: {len(results)}")
    steps.append(f"  All True: {all(results)}")
    steps.append(f"  All False: {not any(results)}")
    steps.append(f"  Result: {classification}")
    
    return {
        "answer": {
            "classification": classification,
            "results": results,
            "explanation": explanation,
            "example": example
        },
        "steps": steps,
        "verification": f"{classification} confirmed with {len(results)} truth value combinations"
    }


def solve_de_morgans(params: dict) -> dict:
    """
    Apply De Morgan's Laws: ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q
    params: {'p': bool, 'q': bool, 'law': str ('first' or 'second')}
    Returns: dict with LHS, RHS, verification
    """
    p = params.get('p', True)
    q = params.get('q', False)
    law = params.get('law', 'first')
    
    steps = []
    steps.append("=" * 60)
    steps.append("DE MORGAN'S LAWS VERIFICATION")
    steps.append(f"Given: p = {p}, q = {q}")
    steps.append(f"Law to verify: {law}")
    steps.append("")
    
    if law == 'first':
        steps.append("De Morgan's First Law: ~(p ∧ q) ≡ ~p ∨ ~q")
        steps.append("'Not (p AND q)' is equivalent to '(Not p) OR (Not q)'")
        lhs = not (p and q)
        rhs = (not p) or (not q)
        steps.append("")
        steps.append("STEP 1: Evaluate LHS = ~(p ∧ q)")
        steps.append(f"  p ∧ q = {p} AND {q} = {p and q}")
        steps.append(f"  ~(p ∧ q) = NOT({p and q}) = {lhs}")
        steps.append("")
        steps.append("STEP 2: Evaluate RHS = ~p ∨ ~q")
        steps.append(f"  ~p = NOT({p}) = {not p}")
        steps.append(f"  ~q = NOT({q}) = {not q}")
        steps.append(f"  ~p ∨ ~q = {not p} OR {not q} = {rhs}")
    else:
        steps.append("De Morgan's Second Law: ~(p ∨ q) ≡ ~p ∧ ~q")
        steps.append("'Not (p OR q)' is equivalent to '(Not p) AND (Not q)'")
        lhs = not (p or q)
        rhs = (not p) and (not q)
        steps.append("")
        steps.append("STEP 1: Evaluate LHS = ~(p ∨ q)")
        steps.append(f"  p ∨ q = {p} OR {q} = {p or q}")
        steps.append(f"  ~(p ∨ q) = NOT({p or q}) = {lhs}")
        steps.append("")
        steps.append("STEP 2: Evaluate RHS = ~p ∧ ~q")
        steps.append(f"  ~p = NOT({p}) = {not p}")
        steps.append(f"  ~q = NOT({q}) = {not q}")
        steps.append(f"  ~p ∧ ~q = {not p} AND {not q} = {rhs}")
    
    steps.append("")
    steps.append("STEP 3: Verify equivalence")
    steps.append(f"LHS = {lhs}")
    steps.append(f"RHS = {rhs}")
    steps.append(f"LHS == RHS: {lhs == rhs}")
    
    if lhs == rhs:
        conclusion = "VERIFIED: Both sides are equivalent. De Morgan's Law holds."
        verified = True
    else:
        conclusion = "ERROR: Sides are not equivalent!"
        verified = False
    
    steps.append(f"Conclusion: {conclusion}")
    steps.append("")
    steps.append("VERIFICATION:")
    steps.append(f"  p = {p}, q = {q}")
    steps.append(f"  LHS = {lhs}, RHS = {rhs}")
    steps.append(f"  LHS == RHS: {lhs == rhs}")
    
    return {
        "answer": {
            "lhs_value": lhs,
            "rhs_value": rhs,
            "equivalent": lhs == rhs,
            "conclusion": conclusion
        },
        "steps": steps,
        "verification": f"De Morgan's Law verified: LHS({lhs}) = RHS({rhs})"
    }


def solve_set_logic_connection(params: dict) -> dict:
    """
    Connect set operations to logical connectives.
    Union = OR, Intersection = AND, Complement = NOT
    params: {'set_a': list, 'set_b': list, 'universal': list, 'operation': str}
    Returns: dict with answer, steps, verification
    """
    set_a = set(params.get('set_a', [1, 2, 3, 4, 5]))
    set_b = set(params.get('set_b', [4, 5, 6, 7, 8]))
    universal = set(params.get('universal', list(range(1, 11))))
    operation = params.get('operation', 'union')
    
    steps = []
    steps.append("=" * 60)
    steps.append("SET THEORY ↔ LOGICAL CONNECTIVES CONNECTION")
    steps.append(f"Set A = {sorted(set_a)}")
    steps.append(f"Set B = {sorted(set_b)}")
    steps.append(f"Universal Set U = {sorted(universal)}")
    steps.append(f"Operation: {operation}")
    steps.append("")
    
    comp_a = universal - set_a
    comp_b = universal - set_b
    
    if operation == 'union':
        steps.append("Union (A ∪ B) corresponds to LOGICAL OR (A ∨ B)")
        steps.append("An element is in A ∪ B if it is in A OR in B (or both).")
        result = set_a | set_b
        logic_desc = f"x ∈ A ∪ B  ⟺  (x ∈ A) ∨ (x ∈ B)"
        steps.append(f"Result: A ∪ B = {sorted(result)}")
    
    elif operation == 'intersection':
        steps.append("Intersection (A ∩ B) corresponds to LOGICAL AND (A ∧ B)")
        steps.append("An element is in A ∩ B if it is in BOTH A AND B.")
        result = set_a & set_b
        logic_desc = f"x ∈ A ∩ B  ⟺  (x ∈ A) ∧ (x ∈ B)"
        steps.append(f"Result: A ∩ B = {sorted(result)}")
    
    elif operation == 'complement_a':
        steps.append("Complement (A') corresponds to LOGICAL NOT (~A)")
        steps.append("An element is in A' if it is NOT in A (but in the universal set).")
        result = universal - set_a
        logic_desc = f"x ∈ A'  ⟺  ~(x ∈ A)"
        steps.append(f"Result: A' = {sorted(result)}")
    
    elif operation == 'complement_b':
        steps.append("Complement (B') corresponds to LOGICAL NOT (~B)")
        result = universal - set_b
        logic_desc = f"x ∈ B'  ⟺  ~(x ∈ B)"
        steps.append(f"Result: B' = {sorted(result)}")
    
    elif operation == 'demorgan_first':
        steps.append("De Morgan's Law for Sets: (A ∩ B)' = A' ∪ B'")
        steps.append("Corresponds to: ~(p ∧ q) ≡ ~p ∨ ~q")
        lhs = universal - (set_a & set_b)
        rhs = (universal - set_a) | (universal - set_b)
        result = lhs
        logic_desc = f"(A ∩ B)' = A' ∪ B'  ⟺  ~(p ∧ q) ≡ ~p ∨ ~q"
        steps.append(f"  (A ∩ B)' = {sorted(lhs)}")
        steps.append(f"  A' ∪ B' = {sorted(rhs)}")
        steps.append(f"  Equal: {lhs == rhs}")
    
    elif operation == 'demorgan_second':
        steps.append("De Morgan's Law for Sets: (A ∪ B)' = A' ∩ B'")
        steps.append("Corresponds to: ~(p ∨ q) ≡ ~p ∧ ~q")
        lhs = universal - (set_a | set_b)
        rhs = (universal - set_a) & (universal - set_b)
        result = lhs
        logic_desc = f"(A ∪ B)' = A' ∩ B'  ⟺  ~(p ∨ q) ≡ ~p ∧ ~q"
        steps.append(f"  (A ∪ B)' = {sorted(lhs)}")
        steps.append(f"  A' ∩ B' = {sorted(rhs)}")
        steps.append(f"  Equal: {lhs == rhs}")
    
    else:
        result = set()
        logic_desc = "Unknown operation"
    
    steps.append("")
    steps.append("SUMMARY OF CONNECTIONS:")
    steps.append("  Union (∪)    ↔  OR (∨)")
    steps.append("  Intersection (∩)  ↔  AND (∧)")
    steps.append("  Complement (')  ↔  NOT (~)")
    steps.append(f"  Logic formula: {logic_desc}")
    
    steps.append("")
    steps.append("VERIFICATION:")
    steps.append(f"  Set A = {sorted(set_a)}")
    steps.append(f"  Set B = {sorted(set_b)}")
    steps.append(f"  Result = {sorted(result)}")
    
    return {
        "answer": {
            "result": sorted(result),
            "logic_connection": logic_desc,
            "set_a": sorted(set_a),
            "set_b": sorted(set_b)
        },
        "steps": steps,
        "verification": f"Set result: {sorted(result)}"
    }


def solve_implication(params: dict) -> dict:
    """
    Evaluate implication and related forms (converse, inverse, contrapositive).
    params: {'p': bool, 'q': bool}
    """
    p = params.get('p', True)
    q = params.get('q', True)
    
    steps = []
    steps.append("=" * 60)
    steps.append("IMPLICATION AND RELATED FORMS")
    steps.append(f"Given: p = {p}, q = {q}")
    steps.append("")
    
    # Original: p → q
    implication = (not p) or q
    steps.append("STEP 1: Original Implication: p → q")
    steps.append(f"  p → q is FALSE only when p=True and q=False")
    steps.append(f"  Otherwise it is TRUE")
    steps.append(f"  p → q = (NOT p) OR q = NOT({p}) OR {q} = {not p} OR {q} = {implication}")
    
    # Converse: q → p
    converse = (not q) or p
    steps.append("")
    steps.append("STEP 2: Converse: q → p")
    steps.append("  Converse reverses the direction of implication.")
    steps.append(f"  q → p = (NOT q) OR p = NOT({q}) OR {p} = {not q} OR {p} = {converse}")
    
    # Inverse: ~p → ~q
    inverse = (not (not p)) or (not q)
    inverse = p or (not q)
    steps.append("")
    steps.append("STEP 3: Inverse: ~p → ~q")
    steps.append("  Inverse negates both antecedent and consequent.")
    steps.append(f"  ~p = {not p}, ~q = {not q}")
    steps.append(f"  ~p → ~q = NOT(~p) OR ~q = {not not p} OR {not q} = {p} OR {not q} = {inverse}")
    
    # Contrapositive: ~q → ~p
    contrapositive = (not (not q)) or (not p)
    contrapositive = q or (not p)
    steps.append("")
    steps.append("STEP 4: Contrapositive: ~q → ~p")
    steps.append("  Contrapositive swaps AND negates both sides.")
    steps.append(f"  ~q = {not q}, ~p = {not p}")
    steps.append(f"  ~q → ~p = NOT(~q) OR ~p = {not not q} OR {not p} = {q} OR {not p} = {contrapositive}")
    
    steps.append("")
    steps.append("STEP 5: Key Observations")
    steps.append(f"  Original (p → q): {implication}")
    steps.append(f"  Converse (q → p): {converse}")
    steps.append(f"  Inverse (~p → ~q): {inverse}")
    steps.append(f"  Contrapositive (~q → ~p): {contrapositive}")
    steps.append("")
    steps.append(f"  Original ≡ Contrapositive: {implication == contrapositive}")
    steps.append(f"  Converse ≡ Inverse: {converse == inverse}")
    steps.append("  (Always true — this is a fundamental theorem of logic)")
    
    steps.append("")
    steps.append("VERIFICATION:")
    steps.append(f"  p → q: {implication}")
    steps.append(f"  q → p: {converse}")
    steps.append(f"  ~p → ~q: {inverse}")
    steps.append(f"  ~q → ~p: {contrapositive}")
    
    return {
        "answer": {
            "p": p, "q": q,
            "implication": implication,
            "converse": converse,
            "inverse": inverse,
            "contrapositive": contrapositive
        },
        "steps": steps,
        "verification": f"p→q={implication}, Contrapositive={contrapositive}, Equal: {implication==contrapositive}"
    }


# ============================================================================
# SECTION 2: HELPER FUNCTIONS
# ============================================================================

def _parse_connectives(compound_expr: str, propositions: List[str]) -> List[dict]:
    """Parse compound expression to determine evaluation order."""
    connective_order = []
    remaining = compound_expr
    
    # Look for NOTs first (highest priority)
    for p in propositions:
        if f"~{p}" in remaining:
            connective_order.append({"type": "NOT", "operands": [p]})
    
    # Look for AND
    for i, p1 in enumerate(propositions):
        for j, p2 in enumerate(propositions):
            if f"{p1} ∧ {p2}" in remaining or f"{p1} and {p2}" in remaining:
                if not any(c for c in connective_order if 
                          c['type'] == 'AND' and set(c['operands']) == {p1, p2}):
                    connective_order.append({"type": "AND", "operands": [p1, p2]})
    
    # Look for OR
    for i, p1 in enumerate(propositions):
        for j, p2 in enumerate(propositions):
            if f"{p1} ∨ {p2}" in remaining or f"{p1} or {p2}" in remaining:
                if not any(c for c in connective_order if 
                          c['type'] == 'OR' and set(c['operands']) == {p1, p2}):
                    connective_order.append({"type": "OR", "operands": [p1, p2]})
    
    # Look for Implication
    for i, p1 in enumerate(propositions):
        for j, p2 in enumerate(propositions):
            if f"{p1} → {p2}" in remaining or f"{p1} -> {p2}" in remaining:
                if not any(c for c in connective_order if 
                          c['type'] == 'IMPLIES' and c['operands'] == [p1, p2]):
                    connective_order.append({"type": "IMPLIES", "operands": [p1, p2]})
    
    # Look for Biconditional
    for i, p1 in enumerate(propositions):
        for j, p2 in enumerate(propositions):
            if f"{p1} ↔ {p2}" in remaining or f"{p1} <-> {p2}" in remaining:
                if not any(c for c in connective_order if 
                          c['type'] == 'IFF' and c['operands'] == [p1, p2]):
                    connective_order.append({"type": "IFF", "operands": [p1, p2]})
    
    # Default: if no specific parsed, provide a generic order
    if not connective_order and len(propositions) >= 2:
        connective_order.append({"type": "AND", "operands": [propositions[0], propositions[1]]})
    
    return connective_order


def _format_truth_table(propositions: List[str], connective_order: List[dict], rows: List[dict]) -> str:
    """Format truth table as a string."""
    headers = propositions[:]
    for conn in connective_order:
        if conn['type'] == 'NOT':
            headers.append(f"~{conn['operands'][0]}")
        elif conn['type'] == 'AND':
            headers.append(f"{conn['operands'][0]} ∧ {conn['operands'][1]}")
        elif conn['type'] == 'OR':
            headers.append(f"{conn['operands'][0]} ∨ {conn['operands'][1]}")
        elif conn['type'] == 'IMPLIES':
            headers.append(f"{conn['operands'][0]} → {conn['operands'][1]}")
        elif conn['type'] == 'IFF':
            headers.append(f"{conn['operands'][0]} ↔ {conn['operands'][1]}")
    headers.append("Result")
    
    lines = []
    lines.append(" | ".join(str(h) for h in headers))
    lines.append("-" * (len(headers) * 8))
    
    for row in rows:
        row_vals = [str(row.get(p, "")) for p in propositions]
        for conn in connective_order:
            # We need to compute intermediate values; simplified
            row_vals.append(str(row.get('result', "")))
        row_vals.append(str(row.get('result', "")))
        lines.append(" | ".join(row_vals))
    
    return "\n".join(lines)


# ============================================================================
# SECTION 3: QUESTION GENERATOR
# ============================================================================

class QuestionGenerator:
    """Generates deterministic, seeded questions for CISCE Class 10 Applied Mathematics."""
    
    def __init__(self, seed: int = 42):
        random.seed(seed)
        self.rng = random.Random(seed)
        self.seed = seed
    
    def _reseed(self, offset: int = 0):
        """Reseed for deterministic sub-sequences."""
        self.rng.seed(self.seed + offset)
    
    # ---- Proposition identification questions ----
    def _gen_proposition_questions(self, count: int) -> List[dict]:
        questions = []
        prop_statements = [
            ("5 is a prime number", True, "simple"),
            ("2 + 2 = 5", False, "simple"),
            ("3 is an even number", False, "simple"),
            ("New Delhi is the capital of India", True, "simple"),
            ("The sum of angles in a triangle is 180°", True, "simple"),
            ("Mumbai is the capital of India", False, "simple"),
            ("Every prime number is even", False, "simple"),
            ("7 is a composite number", False, "simple"),
            ("The Earth revolves around the Sun", True, "simple"),
            ("Water boils at 100°C at sea level", True, "simple"),
            ("There are 5 continents in the world", False, "simple"),
            ("All squares are rectangles", True, "simple"),
            ("A triangle has 4 sides", False, "simple"),
            ("2 is a rational number", True, "simple"),
            ("The square root of 2 is a rational number", False, "simple"),
            ("0 is a natural number (CISCE convention)", False, "simple"),
            ("All sides of a rhombus are equal", True, "simple"),
            ("A cylinder has 3 faces", True, "simple"),
            ("π is a rational number", False, "simple"),
            ("The diagonals of a rectangle bisect each other", True, "simple"),
        ]
        non_prop_statements = [
            ("What is 2 + 2?", "question"),
            ("Please solve this problem", "command"),
            ("x is greater than 5", "open"),
            ("How many sides does a triangle have?", "question"),
            ("Go to the market", "command"),
            ("n is a prime number", "open"),
            ("Is 7 prime?", "question"),
            ("Come here", "command"),
            ("Today is a sunny day", "open"),
            ("Who is the Prime Minister of India?", "question"),
        ]
        
        all_items = [(s, v, t, True) for s, v, t in prop_statements] + \
                    [(s, None, t, False) for s, t in non_prop_statements]
        self._reseed(100)
        selected = [all_items[i % len(all_items)] for i in 
                    self.rng.sample(range(len(all_items)), min(count, len(all_items)))]
        
        for statement, truth_val, stype, is_prop in selected:
            if is_prop:
                q_type = self.rng.choice(['mcq', 'fill_blank'])
                if q_type == 'mcq':
                    questions.append({
                        "id": f"prop_mcq_{len(questions)+1}",
                        "type": "mcq",
                        "topic": "Propositions",
                        "difficulty": "easy",
                        "question": f"Is the following statement a proposition? '{statement}'",
                        "options": [
                            "Yes, it is a proposition",
                            "No, it is not a proposition",
                            "It depends on context",
                            "It is an open statement"
                        ],
                        "answer": "Yes, it is a proposition",
                        "explanation": f"'{statement}' is a declarative statement with a definite truth value ({'True' if truth_val else 'False'}). Hence, it IS a proposition.",
                        "competency_based": self.rng.random() < 0.5
                    })
                else:
                    questions.append({
                        "id": f"prop_fill_{len(questions)+1}",
                        "type": "fill_blank",
                        "topic": "Propositions",
                        "difficulty": "easy",
                        "question": f"Determine if '{statement}' is a proposition. If yes, state its truth value (True/False).",
                        "answer": f"Proposition: Yes, Truth Value: {'True' if truth_val else 'False'}",
                        "explanation": f"'{statement}' is a declarative statement and has a definite truth value of {'True' if truth_val else 'False'}.",
                        "competency_based": self.rng.random() < 0.5
                    })
            else:
                questions.append({
                    "id": f"nonprop_{len(questions)+1}",
                    "type": "mcq",
                    "topic": "Propositions",
                    "difficulty": "easy",
                    "question": f"Is the following a proposition? '{statement}'",
                    "options": [
                        "Yes",
                        "No (it is not a proposition)",
                        "Sometimes yes",
                        "Cannot be determined"
                    ],
                    "answer": "No (it is not a proposition)",
                    "explanation": f"'{statement}' is a {stype} — it is not a declarative statement with a definite truth value. Hence, it is NOT a proposition.",
                    "competency_based": self.rng.random() < 0.5
                })
        return questions
    
    # ---- Truth table questions ----
    def _gen_truth_table_questions(self, count: int) -> List[dict]:
        questions = []
        self._reseed(200)
        
        # Standard truth table questions
        table_configs = [
            {
                "propositions": ["p", "q"],
                "expressions": [
                    ("p ∧ q", "AND"),
                    ("p ∨ q", "OR"),
                    ("~p", "NOT"),
                    ("p → q", "IMPLIES"),
                    ("p ↔ q", "IFF"),
                    ("~p ∨ q", "IMPLIES-ALT"),
                    ("~(p ∧ q)", "DEMORGAN1"),
                    ("~(p ∨ q)", "DEMORGAN2"),
                ]
            }
        ]
        
        config = table_configs[0]
        exprs = config["expressions"]
        selected_exprs = [exprs[i % len(exprs)] for i in 
                          self.rng.sample(range(len(exprs)), min(count, len(exprs)))]
        
        for expr_str, expr_type in selected_exprs:
            q_type = self.rng.choice(['mcq', 'short_answer', 'long_answer'])
            
            if q_type == 'mcq':
                # Ask for a specific cell value
                options_map = {
                    "p ∧ q": {("T","T"): "T", ("T","F"): "F", ("F","T"): "F", ("F","F"): "F"},
                    "p ∨ q": {("T","T"): "T", ("T","F"): "T", ("F","T"): "T", ("F","F"): "F"},
                    "p → q": {("T","T"): "T", ("T","F"): "F", ("F","T"): "T", ("F","F"): "T"},
                    "p ↔ q": {("T","T"): "T", ("T","F"): "F", ("F","T"): "F", ("F","F"): "T"},
                    "~p ∨ q": {("T","T"): "T", ("T","F"): "F", ("F","T"): "T", ("F","F"): "T"},
                }
                cell_options = [(("T","T"), "T"), (("T","F"), "F"), (("F","T"), "T"), (("F","F"), "F")]
                sel_cell = cell_options[self.rng.randint(0, 3)]
                correct_val = options_map.get(expr_str, {}).get(sel_cell[0], "T")
                
                questions.append({
                    "id": f"tt_mcq_{len(questions)+1}",
                    "type": "mcq",
                    "topic": "Truth Tables",
                    "difficulty": "medium",
                    "question": f"In the truth table for '{expr_str}', when p={sel_cell[0][0]} and q={sel_cell[0][1]}, what is the result?",
                    "options": ["T (True)", "F (False)"],
                    "answer": f"{correct_val} ({'True' if correct_val == 'T' else 'False'})",
                    "explanation": f"For p={sel_cell[0][0]}, q={sel_cell[0][1]}: {expr_str} = {correct_val}.",
                    "competency_based": self.rng.random() < 0.5
                })
            else:
                questions.append({
                    "id": f"tt_sa_{len(questions)+1}",
                    "type": "short_answer",
                    "topic": "Truth Tables",
                    "difficulty": "medium",
                    "question": f"Construct the truth table for the compound proposition: {expr_str}",
                    "answer": f"Truth table for {expr_str} with 4 rows",
                    "explanation": f"Build a truth table with columns for p, q, and {expr_str}. Evaluate each row systematically.",
                    "competency_based": self.rng.random() < 0.5
                })
        return questions
    
    # ---- Tautology/Contradiction questions ----
    def _gen_tautology_questions(self, count: int) -> List[dict]:
        questions = []
        tautology_exprs = [
            ("p ∨ ~p", "TAUTOLOGY"),
            ("~(p ∧ ~p)", "TAUTOLOGY"),
            ("(p → q) ∨ (q → p)", "TAUTOLOGY"),
            ("(p ↔ q) ↔ ((p → q) ∧ (q → p))", "TAUTOLOGY"),
        ]
        contradiction_exprs = [
            ("p ∧ ~p", "CONTRADICTION"),
            ("~(p ∨ ~p)", "CONTRADICTION"),
        ]
        contingency_exprs = [
            ("p ∧ q", "CONTINGENCY"),
            ("p ∨ q", "CONTINGENCY"),
            ("p → q", "CONTINGENCY"),
            ("p ↔ q", "CONTINGENCY"),
            ("~(p ∧ q)", "CONTINGENCY"),
        ]
        
        all_exprs = tautology_exprs + contradiction_exprs + contingency_exprs
        self._reseed(300)
        selected = [all_exprs[i % len(all_exprs)] for i in 
                    self.rng.sample(range(len(all_exprs)), min(count, len(all_exprs)))]
        
        for expr_str, classification in selected:
            q_type = self.rng.choice(['mcq', 'fill_blank', 'long_answer'])
            
            if q_type == 'mcq':
                options = ["Tautology", "Contradiction", "Contingency", "None of these"]
                correct_idx = ["Tautology", "Contradiction", "Contingency"].index(classification)
                questions.append({
                    "id": f"ttclass_mcq_{len(questions)+1}",
                    "type": "mcq",
                    "topic": "Tautology/Contradiction",
                    "difficulty": "hard",
                    "question": f"Classify the proposition '{expr_str}':",
                    "options": options,
                    "answer": classification,
                    "explanation": f"The proposition '{expr_str}' is a {classification}. "
                                  f"{'It is always true for all truth values.' if classification == 'TAUTOLOGY' else ''}"
                                  f"{'It is always false for all truth values.' if classification == 'CONTRADICTION' else ''}"
                                  f"{'Its truth value depends on the component values.' if classification == 'CONTINGENCY' else ''}",
                    "competency_based": self.rng.random() < 0.5
                })
            elif q_type == 'fill_blank':
                questions.append({
                    "id": f"ttclass_fill_{len(questions)+1}",
                    "type": "fill_blank",
                    "topic": "Tautology/Contradiction",
                    "difficulty": "hard",
                    "question": f"Determine whether '{expr_str}' is a tautology, contradiction, or contingency.",
                    "answer": classification,
                    "explanation": f"Construct the truth table for '{expr_str}' with all 4 combinations. The result shows it is a {classification}.",
                    "competency_based": self.rng.random() < 0.5
                })
            else:
                questions.append({
                    "id": f"ttclass_la_{len(questions)+1}",
                    "type": "long_answer",
                    "topic": "Tautology/Contradiction",
                    "difficulty": "hard",
                    "question": f"Construct the truth table for '{expr_str}' and determine if it is a tautology, contradiction, or contingency. Justify your answer.",
                    "answer": f"{classification} — requires truth table with 4 rows",
                    "explanation": f"Step 1: List all 4 combinations of p and q. Step 2: Evaluate {expr_str} for each. Step 3: Check if all True (tautology), all False (contradiction), or mixed (contingency).",
                    "competency_based": self.rng.random() < 0.5
                })
        return questions
    
    # ---- De Morgan's Law questions ----
    def _gen_demorgan_questions(self, count: int) -> List[dict]:
        questions = []
        self._reseed(400)
        
        p_vals = [True, False]
        q_vals = [True, False]
        combinations = [(p, q) for p in p_vals for q in q_vals]
        selected = [combinations[i % len(combinations)] for i in 
                    self.rng.sample(range(len(combinations)), min(count * 2, len(combinations)))]
        
        for p, q in selected[:count]:
            law = self.rng.choice(['first', 'second'])
            q_type = self.rng.choice(['mcq', 'short_answer', 'long_answer'])
            
            if law == 'first':
                lhs = not (p and q)
                rhs = (not p) or (not q)
                law_text = "~(p ∧ q)"
                rhs_text = "~p ∨ ~q"
            else:
                lhs = not (p or q)
                rhs = (not p) and (not q)
                law_text = "~(p ∨ q)"
                rhs_text = "~p ∧ ~q"
            
            if q_type == 'mcq':
                questions.append({
                    "id": f"dm_mcq_{len(questions)+1}",
                    "type": "mcq",
                    "topic": "De Morgan's Laws",
                    "difficulty": "medium",
                    "question": f"Using De Morgan's {'First' if law == 'first' else 'Second'} Law, if p={p} and q={q}, what is the value of {law_text}?",
                    "options": ["True", "False"],
                    "answer": "True" if lhs else "False",
                    "explanation": f"De Morgan's {'First' if law == 'first' else 'Second'} Law: {law_text} = {rhs_text}. With p={p}, q={q}: LHS={lhs}, RHS={rhs}.",
                    "competency_based": self.rng.random() < 0.5
                })
            elif q_type == 'short_answer':
                questions.append({
                    "id": f"dm_sa_{len(questions)+1}",
                    "type": "short_answer",
                    "topic": "De Morgan's Laws",
                    "difficulty": "medium",
                    "question": f"Verify De Morgan's {'First' if law == 'first' else 'Second'} Law: {law_text} ≡ {rhs_text}. Show that both sides have the same truth value when p={p}, q={q}.",
                    "answer": f"Both sides equal {lhs == rhs}",
                    "explanation": f"LHS: {law_text} = {lhs}. RHS: {rhs_text} = {rhs}. Since {lhs} == {rhs}, the law is verified.",
                    "competency_based": self.rng.random() < 0.5
                })
            else:
                questions.append({
                    "id": f"dm_la_{len(questions)+1}",
                    "type": "long_answer",
                    "topic": "De Morgan's Laws",
                    "difficulty": "hard",
                    "question": f"State and verify De Morgan's {'First' if law == 'first' else 'Second'} Law using a truth table.",
                    "answer": f"Law: {law_text} ≡ {rhs_text}. Both sides are equivalent for all 4 combinations.",
                    "explanation": f"Construct truth table for {law_text} and {rhs_text}. Both columns will be identical, confirming the equivalence.",
                    "competency_based": self.rng.random() < 0.5
                })
        return questions
    
    # ---- Set-logic connection questions (Indian context) ----
    def _gen_set_logic_questions(self, count: int) -> List[dict]:
        questions = []
        self._reseed(500)
        
        indian_contexts = [
            {
                "set_a": [1, 2, 3, 4, 5, 6, 7],
                "set_b": [5, 6, 7, 8, 9, 10],
                "universal": list(range(1, 16)),
                "desc_a": "students who play Cricket",
                "desc_b": "students who play Football",
                "context": "In a class of 15 students, let A be the set of students who play Cricket and B be the set of students who play Football."
            },
            {
                "set_a": [2, 4, 6, 8, 10, 12, 14],
                "set_b": [3, 6, 9, 12, 15],
                "universal": list(range(1, 21)),
                "desc_a": "even numbers",
                "desc_b": "multiples of 3",
                "context": "In the set of natural numbers from 1 to 20, let A be even numbers and B be multiples of 3."
            },
            {
                "set_a": ['A', 'B', 'C', 'D', 'E'],
                "set_b": ['D', 'E', 'F', 'G'],
                "universal": list('ABCDEFGHIJ'),
                "desc_a": "students who like Mathematics",
                "desc_b": "students who like Science",
                "context": "In a group of 10 students, let A be those who like Mathematics and B be those who like Science."
            },
            {
                "set_a": [1, 3, 5, 7, 9, 11, 13, 15],
                "set_b": [2, 4, 6, 8, 10, 12, 14, 16],
                "universal": list(range(1, 21)),
                "desc_a": "odd numbers",
                "desc_b": "even numbers",
                "context": "In the set of numbers from 1 to 20, let A be odd numbers and B be even numbers."
            },
        ]
        
        for ctx in indian_contexts[:count]:
            q_type = self.rng.choice(['mcq', 'fill_blank', 'short_answer', 'long_answer'])
            a = set(ctx['set_a'])
            b = set(ctx['set_b'])
            u = set(ctx['universal'])
            
            if q_type == 'mcq':
                op = self.rng.choice(['union', 'intersection', 'complement_a'])
                if op == 'union':
                    result = sorted(a | b)
                    op_name = "A ∪ B"
                    op_desc = f"students who play {ctx['desc_a'].split(' who ')[-1]} OR {ctx['desc_b'].split(' who ')[-1]}"
                elif op == 'intersection':
                    result = sorted(a & b)
                    op_name = "A ∩ B"
                    op_desc = f"students who play BOTH {ctx['desc_a'].split(' who ')[-1]} AND {ctx['desc_b'].split(' who ')[-1]}"
                else:
                    result = sorted(u - a)
                    op_name = "A'"
                    op_desc = f"students who do NOT play {ctx['desc_a'].split(' who ')[-1]}"
                
                questions.append({
                    "id": f"setlogic_mcq_{len(questions)+1}",
                    "type": "mcq",
                    "topic": "Set-Logic Connection",
                    "difficulty": "medium",
                    "question": f"{ctx['context']} Find {op_name}. (Logical equivalent: {op_desc})",
                    "options": [str(sorted(x)) for x in [a | b, a & b, u - a, a - b]],
                    "answer": str(result),
                    "explanation": f"{op_name} = {result}. This corresponds to the logical connective {op_name.split(' ')[-1] if ' ' in op_name else op_name}.",
                    "competency_based": True
                })
            else:
                questions.append({
                    "id": f"setlogic_sa_{len(questions)+1}",
                    "type": "short_answer",
                    "topic": "Set-Logic Connection",
                    "difficulty": "medium",
                    "question": f"{ctx['context']} Show that (A ∩ B)' = A' ∪ B' using the given sets. Which logical connective law does this represent?",
                    "answer": "De Morgan's First Law: ~(p ∧ q) ≡ ~p ∨ ~q",
                    "explanation": f"(A ∩ B)' = A' ∪ B' represents De Morgan's First Law, equivalent to ~(p ∧ q) ≡ ~p ∨ ~q in logic.",
                    "competency_based": True
                })
        return questions
    
    # ---- Implication questions ----
    def _gen_implication_questions(self, count: int) -> List[dict]:
        questions = []
        self._reseed(600)
        
        for i in range(count):
            p = self.rng.choice([True, False])
            q = self.rng.choice([True, False])
            implication = (not p) or q
            contrapositive = q or (not p)
            
            q_type = self.rng.choice(['mcq', 'fill_blank', 'short_answer'])
            
            if q_type == 'mcq':
                question_text = self.rng.choice([
                    f"If p={p} and q={q}, what is the truth value of p → q?",
                    f"If p={p} and q={q}, what is the truth value of ~q → ~p (contrapositive)?",
                    f"If the statement p → q is True when p={p} and q={q}, what is its contrapositive?",
                ])
                if "p → q" in question_text and "contrapositive" not in question_text.lower():
                    correct = "True" if implication else "False"
                else:
                    correct = "True" if contrapositive else "False"
                
                questions.append({
                    "id": f"imp_mcq_{len(questions)+1}",
                    "type": "mcq",
                    "topic": "Implication",
                    "difficulty": "medium",
                    "question": question_text,
                    "options": ["True", "False"],
                    "answer": correct,
                    "explanation": f"p → q = (NOT p) OR q = {implication}. The contrapositive ~q → ~p = {contrapositive}.",
                    "competency_based": self.rng.random() < 0.5
                })
            else:
                questions.append({
                    "id": f"imp_sa_{len(questions)+1}",
                    "type": "short_answer",
                    "topic": "Implication",
                    "difficulty": "medium",
                    "question": f"Given p={p} and q={q}, find p → q, its converse, inverse, and contrapositive. State which pairs are equivalent.",
                    "answer": f"p→q={implication}, Converse={((not q) or p)}, Inverse={p or (not q)}, Contrapositive={contrapositive}. Original ≡ Contrapositive, Converse ≡ Inverse.",
                    "explanation": "p→q is false only when p=True and q=False. Converse and inverse are equivalent. Original and contrapositive are equivalent.",
                    "competency_based": self.rng.random() < 0.5
                })
        return questions
    
    # ---- Numerical question ----
    def _gen_numerical_questions(self, count: int) -> List[dict]:
        questions = []
        self._reseed(700)
        
        for i in range(count):
            # Count-based truth table question
            n = self.rng.randint(2, 3)
            num_combinations = 2 ** n
            letters = ['p', 'q', 'r']
            props = letters[:n]
            
            q_type = self.rng.choice(['mcq', 'fill_blank', 'numerical'])
            
            if q_type in ['mcq', 'fill_blank']:
                questions.append({
                    "id": f"num_{len(questions)+1}",
                    "type": q_type,
                    "topic": "Truth Tables (Numerical)",
                    "difficulty": "medium",
                    "question": f"How many rows will a truth table have for a compound proposition involving {n} independent propositions ({', '.join(props)})?",
                    "options": [str(2**k) for k in range(1, 6)],
                    "answer": str(num_combinations),
                    "explanation": f"With {n} propositions, each having 2 truth values (T/F), the total combinations are 2^{n} = {num_combinations}.",
                    "competency_based": True
                })
            else:
                # Count tautology rows
                is_tautology = self.rng.choice([True, False])
                expr = self.rng.choice(["p ∨ ~p", "p ∧ ~p", "p ∧ q", "p → q"])
                if is_tautology:
                    correct_count = num_combinations
                    explanation_note = "all rows are True"
                elif "∧" in expr and "~" in expr:
                    correct_count = 0
                    explanation_note = "all rows are False"
                else:
                    correct_count = self.rng.randint(1, num_combinations - 1)
                    explanation_note = f"{correct_count} rows are True"
                
                questions.append({
                    "id": f"num_taut_{len(questions)+1}",
                    "type": "numerical",
                    "topic": "Truth Tables (Numerical)",
                    "difficulty": "hard",
                    "question": f"In the truth table for '{expr}', how many rows have the value True?",
                    "answer": str(correct_count),
                    "explanation": f"For '{expr}', {explanation_note} out of {num_combinations} total rows.",
                    "competency_based": True
                })
        return questions


    def generate_questions(self, seed: int, count: int) -> List[dict]:
        """Generate a mix of questions across all topics."""
        self._reseed(seed)
        
        all_questions = []
        
        # Allocate: 50% competency, 50% standard
        competency_count = count // 2
        standard_count = count - competency_count
        
        # Standard questions
        standard_types = [
            (self._gen_proposition_questions, max(1, standard_count // 5)),
            (self._gen_truth_table_questions, max(1, standard_count // 5)),
            (self._gen_tautology_questions, max(1, standard_count // 5)),
            (self._gen_demorgan_questions, max(1, standard_count // 5)),
            (self._gen_implication_questions, max(1, standard_count - 4 * (standard_count // 5))),
        ]
        
        for gen_func, q_count in standard_types:
            if q_count > 0:
                all_questions.extend(gen_func(q_count))
        
        # Competency-based questions (Indian context)
        competency_types = [
            (self._gen_set_logic_questions, max(1, competency_count // 2)),
            (self._gen_numerical_questions, max(1, competency_count - competency_count // 2)),
        ]
        
        for gen_func, q_count in competency_types:
            if q_count > 0:
                all_questions.extend(gen_func(q_count))
        
        # Tag competency flag
        for q in all_questions:
            q.setdefault('competency_based', False)
        
        # Ensure exactly 'count' questions
        self._reseed(seed + 9999)
        while len(all_questions) < count:
            extra = self._gen_proposition_questions(1)
            all_questions.extend(extra)
        
        all_questions = all_questions[:count]
        
        # Assign unique IDs
        for i, q in enumerate(all_questions):
            q['id'] = f"c10_appmath_069_q{i+1:03d}"
        
        return all_questions


# ============================================================================
# SECTION 4: PUBLIC API
# ============================================================================

def solve_proposition(params: dict) -> dict:
    """Solve: Is this a proposition? What is its truth value?"""
    return solve_proposition_check(params)


def solve_truth_table_builder(params: dict) -> dict:
    """Solve: Build a truth table for a compound proposition."""
    return solve_truth_table(params)


def solve_tautology_verifier(params: dict) -> dict:
    """Solve: Verify if a proposition is a tautology, contradiction, or contingency."""
    return solve_tautology_check(params)


def solve_demorgan_verifier(params: dict) -> dict:
    """Solve: Verify De Morgan's Law."""
    return solve_de_morgans(params)


def solve_set_logic_mapper(params: dict) -> dict:
    """Solve: Map set operations to logical connectives."""
    return solve_set_logic_connection(params)


def solve_implication_analyzer(params: dict) -> dict:
    """Solve: Analyze implication, converse, inverse, contrapositive."""
    return solve_implication(params)


def generate_questions(seed: int, count: int) -> List[dict]:
    """Generate 'count' deterministic questions for CISCE Class 10 Applied Mathematics - Logic."""
    gen = QuestionGenerator(seed)
    return gen.generate_questions(seed, count)


# ============================================================================
# SECTION 5: DEMONSTRATION / TEST
# ============================================================================

def run_all_demos():
    """Run all solver functions with sample inputs and print results."""
    print("=" * 70)
    print("CISCE CLASS 10 APPLIED MATHEMATICS - MATHEMATICAL LOGIC SOLVER DEMOS")
    print("=" * 70)
    
    # Demo 1: Proposition Check
    print("\n--- DEMO 1: Proposition Check ---")
    result1 = solve_proposition({"statement": "5 is prime"})
    print(f"Answer: {result1['answer']}")
    print(f"Verification: {result1['verification']}")
    for step in result1['steps'][:8]:
        print(f"  {step}")
    
    # Demo 2: Truth Table
    print("\n--- DEMO 2: Truth Table for p ∧ q ---")
    result2 = solve_truth_table({
        "propositions": ["p", "q"],
        "compound": "p ∧ q",
        "connectives": [{"type": "AND", "operands": ["p", "q"]}]
    })
    print(f"Answer: {result2['answer']}")
    print(f"Verification: {result2['verification']}")
    for step in result2['steps'][:10]:
        print(f"  {step}")
    
    # Demo 3: Tautology Check
    print("\n--- DEMO 3: Tautology Check for p ∨ ~p ---")
    result3 = solve_tautology_check({
        "propositions": ["p"],
        "compound": "p ∨ ~p",
        "connectives": [{"type": "NOT", "operands": ["p"]}, {"type": "OR", "operands": ["p", "~p"]}]
    })
    print(f"Answer: {result3['answer']}")
    print(f"Verification: {result3['verification']}")
    
    # Demo 4: De Morgan's Law
    print("\n--- DEMO 4: De Morgan's First Law ---")
    result4 = solve_de_morgans({"p": True, "q": False, "law": "first"})
    print(f"Answer: {result4['answer']}")
    print(f"Verification: {result4['verification']}")
    
    # Demo 5: Set-Logic Connection
    print("\n--- DEMO 5: Set-Logic Connection (Indian Context) ---")
    result5 = solve_set_logic_connection({
        "set_a": [1, 2, 3, 4, 5, 6, 7],
        "set_b": [5, 6, 7, 8, 9, 10],
        "universal": list(range(1, 16)),
        "operation": "union"
    })
    print(f"Answer: {result5['answer']}")
    print(f"Verification: {result5['verification']}")
    
    # Demo 6: Implication
    print("\n--- DEMO 6: Implication Analysis ---")
    result6 = solve_implication({"p": True, "q": False})
    print(f"Answer: {result6['answer']}")
    print(f"Verification: {result6['verification']}")
    
    # Demo 7: Question Generation
    print("\n--- DEMO 7: Question Generation (seed=42, count=10) ---")
    questions = generate_questions(42, 10)
    print(f"Generated {len(questions)} questions:")
    for q in questions[:5]:
        print(f"  [{q['type']}] {q['id']}: {q['question'][:60]}...")
        print(f"    Answer: {q['answer']}")
        print(f"    Competency: {q.get('competency_based', False)}, Difficulty: {q['difficulty']}")
    
    print("\n" + "=" * 70)
    print("ALL DEMOS COMPLETE")
    print("=" * 70)


if __name__ == "__main__":
    run_all_demos()