'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedBrain() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Main brain sphere */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
        
        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => (
          <OrbitingParticle key={i} index={i} />
        ))}
      </group>
    </Float>
  )
}

function OrbitingParticle({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angle = (index / 8) * Math.PI * 2
  const radius = 2

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + index
      meshRef.current.position.x = Math.cos(time * 0.5 + angle) * radius
      meshRef.current.position.z = Math.sin(time * 0.5 + angle) * radius
      meshRef.current.position.y = Math.sin(time + index) * 0.5
    }
  })

  const colors = ['#60a5fa', '#06b6d4', '#8b5cf6', '#ec4899']

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default function FloatingBrain3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <AnimatedBrain />
      </Canvas>
    </div>
  )
}
