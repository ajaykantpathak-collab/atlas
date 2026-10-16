"""_db_url.py -- shared test helper: DATABASE_URL without hardcoded secrets.

Passwords live in the gitignored D:\\platform\\deploy\\.env
(POSTGRES_PASSWORD=). Tests import `url()` (SQLAlchemy asyncpg form) or
`url_sync()` (psycopg2 form) instead of embedding credentials.
"""
import os


def _password() -> str:
    pw_lines = [l.strip().split("=", 1)[1]
                for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
                if l.startswith("POSTGRES_PASSWORD=")]
    if not pw_lines:
        raise RuntimeError("POSTGRES_PASSWORD missing from deploy/.env")
    return pw_lines[0]


def url() -> str:
    env = os.environ.get("DATABASE_URL")
    if env:
        return env
    return (f"postgresql+asyncpg://dream_user:{_password()}"
            f"@127.0.0.1:5432/dream_app")


def url_sync() -> str:
    return url().replace("+asyncpg", "+psycopg2")


def password() -> str:
    return _password()
