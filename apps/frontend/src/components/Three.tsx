import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import io from 'socket.io-client'

const Three: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<THREE.Vector3[]>([])
  const [currentPosition, setCurrentPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  )

  useEffect(() => {
    const socket = io('http://localhost:8002')

    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    socket.on('message', (data) => {
      console.log('Received data:', data)
      const newPoint = new THREE.Vector3(data.x, data.y, data.z)
      pointsRef.current.push(newPoint)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
    }

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const pointGeometry = new THREE.SphereGeometry(0.05, 32, 32)
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const point = new THREE.Mesh(pointGeometry, pointMaterial)
    scene.add(point)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
    const points: THREE.Vector3[] = []
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(lineGeometry, lineMaterial)
    scene.add(line)

    camera.position.z = 10

    let direction = new THREE.Vector3(
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1
    )

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      if (pointsRef.current.length > 0) {
        const targetPoint = pointsRef.current[0]

        direction = targetPoint
          .clone()
          .sub(point.position)
          .normalize()
          .multiplyScalar(0.05)
        pointsRef.current.shift()
      }

      point.position.add(direction)
      setCurrentPosition(direction)

      points.push(point.position.clone())

      if (points.length > 10000) {
        points.shift()
      }

      lineGeometry.setFromPoints(points)

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      renderer.dispose()
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="h-3/4 w-1/2">
        <div ref={mountRef} className="h-full w-full" />
      </div>
      <p className="p-2 text-center text-white backdrop-blur-sm">
        현재 Vector:{' '}
        {`X: ${currentPosition.x.toFixed(2)}, Y: ${currentPosition.y.toFixed(2)}, Z: ${currentPosition.z.toFixed(2)}`}
      </p>
    </div>
  )
}

export default Three
