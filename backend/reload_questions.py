"""One-shot reload: wipe board_questions, re-parse all question markers
with the rich-format parsers, then join answer keys onto them."""
import asyncio
from pathlib import Path

from backend.database import async_session
from backend.database.load_content import (
    find_content_files, load_question_banks, load_answer_keys,
)
from backend.database.load_enrichment import CISCE_ROOT
from backend.models import BoardQuestion
from sqlalchemy import delete


async def main():
    root = Path(CISCE_ROOT)
    print(f"Content root: {root}")
    async with async_session() as db:
        await db.execute(delete(BoardQuestion))
        await db.commit()
        print("board_questions wiped")

        q_files, c_files, a_files = find_content_files(root)
        print(f"files: {len(q_files)} questions, {len(a_files)} answers")

        q = await load_question_banks(db, q_files)
        print(f"inserted {q['inserted']} questions "
              f"(errors: {len(q.get('errors', []))})")
        for e in q.get("errors", [])[:10]:
            print("  err:", e)

        a = await load_answer_keys(db, a_files)
        print(f"answers: {a['keys_parsed']} keys, "
              f"{a['updated']} rows updated")


if __name__ == "__main__":
    asyncio.run(main())
