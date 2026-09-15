/**
 * Sim Engine — Core state management and rule evaluation
 *
 * Manages scene state, evaluates completion rules, and tracks
 * student progress within a single scene.
 */

import { useCallback, useRef, useState } from 'react';
import type { SceneConfig, SceneState, SceneRule, FeedbackEvent, SoundEffect } from './types';
import { audioManager } from './audio';

// ─── Initial State ────────────────────────────────────────────

function createInitialState(config: SceneConfig): SceneState {
  const objects: SceneState['objects'] = {};
  const targets: SceneState['targets'] = {};
  const counts: SceneState['counts'] = {};

  // Initialize objects
  for (const obj of config.objects) {
    objects[obj.id] = { x: obj.x, y: obj.y, placed: false };
  }

  // Initialize targets
  if (config.targets) {
    for (const target of config.targets) {
      targets[target.id] = [];
      counts[target.id] = 0;
    }
  }

  return {
    objects,
    targets,
    counts,
    complete: false,
    score: 0,
    attempts: 0,
    hintsUsed: 0,
    startTime: Date.now(),
  };
}

// ─── Rule Evaluation ──────────────────────────────────────────

function evaluateRule(rule: SceneRule, state: SceneState, config: SceneConfig): boolean {
  switch (rule.type) {
    case 'count-equals': {
      if (!rule.targetId || rule.expected == null) return false;
      return (state.counts[rule.targetId] || 0) === rule.expected;
    }

    case 'count-greater': {
      if (!rule.targetId || rule.expected == null) return false;
      return (state.counts[rule.targetId] || 0) > rule.expected;
    }

    case 'count-less': {
      if (!rule.targetId || rule.expected == null) return false;
      return (state.counts[rule.targetId] || 0) < rule.expected;
    }

    case 'all-sorted': {
      // Check that every object is in the correct category target
      for (const obj of config.objects) {
        if (!obj.category) continue;
        const placedTarget = state.objects[obj.id]?.targetId;
        if (!placedTarget) return false;
        const target = config.targets?.find(t => t.id === placedTarget);
        if (!target?.acceptsCategories?.includes(obj.category)) return false;
      }
      return true;
    }

    case 'all-matched': {
      // Check all targets have exactly one correct object
      if (!config.targets) return false;
      for (const target of config.targets) {
        const contents = state.targets[target.id] || [];
        if (contents.length !== 1) return false;
        if (target.acceptsObjectIds && !target.acceptsObjectIds.includes(contents[0])) return false;
      }
      return true;
    }

    case 'balance-equal': {
      // Check both sides of balance have equal weight
      const leftWeight = sumWeight(state, config, 'left');
      const rightWeight = sumWeight(state, config, 'right');
      return Math.abs(leftWeight - rightWeight) < 0.01;
    }

    case 'pattern-complete': {
      // Check pattern slots are all filled correctly
      if (!config.targets) return false;
      for (const target of config.targets) {
        const contents = state.targets[target.id] || [];
        if (contents.length === 0) return false;
      }
      return true;
    }

    case 'order-correct': {
      // Check objects are in correct order in targets
      if (!config.targets) return false;
      const orderedTargets = [...config.targets].sort((a, b) => a.x - b.x);
      for (let i = 0; i < orderedTargets.length; i++) {
        const contents = state.targets[orderedTargets[i].id] || [];
        if (contents.length === 0) return false;
        // Check the object's expected order position
        const obj = config.objects.find(o => o.id === contents[0]);
        if (obj?.data?.orderPosition !== i) return false;
      }
      return true;
    }

    case 'custom': {
      if (!rule.validate) return false;
      return rule.validate(state);
    }

    case 'physics-state': {
      // Physics state is evaluated by the physics component directly
      // This is a placeholder — physics components override this
      return state.complete;
    }

    default:
      return false;
  }
}

function sumWeight(state: SceneState, config: SceneConfig, targetId: string): number {
  const contents = state.targets[targetId] || [];
  return contents.reduce((sum, objId) => {
    const obj = config.objects.find(o => o.id === objId);
    return sum + (obj?.weight || 0);
  }, 0);
}

function evaluateAllRules(config: SceneConfig, state: SceneState): boolean {
  return config.rules.every(rule => evaluateRule(rule, state, config));
}

// ─── Score Calculation ────────────────────────────────────────

function calculateScore(state: SceneState, config: SceneConfig): number {
  if (state.attempts === 0) return 0;
  const correctAttempts = state.attempts - state.hintsUsed;
  const baseScore = (correctAttempts / state.attempts) * 100;
  const hintPenalty = state.hintsUsed * 5;
  return Math.max(0, Math.min(100, Math.round(baseScore - hintPenalty)));
}

// ─── Engine Hook ──────────────────────────────────────────────

