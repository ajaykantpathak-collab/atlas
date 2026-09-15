import type { ReviewItem } from "@/types";
// masters import SRSItem — alias the canonical type
export type { ReviewItem, ReviewItem as SRSItem };

const MS_PER_DAY = 86400000;

export function createReviewItem(nodeId: string, conceptName: string = nodeId): ReviewItem {
  const now = new Date();
  return {
    nodeId,
    conceptName,
    easinessFactor: 2.5,
    interval: 0,
    repetitions: 0,
    lastReviewDate: now.toISOString(),
    nextReviewDate: now.toISOString(),
    reviewHistory: [],
  };
}

export function sm2Update(item: ReviewItem, quality: number, responseTime = 0): ReviewItem {
  let easinessFactor = item.easinessFactor;
  let interval: number;
  let repetitions: number;

  if (quality >= 3) {
    if (item.repetitions === 0) {
      interval = 1;
    } else if (item.repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(item.interval * easinessFactor);
    }
    repetitions = item.repetitions + 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  easinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easinessFactor < 1.3) easinessFactor = 1.3;

  const now = new Date();
  const nextReview = new Date(now.getTime() + interval * MS_PER_DAY);

  return {
    ...item,
    easinessFactor,
    interval,
    repetitions,
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
    reviewHistory: [
      ...item.reviewHistory,
      { date: now.toISOString(), quality, responseTime },
    ],
  };
}

export function getDailyReviewQueue(items: ReviewItem[]): ReviewItem[] {
  const today = new Date();
  return items
    .filter((item) => new Date(item.nextReviewDate) <= today)
    .sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime());
}

export function getUpcomingReviews(items: ReviewItem[], days: number): ReviewItem[] {
  const limit = new Date(Date.now() + days * MS_PER_DAY);
  return items
    .filter((item) => {
      const next = new Date(item.nextReviewDate);
      return next > new Date() && next <= limit;
    })
    .sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime());
}

export function getRetentionRate(items: ReviewItem[]): number {
  if (items.length === 0) return 0;
  const reviewed = items.filter((i) => i.reviewHistory.length > 0);
  if (reviewed.length === 0) return 0;
  const correct = reviewed.reduce((sum, item) => {
    const recent = item.reviewHistory.slice(-5);
    const correctCount = recent.filter((r) => r.quality >= 3).length;
    return sum + correctCount / recent.length;
  }, 0);
  return Math.round((correct / reviewed.length) * 100);
}

export function getReviewStreak(items: ReviewItem[]): number {
  if (items.length === 0) return 0;
  const allDates = items
    .flatMap((item) => item.reviewHistory.map((r) => r.date.split("T")[0]))
    .filter((date, index, arr) => arr.indexOf(date) === index)
    .sort()
    .reverse();

  if (allDates.length === 0) return 0;

  let streak = 0;
  let checkDate = new Date();
  for (const date of allDates) {
    if (date === checkDate.toISOString().split("T")[0]) {
      streak++;
      checkDate = new Date(checkDate.getTime() - MS_PER_DAY);
    } else {
      break;
    }
  }
  return streak;
}
