import Light from "../component/3dText/light/light.jsx";
import Text from "../component/3dText/text/text.jsx";
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import HeroOverlay from "./HeroOverlay.jsx";
import "./hero.css";

export default function Hero() {
    const scroll = useScroll()
    const ambientRef = useRef()
    const floorRef = useRef()
    const [noiseOpacity, setNoiseOpacity] = useState(0.4)
    const [intensityMultiplier, setIntensityMultiplier] = useState(1)

    const baseColor = new THREE.Color("#565555")
    const targetColor = new THREE.Color("#ffffff")

    useFrame((state) => {
        const offset = scroll.offset
        const multiplier = 1 - offset

        setIntensityMultiplier(multiplier)
        setNoiseOpacity(0.4 * multiplier)

        if (ambientRef.current) ambientRef.current.intensity = 0.5 * multiplier

        const currentColor = baseColor.clone().lerp(targetColor, offset)
        state.scene.background = currentColor

        if (floorRef.current) floorRef.current.color.copy(currentColor)
        document.body.style.backgroundColor = `#${currentColor.getHexString()}`
    })

    return (
        <>
            <EffectComposer>
                <Noise opacity={noiseOpacity} blendFunction={BlendFunction.OVERLAY} />
            </EffectComposer>
            <ambientLight ref={ambientRef} intensity={0.5} />
            <Light intensityMultiplier={intensityMultiplier} />
            <Text />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} scale={20} >
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial ref={floorRef} color="#565555" />
            </mesh>
            <HeroOverlay />
        </>
    );
}

