import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

export default function TractorHero() {
  const meshRef = useRef()
  
  // Rotating/floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(t / 4) * 0.2 // Gentle sway
    meshRef.current.position.y = Math.sin(t / 2) * 0.1 - 0.5 // Float
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={[0, -1, 0]}>
        {/* Main Chassis */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.5, 1.2, 3]} />
          <meshStandardMaterial color="#E31837" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Cabin/Seat Area */}
        <mesh position={[0, 2.2, -0.5]}>
          <boxGeometry args={[1.4, 1.2, 1.5]} />
          <meshStandardMaterial color="#222" transparent opacity={0.9} />
        </mesh>

        {/* Hood Detail (Grille) */}
        <mesh position={[0, 1.2, 1.51]}>
          <planeGeometry args={[1.3, 0.8]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Headlights */}
        <mesh position={[-0.5, 1.4, 1.52]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.5, 1.4, 1.52]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>

        {/* Rear Wheels (Big) */}
        <mesh position={[-1.6, 0.8, -1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[1.6, 0.8, -1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        
        {/* Rear Wheel Rims */}
        <mesh position={[-1.65, 0.8, -1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.85, 32]} />
          <meshStandardMaterial color="#ddd" />
        </mesh>
        <mesh position={[1.65, 0.8, -1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.85, 32]} />
          <meshStandardMaterial color="#ddd" />
        </mesh>

        {/* Front Wheels (Small) */}
        <mesh position={[-1.2, 0.4, 1.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.6, 32]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[1.2, 0.4, 1.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.6, 32]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Exhaust Pipe */}
        <mesh position={[-0.6, 2.5, 1]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
          <meshStandardMaterial color="#444" metalness={0.8} />
        </mesh>

        {/* Steering Wheel (Simplistic) */}
        <mesh position={[0, 2.0, 0]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[0.3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* Brand Text (Abstract) */}
        {/* Could use Text3D but keeping it simple geometry for now */}
      </group>
    </Float>
  )
}
