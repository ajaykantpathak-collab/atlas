"use client";

import { useRef, useEffect } from "react";

interface WorldScene2DProps {
  unlockedAreas: string[];
  currentArea: string;
  onAreaClick: (area: string) => void;
}

const AREAS = [
  { id: "home", label: "Home", x: 200, y: 200, color: "#3b82f6" },
  { id: "maths", label: "Maths Garden", x: 80, y: 120, color: "#10b981" },
  { id: "science", label: "Science Park", x: 320, y: 120, color: "#f59e0b" },
  { id: "language", label: "Language Forest", x: 80, y: 280, color: "#8b5cf6" },
  { id: "play", label: "Playground", x: 320, y: 280, color: "#ef4444" },
];

/** 2D Canvas fallback for the Living World. */
export default function WorldScene2D({ unlockedAreas, currentArea, onAreaClick }: WorldScene2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.fillStyle = "#e0f2fe";
    ctx.fillRect(0, 0, 400, 400);

    // Draw paths
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 3;
    AREAS.slice(1).forEach((area) => {
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(area.x, area.y);
      ctx.stroke();
    });

    // Draw areas
    AREAS.forEach((area) => {
      const isUnlocked = unlockedAreas.includes(area.id);
      const isCurrent = currentArea === area.id;

      ctx.fillStyle = isUnlocked ? area.color : "#9ca3af";
      ctx.beginPath();
      ctx.arc(area.x, area.y, isCurrent ? 35 : 30, 0, Math.PI * 2);
      ctx.fill();

      if (isCurrent) {
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      ctx.fillStyle = "#1f2937";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(area.label, area.x, area.y + 50);
    });
  }, [unlockedAreas, currentArea]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const area of AREAS) {
      const dx = x - area.x;
      const dy = y - area.y;
      if (Math.sqrt(dx * dx + dy * dy) < 35 && unlockedAreas.includes(area.id)) {
        onAreaClick(area.id);
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onClick={handleClick}
      className="rounded-lg border border-gray-200"
    />
  );
}
