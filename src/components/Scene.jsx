import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei'
import TractorHero from './TractorHero'

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
        <Suspense fallback={null}>
            <TractorHero />
            <Environment preset="night" blur={0.6} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff0000" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      
      {/* Overlay Gradient for content readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  )
}
