'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C8_PHY_CBSE_001 = 'c8_phy_cbse_001'; // Sound production by vibrating objects
const NODE_C8_PHY_CBSE_002 = 'c8_phy_cbse_002'; // Human voice box (Larynx)
const NODE_C8_PHY_CBSE_003 = 'c8_phy_cbse_003'; // Sound propagation through media
const NODE_C8_PHY_CBSE_004 = 'c8_phy_cbse_004'; // Characteristics of sound waves
const NODE_C8_PHY_CBSE_005 = 'c8_phy_cbse_005'; // Amplitude and loudness
const NODE_C8_PHY_CBSE_006 = 'c8_phy_cbse_006'; // Frequency and pitch
const NODE_C8_PHY_CBSE_007 = 'c8_phy_cbse_007'; // Time period and wavelength relationship
const NODE_C8_PHY_CBSE_008 = 'c8_phy_cbse_008'; // Audible range (20 Hz - 20 kHz)
const NODE_C8_PHY_CBSE_009 = 'c8_phy_cbse_009'; // Infrasonic and Ultrasonic sound
const NODE_C8_PHY_CBSE_010 = 'c8_phy_cbse_010'; // Noise vs Music
const NODE_C8_PHY_CBSE_011 = 'c8_phy_cbse_011'; // Noise pollution & control

const ALL_NODE_IDS = [
  NODE_C8_PHY_CBSE_001,
  NODE_C8_PHY_CBSE_002,
  NODE_C8_PHY_CBSE_003,
  NODE_C8_PHY_CBSE_004,
  NODE_C8_PHY_CBSE_005,
  NODE_C8_PHY_CBSE_006,
  NODE_C8_PHY_CBSE_007,
  NODE_C8_PHY_CBSE_008,
  NODE_C8_PHY_CBSE_009,
  NODE_C8_PHY_CBSE_010,
  NODE_C8_PHY_CBSE_011,
];

// ─── SCENARIO DATA ───
const SCENARIO = {
  title: 'ISRO Acoustic & Vibration Control Mission',
  intro: 'Welcome to the Acoustic Testing Facility! Launch vehicles encounter intense vibrations and acoustic pressures during engine ignition and atmospheric flight. As the lead Acoustic Engineer, you must analyze how vibrating objects create pressure waves, how sound travels through solids, liquids, and gases, control decibel levels, and test ultrasonic non-destructive diagnostic sensors.',
  context: 'Manipulate wave generators, tune vocal cord models, evacuate bell jars, map pitch vs frequency, and build acoustic dampeners to safeguard sensitive payload electronics.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An astronaut inside a spacecraft strikes a metal wrench against the outer hull during a spacewalk in deep space. Can another astronaut floating 5 meters away in open space hear the sound directly through space?',
  options: [
    'Yes, because sound travels fastest in the vacuum of space.',
    'No, because sound requires a material medium (solid, liquid, or gas) for propagation, and space is a vacuum.',
    'Yes, but only if the frequency of vibration is above 20,000 Hz.',
    'No, because the metallic wrench absorbs all sound vibrations instantly.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Sound is a mechanical pressure wave. It relies on particle collisions to transmit energy from one point to another!',
};

// ─── MISCONCEPTIONS CHECKLIST ───
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
}

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Sound can travel through a vacuum like light does.',
    correction: 'Sound is a mechanical wave that requires physical particles (atoms/molecules) to vibrate. Light is an electromagnetic wave and needs no medium.',
  },
  {
    id: 'misc_2',
    misconception: 'Pitch depends on how hard you strike an instrument (amplitude).',
    correction: 'Pitch depends exclusively on frequency (rate of vibration). Striking harder increases amplitude, which increases loudness, not pitch!',
  },
  {
    id: 'misc_3',
    misconception: 'Loudness increases linearly when amplitude increases.',
    correction: 'Loudness is proportional to the SQUARE of the amplitude ($L \\propto A^2$). Doubling amplitude makes the sound 4 times louder!',
  },
  {
    id: 'misc_4',
    misconception: 'In human vocal cords, tighter muscles produce lower pitched voices.',
    correction: 'When vocal cords are stretched tight and thin, they vibrate faster, producing higher frequency and higher pitch voices.',
  },
  {
    id: 'misc_5',
    misconception: 'Ultrasound means sound that is extremely loud.',
    correction: 'Ultrasound refers to frequencies higher than the human hearing upper limit (>20,000 Hz), regardless of how loud or soft it is.',
  },
];

