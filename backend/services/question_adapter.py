"""Question generator adapter layer.

Normalizes all question generator patterns into one common interface:

    adapter = QuestionAdapter.wrap(generator_fn)
    questions = adapter.generate(seed=42, count=5, difficulty=0.5)
    # -> List[NormalizedQuestion] with guaranteed fields

This eliminates the trial-and-error approach in QuestionSelector by detecting
the generator pattern ONCE at wrap time and creating a dedicated adapter.

Supported patterns (auto-detected):
  - function:          Plain function returning List[Dict] or List[Question]
  - function_tuple:    Function returning (generator, json_str)
  - function_topic_container: Function returning list of topic containers
  - class_with_methods: Class with generate()/specific methods
  - question_spec:     QuestionSpec template object (description, variant)
  - dict:              Pre-built question dictionary
  - dataclass:         Question/ChemistryQuestion dataclass instance

The NormalizedQuestion dict always has these keys:
  - question_id: str
  - question_text: str
  - correct_answer: str
  - question_type: str
  - difficulty: str ("Easy"/"Medium"/"Hard")
  - options: Optional[List[str]]
  - explanation: str
  - cognitive_level: str (Bloom's)
  - competency: str
  - source: str
"""

from __future__ import annotations

import inspect
import logging
from typing import Any, Callable, Dict, List, Optional, Protocol, runtime_checkable

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Normalized output type
# ---------------------------------------------------------------------------

def _fallback_question_id(source: str, seed: Optional[int], idx: int) -> str:
    """Id minted when a generator question carries no question_id/id.

    MUST be unique per generated question.  Seeded generators emit a
    different question per seed, so the id carries the seed; a seed-blind
    fallback (the old ``{source}_{idx}``) gave every question from the
    same generator the SAME id, which collided across questions and made
    the practice session store overwrite an already-displayed question —
    the graded-feedback-describes-a-different-question defect.
    """
    if seed is not None:
        return f"{source}_{int(seed)}_{idx}"
    return f"{source}_{idx}"


