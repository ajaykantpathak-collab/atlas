"""CL-11a: submit-path indexes — attempts(created_at),
practice_sessions(started_at).

Revision ID: 0002_submit_path_indexes
Revises: 0001_attempt_log_route_stage
Create Date: 2026-10-12

Proof-of-need: EXPLAIN plans (scratch_f/explain_before.txt) show Seq
Scans on both hot orderings — recent-attempts (dashboard:1413,
practice:1219) and session-by-start ordering. CONCURRENTLY so the index
build never takes a write lock on a live submit path.
"""
from alembic import op
import sqlalchemy as sa

revision = "0002_submit_path_indexes"
down_revision = "0001_attempt_log_route_stage"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # CREATE INDEX CONCURRENTLY cannot run inside a transaction block —
    # autocommit_block renders COMMIT/.../BEGIN in --sql mode.
    with op.get_context().autocommit_block():
        op.create_index(
            "ix_attempts_created_at",
            "attempts", ["created_at"],
            unique=False, postgresql_concurrently=True,
        )
        op.create_index(
            "ix_practice_sessions_started_at",
            "practice_sessions", ["started_at"],
            unique=False, postgresql_concurrently=True,
        )


def downgrade() -> None:
    with op.get_context().autocommit_block():
        op.drop_index(
            "ix_practice_sessions_started_at",
            table_name="practice_sessions",
            postgresql_concurrently=True,
        )
        op.drop_index(
            "ix_attempts_created_at",
            table_name="attempts",
            postgresql_concurrently=True,
        )
