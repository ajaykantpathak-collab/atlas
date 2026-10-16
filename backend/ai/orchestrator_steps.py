"""Step execution and answer assembly for the orchestrator.

Separated from orchestrator.py to avoid circular imports.
"""

import re
from backend.ai.compute_engine import ComputeEngine


def _substitute_placeholders(command: str, step_results: dict) -> str:
    """Replace {step_N} placeholders with actual results from previous steps.
    
    Also handles "with x = {step_N}" syntax by substituting the value
    directly into the expression (replacing x with the value).
    """
    # First, replace all {step_N} with their values
    def _replacer(m):
        step_num = int(m.group(1))
        return step_results.get(step_num, m.group(0))
    
    resolved = re.sub(r'\{step_(\d+)\}', _replacer, command)
    
    # Handle "with x = <value>" or "with <var> = <value>" syntax
    # ReDoS guard: the lazy dot-all is quadratic on long non-matching
    # inputs -- only run it on bounded text that literally contains
    # " with " (the pattern cannot match otherwise).
    if len(resolved) <= 500 and ' with ' in resolved:
        with_match = re.search(r'(.+?)\s+with\s+(\w+)\s*=\s*(.+)', resolved)
    else:
        with_match = None
    if with_match:
        expr_part = with_match.group(1).strip()
        var = with_match.group(2)
        value = with_match.group(3).strip()
        # If the value has " or " (multiple solutions), take the first positive one
        if " or " in value:
            parts = value.split(" or ")
            positive = [p for p in parts if "-" not in p.strip()[:1]]
            value = positive[0] if positive else parts[0]
        # Substitute the variable with the value (wrap in parens for safety)
        expr_part = re.sub(r'\b' + re.escape(var) + r'\b', f'({value})', expr_part)
        resolved = expr_part
    
    return resolved


def _extract_answer_from_result(compute_result) -> str:
    """Extract the clean answer string from a ComputeResult.
    
    Returns a string suitable for substitution into later compute commands.
    Converts unicode superscripts back to ** notation.
    """
    if not compute_result or not compute_result.matched:
        return ""
    answer = compute_result.answer
    # For equations with multiple solutions, take the first positive one
    if " or " in answer:
        parts = answer.split(" or ")
        positive = [p for p in parts if "-" not in p.split("=")[-1].strip()]
        if positive:
            answer = positive[0]
        else:
            answer = parts[0]
    # Extract the value after " = " if present
    if " = " in answer:
        answer = answer.split(" = ", 1)[1]
    # Clean up units
    for unit in [" m/s", " N", " J", " kg", " m", " V", " A", " Ω", " W",
                 " mol", " M", " cm", " Pa", " Hz", " C", " F", "°C", "°"]:
        answer = answer.replace(unit, "")
    answer = answer.strip()
    
    # Convert unicode superscripts back to ** notation
    sup_map = {'⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
               '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'}
    def _sup_replacer(m):
        sup_str = m.group(0)
        digits = ''.join(sup_map.get(c, c) for c in sup_str)
        return f'**{digits}'
    answer = re.sub(r'[⁰¹²³⁴⁵⁶⁷⁸⁹]+', _sup_replacer, answer)
    
    # Convert × back to *
    answer = answer.replace(' × ', '*').replace('×', '*')
    
    # Remove implicit multiplication for compute engine parsing
    answer = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', answer)
    answer = re.sub(r'\)([a-zA-Z])', r')*\1', answer)
    answer = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', answer)  # run again after )x fix
    
    return answer


def _execute_steps(steps: list[dict]) -> tuple[list[dict], bool]:
    """Execute a chain of compute-engine steps.
    
    Returns (executed_steps, all_succeeded).
    """
    step_results = {}
    executed = []
    all_succeeded = True

    for step_data in steps:
        step_num = step_data.get("step", len(executed) + 1)
        command = step_data.get("command", "")
        purpose = step_data.get("purpose", "")

        # Substitute {step_N} placeholders
        resolved_command = _substitute_placeholders(command, step_results)

        # Try to solve with compute engine
        compute_result = ComputeEngine.attempt(resolved_command)
        
        executed_step = {
            "step": step_num,
            "command": resolved_command,
            "original_command": command,
            "purpose": purpose,
            "answer": "",
            "steps_detail": [],
            "success": False,
        }

        if compute_result and compute_result.matched:
            executed_step["answer"] = compute_result.answer
            executed_step["steps_detail"] = compute_result.steps
            executed_step["success"] = True
            step_results[step_num] = _extract_answer_from_result(compute_result)
        else:
            executed_step["answer"] = "Could not solve this step"
            all_succeeded = False

        executed.append(executed_step)

    return executed, all_succeeded


def _decimalize_answer(answer: str) -> str:
    """Convert fraction answers to decimals for display.
    
    '3/5' → '0.6'
    '314928/5' → '62985.6'
    '5/8' → '0.625'
    But don't touch expressions like 'acos(...) * 180 / pi'
    """
    import re
    # Only convert simple fractions: "A/B" where A and B are integers
    # and the fraction is at the END of the string (the actual answer value)
    # Don't convert fractions inside expressions (with * + - etc nearby)
    def _frac_to_dec(m):
        num = int(m.group(1))
        den = int(m.group(2))
        if den == 0:
            return m.group(0)
        val = num / den
        # If clean decimal, show it
        if val == int(val):
            return str(int(val))
        elif abs(val) < 0.001 or abs(val) > 1e6:
            return f"{val:.6e}"
        else:
            return f"{val:.6f}".rstrip('0').rstrip('.')
    
    # Only match fractions at the end of the string (after last = sign)
    # This avoids messing up expressions like "acos(...) * 180 / 3.14159"
    if " = " in answer:
        prefix, value = answer.rsplit(" = ", 1)
        # Only convert if value is a simple fraction like "3/5" or "125/4"
        m = re.fullmatch(r'\s*(-?\d+)\s*/\s*(\d+)\s*', value)
        if m:
            return f"{prefix} = {_frac_to_dec(m)}"
    
    # Also check if the entire answer is just a fraction
    m = re.fullmatch(r'\s*(-?\d+)\s*/\s*(\d+)\s*', answer)
    if m:
        return _frac_to_dec(m)
    
    return answer


def _assemble_answer(executed_steps: list[dict]) -> str:
    """Build a student-friendly worked solution from executed steps."""
    lines = ["**Step-by-step solution:**", ""]

    for step in executed_steps:
        lines.append(f"**Step {step['step']}: {step['purpose']}**")
        lines.append(f"  Command: `{step['command']}`")
        if step["steps_detail"]:
            for detail in step["steps_detail"][:3]:
                lines.append(f"  • {detail}")
        if step["success"]:
            # Convert fractions to decimals for display
            display_answer = _decimalize_answer(step['answer'])
            if display_answer != step['answer']:
                lines.append(f"  → **{step['answer']} = {display_answer}**")
            else:
                lines.append(f"  → **{step['answer']}**")
        else:
            lines.append(f"  → ⚠️ Could not solve this step automatically")
        lines.append("")

    if executed_steps and executed_steps[-1]["success"]:
        final_answer = executed_steps[-1]['answer']
        # Convert fractions to decimals in the final answer for clarity
        final_decimal = _decimalize_answer(final_answer)
        if final_decimal != final_answer:
            lines.append(f"**Final Answer:** {final_decimal}")
        else:
            lines.append(f"**Final Answer:** {final_answer}")
    else:
        lines.append("**Note:** Some steps could not be solved automatically. Try asking individual steps separately.")

    return "\n".join(lines)