def normalize_question(
    raw: Any, source: str, idx: int, difficulty: float,
    seed: Optional[int] = None,
) -> Optional[Dict[str, Any]]:
    """Convert any question-like object into a normalized dict.

    This is the single source of truth for field name mapping.
    Handles: dict, Question dataclass (question_text/stem/question),
    ChemistryQuestion (question/answer), QuestionSpec (description/variant).

    ``seed`` (the generation seed the question came from) only affects the
    fallback question_id — unseeded/static adapters keep their stable id.
    """
    if raw is None:
        return None

    # --- Convert objects to dict ---
    if not isinstance(raw, dict):
        # Try to_dict first
        if hasattr(raw, 'to_dict') and callable(raw.to_dict):
            try:
                d = raw.to_dict()
                if isinstance(d, dict):
                    raw = d
                else:
                    raw = {a: getattr(raw, a) for a in dir(raw)
                           if not a.startswith('_') and not callable(getattr(raw, a, None))}
            except Exception:
                raw = {a: getattr(raw, a) for a in dir(raw)
                       if not a.startswith('_') and not callable(getattr(raw, a, None))}
        elif hasattr(raw, 'as_dict') and callable(raw.as_dict):
            try:
                d = raw.as_dict()
                if isinstance(d, dict):
                    raw = d
                else:
                    raw = {a: getattr(raw, a) for a in dir(raw)
                           if not a.startswith('_') and not callable(getattr(raw, a, None))}
            except Exception:
                raw = {a: getattr(raw, a) for a in dir(raw)
                       if not a.startswith('_') and not callable(getattr(raw, a, None))}
        else:
            raw = {a: getattr(raw, a) for a in dir(raw)
                   if not a.startswith('_') and not callable(getattr(raw, a, None))}

    # --- Extract text (single source of truth for field names) ---
    text = (raw.get('question_text') or raw.get('stem') or
            raw.get('question') or raw.get('description') or
            raw.get('prompt') or raw.get('text') or '')
    # Ensure text is a string — some generators store Question objects in these fields
    if not isinstance(text, str):
        # Could be a Question object with its own question_text/stem field
        if hasattr(text, 'question_text'):
            text = text.question_text
        elif hasattr(text, 'stem'):
            text = text.stem
        elif hasattr(text, 'question'):
            text = text.question
        elif hasattr(text, 'text'):
            text = text.text
        elif hasattr(text, 'description'):
            text = text.description
        elif hasattr(text, 'prompt'):
            text = text.prompt
        else:
            text = str(text)
    if not text or not isinstance(text, str):
        return None

    # --- Extract answer ---
    # NOTE: a 0-indexed MCQ key (int 0) is a VALID answer — the old
    # `str(answer) if answer else ''` destroyed every first-option key
    # (observed live: 'Father of Sociology', answer 0, normalized to
    # '' → served MCQ had no grading key).  Only None/'' mean missing.
    answer = (raw.get('correct_answer') if raw.get('correct_answer') is not None
              else raw.get('answer') if raw.get('answer') is not None
              else raw.get('model_answer') if raw.get('model_answer') is not None
              else raw.get('key') if raw.get('key') is not None
              else raw.get('expected') if raw.get('expected') is not None
              else '')

    # --- Extract question type ---
    qtype = (raw.get('question_type') or raw.get('qtype') or
             raw.get('type') or raw.get('q_type') or raw.get('variant') or
             raw.get('task_type') or 'mcq_single')

    # --- Map variant names to standard types ---
    variant_map = {
        'fill_blank': 'fill_blank', 'fill': 'fill_blank',
        'true_false': 'true_false', 'tf': 'true_false',
        'mcq': 'mcq_single', 'mcq_single': 'mcq_single',
        'match': 'match_columns', 'match_column': 'match_columns',
        'enumerate': 'short_answer', 'short_answer': 'short_answer',
        'sort': 'sort', 'scenario': 'short_answer',
        'numerical': 'numerical', 'long_answer': 'long_answer',
        'definition': 'short_answer',
    }
    qtype = variant_map.get(str(qtype).lower(), str(qtype))

    # --- Difficulty ---
    raw_diff = raw.get('difficulty')
    if raw_diff is None:
        diff_label = 'Easy' if difficulty < 0.4 else 'Hard' if difficulty > 0.6 else 'Medium'
    else:
        diff_label = str(raw_diff)

    return {
        'question_id': str(raw.get('question_id') or raw.get('id')
                           or _fallback_question_id(source, seed, idx)),
        'question_text': text,
        'correct_answer': ('' if answer is None or answer == ''
                           else str(answer)),
        'question_type': qtype,
        'difficulty': diff_label,
        'options': raw.get('options'),
        'explanation': raw.get('explanation') or raw.get('solution') or raw.get('explanation_text') or '',
        'cognitive_level': raw.get('cognitive_level') or raw.get('bloom_level') or raw.get('competency') or '',
        'competency': raw.get('competency') or '',
        'source': source,
        'marks': raw.get('marks', 1),
        'node_id': raw.get('node_id', ''),
        'node_name': raw.get('node_name', ''),
    }


def extract_from_result(result: Any, source: str, idx: int, difficulty: float,
                        seed: Optional[int] = None) -> Optional[Dict[str, Any]]:
    """Extract a single question from any generation result type.

    Handles: List[Question], QuestionSet, single dict, tuple (gen, json),
    topic containers with nested 'questions' key.

    ``seed`` is forwarded to normalize_question so seedless generator
    questions get a seed-unique fallback id.
    """
    if result is None:
        return None

    # Tuple: (generator, json_str) or (dict_of_nodes, stats) — extract from first element
    if isinstance(result, tuple) and len(result) >= 1:
        gen = result[0]
        # Try all_questions first
        if hasattr(gen, 'all_questions') and gen.all_questions:
            return normalize_question(gen.all_questions[idx % len(gen.all_questions)],
                                      source, idx, difficulty, seed=seed)
        # Try questions
        if hasattr(gen, 'questions') and gen.questions:
            return normalize_question(gen.questions[idx % len(gen.questions)],
                                      source, idx, difficulty, seed=seed)
        # Dict of node_id → List[Question] (e.g. class1_maths return)
        if isinstance(gen, dict):
            all_qs = []
            for v in gen.values():
                if isinstance(v, list):
                    all_qs.extend(v)
            if all_qs:
                return normalize_question(all_qs[idx % len(all_qs)],
                                          source, idx, difficulty, seed=seed)
        return None

    # List — could be questions or topic containers
    if isinstance(result, list) and result:
        item = result[idx % len(result)]

        # Topic container: dict with 'questions' key
        if isinstance(item, dict) and 'questions' in item and isinstance(item['questions'], list):
            if item['questions']:
                return normalize_question(item['questions'][idx % len(item['questions'])],
                                          source, idx, difficulty, seed=seed)
            return None

        return normalize_question(item, source, idx, difficulty, seed=seed)

    # QuestionSet object — has .questions list
    if hasattr(result, 'questions') and isinstance(getattr(result, 'questions', None), list):
        qs = result.questions
        if qs:
            return normalize_question(qs[idx % len(qs)], source, idx, difficulty, seed=seed)
        return None

    # Single dict
    if isinstance(result, dict):
        # Topic container with 'questions' key
        if 'questions' in result and isinstance(result['questions'], list):
            if result['questions']:
                return normalize_question(result['questions'][idx % len(result['questions'])],
                                          source, idx, difficulty, seed=seed)
        # Dict of node_id → List[Question] (e.g. generate_all_questions return)
        # Detect: all values are lists
        if all(isinstance(v, list) for v in result.values()) and result:
            all_qs = []
            for v in result.values():
                all_qs.extend(v)
            if all_qs:
                return normalize_question(all_qs[idx % len(all_qs)],
                                          source, idx, difficulty, seed=seed)
            return None
        return normalize_question(result, source, idx, difficulty, seed=seed)

    # Single question object
    return normalize_question(result, source, idx, difficulty, seed=seed)


