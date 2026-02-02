import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Navbar from './component/Navbar/Navbar.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Navbar />
        <Canvas
            gl={{
                // antialias: true,
                // toneMapping: THREE.ACESFilmicToneMapping,
                // outputColorSpace: THREE.SRGBColorSpace
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-6.8, -2.5, 0.0],


                rotation: [0, -1.5, 0]
            }}
        >
            <Experience />
        </Canvas>
    </>
)
