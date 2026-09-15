"""Graph-based question router — uses Neo4j fulltext search, no LLM.

Routes a free-text question to the best matching curriculum node in Neo4j,
extracts values from the question text, and maps the node to solver operations.

No DeepSeek, no MiniLM, no embeddings. Just the graph.
"""
from __future__ import annotations

import re
import logging
from typing import Optional, Any

from backend.services.graph_service import GraphService

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────────────────────────────
# Node → solver operation mapping
# Maps graph node topics to step_type_ids in the solver engine.
# Not every node needs a solver — conceptual nodes use diagnostic questions only.
# ─────────────────────────────────────────────────────────────────────

# Pattern → (step_type_id, field_mapping)
# field_mapping maps extracted value keys to step input field names
NODE_OP_MAP: list[tuple[str, str, dict]] = [
    # ── Number Theory ──
    (r"hcf.*lcm|lcm.*hcf", "hcf_lcm", {}),
    (r"\bhcf\b|highest common factor|greatest common divisor|gcd", "hcf_lcm", {}),
    (r"\blcm\b|lowest common multiple|least common multiple", "hcf_lcm", {}),
    (r"is\s+\d+\s+(?:a\s+)?prime|prime\s+number|primality|is prime", "is_prime", {}),
    (r"prime factor", "prime_factorization", {}),
    (r"\bprime\b", "is_prime", {}),

    # ── Calculus: Differentiation ──
    (r"chain rule|composite.*differentiat", "differentiate", {}),
    (r"second.*derivative|higher.*derivative|f\"|second order", "second_derivative", {}),
    (r"differentiat|derivative|f'", "differentiate", {}),
    (r"tangent|normal.*slope|slope.*tangent|equation.*tangent|equation.*normal", "tangent_normal", {}),
    (r"maxim|minim|extreme|extremum|optimization|critical point|stationary", "max_min", {}),
    (r"show.*increasing|show.*decreasing|prove.*increasing|prove.*decreasing", "verify_increasing_decreasing", {}),
    (r"increasing|decreasing|monoton", "verify_increasing_decreasing", {}),

    # ── Calculus: Integration ──
    (r"definite.*integ|integ.*from|integ.*0 to|integ.*limit|integ.*\d+\s*to", "definite_integral", {}),
    (r"integ|antideriv|primitive", "indefinite_integral", {}),

    # ── Algebra ──
    (r"quadratic|roots of|solve.*equation.*x", "solve_quadratic", {}),
    (r"linear.*equation|solve.*simultaneous|system.*equation", "solve_linear_system", {}),
    (r"polynomial|factor.*polynomial|factoris", "factor_polynomial", {}),

    # ── Commercial Math (order matters: profit/loss before percentage) ──
    (r"profit|loss|cost price|selling price|\bcp\b|\bsp\b|bought|sold", "profit_loss", {}),
    (r"discount|marked price|list price", "discount", {}),
    (r"compound interest|\bci\b", "compound_interest", {}),
    (r"simple interest|\bsi\b|interest.*principal|principal.*interest", "simple_interest", {}),
    (r"percentage|percent", "percentage", {}),
    (r"ratio|proportion", "ratio_proportion", {}),

    # ── Matrices ──
    (r"determinant", "determinant", {}),
    (r"matrix.*inverse|inverse.*matrix", "matrix_inverse", {}),
    (r"matrix.*multiply|multiply.*matrix", "matrix_multiply", {}),
    (r"matrix.*add|add.*matrix|matrix.*subtract", "matrix_arithmetic", {}),

    # ── Vectors ──
    (r"vector.*dot|dot.*product|scalar.*product", "dot_product", {}),
    (r"vector.*cross|cross.*product|vector.*product", "cross_product", {}),
    (r"vector.*magnitude|magnitude.*vector|vector.*modulus", "vector_magnitude", {}),

    # ── Probability ──
    (r"probability|bayes|conditional prob", "probability", {}),
    (r"permutation|arrangement", "permutation", {}),
    (r"combination|selection|choose", "combination", {}),

    # ── Exponents ──
    (r"exponent|power of|index", "exponents", {}),
    (r"square root|sqrt|radical", "square_root", {}),

    # ── Trigonometry ──
    (r"trigonometric.*identit|trig.*identit", "trig_simplify", {}),
    (r"trigonometric.*equation|trig.*equation|solve.*sin|solve.*cos", "trig_solve", {}),
]


def _match_operation(topic: str, syllabus: str = "") -> Optional[tuple[str, dict]]:
    """Match a node's topic/syllabus to a solver operation."""
    text = (topic + " " + syllabus).lower()
    for pattern, step_id, field_map in NODE_OP_MAP:
        if re.search(pattern, text):
            return step_id, field_map
    return None


