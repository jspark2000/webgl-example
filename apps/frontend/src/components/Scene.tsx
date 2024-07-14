import React from 'react'
import Axes from './Axes'
import BackgroundAxes from './BackgroundAxes'

interface SceneProps {
  position: { x: number; y: number; z: number }
  rotation: { rx: number; ry: number; rz: number }
}

const Scene: React.FC<SceneProps> = ({ position, rotation }) => {
  return (
    <>
      <BackgroundAxes />
      <Axes position={position} rotation={rotation} />
    </>
  )
}

export default Scene
