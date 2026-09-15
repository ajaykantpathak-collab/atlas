"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface WorldSceneProps {
  unlockedAreas: string[];
  currentArea: string;
  onAreaClick: (area: string) => void;
}

/** 3D Living World scene using React Three Fiber. */
export default function WorldScene3D({ unlockedAreas, currentArea, onAreaClick }: WorldSceneProps) {
  const areas = [
    { id: "home", label: "Home", position: [0, 0, 0] as [number, number, number], color: "#3b82f6" },
    { id: "maths", label: "Maths Garden", position: [-3, 0, 2] as [number, number, number], color: "#10b981" },
    { id: "science", label: "Science Park", position: [3, 0, 2] as [number, number, number], color: "#f59e0b" },
    { id: "language", label: "Language Forest", position: [-3, 0, -2] as [number, number, number], color: "#8b5cf6" },
    { id: "play", label: "Playground", position: [3, 0, -2] as [number, number, number], color: "#ef4444" },
  ];

  return (
    <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Environment preset="park" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#86efac" />
      </mesh>

      {/* Area islands */}
      {areas.map((area) => {
        const isUnlocked = unlockedAreas.includes(area.id);
        const isCurrent = currentArea === area.id;
        return (
          <Float key={area.id} speed={isUnlocked ? 2 : 0} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh
              position={area.position}
              onClick={() => isUnlocked && onAreaClick(area.id)}
              onPointerOver={() => (document.body.style.cursor = isUnlocked ? "pointer" : "default")}
              onPointerOut={() => (document.body.style.cursor = "default")}
            >
              <boxGeometry args={[1.5, 0.3, 1.5]} />
              <meshStandardMaterial
                color={isUnlocked ? area.color : "#9ca3af"}
                emissive={isCurrent ? area.color : "#000000"}
                emissiveIntensity={isCurrent ? 0.5 : 0}
              />
              <Text
                position={[0, 1, 0]}
                fontSize={0.3}
                color={isUnlocked ? "#1f2937" : "#6b7280"}
                anchorX="center"
                anchorY="middle"
              >
                {area.label}
              </Text>
            </mesh>
          </Float>
        );
      })}

      {/* Connecting paths */}
      {areas.slice(1).map((area, i) => (
        <PathLine key={i} start={[0, -0.4, 0]} end={[area.position[0], -0.4, area.position[2]]} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

function PathLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const points = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    return [s, e];
  }, [start, end]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#d1d5db" linewidth={2} />
    </line>
  );
}