// ─── TEACHING SLIDES DATA ───
interface TeachingSlide {
  id: string;
  title: string;
  concept: string;
  nodeId: string;
  keyFormula?: string;
  explanation: string;
  interactiveInstruction: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    title: '1. Production of Sound & Vibrations',
    concept: 'Vibrating Bodies Create Sound',
    nodeId: NODE_C8_PHY_CBSE_001,
    keyFormula: 'Motion \\leftrightarrow Vibration \\rightarrow Sound',
    explanation: 'Sound is produced when an object vibrates to-and-fro rapidly. When a tuning fork, guitar string, or drum membrane oscillates, it pushes and pulls neighboring air particles, initiating pressure waves.',
    interactiveInstruction: 'Adjust the vibration amplitude slider to see how tuning fork prongs push surrounding air molecules into compressions.',
  },
  {
    id: 'slide_2',
    title: '2. Sound Needs a Medium to Travel',
    concept: 'Propagation in Solids, Liquids, & Gases',
    nodeId: NODE_C8_PHY_CBSE_003,
    keyFormula: 'v_{solid} > v_{liquid} > v_{gas} \\quad (v_{vacuum} = 0)',
    explanation: 'Sound propagates as longitudinal waves of compressions (high density) and rarefactions (low density). Denser material with closer particles transmits sound faster: Air (~343 m/s), Water (~1480 m/s), Steel (~5960 m/s). In a vacuum, there are no particles, so sound cannot travel at all!',
    interactiveInstruction: 'Switch media modes (Air, Water, Steel, Vacuum) and observe how fast wave fronts travel through the particle grid.',
  },
  {
    id: 'slide_3',
    title: '3. Human Voice Box (Larynx)',
    concept: 'Vocal Cord Tension & Pitch',
    nodeId: NODE_C8_PHY_CBSE_002,
    keyFormula: 'f \\propto \\frac{\\sqrt{\\text{Tension}}}{\\text{Length}}',
    explanation: 'In humans, sound is produced by the voice box (larynx). Two vocal cords are stretched across the larynx leaving a narrow slit for air passage. When lungs force air through the slit, cords vibrate. Tight, thin cords yield high pitch; loose, thick cords yield low pitch.',
    interactiveInstruction: 'Drag the Vocal Cord Tension slider to alter cord vibration frequency and hear the changing pitch.',
  },
  {
    id: 'slide_4',
    title: '4. Wave Characteristics: Amplitude & Frequency',
    concept: 'Loudness vs Pitch & Time Period',
    nodeId: NODE_C8_PHY_CBSE_004,
    keyFormula: 'Loudness \\propto (Amplitude)^2 \\quad | \\quad f = \\frac{1}{T} \\quad | \\quad v = f \\times \\lambda',
    explanation: 'Amplitude (A) is the maximum displacement from mean position—it determines Loudness (measured in decibels dB). Frequency (f) is oscillations per second (Hz)—it determines Pitch. Time period (T) is time taken for 1 complete wave.',
    interactiveInstruction: 'Use the Oscilloscope sliders to change amplitude and frequency. Watch the real-time wave graph update!',
  },
  {
    id: 'slide_5',
    title: '5. Sound Spectrum & Applications',
    concept: 'Infrasonic, Audible & Ultrasonic Range',
    nodeId: NODE_C8_PHY_CBSE_008,
    keyFormula: '<20\\text{ Hz (Infra)} \\quad | \\quad 20\\text{ Hz -- 20 kHz (Audible)} \\quad | \\quad >20\\text{ kHz (Ultra)}',
    explanation: 'Humans hear between 20 Hz and 20,000 Hz. Elephants and whales use infrasound (<20 Hz). Bats, dolphins, and ISRO ultrasonic testing equipment use ultrasound (>20 kHz) for medical imaging, tracking, and detecting micro-cracks in satellite hulls.',
    interactiveInstruction: 'Move along the spectrum bar to test different frequencies and explore their natural and industrial uses.',
  },
];

