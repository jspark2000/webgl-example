import React from 'react'
import { Line, Text } from '@react-three/drei'
import * as THREE from 'three'

const BackgroundAxes: React.FC = () => {
  const gridSize = 10
  const gridStep = 1
  const lines = []

  // 격자 그리기
  for (let i = -gridSize; i <= gridSize; i += gridStep) {
    lines.push(
      <Line
        key={`zx-plane-z-${i}`}
        points={[
          [-gridSize, 0, i],
          [gridSize, 0, i]
        ]}
        color="lightgrey"
        lineWidth={0.5}
      />
    )
    lines.push(
      <Line
        key={`zx-plane-x-${i}`}
        points={[
          [i, 0, -gridSize],
          [i, 0, gridSize]
        ]}
        color="lightgrey"
        lineWidth={0.5}
      />
    )
  }

  // X축
  lines.push(
    <Line
      key="x-axis"
      points={[
        [-gridSize, 0, 0],
        [gridSize, 0, 0]
      ]}
      color="red"
      lineWidth={1}
    />
  )

  // Y축
  lines.push(
    <Line
      key="y-axis"
      points={[
        [0, -gridSize, 0],
        [0, gridSize, 0]
      ]}
      color="green"
      lineWidth={1}
    />
  )

  // Z축
  lines.push(
    <Line
      key="z-axis"
      points={[
        [0, 0, -gridSize],
        [0, 0, gridSize]
      ]}
      color="blue"
      lineWidth={1}
    />
  )

  return (
    <>
      {lines}

      {/* X축 화살표와 텍스트 */}
      <arrowHelper
        args={[
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(gridSize, 0, 0),
          1,
          0xff0000
        ]}
      />
      <Text position={[gridSize + 1, 0, 0]} fontSize={0.5} color="red">
        X
      </Text>

      {/* Y축 화살표와 텍스트 */}
      <arrowHelper
        args={[
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, gridSize, 0),
          1,
          0x00ff00
        ]}
      />
      <Text position={[0, gridSize + 1, 0]} fontSize={0.5} color="green">
        Y
      </Text>

      {/* Z축 화살표와 텍스트 */}
      <arrowHelper
        args={[
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(0, 0, gridSize),
          1,
          0x0000ff
        ]}
      />
      <Text position={[0, 0, gridSize + 1]} fontSize={0.5} color="blue">
        Z
      </Text>
    </>
  )
}

export default BackgroundAxes