# ---------------------------------------------------------------------------
# Adapter classes — one per pattern
# ---------------------------------------------------------------------------

class QuestionAdapter:
    """Base adapter. Use QuestionAdapter.wrap() to auto-detect pattern."""

    def __init__(self, fn: Any, qtype: str):
        self.fn = fn
        self.qtype = qtype
        self.source = f"generator:{qtype}"

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        """Generate normalized questions. Override in subclasses."""
        return []

    @staticmethod
    def wrap(fn: Any, qtype: str) -> Optional['QuestionAdapter']:
        """Auto-detect generator pattern and return the right adapter.

        Detection happens ONCE at wrap time, not on every call.
        """
        if fn is None:
            return None

        # Pattern 1: Pre-built dict — could be a question dict or a function map
        if isinstance(fn, dict):
            # Check if it's a function map (values are callable)
            if all(callable(v) for v in fn.values() if v is not None):
                return FunctionMapAdapter(fn, qtype)
            # Otherwise it's a question dict
            return DictAdapter(fn, qtype)

        # Pattern 2: QuestionSpec (has description, not callable, not a class)
        if not isinstance(fn, type) and not callable(fn) and hasattr(fn, 'description'):
            return QuestionSpecAdapter(fn, qtype)

        # Pattern 3: Question dataclass instance (has question_text/stem, not callable)
        if not isinstance(fn, type) and not callable(fn):
            if hasattr(fn, 'question_text') or hasattr(fn, 'stem') or hasattr(fn, 'question'):
                return DataclassAdapter(fn, qtype)

        # Pattern 4: Plain function
        if callable(fn) and not isinstance(fn, type):
            return FunctionAdapter.wrap(fn, qtype)

        # Pattern 5: Class
        if isinstance(fn, type):
            return ClassAdapter.wrap(fn, qtype)

        return None


class DictAdapter(QuestionAdapter):
    """Adapter for pre-built question dictionaries."""

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        q = normalize_question(self.fn, self.source, 0, difficulty)
        return [q] if q else []


class FunctionMapAdapter(QuestionAdapter):
    """Adapter for dicts that map question types to generator functions.

    e.g. {'mcq': lambda seed, difficulty: ..., 'fill_blank': lambda ...}
    """

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        questions = []
        types = list(self.fn.keys())
        for i in range(count):
            qtype_key = types[i % len(types)]
            gen_fn = self.fn[qtype_key]
            if not callable(gen_fn):
                continue
            try:
                sig = inspect.signature(gen_fn)
                params = list(sig.parameters.keys())
                kwargs = {}
                for p in params:
                    if p == 'seed': kwargs[p] = seed + i
                    elif p == 'difficulty': kwargs[p] = difficulty
                    elif p in ('n', 'count'): kwargs[p] = 1
                    elif p in ('node_id', 'node'): kwargs[p] = f"diag_{self.qtype}_{i}"

                result = gen_fn(**kwargs) if kwargs else gen_fn()
                q = extract_from_result(result, self.source, i, difficulty,
                                        seed=seed + i)
                if q:
                    q['question_type'] = str(qtype_key)
                    questions.append(q)
            except Exception as e:
                logger.debug("FunctionMapAdapter %s/%s failed: %s", self.qtype, qtype_key, e)
        return questions


class QuestionSpecAdapter(QuestionAdapter):
    """Adapter for QuestionSpec template objects (Class 1 Physics etc.)."""

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        q = normalize_question(self.fn, self.source, 0, difficulty)
        return [q] if q else []


