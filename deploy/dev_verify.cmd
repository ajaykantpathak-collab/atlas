@echo off







REM Throwaway verification server: dev_verify.cmd <port>  (no hot-reload).







cd /d D:\platform\deploy







set DATABASE_URL=postgresql+asyncpg://dream_user:at_-A518N1wtwyd6P-_sAWwlAGT9bdsAuoT@127.0.0.1:5432/dream_app







set PLATFORM_DATABASE_URL=postgresql+asyncpg://dream_user:at_-A518N1wtwyd6P-_sAWwlAGT9bdsAuoT@127.0.0.1:5432/dream_app







set COMPLIANCE_DATABASE_URL=postgresql+psycopg2://atlas_compliance:cmp_9f4k2Lw8Qz5tR1xV@127.0.0.1:5432/atlas_compliance







set REDIS_URL=redis://:at_mj93IR9URGYEIPaXGikkewwxkUBBiFBW@127.0.0.1:16379/0







set PLATFORM_REDIS_URL=redis://:at_mj93IR9URGYEIPaXGikkewwxkUBBiFBW@127.0.0.1:16379/0







set NEO4J_URI=bolt://127.0.0.1:7688







set PLATFORM_NEO4J_URI=bolt://127.0.0.1:7688







set NEO4J_USER=neo4j







set PLATFORM_NEO4J_USER=neo4j







set NEO4J_PASSWORD=at_4wvP-xKN74bIgjj_Q4imf07bM8ti2nCk







set PLATFORM_NEO4J_PASSWORD=at_4wvP-xKN74bIgjj_Q4imf07bM8ti2nCk







set PLATFORM_QDRANT_URL=http://127.0.0.1:6333







set QDRANT_URL=http://127.0.0.1:6333







set PLATFORM_JWT_SECRET=dev-only-secret-0123456789abcdefXYZ







set PLATFORM_ENV=development







set UVICORN_WORKERS=1







echo Atlas verify instance (NO hot-reload) on http://127.0.0.1:%1







REM CPU-only: verify instances must not fight the main server for the GPU



set CUDA_VISIBLE_DEVICES=-1



REM LLM wiring: pin the real endpoint (compose parity) - the root .env's
REM stale FREELLM_* values shadow everything and silently break LLM calls.
set FREELLM_API_URL=https://generativelanguage.googleapis.com/v1beta/openai
set FREELLM_MODEL=gemma-4-31b-it,gemma-4-26b-a4b-it
set CLICKHOUSE_USER=dream_user
set CLICKHOUSE_PASSWORD=at_jwCEkWEmGtKVIC9bY2snB2W_7U8O8JML
for /f "tokens=1,* delims==" %%a in ('findstr /b "GEMINI_API_KEY=" D:\platform\deploy\.env') do set FREELLM_API_KEY=%%b

python -m uvicorn backend.main:app --host 127.0.0.1 --port %1







