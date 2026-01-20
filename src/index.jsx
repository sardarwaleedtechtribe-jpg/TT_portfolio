import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas, useThree } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useEffect } from 'react'

function CameraController() {
  const { position, rotation } = useControls("Camera", {
    position: { value: [0, 0, 10], step: 0.01 },
    rotation: { value: [0, 0, 0], step: 0.01 },
  });

  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...position);
    camera.rotation.set(...rotation);
    camera.updateMatrixWorld();
  }, [position, rotation, camera]);

  return null;
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        gl={ {
            // antialias: true,
            // toneMapping: THREE.ACESFilmicToneMapping,
            // outputColorSpace: THREE.SRGBColorSpace
        } }
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-6.5, -2.5, 0],
            rotation: [2, 1, 3]
        } }
    >
        <CameraController />
        <Experience />
    </Canvas>
)