class DataclassAdapter(QuestionAdapter):
    """Adapter for pre-instantiated Question dataclass objects."""

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        q = normalize_question(self.fn, self.source, 0, difficulty)
        return [q] if q else []


class FunctionAdapter(QuestionAdapter):
    """Adapter for plain function generators.

    Detects parameter names and return type at wrap time.
    """

    def __init__(self, fn: Callable, qtype: str, params: List[str],
                 is_tuple: bool = False, is_topic_container: bool = False):
        super().__init__(fn, qtype)
        self.params = params
        self.is_tuple = is_tuple
        self.is_topic_container = is_topic_container

    def _build_kwargs(self, seed: int, count: int, difficulty: float) -> Dict[str, Any]:
        kwargs = {}
        for p in self.params:
            if p == 'seed':
                kwargs[p] = seed
            elif p in ('n', 'count', 'num_questions', 'n_per_node', 'questions_per_node'):
                kwargs[p] = count
            elif p == 'difficulty':
                # Check annotation for float vs string
                kwargs[p] = difficulty  # pass float; adapter handles conversion
            elif p in ('node_id', 'node'):
                # Try to construct a valid node_id from the module name
                # e.g. "class4_bio_questions:generate" -> "c4_bio_001"
                mod_name = self.qtype.split(':')[0] if ':' in self.qtype else self.qtype
                node_id = self._guess_node_id(mod_name, seed)
                kwargs[p] = node_id
            elif p == 'qtype':
                kwargs[p] = 'mcq'
            elif p == 'vg':
                # VarGen — a seeded random wrapper used by class11/12 chem generators
                # Try to construct the actual VarGen from the module
                import inspect as _ins
                mod = _ins.getmodule(self.fn)
                VarGen = getattr(mod, 'VarGen', None) if mod else None
                if VarGen:
                    kwargs[p] = VarGen(seed)
                else:
                    # Fallback: use random.Random (may not work if VarGen has custom methods)
                    import random as _rng
                    kwargs[p] = _rng.Random(seed)
            elif p == 'rng':
                # random.Random — used by class12_physics generators
                import random as _rng
                kwargs[p] = _rng.Random(seed)
            elif p == 'mix':
                kwargs[p] = None
            elif p == 'do_verify':
                kwargs[p] = False
            elif p == 'do_print':
                kwargs[p] = False
            elif p == 'output_file':
                kwargs[p] = f"_gen_{self.qtype}_{seed}.json"
            elif p == 'include_verification':
                kwargs[p] = False
        return kwargs

    @staticmethod
    def _guess_node_id(mod_name: str, seed: int) -> str:
        """Guess a valid node_id from module name.
        e.g. class4_bio_questions -> c4_bio_001
        e.g. class7_maths_questions -> c7_math_001 (singular form)
        """
        import re as _re
        m = _re.match(r'class(\d+)_([a-z]+)_questions', mod_name)
        if m:
            grade = m.group(1)
            subj = m.group(2)
            # Try singular first (most common), then plural
            candidates = [
                f"c{grade}_{subj.rstrip('s')}_001" if subj.endswith('s') else None,
                f"c{grade}_{subj}_001",
                f"c{grade}_{subj}s_001" if not subj.endswith('s') else None,
            ]
            for c in candidates:
                if c:
                    return c
        return f"diag_{mod_name}_{seed}"

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        try:
            kwargs = self._build_kwargs(seed, count, difficulty)
            result = self.fn(**kwargs) if kwargs else self.fn()
        except Exception as e:
            # Retry with difficulty as string label
            try:
                kwargs = self._build_kwargs(seed, count, difficulty)
                if 'difficulty' in kwargs:
                    kwargs['difficulty'] = 'Easy' if difficulty < 0.4 else 'Hard' if difficulty > 0.6 else 'Medium'
                result = self.fn(**kwargs) if kwargs else self.fn()
            except Exception as e2:
                logger.debug("FunctionAdapter %s failed: %s / %s", self.qtype, e, e2)
                return []

        questions = []
        for i in range(count):
            q = extract_from_result(result, self.source, i, difficulty,
                                    seed=seed)
            if q:
                questions.append(q)
            else:
                break
        return questions

    @staticmethod
    def wrap(fn: Callable, qtype: str) -> Optional['FunctionAdapter']:
        try:
            sig = inspect.signature(fn)
            params = list(sig.parameters.keys())

            # Detect tuple return (generator, json_str)
            is_tuple = False
            is_topic_container = False
            try:
                test_kwargs = {}
                for p in params:
                    if p == 'seed': test_kwargs[p] = 42
                    elif p in ('n', 'count', 'num_questions', 'n_per_node', 'questions_per_node'): test_kwargs[p] = 1
                    elif p == 'difficulty': test_kwargs[p] = 0.5
                    elif p in ('node_id', 'node'): test_kwargs[p] = 'test'
                    elif p == 'qtype': test_kwargs[p] = None
                    elif p == 'mix': test_kwargs[p] = None
                    elif p == 'do_verify': test_kwargs[p] = False
                    elif p == 'do_print': test_kwargs[p] = False
                    elif p == 'output_file': test_kwargs[p] = f"_test_{qtype}.json"
                    elif p == 'include_verification': test_kwargs[p] = False
                    elif p == 'rng':
                        import random as _r
                        test_kwargs[p] = _r.Random(42)
                    elif p == 'vg':
                        import inspect as _ins2
                        _mod = _ins2.getmodule(fn)
                        _VG = getattr(_mod, 'VarGen', None) if _mod else None
                        if _VG:
                            test_kwargs[p] = _VG(42)

                result = fn(**test_kwargs) if test_kwargs else fn()
                if isinstance(result, tuple):
                    is_tuple = True
                elif isinstance(result, list) and result:
                    if isinstance(result[0], dict) and 'questions' in result[0]:
                        is_topic_container = True
            except Exception:
                pass  # Detection failed — will try at call time

            return FunctionAdapter(fn, qtype, params, is_tuple, is_topic_container)
        except Exception as e:
            logger.debug("FunctionAdapter.wrap failed for %s: %s", qtype, e)
            return None


