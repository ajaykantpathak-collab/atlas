"""WS-LEGAL: users gains parental-consent fields + deletion lifecycle.

Revision ID: 0003_legal_account_lifecycle
Revises: 0002_submit_path_indexes
Create Date: 2026-10-13

Additive-only: six NULLABLE columns, no backfill, no defaults — a
metadata-only ALTER on PostgreSQL (zero table rewrite / lock impact).

Columns:
  parent_email         DPDP §9: parent/guardian contact captured at
                       student signup (every student account is a minor).
  parent_consent_at    when the signup consent checkbox was recorded.
  consent_method       how consent was captured ("signup_checkbox").
  consent_status       pending | notified — pending while the parent
                       notice is undeliverable (SMTP unconfigured).
  deleted_at           when the user requested account deletion.
  deletion_purge_at    when the worker's account_purge job may hard-
                       delete residual rows (request time + 30 days).
"""
from alembic import op
import sqlalchemy as sa

revision = "0003_legal_account_lifecycle"
down_revision = "0002_submit_path_indexes"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("parent_email", sa.String(length=255), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("parent_consent_at", sa.DateTime(timezone=True),
                  nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("consent_method", sa.String(length=40), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("consent_status", sa.String(length=24), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("deletion_purge_at", sa.DateTime(timezone=True),
                  nullable=True),
    )


def downgrade() -> None:
    op.drop_column("users", "deletion_purge_at")
    op.drop_column("users", "deleted_at")
    op.drop_column("users", "consent_status")
    op.drop_column("users", "consent_method")
    op.drop_column("users", "parent_consent_at")
    op.drop_column("users", "parent_email")
