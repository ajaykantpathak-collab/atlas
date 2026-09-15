from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

try:
    from backend.config import get_settings
except ImportError:
    from config import get_settings

settings = get_settings()

_db_url = settings.POSTGRES_URL
_is_sqlite = _db_url.startswith("sqlite")
engine = create_async_engine(
    _db_url,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=not _is_sqlite,
    **({} if _is_sqlite else dict(pool_size=20, max_overflow=10)),
)

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
# Alias for routers that import async_session_maker instead of async_session
async_session_maker = async_session


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def check_postgres() -> bool:
    try:
        async with async_session() as session:
            result = await session.execute(text("SELECT 1"))
            return result.scalar() == 1
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"check_postgres failed: {e}")
        return False


# Re-export models from database.py (the flat module alongside this package)
# so that `from database import Student, PracticeSession, ...` works
try:
    import importlib.util as _ilu
    import os as _os
    import sys as _sys
    _db_py = _os.path.join(_os.path.dirname(_os.path.dirname(__file__)), "database.py")
    if _os.path.exists(_db_py):
        # Reuse the flat module if another package identity ("backend.database"
        # vs bare "database") already loaded it, so model classes are shared.
        _db_mod = _sys.modules.get("_database_flat")
        if _db_mod is None:
            _spec = _ilu.spec_from_file_location("_database_flat", _db_py)
            _db_mod = _ilu.module_from_spec(_spec)
            # MUST add to sys.modules BEFORE exec_module so SQLAlchemy can resolve annotations
            _sys.modules["_database_flat"] = _db_mod
            _spec.loader.exec_module(_db_mod)
        # Re-export model classes
        for _name in ('Student', 'Parent', 'Teacher', 'Topic', 'Attempt', 'Mastery',
                       'PracticeSession', 'TutorSession', 'DiagnosticResult', 'SolverExecution',
                       'TimestampMixin', 'Question', 'Class', 'ClassEnrollment',
                       'Worksheet', 'Homework', 'HomeworkQuestion', 'HomeworkSubmission',
                       'EnrichmentContent', 'Subject', 'Node', 'Exam', 'ExamSubmission'):
            if hasattr(_db_mod, _name):
                globals()[_name] = getattr(_db_mod, _name)
        # Override Base with the one from database.py (it has the real models)
        if hasattr(_db_mod, 'Base'):
            globals()['Base'] = _db_mod.Base
        # Re-export get_db from database.py (it has the real one tied to the real Base)
        if hasattr(_db_mod, 'get_db'):
            globals()['get_db'] = _db_mod.get_db
        # Aliases some routers use
        globals()['get_async_db'] = globals().get('get_db')
        globals()['get_async_session'] = globals().get('get_db')
        # Sync engine for background writers (intelligence persistence)
        if hasattr(_db_mod, 'get_sync_engine'):
            globals()['get_sync_engine'] = _db_mod.get_sync_engine
        if hasattr(_db_mod, 'dispose_sync_engine'):
            globals()['dispose_sync_engine'] = _db_mod.dispose_sync_engine
except Exception as _e:
    import logging as _logging
    _logging.getLogger(__name__).warning(f"Could not re-export database.py models: {_e}")
