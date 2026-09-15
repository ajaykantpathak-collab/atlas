'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Play, Pause, X, Sparkles, ChevronLeft, Volume2, VolumeX,
  HelpCircle, Maximize2, Rewind, FastForward,
} from 'lucide-react'
import { VidyaMascot } from '@/components/VidyaMascot'

export interface Hotspot {
  id: string
  x: number
  y: number
  timestamp: number
  duration?: number
  label: string
  popup: {
    type: 'manim' | 'vidya_chat' | 'diagram' | 'nested_video' | 'text_steps'
    data: {
      title?: string
      steps?: string[]
      animation?: string
      chatMessages?: { role: 'vidya' | 'student'; text: string }[]
      imageUrl?: string
      annotations?: { x: number; y: number; label: string }[]
      videoUrl?: string
    }
  }
}

export interface InteractiveVideoProps {
  videoUrl: string
  hotspots: Hotspot[]
  onComplete?: () => void
}

function HotspotPopup({ hotspot, onClose }: { hotspot: Hotspot; onClose: () => void }) {
  const { popup } = hotspot

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-surface-0/80 backdrop-blur-md"
    >
      <div className="glass-strong rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-surface-200/60 transition-colors z-10"
        >
          <X className="w-4 h-4 text-surface-800" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-brand-300" />
          <h3 className="font-display text-lg font-bold text-white">{hotspot.label}</h3>
        </div>

        {/* Text Steps */}
        {popup.type === 'text_steps' && popup.data.steps && (
          <div className="space-y-3">
            {popup.data.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-brand-300">{i + 1}</span>
                </div>
                <p className="text-sm text-surface-700 leading-relaxed pt-0.5">{step}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Vidya Chat */}
        {popup.type === 'vidya_chat' && popup.data.chatMessages && (
          <div className="space-y-4">
            <div className="flex justify-center mb-2">
              <VidyaMascot mood="curious" size="sm" />
            </div>
            {popup.data.chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                className={`flex ${msg.role === 'vidya' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'vidya'
                    ? 'glass-card text-surface-700'
                    : 'bg-brand-gradient text-white'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Diagram */}
        {popup.type === 'diagram' && popup.data.imageUrl && (
          <div className="relative">
            <img src={popup.data.imageUrl} alt={hotspot.label} className="w-full rounded-2xl" />
            {popup.data.annotations?.map((ann, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="absolute"
                style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
              >
                <div className="px-2 py-1 rounded-lg glass-strong text-xs text-white whitespace-nowrap shadow-glow-sm">
                  {ann.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Nested Video */}
        {popup.type === 'nested_video' && popup.data.videoUrl && (
          <video
            src={popup.data.videoUrl}
            controls
            className="w-full rounded-2xl"
          />
        )}

        {/* Manim placeholder */}
        {popup.type === 'manim' && (
          <div className="aspect-video rounded-2xl glass-card flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-brand-300 mx-auto mb-2" />
              <p className="text-sm text-surface-600">Interactive animation loads here</p>
              <p className="text-xs text-surface-500 mt-1">{popup.data.animation}</p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-brand-gradient text-white text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
        >
          <ChevronLeft className="w-4 h-4" /> Back to lesson
        </button>
      </div>
    </motion.div>
  )
}

export function InteractiveVideo({ videoUrl, hotspots, onComplete }: InteractiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [seenHotspots, setSeenHotspots] = useState<Set<string>>(new Set())

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTime = () => {
      setCurrentTime(video.currentTime)
      if (video.duration) setDuration(video.duration)
    }
    const onEnded = () => {
      setPlaying(false)
      onComplete?.()
    }

    video.addEventListener('timeupdate', onTime)
    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('ended', onEnded)
    }
  }, [onComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
  }

  const seek = (time: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = time
    setCurrentTime(time)
  }

  const handleHotspotClick = (hs: Hotspot) => {
    videoRef.current?.pause()
    setPlaying(false)
    setActiveHotspot(hs)
    setSeenHotspots(prev => new Set(prev).add(hs.id))
  }

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const visibleHotspots = hotspots.filter(hs =>
    currentTime >= hs.timestamp &&
    (!hs.duration || currentTime <= hs.timestamp + hs.duration)
  )

  return (
    <div ref={containerRef} className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card group">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Hotspot markers */}
      {visibleHotspots.map((hs) => (
        <motion.button
          key={hs.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => handleHotspotClick(hs)}
          className="absolute z-30"
          style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-brand-500/30 animate-ping" />
            <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-glow border-2 transition-transform hover:scale-110 ${
              seenHotspots.has(hs.id)
                ? 'bg-mint-500/80 border-mint-300'
                : 'bg-brand-500/80 border-brand-300'
            }`}>
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded-lg glass-strong text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {hs.label}
          </div>
        </motion.button>
      ))}

      {/* Hotspot popup */}
      <AnimatePresence>
        {activeHotspot && (
          <HotspotPopup hotspot={activeHotspot} onClose={() => setActiveHotspot(null)} />
        )}
      </AnimatePresence>

      {/* Video controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-surface-0/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar with temporal hotspot markers */}
        <div className="relative h-1.5 rounded-full bg-surface-200/40 mb-3 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = (e.clientX - rect.left) / rect.width
            seek(pct * duration)
          }}
        >
          <div className="h-full bg-brand-gradient rounded-full relative" style={{ width: `${(currentTime / duration) * 100}%` }}>
            {/* Temporal hotspot markers on timeline */}
            {hotspots.map(hs => (
              <div
                key={hs.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-400 border border-white/50"
                style={{ left: `${(hs.timestamp / duration) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
            {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
          </button>
          <button onClick={() => seek(Math.max(0, currentTime - 10))} className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
            <Rewind className="w-4 h-4 text-white" />
          </button>
          <button onClick={() => seek(Math.min(duration, currentTime + 10))} className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
            <FastForward className="w-4 h-4 text-white" />
          </button>
          <button onClick={toggleMute} className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
            {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>
          <span className="text-xs text-surface-600 font-mono ml-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="flex-1" />
          {hotspots.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-surface-600">
              <Sparkles className="w-3 h-3 text-gold-400" />
              {seenHotspots.size}/{hotspots.length} explored
            </div>
          )}
          <button className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Center play button when paused */}
      {!playing && !activeHotspot && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center shadow-glow-lg"
          >
            <Play className="w-7 h-7 text-white ml-1" />
          </motion.div>
        </button>
      )}
    </div>
  )
}
