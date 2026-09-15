"""Comprehensive audit of every question generator pattern.
Probe each generator to determine its exact interface."""
import sys, inspect, json
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

patterns = {}

for mod_name, entry in sorted(reg._question_gens.items()):
    for qt in entry.registry:
        fn = reg.get_question_gen(qt)
        if fn is None:
            continue

        info = {
            "module": mod_name,
            "type_name": type(fn).__name__,
            "is_class": isinstance(fn, type),
            "is_callable": callable(fn),
            "has_description": hasattr(fn, 'description') and not isinstance(fn, type),
            "has_stem": hasattr(fn, 'stem') and not isinstance(fn, type),
            "has_question_text": hasattr(fn, 'question_text') and not isinstance(fn, type),
            "has_question": hasattr(fn, 'question') and not isinstance(fn, type),
            "methods": [],
            "return_type": None,
            "text_field": None,
            "answer_field": None,
            "type_field": None,
            "pattern": None,
        }

        # Determine pattern
        if isinstance(fn, dict):
            info["pattern"] = "dict"
        elif not isinstance(fn, type) and hasattr(fn, 'description') and not callable(fn):
            info["pattern"] = "question_spec"
        elif isinstance(fn, type):
            # It's a class — check methods
            try:
                inst = fn()
                methods = [m for m in dir(inst) if not m.startswith('_') and callable(getattr(inst, m, None))]
                info["methods"] = methods[:10]

                # Find the generate method
                gen_methods = [m for m in methods if 'generate' in m.lower() or m in
                              ('mcq_classify', 'fill_blank', 'fill_blank_state', 'true_false_state',
                               'why_liquid', 'match_column')]
                if gen_methods:
                    info["pattern"] = "class_with_methods"
                    info["gen_method"] = gen_methods[0]

                    # Try calling it to see return type
                    try:
                        method = getattr(inst, gen_methods[0])
                        sig = inspect.signature(method)
                        params = list(sig.parameters.keys())
                        kwargs = {}
                        for p in params:
                            if p == 'self': continue
                            elif p == 'seed': kwargs[p] = 42
                            elif p == 'difficulty': kwargs[p] = 'Medium'
                            elif p in ('n', 'count', 'num_questions'): kwargs[p] = 1
                            elif p in ('node_id', 'node'): kwargs[p] = 'test'
                            elif p == 'qtype': kwargs[p] = None
                            elif p == 'mix': kwargs[p] = None

                        result = method(**kwargs) if kwargs else method()
                        info["return_type"] = type(result).__name__

                        # Check what fields the result has
                        if isinstance(result, list) and result:
                            q = result[0]
                        else:
                            q = result

                        if isinstance(q, dict):
                            info["text_field"] = next((k for k in ['question_text', 'stem', 'text', 'question', 'description'] if k in q), None)
                            info["answer_field"] = next((k for k in ['correct_answer', 'answer', 'model_answer'] if k in q), None)
                            info["type_field"] = next((k for k in ['question_type', 'qtype', 'type', 'q_type'] if k in q), None)
                        elif hasattr(q, 'question_text'):
                            info["text_field"] = 'question_text'
                            info["answer_field"] = 'correct_answer' if hasattr(q, 'correct_answer') else 'answer'
                        elif hasattr(q, 'stem'):
                            info["text_field"] = 'stem'
                            info["answer_field"] = 'answer'
                        elif hasattr(q, 'question'):
                            info["text_field"] = 'question'
                            info["answer_field"] = 'answer'
                        elif hasattr(q, 'questions'):
                            info["return_type"] = f"QuestionSet({len(q.questions)})"
                            if q.questions:
                                inner = q.questions[0]
                                if hasattr(inner, 'stem'):
                                    info["text_field"] = 'stem'
                                    info["answer_field"] = 'answer'
                                    info["type_field"] = 'qtype'
                                elif hasattr(inner, 'question_text'):
                                    info["text_field"] = 'question_text'
                                    info["answer_field"] = 'correct_answer'
                    except Exception as e:
                        info["call_error"] = str(e)[:80]
            except Exception as e:
                info["instantiate_error"] = str(e)[:80]
        elif callable(fn):
            # It's a function
            info["pattern"] = "function"
            try:
                sig = inspect.signature(fn)
                params = list(sig.parameters.keys())
                info["params"] = params

                # Try calling it
                kwargs = {}
                for p in params:
                    if p == 'seed': kwargs[p] = 42
                    elif p in ('n', 'count', 'num_questions'): kwargs[p] = 1
                    elif p == 'difficulty': kwargs[p] = 0.5
                    elif p in ('node_id', 'node'): kwargs[p] = 'test'
                    elif p == 'qtype': kwargs[p] = None
                    elif p == 'mix': kwargs[p] = None
                    elif p == 'do_verify': kwargs[p] = False
                    elif p == 'do_print': kwargs[p] = False
                    elif p == 'output_file': kwargs[p] = 'test_output.json'

                result = fn(**kwargs) if kwargs else fn()
                info["return_type"] = type(result).__name__

                if isinstance(result, tuple):
                    # (generator, json_str) pattern
                    info["pattern"] = "function_tuple"
                    gen = result[0]
                    if hasattr(gen, 'all_questions') and gen.all_questions:
                        q = gen.all_questions[0]
                        info["text_field"] = 'question_text' if hasattr(q, 'question_text') else 'stem'
                        info["answer_field"] = 'answer' if hasattr(q, 'answer') else 'correct_answer'
                    elif hasattr(gen, 'questions') and gen.questions:
                        q = gen.questions[0]
                        info["text_field"] = 'stem' if hasattr(q, 'stem') else 'question_text'
                        info["answer_field"] = 'answer' if hasattr(q, 'answer') else 'correct_answer'
                elif isinstance(result, list) and result:
                    q = result[0]
                    if isinstance(q, dict):
                        if 'questions' in q and isinstance(q['questions'], list):
                            info["pattern"] = "function_topic_container"
                            if q['questions']:
                                inner = q['questions'][0]
                                if isinstance(inner, dict):
                                    info["text_field"] = next((k for k in ['question_text', 'stem', 'text', 'question'] if k in inner), None)
                                    info["answer_field"] = next((k for k in ['correct_answer', 'answer'] if k in inner), None)
                        else:
                            info["text_field"] = next((k for k in ['question_text', 'stem', 'text', 'question'] if k in q), None)
                            info["answer_field"] = next((k for k in ['correct_answer', 'answer'] if k in q), None)
                    elif hasattr(q, 'question_text'):
                        info["text_field"] = 'question_text'
                        info["answer_field"] = 'correct_answer' if hasattr(q, 'correct_answer') else 'answer'
                    elif hasattr(q, 'stem'):
                        info["text_field"] = 'stem'
                        info["answer_field"] = 'answer'
                    elif hasattr(q, 'question'):
                        info["text_field"] = 'question'
                        info["answer_field"] = 'answer'
                elif isinstance(result, dict):
                    info["text_field"] = next((k for k in ['question_text', 'stem', 'text', 'question'] if k in result), None)
                    info["answer_field"] = next((k for k in ['correct_answer', 'answer'] if k in result), None)
                elif hasattr(result, 'questions'):
                    info["return_type"] = f"QuestionSet({len(result.questions)})"
                    if result.questions:
                        q = result.questions[0]
                        info["text_field"] = 'stem' if hasattr(q, 'stem') else 'question_text'
                        info["answer_field"] = 'answer' if hasattr(q, 'answer') else 'correct_answer'
            except Exception as e:
                info["call_error"] = str(e)[:80]

        patterns[qt] = info

