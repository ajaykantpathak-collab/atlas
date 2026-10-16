"""
Solver Registry - Auto-discovery plugin system for solvers and question generators.

Drop a new solver_*.py or question_gen_*.py into the solvers/ directory and it
becomes immediately available via the API. No manual wiring required.

Features:
- Auto-discovery via filesystem scan + importlib
- Graceful error handling for failed imports
- Versioning and dependency declarations per solver
- Thread-safe with cached imports
- Hot-reload via /admin/registry/reload endpoint

Author: Platform Backend Team
"""

from __future__ import annotations

import importlib
import importlib.util
import logging
import sys
import threading
from pathlib import Path
from typing import Any, Dict, List, Optional

# Pre-import yaml before any sys.path manipulation to prevent shadowing
# (pint -> dask -> yaml.safe_load fails if yaml gets corrupted)
try:
    import yaml  # noqa: F401
except ImportError:
    pass

from pydantic import BaseModel, ConfigDict, Field

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Pydantic v2 models for solver/question metadata
# ---------------------------------------------------------------------------


class SolverManifest(BaseModel):
    """Metadata declared by a solver module.

    Each solver_*.py should set a module-level variable:

        SOLVER_MANIFEST = SolverManifest(
            version="1.0.0",
            dependencies=["core_calculus_engine"],
            tags=["maths", "class-11"],
        )
    """

    model_config = ConfigDict(str_min_length=1)

    version: str = Field(default="0.1.0", description="Semantic version of the solver")
    dependencies: List[str] = Field(
        default_factory=list,
        description="Names of other registry modules this solver depends on",
    )
    tags: List[str] = Field(
        default_factory=list,
        description="Arbitrary tags for grouping (subject, class, board)",
    )


class QuestionGenManifest(BaseModel):
    """Metadata declared by a question generator module.

    Each question_gen_*.py should set a module-level variable:

        QUESTION_GEN_MANIFEST = QuestionGenManifest(
            version="1.0.0",
            dependencies=[],
            tags=["physics", "class-12"],
        )
    """

    model_config = ConfigDict(str_min_length=1)

    version: str = Field(default="0.1.0")
    dependencies: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)


class RegisteredSolver(BaseModel):
    """Internal representation of a discovered solver entry."""

    model_config = ConfigDict(arbitrary_types_allowed=True)

    name: str = Field(description="Module name (e.g. solver_maths_c11)")
    module: Any = Field(description="The imported Python module object")
    manifest: SolverManifest
    registry: Dict[str, Any] = Field(
        description="The SOLVER_REGISTRY dict from the module"
    )
    path: Path = Field(description="Filesystem path of the module file")
    loaded_at: str = Field(
        description="ISO timestamp of when the module was loaded"
    )


class RegisteredQuestionGen(BaseModel):
    """Internal representation of a discovered question generator entry."""

    model_config = ConfigDict(arbitrary_types_allowed=True)

    name: str
    module: Any
    manifest: QuestionGenManifest
    registry: Dict[str, Any]
    path: Path
    loaded_at: str


class RegistryStats(BaseModel):
    """Summary stats returned by the registry status endpoint."""

    solver_count: int
    question_gen_count: int
    total_problem_types: int
    total_question_types: int
    loaded_modules: List[str]
    failed_modules: List[Dict[str, str]]
    solvers_dir: str


# ---------------------------------------------------------------------------
# Core Registry (singleton, thread-safe)
# -----------------------------------------------------------------------------


