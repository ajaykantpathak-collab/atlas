from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class AchievementSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    id: str
    achievement_id: str = ""
    title: str
    description: str
    icon_name: str = ""
    tier: str = "bronze"
    xp_reward: int = 0
    unlocked: bool = False
    unlocked_at: Optional[str] = None
    progress: Optional[int] = None
    max_progress: Optional[int] = None
    # Web client compat: it renders name/icon when present.
    name: Optional[str] = None
    icon: Optional[str] = None


class AchievementListResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    achievements: List[AchievementSchema] = Field(default_factory=list)
    # Mirror of `achievements` — the web progress page reads `items`.
    items: List[AchievementSchema] = Field(default_factory=list)
    unlocked_count: int = 0
    # BADGE wall XP: the summed xp_reward of unlocked badges. This is NOT the
    # student's XP balance — the canonical wallet number is `wallet_xp`
    # (users.total_xp via services/reward_ledger.py). Both are served so no
    # client has to reconstruct one from the other (council finding: "XP
    # showed 6 vs 70" was this badge sum being rendered as the wallet).
    total_xp: int = 0
    wallet_xp: int = 0
