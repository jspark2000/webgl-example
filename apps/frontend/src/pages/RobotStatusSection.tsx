import Scene from '@/components/Scene'
import type { TCP } from '@/types/tcp.interface'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function RobotStatusSection() {
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
    <section className="flex flex-col">
      <h2 className="mb-1.5 text-lg font-bold">로봇 상태</h2>
      <div className="relative grid grid-cols-7 border-2 border-gray-950">
        <div className="col-span-1 border-r-2 border-gray-950">
          <Canvas camera={{ position: [14, 14, 14], fov: 70 }}>
            <Scene position={position} rotation={rotation} />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="col-span-6 flex flex-col items-start justify-center space-y-3 pl-6">
          <div className="flex space-x-2">
            <h4 className="font-bold">관절좌표</h4>
            <p className="text-blue-700">J1: 0.000</p>
            <p className="text-blue-700">J2: 0.000</p>
            <p className="text-blue-700">J3: 0.000</p>
            <p className="text-blue-700">J4: 0.000</p>
            <p className="text-blue-700">J5: 0.000</p>
            <p className="text-blue-700">J6: 0.000</p>
          </div>
          <div className="flex space-x-2">
            <h4 className="font-bold">TCP위치</h4>
            <p className="text-purple-700">X: {position.x.toFixed(3)}</p>
            <p className="text-purple-700">Y: {position.y.toFixed(3)}</p>
            <p className="text-purple-700">Z: {position.z.toFixed(3)}</p>
            <p className="text-purple-700">RX: {rotation.rx.toFixed(3)}</p>
            <p className="text-purple-700">RY: {rotation.ry.toFixed(3)}</p>
            <p className="text-purple-700">RZ: {rotation.rz.toFixed(3)}</p>
          </div>
          <div className="flex space-x-2 text-sm">
            <h4 className="font-bold">TOOLS</h4>
            <label className="text-amber-600">
              <input type="radio" name="tools" value="1" /> TOOL1
            </label>
            <label className="text-amber-600">
              <input type="radio" name="tools" value="2" /> TOOL2
            </label>
            <label className="text-amber-600">
              <input type="radio" name="tools" value="3" /> TOOL3
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