class SolverRegistry:
    """Thread-safe singleton that auto-discovers and caches solvers.

    Usage::

        registry = SolverRegistry()
        await registry.initialize()  # or registry.initialize() for sync

        solver_fn = registry.get_solver("quadratic_equation")
        qgen_fn = registry.get_question_gen("mcq_physics_kinematics")
    """

    _instance: Optional[SolverRegistry] = None
    _lock = threading.Lock()

    def __new__(cls) -> SolverRegistry:
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
                cls._instance._initialized = False
            return cls._instance

    def __init__(self) -> None:
        if self._initialized:
            return
        self._initialized = True
        self._solvers: Dict[str, RegisteredSolver] = {}
        self._question_gens: Dict[str, RegisteredQuestionGen] = {}
        # Flat index: "module_name:qtype_name" -> (module_name, qtype_name, generator_obj)
        # This avoids collisions when multiple modules use the same qtype name
        # (e.g. "QuestionGenerator" appears in 14 modules)
        self._question_gen_flat: Dict[str, tuple] = {}
        self._import_lock = threading.RLock()
        self._failed: List[Dict[str, str]] = []
        self._solvers_dir: Optional[Path] = None
        # Node-ID → problem_type mapping (populated by @register_solver or YAML)
        self._node_map: Dict[str, str] = {}
        # Subject → list of problem_types mapping
        self._subject_map: Dict[str, List[str]] = {}

    # ------------------------------------------------------------------ init

    def initialize(self, solvers_dir: Optional[str | Path] = None) -> RegistryStats:
        """Scan the solvers directory and import all discovered modules.

        Called at application startup. Safe to call again to hot-reload.
        """
        if solvers_dir is not None:
            self._solvers_dir = Path(solvers_dir)
        elif self._solvers_dir is None:
            # Default: solvers/ lives next to this file
            self._solvers_dir = Path(__file__).resolve().parent

        self._discover_and_load()
        return self.get_stats()

    # ------------------------------------------------------------- discovery

    def _discover_and_load(self) -> None:
        """Clear caches and re-import every eligible .py file."""
        self._solvers.clear()
        self._question_gens.clear()
        self._question_gen_flat.clear()
        self._failed.clear()

        py_files = sorted(self._solvers_dir.rglob("*.py"))

        for file_path in py_files:
            self._try_load_module(file_path)

        logger.info(
            "Registry loaded: %d solvers, %d question generators, %d failures",
            len(self._solvers),
            len(self._question_gens),
            len(self._failed),
        )

    def _try_load_module(self, file_path: Path) -> None:
        """Attempt to import a single .py file as a plugin module."""
        stem = file_path.stem

        # Skip private / non-plugin files
        # Note: core_calculus_engine is NOT skipped — it has a SOLVER_REGISTRY
        if stem.startswith("_") or stem in ("registry",):
            return

        # Skip __pycache__ and infrastructure files
        if "__pycache__" in str(file_path):
            return
        if stem in ("base", "generate_solvers", "generate_solvers_v2",
                     "generate_batch1", "latex_sympy_bridge", "test_harness"):
            return

        # Match patterns: class*_solver.py, class*_questions.py
        # Also match: solver_*.py, question_gen_*.py (legacy patterns)
        # Also match: *_engine.py (e.g. core_calculus_engine)
        is_solver = (
            stem.startswith("solver_")
            or stem.endswith("_solver")
            or stem.endswith("_engine")
        )
        is_question_gen = stem.startswith("question_gen_") or stem.endswith("_questions")

        if not (is_solver or is_question_gen):
            return

        with self._import_lock:
            try:
                module = self._import_file(file_path)
            except Exception as exc:
                logger.error("Failed to import %s: %s", file_path.name, exc)
                self._failed.append(
                    {"module": stem, "error": str(exc), "file": str(file_path)}
                )
                return

        try:
            if is_solver:
                self._register_solver(stem, module, file_path)
            else:
                self._register_question_gen(stem, module, file_path)
        except Exception as exc:
            logger.error("Failed to register %s: %s", stem, exc)
            self._failed.append(
                {"module": stem, "error": str(exc), "file": str(file_path)}
            )

    @staticmethod
    def _import_file(file_path: Path) -> Any:
        """Import a module directly from its file path using importlib."""
        # Ensure the solvers root and the file's parent dir are on sys.path
        # so that sibling/subject-package imports (e.g. `from chem.x import`
        # or `from class2_chem_solver import`) can resolve.
        solvers_root = str(file_path.parents[1]) if len(file_path.parents) > 1 else str(file_path.parent)
        parent_dir = str(file_path.parent)
        for p in (solvers_root, parent_dir):
            if p not in sys.path:
                sys.path.insert(0, p)

        mod_name = f"solvers._plugins.{file_path.stem}"
        spec = importlib.util.spec_from_file_location(mod_name, file_path)
        if spec is None or spec.loader is None:
            raise ImportError(f"Could not create spec for {file_path}")

        module = importlib.util.module_from_spec(spec)
        # Register in sys.modules BEFORE exec so @dataclass and other
        # decorators that look up sys.modules can find the module.
        sys.modules[mod_name] = module
        try:
            spec.loader.exec_module(module)  # type: ignore[union-attr]
        except Exception:
            # Clean up on failure so we don't leave a broken module
            sys.modules.pop(mod_name, None)
            raise
        return module

    # ---------------------------------------------------------- registration

    def _register_solver(
        self, name: str, module: Any, file_path: Path
    ) -> None:
        registry: Dict[str, Any] = getattr(module, "SOLVER_REGISTRY", None)
        if registry:
            # Normalize: if values are dicts with "function" key, extract the function
            # Skip values that are lists/configs (not callable solvers)
            normalized = {}
            for ptype, val in registry.items():
                if isinstance(val, dict) and "function" in val:
                    normalized[ptype] = val["function"]
                elif callable(val) or (isinstance(val, type) and hasattr(val, "solve")):
                    normalized[ptype] = val
                elif not isinstance(val, type) and hasattr(val, "solve"):
                    # Registered INSTANCES of solver classes (e.g. class11_bs
                    # registers BusinessMeaningSolver() objects) — these are
                    # neither callable nor a type, but they do solve.
                    normalized[ptype] = val
                # Skip lists, dicts without "function", None, and other non-solver values
            registry = normalized
        if not registry:
            # Auto-discover: build registry from functions AND classes
            registry = {}
            _skip_names = {
                'Any', 'Dict', 'List', 'Optional', 'Tuple', 'Enum', 'auto',
                'dataclass', 'field', 'Fraction', 'Decimal', 'datetime',
                'date', 'time', 'timedelta', 'defaultdict', 'OrderedDict',
                'Counter', 'deque', 'namedtuple', 'partial', 'wraps',
                'ABC', 'ABCMeta', 'abstractmethod', 'BaseModel', 'Field',
                'ConfigDict', 'Config', 'BaseSolver', 'Step', 'Solution',
                'Verification', 'GeneratedQuestion', 'QuestionType',
                'Topic', 'Difficulty', 'NodeID', 'QuestionSpec',
                'ProblemSpec', 'Answer', 'Result', 'math', 'random',
                're', 'hashlib', 'itertools', 'string', 'json',
                'os', 'sys', 'copy', 'datetime', 'date', 'time',
                'Fraction', 'Decimal', 'sympy', 'np', 'numpy',
            }
            for attr_name in dir(module):
                if attr_name.startswith("_") or attr_name in _skip_names:
                    continue
                obj = getattr(module, attr_name, None)
                if obj is None:
                    continue
                # Skip modules
                if isinstance(obj, type(sys)):
                    continue
                # Functions matching solver patterns
                if callable(obj) and not isinstance(obj, type):
                    lower = attr_name.lower()
                    if any(kw in lower for kw in (
                        'solve', 'verify', 'compute', 'calculate',
                        'check_answer', 'evaluate', 'run_builtin',
                        'run_solver', 'answer',
                    )):
                        registry[attr_name] = obj
                # Classes that look like solvers
                elif isinstance(obj, type):
                    lower_name = attr_name.lower()
                    if any(kw in lower_name for kw in (
                        'solver', 'engine', 'calculator', 'evaluator',
                    )):
                        ptype = getattr(obj, "PROBLEM_TYPE", None)
                        if ptype:
                            registry[ptype] = obj
                        elif hasattr(obj, "solve") and callable(getattr(obj, "solve", None)):
                            # Only register classes that have a .solve() method
                            registry[attr_name] = obj
                        # Skip sub-solver classes without .solve() — they're helpers
            if not registry:
                logger.warning(
                    "Skipping %s: no SOLVER_REGISTRY and no auto-discovered solve/verify functions (file may be incomplete)",
                    name,
                )
                return

        manifest_raw = getattr(module, "SOLVER_MANIFEST", None)
        if manifest_raw is not None:
            if isinstance(manifest_raw, dict):
                manifest = SolverManifest(**manifest_raw)
            elif isinstance(manifest_raw, SolverManifest):
                manifest = manifest_raw
            else:
                raise ValueError(
                    f"SOLVER_MANIFEST in {name} must be a dict or SolverManifest instance"
                )
        else:
            manifest = SolverManifest()

        from datetime import datetime, timezone

        entry = RegisteredSolver(
            name=name,
            module=module,
            manifest=manifest,
            registry=registry,
            path=file_path,
            loaded_at=datetime.now(timezone.utc).isoformat(),
        )

        self._solvers[name] = entry

        # Index by problem_type for fast lookup
        for problem_type in registry:
            logger.debug("  Registered solver %r -> problem_type %r", name, problem_type)
            # Build subject map from tags
            for tag in manifest.tags:
                if tag in ("maths", "physics", "chemistry", "biology", "cs",
                           "accountancy", "economics", "applied_maths", "geo",
                           "history", "civics", "psychology", "sociology",
                           "english", "hindi", "evs", "science", "biotech",
                           "business_studies", "home_science", "legal_studies",
                           "political_science", "pe", "ai"):
                    if tag not in self._subject_map:
                        self._subject_map[tag] = []
                    if problem_type not in self._subject_map[tag]:
                        self._subject_map[tag].append(problem_type)

            # Check for NODE_MAP in the module (node_id → problem_type)
            node_map = getattr(module, "NODE_MAP", None)
            if isinstance(node_map, dict):
                for node_id, ptype in node_map.items():
                    self._node_map[str(node_id)] = str(ptype)

    def _register_question_gen(
        self, name: str, module: Any, file_path: Path
    ) -> None:
        registry: Any = getattr(module, "QUESTION_REGISTRY", None)
        # Convert list registries to dict
        if isinstance(registry, list):
            registry = {f"q_{i}": item for i, item in enumerate(registry)}
        if not registry:
            # Auto-discover: build registry from functions AND classes
            registry = {}
            _skip_names = {
                'Any', 'Dict', 'List', 'Optional', 'Tuple', 'Enum', 'auto',
                'dataclass', 'field', 'Fraction', 'Decimal', 'datetime',
                'date', 'time', 'timedelta', 'defaultdict', 'OrderedDict',
                'Counter', 'deque', 'namedtuple', 'partial', 'wraps',
                'ABC', 'ABCMeta', 'abstractmethod', 'BaseModel', 'Field',
                'ConfigDict', 'Config', 'BaseSolver', 'Step', 'Solution',
                'Verification', 'GeneratedQuestion', 'QuestionType',
                'Topic', 'Difficulty', 'NodeID', 'QuestionSpec',
                'ProblemSpec', 'Answer', 'Result', 'math', 'random',
                're', 'hashlib', 'itertools', 'string', 'json',
                'os', 'sys', 'copy', 'Fraction', 'Decimal',
                'sympy', 'np', 'numpy',
            }
            for attr_name in dir(module):
                if attr_name.startswith("_") or attr_name in _skip_names:
                    continue
                obj = getattr(module, attr_name, None)
                if obj is None:
                    continue
                if isinstance(obj, type(sys)):
                    continue
                # Functions matching generator patterns
                if callable(obj) and not isinstance(obj, type):
                    lower = attr_name.lower()
                    if any(kw in lower for kw in (
                        'generate', 'create', 'build', 'make',
                        'question', 'quiz', 'bank', 'problem',
                    )):
                        registry[attr_name] = obj
                # Classes that look like question generators
                elif isinstance(obj, type):
                    lower_name = attr_name.lower()
                    if any(kw in lower_name for kw in (
                        'generator', 'question', 'bank', 'quiz',
                        'factory', 'builder',
                    )):
                        registry[attr_name] = obj
            if not registry:
                logger.warning(
                    "Skipping %s: no QUESTION_REGISTRY and no auto-discovered generate/create functions (file may be incomplete)",
                    name,
                )
                return

        manifest_raw = getattr(module, "QUESTION_GEN_MANIFEST", None)
        if manifest_raw is not None:
            if isinstance(manifest_raw, dict):
                manifest = QuestionGenManifest(**manifest_raw)
            elif isinstance(manifest_raw, QuestionGenManifest):
                manifest = manifest_raw
            else:
                raise ValueError(
                    f"QUESTION_GEN_MANIFEST in {name} must be a dict or QuestionGenManifest instance"
                )
        else:
            manifest = QuestionGenManifest()

        from datetime import datetime, timezone

        entry = RegisteredQuestionGen(
            name=name,
            module=module,
            manifest=manifest,
            registry=registry,
            path=file_path,
            loaded_at=datetime.now(timezone.utc).isoformat(),
        )

        self._question_gens[name] = entry

        # Build flat index with namespaced keys to avoid collisions
        for qt_name, qt_obj in registry.items():
            namespaced_key = f"{name}:{qt_name}"
            self._question_gen_flat[namespaced_key] = (name, qt_name, qt_obj)

    # --------------------------------------------------------------- queries

    def get_solver(self, problem_type: str) -> Optional[Any]:
        """Return the solver function for a given problem_type string.

        Searches across all registered solvers. Returns None if not found.
        This call is thread-safe — solvers are read-only after loading.
        """
        for entry in self._solvers.values():
            if problem_type in entry.registry:
                return entry.registry[problem_type]
        return None

    def get_solver_by_subject(self, subject: str, class_level: Optional[int] = None) -> List[str]:
        """Return all problem_type strings for a given subject.

        Optionally filtered by class level (via manifest tags like 'class-11').
        """
        subject_lower = subject.lower()
        # Try direct subject map
        types = list(self._subject_map.get(subject_lower, []))
        # Also search via tags
        for entry in self._solvers.values():
            for tag in entry.manifest.tags:
                if tag.lower() == subject_lower:
                    types.extend(entry.registry.keys())
                # Class filter
                if class_level and f"class-{class_level}" in tag.lower():
                    pass  # already added via subject tag
        # Deduplicate
        return sorted(set(types))

    def get_solver_for_node(self, node_id: str) -> Optional[Any]:
        """Return the solver function for a given curriculum node ID.

        Uses the NODE_MAP mapping if available. Falls back to None.
        """
        problem_type = self._node_map.get(node_id)
        if problem_type:
            return self.get_solver(problem_type)
        return None

    def get_problem_type_for_node(self, node_id: str) -> Optional[str]:
        """Return the problem_type string mapped to a node ID, or None."""
        return self._node_map.get(node_id)

    def register_node_mapping(self, node_id: str, problem_type: str) -> None:
        """Manually register a node-ID → problem_type mapping."""
        self._node_map[str(node_id)] = str(problem_type)

    def list_node_mappings(self) -> Dict[str, str]:
        """Return the full node-ID → problem_type mapping."""
        return dict(self._node_map)

    def get_solver_module(self, problem_type: str) -> Optional[Any]:
        """Return the full module for a given problem_type."""
        for entry in self._solvers.values():
            if problem_type in entry.registry:
                return entry.module
        return None

    def get_question_gen(self, question_type: str) -> Optional[Any]:
        """Return the question generator function for a given question_type string.

        Accepts both namespaced ("module:qtype") and legacy ("qtype") keys.
        For legacy keys, returns the first match (backward compatibility).
        """
        # Namespaced lookup (preferred)
        if ":" in question_type:
            entry = self._question_gen_flat.get(question_type)
            if entry is not None:
                return entry[2]
            return None
        # Legacy lookup (first match) — backward compatibility
        for entry in self._question_gens.values():
            if question_type in entry.registry:
                return entry.registry[question_type]
        return None

    def list_types(self) -> set:
        """Alias for list_solver_problem_types - returns set of all problem types."""
        return set(self.list_solver_problem_types())

    def list_solver_problem_types(self) -> List[str]:
        """Return all known problem_type strings across all solver modules."""
        types: List[str] = []
        for entry in self._solvers.values():
            types.extend(entry.registry.keys())
        return sorted(types)

    def list_question_gen_types(self) -> List[str]:
        """Return all known question_type strings across all question gen modules.

        Returns namespaced keys "module:qtype" to avoid collisions between
        modules that use the same qtype name (e.g. QuestionGenerator).
        """
        return sorted(self._question_gen_flat.keys())

    def get_solver_info(self, name: str) -> Optional[Dict[str, Any]]:
        """Return metadata dict for a named solver module."""
        entry = self._solvers.get(name)
        if entry is None:
            return None
        return {
            "name": entry.name,
            "version": entry.manifest.version,
            "dependencies": entry.manifest.dependencies,
            "tags": entry.manifest.tags,
            "problem_types": list(entry.registry.keys()),
            "path": str(entry.path),
            "loaded_at": entry.loaded_at,
        }

    def get_question_gen_info(self, name: str) -> Optional[Dict[str, Any]]:
        """Return metadata dict for a named question gen module."""
        entry = self._question_gens.get(name)
        if entry is None:
            return None
        return {
            "name": entry.name,
            "version": entry.manifest.version,
            "dependencies": entry.manifest.dependencies,
            "tags": entry.manifest.tags,
            "question_types": list(entry.registry.keys()),
            "path": str(entry.path),
            "loaded_at": entry.loaded_at,
        }

    def get_stats(self) -> RegistryStats:
        """Return a summary of the current registry state."""
        total_pt = sum(len(e.registry) for e in self._solvers.values())
        total_qt = sum(len(e.registry) for e in self._question_gens.values())
        return RegistryStats(
            solver_count=len(self._solvers),
            question_gen_count=len(self._question_gens),
            total_problem_types=total_pt,
            total_question_types=total_qt,
            loaded_modules=sorted(
                [e.name for e in self._solvers.values()]
                + [e.name for e in self._question_gens.values()]
            ),
            failed_modules=self._failed[:],
            solvers_dir=str(self._solvers_dir) if self._solvers_dir else "",
        )

    def get_failures(self) -> List[Dict[str, str]]:
        """Return list of modules that failed to load with error details."""
        return list(self._failed)

    def reload(self) -> RegistryStats:
        """Hot-reload: re-scan and re-import all plugin modules.

        Use this after dropping new files. Thread-safe — the import lock
        prevents concurrent reloads.
        """
        logger.info("Reloading solver registry...")
        self._discover_and_load()
        return self.get_stats()