export function useSimEngine(config: SceneConfig) {
  const [state, setState] = useState<SceneState>(() => createInitialState(config));
  const stateRef = useRef(state);
  stateRef.current = state;

  // Update object position
  const moveObject = useCallback((objectId: string, x: number, y: number) => {
    setState(s => ({
      ...s,
      objects: {
        ...s.objects,
        [objectId]: { ...s.objects[objectId], x, y },
      },
    }));
  }, []);

  // Place object in target
  const placeObject = useCallback((objectId: string, targetId: string) => {
    setState(s => {
      // Remove from previous target if any
      const prevTarget = s.objects[objectId]?.targetId;
      const newTargets = { ...s.targets };
      if (prevTarget && prevTarget !== targetId) {
        newTargets[prevTarget] = (newTargets[prevTarget] || []).filter(id => id !== objectId);
      }
      // Add to new target
      newTargets[targetId] = [...(newTargets[targetId] || []), objectId];

      // Recalculate counts
      const newCounts: Record<string, number> = {};
      for (const tid of Object.keys(newTargets)) {
        newCounts[tid] = newTargets[tid].length;
      }

      // Update object state
      const newObjects = {
        ...s.objects,
        [objectId]: { ...s.objects[objectId], placed: true, targetId },
      };

      const newState: SceneState = {
        ...s,
        objects: newObjects,
        targets: newTargets,
        counts: newCounts,
        attempts: s.attempts + 1,
      };

      // Check completion
      const complete = evaluateAllRules(config, newState);
      newState.complete = complete;
      newState.score = calculateScore(newState, config);
      if (complete && !s.endTime) {
        newState.endTime = Date.now();
      }

      return newState;
    });
  }, [config]);

  // Remove object from target (drag back out)
  const removeObject = useCallback((objectId: string) => {
    setState(s => {
      const prevTarget = s.objects[objectId]?.targetId;
      if (!prevTarget) return s;

      const newTargets = { ...s.targets };
      newTargets[prevTarget] = (newTargets[prevTarget] || []).filter(id => id !== objectId);

      const newCounts: Record<string, number> = {};
      for (const tid of Object.keys(newTargets)) {
        newCounts[tid] = newTargets[tid].length;
      }

      const newObjects = {
        ...s.objects,
        [objectId]: { ...s.objects[objectId], placed: false, targetId: undefined },
      };

      return {
        ...s,
        objects: newObjects,
        targets: newTargets,
        counts: newCounts,
      };
    });
  }, []);

  // Tap an object (for counting/tapping interactions)
  const tapObject = useCallback((objectId: string) => {
    setState(s => {
      const obj = s.objects[objectId];
      if (!obj) return s;

      const tapCount = ((obj as { tapCount?: number }).tapCount || 0) + 1;
      const newState: SceneState = {
        ...s,
        objects: {
          ...s.objects,
          [objectId]: { ...obj, placed: true, tapCount } as typeof obj,
        },
        attempts: s.attempts + 1,
      };

      // For count interactions, check if total taps equals expected
      const totalTaps = Object.values(newState.objects).reduce(
        (sum, o) => sum + ((o as { tapCount?: number }).tapCount || 0), 0
      );

      // Update counts for count-type scenes
      if (config.interaction === 'count') {
        const target = config.targets?.[0];
        if (target) {
          newState.counts = { ...s.counts, [target.id]: totalTaps };
        }
      }

      const complete = evaluateAllRules(config, newState);
      newState.complete = complete;
      newState.score = calculateScore(newState, config);
      if (complete && !s.endTime) {
        newState.endTime = Date.now();
      }

      return newState;
    });
  }, [config]);

  // Use a hint
  const useHint = useCallback(() => {
    setState(s => ({
      ...s,
      hintsUsed: s.hintsUsed + 1,
    }));
  }, []);

  // Reset scene
  const reset = useCallback(() => {
    setState(createInitialState(config));
  }, [config]);

  // Check if a drop is valid
  const isValidDrop = useCallback((objectId: string, targetId: string): boolean => {
    const target = config.targets?.find(t => t.id === targetId);
    if (!target) return false;

    // Check max items
    if (target.maxItems != null) {
      const currentCount = (stateRef.current.targets[targetId] || []).length;
      if (currentCount >= target.maxItems) return false;
    }

    // Check category
    const obj = config.objects.find(o => o.id === objectId);
    if (target.acceptsCategories && obj?.category) {
      return target.acceptsCategories.includes(obj.category);
    }

    // Check specific object IDs
    if (target.acceptsObjectIds) {
      return target.acceptsObjectIds.includes(objectId);
    }

    // No restrictions — accept anything
    return true;
  }, [config]);

  // Play sound for an action
  const playSound = useCallback((sound: SoundEffect) => {
    audioManager.play(sound);
  }, []);

  return {
    state,
    moveObject,
    placeObject,
    removeObject,
    tapObject,
    useHint,
    reset,
    isValidDrop,
    playSound,
  };
}