// ─── CHALLENGE INTERFACE & DATA ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_vibration',
    nodeId: NODE_C8_PHY_CBSE_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A skin membrane of a tabla is stretched tightly and struck. What fundamental condition causes the tabla to emit sound?',
    options: [
      'Rapid back-and-forth periodic mechanical vibration of the membrane.',
      'Chemical reaction between air and the membrane surface.',
      'Static electricity building up on the drum shell.',
      'The creation of a vacuum inside the tabla bowl.',
    ],
    correctIndex: 0,
    explanation: 'Sound is produced strictly by vibrating objects. Striking the membrane makes it vibrate back and forth rapidly, disturbing adjacent air particles.',
    hints: [
      'Touch your throat lightly while speaking. What do you feel?',
      'All musical instruments work by making something move back and forth quickly.',
      'Vibration is the essential mechanical driver of sound waves.',
    ],
  },
  {
    id: 'ch_02_vacuum_propagation',
    nodeId: NODE_C8_PHY_CBSE_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In an electric bell jar experiment, as air is continuously pumped out using a vacuum pump, what happens to the sound of the ringing bell?',
    options: [
      'The sound becomes louder because there is no air friction to stop it.',
      'The sound becomes fainter and fainter until it stops completely when a full vacuum is reached.',
      'The pitch of the bell increases to ultrasonic levels.',
      'The speed of the bell clapper slows down to zero.',
    ],
    correctIndex: 1,
    explanation: 'Sound requires a material medium (air, liquid, or solid) to travel. As air molecules are evacuated, fewer particles are available to carry pressure waves, so the sound dies out.',
    hints: [
      'Can sound waves cross an empty void with no molecules?',
      'Think about what carries the mechanical energy from the bell to the glass wall.',
      'Zero medium density = zero sound transmission.',
    ],
  },
  {
    id: 'ch_03_larynx_pitch',
    nodeId: NODE_C8_PHY_CBSE_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When a singer transitions from singing a low bass note to a high soprano note, how do the vocal cord muscles change physical state?',
    options: [
      'Vocal cords become looser and thicker to vibrate slower.',
      'Vocal cords become tighter and thinner to vibrate at a higher frequency.',
      'Vocal cords stop vibrating completely and rely on tongue air movement.',
      'Vocal cords expand in volume while reducing air passage pressure.',
    ],
    correctIndex: 1,
    explanation: 'Higher pitch corresponds to higher frequency. Tighter, thinner vocal cords vibrate faster (higher frequency), yielding high-pitched voices.',
    hints: [
      'Compare a thin guitar string under high tension to a thick loose bass string.',
      'Tension increases frequency.',
      'Higher frequency = higher pitch.',
    ],
  },
  {
    id: 'ch_04_wave_labels',
    nodeId: NODE_C8_PHY_CBSE_004,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Identify the structural components of a longitudinal sound wave by matching each concept to its spatial zone.',
    dragItems: [
      { label: 'Compression (High Density)', targetId: 'zone_comp' },
      { label: 'Rarefaction (Low Density)', targetId: 'zone_rare' },
      { label: 'Wavelength (λ)', targetId: 'zone_wave' },
      { label: 'Amplitude Peak', targetId: 'zone_amp' },
    ],
    correctMapping: {
      zone_comp: 'Compression (High Density)',
      zone_rare: 'Rarefaction (Low Density)',
      zone_wave: 'Wavelength (λ)',
      zone_amp: 'Amplitude Peak',
    },
    explanation: 'Compressions are high particle density regions; Rarefactions are low particle density regions. Wavelength is the distance between two consecutive compressions. Amplitude is maximum particle displacement.',
    hints: [
      'Where particles are squished close together, that is compression.',
      'Where particles are spread apart, that is rarefaction.',
      'Distance between successive compressions is one full wavelength.',
    ],
  },
  {
    id: 'ch_05_loudness_amplitude_math',
    nodeId: NODE_C8_PHY_CBSE_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If an acoustic amplifier increases the vibration amplitude of a tuning fork by a factor of 3, by what factor does the loudness of the sound increase?',
    correctAnswer: 9,
    tolerance: 0.1,
    unit: 'times',
    explanation: 'Loudness is directly proportional to the square of the amplitude ($L \\propto A^2$). If amplitude triples ($A = 3$), Loudness increases by $3^2 = 9$ times.',
    hints: [
      'Recall the relationship formula between Loudness and Amplitude.',
      'Loudness varies with the SQUARE of the amplitude.',
      'Calculate 3 squared ($3 \\times 3$).',
    ],
  },
  {
    id: 'ch_06_frequency_period_math',
    nodeId: NODE_C8_PHY_CBSE_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A pendulum oscillates 600 times in 12 seconds. Calculate its frequency in Hertz (Hz).',
    correctAnswer: 50,
    tolerance: 0.5,
    unit: 'Hz',
    explanation: 'Frequency $f = \\frac{\\text{Total Oscillations}}{\\text{Time in seconds}} = \\frac{600}{12} = 50\\text{ Hz}$.',
    hints: [
      'Frequency is defined as number of vibrations per ONE second.',
      'Divide 600 oscillations by 12 seconds.',
      '600 / 12 = ?',
    ],
  },
  {
    id: 'ch_07_audible_spectrum',
    nodeId: NODE_C8_PHY_CBSE_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard frequency range of audible sound for a healthy young human ear?',
    options: [
      '0 Hz to 100 Hz',
      '20 Hz to 20,000 Hz (20 kHz)',
      '50,000 Hz to 100,000 Hz',
      '1 Hz to 10 Hz',
    ],
    correctIndex: 1,
    explanation: 'Human ears can perceive sound waves with frequencies between 20 Hz and 20,000 Hz (20 kHz). Frequencies below 20 Hz are infrasonic, and above 20 kHz are ultrasonic.',
    hints: [
      'Low limit is near 20 vibrations per second.',
      'Upper limit is around twenty thousand vibrations per second.',
      'Look for the option spanning 20 Hz to 20 kHz.',
    ],
  },
  {
    id: 'ch_08_ultrasound_applications',
    nodeId: NODE_C8_PHY_CBSE_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'ISRO engineers scan rocket engine titanium casings for hidden micro-fractures using high-frequency sound waves. Which acoustic range is used, and why?',
    options: [
      'Infrasound (<20 Hz), because low frequencies penetrate through solid steel without reflecting.',
      'Ultrasound (>20,000 Hz), because short wavelengths reflect sharply off tiny internal structural defects.',
      'Audible voice sound (1000 Hz), because engineers can listen to the sound by ear directly.',
      'Sub-audible pressure pulses (0.1 Hz), because they cause structural resonance.',
    ],
    correctIndex: 1,
    explanation: 'Ultrasonic waves (>20 kHz) have very short wavelengths. They travel in well-defined narrow beams and reflect back from cracks or flaws inside metal blocks, enabling non-destructive testing.',
    hints: [
      'Which range has high frequency and very short wavelength?',
      'Short wavelengths can detect tiny imperfections.',
      'Ultrasound is used in SONAR and medical diagnostics.',
    ],
  },
  {
    id: 'ch_09_noise_mitigation',
    nodeId: NODE_C8_PHY_CBSE_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A rocket engine test stand produces 110 dB of noise pollution. Installing a triple-pane acoustic barrier reduces sound intensity by 40 dB, and planting a dense tree belt around the facility absorbs another 15 dB. What is the final noise level reaching the control room in dB?',
    correctAnswer: 55,
    tolerance: 0.5,
    unit: 'dB',
    explanation: 'Final sound level = Initial level - Barrier reduction - Tree absorbation = 110 dB - 40 dB - 15 dB = 55 dB.',
    hints: [
      'Subtract the barrier reduction from 110 dB.',
      'Subtract the tree belt reduction from the result.',
      '110 - 40 - 15 = ?',
    ],
  },
];

// ─── CANVAS COMPONENT 1: Longitudinal Sound Wave Simulator ───
interface WaveSimProps {
  frequency: number; // Hz
  amplitude: number; // relative scale 1-100
  medium: 'air' | 'water' | 'steel' | 'vacuum';
  isPlaying: boolean;
}