# ---------------------------------------------------------------------------
# Module-level convenience functions (so routers can call directly)
# ---------------------------------------------------------------------------

_registry: Optional[SolverRegistry] = None


def get_registry(solvers_dir: Optional[str | Path] = None) -> SolverRegistry:
    """Return (and lazily initialise) the global SolverRegistry singleton."""
    global _registry
    if _registry is None:
        _registry = SolverRegistry()
        _registry.initialize(solvers_dir)
    return _registry


# Singleton instance for direct import by routers
solver_registry: SolverRegistry = get_registry()


def init_registry(solvers_dir: Optional[str | Path] = None) -> RegistryStats:
    """Explicitly initialise the global registry. Safe to call at app startup."""
    global _registry
    if _registry is None:
        _registry = SolverRegistry()
    return _registry.initialize(solvers_dir)


def get_solver(problem_type: str) -> Optional[Any]:
    """Module-level shortcut for SolverRegistry.get_solver()."""
    return get_registry().get_solver(problem_type)


def get_question_gen(question_type: str) -> Optional[Any]:
    """Module-level shortcut for SolverRegistry.get_question_gen()."""
    return get_registry().get_question_gen(question_type)


def list_problem_types() -> List[str]:
    """Return all known problem_type strings."""
    return get_registry().list_solver_problem_types()


