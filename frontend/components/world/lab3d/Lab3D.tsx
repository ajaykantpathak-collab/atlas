'use client'

/**
 * Lab3D — the real experiment world. Every scene is a react-three-fiber
 * world (real geometry, lights, animation), driven by slider state.
 * This replaces flat canvas painters for the sandbox — students walk
 * INTO the experiment, not past it.
 */
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export type Vals = Record<string, number>
export type Scene3D = (props: { vals: Vals; t?: number }) => JSX.Element

export function Lab3D({ children, camera = [0, 6, 14] }: { children: React.ReactNode; camera?: [number, number, number] }) {
    return (
        <Canvas camera={{ position: camera, fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
            <color attach="background" args={['#050914']} />
            <Suspense fallback={null}>
                <ambientLight intensity={0.35} />
                <directionalLight position={[6, 10, 4]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
                <pointLight position={[-6, 4, -6]} intensity={0.4} color="#818cf8" />
                <Stars radius={120} depth={40} count={2500} factor={3} fade speed={0.5} />
                {children}
                <ContactShadows position={[0, -3.4, 0]} opacity={0.55} blur={2.4} scale={22} color="#0f172a" />
                <Environment preset="city" />
            </Suspense>
            <OrbitControls enablePan={false} minDistance={4} maxDistance={40} maxPolarAngle={Math.PI * 0.62} />
            <EffectComposer>
                <Bloom intensity={0.55} luminanceThreshold={0.2} luminanceSmoothing={0.8} />
                <Vignette darkness={0.55} />
            </EffectComposer>
        </Canvas>
    );
}
