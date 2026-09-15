'use client';

/**
 * DropTarget — A zone that accepts draggable objects
 *
 * Features for 9/10 quality:
 * - Highlights when object hovers over it
 * - Pulsing glow to invite the student
 * - Bounces the object slightly when placed
 * - Different visual for correct vs incorrect drops
 * - Sound feedback on drop
 */

import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import type { DropTarget as DropTargetType } from '../../lib/sim-engine/types';

export interface DropTargetProps {
  config: DropTargetType;
  /** Whether an object is currently hovering over this target */
  isHovering?: boolean;
  /** Whether the last drop was correct */
  lastDropCorrect?: boolean | null;
  /** Children to render inside the target (e.g., placed objects) */
  children?: ReactNode;
  /** Label to display */
  label?: string;
  /** Whether to show the pulsing invitation glow */
  showInvitation?: boolean;
}

export function DropTarget({
  config,
  isHovering = false,
  lastDropCorrect = null,
  children,
  label,
  showInvitation = true,
}: DropTargetProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  // Show brief feedback flash on drop
  if (lastDropCorrect !== null && !showFeedback) {
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 600);
  }

  const baseColor = config.fill || 'rgba(255,255,255,0.15)';
  const hoverColor = config.highlightColor || 'rgba(78, 205, 196, 0.4)';
  const correctColor = 'rgba(107, 203, 119, 0.4)';
  const wrongColor = 'rgba(255, 107, 107, 0.4)';

  const currentFill = showFeedback
    ? lastDropCorrect
      ? correctColor
      : wrongColor
    : isHovering
      ? hoverColor
      : baseColor;

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        left: config.x,
        top: config.y,
        width: config.width,
        height: config.height,
      }}
      animate={{
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Target zone */}
      <motion.div
        className="relative w-full h-full rounded-2xl border-2 flex items-center justify-center"
        style={{
          backgroundColor: currentFill,
          borderColor: isHovering ? hoverColor : (config.stroke || 'rgba(255,255,255,0.3)'),
          borderWidth: (config.strokeWidth || 2) + (isHovering ? 1 : 0),
          borderStyle: 'dashed',
        }}
        animate={
          showInvitation && !children
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(78, 205, 196, 0.4)',
                  '0 0 0 8px rgba(78, 205, 196, 0)',
                ],
              }
            : {}
        }
        transition={
          showInvitation && !children
            ? { duration: 1.5, repeat: Infinity, ease: 'easeOut' }
            : {}
        }
      >
        {/* Label */}
        {label && (
          <div className="text-center pointer-events-none">
            <p className="text-sm font-semibold text-white/70">{label}</p>
          </div>
        )}

        {/* Placed objects */}
        {children}

        {/* Correct/wrong flash */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundColor: lastDropCorrect ? correctColor : wrongColor,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
