import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import io from 'socket.io-client'
import Scene from './components/Scene'
import type { TCP } from './types/tcp.interface'

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [rotation, setRotation] = useState({ rx: 0, ry: 0, rz: 0 })

  useEffect(() => {
    const socket = io('http://localhost:8002')

    socket.on('connect', () => {
      console.log('Connected to socket.io server')
    })

    socket.on('message', (data: TCP) => {
      setPosition({ x: data.x, y: data.y, z: data.z })
      setRotation({ rx: data.rx, ry: data.ry, rz: data.rz })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="relative h-screen w-full">
      <Canvas camera={{ position: [15, 15, 15], fov: 90 }}>
        <Scene position={position} rotation={rotation} />
        <OrbitControls />
      </Canvas>
      <div className="absolute left-3 top-3 bg-white p-3 font-semibold">
        <h4>TCP 좌표</h4>
        <p>x: {position.x.toFixed(2)}</p>
        <p>y: {position.y.toFixed(2)}</p>
        <p>z: {position.z.toFixed(2)}</p>
        <p>rx: {rotation.rx.toFixed(2)}</p>
        <p>ry: {rotation.ry.toFixed(2)}</p>
        <p>rz: {rotation.rz.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default App
