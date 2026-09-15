---
name: backend-api
description: Follow backend API patterns when creating or modifying FastAPI endpoints
allowed-tools:
  - read
  - write
  - edit
  - grep
  - glob
triggers:
  - model
---

# Backend API Patterns

## Architecture
- FastAPI with async SQLAlchemy (PostgreSQL)
- All routers mounted under `/api/` prefix
- JWT auth via Bearer token
- Pydantic v2 schemas for request/response validation
- Service layer pattern: routers call services, services call database

## Router Pattern
```python
from fastapi import APIRouter, Depends
from backend.deps import get_current_user
from backend.models.user import User

router = APIRouter(prefix="/api/...", tags=["..."])

@router.get("/", response_model=ResponseSchema)
async def list_items(user: User = Depends(get_current_user)):
    ...
```

## Service Pattern
```python
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db

class ItemService:
    @staticmethod
    async def get_items(db: AsyncSession, user_id: str) -> list[Item]:
        ...
```

## Database
- Use `get_db()` dependency for database sessions
- All models inherit from `backend.database.Base`
- UUID primary keys with `gen_random_uuid()`
- JSON columns for flexible data structures
- Always include `created_at` and `updated_at` timestamps

## Response Format
- Always return Pydantic schema instances
- Use proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Error responses: `{"detail": "error message"}`
