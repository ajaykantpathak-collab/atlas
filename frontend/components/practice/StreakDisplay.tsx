'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Flame, Snowflake, RefreshCw, Info } from 'lucide-react';

interface Streak {
  current: number;
  longest: number;
  frozen: boolean;
  grace_days_remaining: number;
}

interface StreakDisplayProps {
  streak: Streak;
  className?: string;
}

const FLAME_COLORS = {
  active: '#FF6B35',
  activeGlow: '#FF9F1C',
  frozen: '#60A5FA',
  frozenGlow: '#93C5FD',
  broken: '#9CA3AF',
};

const flickerVariants: Variants = {
  flicker: {
    scale: [1, 1.08, 0.96, 1.06, 0.98, 1.04, 1],
    opacity: [1, 0.85, 1, 0.9, 1, 0.92, 1],
    rotate: [0, -2, 1, -1, 2, 0, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
      times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
    },
  },
  frozen: {
    scale: [1, 1.03, 0.98, 1.02, 1],
    opacity: [1, 0.8, 1, 0.85, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
  idle: {
    scale: 1,
    opacity: 1,
    rotate: 0,
  },
};

const numberPopVariants = {
  hidden: { scale: 0.5, opacity: 0, y: 8 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 18,
      mass: 0.8,
    },
  },
  exit: {
    scale: 1.4,
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

function getFlameState(streak: Streak): 'active' | 'frozen' | 'broken' {
  if (streak.current === 0) return 'broken';
  if (streak.frozen) return 'frozen';
  return 'active';
}

export default function StreakDisplay({ streak, className = '' }: StreakDisplayProps) {
  const [displayCount, setDisplayCount] = useState(streak.current);
  const [animKey, setAnimKey] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const flameState = getFlameState(streak);

  useEffect(() => {
    if (streak.current !== displayCount) {
      setAnimKey((k) => k + 1);
      setDisplayCount(streak.current);
    }
  }, [streak.current]);

  const handleTooltipToggle = useCallback(() => {
    setTooltipVisible((v) => !v);
    if (!tooltipVisible) setShowTooltip(true);
  }, [tooltipVisible]);

  const handleTooltipEnter = useCallback(() => {
    setShowTooltip(true);
    setTooltipVisible(true);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    setShowTooltip(false);
    setTooltipVisible(false);
  }, []);

  const getFlameColor = useCallback(() => {
    switch (flameState) {
      case 'active': return FLAME_COLORS.active;
      case 'frozen': return FLAME_COLORS.frozen;
      default: return FLAME_COLORS.broken;
    }
  }, [flameState]);

  const getFlameGlow = useCallback(() => {
    switch (flameState) {
      case 'active': return FLAME_COLORS.activeGlow;
      case 'frozen': return FLAME_COLORS.frozenGlow;
      default: return 'transparent';
    }
  }, [flameState]);

  const ariaLabel = streak.current === 0
    ? 'No active streak. Start a new streak today!'
    : streak.frozen
      ? `${streak.current} day streak frozen. ${streak.grace_days_remaining} grace day${streak.grace_days_remaining !== 1 ? 's' : ''} remaining.`
      : `${streak.current} day streak. Longest streak: ${streak.longest} days.`;

  return (
    <div
      className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 cursor-default select-none ${className}`}
      style={{
        background: flameState === 'active'
          ? 'linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(255,159,28,0.06) 100%)'
          : flameState === 'frozen'
            ? 'linear-gradient(135deg, rgba(96,165,250,0.12) 0%, rgba(147,197,253,0.06) 100%)'
            : 'rgba(156,163,175,0.06)',
        border: `1px solid ${
          flameState === 'active' ? 'rgba(255,107,53,0.2)'
          : flameState === 'frozen' ? 'rgba(96,165,250,0.2)'
          : 'rgba(156,163,175,0.12)'
        }`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: flameState === 'active'
          ? '0 0 20px rgba(255,107,53,0.08), inset 0 1px 0 rgba(255,255,255,0.3)'
          : 'none',
        minWidth: '110px',
      }}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {/** Flame Icon Area **/}
      <div className="relative flex-shrink-0" style={{ width: 28, height: 28 }}>
        {/** Glow layer **/}
        {flameState !== 'broken' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: flameState === 'active' ? 2 : 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: `radial-gradient(circle, ${getFlameGlow()} 0%, transparent 70%)`,
              filter: 'blur(4px)',
            }}
            aria-hidden="true"
          />
        )}

        {/** Flame / Broken icon **/}
        <motion.div
          key={flameState}
          variants={flickerVariants}
          animate={flameState === 'active' ? 'flicker' : flameState === 'frozen' ? 'frozen' : 'idle'}
          className="relative z-10 flex items-center justify-center"
          style={{ width: 28, height: 28 }}
          aria-hidden="true"
        >
          <Flame
            size={22}
            strokeWidth={2.2}
            fill={flameState === 'broken' ? 'none' : flameState === 'active' ? FLAME_COLORS.active : 'none'}
            color={getFlameColor()}
            style={{
              filter: flameState === 'active' ? `drop-shadow(0 0 4px ${FLAME_COLORS.activeGlow}66)` : 'none',
            }}
          />
        </motion.div>

        {/** Snowflake overlay for frozen state **/}
        <AnimatePresence>
          {flameState === 'frozen' && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className="absolute inset-0 z-20 flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="relative" style={{ marginTop: -2, marginLeft: 4 }}>
                <motion.div
                  animate={{
                    rotate: [0, 15, -10, 5, 0],
                    scale: [1, 1.1, 0.95, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Snowflake
                    size={14}
                    color={FLAME_COLORS.frozen}
                    strokeWidth={2.5}
                    fill="rgba(96,165,250,0.2)"
                    style={{
                      filter: `drop-shadow(0 0 3px ${FLAME_COLORS.frozenGlow}88)`,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/** Streak text **/}
      <div className="flex flex-col items-start leading-none gap-0.5">
        <div className="flex items-baseline gap-1">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={animKey}
              variants={numberPopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-bold tabular-nums"
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.2',
                color: flameState === 'broken' ? '#9CA3AF' : '#F9FAFB',
                fontFeatureSettings: '"tnum"',
              }}
              aria-hidden="true"
            >
              {displayCount}
            </motion.span>
          </AnimatePresence>
          <span
            className="text-xs font-medium"
            style={{
              color: flameState === 'broken' ? '#6B7280' : flameState === 'frozen' ? FLAME_COLORS.frozenGlow : '#9CA3AF',
            }}
          >
            {displayCount === 1 ? 'day' : 'days'}
          </span>
        </div>

        {/** Grace days or frozen indicator **/}
        {flameState === 'frozen' && streak.grace_days_remaining > 0 && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-medium"
            style={{ color: FLAME_COLORS.frozenGlow }}
          >
            {streak.grace_days_remaining} grace day{streak.grace_days_remaining !== 1 ? 's' : ''} left
          </motion.span>
        )}

        {flameState === 'frozen' && streak.grace_days_remaining <= 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-medium"
            style={{ color: '#F87171' }}
          >
            No grace days left
          </motion.span>
        )}
      </div>

      {/** Info button for longest streak tooltip **/}
      {streak.longest > 0 && (
        <button
          type="button"
          onClick={handleTooltipToggle}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
          onFocus={handleTooltipEnter}
          onBlur={handleTooltipLeave}
          className="relative z-30 flex-shrink-0 p-0.5 rounded-full transition-colors"
          style={{
            color: flameState === 'broken' ? '#6B7280' : '#6B7280',
          }}
          aria-label={`Longest streak: ${streak.longest} days. ${showTooltip ? 'Hide details' : 'Show details'}`}
          aria-expanded={tooltipVisible}
          tabIndex={0}
        >
          <Info size={11} strokeWidth={2.5} />
        </button>
      )}

      {/** Tooltip **/}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-52"
            style={{
              transform: 'translateX(-50%)',
              pointerEvents: tooltipVisible ? 'auto' : 'none',
            }}
            role="tooltip"
          >
            <div
              className="rounded-lg px-3 py-2 text-left"
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <p className="text-[11px] font-semibold mb-1" style={{ color: '#E2E8F0' }}>
                Streak Stats
              </p>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: '#94A3B8' }}>Current</span>
                  <span className="text-[11px] font-bold tabular-nums" style={{ color: '#F9FAFB' }}>
                    {streak.current} {streak.current === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: '#94A3B8' }}>Longest</span>
                  <span className="text-[11px] font-bold tabular-nums" style={{ color: '#FBBF24' }}>
                    {streak.longest} {streak.longest === 1 ? 'day' : 'days'}
                  </span>
                </div>
                {streak.frozen && (
                  <div className="flex justify-between items-center pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-[11px]" style={{ color: '#94A3B8' }}>Status</span>
                    <span className="text-[11px] font-medium" style={{ color: FLAME_COLORS.frozenGlow }}>
                      Frozen
                    </span>
                  </div>
                )}
                {streak.grace_days_remaining > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-[11px]" style={{ color: '#94A3B8' }}>Grace days</span>
                    <span className="text-[11px] font-medium" style={{ color: FLAME_COLORS.frozenGlow }}>
                      {streak.grace_days_remaining} left
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/** Tooltip arrow **/}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid rgba(15, 23, 42, 0.95)`,
                marginTop: -1,
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/** Broken state - Start new streak button **/}
      <AnimatePresence>
        {flameState === 'broken' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: 'auto' }}
            exit={{ opacity: 0, scale: 0.8, width: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 22,
            }}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('streak:restart'));
            }}
            className="relative z-20 ml-1 flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
              color: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(255,107,53,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,159,28,0.3)',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Start a new streak"
          >
            <RefreshCw size={10} strokeWidth={2.5} />
            Start a new streak
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