# ─────────────────────────────────────────────────────────────────────
# Value extraction from question text
# ─────────────────────────────────────────────────────────────────────

def _extract_values(question: str, step_type_id: str) -> dict:
    """Extract actual values from the question text based on the operation type."""
    q = question.strip()
    result: dict[str, str] = {}

    # ── HCF / LCM: extract all integers ──
    if step_type_id == "hcf_lcm":
        nums = re.findall(r'\b\d+\b', q)
        if len(nums) >= 2:
            result["numbers"] = ", ".join(nums)

    # ── Differentiation ──
    elif step_type_id in ("differentiate", "second_derivative"):
        # Try f(x) = ... or y = ... or "of <expr>" or "differentiate <expr>"
        m = re.search(r'(?:f\s*\([^)]+\)\s*=\s*|y\s*=\s*|of\s+|differentiate\s+)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:with|at|from|where|and|respect)\s|$|\.)', q, re.IGNORECASE)
        if m:
            expr = m.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            result["expression"] = expr
        else:
            # Try to find a function expression directly: sin(...), cos(...), x^2, etc.
            m2 = re.search(r'\b(sin|cos|tan|log|exp|sqrt)\s*\([^)]+\)|[a-zA-Z]\w*[\^*]+\d+', q, re.IGNORECASE)
            if m2:
                # Grab the full expression around this match
                start = max(0, m2.start() - 20)
                end = min(len(q), m2.end() + 20)
                expr = q[start:end].strip()
                # Clean up
                expr = re.sub(r'^(.*?)(sin|cos|tan|log|exp|sqrt|[a-zA-Z]\w*[\^*])', r'\2', expr)
                expr = expr.replace('^', '**')
                result["expression"] = expr
        if 'x' in q.lower():
            result["var"] = "x"
        pt_match = re.search(r'(?:at|x\s*=\s*|point\s*\()(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if pt_match:
            result["point"] = pt_match.group(1)

    # ── Tangent/Normal ──
    elif step_type_id == "tangent_normal":
        m = re.search(r'(?:y\s*=\s*|f\s*\([^)]+\)\s*=\s*|curve\s+)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+at\s|$|\.)', q, re.IGNORECASE)
        if m:
            expr = m.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            result["expression"] = expr
        if 'x' in q.lower():
            result["var"] = "x"
        pt_match = re.search(r'(?:at\s+)?x\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if pt_match:
            result["point"] = pt_match.group(1)

    # ── Max/Min ──
    elif step_type_id == "max_min":
        m = re.search(r'(?:f\s*\([^)]+\)\s*=\s*|y\s*=\s*|function\s+)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:find|at|where|and)\s|$|\.)', q, re.IGNORECASE)
        if m:
            expr = m.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            result["expression"] = expr
        if 'x' in q.lower():
            result["var"] = "x"

    # ── Increasing/Decreasing ──
    elif step_type_id == "verify_increasing_decreasing":
        m = re.search(r'(?:f\s*\([^)]+\)\s*=\s*|y\s*=\s*|function\s+)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:is|show|prove|at|where|and)\s|$|\.)', q, re.IGNORECASE)
        if m:
            expr = m.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            result["expression"] = expr
        if 'x' in q.lower():
            result["var"] = "x"
        if 'increasing' in q.lower():
            result["behavior"] = "increasing"
        elif 'decreasing' in q.lower():
            result["behavior"] = "decreasing"

    # ── Integration ──
    elif step_type_id in ("definite_integral", "indefinite_integral"):
        m = re.search(r'(?:of\s+|f\s*\([^)]+\)\s*=\s*|y\s*=\s*)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+from\s+|\s+with\s+|\s+where\s+|$|\.)', q, re.IGNORECASE)
        if m:
            expr = m.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            result["expression"] = expr
        if 'x' in q.lower():
            result["var"] = "x"
        if step_type_id == "definite_integral":
            bounds_match = re.search(r'(?:from\s+)?(-?\d+(?:\.\d+)?)\s*(?:to|,)\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
            if bounds_match:
                result["lower"] = bounds_match.group(1)
                result["upper"] = bounds_match.group(2)

    # ── Quadratic ──
    elif step_type_id == "solve_quadratic":
        # Look for the actual equation: something = number
        # Skip words before the equation
        m = re.search(r'([a-zA-Z]\w*(?:\^\d+|\*\*[0-9]+)?(?:\s*[-+]\s*[a-zA-Z0-9\^\*\(\)\/]+)*)\s*=\s*(-?\d+)', q)
        if m:
            expr = m.group(1).strip().replace('^', '**')
            result["expression"] = expr
            result["rhs"] = m.group(2)
        else:
            # Fallback: look for x^2 pattern
            m2 = re.search(r'((?:[a-zA-Z]\w*[\^\*]*\s*[-+]\s*)*[a-zA-Z]\w*[\^\*]+\d+(?:\s*[-+]\s*[a-zA-Z0-9\^\*]+)*)', q)
            if m2:
                result["expression"] = m2.group(1).strip().replace('^', '**')
                result["rhs"] = "0"
        if 'x' in q.lower():
            result["var"] = "x"

    # ── Percentage ──
    elif step_type_id == "percentage":
        nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
        pct_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|percent)', q, re.IGNORECASE)
        if pct_match:
            result["percent"] = pct_match.group(1)
            other_nums = [n for n in nums if n != pct_match.group(1)]
            if other_nums:
                result["whole"] = other_nums[0]
        else:
            # "X out of Y" or "X of Y"
            out_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:out of|of)\s*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
            if out_match:
                result["part"] = out_match.group(1)
                result["whole"] = out_match.group(2)
            elif len(nums) >= 2:
                result["part"] = nums[0]
                result["whole"] = nums[1]

    # ── Profit/Loss ──
    elif step_type_id == "profit_loss":
        nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
        cp_match = re.search(r'(?:cost|cp|bought|purchase)[^0-9]*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
        sp_match = re.search(r'(?:sold|sp|selling)[^0-9]*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if cp_match:
            result["cp"] = cp_match.group(1)
        if sp_match:
            result["sp"] = sp_match.group(1)
        if "cp" not in result and "sp" not in result and len(nums) >= 2:
            result["cp"] = nums[0]
            result["sp"] = nums[1]

    # ── Interest ──
    elif step_type_id in ("simple_interest", "compound_interest"):
        nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
        p_match = re.search(r'(?:principal|sum|amount|invested|deposited|loan)[^0-9]*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
        r_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|per\s*cent|p\.?a\.?)', q, re.IGNORECASE)
        t_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:year|yr|month)', q, re.IGNORECASE)
        if p_match:
            result["principal"] = p_match.group(1)
        if r_match:
            result["rate"] = r_match.group(1)
        if t_match:
            result["time"] = t_match.group(1)
        if "principal" not in result and len(nums) >= 1:
            result["principal"] = nums[0]
        if "rate" not in result and len(nums) >= 2:
            result["rate"] = nums[1]
        if "time" not in result and len(nums) >= 3:
            result["time"] = nums[2]

    # ── Ratio/Proportion ──
    elif step_type_id == "ratio_proportion":
        ratio_match = re.search(r'(\d+)\s*:\s*(\d+)\s*=\s*(\d+)\s*:\s*(\d+)', q)
        if ratio_match:
            result["a"] = ratio_match.group(1)
            result["b"] = ratio_match.group(2)
            result["c"] = ratio_match.group(3)
        else:
            nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
            if len(nums) >= 3:
                result["a"] = nums[0]
                result["b"] = nums[1]
                result["c"] = nums[2]

    # ── Prime factorization ──
    elif step_type_id == "prime_factorization":
        nums = re.findall(r'\b\d+\b', q)
        if nums:
            result["n"] = nums[0]

    # ── Is prime ──
    elif step_type_id == "is_prime":
        nums = re.findall(r'\b\d+\b', q)
        if nums:
            result["n"] = nums[0]

    # ── Exponents ──
    elif step_type_id == "exponents":
        m = re.search(r'(\d+)\s*\^\s*(\d+)', q)
        if m:
            result["base"] = m.group(1)
            result["power"] = m.group(2)

    # ── Square root ──
    elif step_type_id == "square_root":
        nums = re.findall(r'\b\d+\b', q)
        if nums:
            result["n"] = nums[0]

    # ── Determinant ──
    elif step_type_id == "determinant":
        # Extract matrix from [[...],[...]] format
        m = re.search(r'\[\[.*?\]\]', q)
        if m:
            result["matrix"] = m.group(0)

    return result


# ─────────────────────────────────────────────────────────────────────
# Main routing function — graph-based, no LLM
# ─────────────────────────────────────────────────────────────────────

async def route_question_graph(question: str) -> dict:
    """Route a free-text question using Neo4j fulltext search.

    No LLM, no embeddings. Just the graph.

    Returns:
        - question: the input
        - best_match: {node_id, topic, class_level, subject, ...}
        - candidates: top-5 graph nodes with scores
        - step_type_id: the solver operation to use (or None for conceptual)
        - extracted_values: values pulled from the question text
        - error: None or error message
    """
    if not question or not question.strip():
        return {
            "question": question or "",
            "best_match": None,
            "candidates": [],
            "step_type_id": None,
            "extracted_values": {},
            "error": "Please type a question.",
        }

    # Stage 1: Fulltext search on the graph (maths only)
    try:
        search_terms = _extract_search_terms(question)
        nodes = await GraphService.search_nodes(search_terms, limit=20)
    except Exception as e:
        logger.error(f"Graph search failed: {e}")
        return {
            "question": question,
            "best_match": None,
            "candidates": [],
            "step_type_id": None,
            "extracted_values": {},
            "error": f"Graph search failed: {e}",
        }

    if not nodes:
        return {
            "question": question,
            "best_match": None,
            "candidates": [],
            "step_type_id": None,
            "extracted_values": {},
            "error": "No matching topics found. Try rephrasing or browse topics.",
        }

    # Stage 2: Filter to math subject and re-rank
    math_nodes = [n for n in nodes if n["props"].get("subject") == "math"]
    if not math_nodes:
        math_nodes = nodes  # fallback to all if no math nodes

    # Stage 3: Determine the operation from the QUESTION text first
    # (more reliable than matching on node topic for ambiguous cases)
    q_lower = question.lower()
    step_type_id = None
    for pattern, sid, _ in NODE_OP_MAP:
        if re.search(pattern, q_lower):
            step_type_id = sid
            break

    # If no match from question text, try matching from best node topic
    if not step_type_id and math_nodes:
        best_props = math_nodes[0]["props"]
        op_match = _match_operation(
            best_props.get("topic", ""),
            best_props.get("content_snippet", ""),
        )
        step_type_id = op_match[0] if op_match else None

    # Stage 4: Re-rank candidates by relevance to the detected operation
    if step_type_id:
        # Boost nodes whose topic matches the operation pattern
        for n in math_nodes:
            topic = n["props"].get("topic", "").lower()
            syllabus = n["props"].get("content_snippet", "").lower()
            text = topic + " " + syllabus
            boost = 0
            for pattern, sid, _ in NODE_OP_MAP:
                if sid == step_type_id and re.search(pattern, text):
                    boost += 5
                    break
            # Penalize nodes where the operation keyword appears in a non-math context
            # e.g. "differentiate between events" is not calculus differentiation
            if step_type_id == "differentiate" and "between" in topic:
                boost -= 10
            n["score"] = n["score"] + boost
        math_nodes.sort(key=lambda x: x["score"], reverse=True)

    best = math_nodes[0]
    best_props = best["props"]
    best_score = best["score"]

    # Stage 5: Extract values from question
    extracted = {}
    if step_type_id:
        extracted = _extract_values(question, step_type_id)

    return {
        "question": question,
        "best_match": {
            "node_id": best_props.get("node_id"),
            "topic": best_props.get("topic"),
            "class_level": best_props.get("class_level"),
            "subject": best_props.get("subject"),
            "chapter_name": best_props.get("chapter_name"),
            "is_root": best_props.get("is_root"),
            "score": best_score,
        },
        "candidates": [
            {
                "node_id": n["props"].get("node_id"),
                "topic": n["props"].get("topic"),
                "class_level": n["props"].get("class_level"),
                "score": n["score"],
            }
            for n in math_nodes[:5]
        ],
        "step_type_id": step_type_id,
        "extracted_values": extracted,
        "error": None,
    }


def _extract_search_terms(question: str) -> str:
    """Extract math-relevant search terms from a question.

    Neo4j fulltext uses Lucene syntax — OR terms by default.
    We strip numbers and common words, keep math terms.
    """
    # Remove numbers (they don't help with topic matching)
    q = re.sub(r'\b\d+(?:\.\d+)?\b', '', question)
    # Remove common question words
    stop = {"find", "the", "a", "an", "of", "for", "and", "or", "to", "in",
            "is", "are", "was", "were", "be", "been", "show", "that", "prove",
            "verify", "check", "determine", "calculate", "compute", "evaluate",
            "solve", "what", "how", "many", "much", "if", "then", "given",
            "with", "respect", "where", "which", "from", "at", "on", "by",
            "has", "have", "had", "do", "does", "did", "will", "would",
            "can", "could", "should", "must", "shall", "may", "might",
            "this", "these", "those", "there", "here", "when", "why"}
    words = re.findall(r'[a-zA-Z]+', q.lower())
    terms = [w for w in words if w not in stop and len(w) >= 2]
    # Join with OR for Lucene
    return " ".join(terms) if terms else question