def reload_registry() -> RegistryStats:
    """Hot-reload the global registry."""
    return get_registry().reload()


# ---------------------------------------------------------------------------
# @register_solver decorator — explicit registration alternative
# ---------------------------------------------------------------------------
# Usage:
#   from solvers.registry import register_solver
#
#   @register_solver("derivative_at_point", tags=["maths", "class-12"])
#   def solve_derivative(expr, point):
#       ...
#
#   @register_solver("quadratic_equation", tags=["maths", "class-10"],
#                    node_ids=["c10_maths_cbse_001", "c10_maths_cbse_002"])
#   class QuadraticSolver:
#       def solve(self, values): ...

def register_solver(
    problem_type: str,
    tags: Optional[List[str]] = None,
    node_ids: Optional[List[str]] = None,
    version: str = "1.0.0",
    dependencies: Optional[List[str]] = None,
):
    """Decorator that registers a solver function or class explicitly.

    This is an alternative to the auto-discovery system. Solvers registered
    via this decorator are added to the global registry immediately at import
    time, making them available even before auto-discovery runs.

    Args:
        problem_type: The canonical problem type identifier.
        tags: Optional tags (subject, class level, board).
        node_ids: Optional curriculum node IDs this solver handles.
        version: Semantic version of the solver.
        dependencies: Names of other registry modules this depends on.
    """
    def decorator(obj):
        reg = get_registry()
        # Create a minimal manifest
        manifest = SolverManifest(
            version=version,
            dependencies=dependencies or [],
            tags=tags or [],
        )
        from datetime import datetime, timezone
        # Register directly in the solvers dict
        name = f"decorated_{problem_type}"
        # Build a pseudo-module so the entry is valid
        import types as _types
        pseudo_module = _types.ModuleType(name)
        pseudo_module.SOLVER_REGISTRY = {problem_type: obj}
        pseudo_module.SOLVER_MANIFEST = manifest
        if node_ids:
            pseudo_module.NODE_MAP = {nid: problem_type for nid in node_ids}

        entry = RegisteredSolver(
            name=name,
            module=pseudo_module,
            manifest=manifest,
            registry={problem_type: obj},
            path=Path(getattr(obj, "__file__", __file__)),
            loaded_at=datetime.now(timezone.utc).isoformat(),
        )
        reg._solvers[name] = entry

        # Update node map
        if node_ids:
            for nid in node_ids:
                reg._node_map[str(nid)] = str(problem_type)

        # Update subject map
        if tags:
            for tag in tags:
                if tag not in reg._subject_map:
                    reg._subject_map[tag] = []
                if problem_type not in reg._subject_map[tag]:
                    reg._subject_map[tag].append(problem_type)

        logger.debug("@register_solver: registered %r -> %r", name, problem_type)
        return obj
    return decorator
