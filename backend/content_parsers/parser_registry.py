"""Parser registry for CISCE content pipeline.

Each parser is registered with:
- parser_id: unique identifier (e.g. "enrichment_v1")
- content_type: the subdirectory name it handles (e.g. "enrichment")
- version: parser version string
- description: what it parses
- parse_func: callable that takes (file_path) -> list[dict]

Parsers are looked up by content_type (subdirectory name).
Only formats that naturally fit are registered — ambiguous or
unstructured formats go to the review queue, not here.
"""

from typing import Callable, Optional
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class ParserEntry:
    """Registry entry for a content parser."""
    parser_id: str
    content_type: str       # subdirectory name this parser handles
    version: str
    description: str
    parse_func: Callable    # (file_path: Path) -> list[dict]
    tier: int = 1           # 1=confident, 2=subject-specific


# Registry — populated as parsers are built
_REGISTRY: dict[str, ParserEntry] = {}


def register_parser(
    content_type: str,
    version: str,
    description: str,
    parse_func: Callable,
    parser_id: Optional[str] = None,
    tier: int = 1,
) -> ParserEntry:
    """Register a parser for a content type."""
    if parser_id is None:
        parser_id = f"{content_type}_v{version}"
    entry = ParserEntry(
        parser_id=parser_id,
        content_type=content_type,
        version=version,
        description=description,
        parse_func=parse_func,
        tier=tier,
    )
    _REGISTRY[content_type] = entry
    return entry


def get_parser(content_type: str) -> Optional[ParserEntry]:
    """Look up a parser by content type (subdirectory name)."""
    return _REGISTRY.get(content_type)


def list_parsers() -> list[ParserEntry]:
    """List all registered parsers."""
    return list(_REGISTRY.values())


def parse_file(file_path: Path, content_type: str) -> list[dict]:
    """Parse a file using the registered parser for its content type.

    Returns:
        list of normalized record dicts.

    Raises:
        ValueError if no parser is registered for this content type.
    """
    entry = get_parser(content_type)
    if entry is None:
        raise ValueError(
            f"No parser registered for content_type='{content_type}'. "
            f"File: {file_path}"
        )
    return entry.parse_func(file_path)


# ---------------------------------------------------------------------------
# Register all parsers on import
# ---------------------------------------------------------------------------

def _register_all():
    """Import and register all available parsers."""
    # Import here to avoid circular imports
    from backend.content_parsers.enrichment_parser import register as _reg_enrichment
    _reg_enrichment()
    from backend.content_parsers.question_bank_parser import register as _reg_qb
    _reg_qb()
    from backend.content_parsers.diagnostics_parser import register as _reg_diag
    _reg_diag()
    from backend.content_parsers.papers_parser import register as _reg_papers
    _reg_papers()
    from backend.content_parsers.misconceptions_parser import register as _reg_mis
    _reg_mis()
    from backend.content_parsers.drill_banks_parser import register as _reg_drill
    _reg_drill()


_register_all()