class ClassAdapter(QuestionAdapter):
    """Adapter for class-based generators.

    Detects the correct method to call at wrap time.
    """

    def __init__(self, cls: type, qtype: str, method_name: str, params: List[str]):
        super().__init__(cls, qtype)
        self.method_name = method_name
        self.params = params

    def generate(self, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        try:
            # Try passing seed to constructor
            try:
                instance = self.fn(seed=seed)
            except (TypeError, Exception):
                instance = self.fn()
        except Exception as e:
            logger.debug("ClassAdapter %s instantiation failed: %s", self.qtype, e)
            return []

        if not hasattr(instance, self.method_name):
            return []

        method = getattr(instance, self.method_name)

        # Build kwargs
        mod_name = self.qtype.split(':')[0] if ':' in self.qtype else self.qtype
        kwargs = {}
        for p in self.params:
            if p == 'self': continue
            elif p == 'seed': kwargs[p] = seed
            elif p in ('n', 'count', 'num_questions', 'n_per_node', 'questions_per_node'): kwargs[p] = count
            elif p == 'difficulty':
                kwargs[p] = difficulty
            elif p in ('node_id', 'node'):
                kwargs[p] = FunctionAdapter._guess_node_id(mod_name, seed)
            elif p == 'qtype': kwargs[p] = 'mcq'
            elif p == 'competency_type': kwargs[p] = None
            elif p == 'mix': kwargs[p] = None

        try:
            result = method(**kwargs)
        except Exception:
            # Retry with string difficulty
            try:
                kwargs['difficulty'] = 'Easy' if difficulty < 0.4 else 'Hard' if difficulty > 0.6 else 'Medium'
                result = method(**kwargs)
            except Exception as e:
                logger.debug("ClassAdapter %s call failed: %s", self.qtype, e)
                return []

        questions = []
        for i in range(count):
            q = extract_from_result(result, self.source, i, difficulty,
                                    seed=seed)
            if q:
                questions.append(q)
            else:
                break
        return questions

    # Methods that are clearly utility, not question generation
    _UTILITY_METHODS = frozenset({
        'to_dict', 'to_json', 'summary', 'verify', 'verify_all', 'flatten',
        'by_node', 'by_type', 'by_difficulty', 'print_question', 'print_paper',
        'print_quiz', 'print_questions', 'solve_question', 'solve_generated_question',
        'evaluate_quiz', 'quiz_to_markdown', 'quiz_to_markdown_with_answers',
        'get_all_questions', 'get_questions_by_node', 'get_question_by_id',
        'get_questions_for_node', 'get_node_questions', 'regenerate_with_seed',
        'display_full_assessment', 'display_worksheet', 'print_question_paper',
        'export_questions_json', 'bank_stats', 'make_rng', 'make_seed',
        'make_seeded_rng', 'questions_to_dicts', 'questions_to_json',
        'verify_questions', 'verify_all_questions', 'generate_and_verify',
        'format_question', 'question_to_dict',
    })

    # Priority method names to try
    _GEN_METHOD_PRIORITY = [
        'generate', 'generate_questions', 'generate_question',
        'generate_paper', 'generate_quiz', 'generate_worksheet',
        'generate_full_set', 'generate_all', 'generate_set',
        'generate_batch', 'generate_full_assessment', 'generate_worksheet',
        'build_question_bank',
    ]

    @staticmethod
    def wrap(cls: type, qtype: str) -> Optional['ClassAdapter']:
        try:
            instance = cls()
        except Exception as e:
            logger.debug("ClassAdapter %s can't instantiate: %s", qtype, e)
            return None

        methods = [m for m in dir(instance)
                   if not m.startswith('_') and callable(getattr(instance, m, None))]

        # Try priority methods first
        for method_name in ClassAdapter._GEN_METHOD_PRIORITY:
            if method_name in methods:
                try:
                    sig = inspect.signature(getattr(instance, method_name))
                    params = list(sig.parameters.keys())
                    # Quick test
                    mod_name = qtype.split(':')[0] if ':' in qtype else qtype
                    kwargs = {}
                    for p in params:
                        if p == 'self': continue
                        elif p == 'seed': kwargs[p] = 42
                        elif p in ('n', 'count', 'num_questions', 'n_per_node', 'questions_per_node'): kwargs[p] = 1
                        elif p == 'difficulty': kwargs[p] = 0.5
                        elif p in ('node_id', 'node'): kwargs[p] = FunctionAdapter._guess_node_id(mod_name, 42)
                        elif p == 'qtype': kwargs[p] = 'mcq'
                        elif p == 'competency_type': kwargs[p] = None
                        elif p == 'mix': kwargs[p] = None

                    result = getattr(instance, method_name)(**kwargs) if kwargs else getattr(instance, method_name)()
                    if result is not None:
                        return ClassAdapter(cls, qtype, method_name, params)
                except Exception:
                    continue

        # Try specific question-type methods (mcq_classify, fill_blank, etc.)
        specific = [m for m in methods
                    if m not in ClassAdapter._UTILITY_METHODS
                    and m not in ClassAdapter._GEN_METHOD_PRIORITY
                    and not m.startswith('get_')
                    and not m.startswith('print_')
                    and not m.startswith('verify_')
                    and not m.startswith('display_')]

        for method_name in specific[:10]:
            try:
                sig = inspect.signature(getattr(instance, method_name))
                params = list(sig.parameters.keys())
                kwargs = {}
                for p in params:
                    if p == 'self': continue
                    elif p == 'seed': kwargs[p] = 42
                    elif p == 'difficulty': kwargs[p] = 'Medium'
                    elif p in ('node_id', 'node'): kwargs[p] = 'test'

                result = getattr(instance, method_name)(**kwargs) if kwargs else getattr(instance, method_name)()
                if result is not None:
                    return ClassAdapter(cls, qtype, method_name, params)
            except Exception:
                continue

        return None


# ---------------------------------------------------------------------------
# Adapter Registry — caches adapters at first use
# ---------------------------------------------------------------------------

class AdapterRegistry:
    """Registry that wraps raw generators in adapters, cached by qtype."""

    def __init__(self):
        self._adapters: Dict[str, Optional[QuestionAdapter]] = {}
        self._solver_registry = None

    def set_solver_registry(self, reg):
        self._solver_registry = reg

    def get_adapter(self, qtype: str) -> Optional[QuestionAdapter]:
        """Get or create an adapter for a question type."""
        if qtype in self._adapters:
            return self._adapters[qtype]

        if self._solver_registry is None:
            self._adapters[qtype] = None
            return None

        fn = self._solver_registry.get_question_gen(qtype)
        if fn is None:
            self._adapters[qtype] = None
            return None

        adapter = QuestionAdapter.wrap(fn, qtype)
        self._adapters[qtype] = adapter
        if adapter is None:
            logger.debug("No adapter could wrap %s (pattern: %s)", qtype, type(fn).__name__)
        return adapter

    def generate(self, qtype: str, seed: int, count: int, difficulty: float) -> List[Dict[str, Any]]:
        """Generate questions through the adapter for a given qtype."""
        adapter = self.get_adapter(qtype)
        if adapter is None:
            return []
        return adapter.generate(seed, count, difficulty)

    def clear_cache(self):
        self._adapters.clear()
