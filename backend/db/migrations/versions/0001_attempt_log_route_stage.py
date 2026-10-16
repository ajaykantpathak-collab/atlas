"""CL-06: its_attempt_log gains route (JSON) + stage (short text).

Revision ID: 0001_attempt_log_route_stage
Revises:
Create Date: 2026-10-12

Additive-only: two NULLABLE columns, no backfill, no defaults — zero lock
impact on a large table (Postgres metadata-only ALTER for nullable
non-defaulted columns).
"""
from alembic import op
import sqlalchemy as sa

revision = "0001_attempt_log_route_stage"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "its_attempt_log",
        sa.Column("route", sa.JSON(), nullable=True),
    )
    op.add_column(
        "its_attempt_log",
        sa.Column("stage", sa.String(length=64), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("its_attempt_log", "stage")
    op.drop_column("its_attempt_log", "route")
