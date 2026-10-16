import uuid

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.database import get_db
from backend.models.user import User
from backend.security import decode_access_token

security = HTTPBearer(auto_error=False)


def canonical_user_id(value: object) -> str:
    """Validate a client-supplied user/student id and return its canonical form.

    Every ``user_id``/``student_id`` column is a GUID — a native UUID on
    PostgreSQL.  A non-UUID string that reached a query used to blow up inside
    ``db_types.GUID.process_bind_param`` with
    ``ValueError: badly formed hexadecimal UUID string`` and 500 the endpoint
    (seen live on ``/api/passport/{id}`` and ``/api/review/queue/me`` before
    the ``/me`` routes existed).  The boundary contract is now: malformed id
    -> 422 here, never a database-layer crash.
    """
    try:
        return str(uuid.UUID(str(value)))
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="user id must be a valid UUID",
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )
    # A token whose ``sub`` is not a UUID (stale/garbage client token) used to
    # 500 on the GUID bind below; reject it as an invalid token instead.
    # 401, not 422: a malformed subject is a credential problem.
    try:
        user_id = canonical_user_id(user_id)
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account deactivated",
        )
    return user


async def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User | None:
    if not credentials:
        return None
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None
    try:
        user_id = canonical_user_id(user_id)
    except HTTPException:
        return None
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


def require_role(role: str):
    async def role_checker(user: User = Depends(get_current_user)) -> User:
        if user.role != role and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Requires {role} role",
            )
        return user

    return role_checker


#: Roles allowed to read/write ANY student's record. Mirrors the staff
#: definition already used by ``_require_staff`` in api/teacher.py and
#: api/teacher_analytics.py — kept here so ownership checks do not have to
#: import an API module to know what "staff" means.
STAFF_ROLES = ("teacher", "admin")


def is_staff(user: User) -> bool:
    return str(getattr(user, "role", "") or "").strip().lower() in STAFF_ROLES


async def require_self_or_staff(
    student_id: str,
    user: User = Depends(get_current_user),
) -> str:
    """Ownership guard for per-student endpoints (closes the B16 IDORs).

    Resolves and RETURNS the ``student_id`` the caller may actually use.
    Callers must use the returned value, not the raw path parameter, so the
    check and the data access can never disagree.

    * anonymous                    -> 401 (raised by ``get_current_user``)
    * teacher / admin              -> any ``student_id``
    * any other role               -> only their own id; otherwise 403

    A wrong id yields 403 rather than 404: a 404 that differs from a 403
    would confirm which student ids exist, which is itself a leak.

    A MALFORMED id (not a UUID) yields 422: it can never match any row, and
    letting it through used to crash the GUID bind in db_types with
    ``ValueError: badly formed hexadecimal UUID string`` (500).  The value is
    also normalized to canonical form so id comparisons are exact regardless
    of the case/brace style the client used.
    """
    student_id = canonical_user_id(student_id)
    if is_staff(user):
        return student_id
    if student_id != str(user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized for this student record",
        )
    return str(user.id)


async def require_self_or_linked_parent(
    student_id: str,
    user: User,
    db: AsyncSession,
) -> str:
    """Ownership guard for student records a linked PARENT may also read
    (the weekly digest, exam history — the lane-B 2026-10-15 IDOR fix).

    The rule is exactly the one ``api/engagement.py::get_weekly_digest``
    has always enforced inline; it lives here so every per-student route
    reuses the same check instead of re-implementing it:

    * the student themself                          -> canonical id
    * ``role == "parent"`` + a ``parent_student_links`` row to this
      student                                       -> canonical id
    * anyone else — other students, teachers, admins -> 403

    Staff are deliberately NOT allowed here: the surfaces this guards are
    student/parent reads; teacher views go through ``/api/teacher/*``.
    Wrong ids yield 403 (not 404) so a differing status never confirms
    which student ids exist, and malformed ids yield 422 before any GUID
    bind — the same contract as :func:`require_self_or_staff`.
    """
    student_id = canonical_user_id(student_id)
    if student_id == str(user.id):
        return student_id
    if (getattr(user, "role", None) or "") != "parent":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized for this student",
        )
    from backend.services.auth_service import ParentStudentLinkModel

    link = await db.execute(
        select(ParentStudentLinkModel.id).where(
            ParentStudentLinkModel.parent_id == user.id,
            ParentStudentLinkModel.student_id == student_id,
        )
    )
    if link.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This student is not linked to your account",
        )
    return student_id

