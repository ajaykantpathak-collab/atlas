'use client';

/**
 * LivingWorldView — React component that renders the Living World PixiJS scene.
 *
 * Shows a world that evolves as the student masters topics:
 * - Starts as empty grassland with a tree
 * - Adds flowers, animals, buildings, weather as mastery increases
 * - Day/night cycle and seasons based on mastery level
 */

import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { LivingWorld } from '../../lib/game-engine/gamification/LivingWorld';
import { GamificationManager } from '../../lib/game-engine/gamification/GamificationManager';
import { LearningAnalytics } from '../../lib/game-engine/analytics/LearningAnalytics';
import { AssetLoader } from '../../lib/game-engine/AssetLoader';

export interface LivingWorldViewProps {
  width?: number;
  height?: number;
}

export function LivingWorldView({ width = 720, height = 560 }: LivingWorldViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create PixiJS app
    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0x87ceeb,
      antialias: true,
      forceCanvas: false,
    });
    appRef.current = app;
    containerRef.current.appendChild(app.view as HTMLCanvasElement);

    // Get world state from gamification
    const analytics = new LearningAnalytics();
    analytics.init('student_001', 'Student', 1);
    const gamification = new GamificationManager(analytics);
    const worldState = gamification.getWorldState();

    // Preload assets then render the world
    const world = new LivingWorld(app, app.stage, width, height);
    AssetLoader.preloadCommon().then(() => {
      world.render(worldState);
    }).catch(() => {
      world.render(worldState); // Render with primitives if assets fail
    });

    // Cleanup
    return () => {
      world.clear();
      app.destroy(true);
      appRef.current = null;
    };
  }, [width, height]);

  return (
    // Pixi renders at the fixed `width`×`height` resolution; on narrow
    // screens the wrapper clamps to the parent and the canvas scales down
    // via CSS (aspect preserved) so a 720px scene doesn't overflow 375px.
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden shadow-xl max-w-full [&>canvas]:w-full [&>canvas]:h-auto"
      style={{ width, aspectRatio: `${width} / ${height}` }}
    />
  );
}
