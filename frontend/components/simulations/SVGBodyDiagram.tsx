'use client';

/**
 * SVGBodyDiagram — Interactive human body diagram with clickable parts.
 * Students click on a body part to select it as their answer.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SVGBodyDiagramProps {
  answer: string;
  showCorrect: boolean;
  onSelect?: (part: string) => void;
}

export function SVGBodyDiagram({ answer, showCorrect, onSelect }: SVGBodyDiagramProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answerLower = answer.toLowerCase();

  const parts = [
    { id: 'head', label: 'Head', x: 100, y: 30 },
    { id: 'eye', label: 'Eyes', x: 92, y: 25 },
    { id: 'ear', label: 'Ears', x: 110, y: 28 },
    { id: 'nose', label: 'Nose', x: 100, y: 35 },
    { id: 'mouth', label: 'Mouth', x: 100, y: 42 },
    { id: 'neck', label: 'Neck', x: 100, y: 55 },
    { id: 'shoulder', label: 'Shoulder', x: 75, y: 65 },
    { id: 'arm', label: 'Arm', x: 60, y: 90 },
    { id: 'hand', label: 'Hand', x: 50, y: 120 },
    { id: 'chest', label: 'Chest', x: 100, y: 75 },
    { id: 'heart', label: 'Heart', x: 90, y: 78 },
    { id: 'lung', label: 'Lungs', x: 110, y: 78 },
    { id: 'stomach', label: 'Stomach', x: 100, y: 95 },
    { id: 'hip', label: 'Hip', x: 100, y: 110 },
    { id: 'leg', label: 'Leg', x: 90, y: 135 },
    { id: 'knee', label: 'Knee', x: 90, y: 150 },
    { id: 'foot', label: 'Foot', x: 90, y: 175 },
    { id: 'brain', label: 'Brain', x: 100, y: 20 },
    { id: 'bone', label: 'Bones', x: 100, y: 100 },
    { id: 'muscle', label: 'Muscles', x: 75, y: 85 },
    { id: 'skin', label: 'Skin', x: 100, y: 60 },
    { id: 'teeth', label: 'Teeth', x: 100, y: 45 },
  ];

  const handleSelect = (partId: string, partLabel: string) => {
    if (showCorrect) return;
    setSelected(partId);
    onSelect?.(partLabel);
  };

  const isAnswerPart = (partId: string, partLabel: string) => {
    const p = partLabel.toLowerCase();
    return showCorrect && (answerLower.includes(p) || p.includes(answerLower) ||
      answerLower.includes(partId) || partId.includes(answerLower));
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="200" viewBox="0 0 200 200" className="max-w-full">
        {/* Body outline */}
        {/* Head */}
        <motion.circle
          cx="100" cy="35" r="22"
          fill={isAnswerPart('head', 'Head') ? '#86efac' : selected === 'head' ? '#c7d2fe' : '#fef3c7'}
          stroke="#d97706" strokeWidth="2"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleSelect('head', 'Head')}
          style={{ cursor: 'pointer' }}
        />
        {/* Eyes */}
        <motion.circle
          cx="92" cy="30" r="3"
          fill={isAnswerPart('eye', 'Eyes') ? '#22c55e' : '#333'}
          whileHover={{ scale: 1.3 }}
          onClick={() => handleSelect('eye', 'Eyes')}
          style={{ cursor: 'pointer' }}
        />
        <motion.circle
          cx="108" cy="30" r="3"
          fill={isAnswerPart('eye', 'Eyes') ? '#22c55e' : '#333'}
          whileHover={{ scale: 1.3 }}
          onClick={() => handleSelect('eye', 'Eyes')}
          style={{ cursor: 'pointer' }}
        />
        {/* Nose */}
        <motion.ellipse
          cx="100" cy="37" rx="2" ry="3"
          fill={isAnswerPart('nose', 'Nose') ? '#22c55e' : '#d97706'}
          whileHover={{ scale: 1.3 }}
          onClick={() => handleSelect('nose', 'Nose')}
          style={{ cursor: 'pointer' }}
        />
        {/* Mouth */}
        <motion.path
          d="M 93 44 Q 100 48 107 44"
          fill="none"
          stroke={isAnswerPart('mouth', 'Mouth') ? '#22c55e' : '#d97706'}
          strokeWidth="2"
          whileHover={{ scale: 1.1 }}
          onClick={() => handleSelect('mouth', 'Mouth')}
          style={{ cursor: 'pointer' }}
        />
        {/* Ears */}
        <motion.ellipse
          cx="78" cy="35" rx="4" ry="6"
          fill={isAnswerPart('ear', 'Ears') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleSelect('ear', 'Ears')}
          style={{ cursor: 'pointer' }}
        />
        <motion.ellipse
          cx="122" cy="35" rx="4" ry="6"
          fill={isAnswerPart('ear', 'Ears') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleSelect('ear', 'Ears')}
          style={{ cursor: 'pointer' }}
        />
        {/* Neck */}
        <rect x="95" y="55" width="10" height="10" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        {/* Body/torso */}
        <motion.ellipse
          cx="100" cy="90" rx="25" ry="30"
          fill={isAnswerPart('chest', 'Chest') || isAnswerPart('stomach', 'Stomach') || isAnswerPart('skin', 'Skin') ? '#86efac' : '#fef3c7'}
          stroke="#d97706" strokeWidth="2"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSelect('chest', 'Chest')}
        />
        {/* Heart */}
        <motion.path
          d="M 88 78 C 85 75, 82 78, 85 82 L 90 88 L 95 82 C 98 78, 95 75, 92 78 Z"
          fill={isAnswerPart('heart', 'Heart') ? '#ef4444' : '#fca5a5'}
          stroke="#dc2626" strokeWidth="1"
          whileHover={{ scale: 1.3 }}
          onClick={() => handleSelect('heart', 'Heart')}
          style={{ cursor: 'pointer' }}
        />
        {/* Lungs */}
        <motion.ellipse
          cx="112" cy="82" rx="6" ry="10"
          fill={isAnswerPart('lung', 'Lungs') ? '#86efac' : '#fecaca'}
          stroke="#dc2626" strokeWidth="1"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleSelect('lung', 'Lungs')}
          style={{ cursor: 'pointer' }}
        />
        {/* Stomach */}
        <motion.ellipse
          cx="100" cy="100" rx="8" ry="6"
          fill={isAnswerPart('stomach', 'Stomach') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleSelect('stomach', 'Stomach')}
          style={{ cursor: 'pointer' }}
        />
        {/* Arms */}
        <motion.line
          x1="75" y1="65" x2="55" y2="120"
          stroke={isAnswerPart('arm', 'Arm') ? '#22c55e' : '#d97706'}
          strokeWidth="6" strokeLinecap="round"
          whileHover={{ strokeWidth: 8 }}
          onClick={() => handleSelect('arm', 'Arm')}
          style={{ cursor: 'pointer' }}
        />
        <motion.line
          x1="125" y1="65" x2="145" y2="120"
          stroke={isAnswerPart('arm', 'Arm') ? '#22c55e' : '#d97706'}
          strokeWidth="6" strokeLinecap="round"
          whileHover={{ strokeWidth: 8 }}
          onClick={() => handleSelect('arm', 'Arm')}
          style={{ cursor: 'pointer' }}
        />
        {/* Hands */}
        <motion.circle
          cx="52" cy="122" r="5"
          fill={isAnswerPart('hand', 'Hand') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.3 }}
          onClick={() => handleSelect('hand', 'Hand')}
          style={{ cursor: 'pointer' }}
        />
        <motion.circle
          cx="148" cy="122" r="5"
          fill={isAnswerPart('hand', 'Hand') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.3 }}
          onClick={() => handleSelect('hand', 'Hand')}
          style={{ cursor: 'pointer' }}
        />
        {/* Legs */}
        <motion.line
          x1="90" y1="120" x2="88" y2="175"
          stroke={isAnswerPart('leg', 'Leg') ? '#22c55e' : '#d97706'}
          strokeWidth="7" strokeLinecap="round"
          whileHover={{ strokeWidth: 9 }}
          onClick={() => handleSelect('leg', 'Leg')}
          style={{ cursor: 'pointer' }}
        />
        <motion.line
          x1="110" y1="120" x2="112" y2="175"
          stroke={isAnswerPart('leg', 'Leg') ? '#22c55e' : '#d97706'}
          strokeWidth="7" strokeLinecap="round"
          whileHover={{ strokeWidth: 9 }}
          onClick={() => handleSelect('leg', 'Leg')}
          style={{ cursor: 'pointer' }}
        />
        {/* Feet */}
        <motion.ellipse
          cx="85" cy="180" rx="8" ry="4"
          fill={isAnswerPart('foot', 'Foot') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleSelect('foot', 'Foot')}
          style={{ cursor: 'pointer' }}
        />
        <motion.ellipse
          cx="115" cy="180" rx="8" ry="4"
          fill={isAnswerPart('foot', 'Foot') ? '#86efac' : '#fde68a'}
          stroke="#d97706" strokeWidth="1"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleSelect('foot', 'Foot')}
          style={{ cursor: 'pointer' }}
        />
        {/* Brain (inside head, shown as overlay) */}
        {isAnswerPart('brain', 'Brain') && (
          <motion.circle cx="100" cy="30" r="15" fill="#fbbf24" opacity="0.5" />
        )}
        {/* Teeth */}
        {isAnswerPart('teeth', 'Teeth') && (
          <motion.rect x="95" y="44" width="10" height="4" fill="white" stroke="#d97706" strokeWidth="1" />
        )}
      </svg>
      {/* Selected part label */}
      {selected && !showCorrect && (
        <div className="text-xs font-bold text-indigo-600 mt-1">
          You selected: {parts.find(p => p.id === selected)?.label}
        </div>
      )}
      {showCorrect && (
        <div className="text-xs font-bold text-green-600 mt-1">
          ✓ The answer is: {answer}
        </div>
      )}
    </div>
  );
}