# Summarize patterns
from collections import Counter
pattern_counts = Counter(p["pattern"] for p in patterns.values())
print("=== PATTERN DISTRIBUTION ===")
for pat, count in pattern_counts.most_common():
    print(f"  {pat}: {count}")

# Show examples of each pattern
print("\n=== PATTERN EXAMPLES ===")
seen = set()
for qt, info in patterns.items():
    pat = info["pattern"]
    if pat in seen:
        continue
    seen.add(pat)
    print(f"\n--- {pat} ---")
    print(f"  type: {qt} (module: {info['module']})")
    print(f"  return_type: {info['return_type']}")
    print(f"  text_field: {info['text_field']}")
    print(f"  answer_field: {info['answer_field']}")
    print(f"  type_field: {info['type_field']}")
    if info.get('gen_method'):
        print(f"  gen_method: {info['gen_method']}")
    if info.get('params'):
        print(f"  params: {info['params']}")
    if info.get('call_error'):
        print(f"  call_error: {info['call_error']}")
    if info.get('instantiate_error'):
        print(f"  instantiate_error: {info['instantiate_error']}")

# Save full audit
with open("_generator_audit.json", "w") as f:
    json.dump(patterns, f, indent=2, default=str)
print(f"\nFull audit saved to _generator_audit.json ({len(patterns)} generators)")
