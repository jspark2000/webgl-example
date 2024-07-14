import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface AxesProps {
  position: { x: number; y: number; z: number }
  rotation: { rx: number; ry: number; rz: number }
}

const Axes: React.FC<AxesProps> = ({ position, rotation }) => {
  const rotatingGroupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (rotatingGroupRef.current) {
      rotatingGroupRef.current.position.set(position.x, position.y, position.z)
      rotatingGroupRef.current.rotation.set(
        rotation.rx,
        rotation.ry,
        rotation.rz
      )
    }
  })

  return (
    <group ref={rotatingGroupRef}>
      <Line
        points={[
          [-2, 0, 0],
          [2, 0, 0]
        ]}
        color="red"
        lineWidth={1}
      />
      <Line
        points={[
          [0, -2, 0],
          [0, 2, 0]
        ]}
        color="green"
        lineWidth={1}
      />
      <Line
        points={[
          [0, 0, -2],
          [0, 0, 2]
        ]}
        color="blue"
        lineWidth={1}
      />

      <Line
        points={[
          [-2, 0, 0],
          [-2, 2, 0]
        ]}
        color="red"
        lineWidth={1}
        dashed
      />
      <Line
        points={[
          [-2, 0, 0],
          [-2, 0, 2]
        ]}
        color="red"
        lineWidth={1}
        dashed
      />

      <Line
        points={[
          [0, -2, 0],
          [2, -2, 0]
        ]}
        color="green"
        lineWidth={1}
        dashed
      />
      <Line
        points={[
          [0, -2, 0],
          [0, -2, 2]
        ]}
        color="green"
        lineWidth={1}
        dashed
      />

      <Line
        points={[
          [0, 0, -2],
          [2, 0, -2]
        ]}
        color="blue"
        lineWidth={1}
        dashed
      />
      <Line
        points={[
          [0, 0, -2],
          [0, 2, -2]
        ]}
        color="blue"
        lineWidth={1}
        dashed
      />
    </group>
  )
}

export default Axes
