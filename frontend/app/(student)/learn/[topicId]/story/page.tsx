'use client';

/**
 * Story Mode route — /learn/[topicId]/story
 *
 * Thin wrapper: the whole cinematic engine lives in
 * components/story/StoryMode.tsx (scenes, visuals fallback, progress).
 * The existing /learn/[topicId] page is untouched and links here.
 */

import StoryMode from '@/components/story/StoryMode';

export default function StoryModePage() {
  return <StoryMode />;
}