const LongitudinalWaveCanvas: React.FC<WaveSimProps> = ({ frequency, amplitude, medium, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const speedMultiplier = useMemo(() => {
    switch (medium) {
      case 'air': return 1.0;
      case 'water': return 2.2;
      case 'steel': return 4.0;
      case 'vacuum': return 0.0;
      default: return 1.0;
    }
  }, [medium]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Create persistent particle equilibrium grid
    const cols = 40;
    const rows = 12;
    const particles: { x0: number; y0: number }[] = [];
    const width = canvas.width;
    const height = canvas.height;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x0 = (c + 0.5) * (width / cols);
        const y0 = (r + 0.5) * (height / rows);
        particles.push({ x0, y0 });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background styling
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Grid subtle lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      if (medium === 'vacuum') {
        // Show empty dark vacuum warning overlay
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('VACUUM: NO MOLECULES PRESENT — NO SOUND PROPAGATION', width / 2, height / 2);

        // Draw static sparse faded dots
        ctx.fillStyle = 'rgba(148, 163, 184, 0.2)';
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x0, p.y0, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        return;
      }

      if (isPlaying) {
        time += 0.04 * speedMultiplier;
      }

      const waveK = (frequency * 0.015) / speedMultiplier;
      const waveOmega = frequency * 0.1 * speedMultiplier;
      const dispAmp = (amplitude / 100) * 18;

      // Color scheme based on medium
      let particleColor = '#38bdf8'; // sky blue air
      if (medium === 'water') particleColor = '#06b6d4'; // cyan water
      if (medium === 'steel') particleColor = '#a855f7'; // purple steel

      particles.forEach((p) => {
        // Longitudinal oscillation along X axis: displacement depends on position & time
        const dx = dispAmp * Math.sin(waveK * p.x0 - waveOmega * time);
        const curX = p.x0 + dx;
        const curY = p.y0;

        // Density color indicator (compression vs rarefaction)
        const localCompression = -dispAmp * waveK * Math.cos(waveK * p.x0 - waveOmega * time);

        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);

        if (localCompression > 0.1) {
          // Compression (High Density) -> Glowing Bright
          ctx.fillStyle = particleColor;
          ctx.shadowColor = particleColor;
          ctx.shadowBlur = 6;
        } else {
          // Rarefaction (Low Density)
          ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      // Draw Piston / Speaker cone on left edge
      const speakerX = 20 + dispAmp * Math.sin(-waveOmega * time);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(speakerX, 30);
      ctx.lineTo(speakerX, height - 30);
      ctx.lineTo(0, height - 20);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Speaker driver hub
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(speakerX / 2, height / 2, 20, 0, Math.PI * 2);
      ctx.fill();

      // Legend annotations
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('SOUND SOURCE (Vibrating Piston)', 10, 22);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Medium: ${medium.toUpperCase()} (v = ${speedMultiplier * 340} m/s approx)`, width - 260, 22);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, amplitude, medium, isPlaying, speedMultiplier]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      <canvas ref={canvasRef} width={750} height={260} className="w-full h-auto block" />
    </div>
  );
};

// ─── CANVAS COMPONENT 2: Real-time Oscilloscope Waveform Visualizer ───
interface OscilloscopeProps {
  frequency: number;
  amplitude: number;
}

const OscilloscopeCanvas: React.FC<OscilloscopeProps> = ({ frequency, amplitude }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Dark oscilloscope grid
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      // Horizontal grid lines
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Vertical grid lines
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Center baseline
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      // Plot Sine Wave
      phase += 0.05;
      const scaleAmp = (amplitude / 100) * (h * 0.38);
      const waveLengthPixels = Math.max(20, 4000 / frequency);

      ctx.strokeStyle = '#22c55e'; // Phosphor green wave
      ctx.lineWidth = 3;
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = centerY - scaleAmp * Math.sin((x / waveLengthPixels) * Math.PI * 2 - phase);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Peak Amplitude Markers
      const peakX = waveLengthPixels * 0.25 + (phase * waveLengthPixels) / (2 * Math.PI);
      const clampedPeakX = (peakX % waveLengthPixels) + waveLengthPixels;
      const peakY = centerY - scaleAmp;

      if (clampedPeakX < w - 20) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(clampedPeakX, centerY);
        ctx.lineTo(clampedPeakX, peakY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`Amp = ${amplitude} dB`, clampedPeakX + 6, (centerY + peakY) / 2);
      }

      // Live metrics overlay
      const periodMs = (1000 / frequency).toFixed(2);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`FREQ: ${frequency} Hz | PERIOD T: ${periodMs} ms | LOUDNESS ∝ A² (${(amplitude ** 2 / 100).toFixed(0)} arb. units)`, 15, 24);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [frequency, amplitude]);

  return (
    <div className="w-full rounded-xl border border-emerald-500/30 overflow-hidden bg-slate-950 p-2 shadow-inner">
      <div className="flex items-center justify-between px-3 py-1 bg-slate-900 border-b border-slate-800 text-xs font-mono text-emerald-400">
        <span>OSCILLOSCOPE TELEMETRY BENCH</span>
        <span className="animate-pulse flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> LIVE WAVEFORM
        </span>
      </div>
      <canvas ref={canvasRef} width={700} height={200} className="w-full h-auto block" />
    </div>
  );
};

// ─── SVG COMPONENT 1: Vacuum Bell Jar Experiment ───
interface BellJarProps {
  airPressure: number; // 0 (vacuum) to 100 (full air)
  onTogglePump: () => void;
  isPumping: boolean;
}

const BellJarSVG: React.FC<BellJarProps> = ({ airPressure, onTogglePump, isPumping }) => {
  const soundRadius = (airPressure / 100) * 45;
  const decibels = Math.round((airPressure / 100) * 85);

  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-xl w-full">
      <h3 className="text-md font-bold text-amber-400 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.11a2 2 0 00-1.815 2.502l.6 2.4A2 2 0 006.33 21.6h11.34a2 2 0 001.945-1.588l.6-2.4a2 2 0 00-.447-1.784z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v6" />
        </svg>
        Bell Jar Vacuum Experiment
      </h3>

      <svg width="320" height="280" viewBox="0 0 320 280" className="w-full max-w-[340px] h-auto">
        <defs>
          <radialGradient id="glassShine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="60%" stopColor="rgba(186, 230, 253, 0.08)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.25)" />
          </radialGradient>
        </defs>

        {/* Base Plate */}
        <rect x="50" y="230" width="220" height="18" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
        {/* Vacuum Tube Connection */}
        <rect x="150" y="248" width="20" height="25" fill="#475569" />
        <path d="M140,265 L180,265" stroke="#f59e0b" strokeWidth="4" />

        {/* Air Density Dots visual */}
        {Array.from({ length: Math.floor((airPressure / 100) * 70) }).map((_, i) => {
          const rx = 80 + (i * 19) % 150;
          const ry = 70 + ((i * 13) % 140);
          return <circle key={i} cx={rx} cy={ry} r="2" fill="#38bdf8" opacity="0.6" />;
        })}

        {/* Electric Bell Frame inside */}
        <rect x="157" y="50" width="6" height="60" fill="#94a3b8" />
        <circle cx="160" cy="110" r="28" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <rect x="145" y="130" width="30" height="20" rx="3" fill="#475569" />

        {/* Sound Waves radiating from Bell */}
        {airPressure > 5 && (
          <>
            <circle cx="160" cy="110" r={soundRadius * 0.5 + 5} fill="none" stroke="#f59e0b" strokeWidth="2" opacity={airPressure / 100} className="animate-ping" />
            <circle cx="160" cy="110" r={soundRadius + 10} fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity={airPressure / 150} />
          </>
        )}

        {/* Glass Jar Outline */}
        <path d="M 70 230 L 70 100 Q 70 30 160 30 Q 250 30 250 100 L 250 230 Z" fill="url(#glassShine)" stroke="#93c5fd" strokeWidth="3" />
        {/* Glass reflection highlight */}
        <path d="M 85 220 L 85 110 Q 85 55 140 45" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.5" strokeLinecap="round" />

        {/* Sound Level Readout Meter */}
        <rect x="190" y="170" width="110" height="45" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <text x="245" y="188" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">SOUND INTENSITY</text>
        <text x="245" y="207" textAnchor="middle" fill={airPressure < 10 ? '#ef4444' : '#10b981'} fontSize="16" fontFamily="monospace" fontWeight="bold">
          {decibels} dB {airPressure === 0 ? '(SILENCE)' : ''}
        </text>
      </svg>

      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 mt-2 px-2">
        <div className="flex-1 w-full">
          <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
            <span>Air Pressure inside Jar:</span>
            <span className="font-mono text-gold-400">{airPressure}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={airPressure}
            onChange={(e) => {
              audioManager.play('tap');
              // Handled by parent
            }}
            disabled
            className="w-full accent-gold-400 cursor-pointer"
          />
        </div>
        <button
          onClick={onTogglePump}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-md flex items-center gap-2 ${
            isPumping ? 'bg-amber-600 hover:bg-amber-500 text-white animate-pulse' : 'bg-gold-600 hover:bg-gold-500 text-white'
          }`}
        >
          {isPumping ? 'STOP PUMP' : airPressure === 0 ? 'RE-FILL AIR' : 'EVACUATE AIR (PUMP)'}
        </button>
      </div>
    </div>
  );
};

// ─── SVG COMPONENT 2: Frequency Spectrum & Audibility Meter ───
interface SpectrumProps {
  currentFreq: number;
}

const AudibilitySpectrumSVG: React.FC<SpectrumProps> = ({ currentFreq }) => {
  let category = 'Audible Range (Human)';
  let color = '#10b981'; // green
  if (currentFreq < 20) {
    category = 'Infrasonic (< 20 Hz)';
    color = '#6366f1'; // indigo
  } else if (currentFreq > 20000) {
    category = 'Ultrasonic (> 20,000 Hz)';
    color = '#f59e0b'; // amber
  }

  // Calculate position on logarithmic axis (1 Hz to 100,000 Hz)
  const minLog = Math.log10(1);
  const maxLog = Math.log10(100000);
  const curLog = Math.log10(Math.max(1, currentFreq));
  const posPercent = Math.min(100, Math.max(0, ((curLog - minLog) / (maxLog - minLog)) * 100));

  return (
    <div className="w-full p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Acoustic Frequency Spectrum</h4>
        <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: color }}>
          {category}
        </span>
      </div>

      {/* Spectrum Bar SVG */}
      <svg width="600" height="110" viewBox="0 0 600 110" className="w-full h-auto">
        {/* Background Regions */}
        {/* Infrasonic (1 Hz - 20 Hz) */}
        <rect x="10" y="25" width="120" height="35" fill="#4338ca" opacity="0.7" rx="4" />
        <text x="70" y="46" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">INFRASONIC</text>

        {/* Audible (20 Hz - 20,000 Hz) */}
        <rect x="135" y="25" width="310" height="35" fill="#059669" opacity="0.8" rx="4" />
        <text x="290" y="46" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">HUMAN AUDIBLE (20 Hz - 20 kHz)</text>

        {/* Ultrasonic (20 kHz - 100 kHz) */}
        <rect x="450" y="25" width="140" height="35" fill="#d97706" opacity="0.8" rx="4" />
        <text x="520" y="46" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">ULTRASONIC</text>

        {/* Frequency Ticks */}
        <text x="15" y="75" fill="#94a3b8" fontSize="10">1 Hz</text>
        <text x="135" y="75" fill="#a7f3d0" fontSize="10" fontWeight="bold">20 Hz</text>
        <text x="445" y="75" fill="#fde68a" fontSize="10" fontWeight="bold">20,000 Hz</text>
        <text x="575" y="75" fill="#94a3b8" fontSize="10">100 kHz</text>

        {/* Key Animals / Devices icons */}
        <text x="70" y="96" fill="#a5b4fc" fontSize="9" textAnchor="middle">Elephants, Whales, Earthquakes</text>
        <text x="290" y="96" fill="#6ee7b7" fontSize="9" textAnchor="middle">Human Hearing, Guitars, Voice</text>
        <text x="520" y="96" fill="#fcd34d" fontSize="9" textAnchor="middle">Bats, Sonar, Ultrasound Scans</text>

        {/* Active Frequency Pointer */}
        {(() => {
          const pointerX = 10 + (posPercent / 100) * 580;
          return (
            <g transform={`translate(${pointerX}, 0)`}>
              <polygon points="0,20 -7,8 7,8" fill="#ffffff" />
              <line x1="0" y1="20" x2="0" y2="62" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="2,2" />
              <circle cx="0" cy="42" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

// ─── MAIN COMPONENT ───
export default function C8_PhysicsSoundCBSESim() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'predict' | 'explore' | 'challenges' | 'studio'>('predict');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);

  // Simulation Controls State
  const [simFreq, setSimFreq] = useState<number>(440); // A4 note (440 Hz)
  const [simAmp, setSimAmp] = useState<number>(60);
  const [simMedium, setSimMedium] = useState<'air' | 'water' | 'steel' | 'vacuum'>('air');
  const [vocalCordTension, setVocalCordTension] = useState<number>(50); // 0 (slack) to 100 (tight)

  // Bell Jar Interactive State
  const [jarAir, setJarAir] = useState<number>(100);
  const [isPumping, setIsPumping] = useState<boolean>(false);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge Mode State
  const [userOptionsSelected, setUserOptionsSelected] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [dragState, setDragState] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // SRS & BKT Adaptive Learning State
  const [bktMap, setBktMap] = useState<Record<string, any>>({});
  const [srsItems, setSrsItems] = useState<Record<string, any>>({});
  const [totalScore, setTotalScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Visual FX State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Inactivity Timer for Auto Hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Initialize BKT & SRS states
  useEffect(() => {
    const initialBkt: Record<string, any> = {};
    const initialSrs: Record<string, any> = {};

    ALL_NODE_IDS.forEach((id) => {
      initialBkt[id] = createBKTState();
      initialSrs[id] = createReviewItem(id, 'Physics');
    });

    setBktMap(initialBkt);
    setSrsItems(initialSrs);
  }, []);

  // Bell Jar vacuum pump timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPumping) {
      interval = setInterval(() => {
        setJarAir((prev) => {
          if (prev <= 0) {
            setIsPumping(false);
            return 0;
          }
          return Math.max(0, prev - 5);
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPumping]);

  // Handle Vocal Cord slider effect on frequency
  useEffect(() => {
    // Map tension (0-100) to frequency (100 Hz to 850 Hz)
    const calculatedFreq = Math.round(100 + (vocalCordTension / 100) * 750);
    setSimFreq(calculatedFreq);
  }, [vocalCordTension]);

  // Reset inactivity timer for hint bubble
  const resetInactivityTimer = useCallback(() => {
    setShowHint(false);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        setCurrentHintText(currentChallenge.hints[0] || 'Observe how physical variables directly affect wave speed and frequency!');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000); // 10s idle hint trigger
  }, [activeTab, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIdx, activeTab]);

  // Discovery Question Submit Handler
  const handleDiscoverySubmit = (idx: number) => {
    audioManager.play('tap');
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);

    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on! Sound cannot travel through the vacuum of space because it requires particles to vibrate.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that sound relies on material particles to propagate!');
    }
  };

  // Challenge Validation Handler
  const handleVerifyChallenge = () => {
    resetInactivityTimer();
    if (!currentChallenge) return;

    let isCorrect = false;

    if (currentChallenge.type === 'classify' || currentChallenge.type === 'distinguish') {
      isCorrect = userOptionsSelected === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.1;
        isCorrect = Math.abs(val - currentChallenge.correctAnswer) <= tol;
      }
    } else if (currentChallenge.type === 'drag-label') {
      if (currentChallenge.correctMapping) {
        isCorrect = Object.entries(currentChallenge.correctMapping).every(
          ([key, expected]) => dragState[key] === expected
        );
      }
    }

    // Update BKT & SRS State
    const nodeId = currentChallenge.nodeId;
    const prevBkt = bktMap[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const prevSrs = srsItems[nodeId] || createReviewItem(nodeId, 'Physics');
    const quality = isCorrect ? 5 : 2;
    const updatedSrs = sm2Update(prevSrs, quality, 0);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent calculation! Correct understanding of acoustic principles.');
      setChallengeFeedback({ isCorrect: true, text: currentChallenge.explanation });
      setShowSuccessBanner(true);
      setShowConfetti(true);

      const newCompleted = new Set(completedChallenges);
      newCompleted.add(currentChallenge.id);
      setCompletedChallenges(newCompleted);

      const nextScore = totalScore + 15;
      setTotalScore(nextScore);
      recordGameScore(ALL_NODE_IDS, nextScore);

      setTimeout(() => {
        setShowSuccessBanner(false);
        setShowConfetti(false);
      }, 3000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That is not quite right. Review the hints and try again.');
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. Hint: ${currentChallenge.hints[0]}`,
      });
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setChallengeFeedback(null);
    setUserOptionsSelected(null);
    setNumericInput('');
    setDragState({});
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      speechManager.speak('Congratulations! You have completed all acoustic challenges.');
    }
  };

  // Overall Mastery Calculation
  const averageMastery = useMemo(() => {
    const keys = Object.keys(bktMap);
    if (keys.length === 0) return 0;
    const sum = keys.reduce((acc, k) => acc + masteryProb(bktMap[k].pKnown), 0);
    return Math.round((sum / keys.length) * 100);
  }, [bktMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none">
      {/* ─── HEADER & ISRO ACOUSTIC LAB MASTERY BAR ─── */}
      <header className="max-w-6xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold-500 to-amber-500 flex items-center justify-center shadow-lg text-slate-950 font-bold text-2xl">
            🔊
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-amber-300 to-emerald-400">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">Class 8 CBSE Physics • Chapter: Sound (Acoustic Mechanics)</p>
          </div>
        </div>

        {/* Global Progress & BKT Mastery Badge */}
        <div className="flex items-center gap-6 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Concept Mastery</div>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-gold-500 to-emerald-400 h-full transition-all duration-500" style={{ width: `${averageMastery}%` }} />
              </div>
              <span className="font-mono text-sm font-bold text-emerald-400">{averageMastery}%</span>
            </div>
          </div>

          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mission Score</div>
            <div className="font-mono text-lg font-bold text-amber-400">{totalScore} PTS</div>
          </div>
        </div>
      </header>

      {/* ─── NAVIGATION TABS ─── */}
      <nav className="max-w-6xl mx-auto mb-6 flex rounded-xl bg-slate-900 p-1.5 border border-slate-800 gap-1 overflow-x-auto">
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('predict');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'predict' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>1. Predict (Discovery)</span>
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('explore');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'explore' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>2. Visual Interactive Lab</span>
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('challenges');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'challenges' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>3. Mastery Challenges ({completedChallenges.size}/{CHALLENGES.length})</span>
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('studio');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'studio' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>4. Acoustic Studio & Misconceptions</span>
        </button>
      </nav>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: PREDICT (DISCOVERY QUESTION) */}
        {activeTab === 'predict' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-gold-400"></span> Intuition Check • Predict Before Learning
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{DISCOVERY_QUESTION.question}</h2>

              <div className="grid grid-cols-1 gap-3 my-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
                  if (discoverySubmitted) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                    } else if (idx === discoverySelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold shrink-0 border border-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 rounded-xl bg-slate-950 border border-gold-500/30 text-slate-300 text-sm">
                  <div className="font-bold text-gold-400 mb-1">Scientific Context & Key Takeaway:</div>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="mt-4 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wide transition-all shadow-lg"
                  >
                    Proceed to Interactive Laboratory &rarr;
                  </button>
                </motion.div>
              )}
            </div>

            {/* Narrative Mission Intro Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-gold-950 border border-gold-900/50 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h3 className="text-md font-bold text-gold-300 mb-1">Mission Context: {SCENARIO.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: VISUAL INTERACTIVE LABORATORY */}
        {activeTab === 'explore' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Interactive Slide Navigator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg"
                  >
                    &larr; Prev
                  </button>
                  <button
                    disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentSlideIndex((prev) => Math.min(TEACHING_SLIDES.length - 1, prev + 1));
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>

              {/* Slide Content Header */}
              {(() => {
                const slide = TEACHING_SLIDES[currentSlideIndex];
                return (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{slide.title}</h2>
                    <p className="text-xs text-amber-400 font-mono mb-3">{slide.keyFormula}</p>
                    <p className="text-sm text-slate-300 mb-4">{slide.explanation}</p>
                    <div className="p-3 bg-gold-950/40 border border-gold-500/30 rounded-lg text-xs text-gold-300 font-medium">
                      💡 <strong>Interactive Task:</strong> {slide.interactiveInstruction}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* LIVE SIMULATOR CONTROLS & VISUAL CANVAS BENCH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Interactive Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide border-b border-slate-800 pb-2">
                  Signal Controls & Tuning
                </h3>

                {/* Medium Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Propagation Medium:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['air', 'water', 'steel', 'vacuum'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          audioManager.play('tap');
                          setSimMedium(m);
                          if (m === 'vacuum') setJarAir(0);
                          else if (jarAir === 0) setJarAir(100);
                        }}
                        className={`py-2 text-xs font-bold rounded-lg capitalize border transition-all ${
                          simMedium === m ? 'bg-gold-500 text-slate-950 border-gold-400 font-black' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {m === 'air' && '💨 Air (~343m/s)'}
                        {m === 'water' && '💧 Water (~1480m/s)'}
                        {m === 'steel' && '🛡️ Steel (~5960m/s)'}
                        {m === 'vacuum' && '🌌 Vacuum (0 m/s)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Frequency (f):</span>
                    <span className="text-gold-400 font-mono font-bold">{simFreq} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25000"
                    step="10"
                    value={simFreq}
                    onChange={(e) => {
                      setSimFreq(Number(e.target.value));
                    }}
                    className="w-full accent-gold-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10 Hz (Infra)</span>
                    <span>440 Hz (Music)</span>
                    <span>25 kHz (Ultra)</span>
                  </div>
                </div>

                {/* Amplitude Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Amplitude (A):</span>
                    <span className="text-emerald-400 font-mono font-bold">{simAmp} dB</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={simAmp}
                    onChange={(e) => {
                      setSimAmp(Number(e.target.value));
                    }}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Loudness $\propto A^2 = {(simAmp ** 2 / 100).toFixed(0)}$ arbitrary units.
                  </p>
                </div>

                {/* Vocal Cord Tension Model Slider */}
                <div className="border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-300">Larynx Vocal Cord Tension:</span>
                    <span className="text-amber-400 font-mono font-bold">{vocalCordTension}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={vocalCordTension}
                    onChange={(e) => {
                      setVocalCordTension(Number(e.target.value));
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    {vocalCordTension > 60 ? 'Tight & thin cords: High pitch voice!' : 'Loose & thick cords: Deep bass voice.'}
                  </p>
                </div>
              </div>

              {/* Right Column: Dynamic Displays & Canvas */}
              <div className="lg:col-span-2 space-y-4">
                {/* Particle Wave Propagation Canvas */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                      Longitudinal Molecule Oscillations (Compressions & Rarefactions)
                    </h4>
                    <span className="text-xs text-gold-400 font-mono">v = f × λ</span>
                  </div>
                  <LongitudinalWaveCanvas frequency={simFreq} amplitude={simAmp} medium={simMedium} isPlaying={true} />
                </div>

                {/* Oscilloscope Real-Time Sine Curve */}
                <OscilloscopeCanvas frequency={simFreq} amplitude={simAmp} />

                {/* Audibility Spectrum Visualizer */}
                <AudibilitySpectrumSVG currentFreq={simFreq} />
              </div>
            </div>

            {/* Bell Jar Vacuum SVG Interactive Component */}
            <BellJarSVG
              airPressure={jarAir}
              isPumping={isPumping}
              onTogglePump={() => {
                audioManager.play('whoosh');
                if (jarAir === 0) {
                  setJarAir(100);
                  setIsPumping(false);
                } else {
                  setIsPumping(!isPumping);
                }
              }}
            />
          </motion.div>
        )}

        {/* TAB 3: MASTERY CHALLENGES */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white">
                  Node Target: <span className="text-amber-400 font-mono">{currentChallenge.nodeId}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gold-950 text-gold-300 border border-gold-700 rounded-full text-xs font-bold uppercase">
                  {currentChallenge.difficulty}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold uppercase">
                  {currentChallenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Challenge Body */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
              <h2 className="text-lg font-bold text-slate-100 mb-6">{currentChallenge.question}</h2>

              {/* Classify / Distinguish Options */}
              {(currentChallenge.type === 'classify' || currentChallenge.type === 'distinguish') && currentChallenge.options && (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setUserOptionsSelected(idx);
                      }}
                      className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${
                        userOptionsSelected === idx
                          ? 'bg-gold-950 border-gold-400 text-gold-200 font-semibold'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold shrink-0 border border-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="mb-6 space-y-3">
                  <label className="text-xs font-semibold text-slate-400 block">Enter calculated numerical value:</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter number..."
                      className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-lg font-mono text-gold-300 focus:outline-none focus:border-gold-400 w-48"
                    />
                    <span className="font-bold text-slate-400 text-sm">{currentChallenge.unit}</span>
                  </div>
                </div>
              )}

              {/* Drag Label Component */}
              {currentChallenge.type === 'drag-label' && currentChallenge.dragItems && (
                <div className="mb-6 space-y-4">
                  <p className="text-xs text-slate-400">Assign each wave term to its correct definition target:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentChallenge.dragItems.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <div className="text-xs font-bold text-gold-400 mb-2">Target Block: {item.targetId.toUpperCase()}</div>
                        <select
                          value={dragState[item.targetId] || ''}
                          onChange={(e) => {
                            audioManager.play('tap');
                            setDragState((prev) => ({ ...prev, [item.targetId]: e.target.value }));
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-gold-400"
                        >
                          <option value="">-- Select Label --</option>
                          {currentChallenge.dragItems?.map((d, dIdx) => (
                            <option key={dIdx} value={d.label}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setCurrentHintText(currentChallenge.hints[0]);
                    setShowHint(true);
                  }}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  💡 Need a hint?
                </button>

                <div className="flex gap-3">
                  {!challengeFeedback?.isCorrect ? (
                    <button
                      onClick={handleVerifyChallenge}
                      className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg"
                    >
                      Verify Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg"
                    >
                      {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete All Challenges 🎉'}
                    </button>
                  )}
                </div>
              </div>

              {/* Feedback Banner */}
              {challengeFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl border ${
                    challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}
                >
                  <p className="text-sm font-medium">{challengeFeedback.text}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: ACOUSTIC STUDIO & MISCONCEPTIONS */}
        {activeTab === 'studio' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Misconceptions Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                ⚠️ Common Physics Misconceptions & Clarifications
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                CBSE exams frequently test these tricky nuances. Review them to avoid standard pitfalls!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS_CHECKLIST.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>❌ Misconception:</span> {item.misconception}
                    </div>
                    <div className="text-xs text-emerald-300 font-medium leading-relaxed pl-4 border-l-2 border-emerald-500">
                      <span>✅ Reality:</span> {item.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SRS Review Summary Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wide mb-3">
                Spaced Repetition System (SM-2) Memory Tracking
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Node ID</th>
                      <th className="py-2 px-3">BKT Mastery (pKnown)</th>
                      <th className="py-2 px-3">Interval (days)</th>
                      <th className="py-2 px-3">Repetitions</th>
                      <th className="py-2 px-3">Ease Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {ALL_NODE_IDS.map((id) => {
                      const bkt = bktMap[id] || createBKTState();
                      const srs = srsItems[id] || createReviewItem(id, 'Physics');
                      return (
                        <tr key={id} className="hover:bg-slate-800/40">
                          <td className="py-2.5 px-3 font-mono text-amber-400">{id}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-mono font-bold text-emerald-400">
                              {(masteryProb(bkt.pKnown) * 100).toFixed(0)}%
                            </span>
                          </td>
                          <td className="py-2.5 px-3">{srs.interval}</td>
                          <td className="py-2.5 px-3">{srs.repetition}</td>
                          <td className="py-2.5 px-3">{srs.efactor.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* ─── SIM ENGINE OVERLAYS ─── */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />
    </div>
  );
}

// Default export statement
