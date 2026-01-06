'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function NeuralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => {
    const nodeArray = []
    const nodeCount = 30
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 2.5 + Math.random() * 1.5
      
      nodeArray.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ] as [number, number, number],
        scale: 0.03 + Math.random() * 0.05,
        color: ['#60a5fa', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 3)],
      })
    }
    return nodeArray
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.scale, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null)
  
  const lines = useMemo(() => {
    const lineArray = []
    const lineCount = 20
    
    for (let i = 0; i < lineCount; i++) {
      const startTheta = Math.random() * Math.PI * 2
      const startPhi = Math.acos(2 * Math.random() - 1)
      const startRadius = 2.5 + Math.random() * 1.5
      
      const endTheta = Math.random() * Math.PI * 2
      const endPhi = Math.acos(2 * Math.random() - 1)
      const endRadius = 2.5 + Math.random() * 1.5
      
      lineArray.push({
        start: new THREE.Vector3(
          startRadius * Math.sin(startPhi) * Math.cos(startTheta),
          startRadius * Math.sin(startPhi) * Math.sin(startTheta),
          startRadius * Math.cos(startPhi)
        ),
        end: new THREE.Vector3(
          endRadius * Math.sin(endPhi) * Math.cos(endTheta),
          endRadius * Math.sin(endPhi) * Math.sin(endTheta),
          endRadius * Math.cos(endPhi)
        ),
      })
    }
    return lineArray
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => {
        const points = [line.start, line.end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color="#3b82f6"
              transparent
              opacity={0.3}
            />
          </line>
        )
      })}
    </group>
  )
}

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#06b6d4"
        />
        
        <NeuralSphere />
        <NeuralNodes />
        <ConnectionLines />
        
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  )
}
